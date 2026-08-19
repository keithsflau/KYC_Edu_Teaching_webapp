/* BATTLE OF SARHU · 薩爾滸之戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-sarhu",
      "title_zh": "薩爾滸之戰",
      "title_en": "BATTLE OF SARHU",
      "subtitle": "1619年",
      "factionOrder": [
          "ming",
          "jin"
      ],
      "geo": {
          "minLng": 122.85,
          "maxLng": 125.35,
          "minLat": 40.9,
          "maxLat": 42.9,
          "Z": 10
      },
      "startDate": [
          1619,
          3,
          1
      ],
      "introCam": {
          "lng": 124.1,
          "lat": 41.9,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "薩爾滸之戰",
          "en": "BATTLE OF SARHU · 1619年",
          "narr_zh": "努爾哈赤以「五大恨」起兵，在薩爾滸殲滅明軍四路。",
          "narr_en": "Nurhaci defeats the Ming's four-column army at Sarhu."
      },
      "outroCam": {
          "lng": 124.1,
          "lat": 41.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "reliefScale": 0.78,
      "nextBattle": {
          "href": "../../late-qing/yellow-sea/",
          "title_zh": "黃海海戰",
          "title_en": "YELLOW SEA 1894"
      }
  };
  const factions = {
    "ming": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "明軍", label_en: "Ming Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "jin": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "後金", label_en: "Later Jin",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "薩爾滸",
              "name_en": "Sarhu",
              "type": "fort",
              "lng": 124.1,
              "lat": 41.9
          },
          {
              "name_zh": "撫順",
              "name_en": "Fushun",
              "type": "city",
              "lng": 123.95,
              "lat": 41.88
          },
          {
              "name_zh": "赫圖阿拉",
              "name_en": "Hetu Ala",
              "type": "town",
              "lng": 124.75,
              "lat": 41.42
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "ming_sarhu",
          "faction": "ming",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "明軍四路",
          "name_en": "Ming Four Columns",
          "track": [
              {
                  "d": 1,
                  "lng": 123.5,
                  "lat": 42.2,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 124.1,
                  "lat": 41.9,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 123.2,
                  "lat": 42.4,
                  "s": 10000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "jin_sarhu",
          "faction": "jin",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "後金八旗",
          "name_en": "Later Jin Banners",
          "track": [
              {
                  "d": 1,
                  "lng": 124.75,
                  "lat": 41.42,
                  "s": 60000,
                  "st": "hold"
              },
              {
                  "d": 45,
                  "lng": 124.1,
                  "lat": 41.9,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 124.1,
                  "lat": 41.9,
                  "s": 75000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 35,
          "f": "jin",
          "from": [
              124.75,
              41.42
          ],
          "to": [
              124.1,
              41.9
          ],
          "label": "各個擊破",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 85,
          "lng": 124.1,
          "lat": 41.9,
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
          "zh": "薩爾滸之戰",
          "en": "BATTLE OF SARHU"
      }
  ];
  const notes =   {
      "summary": "薩爾滸之戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "后金努尔哈赤以“五大臣、十固山”体制，在萨尔浒以“凭几而战”分路反击；明军四路进击互不协同，一日之内三战三败。",
      "leaders": "努爾哈赤以「七大恨」起兵，集中八旗精銳，在薩爾滸以各個擊破戰術對抗明軍分路進擊。明軍遼東經略楊鎬指揮不統，杜松、馬林等部先後被殲，明軍慘敗。此戰後金勢力坐大，明朝喪失遼東主動權，為日後清軍入關奠定基礎。",
      "nationalPower": "明军多路冒进、指挥混乱；后金全民皆兵、以逸待劳，熟悉辽东地形。",
      "impact": "後金（清）大敗明軍，掌握遼東戰略主動權，敲響明亡喪鐘。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 124.1,
              "lat": 41.9,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1619年",
          "title_zh": "明軍四路進攻",
          "title_en": "Four Ming Columns Advance",
          "narration_zh": "明廷集全國精銳，分四路進擊後金，意圖一舉蕩平遼東。",
          "narration_en": "The Ming dispatches four columns to crush the Later Jin in Liaodong.",
          "focus": [
              "ming_sarhu"
          ],
          "side": "ming",
          "commanders": [
              {
                  "zh": "楊鎬",
                  "en": "Yang Hao"
              }
          ],
          "assets": [],
          "forces_zh": "明軍約十萬",
          "forces_en": "~100,000 Ming troops"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 124.15,
              "lat": 41.92,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1619年3月1日",
          "title_zh": "薩爾滸初戰",
          "title_en": "First Clash at Sarhu",
          "narration_zh": "後金努爾哈赤以「憑幾而戰」分路反擊，先破明軍西路。",
          "narration_en": "Nurhaci counter-attacks in detail — the western Ming column is destroyed.",
          "focus": [
              "jin_sarhu"
          ],
          "side": "eastern_jin",
          "commanders": [
              {
                  "zh": "努爾哈赤",
                  "en": "Nurhaci"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 124.1,
              "lat": 41.88,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1619年3月1–2日",
          "title_zh": "三戰三敗",
          "title_en": "Three Defeats in Two Days",
          "narration_zh": "後金連續擊破明軍三路，明軍損失殆盡，僅一路倖免。",
          "narration_en": "Three Ming columns are annihilated in two days — only one escapes.",
          "focus": [
              "ming_sarhu",
              "jin_sarhu"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 124.1,
              "lat": 41.9,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1619年",
          "title_zh": "遼東主動權",
          "title_en": "Liaodong Initiative",
          "narration_zh": "後金完全掌握遼東戰略主動，明朝喪失進攻能力。",
          "narration_en": "The Later Jin holds the strategic initiative — Ming goes on the defensive.",
          "focus": [
              "jin_sarhu"
          ],
          "side": "eastern_jin",
          "commanders": [
              {
                  "zh": "努爾哈赤",
                  "en": "Nurhaci"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 124.1,
              "lat": 41.9,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1619年後",
          "title_zh": "明亡前奏",
          "title_en": "Prelude to Ming Fall",
          "narration_zh": "薩爾滸之戰敲響明亡喪鐘，後金（清）勢力迅速擴張。",
          "narration_en": "Sarhu sounds the knell of the Ming — the Later Jin expands rapidly.",
          "focus": [],
          "side": "eastern_jin",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "薩爾滸之戰",
      "title_en": "BATTLE OF SARHU",
      "narration_zh": "本戰役為 DSE 中史重要考點：後金（清）大敗明軍，掌握遼東戰略主動權，敲響明亡喪鐘",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 124.1,
          "lat": 41.9,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
