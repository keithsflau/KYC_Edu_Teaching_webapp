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
          "narr_zh": "曹操南下，周瑜採黃蓋之議火攻，曹軍水師受挫。諸葛亮定計不是史實。",
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
          "label": "黃蓋火攻",
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
      "sources": "《三國志》武帝紀、周瑜傳、魯肅傳、諸葛亮傳，裴松之注引《江表傳》《資治通鑑》卷六十五。小說《三國演義》只可作後世故事，不能當作戰報。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "208年曹操沿江東下。火攻由周瑜採黃蓋之議執行，曹軍其後北撤。東風、連環計和諸葛亮定計是《三國演義》的情節，不能寫成史實。",
      "leaders": "曹操南下時水軍不習江戰，軍中又有疾疫。周瑜採黃蓋的建議實施火攻，曹軍北撤。諸葛亮曾出使江東，但火攻之計不是他制定的。東風、連環計見於《三國演義》，不能寫成史實。魏、蜀、吳稱帝在220至229年，鼎立不是赤壁當日確立。",
      "nationalPower": "曹操雖據北方，但水軍不習江戰、疫疾流行；孫劉聯盟得長江天險與江東水師之長。",
      "impact": "208年孫劉聯軍擊退曹操南下。三國稱帝在220年至229年，不把赤壁寫成當日已確立鼎立。"
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
          "narration_zh": "魯肅主張聯劉抗曹，周瑜主持軍務。諸葛亮出使江東見於《三國志》，但火攻之計不是由他制定。",
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
          "title_zh": "黃蓋火攻",
          "title_en": "Huang Gai's Fire Attack",
          "narration_zh": "史書記黃蓋向周瑜建議火攻，並以火船進攻曹軍。東風、連環計是《三國演義》情節，不能當作赤壁當日史實。",
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
          "narration_zh": "火攻後曹軍向北撤退，損失很重。華容道是《三國演義》的情節，不能寫成史實。",
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
          "narration_zh": "208年曹軍北撤，未能吞併江東。魏、蜀、吳稱帝在220年至229年，鼎立不是赤壁當日確立。",
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
      "narration_zh": "208年火攻後曹操北撤。魏、蜀、吳稱帝在220至229年。",
      "narration_en": "After the 208 fire attack Cao Cao withdrew north. Wei, Shu and Wu proclaimed imperial titles between 220 and 229.",
      "cam": {
          "lng": 113.9,
          "lat": 29.7,
          "dist": 768,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看208年周瑜、黃蓋一線的火攻，以及曹操北撤。",
      "senior": "高中：把《三國志》的火攻和《三國演義》的東風、連環計、諸葛亮定計分開，並記鼎立在220至229年。",
      "fact": "208年，曹操取得荊州後沿江東下。魯肅主張聯劉，周瑜主持江東軍務。諸葛亮出使江東見於《三國志》，但火攻不是由他制定。《三國志·周瑜傳》及裴注引《江表傳》記黃蓋向周瑜建議火攻，周瑜採納，以火船進攻曹軍船艦。曹軍其後北撤。東風、連環計、諸葛亮定計和華容道釋曹操，是《三國演義》的情節，不能寫成史實。魏、蜀、吳稱帝分別在220年、221年、229年。",
      "sources": "《三國志》武帝紀、周瑜傳、魯肅傳、諸葛亮傳，裴松之注引《江表傳》《資治通鑑》卷六十五。小說《三國演義》只可作後世故事，不能當作戰報。不以網絡百科為唯一依據。",
      "evaluation": "曹軍不習水戰，又有疾疫，江東水軍則有長江可守。火攻能奏效，是周瑜採黃蓋之議。把演義情節寫成史實，解釋不了史書所記的勝敗。208年只是曹操未能吞併江東；鼎立局面要到220至229年稱帝才確立。",
      "judgment": {
          "ask": "哪一則說法更能解釋赤壁的勝敗？",
          "a": "諸葛亮定下連環計，又借東風，所以火攻必成，三國當日就鼎立了。",
          "b": "周瑜採黃蓋的火攻建議，曹軍不習水戰；演義裡的東風和連環計不能當作史實。",
          "better": "b",
          "why": "史書把火攻放在周瑜、黃蓋一線。諸葛亮定計、東風、連環計來自《三國演義》。稱帝年代是220至229年，不是208年當日。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
