# Inventario comprobado

Verificado el 2026-09-23; las siguientes herramientas respondieron a su comando de versión.

| Herramienta | Versión | Origen |
| --- | --- | --- |
| Node.js LTS | 24.19.0 | Instalación existente |
| pnpm | 11.17.0 | Instalación existente; fijada por packageManager |
| Python | 3.12.10 | Instalación existente |
| Git | 2.55.0.windows.1 | Instalación existente |
| GitHub CLI | 2.96.0 | Instalación existente; sesión autenticada |
| Railway | 5.45.10 global / 5.59.0 paquete local | Global existente; paquete local fijado |
| Docker Engine | 29.8.0 | Cliente y servidor Linux existentes operativos |
| Docker Desktop | 4.92.0 | Existente |
| Supabase CLI | 2.117.0 | Dependencia del proyecto |
| LiveKit CLI | 2.18.8 | Binario oficial con SHA256 verificado |
| Stripe CLI | 1.51.1 | Binario oficial con SHA256 verificado |
| Twilio CLI | 7.0.0 | Dependencia del proyecto |
| Gitleaks | 8.30.1 | Binario oficial con SHA256 verificado |
| uv | 0.12.18 | Entorno aislado .tools/python |
| PyYAML | 6.0.3 | Entorno aislado; validación de skills |
| Playwright | 1.63.0 | Dependencia del proyecto |

Playwright comprobó interacción real en Chromium 153.0.8010.12, Firefox 155.0 y WebKit 26.6. Ver browsers.json. Su MCP pasó initialize y tools/list; ver playwright-mcp.json.

El primer intento de pip falló en el almacén de certificados de Windows. Se instaló con el backend de certificados incluido en pip (legacy-certs), manteniendo validación TLS activa; no se alteró la seguridad del sistema.

El primer pnpm install bloqueó scripts de dependencias pendientes de autorización. Se revisaron y habilitaron explícitamente los de Railway, Twilio, Supabase y esbuild en allowBuilds; yarn quedó deshabilitado. La instalación posterior pasó.

Un intento de ejecución del compilador nativo TypeScript tuvo un error transitorio de Windows; el reintento funcionó sin cambiar permisos del sistema. La evidencia definitiva de tipado está en checks.json.
