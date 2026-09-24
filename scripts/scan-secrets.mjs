import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const mode = process.argv[2];
if (!['staged', 'history'].includes(mode)) throw new Error('Use staged or history.');
const portable = path.join(root, '.tools', 'gitleaks', 'gitleaks.exe');
const executable = existsSync(portable) ? portable : 'gitleaks';
const args = ['git', root, '--redact', '--no-banner'];
if (mode === 'staged') args.push('--pre-commit', '--staged');
const result = spawnSync(executable, args, { cwd: root, stdio: 'inherit' });
if (result.error) {
  console.error('Secret scanner unavailable. Run scripts/install-portable-tools.ps1 or install gitleaks in CI.');
  process.exit(1);
}
process.exit(result.status ?? 1);
