# Progreso de Réplica

Fecha de inicio: 2026-09-23 (America/Buenos_Aires).

## Fase actual: 0 — trabajo local verificado; bloqueos del owner

- Prompt completo leído y copiado sin cambios; SHA256 4808efc0501b1d63ad9f7689f4f68016ae4ba04815aa4379dcc9ff9a21db14c8.
- Estructura del monorepo creada en C:/Users/Ignacio/Projects/replica, Git inicializado con main.
- Siete skills propias generadas y validadas con quick_validate.py; referencias completas extraídas de las secciones del documento.
- Skills oficiales playwright y security-best-practices instaladas desde openai/skills después de leer sus SKILL.md; estarán disponibles al abrir el proyecto en el siguiente turno.
- Node 24.19.0 LTS, pnpm 11.17.0, Python 3.12.10, Git 2.55.0, gh 2.96.0 y Docker 29.8.0 ya existían; Docker Linux funciona.
- Sesiones GitHub y Railway verificadas; no se copiaron tokens.
- LiveKit CLI 2.18.8, Stripe CLI 1.51.1 y Gitleaks 8.30.1 instalados dentro de .tools, descargados de repositorios oficiales y verificados por SHA256.
- uv 0.12.18 y PyYAML 6.0.3 instalados en .tools/python; entorno de apps/agent creado y uv.lock generado.
- Dependencias JS instaladas y versionadas en pnpm-lock.yaml; resolución y permisos de scripts explícitos en pnpm-workspace.yaml.
- Playwright 1.63.0 instalado con Chromium, Firefox y WebKit; los tres pasaron lanzamiento, render e interacción reales. Evidencia en docs/evidence/fase-0/browsers.json.
- Conector Playwright MCP probado con initialize y tools/list. Configuración local de OpenAI Docs y Supabase preparada; GitHub ya está disponible en la sesión. El MCP de Supabase permanece deshabilitado hasta verificar su servidor.
- Supabase CLI inicializado con project_id replica y puertos 55320–55329, aislado del otro entorno ya existente. No se aplicaron migraciones: corresponden a Fase 3.
- Cuatro gates ejecutados mediante pnpm: qa:phase0, typecheck, lint y test, todos exit 0; seis tests aprobados. Evidencia en docs/evidence/fase-0/checks.json y archivos .txt asociados.
- Siete skills propias validadas con el validador oficial. uv sync --frozen aprobado. Escaneo Gitleaks del índice aprobado sin secretos.
- Hooks pre-commit y pre-push configurados únicamente en este repositorio. Workflow CI preparado; no ejecutado en GitHub porque el destino remoto todavía no está confirmado.
- No hubo cambios de interfaz; QA visual de producto, rendimiento e iPhone físico no aplican todavía. El smoke test de navegadores no acredita esos gates.

## Pendientes antes de cerrar Fase 0

1. Owner libera memoria cerrando las aplicaciones/entornos que elija, o proporciona Supabase staging: se midieron 7,24 GiB totales y 0–241 MiB libres. Se canceló el arranque propio antes de crear contenedores para no agravar la presión de memoria. No se alteraron recursos ajenos.
2. Confirmar el destino GitHub: Lostykk/Replica existe, pero es público, está vacío y no se sabe si corresponde al frontend o al monorepo; push y CI remotos pendientes.
3. Owner crea/vincula el proyecto en Lovable y comparte la URL generada; ver OWNER_ACTIONS.md.
4. No emitir fase-0-completa hasta cumplir los gates requeridos y push confirmado.

## Retomar exactamente aquí

1. Leer este archivo y PROMPT_MAESTRO.md; activar scripts/activate.ps1.
2. Con memoria disponible, ejecutar pnpm exec supabase start, comprobar salud y POST initialize a http://127.0.0.1:55321/mcp; habilitar únicamente ese conector en .codex/config.toml después de verificarlo. No usar 54321: pertenece a otro entorno.
3. Si el owner elige staging, autenticar por supabase login y limitar el proyecto enlazado al ref de staging que indique, sin tocar producción.
4. Integrar el repositorio generado por Lovable en apps/web según ADR-0002 y registrar la estrategia concreta de contratos compartidos al construir el frontend.
5. Añadir remoto confirmado, escanear secretos, push, observar CI y etiquetar fase-0-completa solo cuando corresponda.
6. Iniciar Fase 1. Todavía no se investigaron de forma exhaustiva precios/límites, ni se implementó/ejecutó el benchmark de avatares.

## Siguiente fase

Fase 1: investigar proveedores y límites actuales, matriz, arquitectura, presupuesto, protocolo y herramientas de benchmark; usar credenciales solo después de que el owner habilite cuentas y presupuesto.

No existe todavía un producto funcional, ni se probó una conversación real, ni se desplegó staging/producción.
