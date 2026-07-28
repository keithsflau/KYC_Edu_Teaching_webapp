/* BATTLE OF YAMEN · 崖山海戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-yamen",
      "title_zh": "崖山海戰",
      "title_en": "BATTLE OF YAMEN",
      "subtitle": "1279年",
      "factionOrder": [
          "song",
          "yuan"
      ],
      "geo": {
          "minLng": 112.35,
          "maxLng": 113.75,
          "minLat": 21.6,
          "maxLat": 22.7,
          "Z": 11
      },
      "startDate": [
          1279,
          3,
          19
      ],
      "introCam": {
          "lng": 113.05,
          "lat": 22.28,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "崖山海戰",
          "en": "BATTLE OF YAMEN · 1279年",
          "narr_zh": "元軍張弘範圍攻崖山，南宋覆滅，陸秀夫背帝昺投海。",
          "narr_en": "Yuan forces destroy the Song fleet at Yamen — the dynasty ends."
      },
      "outroCam": {
          "lng": 113.05,
          "lat": 22.28,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "ocean",
      "floodRelief": 0.58,
      "nextBattle": {
          "href": "../../ming-qing/tumu/",
          "title_zh": "土木堡之變",
          "title_en": "TUMU 1449"
      }
  };
  const factions = {
    "song": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "南宋水師", label_en: "Song Navy",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "yuan": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "元軍", label_en: "Yuan Forces",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "崖山",
              "name_en": "Yamen",
              "type": "bay",
              "lng": 113.05,
              "lat": 22.28
          },
          {
              "name_zh": "新會",
              "name_en": "Xinhui",
              "type": "town",
              "lng": 113.03,
              "lat": 22.52
          },
          {
              "name_zh": "珠江口",
              "name_en": "Pearl Estuary",
              "type": "bay",
              "lng": 113.6,
              "lat": 22.45
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "polygon",
              "ring": [
                  [
                      112.55,
                      22.48
                  ],
                  [
                      113.55,
                      22.55
                  ],
                  [
                      113.65,
                      22.05
                  ],
                  [
                      113.4,
                      21.82
                  ],
                  [
                      112.75,
                      21.88
                  ],
                  [
                      112.5,
                      22.18
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "song_yamen",
          "faction": "song",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "南宋流亡朝廷水師",
          "name_en": "Song Imperial Fleet",
          "track": [
              {
                  "d": 1,
                  "lng": 113.05,
                  "lat": 22.28,
                  "s": 100000,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 113.05,
                  "lat": 22.28,
                  "s": 20000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 113.05,
                  "lat": 22.28,
                  "s": 0,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "yuan_yamen",
          "faction": "yuan",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "元軍水陸",
          "name_en": "Yuan Combined Force",
          "track": [
              {
                  "d": 1,
                  "lng": 113.4,
                  "lat": 22.5,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 113.05,
                  "lat": 22.28,
                  "s": 130000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 113.05,
                  "lat": 22.28,
                  "s": 125000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "yuan",
          "from": [
              113.4,
              22.5
          ],
          "to": [
              113.05,
              22.28
          ],
          "label": "元軍合圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 35,
          "b": 95,
          "lng": 113.05,
          "lat": 22.28,
          "kind": "naval",
          "i": 1.1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "崖山海戰",
          "en": "BATTLE OF YAMEN"
      }
  ];
  const notes =   {
      "summary": "崖山海戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "元軍以張弘範率水師圍困崖山，南宋張世傑率艦隊護衛少帝趙昺；元軍以小艦火攻，宋军大舰因连锁而难以机动，全军覆没。",
      "leaders": "南宋末年，元軍壓境，張世傑率艦隊護衛少帝趙昺退守崖山，以海上陣法企圖固守。元將張弘範水陸夾攻，宋軍補給斷絕、士氣低落。陸秀夫背負趙昺投海殉國，文天祥此前兵敗被俘、堅拒招降，象徵宋室最後氣節；崖山覆滅後南宋滅亡，元朝統一中國。",
      "nationalPower": "南宋只剩东南一隅，兵少粮尽；元朝已统一北方，水军与蒙古骑兵协同，掌握海战主动。",
      "impact": "南宋水師全軍覆沒，陸秀夫背帝昺投海，元朝徹底統一天下。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 113.05,
              "lat": 22.28,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1279年",
          "title_zh": "崖山合圍",
          "title_en": "Siege of Yamen",
          "narration_zh": "元將張弘範率水師圍困崖山，南宋張世傑率艦隊護衛少帝趙昺。",
          "narration_en": "Yuan admiral Zhang Hongfan blockades Yamen — Song admiral Zhang Shijie guards Emperor Bing.",
          "focus": [
              "yuan_yamen",
              "song_yamen"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "張弘範",
                  "en": "Zhang Hongfan"
              },
              {
                  "zh": "張世傑",
                  "en": "Zhang Shijie"
              }
          ],
          "assets": [
              "navy"
          ],
          "forces_zh": "宋軍艦千餘",
          "forces_en": "1,000+ Song ships"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 113.08,
              "lat": 22.25,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1279年2月",
          "title_zh": "斷糧與围困",
          "title_en": "Blockade and Starvation",
          "narration_zh": "元軍切断宋军淡水与补给，宋军以海为家，形势日蹙。",
          "narration_en": "Yuan forces cut fresh water and supplies — the Song fleet weakens daily.",
          "focus": [
              "song_yamen"
          ],
          "side": "song",
          "commanders": [],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 113.05,
              "lat": 22.22,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1279年3月19日",
          "title_zh": "海戰決戰",
          "title_en": "Naval Decisive Battle",
          "narration_zh": "元军以小船火攻，宋大舰相连难以转向，全军溃败。",
          "narration_en": "Yuan fire-ships attack chained Song vessels — the Song fleet is destroyed.",
          "focus": [
              "yuan_yamen",
              "song_yamen"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 113.05,
              "lat": 22.2,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1279年3月19日",
          "title_zh": "陸秀夫負帝投海",
          "title_en": "Lu Xiufu's Final Act",
          "narration_zh": "陸秀夫背負八歲帝昺投海殉國，楊太后亦投海，南宋滅亡。",
          "narration_en": "Lu Xiufu carries the eight-year-old emperor into the sea — the Song dynasty ends.",
          "focus": [
              "song_yamen"
          ],
          "side": "song",
          "commanders": [
              {
                  "zh": "陸秀夫",
                  "en": "Lu Xiufu"
              },
              {
                  "zh": "趙昺",
                  "en": "Emperor Bing"
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
              "lng": 113.05,
              "lat": 22.28,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1279年",
          "title_zh": "元朝一統",
          "title_en": "Yuan Unification Complete",
          "narration_zh": "崖山海戰後，元朝徹底統一中國，宋亡。",
          "narration_en": "After Yamen, the Yuan completes unification of China.",
          "focus": [],
          "side": "yuan",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "崖山海戰",
      "title_en": "BATTLE OF YAMEN",
      "narration_zh": "本戰役為 DSE 中史重要考點：南宋水師全軍覆沒，陸秀夫背帝昺投海，元朝徹底統一天下",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 113.05,
          "lat": 22.28,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
