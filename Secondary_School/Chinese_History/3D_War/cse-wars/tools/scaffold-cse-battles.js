/**
 * Generates HKDSE Chinese History war maps.
 * Run: node tools/scaffold-cse-battles.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SHARED = path.join(ROOT, "shared");

function battleIndexHtml(depth) {
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

function writeBattle(warSlug, battle) {
  const dir = path.join(ROOT, "wars", warSlug, battle.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "data.js"), emitData(battle.data));
  fs.writeFileSync(path.join(dir, "index.html"), battleIndexHtml(3));
}

function hubHtml(war) {
  const cards = war.battles
    .map(
      (b) => `    <a class="card" href="${b.slug}/">
      <h2>${b.title_zh}</h2>
      <div class="en">${b.title_en}</div>
      <p>${b.blurb}</p>
      <div class="places">${b.places}</div>
    </a>`
    )
    .join("\n");
  const wa = war.warAnalysis || {};
  const analysisBlock =
    wa.military || wa.nationalPower || wa.impact
      ? `
  <section class="analysis">
    <h2>時代分析 · Era Analysis</h2>
    ${wa.military ? `<div class="ab"><h3>軍事 · Military</h3><p>${wa.military}</p></div>` : ""}
    ${wa.nationalPower ? `<div class="ab"><h3>國力 · National Power</h3><p>${wa.nationalPower}</p></div>` : ""}
    ${wa.impact ? `<div class="ab"><h3>影響 · Impact</h3><p>${wa.impact}</p></div>` : ""}
  </section>`
      : "";
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${war.title_zh} · ${war.title_en}</title>
<style>
  :root{--ink:#eee6d2;--ink-dim:#b3a98c;--paper:#06080c;--panel:rgba(12,15,21,.82);--edge:rgba(210,190,140,.26);--accent:#d8c08a;
    --mono:"Consolas",ui-monospace,monospace;--cjk:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif}
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;background:radial-gradient(ellipse at 30% 20%,#1a1810,#04060a);color:var(--ink);font-family:var(--cjk);padding:40px 24px 60px}
  .back{font-family:var(--mono);font-size:10px;color:var(--accent);text-decoration:none;display:inline-block;margin-bottom:20px}
  h1{font-size:26px;letter-spacing:4px;color:#f4ecd6;margin-bottom:6px}
  .sub{font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--ink-dim);margin-bottom:28px}
  .intro{max-width:720px;line-height:1.7;color:var(--ink-dim);font-size:14px;margin-bottom:32px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;max-width:1100px}
  .card{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--edge);border-radius:12px;padding:16px 18px;transition:.2s}
  .card:hover{border-color:var(--accent);transform:translateY(-2px)}
  .card h2{font-size:16px;letter-spacing:1px;color:#f4ecd6;margin-bottom:4px}
  .card .en{font-family:var(--mono);font-size:9.5px;letter-spacing:1.5px;color:var(--accent);margin-bottom:8px}
  .card p{font-size:12px;line-height:1.55;color:var(--ink-dim)}
  .card .places{margin-top:8px;font-size:10.5px;color:#9aa6b2;line-height:1.45}
  .analysis{max-width:900px;margin:28px 0 36px;padding:18px 20px;background:var(--panel);border:1px solid var(--edge);border-radius:12px}
  .analysis h2{font-size:15px;letter-spacing:2px;color:#f4ecd6;margin-bottom:14px}
  .analysis .ab{margin-bottom:14px}
  .analysis h3{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;color:var(--accent);margin-bottom:5px}
  .analysis p{font-size:13px;line-height:1.65;color:var(--ink-dim)}
</style>
</head>
<body>
  <a class="back" href="../../">← 返回中史戰爭總目錄</a>
  <h1>${war.title_zh}</h1>
  <div class="sub">${war.title_en} · ${war.period}</div>
  <p class="intro">${war.intro}</p>
${analysisBlock}
  <div class="grid">
${cards}
  </div>
</body>
</html>
`;
}

function baseBattle(id, title_zh, title_en, subtitle, geo, factions, factionOrder, startDate, center) {
  return {
    END_DAY: 100,
    meta: {
      id,
      title_zh,
      title_en,
      subtitle,
      factionOrder,
      geo,
      startDate,
      introCam: cam(center.lng, center.lat, center.dist || 700, center.el || 46),
      titleCard: {
        zh: title_zh,
        en: title_en + (subtitle ? " · " + subtitle : ""),
        narr_zh: center.narr_zh,
        narr_en: center.narr_en,
      },
      outroCam: cam(center.lng, center.lat, (center.dist || 700) * 1.2, 48),
      terrainMode: center.terrainMode || "land",
      floodRelief: center.floodRelief,
      reliefScale: center.reliefScale,
    },
    factions,
    geography: {
      regions: center.regions || [],
      points: center.points || [],
      lines: center.lines || [],
      water: center.water || [],
    },
    units: center.units || [],
    arrows: center.arrows || [],
    fronts: center.fronts || [],
    hotspots: center.hotspots || [],
    weather: center.weather || [{ d: 1, night: 0.15, fog: 0.1, rain: 0.1, smoke: 0.2, zh: title_zh, en: title_en }],
    analysis: center.analysis || {
      military: center.analysisMilitary || title_zh + "的軍事部署、攻防過程與勝負關鍵。",
      leaders: center.analysisLeaders || "本戰役主要決策者與將領如何影響戰局。",
      nationalPower: center.analysisPower || "參戰各方的人力、資源與後勤實力對比。",
      impact: center.analysisImpact || "本戰役對後世政治格局的長遠影響。",
    },
    notes: {
      summary: center.noteSummary || title_zh + " — DSE 中史互動戰役地圖。",
      caveats: [
        "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
        "衛星影像為現代地形，非歷史時期地貌。",
        "河川、海域水面為教學示意，按史實位置裁切顯示。",
      ],
      sources: "DSE 中史課程、中國通史、維基百科（交叉查證）。",
    },
    storyboard: center.storyboard || [],
    outro: {
      title_zh,
      title_en,
      narration_zh: center.outro_zh || "本戰役為 DSE 中史重要考點。",
      narration_en: center.outro_en || "A key HKDSE Chinese History topic.",
      cam: cam(center.lng, center.lat, (center.dist || 700) * 1.2, 48),
    },
  };
}

const buildCatalog = require("./battles-catalog-cse.js");
const CATALOG = buildCatalog({ geoBox, cam, baseBattle, FAC: { redBlue: null } });

const ENRICH = require("./battle-enrichment-cse.js")({ cam });
const LEADERS = require("./battle-leaders-cse.js");
const TERRAIN = require("./battle-terrain-cse.js");
const FOCUS_MAP = require("./battle-focus-map-cse.js");

function mergeFocusIds(battle, warSlug) {
  const fm = FOCUS_MAP.focus[`${warSlug}/${battle.slug}`];
  const sm = FOCUS_MAP.side;
  const sb = battle.data.storyboard;
  if (!sb) return;
  for (const sh of sb) {
    if (fm && sh.focus) sh.focus = sh.focus.map((id) => fm[id] || id);
    if (sh.side && sm[sh.side]) sh.side = sm[sh.side];
  }
}

function mergeTerrain(battle, warSlug) {
  const t = TERRAIN[`${warSlug}/${battle.slug}`];
  if (!t) return;
  const d = battle.data;
  const m = d.meta;
  if (t.terrainMode) m.terrainMode = t.terrainMode;
  if (t.floodRelief != null) m.floodRelief = t.floodRelief;
  if (t.reliefScale != null) m.reliefScale = t.reliefScale;
  if (t.water) d.geography.water = t.water;
  if (t.geoShift) {
    const g = m.geo;
    const s = t.geoShift;
    const dLng = s.dLng != null ? s.dLng : (g.maxLng - g.minLng);
    const dLat = s.dLat != null ? s.dLat : (g.maxLat - g.minLat);
    g.minLng = +(s.lng - dLng / 2).toFixed(2);
    g.maxLng = +(s.lng + dLng / 2).toFixed(2);
    g.minLat = +(s.lat - dLat / 2).toFixed(2);
    g.maxLat = +(s.lat + dLat / 2).toFixed(2);
  }
}

function mergeEnrichment(battle, warSlug) {
  const e = ENRICH[`${warSlug}/${battle.slug}`];
  if (!e) return;
  const d = battle.data;
  if (e.storyboard) d.storyboard = e.storyboard;
  if (e.analysis) d.analysis = { ...d.analysis, ...e.analysis };
  if (e.END_DAY) d.END_DAY = e.END_DAY;
  const maxDay = Math.max(d.END_DAY || 100, ...(d.storyboard || []).map((s) => s.day || 1));
  d.END_DAY = maxDay;
}

function mergeLeaders(battle, warSlug) {
  const key = `${warSlug}/${battle.slug}`;
  if (LEADERS[key]) battle.data.analysis.leaders = LEADERS[key];
}

function wireNextBattles() {
  CATALOG.forEach((war, wi) => {
    war.battles.forEach((b, bi) => {
      const next = war.battles[bi + 1];
      if (next) {
        b.data.meta.nextBattle = { href: `../${next.slug}/`, title_zh: next.title_zh, title_en: next.title_en };
      } else {
        const nw = CATALOG[wi + 1];
        if (nw && nw.battles[0]) {
          b.data.meta.nextBattle = {
            href: `../../${nw.slug}/${nw.battles[0].slug}/`,
            title_zh: nw.battles[0].title_zh,
            title_en: nw.battles[0].title_en,
          };
        }
      }
    });
  });
}

wireNextBattles();

for (const war of CATALOG) {
  const warDir = path.join(ROOT, "wars", war.slug);
  fs.mkdirSync(warDir, { recursive: true });
  fs.writeFileSync(path.join(warDir, "index.html"), hubHtml(war));
  for (const b of war.battles) {
    mergeTerrain(b, war.slug);
    mergeEnrichment(b, war.slug);
    mergeFocusIds(b, war.slug);
    mergeLeaders(b, war.slug);
    writeBattle(war.slug, b);
  }
  console.log(`✓ ${war.slug}: ${war.battles.length} battles`);
}

const mainCards = CATALOG.map(
  (w) => `    <a class="card" href="wars/${w.slug}/">
      <h2>${w.title_zh}</h2>
      <div class="en">${w.title_en} · ${w.period}</div>
      <p>${w.battles.length} 個 DSE 中史戰役地圖</p>
      <div class="places">${w.battles.map((b) => b.title_zh.replace(/戰役|之戰|會戰|海戰|大捷/g, "")).join(" · ")}</div>
    </a>`
).join("\n");

const mainIdx = path.join(ROOT, "index.html");
fs.writeFileSync(
  mainIdx,
  `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>HKDSE 中史戰爭地圖 · Chinese History War Maps</title>
<style>
  :root{--ink:#eee6d2;--ink-dim:#b3a98c;--paper:#06080c;--panel:rgba(12,15,21,.82);--edge:rgba(210,190,140,.26);--accent:#d8c08a;
    --mono:"Consolas",ui-monospace,monospace;--cjk:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif}
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;background:radial-gradient(ellipse at 30% 20%,#1a1810,#04060a);color:var(--ink);font-family:var(--cjk);padding:40px 24px 60px}
  h1{font-size:28px;letter-spacing:4px;color:#f4ecd6;margin-bottom:6px}
  .sub{font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--ink-dim);margin-bottom:32px}
  .intro{max-width:720px;line-height:1.7;color:var(--ink-dim);font-size:14px;margin-bottom:36px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;max-width:1100px}
  .card{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--edge);border-radius:12px;padding:18px 20px;transition:.2s}
  .card:hover{border-color:var(--accent);transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,.45)}
  .card h2{font-size:18px;letter-spacing:2px;color:#f4ecd6;margin-bottom:4px}
  .card .en{font-family:var(--mono);font-size:10px;letter-spacing:1.5px;color:var(--accent);margin-bottom:10px}
  .card p{font-size:12.5px;line-height:1.55;color:var(--ink-dim)}
  .card .places{margin-top:10px;font-size:11px;color:#9aa6b2;line-height:1.5}
  footer{margin-top:48px;font-family:var(--mono);font-size:10px;color:var(--ink-dim);max-width:720px;line-height:1.6}
  a.back{color:#ff8a80}
</style>
</head>
<body>
  <h1>HKDSE 中史戰爭地圖</h1>
  <div class="sub">DSE CHINESE HISTORY · 3D INTERACTIVE BATTLE MAPS</div>
  <p class="intro">以真實地形衛星影像呈現 DSE 中史課程核心戰役；每張地圖覆蓋單一戰場，支援自動導覽、中英字幕、可開關戰役分析（軍事／領袖／國力／影響）及 1×–3× 播放速度。<br>
  本機開發請執行 <code>node serve.js</code>（port 5052）。另見 <a class="back" href="../../History/3D_War/dse-wars/">西史戰爭地圖</a>。</p>
  <div class="grid">
${mainCards}
  </div>
  <footer>地形：AWS Terrarium DEM · EOX Sentinel-2 · 部隊與戰線為教學示意<br>
  Run: <code>node serve.js</code> → http://localhost:5052</footer>
</body>
</html>
`
);

console.log("✓ main index.html");
console.log(`Total: ${CATALOG.reduce((n, w) => n + w.battles.length, 0)} battles across ${CATALOG.length} eras`);
