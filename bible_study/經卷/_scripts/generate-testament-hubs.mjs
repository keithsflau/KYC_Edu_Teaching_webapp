import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const OT_CARDS = [
  { href: '摩西五經/index.html', title: '摩西五經', en: 'Torah', color: 'amber', desc: '創世記至申命記：創造、救贖、會幕、曠野與立約。', count: '五卷' },
  { href: '歷史書/index.html', title: '歷史書', en: 'Historical Books', color: 'sky', desc: '約書亞記至以斯帖記：進迦南、王國、被擄與歸回。', count: '十二卷' },
  { href: '詩歌智慧書/index.html', title: '詩歌智慧書', en: 'Poetry & Wisdom', color: 'rose', desc: '約伯、詩篇、箴言、傳道書、雅歌。', count: '五卷' },
  { href: '先知書/index.html', title: '先知書', en: 'Prophetic Books', color: 'indigo', desc: '大小先知十七卷：審判、安慰與彌賽亞預言。', count: '十七卷' },
];

const NT_CARDS = [
  { href: '四福音/index.html', title: '四福音', en: 'Four Gospels', color: 'teal', desc: '馬太、馬可、路加、約翰：耶穌生平、教訓與救贖。', count: '四卷' },
  { href: '使徒行傳/index.html', title: '使徒行傳', en: 'Acts', color: 'cyan', desc: '聖靈降臨、教會誕生、保羅宣教直至羅馬。', count: '一卷' },
  { href: '保羅書信/index.html', title: '保羅書信', en: 'Pauline Epistles', color: 'blue', desc: '羅馬書至腓利門書：福音真理與教會生活。', count: '十三卷' },
  { href: '一般書信/index.html', title: '一般書信', en: 'General Epistles', color: 'emerald', desc: '希伯來書至猶大書：更美之約、信心、愛與真理。', count: '八卷' },
  { href: '啟示錄/index.html', title: '啟示錄', en: 'Revelation', color: 'purple', desc: '約翰的末世異象：審判、得勝與新天新地。', count: '一卷' },
];

const COLOR = {
  amber: { grad: 'from-amber-500 via-orange-600 to-yellow-700', text: 'amber-700', hover: 'amber-800' },
  sky: { grad: 'from-sky-400 via-blue-500 to-cyan-600', text: 'sky-700', hover: 'sky-800' },
  rose: { grad: 'from-rose-400 via-pink-500 to-fuchsia-600', text: 'rose-700', hover: 'rose-800' },
  indigo: { grad: 'from-indigo-400 via-violet-500 to-purple-600', text: 'indigo-700', hover: 'indigo-800' },
  orange: { grad: 'from-amber-400 via-orange-500 to-red-600', text: 'orange-700', hover: 'orange-800' },
  teal: { grad: 'from-teal-400 via-sky-500 to-indigo-500', text: 'teal-600', hover: 'teal-700' },
  blue: { grad: 'from-blue-400 via-indigo-500 to-purple-600', text: 'blue-600', hover: 'blue-700' },
  purple: { grad: 'from-purple-400 via-violet-500 to-fuchsia-600', text: 'purple-600', hover: 'purple-700' },
  cyan: { grad: 'from-cyan-400 via-teal-500 to-emerald-600', text: 'cyan-600', hover: 'cyan-700' },
  emerald: { grad: 'from-emerald-400 via-green-500 to-teal-600', text: 'emerald-600', hover: 'emerald-700' },
};

