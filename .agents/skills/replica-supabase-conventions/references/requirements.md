## 17. MODELO DE DATOS (mínimo; ampliá lo que haga falta)

profiles, organizations, organization_members (role), invitations, verified_phones, industries, industry_presets, offers, scenarios, scenario_documents, personas, persona_hidden_truths, avatars (catálogo de stock con proveedor y nivel), voices, calls (canal, estado, proveedores usados, duración, resultado, costo total), call_turns (texto, hablante, timestamps, estado emocional en ese turno, latencia), call_memory_snapshots (resumen rodante y hechos duros por momento, necesarios para "reintentar desde este momento"), call_recordings, call_metrics, call_cost_items (costo por componente), provider_sessions (cada sesión abierta con un proveedor, reconexiones y cierre), call_feedback_reports (devolución completa en JSON), key_moments, retry_sessions, assignments, assignment_submissions, streaks, leaderboard_entries, share_cards, referrals, trial_grants (Llamada Completa de bienvenida y minutos extra), waitlist, user_feedback (micro-encuesta, nota de voz, captura), realism_flags, auto_signals, feedback_themes, feedback_theme_items, improvement_briefs, nps_responses, usage_ledger, provider_prices, budgets, plans, subscriptions, feature_flags, abuse_reports, audit_log, app_events.

Requisitos: UUID como PK, `created_at`/`updated_at` con trigger, enums de Postgres para estados, índices en FKs y filtros frecuentes, y retención de grabaciones configurable (por defecto 90 días en el plan gratuito).

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
