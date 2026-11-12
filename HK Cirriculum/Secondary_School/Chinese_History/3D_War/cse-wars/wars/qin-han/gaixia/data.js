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
      "sources": "《史記·項羽本紀》《史記·高祖本紀》《史記·淮陰侯列傳》《資治通鑑》卷十一。對照上述史書，不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "前202年，劉邦會合韓信、彭越、英布等部，把項羽圍在垓下。《史記·項羽本紀》記漢軍夜唱楚歌，楚軍士氣動搖。「十面埋伏」不見於《史記》對當日戰法的記載，不能當作垓下當日戰術。",
      "leaders": "項羽在垓下兵少食盡。《史記·項羽本紀》記漢軍夜唱楚歌，他率騎潰圍，至東城餘二十八騎，其後自刎烏江。劉邦一側由韓信、彭越、英布等部合圍。「十面埋伏」也不能當作《史記》所記的當日戰法。",
      "nationalPower": "劉邦據關中與巴蜀，糧食和兵員較穩。英布在戰前已歸漢。項伯是項羽的叔父，鴻門宴時曾護過劉邦，不能與英布並列為垓下倒戈。項羽分封失當，彭越、英布不附，楚軍兵少食盡。",
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
          "title_zh": "合圍垓下",
          "title_en": "Encirclement at Gaixia",
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
          "narration_zh": "《史記》記項羽夜潰圍，騎從者八百餘人，至東城僅餘二十八騎，其後自刎烏江。",
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
          "narration_zh": "劉邦於前202年稱帝，國號漢。",
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
      "narration_zh": "前202年垓下之後，項羽死，劉邦稱帝，國號漢。",
      "narration_en": "After Gaixia in 202 BCE, Xiang Yu dies and Liu Bang takes the title of emperor.",
      "cam": {
          "lng": 117.2,
          "lat": 33.6,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看前202年垓下怎樣結束楚漢之爭。",
      "senior": "高中：把《史記》所記和「十面埋伏」分開，再判斷勝敗。",
      "fact": "前202年，劉邦會合韓信、彭越、英布等部，把項羽圍在垓下。《史記·項羽本紀》記漢軍夜唱楚歌，楚軍士氣動搖；項羽夜潰圍，騎從者八百餘人，至東城餘二十八騎，其後自刎烏江。「十面埋伏」不見於《史記》對當日戰法的記載。英布在戰前已歸漢。項伯是項羽的叔父，曾在鴻門護劉邦，不能與英布並列為垓下倒戈。",
      "sources": "《史記·項羽本紀》《史記·高祖本紀》《史記·淮陰侯列傳》《資治通鑑》卷十一。對照上述史書，不以網絡百科為唯一依據。",
      "evaluation": "漢軍勝，關鍵在關中、巴蜀的糧食與兵員，以及韓信、彭越、英布等部已經合圍，楚軍兵少食盡。把後世「十面埋伏」當成垓下當日戰術，解釋不了這一仗。",
      "judgment": {
          "ask": "哪一則說法更能解釋垓下的勝敗？",
          "a": "韓信用《史記》所載的十面埋伏困住項羽，所以漢軍必勝。",
          "b": "項羽兵少糧盡，韓信、彭越、英布等部已把楚軍圍在垓下，退路和補給被切斷。",
          "better": "b",
          "why": "《史記》沒有把「十面埋伏」寫成當日戰術。合圍、缺糧和已歸漢的英布等部，更能說明楚軍為什麼敗。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
