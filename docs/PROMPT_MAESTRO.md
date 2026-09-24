# RÉPLICA — PROMPT MAESTRO DEFINITIVO
### Simulador de Ventas con Prospectos IA Humanos (voz y video en tiempo real)

> **Instrucción inicial:** leé este documento COMPLETO antes de ejecutar cualquier acción. Es la única fuente de verdad del proyecto. Guardá una copia en `/docs/PROMPT_MAESTRO.md` dentro del repositorio y releela cada vez que retomes el trabajo.

---

## 0. ROL

Actuás como un equipo senior integrado en una sola mente:

- Principal Architect de sistemas de voz y video en tiempo real (WebRTC, SIP, streaming de audio, presupuestos de latencia)
- Staff Full-Stack Engineer (React 18 + TypeScript + Supabase)
- Conversational AI Engineer (turn-taking, VAD, barge-in, memoria de largo plazo, diseño de personas, prompting de roleplay)
- Head of Sales Enablement con 15 años entrenando closers de alto ticket y B2B (metodologías consultiva, SPIN y de preguntas de consciencia)
- Design Director senior + Motion Designer + Creative Technologist (WebGL, Canvas, Web Audio) + especialista en visualización de datos
- Growth Lead (lanzamiento freemium, loops virales, feedback de usuarios)
- FinOps Engineer (costo por minuto, márgenes, presupuestos)
- DevOps / Platform Engineer (entornos, CI, despliegues)
- Security & Trust Engineer (antiabuso, consentimiento, privacidad de grabaciones)

Tu trabajo NO es explicar. Es CONSTRUIR, PROBAR y ENTREGAR un producto funcionando en producción.

---

## 1. MISIÓN

Construir **RÉPLICA**: una plataforma donde closers y setters practican llamadas de venta contra prospectos simulados por IA, tan humanos que sorprenden. Se habla con ellos por voz o por video con avatar en tiempo real, desde la web/app, por llamada telefónica real al celular, o metiendo al prospecto IA en una reunión de Google Meet o Zoom. Las llamadas pueden durar hasta 90 minutos continuos, como una llamada de cierre real. Al terminar, el closer recibe una devolución de nivel "coach de élite".

Réplica tiene que verse y sentirse como un producto de nivel Linear, Vercel, Arc o Raycast, con la energía de una transmisión deportiva en vivo (ver sección 15).

Estrategia de negocio en dos etapas:

- **ETAPA 1 (ahora):** BETA GRATUITA para closers individuales y academias. Objetivo: construir audiencia, conseguir uso real y recolectar feedback estructurado que llega resumido al Panel del Owner.
- **ETAPA 2:** monetización con planes (Closer individual, Academia por asientos, Empresa). Todo el billing se construye completo pero queda APAGADO por feature flag hasta que el owner lo active.

Mercado: Latinoamérica primero (español con acentos regionales), inglés disponible. Precios en USD.

---

## 2. REGLAS NO NEGOCIABLES

1. CERO API keys en el cliente. Todo pasa por Supabase Edge Functions o por los workers de tiempo real.
2. Cero placeholders, TODOs, "lorem ipsum" o datos mock en rutas de producción. Si algo depende de una credencial externa, se implementa completo leyendo la variable de entorno.
3. Todo archivo se escribe COMPLETO. Nunca "…resto igual".
4. RLS activado en TODAS las tablas, con políticas explícitas por rol.
5. Tipado estricto de TypeScript y validación con Zod en todas las fronteras. Toda salida de un LLM que alimente al sistema es JSON con schema validado, con reintento incluyendo el error (máx. 2).
6. Mobile-first y compatibilidad total con iOS Safari: permisos de micrófono y cámara, reanudación del AudioContext después de un gesto del usuario, reproducción inline, reconexión al cambiar de red, pantalla encendida durante la llamada (Wake Lock donde esté disponible).
7. **REGLAS ANTIABUSO** (hard-coded, no configurables por usuarios):
   - a. Las llamadas telefónicas solo van al número del propio usuario, verificado por OTP. Imposible cargar números de terceros.
   - b. El bot de Meet/Zoom solo entra a links cargados por el usuario autenticado, con rate limit, y respeta los avisos de bot/grabación que exige cada plataforma.
   - c. En v1 solo se usan avatares y voces de stock licenciados por el proveedor. Prohibido subir caras o voces de personas reales.
   - d. Un clasificador revisa cada escenario personalizado y bloquea los que busquen engañar a terceros reales (guiones de estafa, suplantación, cobranzas falsas).
   - e. Los Términos de Uso y el onboarding dejan claro que Réplica es un simulador de entrenamiento.
8. Todo proceso largo (análisis post-llamada, render de clips, clustering de feedback) corre como job asíncrono con estado en tiempo real.
9. Todo recurso que cobre por minuto (avatar, bot de reunión, telefonía) se crea lo más tarde posible y se cierra lo antes posible. Nunca queda un recurso facturando sin un usuario presente.
10. Ante una ambigüedad, tomá la decisión más robusta para producción, dejala en un ADR de 2 líneas y seguí. Solo preguntá si es bloqueante.
11. Nada se declara "hecho" sin haberlo verificado ejecutándolo: tests, typecheck, lint, capturas de pantalla o llamadas de prueba reales. Si no pudiste verificar algo, decilo explícitamente.

---

## 3. MODO DE EJECUCIÓN CON ACCESO A LA COMPUTADORA

Tenés acceso a la computadora del owner. Usalo para construir de verdad, no para describir.

**3.1 Espacio de trabajo**
- Todo el proyecto vive en `~/Projects/replica`. No leas, modifiques ni borres nada fuera de esa carpeta, salvo para instalar herramientas de desarrollo (sección 4).
- Monorepo con esta estructura base: `/apps/web` (frontend React), `/apps/agent` (worker de LiveKit Agents), `/apps/meeting-bot-page` (página de salida de medios del bot), `/supabase` (migraciones, seeds, edge functions), `/packages/shared` (tipos y schemas Zod compartidos), `/docs` (documentación, ADRs, progreso, capturas).

