---
name: replica-cost-guard
description: Implementar presupuestos, medición de consumo, cierre de sesiones e idempotencia financiera de Réplica.
---

# replica-cost-guard

Antes de trabajar, leer [requisitos completos](references/requirements.md), extraídos del prompt maestro sin omisiones. Aplicar solo al proyecto Réplica y respetar las instrucciones actuales del usuario.

Registrar cada componente en call_cost_items y usage_ledger en una transacción idempotente. Clave única por proveedor, sesión, componente e intervalo o identificador de evento; incluir unidades, tarifa y moneda/versionado, timestamps y call_id. Corregir por ajustes auditables. Separar estimado de facturado y reconciliar webhooks. Reservar presupuesto de forma atómica antes de crear recursos; a 100% bloquear nuevas llamadas completas sin cortar llamadas en curso.

Actualizar docs/PROGRESS.md con evidencia y limitaciones reales. Si cambia el prompt maestro, regenerar las referencias con python scripts/create-project-skills.py.
