## 18. ESTRATEGIA DE TESTING

- Vitest para lógica, schemas y el motor de humanidad (actualización de estado emocional, umbrales de compra, gestor de memoria).
- Playwright para los flujos principales: registro → primera práctica → Llamada Completa → devolución; academia que sube guion e invita alumnos; panel del owner.
- Tests de RLS: un usuario de una organización no puede leer datos de otra.
- Benchmark de latencia automatizado por proveedor.
- Prueba de resistencia de 90 minutos (ver Fase 12).

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