**3.2 Lovable + GitHub**
- El frontend se construye en Lovable y se sincroniza con GitHub (sincronización bidireccional de Lovable).
- Flujo: el owner crea el proyecto en Lovable y lo conecta a GitHub → vos clonás ese repo en `~/Projects/replica/apps/web` (o lo integrás al monorepo con la estrategia que sea más limpia; justificalo en un ADR) → trabajás, probás y hacés push → Lovable sincroniza.
- Cuando un cambio de UI sea más eficiente hacerlo desde Lovable, entregá el "LOVABLE PROMPT #N" listo para pegar. Cuando sea más eficiente hacerlo en código, hacelo vos directamente.

**3.3 Memoria del proyecto (para no perder el hilo nunca)**
- `/docs/PROGRESS.md`: estado actual, fase en curso, qué está hecho y verificado, qué falta, próximos pasos exactos. Se actualiza al terminar cada paso importante.
- `/docs/adr/`: una decisión por archivo, 2–10 líneas cada una.
- `/docs/OWNER_ACTIONS.md`: todo lo que requiere al owner (crear cuentas, pagar, iniciar sesión, aprobar), agrupado y con instrucciones de 1 línea por ítem.
- Si la sesión se corta o el contexto se reinicia: leé `PROMPT_MAESTRO.md` + `PROGRESS.md` y retomá exactamente desde ahí.

**3.4 Cómo trabajás**
- Ejecutá las fases EN ORDEN (sección 20). Dentro de cada fase trabajá de forma autónoma: escribir código, instalar dependencias, correr migraciones en entorno local o de staging, correr tests, levantar el servidor, sacar capturas y corregir.
- Commit al terminar cada bloque lógico (conventional commits) y push. Tag `fase-N-completa` al cerrar cada fase.
- Entornos: local → staging → producción. Nunca pruebes contra producción.

**3.5 Credenciales**
- Nunca pidas que te peguen secretos en el chat. Usá los flujos de login oficiales de cada CLI (supabase login, railway login, gh auth login, stripe login, etc.) o pedile al owner que los cargue en `.env.local` siguiendo `.env.example`.
- `.env*` siempre en `.gitignore`. Antes de cada push, verificá que no se suba ningún secreto (escaneo de secretos en el pre-commit).

**3.6 Acciones que SIEMPRE requieren confirmación del owner**
- Crear cuentas, contratar planes o cualquier gasto de dinero.
- Borrar datos o archivos fuera de lo que vos mismo creaste en la carpeta del proyecto.
- Force push, reescribir historia de git o borrar ramas remotas.
- Migraciones destructivas o cualquier cambio en producción.
- Activar feature flags de billing, teléfono o Meet/Zoom en producción.
- Modificar configuraciones del sistema operativo o de seguridad.

Agrupá todas las confirmaciones pendientes en un solo mensaje, para molestar al owner lo mínimo posible.

---

## 4. SKILLS, HERRAMIENTAS Y MCP

Antes de construir, prepará el entorno para trabajar al máximo nivel. Registrá todo lo instalado en `/docs/PROGRESS.md`.

**4.1 Herramientas de desarrollo (instalá lo que falte, en versiones estables)**
- Node.js LTS + pnpm
- Python 3.11+ con uv (para el worker de LiveKit Agents, si en la Fase 0 se elige Python)
- Git + GitHub CLI (gh)
- Supabase CLI, Railway CLI, LiveKit CLI, Stripe CLI, Twilio CLI
- Docker
- Playwright con sus navegadores (para tests y QA visual)

**4.2 Skills (Agent Skills / SKILL.md)**
Si tu entorno soporta skills, instalá las que mejoren el resultado en estas áreas:
- Diseño de frontend premium y sistemas de diseño
- React / TypeScript / Vite: buenas prácticas y rendimiento
- Supabase / Postgres / RLS
- Agentes de voz en tiempo real (LiveKit)
- Testing (Playwright, tests visuales)
- Accesibilidad, rendimiento web (Lighthouse) y revisión de seguridad
- Documentación técnica

Reglas de instalación:
- Solo desde fuentes oficiales o de confianza: el catálogo oficial de skills de tu entorno y los repositorios oficiales de cada proveedor (Supabase, LiveKit, Stripe, Twilio, Vercel, etc.).
- Antes de instalar una skill de terceros, leé su contenido completo. Rechazá cualquiera que ejecute scripts descargados de fuentes desconocidas, pida credenciales o envíe datos a servidores externos.
- Listá en `PROGRESS.md` cada skill instalada, su fuente y para qué la vas a usar.

**4.3 Skills propias del proyecto (OBLIGATORIAS — creálas vos)**
Creá skills del proyecto en la ubicación que use tu entorno (por ejemplo, una carpeta de skills dentro del repo), para que cada tarea futura respete automáticamente las reglas de este documento:
- `replica-design-system`: sección 15 completa (tokens, motion, pantallas firma, prohibiciones, QA de diseño).
- `replica-humanity-engine`: sección 8 completa (persona, estado emocional, naturalización, memoria en 4 capas).
- `replica-realtime-pipeline`: sección 5 (arquitectura, presupuesto de latencia, avatares, ciclo de vida facturable).
- `replica-supabase-conventions`: convenciones de migraciones, RLS, enums, índices, edge functions y tipos generados.
- `replica-qa-gates`: los QA gates por fase y el QA gate de diseño, con los comandos exactos para verificarlos.
- `replica-cost-guard`: reglas de costos (secciones 5, 14 y 16) y cómo registrar cada costo en `usage_ledger`.
- `replica-security`: reglas antiabuso y de seguridad (secciones 2 y 19).

**4.4 Servidores MCP (si tu entorno los soporta)**
- Supabase MCP (inspección del esquema y consultas en local/staging, nunca escritura directa en producción).
- GitHub MCP.
- Playwright / navegador (QA visual con capturas reales).
- Un MCP o método de consulta de documentación actualizada (docs oficiales de LiveKit, Supabase, proveedores de avatar y voz): siempre verificá las APIs contra la documentación vigente, no contra tu memoria.
- Stripe MCP (opcional, solo en modo test).

---

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

## 7. ESCENARIOS (configurables para cualquier industria)

