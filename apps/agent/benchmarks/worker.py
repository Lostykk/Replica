"""Ten-minute provider experiment; not the production Humanity Engine."""

import asyncio
import json
import os
import time
from pathlib import Path

import aiohttp
from livekit import agents
from livekit.agents import Agent, AgentServer, AgentSession, cli
from livekit.plugins import cartesia, deepgram, openai, silero, simli, tavus

server = AgentServer()


@server.rtc_session(agent_name="replica-benchmark")
async def entrypoint(ctx: agents.JobContext):
    output = Path(os.environ["BENCHMARK_OUTPUT"])
    output.mkdir(parents=True, exist_ok=True)

    def event(kind, **values):
        with (output / "worker.jsonl").open("a", encoding="utf-8") as stream:
            stream.write(
                json.dumps({"kind": kind, "monotonic": time.monotonic(), **values})
                + "\n"
            )

    await ctx.connect()
    await asyncio.wait_for(ctx.wait_for_participant(identity="benchmark-owner"), 60)
    locale = os.environ["BENCHMARK_LOCALE"]
    provider = os.environ["BENCHMARK_PROVIDER"]
    voice = os.environ[
        "CARTESIA_VOICE_AR" if locale == "es-AR" else "CARTESIA_VOICE_MX"
    ]
    session = AgentSession(
        stt=deepgram.STT(model="nova-3", language="es-419"),
        llm=openai.LLM(
            model=os.environ.get("DIALOGUE_MODEL", "gpt-6-luna"),
            reasoning_effort="none",
            max_completion_tokens=220,
        ),
        tts=cartesia.TTS(
            model=os.environ.get("TTS_MODEL", "sonic-3"), language="es", voice=voice
        ),
        vad=silero.VAD.load(),
    )
    if provider == "simli":
        avatar = simli.AvatarSession(
            simli_config=simli.SimliConfig(
                api_key=os.environ["SIMLI_API_KEY"],
                face_id=os.environ["SIMLI_FACE_ID"],
                max_session_length=720,
                max_idle_time=240,
            )
        )
    else:
        avatar = tavus.AvatarSession(
            face_id=os.environ["TAVUS_FACE_ID"], pal_id=os.environ["TAVUS_PAL_ID"]
        )

    stopped = asyncio.Event()
    last_voice = time.monotonic()
    warned = False

    @ctx.room.on("participant_disconnected")
    def participant_left(participant):
        if participant.identity == "benchmark-owner":
            stopped.set()

    @session.on("close")
    def session_closed(_event):
        stopped.set()

    @session.on("metrics_collected")
    def metrics_collected(ev):
        event("metrics", metrics=ev.metrics.model_dump(mode="json"))

    @session.on("user_state_changed")
    def user_state_changed(ev):
        nonlocal last_voice
        if ev.new_state == "speaking":
            last_voice = time.monotonic()
        event("user_state", state=ev.new_state)

    @session.on("agent_state_changed")
    def agent_state_changed(ev):
        nonlocal last_voice
        if ev.new_state == "speaking" and not warned:
            last_voice = time.monotonic()
        event("agent_state", state=ev.new_state)

    accent = (
        "rioplatense argentino, con voseo natural"
        if locale == "es-AR"
        else "mexicano, con tuteo natural"
    )
    instructions = (
        f"Simulación consentida de ventas. Interpretás a Alex, prospecto ficticio con español {accent}. "
        "Si preguntan si sos IA, explicá brevemente que es una simulación y continuá si desean. "
        "Tenés una pyme de ocho personas y evaluás un CRM de USD120 por mes. Mala experiencia: "
        "pagaste capacitación que tu equipo no pudo usar. Tu objeción visible es precio; la real es "
        "adopción. No compres por insistencia, pedí evidencia y onboarding. Respuestas de una o dos "
        "frases, variadas, con pausas y emoción moderada. No exageres muletillas. Recordá nombres, "
        "montos y contradicciones. Si piden pausar o están angustiados, ofrecé terminar."
    )
    try:
        event("avatar_start_requested", provider=provider)
        await asyncio.wait_for(avatar.start(session, room=ctx.room), 45)
        if avatar.conversation_id:
            (output / "provider-session.json").write_text(
                json.dumps(
                    {
                        "provider": provider,
                        "session_id": avatar.conversation_id,
                    }
                ),
                encoding="utf-8",
            )
        await avatar.wait_for_join(timeout=45)
        await session.start(room=ctx.room, agent=Agent(instructions=instructions))
        started = time.monotonic()
        event("active", provider=provider, locale=locale)
        await session.generate_reply(
            instructions="Saludá en una frase y preguntá qué querían contarte del CRM."
        )
        warned = False
        while not stopped.is_set() and time.monotonic() - started < 600:
            idle = time.monotonic() - last_voice
            if idle >= 240:
                event("idle_timeout")
                break
            if idle >= 180 and not warned:
                warned = True
                await session.say("Si no seguimos, la prueba termina en un minuto.")
            elif idle < 180:
                warned = False
            try:
                await asyncio.wait_for(stopped.wait(), timeout=1)
            except TimeoutError:
                pass
        event("ended", active_seconds=time.monotonic() - started)
    except Exception as exc:
        event("failure", error_type=type(exc).__name__)
        raise
    finally:
        # Explicit endpoint, not destructive conversation deletion.
        if provider == "tavus" and avatar.conversation_id:
            async with aiohttp.ClientSession(
                timeout=aiohttp.ClientTimeout(total=15)
            ) as http:
                try:
                    async with http.post(
                        f"https://tavusapi.com/v2/conversations/{avatar.conversation_id}/end",
                        headers={"x-api-key": os.environ["TAVUS_API_KEY"]},
                    ) as response:
                        event("provider_end", status=response.status)
                except Exception as exc:  # noqa: BLE001 -- report failure and continue media cleanup
                    event("cleanup_failed", error_type=type(exc).__name__)
        try:
            await asyncio.wait_for(avatar.aclose(), 15)
        finally:
            await session.aclose()
            (output / "finished").write_text("closed", encoding="utf-8")
            ctx.shutdown(reason="benchmark finished")


if __name__ == "__main__":
    cli.run_app(server)
