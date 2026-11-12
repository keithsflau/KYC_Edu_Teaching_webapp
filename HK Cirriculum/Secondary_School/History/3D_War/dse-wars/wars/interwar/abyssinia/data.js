/* ABYSSINIA · 意大利入侵埃塞俄比亞與國聯 1935–1936 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta = {
    id: "league-abyssinia",
    title_zh: "阿比西尼亞與國聯",
    title_en: "ABYSSINIA AND THE LEAGUE",
    subtitle: "1935–1936",
    factionOrder: ["it", "et"],
    geo: { minLng: 38.2, maxLng: 40.5, minLat: 8.6, maxLat: 15.0, Z: 8 },
    startDate: [1935, 10, 3],
    introCam: { lng: 39.4, lat: 12.2, dist: 2400, az: 200, el: 52, orbit: 0.35 },
    titleCard: {
      zh: "阿比西尼亞與國聯",
      en: "ITALY, ETHIOPIA AND THE LEAGUE · 1935–36",
      narr_zh: "1935年10月3日，意大利從厄立特里亞攻入埃塞俄比亞。國聯判定意大利為侵略者，但制裁沒有包括石油，蘇伊士運河也保持開放。",
      narr_en: "On 3 October 1935 Italy invaded Ethiopia from Eritrea. The League named Italy the aggressor, but sanctions left out oil and the Suez Canal stayed open."
    },
    outroCam: { lng: 38.9, lat: 11.5, dist: 2800, az: 190, el: 50, orbit: 0.3 },
    nextBattle: { href: "../../ww2-europe/poland/", title_zh: "入侵波蘭", title_en: "POLAND 1939" }
  };
  const factions = {
    it: {
      main: 0x2e5a1c, glow: 0x7cb342, dim: 0x1b3a10,
      css: "#2e5a1c", label_zh: "意大利", label_en: "Italy",
      emblem: "circle", maxStrength: 250000, textLight: "#e4f2d4"
    },
    et: {
      main: 0x8d6a2f, glow: 0xe0b15a, dim: 0x5a4018,
      css: "#8d6a2f", label_zh: "埃塞俄比亞", label_en: "Ethiopia",
      emblem: "shield", maxStrength: 250000, textLight: "#f3e6c4"
    }
  };
  const geography = {
    regions: [],
    points: [
      { name_en: "Adigrat", name_zh: "阿迪格拉特", type: "town", lng: 39.46, lat: 14.28 },
      { name_en: "Mekelle", name_zh: "默克萊", type: "city", lng: 39.48, lat: 13.50 },
      { name_en: "Maychew", name_zh: "邁丘", type: "town", lng: 39.54, lat: 12.78 },
      { name_en: "Dessie", name_zh: "德西埃", type: "city", lng: 39.63, lat: 11.13 },
      { name_en: "Addis Ababa", name_zh: "亞的斯亞貝巴", type: "city", lng: 38.75, lat: 9.03 }
    ],
    lines: []
  };
  const units = [
    {
      id: "it_north", faction: "it", kind: "infantry", crest: "circle", cf: true,
      name_zh: "意大利北路軍", name_en: "Italian northern army",
      track: [
        { d: 1, lng: 39.46, lat: 14.28, s: 120000, st: "attack" },
        { d: 35, lng: 39.48, lat: 13.50, s: 140000, st: "attack" },
        { d: 60, lng: 39.54, lat: 12.78, s: 150000, st: "attack" },
        { d: 80, lng: 39.63, lat: 11.13, s: 140000, st: "attack" },
        { d: 100, lng: 38.75, lat: 9.03, s: 100000, st: "hold" }
      ]
    },
    {
      id: "et_army", faction: "et", kind: "infantry", crest: "shield", cf: true,
      name_zh: "埃塞俄比亞軍", name_en: "Ethiopian army",
      track: [
        { d: 1, lng: 39.5, lat: 13.2, s: 150000, st: "hold" },
        { d: 55, lng: 39.54, lat: 12.78, s: 100000, st: "attack" },
        { d: 70, lng: 39.63, lat: 11.13, s: 60000, st: "retreat" },
        { d: 100, lng: 38.75, lat: 9.03, s: 20000, st: "retreat" }
      ]
    }
  ];
  const arrows = [
    { d: 1, f: "it", from: [39.46, 14.6], to: [39.48, 13.50], label: "自厄立特里亞南下", kind: "attack" }
  ];
  const fronts = [];
  const hotspots = [
    { a: 50, b: 70, lng: 39.54, lat: 12.78, kind: "firefight", i: 1 }
  ];
  const weather = [
    { d: 1, night: 0.1, fog: 0.08, rain: 0.05, smoke: 0.2, zh: "阿比西尼亞", en: "Abyssinia" }
  ];
  const notes = {
    summary: "意大利入侵埃塞俄比亞 — 用來看國際聯盟集體安全是否運作的課題地圖。",
    caveats: [
      "圖上只畫北路：由阿迪格拉特、默克萊、邁丘、德西埃到亞的斯亞貝巴。東路從意屬索馬里蘭進攻，不在這張圖的範圍。",
      "意大利使用芥子氣。這張圖不展示施放過程，只標明戰役結果與國聯的決定。",
      "部隊人數是量級示意。"
    ],
    sources: "國聯大會1935年10月認定意大利為侵略者；制裁於1935年11月開始，不包括石油，1936年7月撤銷。巴多格里奧1936年5月5日進入亞的斯亞貝巴。海爾·塞拉西1936年6月30日在國聯發言。"
  };
  const analysis = {
    military: "北路於1935年10月3日從厄立特里亞進入。1936年3月31日，埃塞俄比亞軍在邁丘反攻失敗。5月5日巴多格里奧進入首都。意大利的飛機、炮兵與芥子氣對上裝備懸殊的埃塞俄比亞軍隊。",
    leaders: "墨索里尼要以此洗刷1896年阿杜瓦戰敗，並展示帝國。海爾·塞拉西把爭議提交國聯，1936年6月30日親自在日內瓦發言。英國與法國外長此時還在試探讓意大利獲得部分土地的方案，沒有關閉運河。",
    nationalPower: "意大利可以經蘇伊士運河把部隊與補給送往東非。國聯制裁不禁石油，也不禁運河通行，所以意大利的戰爭經濟沒有被切斷。",
    impact: "1936年7月制裁撤銷。埃塞俄比亞被意大利占領，直到1941年東非戰役才由英聯邦軍隊與埃塞俄比亞抵抗力量恢復皇帝的政府。國聯表明：點名侵略者，若會員不切斷關鍵補給，集體安全就停在決議。"
  };
  function cam(lng, lat, dist){ return { lng: lng, lat: lat, dist: dist, az: 200, el: 48, orbit: 0.3 }; }
  const storyboard = [
    { day: 1, hold: 8, cam: cam(39.46, 14.28, 900), dateLabel: "1935年10月3日", title_zh: "越境", title_en: "The Invasion",
      narration_zh: "意大利軍隊從厄立特里亞進入埃塞俄比亞，沒有經過國聯授權。",
      narration_en: "Italian forces enter Ethiopia from Eritrea without League authorisation.",
      focus: ["it_north"], side: "it", commanders: [{ zh: "德博諾", en: "De Bono" }], assets: ["air"] },
    { day: 25, hold: 8, cam: cam(39.48, 13.50, 1100), dateLabel: "1935年10–11月", title_zh: "制裁的缺口", title_en: "The Gap in Sanctions",
      narration_zh: "國聯認定意大利是侵略者，並實施制裁。制裁不包括石油，蘇伊士運河繼續開放。",
      narration_en: "The League names Italy the aggressor and imposes sanctions. Oil is excluded, and the Suez Canal stays open.",
      focus: ["it_north"], side: "it" },
    { day: 55, hold: 8, cam: cam(39.54, 12.78, 800), dateLabel: "1936年3月31日", title_zh: "邁丘", title_en: "Maychew",
      narration_zh: "埃塞俄比亞軍在邁丘反攻，被炮兵與空軍擊退。意大利在這場戰爭使用芥子氣。",
      narration_en: "The Ethiopian counter-attack at Maychew is broken by artillery and aircraft. Italy uses mustard gas in the war.",
      focus: ["et_army", "it_north"], side: "both", commanders: [{ zh: "海爾·塞拉西", en: "Haile Selassie" }], assets: ["air", "artillery"] },
    { day: 78, hold: 8, cam: cam(38.75, 9.03, 850), dateLabel: "1936年5月5日", title_zh: "進入首都", title_en: "Addis Ababa",
      narration_zh: "巴多格里奧進入亞的斯亞貝巴。皇帝在首都陷落前離境，前往日內瓦。",
      narration_en: "Badoglio enters Addis Ababa. The emperor leaves before the fall and goes on to Geneva.",
      focus: ["it_north"], side: "it", commanders: [{ zh: "巴多格里奧", en: "Badoglio" }] },
    { day: 94, hold: 9, cam: cam(38.75, 9.03, 1400), dateLabel: "1936年6月30日", title_zh: "日內瓦", title_en: "Geneva",
      narration_zh: "海爾·塞拉西在國聯發言。1936年7月，制裁撤銷。占領持續到1941年。",
      narration_en: "Haile Selassie addresses the League. Sanctions are lifted in July 1936. The occupation lasts until 1941.",
      focus: ["et_army"], side: "et", commanders: [{ zh: "海爾·塞拉西", en: "Haile Selassie" }] }
  ];
  const outro = {
    title_zh: "決議沒有切斷補給",
    title_en: "A RESOLUTION THAT LEFT THE SUPPLY LINE OPEN",
    narration_zh: "國聯指出了侵略者。石油與運河仍可供意大利使用，制裁在首都陷落後兩個月撤銷。",
    narration_en: "The League identified the aggressor. Oil and the Canal remained available to Italy, and sanctions were lifted two months after the capital fell."
  };
  const sourceTask = {
    cite: "海爾·塞拉西在國際聯盟的發言，1936年6月30日，日內瓦",
    excerpt: "他向會員國說：今天被拋下的是埃塞俄比亞，若不制止侵略，同樣的命運會輪到其他國家。",
    ask: "這段話的立場是什麼？",
    options: [
      { t: "要求國聯承認意大利的征服已經完成，不必再討論。", ok: false, why: "他是在首都陷落後仍然要求會員履行集體安全，不是接受征服。" },
      { t: "警告集體安全若對一個會員失效，其他會員的保障也會一起失效。", ok: true, why: "發言把埃塞俄比亞的遭遇說成對整套機制的考驗。隨後的事實是：制裁於1936年7月撤銷，石油與蘇伊士運河從未被切斷。" },
      { t: "主張埃塞俄比亞改與意大利結盟。", ok: false, why: "發言的對象是國聯會員，內容是指責侵略，不是尋求加入意大利一方。" }
    ]
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
