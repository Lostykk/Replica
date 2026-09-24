# Comandos y alcance de los gates

En PowerShell ejecutar primero `. ./scripts/activate.ps1` desde la raíz.

| Gate | Comando exacto | Qué demuestra |
| --- | --- | --- |
| Fase 0 local | `pnpm qa:phase0` | Estructura, integridad del prompt, siete skills, exclusión de secretos y hooks |
| Tipado | `pnpm typecheck` | Contratos TypeScript actuales, modo estricto |
| Lint | `pnpm lint` | Scripts de infraestructura actuales; TypeScript se comprueba además con typecheck |
| Lógica | `pnpm test` | Rechazo de destinos de desarrollo inseguros |
| Navegadores | `pnpm qa:browsers` | Lanzamiento e interacción real en Chromium, Firefox y WebKit |
| Secretos preparados | `pnpm secrets:staged` | Contenido del índice de Git, escaneado por Gitleaks |
| Secretos históricos | `pnpm secrets:history` | Historia que se pretende publicar |
| CLI Supabase | `pnpm exec supabase --version` | CLI ejecutable |
| Docker | `docker version` | Cliente y servidor Linux disponibles |
| Python | `uv sync --project apps/agent --frozen` | Entorno Python reproducible |

El smoke test de navegadores no valida el diseño ni sustituye iOS Safari físico. No se generaron pantallas del producto en Fase 0.

Desde Fase 2 se añadirá la suite visual del frontend conectado a Lovable, con cuatro combinaciones de viewport/tema por pantalla y WebKit; solo entonces se documentará el comando de esa suite. RLS corresponde a Fase 3, benchmark real a Fase 1/6 y resistencia a Fase 12. No hay gates falsos que aprueben esas fases.

Ninguna fase se etiqueta completa con un gate obligatorio pendiente. Registrar comando, resultado, fecha y limitaciones en docs/evidence y PROGRESS.md.
