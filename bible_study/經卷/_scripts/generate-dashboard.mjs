import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { VOLUME_ROOT } from './paths.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const OT_CARDS = [
  { href: '舊約/摩西五經/index.html', title: '摩西五經', sub: 'Torah · 五卷', color: 'amber', desc: '創造、出埃及、會幕、曠野與立約重申。' },
  { href: '舊約/歷史書/index.html', title: '歷史書', sub: 'Historical · 十二卷', color: 'sky', desc: '進迦南、士師、王國、被擄與歸回。' },
  { href: '舊約/詩歌智慧書/index.html', title: '詩歌智慧書', sub: 'Poetry & Wisdom · 五卷', color: 'rose', desc: '苦難、敬拜、智慧、人生與愛。' },
  { href: '舊約/先知書/index.html', title: '先知書', sub: 'Prophets · 十七卷', color: 'indigo', desc: '審判、安慰、彌賽亞與新約應驗。' },
  { href: '專題/index.html', title: '專題研讀', sub: 'Topics · 九個專題', color: 'orange', desc: '十誡、祭禮、預表、十二支派等。' },
];

const NT_CARDS = [
  { href: '新約/四福音/index.html', title: '四福音', sub: 'Gospels · 四卷', color: 'teal', desc: '耶穌生平、教訓、受死與復活。' },
  { href: '新約/使徒行傳/index.html', title: '使徒行傳', sub: 'Acts · 一卷', color: 'teal', desc: '聖靈降臨、教會誕生、福音擴展。' },
  { href: '新約/保羅書信/index.html', title: '保羅書信', sub: 'Pauline · 十三卷', color: 'blue', desc: '福音真理、教會生活與牧養。' },
  { href: '新約/一般書信/index.html', title: '一般書信', sub: 'General · 八卷', color: 'indigo', desc: '希伯來書至猶大書：信心、愛與真理。' },
  { href: '新約/啟示錄/index.html', title: '啟示錄', sub: 'Revelation · 一卷', color: 'purple', desc: '末世異象、審判與新天新地。' },
];

const HOVER = {
  amber: 'group-hover:text-amber-700',
  sky: 'group-hover:text-sky-700',
  rose: 'group-hover:text-rose-700',
  indigo: 'group-hover:text-indigo-700',
  orange: 'group-hover:text-orange-700',
  teal: 'group-hover:text-teal-700',
  blue: 'group-hover:text-blue-700',
  purple: 'group-hover:text-purple-700',
};

function card(c, delay) {
  return `<a href="${c.href}" class="category-card glass-card rounded-2xl p-6 hover:bg-white/90 group" style="animation-delay:${delay}s">
    <h4 class="text-lg font-semibold serif-font text-slate-900 ${HOVER[c.color]}">${c.title}</h4>
    <p class="text-xs text-slate-500 mt-1">${c.sub}</p>
    <p class="text-sm text-slate-700 mt-2 leading-relaxed">${c.desc}</p>
  </a>`;
}

const html = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>經卷 | Biblical Books - Bible Study</title>
  <meta name="description" content="聖經各卷書研讀：舊約、新約分類入口，重點金句含希伯來文／希臘文原文註釋">
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
  <style>
    body{font-family:'Inter',system-ui,sans-serif}
    .serif-font{font-family:'Noto Serif TC',serif}
    .gradient-bg{position:absolute;inset:0;background:radial-gradient(circle at 20% 20%,rgba(168,85,247,.15),transparent 35%),radial-gradient(circle at 80% 0%,rgba(139,92,246,.15),transparent 30%),radial-gradient(circle at 50% 80%,rgba(124,58,237,.12),transparent 30%);filter:blur(60px);opacity:.9}
    .glass-card{backdrop-filter:blur(10px);background:rgba(255,255,255,.75);border:1px solid rgba(99,102,241,.2);transition:all .3s ease;box-shadow:0 4px 6px -1px rgba(0,0,0,.08)}
    .glass-card:hover{background:rgba(255,255,255,.95);border-color:rgba(99,102,241,.35);transform:translateY(-3px)}
    .category-card{animation:cardIn .65s ease forwards;opacity:0}
    @keyframes cardIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
    .fade-in-up{animation:fadeInUp .6s ease forwards;opacity:0}
    @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
  </style>
  <link rel="stylesheet" href="../../visit-counter.css">
