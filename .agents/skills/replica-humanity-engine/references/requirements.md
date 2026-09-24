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
