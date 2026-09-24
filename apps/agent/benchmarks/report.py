"""Summarize measured units and browser timing estimates, without inventing invoices."""

import argparse
import json
import math
from pathlib import Path


def percentile(values, fraction):
    values = sorted(
        v for v in values if isinstance(v, (int, float)) and math.isfinite(v) and v >= 0
    )
    return values[max(0, math.ceil(len(values) * fraction) - 1)] if values else None


def summarize(folder):
    worker_file = folder / "worker.jsonl"
    worker = (
        [
            json.loads(line)
            for line in worker_file.read_text(encoding="utf-8").splitlines()
        ]
        if worker_file.exists()
        else []
    )
    browser_file = folder / "browser.json"
    browser = (
        json.loads(browser_file.read_text(encoding="utf-8")).get("events", [])
        if browser_file.exists()
        else []
    )
    timings = [e["value"] for e in browser if e["kind"] == "browser_vad_response_ms"]
    interruptions = [
        e["value"] for e in browser if e["kind"] == "browser_vad_barge_in_ms"
    ]
    metrics = [e["metrics"] for e in worker if e["kind"] == "metrics"]
    units = {
        "stt_audio_seconds": 0,
        "tts_characters": 0,
        "tts_audio_seconds": 0,
        "llm_prompt_tokens": 0,
        "llm_completion_tokens": 0,
    }
    # Metrics are emitted once per completed provider request; request IDs remain in raw evidence.
    for metric in metrics:
        if metric["type"] == "stt_metrics":
            units["stt_audio_seconds"] += metric.get("audio_duration", 0)
        elif metric["type"] == "tts_metrics":
            units["tts_characters"] += metric.get("characters_count", 0)
            units["tts_audio_seconds"] += metric.get("audio_duration", 0)
        elif metric["type"] == "llm_metrics":
            units["llm_prompt_tokens"] += metric.get("prompt_tokens", 0)
            units["llm_completion_tokens"] += metric.get("completion_tokens", 0)
    durations = [e["active_seconds"] for e in worker if e["kind"] == "ended"]
    errors = [
        e for e in worker if e["kind"] in ("failure", "cleanup_failed", "idle_timeout")
    ]
    supervisor_file = folder / "supervisor.jsonl"
    supervisor = (
        [
            json.loads(line)
            for line in supervisor_file.read_text(encoding="utf-8").splitlines()
        ]
        if supervisor_file.exists()
        else []
    )
    invoice_file = folder / "invoice.json"
    invoice = (
        json.loads(invoice_file.read_text(encoding="utf-8"))
        if invoice_file.exists()
        else None
    )
    if invoice is not None:
        if (
            invoice.get("currency") != "USD"
            or not isinstance(invoice.get("items"), list)
            or not invoice["items"]
        ):
            raise ValueError("Invoice requires USD and nonempty reconciled items")
        for item in invoice["items"]:
            amount = item.get("amount_usd")
            if (
                isinstance(amount, bool)
                or not isinstance(amount, (int, float))
                or not math.isfinite(amount)
                or amount < 0
                or not item.get("source_reference")
            ):
                raise ValueError(
                    "Each invoice item requires finite nonnegative amount and source reference"
                )
    return {
        "schema": 1,
        "status": "observations_require_review" if metrics else "not_measured",
        "active_seconds": durations[-1] if durations else None,
        "worker_completed_ten_minutes": bool(
            durations and durations[-1] >= 599 and not errors
        ),
        "browser_rms_estimate": {
            "samples": len(timings),
            "p50_ms": percentile(timings, 0.5),
            "p95_ms": percentile(timings, 0.95),
            "barge_in_samples": len(interruptions),
            "barge_in_max_ms": max(interruptions) if interruptions else None,
        },
        "measured_units": units if metrics else None,
        "invoice_total_usd": sum(i["amount_usd"] for i in invoice["items"])
        if invoice
        else None,
        "invoice_scope": invoice.get("scope", "unspecified") if invoice else None,
        "cleanup": [e for e in supervisor if e["kind"] == "cleanup"],
        "errors": errors,
        "lip_sync_score": None,
        "expression_score": None,
        "regional_accent_score": None,
        "production_gate_passed": False,
        "limitations": "Browser RMS is an estimate; validate recorded turn boundaries. Human scores, complete invoice coverage and 90-minute endurance remain separate gates.",
    }


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("folder", type=Path)
    args = parser.parse_args()
    report = summarize(args.folder)
    args.folder.mkdir(parents=True, exist_ok=True)
    (args.folder / "summary.json").write_text(
        json.dumps(report, indent=2), encoding="utf-8"
    )
    print(json.dumps(report, indent=2))
