# Réplica: instrucciones de trabajo

Leer docs/PROMPT_MAESTRO.md completo y docs/PROGRESS.md al retomar. La solicitud actual del usuario prevalece sobre los checkpoints del documento.

Todo el trabajo del producto vive aquí. No inspeccionar otros proyectos ni credenciales ajenas. Las herramientas de desarrollo pueden instalarse según la autorización de la sesión.

Aplicar las skills de .agents/skills según la tarea:

- Interfaz: replica-design-system; leer íntegra su referencia de sección 15.
- Conversación: replica-humanity-engine y replica-realtime-pipeline.
- Base de datos: replica-supabase-conventions y replica-security.
- Cualquier recurso facturable: replica-cost-guard.
- Cierre de fase: replica-qa-gates.
- Automatización de navegador: skill oficial playwright; las capturas van en docs/screenshots/fase-N según el prompt maestro.
- Revisiones de seguridad solicitadas: security-best-practices.

No saltar fases ni marcar completa una fase sin evidencia. No presentar modelos estimados como mediciones. No crear placeholders en rutas de producción.

Mantener secretos fuera de Git y del frontend; .env.example solo con valores vacíos/públicos. Validar RLS por usuario y organización. Flags de billing, teléfono y reuniones apagados inicialmente.

El frontend vive en un repositorio de Lovable dentro de apps/web (ADR-0002). No inicializar allí otra aplicación antes de recibir el repo conectado.

Actualizar PROGRESS.md y OWNER_ACTIONS.md antes de detenerse. Hacer commits convencionales y ejecutar el escaneo de secretos antes de publicar.
