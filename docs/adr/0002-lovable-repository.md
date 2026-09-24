# ADR-0002: integración con Lovable
El monorepo contiene backend, contratos y documentación. El frontend de Lovable mantendrá su propio repositorio en apps/web, integrado como submódulo después de conectar Lovable con GitHub.
Esto preserva la estructura raíz esperada por la sincronización bidireccional y evita mover silenciosamente archivos generados por Lovable.
Los contratos se consumirán mediante un paquete empaquetado y versionado; el build del frontend no dependerá de rutas fuera de su checkout.
Se encontró Lostykk/Replica vacío; no se presume que ya esté conectado con Lovable.
