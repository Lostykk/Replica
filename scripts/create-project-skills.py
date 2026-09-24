"""Generate project skills from complete, exact sections of the master document."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
source = (ROOT / "docs/PROMPT_MAESTRO.md").read_text(encoding="utf-8-sig")
sections = {}
for match in re.finditer(r"(?m)^## (\d+)\. ", source):
    end = re.search(r"(?m)^## \d+\. ", source[match.end():])
    stop = match.end() + end.start() if end else len(source)
    sections[int(match.group(1))] = source[match.start():stop].strip()

skills = {
    "replica-design-system": (
        "Implementar o revisar interfaces de Réplica con Arena Nocturna, La Onda y el QA visual obligatorio.",
        [15], "No aplicar a herramientas sin interfaz. Verificar capturas reales; no declarar rendimiento medido a partir de inspección estática."),
    "replica-humanity-engine": (
        "Implementar personas, estado emocional, turnos, naturalización y memoria del simulador de ventas Réplica.",
        [8], "Usar solo dentro de simulaciones con consentimiento. La ficha y verdad oculta se mantienen en servidor. Respetar el control Pausar simulación."),
    "replica-realtime-pipeline": (
        "Construir o revisar WebRTC, workers, avatares y ciclo de vida de recursos de Réplica.",
        [5, 6], "Consultar documentación oficial antes de implementar cada adaptador. Los precios de la fuente son referencias pendientes de verificación; las latencias son objetivos, no mediciones."),
    "replica-supabase-conventions": (
        "Diseñar migraciones, políticas RLS, Storage y Edge Functions del backend Supabase de Réplica.",
        [17, 19], "Migraciones numeradas y aditivas; enums PostgreSQL, UUID, índices en FKs, trigger updated_at y RLS explícita en todas las tablas. Separar datos privados de la persona. Probar usuario A/B y organización A/B, acceso anónimo y escalada de rol. Generar tipos después de aplicar migraciones locales; nunca editar tipos generados a mano. Validar entradas y salidas con Zod. El service_role permanece en servidor y exige autorización de negocio explícita."),
    "replica-qa-gates": (
        "Verificar una fase de Réplica con evidencia ejecutada, pruebas funcionales y QA visual cuando corresponda.",
        [18, 20, 21], "Ejecutar desde la raíz: pnpm qa:phase0; pnpm typecheck; pnpm lint; pnpm test; pnpm qa:browsers; pnpm secrets:staged. Leer docs/QA_GATES.md para comandos y estados. No reutilizar el smoke test de navegadores como prueba de interfaz o de iPhone físico. Un gate ausente permanece pendiente, nunca se reemplaza con un test que siempre pasa."),
    "replica-cost-guard": (
        "Implementar presupuestos, medición de consumo, cierre de sesiones e idempotencia financiera de Réplica.",
        [5, 13, 14, 16], "Registrar cada componente en call_cost_items y usage_ledger en una transacción idempotente. Clave única por proveedor, sesión, componente e intervalo o identificador de evento; incluir unidades, tarifa y moneda/versionado, timestamps y call_id. Corregir por ajustes auditables. Separar estimado de facturado y reconciliar webhooks. Reservar presupuesto de forma atómica antes de crear recursos; a 100% bloquear nuevas llamadas completas sin cortar llamadas en curso."),
    "replica-security": (
        "Revisar o implementar antiabuso, aislamiento de usuarios, secretos y privacidad en Réplica.",
        [2, 19], "Ejecutar pnpm secrets:staged antes de cada commit y pnpm secrets:history antes del push. No usar un número recibido del cliente para marcar: resolver exclusivamente la identidad telefónica propia verificada. Rechazar caras y voces subidas por usuarios. Nunca exponer la verdad oculta mediante consultas del cliente antes de finalizar la sesión.")
}

for name, (description, numbers, extra) in skills.items():
    folder = ROOT / ".agents/skills" / name
    (folder / "references").mkdir(parents=True, exist_ok=True)
    (folder / "references/requirements.md").write_text("\n\n".join(sections[n] for n in numbers) + "\n", encoding="utf-8")
    (folder / "SKILL.md").write_text(
        f"---\nname: {name}\ndescription: {description}\n---\n\n# {name}\n\n"
        "Antes de trabajar, leer [requisitos completos](references/requirements.md), extraídos del prompt maestro sin omisiones. "
        "Aplicar solo al proyecto Réplica y respetar las instrucciones actuales del usuario.\n\n"
        f"{extra}\n\nActualizar docs/PROGRESS.md con evidencia y limitaciones reales. "
        "Si cambia el prompt maestro, regenerar las referencias con python scripts/create-project-skills.py.\n",
        encoding="utf-8")
print(f"Generated {len(skills)} project skills with complete reference sections.")