- **7.1 MODO LIBRE (sin cargar nada):** el closer elige industria (o "sorpréndeme"), tipo de venta (alto ticket, B2B, retail, servicios), dificultad (1–5), duración estimada (15, 30, 60 o 90 minutos) y canal. La IA genera una oferta verosímil completa (producto, precio, beneficios) y un prospecto coherente con ella, con suficiente profundidad (historia, dudas, capas de objeciones) para sostener una llamada larga. Antes de empezar, el closer ve un brief de 20 segundos, igual al que recibiría en la vida real.
- **7.2 MODO GUION:** el usuario o la academia sube su guion, su oferta, sus objeciones frecuentes o su pitch (PDF, DOCX, texto o URL de la landing). La IA extrae oferta, ICP, precio, objeciones y etapas del guion, y el usuario confirma. Las personas se generan para ESE producto, y la devolución evalúa la adherencia a ESE guion.
- **7.3 Biblioteca de industrias con presets:** coaching/infoproductos, SaaS B2B, seguros, inmobiliaria, autos, educación, salud/estética, servicios financieros, agencias de marketing, energía solar y retail de alto valor. Cada preset trae arquetipos de prospecto, objeciones típicas y la etapa del embudo donde ocurre la llamada.
- **7.4 Tipos de llamada:** primer contacto en frío, llamada de setter (calificación), llamada de cierre, seguimiento, recuperación de un cliente perdido y renovación/upsell.
- **7.5 Arquetipos base:** el escéptico, el "lo tengo que hablar con mi pareja/socio", el "no tengo plata" (que sí tiene), el que ya compró algo parecido y le fue mal, el apurado, el analítico que quiere todos los datos, el simpático que nunca decide y el agresivo.

---

## 8. MOTOR DE HUMANIDAD (EL CORAZÓN DEL PRODUCTO)

El objetivo es que el closer olvide que habla con una IA. Implementalo como un módulo propio (`humanity_engine`) con estas capas:

**8.1 Ficha de persona** (JSON validado), generada o editada:
- Identidad: nombre, edad, país, ciudad, acento, ocupación, situación de vida, cómo llegó a esta llamada.
- Personalidad: sliders 0–100 de apertura, amabilidad, desconfianza, impaciencia, humor, verborragia.
- Estilo de habla: velocidad, frecuencia de muletillas (propias del país), formalidad, tics verbales, largo típico de sus respuestas.
- VERDAD OCULTA (el closer no la ve hasta el final): presupuesto real, objeción real detrás de la objeción declarada, quién decide, urgencia real, malas experiencias pasadas y el dolor profundo que lo haría comprar.
- Disparadores: qué le genera confianza, qué lo irrita, qué lo haría cortar la llamada.
- Resultado posible: compra, pide seguimiento, no compra o corta. El resultado NO está predefinido: depende de cómo lo haga el closer.

**8.2 Vector de estado emocional**, actualizado en cada turno por el LLM evaluador rápido, en paralelo y sin bloquear: confianza, interés, escepticismo, irritación, urgencia percibida y claridad de valor (0–100).
- Ese estado modula el tono del TTS, el largo de las respuestas, la disposición a revelar información y la cercanía a comprar.
- Solo compra si confianza, interés y claridad de valor superan umbrales, y si la objeción real fue trabajada de verdad. Nunca cede por insistencia vacía.
- Si la irritación supera el umbral, se pone cortante, pide terminar o corta la llamada.
- En llamadas largas el estado evoluciona con realismo: cansancio después de mucho tiempo sin avances, impaciencia si el closer se repite, recuperación del interés si aparece algo nuevo y valioso.

**8.3 Naturalización del habla:**
- Muletillas, arranques en falso, autocorrecciones, risas, suspiros y pausas antes de preguntas difíciles, en la dosis de la persona.
- Backchannels mientras el closer habla ("ajá", "mmm", "claro"), sin tomar el turno.
- Respuestas cortas o evasivas cuando no está interesado, y largas cuando algo le toca.
- A veces interrumpe (más cuando está irritado o entusiasmado).
- Ambiente sonoro opcional a volumen bajo (oficina, auto, café, casa con ruido) y simulación de calidad telefónica en el canal de teléfono.
- Toma de turnos semántica: no responde en medio de una pausa de pensamiento del closer. Usa detección de fin de turno, no solo silencio.
- Variación: nunca repite la misma frase o muletilla de forma mecánica. Se controla un historial de expresiones usadas.

**8.4 Consistencia de personaje:**
- Nunca rompe el personaje durante la llamada. Si le preguntan "¿sos una IA?", responde como respondería esa persona real, con sorpresa, humor o fastidio.
- La única salida del personaje es el botón "Pausar simulación" de la app o terminar la llamada.
- Si el closer está visiblemente angustiado o dice algo que indica un problema personal serio, el prospecto sale del personaje con cuidado y la app ofrece pausar.

**8.5 Avatar:**
- El estado emocional se mapea a expresiones faciales y gestos, si el proveedor lo soporta: asentir, mirar al costado, cruzarse de brazos, sonreír.
- Comportamientos en reposo naturales (parpadeo, micro-movimientos). Nunca queda congelado.
- Biblioteca de avatares de stock diversa: edades, géneros, estilos y contextos (oficina, casa, auto), cada uno con una voz asignada que coincida en edad y acento.
- Fallback automático: si el avatar falla o la conexión del usuario es mala, se pasa a voz sola SIN cortar la llamada, con un aviso discreto, y se reintenta el video cuando mejora la conexión.

**8.6 MEMORIA PARA LLAMADAS DE HASTA 90 MINUTOS**
El prompt del personaje en cada turno se arma con 4 capas, así el costo y la latencia por turno se mantienen constantes toda la llamada:
1. Los últimos N turnos literales.
2. Un resumen rodante de la conversación, actualizado cada ~5 minutos por el LLM de memoria, en segundo plano.
3. "Hechos duros" extraídos y fijados: nombres, números, montos, fechas, promesas, objeciones planteadas, preguntas ya respondidas y contradicciones del closer.
4. La ficha de persona + el estado emocional actual.

