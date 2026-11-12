"use strict";
const fs = require("fs");
const path = require("path");
const ROOT = path.resolve(__dirname, "..", "..", "..");
const miss = [];
function read(rel) { return fs.readFileSync(path.join(ROOT, rel), "utf8"); }
function write(rel, s) { fs.writeFileSync(path.join(ROOT, rel), s); }
function rep(rel, from, to) {
  const s = read(rel);
  if (!s.includes(from)) { miss.push(rel + " :: " + from.slice(0, 80).replace(/\n/g, " ")); return; }
  write(rel, s.split(from).join(to));
}

const frag = fs.readFileSync(path.join(__dirname, "..", "shared", "lesson-kit.fragment.js"), "utf8");
for (const rel of ["3D_War/dse-wars/shared/app.js", "3D_War/ru-ua-war/app.js"]) {
  let s = read(rel);
  if (!s.includes("function wireSceneAudio")) {
    if (!s.includes("let kickMusic=()=>{};")) miss.push(rel + " :: kickMusic anchor");
    else s = s.replace("let kickMusic=()=>{};", frag + "\nlet kickMusic=()=>{};");
  }
  if (!s.includes("wireSceneAudio();")) {
    s = s.replace(
      '$("lang-btn").onclick=cycleNarrLang;',
      '$("lang-btn").onclick=cycleNarrLang;\n  ensureLessonStyle(); wireSceneAudio(); wireSourceTask();'
    );
  }
  s = s.replace(
    '$("play").onclick=()=>{ Director.togglePlay(); syncMusic(); };\n  $("resume").onclick=()=>{ Director.resume(); syncMusic(); };',
    '$("play").onclick=()=>{ Director.togglePlay(); syncMusic(); syncSfx(); };\n  $("resume").onclick=()=>{ Director.resume(); syncSfx(); syncMusic(); };'
  );
  s = s.replace(
    "showNextBattle(); updatePlayBtn();",
    "showNextBattle(); updatePlayBtn(); openSourceOnce();"
  );
  write(rel, s);
}

