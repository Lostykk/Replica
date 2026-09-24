"""Local-only benchmark supervisor. Default is offline preflight, never a paid call."""

import argparse
import asyncio
import json
import math
import os
import secrets
import sys
import time
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
SDK = ROOT / "node_modules/livekit-client/dist/livekit-client.umd.js"


def missing_config(provider, locale, env):
    names = [
        "LIVEKIT_URL",
        "LIVEKIT_API_KEY",
        "LIVEKIT_API_SECRET",
        "DEEPGRAM_API_KEY",
        "OPENAI_API_KEY",
        "CARTESIA_API_KEY",
        "DIALOGUE_MODEL",
        "TTS_MODEL",
        "CARTESIA_VOICE_AR" if locale == "es-AR" else "CARTESIA_VOICE_MX",
    ]
    names += (
        ["SIMLI_API_KEY", "SIMLI_FACE_ID"]
        if provider == "simli"
        else ["TAVUS_API_KEY", "TAVUS_FACE_ID", "TAVUS_PAL_ID"]
    )
    return [name for name in names if not env.get(name, "").strip()]


async def serve(args):
    from aiohttp import ClientSession, ClientTimeout, web
    from livekit import api

    run_id = f"{args.provider}-{args.locale}-{int(time.time())}-{secrets.token_hex(3)}"
    output = ROOT / "work/benchmarks" / run_id
    output.mkdir(parents=True)
    (output / "manifest.json").write_text(
        json.dumps(
            {
                "run_id": run_id,
                "provider": args.provider,
                "locale": args.locale,
                "approved_budget_usd": args.approved_budget_usd,
                "budget_is_provider_hard_cap": False,
                "target_seconds": 600,
                "created_at": time.time(),
            },
            indent=2,
        ),
        encoding="utf-8",
    )
    room_name = "replica-benchmark-" + secrets.token_hex(8)
    nonce = secrets.token_urlsafe(32)
    stopped = asyncio.Event()
    process = None
    child_log = None
    room_created = False
    joined = False
    heartbeat = time.monotonic()
    client = api.LiveKitAPI()

    def append(kind, **values):
        with (output / "supervisor.jsonl").open("a", encoding="utf-8") as stream:
            stream.write(json.dumps({"kind": kind, "at": time.time(), **values}) + "\n")

    @web.middleware
    async def guard(request, handler):
        if request.host != f"127.0.0.1:{args.port}":
            raise web.HTTPForbidden()
        if request.method == "POST" and not secrets.compare_digest(
            request.headers.get("X-Benchmark-Token", ""), nonce
        ):
            raise web.HTTPForbidden()
        response = await handler(request)
        response.headers["Cache-Control"] = "no-store"
        response.headers["X-Frame-Options"] = "DENY"
        return response

    async def index(_request):
        html = (
            (HERE / "client.html")
            .read_text(encoding="utf-8")
            .replace("__NONCE__", nonce)
        )
        return web.Response(text=html, content_type="text/html")

    async def sdk(_request):
        return web.FileResponse(SDK)

    async def join(_request):
        nonlocal process, child_log, room_created, joined, heartbeat
        if joined:
            raise web.HTTPConflict(text="Esta ejecución ya tiene un participante.")
        joined = True
        heartbeat = time.monotonic()
        try:
            await client.room.create_room(
                api.CreateRoomRequest(
                    name=room_name, empty_timeout=60, max_participants=3
                )
            )
            room_created = True
            token = (
                api.AccessToken()
                .with_identity("benchmark-owner")
                .with_ttl(timedelta(minutes=15))
                .with_grants(
                    api.VideoGrants(
                        room_join=True,
                        room=room_name,
                        can_publish=True,
                        can_subscribe=True,
                        can_publish_data=True,
                    )
                )
                .to_jwt()
            )
            env = {
                **os.environ,
                "BENCHMARK_OUTPUT": str(output),
                "BENCHMARK_PROVIDER": args.provider,
                "BENCHMARK_LOCALE": args.locale,
            }
            child_log = (output / "worker-private.log").open("w", encoding="utf-8")
            process = await asyncio.create_subprocess_exec(
                sys.executable,
                str(HERE / "worker.py"),
                "connect",
                "--room",
                room_name,
                "--log-level",
                "warning",
                env=env,
                stdout=child_log,
                stderr=child_log,
            )
            append("joined", room=room_name)
            return web.json_response(
                {
                    "url": os.environ["LIVEKIT_URL"],
                    "token": token,
                    "locale": args.locale,
                    "run_id": run_id,
                }
            )
        except Exception as exc:  # noqa: BLE001 -- redact provider errors at the HTTP boundary
            append("start_failed", error_type=type(exc).__name__)
            stopped.set()
            raise web.HTTPServiceUnavailable(
                text="No se pudo iniciar. Revisar el log privado local."
            ) from None

    async def ping(_request):
        nonlocal heartbeat
        heartbeat = time.monotonic()
        return web.json_response({"closed": stopped.is_set()})

    async def finish(request):
        data = await request.json()
        # Persist numeric/timestamp evidence only. Raw recording stays in the browser.
        if not isinstance(data, dict) or not isinstance(data.get("events", []), list):
            raise web.HTTPBadRequest()
        (output / "browser.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        stopped.set()
        return web.json_response({"saved": True})

    async def watchdog():
        start = time.monotonic()
        while not stopped.is_set():
            if time.monotonic() - start >= 900:
                append("supervisor_timeout")
                stopped.set()
            if joined and time.monotonic() - heartbeat > 20:
                append("browser_heartbeat_lost")
                stopped.set()
            if (output / "finished").exists() or (
                process and process.returncode is not None
            ):
                stopped.set()
            await asyncio.sleep(1)

    app = web.Application(middlewares=[guard], client_max_size=1024 * 1024)
    app.add_routes(
        [
            web.get("/", index),
            web.get("/sdk.js", sdk),
            web.post("/join", join),
            web.post("/ping", ping),
            web.post("/finish", finish),
        ]
    )
    runner = web.AppRunner(app, access_log=None)
    timer = None
    try:
        await runner.setup()
        await web.TCPSite(runner, "127.0.0.1", args.port).start()
        print(
            f"Prueba preparada: http://127.0.0.1:{args.port} — {args.provider}, {args.locale}",
            flush=True,
        )
        print(
            "Solo comienza al dar consentimiento y conectar en esa página. Ctrl+C cancela.",
            flush=True,
        )
        timer = asyncio.create_task(watchdog())
        await stopped.wait()
        await asyncio.sleep(
            3
        )  # Let the browser save final metrics before closing HTTP.
    finally:
        cleanup = []
        # Deleting our uniquely named room stops media even if the worker is unresponsive.
        if room_created:
            try:
                await asyncio.wait_for(
                    client.room.delete_room(api.DeleteRoomRequest(room=room_name)), 15
                )
                cleanup.append("room_deleted")
            except Exception as exc:  # noqa: BLE001 -- finish remaining independent cleanup steps
                cleanup.append("room_cleanup_failed:" + type(exc).__name__)
        provider_file = output / "provider-session.json"
        if args.provider == "tavus" and provider_file.exists():
            session_id = json.loads(provider_file.read_text(encoding="utf-8"))[
                "session_id"
            ]
            async with ClientSession(timeout=ClientTimeout(total=15)) as http:
                try:
                    async with http.post(
                        f"https://tavusapi.com/v2/conversations/{session_id}/end",
                        headers={"x-api-key": os.environ["TAVUS_API_KEY"]},
                    ) as result:
                        cleanup.append(f"tavus_end_http_{result.status}")
                except Exception as exc:  # noqa: BLE001 -- retain cleanup failure for operator
                    cleanup.append("tavus_cleanup_failed:" + type(exc).__name__)
        if process and process.returncode is None:
            try:
                await asyncio.wait_for(process.wait(), 15)
            except TimeoutError:
                process.terminate()
                await process.wait()
        if child_log:
            child_log.close()
        if timer:
            timer.cancel()
            await asyncio.gather(timer, return_exceptions=True)
        await client.aclose()
        await runner.cleanup()
        append("cleanup", results=cleanup)
        print(
            f"Evidencia privada: {output}. Verificar cierre y reconciliar factura del proveedor."
        )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--provider", choices=["simli", "tavus"], required=True)
    parser.add_argument("--locale", choices=["es-AR", "es-MX"], required=True)
    parser.add_argument("--run", action="store_true")
    parser.add_argument("--approved-budget-usd", type=float, default=0)
    parser.add_argument("--port", type=int, default=4174)
    args = parser.parse_args()
    load_dotenv(HERE.parent / ".env.local", override=False)
    missing = missing_config(args.provider, args.locale, os.environ)
    print(
        json.dumps(
            {
                "mode": "run" if args.run else "offline_preflight",
                "missing_variables": missing,
                "browser_sdk_installed": SDK.exists(),
                "live_calls_executed": False,
            }
        )
    )
    if not args.run:
        return 0
    if missing or not SDK.exists():
        parser.error("Completar variables e instalación antes de ejecutar.")
    if not math.isfinite(args.approved_budget_usd) or args.approved_budget_usd <= 0:
        parser.error(
            "Registrar presupuesto aprobado. No contratar suscripciones automáticamente."
        )
    if os.environ.get("BENCHMARK_STOCK_ASSETS_CONFIRMED") != "true":
        parser.error("Confirmar que cara y voz son de catálogo autorizado.")
    if not os.environ["LIVEKIT_URL"].startswith("wss://"):
        parser.error(
            "El benchmark usa un proyecto LiveKit Cloud de desarrollo con wss://."
        )
    # This is an approval record, not a provider-side hard spending cap.
    print(
        "Presupuesto declarado; aplicar límite de gasto en cada proveedor. Cierre temporal automático."
    )
    asyncio.run(serve(args))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