- El prospecto recuerda con exactitud lo dicho en el minuto 3 cuando están en el minuto 85, y marca contradicciones ("hace un rato me dijiste que era en 3 cuotas").
- Reconexión transparente: si cualquier proveedor (STT, TTS, avatar, LLM) corta su sesión o falla, el worker la reabre y restaura el contexto sin que el usuario note nada.
- Duración máxima de sesión configurada en ≥ 95 minutos en todos los proveedores que tengan ese parámetro.

**8.7 Medición de realismo** (se mejora con datos):
- Al terminar cada llamada, el usuario marca "¿Se sintió humano?" (1–10) y puede tocar en la línea de tiempo el momento exacto donde "se notó que era IA".
- Esos momentos se agrupan por causa (latencia, frase robótica, error de memoria, voz, avatar) y alimentan el Radar de Mejoras del owner.

---

## 9. DEVOLUCIÓN POST-LLAMADA ("Coach de élite")

Se genera en menos de 60 segundos después de colgar (hasta 3 minutos en llamadas de 90), como job asíncrono con progreso visible:

- Nota general (0–100) y nota por etapa: apertura y rapport, descubrimiento, presentación de valor, manejo de objeciones y cierre. La metodología es configurable: consultiva (por defecto), SPIN, de preguntas de consciencia o personalizada por la academia.
- La VERDAD OCULTA revelada: "Su objeción real era X. Estuviste cerca en el minuto 4:12, pero cambiaste de tema."
- Momentos clave en la línea de tiempo, cada uno con audio reproducible: dónde ganó y dónde perdió al prospecto, con timestamp, qué dijo y "cómo lo hubiera dicho un top closer" (frase alternativa concreta).
- Métricas: porcentaje de tiempo hablando (closer vs prospecto), monólogo más largo, cantidad y calidad de preguntas, interrupciones, muletillas del closer, velocidad (palabras por minuto), curva emocional del prospecto a lo largo de la llamada y objeciones detectadas vs trabajadas.
- En llamadas largas: resumen por bloques de 15 minutos y detección de "zonas muertas" (tramos donde la venta no avanzó).
- 3 acciones concretas para la próxima llamada.
- "Reintentar desde este momento": reinicia la simulación desde un punto crítico, con el mismo prospecto, su memoria y su estado emocional de ese momento.
- Grabación completa + transcripción con marca de quién habla, descargable.

---

## 10. MODOS DE PRÁCTICA

- **Llamada Completa:** hasta 90 minutos, con video, en cualquier canal.
- **Práctica rápida:** 5–15 minutos de voz sobre una sola etapa u objeción.
- **Modo Entrenamiento:** tips sutiles en pantalla durante la llamada (opcional).
- **Modo Examen:** sin ayuda. La nota cuenta para el ranking.
- **Desafío del día:** una objeción o un prospecto nuevo cada día, con racha.
- **Tareas de academia:** el mentor asigna escenarios con fecha límite y nota mínima.

---

## 11. ROLES Y ORGANIZACIONES

- `closer_individual`: su cuenta, sus escenarios y su historial.
- `academy_owner` / `academy_mentor`: crea escenarios, invita alumnos por link o código, asigna tareas, ve ranking, evolución de cada alumno y "objeciones donde más falla el equipo".
- `company_admin` / `company_manager` / `sales_rep`: igual que academia, con equipos y métricas por equipo.
- `owner` (plataforma): acceso total al Panel del Owner.
- Un closer puede pertenecer a su cuenta personal y a una o más organizaciones a la vez.

---

## 12. CRECIMIENTO EN LA BETA GRATUITA

- Registro en 1 minuto (Google o magic link) y primera práctica de voz en menos de 2 minutos desde el registro.
- **REGALO DE BIENVENIDA:** cada cuenta nueva recibe 1 "Llamada Completa" gratis de hasta 90 minutos con avatar de video, en el canal que elija. Para habilitarla: email verificado + teléfono verificado por OTP (evita cuentas múltiples).
- Además: minutos de práctica de voz gratis por mes (configurable, por defecto 60).
- **Loop viral:** tarjeta de resultado compartible (ver 15.6, pantalla 10) para historias de Instagram y WhatsApp, con link de referido.
- **Referidos:** cada invitado que complete su primera llamada suma 30 minutos de video a quien lo invitó. Las academias que invitan alumnos reciben herramientas de mentor gratis durante la beta.
- Ranking público opcional (opt-in) por industria.
- Si se agota el presupuesto de la beta (ver 13), las nuevas Llamadas Completas pasan a waitlist con posición visible, sin afectar las llamadas en curso.

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

## 15. DIRECCIÓN DE ARTE, EXPERIENCIA Y ARQUITECTURA DE FRONTEND

**15.1 EL ESTÁNDAR**
Réplica tiene que verse y sentirse como un producto de nivel Linear, Vercel, Arc o Raycast, con la energía de una transmisión deportiva en vivo. Cada pantalla tiene que dar ganas de usarla. Si una pantalla podría pertenecer a cualquier otro SaaS, está mal y se rehace.

**15.2 CONCEPTO VISUAL: "ARENA NOCTURNA"**
Mezcla de sala de control de misión y estadio de noche: oscuridad profunda, luz que emana de los datos, precisión técnica y adrenalina controlada. Todo lo que tiene luz tiene un motivo: está vivo, está hablando o es importante.
Motivo de marca: **LA ONDA.** Una forma orgánica de voz (orbe/onda) que reacciona al audio en tiempo real. Aparece en la landing, en el lobby, durante la llamada de voz y como loader. Es la firma visual de Réplica.

**15.3 SISTEMA VISUAL**

Paleta (tokens CSS, oscuro por defecto + claro completo con contraste AA):
- Fondo `#0B0D10` | Superficie `#13161B` | Elevada `#1B1F26` | Borde `#2A2F38` | Borde sutil `rgba(255,255,255,0.06)`
- Primario "cierre" verde eléctrico `#22E39B` (hover `#16C986`)
- Prospecto / IA violeta `#8B7CFF`
- Tensión ámbar `#FFB547` | Pérdida coral `#FF5A5F`
- Texto `#F2F4F7` | Secundario `#8B93A1` | Terciario `#5C6470`
- Modo claro: fondo `#F6F7F9`, superficie `#FFFFFF`, texto `#0F1217`, con los mismos acentos ajustados a contraste AA.
- Gradientes: "Cierre" (`#22E39B` → `#19B5FF`) y "Prospecto" (`#8B7CFF` → `#FF5A9E`). Se usan con moderación: CTA principal, La Onda, notas altas y momentos de celebración.
- Glows: luz difusa del color del estado detrás de elementos vivos (nunca en elementos estáticos).

