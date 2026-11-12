import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { topics } from './topics-data.mjs';
import { buildMapEmbed } from './geo-embed.mjs';
import { uxHead, uxScripts } from './study-ux-embed.mjs';
import { renderVerseSection } from './verse-render.mjs';
import { fixVolumeHref } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..', '專題');

const PALETTES = {
  amber: { from: 'from-amber-900', to: 'to-orange-950', light: 'amber', border: 'amber-200', accent: 'amber-800', bg: 'bg-amber-50/30', tbl: '#fef3c7' },
  emerald: { from: 'from-emerald-900', to: 'to-teal-950', light: 'emerald', border: 'emerald-200', accent: 'emerald-800', bg: 'bg-emerald-50/30', tbl: '#d1fae5' },
  violet: { from: 'from-violet-900', to: 'to-purple-950', light: 'violet', border: 'violet-200', accent: 'violet-800', bg: 'bg-violet-50/30', tbl: '#ede9fe' },
  sky: { from: 'from-sky-900', to: 'to-blue-950', light: 'sky', border: 'sky-200', accent: 'sky-800', bg: 'bg-sky-50/30', tbl: '#e0f2fe' },
  rose: { from: 'from-rose-900', to: 'to-pink-950', light: 'rose', border: 'rose-200', accent: 'rose-800', bg: 'bg-rose-50/30', tbl: '#ffe4e6' },
  indigo: { from: 'from-indigo-900', to: 'to-violet-950', light: 'indigo', border: 'indigo-200', accent: 'indigo-800', bg: 'bg-indigo-50/30', tbl: '#e0e7ff' },
  slate: { from: 'from-slate-800', to: 'to-slate-950', light: 'slate', border: 'slate-200', accent: 'slate-800', bg: 'bg-slate-50/40', tbl: '#f1f5f9' },
  red: { from: 'from-red-900', to: 'to-rose-950', light: 'red', border: 'red-200', accent: 'red-800', bg: 'bg-red-50/30', tbl: '#fee2e2' },
  fuchsia: { from: 'from-fuchsia-900', to: 'to-purple-950', light: 'fuchsia', border: 'fuchsia-200', accent: 'fuchsia-800', bg: 'bg-fuchsia-50/30', tbl: '#fae8ff' },
};

