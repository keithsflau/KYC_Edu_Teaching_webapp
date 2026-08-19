/* BATTLE OF RED CLIFFS · 赤壁之戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-chibi",
      "title_zh": "赤壁之戰",
      "title_en": "BATTLE OF RED CLIFFS",
      "subtitle": "208年",
      "factionOrder": [
          "sun_liu",
          "cao"
      ],
      "geo": {
          "minLng": 112.65,
          "maxLng": 115.15,
          "minLat": 28.7,
          "maxLat": 30.7,
          "Z": 10
      },
      "startDate": [
          208,
          1,
          1
      ],
      "introCam": {
          "lng": 113.9,
          "lat": 29.7,
          "dist": 640,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "赤壁之戰",
          "en": "BATTLE OF RED CLIFFS · 208年",
          "narr_zh": "曹操南下，周瑜、諸葛亮以火攻大破曹軍水師。",
          "narr_en": "The Sun–Liu alliance defeats Cao Cao's fleet with fire ships."
      },
      "outroCam": {
          "lng": 113.9,
          "lat": 29.7,
          "dist": 768,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "river",
      "nextBattle": {
          "href": "../feishui/",
          "title_zh": "淝水之戰",
          "title_en": "FEISHUI 383"
      }
  };
  const factions = {
    "sun_liu": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "孫劉聯軍", label_en: "Sun–Liu Alliance",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "cao": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "曹操", label_en: "Cao Cao",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "赤壁",
              "name_en": "Red Cliffs",
              "type": "bay",
              "lng": 113.9,
              "lat": 29.7
          },
          {
              "name_zh": "江陵",
              "name_en": "Jiangling",
              "type": "city",
              "lng": 112.2,
              "lat": 30.35
          },
          {
              "name_zh": "夏口",
              "name_en": "Xiakou",
              "type": "fort",
              "lng": 114.3,
              "lat": 30.58
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "corridor",
              "halfWidth": 0.24,
              "path": [
                  [
                      114.65,
                      30.08
                  ],
                  [
                      114.15,
                      29.9
                  ],
                  [
                      113.9,
                      29.72
                  ],
                  [
                      113.5,
                      29.58
                  ],
                  [
                      113.1,
                      29.48
                  ],
                  [
                      112.7,
                      29.4
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "sunliu_chibi",
          "faction": "sun_liu",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "吳蜀聯軍水師",
          "name_en": "Allied Fleet",
          "track": [
              {
                  "d": 1,
                  "lng": 114.2,
                  "lat": 30.2,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 113.9,
                  "lat": 29.7,
                  "s": 65000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 113.9,
                  "lat": 29.7,
                  "s": 60000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "cao_chibi",
          "faction": "cao",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "曹軍水師",
          "name_en": "Cao Fleet",
          "track": [
              {
                  "d": 1,
                  "lng": 113.5,
                  "lat": 29.9,
                  "s": 200000,
                  "st": "attack"
              },
              {
                  "d": 55,
                  "lng": 113.9,
                  "lat": 29.7,
                  "s": 80000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 113.2,
                  "lat": 30.5,
                  "s": 40000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 45,
          "f": "sun_liu",
          "from": [
              114.2,
              30.2
          ],
          "to": [
              113.9,
              29.7
          ],
          "label": "火攻連環船",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 80,
          "lng": 113.9,
          "lat": 29.7,
          "kind": "naval",
          "i": 1.2
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "赤壁之戰",
          "en": "BATTLE OF RED CLIFFS"
      }
  ];
  const notes =   {
      "summary": "赤壁之戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "曹操率水陸大軍南下，孫權、劉備聯軍在赤壁以火攻焚燒連環戰船；東風助燃，曹軍潰敗北撤。",
      "leaders": "曹操率北方水軍南下，企圖一戰平定江東，但輕敵冒進、水土不服，連環船戰術更給火攻可乘之機。周瑜與諸葛亮定計火攻，聯合劉備軍在赤壁以風助火，大破曹軍水師。戰後孫權穩固江東，劉備取得荊州立足點，曹操統一全國的企圖受挫，三國分立局面確立。",
      "nationalPower": "曹操雖據北方，但水軍不習江戰、疫疾流行；孫劉聯盟得長江天險與江東水師之長。",
      "impact": "孫劉聯軍大敗曹操，阻斷曹操南下，奠定三國鼎立局面。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 113.9,
              "lat": 29.7,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "208年",
          "title_zh": "曹操南下",
          "title_en": "Cao Cao Moves South",
          "narration_zh": "曹操降劉琮、得荊州，率二十餘萬大軍東進，威脅江東。",
          "narration_en": "After taking Jing Province, Cao Cao advances east with 200,000+ men.",
          "focus": [
              "cao_chibi"
          ],
          "side": "cao",
          "commanders": [
              {
                  "zh": "曹操",
                  "en": "Cao Cao"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "曹軍水陸二十餘萬",
          "forces_en": "200,000+ Cao forces"
      },
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": 113.88,
              "lat": 29.72,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "208年",
          "title_zh": "孫劉聯盟",
          "title_en": "Sun–Liu Alliance",
          "narration_zh": "諸葛亮聯絡孫權，魯肅、周瑜主戰，孫劉結盟抗曹。",
          "narration_en": "Zhuge Liang and Lu Su forge the Sun–Liu alliance against Cao Cao.",
          "focus": [
              "sunliu_chibi"
          ],
          "side": "sun_liu",
          "commanders": [
              {
                  "zh": "周瑜",
                  "en": "Zhou Yu"
              },
              {
                  "zh": "諸葛亮",
                  "en": "Zhuge Liang"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": 113.92,
              "lat": 29.68,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "208年冬",
          "title_zh": "連環計與火攻",
          "title_en": "Fire Attack on Chained Ships",
          "narration_zh": "黃蓋詐降，以火船趁東風焚燒曹軍連環艦。",
          "narration_en": "Huang Gai's feigned surrender — fire ships burn Cao's chained fleet in the east wind.",
          "focus": [
              "sunliu_chibi",
              "cao_chibi"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "黃蓋",
                  "en": "Huang Gai"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 113.9,
              "lat": 29.65,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "208年",
          "title_zh": "曹軍潰敗",
          "title_en": "Cao Cao Routed",
          "narration_zh": "火攻後曹軍大潰，沿華容道北撤，損失慘重。",
          "narration_en": "Cao's army routs and retreats north via Huarong Road with heavy losses.",
          "focus": [
              "cao_chibi"
          ],
          "side": "cao",
          "commanders": [],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 113.9,
              "lat": 29.7,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "208年後",
          "title_zh": "三國雛形",
          "title_en": "Three Kingdoms Emerge",
          "narration_zh": "赤壁之戰阻斷統一，魏蜀吳鼎立格局確立。",
          "narration_en": "Red Cliffs blocks unification — the tripartite division of China takes shape.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "赤壁之戰",
      "title_en": "BATTLE OF RED CLIFFS",
      "narration_zh": "本戰役為 DSE 中史重要考點：孫劉聯軍大敗曹操，阻斷曹操南下，奠定三國鼎立局面",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 113.9,
          "lat": 29.7,
          "dist": 768,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
