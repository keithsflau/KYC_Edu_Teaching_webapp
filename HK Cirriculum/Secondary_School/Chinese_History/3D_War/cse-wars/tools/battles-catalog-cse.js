/**
 * HKDSE Chinese History · battles catalog (8 wars, 18 battles).
 * Used by tools/scaffold-battles.js — buildCatalog(ctx) returns the CATALOG array.
 */
function fac(aId, bId, aZh, bZh, aEn, bEn) {
  return {
    [aId]: { main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a, css: "#b71c1c", label_zh: aZh, label_en: aEn, emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2" },
    [bId]: { main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a, css: "#1565c0", label_zh: bZh, label_en: bEn, emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff" },
  };
}

function buildCatalog(ctx) {
  const { geoBox, cam, baseBattle, FAC } = ctx;
  const redBlue = (FAC && FAC.redBlue) ? FAC.redBlue : fac;

  function mk(id, title_zh, title_en, subtitle, lng, lat, dims, fObj, fOrder, startDate, o) {
    const [dLng, dLat, Z] = dims;
    const [a, b] = fOrder;
    const dist = o.dist || 650;
    return baseBattle(id, title_zh, title_en, subtitle, geoBox(lng, lat, dLng, dLat, Z), fObj, fOrder, startDate, {
      lng, lat, dist,
      narr_zh: o.narr_zh,
      narr_en: o.narr_en,
      outro_zh: o.outro_zh || `本戰役為 DSE 中史重要考點：${o.impact || ""}`,
      outro_en: o.outro_en || "A key HKDSE Chinese History topic.",
      noteSummary: o.noteSummary || `${title_zh} — DSE 中史互動戰役地圖（教學示意）。`,
      analysisImpact: o.impact,
      points: o.points || [],
      regions: o.regions || [],
      lines: o.lines || [],
      units: o.units || [],
      arrows: o.arrows || [],
      fronts: o.fronts || [],
      hotspots: o.hotspots || [],
      weather: o.weather,
      storyboard: o.storyboard || [],
    });
  }

  return [
    {
      slug: "qin-han",
      title_zh: "秦漢",
      title_en: "QIN & HAN",
      period: "前3世紀—前1世紀",
      intro: "秦漢之際兩場 DSE 核心戰役：垓下之戰終結楚漢相爭，漠北之戰奠定漢朝北疆與絲路安全。",
      warAnalysis: {
        military: "秦末群雄並起，劉邦以靈活戰略與關中根基勝出；漢初以騎射改革與大規模遠征反擊匈奴。",
        nationalPower: "楚漢之爭考驗關中農業與巴蜀後勤；武帝時期國力鼎盛，方支撐漠北遠征。",
        impact: "漢朝取代秦朝統治模式，奠定兩千年帝制框架；北擊匈奴保障絲綢之路，塑造漢民族認同。",
      },
      battles: [
        {
          slug: "gaixia",
          title_zh: "垓下之戰",
          title_en: "GAIXIA 202 BCE",
          blurb: "楚漢決戰，項羽兵敗",
          places: "垓下 · 安徽靈璧一帶",
          data: (() => {
            const F = redBlue("chu", "han", "項羽（楚）", "劉邦（漢）", "Xiang Yu (Chu)", "Liu Bang (Han)");
            return mk("cse-gaixia", "垓下之戰", "BATTLE OF GAIXIA", "前202年", 117.2, 33.6, [2.2, 1.8, 10], F, ["chu", "han"], [202, 1, 1], {
              dist: 620,
              narr_zh: "劉邦聯合韓信、彭越圍困項羽於垓下。",
              narr_en: "Liu Bang and allies encircle Xiang Yu at Gaixia.",
              impact: "楚漢相爭結束，項羽兵敗自刎，劉邦勝出並建立漢朝",
              points: [
                { name_zh: "垓下", name_en: "Gaixia", type: "fort", lng: 117.2, lat: 33.6 },
                { name_zh: "宿州", name_en: "Suzhou", type: "city", lng: 116.98, lat: 33.64 },
                { name_zh: "靈璧", name_en: "Lingbi", type: "town", lng: 117.55, lat: 33.55 },
              ],
              units: [
                { id: "han_gaixia", faction: "han", kind: "infantry", crest: "eagle", cf: true, name_zh: "漢軍主力", name_en: "Han Main Force", track: [{ d: 1, lng: 117.0, lat: 33.8, s: 60000, st: "march" }, { d: 50, lng: 117.2, lat: 33.6, s: 80000, st: "attack" }, { d: 100, lng: 117.2, lat: 33.6, s: 85000, st: "hold" }] },
                { id: "chu_gaixia", faction: "chu", kind: "infantry", crest: "wings", cf: true, name_zh: "楚軍", name_en: "Chu Army", track: [{ d: 1, lng: 117.2, lat: 33.6, s: 100000, st: "hold" }, { d: 70, lng: 117.18, lat: 33.58, s: 30000, st: "retreat" }, { d: 100, lng: 117.2, lat: 33.6, s: 0, st: "dead" }] },
              ],
              arrows: [
                { d: 20, f: "han", from: [117.0, 33.8], to: [117.2, 33.6], label: "漢軍合圍", kind: "attack" },
                { d: 80, f: "chu", from: [117.2, 33.6], to: [117.15, 33.55], label: "項羽突圍", kind: "retreat" },
              ],
              hotspots: [{ a: 30, b: 90, lng: 117.2, lat: 33.6, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(117.2, 33.6, 580), dateLabel: "前202年", title_zh: "垓下合圍", title_en: "Encirclement at Gaixia", narration_zh: "韓信、彭越與劉邦聯手，楚軍陷入重圍。", narration_en: "Han forces encircle the Chu army.", focus: ["han_gaixia", "chu_gaixia"], side: "both" },
                { day: 90, hold: 10, cam: cam(117.18, 33.58, 520), dateLabel: "前202年冬", title_zh: "四面楚歌", title_en: "Songs of Chu on all sides", narration_zh: "士氣瓦解，項羽突圍失敗，自刎烏江。", narration_en: "Morale collapses — Xiang Yu fails to break out and takes his life.", focus: ["chu_gaixia"], side: "chu" },
              ],
            });
          })(),
        },
        {
          slug: "mobei",
          title_zh: "漠北之戰",
          title_en: "MOBEI 119 BCE",
          blurb: "衛青霍去病大破匈奴",
          places: "漠北草原 · 狼居胥山",
          data: (() => {
            const F = redBlue("han", "xiongnu", "漢軍", "匈奴", "Han Army", "Xiongnu");
            return mk("cse-mobei", "漠北之戰", "BATTLE OF MOBEI", "前119年", 110, 43, [5.0, 4.0, 8], F, ["han", "xiongnu"], [119, 1, 1], {
              dist: 780,
              narr_zh: "漢武帝遣衛青、霍去病深入漠北，決戰匈奴主力。",
              narr_en: "Emperor Wu sends Wei Qing and Huo Qubing deep into the northern steppe.",
              impact: "漢武帝遣衛青、霍去病擊潰匈奴，保障絲綢之路及邊疆穩定",
              points: [
                { name_zh: "漠北", name_en: "Mobei Steppe", type: "region", lng: 110, lat: 43 },
                { name_zh: "狼居胥山", name_en: "Langjuxu", type: "peak", lng: 112.5, lat: 44.2, h: 1 },
                { name_zh: "單于庭", name_en: "Xiongnu Court", type: "town", lng: 108, lat: 42.5 },
              ],
              units: [
                { id: "han_mobei", faction: "han", kind: "infantry", crest: "wings", cf: true, name_zh: "漢軍騎兵", name_en: "Han Cavalry", track: [{ d: 1, lng: 108, lat: 41, s: 70000, st: "march" }, { d: 50, lng: 110, lat: 43, s: 90000, st: "attack" }, { d: 100, lng: 112.5, lat: 44.2, s: 75000, st: "hold" }] },
                { id: "xiongnu_mobei", faction: "xiongnu", kind: "infantry", crest: "bear", cf: true, name_zh: "匈奴主力", name_en: "Xiongnu Main Force", track: [{ d: 1, lng: 111, lat: 44, s: 80000, st: "hold" }, { d: 60, lng: 110, lat: 43, s: 40000, st: "retreat" }, { d: 100, lng: 108, lat: 42, s: 15000, st: "dead" }] },
              ],
              arrows: [{ d: 40, f: "han", from: [108, 41], to: [110, 43], label: "霍去病遠征", kind: "attack" }],
              hotspots: [{ a: 35, b: 85, lng: 110, lat: 43, kind: "firefight", i: 0.9 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(108, 41, 720), dateLabel: "前119年春", title_zh: "出擊漠北", title_en: "March into Mobei", narration_zh: "漢軍分路出擊，直搗匈奴王庭。", narration_en: "Han columns strike deep into Xiongnu territory.", focus: ["han_mobei"], side: "han" },
                { day: 70, hold: 10, cam: cam(110, 43, 680), dateLabel: "前119年夏", title_zh: "大破匈奴", title_en: "Crushing victory", narration_zh: "匈奴單于北遁，漠南無王庭，邊疆得以安寧。", narration_en: "The Xiongnu are shattered — the northern frontier is secured.", focus: ["han_mobei", "xiongnu_mobei"], side: "both" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "weijin",
      title_zh: "魏晉南北朝",
      title_en: "WEI, JIN & NORTH–SOUTH",
      period: "3世紀—6世紀",
      intro: "東漢末年至南北朝，三場 DSE 名戰：官渡、赤壁奠定三國格局，淝水維持南北對峙。",
      warAnalysis: {
        military: "北方騎兵與南方水軍各擅勝場；聯盟作戰、火攻與士氣成為關鍵。",
        nationalPower: "曹魏掌控中原資源；東晉倚長江天險；前秦一度統一北方卻未能征服江南。",
        impact: "三國鼎立與南北分裂延續數百年，影響民族融合與文化南遷。",
      },
      battles: [
        {
          slug: "guandu",
          title_zh: "官渡之戰",
          title_en: "GUANDU 200",
          blurb: "曹操以少勝多破袁紹",
          places: "官渡 · 河南中牟",
          data: (() => {
            const F = redBlue("cao", "yuan", "曹操", "袁紹", "Cao Cao", "Yuan Shao");
            return mk("cse-guandu", "官渡之戰", "BATTLE OF GUANDU", "200年", 113.9, 34.7, [2.0, 1.6, 10], F, ["cao", "yuan"], [200, 1, 1], {
              dist: 600,
              narr_zh: "曹操與袁紹決戰官渡，以奇襲烏巢扭轉戰局。",
              narr_en: "Cao Cao defeats Yuan Shao at Guandu after the raid on Wuchao.",
              impact: "曹操以少勝多擊敗袁紹，奠定統一北方基礎",
              points: [
                { name_zh: "官渡", name_en: "Guandu", type: "fort", lng: 113.9, lat: 34.7 },
                { name_zh: "烏巢", name_en: "Wuchao", type: "town", lng: 114.2, lat: 34.85 },
                { name_zh: "許昌", name_en: "Xuchang", type: "city", lng: 113.85, lat: 34.04 },
              ],
              units: [
                { id: "cao_guandu", faction: "cao", kind: "infantry", crest: "eagle", cf: true, name_zh: "曹軍", name_en: "Cao Army", track: [{ d: 1, lng: 113.85, lat: 34.5, s: 40000, st: "hold" }, { d: 60, lng: 113.9, lat: 34.7, s: 55000, st: "attack" }, { d: 100, lng: 113.9, lat: 34.7, s: 60000, st: "hold" }] },
                { id: "yuan_guandu", faction: "yuan", kind: "infantry", crest: "wheat", cf: true, name_zh: "袁軍", name_en: "Yuan Army", track: [{ d: 1, lng: 114.1, lat: 34.8, s: 100000, st: "attack" }, { d: 70, lng: 113.9, lat: 34.7, s: 30000, st: "retreat" }, { d: 100, lng: 114.3, lat: 35, s: 10000, st: "dead" }] },
              ],
              arrows: [
                { d: 30, f: "yuan", from: [114.1, 34.8], to: [113.9, 34.7], label: "袁紹南下", kind: "attack" },
                { d: 65, f: "cao", from: [113.85, 34.5], to: [114.2, 34.85], label: "奇襲烏巢", kind: "attack" },
              ],
              hotspots: [{ a: 40, b: 90, lng: 113.9, lat: 34.7, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 30, hold: 9, cam: cam(113.9, 34.7, 560), dateLabel: "200年", title_zh: "官渡對峙", title_en: "Standoff at Guandu", narration_zh: "袁紹兵多將廣，曹操作戰僵持。", narration_en: "Yuan Shao's larger force presses Cao Cao.", focus: ["yuan_guandu", "cao_guandu"], side: "both" },
                { day: 80, hold: 10, cam: cam(114.2, 34.85, 500), dateLabel: "200年冬", title_zh: "烏巢之勝", title_en: "Victory at Wuchao", narration_zh: "糧道被斷，袁軍潰敗，曹操統一北方基礎奠定。", narration_en: "Supply lines cut — Yuan collapses; Cao unifies the north.", focus: ["cao_guandu"], side: "cao" },
              ],
            });
          })(),
        },
        {
          slug: "chibi",
          title_zh: "赤壁之戰",
          title_en: "RED CLIFFS 208",
          blurb: "孫劉聯軍火攻大破曹操",
          places: "赤壁 · 長江中游",
          data: (() => {
            const F = redBlue("sun_liu", "cao", "孫劉聯軍", "曹操", "Sun–Liu Alliance", "Cao Cao");
            return mk("cse-chibi", "赤壁之戰", "BATTLE OF RED CLIFFS", "208年", 113.9, 29.7, [2.5, 2.0, 10], F, ["sun_liu", "cao"], [208, 1, 1], {
              dist: 640,
              narr_zh: "曹操南下，周瑜、諸葛亮以火攻大破曹軍水師。",
              narr_en: "The Sun–Liu alliance defeats Cao Cao's fleet with fire ships.",
              impact: "孫劉聯軍大敗曹操，阻斷曹操南下，奠定三國鼎立局面",
              points: [
                { name_zh: "赤壁", name_en: "Red Cliffs", type: "bay", lng: 113.9, lat: 29.7 },
                { name_zh: "江陵", name_en: "Jiangling", type: "city", lng: 112.2, lat: 30.35 },
                { name_zh: "夏口", name_en: "Xiakou", type: "fort", lng: 114.3, lat: 30.58 },
              ],
              units: [
                { id: "sunliu_chibi", faction: "sun_liu", kind: "infantry", crest: "anchor", cf: true, name_zh: "吳蜀聯軍水師", name_en: "Allied Fleet", track: [{ d: 1, lng: 114.2, lat: 30.2, s: 50000, st: "hold" }, { d: 50, lng: 113.9, lat: 29.7, s: 65000, st: "attack" }, { d: 100, lng: 113.9, lat: 29.7, s: 60000, st: "hold" }] },
                { id: "cao_chibi", faction: "cao", kind: "infantry", crest: "eagle", cf: true, name_zh: "曹軍水師", name_en: "Cao Fleet", track: [{ d: 1, lng: 113.5, lat: 29.9, s: 200000, st: "attack" }, { d: 55, lng: 113.9, lat: 29.7, s: 80000, st: "retreat" }, { d: 100, lng: 113.2, lat: 30.5, s: 40000, st: "retreat" }] },
              ],
              arrows: [{ d: 45, f: "sun_liu", from: [114.2, 30.2], to: [113.9, 29.7], label: "火攻連環船", kind: "attack" }],
              hotspots: [{ a: 40, b: 80, lng: 113.9, lat: 29.7, kind: "naval", i: 1.2 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(113.7, 29.85, 600), dateLabel: "208年冬", title_zh: "曹操南下", title_en: "Cao Cao advances south", narration_zh: "曹軍順江而下，聲勢浩大。", narration_en: "Cao Cao's army moves down the Yangtze.", focus: ["cao_chibi"], side: "cao" },
                { day: 55, hold: 10, cam: cam(113.9, 29.7, 550), dateLabel: "208年冬", title_zh: "火燒連環船", title_en: "Fire attack on the fleet", narration_zh: "東南風起，火攻大破曹軍，三國鼎立之勢成形。", narration_en: "Fire ships destroy Cao's fleet — the Three Kingdoms era begins.", focus: ["sunliu_chibi", "cao_chibi"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "feishui",
          title_zh: "淝水之戰",
          title_en: "FEISHUI 383",
          blurb: "東晉以少勝多破前秦",
          places: "淝水 · 安徽壽春",
          data: (() => {
            const F = redBlue("eastern_jin", "former_qin", "東晉", "前秦", "Eastern Jin", "Former Qin");
            return mk("cse-feishui", "淝水之戰", "BATTLE OF FEISHUI", "383年", 117.28, 31.86, [2.2, 1.8, 10], F, ["eastern_jin", "former_qin"], [383, 1, 1], {
              dist: 610,
              narr_zh: "苻堅率百萬大軍南下，東晉謝玄軍於淝水大敗前秦。",
              narr_en: "Fu Jian's massive army is routed by Eastern Jin at the Fei River.",
              impact: "東晉擊敗前秦，維持南北對峙，阻延了北方政權統一天下",
              points: [
                { name_zh: "淝水", name_en: "Fei River", type: "town", lng: 117.28, lat: 31.86 },
                { name_zh: "壽春", name_en: "Shouchun", type: "city", lng: 116.78, lat: 32.58 },
                { name_zh: "建康", name_en: "Jiankang", type: "city", lng: 118.78, lat: 32.06 },
              ],
              units: [
                { id: "jin_feishui", faction: "eastern_jin", kind: "infantry", crest: "anchor", cf: true, name_zh: "北府兵", name_en: "Northern Garrison", track: [{ d: 1, lng: 117.0, lat: 32.0, s: 80000, st: "hold" }, { d: 55, lng: 117.28, lat: 31.86, s: 90000, st: "attack" }, { d: 100, lng: 117.28, lat: 31.86, s: 85000, st: "hold" }] },
                { id: "qin_feishui", faction: "former_qin", kind: "infantry", crest: "wheat", cf: true, name_zh: "前秦大軍", name_en: "Former Qin Army", track: [{ d: 1, lng: 117.5, lat: 32.2, s: 200000, st: "attack" }, { d: 60, lng: 117.28, lat: 31.86, s: 60000, st: "retreat" }, { d: 100, lng: 117.8, lat: 32.5, s: 20000, st: "dead" }] },
              ],
              arrows: [{ d: 50, f: "eastern_jin", from: [117.0, 32.0], to: [117.28, 31.86], label: "淝水半渡而擊", kind: "attack" }],
              hotspots: [{ a: 45, b: 85, lng: 117.28, lat: 31.86, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 25, hold: 9, cam: cam(117.4, 32.1, 580), dateLabel: "383年", title_zh: "苻堅南下", title_en: "Fu Jian advances", narration_zh: "前秦號稱百萬之師，直逼東晉。", narration_en: "Former Qin claims a million men marching south.", focus: ["qin_feishui"], side: "former_qin" },
                { day: 70, hold: 10, cam: cam(117.28, 31.86, 540), dateLabel: "383年11月", title_zh: "淝水大敗", title_en: "Rout at Feishui", narration_zh: "「風聲鶴唳，草木皆兵」——前秦潰敗，南北對峙延續。", narration_en: "Former Qin collapses — north–south division continues.", focus: ["jin_feishui", "qin_feishui"], side: "both" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "sui-tang",
      title_zh: "隋唐",
      title_en: "SUI & TANG",
      period: "6世紀—9世紀",
      intro: "安史之亂為 DSE 重點：盛唐由盛轉衰的轉捩點，藩鎮割據由此加劇。",
      warAnalysis: {
        military: "府兵制瓦解後仰賴節度使私兵；安祿山以范陽精銳南下，唐廷倚賴郭子儀、李光弼平叛。",
        nationalPower: "開元盛世國力充沛，但邊將權重與中央腐化埋下隱患。",
        impact: "唐朝中央權威衰落，藩鎮與宦官專權加劇，影響後世政治格局。",
      },
      battles: [
        {
          slug: "anshi",
          title_zh: "安史之亂",
          title_en: "AN LUSHAN REBELLION",
          blurb: "安祿山叛亂，盛唐轉衰",
          places: "范陽 · 潼關 · 長安",
          data: (() => {
            const F = redBlue("tang", "rebel", "唐軍", "安史叛軍", "Tang Army", "An–Shi Rebels");
            return mk("cse-anshi", "安史之亂", "AN LUSHAN REBELLION", "755–763年", 108.94, 34.26, [4.0, 3.2, 9], F, ["tang", "rebel"], [755, 12, 16], {
              dist: 720,
              narr_zh: "安祿山自范陽起兵，攻陷洛陽、長安，唐室西逃。",
              narr_en: "An Lushan rebels from Fanyang and captures Luoyang and Chang'an.",
              impact: "唐朝由盛轉衰的絕對轉捩點，直接引發後期的藩鎮割據",
              points: [
                { name_zh: "長安", name_en: "Chang'an", type: "city", lng: 108.94, lat: 34.26 },
                { name_zh: "潼關", name_en: "Tong Pass", type: "fort", lng: 110.24, lat: 34.54 },
                { name_zh: "洛陽", name_en: "Luoyang", type: "city", lng: 112.45, lat: 34.62 },
              ],
              units: [
                { id: "rebel_anshi", faction: "rebel", kind: "infantry", crest: "bear", cf: true, name_zh: "安史叛軍", name_en: "Rebel Army", track: [{ d: 1, lng: 116.4, lat: 39.9, s: 150000, st: "attack" }, { d: 40, lng: 112.45, lat: 34.62, s: 120000, st: "attack" }, { d: 80, lng: 108.94, lat: 34.26, s: 100000, st: "hold" }] },
                { id: "tang_anshi", faction: "tang", kind: "infantry", crest: "eagle", cf: true, name_zh: "唐軍", name_en: "Tang Army", track: [{ d: 1, lng: 108.94, lat: 34.26, s: 80000, st: "hold" }, { d: 50, lng: 107.5, lat: 33.8, s: 60000, st: "retreat" }, { d: 100, lng: 108.94, lat: 34.26, s: 90000, st: "attack" }] },
              ],
              arrows: [
                { d: 15, f: "rebel", from: [116.4, 39.9], to: [112.45, 34.62], label: "安祿山南下", kind: "attack" },
                { d: 85, f: "tang", from: [107.5, 33.8], to: [108.94, 34.26], label: "收復兩京", kind: "attack" },
              ],
              hotspots: [{ a: 20, b: 95, lng: 108.94, lat: 34.26, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 25, hold: 9, cam: cam(112.45, 34.62, 650), dateLabel: "755年", title_zh: "范陽起兵", title_en: "Rebellion begins", narration_zh: "安祿山以「清君側」為名起兵，迅速攻陷洛陽。", narration_en: "An Lushan rises and captures Luoyang.", focus: ["rebel_anshi"], side: "rebel" },
                { day: 90, hold: 10, cam: cam(108.94, 34.26, 600), dateLabel: "763年", title_zh: "亂平藩興", title_en: "Rebellion ends, warlords rise", narration_zh: "叛亂雖平，中央權威大損，藩鎮割據加劇。", narration_en: "Rebellion suppressed — but Tang central power never recovers.", focus: ["tang_anshi"], side: "tang" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "song-yuan",
      title_zh: "宋元",
      title_en: "SONG & YUAN",
      period: "13世紀",
      intro: "崖山海戰為南宋滅亡最後一役，標誌元朝統一全國。",
      warAnalysis: {
        military: "元軍水陸並進，以蒙古騎兵配合漢軍水師；南宋倚仗水師與海岸防線。",
        nationalPower: "元朝整合北方與西域資源；南宋國力枯竭，流亡朝廷難以持久。",
        impact: "元朝統一全國，結束宋遼夏金並立局面，開啟元代統治。",
      },
      battles: [
        {
          slug: "yamen",
          title_zh: "崖山海戰",
          title_en: "YAMEN 1279",
          blurb: "南宋最後一戰，宋亡",
          places: "崖山 · 珠江口外海",
          data: (() => {
            const F = redBlue("song", "yuan", "南宋水師", "元軍", "Song Navy", "Yuan Forces");
            return mk("cse-yamen", "崖山海戰", "BATTLE OF YAMEN", "1279年", 113.05, 22.28, [2.0, 1.6, 11], F, ["song", "yuan"], [1279, 3, 19], {
              dist: 580,
              narr_zh: "元軍張弘範圍攻崖山，南宋覆滅，陸秀夫背帝昺投海。",
              narr_en: "Yuan forces destroy the Song fleet at Yamen — the dynasty ends.",
              impact: "南宋水師全軍覆沒，陸秀夫背帝昺投海，元朝徹底統一天下",
              points: [
                { name_zh: "崖山", name_en: "Yamen", type: "bay", lng: 113.05, lat: 22.28 },
                { name_zh: "新會", name_en: "Xinhui", type: "town", lng: 113.03, lat: 22.52 },
                { name_zh: "珠江口", name_en: "Pearl Estuary", type: "bay", lng: 113.6, lat: 22.45 },
              ],
              units: [
                { id: "song_yamen", faction: "song", kind: "infantry", crest: "anchor", cf: true, name_zh: "南宋流亡朝廷水師", name_en: "Song Imperial Fleet", track: [{ d: 1, lng: 113.05, lat: 22.28, s: 100000, st: "hold" }, { d: 70, lng: 113.05, lat: 22.28, s: 20000, st: "retreat" }, { d: 100, lng: 113.05, lat: 22.28, s: 0, st: "dead" }] },
                { id: "yuan_yamen", faction: "yuan", kind: "infantry", crest: "wings", cf: true, name_zh: "元軍水陸", name_en: "Yuan Combined Force", track: [{ d: 1, lng: 113.4, lat: 22.5, s: 120000, st: "attack" }, { d: 60, lng: 113.05, lat: 22.28, s: 130000, st: "attack" }, { d: 100, lng: 113.05, lat: 22.28, s: 125000, st: "hold" }] },
              ],
              arrows: [{ d: 40, f: "yuan", from: [113.4, 22.5], to: [113.05, 22.28], label: "元軍合圍", kind: "attack" }],
              hotspots: [{ a: 35, b: 95, lng: 113.05, lat: 22.28, kind: "naval", i: 1.1 }],
              storyboard: [
                { day: 30, hold: 9, cam: cam(113.2, 22.38, 540), dateLabel: "1279年", title_zh: "崖山圍困", title_en: "Siege at Yamen", narration_zh: "南宋流亡朝廷退守崖山，元軍水陸夾擊。", narration_en: "The Song court is trapped at Yamen.", focus: ["song_yamen", "yuan_yamen"], side: "both" },
                { day: 85, hold: 10, cam: cam(113.05, 22.28, 500), dateLabel: "1279年3月19日", title_zh: "宋亡", title_en: "Fall of Song", narration_zh: "陸秀夫背帝昺投海，南宋滅亡，元朝統一天下。", narration_en: "Lu Xiufu leaps into the sea with the boy emperor — Song falls.", focus: ["song_yamen"], side: "song" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "ming-qing",
      title_zh: "明清",
      title_en: "MING & QING",
      period: "15世紀—17世紀",
      intro: "土木堡與薩爾滸兩役標誌明朝由攻轉守，遼東戰略主動權落入後金（清）手中。",
      warAnalysis: {
        military: "明軍混合步兵與神機營火器；蒙古瓦剌與後金騎兵機動靈活，善用情報與地形。",
        nationalPower: "明英宗時期國力仍盛，但土木堡慘敗暴露指揮失誤；萬曆後遼東軍備廢弛。",
        impact: "明朝國勢轉衰，後金崛起為清，最終入主中原。",
      },
      battles: [
        {
          slug: "tumu",
          title_zh: "土木堡之變",
          title_en: "TUMU 1449",
          blurb: "明英宗被俘，國勢轉折",
          places: "土木堡 · 懷來",
          data: (() => {
            const F = redBlue("ming", "oirat", "明軍", "瓦剌", "Ming Army", "Oirat Mongols");
            return mk("cse-tumu", "土木堡之變", "TUMU CRISIS", "1449年", 115.25, 40.45, [2.2, 1.8, 10], F, ["ming", "oirat"], [1449, 8, 1], {
              dist: 620,
              narr_zh: "明英宗御駕親征，在土木堡遭瓦剌大軍圍困。",
              narr_en: "The Zhengtong Emperor is captured when Oirat forces trap the Ming army.",
              impact: "明英宗親征被瓦剌俘虜，明朝國勢由盛轉衰，轉取守勢",
              points: [
                { name_zh: "土木堡", name_en: "Tumu Fort", type: "fort", lng: 115.25, lat: 40.45 },
                { name_zh: "懷來", name_en: "Huailai", type: "town", lng: 115.52, lat: 40.41 },
                { name_zh: "宣府", name_en: "Xuanfu", type: "city", lng: 115.03, lat: 40.61 },
              ],
              units: [
                { id: "ming_tumu", faction: "ming", kind: "command", crest: "eagle", cf: true, name_zh: "明英宗親征軍", name_en: "Imperial Ming Force", track: [{ d: 1, lng: 115.03, lat: 40.61, s: 50000, st: "march" }, { d: 40, lng: 115.25, lat: 40.45, s: 45000, st: "hold" }, { d: 100, lng: 115.25, lat: 40.45, s: 5000, st: "dead" }] },
                { id: "oirat_tumu", faction: "oirat", kind: "infantry", crest: "wings", cf: true, name_zh: "也先瓦剌軍", name_en: "Esen's Oirat Army", track: [{ d: 1, lng: 115.6, lat: 40.7, s: 40000, st: "march" }, { d: 45, lng: 115.25, lat: 40.45, s: 60000, st: "attack" }, { d: 100, lng: 115.25, lat: 40.45, s: 55000, st: "hold" }] },
              ],
              arrows: [{ d: 35, f: "oirat", from: [115.6, 40.7], to: [115.25, 40.45], label: "瓦剌合圍", kind: "attack" }],
              hotspots: [{ a: 30, b: 80, lng: 115.25, lat: 40.45, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(115.03, 40.61, 560), dateLabel: "1449年", title_zh: "御駕親征", title_en: "Emperor leads the campaign", narration_zh: "明英宗在宦官王振慫恿下親征瓦剌。", narration_en: "Emperor Zhengtong marches north against the Oirat.", focus: ["ming_tumu"], side: "ming" },
                { day: 60, hold: 10, cam: cam(115.25, 40.45, 520), dateLabel: "1449年8月", title_zh: "土木堡被俘", title_en: "Capture at Tumu", narration_zh: "缺水斷糧，明軍潰敗，英宗被俘，國勢轉衰。", narration_en: "Ming army collapses — the emperor is captured.", focus: ["ming_tumu", "oirat_tumu"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "sarhu",
          title_zh: "薩爾滸之戰",
          title_en: "SARHU 1619",
          blurb: "後金大敗明軍四路",
          places: "薩爾滸 · 遼寧撫順",
          data: (() => {
            const F = redBlue("ming", "jin", "明軍", "後金", "Ming Army", "Later Jin");
            return mk("cse-sarhu", "薩爾滸之戰", "BATTLE OF SARHU", "1619年", 124.1, 41.9, [2.5, 2.0, 10], F, ["ming", "jin"], [1619, 3, 1], {
              dist: 650,
              narr_zh: "努爾哈赤以「五大恨」起兵，在薩爾滸殲滅明軍四路。",
              narr_en: "Nurhaci defeats the Ming's four-column army at Sarhu.",
              impact: "後金（清）大敗明軍，掌握遼東戰略主動權，敲響明亡喪鐘",
              points: [
                { name_zh: "薩爾滸", name_en: "Sarhu", type: "fort", lng: 124.1, lat: 41.9 },
                { name_zh: "撫順", name_en: "Fushun", type: "city", lng: 123.95, lat: 41.88 },
                { name_zh: "赫圖阿拉", name_en: "Hetu Ala", type: "town", lng: 124.75, lat: 41.42 },
              ],
              units: [
                { id: "ming_sarhu", faction: "ming", kind: "infantry", crest: "eagle", cf: true, name_zh: "明軍四路", name_en: "Ming Four Columns", track: [{ d: 1, lng: 123.5, lat: 42.2, s: 120000, st: "attack" }, { d: 50, lng: 124.1, lat: 41.9, s: 40000, st: "retreat" }, { d: 100, lng: 123.2, lat: 42.4, s: 10000, st: "dead" }] },
                { id: "jin_sarhu", faction: "jin", kind: "infantry", crest: "wings", cf: true, name_zh: "後金八旗", name_en: "Later Jin Banners", track: [{ d: 1, lng: 124.75, lat: 41.42, s: 60000, st: "hold" }, { d: 45, lng: 124.1, lat: 41.9, s: 80000, st: "attack" }, { d: 100, lng: 124.1, lat: 41.9, s: 75000, st: "hold" }] },
              ],
              arrows: [{ d: 35, f: "jin", from: [124.75, 41.42], to: [124.1, 41.9], label: "各個擊破", kind: "attack" }],
              hotspots: [{ a: 30, b: 85, lng: 124.1, lat: 41.9, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(123.5, 42.2, 600), dateLabel: "1619年", title_zh: "四路進攻", title_en: "Four columns advance", narration_zh: "明廷集結大軍，分四路討伐後金。", narration_en: "Ming launches a four-pronged offensive.", focus: ["ming_sarhu"], side: "ming" },
                { day: 65, hold: 10, cam: cam(124.1, 41.9, 560), dateLabel: "1619年3月", title_zh: "薩爾滸大捷", title_en: "Victory at Sarhu", narration_zh: "努爾哈赤各個擊破，明軍慘敗，遼東主動權易手。", narration_en: "Nurhaci defeats each column — Ming loses the initiative in Liaodong.", focus: ["jin_sarhu", "ming_sarhu"], side: "both" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "late-qing",
      title_zh: "晚清",
      title_en: "LATE QING",
      period: "19世紀末",
      intro: "甲午戰爭黃海、威海衛兩役，北洋水師覆沒，洋務運動宣告失敗。",
      warAnalysis: {
        military: "近代海戰倚重艦炮與戰術；北洋水師裝備落後、指揮保守，日本聯合艦隊訓練有素。",
        nationalPower: "清朝工業化有限，海軍建設不足；日本明治維新後國力躍升。",
        impact: "《馬關條約》簽訂，列強瓜分加劇，維新變法與革命思潮興起。",
      },
      battles: [
        {
          slug: "yellow-sea",
          title_zh: "黃海海戰",
          title_en: "YELLOW SEA 1894",
          blurb: "北洋水師主力受創",
          places: "黃海 · 大東溝",
          data: (() => {
            const F = redBlue("beiyang", "japan", "北洋水師", "日本聯合艦隊", "Beiyang Fleet", "Imperial Japanese Navy");
            return mk("cse-yellow-sea", "黃海海戰", "BATTLE OF YELLOW SEA", "1894年9月17日", 122.5, 38.5, [3.0, 2.5, 9], F, ["beiyang", "japan"], [1894, 9, 17], {
              dist: 700,
              narr_zh: "北洋艦隊護送運兵船，與日本聯合艦隊激戰黃海。",
              narr_en: "The Beiyang Fleet clashes with Japan's Combined Fleet in the Yellow Sea.",
              impact: "北洋水師主力受創，大清喪失黃海制海權",
              points: [
                { name_zh: "大東溝", name_en: "Dadonggou", type: "bay", lng: 122.5, lat: 38.5 },
                { name_zh: "旅順", name_en: "Lüshun", type: "fort", lng: 121.26, lat: 38.85 },
                { name_zh: "威海", name_en: "Weihai", type: "fort", lng: 122.12, lat: 37.51 },
              ],
              units: [
                { id: "beiyang_ys", faction: "beiyang", kind: "infantry", crest: "anchor", cf: true, name_zh: "北洋水師", name_en: "Beiyang Fleet", track: [{ d: 1, lng: 122.0, lat: 38.8, s: 80000, st: "march" }, { d: 50, lng: 122.5, lat: 38.5, s: 50000, st: "hold" }, { d: 100, lng: 122.12, lat: 37.51, s: 35000, st: "retreat" }] },
                { id: "japan_ys", faction: "japan", kind: "infantry", crest: "anchor", cf: true, name_zh: "聯合艦隊", name_en: "Combined Fleet", track: [{ d: 1, lng: 123.0, lat: 38.2, s: 70000, st: "attack" }, { d: 55, lng: 122.5, lat: 38.5, s: 75000, st: "attack" }, { d: 100, lng: 122.5, lat: 38.5, s: 70000, st: "hold" }] },
              ],
              arrows: [{ d: 40, f: "japan", from: [123.0, 38.2], to: [122.5, 38.5], label: "艦隊攔截", kind: "attack" }],
              hotspots: [{ a: 35, b: 80, lng: 122.5, lat: 38.5, kind: "naval", i: 1.3 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(122.3, 38.65, 640), dateLabel: "1894年9月17日", title_zh: "黃海遭遇", title_en: "Fleet encounter", narration_zh: "定遠、鎮遠領銜，北洋艦隊迎戰日本。", narration_en: "Beiyang battleships engage the Japanese fleet.", focus: ["beiyang_ys", "japan_ys"], side: "both" },
                { day: 75, hold: 10, cam: cam(122.5, 38.5, 600), dateLabel: "1894年9月17日", title_zh: "喪失制海權", title_en: "Sea control lost", narration_zh: "多艦沉沒或重創，北洋喪失黃海制海權。", narration_en: "Heavy losses — Qing loses command of the Yellow Sea.", focus: ["beiyang_ys"], side: "beiyang" },
              ],
            });
          })(),
        },
        {
          slug: "weihaiwei",
          title_zh: "威海衛淪陷",
          title_en: "WEIHAIWEI 1895",
          blurb: "北洋艦隊全軍覆沒",
          places: "威海衛 · 劉公島",
          data: (() => {
            const F = redBlue("beiyang", "japan", "北洋水師", "日軍", "Beiyang Fleet", "Japanese Forces");
            return mk("cse-weihaiwei", "威海衛淪陷", "FALL OF WEIHAIWEI", "1895年2月", 122.12, 37.51, [2.0, 1.6, 11], F, ["beiyang", "japan"], [1895, 2, 1], {
              dist: 560,
              narr_zh: "日軍陸海夾擊威海衛，北洋水師全軍覆沒，丁汝昌殉國。",
              narr_en: "Japan besieges Weihaiwei — the Beiyang Fleet is destroyed.",
              impact: "北洋艦隊全軍覆沒，標誌著「洋務運動」宣告徹底失敗",
              points: [
                { name_zh: "威海衛", name_en: "Weihaiwei", type: "fort", lng: 122.12, lat: 37.51 },
                { name_zh: "劉公島", name_en: "Liugong Island", type: "fort", lng: 122.18, lat: 37.5 },
                { name_zh: "成山角", name_en: "Chengshan", type: "bay", lng: 122.68, lat: 37.39 },
              ],
              units: [
                { id: "beiyang_wh", faction: "beiyang", kind: "infantry", crest: "anchor", cf: true, name_zh: "威海衛北洋殘部", name_en: "Beiyang Remnants", track: [{ d: 1, lng: 122.18, lat: 37.5, s: 30000, st: "hold" }, { d: 70, lng: 122.12, lat: 37.51, s: 5000, st: "dead" }] },
                { id: "japan_wh", faction: "japan", kind: "infantry", crest: "anchor", cf: true, name_zh: "日軍陸海聯合", name_en: "Japanese Combined Force", track: [{ d: 1, lng: 122.5, lat: 37.7, s: 60000, st: "attack" }, { d: 60, lng: 122.12, lat: 37.51, s: 80000, st: "attack" }, { d: 100, lng: 122.12, lat: 37.51, s: 75000, st: "hold" }] },
              ],
              arrows: [{ d: 30, f: "japan", from: [122.5, 37.7], to: [122.12, 37.51], label: "陸海夾擊", kind: "attack" }],
              hotspots: [{ a: 25, b: 90, lng: 122.12, lat: 37.51, kind: "naval", i: 1.2 }],
              storyboard: [
                { day: 25, hold: 9, cam: cam(122.18, 37.5, 520), dateLabel: "1895年1月", title_zh: "威海圍困", title_en: "Siege of Weihaiwei", narration_zh: "日軍佔領威海陸上炮台，轟擊港內艦船。", narration_en: "Japanese guns on shore bombard the harbour.", focus: ["beiyang_wh", "japan_wh"], side: "both" },
                { day: 80, hold: 10, cam: cam(122.12, 37.51, 480), dateLabel: "1895年2月", title_zh: "北洋覆沒", title_en: "Fleet destroyed", narration_zh: "丁汝昌殉國，北洋水師全軍覆沒，洋務運動失敗。", narration_en: "Admiral Ding dies — the Self-Strengthening Movement ends in defeat.", focus: ["beiyang_wh"], side: "beiyang" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "anti-japan",
      title_zh: "抗日戰爭",
      title_en: "WAR OF RESISTANCE",
      period: "1937–1945",
      intro: "抗戰四役涵蓋正面戰場與敵後游擊：淞滬、平型關、台兒莊、百團大戰均為 DSE 重點。",
      warAnalysis: {
        military: "日軍倚重海空優勢與機械化；國軍持久抵抗，八路軍敵後破壞交通與據點。",
        nationalPower: "中國以空間換時間，倚賴廣大國土與民心；日本資源有限，難以持久佔領。",
        impact: "粉碎日本速戰速決企圖，為世界反法西斯戰爭作出重大貢獻，提升國際地位。",
      },
      battles: [
        {
          slug: "songhu",
          title_zh: "淞滬會戰",
          title_en: "SONG-HU 1937",
          blurb: "粉碎三月亡華企圖",
          places: "上海 · 寶山 · 閘北",
          data: (() => {
            const F = redBlue("kmt", "japan", "國民革命軍", "日軍", "National Revolutionary Army", "Imperial Japanese Army");
            return mk("cse-songhu", "淞滬會戰", "BATTLE OF SHANGHAI", "1937年8–11月", 121.47, 31.23, [2.0, 1.6, 11], F, ["kmt", "japan"], [1937, 8, 13], {
              dist: 580,
              narr_zh: "八一三淞滬會戰，國軍與日軍在上海激戰三個月。",
              narr_en: "Three months of brutal fighting in Shanghai after 13 August 1937.",
              impact: "戰況慘烈，成功粉碎日軍「三月亡華」的戰略企圖",
              points: [
                { name_zh: "閘北", name_en: "Zhabei", type: "town", lng: 121.47, lat: 31.28 },
                { name_zh: "寶山", name_en: "Baoshan", type: "fort", lng: 121.49, lat: 31.4 },
                { name_zh: "四行倉庫", name_en: "Sihang Warehouse", type: "fort", lng: 121.47, lat: 31.24 },
              ],
              units: [
                { id: "kmt_songhu", faction: "kmt", kind: "infantry", crest: "eagle", cf: true, name_zh: "國軍第87、88師", name_en: "KMT 87th & 88th Divisions", track: [{ d: 1, lng: 121.45, lat: 31.3, s: 70000, st: "hold" }, { d: 60, lng: 121.47, lat: 31.23, s: 50000, st: "hold" }, { d: 100, lng: 121.5, lat: 31.2, s: 20000, st: "retreat" }] },
                { id: "japan_songhu", faction: "japan", kind: "infantry", crest: "wings", cf: true, name_zh: "日軍上海派遣軍", name_en: "Shanghai Expeditionary Force", track: [{ d: 1, lng: 121.55, lat: 31.35, s: 80000, st: "attack" }, { d: 70, lng: 121.47, lat: 31.23, s: 90000, st: "attack" }, { d: 100, lng: 121.47, lat: 31.23, s: 85000, st: "hold" }] },
              ],
              arrows: [{ d: 15, f: "japan", from: [121.55, 31.35], to: [121.47, 31.23], label: "登陸猛攻", kind: "attack" }],
              hotspots: [{ a: 10, b: 95, lng: 121.47, lat: 31.23, kind: "firefight", i: 1.2 }],
              storyboard: [
                { day: 15, hold: 9, cam: cam(121.47, 31.28, 540), dateLabel: "1937年8月13日", title_zh: "八一三開戰", title_en: "Battle begins", narration_zh: "國軍主動進攻日軍據點，淞滬會戰爆發。", narration_en: "KMT forces attack Japanese positions — Shanghai campaign begins.", focus: ["kmt_songhu", "japan_songhu"], side: "both" },
                { day: 85, hold: 10, cam: cam(121.47, 31.23, 500), dateLabel: "1937年11月", title_zh: "三月亡華破滅", title_en: "Quick victory denied", narration_zh: "雖上海失守，但粉碎日軍速戰速決企圖。", narration_en: "Shanghai falls — but Japan's quick-victory plan is shattered.", focus: ["kmt_songhu"], side: "kmt" },
              ],
            });
          })(),
        },
        {
          slug: "pingxingguan",
          title_zh: "平型關大捷",
          title_en: "PINGXINGGUAN 1937",
          blurb: "八路軍首勝，破日軍神話",
          places: "平型關 · 山西靈丘",
          data: (() => {
            const F = redBlue("eighth_route", "japan", "八路軍", "日軍", "Eighth Route Army", "Japanese Army");
            return mk("cse-pingxingguan", "平型關大捷", "PINGXINGGUAN VICTORY", "1937年9月25日", 113.95, 39.35, [2.2, 1.8, 10], F, ["eighth_route", "japan"], [1937, 9, 25], {
              dist: 600,
              narr_zh: "林彪率八路軍115師在平型關伏擊日軍補給隊。",
              narr_en: "Lin Biao's 115th Division ambushes Japanese supply columns.",
              impact: "國共合作下首場勝仗，打破日軍不敗神話，提振全國士氣",
              points: [
                { name_zh: "平型關", name_en: "Pingxingguan", type: "fort", lng: 113.95, lat: 39.35 },
                { name_zh: "靈丘", name_en: "Lingqiu", type: "town", lng: 114.23, lat: 39.44 },
                { name_zh: "繁峙", name_en: "Fanshi", type: "town", lng: 113.27, lat: 39.19 },
              ],
              units: [
                { id: "era_pxg", faction: "eighth_route", kind: "infantry", crest: "hammer", cf: true, name_zh: "八路軍115師", name_en: "8th Route 115th Div.", track: [{ d: 1, lng: 113.8, lat: 39.4, s: 10000, st: "hold" }, { d: 40, lng: 113.95, lat: 39.35, s: 12000, st: "attack" }, { d: 100, lng: 113.95, lat: 39.35, s: 11000, st: "hold" }] },
                { id: "japan_pxg", faction: "japan", kind: "infantry", crest: "wings", cf: true, name_zh: "日軍第5師團補給隊", name_en: "Japanese 5th Div. Supply", track: [{ d: 1, lng: 114.1, lat: 39.3, s: 4000, st: "march" }, { d: 45, lng: 113.95, lat: 39.35, s: 1000, st: "dead" }] },
              ],
              arrows: [{ d: 35, f: "eighth_route", from: [113.8, 39.4], to: [113.95, 39.35], label: "山地伏擊", kind: "attack" }],
              hotspots: [{ a: 30, b: 70, lng: 113.95, lat: 39.35, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(113.85, 39.38, 560), dateLabel: "1937年9月", title_zh: "山地設伏", title_en: "Ambush prepared", narration_zh: "八路軍利用平型關險要地形設伏。", narration_en: "The Eighth Route Army prepares an ambush.", focus: ["era_pxg"], side: "eighth_route" },
                { day: 50, hold: 10, cam: cam(113.95, 39.35, 520), dateLabel: "1937年9月25日", title_zh: "平型關大捷", title_en: "Victory at Pingxingguan", narration_zh: "殲滅日軍千餘人，打破日軍不敗神話。", narration_en: "A morale-boosting victory — Japan's invincibility myth is broken.", focus: ["era_pxg", "japan_pxg"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "taierzhuang",
          title_zh: "台兒莊戰役",
          title_en: "TAI'ERZHUANG 1938",
          blurb: "抗戰正面戰場大捷",
          places: "台兒莊 · 山東運河",
          data: (() => {
            const F = redBlue("kmt", "japan", "國民革命軍", "日軍", "National Revolutionary Army", "Japanese Army");
            return mk("cse-taierzhuang", "台兒莊戰役", "BATTLE OF TAI'ERZHUANG", "1938年3–4月", 117.73, 34.56, [2.0, 1.6, 10], F, ["kmt", "japan"], [1938, 3, 24], {
              dist: 590,
              narr_zh: "李宗仁指揮第五戰區，在台兒莊圍殲日軍精銳。",
              narr_en: "Li Zongren's forces encircle and destroy Japanese troops at Tai'erzhuang.",
              impact: "抗戰初期國軍在正面戰場取得的最大規模勝利",
              points: [
                { name_zh: "台兒莊", name_en: "Tai'erzhuang", type: "fort", lng: 117.73, lat: 34.56 },
                { name_zh: "臨沂", name_en: "Linyi", type: "city", lng: 118.35, lat: 35.1 },
                { name_zh: "運河", name_en: "Grand Canal", type: "town", lng: 117.65, lat: 34.5 },
              ],
              units: [
                { id: "kmt_tezz", faction: "kmt", kind: "infantry", crest: "eagle", cf: true, name_zh: "第五戰區", name_en: "5th War Zone", track: [{ d: 1, lng: 117.5, lat: 34.7, s: 100000, st: "hold" }, { d: 50, lng: 117.73, lat: 34.56, s: 120000, st: "attack" }, { d: 100, lng: 117.73, lat: 34.56, s: 110000, st: "hold" }] },
                { id: "japan_tezz", faction: "japan", kind: "infantry", crest: "wings", cf: true, name_zh: "日軍磯谷師團", name_en: "Japanese Isogai Division", track: [{ d: 1, lng: 117.9, lat: 34.5, s: 30000, st: "attack" }, { d: 55, lng: 117.73, lat: 34.56, s: 5000, st: "dead" }] },
              ],
              arrows: [{ d: 40, f: "kmt", from: [117.5, 34.7], to: [117.73, 34.56], label: "合圍殲敵", kind: "attack" }],
              hotspots: [{ a: 35, b: 85, lng: 117.73, lat: 34.56, kind: "firefight", i: 1.1 }],
              storyboard: [
                { day: 25, hold: 9, cam: cam(117.8, 34.52, 550), dateLabel: "1938年3月", title_zh: "日軍南下", title_en: "Japanese advance", narration_zh: "磯谷師團沿津浦線南下，直逼台兒莊。", narration_en: "Japanese forces push south toward Tai'erzhuang.", focus: ["japan_tezz"], side: "japan" },
                { day: 70, hold: 10, cam: cam(117.73, 34.56, 510), dateLabel: "1938年4月", title_zh: "台兒莊大捷", title_en: "Great victory", narration_zh: "國軍合圍殲敵，抗戰正面戰場最大勝利。", narration_en: "Encirclement destroys Japanese forces — the greatest KMT victory.", focus: ["kmt_tezz", "japan_tezz"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "hundred-regiments",
          title_zh: "百團大戰",
          title_en: "HUNDRED REGIMENTS 1940",
          blurb: "八路軍敵後最大攻勢",
          places: "華北交通線 · 正太鐵路",
          data: (() => {
            const F = redBlue("eighth_route", "japan", "八路軍", "日軍", "Eighth Route Army", "Japanese Occupation Force");
            return mk("cse-hundred-regiments", "百團大戰", "HUNDRED REGIMENTS OFFENSIVE", "1940年8–12月", 113.58, 37.87, [4.0, 3.2, 9], F, ["eighth_route", "japan"], [1940, 8, 20], {
              dist: 750,
              narr_zh: "彭德懷指揮八路軍破壞華北日軍交通線與據點。",
              narr_en: "Peng Dehuai leads a massive campaign against Japanese infrastructure.",
              impact: "中共八路軍在敵後戰場發動的最大規模破壞攻勢",
              points: [
                { name_zh: "正太鐵路", name_en: "Zheng-Tai Railway", type: "town", lng: 113.58, lat: 37.87 },
                { name_zh: "娘子關", name_en: "Niangzi Pass", type: "fort", lng: 113.88, lat: 37.87 },
                { name_zh: "陽泉", name_en: "Yangquan", type: "city", lng: 113.58, lat: 37.86 },
              ],
              units: [
                { id: "era_hr", faction: "eighth_route", kind: "infantry", crest: "hammer", cf: true, name_zh: "八路軍105個團", name_en: "105 Eighth Route Regiments", track: [{ d: 1, lng: 113.2, lat: 38.2, s: 400000, st: "march" }, { d: 50, lng: 113.58, lat: 37.87, s: 450000, st: "attack" }, { d: 100, lng: 113.58, lat: 37.87, s: 400000, st: "hold" }] },
                { id: "japan_hr", faction: "japan", kind: "infantry", crest: "wings", cf: true, name_zh: "日軍華北據點", name_en: "North China Garrisons", track: [{ d: 1, lng: 114.0, lat: 37.5, s: 60000, st: "hold" }, { d: 60, lng: 113.58, lat: 37.87, s: 40000, st: "retreat" }, { d: 100, lng: 114.2, lat: 37.3, s: 35000, st: "hold" }] },
              ],
              arrows: [
                { d: 25, f: "eighth_route", from: [113.2, 38.2], to: [113.58, 37.87], label: "破壞交通線", kind: "attack" },
                { d: 70, f: "japan", from: [114.2, 37.3], to: [113.58, 37.87], label: "報復掃蕩", kind: "attack" },
              ],
              hotspots: [{ a: 20, b: 90, lng: 113.58, lat: 37.87, kind: "firefight", i: 0.9 }],
              storyboard: [
                { day: 25, hold: 9, cam: cam(113.4, 38.0, 680), dateLabel: "1940年8月20日", title_zh: "破襲交通線", title_en: "Railway offensive", narration_zh: "八路軍同時破壞正太、同浦等鐵路。", narration_en: "Coordinated attacks on railways across North China.", focus: ["era_hr"], side: "eighth_route" },
                { day: 80, hold: 10, cam: cam(113.58, 37.87, 640), dateLabel: "1940年冬", title_zh: "敵後最大攻勢", title_en: "Largest guerrilla offensive", narration_zh: "破壞日軍交通，鼓舞敵後民心，亦引日軍報復掃蕩。", narration_en: "Massive sabotage — Japan responds with brutal reprisals.", focus: ["era_hr", "japan_hr"], side: "both" },
              ],
            });
          })(),
        },
      ],
    },
    {
      slug: "civil-war",
      title_zh: "國共內戰",
      title_en: "CHINESE CIVIL WAR",
      period: "1946–1949",
      intro: "遼瀋、淮海、平津、渡江四大戰役決定國共內戰結局，為 DSE 現代史重點。",
      warAnalysis: {
        military: "解放軍運動戰、圍城打援與渡江作戰；國軍倚賴城市據點與美援，士氣漸衰。",
        nationalPower: "共軍得民心與土地改革支持；國統區通脹、腐敗削弱戰力。",
        impact: "中華民國政府遷台，中華人民共和國成立，兩岸分治格局形成。",
      },
      battles: [
        {
          slug: "liaoshen",
          title_zh: "遼瀋戰役",
          title_en: "LIAO-SHEN 1948",
          blurb: "解放軍奪取東北",
          places: "錦州 · 長春 · 瀋陽",
          data: (() => {
            const F = redBlue("pla", "kmt", "解放軍", "國民黨軍", "PLA", "KMT Forces");
            return mk("cse-liaoshen", "遼瀋戰役", "LIAO-SHEN CAMPAIGN", "1948年9–11月", 123.4, 41.8, [3.5, 3.0, 9], F, ["pla", "kmt"], [1948, 9, 12], {
              dist: 720,
              narr_zh: "林彪指揮東北野戰軍攻取錦州，圍困長春、瀋陽。",
              narr_en: "Lin Biao's Northeast Field Army captures Jinzhou and the Northeast.",
              impact: "解放軍率先控制東北全境，國軍精銳盡失，雙方兵力對比發生逆轉",
              points: [
                { name_zh: "錦州", name_en: "Jinzhou", type: "city", lng: 121.13, lat: 41.1 },
                { name_zh: "瀋陽", name_en: "Shenyang", type: "city", lng: 123.43, lat: 41.8 },
                { name_zh: "長春", name_en: "Changchun", type: "city", lng: 125.32, lat: 43.9 },
              ],
              units: [
                { id: "pla_liaoshen", faction: "pla", kind: "infantry", crest: "hammer", cf: true, name_zh: "東北野戰軍", name_en: "Northeast Field Army", track: [{ d: 1, lng: 122.5, lat: 42.5, s: 700000, st: "attack" }, { d: 60, lng: 121.13, lat: 41.1, s: 800000, st: "attack" }, { d: 100, lng: 123.43, lat: 41.8, s: 850000, st: "hold" }] },
                { id: "kmt_liaoshen", faction: "kmt", kind: "infantry", crest: "eagle", cf: true, name_zh: "國軍東北集團軍", name_en: "KMT Northeast Group", track: [{ d: 1, lng: 123.43, lat: 41.8, s: 550000, st: "hold" }, { d: 70, lng: 121.13, lat: 41.1, s: 200000, st: "retreat" }, { d: 100, lng: 123.43, lat: 41.8, s: 50000, st: "dead" }] },
              ],
              arrows: [{ d: 40, f: "pla", from: [122.5, 42.5], to: [121.13, 41.1], label: "攻取錦州", kind: "attack" }],
              hotspots: [{ a: 30, b: 90, lng: 121.13, lat: 41.1, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 25, hold: 9, cam: cam(122.0, 41.8, 680), dateLabel: "1948年9月", title_zh: "圍城打援", title_en: "Siege and encirclement", narration_zh: "解放軍圍錦州，斷國軍東北退路。", narration_en: "PLA besieges Jinzhou — cutting off the Northeast.", focus: ["pla_liaoshen"], side: "pla" },
                { day: 85, hold: 10, cam: cam(123.43, 41.8, 640), dateLabel: "1948年11月", title_zh: "東北解放", title_en: "Northeast liberated", narration_zh: "遼瀋戰役結束，東北全境解放，兵力對比逆轉。", narration_en: "The Northeast falls — the balance of power shifts.", focus: ["pla_liaoshen", "kmt_liaoshen"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "huaihai",
          title_zh: "淮海戰役",
          title_en: "HUAIHAI 1948–49",
          blurb: "最大規模決戰",
          places: "徐州 · 雙堆集 · 陳官莊",
          data: (() => {
            const F = redBlue("pla", "kmt", "解放軍", "國民黨軍", "PLA", "KMT Forces");
            return mk("cse-huaihai", "淮海戰役", "HUAIHAI CAMPAIGN", "1948年11月–1949年1月", 117.2, 34.25, [3.5, 3.0, 9], F, ["pla", "kmt"], [1948, 11, 6], {
              dist: 740,
              narr_zh: "以徐州為中心，解放軍殲滅國軍主力五十萬。",
              narr_en: "The PLA destroys half a million KMT troops around Xuzhou.",
              impact: "規模最大、最慘烈的一役。國軍主力被殲，長江以北盡歸共產黨",
              points: [
                { name_zh: "徐州", name_en: "Xuzhou", type: "city", lng: 117.2, lat: 34.25 },
                { name_zh: "雙堆集", name_en: "Shuangduiji", type: "town", lng: 116.98, lat: 33.42 },
                { name_zh: "陳官莊", name_en: "Chenguanzhuang", type: "town", lng: 117.12, lat: 34.35 },
              ],
              units: [
                { id: "pla_huaihai", faction: "pla", kind: "infantry", crest: "hammer", cf: true, name_zh: "華東中原野戰軍", name_en: "East-Central Field Armies", track: [{ d: 1, lng: 116.5, lat: 34.5, s: 600000, st: "attack" }, { d: 55, lng: 117.2, lat: 34.25, s: 800000, st: "attack" }, { d: 100, lng: 117.2, lat: 34.25, s: 750000, st: "hold" }] },
                { id: "kmt_huaihai", faction: "kmt", kind: "infantry", crest: "eagle", cf: true, name_zh: "國軍徐蚌集團", name_en: "KMT Xuzhou-Bengbu Group", track: [{ d: 1, lng: 117.2, lat: 34.25, s: 800000, st: "hold" }, { d: 60, lng: 117.12, lat: 34.35, s: 300000, st: "retreat" }, { d: 100, lng: 117.2, lat: 34.25, s: 50000, st: "dead" }] },
              ],
              arrows: [{ d: 35, f: "pla", from: [116.5, 34.5], to: [117.2, 34.25], label: "合圍徐州", kind: "attack" }],
              hotspots: [{ a: 25, b: 95, lng: 117.2, lat: 34.25, kind: "firefight", i: 1.2 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(117.2, 34.35, 660), dateLabel: "1948年11月", title_zh: "徐蚌大戰", title_en: "Battle for Xuzhou", narration_zh: "國軍黃維、杜聿明集團被圍。", narration_en: "KMT army groups are encircled.", focus: ["kmt_huaihai"], side: "kmt" },
                { day: 90, hold: 10, cam: cam(117.2, 34.25, 620), dateLabel: "1949年1月", title_zh: "淮海勝利", title_en: "Huaihai victory", narration_zh: "國軍主力被殲，長江以北盡歸解放軍。", narration_en: "KMT main forces destroyed — north of the Yangtze falls.", focus: ["pla_huaihai", "kmt_huaihai"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "pingjin",
          title_zh: "平津戰役",
          title_en: "PING-JIN 1948–49",
          blurb: "和平解放北平",
          places: "北平 · 天津 · 張家口",
          data: (() => {
            const F = redBlue("pla", "kmt", "解放軍", "國民黨軍", "PLA", "KMT Forces");
            return mk("cse-pingjin", "平津戰役", "PING-JIN CAMPAIGN", "1948年11月–1949年1月", 116.4, 39.9, [2.5, 2.0, 10], F, ["pla", "kmt"], [1948, 11, 29], {
              dist: 650,
              narr_zh: "林彪、聶榮臻指揮華北野戰軍圍困平津，傅作義接受改編。",
              narr_en: "North China Field Army besieges Beiping — Fu Zuoyi surrenders.",
              impact: "傅作義接受改編，和平解放北平，解放軍確立華北絕對優勢",
              points: [
                { name_zh: "北平", name_en: "Beiping", type: "city", lng: 116.4, lat: 39.9 },
                { name_zh: "天津", name_en: "Tianjin", type: "city", lng: 117.2, lat: 39.08 },
                { name_zh: "張家口", name_en: "Zhangjiakou", type: "fort", lng: 114.88, lat: 40.82 },
              ],
              units: [
                { id: "pla_pingjin", faction: "pla", kind: "infantry", crest: "hammer", cf: true, name_zh: "華北野戰軍", name_en: "North China Field Army", track: [{ d: 1, lng: 115.5, lat: 40.2, s: 500000, st: "attack" }, { d: 50, lng: 117.2, lat: 39.08, s: 600000, st: "attack" }, { d: 100, lng: 116.4, lat: 39.9, s: 650000, st: "hold" }] },
                { id: "kmt_pingjin", faction: "kmt", kind: "infantry", crest: "eagle", cf: true, name_zh: "傅作義集團", name_en: "Fu Zuoyi Group", track: [{ d: 1, lng: 116.4, lat: 39.9, s: 400000, st: "hold" }, { d: 60, lng: 117.2, lat: 39.08, s: 150000, st: "dead" }, { d: 100, lng: 116.4, lat: 39.9, s: 200000, st: "hold" }] },
              ],
              arrows: [
                { d: 30, f: "pla", from: [115.5, 40.2], to: [117.2, 39.08], label: "攻克天津", kind: "attack" },
                { d: 90, f: "kmt", from: [116.4, 39.9], to: [116.4, 39.9], label: "接受改編", kind: "march" },
              ],
              hotspots: [{ a: 40, b: 85, lng: 117.2, lat: 39.08, kind: "firefight", i: 1 }],
              storyboard: [
                { day: 30, hold: 9, cam: cam(117.2, 39.08, 600), dateLabel: "1949年1月", title_zh: "攻克天津", title_en: "Tianjin captured", narration_zh: "解放軍29小時攻克天津，震懾北平守軍。", narration_en: "Tianjin falls in 29 hours.", focus: ["pla_pingjin"], side: "pla" },
                { day: 95, hold: 10, cam: cam(116.4, 39.9, 560), dateLabel: "1949年1月31日", title_zh: "和平解放北平", title_en: "Peaceful liberation", narration_zh: "傅作義接受改編，北平和平解放，文物古蹟得以保全。", narration_en: "Fu Zuoyi surrenders — Beiping is liberated without destruction.", focus: ["pla_pingjin", "kmt_pingjin"], side: "both" },
              ],
            });
          })(),
        },
        {
          slug: "crossing",
          title_zh: "渡江戰役",
          title_en: "YANGTZE CROSSING 1949",
          blurb: "解放軍佔領南京",
          places: "長江 · 南京 · 上海",
          data: (() => {
            const F = redBlue("pla", "kmt", "解放軍", "國民黨軍", "PLA", "KMT Forces");
            return mk("cse-crossing", "渡江戰役", "CROSSING THE YANGTZE", "1949年4月", 118.78, 32.06, [3.0, 2.5, 10], F, ["pla", "kmt"], [1949, 4, 20], {
              dist: 680,
              narr_zh: "百萬雄師過大江，解放軍攻佔南京，國府遷台。",
              narr_en: "Two million troops cross the Yangtze — Nanjing falls.",
              impact: "解放軍渡過長江攻佔南京，宣告中華民國政府在大陸的統治終結",
              points: [
                { name_zh: "南京", name_en: "Nanjing", type: "city", lng: 118.78, lat: 32.06 },
                { name_zh: "江浦", name_en: "Jiangpu", type: "town", lng: 118.62, lat: 32.06 },
                { name_zh: "上海", name_en: "Shanghai", type: "city", lng: 121.47, lat: 31.23 },
              ],
              units: [
                { id: "pla_crossing", faction: "pla", kind: "infantry", crest: "hammer", cf: true, name_zh: "第二、第三野戰軍", name_en: "2nd & 3rd Field Armies", track: [{ d: 1, lng: 118.3, lat: 32.2, s: 1000000, st: "attack" }, { d: 40, lng: 118.78, lat: 32.06, s: 1200000, st: "attack" }, { d: 100, lng: 118.78, lat: 32.06, s: 1100000, st: "hold" }] },
                { id: "kmt_crossing", faction: "kmt", kind: "infantry", crest: "eagle", cf: true, name_zh: "長江防線", name_en: "Yangtze Defence Line", track: [{ d: 1, lng: 118.78, lat: 32.06, s: 700000, st: "hold" }, { d: 50, lng: 118.9, lat: 31.9, s: 200000, st: "retreat" }, { d: 100, lng: 121.47, lat: 31.23, s: 100000, st: "retreat" }] },
              ],
              arrows: [{ d: 25, f: "pla", from: [118.3, 32.2], to: [118.78, 32.06], label: "百萬雄師過江", kind: "landing" }],
              hotspots: [{ a: 20, b: 70, lng: 118.78, lat: 32.06, kind: "landing", i: 1 }],
              storyboard: [
                { day: 20, hold: 9, cam: cam(118.5, 32.12, 620), dateLabel: "1949年4月20日", title_zh: "渡江作戰", title_en: "Crossing the Yangtze", narration_zh: "解放軍在西起湖口、東至江陰千里戰線強渡長江。", narration_en: "PLA forces cross the Yangtze along a thousand-mile front.", focus: ["pla_crossing"], side: "pla" },
                { day: 60, hold: 10, cam: cam(118.78, 32.06, 580), dateLabel: "1949年4月23日", title_zh: "南京解放", title_en: "Nanjing liberated", narration_zh: "解放軍佔領南京，中華民國政府在大陸統治終結。", narration_en: "Nanjing falls — ROC rule on the mainland ends.", focus: ["pla_crossing", "kmt_crossing"], side: "both" },
              ],
            });
          })(),
        },
      ],
    },
  ];
}

module.exports = buildCatalog;