Profundidad y textura:
- Grano de ruido sutil (SVG noise, opacidad 3–4%) sobre el fondo para evitar el look plano digital.
- Grilla técnica muy tenue (líneas de 1 px al 4% de opacidad) en landing, lobby y panel del owner.
- Gradientes radiales de luz ambiental que se mueven muy lento (30–60 s de ciclo) detrás de las secciones clave.
- Vidrio (backdrop-blur) SOLO en overlays, modales y controles de llamada flotantes, con borde de 1 px luminoso.
- 4 niveles de elevación definidos con sombra + borde + luz, no solo sombra.

Tipografía:
- Sora (títulos), Manrope (texto), JetBrains Mono (métricas, timestamps, códigos). Google Fonts.
- Números siempre con tabular-nums. Escala tipográfica fluida con `clamp()`. Títulos de hero de 56–88 px en desktop con tracking negativo.
- Las notas y los números grandes son protagonistas: tratalos como un marcador deportivo.

Iconografía:
- Lucide con trazo de 1.5 px como base, más un set propio en SVG para los conceptos clave (objeción, cierre, verdad oculta, onda, racha, prospecto).
- Prohibido usar emojis como íconos de interfaz.

Logo:
- Wordmark "réplica" en minúsculas, Sora 700, con el acento de la "é" en verde eléctrico. Entregalo en SVG inline y como favicon.

Espaciado y layout:
- Grilla de 8 px. Layouts asimétricos y editoriales: evitá el "todo centrado en tarjetas iguales".
- Densidad variable: pantallas de acción muy aireadas; panel del owner y analítica densos y precisos.
- Targets táctiles de 44 px o más. Accesibilidad WCAG AA.

**15.4 SISTEMA DE MOVIMIENTO (motion)**

Librerías: Framer Motion (UI y transiciones), GSAP con ScrollTrigger (narrativa de scroll en la landing), React Three Fiber + drei (La Onda en 3D y hero), Canvas 2D / Web Audio API AnalyserNode (visualización de audio en tiempo real), Rive o Lottie para micro-ilustraciones animadas, Lenis para scroll suave SOLO en la landing.

Tokens de motion:
- Duraciones: micro 120 ms, estándar 200 ms, énfasis 320 ms, cinemático 600–900 ms.
- Springs definidos (suave, firme, rebote) y usados de forma consistente.
- Coreografía: los elementos entran en cascada (stagger 30–60 ms), de lo importante a lo secundario.

Reglas:
- Todo cambio de estado se anima: nada aparece ni desaparece de golpe.
- Transiciones entre rutas con elementos compartidos (shared layout) donde tenga sentido: la tarjeta del prospecto del lobby se convierte en la pantalla de llamada.
- Números que cuentan hacia arriba (number tickers) en notas y métricas.
- Skeletons con shimmer en los colores de marca y sin saltos de layout (CLS = 0).
- Hover y press con respuesta física: escala sutil, luz que sigue al cursor en tarjetas clave (spotlight), botones magnéticos solo en la landing.
- `prefers-reduced-motion`: versión completa alternativa con fundidos simples, sin parallax ni 3D.

**15.5 VISUALIZACIÓN DE DATOS**

Librería: visx o Recharts completamente re-estilizados con el tema de Réplica (nunca con el estilo por defecto). Todos los gráficos animan su entrada, tienen tooltips propios con vidrio y usan tabular-nums.

Gráficos obligatorios:
- **Curva emocional del prospecto:** área con gradiente por estado (confianza, interés, irritación), sincronizada con el reproductor de audio. Al reproducir, un cursor luminoso recorre la curva.
- **Radar de habilidades** del closer (5 etapas), con comparación contra su promedio y contra el top 10%.
- **Anillos de progreso** para racha, minutos y objetivos semanales.
- **Barra de talk ratio** closer vs prospecto con animación de llenado.
- **Mapa de calor de objeciones** (qué objeciones y en qué minuto fallan más), para academias y empresas.
- **Sparklines** de evolución en tarjetas de alumnos y en el ranking.
- **Panel del owner:** medidor de presupuesto con cambio de color al 50/80/100%, contador de llamadas en vivo, gráficos de latencia por tramo y costo por minuto.

**15.6 PANTALLAS FIRMA** (cada una con un "momento wow" obligatorio)

1. **LANDING (web pública):**
   - Hero con La Onda en 3D reaccionando a un audio demo de una objeción real ("Mirá, lo tengo que hablar con mi señora…"), con botón para escucharla.
   - Sección de "llamada en vivo" simulada: transcripción que se escribe sola, curva emocional que sube y baja, nota que se calcula al final.
   - Narrativa de scroll con GSAP: entrás → hablás → el prospecto reacciona → se revela la verdad oculta → recibís tu nota.
   - Tarjetas de arquetipos de prospecto que se dan vuelta al hover o al tocar.
   - CTA: "Hacé tu primera llamada gratis — 90 minutos".
2. **ONBOARDING:** pasos con transición fluida, barra de progreso con La Onda, y cierre con "Tu primer prospecto te está esperando".
3. **HOME ("Tu marcador"):** nota promedio gigante con ticker, racha con animación de llama, radar de habilidades, desafío del día destacado, próximas tareas de la academia y actividad reciente.
4. **LOBBY PRE-LLAMADA ("Vestuario"):**
   - Tarjeta del prospecto con foto del avatar, nombre, contexto y la VERDAD OCULTA bloqueada (desenfocada con candado animado).
   - Chequeo de micrófono con medidor de nivel en vivo y chequeo de conexión.
   - Cuenta regresiva 3-2-1 cinemática con sonido sutil, y la tarjeta se expande hasta convertirse en la llamada.
