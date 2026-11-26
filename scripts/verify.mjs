// Checks every page: noindex, concept label, local links resolve, no forms that post anywhere.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
const pages = ['index.html', 'kitchens/index.html', '404.html'];
let fail = 0;
const bad = (m) => { console.error('FAIL', m); fail++; };
for (const p of pages) {
  const html = readFileSync(p, 'utf8');
  if (!/name="robots" content="noindex/.test(html)) bad(`${p}: missing noindex`);
  if (p !== '404.html' && !/not the official website/i.test(html)) bad(`${p}: missing concept label`);
  if (/<form[^>]*action=/.test(html)) bad(`${p}: form has an action`);
  for (const [, href] of html.matchAll(/(?:href|src)="([^"#:]+?)(?:#[^"]*)?"/g)) {
    if (href.startsWith('/') || href === '') continue;
    let target = join(dirname(p), href);
    if (href.endsWith('/') || href === './') target = join(target, 'index.html');
    if (!existsSync(target)) bad(`${p}: broken local link ${href}`);
  }
  for (const [, id] of html.matchAll(/href="(?:\.\.\/)?#([\w-]+)"/g)) {
    const src = html.includes(`href="../#${id}"`) ? readFileSync('index.html', 'utf8') : html;
    if (!src.includes(`id="${id}"`)) bad(`${p}: missing anchor #${id}`);
  }
}
console.log(fail ? `${fail} problem(s)` : `OK: ${pages.length} pages checked`);
process.exit(fail ? 1 : 0);
