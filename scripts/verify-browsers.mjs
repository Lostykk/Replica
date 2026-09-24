import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.env.PLAYWRIGHT_BROWSERS_PATH ??= path.join(root, '.tools', 'browsers');
const { chromium, firefox, webkit } = await import('@playwright/test');
const evidence = path.join(root, 'docs/evidence/fase-0');
await mkdir(evidence, { recursive: true });
const report = [];
for (const [name, engine] of Object.entries({ chromium, firefox, webkit })) {
  const browser = await engine.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.setContent('<!doctype html><html lang="es"><title>Réplica — prueba de entorno</title><main><h1>Prueba de navegador</h1><p>Esto verifica el entorno. No es una pantalla del producto.</p><button>Verificar interacción</button><output></output></main><script>document.querySelector("button").onclick=()=>document.querySelector("output").textContent="OK"</script></html>');
    await page.getByRole('button').click();
    if ((await page.locator('output').textContent()) !== 'OK') throw new Error(`${name}: interaction failed`);
    report.push({ engine: name, version: browser.version(), interaction: 'passed' });
    console.log(`${name}: launch, render and interaction passed`);
  } finally {
    await browser.close();
  }
}
await writeFile(path.join(evidence, 'browsers.json'), JSON.stringify({ checkedAt: new Date().toISOString(), scope: 'Environment smoke test only; no product UI or physical iOS validation.', results: report }, null, 2) + '\n');
