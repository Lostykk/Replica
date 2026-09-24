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
