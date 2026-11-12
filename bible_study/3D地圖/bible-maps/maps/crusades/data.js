/* THE CRUSADES · 十字軍東征 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "crusades",
      "title_zh": "十字軍東征",
      "title_en": "THE CRUSADES",
      "subtitle": "1095–1291",
      "factionOrder": [
          "church",
          "empire"
      ],
      "geo": {
          "minLng": -3.11,
          "maxLng": 42.35,
          "minLat": 29.03,
          "maxLat": 48.53,
          "Z": 6
      },
      "startDate": "1095–1291",
      "introCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "十字軍東征",
          "en": "THE CRUSADES · 1095–1291",
          "narr_zh": "教皇烏爾班二世在克萊蒙號召收復聖地；十字軍多次遠征耶路撒冷。",
          "narr_en": "Pope Urban II called for the recovery of the Holy Land at Clermont."
      },
      "outroCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../church-schism/",
          "title_zh": "教會分裂史",
          "title_en": "GREAT SCHISM"
      }
  };
  const factions = {
    "church": {
      main: 0x9b7ec8, glow: 0xc4a8e8, dim: 0x6b4c9a,
      css: "#9b7ec8", label_zh: "教會", label_en: "Church",
      emblem: "shield", maxStrength: 50000, textLight: "#f0e8ff"
    },
    "empire": {
      main: 0x8b6914, glow: 0xc9a227, dim: 0x5c4810,
      css: "#8b6914", label_zh: "帝國／異教", label_en: "Empire / Other",
      emblem: "circle", maxStrength: 120000, textLight: "#fff8e0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "克萊蒙",
              "name_en": "Clermont",
              "type": "city",
              "lng": 3.083,
              "lat": 45.779,
              "ref": "1095 教皇號召"
          },
          {
              "name_zh": "尼西亞",
              "name_en": "Nicaea",
              "type": "city",
              "lng": 29.721,
              "lat": 40.429,
              "ref": "1097 圍城"
          },
          {
              "name_zh": "安條克",
              "name_en": "Antioch",
              "type": "city",
              "lng": 36.158,
              "lat": 36.202,
              "ref": "1098 圍城"
          },
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.235,
              "lat": 31.778,
              "ref": "撒下 5:7"
          },
          {
              "name_zh": "哈丁",
              "name_en": "Hattin",
              "type": "fort",
              "lng": 35.505,
              "lat": 32.806,
              "ref": "1187 戰役"
          },
          {
              "name_zh": "阿卡",
              "name_en": "Acre",
              "type": "fort",
              "lng": 35.084,
              "lat": 32.926,
              "ref": "1291 陷落"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "crusaders",
          "faction": "church",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "十字軍",
          "name_en": "Crusaders",
          "track": [
              {
                  "d": 1,
                  "lng": 3.083,
                  "lat": 45.779,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 25,
                  "lng": 29.721,
                  "lat": 40.429,
                  "s": 45000,
                  "st": "attack"
              },
              {
                  "d": 45,
                  "lng": 36.158,
                  "lat": 36.202,
                  "s": 42000,
                  "st": "attack"
              },
              {
                  "d": 65,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 40000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ayyubids",
          "faction": "empire",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "穆斯林聯軍",
          "name_en": "Muslim forces",
          "track": [
              {
                  "d": 1,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 60000,
                  "st": "hold"
              },
              {
                  "d": 75,
                  "lng": 35.505,
                  "lat": 32.806,
                  "s": 65000,
                  "st": "attack"
              },
              {
                  "d": 90,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 60000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.084,
                  "lat": 32.926,
                  "s": 55000,
                  "st": "attack"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 55,
          "lng": 36.158,
          "lat": 36.202,
          "kind": "firefight",
          "i": 0.8
      },
      {
          "a": 72,
          "b": 88,
          "lng": 35.505,
          "lat": 32.806,
          "kind": "firefight",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "十字軍東征",
          "en": "THE CRUSADES"
      }
  ];
  const notes =   {
      "summary": "十字軍東征 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "1095年烏爾班二世在克萊蒙（法國）號召；1097年攻尼西亞；1098年圍安條克；1099年陷耶路撒冷；1187年哈丁戰敗；1291年阿卡陷落。",
      "leaders": "烏爾班二世、薩拉丁、鮑德溫一世。",
      "nationalPower": "混合宗教熱忱與政治利益；加深東西方裂痕。",
      "impact": "塑造中世紀聖戰記憶。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 3.083,
              "lat": 45.779,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1095年11月",
          "title_zh": "克萊蒙",
          "title_en": "Clermont",
          "narration_zh": "1095年教皇烏爾班二世在克萊蒙議會號召收復聖地。",
          "narration_en": "1095 — Urban II's sermon at the Council of Clermont.",
          "focus": [
              "crusaders"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 29.721,
              "lat": 40.429,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1097年",
          "title_zh": "尼西亞",
          "title_en": "Nicaea",
          "narration_zh": "1097年第一次十字軍圍攻尼西亞（今伊茲尼克）。",
          "narration_en": "1097 — Siege of Nicaea.",
          "focus": [
              "crusaders"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 36.158,
              "lat": 36.202,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1098年",
          "title_zh": "安條克",
          "title_en": "Antioch",
          "narration_zh": "1098年十字軍經艱苦圍城奪取安條克，後繼續南下。",
          "narration_en": "1098 — Crusaders captured Antioch after a long siege.",
          "focus": [
              "crusaders",
              "ayyubids"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1099年7月",
          "title_zh": "耶路撒冷",
          "title_en": "Jerusalem",
          "narration_zh": "1099年7月第一次十字軍攻陷耶路撒冷，建立拉丁王國。",
          "narration_en": "July 1099 — Jerusalem fell to the First Crusade.",
          "focus": [
              "crusaders"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 80,
          "hold": 8,
          "cam": {
              "lng": 35.505,
              "lat": 32.806,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1187年7月",
          "title_zh": "哈丁",
          "title_en": "Hattin",
          "narration_zh": "1187年7月4日薩拉丁在哈丁山丘大敗十字軍。",
          "narration_en": "4 July 1187 — Saladin's victory at the Horns of Hattin.",
          "focus": [
              "ayyubids"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "薩拉丁",
                  "en": "Saladin"
              }
          ],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 100,
          "hold": 8,
          "cam": {
              "lng": 35.084,
              "lat": 32.926,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1291年5月",
          "title_zh": "阿卡",
          "title_en": "Acre",
          "narration_zh": "1291年5月阿卡陷落，十字軍在聖地最後據點失守。",
          "narration_en": "May 1291 — Fall of Acre ended the Crusader states.",
          "focus": [
              "ayyubids"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "十字軍東征",
      "title_en": "THE CRUSADES",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
