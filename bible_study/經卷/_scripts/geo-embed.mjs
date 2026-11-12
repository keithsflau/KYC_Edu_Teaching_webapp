import { createRequire } from 'module';
import { bookGeo } from './books-geo.mjs';
import { uxHeadFor, uxScriptsFor } from './study-ux-embed.mjs';

const require = createRequire(import.meta.url);
const LOC = require('../../3D地圖/bible-maps/tools/bible-locations.js');

const TYPE_ZH = {
  city: '城邑',
  town: '城鎮',
  fort: '要塞',
  peak: '山嶺',
  region: '地區',
  bay: '水域',
  island: '島嶼',
};

/** Resolve book geo config into map-ready place objects */
export function resolvePlaces(cfg) {
  return cfg.places.map((p) => {
    const s = LOC[p.key];
    if (!s) throw new Error(`Unknown location key: ${p.key}`);
    return {
      id: p.key,
      name_zh: s.name_zh,
      name_en: s.name_en,
      lat: s.lat,
      lng: s.lng,
      type: s.type,
      typeLabel: TYPE_ZH[s.type] || s.type,
      ref: p.ref || s.ref,
      note: p.note || '',
    };
  });
}

/** Default for books at 經卷/{舊約|新約}/{category}/{book}/ (4 levels up to repo root). */
const MAP_BASE = '../../../../3D地圖/bible-maps';

/**
 * @param {string} slug - book or topic slug
 * @param {{ mapBase?: string }} opts
 */
export function buildMapEmbed(slug, opts = {}) {
  const cfg = bookGeo[slug];
  if (!cfg) return null;

  const places = resolvePlaces(cfg);
  const base = opts.mapBase || MAP_BASE;
  const uxBase = `${base}/shared`;
  const sectionNum = opts.sectionNum || '六';
  const sectionTitle = opts.sectionTitle || `${sectionNum}、歷史地理互動地圖`;
  const fullMapLink = cfg.fullMap
    ? `<a href="${base}/maps/${cfg.fullMap}/" target="_blank" rel="noopener">🌍 開啟 3D 互動地圖：${cfg.fullMapLabel || cfg.fullMap} →</a>`
    : '';

  const section = `
    <section class="ux-reveal book-geo-section bg-white rounded-2xl border p-6 sm:p-8 shadow-sm">
      <h2 class="text-xl font-semibold serif mb-2">${sectionTitle}</h2>
      ${cfg.period ? `<p class="text-xs text-slate-500 mb-2">年代：${cfg.period}</p>` : ''}
      <p class="text-sm text-slate-600 mb-4 leading-relaxed">${cfg.intro}</p>
      <div class="book-map-toolbar" role="toolbar" aria-label="地圖導覽">
        <button type="button" id="book-map-tour" class="bmp-btn bmp-btn-primary">▶ 自動導覽</button>
        <button type="button" id="book-map-prev" class="bmp-btn">← 上一站</button>
        <button type="button" id="book-map-next" class="bmp-btn">下一站 →</button>
        <button type="button" id="book-map-fit" class="bmp-btn">總覽</button>
        <span id="book-map-progress" class="bmp-progress">1 / ${places.length}</span>
      </div>
      <div class="book-map-layout">
        <div id="book-map" class="book-map-canvas" role="application" aria-label="互動地圖"></div>
        <div class="book-map-panel">
          <div id="book-map-panel"></div>
          <div id="book-map-list" class="book-map-list" aria-label="地點清單"></div>
        </div>
      </div>
      <div class="book-map-footer">
        <span>坐標採 WGS84 · 考古/site 傳統鑑別 · 點選標記查看經文</span>
        ${fullMapLink}
      </div>
    </section>`;

  const head = `
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="">
  <link rel="stylesheet" href="${base}/shared/book-map.css">${uxHeadFor(uxBase)}`;

  const scripts = `
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>
  <script src="${base}/shared/book-map.js"></script>${uxScriptsFor(uxBase)}
  <script>
    document.addEventListener('DOMContentLoaded', function() {
      BookMap.init({ places: ${JSON.stringify(places)} });
    });
  </script>`;

  return { section, head, scripts, places };
}
