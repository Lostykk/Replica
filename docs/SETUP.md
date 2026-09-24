# Entorno local

Abrir PowerShell en C:/Users/Ignacio/Projects/replica y ejecutar:

```powershell
. ./scripts/activate.ps1
pnpm install --frozen-lockfile
uv sync --project apps/agent --frozen
git config --local core.hooksPath .githooks
pnpm qa:phase0
pnpm typecheck
pnpm lint
pnpm test
pnpm qa:browsers
```

Los comandos de activate.ps1 afectan solo esa terminal. No cambian la configuración permanente del sistema. El frontend se clonará desde el repositorio que genere Lovable.

## Herramientas y fuentes

Las versiones exactas JS están en package.json/pnpm-lock.yaml, las de Python en apps/agent/uv.lock y las CLIs portables con hash en docs/evidence/fase-0/portable-tools.json.

- [Supabase CLI](https://supabase.com/docs/guides/local-development/cli/getting-started): dependencia de desarrollo local; usar pnpm exec supabase.
- [LiveKit CLI](https://docs.livekit.io/reference/developer-tools/livekit-cli/): binario oficial dentro de .tools/livekit.
- [Stripe CLI](https://github.com/stripe/stripe-cli): binario oficial dentro de .tools/stripe; usar únicamente test en desarrollo.
- [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart): dependencia local; usar pnpm exec twilio.
- [uv](https://docs.astral.sh/uv/getting-started/installation/): instalado en un entorno aislado .tools/python.
- [Docker Windows](https://docs.docker.com/desktop/setup/install/windows-install/): instalación existente verificada; no se cambió WSL, virtualización ni permisos del sistema.

## Conectores del proyecto

.codex/config.toml configura Supabase local, Playwright aislado y documentación OpenAI, sin secretos. GitHub ya está disponible mediante el conector instalado y gh autenticado. Supabase local está deshabilitado en la configuración MCP hasta poder iniciar y verificar su stack: faltó RAM durante la prueba.

La configuración del proyecto se carga cuando Codex abre este repositorio como proyecto confiable; no se alteró la confianza global. Este turno usa herramientas ya disponibles y CLI; no se afirma que los nuevos servidores se hayan incorporado dinámicamente al turno actual.

Fuentes: [configuración por proyecto](https://learn.chatgpt.com/docs/config-file/config-basic), [MCP de Codex](https://learn.chatgpt.com/docs/extend/mcp?surface=cli), [MCP local de Supabase](https://supabase.com/docs/guides/ai-tools/mcp).

Para iniciar y parar solo el stack local de este proyecto:

```powershell
pnpm exec supabase start
pnpm exec supabase stop
```

No usar --no-backup ni reset sobre datos del usuario. Nunca enlazar producción para probar.

## Skills

Las siete skills de Réplica viven en .agents/skills/replica-*. Su generador copia secciones completas del prompt maestro a referencias. AGENTS.md las vincula al trabajo futuro.

playwright y security-best-practices provienen del [catálogo oficial de OpenAI](https://github.com/openai/skills/tree/main/skills/.curated). Sus instrucciones se leyeron antes de instalarlas. Las capturas de producto respetarán docs/screenshots/fase-N, por instrucción del proyecto.

## Credenciales

Usar los logins de cada CLI o copiar la plantilla .env.example a .env.local dentro de la app correspondiente. Las plantillas no contienen secretos. Los valores para proveedores se completarán con los nombres exactos que valide la Fase 1.

## Lovable

La [documentación oficial de Lovable](https://docs.lovable.dev/integrations/github) establece que la conexión crea un repositorio nuevo. No admite importar un repositorio GitHub existente como proyecto nuevo. Por eso el repositorio vacío Lostykk/Replica no prueba una conexión y no se reutiliza automáticamente para el frontend.