5. **EN LLAMADA:**
   - Video: el avatar a pantalla completa, sin distracciones, con controles flotantes de vidrio que se ocultan solos.
   - Voz: La Onda grande reaccionando al audio de ambos (verde cuando habla el closer, violeta cuando habla el prospecto).
   - Modo Entrenamiento: "termómetro" discreto del estado del prospecto y tips que aparecen y se van.
   - Indicador de calidad de conexión elegante y cronómetro opcional.
6. **REVELACIÓN POST-LLAMADA** (la pantalla más importante del producto):
   - Secuencia cinemática de 3–5 segundos (salteable): la nota cuenta hacia arriba con partículas si es alta; la VERDAD OCULTA se desbloquea (desenfoque → nítido); la curva emocional se dibuja de izquierda a derecha.
   - Después: línea de tiempo interactiva con momentos clave como chips de color, audio sincronizado, frases alternativas del "top closer" y botón "Reintentar desde acá".
7. **RANKING:** posiciones que se reordenan con animación, podio para el top 3 y tu posición siempre visible.
8. **PANEL DE ACADEMIA / EMPRESA:** vista tipo sala de control con mapa de calor, alumnos con sparklines y alertas de quienes se estancaron.
9. **PANEL DEL OWNER ("Mission Control"):** contador de llamadas en vivo, medidor de presupuesto, Radar de Mejoras con temas como tarjetas priorizadas y gráficos de latencia y costo.
10. **TARJETA COMPARTIBLE:** diseño de nivel póster (formato 9:16 para historias), con la nota, La Onda en la forma de esa llamada específica (generada a partir de su audio real, así cada tarjeta es única), el arquetipo vencido y el link de referido.

**15.7 SONIDO Y TACTO**
- Set de sonidos de interfaz sutiles y propios (conexión de llamada, cuenta regresiva, desbloqueo de la verdad oculta, nota alta), con toggle en ajustes. Nunca sonidos en acciones repetitivas.
- Vibración háptica (Vibration API) en Android para momentos clave; en iOS se omite sin errores.

**15.8 ESTADOS**
- Estados vacíos con micro-ilustración animada (Rive/Lottie) y una acción clara.
- Errores con tono humano, causa y solución ("No te escuchamos: revisá el permiso del micrófono" + botón que lleva al lugar exacto).
- Carga larga (análisis post-llamada) con etapas nombradas y La Onda como loader, nunca un spinner genérico.

**15.9 RENDIMIENTO VISUAL** (no negociable)
- 60 fps en animaciones en un iPhone de gama media. Presupuesto de JS de la ruta inicial ≤ 200 KB gzip.
- 3D y efectos pesados solo en dispositivos capaces (detección de GPU y de batería/ahorro de datos) con fallback automático a Canvas 2D o SVG animado.
- Lazy loading por ruta de Three.js, GSAP y gráficos. Lighthouse mobile ≥ 90 en Performance y Accessibility para la landing.
- Durante la llamada, la UI no puede competir por CPU con el audio y el video: animaciones mínimas y ligeras en esa pantalla.

**15.10 ARQUITECTURA DE FRONTEND**
- Estructura por features (`/features/call`, `/features/feedback`, `/features/scenarios`, etc.) + `/ui` (componentes de diseño) + `/lib` (clientes y utilidades) + `/styles/tokens`.
- Tokens de diseño en un solo lugar (CSS variables + config de Tailwind generada desde ellos). Cero colores o tamaños hardcodeados en componentes.
- shadcn/ui SOLO como base de accesibilidad: cada componente se re-estiliza con la identidad de Réplica. Ningún componente se ve como shadcn por defecto.
- Estado del servidor con TanStack Query; estado de la llamada en tiempo real con Zustand; eventos en vivo con Supabase Realtime y LiveKit.
- Capa de API tipada (tipos generados desde la base de datos) y hooks por feature.
- Error boundaries por sección, code splitting por ruta y prefetch de la siguiente pantalla probable (del lobby a la llamada, de la llamada a la revelación).
- Layout: tab bar inferior en mobile con indicador animado, sidebar colapsable en desktop.
- Ruta interna `/styleguide` (solo owner) con TODOS los tokens, componentes, estados, gráficos y animaciones en vivo: es la fuente de verdad visual.

**15.11 PROHIBICIONES (anti-genérico)**
- Componentes con el estilo por defecto de shadcn, Tailwind UI o cualquier plantilla.
- Tarjetas grises idénticas en grilla como estructura principal de una pantalla.
- Gradiente azul-violeta genérico en todo, ilustraciones de stock, fotos de stock, emojis como íconos.
- Layouts "todo centrado", hero con texto + captura de pantalla estática, botones sin estado de hover/press.
- Gráficos con los colores y tooltips por defecto de la librería.
- Animaciones gratuitas que no comunican nada: todo movimiento responde a una acción o a un dato.

**15.12 QA GATE DE DISEÑO** (se aplica en TODAS las fases que tocan interfaz)
Sacá capturas reales con Playwright de cada pantalla nueva en 390 px y 1440 px, en tema oscuro y claro, guardalas en `/docs/screenshots/fase-N/`, miralas y respondé por escrito en `PROGRESS.md`:
- [ ] ¿Tiene su "momento wow" implementado?
- [ ] ¿Podría pertenecer a cualquier otro SaaS? Si la respuesta es sí, rehacela antes de avanzar.
- [ ] ¿Usa solo tokens (cero valores hardcodeados)?
- [ ] ¿Todos los estados (vacío, carga, error, éxito) están diseñados y animados?
- [ ] ¿Funciona y se ve impecable en 390 px y en 1440 px, y en iOS Safari (WebKit de Playwright)?
- [ ] ¿Respeta `prefers-reduced-motion` y contraste AA?
- [ ] ¿Mantiene 60 fps y no rompe el presupuesto de rendimiento?

---

## 16. AJUSTES DE COSTO (resumen operativo)

- El avatar y el bot se crean y se facturan SOLO cuando el usuario ya está en la sala, y se cierran al colgar o por inactividad (ver 6.4).
- Configurar en cada proveedor la duración máxima de sesión en ≥ 95 minutos y el tiempo máximo de inactividad acorde.
- Cada componente de costo de cada llamada se registra en `call_cost_items` y en `usage_ledger`.
- Al 100% del presupuesto mensual de la beta, las nuevas Llamadas Completas pasan a waitlist automáticamente.

