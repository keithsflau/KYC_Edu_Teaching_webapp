/* TUMU CRISIS · 土木堡之變 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-tumu",
      "title_zh": "土木堡之變",
      "title_en": "TUMU CRISIS",
      "subtitle": "1449年",
      "factionOrder": [
          "ming",
          "oirat"
      ],
      "geo": {
          "minLng": 114.15,
          "maxLng": 116.35,
          "minLat": 39.55,
          "maxLat": 41.35,
          "Z": 10
      },
      "startDate": [
          1449,
          8,
          1
      ],
      "introCam": {
          "lng": 115.25,
          "lat": 40.45,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "土木堡之變",
          "en": "TUMU CRISIS · 1449年",
          "narr_zh": "明英宗御駕親征，在土木堡遭瓦剌大軍圍困。",
          "narr_en": "The Zhengtong Emperor is captured when Oirat forces trap the Ming army."
      },
      "outroCam": {
          "lng": 115.25,
          "lat": 40.45,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "reliefScale": 0.7,
      "nextBattle": {
          "href": "../sarhu/",
          "title_zh": "薩爾滸之戰",
          "title_en": "SARHU 1619"
      }
  };
  const factions = {
    "ming": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "明軍", label_en: "Ming Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "oirat": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "瓦剌", label_en: "Oirat Mongols",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "土木堡",
              "name_en": "Tumu Fort",
              "type": "fort",
              "lng": 115.25,
              "lat": 40.45
          },
          {
              "name_zh": "懷來",
              "name_en": "Huailai",
              "type": "town",
              "lng": 115.52,
              "lat": 40.41
          },
          {
              "name_zh": "宣府",
              "name_en": "Xuanfu",
              "type": "city",
              "lng": 115.03,
              "lat": 40.61
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "ming_tumu",
          "faction": "ming",
          "kind": "command",
          "crest": "eagle",
          "cf": true,
          "name_zh": "明英宗親征軍",
          "name_en": "Imperial Ming Force",
          "track": [
              {
                  "d": 1,
                  "lng": 115.03,
                  "lat": 40.61,
                  "s": 50000,
                  "st": "march"
              },
              {
                  "d": 40,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 45000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "oirat_tumu",
          "faction": "oirat",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "也先瓦剌軍",
          "name_en": "Esen's Oirat Army",
          "track": [
              {
                  "d": 1,
                  "lng": 115.6,
                  "lat": 40.7,
                  "s": 40000,
                  "st": "march"
              },
              {
                  "d": 45,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 55000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 35,
          "f": "oirat",
          "from": [
              115.6,
              40.7
          ],
          "to": [
              115.25,
              40.45
          ],
          "label": "瓦剌合圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 80,
          "lng": 115.25,
          "lat": 40.45,
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
          "zh": "土木堡之變",
          "en": "TUMU CRISIS"
      }
  ];
  const notes =   {
      "summary": "土木堡之變 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "明英宗朱祁镇在宦官王振怂恿下亲征瓦剌，于土木堡遭也先伏击；明军溃败，英宗被俘，京师震动。",
      "leaders": "明英宗朱祁鎮在宦官王振慫恿下親征瓦剌，於土木堡輕敵冒進，全軍覆沒，英宗被俘。也先挾英宗南下威逼北京，明朝軍政大亂。兵部尚書于謙擁立景泰帝、固守北京，擊退瓦剌，英宗後來復辟；此戰重創明軍精銳，邊防由攻轉守，國防體制大幅調整。",
      "nationalPower": "明朝前期国力强盛但军政被宦官干政；瓦剌也先统一蒙古诸部，骑兵机动灵活。",
      "impact": "明英宗親征被瓦剌俘虜，明朝國勢由盛轉衰，轉取守勢。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 115.25,
              "lat": 40.45,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年",
          "title_zh": "英宗親征",
          "title_en": "Emperor's Personal Campaign",
          "narration_zh": "明英宗在王振慫恿下率五十萬大軍親征瓦剌。",
          "narration_en": "Emperor Yingzong leads 500,000 troops north against the Oirats.",
          "focus": [
              "ming_tumu"
          ],
          "side": "ming",
          "commanders": [
              {
                  "zh": "明英宗",
                  "en": "Emperor Yingzong"
              },
              {
                  "zh": "王振",
                  "en": "Wang Zhen"
              }
          ],
          "assets": [],
          "forces_zh": "明軍約五十萬",
          "forces_en": "~500,000 Ming troops"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 115.28,
              "lat": 40.48,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年8月",
          "title_zh": "土木堡進軍",
          "title_en": "Advance to Tumu",
          "narration_zh": "明軍倉促北進，糧草不繼，士氣低落。",
          "narration_en": "The Ming army advances hastily — supplies run short, morale falls.",
          "focus": [
              "ming_tumu"
          ],
          "side": "ming",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 115.25,
              "lat": 40.45,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年9月8日",
          "title_zh": "土木堡之變",
          "title_en": "Disaster at Tumu",
          "narration_zh": "也先率瓦剌騎兵伏擊土木堡，明軍大潰，英宗被俘。",
          "narration_en": "Esen's Oirat cavalry ambushes Tumu — the Ming routs, the emperor is captured.",
          "focus": [
              "oirat_tumu",
              "ming_tumu"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "也先",
                  "en": "Esen"
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
              "lng": 116.4,
              "lat": 39.9,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年",
          "title_zh": "于謙保衛北京",
          "title_en": "Yu Qian Defends Beijing",
          "narration_zh": "郕王即位為景帝，于謙組織北京保衛戰，擊退也先。",
          "narration_en": "The Prince of Cheng becomes Emperor Jingtai — Yu Qian repels Esen from Beijing.",
          "focus": [
              "ming_tumu"
          ],
          "side": "ming",
          "commanders": [
              {
                  "zh": "于謙",
                  "en": "Yu Qian"
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
              "lng": 115.25,
              "lat": 40.45,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年後",
          "title_zh": "由攻轉守",
          "title_en": "From Offense to Defense",
          "narration_zh": "土木之变后明朝国势转衰，对蒙古由攻转守，加强长城防御。",
          "narration_en": "After Tumu, Ming turns defensive — the Great Wall is reinforced.",
          "focus": [],
          "side": "ming",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "土木堡之變",
      "title_en": "TUMU CRISIS",
      "narration_zh": "本戰役為 DSE 中史重要考點：明英宗親征被瓦剌俘虜，明朝國勢由盛轉衰，轉取守勢",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 115.25,
          "lat": 40.45,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
