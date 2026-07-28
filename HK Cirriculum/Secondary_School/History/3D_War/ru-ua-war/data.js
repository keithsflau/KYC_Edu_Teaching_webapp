/* =====================================================================
 *  data.js  —  Russia-Ukraine War · 2022–2026
 *  Timeline day `d` = days since 2022-02-24 (invasion day 1).
 * ===================================================================== */
window.BATTLE_DATA = (function () {

  const RU = "ru", UA = "ua";
  const END_DAY = 1573; // 2026-06-15

  const geography = {
    regions: [
      { name_en: "Western Ukraine",   name_zh: "烏西",       type: "region", lng: 24.03, lat: 49.84, h: 0 },
      { name_en: "Kyiv Oblast",       name_zh: "基輔州",     type: "region", lng: 30.52, lat: 50.45, h: 0 },
      { name_en: "Kharkiv Oblast",    name_zh: "哈爾科夫州", type: "region", lng: 36.23, lat: 49.99, h: 0 },
      { name_en: "Donbas",            name_zh: "頓巴斯",     type: "region", lng: 37.80, lat: 48.50, h: 0 },
      { name_en: "Zaporizhzhia",      name_zh: "扎波羅熱",   type: "region", lng: 35.14, lat: 47.84, h: 0 },
      { name_en: "Kherson Oblast",    name_zh: "赫爾松州",   type: "region", lng: 32.62, lat: 46.64, h: 0 },
      { name_en: "Odesa Oblast",      name_zh: "敖德薩州",   type: "region", lng: 30.73, lat: 46.48, h: 0 },
      { name_en: "Crimea",            name_zh: "克里米亞",   type: "region", lng: 34.10, lat: 45.30, h: 0 },
      { name_en: "Kursk Oblast",      name_zh: "庫爾斯克州", type: "region", lng: 35.45, lat: 51.73, h: 0 },
    ],
    points: [
      { name_en: "Lviv",              name_zh: "利沃夫",       type: "city",     lng: 24.03, lat: 49.84, h: 0 },
      { name_en: "Kyiv",              name_zh: "基輔",         type: "city",     lng: 30.52, lat: 50.45, h: 0 },
      { name_en: "Hostomel",          name_zh: "霍斯托梅爾",   type: "town",     lng: 30.24, lat: 50.60, h: 0 },
      { name_en: "Chernihiv",         name_zh: "切爾尼戈夫",   type: "city",     lng: 31.29, lat: 51.50, h: 0 },
      { name_en: "Sumy",              name_zh: "蘇梅",         type: "city",     lng: 34.80, lat: 50.91, h: 0 },
      { name_en: "Kharkiv",           name_zh: "哈爾科夫",     type: "city",     lng: 36.23, lat: 49.99, h: 0 },
      { name_en: "Kupiansk",          name_zh: "庫皮揚斯克",   type: "town",     lng: 37.67, lat: 49.71, h: 0 },
      { name_en: "Izium",             name_zh: "伊久姆",       type: "town",     lng: 37.08, lat: 49.21, h: 0 },
      { name_en: "Luhansk",           name_zh: "盧甘斯克",     type: "city",     lng: 39.32, lat: 48.57, h: 0 },
      { name_en: "Sievierodonetsk",   name_zh: "北頓涅茨克",   type: "city",     lng: 38.57, lat: 48.95, h: 0 },
      { name_en: "Bakhmut",           name_zh: "巴赫穆特",     type: "city",     lng: 37.99, lat: 48.59, h: 0 },
      { name_en: "Avdiivka",          name_zh: "阿夫迪伊夫卡", type: "city",     lng: 37.85, lat: 48.14, h: 0 },
      { name_en: "Donetsk",           name_zh: "頓涅茨克",     type: "city",     lng: 37.80, lat: 48.02, h: 0 },
      { name_en: "Dnipro",            name_zh: "第聶伯羅",     type: "city",     lng: 35.05, lat: 48.46, h: 0 },
      { name_en: "Zaporizhzhia",      name_zh: "扎波羅熱市",   type: "city",     lng: 35.14, lat: 47.84, h: 0 },
      { name_en: "Zaporizhzhia NPP",  name_zh: "扎波羅熱核電站",type: "fort",    lng: 34.08, lat: 47.51, h: 0 },
      { name_en: "Mariupol",          name_zh: "馬里烏波爾",   type: "city",     lng: 37.54, lat: 47.10, h: 0 },
      { name_en: "Melitopol",         name_zh: "梅利托波爾",   type: "city",     lng: 35.37, lat: 46.85, h: 0 },
      { name_en: "Kherson",           name_zh: "赫爾松",       type: "city",     lng: 32.62, lat: 46.64, h: 0 },
      { name_en: "Mykolaiv",          name_zh: "尼古拉耶夫",   type: "city",     lng: 32.00, lat: 46.97, h: 0 },
      { name_en: "Odesa",             name_zh: "敖德薩",       type: "city",     lng: 30.73, lat: 46.48, h: 0 },
      { name_en: "Sevastopol",        name_zh: "塞瓦斯托波爾", type: "fort",     lng: 33.52, lat: 44.62, h: 0 },
      { name_en: "Snake Island",      name_zh: "蛇島",         type: "island",   lng: 30.20, lat: 45.25, h: 0 },
      { name_en: "Azovstal",          name_zh: "亞速鋼鐵廠",   type: "fort",     lng: 37.58, lat: 47.10, h: 0 },
      { name_en: "Kakhovka Dam",      name_zh: "卡霍夫卡水壩", type: "fort",     lng: 33.38, lat: 46.78, h: 0 },
      { name_en: "Kursk",             name_zh: "庫爾斯克",     type: "city",     lng: 35.45, lat: 51.73, h: 0 },
      { name_en: "Sudzha",            name_zh: "蘇賈",         type: "town",     lng: 35.27, lat: 51.20, h: 0 },
    ],
    lines: [
      { name_en: "Pre-war Line of Contact", name_zh: "戰前接觸線",
        path: [[37.55,48.10],[38.20,48.45],[38.55,48.75],[38.80,49.05],[39.10,49.25]],
        fade: { until: 55, end: 90 } },
    ],
  };

  const units = [
    /* ===================== RUSSIAN ===================== */
    { id:"ru_gen", faction:RU, kind:"command", crest:"eagle", cf:false,
      name_zh:"俄軍總參謀部", name_en:"Russian General Staff", type:"Supreme Command",
      commander:{ zh:"格拉西莫夫", en:"Gen. Gerasimov", rank:"總參謀長" },
      note:"統籌全戰線；2024年起加強對頓巴斯與庫爾斯克方向協調。",
      track:[ {d:1,lng:37.60,lat:55.75,s:0,st:"hold"}, {d:END_DAY,lng:37.60,lat:55.75,s:0,st:"hold"} ] },

    { id:"ru_wmd", faction:RU, kind:"command", crest:"bear", cf:false,
      name_zh:"北部集團軍（基輔軸線）", name_en:"Northern Grouping", type:"Field Army",
      commander:{ zh:"拉平", en:"Col-Gen Lapin", rank:"上將" },
      note:"2022年自白俄南下突擊基輔；3月潰退後轉守北部邊境。",
      track:[ {d:1,lng:30.80,lat:51.80,s:0,st:"march"}, {d:5,lng:30.35,lat:50.75,s:0,st:"attack"},
              {d:14,lng:30.60,lat:50.55,s:0,st:"retreat"}, {d:END_DAY,lng:32.00,lat:51.50,s:0,st:"hold"} ] },

    { id:"ru_vdv", faction:RU, kind:"infantry", crest:"wings", cf:true,
      name_zh:"空降軍（VDV）", name_en:"Russian Airborne", type:"Air Assault",
      commander:{ zh:"", en:"VDV Command", rank:"空降突擊" },
      note:"霍斯托梅爾空降戰；後續參與多條戰線突擊。",
      track:[ {d:1,lng:30.24,lat:50.60,s:4500,st:"landing"}, {d:7,lng:30.35,lat:50.55,s:2200,st:"hold"},
              {d:14,lng:30.50,lat:50.50,s:800,st:"retreat"}, {d:20,lng:31.50,lat:51.00,s:400,st:"dead"} ] },

    { id:"ru_smd", faction:RU, kind:"command", crest:"bear", cf:false,
      name_zh:"南部／東部集團軍", name_en:"Southern & Eastern Group", type:"Field Army",
      commander:{ zh:"德沃爾尼科夫", en:"Gen. Dvornikov", rank:"上將" },
      note:"馬里烏波爾、扎波羅熱、頓巴斯長期攻勢主力。",
      track:[ {d:1,lng:34.50,lat:47.50,s:0,st:"march"}, {d:45,lng:37.50,lat:47.15,s:0,st:"hold"},
              {d:450,lng:38.00,lat:48.60,s:0,st:"attack"}, {d:900,lng:37.85,lat:48.15,s:0,st:"attack"},
              {d:END_DAY,lng:37.80,lat:48.00,s:0,st:"hold"} ] },

    { id:"ru_mariupol", faction:RU, kind:"infantry", crest:"tank", cf:true,
      name_zh:"馬里烏波爾圍城部隊", name_en:"Mariupol Assault Group", type:"Combined Arms",
      commander:{ zh:"", en:"Naval & Chechen units", rank:"圍城部隊" },
      note:"圍困並攻陷馬里烏波爾。",
      track:[ {d:5,lng:37.80,lat:47.50,s:12000,st:"march"}, {d:45,lng:37.54,lat:47.10,s:9000,st:"attack"},
              {d:82,lng:37.58,lat:47.10,s:7500,st:"hold"} ] },

    { id:"ru_donbas", faction:RU, kind:"infantry", crest:"tank", cf:true,
      name_zh:"頓巴斯攻勢集團", name_en:"Donbas Offensive Group", type:"Mechanized",
      commander:{ zh:"", en:"Central MD grouping", rank:"機械化" },
      note:"2022–2026年頓巴斯方向持續壓力。",
      track:[ {d:60,lng:38.20,lat:48.30,s:15000,st:"attack"}, {d:120,lng:38.57,lat:48.95,s:13000,st:"hold"},
              {d:450,lng:37.99,lat:48.59,s:14000,st:"attack"}, {d:725,lng:37.85,lat:48.14,s:13000,st:"attack"},
              {d:END_DAY,lng:37.80,lat:48.05,s:12000,st:"hold"} ] },

    { id:"ru_wagner", faction:RU, kind:"infantry", crest:"hammer", cf:true,
      name_zh:"瓦格納集團", name_en:"Wagner Group", type:"PMC",
      commander:{ zh:"普里戈任", en:"Prigozhin", rank:"僱傭兵" },
      note:"2023年巴赫穆特消耗戰；6月兵變後瓦解。",
      track:[ {d:350,lng:38.10,lat:48.65,s:22000,st:"attack"}, {d:430,lng:37.99,lat:48.59,s:20000,st:"attack"},
              {d:451,lng:37.99,lat:48.59,s:18000,st:"hold"}, {d:480,lng:37.95,lat:48.55,s:0,st:"dead"} ] },

    { id:"ru_kursk", faction:RU, kind:"infantry", crest:"tank", cf:true,
      name_zh:"庫爾斯克防線部隊", name_en:"Kursk Defence Forces", type:"Border Defence",
      commander:{ zh:"", en:"Northern Grouping", rank:"邊境防禦" },
      note:"2024年8月烏軍突入庫爾斯克州後緊急調集。",
      track:[ {d:895,lng:35.45,lat:51.73,s:8000,st:"hold"}, {d:920,lng:35.30,lat:51.25,s:12000,st:"attack"},
              {d:1100,lng:35.27,lat:51.20,s:10000,st:"hold"}, {d:END_DAY,lng:35.35,lat:51.40,s:9000,st:"hold"} ] },

    { id:"ru_bsf", faction:RU, kind:"navy", crest:"anchor", cf:true,
      name_zh:"黑海艦隊", name_en:"Black Sea Fleet", type:"Naval",
      commander:{ zh:"", en:"BSF Command", rank:"海軍" },
      note:"封鎖南岸、打擊敖德薩與蛇島；塞瓦斯托波爾為基地。",
      track:[ {d:1,lng:30.20,lat:45.25,s:3000,st:"attack"}, {d:120,lng:33.52,lat:44.62,s:2500,st:"hold"},
              {d:END_DAY,lng:33.40,lat:44.65,s:2000,st:"hold"} ] },

    { id:"ru_air", faction:RU, kind:"air", crest:"wings", cf:true,
      name_zh:"俄羅斯空天軍", name_en:"Russian Aerospace Forces", type:"Air & Missiles",
      commander:{ zh:"", en:"Strategic strikes", rank:"導彈空襲" },
      note:"全境導彈與無人機襲擊，含利沃夫等後方城市。",
      track:[ {d:1,lng:30.52,lat:50.45,s:5000,st:"attack"}, {d:200,lng:36.23,lat:49.99,s:4500,st:"attack"},
              {d:600,lng:24.03,lat:49.84,s:4000,st:"attack"}, {d:END_DAY,lng:35.00,lat:48.50,s:4000,st:"attack"} ] },

    /* ===================== UKRAINIAN ===================== */
    { id:"ua_gen", faction:UA, kind:"command", crest:"trident", cf:false,
      name_zh:"烏克蘭總參謀部", name_en:"Ukrainian General Staff", type:"Supreme Command",
      commander:{ zh:"瑟爾斯基", en:"Gen. Syrskyi", rank:"總司令" },
      note:"扎盧日內後接任；統籌2022基輔保衛戰至2024庫爾斯克行動。",
      track:[ {d:1,lng:30.52,lat:50.45,s:0,st:"hold"}, {d:END_DAY,lng:30.52,lat:50.45,s:0,st:"hold"} ] },

    { id:"ua_kyiv", faction:UA, kind:"infantry", crest:"trident", cf:true,
      name_zh:"基輔守軍", name_en:"Kyiv Defence Forces", type:"Territorial Defence",
      commander:{ zh:"瑟爾斯基", en:"Col-Gen Syrskyi", rank:"上將" },
      note:"2022年基輔保衛戰決定性勝利。",
      track:[ {d:1,lng:30.52,lat:50.45,s:35000,st:"hold"}, {d:7,lng:30.35,lat:50.55,s:32000,st:"attack"},
              {d:14,lng:30.40,lat:50.48,s:30000,st:"hold"}, {d:END_DAY,lng:30.52,lat:50.45,s:25000,st:"hold"} ] },

    { id:"ua_93", faction:UA, kind:"infantry", crest:"wheat", cf:true,
      name_zh:"第93機械化旅", name_en:"93rd Mechanized Brigade", type:"Mechanized",
      commander:{ zh:"", en:"Kharkiv & Bakhmut axes", rank:"機械化旅" },
      note:"哈爾科夫反攻與巴赫穆特防禦。",
      track:[ {d:1,lng:36.23,lat:49.99,s:4000,st:"hold"}, {d:194,lng:37.08,lat:49.21,s:4000,st:"attack"},
              {d:400,lng:37.99,lat:48.59,s:3500,st:"hold"}, {d:END_DAY,lng:36.80,lat:49.50,s:3800,st:"hold"} ] },

    { id:"ua_azov", faction:UA, kind:"infantry", crest:"trident", cf:true,
      name_zh:"亞速團", name_en:"Azov Regiment", type:"Special Forces",
      commander:{ zh:"普羅科彭科", en:"Lt-Col Prokopenko", rank:"中校" },
      note:"馬里烏波爾亞速鋼鐵廠最後抵抗。",
      track:[ {d:5,lng:37.54,lat:47.10,s:2500,st:"hold"}, {d:82,lng:37.58,lat:47.10,s:1200,st:"dead"} ] },

    { id:"ua_36th", faction:UA, kind:"infantry", crest:"anchor", cf:true,
      name_zh:"第36海軍陸戰旅", name_en:"36th Marine Brigade", type:"Marines",
      commander:{ zh:"", en:"Mariupol garrison", rank:"海軍陸戰" },
      note:"馬里烏波爾守軍。",
      track:[ {d:5,lng:37.52,lat:47.12,s:3000,st:"hold"}, {d:75,lng:37.58,lat:47.10,s:800,st:"dead"} ] },

    { id:"ua_kherson", faction:UA, kind:"infantry", crest:"wheat", cf:true,
      name_zh:"赫爾松反攻部隊", name_en:"Kherson Counteroffensive", type:"Combined Arms",
      commander:{ zh:"", en:"Southern Command", rank:"反攻" },
      note:"2022年11月收復赫爾松市。",
      track:[ {d:120,lng:32.20,lat:46.80,s:8000,st:"hold"}, {d:261,lng:32.62,lat:46.64,s:11000,st:"hold"},
              {d:END_DAY,lng:32.55,lat:46.65,s:10000,st:"hold"} ] },

    { id:"ua_bakhmut", faction:UA, kind:"infantry", crest:"trident", cf:true,
      name_zh:"巴赫穆特守軍", name_en:"Bakhmut Garrison", type:"Infantry",
      commander:{ zh:"", en:"93rd & airborne units", rank:"防禦" },
      note:"2022冬–2023春死守巴赫穆特，遲滯俄軍攻勢。",
      track:[ {d:300,lng:37.99,lat:48.59,s:6000,st:"hold"}, {d:430,lng:37.99,lat:48.59,s:4500,st:"hold"},
              {d:451,lng:37.95,lat:48.55,s:2000,st:"retreat"}, {d:480,lng:37.90,lat:48.50,s:0,st:"dead"} ] },

    { id:"ua_kursk", faction:UA, kind:"infantry", crest:"wheat", cf:true,
      name_zh:"庫爾斯克突擊部隊", name_en:"Kursk Offensive Force", type:"Mechanized",
      commander:{ zh:"瑟爾斯基", en:"Gen. Syrskyi", rank:"突擊集團" },
      note:"2024年8月突入俄庫爾斯克州，建立緩衝區。",
      track:[ {d:895,lng:35.27,lat:51.20,s:8000,st:"attack"}, {d:950,lng:35.30,lat:51.25,s:10000,st:"hold"},
              {d:1100,lng:35.25,lat:51.18,s:9000,st:"hold"}, {d:END_DAY,lng:35.28,lat:51.22,s:7500,st:"hold"} ] },

    { id:"ua_avdiivka", faction:UA, kind:"infantry", crest:"trident", cf:true,
      name_zh:"阿夫迪伊夫卡守軍", name_en:"Avdiivka Garrison", type:"Infantry",
      commander:{ zh:"", en:"110th Mechanized Brigade", rank:"防禦" },
      note:"2024年2月城陷前長期牽制頓涅茨克方向俄軍。",
      track:[ {d:600,lng:37.85,lat:48.14,s:5000,st:"hold"}, {d:700,lng:37.85,lat:48.14,s:4200,st:"hold"},
              {d:725,lng:37.85,lat:48.14,s:1500,st:"dead"} ] },

    { id:"ua_snake", faction:UA, kind:"infantry", crest:"trident", cf:false,
      name_zh:"蛇島", name_en:"Snake Island", type:"Coastal Defence",
      commander:{ zh:"", en:"Border Guards", rank:"邊防" },
      note:"開戰象徵性抵抗；後烏軍收復。",
      track:[ {d:1,lng:30.20,lat:45.25,s:200,st:"hold"}, {d:3,lng:30.20,lat:45.25,s:150,st:"dead"},
              {d:120,lng:30.20,lat:45.25,s:500,st:"hold"} ] },
  ];

  const arrows = [
    { d:1,   f:RU, from:[30.80,51.80], to:[30.35,50.75], label:"北部軍南下基輔", kind:"march" },
    { d:1,   f:RU, from:[30.24,50.60], to:[30.28,50.58], label:"VDV 空降霍斯托梅爾", kind:"landing" },
    { d:1,   f:RU, from:[34.50,47.50], to:[37.54,47.10], label:"南部軍區東進", kind:"march" },
    { d:14,  f:RU, from:[30.35,50.55], to:[30.60,50.55], label:"基輔車隊潰退", kind:"retreat" },
    { d:60,  f:RU, from:[38.20,48.30], to:[38.55,48.90], label:"頓巴斯攻勢", kind:"attack" },
    { d:194, f:UA, from:[36.15,49.90], to:[37.08,49.21], label:"哈爾科夫反攻", kind:"attack" },
    { d:230, f:UA, from:[32.40,46.70], to:[32.62,46.64], label:"赫爾松反攻", kind:"attack" },
    { d:430, f:RU, from:[38.00,48.65], to:[37.99,48.59], label:"瓦格納攻巴赫穆特", kind:"attack" },
    { d:485, f:UA, from:[35.05,48.46], to:[37.00,48.30], label:"2023夏反攻", kind:"attack" },
    { d:725, f:RU, from:[37.80,48.02], to:[37.85,48.14], label:"阿夫迪伊夫卡攻勢", kind:"attack" },
    { d:895, f:UA, from:[36.50,50.50], to:[35.27,51.20], label:"庫爾斯克突擊", kind:"attack" },
  ];

  const fronts = [
    { d:1,    path:[[30.0,51.5],[32.0,50.5],[34.0,49.5],[36.0,48.5],[38.0,47.5],[39.5,46.5]] },
    { d:14,   path:[[30.5,51.0],[32.0,50.5],[34.0,49.8],[36.0,48.8],[38.0,47.5]] },
    { d:82,   path:[[37.0,47.5],[37.5,47.2],[38.0,48.0],[38.5,48.8],[39.0,49.2]] },
    { d:194,  path:[[33.0,50.5],[35.0,49.8],[36.5,49.0],[37.5,48.5],[38.5,48.8]] },
    { d:261,  path:[[32.5,46.8],[33.5,47.2],[35.0,47.8],[37.0,48.2],[38.0,48.5]] },
    { d:451,  path:[[33.0,50.0],[35.0,49.0],[36.5,48.5],[37.8,48.4],[38.5,48.7]] },
    { d:725,  path:[[33.5,49.5],[35.0,49.0],[36.5,48.5],[37.8,48.2],[38.5,48.5]] },
    { d:895,  path:[[33.5,49.5],[35.0,49.0],[36.5,48.5],[37.8,48.2],[38.5,48.5],[35.3,51.2]] },
    { d:1200, path:[[33.0,50.0],[35.0,49.2],[36.5,48.6],[37.8,48.2],[38.2,48.4]] },
    { d:END_DAY,path:[[33.0,50.0],[35.0,49.2],[36.5,48.6],[37.8,48.2],[38.2,48.4],[35.3,51.1]] },
  ];

  const hotspots = [
    { a:1,   b:5,   lng:30.24, lat:50.60, kind:"landing",   i:1.0 },
    { a:1,   b:5,   lng:30.52, lat:50.45, kind:"air",       i:1.0 },
    { a:1,   b:3,   lng:30.20, lat:45.25, kind:"artillery", i:0.9 },
    { a:5,   b:14,  lng:30.40, lat:50.50, kind:"firefight", i:0.9 },
    { a:20,  b:82,  lng:37.54, lat:47.10, kind:"firefight", i:1.0 },
    { a:60,  b:150, lng:38.55, lat:48.90, kind:"firefight", i:0.9 },
    { a:194, b:210, lng:37.08, lat:49.21, kind:"firefight", i:1.0 },
    { a:350, b:460, lng:37.99, lat:48.59, kind:"firefight", i:1.0 },
    { a:468, b:472, lng:33.38, lat:46.78, kind:"explosion", i:1.0 },
    { a:480, b:520, lng:35.05, lat:48.46, kind:"firefight", i:0.8 },
    { a:700, b:730, lng:37.85, lat:48.14, kind:"firefight", i:1.0 },
    { a:895, b:980, lng:35.27, lat:51.20, kind:"firefight", i:1.0 },
    { a:1100,b:END_DAY,lng:37.80,lat:48.05,kind:"artillery", i:0.7 },
  ];

  const weather = [
    { d:1,    night:0.3,  fog:0.15, rain:0.1,  smoke:0.2,  zh:"嚴冬 · 開戰夜",         en:"Deep winter · opening night" },
    { d:14,   night:0.1,  fog:0.10, rain:0.05, smoke:0.10, zh:"初春",                   en:"Early spring" },
    { d:82,   night:0.1,  fog:0.15, rain:0.05, smoke:0.5,  zh:"馬里烏波爾廢墟",       en:"Mariupol ruins" },
    { d:194,  night:0.1,  fog:0.12, rain:0.1,  smoke:0.2,  zh:"秋 · 反攻",             en:"Autumn counteroffensive" },
    { d:430,  night:0.15, fog:0.20, rain:0.2,  smoke:0.7,  zh:"巴赫穆特 · 廢墟",     en:"Bakhmut · ruins" },
    { d:468,  night:0.1,  fog:0.25, rain:0.0,  smoke:0.4,  zh:"卡霍夫卡水壩潰決",     en:"Kakhovka dam breach" },
    { d:725,  night:0.1,  fog:0.15, rain:0.1,  smoke:0.5,  zh:"阿夫迪伊夫卡陷落",     en:"Fall of Avdiivka" },
    { d:895,  night:0.15, fog:0.12, rain:0.1,  smoke:0.2,  zh:"夏末 · 庫爾斯克",       en:"Late summer · Kursk" },
    { d:END_DAY,night:0.1,fog:0.10, rain:0.1,  smoke:0.25, zh:"2026 · 戰事持續",       en:"2026 · war continues" },
  ];

  const notes = {
    summary:"2022年2月24日俄羅斯全面入侵烏克蘭。烏軍基輔保衛戰獲勝；馬里烏波爾、巴赫穆特、阿夫迪伊夫卡相繼成為消耗戰焦點。2022年哈爾科夫與赫爾松反攻收復大片領土。2023年卡霍夫卡水壩潰決。2024年烏軍突入庫爾斯克州。至2026年戰爭仍在持續。",
    caveats:[
      "地圖覆蓋烏克蘭全境及庫爾斯克方向（22.5°–40.5°E，44°–52.5°N）；地形為現代衛星影像與 SRTM 高程，局部起伏經去趨勢處理以利判讀。",
      "部隊位置、戰線與兵力為敘事示意，錨定真實地名經緯度，非逐日戰術圖。",
      "2025–2026年戰線為截至2026年中前的概括呈現；實際控制區持續變化。",
      "旗徽為藝術化象徵，非考證紋章。",
    ],
    sources:"地理：AWS Terrarium DEM、EOX Sentinel-2 cloudless。史實：ISW、BBC、Reuters、Ukrainian General Staff、維基百科（交叉查證）。",
  };

  const analysis = {
    military:"俄軍開戰初期多軸突擊基輔、哈爾科夫與南部，但補給線過長、士氣與指揮混亂；烏軍以城市防禦、遊擊與西方情報支援守住首都。2022秋反攻與2024庫爾斯克突擊顯示烏軍機動能力，但2023夏反攻在雷區前受阻；頓巴斯消耗戰使雙方均元氣大傷。",
    leaders:"俄羅斯普京下令「特別軍事行動」；總參謀長格拉西莫夫、防長紹伊古主導戰略。烏克蘭澤連斯基留守基輔振奮民心；扎盧日內、瑟爾斯基歷任總司令策劃反攻。普里戈任與瓦格納集團在巴赫穆特顯示俄內部權力鬥爭；西方領袖提供武器與制裁，影響戰爭持久力。",
    nationalPower:"俄羅斯人口與工業基礎遠大於烏克蘭，但受制裁、動員瓶頸與腐敗拖累；烏克蘭倚賴西方財政、武器與訓練，國內動員率高但人口與經濟受創嚴重。戰爭成為俄歐對抗與全球能源、糧食供應鏈的焦點。",
    impact:"逾千萬人流離失所；全球糧價與能源市場震盪；北約東翼加固、芬蘭瑞典入約；國際刑事法院對普京發出逮捕令。戰爭重塑歐洲安全秩序，和平談判至今無突破。",
  };

  const meta = {
    title_zh:"俄烏戰爭", title_en:"Russia's War on Ukraine",
    introCam:{ lng:31.50, lat:48.80, dist:3400, az:0, el:52 },
    titleCard:{ zh:"俄烏戰爭", en:"RUSSIA'S WAR ON UKRAINE · 2022–2026",
      narr_zh:"2022年2月24日起 · 全面入侵與四年抵抗", narr_en:"Full-scale invasion · four years of resistance" },
    nextBattle:{ href:"../dse-wars/", title_zh:"DSE 西方史戰役地圖", title_en:"HKDSE Western History War Maps" },
  };

  const storyboard = [
    { day:1, hold:9, cam:{lng:32.00,lat:49.00,dist:2800,az:0,el:50,orbit:0.5},
      dateLabel:"2022年2月24日", title_zh:"全面入侵", title_en:"The Full-Scale Invasion",
      narration_zh:"俄軍從北、東、南多軸進攻；導彈襲擊全烏克蘭，戰爭在拂曉打響。",
      narration_en:"Russia strikes from north, east and south; missiles hit across Ukraine — the war begins at dawn.",
      commanders:[{zh:"格拉西莫夫",en:"Gen. Gerasimov"}], focus:["ru_gen","ru_air","ua_gen"], side:"ru",
      assets:["air","artillery"],
      forces_zh:"俄軍約19萬人動員 · 導彈與空襲全境", forces_en:"~190k Russian troops · nationwide missile & air strikes" },

    { day:1, hold:8, cam:{lng:30.30,lat:50.58,dist:650,az:200,el:50,orbit:0.7},
      dateLabel:"2022年2月24日 清晨", title_zh:"空降霍斯托梅爾", title_en:"Assault on Hostomel",
      narration_zh:"俄空降軍突擊安東諾夫機場，意圖建立空中橋頭堡直撲基輔。",
      narration_en:"Russian airborne troops assault Antonov Airport, aiming for an airbridge to Kyiv.",
      commanders:[{zh:"VDV",en:"Russian VDV"}], focus:["ru_vdv","ua_kyiv"], side:"both",
      assets:["air","landing"] },

    { day:7, hold:8, cam:{lng:30.45,lat:50.52,dist:900,az:180,el:44,orbit:0.7},
      dateLabel:"2022年3月初", title_zh:"基輔車隊", title_en:"The Kyiv Convoy",
      narration_zh:"俄軍64公里裝甲車隊滯留基輔西北郊；烏軍伏擊與破壞道路使其陷入泥沼。",
      narration_en:"A 64-km Russian convoy stalls northwest of Kyiv; raids and sabotage trap it in the mud.",
      commanders:[{zh:"瑟爾斯基",en:"Col-Gen Syrskyi"}], focus:["ru_wmd","ua_kyiv"], side:"both" },

    { day:14, hold:8, cam:{lng:30.52,lat:50.45,dist:1100,az:0,el:46,orbit:0.6},
      dateLabel:"2022年3月底", title_zh:"基輔解圍", title_en:"Kyiv Relieved",
      narration_zh:"俄軍從基輔方向全面撤退；烏克蘭首都保衛戰勝利。",
      narration_en:"Russia withdraws from the Kyiv axis — the capital is saved.",
      commanders:[{zh:"扎盧日內",en:"Gen. Zaluzhnyi"}], focus:["ua_kyiv"], side:"ua" },

    { day:45, hold:9, cam:{lng:37.54,lat:47.12,dist:700,az:200,el:46,orbit:0.7},
      dateLabel:"2022年4月", title_zh:"馬里烏波爾圍城", title_en:"Siege of Mariupol",
      narration_zh:"俄軍圍困馬里烏波爾；城市化為廢墟，平民傷亡慘重。",
      narration_en:"Mariupol is encircled — the city is reduced to rubble.",
      commanders:[{zh:"亞速團",en:"Azov Regiment"}], focus:["ru_mariupol","ua_azov"], side:"both" },

    { day:82, hold:8, cam:{lng:37.58,lat:47.10,dist:520,az:180,el:48,orbit:0.6},
      dateLabel:"2022年5月20日", title_zh:"亞速鋼鐵廠陷落", title_en:"Fall of Azovstal",
      narration_zh:"堅守82天後，亞速鋼鐵廠最後守軍投降。",
      narration_en:"After 82 days, the last defenders surrender at Azovstal.",
      focus:["ua_azov"], side:"ua" },

    { day:194, hold:9, cam:{lng:36.80,lat:49.50,dist:1000,az:220,el:46,orbit:0.7},
      dateLabel:"2022年9月", title_zh:"哈爾科夫反攻", title_en:"Kharkiv Counteroffensive",
      narration_zh:"烏軍閃電反攻收復伊久姆大片領土；俄軍倉皇潰退。",
      narration_en:"Ukraine recaptures Izium and vast territory in a lightning offensive.",
      focus:["ua_93"], side:"ua" },

    { day:261, hold:9, cam:{lng:32.62,lat:46.64,dist:750,az:0,el:44,orbit:0.7},
      dateLabel:"2022年11月11日", title_zh:"赫爾松解放", title_en:"Liberation of Kherson",
      narration_zh:"烏軍收復第聶伯河右岸赫爾松市。",
      narration_en:"Kherson is liberated on the right bank of the Dnieper.",
      focus:["ua_kherson"], side:"ua", assets:["artillery"] },

    { day:430, hold:10, cam:{lng:37.99,lat:48.59,dist:580,az:200,el:48,orbit:0.7},
      dateLabel:"2023年5月", title_zh:"巴赫穆特煉獄", title_en:"The Battle of Bakhmut",
      narration_zh:"瓦格納集團以人海戰術圍攻巴赫穆特；成為二戰後最血腥城市戰之一。",
      narration_en:"Wagner's human-wave assaults on Bakhmut become one of the bloodiest urban battles since WWII.",
      commanders:[{zh:"普里戈任",en:"Prigozhin"}], focus:["ru_wagner","ua_bakhmut"], side:"both",
      assets:["artillery"], forces_zh:"雙方炮擊與巷戰持續數月", forces_en:"Months of artillery duels and urban combat" },

    { day:451, hold:8, cam:{lng:37.99,lat:48.59,dist:520,az:180,el:46,orbit:0.6},
      dateLabel:"2023年5月20日", title_zh:"巴赫穆特陷落", title_en:"Bakhmut Falls",
      narration_zh:"俄軍宣布占領巴赫穆特；烏軍退守城西高地，繼續牽制。",
      narration_en:"Russia claims Bakhmut; Ukraine holds the western heights and keeps pinning Russian forces.",
      focus:["ru_wagner"], side:"ru" },

    { day:468, hold:9, cam:{lng:33.38,lat:46.78,dist:900,az:0,el:42,orbit:0.6},
      dateLabel:"2023年6月6日", title_zh:"卡霍夫卡水壩潰決", title_en:"Kakhovka Dam Destroyed",
      narration_zh:"卡霍夫卡水壩被毀，洪水淹沒下游社區，生態與人道災難。",
      narration_en:"The Kakhovka dam is destroyed — floods devastate downstream communities.",
      focus:["ua_kherson"], side:"both", assets:["explosion"] },

    { day:485, hold:8, cam:{lng:36.00,lat:48.20,dist:1100,az:0,el:44,orbit:0.6},
      dateLabel:"2023年夏", title_zh:"夏季反攻", title_en:"Summer 2023 Offensive",
      narration_zh:"烏軍向南反攻，但在密集雷區與防線前進展有限。",
      narration_en:"Ukraine's summer offensive pushes south but gains are limited by minefields and fortified lines.",
      focus:["ua_93","ru_donbas"], side:"both" },

    { day:725, hold:9, cam:{lng:37.85,lat:48.14,dist:620,az:200,el:48,orbit:0.7},
      dateLabel:"2024年2月", title_zh:"阿夫迪伊夫卡陷落", title_en:"Fall of Avdiivka",
      narration_zh:"俄軍以壓倒性火力攻陷阿夫迪伊夫卡；烏軍有序撤退至新防線。",
      narration_en:"Russia takes Avdiivka with overwhelming firepower; Ukraine withdraws to new defensive lines.",
      focus:["ru_donbas","ua_avdiivka"], side:"both" },

    { day:895, hold:10, cam:{lng:35.30,lat:51.00,dist:800,az:180,el:44,orbit:0.7},
      dateLabel:"2024年8月", title_zh:"庫爾斯克突擊", title_en:"Incursion into Kursk",
      narration_zh:"烏軍突入俄庫爾斯克州，占領蘇賈等地；戰爭首次大規模燒入俄境。",
      narration_en:"Ukrainian forces cross into Russia's Kursk Oblast — the war burns into Russian territory at scale.",
      commanders:[{zh:"瑟爾斯基",en:"Gen. Syrskyi"}], focus:["ua_kursk","ru_kursk"], side:"both",
      assets:["air","artillery"] },

    { day:1200, hold:8, cam:{lng:37.50,lat:48.30,dist:1000,az:0,el:44,orbit:0.6},
      dateLabel:"2025年", title_zh:"頓巴斯僵持", title_en:"Stalemate in the Donbas",
      narration_zh:"雙方在頓巴斯逐村爭奪，戰線變化緩慢；消耗戰持續。",
      narration_en:"Village-by-village fighting in the Donbas — slow, grinding attrition.",
      focus:["ru_donbas","ua_93"], side:"both" },

    { day:END_DAY, hold:10, cam:{lng:32.50,lat:48.50,dist:2600,az:0,el:48,orbit:0.5},
      dateLabel:"2026年6月", title_zh:"戰爭第四年", title_en:"The Fourth Year of War",
      narration_zh:"戰爭進入第四年。烏克蘭仍堅守，但代價巨大；和平尚遠。",
      narration_en:"The war enters its fourth year. Ukraine endures — at enormous cost — and peace remains distant.",
      commanders:[{zh:"瑟爾斯基",en:"Gen. Syrskyi"}], focus:["ua_gen"], side:"ua" },
  ];

  const outro = {
    title_zh:"俄烏戰爭 2022–2026", title_en:"Russia's War on Ukraine",
    narration_zh:"戰爭仍在繼續。謹記每一位在這場侵略中犧牲的軍民。",
    narration_en:"The war continues. Remember every soldier and civilian lost to this invasion.",
  };

  return { meta, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
