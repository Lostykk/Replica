# Comandos y alcance de los gates

En PowerShell ejecutar primero `. ./scripts/activate.ps1` desde la raíz.

| Gate | Comando exacto | Qué demuestra |
| --- | --- | --- |
| Fase 0 local | `pnpm qa:phase0` | Estructura, integridad del prompt, siete skills, exclusión de secretos y hooks |
| Tipado | `pnpm typecheck` | Frontend Lovable y contratos compartidos, ambos estrictos |
| Lint | `pnpm lint` | Frontend generado y scripts de infraestructura |
| Lógica | `pnpm test` | Rechazo de destinos de desarrollo inseguros |
| Navegadores | `pnpm qa:browsers` | Lanzamiento e interacción real en Chromium, Firefox y WebKit |
| Secretos preparados | `pnpm secrets:staged` | Contenido del índice de Git, escaneado por Gitleaks |
| Secretos históricos | `pnpm secrets:history` | Historia que se pretende publicar |
| CLI Supabase | `pnpm exec supabase --version` | CLI ejecutable |
| Docker | `docker version` | Cliente y servidor Linux disponibles |
| Python | `uv sync --project apps/agent --frozen` | Entorno Python reproducible |
| Build web | `pnpm build` | Bundle del frontend usando la configuración original de Lovable |
| Integración web | `node scripts/verify-web.mjs` | Navegación de cuatro rutas, sidebar, errores y capturas en 390/1440, oscuro/claro, Chromium/WebKit |
| Backend efímero CI | `pnpm exec node scripts/verify-supabase.mjs` | Contenedores de Réplica, consulta PostgreSQL, Auth/REST y handshake MCP después de supabase start |

El smoke test de navegadores no valida el diseño ni sustituye iOS Safari físico. Las pantallas recibidas de Lovable se verifican como baseline de integración; la dirección de arte, tema claro completo y estados finales siguen siendo entregables de Fase 2.

Desde Fase 2 se añadirá la suite visual del frontend conectado a Lovable, con cuatro combinaciones de viewport/tema por pantalla y WebKit; solo entonces se documentará el comando de esa suite. RLS corresponde a Fase 3, benchmark real a Fase 1/6 y resistencia a Fase 12. No hay gates falsos que aprueben esas fases.

Ninguna fase se etiqueta completa con un gate obligatorio pendiente. Registrar comando, resultado, fecha y limitaciones en docs/evidence y PROGRESS.md.
