# Progreso de Réplica

Actualizado: 2026-09-23 (Argentina). Fase 0: integración en validación. Fase 1: investigación iniciada por indicación del owner.

- Prompt maestro íntegro leído y conservado; SHA256 4808efc0501b1d63ad9f7689f4f68016ae4ba04815aa4379dcc9ff9a21db14c8.
- Repositorio confirmado: https://github.com/Lostykk/Replica. Lovable y monorepo son el mismo repositorio. Frontend original en la raíz; servicios en apps y contratos en packages (ADR-0002).
- React 19 aprobado expresamente por el owner. TanStack Start/Router conservados. No degradar a React 18.
- Historias integradas sin reescritura en 406600a. Rama remota codex/phase0-integration; todavía no se actualizó main ni se emitió etiqueta de cierre.
- Siete skills propias y skills oficiales instaladas; herramientas portátiles verificadas, hooks de secretos y configuración de MCP preparados.
- Controles del bootstrap anterior aprobados: estructura, seis tests de contratos, Chromium/Firefox/WebKit y Playwright MCP. Esos resultados NO acreditan el frontend integrado.
- Primer CI: https://github.com/Lostykk/Replica/actions/runs/35944286036. Supabase aislado en Ubuntu pasó salud, SQL, REST y MCP; se cerró al finalizar. Windows instaló el lockfile y detectó una comparación excesivamente estricta del remoto sin sufijo .git; corregida.
- Memoria de escritorio insuficiente (~100 MiB libres sobre 7,24 GiB). Las instalaciones locales del frontend integrado quedaron parciales al cancelarlas; usar CI para validación reproducible. No se detuvieron otros proyectos ni contenedores. Supabase MCP local sigue deshabilitado (ADR-0006).
- pnpm-lock.yaml y bun.lock regenerados. Build, tipos, lint y smoke visual del frontend integrado pendientes del CI corregido.

## Continuar

1. Corregir fallos reales de CI, ejecutar controles completos e inspeccionar capturas 390/1440 en Chromium/WebKit, claro/oscuro. Son baseline del shell, no aprobación de diseño Fase 2.
2. Actualizar main sin force push tras revalidar el remoto; etiquetar fase-0-completa solo con evidencia suficiente y registrar excepción de memoria local.
3. Completar Fase 1: arquitectura, proveedores con precios/límites actuales, presupuesto de 90 minutos, ADRs, ejemplos de entorno y herramientas para benchmark Simli/Tavus de 10 minutos en es-AR/es-MX.
4. Pedir al owner únicamente cuentas, credenciales locales, aprobación de gasto y participación imprescindibles para mediciones reales. No presentar estimaciones como resultados.

Todavía no existe conversación real verificada, despliegue ni benchmark de proveedores. Fases posteriores pendientes.
