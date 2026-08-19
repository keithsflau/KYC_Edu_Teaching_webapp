/* THE SOMME · 索姆河戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-somme",
      "title_zh": "索姆河戰役",
      "title_en": "THE SOMME",
      "subtitle": "1916年7月",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 1.8,
          "maxLng": 3.6,
          "minLat": 49.3,
          "maxLat": 50.5,
          "Z": 10
      },
      "startDate": [
          1916,
          7,
          1
      ],
      "introCam": {
          "lng": 2.7,
          "lat": 49.9,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "索姆河戰役",
          "en": "THE SOMME · 1916年7月",
          "narr_zh": "協約國發動索姆河攻勢，首日陣亡逾兩萬人。",
          "narr_en": "Allied offensive on the Somme — over 20,000 British dead on day one."
      },
      "outroCam": {
          "lng": 2.7,
          "lat": 49.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../tannenberg/",
          "title_zh": "坦能堡戰役",
          "title_en": "TANNENBERG 1914"
      }
  };
  const factions = {
    "cp": {
      main: 0x5c4033, glow: 0x8b6914, dim: 0x3a2820,
      css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers",
      emblem: "circle", maxStrength: 120000, textLight: "#e8dcc8"
    },
    "ap": {
      main: 0x1e5a8a, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers",
      emblem: "shield", maxStrength: 130000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Somme",
              "name_zh": "索姆河",
              "type": "town",
              "lng": 2.7,
              "lat": 49.9
          },
          {
              "name_en": "Albert",
              "name_zh": "阿爾貝",
              "type": "city",
              "lng": 2.65,
              "lat": 50
          },
          {
              "name_en": "Thiepval",
              "name_zh": "蒂耶普瓦勒",
              "type": "fort",
              "lng": 2.68,
              "lat": 50.05
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ap_somme",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英法聯軍",
          "name_en": "Anglo-French",
          "track": [
              {
                  "d": 1,
                  "lng": 2.55,
                  "lat": 50,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 2.75,
                  "lat": 49.92,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "cp_somme",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍防線",
          "name_en": "German Defences",
          "track": [
              {
                  "d": 1,
                  "lng": 2.85,
                  "lat": 49.88,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 2.82,
                  "lat": 49.9,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 5,
          "f": "ap",
          "from": [
              2.55,
              50
          ],
          "to": [
              2.75,
              49.92
          ],
          "label": "7月1日攻勢",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 40,
          "lng": 2.7,
          "lat": 49.9,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "索姆河戰役",
          "en": "THE SOMME"
      }
  ];
  const notes =   {
      "summary": "索姆河戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "協約國發動索姆河攻勢以分散凡爾登壓力；首日英軍傷亡創紀錄，坦克首次投入實戰。",
      "leaders": "英軍司令黑格堅持大規模攻勢；德軍將領以機槍防線堅守。法軍霞飛、索姆河前線將領協同作戰。首日慘重傷亡使黑格備受批評，但坦克首戰為後續裝甲戰術奠基。",
      "nationalPower": "英國動員帝國兵力；德軍防線堅固。工業國家以人力與火力互耗。",
      "impact": "成為一戰無謂犧牲的象徵；推動軍事技術革新（坦克）與對戰爭的反思。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 2.65,
              "lat": 50,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年7月1日",
          "title_zh": "七一攻勢",
          "title_en": "First Day on the Somme",
          "narration_zh": "英軍在索姆河發動大攻勢，首日陣亡逾兩萬。",
          "narration_en": "British offensive opens — over 20,000 dead on day one.",
          "focus": [
              "ap_somme"
          ],
          "side": "ap",
          "commanders": [
              {
                  "zh": "黑格",
                  "en": "Haig"
              }
          ],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 2.68,
              "lat": 50.05,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年7月",
          "title_zh": "蒂耶普瓦勒血戰",
          "title_en": "Thiepval Bloodbath",
          "narration_zh": "德軍機槍火力造成協約國重大傷亡。",
          "narration_en": "German machine-gun fire inflicts heavy Allied losses.",
          "focus": [
              "ap_somme",
              "cp_somme"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 2.7,
              "lat": 49.9,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年9月",
          "title_zh": "坦克首戰",
          "title_en": "Tanks Debut",
          "narration_zh": "英軍首次投入坦克，突破部分德軍防線。",
          "narration_en": "British tanks debut, breaking some German lines.",
          "focus": [
              "ap_somme"
          ],
          "side": "ap",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 2.7,
              "lat": 49.9,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年11月",
          "title_zh": "攻勢收束",
          "title_en": "Offensive Winds Down",
          "narration_zh": "攻勢在泥濘中停滯，僅推進數英里。",
          "narration_en": "The offensive stalls in mud — gains measured in miles.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 2.7,
              "lat": 49.9,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年冬",
          "title_zh": "消耗戰代價",
          "title_en": "Cost of Attrition",
          "narration_zh": "雙方傷亡合計逾百萬，西線仍僵持。",
          "narration_en": "Over a million casualties — the Western Front remains deadlocked.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "索姆河戰役",
      "title_en": "THE SOMME",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 2.7,
          "lat": 49.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
