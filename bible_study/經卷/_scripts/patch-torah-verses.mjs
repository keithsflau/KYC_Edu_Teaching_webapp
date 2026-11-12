import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderVerseSection } from './verse-render.mjs';
import { OT_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TORAH = ['創世記', '出埃及記', '利未記', '民數記', '申命記'];

const torahVerses = {
  創世記: [
    ['創 1:1、1:27 · 創造與形像', '「起初，神創造天地。」「神就照著自己的形像造人，乃是照著他的形像造男造女。」'],
    ['創 3:15 · 女人的後裔', '「我又要叫你和女人彼此為仇…女人的後裔要傷你的頭，你要傷他的腳跟。」'],
    ['創 12:1–3 · 萬邦得福', '「你要離開本地…往我所要指示你的地去…地上萬族因你得福。」'],
    ['創 15:6 · 因信稱義', '「亞伯蘭信耶和華，耶和華就以此為他的義。」（羅 4:3）'],
    ['創 22:14 · 耶和華以勒', '「耶和華以勒…在耶和華的山上必有預備。」預表神預備代贖羔羊。'],
    ['創 50:20 · 神的意思原是好的', '「從前你們的意思是要害我，但神的意思原是好的，要保全許多人的性命。」'],
  ],
  出埃及記: [
    ['出 3:14 · 我是自有永有的', '「神對摩西說：『我是自有永有的。』…『你們要對以色列人說：那自有的打發我到你們這裡來。』」'],
    ['出 12:13 · 逾越節', '「我看見這血，就越過你們去…這血要在你們所住的房屋上作記號…救贖你們。」'],
    ['出 20:2–3 · 十誡序言', '「我是耶和華你的神，曾將你從埃及地為奴之家領出來。除了我以外，你不可有別的神。」'],
    ['出 34:6–7 · 神宣告名號', '「耶和華，耶和華，是有憐憫有恩典的神，不輕易發怒，並有豐盛的慈愛和誠實…」'],
    ['出 40:34–35 · 榮光充滿', '「雲彩遮蓋會幕…耶和華的榮光充滿了帳幕。摩西不能進入會幕…」'],
  ],
  利未記: [
    ['利 11:45 · 要聖潔', '「你們要聖潔，因為我是聖潔的。」'],
    ['利 16:30 · 贖罪日', '「因在這日，要為你們贖罪，使你們潔淨，你們要在耶和華面前得以潔淨，脫盡一切的罪孽。」'],
    ['利 17:11 · 血的能力', '「因血里有生命，所以能贖罪。」'],
    ['利 19:18 · 愛人如己', '「不可報仇，也不可埋怨你本國的族人，卻要愛人如己。」'],
  ],
  民數記: [
    ['民 6:24–26 · 祭司祝福', '「願耶和華賜福給你，保護你。願耶和華使他的臉光照你，賜恩給你。願耶和華向你仰臉，賜你平安。」'],
    ['民 14:18–19 · 摩西代求', '「耶和華啊，求你按你的大慈愛赦免這百姓的罪孽…」'],
    ['民 21:8–9 · 銅蛇', '「摩西便製造一條銅蛇…凡被咬的，一望銅蛇就活了。」（約 3:14–15 基督類比）'],
    ['民 24:17 · 巴蘭預言', '「有星出於雅各，有杖興於以色列…」彌賽亞預言傳統之一。'],
  ],
  申命記: [
    ['申 6:6–9 · 教導兒女', '「這些話你們要放在心上…也要殷勤教訓你的兒女…繫在手上為記號…寫在門框上。」'],
    ['申 10:12–13 · 神要什麼', '「現在以色列啊，耶和華你神向你所要的是什麼呢？…只要敬畏…行事與祂喜悅，盡心盡性侍奉…遵守誡命律例。」'],
    ['申 18:15 · 先知像摩西', '「耶和華你的神要從你弟兄中間給你興起一位先知像我。」（徒 3:22；基督應驗）'],
    ['申 30:19–20 · 選擇生命', '「…我今日呼天喚地向你作見證…你要揀選生命…因為他是你的生命。」'],
    ['申 34:10', '「以後在以色列中沒有興起先知像摩西的，他是耶和華面對面所認識的。」'],
  ],
};

const MARKER = '<!-- BOOK-VERSE-NOTES -->';

function stripOld(html) {
  return html.replace(/<!-- BOOK-VERSE-NOTES -->[\s\S]*?<!-- \/BOOK-VERSE-NOTES -->/g, '');
}

function replaceVerseSection(html, slug) {
  const verses = torahVerses[slug];
  if (!verses) return html;
  const section = renderVerseSection(slug, verses, '摩西五經', '四、重點金句（點選展開 · 含原文註釋）');

  html = html.replace(
    /<section class="[^"]*">\s*<h2[^>]*>四、重點經文[^<]*<\/h2>[\s\S]*?<\/section>/,
    ''
  );

  html = stripOld(html);
  if (html.includes('<!-- BOOK-GEO-MAP -->')) {
    return html.replace(
      '<!-- BOOK-GEO-MAP -->',
      `${MARKER}${section}<!-- /BOOK-VERSE-NOTES -->\n    <!-- BOOK-GEO-MAP -->`
    );
  }
  return html.replace(/\s*<\/main>/, `\n    ${MARKER}${section}<!-- /BOOK-VERSE-NOTES -->\n  </main>`);
}

for (const slug of TORAH) {
  const file = path.join(OT_ROOT, '摩西五經', slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  const html = replaceVerseSection(fs.readFileSync(file, 'utf8'), slug);
  fs.writeFileSync(file, html, 'utf8');
  console.log('Torah verses:', slug);
}
console.log('Done Torah verse notes');
