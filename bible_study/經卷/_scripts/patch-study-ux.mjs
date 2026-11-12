import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { sharedUxBaseFrom, uxHeadFor, uxScriptsFor } from './study-ux-embed.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const SKIP_DIRS = new Set(['_scripts', 'node_modules']);

function walk(dir, files = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) {
      if (!SKIP_DIRS.has(name)) walk(full, files);
    } else if (name === 'index.html') {
      files.push(full);
    }
  }
  return files;
}

function patchHtml(html, file) {
  if (!html.includes('sec-btn') && !html.includes('checklist') && !html.includes('verse-card')) {
    return null;
  }

  const base = sharedUxBaseFrom(file, ROOT);
  const uxHead = uxHeadFor(base);
  const uxScripts = uxScriptsFor(base);

  let out = html;

  // Normalize any wrong-depth shared asset paths
  out = out.replace(
    /(?:\.\.\/)+3D地圖\/bible-maps\/shared\/book-study-ux\.css/g,
    `${base}/book-study-ux.css`
  );
  out = out.replace(
    /(?:\.\.\/)+3D地圖\/bible-maps\/shared\/book-study-ux\.js/g,
    `${base}/book-study-ux.js`
  );
  out = out.replace(
    /(?:\.\.\/)+3D地圖\/bible-maps\/shared\/book-map\.css/g,
    `${base}/book-map.css`
  );
  out = out.replace(
    /(?:\.\.\/)+3D地圖\/bible-maps\/shared\/book-map\.js/g,
    `${base}/book-map.js`
  );

  if (!out.includes('book-study-ux.css')) {
    out = out.replace('</head>', `${uxHead}\n</head>`);
  }

  if (!out.includes('book-study-ux.js')) {
    if (out.includes('<!-- BOOK-GEO-SCRIPTS -->')) {
      out = out.replace(
        '<!-- BOOK-GEO-SCRIPTS -->',
        `<!-- BOOK-GEO-SCRIPTS -->${uxScripts}`
      );
    } else if (out.includes('<!-- /BOOK-GEO-SCRIPTS -->')) {
      out = out.replace('<!-- /BOOK-GEO-SCRIPTS -->', `${uxScripts}\n<!-- /BOOK-GEO-SCRIPTS -->`);
    } else {
      out = out.replace('</body>', `${uxScripts}\n</body>`);
    }
  }

  if (!out.includes('ux-header')) {
    out = out.replace(/<header class="/g, '<header class="ux-header ');
  }

  if (!out.includes('ux-reveal')) {
    out = out.replace(/<section class="/g, '<section class="ux-reveal ');
    out = out.replace(/ux-reveal ux-reveal/g, 'ux-reveal');
    out = out.replace(/ux-reveal book-geo-section/g, 'ux-reveal book-geo-section');
  }

  out = out.replace(
    /document\.querySelectorAll\('\.sec-btn'\)\.forEach\([^)]+\)\{[^}]+\}\);?\s*/g,
    ''
  );
  out = out.replace(
    /document\.querySelectorAll\('\.verse-card'\)\.forEach\([^)]+\)=>[^;]+;\s*/g,
    ''
  );

  if (out.includes('book-map-layout') && !out.includes('book-map-toolbar')) {
    out = out.replace(
      /(<p class="text-sm text-slate-600 mb-4 leading-relaxed">[^<]*<\/p>\s*)(<div class="book-map-layout">)/,
      `$1<div class="book-map-toolbar" role="toolbar" aria-label="地圖導覽">
        <button type="button" id="book-map-tour" class="bmp-btn bmp-btn-primary">▶ 自動導覽</button>
        <button type="button" id="book-map-prev" class="bmp-btn">← 上一站</button>
        <button type="button" id="book-map-next" class="bmp-btn">下一站 →</button>
        <button type="button" id="book-map-fit" class="bmp-btn">總覽</button>
        <span id="book-map-progress" class="bmp-progress">1 / ?</span>
      </div>
      $2`
    );
  }

  return out === html ? null : out;
}

const files = walk(ROOT);
let n = 0;
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const patched = patchHtml(html, file);
  if (patched) {
    fs.writeFileSync(file, patched, 'utf8');
    n++;
    console.log('UX:', path.relative(ROOT, file));
  }
}
console.log('Done study UX patch:', n, 'files');
