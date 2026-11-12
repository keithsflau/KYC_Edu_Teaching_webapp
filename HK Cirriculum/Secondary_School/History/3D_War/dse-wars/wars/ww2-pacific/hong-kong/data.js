/* HONG KONG · 香港保衛戰 1941 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta = {
    id: "ww2-hong-kong",
    title_zh: "香港保衛戰",
    title_en: "DEFENCE OF HONG KONG",
    subtitle: "1941年12月8–25日",
    factionOrder: ["jp", "gb"],
    geo: { minLng: 113.99, maxLng: 114.36, minLat: 22.17, maxLat: 22.56, Z: 12 },
    startDate: [1941, 12, 8],
    introCam: { lng: 114.17, lat: 22.32, dist: 520, az: 210, el: 48, orbit: 0.5 },
    titleCard: {
      zh: "香港保衛戰",
      en: "HONG KONG · 8–25 DECEMBER 1941",
      narr_zh: "香港時間1941年12月8日，日軍與偷襲珍珠港同一早晨進攻香港。",
      narr_en: "On 8 December 1941, Hong Kong time, Japan attacked the colony on the same morning as Pearl Harbor."
    },
    outroCam: { lng: 114.17, lat: 22.28, dist: 640, az: 200, el: 48, orbit: 0.5 },
    nextBattle: { href: "../philippines/", title_zh: "菲律賓戰役", title_en: "PHILIPPINES 1941–42" }
  };
  const factions = {
    jp: {
      main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000,
      css: "#8b0000", label_zh: "日軍", label_en: "Japan",
      emblem: "circle", maxStrength: 25000, textLight: "#ffd9d2"
    },
    gb: {
      main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847,
      css: "#1a3a6e", label_zh: "守軍", label_en: "Garrison",
      emblem: "shield", maxStrength: 15000, textLight: "#cfe0ff"
    }
  };
  const geography = {
    regions: [],
    points: [
      { name_en: "Shing Mun Redoubt", name_zh: "城門碉堡", type: "fort", lng: 114.141, lat: 22.388 },
      { name_en: "Kai Tak", name_zh: "啟德", type: "town", lng: 114.213, lat: 22.315 },
      { name_en: "Lei Yue Mun", name_zh: "鯉魚門", type: "bay", lng: 114.239, lat: 22.288 },
      { name_en: "Wong Nai Chung Gap", name_zh: "黃泥涌峽", type: "fort", lng: 114.194, lat: 22.257 },
      { name_en: "Stanley", name_zh: "赤柱", type: "town", lng: 114.213, lat: 22.219 }
    ],
    lines: []
  };
  const units = [
    {
      id: "jp_38", faction: "jp", kind: "infantry", crest: "circle", cf: true,
      name_zh: "日軍第38師團", name_en: "Japanese 38th Division",
      track: [
        { d: 1, lng: 114.12, lat: 22.52, s: 20000, st: "attack" },
        { d: 20, lng: 114.141, lat: 22.388, s: 20000, st: "attack" },
        { d: 55, lng: 114.20, lat: 22.291, s: 18000, st: "landing" },
        { d: 75, lng: 114.194, lat: 22.257, s: 16000, st: "attack" },
        { d: 100, lng: 114.17, lat: 22.28, s: 15000, st: "hold" }
      ]
    },
    {
      id: "gb_gar", faction: "gb", kind: "infantry", crest: "shield", cf: true,
      name_zh: "香港守軍", name_en: "Hong Kong garrison",
      track: [
        { d: 1, lng: 114.15, lat: 22.40, s: 14000, st: "hold" },
        { d: 30, lng: 114.17, lat: 22.28, s: 12000, st: "retreat" },
        { d: 80, lng: 114.20, lat: 22.23, s: 8000, st: "hold" },
        { d: 100, lng: 114.213, lat: 22.219, s: 6000, st: "dead" }
      ]
    }
  ];
  const arrows = [
    { d: 1, f: "jp", from: [114.12, 22.52], to: [114.141, 22.388], label: "突破醉酒灣防線", kind: "attack" },
    { d: 55, f: "jp", from: [114.24, 22.31], to: [114.20, 22.29], label: "登陸港島", kind: "landing" }
  ];
  const fronts = [];
  const hotspots = [
    { a: 15, b: 30, lng: 114.141, lat: 22.388, kind: "firefight", i: 0.8 },
    { a: 65, b: 85, lng: 114.194, lat: 22.257, kind: "firefight", i: 1 }
  ];
  const weather = [
    { d: 1, night: 0.2, fog: 0.15, rain: 0.05, smoke: 0.35, zh: "香港保衛戰", en: "Hong Kong" }
  ];
  const notes = {
    summary: "香港保衛戰 — 香港與第二次世界大戰的課題地圖。兵力與路線為示意。",
    caveats: [
      "圖幅覆蓋新界南部至港島赤柱。路線按城門碉堡、鯉魚門與黃泥涌峽的真實位置錨定，不是逐小時戰術圖。",
      "守軍約一萬四千人，包括英軍、加拿大兩營、印度營與香港義勇防衛軍。日軍第38師團為進攻主力。",
      "衛星影像是現代地形。"
    ],
    sources: "馬爾比少將報告（倫敦憲報，1948）；香港抗戰史料中的日期：12月8日開戰、12月9–10日城門碉堡、12月18日登陸港島、12月25日投降。"
  };
  const analysis = {
    military: "12月8日啟德機場在開戰當日失去作用。醉酒灣防線的城門碉堡於12月9日至10日夜間失守，九龍在數日內撤離。12月18日夜日軍在鯉魚門、北角一帶登陸港島。12月19日黃泥涌峽失守，西旅旅長羅遜戰死。12月25日下午守軍投降。",
    leaders: "總督楊慕琦於12月13日拒絕日軍勸降。守軍司令馬爾比在港島戰鬥後建議投降。進攻由第23軍司令官酒井隆指揮，擔任攻堅的第38師團師團長是佐野忠義。加拿大皇家來福槍營與溫尼伯擲彈兵營是1941年11月才抵港的增援，開戰後沒有再派解圍艦隊。",
    nationalPower: "日本已取得華南的海空優勢，可以從深圳河方向投入一個師團。香港守軍沒有可作戰的空軍，海軍只剩少量艦艇，彈藥與飲水都限於島上儲備。",
    impact: "投降之後香港進入日佔，至1945年8月才結束。這次戰役說明一個沒有海空援軍的殖民地守備，擋不住已集中的師團；本地義勇軍與加拿大營的傷亡是這十八日的具體結果。"
  };
  function cam(lng, lat, dist){ return { lng: lng, lat: lat, dist: dist, az: 210, el: 46, orbit: 0.45 }; }
  const storyboard = [
    { day: 1, hold: 8, cam: cam(114.21, 22.32, 480), dateLabel: "1941年12月8日", title_zh: "同一早晨", title_en: "The Same Morning",
      narration_zh: "香港時間12月8日早上，日軍空襲啟德，並從深圳河方向進入新界。",
      narration_en: "On the morning of 8 December, Hong Kong time, Japanese aircraft strike Kai Tak and troops cross from the Shenzhen River.",
      focus: ["jp_38", "gb_gar"], side: "both", commanders: [{ zh: "佐野忠義", en: "Sano" }], assets: ["air"] },
    { day: 18, hold: 8, cam: cam(114.141, 22.388, 420), dateLabel: "1941年12月9–10日", title_zh: "城門碉堡", title_en: "Shing Mun Redoubt",
      narration_zh: "醉酒灣防線的城門碉堡在夜間失守，新界與九龍的遲滯只維持數日。",
      narration_en: "The Shing Mun Redoubt on the Gin Drinkers Line falls at night. The delay on the mainland lasts only days.",
      focus: ["jp_38", "gb_gar"], side: "both", assets: ["artillery"] },
    { day: 36, hold: 8, cam: cam(114.17, 22.30, 500), dateLabel: "1941年12月13日", title_zh: "拒絕勸降", title_en: "Surrender Demand Refused",
      narration_zh: "九龍撤離後，日軍勸降。總督楊慕琦拒絕。此時並沒有解圍艦隊在途。",
      narration_en: "After the evacuation of Kowloon, Japan demands surrender. Governor Sir Mark Young refuses. No relief fleet is on the way.",
      focus: ["gb_gar"], side: "gb", commanders: [{ zh: "楊慕琦", en: "Sir Mark Young" }] },
    { day: 58, hold: 8, cam: cam(114.22, 22.29, 440), dateLabel: "1941年12月18日", title_zh: "登陸港島", title_en: "Landings on the Island",
      narration_zh: "日軍夜航鯉魚門，在港島北岸登陸。",
      narration_en: "Japanese troops cross Lei Yue Mun at night and land on the northern shore.",
      focus: ["jp_38"], side: "jp", assets: ["landing", "navy"] },
    { day: 74, hold: 8, cam: cam(114.194, 22.257, 400), dateLabel: "1941年12月19日", title_zh: "黃泥涌峽", title_en: "Wong Nai Chung Gap",
      narration_zh: "黃泥涌峽的通路被切斷。西旅旅長羅遜在峽口指揮部戰死。",
      narration_en: "The Gap is cut. Brigadier John Lawson is killed at his headquarters there.",
      focus: ["jp_38", "gb_gar"], side: "both", commanders: [{ zh: "羅遜", en: "Lawson" }], assets: ["artillery"] },
    { day: 92, hold: 9, cam: cam(114.213, 22.219, 520), dateLabel: "1941年12月25日", title_zh: "黑色聖誕", title_en: "Black Christmas",
      narration_zh: "守軍在赤柱等處仍有殘部，當天下午投降。香港日佔由此開始，至1945年8月。",
      narration_en: "Pockets remain, including at Stanley, but the garrison surrenders that afternoon. The occupation lasts until August 1945.",
      focus: ["gb_gar"], side: "gb", commanders: [{ zh: "馬爾比", en: "Maltby" }] }
  ];
  const outro = {
    title_zh: "十八日",
    title_en: "EIGHTEEN DAYS",
    narration_zh: "由12月8日到25日，守軍沒有海空援軍。城門碉堡、港島登陸與黃泥涌峽，決定了這次防守的長度。",
    narration_en: "From 8 to 25 December the garrison had no air or naval relief. Shing Mun, the island landings and the Gap set the length of the defence."
  };
  const sourceTask = {
    cite: "馬爾比少將報告所述，1941年12月13日",
    excerpt: "九龍撤離之後，日軍送出勸降。總督楊慕琦拒絕繼續討論投降。",
    ask: "只看這次拒絕，可以推出哪一項？",
    options: [
      { t: "英國解圍艦隊已經開出，所以總督有把握守住。", ok: false, why: "拒絕只說明12月13日的立場。開戰後英國沒有派出解圍艦隊，守軍於12月25日投降。" },
      { t: "這是總督當時的立場；它不能證明援軍已在途。", ok: true, why: "史料記載的是拒絕勸降。兵力對比是另一件事：約一萬四千守軍對上已取得海空優勢的第38師團，而且沒有後續增援。" },
      { t: "日軍在12月13日已經占領港島。", ok: false, why: "港島登陸是12月18日夜。13日的勸降發生在九龍撤離之後、登陸港島之前。" }
    ]
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
