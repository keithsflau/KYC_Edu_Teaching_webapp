/* BATTLE OF THE MARNE · 馬恩河戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-marne",
      "title_zh": "馬恩河戰役",
      "title_en": "BATTLE OF THE MARNE",
      "subtitle": "1914年9月",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 2.3,
          "maxLng": 4.5,
          "minLat": 48.25,
          "maxLat": 49.65,
          "Z": 10
      },
      "startDate": [
          1914,
          9,
          6
      ],
      "introCam": {
          "lng": 3.4,
          "lat": 48.95,
          "dist": 750,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "馬恩河戰役",
          "en": "BATTLE OF THE MARNE · 1914年9月",
          "narr_zh": "德軍逼近巴黎，英法聯軍在馬恩河阻止南下。",
          "narr_en": "Anglo-French forces halt the German advance at the Marne."
      },
      "outroCam": {
          "lng": 3.4,
          "lat": 48.95,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../verdun/",
          "title_zh": "凡爾登戰役",
          "title_en": "VERDUN 1916"
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
              "name_en": "Marne River",
              "name_zh": "馬恩河",
              "type": "town",
              "lng": 3.4,
              "lat": 48.95
          },
          {
              "name_en": "Paris (east)",
              "name_zh": "巴黎東郊",
              "type": "city",
              "lng": 2.55,
              "lat": 48.86
          },
          {
              "name_en": "Meaux",
              "name_zh": "莫城",
              "type": "town",
              "lng": 2.88,
              "lat": 48.96
          }
      ],
      "lines": [
          {
              "name_zh": "9月初戰線",
              "name_en": "Early Sep front",
              "path": [
                  [
                      2.8,
                      49.2
                  ],
                  [
                      3.2,
                      49
                  ],
                  [
                      3.8,
                      48.9
                  ],
                  [
                      4.2,
                      48.85
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "cp_marne",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第一集團軍",
          "name_en": "German 1st Army",
          "track": [
              {
                  "d": 1,
                  "lng": 4,
                  "lat": 49.1,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 3.5,
                  "lat": 48.95,
                  "s": 70000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 4.2,
                  "lat": 49,
                  "s": 65000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ap_marne",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英法聯軍",
          "name_en": "Anglo-French Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 2.7,
                  "lat": 49,
                  "s": 75000,
                  "st": "retreat"
              },
              {
                  "d": 40,
                  "lng": 3.2,
                  "lat": 48.95,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 3,
                  "lat": 48.92,
                  "s": 95000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "cp",
          "from": [
              4,
              49.1
          ],
          "to": [
              3.4,
              48.95
          ],
          "label": "德軍南下",
          "kind": "attack"
      },
      {
          "d": 40,
          "f": "ap",
          "from": [
              2.7,
              49
          ],
          "to": [
              3.4,
              48.95
          ],
          "label": "馬恩河反擊",
          "kind": "attack"
      }
  ];
  const fronts =   [
      {
          "d": 1,
          "path": [
              [
                  3.6,
                  49.05
              ],
              [
                  3.4,
                  48.98
              ],
              [
                  3.2,
                  48.92
              ]
          ]
      },
      {
          "d": 100,
          "path": [
              [
                  3.8,
                  49.1
              ],
              [
                  3.5,
                  49
              ],
              [
                  3.2,
                  48.9
              ]
          ]
      }
  ];
  const hotspots =   [
      {
          "a": 30,
          "b": 70,
          "lng": 3.4,
          "lat": 48.95,
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
          "zh": "馬恩河戰役",
          "en": "BATTLE OF THE MARNE"
      }
  ];
  const notes =   {
      "summary": "馬恩河戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "德軍實施施里芬計劃，經比利時包抄巴黎；英法聯軍在馬恩河反擊，德軍被迫撤退，西線轉入塹壕僵持。",
      "leaders": "德軍克盧克擅自改變進攻方向，露出右翼空隙。法軍總司令霞飛與英軍司令弗倫奇協調反擊；法國政治家加列尼動員巴黎計程車運兵。此戰確立霞飛、後繼者貝當在西線防禦中的地位。",
      "nationalPower": "德國需同時應付東西兩線；協約國可動員英帝國資源與法國本土防禦。馬恩河戰役顯示速決戰略失敗。",
      "impact": "阻止德軍佔領巴黎，一戰西線形成四年塹壕戰；戰爭規模與傷亡遠超預期。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 4,
              "lat": 49.1,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月底",
          "title_zh": "施里芬計劃南下",
          "title_en": "Schlieffen Advance",
          "narration_zh": "德軍第一集團軍突破比利時，直撲巴黎東郊。",
          "narration_en": "German 1st Army drives through Belgium toward Paris.",
          "focus": [
              "cp_marne"
          ],
          "side": "cp",
          "commanders": [
              {
                  "zh": "克盧克",
                  "en": "von Kluck"
              }
          ],
          "assets": [],
          "forces_zh": "德軍約 80 萬人",
          "forces_en": "~800,000 German troops"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 3.4,
              "lat": 48.95,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年9月初",
          "title_zh": "馬恩河對峙",
          "title_en": "Standoff at the Marne",
          "narration_zh": "德軍前鋒抵達馬恩河，巴黎岌岌可危。",
          "narration_en": "German spearheads reach the Marne — Paris is threatened.",
          "focus": [
              "cp_marne",
              "ap_marne"
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
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": 3.2,
              "lat": 48.95,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年9月6日",
          "title_zh": "協約國反擊",
          "title_en": "Allied Counter-attack",
          "narration_zh": "英法聯軍在馬恩河發動反攻，利用德軍右翼空隙。",
          "narration_en": "Anglo-French forces counter-attack at the Marne.",
          "focus": [
              "ap_marne"
          ],
          "side": "ap",
          "commanders": [
              {
                  "zh": "霞飛",
                  "en": "Joffre"
              },
              {
                  "zh": "弗倫奇",
                  "en": "French"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 55,
          "hold": 8,
          "cam": {
              "lng": 3.5,
              "lat": 48.95,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年9月6–12日",
          "title_zh": "計程車運兵",
          "title_en": "Taxis to the Front",
          "narration_zh": "法軍動員巴黎計程車運送援兵，穩住防線。",
          "narration_en": "Paris taxis rush reinforcements to stabilise the line.",
          "focus": [
              "ap_marne"
          ],
          "side": "ap",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 4.2,
              "lat": 49,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年9月中旬",
          "title_zh": "德軍撤退",
          "title_en": "German Retreat",
          "narration_zh": "德軍被迫後撤至埃納河，施里芬計劃破滅。",
          "narration_en": "Germany retreats to the Aisne — the Schlieffen Plan fails.",
          "focus": [
              "cp_marne"
          ],
          "side": "cp",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 3.4,
              "lat": 48.95,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年秋",
          "title_zh": "西線僵持",
          "title_en": "Western Stalemate",
          "narration_zh": "雙方挖壕固守，西線進入四年塹壕戰。",
          "narration_en": "Both sides dig in — four years of trench warfare begin.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "馬恩河戰役",
      "title_en": "BATTLE OF THE MARNE",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 3.4,
          "lat": 48.95,
          "dist": 900,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
