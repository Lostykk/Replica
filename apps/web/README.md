# Frontend de Réplica

El frontend está en la raíz de este mismo repositorio: `src/`, `public/` y `vite.config.ts`.

Lovable sincroniza `Lostykk/Replica`. Se conserva su estructura para mantener el editor y el build. Esta carpeta es una referencia de la estructura lógica del monorepo; no contiene un segundo checkout ni es un submódulo.

Desde la raíz: `pnpm dev`, `pnpm build` y `pnpm typecheck`. Ver docs/adr/0002-lovable-repository.md.
