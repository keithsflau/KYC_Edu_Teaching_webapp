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
      "sources": "《宋史·瀛國公紀》《宋史·張世傑傳》《宋史·陸秀夫傳》《元史·張弘範傳》《資治通鑑後編》及元明記載中的崖山海戰。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "1279年張弘範以水師圍崖山，張世傑以船艦結陣護衛趙昺。元軍切斷淡水並南北夾擊，宋軍大潰。這不是赤壁式火攻。張世傑曾率餘艦突圍。",
      "leaders": "張世傑率船隊護衛趙昺退守崖山，船艦連成陣。張弘範圍困並切斷淡水，宋軍大潰。陸秀夫負帝投海。張世傑曾突圍，後來遇風而死。這不是赤壁式火攻。文天祥在此之前已經被俘。",
      "nationalPower": "南宋殘餘船隊退到崖山，淡水和糧食都缺。元軍水師已經完成包圍，掌握海戰的主動。",
      "impact": "陸秀夫負趙昺投海，南宋朝廷終結。張世傑曾突圍，其後在海上遇風而死。失敗不是赤壁式火攻。"
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
          "title_zh": "斷糧與圍困",
          "title_en": "Blockade and Starvation",
          "narration_zh": "元軍切斷宋軍的淡水和補給，宋軍困在海上，形勢日緊。",
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
          "title_zh": "南北夾擊",
          "title_en": "Naval Decisive Battle",
          "narration_zh": "元軍從南北夾擊。宋軍大艦以繩索相連，難以散開，陣勢崩潰。這不是赤壁式火攻。張世傑其後曾突圍。",
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
          "narration_zh": "陸秀夫背負八歲帝昺投海殉國，楊太後亦投海，南宋滅亡。",
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
          "narration_zh": "陸秀夫負帝投海。張世傑曾突圍，其後遇風而死。",
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
      "narration_zh": "1279年崖山戰後，陸秀夫負帝投海。張世傑曾突圍，其後遇風而死。",
      "narration_en": "After Yamen in 1279, Lu Xiufu entered the sea with the emperor. Zhang Shijie broke out and later died in a storm.",
      "cam": {
          "lng": 113.05,
          "lat": 22.28,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1279年崖山被圍、陸秀夫負帝投海，以及張世傑曾突圍。",
      "senior": "高中：不要把崖山失敗寫成赤壁式火攻，並分開史實和「宋室氣節」的評價。",
      "fact": "1279年，元將張弘範以水師圍崖山。張世傑以千餘艘船結陣，護衛趙昺，船艦用繩索相連，方便固守，也難以散開。元軍切斷宋軍淡水，再從南北夾擊，宋軍大潰。這不是赤壁那種火燒敵艦。陸秀夫背負趙昺投海。張世傑曾率餘艦突圍，其後在海上遇風溺死。",
      "sources": "《宋史·瀛國公紀》《宋史·張世傑傳》《宋史·陸秀夫傳》《元史·張弘範傳》《資治通鑑後編》及元明記載中的崖山海戰。不以網絡百科為唯一依據。",
      "evaluation": "宋軍敗，是因為被圍、缺淡水、連艦難以機動，又被元軍夾擊。把它寫成赤壁式火攻，或說全軍在火攻中覆沒、張世傑沒有突圍，都和記載不合。陸秀夫投海在後世常被評價為氣節，那是評價，不是戰術本身。",
      "judgment": {
          "ask": "哪一則說法更能解釋崖山宋軍的失敗？",
          "a": "元軍像赤壁一樣用火船燒掉連在一起的宋艦，宋軍因此全軍覆沒，張世傑也死在火攻裡。",
          "b": "宋艦被圍、缺乏淡水，連艦難以散開，元軍南北夾擊後宋陣崩潰；張世傑曾突圍。",
          "better": "b",
          "why": "崖山不是赤壁式火攻。淡水斷絕、結陣被圍和夾擊更能說明潰敗。張世傑曾突圍，不是死在火攻當場。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
