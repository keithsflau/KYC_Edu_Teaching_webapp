import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VOLUME_ROOT } from './paths.mjs';

const root = VOLUME_ROOT;
const checks = [
  'index.html',
  '舊約/index.html', '新約/index.html',
  '舊約/摩西五經/index.html', '舊約/歷史書/index.html', '舊約/歷史書/約書亞記/index.html',
  '新約/四福音/index.html', '新約/保羅書信/index.html', '新約/啟示錄/index.html',
  '專題/index.html',
];
for (const c of checks) {
  const p = path.join(root, c);
  console.log(fs.existsSync(p) ? 'OK' : 'MISSING', c);
}
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const hrefs = [...html.matchAll(/href="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((h) => !h.startsWith('http') && !h.startsWith('#'));
for (const h of hrefs) {
  const p = path.join(root, ...h.split('/'));
  if (!fs.existsSync(p)) console.log('BROKEN', h);
}
