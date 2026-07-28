/* BATTLE OF FEISHUI · 淝水之戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-feishui",
      "title_zh": "淝水之戰",
      "title_en": "BATTLE OF FEISHUI",
      "subtitle": "383年",
      "factionOrder": [
          "eastern_jin",
          "former_qin"
      ],
      "geo": {
          "minLng": 116.18,
          "maxLng": 118.38,
          "minLat": 30.96,
          "maxLat": 32.76,
          "Z": 10
      },
      "startDate": [
          383,
          1,
          1
      ],
      "introCam": {
          "lng": 117.28,
          "lat": 31.86,
          "dist": 610,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "淝水之戰",
          "en": "BATTLE OF FEISHUI · 383年",
          "narr_zh": "苻堅率百萬大軍南下，東晉謝玄軍於淝水大敗前秦。",
          "narr_en": "Fu Jian's massive army is routed by Eastern Jin at the Fei River."
      },
      "outroCam": {
          "lng": 117.28,
          "lat": 31.86,
          "dist": 732,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "river",
      "nextBattle": {
          "href": "../../sui-tang/anshi/",
          "title_zh": "安史之亂",
          "title_en": "AN LUSHAN REBELLION"
      }
  };
  const factions = {
    "eastern_jin": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "東晉", label_en: "Eastern Jin",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "former_qin": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "前秦", label_en: "Former Qin",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "淝水",
              "name_en": "Fei River",
              "type": "town",
              "lng": 117.28,
              "lat": 31.86
          },
          {
              "name_zh": "壽春",
              "name_en": "Shouchun",
              "type": "city",
              "lng": 116.78,
              "lat": 32.58
          },
          {
              "name_zh": "建康",
              "name_en": "Jiankang",
              "type": "city",
              "lng": 118.78,
              "lat": 32.06
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "corridor",
              "halfWidth": 0.11,
              "path": [
                  [
                      116.75,
                      32.02
                  ],
                  [
                      117.05,
                      31.92
                  ],
                  [
                      117.28,
                      31.86
                  ],
                  [
                      117.55,
                      31.8
                  ],
                  [
                      117.85,
                      31.74
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "jin_feishui",
          "faction": "eastern_jin",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "北府兵",
          "name_en": "Northern Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 117,
                  "lat": 32,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 55,
                  "lng": 117.28,
                  "lat": 31.86,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 117.28,
                  "lat": 31.86,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "qin_feishui",
          "faction": "former_qin",
          "kind": "infantry",
          "crest": "wheat",
          "cf": true,
          "name_zh": "前秦大軍",
          "name_en": "Former Qin Army",
          "track": [
              {
                  "d": 1,
                  "lng": 117.5,
                  "lat": 32.2,
                  "s": 200000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 117.28,
                  "lat": 31.86,
                  "s": 60000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 117.8,
                  "lat": 32.5,
                  "s": 20000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 50,
          "f": "eastern_jin",
          "from": [
              117,
              32
          ],
          "to": [
              117.28,
              31.86
          ],
          "label": "淝水半渡而擊",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 45,
          "b": 85,
          "lng": 117.28,
          "lat": 31.86,
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
          "zh": "淝水之戰",
          "en": "BATTLE OF FEISHUI"
      }
  ];
  const notes =   {
      "summary": "淝水之戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "前秦苻堅率大軍南征，東晉謝玄率北府兵在淝水對峙；前秦軍後退失控，晉軍乘勢追擊，前秦全線潰敗。",
      "leaders": "前秦苻堅自恃「投鞭斷流」之眾，率百萬大軍南征東晉，卻在前線指揮混亂、民族部隊離心下迅速潰敗。東晉謝玄、謝琰率北府兵以精銳擊其懈怠之師，淝水一戰前秦主力瓦解。苻堅敗逃後北方再度分裂，東晉政權得以延續，南北對峙格局延續數百年。",
      "nationalPower": "前秦雖統一北方，但民族融合不足、降卒不穩；東晉據長江天險，北府兵精銳且士氣高昂。",
      "impact": "東晉擊敗前秦，維持南北對峙，阻延了北方政權統一天下。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 117.28,
              "lat": 31.86,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "383年",
          "title_zh": "苻堅南征",
          "title_en": "Fu Jian Invades South",
          "narration_zh": "前秦苻堅自長安率百萬大軍南下，號稱投鞭斷流。",
          "narration_en": "Former Qin ruler Fu Jian advances south with a vast army from Chang'an.",
          "focus": [
              "qin_feishui"
          ],
          "side": "former_qin",
          "commanders": [
              {
                  "zh": "苻堅",
                  "en": "Fu Jian"
              }
          ],
          "assets": [],
          "forces_zh": "前秦號稱百萬",
          "forces_en": "Former Qin claims 1,000,000 men"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 117.25,
              "lat": 31.88,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "383年11月",
          "title_zh": "淝水對峙",
          "title_en": "Standoff at the Fei",
          "narration_zh": "晉軍北府兵在淝水列陣，與前秦隔河對峙。",
          "narration_en": "Eastern Jin Beifu troops face Former Qin across the Fei River.",
          "focus": [
              "jin_feishui",
              "qin_feishui"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "謝玄",
                  "en": "Xie Xuan"
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
              "lng": 117.3,
              "lat": 31.85,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "383年11月",
          "title_zh": "草木皆兵",
          "title_en": "Every Bush a Soldier",
          "narration_zh": "前秦後退時陣腳大亂，風吹草動皆被視為晉軍追兵，全軍潰散。",
          "narration_en": "Former Qin retreat turns to rout — every rustle seems an ambush.",
          "focus": [
              "qin_feishui"
          ],
          "side": "former_qin",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 62,
          "hold": 8,
          "cam": {
              "lng": 117.28,
              "lat": 31.9,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "383年",
          "title_zh": "北府兵追擊",
          "title_en": "Beifu Pursuit",
          "narration_zh": "謝玄、謝石率北府兵追擊，前秦名將張淵陣亡，北方統一夢碎。",
          "narration_en": "Xie Xuan's Beifu army pursues — Former Qin's dream of unification shatters.",
          "focus": [
              "jin_feishui"
          ],
          "side": "eastern_jin",
          "commanders": [
              {
                  "zh": "謝石",
                  "en": "Xie Shi"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 117.28,
              "lat": 31.86,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "383年後",
          "title_zh": "南北分立",
          "title_en": "North–South Division",
          "narration_zh": "前秦迅速瓦解，東晉國祚延續，南北對峙局面再定。",
          "narration_en": "Former Qin collapses; the Jin survives — north and south remain divided.",
          "focus": [],
          "side": "eastern_jin",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "淝水之戰",
      "title_en": "BATTLE OF FEISHUI",
      "narration_zh": "本戰役為 DSE 中史重要考點：東晉擊敗前秦，維持南北對峙，阻延了北方政權統一天下",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 117.28,
          "lat": 31.86,
          "dist": 732,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
