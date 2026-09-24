import importlib.util
import json
from pathlib import Path

import pytest


def module(name):
    spec = importlib.util.spec_from_file_location(
        name, Path(__file__).with_name(name + ".py")
    )
    loaded = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(loaded)
    return loaded


def test_missing_evidence_is_not_zero_latency_or_free_call(tmp_path):
    result = module("report").summarize(tmp_path)
    assert result["status"] == "not_measured"
    assert result["browser_rms_estimate"]["p50_ms"] is None
    assert result["invoice_total_usd"] is None
    assert not result["worker_completed_ten_minutes"]


def test_percentile_uses_nearest_rank_and_rejects_invalid_values():
    report = module("report")
    assert report.percentile([100, 200, 300, 400, -2, float("nan")], 0.95) == 400
    assert report.percentile([], 0.5) is None


def test_early_failure_cannot_be_a_complete_benchmark(tmp_path):
    (tmp_path / "worker.jsonl").write_text(
        "\n".join(
            json.dumps(e)
            for e in [
                {"kind": "ended", "active_seconds": 600},
                {"kind": "failure", "error_type": "TimeoutError"},
            ]
        )
    )
    assert not module("report").summarize(tmp_path)["worker_completed_ten_minutes"]


def test_invoice_requires_reference_and_finite_amount(tmp_path):
    (tmp_path / "invoice.json").write_text(
        json.dumps({"currency": "USD", "items": [{"amount_usd": 1}]})
    )
    with pytest.raises(ValueError):
        module("report").summarize(tmp_path)


def test_preflight_demands_selected_accent_and_provider():
    missing = module("run").missing_config("tavus", "es-MX", {})
    assert "TAVUS_PAL_ID" in missing
    assert "CARTESIA_VOICE_MX" in missing
    assert "CARTESIA_VOICE_AR" not in missing
    assert "SIMLI_API_KEY" not in missing
