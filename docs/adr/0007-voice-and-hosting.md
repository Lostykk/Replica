# ADR-0007 — voz modular y worker Python

Estado: elección provisional para benchmark; aprobación React19 ya separada en ADR-0002.

Usar Python LiveKit Agents1.8 con plugins fijados por uv.lock; Simli dispone de plugin Python. Deepgram Nova-3 es-419, diálogo/emoción/memoria GPT-6 Luna y Cartesia con voz de catálogo. Evaluar ElevenLabs y Flux ante errores de acento o turnos. GPT-6 Sol para análisis posterior. No activar speech-to-speech como canal principal sin demostrar continuidad90min.

Railway mantiene el worker persistente y permite controlar memoria/reconexión y trabajos asíncronos. LiveKit Cloud aloja transporte; hosting de agentes LiveKit se evaluará si su latencia/operación compensa0,01/min. Comparar regiones por medición, no por distancia de mapa. No desplegar recursos pagos aún.

Las claves son de servidor; modelos y tarifas se versionan por llamada. El benchmark de10min no implementa el Motor de Humanidad completo de Fase6 ni acredita90min. Fuentes y alternativas en provider-matrix.md.
