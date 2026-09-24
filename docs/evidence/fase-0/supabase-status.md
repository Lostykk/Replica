# Supabase local: instalación verificada, arranque pendiente

- CLI 2.117.0 responde y supabase init terminó correctamente.
- project_id replica; API 55321, DB 55322, shadow DB 55320, Studio 55323, correo 55324, analytics 55327, pooler 55329.
- El arranque descargó imágenes oficiales, pero se canceló antes de iniciar contenedores al constatar presión de memoria.
- Win32_OperatingSystem reportó TotalVisibleMemorySize 7590704 KiB y FreePhysicalMemory 246832 KiB después de cancelar; una medición previa redondeaba a 0,0 GiB libres.
- docker ps -a filtrado por name=replica no devolvió contenedores después de cancelar.
- No se detuvieron ni modificaron los contenedores existentes de otro proyecto.
- No se verificaron PostgreSQL, Auth, Storage ni el handshake MCP de Réplica. No se declara el stack operativo.
- No se cambiaron límites Docker/WSL, memoria virtual, firewall ni permisos de Windows.

Reintentar con memoria disponible o usar un proyecto de staging autorizado por el owner. No se necesita reinstalar la CLI.
