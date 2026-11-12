import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildMapEmbed } from './geo-embed.mjs';
import { bookGeo } from './books-geo.mjs';
import { NT_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = NT_ROOT;

const NT_PAGES = [
  ['四福音', '馬太福音'],
  ['四福音', '馬可福音'],
  ['四福音', '路加福音'],
  ['四福音', '約翰福音'],
  ['啟示錄', 'index.html'], // special: 啟示錄/index.html slug is 啟示錄
];

function stripOld(html) {
  return html
    .replace(/<!-- BOOK-GEO-HEAD -->[\s\S]*?<!-- \/BOOK-GEO-HEAD -->/g, '')
    .replace(/<!-- BOOK-GEO-MAP -->[\s\S]*?<!-- \/BOOK-GEO-MAP -->/g, '')
    .replace(/<!-- BOOK-GEO-SCRIPTS -->[\s\S]*?<!-- \/BOOK-GEO-SCRIPTS -->/g, '');
}

function patchFile(file, slug) {
  if (!bookGeo[slug]) return;
  let html = stripOld(fs.readFileSync(file, 'utf8'));
  const embed = buildMapEmbed(slug, { sectionTitle: '歷史地理互動地圖' });
  if (!embed) return;

  if (!html.includes('</head>')) {
    console.warn('Skip invalid HTML:', file);
    return;
  }

  html = html.replace('</head>', `<!-- BOOK-GEO-HEAD -->${embed.head}<!-- /BOOK-GEO-HEAD -->\n</head>`);
  if (html.includes('</main>')) {
    html = html.replace(/\s*<\/main>/, `\n    <!-- BOOK-GEO-MAP -->${embed.section}<!-- /BOOK-GEO-MAP -->\n  </main>`);
  } else {
    html = html.replace(/\s*<\/body>/, `\n  <!-- BOOK-GEO-MAP -->${embed.section}<!-- /BOOK-GEO-MAP -->\n</body>`);
  }
  html = html.replace('</body>', `<!-- BOOK-GEO-SCRIPTS -->${embed.scripts}<!-- /BOOK-GEO-SCRIPTS -->\n</body>`);
  fs.writeFileSync(file, html, 'utf8');
  console.log('NT map:', slug);
}

// Gospels
for (const [cat, slug] of NT_PAGES.slice(0, 4)) {
  const file = path.join(ROOT, cat, slug, 'index.html');
  if (fs.existsSync(file)) patchFile(file, slug);
}

// Revelation
const revFile = path.join(ROOT, '啟示錄', 'index.html');
if (fs.existsSync(revFile)) patchFile(revFile, '啟示錄');

// Pauline epistles
const paulDir = path.join(ROOT, '保羅書信');
if (fs.existsSync(paulDir)) {
  for (const slug of Object.keys(bookGeo)) {
    const file = path.join(paulDir, slug, 'index.html');
    if (fs.existsSync(file)) patchFile(file, slug);
  }
}

console.log('Done NT maps');
