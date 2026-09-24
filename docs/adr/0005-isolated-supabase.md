# ADR-0005: Supabase local aislado
Otro proyecto ya utiliza Supabase local; Réplica usa project_id replica y puertos 55320–55329 para su API, base de datos, Studio y correo de prueba.
No detener, modificar ni reutilizar contenedores, bases ni credenciales de otros proyectos. El conector MCP de Réplica apunta exclusivamente a 127.0.0.1:55321/mcp.
El seed inicial permanece vacío hasta Fase 3; no se simulan tablas ni RLS que aún no existen.
