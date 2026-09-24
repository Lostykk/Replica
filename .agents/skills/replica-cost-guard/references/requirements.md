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

## 13. SISTEMA DE FEEDBACK → PANEL DEL OWNER ("Radar de Mejoras")

**Captura:**
- Después de cada llamada, una micro-encuesta de 3 toques: realismo (1–10), utilidad de la devolución (1–10) y "¿Qué te gustó?" / "¿Qué mejorarías?" / "¿Qué aplicarías en tus llamadas reales?", con respuesta escrita o por NOTA DE VOZ (que se transcribe).
- Marcador de "acá se notó que era IA" en la línea de tiempo.
- Botón flotante "Sugerir mejora" en toda la app, con captura de pantalla automática.
- NPS cada 14 días de uso.
- Señales automáticas: llamadas cortadas en menos de 60 segundos, picos de latencia, degradación de latencia en llamadas largas, fallas de avatar y fallbacks a voz, reconexiones de proveedores, bots que no pudieron entrar, errores de permisos de micrófono y abandono del onboarding.

**Procesamiento** (job diario por pg_cron + botón "Actualizar ahora"):
- Agrupar todo en temas con un LLM. Por tema: título, resumen, cantidad de menciones, usuarios afectados, severidad, segmento (closer, academia o empresa), 3 citas textuales representativas, causa probable, solución sugerida y esfuerzo estimado.
- Priorización automática con una fórmula de impacto × frecuencia ÷ esfuerzo, editable.

**Panel del Owner:**
- "Radar de Mejoras": ranking de temas con estado (nuevo, en progreso, resuelto, descartado) y tendencia semana contra semana.
- Botón "Copiar brief de mejora" en cada tema: genera un bloque en markdown listo para pegar en otra IA de desarrollo, con contexto del producto, problema, evidencia (métricas y citas), archivos o módulos probablemente involucrados, solución propuesta y criterios de aceptación.
- Botón "Brief semanal completo": los 5 temas prioritarios en un solo bloque copiable.
- Métricas de producto: registrados, activos diarios y semanales, llamadas por día, minutos por canal, duración promedio de llamada, realismo promedio y su tendencia, utilidad promedio, retención a 7 y 30 días, industrias más usadas y top escenarios.
- Métricas de calidad: latencia p50/p95 por proveedor y por tramo de la llamada (minuto 0–30, 30–60, 60–90), tasa de fallback a voz y tasa de reconexiones.
- **FINANZAS:**
  - Costo real por llamada, desglosado: STT, LLM (por tarea), TTS, avatar, telefonía, bot de reunión y grabación.
  - Costo promedio por minuto por canal y por proveedor.
  - Costo de adquisición por usuario gratis (su Llamada Completa + prácticas).
  - Presupuesto mensual de la beta con alertas al 50%, 80% y 100%. Al llegar al 100%, las nuevas Llamadas Completas pasan automáticamente a waitlist.
  - Consumo proyectado a fin de mes.
  - Margen estimado por plan (con los costos reales medidos), listo para cuando se active la monetización.
- Controles: límites gratuitos, presupuesto de la beta, proveedores por tarea, nivel de avatar por defecto, feature flags (billing, teléfono, Meet/Zoom, video, avatar premium) y waitlist.

---

## 14. MONETIZACIÓN (construida completa, APAGADA por flag)

- Stripe: planes en USD con semilla editable desde admin (Closer Pro mensual, Academia por asiento, Empresa a medida), packs de horas extra y prueba gratuita.
- Cada plan define horas de video y horas de voz incluidas por mes (nunca "ilimitado" en video). Al acabarse: packs extra o paso automático a voz sola.
- Webhooks con verificación de firma e idempotencia.
- Todo consumo queda en `usage_ledger` (minutos por canal y costo real por proveedor), así el owner conoce el margen por plan antes de activarlo.

---

## 16. AJUSTES DE COSTO (resumen operativo)

- El avatar y el bot se crean y se facturan SOLO cuando el usuario ya está en la sala, y se cierran al colgar o por inactividad (ver 6.4).
- Configurar en cada proveedor la duración máxima de sesión en ≥ 95 minutos y el tiempo máximo de inactividad acorde.
- Cada componente de costo de cada llamada se registra en `call_cost_items` y en `usage_ledger`.
- Al 100% del presupuesto mensual de la beta, las nuevas Llamadas Completas pasan a waitlist automáticamente.

---
