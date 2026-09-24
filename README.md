# Réplica

Simulador de entrenamiento comercial con prospectos de IA por voz y video.

Estado y evidencia: [docs/PROGRESS.md](docs/PROGRESS.md). Requisitos completos: [docs/PROMPT_MAESTRO.md](docs/PROMPT_MAESTRO.md).

En PowerShell, desde la raíz, ejecutar `. ./scripts/activate.ps1` y después `pnpm install --frozen-lockfile`.

La Fase 0 prepara el entorno. No existe todavía una aplicación funcional ni un despliegue.

- `apps/web`: checkout independiente de Lovable; se conectará cuando el owner proporcione el repositorio creado por Lovable.
- `apps/agent`: worker Python persistente.
- `apps/meeting-bot-page`: salida audiovisual de bots de reunión.
- `packages/shared`: contratos TypeScript y Zod.
- `supabase`: configuración local, migraciones y funciones.
- `.agents/skills`: reglas del proyecto y skills oficiales auditadas.

Ver [docs/SETUP.md](docs/SETUP.md) para verificaciones y [docs/OWNER_ACTIONS.md](docs/OWNER_ACTIONS.md) para accesos pendientes.