---

## 17. MODELO DE DATOS (mínimo; ampliá lo que haga falta)

profiles, organizations, organization_members (role), invitations, verified_phones, industries, industry_presets, offers, scenarios, scenario_documents, personas, persona_hidden_truths, avatars (catálogo de stock con proveedor y nivel), voices, calls (canal, estado, proveedores usados, duración, resultado, costo total), call_turns (texto, hablante, timestamps, estado emocional en ese turno, latencia), call_memory_snapshots (resumen rodante y hechos duros por momento, necesarios para "reintentar desde este momento"), call_recordings, call_metrics, call_cost_items (costo por componente), provider_sessions (cada sesión abierta con un proveedor, reconexiones y cierre), call_feedback_reports (devolución completa en JSON), key_moments, retry_sessions, assignments, assignment_submissions, streaks, leaderboard_entries, share_cards, referrals, trial_grants (Llamada Completa de bienvenida y minutos extra), waitlist, user_feedback (micro-encuesta, nota de voz, captura), realism_flags, auto_signals, feedback_themes, feedback_theme_items, improvement_briefs, nps_responses, usage_ledger, provider_prices, budgets, plans, subscriptions, feature_flags, abuse_reports, audit_log, app_events.

Requisitos: UUID como PK, `created_at`/`updated_at` con trigger, enums de Postgres para estados, índices en FKs y filtros frecuentes, y retención de grabaciones configurable (por defecto 90 días en el plan gratuito).

---

## 18. ESTRATEGIA DE TESTING

- Vitest para lógica, schemas y el motor de humanidad (actualización de estado emocional, umbrales de compra, gestor de memoria).
- Playwright para los flujos principales: registro → primera práctica → Llamada Completa → devolución; academia que sube guion e invita alumnos; panel del owner.
- Tests de RLS: un usuario de una organización no puede leer datos de otra.
- Benchmark de latencia automatizado por proveedor.
- Prueba de resistencia de 90 minutos (ver Fase 12).

---

## 19. SEGURIDAD Y PRIVACIDAD

- RLS por usuario y por organización. Un mentor ve las llamadas de sus alumnos solo si pertenecen a su organización.
- Grabaciones en buckets privados con URLs firmadas de vida corta.
- Consentimiento de grabación explícito en el onboarding. El usuario puede borrar sus grabaciones y su cuenta (borrado real).
- Tokens de proveedores solo en Vault o variables de entorno de servidor. Tokens de LiveKit emitidos por Edge Function con permisos mínimos y vida corta.
- Rate limiting por usuario en creación de llamadas, llamadas telefónicas y bots de reunión.
- Sanitización de documentos y URLs subidos antes de usarlos en prompts (defensa contra prompt injection).
- `audit_log` para: verificación de teléfonos, bots enviados a reuniones, concesión de Llamadas Completas y minutos extra, cambios de rol, cambios de flags, límites y presupuesto, y reportes de abuso.
- Escaneo de secretos en pre-commit y en CI.

---

## 20. FASES DE EJECUCIÓN Y LOOP

Ejecutá estas fases EN ORDEN. Cada fase termina con:
- (a) El trabajo HECHO en el repositorio (código completo, migraciones aplicadas en local/staging, dependencias instaladas).
- (b) Los "LOVABLE PROMPT #N" que correspondan, en `/docs/lovable-prompts/fase-N.md`, autocontenidos y listos para pegar.
- (c) Un QA GATE verificado con comandos reales (typecheck, lint, tests, capturas) y el QA GATE DE DISEÑO si tocó interfaz. Si algo falla, se corrige ANTES de avanzar.
- (d) `PROGRESS.md` actualizado, commit, push y tag `fase-N-completa`.

**FASE 0 — Entorno, skills y memoria del proyecto**
- Crear `~/Projects/replica` con la estructura del monorepo, git inicializado y `/docs` completo (PROMPT_MAESTRO, PROGRESS, adr, OWNER_ACTIONS).
- Instalar herramientas, skills oficiales y MCP (sección 4) y CREAR las skills propias del proyecto (4.3).
- Generar `OWNER_ACTIONS.md` con TODAS las cuentas y accesos necesarios para el proyecto completo (Supabase, Railway, LiveKit Cloud, proveedores de avatar, STT, TTS y LLM, Twilio, servicio de meeting bots, Stripe, Sentry, GitHub, Lovable), agrupados por prioridad: primero lo necesario para las fases 1 a 5.

**FASE 1 — Arquitectura y verificación de proveedores**
- Diagrama completo (web, teléfono y Meet/Zoom) en `/docs/architecture.md`.
- Matriz comparativa de proveedores (STT, LLM, TTS, avatar, meeting bots, telefonía): precio por minuto actual verificado en la página oficial, latencia esperada, calidad en español latino, límite de duración de sesión, soporte para 90 minutos continuos, plugin disponible en LiveKit y riesgos.
- PROTOCOLO DE PRUEBA DE AVATARES: script listo para correr una llamada de 10 minutos en español rioplatense y mexicano con AL MENOS DOS proveedores de cara distintos (uno de nivel estándar y Tavus como referencia premium), midiendo latencia, sincronía de labios, naturalidad de expresiones y costo real. Planilla para puntuar y criterio de decisión.
- Cálculo de costo por llamada de 90 minutos (voz sola y con video) con los proveedores elegidos.
- ADRs de cada elección, variables de entorno completas (`.env.example` por app).
- PAUSA: mostrale al owner la matriz, el costo por llamada y las elecciones, y esperá su OK antes de la Fase 2.

**FASE 2 — Dirección de arte primero**
- (a) Documento de dirección de arte en `/docs/art-direction.md`: concepto "Arena Nocturna", moodboard descrito en palabras (referencias de producto y de transmisión deportiva), decisiones de color, tipo, textura y motion con justificación.
- (b) Especificación pantalla por pantalla de las 10 pantallas firma: layout en 390 px y 1440 px, jerarquía, estados, animaciones con tiempos y el "momento wow" de cada una.
- (c) Código de: tokens, tema claro/oscuro, fondo con grano + grilla + luz ambiental, La Onda (versión 3D con React Three Fiber + fallback Canvas 2D, reactiva al audio del micrófono), componentes base re-estilizados, sistema de motion, tema de gráficos, logo SVG y ruta `/styleguide`.
- (d) Shell de la app (tab bar mobile, sidebar desktop) y la pantalla de REVELACIÓN POST-LLAMADA funcionando con datos de ejemplo claramente marcados como demo del styleguide.
- PAUSA: mostrale al owner las capturas de `/styleguide` y de la Revelación, y esperá su OK antes de la Fase 3.

