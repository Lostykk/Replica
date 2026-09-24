# Evidencia de preparación de Fase 1

Fecha: 2026-09-24 UTC / 2026-09-23 Argentina.

Código verificado: `d85f1d187ebac94225c74fe27996c7cc60218b9f`.
Ejecución: https://github.com/Lostykk/Replica/actions/runs/35946682608.
Resultado: **success** en los tres trabajos, finalizado a las 02:21:13 UTC.
Los cambios posteriores a ese commit son documentación y conversión de los preflight JSON a UTF-8; no cambian el código ejecutable.

| Trabajo | Resultado y alcance |
| --- | --- |
| quality (Windows) | Instalación congelada; gate Fase 0; tipos; lint; seis tests JS; build; escaneo de secretos del historial; tres motores de navegador; integración de cuatro rutas y 32 capturas; consentimiento del cliente de benchmark |
| benchmark-offline (Linux) | Instalación Python congelada; Ruff; cinco tests de reportes/preflight; carga del worker; preflight Simli es-AR y Tavus es-MX |
| supabase-local (Linux) | Stack aislado iniciado; salud de servicios, PostgreSQL, Auth, REST y MCP aprobados; stack detenido al terminar |

También pasaron localmente el tipado, lint de scripts, cinco tests Python, carga del worker y smoke test del cliente. La instalación JS local se recuperó. Se comprobó con el SDK instalado que `RoomOptions(participant_identity="benchmark-owner")` vincula la entrada de audio al dueño de la prueba.

## Evidencia disponible

- `client-offline.json`: consentimiento y ausencia de solicitudes antes de aceptarlo.
- `../../screenshots/fase-1/`: captura del cliente local del benchmark.
- `preflight-simli.json` y `preflight-tavus.json`: nombres de configuración faltante, sin valores secretos.
- `cost-scenarios.json`: salida reproducible de la calculadora de estimaciones.
- Artifacts del run: evidencia web y salud del stack aislado.

## Límites y pendientes

- No se creó ninguna sesión con proveedores: latencia, sincronía de labios, expresiones, acentos, costo real y duración continua de 90 min **no medidos**.
- El ensayo no implementa todo el Motor de Humanidad ni acredita el gate de producción. Las métricas RMS del navegador son estimaciones; la evaluación audiovisual requiere participación humana.
- Faltan accesos, voces/caras de catálogo con licencia, precio efectivo Simli y plan/trial Tavus apto. No se contrataron planes ni se autorizaron cargos.
- El presupuesto del supervisor registra la autorización, pero no puede imponer un límite de facturación a proveedores externos.
- Supabase del escritorio sigue pendiente por memoria; CI no sustituye esa comprobación. Ver ADR-0006.
- React 19 queda aprobado en ADR-0002. La selección final de proveedores permanece provisional en ADRs 0007–0009.

Estado: **preparación verificada; Fase 1 abierta**. No crear el tag `fase-1-completa` con estos pendientes.
