/**
 * Generates per-battle index.html + data.js and war hub pages.
 * Run: node tools/scaffold-battles.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const SHARED = path.join(ROOT, "shared");

function battleIndexHtml(depth) {
  const p = "../".repeat(depth);
  return fs
    .readFileSync(path.join(SHARED, "war-page.html"), "utf8")
    .replace('href="../../"', 'href="../"')
    .replace("← 返回目錄 · All wars", "← 返回戰爭目錄 · Back to war")
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
  const analysisBlock = (wa.military || wa.nationalPower || wa.impact) ? `
  <section class="analysis">
    <h2>戰爭分析 · War Analysis</h2>
    ${wa.military ? `<div class="ab"><h3>軍事 · Military</h3><p>${wa.military}</p></div>` : ""}
    ${wa.nationalPower ? `<div class="ab"><h3>國力 · National Power</h3><p>${wa.nationalPower}</p></div>` : ""}
    ${wa.impact ? `<div class="ab"><h3>影響 · Impact</h3><p>${wa.impact}</p></div>` : ""}
  </section>` : "";
  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${war.title_zh} · 小戰役地圖</title>
<style>
  :root{--ink:#eee6d2;--ink-dim:#b3a98c;--paper:#06080c;--panel:rgba(12,15,21,.82);
    --edge:rgba(210,190,140,.26);--accent:#d8c08a;
    --mono:"Consolas","SFMono-Regular",ui-monospace,monospace;
    --cjk:"Microsoft JhengHei","PingFang TC","Noto Sans TC",sans-serif}
  *{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;background:radial-gradient(ellipse at 30% 20%,#1a2230,#04060a);color:var(--ink);font-family:var(--cjk);padding:40px 24px 60px}
  h1{font-size:26px;letter-spacing:3px;color:#f4ecd6;margin-bottom:6px}
  .sub{font-family:var(--mono);font-size:11px;letter-spacing:2px;color:var(--ink-dim);margin-bottom:10px}
  .back{font-family:var(--mono);font-size:10px;color:var(--accent);text-decoration:none;display:inline-block;margin-bottom:28px}
  .intro{max-width:720px;line-height:1.7;color:var(--ink-dim);font-size:14px;margin-bottom:32px}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;max-width:1100px}
  .card{display:block;text-decoration:none;color:inherit;background:var(--panel);border:1px solid var(--edge);
    border-radius:12px;padding:16px 18px;transition:.2s}
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
  <a class="back" href="../../">← 返回西史戰爭總目錄</a>
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

// ---- faction presets ----
const WW1_CP = "cp", WW1_AP = "ap";
const WW1_F = {
  cp: { main: 0x5c4033, glow: 0x8b6914, dim: 0x3a2820, css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers", emblem: "circle", maxStrength: 120000, textLight: "#e8dcc8" },
  ap: { main: 0x1e5a8a, glow: 0x42a5f5, dim: 0x0d3d7a, css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers", emblem: "shield", maxStrength: 130000, textLight: "#cfe0ff" },
};
const WW2_AX = "axis", WW2_AL = "allies";
const WW2_F = {
  axis: { main: 0x4a4a4a, glow: 0x8b0000, dim: 0x2a2a2a, css: "#6b2020", label_zh: "軸心國", label_en: "Axis", emblem: "circle", maxStrength: 150000, textLight: "#e8d0d0" },
  allies: { main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a, css: "#1b4f72", label_zh: "同盟國", label_en: "Allies", emblem: "shield", maxStrength: 160000, textLight: "#cfe0ff" },
};
const PAC_JP = "jp", PAC_US = "us";
const PAC_F = {
  jp: { main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000, css: "#8b0000", label_zh: "日本", label_en: "Japan", emblem: "circle", maxStrength: 90000, textLight: "#ffd9d2" },
  us: { main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847, css: "#1a3a6e", label_zh: "美國", label_en: "United States", emblem: "shield", maxStrength: 110000, textLight: "#cfe0ff" },
};
const KR_NK = "nk", KR_UN = "un";
const KR_F = {
  nk: { main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000, css: "#8b0000", label_zh: "北韓／志願軍", label_en: "North Korea / PVA", emblem: "circle", maxStrength: 100000, textLight: "#ffd9d2" },
  un: { main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847, css: "#1a3a6e", label_zh: "聯合國軍", label_en: "UN Forces", emblem: "shield", maxStrength: 110000, textLight: "#cfe0ff" },
};
const ME_AR = "arab", ME_IS = "isr";
const ME_F = {
  arab: { main: 0x2e6b2e, glow: 0x4caf50, dim: 0x1a401a, css: "#2e6b2e", label_zh: "阿拉伯聯軍", label_en: "Arab Coalition", emblem: "circle", maxStrength: 80000, textLight: "#d4ecd4" },
  isr: { main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a, css: "#1565c0", label_zh: "以色列", label_en: "Israel", emblem: "shield", maxStrength: 70000, textLight: "#cfe0ff" },
};
const BK_SR = "sr", BK_CO = "co";
const BK_F = {
  sr: { main: 0x5c4033, glow: 0x8b4513, dim: 0x3a2820, css: "#6b3030", label_zh: "塞族部隊", label_en: "Serb Forces", emblem: "circle", maxStrength: 50000, textLight: "#e8dcc8" },
  co: { main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a, css: "#1b4f72", label_zh: "克／波黑／科索沃", label_en: "Croat / Bosniak / Kosovo", emblem: "shield", maxStrength: 45000, textLight: "#cfe0ff" },
};

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
    },
    factions,
    geography: { regions: center.regions || [], points: center.points || [], lines: center.lines || [] },
    units: center.units || [],
    arrows: center.arrows || [],
    fronts: center.fronts || [],
    hotspots: center.hotspots || [],
    weather: center.weather || [{ d: 1, night: 0.15, fog: 0.1, rain: 0.1, smoke: 0.2, zh: title_zh, en: title_en }],
    analysis: center.analysis || {
      military: center.analysisMilitary || (title_zh + "的軍事意義：雙方兵力部署、進攻與防禦行動，以及戰術成敗。"),
      leaders: center.analysisLeaders || "本戰役主要決策者與將領的指揮風格、政治立場，如何影響部隊行動與士氣。",
      nationalPower: center.analysisPower || "參戰國的工業、人口、資源與後勤能力決定能否持久作戰。",
      impact: center.analysisImpact || "本戰役對戰爭走向、國際秩序與後世歷史記憶的長遠影響。",
    },
    notes: {
      summary: center.noteSummary || title_zh + " — DSE 西史小戰役地圖。",
      caveats: ["本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。", "衛星影像為現代地形。"],
      sources: "DSE 課程、Britannica、BBC History。",
    },
    storyboard: center.storyboard || [],
    outro: {
      title_zh,
      title_en,
      narration_zh: center.outro_zh || "本戰役為 DSE 西史重要考點。",
      narration_en: center.outro_en || "A key DSE Western History topic.",
      cam: cam(center.lng, center.lat, (center.dist || 700) * 1.2, 48),
    },
  };
}

const CATALOG = [
  {
    slug: "ww1",
    title_zh: "第一次世界大戰",
    title_en: "WORLD WAR I",
    period: "1914–1918",
    intro: "一戰拆為六個核心小戰役，每張地圖只覆蓋該戰場約 30–80 公里範圍，方便看清地形與部隊動向。",
    warAnalysis: {
      military: "一戰以塹壕戰、總動員與新武器（機槍、毒氣、坦克、飛機）為特徵；西線僵持、東線機動、海外戰場牽制資源。",
      nationalPower: "歐洲列強動員全國工業與人口；英國海權、美國後期參戰、俄國革命退出，重塑力量對比。",
      impact: "四個帝國崩潰、凡爾賽體系、民族自決與國際聯盟；為二戰與二十世紀國際秩序埋下伏筆。",
    },
    battles: [
      {
        slug: "sarajevo",
        title_zh: "薩拉熱窩暗殺",
        title_en: "SARAJEVO 1914",
        blurb: "奧匈皇儲遇刺，一戰導火線",
        places: "薩拉熱窩舊城 · 拉丁橋一帶",
        data: baseBattle("ww1-sarajevo", "薩拉熱窩暗殺", "SARAJEVO", "1914年6月28日", geoBox(18.41, 43.86, 0.8, 0.7, 12), WW1_F, [WW1_CP, WW1_AP], [1914, 6, 28], {
          lng: 18.41, lat: 43.86, dist: 520,
          narr_zh: "1914年6月28日，斐迪南大公在薩拉熱窩遇刺。",
          narr_en: "Archduke Franz Ferdinand is assassinated in Sarajevo, 28 June 1914.",
          points: [
            { name_en: "Sarajevo", name_zh: "薩拉熱窩", type: "city", lng: 18.41, lat: 43.86 },
            { name_en: "Latin Bridge", name_zh: "拉丁橋", type: "town", lng: 18.43, lat: 43.86 },
          ],
          units: [
            { id: "ap_sarajevo", faction: WW1_AP, kind: "command", crest: "anchor", cf: false, name_zh: "奧匈皇室隨行", name_en: "Austrian Royal Party", track: [{ d: 1, lng: 18.41, lat: 43.86, s: 0, st: "hold" }, { d: 100, lng: 18.41, lat: 43.86, s: 0, st: "dead" }] },
          ],
          arrows: [{ d: 1, f: WW1_CP, from: [18.43, 43.86], to: [18.41, 43.86], label: "普林西普開槍", kind: "attack" }],
          hotspots: [{ a: 1, b: 100, lng: 18.41, lat: 43.86, kind: "firefight", i: 1 }],
          storyboard: [
            { day: 1, hold: 10, cam: cam(18.41, 43.86, 480), dateLabel: "1914年6月28日", title_zh: "薩拉熱窩暗殺", title_en: "Assassination at Sarajevo", narration_zh: "塞族民族主義者普林西普刺殺奧匈皇儲，觸發七月危機。", narration_en: "Gavrilo Princip assassinates the heir — the July Crisis begins.", focus: ["ap_sarajevo"], side: "ap" },
          ],
        }),
      },
      {
        slug: "marne",
        title_zh: "馬恩河戰役",
        title_en: "MARNE 1914",
        blurb: "施里芬計劃受挫，巴黎得救",
        places: "馬恩河 · 巴黎東郊",
        data: baseBattle("ww1-marne", "馬恩河戰役", "BATTLE OF THE MARNE", "1914年9月", geoBox(3.4, 48.95, 2.2, 1.4, 10), WW1_F, [WW1_CP, WW1_AP], [1914, 9, 6], {
          lng: 3.4, lat: 48.95, dist: 750,
          narr_zh: "德軍逼近巴黎，英法聯軍在馬恩河阻止南下。",
          narr_en: "Anglo-French forces halt the German advance at the Marne.",
          lines: [{ name_zh: "9月初戰線", name_en: "Early Sep front", path: [[2.8, 49.2], [3.2, 49.0], [3.8, 48.9], [4.2, 48.85]] }],
          points: [
            { name_en: "Marne River", name_zh: "馬恩河", type: "town", lng: 3.4, lat: 48.95 },
            { name_en: "Paris (east)", name_zh: "巴黎東郊", type: "city", lng: 2.55, lat: 48.86 },
            { name_en: "Meaux", name_zh: "莫城", type: "town", lng: 2.88, lat: 48.96 },
          ],
          units: [
            { id: "cp_marne", faction: WW1_CP, kind: "infantry", crest: "eagle", cf: true, name_zh: "德軍第一集團軍", name_en: "German 1st Army", track: [{ d: 1, lng: 4.0, lat: 49.1, s: 80000, st: "attack" }, { d: 50, lng: 3.5, lat: 48.95, s: 70000, st: "retreat" }, { d: 100, lng: 4.2, lat: 49.0, s: 65000, st: "hold" }] },
            { id: "ap_marne", faction: WW1_AP, kind: "infantry", crest: "anchor", cf: true, name_zh: "英法聯軍", name_en: "Anglo-French Forces", track: [{ d: 1, lng: 2.7, lat: 49.0, s: 75000, st: "retreat" }, { d: 40, lng: 3.2, lat: 48.95, s: 90000, st: "attack" }, { d: 100, lng: 3.0, lat: 48.92, s: 95000, st: "hold" }] },
          ],
          arrows: [
            { d: 1, f: WW1_CP, from: [4.0, 49.1], to: [3.4, 48.95], label: "德軍南下", kind: "attack" },
            { d: 40, f: WW1_AP, from: [2.7, 49.0], to: [3.4, 48.95], label: "馬恩河反擊", kind: "attack" },
          ],
          fronts: [
            { d: 1, path: [[3.6, 49.05], [3.4, 48.98], [3.2, 48.92]] },
            { d: 100, path: [[3.8, 49.1], [3.5, 49.0], [3.2, 48.9]] },
          ],
          hotspots: [{ a: 30, b: 70, lng: 3.4, lat: 48.95, kind: "firefight", i: 1 }],
          storyboard: [
            { day: 1, hold: 9, cam: cam(4.0, 49.1, 680), dateLabel: "1914年9月初", title_zh: "德軍逼近巴黎", title_en: "Germans Near Paris", narration_zh: "施里芬計劃最後階段，德軍直撲馬恩河。", narration_en: "The Schlieffen Plan's final phase — Germany drives toward the Marne.", focus: ["cp_marne"], side: "cp" },
            { day: 50, hold: 10, cam: cam(3.4, 48.95, 620), dateLabel: "1914年9月6–12日", title_zh: "馬恩河反擊", title_en: "Counter-attack at the Marne", narration_zh: "協約國在馬恩河阻止德軍，西線轉入僵持。", narration_en: "The Allies stop Germany at the Marne — trench stalemate begins.", focus: ["ap_marne", "cp_marne"], side: "both" },
          ],
        }),
      },
      {
        slug: "verdun",
        title_zh: "凡爾登戰役",
        title_en: "VERDUN 1916",
        blurb: "「他們將不會通過」— 消耗戰象徵",
        places: "凡爾登要塞 · 默茲河谷",
        data: baseBattle("ww1-verdun", "凡爾登戰役", "VERDUN", "1916年", geoBox(5.38, 49.16, 1.6, 1.2, 11), WW1_F, [WW1_CP, WW1_AP], [1916, 2, 21], {
          lng: 5.38, lat: 49.16, dist: 580,
          narr_zh: "德軍猛攻凡爾登要塞，雙方傷亡逾七十萬。",
          narr_en: "Germany assaults Verdun — over 700,000 casualties in months of attrition.",
          points: [
            { name_en: "Verdun", name_zh: "凡爾登", type: "fort", lng: 5.38, lat: 49.16 },
            { name_en: "Douaumont", name_zh: "杜奧蒙堡", type: "fort", lng: 5.44, lat: 49.19 },
            { name_en: "Fleury", name_zh: "弗勒里", type: "town", lng: 5.42, lat: 49.12 },
          ],
          units: [
            { id: "cp_verdun", faction: WW1_CP, kind: "infantry", crest: "eagle", cf: true, name_zh: "德軍第五集團軍", name_en: "German 5th Army", track: [{ d: 1, lng: 5.5, lat: 49.2, s: 90000, st: "attack" }, { d: 100, lng: 5.42, lat: 49.14, s: 60000, st: "hold" }] },
            { id: "ap_verdun", faction: WW1_AP, kind: "infantry", crest: "anchor", cf: true, name_zh: "法軍第二集團軍", name_en: "French 2nd Army", track: [{ d: 1, lng: 5.35, lat: 49.16, s: 70000, st: "hold" }, { d: 100, lng: 5.38, lat: 49.16, s: 85000, st: "hold" }] },
          ],
          arrows: [{ d: 20, f: WW1_CP, from: [5.5, 49.2], to: [5.38, 49.16], label: "猛攻凡爾登", kind: "attack" }],
          hotspots: [{ a: 10, b: 100, lng: 5.38, lat: 49.16, kind: "artillery", i: 1 }],
          weather: [{ d: 1, night: 0.2, fog: 0.3, rain: 0.2, smoke: 0.7, zh: "凡爾登 · 塹壕", en: "Verdun trenches" }],
          storyboard: [
            { day: 20, hold: 10, cam: cam(5.38, 49.16, 550), dateLabel: "1916年2–12月", title_zh: "凡爾登消耗戰", title_en: "Battle of Verdun", narration_zh: "貝當號召「他們將不會通過」，雙方在默茲河谷血戰。", narration_en: "\"They shall not pass\" — brutal attrition in the Meuse valley.", focus: ["cp_verdun", "ap_verdun"], side: "both" },
          ],
        }),
      },
      {
        slug: "somme",
        title_zh: "索姆河戰役",
        title_en: "SOMME 1916",
        blurb: "首日傷亡慘重的大攻勢",
        places: "索姆河 · 阿爾貝",
        data: baseBattle("ww1-somme", "索姆河戰役", "THE SOMME", "1916年7月", geoBox(2.7, 49.9, 1.8, 1.2, 10), WW1_F, [WW1_CP, WW1_AP], [1916, 7, 1], {
          lng: 2.7, lat: 49.9, dist: 650,
          narr_zh: "協約國發動索姆河攻勢，首日陣亡逾兩萬人。",
          narr_en: "Allied offensive on the Somme — over 20,000 British dead on day one.",
          points: [
            { name_en: "Somme", name_zh: "索姆河", type: "town", lng: 2.7, lat: 49.9 },
            { name_en: "Albert", name_zh: "阿爾貝", type: "city", lng: 2.65, lat: 50.0 },
            { name_en: "Thiepval", name_zh: "蒂耶普瓦勒", type: "fort", lng: 2.68, lat: 50.05 },
          ],
          units: [
            { id: "ap_somme", faction: WW1_AP, kind: "infantry", crest: "anchor", cf: true, name_zh: "英法聯軍", name_en: "Anglo-French", track: [{ d: 1, lng: 2.55, lat: 50.0, s: 100000, st: "attack" }, { d: 100, lng: 2.75, lat: 49.92, s: 85000, st: "hold" }] },
            { id: "cp_somme", faction: WW1_CP, kind: "infantry", crest: "eagle", cf: true, name_zh: "德軍防線", name_en: "German Defences", track: [{ d: 1, lng: 2.85, lat: 49.88, s: 80000, st: "hold" }, { d: 100, lng: 2.82, lat: 49.9, s: 70000, st: "hold" }] },
          ],
          arrows: [{ d: 5, f: WW1_AP, from: [2.55, 50.0], to: [2.75, 49.92], label: "7月1日攻勢", kind: "attack" }],
          hotspots: [{ a: 1, b: 40, lng: 2.7, lat: 49.9, kind: "firefight", i: 1 }],
          storyboard: [
            { day: 5, hold: 9, cam: cam(2.7, 49.9, 600), dateLabel: "1916年7月1日", title_zh: "索姆河首日", title_en: "First Day on the Somme", narration_zh: "英軍在索姆河發動大規模攻勢，傷亡極其慘重。", narration_en: "The British launch a massive attack — catastrophic casualties.", focus: ["ap_somme"], side: "ap" },
          ],
        }),
      },
      {
        slug: "tannenberg",
        title_zh: "坦能堡戰役",
        title_en: "TANNENBERG 1914",
        blurb: "東線德軍大勝俄軍",
        places: "坦能堡 · 東普魯士",
        data: baseBattle("ww1-tannenberg", "坦能堡戰役", "TANNENBERG", "1914年8月", geoBox(20.08, 53.88, 2.5, 2.0, 10), WW1_F, [WW1_CP, WW1_AP], [1914, 8, 26], {
          lng: 20.08, lat: 53.88, dist: 700,
          narr_zh: "興登堡與魯登道夫在東線包圍俄軍第一集團軍。",
          narr_en: "Hindenburg and Ludendorff encircle the Russian 1st Army.",
          points: [
            { name_en: "Tannenberg", name_zh: "坦能堡", type: "town", lng: 20.08, lat: 53.88 },
            { name_en: "Allenstein", name_zh: "阿倫施泰因", type: "city", lng: 20.45, lat: 53.78 },
            { name_en: "Olsztynek", name_zh: "奧爾什丁內克", type: "town", lng: 20.28, lat: 53.58 },
          ],
          units: [
            { id: "cp_east", faction: WW1_CP, kind: "infantry", crest: "eagle", cf: true, name_zh: "德軍第八集團軍", name_en: "German 8th Army", track: [{ d: 1, lng: 20.5, lat: 54.0, s: 70000, st: "attack" }, { d: 60, lng: 20.08, lat: 53.88, s: 80000, st: "attack" }, { d: 100, lng: 20.2, lat: 53.7, s: 75000, st: "hold" }] },
            { id: "ap_russia", faction: WW1_AP, kind: "infantry", crest: "hammer", cf: true, name_zh: "俄軍第一集團軍", name_en: "Russian 1st Army", track: [{ d: 1, lng: 21.2, lat: 54.2, s: 90000, st: "attack" }, { d: 60, lng: 20.3, lat: 53.9, s: 50000, st: "retreat" }, { d: 100, lng: 20.5, lat: 53.5, s: 20000, st: "dead" }] },
          ],
          arrows: [{ d: 30, f: WW1_CP, from: [20.5, 54.0], to: [20.08, 53.88], label: "雙重包圍", kind: "attack" }],
          hotspots: [{ a: 25, b: 80, lng: 20.08, lat: 53.88, kind: "firefight", i: 1 }],
          storyboard: [
            { day: 30, hold: 10, cam: cam(20.08, 53.88, 650), dateLabel: "1914年8月26–30日", title_zh: "坦能堡包圍戰", title_en: "Encirclement at Tannenberg", narration_zh: "德軍以少勝多，俘虜俄軍逾九萬。", narration_en: "Germany wins a stunning encirclement — 90,000 Russians captured.", focus: ["cp_east", "ap_russia"], side: "both" },
          ],
        }),
      },
      {
        slug: "gallipoli",
        title_zh: "加里波利戰役",
        title_en: "GALLIPOLI 1915",
        blurb: "協約國兩棲登陸失敗",
        places: "加里波利半島 · 安zac 灣",
        data: baseBattle("ww1-gallipoli", "加里波利戰役", "GALLIPOLI", "1915–1916", geoBox(26.41, 40.41, 1.8, 1.4, 11), WW1_F, [WW1_CP, WW1_AP], [1915, 4, 25], {
          lng: 26.41, lat: 40.41, dist: 620,
          narr_zh: "協約國企圖打通達黑海海峽，遭鄂圖曼軍擊退。",
          narr_en: "Allied landings fail against Ottoman defences on the Gallipoli peninsula.",
          points: [
            { name_en: "Gallipoli", name_zh: "加里波利", type: "fort", lng: 26.41, lat: 40.41 },
            { name_en: "Anzac Cove", name_zh: "安zac 灣", type: "bay", lng: 26.28, lat: 40.24 },
            { name_en: "Suvla Bay", name_zh: "蘇弗拉灣", type: "bay", lng: 26.22, lat: 40.32 },
          ],
          units: [
            { id: "ap_gallipoli", faction: WW1_AP, kind: "infantry", crest: "anchor", cf: true, name_zh: "安zac 遠征軍", name_en: "ANZAC Corps", track: [{ d: 1, lng: 26.5, lat: 40.5, s: 40000, st: "landing" }, { d: 60, lng: 26.28, lat: 40.24, s: 35000, st: "hold" }, { d: 100, lng: 26.5, lat: 40.5, s: 15000, st: "retreat" }] },
            { id: "cp_ottoman", faction: WW1_CP, kind: "infantry", crest: "crescent", cf: true, name_zh: "鄂圖曼第五集團軍", name_en: "Ottoman 5th Army", track: [{ d: 1, lng: 26.35, lat: 40.35, s: 50000, st: "hold" }, { d: 100, lng: 26.38, lat: 40.38, s: 45000, st: "hold" }] },
          ],
          arrows: [{ d: 1, f: WW1_AP, from: [26.5, 40.5], to: [26.28, 40.24], label: "安zac 登陸", kind: "landing" }],
          hotspots: [{ a: 1, b: 90, lng: 26.28, lat: 40.24, kind: "firefight", i: 0.9 }],
          storyboard: [
            { day: 1, hold: 9, cam: cam(26.28, 40.24, 580), dateLabel: "1915年4月25日", title_zh: "加里波利登陸", title_en: "Landings at Gallipoli", narration_zh: "澳紐軍團在安zac 灣登陸，遭鄂圖曼軍頑強抵抗。", narration_en: "ANZAC troops land at Anzac Cove — fierce Ottoman resistance.", focus: ["ap_gallipoli", "cp_ottoman"], side: "both" },
            { day: 90, hold: 8, cam: cam(26.41, 40.41, 700), dateLabel: "1916年1月", title_zh: "撤離半島", title_en: "Evacuation", narration_zh: "協約國秘密撤離，遠征以失敗告終。", narration_en: "Allied forces evacuate — the campaign ends in failure.", focus: ["ap_gallipoli"], side: "ap" },
          ],
        }),
      },
    ],
  },
  // WW2 Europe, Pacific, Korea, Mideast, Balkans — continued in part 2
];

// Append remaining wars (loaded from separate module for maintainability)
require("./battle-catalog-rest.js")(CATALOG, {
  geoBox, cam, baseBattle, WW2_F, WW2_AX, WW2_AL, PAC_F, PAC_JP, PAC_US, KR_F, KR_NK, KR_UN, ME_F, ME_AR, ME_IS, BK_F, BK_SR, BK_CO,
});

const ENRICH = require("./battle-enrichment.js")({ cam });
const LEADERS = require("./battle-leaders.js");

function mergeEnrichment(battle, warSlug) {
  const e = ENRICH[`${warSlug}/${battle.slug}`];
  if (!e) return;
  const d = battle.data;
  if (e.storyboard) d.storyboard = e.storyboard;
  if (e.analysis) d.analysis = { ...d.analysis, ...e.analysis };
  if (e.END_DAY) d.END_DAY = e.END_DAY;
  if (e.units) d.units = e.units;
  if (e.hotspots) d.hotspots = e.hotspots;
  if (e.arrows) d.arrows = e.arrows;
  if (e.unitsExtra) d.units = [...d.units, ...e.unitsExtra];
  if (e.hotspotsExtra) d.hotspots = [...d.hotspots, ...e.hotspotsExtra];
  const maxDay = Math.max(d.END_DAY || 100, ...(d.storyboard || []).map((s) => s.day || 1));
  d.END_DAY = maxDay;
}

function mergeLeaders(battle, warSlug) {
  const key = `${warSlug}/${battle.slug}`;
  const d = battle.data;
  if (!d.analysis) d.analysis = {};
  if (LEADERS[key]) d.analysis.leaders = LEADERS[key];
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

// ---- generate ----
for (const war of CATALOG) {
  const warDir = path.join(ROOT, "wars", war.slug);
  const legacyData = path.join(warDir, "data.js");
  if (fs.existsSync(legacyData)) fs.unlinkSync(legacyData);
  fs.writeFileSync(path.join(warDir, "index.html"), hubHtml(war));
  for (const b of war.battles) {
    mergeEnrichment(b, war.slug);
    mergeLeaders(b, war.slug);
    writeBattle(war.slug, b);
  }
  console.log(`✓ ${war.slug}: ${war.battles.length} battles`);
}

// Main index cards
const mainCards = CATALOG.map(
  (w) => `    <a class="card" href="wars/${w.slug}/">
      <h2>${w.title_zh}</h2>
      <div class="en">${w.title_en} · ${w.period}</div>
      <p>${w.battles.length} 個小戰役地圖 · 每圖聚焦單一戰場</p>
      <div class="places">${w.battles.map((b) => b.title_zh.replace(/戰役|戰爭|暗殺/g, "")).join(" · ")}</div>
    </a>`
).join("\n");

const mainIdx = path.join(ROOT, "index.html");
let main = fs.readFileSync(mainIdx, "utf8");
main = main.replace(
  /<div class="grid">[\s\S]*?<\/div>\s*<footer>/,
  `<div class="grid">\n${mainCards}\n  </div>\n  <footer>`
);
main = main.replace(
  "以真實地形衛星影像呈現 DSE 西史課程各大戰的關鍵地點與事件。",
  "以真實地形衛星影像呈現 DSE 西史課程各小戰役；每張地圖只覆蓋單一戰場核心區域。"
);
fs.writeFileSync(mainIdx, main);
console.log("✓ main index updated");
