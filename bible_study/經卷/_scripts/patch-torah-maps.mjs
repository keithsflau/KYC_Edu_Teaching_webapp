import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildMapEmbed } from './geo-embed.mjs';
import { bookGeo } from './books-geo.mjs';
import { OT_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TORAH = ['創世記', '出埃及記', '利未記', '民數記', '申命記'];

function stripOld(html) {
  return html
    .replace(/<!-- BOOK-GEO-HEAD -->[\s\S]*?<!-- \/BOOK-GEO-HEAD -->/g, '')
    .replace(/<!-- BOOK-GEO-MAP -->[\s\S]*?<!-- \/BOOK-GEO-MAP -->/g, '')
    .replace(/<!-- BOOK-GEO-SCRIPTS -->[\s\S]*?<!-- \/BOOK-GEO-SCRIPTS -->/g, '');
}

for (const slug of TORAH) {
  if (!bookGeo[slug]) continue;
  const file = path.join(OT_ROOT, '摩西五經', slug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = stripOld(fs.readFileSync(file, 'utf8'));
  const embed = buildMapEmbed(slug, { sectionNum: '地理' });
  if (!embed) continue;

  // Use consistent section label without conflicting numbers
  const section = embed.section.replace('地理、歷史地理互動地圖', '歷史地理互動地圖');

  html = html.replace('</head>', `<!-- BOOK-GEO-HEAD -->${embed.head}<!-- /BOOK-GEO-HEAD -->\n</head>`);

  const checklistMatch = html.match(/<h2 class="text-xl font-semibold serif mb-4">七、研讀清單與默想<\/h2>/);
  if (checklistMatch) {
    html = html.replace(
      checklistMatch[0],
      `<h2 class="text-xl font-semibold serif mb-4">八、研讀清單與默想</h2>`
    );
    html = html.replace(
      /(\s*<section class="bg-white rounded-2xl border p-6 sm:p-8">\s*<h2 class="text-xl font-semibold serif mb-4">八、研讀清單與默想)/,
      `<!-- BOOK-GEO-MAP -->${section}<!-- /BOOK-GEO-MAP -->$1`
    );
  } else {
    html = html.replace(/\s*<\/main>/, `\n    <!-- BOOK-GEO-MAP -->${section}<!-- /BOOK-GEO-MAP -->\n  </main>`);
  }

  html = html.replace('</body>', `<!-- BOOK-GEO-SCRIPTS -->${embed.scripts}<!-- /BOOK-GEO-SCRIPTS -->\n</body>`);
  fs.writeFileSync(file, html, 'utf8');
  console.log('Torah map:', slug);
}

console.log('Done Torah maps');
