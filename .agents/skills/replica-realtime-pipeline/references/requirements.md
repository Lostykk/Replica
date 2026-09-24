## 5. STACK Y ARQUITECTURA DE TIEMPO REAL

- **Frontend:** React 18 + TypeScript + Vite + Tailwind + shadcn/ui (solo como base, ver 15) + Framer Motion + TanStack Query + Zustand + React Router + Zod. Se construye en Lovable. PWA instalable.
- **Backend de datos:** Supabase (Postgres, Auth, Storage, Realtime, Edge Functions, pg_cron, Vault).
- **Capa de medios en tiempo real:** LiveKit (Cloud) como sala WebRTC donde conviven el usuario, el agente y el avatar.
- **Agente de conversación:** worker con LiveKit Agents desplegado en Railway (o en el hosting de agentes de LiveKit si conviene más; justificalo en un ADR). Es un proceso persistente: las Edge Functions NO sirven para audio en streaming.
- **PIPELINE DE VOZ PRINCIPAL** (por partes, con interfaces intercambiables por proveedor):
  - STT en streaming con parciales, español LATAM y endpointing (candidatos: Deepgram u otro con mejor rendimiento en español).
  - LLM de diálogo rápido para el personaje (baja latencia al primer token).
  - LLM evaluador rápido para el estado emocional (en paralelo).
  - LLM de memoria (resumen rodante y extracción de hechos).
  - LLM potente asíncrono para el análisis post-llamada.
  - TTS en streaming de baja latencia con control emocional y voces con acento regional (candidatos: ElevenLabs, Cartesia).
  - Todos los modelos son configurables por tarea desde el panel del owner.
- NO se usa una única sesión de API speech-to-speech como pipeline principal: varias tienen límites de sesión de 10 a 30 minutos, incompatibles con llamadas de 90. Se puede evaluar como alternativa en la Fase 1 solo si soporta 90 minutos de forma comprobada.
- **AVATARES — arquitectura "cerebro propio + cara intercambiable":** el Motor de Humanidad controla toda la conversación y el avatar SOLO pone cara, expresiones y labios sincronizados con nuestro audio. Interface `AvatarProvider` con adaptadores sobre los plugins de avatar de LiveKit:
  - Nivel ESTÁNDAR (por defecto): render puro o modo "lite" que recibe nuestro audio (candidatos: Simli, HeyGen LiveAvatar en modo Lite).
  - Nivel PREMIUM (flag por plan): proveedor todo-en-uno (candidato: Tavus), solo si en la Fase 1 demuestra una diferencia de realismo que justifique su costo.
  - Proveedor de respaldo configurado para failover.
- **Telefonía:** número de Twilio + SIP trunk hacia LiveKit SIP. Llamadas salientes solo al número verificado del usuario, y entrantes solo desde números verificados.
- **Google Meet / Zoom:** servicio de meeting bots (candidato: Recall.ai con "output media", que renderiza una página web como cámara y micrófono del bot). Esa página se une a la sala LiveKit y muestra el avatar. Para Zoom, dejá documentada como alternativa la ruta del Zoom Meeting SDK Linux.
- **Grabación:** LiveKit Egress (audio + video compuesto) hacia Supabase Storage.
- **Observabilidad:** Sentry + tabla `call_metrics` con la latencia de cada turno y el costo acumulado de cada llamada.

**PRECIOS DE REFERENCIA** (septiembre 2026 — verificalos en la Fase 1 contra las páginas oficiales):
- Tavus: ~USD 0,32–0,37 por minuto de excedente, todo incluido (LLM, TTS, WebRTC). Cobra desde que se crea la conversación, aunque nadie se una.
- HeyGen LiveAvatar: ~USD 0,20/min en modo Full y ~0,10/min en modo Lite (más LLM y voz propios).
- Simli: ~USD 0,009/min, solo render (STT, LLM, TTS y transporte se pagan aparte).
- Pipeline de voz propio (STT + LLM + TTS): estimado USD 0,05–0,12/min; se mide en la Fase 1.
- **Objetivo de costo:** una llamada de 90 minutos con video en nivel estándar ≤ USD 15 todo incluido.

**PRESUPUESTO DE LATENCIA** (se mide y se reporta en cada llamada, y se mantiene estable del minuto 1 al 90):
- Voz a voz (desde que el closer termina de hablar hasta el primer audio del prospecto): p50 ≤ 800 ms, p95 ≤ 1.300 ms.
- Con avatar de video: p50 ≤ 1.100 ms, p95 ≤ 1.600 ms.
- Barge-in (el closer interrumpe): el audio del prospecto se corta en ≤ 200 ms.
- Técnicas obligatorias: streaming en cada etapa, TTS por frases, sonidos de relleno o backchannel inmediatos mientras se genera la respuesta, conexiones precalentadas, prompt de tamaño constante (ver 8.6) y región de despliegue más cercana a LATAM.

---

## 6. CANALES DE LLAMADA

- **6.1 Web/App:** un botón grande "Empezar llamada". Elección de voz sola o video con avatar. Pantalla de llamada minimalista (ver 15.6). Sin texto en pantalla durante la llamada salvo en Modo Entrenamiento.
- **6.2 Teléfono:** "Llamame ahora" o "Programar llamada". El usuario verifica su número por OTP una sola vez. El prospecto llama y se presenta como en una llamada real (por ejemplo, devolviendo un contacto o contestando un seguimiento, según el escenario).
- **6.3 Google Meet / Zoom:** el usuario pega el link o conecta su calendario (Google Calendar) y elige qué reunión. El bot entra con el nombre y la cara del prospecto dentro del tiempo configurado, espera en la sala de espera si existe, habla y escucha en tiempo real. Si no puede entrar, avisa en la app con la causa y la solución.
- **6.4 Ciclo de vida de recursos facturables:** el avatar y el bot se crean recién cuando el usuario está presente en la sala. Se cierran al colgar o por inactividad: más de 3 minutos sin voz de nadie → aviso → cierre a los 60 segundos.
- **6.5 Aviso de tiempo:** a los 80 minutos, el prospecto lo menciona de forma natural si el escenario lo permite ("che, en 10 minutos tengo que cortar"); si no, aparece un aviso discreto en pantalla.

---
