---
name: replica-security
description: Revisar o implementar antiabuso, aislamiento de usuarios, secretos y privacidad en Réplica.
---

# replica-security

Antes de trabajar, leer [requisitos completos](references/requirements.md), extraídos del prompt maestro sin omisiones. Aplicar solo al proyecto Réplica y respetar las instrucciones actuales del usuario.

Ejecutar pnpm secrets:staged antes de cada commit y pnpm secrets:history antes del push. No usar un número recibido del cliente para marcar: resolver exclusivamente la identidad telefónica propia verificada. Rechazar caras y voces subidas por usuarios. Nunca exponer la verdad oculta mediante consultas del cliente antes de finalizar la sesión.

Actualizar docs/PROGRESS.md con evidencia y limitaciones reales. Si cambia el prompt maestro, regenerar las referencias con python scripts/create-project-skills.py.
