import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const required = ['src/router.tsx', 'src/routes/__root.tsx', 'vite.config.ts', '.lovable/project.json', 'apps/web/README.md', 'apps/agent', 'apps/meeting-bot-page', 'packages/shared', 'supabase/config.toml', 'docs/PROMPT_MAESTRO.md', 'docs/PROGRESS.md', 'docs/OWNER_ACTIONS.md', 'docs/QA_GATES.md', 'pnpm-lock.yaml', 'apps/agent/uv.lock', '.githooks/pre-commit', '.githooks/pre-push'];
for (const item of required) if (!existsSync(path.join(root, item))) throw new Error(`Missing: ${item}`);
const master = readFileSync(path.join(root, 'docs/PROMPT_MAESTRO.md'));
if (createHash('sha256').update(master).digest('hex') !== '4808efc0501b1d63ad9f7689f4f68016ae4ba04815aa4379dcc9ff9a21db14c8') throw new Error('Master document changed; review and update expected hash explicitly.');
const skillsRoot = path.join(root, '.agents/skills');
const ownSkills = readdirSync(skillsRoot).filter(name => name.startsWith('replica-'));
if (ownSkills.length !== 7) throw new Error('Expected seven project skills.');
for (const skill of ownSkills) {
  const content = readFileSync(path.join(skillsRoot, skill, 'SKILL.md'), 'utf8').replaceAll('\r\n', '\n');
  if (!content.startsWith(`---\nname: ${skill}\n`)) throw new Error(`Invalid skill: ${skill}`);
  if (!existsSync(path.join(skillsRoot, skill, 'references/requirements.md'))) throw new Error(`Missing full requirements: ${skill}`);
}
execFileSync('git', ['check-ignore', '.env.local', 'apps/agent/.env.local', '.tools/example'], { cwd: root, stdio: 'pipe' });
const ignored = execFileSync('git', ['check-ignore', '.env.local', 'apps/agent/.env.local', '.tools/example'], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/);
if (ignored.length !== 3) throw new Error('Secret/tool ignore rules incomplete.');
const hooks = execFileSync('git', ['config', '--local', 'core.hooksPath'], { cwd: root, encoding: 'utf8' }).trim();
if (hooks !== '.githooks') throw new Error('Local secret scanning hooks not configured.');
const origin = execFileSync('git', ['remote', 'get-url', 'origin'], { cwd: root, encoding: 'utf8' }).trim();
if (origin.replace(/\.git$/, '').replace(/\/$/, '') !== 'https://github.com/Lostykk/Replica') throw new Error('Unexpected repository remote.');
if (existsSync(path.join(root, '.gitmodules'))) throw new Error('The single Lovable repository must not contain a self-referencing submodule.');
console.log('Phase 0 structure, Lovable root, confirmed origin, master integrity, seven skills and secret exclusions: PASS. Service health and remote CI are separate gates.');
