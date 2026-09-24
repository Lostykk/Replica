# Cierre de integración — Fase 0

Validado el 2026-09-24 UTC, código 340e619. [CI completo](https://github.com/Lostykk/Replica/actions/runs/35944864815).

- Windows: instalación congelada, estructura, TypeScript estricto, ESLint (sin errores; seis avisos de Fast Refresh heredados de componentes), seis tests, build y escaneo de historia sin secretos.
- Chromium, Firefox y WebKit: lanzamiento e interacción aprobados.
- Frontend: cuatro rutas, navegación móvil y escritorio, sidebar colapsable, sin errores de ejecución ni desbordamiento horizontal; 32 capturas a 390/1440 y preferencias claro/oscuro.
- Ubuntu: Supabase local aislado con ocho servicios, SQL, Auth, REST y MCP verificados. Stack detenido al terminar.
- Revisión visual del shell: navegación y jerarquía legibles. La preferencia clara todavía muestra el tema oscuro original de Lovable; CTA de llamada y rutas son el scaffold recibido. Tema claro, funcionalidad de llamadas y dirección de arte corresponden a fases posteriores. Estas capturas no acreditan el gate de diseño de Fase 2.
- Excepción de entorno documentada en ADR-0006: poca RAM local. La instalación integrada de node_modules quedó parcial; el stack del escritorio y su MCP siguen pendientes. CI acredita reproducibilidad, no corrige la RAM del equipo.

React 19 aprobado por el owner, registrado en ADR-0002. No se modificó el prompt maestro histórico.