</head>
<body class="antialiased text-slate-900 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
  <div class="relative min-h-screen overflow-hidden">
    <div class="gradient-bg pointer-events-none" aria-hidden="true"></div>
    <div class="relative z-10">
      <header class="px-6 py-12 sm:py-14 text-center">
        <a href="../index.html" class="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 mb-6 fade-in-up">
          <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          返回主頁
        </a>
        <h1 class="text-4xl sm:text-5xl font-bold serif-font fade-in-up" style="animation-delay:.05s">經卷 <span class="block text-2xl sm:text-3xl mt-2 bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">Biblical Books</span></h1>
        <p class="text-slate-600 mt-4 max-w-2xl mx-auto fade-in-up" style="animation-delay:.1s">舊約與新約分類研讀 · 重點金句含原文註釋 · 互動地圖</p>
      </header>

      <main class="px-6 pb-16 max-w-6xl mx-auto space-y-14">
        <section class="glass-card rounded-2xl p-8 sm:p-10 fade-in-up" style="animation-delay:.15s">
          <h2 class="text-2xl font-semibold serif-font text-center mb-4">關於經卷研讀</h2>
          <p class="text-slate-700 leading-relaxed max-w-3xl mx-auto text-center">聖經六十六卷，每卷都有獨特的歷史背景、文學結構與神學信息。以下按<strong>舊約</strong>與<strong>新約</strong>分類，進入各類別後可選卷深入研讀。</p>
        </section>

        <section>
          <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 class="text-2xl font-bold serif-font text-amber-900">舊約 Old Testament</h2>
              <p class="text-sm text-slate-600 mt-1">摩西五經 · 歷史書 · 詩歌智慧書 · 先知書 · 專題</p>
            </div>
            <a href="舊約/index.html" class="text-sm font-medium text-amber-800 px-4 py-2 rounded-full bg-amber-50 border border-amber-200 hover:bg-amber-100">舊約總覽 →</a>
          </div>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${OT_CARDS.map((c, i) => card(c, (i * 0.06).toFixed(2))).join('\n')}
          </div>
        </section>

        <section>
          <div class="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <h2 class="text-2xl font-bold serif-font text-teal-900">新約 New Testament</h2>
              <p class="text-sm text-slate-600 mt-1">四福音 · 保羅書信 · 啟示錄</p>
            </div>
            <a href="新約/index.html" class="text-sm font-medium text-teal-800 px-4 py-2 rounded-full bg-teal-50 border border-teal-200 hover:bg-teal-100">新約總覽 →</a>
          </div>
          <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            ${NT_CARDS.map((c, i) => card(c, (i * 0.06).toFixed(2))).join('\n')}
          </div>
        </section>
      </main>

      <footer class="text-center py-8 text-slate-500 text-sm border-t border-slate-200/80 mx-6">
        <p class="italic text-xs">「耶和華用能力創造大地，用智慧建立世界，用聰明鋪張穹蒼。」耶利米書 10:12</p>
        <p class="text-xs mt-3 pt-3 border-t border-slate-200">@ 2025 Education Engineering Portfolio | Prepared by SF Lau</p>
      </footer>

      <div id="visit-counter-container"></div>
    </div>
  </div>
  <script src="../../visit-counter.js"></script>
  <script>VisitCounter.init('bible_study/經卷/index',{scriptUrl:'https://script.google.com/macros/s/AKfycby5jEjDAcEM6TttPbwwh1tvXPo_-W7YrNlKfJRV82PjkmAHvR_wILhA7h-zIRPF7oTRTw/exec',containerId:'visit-counter-container'});</script>
</body>
</html>`;

fs.writeFileSync(path.join(VOLUME_ROOT, 'index.html'), html, 'utf8');
console.log('Done dashboard');
