/* BATTLE OF GAIXIA · 垓下之戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-gaixia",
      "title_zh": "垓下之戰",
      "title_en": "BATTLE OF GAIXIA",
      "subtitle": "前202年",
      "factionOrder": [
          "chu",
          "han"
      ],
      "geo": {
          "minLng": 116.1,
          "maxLng": 118.3,
          "minLat": 32.7,
          "maxLat": 34.5,
          "Z": 10
      },
      "startDate": [
          202,
          1,
          1
      ],
      "introCam": {
          "lng": 117.2,
          "lat": 33.6,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "垓下之戰",
          "en": "BATTLE OF GAIXIA · 前202年",
          "narr_zh": "劉邦聯合韓信、彭越圍困項羽於垓下。",
          "narr_en": "Liu Bang and allies encircle Xiang Yu at Gaixia."
      },
      "outroCam": {
          "lng": 117.2,
          "lat": 33.6,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.14,
      "reliefScale": 0.68,
      "nextBattle": {
          "href": "../mobei/",
          "title_zh": "漠北之戰",
          "title_en": "MOBEI 119 BCE"
      }
  };
  const factions = {
    "chu": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "項羽（楚）", label_en: "Xiang Yu (Chu)",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "han": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "劉邦（漢）", label_en: "Liu Bang (Han)",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "垓下",
              "name_en": "Gaixia",
              "type": "fort",
              "lng": 117.2,
              "lat": 33.6
          },
          {
              "name_zh": "宿州",
              "name_en": "Suzhou",
              "type": "city",
              "lng": 116.98,
              "lat": 33.64
          },
          {
              "name_zh": "靈璧",
              "name_en": "Lingbi",
              "type": "town",
              "lng": 117.55,
              "lat": 33.55
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "corridor",
              "halfWidth": 0.14,
              "path": [
                  [
                      116.5,
                      33.9
                  ],
                  [
                      117,
                      33.75
                  ],
                  [
                      117.35,
                      33.55
                  ],
                  [
                      117.8,
                      33.45
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "han_gaixia",
          "faction": "han",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "漢軍主力",
          "name_en": "Han Main Force",
          "track": [
              {
                  "d": 1,
                  "lng": 117,
                  "lat": 33.8,
                  "s": 60000,
                  "st": "march"
              },
              {
                  "d": 50,
                  "lng": 117.2,
                  "lat": 33.6,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 117.2,
                  "lat": 33.6,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "chu_gaixia",
          "faction": "chu",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "楚軍",
          "name_en": "Chu Army",
          "track": [
              {
                  "d": 1,
                  "lng": 117.2,
                  "lat": 33.6,
                  "s": 100000,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 117.18,
                  "lat": 33.58,
                  "s": 30000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 117.2,
                  "lat": 33.6,
                  "s": 0,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "han",
          "from": [
              117,
              33.8
          ],
          "to": [
              117.2,
              33.6
          ],
          "label": "漢軍合圍",
          "kind": "attack"
      },
      {
          "d": 80,
          "f": "chu",
          "from": [
              117.2,
              33.6
          ],
          "to": [
              117.15,
              33.55
          ],
          "label": "項羽突圍",
          "kind": "retreat"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 90,
          "lng": 117.2,
          "lat": 33.6,
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
          "zh": "垓下之戰",
          "en": "BATTLE OF GAIXIA"
      }
  ];
  const notes =   {
      "summary": "垓下之戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "劉邦聯合韓信、彭越等部，在垓下對項羽楚軍實施十面埋伏；韓信以背水列陣穩住陣腳，楚軍夜聞四面楚歌，士氣崩潰。",
      "leaders": "項羽率楚軍固守垓下，卻因韓信佈下十面埋伏、四面楚歌而士氣崩潰；他拒絕渡江東再起，最終烏江自刎，象徵霸王氣數已盡。劉邦在蕭何、張良輔佐下採持久戰略，聯合韓信、彭越夾擊，以政治聯盟與軍事包圍取代正面決戰。韓信以背水一戰後的威望統率漢軍主力，切斷項羽退路，其用兵決斷直接促成西楚滅亡與漢朝建立。",
      "nationalPower": "劉邦得關中與巴蜀後勤，得項伯、英布等倒戈；項羽雖驍勇，但分封失當、失齊楚民心，兵疲糧盡。",
      "impact": "楚漢相爭結束，項羽兵敗自刎，劉邦勝出並建立漢朝。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 117.2,
              "lat": 33.6,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前206年",
          "title_zh": "楚漢對峙",
          "title_en": "Chu–Han Standoff",
          "narration_zh": "項羽分封天下後東返彭城，劉邦據關中蓄勢，楚漢戰爭全面爆發。",
          "narration_en": "After enfeoffing the realm, Xiang Yu returns east while Liu Bang holds Guanzhong — the Chu–Han war begins.",
          "focus": [
              "han_gaixia",
              "chu_gaixia"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "劉邦",
                  "en": "Liu Bang"
              },
              {
                  "zh": "項羽",
                  "en": "Xiang Yu"
              }
          ],
          "assets": [],
          "forces_zh": "楚漢主力對峙",
          "forces_en": "Chu and Han main forces"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 117.25,
              "lat": 33.65,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前202年冬",
          "title_zh": "十面埋伏",
          "title_en": "Ten-Sided Ambush",
          "narration_zh": "韓信、彭越、英布等合圍垓下，切斷楚軍退路與補給。",
          "narration_en": "Han Xin, Peng Yue and Ying Bu encircle Gaixia, cutting Chu supply lines.",
          "focus": [
              "han_gaixia"
          ],
          "side": "han",
          "commanders": [
              {
                  "zh": "韓信",
                  "en": "Han Xin"
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
              "lng": 117.2,
              "lat": 33.58,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前202年",
          "title_zh": "四面楚歌",
          "title_en": "Chu Songs on Four Sides",
          "narration_zh": "漢軍夜唱楚歌，楚軍士卒思鄉，軍心動搖。",
          "narration_en": "Han troops sing Chu songs at night — Chu soldiers lose heart.",
          "focus": [
              "chu_gaixia"
          ],
          "side": "chu",
          "commanders": [
              {
                  "zh": "項羽",
                  "en": "Xiang Yu"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 117.18,
              "lat": 33.55,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前202年",
          "title_zh": "項羽突圍",
          "title_en": "Xiang Yu Breaks Out",
          "narration_zh": "項羽率八百騎突圍，至烏江自刎，楚軍瓦解。",
          "narration_en": "Xiang Yu breaks out with 800 cavalry, then takes his life at the Wu River.",
          "focus": [
              "chu_gaixia"
          ],
          "side": "chu",
          "commanders": [],
          "assets": [],
          "forces_zh": "楚軍潰敗",
          "forces_en": "Chu army collapses"
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 117.2,
              "lat": 33.6,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前202年",
          "title_zh": "漢朝建立",
          "title_en": "Han Dynasty Founded",
          "narration_zh": "劉邦稱帝，定都長安，開創四百年漢業。",
          "narration_en": "Liu Bang becomes emperor, establishes Chang'an as capital — four centuries of Han rule begin.",
          "focus": [
              "han_gaixia"
          ],
          "side": "han",
          "commanders": [
              {
                  "zh": "劉邦",
                  "en": "Liu Bang"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "垓下之戰",
      "title_en": "BATTLE OF GAIXIA",
      "narration_zh": "本戰役為 DSE 中史重要考點：楚漢相爭結束，項羽兵敗自刎，劉邦勝出並建立漢朝",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 117.2,
          "lat": 33.6,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
