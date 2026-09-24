---
name: replica-qa-gates
description: Verificar una fase de Réplica con evidencia ejecutada, pruebas funcionales y QA visual cuando corresponda.
---

# replica-qa-gates

Antes de trabajar, leer [requisitos completos](references/requirements.md), extraídos del prompt maestro sin omisiones. Aplicar solo al proyecto Réplica y respetar las instrucciones actuales del usuario.

Ejecutar desde la raíz: pnpm qa:phase0; pnpm typecheck; pnpm lint; pnpm test; pnpm qa:browsers; pnpm secrets:staged. Leer docs/QA_GATES.md para comandos y estados. No reutilizar el smoke test de navegadores como prueba de interfaz o de iPhone físico. Un gate ausente permanece pendiente, nunca se reemplaza con un test que siempre pasa.

Actualizar docs/PROGRESS.md con evidencia y limitaciones reales. Si cambia el prompt maestro, regenerar las referencias con python scripts/create-project-skills.py.
