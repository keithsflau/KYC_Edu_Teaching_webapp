import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { ntOtherBooks } from './books-nt-other.mjs';
import { buildMapEmbed } from './geo-embed.mjs';
import { uxHead, uxScripts } from './study-ux-embed.mjs';
import { renderVerseSection } from './verse-render.mjs';
import { NT_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = NT_ROOT;

const THEMES = {
  使徒行傳: { from: 'from-teal-900', to: 'to-emerald-950', light: 'teal', border: 'teal-200', accent: 'teal-800', bg: 'bg-teal-50/30' },
  一般書信: { from: 'from-emerald-900', to: 'to-green-950', light: 'emerald', border: 'emerald-200', accent: 'emerald-800', bg: 'bg-emerald-50/30' },
  保羅書信: { from: 'from-blue-900', to: 'to-indigo-950', light: 'blue', border: 'blue-200', accent: 'blue-800', bg: 'bg-blue-50/30' },
};

const HUB_STYLES = {
  一般書信: { bg: 'from-emerald-50/80 via-white to-green-50/50', grad: 'rgba(16,185,129,.15)', border: 'rgba(16,185,129,.22)', link: 'emerald-800', accent: 'emerald-900' },
};

function bookDir(b) {
  if (b.standalone) return path.join(ROOT, b.slug);
  return path.join(ROOT, b.category, b.slug);
}

function assetDepth(b) {
  return b.standalone ? '../../../' : '../../../../';
}

function vcPath(b) {
  if (b.standalone) return `bible_study/經卷/新約/${b.slug}/index`;
  return `bible_study/經卷/新約/${b.category}/${b.slug}/index`;
}

function backLabel(b) {
  if (b.standalone) return '新約研讀';
  return b.category;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function renderBook(b) {
  const t = THEMES[b.category];
  const key = b.slug.replace(/\//g, '-');
  const assets = assetDepth(b);
  const back = '../index.html';

  const units = b.units.map(u =>
    `<tr><td class="font-medium text-${t.accent}">${esc(u[0])}</td><td>${esc(u[1])}</td><td>${esc(u[2])}</td>${u[3] ? `<td>${esc(u[3])}</td>` : ''}</tr>`
  ).join('');
  const unitHead = b.units[0]?.[3] ? '<th>關鍵經文</th>' : '';

  const outlines = b.outlines.map(o => `
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

  const extraTables = (b.extraTables || []).map(tbl => `
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

  const featured = b.featuredLink
    ? `<a href="${b.featuredLink.href}" class="text-sm px-4 py-2 rounded-full bg-${t.light}-600 text-white font-medium hover:bg-${t.light}-700 shadow-sm">${esc(b.featuredLink.label)}</a>`
    : '';
  const links = (b.links || []).map(l =>
    `<a href="${l.href}" class="text-sm px-3 py-2 rounded-full bg-white border text-${t.accent} hover:bg-${t.light}-50">${esc(l.label)}</a>`
  ).join('');

  const reflections = (b.reflections || []).map(r => `<li>${esc(r)}</li>`).join('');

  const mapEmbed = buildMapEmbed(b.slug, { sectionTitle: '五、歷史地理互動地圖' });
  const mapSection = mapEmbed ? mapEmbed.section : '';
  const mapHead = mapEmbed ? mapEmbed.head : uxHead;
  const mapScripts = mapEmbed ? mapEmbed.scripts : uxScripts;

  const bg = b.background;
  let secNum = 6;
  const backgroundSection = bg ? `
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8 text-sm text-slate-700 leading-relaxed">
      <h2 class="text-xl font-semibold serif mb-4 text-slate-900">${secNum++}、作者、背景與讀經提醒</h2>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        ${bg.author ? `<div><span class="text-slate-500">作者／傳統</span><p class="font-medium">${bg.author}</p></div>` : ''}
        ${bg.period ? `<div><span class="text-slate-500">年代／處境</span><p class="font-medium">${bg.period}</p></div>` : ''}
        ${bg.setting ? `<div class="md:col-span-2"><span class="text-slate-500">歷史場景</span><p class="font-medium">${bg.setting}</p></div>` : ''}
        ${bg.literary ? `<div class="md:col-span-2"><span class="text-slate-500">文學體裁</span><p>${bg.literary}</p></div>` : ''}
      </div>
      ${(bg.tips || []).length ? `<h3 class="font-semibold mb-2 text-slate-900">讀經提醒</h3><ul class="list-disc list-inside space-y-1">${bg.tips.map(tip => `<li>${tip}</li>`).join('')}</ul>` : ''}
    </section>` : '';

  const readingSection = (b.readingPath || []).length ? `
    <section class="ux-reveal bg-${t.light}-50/60 border border-${t.border} rounded-2xl p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">${secNum++}、建議研讀路線</h2>
      <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700 leading-relaxed">
        ${b.readingPath.map((step, i) => `<li><strong>第 ${i + 1} 步：</strong>${step}</li>`).join('')}
      </ol>
    </section>` : '';

  const checklistLabel = `${secNum}、研讀清單與默想`;
  const langLine = b.greek || b.hebrew || '';

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
  <link rel="stylesheet" href="${assets}visit-counter.css">
  ${mapHead}
</head>
<body class="${t.bg} text-slate-900 min-h-screen" style="--bc:#e2e8f0;--bh:#f8fafc">
  <header class="ux-header bg-gradient-to-br ${t.from} ${t.to} text-white px-4 py-10">
    <div class="max-w-5xl mx-auto">
      <a href="${back}" class="text-${t.light}-200 text-sm hover:text-white">← ${esc(backLabel(b))}</a>
      <p class="text-xs tracking-widest text-${t.light}-300 mt-4">${esc(langLine)} · ${esc(b.english)} · ${b.chapters} 章</p>
      <h1 class="text-4xl font-bold serif mt-1">${esc(b.title)}</h1>
      <p class="text-${t.light}-100 mt-3 text-sm leading-relaxed max-w-3xl">${b.intro}</p>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-8 space-y-8">
    <div class="flex flex-wrap gap-2">${featured}${links}
      <a href="${assets}查經/查經法/OIA/index.html" class="text-sm px-3 py-2 rounded-full bg-white border text-${t.accent}">OIA 查經法</a>
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
  <script src="${assets}visit-counter.js"></script>
  <script>VisitCounter.init('${vcPath(b)}',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
  ${mapScripts}
</body>
</html>`;
}

function renderGeneralHub(bookList) {
  const cat = '一般書信';
  const t = THEMES[cat];
  const h = HUB_STYLES[cat];
  const meta = {
    english: 'General Epistles',
    desc: '希伯來書、雅各書、彼得前後書、約翰一二三書、猶大書',
    intro: '一般書信（或稱大公書信）涵蓋希伯來書至猶大書，處理基督的超越、信心與行為、逼迫中的盼望、愛與真理、假教師警戒等主題。每卷含結構分析、希臘文重點金句與互動地圖。',
    overviewTitle: '一、一般書信在新約中的位置',
    overview: '介乎保羅書信與啟示錄之間，作者多元（希伯來書作者不詳、雅各與猶大為主耶穌兄弟、彼得與約翰為使徒），讀者分散於小亞細亞及地中海世界。宜與使徒行傳、保羅書信對讀，把握早期教會處境。',
    timeline: [
      ['希伯來書', '更美之約與大祭司'],
      ['雅各書', '信心與行為'],
      ['彼得前後書', '寄居、受苦、主再來'],
      ['約翰一二三書', '生命、真理、愛'],
      ['猶大書', '為真道爭辯'],
    ],
  };

  const cards = bookList.filter(b => b.category === cat).map((b, i) => {
    const num = String(i + 1).padStart(2, '0');
    return `<a href="${b.slug}/index.html" class="book-card glass-card rounded-2xl p-6 block group" style="animation-delay:${(i * 0.05).toFixed(2)}s">
      <span class="text-xs font-bold text-${t.accent}">${num} · ${esc(b.greek || '')}</span>
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
  <title>${cat} | ${meta.english}</title>
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
  </style>
  <link rel="stylesheet" href="../../../visit-counter.css">
</head>
<body class="antialiased text-slate-900 bg-gradient-to-br ${h.bg} min-h-screen">
  <div class="relative min-h-screen overflow-hidden">
    <div class="gradient-bg pointer-events-none" aria-hidden="true"></div>
    <div class="relative z-10">
      <header class="px-6 py-12 max-w-6xl mx-auto">
        <a href="../index.html" class="text-sm text-${h.link}/80 hover:text-${h.accent}">← 返回新約目錄</a>
        <p class="text-xs tracking-[0.25em] uppercase text-${h.link} font-semibold mt-6 mb-2">${esc(meta.english)}</p>
        <h1 class="text-4xl sm:text-5xl font-bold serif">${cat}</h1>
        <p class="text-slate-600 mt-3 max-w-2xl leading-relaxed">${meta.intro}</p>
      </header>
      <main class="px-6 pb-16 max-w-6xl mx-auto space-y-10">
        <section class="glass-card rounded-2xl p-6 sm:p-8">
          <h2 class="text-xl font-semibold serif mb-4">${esc(meta.overviewTitle)}</h2>
          <p class="text-sm text-slate-700 leading-relaxed mb-4">${meta.overview}</p>
          <div class="text-sm text-slate-600 space-y-2">${meta.timeline.map(x => `<p><strong class="text-${h.accent}">${esc(x[0])}</strong> — ${x[1]}</p>`).join('')}</div>
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
  <script>VisitCounter.init('bible_study/經卷/新約/一般書信/index',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
</body>
</html>`;
}

for (const b of ntOtherBooks) {
  const dir = bookDir(b);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderBook(b), 'utf8');
  console.log('NT book:', b.title);
}

fs.mkdirSync(path.join(ROOT, '一般書信'), { recursive: true });
fs.writeFileSync(path.join(ROOT, '一般書信', 'index.html'), renderGeneralHub(ntOtherBooks), 'utf8');
console.log('Hub: 一般書信');

console.log('Done:', ntOtherBooks.length, 'NT other books');
