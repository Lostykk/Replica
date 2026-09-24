# Benchmark de avatares — protocolo reproducible

Estado: código y pruebas offline; llamadas reales pendientes. No hay puntajes, facturas ni latencias inventadas. Comparación de render: Simli estándar candidato y Tavus echo premium, mismo STT/LLM/TTS y escenario. No implementa todavía el Motor de Humanidad de Fase6.

## Preparación

1. Instalar `pnpm install --frozen-lockfile` y `uv sync --project apps/agent --frozen`. Python3.12, Node24. El lock fija plugins y SDK; ejecutar en una máquina con memoria disponible. Si hace falta, activar `scripts/activate.ps1` para uv.
2. Copiar `apps/agent/.env.example` a `.env.local` y completar SOLO claves propias del proyecto, voces stock AR/MX y caras stock. No pegar secretos en chat ni Git. Confirmar `BENCHMARK_STOCK_ASSETS_CONFIRMED=true` después de revisar catálogo/licencia.
3. Tavus PAL debe usar `pipeline_mode=echo` y transporte LiveKit. Sus claves actuales son TAVUS_FACE_ID/TAVUS_PAL_ID. Plan/trial debe admitir≥12min; Free/Starter de5min no sirve. Configurar su límite de sesión en720s para ensayo si la cuenta lo permite; producto necesitará≥5700s.
4. Confirmar tarifa Simli y presupuesto de consumo. Configurar límite de gasto por cuenta; el script registra autorización, no ofrece un hard cap de facturación. No crea planes ni compra créditos.
5. Auriculares, mismo micrófono/red/dispositivo, pestaña visible y sin otras llamadas. Registrar país, región del worker, RTT y versiones. Rostros comparables de catálogo; no entrenar rostros/voces del usuario.

Preflight offline (no llama a APIs ni muestra secretos):

```powershell
uv run --project apps/agent python apps/agent/benchmarks/run.py --provider simli --locale es-AR
uv run --project apps/agent python apps/agent/benchmarks/run.py --provider tavus --locale es-MX
```

Después de cuentas, presupuesto explícitamente aprobado y disponibilidad real:

```powershell
uv run --project apps/agent python apps/agent/benchmarks/run.py --provider simli --locale es-AR --run --approved-budget-usd 2.5
```

Abrir `http://127.0.0.1:4174`, consentir y conectar. Repetir por separado con es-MX, luego Tavus en ambos acentos, cambiando el presupuesto por ejecución según tarifa. Presupuesto del conjunto sugerido10USD variable, no suscripciones. Alternar orden Simli/Tavus entre acentos para reducir sesgo. Para selección firme, repetir tres veces por combinación:120min totales, con presupuesto nuevo.

La página sirve el SDK local, emite token breve de una sala aleatoria y publica micrófono. El worker espera la presencia del participante antes de crear avatar. Finaliza600s después de estar listo, al colgar o por silencio180+60s. El supervisor cierra la sala si desaparece la pestaña durante20s o supera15min desde el arranque; Tavus recibe además End Conversation. Simli tiene máximo720s como último resguardo. Verificar cierre en dashboard; un error de limpieza es un ensayo fallido. Ctrl+C ejecuta limpieza, pero un corte eléctrico requiere revisar dashboard.

## Guion cronometrado de10min

Escenario común: ofrecer CRM de120USD/mes a Alex, pyme de8personas; objeción visible precio, real adopción tras capacitación fallida. La persona no debe comprar por presión.