const reps = [
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    'css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers"',
    'css: "#5c4033", label_zh: "青年波斯尼亞", label_en: "Young Bosnia"'],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    'css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers"',
    'css: "#1e5a8a", label_zh: "奧匈帝國", label_en: "Austria-Hungary"'],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    '"narration_zh": "奧匈向塞爾維亞發出最後通牒，俄、德、法、英相繼動員。"',
    '"narration_zh": "奧匈於7月23日向塞爾維亞發出最後通牒。俄國7月30日總動員，德、法隨之動員。英國在七月危機並未總動員，8月4日才因比利時中立宣戰。"'],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    '"narration_en": "Austria-Hungary issues an ultimatum to Serbia; the great powers mobilise."',
    '"narration_en": "Austria-Hungary ultimatum on 23 July. Russia mobilises on 30 July; Germany and France follow. Britain does not order general mobilisation during the July Crisis."'],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    '"forces_zh": "歐洲列強進入戰爭動員"',
    '"forces_zh": "俄、德、法總動員；英國在七月並未總動員"'],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    '"forces_en": "European powers mobilise for war"',
    '"forces_en": "Russia, Germany and France mobilise; Britain does not"'],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    "英國受條約牽制。",
    "英國在七月危機沒有總動員，8月4日才因德國入侵比利時宣戰。"],
  ["3D_War/dse-wars/wars/ww1/sarajevo/data.js",
    '"href": "../marne/",\n          "title_zh": "馬恩河戰役",\n          "title_en": "MARNE 1914"',
    '"href": "../tannenberg/",\n          "title_zh": "坦能堡戰役",\n          "title_en": "TANNENBERG 1914"'],
  ["3D_War/dse-wars/wars/ww1/tannenberg/data.js",
    '"href": "../gallipoli/",\n          "title_zh": "加里波利戰役",\n          "title_en": "GALLIPOLI 1915"',
    '"href": "../marne/",\n          "title_zh": "馬恩河戰役",\n          "title_en": "MARNE 1914"'],
  ["3D_War/dse-wars/wars/ww1/marne/data.js",
    '"href": "../verdun/",\n          "title_zh": "凡爾登戰役",\n          "title_en": "VERDUN 1916"',
    '"href": "../gallipoli/",\n          "title_zh": "加里波利戰役",\n          "title_en": "GALLIPOLI 1915"'],
  ["3D_War/dse-wars/wars/ww1/gallipoli/data.js",
    '"href": "../../ww2-europe/poland/",\n          "title_zh": "入侵波蘭",\n          "title_en": "POLAND 1939"',
    '"href": "../verdun/",\n          "title_zh": "凡爾登戰役",\n          "title_en": "VERDUN 1916"'],
  ["3D_War/dse-wars/wars/ww1/somme/data.js",
    '"href": "../tannenberg/",\n          "title_zh": "坦能堡戰役",\n          "title_en": "TANNENBERG 1914"',
    '"href": "../../interwar/abyssinia/",\n          "title_zh": "阿比西尼亞與國聯",\n          "title_en": "ABYSSINIA 1935"'],
  ["3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js",
    '"href": "../normandy/",\n          "title_zh": "諾曼第登陸",\n          "title_en": "NORMANDY D-DAY"',
    '"href": "../el-alamein/",\n          "title_zh": "阿拉曼戰役",\n          "title_en": "EL ALAMEIN 1942"'],
  ["3D_War/dse-wars/wars/ww2-europe/el-alamein/data.js",
    '"href": "../berlin/",\n          "title_zh": "柏林戰役",\n          "title_en": "BERLIN 1945"',
    '"href": "../normandy/",\n          "title_zh": "諾曼第登陸",\n          "title_en": "NORMANDY 1944"'],
  ["3D_War/dse-wars/wars/ww2-europe/normandy/data.js",
    '"href": "../el-alamein/",\n          "title_zh": "阿拉曼戰役",\n          "title_en": "EL ALAMEIN 1942"',
    '"href": "../berlin/",\n          "title_zh": "柏林戰役",\n          "title_en": "BERLIN 1945"'],
  ["3D_War/dse-wars/wars/ww2-europe/berlin/data.js",
    '"href": "../../ww2-pacific/philippines/",\n          "title_zh": "菲律賓戰役",\n          "title_en": "PHILIPPINES 1941–42"',
    '"href": "../../ww2-pacific/hong-kong/",\n          "title_zh": "香港保衛戰",\n          "title_en": "HONG KONG 1941"'],
  ["3D_War/dse-wars/wars/ww1/gallipoli/data.js",
    `          "dateLabel": "1915年4月25日",
          "title_zh": "海軍炮擊",
          "title_en": "Naval Bombardment",
          "narration_zh": "協約國艦隊炮轟加里波利半島，準備登陸。",
          "narration_en": "Allied fleet bombards the Gallipoli peninsula before landings.",`,
    `          "dateLabel": "1915年3月18日",
          "title_zh": "海峽強航失敗",
          "title_en": "Naval Attack Fails",
          "narration_zh": "協約國艦隊試圖強行通過達達尼爾海峽，觸雷並遭岸炮擊退。海軍失敗是3月18日，不是4月25日。",
          "narration_en": "The Allied fleet tries to force the Dardanelles and is stopped by mines and shore guns. The naval failure is 18 March, not 25 April.",`],
  ["3D_War/dse-wars/wars/ww1/gallipoli/data.js",
    `"startDate": [
          1915,
          4,
          25
      ]`,
    `"startDate": [
          1915,
          3,
          18
      ]`],
  ["3D_War/dse-wars/wars/ww1/somme/data.js",
    "協約國發動索姆河攻勢，首日陣亡逾兩萬人。",
    "英軍在索姆河發動攻勢。首日陣亡約19,240人，傷亡合計約57,470人。"],
  ["3D_War/dse-wars/wars/ww1/somme/data.js",
    "Allied offensive on the Somme — over 20,000 British dead on day one.",
    "British dead on the first day were about 19,240; total British casualties were about 57,470."],
  ["3D_War/dse-wars/wars/ww1/somme/data.js",
    "英軍在索姆河發動大攻勢，首日陣亡逾兩萬。",
    "英軍在索姆河發動大攻勢。首日陣亡約19,240人，傷亡合計約57,470人，兩者不是同一個數字。"],
  ["3D_War/dse-wars/wars/ww1/somme/data.js",
    "British offensive opens — over 20,000 dead on day one.",
    "The British attack opens. About 19,240 were killed; total casualties were about 57,470."],
  ["3D_War/dse-wars/wars/ww1/somme/data.js",
    "協約國發動索姆河攻勢以分散凡爾登壓力；首日英軍傷亡創紀錄，坦克首次投入實戰。",
    "協約國發動索姆河攻勢以分散凡爾登壓力。1916年7月1日英軍陣亡約19,240人，死、傷、失蹤與被俘合計約57,470人。坦克在9月才首次投入這場攻勢。"],
  ["3D_War/dse-wars/wars/ww2-europe/el-alamein/data.js",
    "邱吉爾稱「不是終結，但或許是終結的開始」。",
    "邱吉爾1942年11月10日說：「這不是結束。甚至不是結束的開始。但這或許是開始的結束。」"],
  ["3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js",
    "二戰東線轉折點；德軍從此戰略防守，士氣與同盟信心逆轉。",
    "第六集團軍覆滅是東線轉折，德國與其盟友的信心受挫。1943年7月德軍仍發動堡壘行動，在庫爾斯克進攻。"],
  ["3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js",
    "蘇聯全民动员、寒冬與補給線優勢；德軍過度延伸、空運補給失敗。",
    "蘇聯全民動員、寒冬與補給線優勢；德軍過度延伸、空運補給失敗。"],
  ["3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js",
    "蘇軍從南北两翼包圍德軍，切斷第六集團軍退路。",
    "蘇軍從南北兩翼包圍德軍，切斷第六集團軍退路。"],
  ["3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js",
    `          "dateLabel": "1943年1月",
          "title_zh": "德軍投降",
          "title_en": "German Surrender",
          "narration_zh": "保盧斯率殘部投降，東線戰略逆轉。",
          "narration_en": "Paulus surrenders — the Eastern Front turns.",`,
    `          "dateLabel": "1943年2月2日",
          "title_zh": "第六集團軍投降",
          "title_en": "Sixth Army Surrenders",
          "narration_zh": "保盧斯殘部於2月2日投降。這是東線轉折，但1943年7月德軍仍在庫爾斯克發動堡壘行動。",
          "narration_en": "The last of the Sixth Army surrenders on 2 February. The front turns, but Germany still attacks at Kursk in July 1943.",`],
  ["3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
    "日本東條英機內閣遲遲決定投降；裕仁天皇終於「玉音放送」。",
    "東條內閣已於1944年7月總辭。1945年8月的首相是鈴木貫太郎。裕仁於8月15日廣播接受《波茨坦公告》。"],
  ["3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
    '"narration_zh": "原子彈在廣島上空引爆，約十四萬人喪生。"',
    '"narration_zh": "原子彈於上午8時15分在廣島上空引爆。當日死傷已極重；約十四萬是至1945年底的累計死難，包括其後死於燒傷與輻射的人，不是引爆瞬間的人數。當時首相是鈴木貫太郎。"'],
  ["3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
    '"narration_en": "\\"Little Boy\\" detonates — ~140,000 dead."',
    '"narration_en": "The bomb detonates at 8:15 a.m. Deaths that morning were already vast; about 140,000 is the toll by the end of 1945, not the instant of detonation. The prime minister was Suzuki Kantaro."'],
  ["3D_War/dse-wars/wars/mideast/war-1948/data.js",
    "以色列全民动员",
    "以色列全民動員"],
  ["3D_War/dse-wars/wars/korea/armistice/data.js",
    "志願軍彭德怀",
    "志願軍彭德懷"],
  ["3D_War/dse-wars/tools/battle-leaders.js",
    "邱吉爾稱「不是終結，但或許是終結的開始」。",
    "邱吉爾1942年11月10日說：「這不是結束。甚至不是結束的開始。但這或許是開始的結束。」"],
  ["3D_War/dse-wars/tools/battle-leaders.js",
    "日本東條英機內閣遲遲決定投降；裕仁天皇終於「玉音放送」。",
    "東條內閣已於1944年7月總辭。1945年8月的首相是鈴木貫太郎。裕仁於8月15日廣播接受《波茨坦公告》。"],
  ["3D_War/dse-wars/tools/battle-leaders.js",
    "志願軍彭德怀",
    "志願軍彭德懷"],
  ["3D_War/dse-wars/tools/battle-enrichment.js",
    "二戰東線轉折點；德軍從此戰略防守，士氣與同盟信心逆轉。",
    "第六集團軍覆滅是東線轉折。1943年7月德軍仍發動堡壘行動，在庫爾斯克進攻。"],
  ["3D_War/dse-wars/tools/battle-enrichment.js",
    'nz: "奧匈向塞爾維亞發出最後通牒，俄、德、法、英相繼動員。"',
    'nz: "奧匈發出最後通牒。俄國7月30日總動員，德、法隨之動員。英國在七月危機並未總動員。"'],
  ["3D_War/dse-wars/tools/battle-enrichment.js",
    'nz: "英軍在索姆河發動大攻勢，首日陣亡逾兩萬。"',
    'nz: "英軍發動索姆河攻勢。首日陣亡約19,240人，傷亡合計約57,470人。"'],
  ["3D_War/dse-wars/tools/battle-enrichment.js",
    'ne: "British offensive opens — over 20,000 dead on day one."',
    'ne: "About 19,240 British dead and about 57,470 total British casualties on the first day."'],
  ["3D_War/dse-wars/tools/battle-enrichment.js",
    'nz: "原子彈在廣島上空引爆，約十四萬人喪生。"',
    'nz: "原子彈在廣島上空引爆。約十四萬是至1945年底的累計死難，不是引爆瞬間的人數。"'],
  ["3D_War/dse-wars/tools/battle-catalog-rest.js",
    'narration_zh: "「小男孩」投下，約十四萬人喪生，開啟核時代。"',
    'narration_zh: "「小男孩」投下。約十四萬是至1945年底的累計死難，不是引爆瞬間的人數。"'],
  ["3D_War/dse-wars/tools/scaffold-battles.js",
    'narration_zh: center.outro_zh || "本戰役為 DSE 西史重要考點。"',
    'narration_zh: center.outro_zh || "看過路線之後，用史料題判斷原因或立場。"'],
  ["3D_War/dse-wars/tools/scaffold-battles.js",
    'narr_zh: "協約國發動索姆河攻勢，首日陣亡逾兩萬人。"',
    'narr_zh: "英軍發動索姆河攻勢。首日陣亡約19,240人，傷亡合計約57,470人。"']
];

