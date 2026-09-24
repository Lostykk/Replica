# Réplica

Simulador de entrenamiento comercial con prospectos de IA por voz y video.

Un único repositorio conectado con [Lovable](https://lovable.dev/projects/6cd4796d-f047-46ff-8276-fccdc797a152): el frontend se mantiene en la raíz para preservar su sincronización y sus comandos de desarrollo. Los servicios y contratos forman el monorepo alrededor de él (ADR-0002).

- `src`, `public`, `vite.config.ts`: frontend generado por Lovable.
- `apps/agent`: worker Python persistente.
- `apps/meeting-bot-page`: futura salida audiovisual de reuniones.
- `packages/shared`: contratos TypeScript y Zod.
- `supabase`: configuración local, migraciones y funciones.
- `docs`: especificación completa, decisiones, evidencia y progreso.

En PowerShell, desde la raíz:

```powershell
. ./scripts/activate.ps1
pnpm install --frozen-lockfile
pnpm dev
```

Ver [PROGRESS.md](docs/PROGRESS.md), [SETUP.md](docs/SETUP.md) y [OWNER_ACTIONS.md](docs/OWNER_ACTIONS.md).

El shell de Lovable todavía no implementa llamadas. Fase 0 valida integración y herramientas; el diseño final y las funciones pertenecen a las fases siguientes.
