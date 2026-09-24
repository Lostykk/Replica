# ADR-0004: plantillas de configuración
Se ignoran todos los archivos .env con excepción explícita de .env.example y .env.*.example, que contienen únicamente nombres y valores vacíos o públicos.
La excepción resuelve la necesidad de versionar plantillas de configuración sin versionar credenciales.
Las CLIs faltantes se instalan dentro de .tools o como dependencias de desarrollo, sin cambiar PATH persistente ni ajustes de seguridad de Windows.
