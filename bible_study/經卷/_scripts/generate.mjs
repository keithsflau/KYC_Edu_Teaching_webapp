import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { books } from './books-data.mjs';
import { buildMapEmbed } from './geo-embed.mjs';
import { uxHead, uxScripts } from './study-ux-embed.mjs';
import { renderVerseSection } from './verse-render.mjs';
import { OT_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = OT_ROOT;

const THEMES = {
  歷史書: { from: 'from-sky-900', to: 'to-blue-950', light: 'sky', border: 'sky-200', accent: 'sky-800', bg: 'bg-sky-50/30' },
  詩歌智慧書: { from: 'from-rose-900', to: 'to-pink-950', light: 'rose', border: 'rose-200', accent: 'rose-800', bg: 'bg-rose-50/30' },
  先知書: { from: 'from-indigo-900', to: 'to-violet-950', light: 'indigo', border: 'indigo-200', accent: 'indigo-800', bg: 'bg-indigo-50/30' },
};

/** 僅此卷保留「新約連結與基督預表」專節 */
const NT_SECTION_BOOKS = new Set(['以賽亞書']);

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderBook(b) {
  const t = THEMES[b.category];
  const key = b.slug.replace(/\//g, '-');
  const back = `../index.html`;
  const vcPath = `bible_study/經卷/舊約/${b.category}/${b.slug}/index`;

  const units = b.units.map(u =>
    `<tr><td class="font-medium text-${t.accent}">${esc(u[0])}</td><td>${esc(u[1])}</td><td>${esc(u[2])}</td>${u[3] ? `<td>${esc(u[3])}</td>` : ''}</tr>`
  ).join('');
  const unitHead = b.units[0]?.[3] ? '<th>關鍵經文</th>' : '';
  const unitCols = b.units[0]?.[3] ? 4 : 3;

  const outlines = b.outlines.map((o, i) => `
        <div class="border rounded-xl overflow-hidden">
          <button type="button" class="sec-btn w-full text-left px-4 py-3 font-medium text-sm flex justify-between">${esc(o.title)}<span>＋</span></button>
          <div class="sec-body px-4 text-sm text-slate-600"><div class="pb-4 space-y-2">
            ${o.items.map(p => `<p>${p}</p>`).join('')}
          </div></div>
        </div>`).join('');

  const analysis = b.analysis.map(a => `
        <details class="border rounded-xl p-4"><summary class="font-semibold text-${t.accent}">${esc(a.title)}</summary>
          <p class="mt-3 text-slate-600 leading-relaxed">${a.body}</p>
        </details>`).join('');

  const extraTables = (b.extraTables || []).map((tbl, ti) => `
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">四、專題分析：${esc(tbl.title.replace(/^四、[^：]+：?/, ''))}</h2>
      <div class="overflow-x-auto text-sm">
        <table class="tbl w-full">
          <thead><tr>${tbl.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
          <tbody class="text-slate-700">${tbl.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>
    </section>`).join('');

  const verses = renderVerseSection(b.slug, b.verses, b.category);

  const showNt = NT_SECTION_BOOKS.has(b.slug);
  const nt = showNt ? b.nt.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join('') : '';

  const featured = b.featuredLink
    ? `<a href="${b.featuredLink.href}" class="text-sm px-4 py-2 rounded-full bg-${t.light}-600 text-white font-medium hover:bg-${t.light}-700 shadow-sm">${esc(b.featuredLink.label)}</a>`
    : '';
  const links = (b.links || []).map(l =>
    `<a href="${l.href}" class="text-sm px-3 py-2 rounded-full bg-white border text-${t.accent} hover:bg-${t.light}-50">${esc(l.label)}</a>`
  ).join('');

  const reflections = (b.reflections || []).map(r => `<li>${esc(r)}</li>`).join('');

  const mapEmbed = buildMapEmbed(b.slug, {
    sectionTitle: showNt ? '六、歷史地理互動地圖' : '五、歷史地理互動地圖',
  });
  const mapSection = mapEmbed ? mapEmbed.section : '';
  const mapHead = mapEmbed ? mapEmbed.head : uxHead;
  const mapScripts = mapEmbed ? mapEmbed.scripts : uxScripts;

  const ntSection = showNt ? `
    <section class="ux-reveal bg-${t.light}-100/50 border border-${t.border} rounded-2xl p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">五、新約連結與基督預表</h2>
      <div class="overflow-x-auto text-sm">
        <table class="tbl w-full bg-white">
          <thead><tr><th>${esc(b.title)}</th><th>新約／應驗</th></tr></thead>
          <tbody class="text-slate-700">${nt}</tbody>
        </table>
      </div>
    </section>` : '';

  const bg = b.background;
  let secNum = showNt ? 7 : 6;
  const backgroundSection = bg ? `
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8 text-sm text-slate-700 leading-relaxed">
      <h2 class="text-xl font-semibold serif mb-4 text-slate-900">${secNum++}、作者、背景與讀經提醒</h2>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        ${bg.author ? `<div><span class="text-slate-500">作者／傳統</span><p class="font-medium">${bg.author}</p></div>` : ''}
        ${bg.period ? `<div><span class="text-slate-500">年代／處境</span><p class="font-medium">${bg.period}</p></div>` : ''}
        ${bg.setting ? `<div class="md:col-span-2"><span class="text-slate-500">歷史場景</span><p class="font-medium">${bg.setting}</p></div>` : ''}
        ${bg.literary ? `<div class="md:col-span-2"><span class="text-slate-500">文學體裁</span><p>${bg.literary}</p></div>` : ''}
      </div>
      ${(bg.tips || []).length ? `<h3 class="font-semibold mb-2 text-slate-900">讀經提醒</h3><ul class="list-disc list-inside space-y-1">${bg.tips.map(t => `<li>${t}</li>`).join('')}</ul>` : ''}
    </section>` : '';

  const readingSection = (b.readingPath || []).length ? `
    <section class="ux-reveal bg-${t.light}-50/60 border border-${t.border} rounded-2xl p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">${secNum++}、建議研讀路線</h2>
      <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700 leading-relaxed">
        ${b.readingPath.map((step, i) => `<li><strong>第 ${i + 1} 步：</strong>${step}</li>`).join('')}
      </ol>
    </section>` : '';

  const checklistLabel = `${secNum}、研讀清單與默想`;

  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(b.title)} | ${esc(b.english)} - ${esc(b.category)}</title>
  <meta name="description" content="${esc(b.title)}深入研讀：${esc(b.desc)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body{font-family:'Inter',sans-serif}.serif{font-family:'Noto Serif TC',serif}
    .sec-btn{cursor:pointer}.sec-body{max-height:0;overflow:hidden;transition:max-height .4s}.sec-body.show{max-height:8000px}
    .verse-card{cursor:pointer}.verse-text{display:none}.verse-card.open .verse-text{display:block}
    .tbl th,.tbl td{padding:.5rem .75rem;border:1px solid var(--bc);font-size:.8125rem;vertical-align:top;text-align:left}
    .tbl th{background:var(--bh);font-weight:600}
    details>summary{cursor:pointer;list-style:none}details>summary::-webkit-details-marker{display:none}
    .check-item input:checked+span{text-decoration:line-through;color:#64748b}
  </style>
  <link rel="stylesheet" href="../../../../visit-counter.css">
  ${mapHead}
</head>
<body class="${t.bg} text-slate-900 min-h-screen" style="--bc:#e2e8f0;--bh:#f8fafc">
  <header class="ux-header bg-gradient-to-br ${t.from} ${t.to} text-white px-4 py-10">
    <div class="max-w-5xl mx-auto">
      <a href="${back}" class="text-${t.light}-200 text-sm hover:text-white">← ${esc(b.category)}</a>
      <p class="text-xs tracking-widest text-${t.light}-300 mt-4">${esc(b.hebrew)} · ${esc(b.english)} · ${b.chapters} 章</p>
      <h1 class="text-4xl font-bold serif mt-1">${esc(b.title)}</h1>
      <p class="text-${t.light}-100 mt-3 text-sm leading-relaxed max-w-3xl">${b.intro}</p>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-8 space-y-8">
    <div class="flex flex-wrap gap-2">${featured}${links}
      <a href="../../../查經/查經法/OIA/index.html" class="text-sm px-3 py-2 rounded-full bg-white border text-${t.accent}">OIA 查經法</a>
    </div>

    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8 shadow-sm">
      <h2 class="text-xl font-semibold serif mb-4">一、全書結構分析</h2>
      ${b.structureNote ? `<p class="text-sm text-slate-600 mb-4 leading-relaxed">${b.structureNote}</p>` : ''}
      <div class="overflow-x-auto">
        <table class="tbl w-full">
          <thead><tr><th>單元</th><th>章節</th><th>內容／主題</th>${unitHead}</tr></thead>
          <tbody class="text-slate-700">${units}</tbody>
        </table>
      </div>
    </section>

    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">二、分段大綱與詳解（點選展開）</h2>
      <div class="space-y-2">${outlines}</div>
    </section>

    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">三、意思分析與神學重點</h2>
      <div class="grid md:grid-cols-2 gap-4 text-sm">${analysis}</div>
    </section>
    ${extraTables}
    ${verses}
    ${ntSection}
    ${mapSection}
    ${backgroundSection}
    ${readingSection}

    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">${checklistLabel}</h2>
      <div id="checklist" class="space-y-2 text-sm mb-4"></div>
      ${reflections ? `<h3 class="font-semibold text-sm mb-2">默想問題</h3><ul class="list-disc list-inside text-slate-700 space-y-2 text-sm">${reflections}</ul>` : ''}
    </section>
  </main>
  <script>
    const items=${JSON.stringify(b.checklist)};
    const key='${key}-v1';let state=JSON.parse(localStorage.getItem(key)||'[]');
    const box=document.getElementById('checklist');
    box.innerHTML=items.map((t,i)=>\`<label class="check-item flex gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"><input type="checkbox" data-i="\${i}" \${state[i]?'checked':''}><span>\${t}</span></label>\`).join('');
    box.querySelectorAll('input').forEach(inp=>inp.onchange=()=>{state[+inp.dataset.i]=inp.checked;localStorage.setItem(key,JSON.stringify(state));});
  </script>
  <div id="visit-counter-container"></div>
  <script src="../../../../visit-counter.js"></script>
  <script>VisitCounter.init('${vcPath}',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
  ${mapScripts}
</body>
</html>`;
}

const HUB_STYLES = {
  歷史書: { bg: 'from-sky-50/80 via-white to-blue-50/50', grad: 'rgba(56,189,248,.15)', border: 'rgba(56,189,248,.22)', link: 'sky-800', accent: 'sky-900' },
  詩歌智慧書: { bg: 'from-rose-50/80 via-white to-pink-50/50', grad: 'rgba(244,63,94,.15)', border: 'rgba(244,63,94,.22)', link: 'rose-800', accent: 'rose-900' },
  先知書: { bg: 'from-indigo-50/80 via-white to-violet-50/50', grad: 'rgba(99,102,241,.15)', border: 'rgba(99,102,241,.22)', link: 'indigo-800', accent: 'indigo-900' },
};

function renderHub(cat, meta, bookList) {
  const t = THEMES[cat];
  const h = HUB_STYLES[cat];
  const cards = bookList.filter(b => b.category === cat).map((b, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `<a href="${b.slug}/index.html" class="book-card glass-card rounded-2xl p-6 block group" style="animation-delay:${(i * 0.05).toFixed(2)}s">
      <span class="text-xs font-bold text-${t.accent}">${num} · ${esc(b.hebrew)}</span>
      <h3 class="text-xl font-bold serif mt-1 group-hover:text-${t.accent}">${esc(b.title)}</h3>
      <p class="text-xs text-slate-500 mb-2">${esc(b.english)} · ${b.chapters} 章</p>
      <p class="text-sm text-slate-700">${esc(b.hubBlurb || b.desc)}</p>
    </a>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(cat)} | ${esc(meta.english)}</title>
  <meta name="description" content="${esc(meta.desc)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body{font-family:'Inter',sans-serif}.serif{font-family:'Noto Serif TC',serif}
    .gradient-bg{position:absolute;inset:0;background:radial-gradient(circle at 15% 20%,${h.grad},transparent 40%),radial-gradient(circle at 85% 10%,${h.grad},transparent 35%);filter:blur(50px)}
    .glass-card{backdrop-filter:blur(12px);background:rgba(255,255,255,.78);border:1px solid ${h.border};transition:all .3s;box-shadow:0 8px 24px rgba(15,23,42,.06)}
    .glass-card:hover{transform:translateY(-4px)}
    .book-card{opacity:0;animation:fadeUp .7s ease forwards}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
    .tbl th,.tbl td{padding:.5rem .75rem;border:1px solid #e2e8f0;font-size:.8125rem;vertical-align:top;text-align:left}
    .tbl th{background:#f0f9ff;font-weight:600}
  </style>
  <link rel="stylesheet" href="../../../visit-counter.css">
</head>
<body class="antialiased text-slate-900 bg-gradient-to-br ${h.bg} min-h-screen">
  <div class="relative min-h-screen overflow-hidden">
    <div class="gradient-bg pointer-events-none" aria-hidden="true"></div>
    <div class="relative z-10">
      <header class="px-6 py-12 max-w-6xl mx-auto">
        <a href="../index.html" class="text-sm text-${h.link}/80 hover:text-${h.accent}">← 返回舊約目錄</a>
        <p class="text-xs tracking-[0.25em] uppercase text-${h.link} font-semibold mt-6 mb-2">${esc(meta.english)}</p>
        <h1 class="text-4xl sm:text-5xl font-bold serif">${esc(cat)}</h1>
        <p class="text-slate-600 mt-3 max-w-2xl leading-relaxed">${meta.intro}</p>
      </header>
      <main class="px-6 pb-16 max-w-6xl mx-auto space-y-10">
        <section class="glass-card rounded-2xl p-6 sm:p-8">
          <h2 class="text-xl font-semibold serif mb-4">${esc(meta.overviewTitle)}</h2>
          <p class="text-sm text-slate-700 leading-relaxed mb-4">${meta.overview}</p>
          ${meta.timeline ? `<div class="text-sm text-slate-600 space-y-2">${meta.timeline.map(x => `<p><strong class="text-${h.accent}">${esc(x[0])}</strong> — ${x[1]}</p>`).join('')}</div>` : ''}
        </section>
        <section>
          <h2 class="text-2xl font-semibold serif text-center mb-6">各卷深入研讀入口</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${cards}</div>
        </section>
      </main>
      <div id="visit-counter-container"></div>
    </div>
  </div>
  <script src="../../../visit-counter.js"></script>
  <script>VisitCounter.init('bible_study/經卷/舊約/${cat}/index',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
</body>
</html>`;
}

const hubs = {
  歷史書: {
    english: 'Historical Books',
    desc: '舊約歷史書深入研讀：進迦南、士師、王國、被擄與歸回',
    intro: '歷史書記載以色列從約書亞進迦南至被擄歸回的國族史，呈現神的信實、人的悖逆與約的延續。每卷含結構分析、分段詳解與神學重點。',
    overviewTitle: '一、歷史書在舊約中的位置',
    overview: '接續摩西五經，歷史書（約書亞記至以斯帖記）描繪「應許之地—王國興衰—被擄—歸回」的救贖史軌跡。撒母耳記下至列王紀下為「前先知書」傳統；歷代志從敬拜與大衛之約角度重述；以斯拉、尼希米、以斯帖記錄歸回與保守餘民。',
    timeline: [
      ['約書亞記', '進迦南、分地、立約'],
      ['士師記—路得記', '循環敗壞與慈愛逆轉'],
      ['撒母耳記—列王紀', '聯合王國至分裂、滅亡'],
      ['歷代志', '敬拜與大衛之約視角'],
      ['以斯拉—尼希米—以斯帖', '歸回、重建、保守'],
    ],
  },
  詩歌智慧書: {
    english: 'Poetry & Wisdom',
    desc: '詩歌智慧書研讀：約伯、詩篇、箴言、傳道書、雅歌',
    intro: '詩歌智慧書以詩體、格言、對話與愛歌等形式，探索苦難、敬拜、智慧、虛空與愛，是信仰與人生處境的深度反思。',
    overviewTitle: '一、詩歌智慧書的文學特色',
    overview: '此五卷不以敘事為主，而以詩歌、對話、箴言、反思呈現人如何在神面前理解苦難（約伯）、表達情感（詩篇）、活出智慧（箴言）、面對虛空（傳道書）、慶祝愛與盟約（雅歌）。讀時須留意體裁與修辭，不宜一律字面化。',
    timeline: [
      ['約伯記', '義人受苦與神主權'],
      ['詩篇', '敬拜、哀歌、讚美、智慧詩'],
      ['箴言', '敬畏耶和華是智慧開端'],
      ['傳道書', '虛空之下的真實人生'],
      ['雅歌', '愛與盟約的慶祝'],
    ],
  },
  先知書: {
    english: 'Prophetic Books',
    desc: '大小先知書研讀：審判、安慰、彌賽亞與新約應驗',
    intro: '先知書記載神藉先知向以色列與列國宣告話語：審判罪惡、呼召悔改、應許安慰與彌賽亞盼望。大先知書五卷、小先知書十二卷。',
    overviewTitle: '一、先知書的結構與讀法',
    overview: '先知書常含歷史敘事（如以賽亞 36–39）、詩歌、異象、象徵行動與末世預言。讀先知書要把握當時歷史處境、文學體裁，以及「審判—悔改—恢復」的張力；許多預言有當時與將來雙重指向，並在基督與新約中應驗。',
    timeline: [
      ['大先知書', '以賽亞、耶利米、哀歌、以西結、但以理'],
      ['小先知書', '何西亞至瑪拉基，針對北國、南國與列國'],
    ],
  },
};

for (const b of books) {
  const dir = path.join(ROOT, b.category, b.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderBook(b), 'utf8');
  console.log('Book:', b.title);
}

for (const [cat, meta] of Object.entries(hubs)) {
  fs.writeFileSync(path.join(ROOT, cat, 'index.html'), renderHub(cat, meta, books), 'utf8');
  console.log('Hub:', cat);
}

console.log('Done:', books.length, 'books');
