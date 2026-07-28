module.exports = function (CATALOG, ctx) {
  const { geoBox, cam, baseBattle, WW2_F, WW2_AX, WW2_AL, PAC_F, PAC_JP, PAC_US, KR_F, KR_NK, KR_UN, ME_F, ME_AR, ME_IS, BK_F, BK_SR, BK_CO } = ctx;

  CATALOG.push(
    {
      slug: "ww2-europe",
      title_zh: "第二次世界大戰（歐洲）",
      title_en: "WWII · EUROPE",
      period: "1939–1945",
      intro: "歐洲戰場拆為六個 DSE 核心小戰役，每圖聚焦單一城市或戰區約 50–120 公里。",
      warAnalysis: {
        military: "二戰歐洲戰場以閃電戰、戰略轟炸、兩棲登陸與東線消耗戰為特徵；坦克、空軍與工業動員決定勝負。",
        nationalPower: "德國初期軍事領先；美蘇英工業總動員後形成壓倒優勢，空海封鎖削弱軸心國。",
        impact: "納粹崩潰、冷戰分裂、大屠殺記憶與歐洲一體化運動；重塑二十世紀國際秩序。",
      },
      battles: [
        {
          slug: "poland",
          title_zh: "入侵波蘭",
          title_en: "POLAND 1939",
          blurb: "閃擊戰開啟二戰歐洲戰場",
          places: "華沙 · 格但斯克方向",
          data: baseBattle("ww2-poland", "入侵波蘭", "INVASION OF POLAND", "1939年9月", geoBox(21.0, 52.2, 3.5, 2.5, 9), WW2_F, [WW2_AX, WW2_AL], [1939, 9, 1], {
            lng: 21.01, lat: 52.23, dist: 680,
            narr_zh: "德軍閃擊波蘭，蘇聯亦從東線出兵。",
            narr_en: "Germany blitzes Poland; the USSR invades from the east.",
            points: [
              { name_en: "Warsaw", name_zh: "華沙", type: "city", lng: 21.01, lat: 52.23 },
              { name_en: "Modlin", name_zh: "莫德林", type: "fort", lng: 20.72, lat: 52.44 },
              { name_en: "Kraków", name_zh: "克拉科夫", type: "city", lng: 19.94, lat: 50.06 },
            ],
            units: [
              { id: "ax_poland", faction: WW2_AX, kind: "infantry", crest: "tank", cf: true, name_zh: "德軍南方集團軍", name_en: "Army Group South", track: [{ d: 1, lng: 19.5, lat: 52.5, s: 120000, st: "attack" }, { d: 60, lng: 21.01, lat: 52.23, s: 100000, st: "attack" }, { d: 100, lng: 21.0, lat: 52.2, s: 90000, st: "hold" }] },
              { id: "al_poland", faction: WW2_AL, kind: "infantry", crest: "anchor", cf: true, name_zh: "波蘭軍", name_en: "Polish Army", track: [{ d: 1, lng: 21.5, lat: 52.5, s: 80000, st: "hold" }, { d: 60, lng: 21.01, lat: 52.23, s: 40000, st: "retreat" }, { d: 100, lng: 21.0, lat: 52.2, s: 10000, st: "dead" }] },
            ],
            arrows: [{ d: 1, f: WW2_AX, from: [19.5, 52.5], to: [21.01, 52.23], label: "閃擊華沙", kind: "attack" }],
            hotspots: [{ a: 1, b: 80, lng: 21.01, lat: 52.23, kind: "firefight", i: 1 }],
            storyboard: [
              { day: 1, hold: 9, cam: cam(21.01, 52.23, 650), dateLabel: "1939年9月1日", title_zh: "入侵波蘭", title_en: "Invasion of Poland", narration_zh: "德軍以裝甲部隊快速突破，波蘭陷落。", narration_en: "Panzer divisions break through — Poland falls within weeks.", focus: ["ax_poland"], side: "axis" },
            ],
          }),
        },
        {
          slug: "dunkirk",
          title_zh: "敦克爾克撤退",
          title_en: "DUNKIRK 1940",
          blurb: "奇蹟大撤退保存英軍主力",
          places: "敦克爾克海灘 · 加萊",
          data: baseBattle("ww2-dunkirk", "敦克爾克撤退", "DUNKIRK EVACUATION", "1940年5–6月", geoBox(2.38, 51.04, 2.0, 1.6, 10), WW2_F, [WW2_AX, WW2_AL], [1940, 5, 26], {
            lng: 2.38, lat: 51.04, dist: 600,
            narr_zh: "英軍從敦克爾克海灘撤離逾三十萬人。",
            narr_en: "Over 300,000 troops evacuated from the beaches of Dunkirk.",
            points: [
              { name_en: "Dunkirk", name_zh: "敦克爾克", type: "town", lng: 2.38, lat: 51.04 },
              { name_en: "Calais", name_zh: "加萊", type: "city", lng: 1.85, lat: 50.95 },
              { name_en: "Dover", name_zh: "多佛（英國）", type: "city", lng: 1.31, lat: 51.13 },
            ],
            units: [
              { id: "al_bef", faction: WW2_AL, kind: "infantry", crest: "anchor", cf: true, name_zh: "英軍遠征軍", name_en: "BEF", track: [{ d: 1, lng: 2.8, lat: 50.8, s: 300000, st: "retreat" }, { d: 50, lng: 2.38, lat: 51.04, s: 250000, st: "retreat" }, { d: 100, lng: 1.31, lat: 51.13, s: 200000, st: "hold" }] },
              { id: "ax_panzer", faction: WW2_AX, kind: "infantry", crest: "tank", cf: true, name_zh: "德軍裝甲部隊", name_en: "Panzer Divisions", track: [{ d: 1, lng: 3.2, lat: 50.5, s: 80000, st: "attack" }, { d: 60, lng: 2.5, lat: 51.0, s: 70000, st: "hold" }] },
            ],
            arrows: [
              { d: 1, f: WW2_AL, from: [2.8, 50.8], to: [2.38, 51.04], label: "撤向海灘", kind: "retreat" },
              { d: 50, f: WW2_AL, from: [2.38, 51.04], to: [1.31, 51.13], label: "海峽撤離", kind: "retreat" },
            ],
            storyboard: [
              { day: 30, hold: 9, cam: cam(2.38, 51.04, 550), dateLabel: "1940年5月26日–6月4日", title_zh: "敦克爾克大撤退", title_en: "Evacuation of Dunkirk", narration_zh: "民間船隻與皇家海軍協力撤離被困英軍。", narration_en: "The \"little ships\" and Royal Navy evacuate trapped troops.", focus: ["al_bef"], side: "allies" },
            ],
          }),
        },
        {
          slug: "stalingrad",
          title_zh: "斯大林格勒戰役",
          title_en: "STALINGRAD 1942–43",
          blurb: "東線決戰，德軍第六集團軍覆滅",
          places: "伏爾加河 · 斯大林格勒市區",
          data: baseBattle("ww2-stalingrad", "斯大林格勒戰役", "STALINGRAD", "1942–1943", geoBox(44.52, 48.71, 2.5, 2.0, 10), WW2_F, [WW2_AX, WW2_AL], [1942, 8, 23], {
            lng: 44.52, lat: 48.71, dist: 620,
            narr_zh: "德軍圍攻斯大林格勒，蘇軍反攻合圍德軍。",
            narr_en: "Germany besieges Stalingrad — the Red Army encircles the 6th Army.",
            points: [
              { name_en: "Stalingrad", name_zh: "斯大林格勒", type: "city", lng: 44.52, lat: 48.71 },
              { name_en: "Volga River", name_zh: "伏爾加河", type: "bay", lng: 44.55, lat: 48.72 },
              { name_en: "Mamayev Kurgan", name_zh: "馬馬耶夫山崗", type: "fort", lng: 44.54, lat: 48.74 },
            ],
            units: [
              { id: "ax_6th", faction: WW2_AX, kind: "infantry", crest: "eagle", cf: true, name_zh: "德軍第六集團軍", name_en: "German 6th Army", track: [{ d: 1, lng: 44.6, lat: 48.8, s: 110000, st: "attack" }, { d: 60, lng: 44.52, lat: 48.71, s: 90000, st: "hold" }, { d: 100, lng: 44.52, lat: 48.71, s: 20000, st: "dead" }] },
              { id: "al_red", faction: WW2_AL, kind: "infantry", crest: "hammer", cf: true, name_zh: "蘇聯第62集團軍", name_en: "Soviet 62nd Army", track: [{ d: 1, lng: 44.5, lat: 48.7, s: 100000, st: "hold" }, { d: 80, lng: 44.52, lat: 48.71, s: 120000, st: "attack" }, { d: 100, lng: 44.52, lat: 48.71, s: 130000, st: "attack" }] },
            ],
            arrows: [{ d: 20, f: WW2_AX, from: [44.6, 48.8], to: [44.52, 48.71], label: "巷戰圍城", kind: "attack" }],
            hotspots: [{ a: 20, b: 100, lng: 44.52, lat: 48.71, kind: "firefight", i: 1 }],
            weather: [{ d: 1, night: 0.25, fog: 0.3, rain: 0.1, smoke: 0.8, zh: "斯大林格勒廢墟", en: "Stalingrad ruins" }],
            storyboard: [
              { day: 20, hold: 10, cam: cam(44.52, 48.71, 520), dateLabel: "1942年8–11月", title_zh: "圍攻斯大林格勒", title_en: "Siege of Stalingrad", narration_zh: "德軍逐屋爭奪，伏爾加河成最後防線。", narration_en: "House-to-house fighting — the Volga is the last line.", focus: ["ax_6th", "al_red"], side: "both" },
              { day: 90, hold: 9, cam: cam(44.52, 48.71, 580), dateLabel: "1943年2月", title_zh: "德軍投降", title_en: "German Surrender", narration_zh: "保盧斯元帥率第六集團軍投降，東線戰爭轉折。", narration_en: "Paulus surrenders — the turning point on the Eastern Front.", focus: ["al_red"], side: "allies" },
            ],
          }),
        },
        {
          slug: "normandy",
          title_zh: "諾曼第登陸",
          title_en: "NORMANDY D-DAY",
          blurb: "1944年6月6日開闢第二戰場",
          places: "奧馬哈 · 猶他 · 劍灘",
          data: baseBattle("ww2-normandy", "諾曼第登陸", "D-DAY", "1944年6月6日", geoBox(-0.8, 49.35, 2.5, 1.8, 10), WW2_F, [WW2_AX, WW2_AL], [1944, 6, 6], {
            lng: -0.5, lat: 49.35, dist: 580,
            narr_zh: "盟軍在諾曼第五處海灘登陸。",
            narr_en: "Allied forces land on five beaches in Normandy.",
            points: [
              { name_en: "Omaha Beach", name_zh: "奧馬哈海灘", type: "bay", lng: -0.85, lat: 49.37 },
              { name_en: "Utah Beach", name_zh: "猶他海灘", type: "bay", lng: -1.18, lat: 49.42 },
              { name_en: "Caen", name_zh: "卡昂", type: "city", lng: -0.37, lat: 49.18 },
            ],
            units: [
              { id: "al_allied", faction: WW2_AL, kind: "infantry", crest: "anchor", cf: true, name_zh: "盟軍登陸部隊", name_en: "Allied Landing Force", track: [{ d: 1, lng: -1.5, lat: 49.5, s: 150000, st: "landing" }, { d: 50, lng: -0.85, lat: 49.37, s: 130000, st: "attack" }, { d: 100, lng: -0.37, lat: 49.18, s: 120000, st: "attack" }] },
              { id: "ax_atlantic", faction: WW2_AX, kind: "infantry", crest: "eagle", cf: true, name_zh: "大西洋壁壘守軍", name_en: "Atlantic Wall", track: [{ d: 1, lng: -0.8, lat: 49.35, s: 50000, st: "hold" }, { d: 100, lng: -0.5, lat: 49.3, s: 20000, st: "retreat" }] },
            ],
            arrows: [{ d: 1, f: WW2_AL, from: [-1.5, 49.5], to: [-0.85, 49.37], label: "D-Day 登陸", kind: "landing" }],
            hotspots: [{ a: 1, b: 50, lng: -0.85, lat: 49.37, kind: "landing", i: 1 }],
            storyboard: [
              { day: 1, hold: 10, cam: cam(-0.85, 49.37, 480), dateLabel: "1944年6月6日", title_zh: "諾曼第登陸", title_en: "D-Day Landings", narration_zh: "奧馬哈海灘傷亡慘重，但盟軍最終建立灘頭陣地。", narration_en: "Heavy losses at Omaha — but the Allies secure a foothold.", focus: ["al_allied"], side: "allies" },
            ],
          }),
        },
        {
          slug: "el-alamein",
          title_zh: "阿拉曼戰役",
          title_en: "EL ALAMEIN 1942",
          blurb: "北非戰場轉折點",
          places: "阿拉曼 · 埃及北海岸",
          data: baseBattle("ww2-alamein", "阿拉曼戰役", "EL ALAMEIN", "1942年10–11月", geoBox(28.95, 30.83, 2.5, 2.0, 10), WW2_F, [WW2_AX, WW2_AL], [1942, 10, 23], {
            lng: 28.95, lat: 30.83, dist: 700,
            narr_zh: "蒙哥馬利在北非擊敗隆美爾，扭轉北非戰局。",
            narr_en: "Montgomery defeats Rommel — the North African turning point.",
            points: [
              { name_en: "El Alamein", name_zh: "阿拉曼", type: "fort", lng: 28.95, lat: 30.83 },
              { name_en: "Alexandria", name_zh: "亞歷山大港", type: "city", lng: 29.92, lat: 31.20 },
              { name_en: "Qattara Depression", name_zh: "蓋塔拉洼地", type: "region", lng: 28.5, lat: 29.5 },
            ],
            units: [
              { id: "al_8th", faction: WW2_AL, kind: "infantry", crest: "anchor", cf: true, name_zh: "英第八集團軍", name_en: "8th Army", track: [{ d: 1, lng: 29.5, lat: 30.9, s: 90000, st: "hold" }, { d: 50, lng: 28.95, lat: 30.83, s: 100000, st: "attack" }, { d: 100, lng: 28.5, lat: 30.7, s: 95000, st: "attack" }] },
              { id: "ax_afrika", faction: WW2_AX, kind: "infantry", crest: "tank", cf: true, name_zh: "非洲軍團", name_en: "Afrika Korps", track: [{ d: 1, lng: 28.7, lat: 30.75, s: 70000, st: "hold" }, { d: 100, lng: 28.3, lat: 30.5, s: 40000, st: "retreat" }] },
            ],
            arrows: [{ d: 30, f: WW2_AL, from: [29.5, 30.9], to: [28.95, 30.83], label: "第二次阿拉曼", kind: "attack" }],
            storyboard: [
              { day: 30, hold: 9, cam: cam(28.95, 30.83, 620), dateLabel: "1942年10–11月", title_zh: "第二次阿拉曼戰役", title_en: "Second Battle of El Alamein", narration_zh: "蒙哥馬利以壓倒性火力突破德意防線。", narration_en: "Montgomery breaks through with overwhelming firepower.", focus: ["al_8th", "ax_afrika"], side: "both" },
            ],
          }),
        },
        {
          slug: "berlin",
          title_zh: "柏林戰役",
          title_en: "BERLIN 1945",
          blurb: "蘇軍攻入柏林，德國投降",
          places: "柏林市區 · 國會大廈",
          data: baseBattle("ww2-berlin", "柏林戰役", "BATTLE OF BERLIN", "1945年4–5月", geoBox(13.4, 52.52, 2.0, 1.6, 10), WW2_F, [WW2_AX, WW2_AL], [1945, 4, 16], {
            lng: 13.4, lat: 52.52, dist: 580,
            narr_zh: "蘇軍圍攻柏林，希特勒自殺，德國無條件投降。",
            narr_en: "Soviet forces storm Berlin — Germany surrenders unconditionally.",
            points: [
              { name_en: "Berlin", name_zh: "柏林", type: "city", lng: 13.4, lat: 52.52 },
              { name_en: "Reichstag", name_zh: "國會大廈", type: "fort", lng: 13.38, lat: 52.52 },
              { name_en: "Potsdam", name_zh: "波茨坦", type: "city", lng: 13.06, lat: 52.39 },
            ],
            units: [
              { id: "al_soviet", faction: WW2_AL, kind: "infantry", crest: "hammer", cf: true, name_zh: "蘇聯第一白俄羅斯方面軍", name_en: "1st Belorussian Front", track: [{ d: 1, lng: 14.0, lat: 52.6, s: 150000, st: "attack" }, { d: 60, lng: 13.4, lat: 52.52, s: 180000, st: "attack" }, { d: 100, lng: 13.38, lat: 52.52, s: 200000, st: "hold" }] },
              { id: "ax_berlin", faction: WW2_AX, kind: "infantry", crest: "eagle", cf: true, name_zh: "柏林守軍", name_en: "Berlin Garrison", track: [{ d: 1, lng: 13.4, lat: 52.52, s: 80000, st: "hold" }, { d: 100, lng: 13.38, lat: 52.52, s: 5000, st: "dead" }] },
            ],
            arrows: [{ d: 30, f: WW2_AL, from: [14.0, 52.6], to: [13.38, 52.52], label: "攻入國會大廈", kind: "attack" }],
            hotspots: [{ a: 30, b: 100, lng: 13.38, lat: 52.52, kind: "firefight", i: 1 }],
            storyboard: [
              { day: 60, hold: 10, cam: cam(13.38, 52.52, 500), dateLabel: "1945年4月30日–5月2日", title_zh: "柏林陷落", title_en: "Fall of Berlin", narration_zh: "蘇軍在國會大廈升起紅旗，德國於5月8日投降。", narration_en: "The Red Flag flies over the Reichstag — Germany surrenders 8 May.", focus: ["al_soviet"], side: "allies" },
            ],
          }),
        },
      ],
    },
    {
      slug: "ww2-pacific",
      title_zh: "第二次世界大戰（太平洋）",
      title_en: "WWII · PACIFIC",
      period: "1941–1945",
      intro: "太平洋戰場拆為五個小戰役；珍珠港與中途島以字幕說明真實位置（部分在海圖範圍外）。",
      warAnalysis: {
        military: "太平洋戰爭以航母海戰、跳島兩棲與戰略轟炸為主；美國海空優勢逐步壓倒日本。",
        nationalPower: "日本倚賴有限資源與聯合艦隊；美國工業產能與補給線橫跨太平洋。",
        impact: "日本投降、美國占領、亞洲非殖民化；原子彈開啟核時代。",
      },
      battles: [
        {
          slug: "philippines",
          title_zh: "菲律賓戰役",
          title_en: "PHILIPPINES 1941–42",
          blurb: "珍珠港後日軍南攻馬尼拉",
          places: "馬尼拉 · 巴丹半島",
          data: baseBattle("ww2-philippines", "菲律賓戰役", "PHILIPPINES", "1941–1942", geoBox(120.98, 14.6, 3.0, 2.5, 9), PAC_F, [PAC_JP, PAC_US], [1941, 12, 8], {
            lng: 120.98, lat: 14.6, dist: 680,
            narr_zh: "日軍攻陷菲律賓，美菲守軍撤退至巴丹。",
            narr_en: "Japan conquers the Philippines — US-Filipino forces retreat to Bataan.",
            points: [
              { name_en: "Manila", name_zh: "馬尼拉", type: "city", lng: 120.98, lat: 14.60 },
              { name_en: "Bataan", name_zh: "巴丹半島", type: "fort", lng: 120.45, lat: 14.65 },
              { name_en: "Corregidor", name_zh: "科雷希多島", type: "fort", lng: 120.58, lat: 14.38 },
            ],
            units: [
              { id: "jp_ph", faction: PAC_JP, kind: "infantry", crest: "anchor", cf: true, name_zh: "日本第14軍", name_en: "Japanese 14th Army", track: [{ d: 1, lng: 121.5, lat: 15.0, s: 60000, st: "attack" }, { d: 60, lng: 120.98, lat: 14.6, s: 55000, st: "hold" }, { d: 100, lng: 120.45, lat: 14.65, s: 50000, st: "attack" }] },
              { id: "us_ph", faction: PAC_US, kind: "infantry", crest: "anchor", cf: true, name_zh: "美菲守軍", name_en: "US-Filipino Forces", track: [{ d: 1, lng: 120.98, lat: 14.6, s: 50000, st: "hold" }, { d: 60, lng: 120.45, lat: 14.65, s: 30000, st: "retreat" }, { d: 100, lng: 120.58, lat: 14.38, s: 10000, st: "dead" }] },
            ],
            arrows: [{ d: 1, f: PAC_JP, from: [121.5, 15.0], to: [120.98, 14.6], label: "攻陷馬尼拉", kind: "attack" }],
            storyboard: [
              { day: 1, hold: 9, cam: cam(120.98, 14.6, 600), dateLabel: "1941年12月", title_zh: "菲律賓陷落", title_en: "Fall of the Philippines", narration_zh: "珍珠港後日軍迅速南攻；馬尼拉於1942年1月淪陷。", narration_en: "After Pearl Harbor, Japan pushes south — Manila falls January 1942.", focus: ["jp_ph"], side: "jp" },
            ],
          }),
        },
        {
          slug: "midway",
          title_zh: "中途島海戰",
          title_en: "MIDWAY 1942",
          blurb: "太平洋戰爭轉折點",
          places: "中途島環礁 · 夏威夷西北",
          data: baseBattle("ww2-midway", "中途島海戰", "MIDWAY", "1942年6月", geoBox(-177.4, 28.2, 4.0, 3.0, 8), PAC_F, [PAC_JP, PAC_US], [1942, 6, 4], {
            lng: -177.4, lat: 28.2, dist: 900,
            narr_zh: "美軍以情報優勢在中途島擊沉四艘日航母。",
            narr_en: "US intelligence enables the sinking of four Japanese carriers at Midway.",
            points: [
              { name_en: "Midway Atoll", name_zh: "中途島", type: "island", lng: -177.38, lat: 28.21 },
              { name_en: "Battle area (north)", name_zh: "海戰區（北）", type: "bay", lng: -177.0, lat: 29.0 },
            ],
            units: [
              { id: "us_carrier", faction: PAC_US, kind: "navy", crest: "anchor", cf: true, name_zh: "美國特混艦隊", name_en: "US Carrier Task Force", track: [{ d: 1, lng: -177.8, lat: 27.5, s: 70000, st: "hold" }, { d: 50, lng: -177.2, lat: 28.5, s: 80000, st: "attack" }, { d: 100, lng: -177.38, lat: 28.21, s: 85000, st: "hold" }] },
              { id: "jp_carrier", faction: PAC_JP, kind: "navy", crest: "anchor", cf: true, name_zh: "日本機動部隊", name_en: "Kido Butai", track: [{ d: 1, lng: -176.5, lat: 29.5, s: 80000, st: "attack" }, { d: 50, lng: -177.0, lat: 28.8, s: 40000, st: "dead" }, { d: 100, lng: -176.5, lat: 29.5, s: 10000, st: "retreat" }] },
            ],
            arrows: [{ d: 30, f: PAC_US, from: [-177.8, 27.5], to: [-177.0, 28.8], label: "航母決戰", kind: "attack" }],
            storyboard: [
              { day: 30, hold: 10, cam: cam(-177.38, 28.21, 750), dateLabel: "1942年6月4–7日", title_zh: "中途島海戰", title_en: "Battle of Midway", narration_zh: "美軍擊沉赤城、加賀、蒼龍、飛龍，扭轉太平洋戰局。", narration_en: "Four Japanese carriers lost — the Pacific war turns.", focus: ["us_carrier", "jp_carrier"], side: "both" },
            ],
          }),
        },
        {
          slug: "guadalcanal",
          title_zh: "瓜達爾卡納爾",
          title_en: "GUADALCANAL 1942–43",
          blurb: "盟軍首次反攻所羅門群島",
          places: "瓜島 · 亨德森機場",
          data: baseBattle("ww2-guadalcanal", "瓜達爾卡納爾戰役", "GUADALCANAL", "1942–1943", geoBox(160.15, -9.55, 2.5, 2.0, 10), PAC_F, [PAC_JP, PAC_US], [1942, 8, 7], {
            lng: 160.15, lat: -9.55, dist: 620,
            narr_zh: "美軍登陸瓜島，奪取亨德森機場。",
            narr_en: "US Marines land on Guadalcanal and seize Henderson Field.",
            points: [
              { name_en: "Guadalcanal", name_zh: "瓜達爾卡納爾", type: "island", lng: 160.15, lat: -9.55 },
              { name_en: "Henderson Field", name_zh: "亨德森機場", type: "fort", lng: 160.05, lat: -9.43 },
              { name_en: "Tulagi", name_zh: "圖拉吉", type: "island", lng: 160.14, lat: -9.10 },
            ],
            units: [
              { id: "us_marines", faction: PAC_US, kind: "infantry", crest: "anchor", cf: true, name_zh: "美國海軍陸戰隊", name_en: "US Marines", track: [{ d: 1, lng: 160.3, lat: -9.7, s: 40000, st: "landing" }, { d: 60, lng: 160.05, lat: -9.43, s: 45000, st: "hold" }, { d: 100, lng: 160.15, lat: -9.55, s: 50000, st: "hold" }] },
              { id: "jp_garrison", faction: PAC_JP, kind: "infantry", crest: "wings", cf: true, name_zh: "日本守備隊", name_en: "Japanese Garrison", track: [{ d: 1, lng: 160.1, lat: -9.5, s: 30000, st: "hold" }, { d: 100, lng: 160.2, lat: -9.6, s: 8000, st: "retreat" }] },
            ],
            arrows: [{ d: 1, f: PAC_US, from: [160.3, -9.7], to: [160.05, -9.43], label: "瓜島登陸", kind: "landing" }],
            hotspots: [{ a: 1, b: 100, lng: 160.05, lat: -9.43, kind: "firefight", i: 0.9 }],
            storyboard: [
              { day: 1, hold: 9, cam: cam(160.05, -9.43, 520), dateLabel: "1942年8月", title_zh: "瓜島登陸", title_en: "Landings on Guadalcanal", narration_zh: "盟軍首次反攻，控制亨德森機場成關鍵。", narration_en: "Allied counter-offensive begins — Henderson Field is critical.", focus: ["us_marines"], side: "us" },
            ],
          }),
        },
        {
          slug: "iwo-jima",
          title_zh: "硫磺島戰役",
          title_en: "IWO JIMA 1945",
          blurb: "慘烈島嶼戰，升旗照片",
          places: "硫磺島 · 折鉢山",
          data: baseBattle("ww2-iwo", "硫磺島戰役", "IWO JIMA", "1945年2–3月", geoBox(141.32, 24.78, 1.5, 1.2, 11), PAC_F, [PAC_JP, PAC_US], [1945, 2, 19], {
            lng: 141.32, lat: 24.78, dist: 520,
            narr_zh: "美軍傷亡慘重攻佔硫磺島。",
            narr_en: "US Marines take Iwo Jima at terrible cost.",
            points: [
              { name_en: "Iwo Jima", name_zh: "硫磺島", type: "island", lng: 141.32, lat: 24.78 },
              { name_en: "Mount Suribachi", name_zh: "折鉢山", type: "peak", lng: 141.29, lat: 24.75 },
            ],
            units: [
              { id: "us_iwo", faction: PAC_US, kind: "infantry", crest: "anchor", cf: true, name_zh: "美國海軍陸戰隊", name_en: "US Marines", track: [{ d: 1, lng: 141.4, lat: 24.85, s: 50000, st: "landing" }, { d: 80, lng: 141.29, lat: 24.75, s: 45000, st: "attack" }, { d: 100, lng: 141.32, lat: 24.78, s: 40000, st: "hold" }] },
              { id: "jp_iwo", faction: PAC_JP, kind: "infantry", crest: "wings", cf: true, name_zh: "日本守備隊", name_en: "Japanese Defenders", track: [{ d: 1, lng: 141.32, lat: 24.78, s: 22000, st: "hold" }, { d: 100, lng: 141.29, lat: 24.75, s: 2000, st: "dead" }] },
            ],
            arrows: [{ d: 40, f: PAC_US, from: [141.4, 24.85], to: [141.29, 24.75], label: "攻佔折鉢山", kind: "attack" }],
            hotspots: [{ a: 1, b: 100, lng: 141.29, lat: 24.75, kind: "firefight", i: 1 }],
            storyboard: [
              { day: 40, hold: 10, cam: cam(141.29, 24.75, 450), dateLabel: "1945年2月23日", title_zh: "硫磺島升旗", title_en: "Flag Raising on Iwo Jima", narration_zh: "美軍在折鉢山升起國旗，成為二戰經典影像。", narration_en: "Marines raise the flag on Mount Suribachi — an iconic image.", focus: ["us_iwo"], side: "us" },
            ],
          }),
        },
        {
          slug: "hiroshima",
          title_zh: "廣島原子彈",
          title_en: "HIROSHIMA 1945",
          blurb: "核時代來臨，戰爭加速結束",
          places: "廣島市區 · 長崎",
          data: baseBattle("ww2-hiroshima", "廣島與長崎", "ATOMIC BOMBS", "1945年8月", geoBox(132.46, 34.39, 3.5, 2.5, 9), PAC_F, [PAC_JP, PAC_US], [1945, 8, 6], {
            lng: 132.46, lat: 34.39, dist: 650,
            narr_zh: "美軍投下原子彈，日本於8月15日投降。",
            narr_en: "Atomic bombs on Hiroshima and Nagasaki — Japan surrenders 15 August.",
            points: [
              { name_en: "Hiroshima", name_zh: "廣島", type: "city", lng: 132.46, lat: 34.39 },
              { name_en: "Nagasaki", name_zh: "長崎", type: "city", lng: 129.87, lat: 32.75 },
              { name_en: "Tokyo", name_zh: "東京", type: "city", lng: 139.69, lat: 35.69 },
            ],
            units: [
              { id: "us_b29", faction: PAC_US, kind: "navy", crest: "anchor", cf: false, name_zh: "美軍 B-29 部隊", name_en: "US B-29 Command", track: [{ d: 1, lng: 133.0, lat: 34.5, s: 0, st: "attack" }, { d: 100, lng: 132.46, lat: 34.39, s: 0, st: "hold" }] },
            ],
            arrows: [{ d: 1, f: PAC_US, from: [133.0, 34.5], to: [132.46, 34.39], label: "「小男孩」", kind: "attack" }],
            hotspots: [
              { a: 1, b: 20, lng: 132.46, lat: 34.39, kind: "explosion", i: 1 },
              { a: 40, b: 60, lng: 129.87, lat: 32.75, kind: "explosion", i: 1 },
            ],
            storyboard: [
              { day: 1, hold: 10, cam: cam(132.46, 34.39, 500), dateLabel: "1945年8月6日", title_zh: "廣島原子彈", title_en: "Hiroshima", narration_zh: "「小男孩」投下，約十四萬人喪生，開啟核時代。", narration_en: "\"Little Boy\" — ~140,000 dead; the nuclear age begins.", focus: ["us_b29"], side: "us" },
              { day: 80, hold: 8, cam: cam(139.69, 35.69, 900), dateLabel: "1945年8月15日", title_zh: "日本投降", title_en: "Japanese Surrender", narration_zh: "天皇宣布無條件投降，太平洋戰爭結束。", narration_en: "Emperor announces unconditional surrender.", focus: ["us_b29"], side: "us" },
            ],
          }),
        },
      ],
    },
    {
      slug: "korea",
      title_zh: "韓戰",
      title_en: "KOREAN WAR",
      period: "1950–1953",
      intro: "韓戰拆為四個小戰役，地圖聚焦半島局部約 80–150 公里。",
      warAnalysis: {
        military: "韓戰結合大規模機動、兩棲登陸、山地冬季戰與三八線陣地戰；中美介入改變力量平衡。",
        nationalPower: "美國主導聯合國軍與海空優勢；中國志願軍以人力與近戰補給劣勢。",
        impact: "半島分裂固化、冷戰熱點、美軍駐韓至今；未簽和平條約。",
      },
      battles: [
        {
          slug: "invasion",
          title_zh: "北韓南侵",
          title_en: "INVASION 1950",
          blurb: "越過三八線，漢城陷落",
          places: "三八線 · 漢城 · 釜山",
          data: baseBattle("kr-invasion", "北韓南侵", "NORTH KOREAN INVASION", "1950年6月", geoBox(127.5, 37.5, 3.5, 3.0, 9), KR_F, [KR_NK, KR_UN], [1950, 6, 25], {
            lng: 127.0, lat: 37.5, dist: 750,
            narr_zh: "北韓大軍越過三八線，迅速攻占漢城。",
            narr_en: "North Korean forces cross the 38th parallel and seize Seoul.",
            lines: [{ name_zh: "三八線", name_en: "38th Parallel", path: [[125.5, 38.0], [127.0, 38.0], [128.5, 38.0]] }],
            points: [
              { name_en: "38th Parallel", name_zh: "三八線", type: "fort", lng: 127.0, lat: 38.0 },
              { name_en: "Seoul", name_zh: "漢城", type: "city", lng: 126.98, lat: 37.57 },
              { name_en: "Pusan", name_zh: "釜山", type: "city", lng: 129.04, lat: 35.18 },
            ],
            units: [
              { id: "nk_army", faction: KR_NK, kind: "infantry", crest: "hammer", cf: true, name_zh: "北韓人民軍", name_en: "KPA", track: [{ d: 1, lng: 127.0, lat: 38.0, s: 90000, st: "attack" }, { d: 30, lng: 126.98, lat: 37.57, s: 85000, st: "hold" }, { d: 100, lng: 128.5, lat: 36.0, s: 70000, st: "attack" }] },
              { id: "un_army", faction: KR_UN, kind: "infantry", crest: "anchor", cf: true, name_zh: "韓軍／聯合國軍", name_en: "ROK / UN", track: [{ d: 1, lng: 126.98, lat: 37.57, s: 40000, st: "retreat" }, { d: 30, lng: 129.04, lat: 35.18, s: 50000, st: "retreat" }, { d: 100, lng: 129.0, lat: 35.2, s: 55000, st: "hold" }] },
            ],
            arrows: [{ d: 1, f: KR_NK, from: [127.0, 38.0], to: [126.98, 37.57], label: "越線南侵", kind: "attack" }],
            storyboard: [
              { day: 1, hold: 9, cam: cam(127.0, 38.0, 650), dateLabel: "1950年6月25日", title_zh: "北韓南侵", title_en: "North Korean Invasion", narration_zh: "北韓坦克部隊突破三八線。", narration_en: "North Korean armour breaks through the 38th parallel.", focus: ["nk_army"], side: "nk" },
              { day: 40, hold: 8, cam: cam(129.04, 35.18, 600), dateLabel: "1950年夏", title_zh: "釜山防線", title_en: "Pusan Perimeter", narration_zh: "聯合國軍被壓縮至半島南端。", narration_en: "UN forces compressed into the Pusan bridgehead.", focus: ["un_army"], side: "un" },
            ],
          }),
        },
        {
          slug: "inchon",
          title_zh: "仁川登陸",
          title_en: "INCHON 1950",
          blurb: "麥克阿瑟兩棲奇襲",
          places: "仁川港 · 漢城",
          data: baseBattle("kr-inchon", "仁川登陸", "INCHON LANDING", "1950年9月15日", geoBox(126.62, 37.46, 1.8, 1.4, 11), KR_F, [KR_NK, KR_UN], [1950, 9, 15], {
            lng: 126.62, lat: 37.46, dist: 520,
            narr_zh: "聯合國軍在仁川登陸，切斷北韓補給。",
            narr_en: "UN amphibious landing at Inchon cuts North Korean supply lines.",
            points: [
              { name_en: "Inchon", name_zh: "仁川", type: "town", lng: 126.62, lat: 37.46 },
              { name_en: "Seoul", name_zh: "漢城", type: "city", lng: 126.98, lat: 37.57 },
              { name_en: "Wolmi-do", name_zh: "月尾島", type: "fort", lng: 126.60, lat: 37.47 },
            ],
            units: [
              { id: "un_inchon", faction: KR_UN, kind: "infantry", crest: "anchor", cf: true, name_zh: "聯合國登陸部隊", name_en: "UN Landing Force", track: [{ d: 1, lng: 126.3, lat: 37.3, s: 70000, st: "landing" }, { d: 40, lng: 126.62, lat: 37.46, s: 100000, st: "attack" }, { d: 100, lng: 126.98, lat: 37.57, s: 110000, st: "hold" }] },
              { id: "nk_inchon", faction: KR_NK, kind: "infantry", crest: "hammer", cf: true, name_zh: "北韓守軍", name_en: "KPA Garrison", track: [{ d: 1, lng: 126.7, lat: 37.5, s: 15000, st: "hold" }, { d: 100, lng: 127.0, lat: 37.8, s: 5000, st: "retreat" }] },
            ],
            arrows: [{ d: 1, f: KR_UN, from: [126.3, 37.3], to: [126.62, 37.46], label: "仁川登陸", kind: "landing" }],
            hotspots: [{ a: 1, b: 60, lng: 126.62, lat: 37.46, kind: "landing", i: 1 }],
            storyboard: [
              { day: 1, hold: 10, cam: cam(126.62, 37.46, 480), dateLabel: "1950年9月15日", title_zh: "仁川登陸", title_en: "Inchon Landing", narration_zh: "麥克阿瑟策劃的兩棲作戰扭轉戰局。", narration_en: "MacArthur's gamble turns the tide of the war.", focus: ["un_inchon"], side: "un" },
            ],
          }),
        },
        {
          slug: "chosin",
          title_zh: "長津湖戰役",
          title_en: "CHOSIN 1950",
          blurb: "嚴冬下的北撤",
          places: "長津湖 · 咸興",
          data: baseBattle("kr-chosin", "長津湖戰役", "CHOSIN RESERVOIR", "1950年11–12月", geoBox(127.15, 40.45, 2.5, 2.0, 10), KR_F, [KR_NK, KR_UN], [1950, 11, 27], {
            lng: 127.15, lat: 40.45, dist: 650,
            narr_zh: "志願軍在嚴冬圍攻美軍陸戰一師。",
            narr_en: "PVA forces encircle US Marines at Chosin in brutal winter.",
            points: [
              { name_en: "Chosin Reservoir", name_zh: "長津湖", type: "town", lng: 127.15, lat: 40.45 },
              { name_en: "Hagaru-ri", name_zh: "下碣隅里", type: "fort", lng: 127.12, lat: 40.38 },
              { name_en: "Hungnam", name_zh: "興南", type: "town", lng: 127.63, lat: 39.83 },
            ],
            units: [
              { id: "nk_chosin", faction: KR_NK, kind: "infantry", crest: "hammer", cf: true, name_zh: "志願軍第9兵團", name_en: "PVA 9th Army", track: [{ d: 1, lng: 127.5, lat: 40.8, s: 120000, st: "attack" }, { d: 60, lng: 127.15, lat: 40.45, s: 100000, st: "attack" }, { d: 100, lng: 127.2, lat: 40.3, s: 80000, st: "hold" }] },
              { id: "un_chosin", faction: KR_UN, kind: "infantry", crest: "anchor", cf: true, name_zh: "美陸戰一師", name_en: "US 1st Marine Division", track: [{ d: 1, lng: 127.15, lat: 40.45, s: 25000, st: "hold" }, { d: 60, lng: 127.12, lat: 40.38, s: 20000, st: "retreat" }, { d: 100, lng: 127.63, lat: 39.83, s: 18000, st: "retreat" }] },
            ],
            arrows: [{ d: 30, f: KR_NK, from: [127.5, 40.8], to: [127.15, 40.45], label: "長津湖包圍", kind: "attack" }],
            weather: [{ d: 1, night: 0.35, fog: 0.2, rain: 0, smoke: 0.3, zh: "長津湖嚴冬", en: "Chosin winter" }],
            storyboard: [
              { day: 30, hold: 10, cam: cam(127.15, 40.45, 580), dateLabel: "1950年11–12月", title_zh: "長津湖戰役", title_en: "Battle of Chosin Reservoir", narration_zh: "零下三十度嚴冬，美軍突破重圍撤向興南。", narration_en: "In -30°C, Marines fight their way to Hungnam.", focus: ["un_chosin", "nk_chosin"], side: "both" },
            ],
          }),
        },
        {
          slug: "armistice",
          title_zh: "板門店停戰",
          title_en: "PANMUNJOM 1953",
          blurb: "三八線附近簽署停戰協定",
          places: "板門店 · 開城",
          data: baseBattle("kr-armistice", "板門店停戰", "ARMISTICE", "1953年7月27日", geoBox(126.68, 37.95, 2.0, 1.6, 11), KR_F, [KR_NK, KR_UN], [1953, 7, 27], {
            lng: 126.68, lat: 37.95, dist: 550,
            narr_zh: "雙方在板門店簽署停戰協定，半島分裂延續。",
            narr_en: "Armistice signed at Panmunjom — Korea remains divided.",
            lines: [{ name_zh: "軍事分界線", name_en: "DMZ", path: [[126.2, 38.0], [126.68, 38.0], [127.2, 38.0]] }],
            points: [
              { name_en: "Panmunjom", name_zh: "板門店", type: "fort", lng: 126.68, lat: 37.95 },
              { name_en: "Kaesong", name_zh: "開城", type: "city", lng: 126.55, lat: 37.97 },
            ],
            units: [
              { id: "un_dmz", faction: KR_UN, kind: "infantry", crest: "anchor", cf: true, name_zh: "聯合國軍", name_en: "UN Command", track: [{ d: 1, lng: 126.7, lat: 37.9, s: 90000, st: "hold" }, { d: 100, lng: 126.68, lat: 37.95, s: 90000, st: "hold" }] },
              { id: "nk_dmz", faction: KR_NK, kind: "infantry", crest: "hammer", cf: true, name_zh: "北韓軍", name_en: "KPA", track: [{ d: 1, lng: 126.75, lat: 38.0, s: 80000, st: "hold" }, { d: 100, lng: 126.7, lat: 38.0, s: 80000, st: "hold" }] },
            ],
            storyboard: [
              { day: 1, hold: 10, cam: cam(126.68, 37.95, 480), dateLabel: "1953年7月27日", title_zh: "板門店停戰", title_en: "Armistice at Panmunjom", narration_zh: "三年戰爭結束，南北分裂延續至今。", narration_en: "Three years of war end — division continues to this day.", focus: ["un_dmz", "nk_dmz"], side: "both" },
            ],
          }),
        },
      ],
    },
    {
      slug: "mideast",
      title_zh: "以巴／中東戰爭",
      title_en: "ARAB-ISRAELI CONFLICTS",
      period: "1948–2000",
      intro: "中東衝突拆為四個小戰役，每圖聚焦耶路撒冷、西奈或加沙一帶。",
      warAnalysis: {
        military: "以巴衝突以常規戰（1948、1967、1973）與非常規抵抗（起義）交替；空軍與情報常決定初期優勢。",
        nationalPower: "以色列軍事現代化與美國支持；阿拉伯國家人口與資源優勢但政治分裂。",
        impact: "難民、占領區、恐怖主義與和平進程反覆；影響全球能源與地緣政治。",
      },
      battles: [
        {
          slug: "war-1948",
          title_zh: "第一次中東戰爭",
          title_en: "1948 WAR",
          blurb: "以色列建國與阿拉伯聯軍進攻",
          places: "耶路撒冷 · 特拉維夫",
          data: baseBattle("me-1948", "第一次中東戰爭", "1948 WAR", "1948年", geoBox(35.0, 31.8, 2.5, 2.0, 10), ME_F, [ME_AR, ME_IS], [1948, 5, 14], {
            lng: 35.21, lat: 31.77, dist: 620,
            narr_zh: "以色列宣布建國，阿拉伯五國聯軍進攻。",
            narr_en: "Israel declares independence — five Arab armies attack.",
            points: [
              { name_en: "Jerusalem", name_zh: "耶路撒冷", type: "city", lng: 35.21, lat: 31.77 },
              { name_en: "Tel Aviv", name_zh: "特拉維夫", type: "city", lng: 34.78, lat: 32.09 },
              { name_en: "Latrun", name_zh: "拉特倫", type: "fort", lng: 34.98, lat: 31.84 },
            ],
            units: [
              { id: "isr_48", faction: ME_IS, kind: "infantry", crest: "trident", cf: true, name_zh: "以色列國防軍", name_en: "IDF", track: [{ d: 1, lng: 34.78, lat: 32.09, s: 30000, st: "hold" }, { d: 100, lng: 35.21, lat: 31.77, s: 50000, st: "hold" }] },
              { id: "ar_48", faction: ME_AR, kind: "infantry", crest: "eagle", cf: true, name_zh: "阿拉伯聯軍", name_en: "Arab Armies", track: [{ d: 1, lng: 35.5, lat: 31.5, s: 60000, st: "attack" }, { d: 100, lng: 35.3, lat: 31.6, s: 40000, st: "retreat" }] },
            ],
            arrows: [{ d: 1, f: ME_AR, from: [35.5, 31.5], to: [34.78, 32.09], label: "聯軍進攻", kind: "attack" }],
            storyboard: [
              { day: 1, hold: 9, cam: cam(35.21, 31.77, 580), dateLabel: "1948年5月", title_zh: "建國戰爭", title_en: "1948 Arab-Israeli War", narration_zh: "以色列在獨立次日即遭鄰國圍攻。", narration_en: "Israel is attacked by neighbouring states the day after independence.", focus: ["isr_48", "ar_48"], side: "both" },
            ],
          }),
        },
        {
          slug: "six-day",
          title_zh: "六日戰爭",
          title_en: "SIX-DAY WAR 1967",
          blurb: "以色列先發制人，占領多方領土",
          places: "西奈 · 戈蘭高地 · 耶路撒冷",
          data: baseBattle("me-sixday", "六日戰爭", "SIX-DAY WAR", "1967年6月", geoBox(34.5, 31.5, 3.5, 3.0, 9), ME_F, [ME_AR, ME_IS], [1967, 6, 5], {
            lng: 34.5, lat: 31.5, dist: 750,
            narr_zh: "以色列六日內擊敗埃及、敘利亞、約旦。",
            narr_en: "Israel defeats Egypt, Syria and Jordan in six days.",
            points: [
              { name_en: "Jerusalem", name_zh: "耶路撒冷", type: "city", lng: 35.21, lat: 31.77 },
              { name_en: "Golan Heights", name_zh: "戈蘭高地", type: "fort", lng: 35.75, lat: 33.05 },
              { name_en: "Sinai", name_zh: "西奈半島", type: "region", lng: 33.5, lat: 29.5 },
            ],
            units: [
              { id: "isr_67", faction: ME_IS, kind: "infantry", crest: "trident", cf: true, name_zh: "以色列國防軍", name_en: "IDF", track: [{ d: 1, lng: 34.78, lat: 32.09, s: 50000, st: "attack" }, { d: 50, lng: 35.75, lat: 33.05, s: 60000, st: "attack" }, { d: 100, lng: 33.5, lat: 29.5, s: 70000, st: "hold" }] },
              { id: "ar_67", faction: ME_AR, kind: "infantry", crest: "eagle", cf: true, name_zh: "埃及敘利亞聯軍", name_en: "Egyptian-Syrian Forces", track: [{ d: 1, lng: 33.0, lat: 30.0, s: 80000, st: "hold" }, { d: 100, lng: 32.0, lat: 30.5, s: 30000, st: "retreat" }] },
            ],
            arrows: [
              { d: 20, f: ME_IS, from: [34.78, 32.09], to: [35.75, 33.05], label: "攻占戈蘭", kind: "attack" },
              { d: 40, f: ME_IS, from: [34.5, 31.5], to: [33.5, 29.5], label: "西奈攻勢", kind: "attack" },
            ],
            storyboard: [
              { day: 20, hold: 10, cam: cam(35.75, 33.05, 650), dateLabel: "1967年6月5–10日", title_zh: "六日戰爭", title_en: "Six-Day War", narration_zh: "以色列先發制人，占領西奈、戈蘭、西岸與加沙。", narration_en: "Pre-emptive strike — Israel seizes Sinai, Golan, West Bank and Gaza.", focus: ["isr_67"], side: "isr" },
            ],
          }),
        },
        {
          slug: "yom-kippur",
          title_zh: "贖罪日戰爭",
          title_en: "YOM KIPPUR 1973",
          blurb: "埃及敘利亞突襲西奈與戈蘭",
          places: "蘇伊士運河 · 戈蘭",
          data: baseBattle("me-yomkippur", "贖罪日戰爭", "YOM KIPPUR WAR", "1973年10月", geoBox(33.0, 30.5, 4.0, 3.5, 9), ME_F, [ME_AR, ME_IS], [1973, 10, 6], {
            lng: 33.0, lat: 30.5, dist: 800,
            narr_zh: "埃及敘利亞在贖罪日突襲，以軍初期受挫。",
            narr_en: "Egypt and Syria attack on Yom Kippur — Israel suffers early setbacks.",
            points: [
              { name_en: "Suez Canal", name_zh: "蘇伊士運河", type: "fort", lng: 32.35, lat: 30.45 },
              { name_en: "Golan Heights", name_zh: "戈蘭高地", type: "fort", lng: 35.75, lat: 33.05 },
              { name_en: "Sinai", name_zh: "西奈", type: "region", lng: 33.8, lat: 29.5 },
            ],
            units: [
              { id: "ar_73", faction: ME_AR, kind: "infantry", crest: "eagle", cf: true, name_zh: "埃及第二集團軍", name_en: "Egyptian 2nd Army", track: [{ d: 1, lng: 32.35, lat: 30.45, s: 90000, st: "attack" }, { d: 60, lng: 33.8, lat: 29.5, s: 80000, st: "hold" }, { d: 100, lng: 32.5, lat: 30.2, s: 50000, st: "retreat" }] },
              { id: "isr_73", faction: ME_IS, kind: "infantry", crest: "trident", cf: true, name_zh: "以色列國防軍", name_en: "IDF", track: [{ d: 1, lng: 34.0, lat: 31.0, s: 40000, st: "retreat" }, { d: 80, lng: 33.5, lat: 30.0, s: 70000, st: "attack" }, { d: 100, lng: 32.35, lat: 30.45, s: 75000, st: "hold" }] },
            ],
            arrows: [{ d: 1, f: ME_AR, from: [32.35, 30.45], to: [33.8, 29.5], label: "渡運河攻西奈", kind: "attack" }],
            storyboard: [
              { day: 1, hold: 9, cam: cam(32.35, 30.45, 680), dateLabel: "1973年10月6日", title_zh: "贖罪日突襲", title_en: "Yom Kippur Surprise Attack", narration_zh: "埃及軍隊渡過蘇伊士運河，突破巴列夫防線。", narration_en: "Egyptian forces cross the Suez Canal.", focus: ["ar_73"], side: "arab" },
              { day: 80, hold: 8, cam: cam(33.5, 30.0, 720), dateLabel: "1973年10月", title_zh: "以軍反擊", title_en: "Israeli Counter-offensive", narration_zh: "以軍在美援下反擊，雙方接受停火。", narration_en: "Israel counter-attacks with US support — ceasefire follows.", focus: ["isr_73"], side: "isr" },
            ],
          }),
        },
        {
          slug: "gaza-intifada",
          title_zh: "加沙與因提法達",
          title_en: "GAZA & INTIFADA",
          blurb: "1990年代和談與2000年起義",
          places: "加沙 · 約旦河西岸",
          data: baseBattle("me-gaza", "加沙與因提法達", "GAZA & INTIFADA", "1993–2000", geoBox(34.7, 31.7, 2.5, 2.0, 10), ME_F, [ME_AR, ME_IS], [1993, 9, 13], {
            lng: 34.47, lat: 31.5, dist: 620,
            narr_zh: "奧斯陸協議後，2000年爆發第二次因提法達。",
            narr_en: "After Oslo, the Second Intifada erupts in 2000.",
            points: [
              { name_en: "Gaza", name_zh: "加沙", type: "city", lng: 34.47, lat: 31.50 },
              { name_en: "West Bank", name_zh: "約旦河西岸", type: "region", lng: 35.30, lat: 31.95 },
              { name_en: "Jerusalem", name_zh: "耶路撒冷", type: "city", lng: 35.21, lat: 31.77 },
            ],
            units: [
              { id: "isr_gaza", faction: ME_IS, kind: "infantry", crest: "trident", cf: true, name_zh: "以色列國防軍", name_en: "IDF", track: [{ d: 1, lng: 34.78, lat: 32.09, s: 50000, st: "hold" }, { d: 100, lng: 34.47, lat: 31.5, s: 60000, st: "hold" }] },
              { id: "ar_gaza", faction: ME_AR, kind: "infantry", crest: "eagle", cf: true, name_zh: "巴勒斯坦武裝", name_en: "Palestinian Factions", track: [{ d: 1, lng: 34.47, lat: 31.5, s: 20000, st: "hold" }, { d: 80, lng: 35.3, lat: 31.95, s: 25000, st: "attack" }, { d: 100, lng: 34.47, lat: 31.5, s: 22000, st: "hold" }] },
            ],
            storyboard: [
              { day: 20, hold: 8, cam: cam(35.25, 32.5, 700), dateLabel: "1993年", title_zh: "奧斯陸協議", title_en: "Oslo Accords", narration_zh: "巴以秘密和談，確立自治政府框架。", narration_en: "Secret talks establish the Palestinian Authority framework.", focus: ["isr_gaza"], side: "isr" },
              { day: 90, hold: 9, cam: cam(34.47, 31.5, 550), dateLabel: "2000年", title_zh: "第二次因提法達", title_en: "Second Intifada", narration_zh: "加沙與西岸爆發大規模起義與衝突。", narration_en: "Major uprising and conflict in Gaza and the West Bank.", focus: ["ar_gaza"], side: "arab" },
            ],
          }),
        },
      ],
    },
    {
      slug: "balkans",
      title_zh: "巴爾幹種族衝突",
      title_en: "YUGOSLAV WARS",
      period: "1991–1999",
      intro: "南斯拉夫戰爭拆為四個小戰役，聚焦克羅地亞、波黑與科索沃局部。",
      warAnalysis: {
        military: "南斯拉夫解體後民族戰爭以圍城、炮擊、種族清洗與北約空襲為特徵；聯合國維和屢陷困境。",
        nationalPower: "塞族初期軍備優勢；克羅地亞軍事改革與北約介入改變平衡。",
        impact: "波黑複合國家、科索沃地位爭議、海牙戰罪審判；歐盟擴張與巴爾幹穩定議程。",
      },
      battles: [
        {
          slug: "vukovar",
          title_zh: "武科瓦爾圍城",
          title_en: "VUKOVAR 1991",
          blurb: "克羅地亞獨立戰爭慘烈一役",
          places: "武科瓦爾 · 薩格勒布",
          data: baseBattle("bk-vukovar", "武科瓦爾圍城", "VUKOVAR", "1991年", geoBox(19.0, 45.35, 2.0, 1.6, 11), BK_F, [BK_SR, BK_CO], [1991, 8, 25], {
            lng: 19.0, lat: 45.35, dist: 520,
            narr_zh: "塞族南斯拉夫軍圍攻武科瓦爾三個月。",
            narr_en: "JNA besieges Vukovar for three months.",
            points: [
              { name_en: "Vukovar", name_zh: "武科瓦爾", type: "city", lng: 19.00, lat: 45.35 },
              { name_en: "Osijek", name_zh: "奧西耶克", type: "city", lng: 18.69, lat: 45.55 },
            ],
            units: [
              { id: "sr_vuk", faction: BK_SR, kind: "infantry", crest: "eagle", cf: true, name_zh: "南斯拉夫人民軍", name_en: "JNA", track: [{ d: 1, lng: 19.3, lat: 45.5, s: 40000, st: "attack" }, { d: 80, lng: 19.0, lat: 45.35, s: 35000, st: "hold" }, { d: 100, lng: 19.0, lat: 45.35, s: 30000, st: "hold" }] },
              { id: "co_vuk", faction: BK_CO, kind: "infantry", crest: "anchor", cf: true, name_zh: "克羅地亞守軍", name_en: "Croatian Defenders", track: [{ d: 1, lng: 19.0, lat: 45.35, s: 15000, st: "hold" }, { d: 100, lng: 19.0, lat: 45.35, s: 2000, st: "dead" }] },
            ],
            hotspots: [{ a: 1, b: 100, lng: 19.0, lat: 45.35, kind: "firefight", i: 1 }],
            storyboard: [
              { day: 40, hold: 10, cam: cam(19.0, 45.35, 480), dateLabel: "1991年8–11月", title_zh: "武科瓦爾圍城", title_en: "Siege of Vukovar", narration_zh: "城市幾乎被夷平，象徵克羅地亞獨立戰爭的殘酷。", narration_en: "The city is nearly destroyed — a symbol of Croatia's war.", focus: ["sr_vuk", "co_vuk"], side: "both" },
            ],
          }),
        },
        {
          slug: "sarajevo",
          title_zh: "薩拉熱窩圍城",
          title_en: "SARAJEVO 1992–96",
          blurb: "波黑首都被圍超過三年",
          places: "薩拉熱窩 · 波斯尼亞",
          data: baseBattle("bk-sarajevo", "薩拉熱窩圍城", "SARAJEVO SIEGE", "1992–1996", geoBox(18.41, 43.86, 2.0, 1.6, 11), BK_F, [BK_SR, BK_CO], [1992, 4, 5], {
            lng: 18.41, lat: 43.86, dist: 550,
            narr_zh: "波黑首都被塞族部隊圍城逾三年。",
            narr_en: "Bosnia's capital is besieged for over three years.",
            points: [
              { name_en: "Sarajevo", name_zh: "薩拉熱窩", type: "city", lng: 18.41, lat: 43.86 },
              { name_en: "Mount Igman", name_zh: "伊格曼山", type: "peak", lng: 18.25, lat: 43.75 },
            ],
            units: [
              { id: "sr_sar", faction: BK_SR, kind: "infantry", crest: "eagle", cf: true, name_zh: "塞族部隊", name_en: "Serb Forces", track: [{ d: 1, lng: 18.6, lat: 44.0, s: 35000, st: "attack" }, { d: 100, lng: 18.45, lat: 43.88, s: 30000, st: "hold" }] },
              { id: "co_sar", faction: BK_CO, kind: "infantry", crest: "anchor", cf: true, name_zh: "波黑守軍", name_en: "Bosniak Defenders", track: [{ d: 1, lng: 18.41, lat: 43.86, s: 25000, st: "hold" }, { d: 100, lng: 18.41, lat: 43.86, s: 28000, st: "hold" }] },
            ],
            hotspots: [{ a: 1, b: 100, lng: 18.41, lat: 43.86, kind: "artillery", i: 1 }],
            weather: [{ d: 1, night: 0.25, fog: 0.2, rain: 0.15, smoke: 0.7, zh: "薩拉熱窩圍城", en: "Siege of Sarajevo" }],
            storyboard: [
              { day: 50, hold: 10, cam: cam(18.41, 43.86, 500), dateLabel: "1992–1996", title_zh: "薩拉熱窩圍城", title_en: "Siege of Sarajevo", narration_zh: "狙擊與炮擊令平民死傷慘重。", narration_en: "Snipers and shelling kill thousands of civilians.", focus: ["sr_sar", "co_sar"], side: "both" },
            ],
          }),
        },
        {
          slug: "srebrenica",
          title_zh: "斯雷布雷尼察",
          title_en: "SREBRENICA 1995",
          blurb: "聯合國安全區大屠殺",
          places: "斯雷布雷尼察 · 波黑東部",
          data: baseBattle("bk-srebrenica", "斯雷布雷尼察", "SREBRENICA", "1995年7月", geoBox(19.29, 44.1, 2.0, 1.6, 11), BK_F, [BK_SR, BK_CO], [1995, 7, 11], {
            lng: 19.29, lat: 44.1, dist: 520,
            narr_zh: "波塞族部隊攻占聯合國安全區，逾八千男性被殺。",
            narr_en: "Bosnian Serb forces seize a UN safe area — over 8,000 men and boys killed.",
            points: [
              { name_en: "Srebrenica", name_zh: "斯雷布雷尼察", type: "town", lng: 19.29, lat: 44.10 },
              { name_en: "Potočari", name_zh: "波托查里", type: "town", lng: 19.22, lat: 44.09 },
            ],
            units: [
              { id: "sr_sreb", faction: BK_SR, kind: "infantry", crest: "eagle", cf: true, name_zh: "波塞族部隊", name_en: "Bosnian Serb Army", track: [{ d: 1, lng: 19.5, lat: 44.2, s: 20000, st: "attack" }, { d: 50, lng: 19.29, lat: 44.1, s: 18000, st: "hold" }] },
              { id: "co_sreb", faction: BK_CO, kind: "infantry", crest: "anchor", cf: true, name_zh: "穆斯林守軍／難民", name_en: "Muslim Defenders", track: [{ d: 1, lng: 19.29, lat: 44.1, s: 8000, st: "hold" }, { d: 50, lng: 19.29, lat: 44.1, s: 1000, st: "dead" }] },
            ],
            storyboard: [
              { day: 30, hold: 10, cam: cam(19.29, 44.1, 480), dateLabel: "1995年7月11–22日", title_zh: "斯雷布雷尼察大屠殺", title_en: "Srebrenica Massacre", narration_zh: "國際法庭裁定為種族滅絕罪行。", narration_en: "International courts rule it genocide.", focus: ["sr_sreb"], side: "sr" },
            ],
          }),
        },
        {
          slug: "kosovo",
          title_zh: "科索沃戰爭",
          title_en: "KOSOVO 1998–99",
          blurb: "北約轟炸與塞軍撤離",
          places: "普里什蒂納 · 貝爾格萊德",
          data: baseBattle("bk-kosovo", "科索沃戰爭", "KOSOVO WAR", "1998–1999", geoBox(21.0, 42.6, 2.5, 2.0, 10), BK_F, [BK_SR, BK_CO], [1998, 3, 5], {
            lng: 21.17, lat: 42.66, dist: 620,
            narr_zh: "塞族鎮壓科索沃阿族，北約轟炸塞爾維亞。",
            narr_en: "Serb crackdown in Kosovo leads to NATO bombing.",
            points: [
              { name_en: "Pristina", name_zh: "普里什蒂納", type: "city", lng: 21.17, lat: 42.66 },
              { name_en: "Belgrade", name_zh: "貝爾格萊德", type: "city", lng: 20.46, lat: 44.79 },
              { name_en: "Peć", name_zh: "佩奇", type: "town", lng: 20.29, lat: 42.66 },
            ],
            units: [
              { id: "sr_kos", faction: BK_SR, kind: "infantry", crest: "eagle", cf: true, name_zh: "塞爾維亞軍警", name_en: "Serb Security Forces", track: [{ d: 1, lng: 21.17, lat: 42.66, s: 35000, st: "attack" }, { d: 80, lng: 20.46, lat: 44.79, s: 30000, st: "hold" }, { d: 100, lng: 21.0, lat: 42.6, s: 5000, st: "retreat" }] },
              { id: "co_kos", faction: BK_CO, kind: "infantry", crest: "anchor", cf: true, name_zh: "科索沃解放軍", name_en: "KLA", track: [{ d: 1, lng: 21.0, lat: 42.6, s: 15000, st: "hold" }, { d: 100, lng: 21.17, lat: 42.66, s: 20000, st: "hold" }] },
            ],
            hotspots: [{ a: 70, b: 95, lng: 20.46, lat: 44.79, kind: "air", i: 0.9 }],
            storyboard: [
              { day: 40, hold: 9, cam: cam(21.17, 42.66, 580), dateLabel: "1998–1999", title_zh: "科索沃危機", title_en: "Kosovo Crisis", narration_zh: "阿族難民潮與塞族鎮壓引發國際介入。", narration_en: "Refugee crisis and Serb crackdown prompt international action.", focus: ["sr_kos", "co_kos"], side: "both" },
              { day: 85, hold: 8, cam: cam(20.46, 44.79, 700), dateLabel: "1999年3–6月", title_zh: "北約轟炸", title_en: "NATO Bombing", narration_zh: "北約空襲迫使塞軍從科索沃撤離。", narration_en: "NATO air campaign forces Serb withdrawal.", focus: ["sr_kos"], side: "sr" },
            ],
          }),
        },
      ],
    }
  );
};
