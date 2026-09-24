<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Réplica: instrucciones de trabajo

Leer docs/PROMPT_MAESTRO.md completo y docs/PROGRESS.md al retomar. La solicitud actual del usuario prevalece sobre los checkpoints del documento.
Decisión posterior del owner: React 19 es la versión aprobada; no bajar a React 18. Ver ADR-0002.

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

El frontend de Lovable vive en la raíz (src, public y vite.config.ts) dentro del mismo repositorio Lostykk/Replica. No crear un submódulo del propio repo ni mover esas entradas sin verificar Lovable; ver ADR-0002.

Actualizar PROGRESS.md y OWNER_ACTIONS.md antes de detenerse. Hacer commits convencionales y ejecutar el escaneo de secretos antes de publicar.
