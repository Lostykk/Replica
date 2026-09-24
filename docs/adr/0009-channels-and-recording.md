# ADR-0009 — canales y grabación

Twilio SIP + LiveKit para teléfonos propios verificados; tarifa por destino/carrier y número, sin aplicar precios de Programmable Voice a Elastic SIP. Recall output media como candidato Meet/Zoom: puente bidireccional de audio, video del avatar y webhooks de presencia. Zoom SDK Linux queda como alternativa más costosa de operar y limitada a Zoom.

Grabación por LiveKit Egress a bucket privado Supabase con compatibilidad S3 validada en staging. Recall no incorpora el video del propio bot a su grabación; no depender de ese archivo para el compuesto. Retención, consentimiento y borrado real por llamada.

Flags apagados hasta cuentas, tarifas y pruebas reales. Referencias en architecture.md y provider-matrix.md.
