import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ntVerses } from './books-nt-verses.mjs';
import { renderVerseSection } from './verse-render.mjs';
import { uxHead, uxScripts } from './study-ux-embed.mjs';
import { NT_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = NT_ROOT;

const MARKER = '<!-- BOOK-VERSE-NOTES -->';

function stripOld(html) {
  return html.replace(/<!-- BOOK-VERSE-NOTES -->[\s\S]*?<!-- \/BOOK-VERSE-NOTES -->/g, '');
}

function patchFile(file, slug) {
  const verses = ntVerses[slug];
  if (!verses?.length) return;

  let html = stripOld(fs.readFileSync(file, 'utf8'));
  const section = renderVerseSection(slug, verses, '新約', '重點金句（點選展開 · 含原文註釋）');

  if (!html.includes('book-study-ux.css')) {
    html = html.replace('</head>', `${uxHead}\n</head>`);
  }

  if (html.includes('<!-- BOOK-GEO-MAP -->')) {
    html = html.replace(
      '<!-- BOOK-GEO-MAP -->',
      `${MARKER}${section}<!-- /BOOK-VERSE-NOTES -->\n    <!-- BOOK-GEO-MAP -->`
    );
  } else if (html.includes('</main>')) {
    html = html.replace(/\s*<\/main>/, `\n    ${MARKER}${section}<!-- /BOOK-VERSE-NOTES -->\n  </main>`);
  } else {
    html = html.replace(/\s*<\/body>/, `\n  ${MARKER}${section}<!-- /BOOK-VERSE-NOTES -->\n</body>`);
  }

  if (!html.includes('book-study-ux.js')) {
    if (html.includes('<!-- /BOOK-GEO-SCRIPTS -->')) {
      html = html.replace('<!-- /BOOK-GEO-SCRIPTS -->', `${uxScripts}\n<!-- /BOOK-GEO-SCRIPTS -->`);
    } else {
      html = html.replace('</body>', `${uxScripts}\n</body>`);
    }
  }

  fs.writeFileSync(file, html, 'utf8');
  console.log('NT verses:', slug);
}

for (const slug of ['馬太福音', '馬可福音', '路加福音', '約翰福音']) {
  const file = path.join(ROOT, '四福音', slug, 'index.html');
  if (fs.existsSync(file)) patchFile(file, slug);
}

const rev = path.join(ROOT, '啟示錄', 'index.html');
if (fs.existsSync(rev)) patchFile(rev, '啟示錄');

const paulDir = path.join(ROOT, '保羅書信');
if (fs.existsSync(paulDir)) {
  for (const slug of Object.keys(ntVerses)) {
    const file = path.join(paulDir, slug, 'index.html');
    if (fs.existsSync(file)) patchFile(file, slug);
  }
}

console.log('Done NT verse notes');
