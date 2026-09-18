import { chromium } from 'playwright';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const axeSource = readFileSync(
  join(dirname(fileURLToPath(import.meta.url)), 'node_modules/axe-core/axe.min.js'),
  'utf8'
);

const urls = process.argv.slice(2);
if (urls.length === 0) {
  console.error('usage: node a11y_check.mjs <url> [url...]');
  process.exit(1);
}

const browser = await chromium.launch();
let anyViolations = false;
for (const url of urls) {
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.addScriptTag({ content: axeSource });
  const results = await page.evaluate(async () => await window.axe.run());
  console.log(`\n=== ${url} ===`);
  if (results.violations.length === 0) {
    console.log('No violations.');
  } else {
    anyViolations = true;
    for (const v of results.violations) {
      console.log(`[${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s))`);
      for (const n of v.nodes) console.log(`  - ${n.target.join(' ')}`);
    }
  }
  await page.close();
}
await browser.close();
process.exit(anyViolations ? 1 : 0);