for (const [rel, from, to] of reps) rep(rel, from, to);

function walk(dir, out) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (name === "lib" || name === "node_modules") continue;
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (/\.(js|html)$/.test(name) && name !== "apply-history-fix.js" && name !== "lesson-kit.fragment.js") out.push(p);
  }
}
const files = [];
walk(ROOT, files);
for (const p of files) {
  let s = fs.readFileSync(p, "utf8");
  const n = s;
  s = s.replace(/安zac 灣/g, "安扎克灣").replace(/安zac 遠征軍/g, "澳紐軍團").replace(/安zac 登陸/g, "安扎克灣登陸").replace(/安zac/g, "安扎克");
  s = s.replace(/鄂團曼/g, "鄂圖曼");
  s = s.replace(/焦土作戰/g, "聚焦行動");
  s = s.replace(/全民动员/g, "全民動員");
  s = s.replace(/南北两翼/g, "南北兩翼");
  s = s.replace(/彭德怀/g, "彭德懷");
  s = s.replace(/发电机行動/g, "發電機行動");
  s = s.replace(/DSE 西史小戰役地圖。/g, "課題地圖。兵力與路線為示意。");
  s = s.replace(/小戰役/g, "課題");
  if (s !== n) fs.writeFileSync(p, s);
}

rep("3D_War/dse-wars/wars/ww1/gallipoli/data.js",
  "英海軍部丘吉爾推動海峽遠征；鄂圖曼凱末爾（後稱阿塔圖爾克）在安扎克灣頑抗成名。",
  "英海軍部丘吉爾推動海峽遠征。海軍於1915年3月18日失敗，登陸是4月25日。凱末爾（後稱阿塔圖爾克）在安扎克灣組織反擊。");

rep("3D_War/dse-wars/wars/mideast/six-day/data.js",
  '"narration_zh": "以軍空軍先發制人，摧毀埃及等國機場上戰機。"',
  '"narration_zh": "以軍空軍發動「聚焦行動」（Operation Focus），先發制人摧毀埃及等國機場上的戰機。"');
rep("3D_War/dse-wars/wars/mideast/six-day/data.js",
  '"narration_en": "Israeli Air Force destroys Arab aircraft on the ground."',
  '"narration_en": "Operation Focus: the Israeli Air Force destroys Arab aircraft on the ground."');

const golanOld = `          "dateLabel": "1967年6月7日",
          "title_zh": "戈蘭高地",
          "title_en": "Golan Heights",
          "narration_zh": "以軍攻占敘利亞戈蘭高地。",
          "narration_en": "Israel captures the Syrian Golan Heights.",`;
const golanNew = `          "dateLabel": "1967年6月9–10日",
          "title_zh": "戈蘭高地",
          "title_en": "Golan Heights",
          "narration_zh": "戈蘭攻勢在6月9日開始，6月10日這一線的戰鬥結束。",
          "narration_en": "The Golan offensive begins on 9 June and that front is decided on 10 June.",`;
const jeruOld = `          "dateLabel": "1967年6月7–10日",
          "title_zh": "耶路撒冷與西岸",
          "title_en": "Jerusalem & West Bank",
          "narration_zh": "以軍占領東耶路撒冷及約旦河西岸。",
          "narration_en": "East Jerusalem and the West Bank fall to Israel.",`;
const jeruNew = `          "dateLabel": "1967年6月7日",
          "title_zh": "耶路撒冷與西岸",
          "title_en": "Jerusalem & West Bank",
          "narration_zh": "約旦戰線在6月7日見分曉，以軍進入耶路撒冷舊城。",
          "narration_en": "The Jordanian front is decided on 7 June, when Israeli troops enter the Old City.",`;
rep("3D_War/dse-wars/wars/mideast/six-day/data.js", golanOld, "@@GOLAN@@");
rep("3D_War/dse-wars/wars/mideast/six-day/data.js", jeruOld, golanNew);
rep("3D_War/dse-wars/wars/mideast/six-day/data.js", "@@GOLAN@@", jeruNew);
rep("3D_War/dse-wars/wars/mideast/six-day/data.js",
`      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.75,
              "lat": 33.05,`,
`      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.21,
              "lat": 31.77,`);
rep("3D_War/dse-wars/wars/mideast/six-day/data.js",
`      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 35.21,
              "lat": 31.77,`,
`      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 35.75,
              "lat": 33.05,`);
rep("3D_War/dse-wars/wars/mideast/six-day/data.js",
`          "minLng": 32.75,
          "maxLng": 36.25,
          "minLat": 30,
          "maxLat": 33,
          "Z": 9`,
`          "minLng": 32.4,
          "maxLng": 36.4,
          "minLat": 29.15,
          "maxLat": 33.45,
          "Z": 8`);

rep("3D_War/dse-wars/wars/korea/invasion/data.js",
  'css: "#8b0000", label_zh: "北韓／志願軍", label_en: "North Korea / PVA"',
  'css: "#8b0000", label_zh: "北韓人民軍", label_en: "Korean People\'s Army"');
rep("3D_War/dse-wars/wars/korea/inchon/data.js",
  'css: "#8b0000", label_zh: "北韓／志願軍", label_en: "North Korea / PVA"',
  'css: "#8b0000", label_zh: "北韓人民軍", label_en: "Korean People\'s Army"');
rep("3D_War/dse-wars/wars/korea/invasion/data.js",
  "斯大林、毛澤東後期介入，使戰爭國際化。",
  "中國人民志願軍要到1950年10月才入朝。6月南下的是北韓人民軍。");
rep("3D_War/dse-wars/wars/korea/invasion/data.js",
`          "minLng": 125.75,
          "maxLng": 129.25,
          "minLat": 36,
          "maxLat": 39,
          "Z": 9`,
`          "minLng": 125.35,
          "maxLng": 129.55,
          "minLat": 34.8,
          "maxLat": 38.85,
          "Z": 8`);
rep("3D_War/dse-wars/wars/korea/invasion/data.js",
`              "name_zh": "漢城",
              "type": "city",
              "lng": 126.98,
              "lat": 37.57
          },`,
`              "name_zh": "漢城",
              "type": "city",
              "lng": 126.98,
              "lat": 37.57
          },
          {
              "name_en": "Munsan",
              "name_zh": "汶山",
              "type": "town",
              "lng": 126.79,
              "lat": 37.85
          },
          {
              "name_en": "Daegu",
              "name_zh": "大邱",
              "type": "city",
              "lng": 128.6,
              "lat": 35.87
          },`);

