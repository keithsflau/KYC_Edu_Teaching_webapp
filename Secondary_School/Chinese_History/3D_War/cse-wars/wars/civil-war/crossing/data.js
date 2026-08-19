/* CROSSING THE YANGTZE · 渡江戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-crossing",
      "title_zh": "渡江戰役",
      "title_en": "CROSSING THE YANGTZE",
      "subtitle": "1949年4月",
      "factionOrder": [
          "pla",
          "kmt"
      ],
      "geo": {
          "minLng": 117.28,
          "maxLng": 120.28,
          "minLat": 30.81,
          "maxLat": 33.31,
          "Z": 10
      },
      "startDate": [
          1949,
          4,
          20
      ],
      "introCam": {
          "lng": 118.78,
          "lat": 32.06,
          "dist": 680,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "渡江戰役",
          "en": "CROSSING THE YANGTZE · 1949年4月",
          "narr_zh": "百萬雄師過大江，解放軍攻佔南京，國府遷台。",
          "narr_en": "Two million troops cross the Yangtze — Nanjing falls."
      },
      "outroCam": {
          "lng": 118.78,
          "lat": 32.06,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "river"
  };
  const factions = {
    "pla": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "解放軍", label_en: "PLA",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "kmt": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "國民黨軍", label_en: "KMT Forces",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "南京",
              "name_en": "Nanjing",
              "type": "city",
              "lng": 118.78,
              "lat": 32.06
          },
          {
              "name_zh": "江浦",
              "name_en": "Jiangpu",
              "type": "town",
              "lng": 118.62,
              "lat": 32.06
          },
          {
              "name_zh": "上海",
              "name_en": "Shanghai",
              "type": "city",
              "lng": 121.47,
              "lat": 31.23
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "corridor",
              "halfWidth": 0.3,
              "path": [
                  [
                      117.85,
                      32.42
                  ],
                  [
                      118.25,
                      32.22
                  ],
                  [
                      118.78,
                      32.06
                  ],
                  [
                      119.25,
                      31.92
                  ],
                  [
                      119.75,
                      31.82
                  ],
                  [
                      120.2,
                      31.75
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "pla_crossing",
          "faction": "pla",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "第二、第三野戰軍",
          "name_en": "2nd & 3rd Field Armies",
          "track": [
              {
                  "d": 1,
                  "lng": 118.3,
                  "lat": 32.2,
                  "s": 1000000,
                  "st": "attack"
              },
              {
                  "d": 40,
                  "lng": 118.78,
                  "lat": 32.06,
                  "s": 1200000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 118.78,
                  "lat": 32.06,
                  "s": 1100000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "kmt_crossing",
          "faction": "kmt",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "長江防線",
          "name_en": "Yangtze Defence Line",
          "track": [
              {
                  "d": 1,
                  "lng": 118.78,
                  "lat": 32.06,
                  "s": 700000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 118.9,
                  "lat": 31.9,
                  "s": 200000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 121.47,
                  "lat": 31.23,
                  "s": 100000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 25,
          "f": "pla",
          "from": [
              118.3,
              32.2
          ],
          "to": [
              118.78,
              32.06
          ],
          "label": "百萬雄師過江",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 20,
          "b": 70,
          "lng": 118.78,
          "lat": 32.06,
          "kind": "landing",
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
          "zh": "渡江戰役",
          "en": "CROSSING THE YANGTZE"
      }
  ];
  const notes =   {
      "summary": "渡江戰役 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "渡江战役：第二、第三野战军与第四野战军一部，在西起湖口、东至江阴的千里战线上强渡长江；四月二十三日占领南京，总统府插旗。",
      "leaders": "渡江戰役前，毛澤東發表《將革命進行到底》，拒絕國民黨劃江而治方案，命令解放軍百萬大軍過江。國府總統李宗仁求和未果，蔣介石幕後部署長江防線，湯恩伯等部防守鬆懈。四月二十一日解放軍四路渡江，南京解放，國民政府遷台，中國大陸政權更迭完成。",
      "nationalPower": "国军长江防线指挥分裂，桂系与中央系矛盾；解放军渡江船队与民众支援充足，士气压倒。",
      "impact": "解放軍渡過長江攻佔南京，宣告中華民國政府在大陸的統治終結。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 118.78,
              "lat": 32.06,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年4月20日",
          "title_zh": "千里渡江",
          "title_en": "Crossing the Yangtze",
          "narration_zh": "第二、第三野战军在西起湖口、东至江阴的战线上强渡长江。",
          "narration_en": "Second and Third Field Armies cross the Yangtze on a thousand-li front.",
          "focus": [
              "pla_crossing"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "陈毅",
                  "en": "Chen Yi"
              },
              {
                  "zh": "粟裕",
                  "en": "Su Yu"
              }
          ],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "解放军百万",
          "forces_en": "1,000,000+ PLA"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 118.78,
              "lat": 32.06,
              "dist": 660,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年4月21日",
          "title_zh": "突破江防",
          "title_en": "Breaching the Line",
          "narration_zh": "解放军在中下游多处突破国民党长江防线，向纵深挺进。",
          "narration_en": "PLA breaches the Nationalist Yangtze line at multiple points.",
          "focus": [
              "pla_crossing",
              "kmt_crossing"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "landing"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 118.78,
              "lat": 32.06,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年4月23日",
          "title_zh": "占领南京",
          "title_en": "Nanjing Captured",
          "narration_zh": "第三野战军占领南京，总统府升起红旗。",
          "narration_en": "Third Field Army enters Nanjing — the red flag rises over the presidential palace.",
          "focus": [
              "pla_crossing"
          ],
          "side": "pla",
          "commanders": [
              {
                  "zh": "陈毅",
                  "en": "Chen Yi"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 121.47,
              "lat": 31.23,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年5月",
          "title_zh": "解放上海",
          "title_en": "Shanghai Liberated",
          "narration_zh": "第三野战军发起沪战役，上海宣告解放。",
          "narration_en": "The Shanghai campaign ends — China's largest city is liberated.",
          "focus": [
              "pla_crossing"
          ],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 118.78,
              "lat": 32.06,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1949年",
          "title_zh": "大陆统治终结",
          "title_en": "End of Mainland Rule",
          "narration_zh": "渡江战役宣告中华民国政府在大陆的统治终结，全国解放进入最后阶段。",
          "narration_en": "The Yangtze crossing ends ROC rule on the mainland.",
          "focus": [],
          "side": "pla",
          "commanders": [],
          "assets": [],
          "forces_zh": "四月二十三占南京",
          "forces_en": "Nanjing taken 23 April"
      }
  ];
  const outro =   {
      "title_zh": "渡江戰役",
      "title_en": "CROSSING THE YANGTZE",
      "narration_zh": "本戰役為 DSE 中史重要考點：解放軍渡過長江攻佔南京，宣告中華民國政府在大陸的統治終結",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 118.78,
          "lat": 32.06,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
