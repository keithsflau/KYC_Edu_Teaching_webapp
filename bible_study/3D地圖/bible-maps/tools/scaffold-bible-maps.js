/**
 * Generates Bible & church-history interactive maps.
 * Run: node tools/scaffold-bible-maps.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SHARED = path.join(ROOT, "shared");

function mapIndexHtml(depth) {
  const p = "../".repeat(depth);
  return fs
    .readFileSync(path.join(SHARED, "war-page.html"), "utf8")
    .replace(/\.\.\/\.\.\/lib\//g, `${p}lib/`)
    .replace('src="../../shared/app.js"', `src="${p}shared/app.js"`);
}

function geoBox(lng, lat, dLng, dLat, Z) {
  return {
    minLng: +(lng - dLng / 2).toFixed(2),
    maxLng: +(lng + dLng / 2).toFixed(2),
    minLat: +(lat - dLat / 2).toFixed(2),
    maxLat: +(lat + dLat / 2).toFixed(2),
    Z,
  };
}

function cam(lng, lat, dist = 650, el = 46) {
  return { lng, lat, dist, az: 200, el, orbit: 0.65 };
}

function emitFactions(factions) {
  const hx = (n) => "0x" + n.toString(16).padStart(6, "0");
  const lines = ["  const factions = {"];
  for (const [id, f] of Object.entries(factions)) {
    lines.push(`    "${id}": {`);
    lines.push(`      main: ${hx(f.main)}, glow: ${hx(f.glow)}, dim: ${hx(f.dim)},`);
    lines.push(`      css: ${JSON.stringify(f.css)}, label_zh: ${JSON.stringify(f.label_zh)}, label_en: ${JSON.stringify(f.label_en)},`);
    lines.push(`      emblem: ${JSON.stringify(f.emblem)}, maxStrength: ${f.maxStrength}, textLight: ${JSON.stringify(f.textLight)}`);
    lines.push(`    },`);
  }
  lines.push("  };");
  return lines.join("\n");
}

function emitData(b) {
  const lines = [];
  lines.push(`/* ${b.meta.title_en} · ${b.meta.title_zh} */`);
  lines.push("window.BATTLE_DATA = (function () {");
  lines.push(`  const END_DAY = ${b.END_DAY || 120};`);
  lines.push(`  const meta = ${JSON.stringify(b.meta, null, 4).replace(/^/gm, "  ")};`);
  lines.push(emitFactions(b.factions));
  lines.push(`  const geography = ${JSON.stringify(b.geography, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const units = ${JSON.stringify(b.units, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const arrows = ${JSON.stringify(b.arrows, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const fronts = ${JSON.stringify(b.fronts, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const hotspots = ${JSON.stringify(b.hotspots, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const weather = ${JSON.stringify(b.weather, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const notes = ${JSON.stringify(b.notes, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const analysis = ${JSON.stringify(b.analysis || {}, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const storyboard = ${JSON.stringify(b.storyboard, null, 4).replace(/^/gm, "  ")};`);
  lines.push(`  const outro = ${JSON.stringify(b.outro, null, 4).replace(/^/gm, "  ")};`);
  lines.push("  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };");
  lines.push("})();");
  lines.push("");
  return lines.join("\n");
}

function writeMap(map) {
  const dir = path.join(ROOT, "maps", map.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.js"), emitData(map.data));
  fs.writeFileSync(path.join(dir, "index.html"), mapIndexHtml(2));
}

function baseMap(id, title_zh, title_en, subtitle, geo, facA, facB, centerArr, extra) {
  const [clng, clat] = centerArr;
  const factions = extra.factions || { covenant: facA, nations: facB };
  const factionOrder = extra.factionOrder || Object.keys(factions);
  const { center: _c, ...geoClean } = geo && geo.center ? geo : { ...geo };
  const geoMeta = geo && geo.center ? geoClean : geo;
  return {
    END_DAY: 100,
    meta: {
      id,
      title_zh,
      title_en,
      subtitle,
      factionOrder,
      geo: geoMeta,
      startDate: extra.period || subtitle,
      introCam: cam(clng, clat, extra.dist || 700, extra.el || 46),
      titleCard: {
        zh: title_zh,
        en: title_en + (subtitle ? " · " + subtitle : ""),
        narr_zh: extra.narr_zh || "",
        narr_en: extra.narr_en || "",
      },
      outroCam: cam(clng, clat, (extra.dist || 700) * 1.2, 48),
    },
    factions,
    geography: { regions: extra.regions || [], points: extra.points || [], lines: extra.lines || [] },
    units: extra.units || [],
    arrows: extra.arrows || [],
    fronts: extra.fronts || [],
    hotspots: extra.hotspots || [],
    weather: extra.weather || [{ d: 1, night: 0.12, fog: 0.08, rain: 0.05, smoke: 0.1, zh: title_zh, en: title_en }],
    analysis: extra.analysis || {
      military: extra.analysisMilitary || title_zh + "的歷史背景與事件經過。",
      leaders: extra.analysisLeaders || "本段歷史的主要人物及其角色。",
      nationalPower: extra.analysisTheology || "相關的神學主題與聖經教導。",
      impact: extra.analysisImpact || "對救恩歷史與後世的影響。",
    },
    notes: {
      summary: extra.noteSummary || title_zh + " — 互動聖經地圖。",
      caveats: ["路線與時間為教學示意；非精確考古定位。", "衛星影像為現代地形，非歷史時期地貌。"],
      sources: "和合本、聖經地圖、教會史資料（交叉查證）。",
    },
    storyboard: extra.storyboard || [],
    outro: {
      title_zh,
      title_en,
      narration_zh: extra.outro_zh || "本段為聖經與教會史重要考點。",
      narration_en: extra.outro_en || "A key Bible and church history topic.",
      cam: cam(clng, clat, (extra.dist || 700) * 1.2, 48),
    },
  };
}

const COV = {
  main: 0xc9a227,
  glow: 0xffd54f,
  dim: 0x8b6914,
  css: "#c9a227",
  label_zh: "選民／教會",
  label_en: "Covenant People",
  emblem: "shield",
  maxStrength: 80000,
  textLight: "#fff8e0",
};
const NAT = {
  main: 0x5c4a72,
  glow: 0x8b7aa8,
  dim: 0x3a2f48,
  css: "#5c4a72",
  label_zh: "列國／仇敵",
  label_en: "Nations",
  emblem: "circle",
  maxStrength: 100000,
  textLight: "#e8e0f0",
};
const NORTH = {
  main: 0x4a7ab5,
  glow: 0x7aa8d8,
  dim: 0x2d4d73,
  css: "#4a7ab5",
  label_zh: "北國以色列",
  label_en: "Northern Israel",
  emblem: "circle",
  maxStrength: 60000,
  textLight: "#e0eef8",
};
const SOUTH = {
  main: 0xc9a227,
  glow: 0xffd54f,
  dim: 0x8b6914,
  css: "#c9a227",
  label_zh: "南國猶大",
  label_en: "Kingdom of Judah",
  emblem: "shield",
  maxStrength: 50000,
  textLight: "#fff8e0",
};
const CHURCH = {
  main: 0x9b7ec8,
  glow: 0xc4a8e8,
  dim: 0x6b4c9a,
  css: "#9b7ec8",
  label_zh: "教會",
  label_en: "Church",
  emblem: "shield",
  maxStrength: 50000,
  textLight: "#f0e8ff",
};
const EMPIRE = {
  main: 0x8b6914,
  glow: 0xc9a227,
  dim: 0x5c4810,
  css: "#8b6914",
  label_zh: "帝國／異教",
  label_en: "Empire / Other",
  emblem: "circle",
  maxStrength: 120000,
  textLight: "#fff8e0",
};

const buildCatalog = require("./bible-catalog.js");
const CATALOG = buildCatalog({ geoBox, cam, baseMap, COV, NAT, NORTH, SOUTH, CHURCH, EMPIRE });
const ENRICH = require("./bible-enrichment.js")({ cam });

function mergeEnrichment(map) {
  const e = ENRICH[map.slug];
  if (!e) return;
  const d = map.data;
  if (e.storyboard) d.storyboard = e.storyboard;
  if (e.analysis) d.analysis = { ...d.analysis, ...e.analysis };
  if (e.END_DAY) d.END_DAY = e.END_DAY;
  const maxDay = Math.max(d.END_DAY || 100, ...(d.storyboard || []).map((s) => s.day || 1));
  d.END_DAY = maxDay;
}

function wireNextMaps() {
  CATALOG.forEach((m, i) => {
    const next = CATALOG[i + 1];
    if (next) {
      m.data.meta.nextBattle = { href: `../${next.slug}/`, title_zh: next.title_zh, title_en: next.title_en };
    }
  });
}

wireNextMaps();

for (const m of CATALOG) {
  mergeEnrichment(m);
  writeMap(m);
  console.log(`✓ ${m.slug}`);
}

const cards = CATALOG.map(
  (m) => `    <a class="card" href="maps/${m.slug}/">
      <h2>${m.title_zh}</h2>
      <div class="en">${m.title_en}</div>
      <p>${m.blurb}</p>
      <div class="places">${m.period} · ${m.places}</div>
    </a>`
).join("\n");

fs.writeFileSync(
  path.join(ROOT, "index.html"),
  `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>聖經互動地圖 · Bible Journey Maps</title>
<style>
  :root{--ink:#eee6d2;--ink-dim:#b3a98c;--paper:#0a0612;--panel:rgba(18,12,28,.85);--edge:rgba(201,162,39,.28);--accent:#c9a227;
    --mono:"Consolas",ui-monospace,monospace;--cjk:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif}
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;background:radial-gradient(ellipse at 30% 15%,#2a1848,#06040a);color:var(--ink);font-family:var(--cjk);padding:40px 24px 60px}
  .back{font-family:var(--mono);font-size:10px;color:var(--accent);text-decoration:none;display:inline-block;margin-bottom:20px}
  h1{font-size:28px;letter-spacing:4px;color:#f4ecd6;margin-bottom:6px}
  .sub{font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--ink-dim);margin-bottom:32px}
  .intro{max-width:760px;line-height:1.7;color:var(--ink-dim);font-size:14px;margin-bottom:36px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;max-width:1100px}
  .card{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--edge);border-radius:12px;padding:18px 20px;transition:.2s}
  .card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.45)}
  .card h2{font-size:17px;letter-spacing:1px;color:#f4ecd6;margin-bottom:4px}
  .card .en{font-family:var(--mono);font-size:9.5px;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px}
  .card p{font-size:12.5px;line-height:1.55;color:var(--ink-dim)}
  .card .places{margin-top:10px;font-size:10.5px;color:#9aa6b2;line-height:1.5}
  footer{margin-top:48px;font-family:var(--mono);font-size:10px;color:var(--ink-dim);max-width:720px;line-height:1.6}
</style>
</head>
<body>
  <a class="back" href="../">← 返回聖經研讀</a>
  <h1>聖經互動地圖</h1>
  <div class="sub">BIBLE & CHURCH HISTORY · 3D JOURNEY MAPS</div>
  <p class="intro">以真實地形衛星影像呈現舊約、新約及教會史重要事件；每張地圖支援自動導覽、中英字幕、歷史／人物／神學／影響分析，以及 1×–3× 播放速度與「下一事件」連播。<br>
  本機預覽請在 <code>bible-maps</code> 目錄執行 <code>node serve.js</code>（port 5052）。</p>
  <div class="grid">
${cards}
  </div>
  <footer>地形：AWS Terrarium DEM · EOX Sentinel-2 · 路線為教學示意<br>
  Run: <code>node serve.js</code> → http://localhost:5052</footer>
</body>
</html>
`
);

fs.writeFileSync(
  path.join(ROOT, "..", "index.html"),
  `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta http-equiv="refresh" content="0;url=bible-maps/" />
<title>聖經地圖</title>
</head>
<body><p>正在前往 <a href="bible-maps/">聖經互動地圖</a>…</p></body>
</html>
`
);

console.log(`✓ ${CATALOG.length} maps generated`);