function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function renderTopic(t) {
  const p = PALETTES[t.palette] || PALETTES.indigo;
  const key = t.slug.replace(/\//g,'-');
  const mapEmbed = buildMapEmbed(t.slug, { sectionTitle: '五、歷史地理互動地圖' });
  const mapSection = mapEmbed ? mapEmbed.section : '';
  const mapHead = mapEmbed ? mapEmbed.head : uxHead;
  const mapScripts = mapEmbed ? mapEmbed.scripts : uxScripts;

  const outlines = (t.outlines || []).map(o => `
        <div class="border rounded-xl overflow-hidden">
          <button type="button" class="sec-btn w-full text-left px-4 py-3 font-medium text-sm flex justify-between">${esc(o.title)}<span>＋</span></button>
          <div class="sec-body px-4 text-sm text-slate-600"><div class="pb-4 space-y-2">${o.items.map(i => `<p>${i}</p>`).join('')}</div></div>
        </div>`).join('');

  const tables = (t.tables || []).map(tbl => `
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">${esc(tbl.title)}</h2>
      ${tbl.note ? `<p class="text-sm text-slate-600 mb-4">${tbl.note}</p>` : ''}
      <div class="overflow-x-auto text-sm"><table class="tbl w-full">
        <thead><tr>${tbl.headers.map(h => `<th>${esc(h)}</th>`).join('')}</tr></thead>
        <tbody class="text-slate-700">${tbl.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody>
      </table></div>
    </section>`).join('');

  const analysis = (t.analysis || []).map(a => `
        <details class="border rounded-xl p-4"><summary class="font-semibold text-${p.accent}">${esc(a.title)}</summary>
          <p class="mt-3 text-slate-600 leading-relaxed">${a.body}</p></details>`).join('');

  const verses = renderVerseSection(t.slug, t.verses || [], '專題', '四、重點金句（點選展開 · 含原文註釋）');

  const links = (t.links || []).map(l =>
    `<a href="${fixVolumeHref(l.href)}" class="text-sm px-3 py-2 rounded-full bg-white border text-${p.accent} hover:bg-${p.light}-50">${esc(l.label)}</a>`
  ).join('');
  const bg = t.background;
  const bgSection = bg ? `
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8 text-sm text-slate-700 leading-relaxed">
      <h2 class="text-xl font-semibold serif mb-4 text-slate-900">六、背景與讀經提醒</h2>
      <div class="grid md:grid-cols-2 gap-4 mb-4">
        ${bg.scope ? `<div class="md:col-span-2"><span class="text-slate-500">範圍</span><p class="font-medium">${bg.scope}</p></div>` : ''}
        ${bg.setting ? `<div class="md:col-span-2"><span class="text-slate-500">處境</span><p>${bg.setting}</p></div>` : ''}
      </div>
      <ul class="list-disc list-inside space-y-1">${(bg.tips||[]).map(x=>`<li>${x}</li>`).join('')}</ul>
    </section>` : '';

  const readSec = (t.readingPath||[]).length ? `
    <section class="ux-reveal bg-${p.light}-50/60 border border-${p.border} rounded-2xl p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">七、建議研讀路線</h2>
      <ol class="list-decimal list-inside space-y-2 text-sm text-slate-700">${t.readingPath.map((s,i)=>`<li><strong>第${i+1}步：</strong>${s}</li>`).join('')}</ol>
    </section>` : '';

  const refl = (t.reflections||[]).map(r=>`<li>${esc(r)}</li>`).join('');

  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(t.title)} | ${esc(t.english)} - 聖經專題</title>
  <meta name="description" content="${esc(t.desc)}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body{font-family:'Inter',sans-serif}.serif{font-family:'Noto Serif TC',serif}
    .sec-btn{cursor:pointer}.sec-body{max-height:0;overflow:hidden;transition:max-height .5s}.sec-body.show{max-height:12000px}
    .verse-card{cursor:pointer}.verse-text{display:none}.verse-card.open .verse-text{display:block}
    .tbl th,.tbl td{padding:.5rem .75rem;border:1px solid #e2e8f0;font-size:.8125rem;vertical-align:top;text-align:left}
    .tbl th{background:${p.tbl};font-weight:600}
    details>summary{cursor:pointer;list-style:none}details>summary::-webkit-details-marker{display:none}
    .check-item input:checked+span{text-decoration:line-through;color:#64748b}
  </style>
  <link rel="stylesheet" href="../../../../visit-counter.css">
  ${mapHead}
</head>
<body class="${p.bg} text-slate-900 min-h-screen">
  <header class="ux-header bg-gradient-to-br ${p.from} ${p.to} text-white px-4 py-10">
    <div class="max-w-5xl mx-auto">
      <a href="../index.html" class="text-${p.light}-200 text-sm hover:text-white">← 專題研讀</a>
      <p class="text-xs tracking-widest text-${p.light}-300 mt-4">專題 · ${esc(t.english)}</p>
      <h1 class="text-3xl sm:text-4xl font-bold serif mt-1">${esc(t.title)}</h1>
      <p class="text-${p.light}-100 mt-3 text-sm leading-relaxed max-w-3xl">${t.intro}</p>
    </div>
  </header>
  <main class="max-w-5xl mx-auto px-4 py-8 space-y-8">
    <div class="flex flex-wrap gap-2">${links}
      <a href="../../../查經/查經法/OIA/index.html" class="text-sm px-3 py-2 rounded-full bg-white border text-${p.accent}">OIA 查經法</a>
    </div>
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8 shadow-sm">
      <h2 class="text-xl font-semibold serif mb-4">一、專題概述</h2>
      <p class="text-sm text-slate-700 leading-relaxed">${t.overview}</p>
    </section>
    ${tables}
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">二、分段詳解（點選展開）</h2>
      <div class="space-y-2">${outlines}</div>
    </section>
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">三、意思分析與神學重點</h2>
      <div class="grid md:grid-cols-2 gap-4 text-sm">${analysis}</div>
    </section>
    ${verses}
    ${mapSection}
    ${bgSection}${readSec}
    <section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-4">八、研讀清單與默想</h2>
      <div id="checklist" class="space-y-2 text-sm mb-4"></div>
      <ul class="list-disc list-inside text-slate-700 space-y-2 text-sm">${refl}</ul>
    </section>
  </main>
  <script>
    const items=${JSON.stringify(t.checklist||[])};
    const key='${key}-v1';let state=JSON.parse(localStorage.getItem(key)||'[]');
    const box=document.getElementById('checklist');
    box.innerHTML=items.map((t,i)=>\`<label class="check-item flex gap-2 p-2 rounded hover:bg-slate-50 cursor-pointer"><input type="checkbox" data-i="\${i}" \${state[i]?'checked':''}><span>\${t}</span></label>\`).join('');
    box.querySelectorAll('input').forEach(inp=>inp.onchange=()=>{state[+inp.dataset.i]=inp.checked;localStorage.setItem(key,JSON.stringify(state));});
  </script>
  <div id="visit-counter-container"></div>
  <script src="../../../../visit-counter.js"></script>
  <script>VisitCounter.init('bible_study/經卷/專題/${t.slug}/index',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
  ${mapScripts}
</body></html>`;
}

function renderHub(list) {
  const cards = list.map(t => {
    const p = PALETTES[t.palette] || PALETTES.indigo;
    return `<a href="${t.slug}/index.html" class="glass block rounded-2xl p-6 border hover:-translate-y-1 transition-all">
      <span class="text-xs font-bold text-${p.accent}">${esc(t.english)}</span>
      <h3 class="text-xl font-bold serif mt-1 text-slate-900">${esc(t.title)}</h3>
      <p class="text-sm text-slate-600 mt-2">${esc(t.hubBlurb || t.desc)}</p>
    </a>`;
  }).join('');
  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>專題研讀 | Biblical Topics</title>
  <meta name="description" content="聖經跨經卷專題：十誡、祭禮、預表、十二支派等深入研讀">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>body{font-family:'Inter',sans-serif}.serif{font-family:'Noto Serif TC',serif}.glass{background:rgba(255,255,255,.85);border:1px solid rgba(99,102,241,.2)}</style>
  <link rel="stylesheet" href="../../../visit-counter.css">
</head>
<body class="bg-gradient-to-br from-indigo-50 via-white to-violet-50 min-h-screen">
  <header class="px-6 py-12 max-w-6xl mx-auto">
    <a href="../index.html" class="text-sm text-indigo-700">← 經卷目錄</a>
    <h1 class="text-4xl font-bold serif mt-4">專題研讀</h1>
    <p class="text-slate-600 mt-3 max-w-2xl">跨經卷主題深入分析：律法、敬拜、預表、支派、外族、詩篇體裁、受苦僕人等。每專題含分段詳解、表格、神學分析與研讀路線。</p>
  </header>
  <main class="px-6 pb-16 max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${cards}</main>
  <div id="visit-counter-container"></div>
  <script src="../../../visit-counter.js"></script>
  <script>VisitCounter.init('bible_study/經卷/專題/index',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
</body></html>`;
}

fs.mkdirSync(ROOT, { recursive: true });
for (const t of topics) {
  const dir = path.join(ROOT, t.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), renderTopic(t), 'utf8');
  console.log('Topic:', t.title);
}
fs.writeFileSync(path.join(ROOT, 'index.html'), renderHub(topics), 'utf8');
console.log('Done:', topics.length, 'topics');