rep("3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
`          "minLng": 130.71,
          "maxLng": 134.21,
          "minLat": 33.14,
          "maxLat": 35.64,
          "Z": 9`,
`          "minLng": 129.45,
          "maxLng": 133.35,
          "minLat": 32.35,
          "maxLat": 34.95,
          "Z": 8`);
rep("3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
`          {
              "name_en": "Tokyo",
              "name_zh": "東京",
              "type": "city",
              "lng": 139.69,
              "lat": 35.69
          },`,
  "");
rep("3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
`              "lng": 139.69,
              "lat": 35.69,`,
`              "lng": 132.46,
              "lat": 34.39,`);
rep("3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js",
  '"narration_zh": "天皇宣布接受《波茨坦公告》，戰爭結束。"',
  '"narration_zh": "8月15日，天皇在東京廣播接受《波茨坦公告》。本圖只覆蓋廣島與長崎；當時的首相是鈴木貫太郎，不是東條。"');

rep("3D_War/ru-ua-war/data.js",
  'narr_zh:"2022年2月24日起 · 全面入侵與四年抵抗"',
  'narr_zh:"全面入侵始於2022年2月24日。至2026年6月為第五年"');
rep("3D_War/ru-ua-war/data.js",
  'narr_en:"Full-scale invasion · four years of resistance"',
  'narr_en:"Full-scale invasion from 24 February 2022 · fifth year by June 2026"');
rep("3D_War/ru-ua-war/data.js",
  'title_zh:"戰爭第四年", title_en:"The Fourth Year of War"',
  'title_zh:"戰爭第五年", title_en:"The Fifth Year of War"');
rep("3D_War/ru-ua-war/data.js",
  'narration_zh:"戰爭進入第四年。烏克蘭仍堅守，但代價巨大；和平尚遠。"',
  'narration_zh:"全面入侵始於2022年2月24日。至2026年6月已進入第五年。烏克蘭仍在作戰，傷亡與破壞持續。"');
rep("3D_War/ru-ua-war/data.js",
  'narration_en:"The war enters its fourth year. Ukraine endures — at enormous cost — and peace remains distant."',
  'narration_en:"The full-scale invasion began on 24 February 2022. By June 2026 the war is in its fifth year."');