| Minuto | Intervención del closer | Observación |
|---|---|---|
| 0–1 | Presentación y pregunta abierta, sin leer rápido | Arranque, idioma, reposo y primera respuesta |
| 1–2 | AR: «Che, ¿cómo vienen llevando los contactos?» MX: «Oye, ¿cómo llevan sus contactos?» | Acento y modismos naturales, no caricatura |
| 2–3 | Decir «120 dólares, tres cuotas y capacitación el15 de octubre» | Números y fonemas labiales; guardar referencia |
| 3–4 | Objeción de precio; esperar respuesta completa | Expresión de duda/escepticismo |
| 4–5 | Pausa reflexiva de1,5s en mitad de frase; dos turnos cortos | Interrupciones falsas y endpointing |
| 5–6 | Explicar onboarding con una mejora concreta | Transición a interés y sonrisa |
| 6–7 | Interrumpir tres veces mientras habla: «Pará, aclaro algo» / «Espera, aclaro algo» | Tiempo hasta silencio real, no solo evento del SDK |
| 7–8 | Cambiar tres cuotas por una; pedir que recuerde la fecha | Memoria y contradicción (solo alcance10min) |
| 8–9 | Frase con «papá, mapa, veinte, febrero» y una pregunta difícil | Labios /p,b,m,f,v/, pausas y sincronía |
| 9–10 | Pedir siguiente paso; agradecer y esperar cierre automático | Consistencia, últimas latencias y cierre facturable |

Intentar≥30turnos por ejecución, tres interrupciones y10segmentos de video anotados. Registrar silencios y errores, no descartarlos del resultado global. Separar respuestas comparables de backchannels.

## Qué se mide y qué no

`worker.jsonl`: métricas reales de SDK (TTFT, TTFB, audio, caracteres y tokens), estados y duración. `browser.json`: audio RMS de micrófono y pista recibida con reloj monotónico del mismo navegador; produce estimación voz-a-voz y barge-in. Umbral0,02, cierre local300ms y remoto100ms; guarda último frame con voz. Validar límites en grabación y calibrar ruido: no confundir RMS con VAD semántico ni con latencia de altavoz medida por hardware. No sumar TTFT+TTFB como si fuese extremo a extremo.

La grabación de la página mezcla ambos audios y video recibido, solo después del consentimiento. Se descarga localmente; no se sube. Marcar defectos y revisar10segmentos cuadro a cuadro: diferencia temporal entre fonema audible y cierre/apertura de boca; anotar offset en ms (negativo=video anticipado). Expresiones y acento requieren puntuación humana ciega con clips A/B. El script no afirma detectar calidad facial automáticamente.

```powershell
uv run --project apps/agent python apps/agent/benchmarks/report.py work/benchmarks/ID_DE_EJECUCION
```

Los resultados sin muestras son `null`, nunca0. Costo real se incorpora con `invoice.json` privado: monedaUSD, `scope` describiendo cobertura, lista `items` con `amount_usd` y `source_reference` por proveedor. Incluir STT/LLM/TTS/render/transporte/hosting/grabación y distinguir crédito gratuito de costo equivalente. Una factura parcial no acredita costo total. El informe nunca aprueba automáticamente el gate de producción.

## Planilla de puntuación (completar por ejecución)

| Campo | Simli AR | Tavus AR | Simli MX | Tavus MX |
|---|---|---|---|---|
| Run ID, fecha, región y dispositivo | pendiente | pendiente | pendiente | pendiente |
| Minutos efectivos y errores | — | — | — | — |
| Voz/video p50/p95 ms, N de turnos | — | — | — | — |
| Barge-in máximo ms, N de pruebas | — | — | — | — |
| Desfase labios mediano/p95 ms, N de segmentos | — | — | — | — |
| Sincronía labios1–10 | — | — | — | — |
| Expresiones/repose1–10 | — | — | — | — |
| Acento AR/MX1–10 | — | — | — | — |
| Realismo global1–10, evaluador ciego | — | — | — | — |
| Costo realUSD y cobertura reconciliada | — | — | — | — |
| Cierre confirmado proveedor/LiveKit | — | — | — | — |

Criterio: ambos acentos, video p50≤1100/p95≤1600ms, barge-in≤200ms validado, labios mediana absoluta≤80ms/p95≤150ms (umbral experimental), sin congelamientos sostenidos>1s, realismo mediano≥7/10. Premium gana≥1punto en realismo sobre estándar sin violar latencia y con costo aprobado. Fallar cualquiera impide selección definitiva. Un ensayo10min no prueba90min: exigir configuración≥95min y resistencia por tramos0–30/30–60/60–90 en Fase12.