function card(c, i) {
  const t = COLOR[c.color];
  return `<a href="${c.href}" class="category-card glass-card rounded-2xl p-8 hover:bg-white/90 group" style="animation-delay:${(i * 0.08).toFixed(2)}s">
    <div class="space-y-5 text-center">
      <div class="w-14 h-14 rounded-xl bg-gradient-to-br ${t.grad} mx-auto group-hover:scale-110 transition-transform"></div>
      <div>
        <h3 class="text-xl font-semibold serif text-slate-900 group-hover:text-${t.text}">${c.title}</h3>
        <p class="text-xs text-slate-500 mt-1">${c.en}</p>
        <p class="text-sm text-slate-700 mt-3 leading-relaxed">${c.desc}</p>
      </div>
      <span class="text-sm font-medium text-${t.text} group-hover:text-${t.hover}">${c.count} →</span>
    </div>
  </a>`;
}

function renderTestamentHub(title, en, intro, cards, backHref, vcPath) {
  const grid = cards.map((c, i) => card(c, i)).join('\n');
  return `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} | ${en} - 經卷研讀</title>
  <meta name="description" content="${intro}">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body{font-family:'Inter',sans-serif}.serif{font-family:'Noto Serif TC',serif}
    .glass-card{backdrop-filter:blur(10px);background:rgba(255,255,255,.78);border:1px solid rgba(99,102,241,.18);transition:all .3s;box-shadow:0 8px 24px rgba(15,23,42,.06)}
    .glass-card:hover{transform:translateY(-4px);background:rgba(255,255,255,.95)}
    .category-card{opacity:0;animation:fadeUp .7s ease forwards}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  </style>
  <link rel="stylesheet" href="../../visit-counter.css">
</head>
<body class="antialiased text-slate-900 bg-gradient-to-br from-slate-50 via-white to-indigo-50/40 min-h-screen">
  <header class="px-6 py-12 max-w-6xl mx-auto">
    <a href="${backHref}" class="text-sm text-indigo-700 hover:text-indigo-900">← 返回經卷總覽</a>
    <p class="text-xs tracking-widest uppercase text-indigo-600 font-semibold mt-6">${en}</p>
    <h1 class="text-4xl sm:text-5xl font-bold serif mt-2">${title}</h1>
    <p class="text-slate-600 mt-4 max-w-2xl leading-relaxed">${intro}</p>
    <p class="text-sm text-amber-800 mt-3 bg-amber-50 inline-block px-3 py-1 rounded-full border border-amber-200">各卷重點金句含希伯來文／希臘文原文註釋</p>
  </header>
  <main class="px-6 pb-16 max-w-6xl mx-auto">
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${grid}</div>
    ${title === '舊約研讀' ? `<p class="text-center mt-10"><a href="../專題/index.html" class="text-sm font-medium text-orange-800 hover:text-orange-950 px-4 py-2 rounded-full bg-orange-50 border border-orange-200">跨經卷專題研讀（九個專題）→</a></p>` : ''}
  </main>
  <div id="visit-counter-container"></div>
  <script src="../../visit-counter.js"></script>
  <script>VisitCounter.init('${vcPath}',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
</body></html>`;
}

fs.mkdirSync(path.join(ROOT, '舊約'), { recursive: true });
fs.mkdirSync(path.join(ROOT, '新約'), { recursive: true });

fs.writeFileSync(
  path.join(ROOT, '舊約', 'index.html'),
  renderTestamentHub(
    '舊約研讀',
    'Old Testament',
    '摩西五經、歷史書、詩歌智慧書、先知書與跨經卷專題。每卷含結構分析、重點金句（附希伯來文註釋）、互動地圖與研讀路線。',
    OT_CARDS,
    '../index.html',
    'bible_study/經卷/舊約/index'
  ),
  'utf8'
);

fs.writeFileSync(
  path.join(ROOT, '新約', 'index.html'),
  renderTestamentHub(
    '新約研讀',
    'New Testament',
    '四福音、使徒行傳、保羅書信、一般書信與啟示錄。每卷設重點金句專區，附希臘文關鍵字詞與簡要註釋，並連結歷史地理互動地圖。',
    NT_CARDS,
    '../index.html',
    'bible_study/經卷/新約/index'
  ),
  'utf8'
);

console.log('Done testament hubs');
