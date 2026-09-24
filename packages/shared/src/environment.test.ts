import { describe, expect, it } from 'vitest';
import { DevelopmentEnvironment } from './environment.js';

describe('development environment boundary', () => {
  it('allows local Supabase on loopback', () => {
    expect(DevelopmentEnvironment.safeParse({ environment: 'local', supabaseUrl: 'http://127.0.0.1:55321' }).success).toBe(true);
  });
  it.each([
    { environment: 'production', supabaseUrl: 'https://live.supabase.co' },
    { environment: 'local', supabaseUrl: 'https://live.supabase.co' },
    { environment: 'local', supabaseUrl: 'http://127.0.0.1.attacker.example' },
    { environment: 'staging', supabaseUrl: 'http://stage.supabase.co' },
    { environment: 'staging', supabaseUrl: 'https://name:password@stage.supabase.co' },
  ])('rejects unsafe development target %j', (input) => {
    expect(DevelopmentEnvironment.safeParse(input).success).toBe(false);
  });
});
