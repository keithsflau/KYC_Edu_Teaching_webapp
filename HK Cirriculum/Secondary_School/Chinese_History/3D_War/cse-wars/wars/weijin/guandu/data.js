/* BATTLE OF GUANDU · 官渡之戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-guandu",
      "title_zh": "官渡之戰",
      "title_en": "BATTLE OF GUANDU",
      "subtitle": "200年",
      "factionOrder": [
          "cao",
          "yuan"
      ],
      "geo": {
          "minLng": 112.9,
          "maxLng": 114.9,
          "minLat": 33.9,
          "maxLat": 35.5,
          "Z": 10
      },
      "startDate": [
          200,
          1,
          1
      ],
      "introCam": {
          "lng": 113.9,
          "lat": 34.7,
          "dist": 600,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "官渡之戰",
          "en": "BATTLE OF GUANDU · 200年",
          "narr_zh": "曹操與袁紹決戰官渡，以奇襲烏巢扭轉戰局。",
          "narr_en": "Cao Cao defeats Yuan Shao at Guandu after the raid on Wuchao."
      },
      "outroCam": {
          "lng": 113.9,
          "lat": 34.7,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.1,
      "reliefScale": 0.72,
      "nextBattle": {
          "href": "../chibi/",
          "title_zh": "赤壁之戰",
          "title_en": "RED CLIFFS 208"
      }
  };
  const factions = {
    "cao": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "曹操", label_en: "Cao Cao",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "yuan": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "袁紹", label_en: "Yuan Shao",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "官渡",
              "name_en": "Guandu",
              "type": "fort",
              "lng": 113.9,
              "lat": 34.7
          },
          {
              "name_zh": "烏巢",
              "name_en": "Wuchao",
              "type": "town",
              "lng": 114.2,
              "lat": 34.85
          },
          {
              "name_zh": "許昌",
              "name_en": "Xuchang",
              "type": "city",
              "lng": 113.85,
              "lat": 34.04
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "corridor",
              "halfWidth": 0.12,
              "path": [
                  [
                      113.2,
                      35.2
                  ],
                  [
                      113.5,
                      34.95
                  ],
                  [
                      113.85,
                      34.7
                  ],
                  [
                      114.2,
                      34.5
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "cao_guandu",
          "faction": "cao",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "曹軍",
          "name_en": "Cao Army",
          "track": [
              {
                  "d": 1,
                  "lng": 113.85,
                  "lat": 34.5,
                  "s": 40000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 113.9,
                  "lat": 34.7,
                  "s": 55000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 113.9,
                  "lat": 34.7,
                  "s": 60000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "yuan_guandu",
          "faction": "yuan",
          "kind": "infantry",
          "crest": "wheat",
          "cf": true,
          "name_zh": "袁軍",
          "name_en": "Yuan Army",
          "track": [
              {
                  "d": 1,
                  "lng": 114.1,
                  "lat": 34.8,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 70,
                  "lng": 113.9,
                  "lat": 34.7,
                  "s": 30000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 114.3,
                  "lat": 35,
                  "s": 10000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "yuan",
          "from": [
              114.1,
              34.8
          ],
          "to": [
              113.9,
              34.7
          ],
          "label": "袁紹南下",
          "kind": "attack"
      },
      {
          "d": 65,
          "f": "cao",
          "from": [
              113.85,
              34.5
          ],
          "to": [
              114.2,
              34.85
          ],
          "label": "奇襲烏巢",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 90,
          "lng": 113.9,
          "lat": 34.7,
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
          "zh": "官渡之戰",
          "en": "BATTLE OF GUANDU"
      }
  ];
  const notes =   {
      "summary": "官渡之戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "袁紹率十餘萬大軍南下，曹操以少數精銳在官渡對峙；許攸投曹，曹操奇襲烏巢焚燒袁軍糧草，袁軍潰散。",
      "leaders": "袁紹擁有四州、兵多將廣，卻優柔寡斷，未能趁曹操後方空虛時一舉擊滅，反以持久消耗戰略拖垮自身聯盟。曹操兵少糧絕，卻敢於奇襲烏巢，焚毀袁軍糧草，以少勝多扭轉戰局。此戰後曹操統一北方，袁紹集團瓦解，三國鼎立格局由此成形。",
      "nationalPower": "袁紹據有河北四州，兵多糧足但指揮分裂；曹操挟天子以令诸侯，精兵善戰、謀士雲集。",
      "impact": "曹操以少勝多擊敗袁紹，奠定統一北方基礎。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 113.9,
              "lat": 34.7,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "200年",
          "title_zh": "袁紹南下",
          "title_en": "Yuan Shao Advances South",
          "narration_zh": "袁紹率大軍渡河南下，曹操以官渡為屏障迎戰。",
          "narration_en": "Yuan Shao crosses the Yellow River south — Cao Cao holds the line at Guandu.",
          "focus": [
              "yuan_guandu"
          ],
          "side": "yuan",
          "commanders": [
              {
                  "zh": "袁紹",
                  "en": "Yuan Shao"
              }
          ],
          "assets": [],
          "forces_zh": "袁軍十餘萬",
          "forces_en": "100,000+ Yuan troops"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 113.85,
              "lat": 34.72,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "200年",
          "title_zh": "官渡對峙",
          "title_en": "Stalemate at Guandu",
          "narration_zh": "兩軍相持數月，曹操兵少糧絀，形勢危急。",
          "narration_en": "Months of stalemate — Cao Cao is outnumbered and short of supplies.",
          "focus": [
              "cao_guandu",
              "yuan_guandu"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "曹操",
                  "en": "Cao Cao"
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
              "lng": 113.95,
              "lat": 34.68,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "200年",
          "title_zh": "許攸投曹",
          "title_en": "Xu You Defects",
          "narration_zh": "袁紹謀士許攸投曹操，獻計偷襲烏巢糧屯。",
          "narration_en": "Yuan Shao's adviser Xu You defects and reveals the Wuchao granary.",
          "focus": [
              "cao_guandu"
          ],
          "side": "cao",
          "commanders": [
              {
                  "zh": "許攸",
                  "en": "Xu You"
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
              "lng": 114.05,
              "lat": 34.75,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "200年",
          "title_zh": "火燒烏巢",
          "title_en": "Burning Wuchao",
          "narration_zh": "曹操親率精銳夜襲烏巢，焚燒袁軍糧草，袁軍士氣崩潰。",
          "narration_en": "Cao Cao raids Wuchao by night and burns Yuan's supplies — Yuan's army collapses.",
          "focus": [
              "cao_guandu"
          ],
          "side": "cao",
          "commanders": [],
          "assets": [],
          "forces_zh": "袁軍糧盡潰散",
          "forces_en": "Yuan army routs without food"
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 113.9,
              "lat": 34.7,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "200年後",
          "title_zh": "北方統一",
          "title_en": "North Unification Begins",
          "narration_zh": "官渡之勝使曹操統一河北，奠定曹魏基業。",
          "narration_en": "Guandu opens the path to unifying the north — the foundation of Cao Wei.",
          "focus": [
              "cao_guandu"
          ],
          "side": "cao",
          "commanders": [
              {
                  "zh": "曹操",
                  "en": "Cao Cao"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "官渡之戰",
      "title_en": "BATTLE OF GUANDU",
      "narration_zh": "本戰役為 DSE 中史重要考點：曹操以少勝多擊敗袁紹，奠定統一北方基礎",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 113.9,
          "lat": 34.7,
          "dist": 720,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
