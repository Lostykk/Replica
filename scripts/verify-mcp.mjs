import { spawn } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { setTimeout, clearTimeout } from 'node:timers';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const child = spawn(process.execPath, [path.join(root, 'node_modules/@playwright/mcp/cli.js'), '--headless', '--browser', 'chrome', '--executable-path', path.join(root, '.tools/browsers/chromium-1243/chrome-win64/chrome.exe'), '--isolated'], { cwd: root, stdio: ['pipe', 'pipe', 'pipe'] });
const initialization = { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2024-11-05', capabilities: {}, clientInfo: { name: 'replica-phase0-qa', version: '0.0.0' } } };
let buffer = '';
const result = await new Promise((resolve, reject) => {
  const timeout = setTimeout(() => { child.kill(); reject(new Error('Playwright MCP handshake timeout')); }, 30000);
  child.on('error', error => { clearTimeout(timeout); reject(error); });
  child.stdout.on('data', chunk => {
    buffer += chunk.toString();
    let newline;
    while ((newline = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, newline);
      buffer = buffer.slice(newline + 1);
      if (!line.trim()) continue;
      const message = JSON.parse(line);
      if (message.error) { clearTimeout(timeout); child.kill(); reject(new Error(JSON.stringify(message.error))); return; }
      if (message.id === 1) {
        child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
        child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }) + '\n');
      }
      if (message.id === 2) {
        clearTimeout(timeout);
        child.stdin.end();
        child.kill();
        const names = message.result.tools.map(tool => tool.name);
        if (!names.includes('browser_navigate')) { reject(new Error('Browser navigation tool absent')); return; }
        resolve({ protocol: 'stdio', initialized: true, tools: names });
      }
    }
  });
  child.stdin.write(JSON.stringify(initialization) + '\n');
});
await writeFile(path.join(root, 'docs/evidence/fase-0/playwright-mcp.json'), JSON.stringify({ checkedAt: new Date().toISOString(), result }, null, 2) + '\n');
console.log('Playwright MCP: real initialize and tools/list passed.');