function T(cite, excerpt, ask, rows) {
  return {
    cite, excerpt, ask,
    options: rows.map(([t, ok, why]) => ({ t, ok, why }))
  };
}
const TASKS = {
  "3D_War/dse-wars/wars/ww1/sarajevo/data.js": T(
    "加夫里洛·普林西普在受審時的說法，1914年",
    "普林西普說，他開槍是為了南斯拉夫的統一，針對的是奧匈的統治。",
    "這句話顯示他站在哪一方？",
    [
      ["他代表協約國政府執行暗殺。", false, "1914年6月協約國政府沒有派他。他屬於青年波斯尼亞，不是協約國的人。"],
      ["他以塞族民族主義者的立場，反對奧匈對波斯尼亞的統治。", true, "受審時他把動機說成民族統一。奧匈皇儲一方是奧匈帝國，後來與德國同屬同盟國；普林西普本人不是同盟國。"],
      ["他是同盟國派來製造開戰藉口的人。", false, "同盟國是奧匈與德國這一邊。把刺客標成同盟國，會把加害者與被害者的國家歸錯。"]
    ]),
  "3D_War/dse-wars/wars/ww1/tannenberg/data.js": T(
    "東線德軍在坦能堡之後的戰報，1914年8月",
    "德軍戰報強調：俄軍兩路沒有協同，而且無線電令被截收。",
    "若用這份戰報解釋德軍得勝的原因，哪一項是它實際指出的？",
    [
      ["德軍兵力從一開始就遠多於兩路俄軍的總和。", false, "坦能堡的重點是薩姆索諾夫與連年坎普夫兩路被分割，不是德軍人數占絕對優勢。"],
      ["俄軍兩路脫節，德軍又掌握了他們的調動。", true, "戰報把原因放在協同失敗與通訊被截，而不是單一句「德軍較強」。"],
      ["西線已經在8月結束，所以東線可以隨意用兵。", false, "馬恩河戰役在9月。8月的德國仍要同時應付西線。"]
    ]),
  "3D_War/dse-wars/wars/ww1/marne/data.js": T(
    "霞飛在馬恩河反擊前的命令要旨，1914年9月",
    "命令要求法軍就地轉為反攻，不得再向南撤。",
    "這道命令的立場是什麼？",
    [
      ["承認巴黎不守，把戰場移到盧瓦爾河。", false, "命令是停止南撤並反攻，不是放棄巴黎。"],
      ["把撤退終止，改為反攻。", true, "它說明法軍統帥此時的決定：利用德軍右翼的空隙，在馬恩河轉向。"],
      ["宣布西線將在一週內以塹壕結束戰爭。", false, "塹壕僵持是反擊之後的結果，不是這道命令預先宣布的結局。"]
    ]),
  "3D_War/dse-wars/wars/ww1/gallipoli/data.js": T(
    "協約國海軍在達達尼爾海峽失利後的報告，1915年3月",
    "報告寫明艦隊在海峽觸雷，岸炮仍在，強航被停止。",
    "這份報告把海軍失敗放在哪一天的行動？",
    [
      ["4月25日澳紐軍團登陸的同一天。", false, "4月25日是登陸。海軍強航失敗是3月18日。"],
      ["3月18日的海峽強航。", true, "報告說的是艦隊無法通過海峽。登陸是五週之後的另一件事。"],
      ["1916年1月撤出半島的決定。", false, "撤退是遠征失敗之後的結束，不是海軍報告所記的那一天。"]
    ]),
  "3D_War/dse-wars/wars/ww1/verdun/data.js": T(
    "貝當守凡爾登時的口號，1916年",
    "「他們將不會通過。」",
    "這句話顯示法軍指揮的立場是什麼？",
    [
      ["準備放棄默茲河東岸，縮短防線。", false, "口號要求守住，不是撤退。"],
      ["以守住要塞為優先，接受長期消耗。", true, "它說明法軍把威爾登當作不可失的象徵，雙方因而在同一地帶持續對耗。"],
      ["宣布德國已在2月被趕出要塞。", false, "2月德軍曾經突入。口號是堅持，不是宣布戰役已經結束。"]
    ]),
  "3D_War/dse-wars/wars/ww1/somme/data.js": T(
    "英軍官方對1916年7月1日損失的統計",
    "陣亡約19,240人；死、傷、失蹤與被俘合計約57,470人。",
    "哪一種說法對得上這組數字？",
    [
      ["首日陣亡逾二萬，所以傷亡合計也就是二萬多人。", false, "陣亡是死亡。傷亡合計把傷者、失蹤與被俘都算進去，約57,470。"],
      ["首日英軍陣亡約19,240人，傷亡合計約57,470人。", true, "兩個數字都要保留，不能用其中一個代替另一個。"],
      ["57,470人全部在7月1日陣亡。", false, "57,470是傷亡合計，不是陣亡人數。"]
    ]),
  "3D_War/dse-wars/wars/ww2-europe/poland/data.js": T(
    "希特勒於1939年9月1日對德國國會的講話",
    "他把當日的軍事行動說成是對波蘭攻擊的回應。",
    "這段講話的立場是什麼？",
    [
      ["承認德軍在拂曉入侵波蘭。", false, "講話把責任推給對方，沒有把自己說成入侵的一方。"],
      ["把進攻說成自衛。", true, "用詞是回應，不是承認自己開啟戰爭。對照的事實是德軍於9月1日攻入波蘭。"],
      ["宣布與蘇聯同時進兵，並已分好波蘭。", false, "蘇聯紅軍是9月17日才從東面進入。9月1日的講話沒有把這件事說成當日的行動。"]
    ]),
  "3D_War/dse-wars/wars/ww2-europe/dunkirk/data.js": T(
    "邱吉爾在下院的演說，1940年6月4日",
    "他說英國將在海灘、上陸地點、田野和街上繼續作戰，絕不投降。",
    "把這段話放在敦克爾克撤退剛結束時，它的立場是什麼？",
    [
      ["宣布敦克爾克是一場已經打贏的決戰。", false, "撤退保住了約33萬8千人，重裝備留在灘上。演說要說的是戰爭還要打下去。"],
      ["撤退之後仍拒絕求和，準備在本土繼續打。", true, "立場是不投降。它沒有把撤出海灘說成擊敗德軍。"],
      ["要求立即與德國停戰，以換回被俘士兵。", false, "演說的結論是繼續作戰。"]
    ]),
  "3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js": T(
    "德軍第六集團軍投降與之後的戰局，1943年",
    "第六集團軍於1943年2月2日停止抵抗。同年7月5日，德軍在庫爾斯克發動堡壘行動。",
    "哪一項判斷對得上這兩個日期？",
    [
      ["2月之後德軍在東線只剩防守，沒有再發動大規模進攻。", false, "堡壘行動是1943年7月的進攻。不能把斯大林格勒投降寫成德軍自此只有防守。"],
      ["斯大林格勒是轉折，但德軍在1943年夏天仍能組織進攻。", true, "第六集團軍覆滅改變了力量對比；庫爾斯克說明進攻尚未結束。"],
      ["堡壘行動發生在第六集團軍投降之前。", false, "投降在2月，堡壘行動在7月。"]
    ]),
  "3D_War/dse-wars/wars/ww2-europe/el-alamein/data.js": T(
    "邱吉爾在倫敦市長午宴的演說，1942年11月10日",
    "「這不是結束。甚至不是結束的開始。但這或許是開始的結束。」",
    "他怎樣給第二次阿拉曼定位？",
    [
      ["這或許已是結束的開始。", false, "他否定的正是「結束的開始」。引反了就會把一場北非轉折說成戰爭即將完結。"],
      ["這不是結束，甚至不是結束的開始，而或許是開始的結束。", true, "北非軸心軍此後西撤，但德國仍在東線與歐洲其他戰場作戰。"],
      ["他宣布德國會在1942年內投降。", false, "演說把阿拉曼放在一場長期戰爭的前段之後，不是宣布當年結束。"]
    ]),
  "3D_War/dse-wars/wars/ww2-europe/normandy/data.js": T(
    "艾森豪威爾於1944年6月6日給盟軍的當日命令",
    "他稱這次登陸是進入歐洲大陸的十字軍，目標是摧毀德軍、消除納粹對西歐的統治。",
    "這道命令的立場是什麼？",
    [
      ["只求在灘頭停住，不打算向內陸前進。", false, "命令把登陸寫成進入大陸，不是停在沙灘。"],
      ["登陸是為了在西歐對德國再開地面戰場。", true, "1944年6月的西線因此不再只是空戰與海上封鎖。"],
      ["宣布德國已在6月6日投降。", false, "德國投降是1945年5月。6月6日只是建立灘頭。"]
    ]),
  "3D_War/dse-wars/wars/ww2-europe/berlin/data.js": T(
    "德國於1945年5月8日簽署的投降書",
    "文本要求德軍向盟軍無條件投降。",
    "這份文件說明的是什麼？",
    [
      ["柏林巷戰仍可按德軍的條件停火。", false, "文本寫的是無條件投降，不是討價還價。"],
      ["德國武裝力量結束有組織的抵抗。", true, "5月8日是歐洲戰場德國投降的日期。希特勒已在4月30日死去。"],
      ["同盟國同意讓納粹黨繼續執政。", false, "無條件投降之後，納粹政府沒有保留。"]
    ]),
  "3D_War/dse-wars/wars/ww2-pacific/philippines/data.js": T(
    "麥克阿瑟離開菲律賓時的聲明，1942年3月",
    "他說：「我還會回來。」",
    "這句話的立場是什麼？",
    [
      ["宣布巴丹守軍已經獲救。", false, "巴丹在1942年4月投降，死亡行軍發生在這句話之後。"],
      ["把當下的撤退說成暫時的，並承諾重返。", true, "立場是不承認菲律賓戰役就此結束。重返是1944年至1945年的事。"],
      ["承認日本可以永久占有菲律賓。", false, "句子的方向是回來，不是承認占領合法。"]
    ]),
  "3D_War/dse-wars/wars/ww2-pacific/midway/data.js": T(
    "美軍在中途島海戰前的情報判斷，1942年5月",
    "破譯的電文顯示日本下一目標的代號指向中途島。",
    "這份情報用來說明什麼原因？",
    [
      ["日本公開宣布將於6月4日進攻中途島。", false, "日本沒有公開日期。美軍是從密碼判斷方向。"],
      ["美軍能夠預先部署航母，是因為知道攻擊方向。", true, "中途島的結果和事前判斷目標有關，不單是當日偶然相遇。"],
      ["情報證明日本只派出一艘航母。", false, "南雲機動部隊有赤城、加賀、蒼龍、飛龍四艘航母。"]
    ]),
  "3D_War/dse-wars/wars/ww2-pacific/guadalcanal/data.js": T(
    "美軍陸戰隊於1942年8月占领亨德森機場後的任務說明",
    "說明把守住機場寫成這座島的目的。",
    "指揮部當時的立場是什麼？",
    [
      ["登島只為報復，不需要跑道。", false, "文件把機場當作必須守住的東西。"],
      ["控制跑道，才能讓飛機留在所羅門群島。", true, "其後數月的陸地戰鬥與夜戰，都圍繞這條跑道。"],
      ["宣布日軍已在8月7日撤出瓜島。", false, "日軍撤出是1943年2月。"]
    ]),
  "3D_War/dse-wars/wars/ww2-pacific/iwo-jima/data.js": T(
    "美軍規定硫磺島戰役目標的命令，1945年2月",
    "命令要求奪取島上的機場，供轟炸日本的飛機緊急降落。",
    "這道命令把奪島的原因說成什麼？",
    [
      ["為了在島上駐紮一百萬陸軍進攻東京。", false, "硫磺島是火山小島，命令要的是機場。"],
      ["取得靠近日本本土的緊急降落場。", true, "傷亡很大，是為這條跑道付出的。"],
      ["用佔領證明日本已經投降。", false, "日本投降在1945年8月，硫磺島戰役在2月至3月。"]
    ]),
  "3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js": T(
    "廣島市對1945年死難人數的統計說明",
    "約十四萬人死於1945年年底之前，當中包括引爆之後才死於燒傷與輻射的人。",
    "這個數字應當怎樣用？",
    [
      ["把它寫成8月6日上午8時15分引爆瞬間的死亡人數。", false, "引爆當日已經有大量死亡，但十四萬是累計到年底的數字。"],
      ["把它寫成至1945年底的累計死難，並註明當時首相是鈴木貫太郎。", true, "東條內閣在1944年7月已經總辭。8月的內閣是鈴木貫太郎。"],
      ["把它只計算軍人，不包括廣島市民。", false, "死難者大多數是市民，不是單一支部隊的戰鬥傷亡。"]
    ]),
  "3D_War/dse-wars/wars/korea/invasion/data.js": T(
    "聯合國安理會1950年6月25日與27日的決議",
    "決議指稱北韓武裝攻擊大韓民國，並建議會員國協助擊退這次攻擊。",
    "6月的決議針對誰？",
    [
      ["已經入朝的中國人民志願軍。", false, "志願軍在1950年10月才渡鴨綠江。6月的圖例不能寫志願軍。"],
      ["越過三八線的北韓人民軍。", true, "6月25日開始的是北韓南侵。汶山在開城方向，釜山是南端的橋頭堡，兩地都應在圖內。"],
      ["蘇聯紅軍越過三八線。", false, "蘇聯沒有在6月派地面部隊越過三八線。蘇聯當時缺席安理會。"]
    ]),
  "3D_War/dse-wars/wars/korea/inchon/data.js": T(
    "麥克阿瑟為仁川登陸下達的任務，1950年9月",
    "任務是在仁川上陸，切斷南下人民軍的後路，並奪回漢城。",
    "這次登陸的時候，中國人民志願軍在哪裡？",
    [
      ["已經在漢城與美軍巷戰。", false, "仁川是9月15日。志願軍10月才入朝。"],
      ["尚未入朝。圖例應是北韓人民軍對聯合國軍。", true, "9月的對手仍是北韓人民軍。"],
      ["已在板門店簽署停戰。", false, "停戰是1953年7月27日。"]
    ]),
  "3D_War/dse-wars/wars/korea/chosin/data.js": T(
    "美軍陸戰一師師長史密斯對「撤退」一詞的回應，1950年12月",
    "他把部隊向興南移動說成是換一個方向進攻，而不是承認被擊潰。",
    "這句話的立場是什麼？",
    [
      ["承認陸戰隊在長津湖全軍覆沒。", false, "部隊突圍到了興南，損失很重，但不是全軍覆沒。"],
      ["在被志願軍分割包圍時，仍把行動說成有組織的突圍。", true, "志願軍第9兵團在1950年11月下旬圍攻。史密斯的用詞是指揮部的立場，傷亡則是另一組事實。"],
      ["宣布中國沒有參戰。", false, "長津湖的對手是1950年10月入朝的志願軍。"]
    ]),
  "3D_War/dse-wars/wars/korea/armistice/data.js": T(
    "《朝鮮停戰協定》簽署時的文本性質，1953年7月27日",
    "協定停止軍事行動，並設立非軍事區。它沒有寫成和平條約。",
    "哪一項判斷符合這份文件？",
    [
      ["簽署之後朝鮮半島已經以和平條約統一。", false, "協定停的是戰鬥。南北仍是兩個政府，和平條約沒有簽。"],
      ["戰鬥停止，但政治分裂沒有因此結束。", true, "彭德懷、金日成與克拉克在協定上代表交戰各方。李承晚反對停戰，南韓不是簽字的一方。"],
      ["協定規定志願軍繼續向釜山進攻。", false, "協定是停火，不是新的進攻命令。"]
    ]),
  "3D_War/dse-wars/wars/mideast/war-1948/data.js": T(
    "聯合國大會第181號決議與以色列宣告建國，1947–1948年",
    "決議建議分治。1948年5月14日本-古里安宣告建國，鄰國軍隊隨即進入。",
    "戰爭在5月開始的直接原因，文件指向什麼？",
    [
      ["六日戰爭的戈蘭攻勢。", false, "戈蘭攻勢是1967年6月9日至10日。"],
      ["分治建議、建國宣告，以及阿拉伯國家拒絕這個結果並出兵。", true, "1948年的戰爭由這一連串決定接上，不是由1967年的空襲引起。"],
      ["奧斯陸協議失敗。", false, "奧斯陸原則宣言是1993年。"]
    ]),
  "3D_War/dse-wars/wars/mideast/six-day/data.js": T(
    "以色列參謀本部對1967年6月5日空襲的行動名稱",
    "行動的英文名稱是 Operation Focus，希伯來語意指集中打擊機場上的飛機。",
    "這個名稱應當怎樣理解？",
    [
      ["焦土政策，把西奈的土地燒光。", false, "Focus 指集中打擊停在地面的空軍，不是焦土。"],
      ["先發制人的空中打擊，目標是阿拉伯國家的機場。", true, "空襲在6月5日。戈蘭攻勢是6月9日至10日，耶路撒冷舊城是6月7日。"],
      ["6月7日進攻戈蘭的地面作戰。", false, "6月7日以軍進入耶路撒冷舊城。戈蘭是6月9日才開始。"]
    ]),
  "3D_War/dse-wars/wars/mideast/yom-kippur/data.js": T(
    "薩達特在1973年戰爭前後的公開目標",
    "他把跨越運河說成打破1967年以來「不能打」的局面，以迫使以色列談判。",
    "這段話的立場是什麼？",
    [
      ["埃及只求在一天之內消滅以色列。", false, "跨運河的計劃是有限度的橋頭堡，不是當日攻入特拉維夫。"],
      ["用一場有限度的戰爭改變談判地位。", true, "10月6日的進攻打破了1967年之後的停滯。以軍後來渡過運河，戰局又再轉。"],
      ["敘利亞沒有參加這場戰爭。", false, "敘利亞在同一天進攻戈蘭。"]
    ]),
  "3D_War/dse-wars/wars/mideast/gaza-intifada/data.js": T(
    "1987年12月加沙事件的新聞記載",
    "一輛以色列車輛在加沙地帶撞死巴勒斯坦工人之後，喪禮變成大範圍抗議。",
    "第一次因提法達的直接起因，這則記載指向什麼？",
    [
      ["1967年6月7日的戈蘭攻勢。", false, "那是二十年以前的另一場戰爭。"],
      ["1987年12月這次傷亡之後，抗議擴及佔領區。", true, "起義有更長的占領背景，但記載裡的直接起因是這次事件。"],
      ["1993年奧斯陸協議剛剛簽署。", false, "奧斯陸在1993年。它是起義后期的外交結果，不是1987年的起點。"]
    ]),
  "3D_War/dse-wars/wars/balkans/vukovar/data.js": T(
    "克羅地亞守軍在武科瓦爾陷落前的呼叫，1991年11月",
    "呼叫說城市已被炮毀，守軍沒有彈藥。",
    "這則呼叫說明的原因是什麼？",
    [
      ["守軍主動放棄一座完好的城市。", false, "呼叫把陷落和炮擊、彈藥耗盡連在一起。"],
      ["圍城中的炮擊與補給斷絕，使防守無法繼續。", true, "武科瓦爾在1991年11月陷落。這是圍城的結果，不是一日決戰。"],
      ["北約已在1991年炸毀貝爾格萊德。", false, "北約對塞爾維亞的空襲是1999年科索沃戰爭。"]
    ]),
  "3D_War/dse-wars/wars/balkans/sarajevo/data.js": T(
    "聯合國人員對薩拉熱窩圍城的觀察，1992–1995年",
    "觀察記錄市民在狙击與炮擊下出入取水。",
    "這些記錄顯示圍城的哪一種情況？",
    [
      ["戰鬥只發生在前線軍營，市民生活不受影響。", false, "記錄寫的是市民取水也暴露在火力下。"],
      ["圍城把城市居民變成持續的目標。", true, "圍城從1992年4月延續到1996年2月，不是單日戰役。"],
      ["薩拉熱窩在1992年6月28日因皇儲遇刺被圍。", false, "1914年的暗殺是另一件事。這次圍城屬於1992年開始的波黑戰爭。"]
    ]),
  "3D_War/dse-wars/wars/balkans/srebrenica/data.js": T(
    "前南斯拉夫問題國際法庭對斯雷布雷尼察的判決要旨",
    "判決認定，1995年7月被俘的波斯尼亞穆斯林男子與男童遭有組織處決。",
    "這份判決把死亡歸成哪一類？",
    [
      ["兩軍對陣時的普通戰場傷亡。", false, "判決寫的是安全區陷落之後，被分離的男子與男童遭處決。"],
      ["對已經被控制的平民與戰俘的屠殺。", true, "逾八千人被殺。這是法庭所稱的種族滅絕罪行，不能叫作一場小戰役。"],
      ["荷蘭維和部隊主動執行的處決。", false, "判決指向的是波斯尼亞塞族軍隊。維和部隊沒有阻止進入安全區，這是失職，不是判決裡的行刑者。"]
    ]),
  "3D_War/dse-wars/wars/balkans/kosovo/data.js": T(
    "北約在1999年3月開始空襲時的聲明",
    "聲明說空襲是為了停止對科索沃阿爾巴尼亞人的驅逐。安理會沒有通過授權使用武力的決議。",
    "這則聲明的立場，和程序上的事實，應當怎樣一併看？",
    [
      ["聲明等於安理會已經授權。", false, "授權決議沒有通過。聲明是北約自己的理由。"],
      ["北約提出的理由是制止驅逐；使用武力沒有安理會決議。", true, "兩件事都要留在答案裡：一個是聲明的立場，一個是表決沒有授權。"],
      ["空襲的對象是1941年的德軍。", false, "1999年的對象是塞爾維亞軍警與相關目標。"]
    ]),
  "3D_War/ru-ua-war/data.js": T(
    "俄羅斯總統2022年2月24日的電視講話",
    "他把當日開始的軍事行動稱作「特別軍事行動」。",
    "對照同日北、東、南同時進攻，這句用詞的立場是什麼？2026年6月又是第幾年？",
    [
      ["用詞承認這是對全國的全面入侵，而且2026年6月仍是第四年。", false, "「特別軍事行動」把範圍說小。全面入侵始於2022年2月24日，到2026年6月已是第五年。"],
      ["用詞把戰爭說成有限度行動；地圖上的多軸進攻是全面入侵。2026年6月是第五年。", true, "由2022年2月24日計到2023年2月是第一年結束。2026年2月24日進入第五年，6月仍在第五年。"],
      ["戰爭在2024年2月才開始，所以2026年6月是第三年。", false, "全面入侵的日期是2022年2月24日。"]
    ])
};