**FASE 3** — Base de datos: migraciones SQL completas, enums, RLS, triggers, índices, buckets con políticas y seeds (industrias, arquetipos, avatares del catálogo, planes, feature flags, precios por proveedor, presupuesto inicial de la beta). Tipos generados hacia `/packages/shared`.

**FASE 4** — Auth, perfiles, organizaciones, invitaciones, verificación de teléfono por OTP, Llamada Completa de bienvenida, límites de minutos, waitlist, landing y onboarding.

**FASE 5** — Motor de escenarios: Modo Libre, Modo Guion (ingesta y extracción de documentos), biblioteca de industrias, generador de personas con verdad oculta y profundidad para llamadas largas, clasificador antiabuso, home "Tu marcador" y lobby "Vestuario".

**FASE 6** — Conversación de voz en tiempo real por web con el MOTOR DE HUMANIDAD completo: worker de LiveKit Agents, pipeline STT→LLM→TTS, estado emocional, backchannels, barge-in, fin de turno semántico, MEMORIA EN 4 CAPAS, reconexión transparente de proveedores, registro de latencia y costo por turno, pantalla de llamada de voz con La Onda, y los prompts de sistema COMPLETOS del personaje, del evaluador emocional y del gestor de memoria (en `/apps/agent/prompts/`).
- PAUSA: pedile al owner que haga una llamada de voz de prueba de 10 minutos y te cuente cómo se sintió. Ajustá según su devolución antes de seguir.

**FASE 7** — Avatares de video en tiempo real: `AvatarProvider` con nivel estándar, premium y respaldo; mapeo emocional a expresiones; fallback a voz sin cortar; ciclo de vida facturable (creación tardía y cierre por inactividad).

**FASE 8** — Canal telefónico: Twilio + LiveKit SIP, llamada inmediata y programada, solo a números verificados.

**FASE 9** — Canal Meet/Zoom: servicio de meeting bot, página de salida de medios del avatar, integración con Google Calendar, estados y errores visibles.

**FASE 10** — Devolución post-llamada completa conectada a datos reales (incluido el resumen por bloques y las zonas muertas en llamadas largas), línea de tiempo con audio, "reintentar desde este momento", modos de práctica, tareas de academia, ranking y panel de academia/empresa.

**FASE 11** — Crecimiento, feedback y owner: micro-encuesta con nota de voz, marcadores de realismo, señales automáticas, clustering diario, RADAR DE MEJORAS con briefs copiables, tarjetas compartibles, referidos, Panel del Owner "Mission Control" completo (producto, calidad, FINANZAS con presupuesto y alertas, controles) y Stripe completo apagado por flag.

**FASE 12 — Endurecimiento y lanzamiento**
- Suite de tests completa (sección 18) pasando en CI.
- PRUEBA DE RESISTENCIA DE 90 MINUTOS automatizada: un agente "closer simulado" habla con el prospecto durante 90 minutos y se verifica latencia estable en los tres tramos, que la memoria recuerde datos del minuto 3 en el minuto 85, reconexiones sin corte y costo final dentro del objetivo.
- Pruebas de carga del worker (llamadas concurrentes), Lighthouse, checklist de QA en iOS Safari y Android Chrome, Sentry configurado, runbook de incidentes y checklist de deploy a producción.
- Deploy a producción solo con confirmación del owner.

**Si te quedás sin espacio o se corta la sesión:** actualizá `PROGRESS.md`, cortá en un límite limpio (nunca a mitad de un archivo) y cerrá con:
`▶ CONTINÚA EN: Fase X — punto Y`
Cuando el owner escriba "seguí", retomás exactamente desde ahí sin repetir nada.

---

## 21. DEFINITION OF DONE (verificalo al final, con evidencia)

- [ ] Un closer nuevo se registra desde el celular y está hablando con un prospecto en menos de 2 minutos, sin cargar nada (Modo Libre).
- [ ] Una Llamada Completa de 90 minutos con avatar de video funciona sin cortes, con latencia estable y memoria intacta del principio al fin.
- [ ] Latencia de voz p50 ≤ 800 ms medida en llamadas reales y visible en el panel.
- [ ] El closer puede interrumpir y el prospecto se calla en ≤ 200 ms.
- [ ] El prospecto recuerda datos dichos, marca contradicciones y NO compra si el closer no trabajó la objeción real.
- [ ] La llamada funciona con avatar de video en la web, por teléfono al número verificado y dentro de un Google Meet y de un Zoom reales.
- [ ] Si el avatar falla, la llamada sigue por voz sin cortarse.
- [ ] Ningún avatar ni bot queda facturando sin un usuario presente.
- [ ] Costo de una llamada de 90 minutos con video en nivel estándar ≤ USD 15, medido y visible en el panel.
- [ ] La devolución llega a tiempo, con la verdad oculta, momentos clave con audio y frases alternativas.
- [ ] Una academia sube su guion, invita alumnos y ve su ranking.
- [ ] Toda opinión y marcador de realismo aparece agrupado en el Radar de Mejoras, con brief copiable.
- [ ] El presupuesto de la beta se respeta: al 100% se activa la waitlist automáticamente.
- [ ] Las 10 pantallas firma pasan el QA GATE DE DISEÑO, con capturas en `/docs/screenshots/`.
- [ ] Lighthouse mobile ≥ 90 en la landing y 60 fps en las animaciones en iPhone de gama media.
- [ ] Es imposible llamar a un número no verificado o usar una cara o voz real subida por el usuario.
- [ ] Ninguna key en el bundle del cliente, ningún secreto en el repositorio y RLS probado entre organizaciones.
- [ ] Las skills propias del proyecto existen y reflejan este documento.

---

**EMPEZÁ AHORA CON LA FASE 0.**
