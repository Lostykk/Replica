import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdir, writeFile } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium, webkit } from '@playwright/test';

const baseUrl = 'http://127.0.0.1:4173';
const server = spawn(process.execPath, ['node_modules/vite/bin/vite.js', '--host', '127.0.0.1', '--port', '4173', '--strictPort'], { stdio: ['ignore', 'pipe', 'pipe'] });
let log = '';
server.stdout.on('data', chunk => { log += chunk.toString(); });
server.stderr.on('data', chunk => { log += chunk.toString(); });
const evidence = 'docs/evidence/fase-0';
const screenshots = 'docs/screenshots/fase-0';
await mkdir(evidence, { recursive: true });
await mkdir(screenshots, { recursive: true });
await mkdir('work', { recursive: true });
const results = [];
try {
  let ready = false;
  for (let attempt = 0; attempt < 90; attempt++) {
    if (server.exitCode !== null) throw new Error('Frontend server exited before becoming ready.');
    try {
      const response = await fetch(baseUrl, { signal: AbortSignal.timeout(5000) });
      if (response.ok) { ready = true; break; }
    } catch { /* Server is still starting. */ }
    await delay(1000);
  }
  assert.ok(ready, 'Frontend server must become ready');
  for (const [engineName, engine] of Object.entries({ chromium, webkit })) {
    const browser = await engine.launch();
    try {
      for (const width of [390, 1440]) {
        for (const colorScheme of ['dark', 'light']) {
          const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme, reducedMotion: 'reduce' });
          const page = await context.newPage();
          const errors = [];
          page.on('pageerror', error => errors.push(error.message));
          await page.goto(baseUrl, { waitUntil: 'networkidle' });
          await page.getByRole('button', { name: 'Empezar llamada', exact: true }).waitFor();
          for (const [route, label] of [['/', 'Home'], ['/llamadas', 'Llamadas'], ['/ranking', 'Ranking'], ['/configuracion', 'Configuración']]) {
            await page.getByRole('link', { name: label, exact: true }).click();
            await page.waitForURL(`${baseUrl}${route}`);
            assert.ok((await page.locator('main').innerText()).trim().length > 0, `${route}: main content`);
            assert.equal(await page.locator('body').evaluate(el => el.scrollWidth > el.clientWidth + 1), false, `${route}: horizontal overflow`);
            const name = route === '/' ? 'home' : route.slice(1);
            await page.screenshot({ path: `${screenshots}/${engineName}-${width}-${colorScheme}-${name}.png`, fullPage: true });
          }
          if (width === 1440) {
            await page.getByRole('button', { name: 'Colapsar sidebar', exact: true }).click();
            await page.getByRole('button', { name: 'Expandir sidebar', exact: true }).waitFor();
          }
          assert.deepEqual(errors, [], 'No browser runtime errors');
          results.push({ engine: engineName, width, colorScheme, routes: 4, navigation: 'passed', runtimeErrors: errors.length });
          await context.close();
        }
      }
    } finally { await browser.close(); }
  }
  await writeFile(`${evidence}/web-smoke.json`, JSON.stringify({ checkedAt: new Date().toISOString(), scope: 'Integration baseline of the Lovable shell, not approval of Phase 2 design or real calls.', results }, null, 2) + '\n');
  console.log('Lovable frontend: four routes, navigation, sidebar and 32 screenshots passed.');
} finally {
  server.kill();
  await writeFile('work/frontend-server.log', log);
}
