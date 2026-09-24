import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';

function run(command, args) {
  try { return execFileSync(command, args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }); }
  catch { throw new Error(`${command} failed during the isolated replica service check.`); }
}
const services = ['db', 'auth', 'rest', 'storage', 'realtime', 'studio', 'pg_meta', 'kong'];
const states = services.map(service => {
  const name = `supabase_${service}_replica`;
  const state = JSON.parse(run('docker', ['inspect', '--format', '{{json .State}}', name]));
  assert.equal(state.Running, true, `${name} must run`);
  if (state.Health) assert.equal(state.Health.Status, 'healthy', `${name} must be healthy`);
  return { name, running: true, health: state.Health?.Status ?? 'no container healthcheck' };
});
assert.equal(run('docker', ['exec', 'supabase_db_replica', 'psql', '-U', 'postgres', '-d', 'postgres', '-Atc', 'select current_database()']).trim(), 'postgres');
const status = JSON.parse(run('supabase', ['status', '-o', 'json']));
assert.equal(new URL(status.API_URL).origin, 'http://127.0.0.1:55321');
for (const route of ['/auth/v1/health', '/rest/v1/']) {
  const response = await fetch(`http://127.0.0.1:55321${route}`, { headers: { apikey: status.ANON_KEY }, signal: AbortSignal.timeout(15000) });
  assert.equal(response.ok, true, `${route} must return HTTP success`);
}
const response = await fetch('http://127.0.0.1:55321/mcp', {
  method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
  body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'replica-phase0', version: '0.0.0' } } }),
  signal: AbortSignal.timeout(30000),
});
assert.equal(response.ok, true, 'MCP initialize HTTP status');
const body = await response.text();
const message = response.headers.get('content-type')?.includes('text/event-stream')
  ? body.split('\n').filter(line => line.startsWith('data:')).map(line => JSON.parse(line.slice(5))).find(item => item.id === 1)
  : JSON.parse(body);
assert.ok(message?.result?.serverInfo, 'MCP initialize must return server information');
await mkdir('docs/evidence/fase-0', { recursive: true });
await writeFile('docs/evidence/fase-0/supabase-ci.json', JSON.stringify({ checkedAt: new Date().toISOString(), scope: 'Ephemeral CI local Supabase; not the owner desktop or production.', services: states, databaseQuery: 'passed', authHealth: 'passed', restSchema: 'passed', mcp: { initialized: true, serverInfo: message.result.serverInfo } }, null, 2) + '\n');
console.log('Replica Supabase: container health, PostgreSQL query, Auth, REST and MCP initialize passed.');
