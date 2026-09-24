# Progreso de Réplica

Actualizado: 2026-09-24 UTC / 2026-09-23 Argentina.

## Fase 0 cerrada

- Repo único confirmado por el owner: https://github.com/Lostykk/Replica; Lovable https://lovable.dev/projects/6cd4796d-f047-46ff-8276-fccdc797a152.
- Frontend en raíz, monorepo en apps/packages; historias fusionadas sin reescribir. React19 aprobado expresamente, ADR-0002 actualizado; TanStack Start/Router conservados.
- Integración publicada en main. Tag fase-0-completa apunta al cierre documental838ba61; código verificado340e619 en https://github.com/Lostykk/Replica/actions/runs/35944864815.
- Gate real: instalación congelada, tipos estrictos, lint sin errores, seis tests, build, Gitleaks, Chromium/Firefox/WebKit, cuatro rutas y32capturas. Supabase aislado en CI pasó ocho servicios, SQL, Auth, REST y MCP; cerrado al terminar. Evidencias en docs/evidence/fase-0.
- Prompt maestro conservado byte-exacto (SHA2564808efc0501b1d63ad9f7689f4f68016ae4ba04815aa4379dcc9ff9a21db14c8).
- Skills propias: design-system, humanity-engine, realtime-pipeline, supabase-conventions, qa-gates, cost-guard y security, todas bajo .agents/skills/replica-*. Skills oficiales playwright/security-best-practices desde openai/skills. Ver SETUP e historial para instalación.
- Herramientas: Node24.19.0, pnpm11.17.0, Python3.12.10, uv0.12.18, Docker29.8.0, gh2.96.0; CLI LiveKit2.18.8, Stripe1.51.1, Gitleaks8.30.1 verificados por SHA256 en .tools; Supabase2.117.0, Twilio7.0.0 y Railway5.59.0 locales. GitHub/Railway autenticados; ningún token copiado.
- Excepción ADR-0006: equipo con ~100MiB libres. Supabase del escritorio y su MCP siguen deshabilitados, sin tocar entornos ajenos. La instalación JS interrumpida se recuperó al resolver dependencias de Fase1; comprobar comandos locales antes de usarla. CI no acredita memoria ni salud del escritorio.
- El shell importado sigue siendo scaffold: tema claro y llamadas aún no implementados. No se aprobó el diseño de Fase2.

## Fase 1 activa — preparación y validación offline completadas

- architecture.md: tres canales, fronteras de seguridad, memoria, ciclo de vida y facturación.
- provider-matrix.md: fuentes oficiales actuales, precios/límites y valores desconocidos explícitos. No confirmar Simli0,009/min; Tavus tiene tablas discrepantes; LiveAvatar20/60min no sirve para90min.
- cost-model.md y calculadora reproducible: voz≈4,93USD/90min, video base≈6,95USD sin render; Simli a tarifa HIPOTÉTICA0,05/min≈12,35USD. Incluye20% de reserva y prorrateo conservador; no es factura ni medición.
- ADRs0007–0009: Deepgram/OpenAI/Cartesia con workerPython, Simli candidato/Tavus echo premium, Twilio/Recall/Egress condicionados a pruebas. Modelos por tarea y secretos por app documentados en .env.example.
- Benchmark real preparado en apps/agent/benchmarks: supervisor local, cliente web con consentimiento/grabación privada, workerLiveKit de10min Simli/Tavus es-AR/es-MX, métricas y reporte. No hubo llamadas a proveedores.
- Dependencias Python instaladas con uv.lock. SDK web LiveKit 2.22.3 y locks pnpm/bun actualizados. Cinco pruebas offline pasan: evidencia ausente, percentiles, fallo temprano, facturas sin respaldo y requisitos de acento/proveedor. Ruff pasa; CLI del worker carga y muestra ayuda.
- CI completo aprobado para d85f1d1: https://github.com/Lostykk/Replica/actions/runs/35946682608 (quality, benchmark-offline y supabase-local). Incluye el vínculo del audio al participante correcto y registro privado del presupuesto autorizado. Evidencia y límites en docs/evidence/fase-1/qa.md.
- Verificación local: typecheck, lint de scripts, tests Python y cliente de benchmark en Chromium aprobados. La instalación JS funciona nuevamente. Las mediciones de proveedores siguen pendientes.
- Preflight muestra que faltan credenciales. Ningún gasto, suscripción, cuenta ni despliegue creado. Herramientas de benchmark no son el Motor de Humanidad completo de Fase6.

## Próximo límite: acciones que solo puede resolver el owner

Completar cuentas/claves locales de LiveKit, Deepgram, OpenAI, Cartesia, Simli y Tavus; seleccionar stock con licencia; confirmar tarifa Simli y plan/trial Tavus que permita10min; autorizar presupuesto variable del ensayo y liberar memoria para la ejecución. No pegar claves en chat. Detalle en OWNER_ACTIONS.md.

Avance de Fase 1 preparado para main, con código verificado y cierre documental posterior sin cambios ejecutables. Próximo paso: ejecutar cuatro llamadas reales y completar planilla/costo reconciliado cuando estén disponibles los accesos y el presupuesto. NO etiquetar fase-1-completa hasta resolver la selección y gates pendientes. Fase 2 y producción pendientes.
