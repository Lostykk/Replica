---
name: replica-supabase-conventions
description: Diseñar migraciones, políticas RLS, Storage y Edge Functions del backend Supabase de Réplica.
---

# replica-supabase-conventions

Antes de trabajar, leer [requisitos completos](references/requirements.md), extraídos del prompt maestro sin omisiones. Aplicar solo al proyecto Réplica y respetar las instrucciones actuales del usuario.

Migraciones numeradas y aditivas; enums PostgreSQL, UUID, índices en FKs, trigger updated_at y RLS explícita en todas las tablas. Separar datos privados de la persona. Probar usuario A/B y organización A/B, acceso anónimo y escalada de rol. Generar tipos después de aplicar migraciones locales; nunca editar tipos generados a mano. Validar entradas y salidas con Zod. El service_role permanece en servidor y exige autorización de negocio explícita.

Actualizar docs/PROGRESS.md con evidencia y limitaciones reales. Si cambia el prompt maestro, regenerar las referencias con python scripts/create-project-skills.py.