const OUTROS = {
  "3D_War/dse-wars/wars/ww1/sarajevo/data.js": ["1914年6月28日的槍擊是導火線。英國在七月危機沒有總動員。", "The 28 June shots were the spark. Britain did not mobilise during the July Crisis."],
  "3D_War/dse-wars/wars/ww1/tannenberg/data.js": ["1914年8月，俄軍兩個集團軍在東普魯士被分割。", "In August 1914 two Russian armies were divided in East Prussia."],
  "3D_War/dse-wars/wars/ww1/marne/data.js": ["1914年9月的反擊之後，西線轉入塹壕，速決沒有實現。", "After the September 1914 counter-attack the Western Front dug in."],
  "3D_War/dse-wars/wars/ww1/gallipoli/data.js": ["海軍強航在1915年3月18日失敗，登陸是4月25日，撤出在1916年1月。", "The naval attack failed on 18 March 1915. Landings were 25 April. Evacuation was January 1916."],
  "3D_War/dse-wars/wars/ww1/verdun/data.js": ["1916年2月至12月，法軍守住要塞，雙方都在同一地帶長期對耗。", "From February to December 1916 France held the fortress while both sides bled."],
  "3D_War/dse-wars/wars/ww1/somme/data.js": ["7月1日英軍陣亡約19,240人，傷亡合計約57,470人。", "On 1 July about 19,240 British soldiers were killed; total casualties were about 57,470."],
  "3D_War/dse-wars/wars/ww2-europe/poland/data.js": ["1939年9月1日德軍入侵波蘭，歐洲的第二次世界大戰由此打開。", "Germany invaded Poland on 1 September 1939."],
  "3D_War/dse-wars/wars/ww2-europe/dunkirk/data.js": ["1940年5月26日至6月4日約33萬8千人撤出，重裝備留在大陸。", "About 338,000 were evacuated from 26 May to 4 June 1940. Heavy equipment stayed behind."],
  "3D_War/dse-wars/wars/ww2-europe/stalingrad/data.js": ["第六集團軍於1943年2月2日投降。1943年7月德軍仍發動堡壘行動。", "The Sixth Army surrendered on 2 February 1943. Germany still launched Operation Citadel in July."],
  "3D_War/dse-wars/wars/ww2-europe/el-alamein/data.js": ["邱吉爾說這或許是開始的結束，不是結束的開始。", "Churchill called it, perhaps, the end of the beginning — not the beginning of the end."],
  "3D_War/dse-wars/wars/ww2-europe/normandy/data.js": ["1944年6月6日盟軍在諾曼第建立灘頭。", "On 6 June 1944 the Allies secured a lodgement in Normandy."],
  "3D_War/dse-wars/wars/ww2-europe/berlin/data.js": ["蘇軍1945年4月攻入柏林。德國於5月8日投降。", "The Red Army took Berlin in April 1945. Germany surrendered on 8 May."],
  "3D_War/dse-wars/wars/ww2-pacific/philippines/data.js": ["巴丹守軍於1942年4月投降，死亡行軍發生在投降之後。", "Bataan surrendered in April 1942. The death march followed the surrender."],
  "3D_War/dse-wars/wars/ww2-pacific/midway/data.js": ["1942年6月，日本在中途島損失四艘航母。", "In June 1942 Japan lost four carriers at Midway."],
  "3D_War/dse-wars/wars/ww2-pacific/guadalcanal/data.js": ["1942年8月至1943年2月，雙方爭奪亨德森機場，日軍最後撤出。", "From August 1942 to February 1943 the fight was for Henderson Field. Japan then withdrew."],
  "3D_War/dse-wars/wars/ww2-pacific/iwo-jima/data.js": ["1945年2月至3月，美軍為島上機場付出逾二萬傷亡。", "From February to March 1945 the United States took the airfields at a cost of more than 20,000 casualties."],
  "3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js": ["1945年8月的首相是鈴木貫太郎。廣島約十四萬死難是至年底的累計。", "The prime minister in August 1945 was Suzuki Kantaro. Hiroshima's toll of about 140,000 is the count by the end of 1945."],
  "3D_War/dse-wars/wars/korea/invasion/data.js": ["1950年6月南下的是北韓人民軍。志願軍10月才入朝。汶山與釜山都在這張圖上。", "In June 1950 the army moving south was the KPA. Chinese volunteers entered in October. Munsan and Pusan are both on this map."],
  "3D_War/dse-wars/wars/korea/inchon/data.js": ["1950年9月15日的登陸，發生在志願軍入朝之前。", "The 15 September 1950 landing came before Chinese volunteers entered the war."],
  "3D_War/dse-wars/wars/korea/chosin/data.js": ["1950年11月，志願軍第9兵團在長津湖圍攻美軍陸戰一師。", "In November 1950 the PVA 9th Army attacked the US 1st Marine Division at the Chosin Reservoir."],
  "3D_War/dse-wars/wars/korea/armistice/data.js": ["1953年7月27日簽署的是停戰協定，不是和平條約。", "The 27 July 1953 document is an armistice, not a peace treaty."],
  "3D_War/dse-wars/wars/mideast/war-1948/data.js": ["1948年5月宣告建國之後，阿拉伯國家軍隊分路進入。1949年的停火線後來被稱作綠線。", "After the May 1948 declaration, Arab armies entered. The 1949 ceasefire lines became the Green Line."],
  "3D_War/dse-wars/wars/mideast/six-day/data.js": ["聚焦行動在6月5日。耶路撒冷舊城在6月7日。戈蘭攻勢是6月9日至10日。", "Operation Focus was 5 June. The Old City fell on 7 June. The Golan offensive was 9–10 June."],
  "3D_War/dse-wars/wars/mideast/yom-kippur/data.js": ["1973年10月6日埃及與敘利亞同時進攻。以軍後來渡過運河。", "Egypt and Syria attacked together on 6 October 1973. Israel later crossed the Canal."],
  "3D_War/dse-wars/wars/mideast/gaza-intifada/data.js": ["1987年12月加沙的傷亡之後，抗議擴及佔領區。1993年才有奧斯陸原則宣言。", "Protests spread after the December 1987 deaths in Gaza. The Oslo Declaration of Principles came in 1993."],
  "3D_War/dse-wars/wars/balkans/vukovar/data.js": ["武科瓦爾在1991年被圍約三個月後陷落。", "Vukovar fell in 1991 after a siege of about three months."],
  "3D_War/dse-wars/wars/balkans/sarajevo/data.js": ["薩拉熱窩圍城由1992年4月持續到1996年2月。", "The siege of Sarajevo lasted from April 1992 to February 1996."],
  "3D_War/dse-wars/wars/balkans/srebrenica/data.js": ["1995年7月，斯雷布雷尼察逾八千名男子與男童被處決。", "In July 1995 more than eight thousand men and boys from Srebrenica were executed."],
  "3D_War/dse-wars/wars/balkans/kosovo/data.js": ["1999年北約空襲沒有安理會授權。塞族軍其後撤出科索沃。", "NATO bombed in 1999 without a Security Council authorisation. Serb forces later left Kosovo."],
  "3D_War/ru-ua-war/data.js": ["全面入侵始於2022年2月24日。2026年6月是第五年。", "The full-scale invasion began on 24 February 2022. June 2026 is the fifth year."]
};

