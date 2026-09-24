import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const html = await readFile('apps/agent/benchmarks/client.html');
const sdk = await readFile('node_modules/livekit-client/dist/livekit-client.umd.js');
let apiCalls = 0;
const server = createServer((request, response) => {
  if (request.url === '/sdk.js') { response.setHeader('Content-Type', 'application/javascript'); response.end(sdk); }
  else if (request.url === '/') { response.setHeader('Content-Type', 'text/html'); response.end(html); }
  else if (request.url === '/favicon.ico') { response.writeHead(204); response.end(); }
  else { apiCalls++; response.writeHead(400); response.end(); }
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 900 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto(`http://127.0.0.1:${server.address().port}/`);
  assert.equal(await page.evaluate(() => typeof globalThis.LivekitClient.Room), 'function');
  await page.getByRole('button', { name: 'Conectar y comenzar' }).click();
  assert.match(await page.locator('#status').innerText(), /Hace falta aceptar/);
  assert.equal(apiCalls, 0, 'No network API request before consent');
  assert.equal(await page.locator('#stop').isDisabled(), true);
  assert.deepEqual(errors, []);
  await mkdir('docs/screenshots/fase-1', { recursive: true });
  await mkdir('docs/evidence/fase-1', { recursive: true });
  await page.screenshot({ path: 'docs/screenshots/fase-1/benchmark-consent-390.png', fullPage: true });
  await writeFile('docs/evidence/fase-1/client-offline.json', JSON.stringify({
    checkedAt: new Date().toISOString(), sdkLoaded: true, consentBlocksApiCalls: true,
    scope: 'Offline laboratory client. No provider connection, microphone or paid call tested.',
  }, null, 2) + '\n');
} finally {
  await browser.close();
  await new Promise(resolve => server.close(resolve));
}
