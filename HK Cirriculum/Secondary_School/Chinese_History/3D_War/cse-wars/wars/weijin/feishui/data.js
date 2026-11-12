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
      "sources": "《晉書·謝玄傳》《晉書·謝安傳》《晉書·苻堅載記》《資治通鑑》卷一〇五。草木皆兵與風聲鶴唳在上述記載中的先後不同。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "前秦苻堅率大軍南征，東晉謝玄率北府兵在淝水對峙；前秦軍後退失控，晉軍乘勢追擊，前秦全線潰敗。",
      "leaders": "前秦苻堅以南征東晉，號稱百萬，百萬是自稱不是清點實數。戰前他在八公山把草木看成晉兵。接戰時秦軍後退失控，苻融陣亡，不是張淵。潰退時的說法是風聲鶴唳。東晉謝玄等率北府兵追擊，前秦前鋒瓦解。",
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
          "narration_zh": "前秦苻堅自長安南下，號稱戎卒百萬、投鞭斷流。百萬是當時的說法，不是點算後的實數。",
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
          "title_zh": "八公山",
          "title_en": "Bagong Mountain",
          "narration_zh": "戰前，苻堅在壽陽城頭望八公山，把山上草木看成晉兵。草木皆兵發生在交戰之前，不是潰退的時候。",
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
          "title_zh": "淝水接戰",
          "title_en": "Fighting at the Fei",
          "narration_zh": "秦軍在淝水應晉軍之請稍退，陣腳大亂，前鋒統帥苻融陣亡。",
          "narration_en": "The Qin army falls back, the line breaks, and Fu Rong is killed.",
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
          "narration_zh": "謝玄、謝石率北府兵追擊。陣亡的是苻融，不是張淵。潰退時士卒風聲鶴唳，以為追兵。",
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
          "narration_zh": "383年淝水戰後，前秦前鋒瓦解，苻堅逃回北方，東晉仍保有江南。",
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
      "narration_zh": "383年淝水之戰，苻融陣亡，前秦前鋒瓦解，苻堅北逃。",
      "narration_en": "At the Fei River in 383, Fu Rong was killed and the Former Qin vanguard collapsed.",
      "cam": {
          "lng": 117.28,
          "lat": 31.86,
          "dist": 732,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：分清八公山的草木皆兵在戰前，潰退時是風聲鶴唳。",
      "senior": "高中：核對陣亡的是苻融，並把「百萬」標成號稱，再解釋為什麼前秦陣腳會亂。",
      "fact": "383年，前秦苻堅南征，號稱戎卒百萬。百萬是當時的說法，不是點算後的實數。戰前，苻堅在壽陽城頭望八公山，把山上草木看成晉兵，這就是「草木皆兵」，發生在交戰之前。其後秦軍在淝水應晉軍之請稍退，陣腳大亂，前鋒統帥苻融陣亡。晉軍北府兵渡河追擊。潰退時士卒風聲鶴唳，以為追兵，那不是草木皆兵。陣亡的是苻融，不是張淵。",
      "sources": "《晉書·謝玄傳》《晉書·謝安傳》《晉書·苻堅載記》《資治通鑑》卷一〇五。草木皆兵與風聲鶴唳在上述記載中的先後不同。不以網絡百科為唯一依據。",
      "evaluation": "前秦號稱雖大，前線指揮不齊，後退令一下就亂。東晉北府兵人數少，但趁亂追擊。用「百萬實數」解釋不了陣腳為什麼在接戰時崩潰。草木皆兵在戰前的八公山，潰退時是風聲鶴唳。",
      "judgment": {
          "ask": "哪一則說法更能解釋淝水的勝敗？",
          "a": "前秦實有百萬大軍，尚未接戰就因人數太多自行潰散。",
          "b": "百萬是號稱。戰前在八公山已有草木皆兵；接戰時秦軍後退失控，苻融陣亡，晉軍追擊。",
          "better": "b",
          "why": "草木皆兵在戰前的八公山，風聲鶴唳才在潰退時。陣亡的前秦大將是苻融。百萬必須標明是號稱，不能當成清點人數。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
