# ADR-0006: validar Supabase en CI aislado
El equipo local mantiene menos de 250 MiB libres y aloja otro stack ajeno al proyecto; no se modifica ni detiene ese entorno.
La misma configuración local de Réplica se inicia y valida en un runner efímero Linux de GitHub Actions: salud de Postgres/Auth/REST/Storage y negociación del MCP local.
Esto valida la reproducibilidad del entorno de Fase 0 sin usar staging/producción ni contratar servicios. La limitación de RAM del equipo sigue documentada, no se declara solucionada.
El cierre requiere éxito real del job; escribir el workflow no constituye evidencia. Los servicios se detienen al terminar el job.
