## 2. REGLAS NO NEGOCIABLES

1. CERO API keys en el cliente. Todo pasa por Supabase Edge Functions o por los workers de tiempo real.
2. Cero placeholders, TODOs, "lorem ipsum" o datos mock en rutas de producción. Si algo depende de una credencial externa, se implementa completo leyendo la variable de entorno.
3. Todo archivo se escribe COMPLETO. Nunca "…resto igual".
4. RLS activado en TODAS las tablas, con políticas explícitas por rol.
5. Tipado estricto de TypeScript y validación con Zod en todas las fronteras. Toda salida de un LLM que alimente al sistema es JSON con schema validado, con reintento incluyendo el error (máx. 2).
6. Mobile-first y compatibilidad total con iOS Safari: permisos de micrófono y cámara, reanudación del AudioContext después de un gesto del usuario, reproducción inline, reconexión al cambiar de red, pantalla encendida durante la llamada (Wake Lock donde esté disponible).
7. **REGLAS ANTIABUSO** (hard-coded, no configurables por usuarios):
   - a. Las llamadas telefónicas solo van al número del propio usuario, verificado por OTP. Imposible cargar números de terceros.
   - b. El bot de Meet/Zoom solo entra a links cargados por el usuario autenticado, con rate limit, y respeta los avisos de bot/grabación que exige cada plataforma.
   - c. En v1 solo se usan avatares y voces de stock licenciados por el proveedor. Prohibido subir caras o voces de personas reales.
   - d. Un clasificador revisa cada escenario personalizado y bloquea los que busquen engañar a terceros reales (guiones de estafa, suplantación, cobranzas falsas).
   - e. Los Términos de Uso y el onboarding dejan claro que Réplica es un simulador de entrenamiento.
8. Todo proceso largo (análisis post-llamada, render de clips, clustering de feedback) corre como job asíncrono con estado en tiempo real.
9. Todo recurso que cobre por minuto (avatar, bot de reunión, telefonía) se crea lo más tarde posible y se cierra lo antes posible. Nunca queda un recurso facturando sin un usuario presente.
10. Ante una ambigüedad, tomá la decisión más robusta para producción, dejala en un ADR de 2 líneas y seguí. Solo preguntá si es bloqueante.
11. Nada se declara "hecho" sin haberlo verificado ejecutándolo: tests, typecheck, lint, capturas de pantalla o llamadas de prueba reales. Si no pudiste verificar algo, decilo explícitamente.

---

## 19. SEGURIDAD Y PRIVACIDAD

- RLS por usuario y por organización. Un mentor ve las llamadas de sus alumnos solo si pertenecen a su organización.
- Grabaciones en buckets privados con URLs firmadas de vida corta.
- Consentimiento de grabación explícito en el onboarding. El usuario puede borrar sus grabaciones y su cuenta (borrado real).
- Tokens de proveedores solo en Vault o variables de entorno de servidor. Tokens de LiveKit emitidos por Edge Function con permisos mínimos y vida corta.
- Rate limiting por usuario en creación de llamadas, llamadas telefónicas y bots de reunión.
- Sanitización de documentos y URLs subidos antes de usarlos en prompts (defensa contra prompt injection).
- `audit_log` para: verificación de teléfonos, bots enviados a reuniones, concesión de Llamadas Completas y minutos extra, cambios de rol, cambios de flags, límites y presupuesto, y reportes de abuso.
- Escaneo de secretos en pre-commit y en CI.

---
