import { z } from 'zod';

/** Local tooling must never accidentally target production. */
export const DevelopmentEnvironment = z.object({
  environment: z.enum(['local', 'staging']),
  supabaseUrl: z.url(),
}).strict().superRefine((value, ctx) => {
  const url = new URL(value.supabaseUrl);
  if (url.username || url.password) {
    ctx.addIssue({ code: 'custom', path: ['supabaseUrl'], message: 'Credentials do not belong in service URLs.' });
  }
  if (value.environment === 'local' && !['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)) {
    ctx.addIssue({ code: 'custom', path: ['supabaseUrl'], message: 'Local development requires a loopback endpoint.' });
  }
  if (value.environment === 'staging' && url.protocol !== 'https:') {
    ctx.addIssue({ code: 'custom', path: ['supabaseUrl'], message: 'Remote staging requires HTTPS.' });
  }
});

export type DevelopmentEnvironment = z.infer<typeof DevelopmentEnvironment>;
