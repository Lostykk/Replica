# Acciones del owner

No pegar secretos en el chat. Usar login oficial o archivos .env.local ignorados por Git. No es necesario contratar todos los servicios ahora.

## Prioridad 0 — estado de la integración

- Lovable/GitHub: RESUELTO; el owner confirmó https://github.com/Lostykk/Replica.git como repositorio único. Frontend recibido de origin/main 0b6c8a5, integrado en la raíz sin submódulo.
- Memoria local: para desarrollar con Supabase en esta computadora, cerrar por cuenta propia aplicaciones/entornos que no se usen; se midieron unos 100 MiB libres. El control de servicios ya pasó en CI efímero sin tocar otros proyectos; falta verificar el stack en el escritorio cuando haya memoria suficiente.

## Prioridad 1 — arquitectura y pruebas de Fases 1 a 5

- Supabase: crear o elegir un proyecto de staging; ejecutar `pnpm exec supabase login` y compartir el project ref, no el token; mantener producción separada.
- LiveKit Cloud: crear o elegir un proyecto de desarrollo; ejecutar `lk cloud auth`; guardar URL, API key y secret solo en apps/agent/.env.local.
- LLM: habilitar acceso API en la cuenta del proveedor elegido y guardar la clave en apps/agent/.env.local; una suscripción de chat no acredita acceso API.
- Deepgram: habilitar cuenta/proyecto de prueba y cargar DEEPGRAM_API_KEY en apps/agent/.env.local para medir STT español.
- Cartesia o ElevenLabs: habilitar cuenta de prueba y voz de stock con licencia; cargar su clave en apps/agent/.env.local para comparar TTS.
- Simli: habilitar acceso API de desarrollo y elegir un avatar de stock; cargar clave e identificador del avatar en apps/agent/.env.local.
- Tavus: habilitar API de desarrollo y avatar de stock para referencia premium; cargar clave e identificadores en apps/agent/.env.local.
- HeyGen LiveAvatar: activar acceso de prueba Lite solo si entra en la comparación o respaldo; no hace falta contratarlo antes de revisar la matriz.
- Presupuesto de benchmark: fijar un máximo en USD y autorizarlo antes de cualquier llamada facturable; no se asume autorización de gasto.
- Railway: sesión iniciada verificada; elegir proyecto de staging y revisar cargos antes de desplegar el worker persistente.
- Correo Auth: elegir proveedor SMTP y dominio del remitente para magic links en staging; configurar credenciales únicamente en Supabase.
- Google OAuth: crear cliente de desarrollo para acceso Google y configurar los redirect URI verificados cuando exista la URL de staging.

## Prioridad 2 — Fases 6 a 9

- Sentry: crear proyecto web y proyecto worker; compartir DSN público cuando corresponda y guardar el token de despliegue solo en servidor/CI.
- Twilio: iniciar sesión con `pnpm exec twilio login`, completar verificaciones del proveedor y aprobar explícitamente compra de número, Verify y SIP antes de generar cargos.
- Teléfono personal: completar OTP dentro de la aplicación cuando esté implementado; jamás compartir códigos OTP aquí ni usar números de terceros.
- Recall.ai: habilitar cuenta de desarrollo y output media para bots; guardar RECALL_API_KEY en el servidor y autorizar presupuesto de pruebas.
- Google Calendar: habilitar API y consentimiento OAuth con permisos mínimos para calendario del propio usuario; completar el consentimiento interactivo.
- Google Meet y Zoom: proporcionar reuniones propias de prueba y admitir al bot cuando sea necesario; no enviar bots a reuniones ajenas.
- Zoom SDK alternativo: registrar la app únicamente si el servicio de bots no cumple las pruebas; revisar requisitos vigentes antes de elegir esta ruta.

## Prioridad 3 — Fases 10 a 12 y lanzamiento

- Stripe: crear o elegir cuenta, usar `stripe login` en sandbox/test y guardar claves/webhook de prueba; billing permanece apagado.
- Beta: decidir presupuesto mensual y límites; revisar las alertas al 50/80/100% antes de habilitar usuarios externos.
- Dispositivos: hacer una llamada de 10 minutos y aportar evaluación humana; probar iPhone Safari y Android Chrome físicos.
- Dominio: elegir dominio y aprobar cualquier compra; configurar DNS después de preparar el despliegue revisable.
- Producción: confirmar despliegue, proveedores y presupuesto; activar billing, teléfono y reuniones por separado solo cuando se solicite.

## Estado

No se crearon cuentas, no se contrataron planes y no se ejecutaron llamadas pagas. Los accesos de proveedores todavía no están verificados.

El arranque de Supabase de Réplica en la computadora se canceló antes de crear contenedores, al constatar presión de memoria. Las imágenes descargadas quedan disponibles para reintentar; el MCP de escritorio sigue deshabilitado hasta iniciar el stack correcto. El workflow verifica un stack local independiente en el runner; no sustituye una medición de RAM o funcionamiento del escritorio.

## Acción inmediata para continuar Fase 1

La Fase0 ya está integrada en main y pasó CI (run35944864815). React19 está aprobado. No hay ninguna acción pendiente en Lovable para esta fase.

1. En apps/agent/.env.local completar LIVEKIT_URL/API_KEY/API_SECRET, OPENAI_API_KEY, DEEPGRAM_API_KEY, CARTESIA_API_KEY, CARTESIA_VOICE_AR/MX, SIMLI_API_KEY/FACE_ID, TAVUS_API_KEY/FACE_ID/PAL_ID. El archivo privado ya está creado, con claves vacías y modelos públicos; conservar esos modelos y no sobrescribir claves existentes. No compartir los valores en chat.
2. Confirmar que caras y voces son stock con licencia y establecer BENCHMARK_STOCK_ASSETS_CONFIRMED=true. Tavus PAL echo+LiveKit. No clonar caras/voces.
3. Confirmar precio efectivo Simli/min y límite≥95min para futura llamada larga. Para benchmark usar un plan/trial Tavus de≥12min continuos; Free/Starter5min no alcanza. No se autoriza ni se compra automáticamente Builder59USD o Growth397USD.
4. Autorizar presupuesto de consumo variable; propuesta de hasta 10 USD para cuatro pruebas de 10 min, condicionada a tarifa y cuentas. No es una garantía de que las cuatro entren en ese monto: recalcular con las tarifas efectivas y reducir o detener ensayos antes de excederlo. Suscripciones aparte. Configurar hard caps en cada proveedor, porque el argumento de presupuesto del script no controla su facturación externa.
5. Liberar memoria cerrando lo que el owner elija y participar con micrófono/auriculares en las cuatro pruebas. Medir labios/expresiones requiere evaluación humana; el código y la planilla ya están preparados.

El ensayo local no necesita todavía Supabase cloud, Railway deploy, Twilio, Recall ni Stripe. Esas cuentas siguen listadas arriba para sus fases posteriores.