const SUMMARIES = {
  "3D_War/dse-wars/wars/ww1/sarajevo/data.js": "薩拉熱窩暗殺 — 事件地圖。皇儲屬奧匈，普林西普屬青年波斯尼亞。",
  "3D_War/dse-wars/wars/ww2-pacific/hiroshima/data.js": "廣島與長崎 — 核爆課題地圖。約十四萬是至1945年底的累計死難。",
  "3D_War/dse-wars/wars/balkans/srebrenica/data.js": "斯雷布雷尼察 — 屠殺事件地圖。死亡發生在安全區陷落之後的處決。"
};

for (const [rel, task] of Object.entries(TASKS)) {
  let s = read(rel);
  if (!s.includes("sourceTask")) {
    const block = "  const sourceTask = " + JSON.stringify(task, null, 2).replace(/\n/g, "\n  ") + ";\n";
    if (!/const outro/.test(s)) { miss.push(rel + " :: no outro"); continue; }
    s = s.replace(/const outro/, block + "const outro");
    if (!s.includes("sourceTask, END_DAY") && !s.includes("sourceTask , END_DAY")) {
      s = s.replace("outro, END_DAY", "outro, sourceTask, END_DAY");
    }
  }
  const pair = OUTROS[rel];
  if (pair) {
    s = s.replace('"narration_zh": "本戰役為 DSE 西史重要考點。"', '"narration_zh": ' + JSON.stringify(pair[0]));
    s = s.replace('"narration_en": "A key DSE Western History topic."', '"narration_en": ' + JSON.stringify(pair[1]));
    if (rel.endsWith("ru-ua-war/data.js")) {
      s = s.replace(
        'narration_zh:"戰爭仍在繼續。謹記每一位在這場侵略中犧牲的軍民。"',
        "narration_zh:" + JSON.stringify(pair[0])
      );
      s = s.replace(
        'narration_en:"The war continues. Remember every soldier and civilian lost to this invasion."',
        "narration_en:" + JSON.stringify(pair[1])
      );
    }
  }
  if (SUMMARIES[rel]) {
    s = s.replace(/"summary": "[^"]*"/, '"summary": ' + JSON.stringify(SUMMARIES[rel]));
  }
  write(rel, s);
}

const ph = path.join(ROOT, "3D_War/dse-wars/wars/ww2-pacific/philippines/index.html");
for (const dest of [
  "3D_War/dse-wars/wars/ww2-pacific/hong-kong/index.html",
  "3D_War/dse-wars/wars/interwar/abyssinia/index.html"
]) {
  const abs = path.join(ROOT, dest);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.copyFileSync(ph, abs);
}

console.log("MISSES", miss.length);
miss.forEach((m) => console.log("MISS", m));
