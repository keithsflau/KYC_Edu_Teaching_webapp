/* VUKOVAR · 武科瓦爾圍城 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-vukovar",
      "title_zh": "武科瓦爾圍城",
      "title_en": "VUKOVAR",
      "subtitle": "1991年",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 18,
          "maxLng": 20,
          "minLat": 44.55,
          "maxLat": 46.15,
          "Z": 11
      },
      "startDate": [
          1991,
          8,
          25
      ],
      "introCam": {
          "lng": 19,
          "lat": 45.35,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "武科瓦爾圍城",
          "en": "VUKOVAR · 1991年",
          "narr_zh": "塞族南斯拉夫軍圍攻武科瓦爾三個月。",
          "narr_en": "JNA besieges Vukovar for three months."
      },
      "outroCam": {
          "lng": 19,
          "lat": 45.35,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../sarajevo/",
          "title_zh": "薩拉熱窩圍城",
          "title_en": "SARAJEVO 1992–96"
      }
  };
  const factions = {
    "sr": {
      main: 0x5c4033, glow: 0x8b4513, dim: 0x3a2820,
      css: "#6b3030", label_zh: "塞族部隊", label_en: "Serb Forces",
      emblem: "circle", maxStrength: 50000, textLight: "#e8dcc8"
    },
    "co": {
      main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a,
      css: "#1b4f72", label_zh: "克／波黑／科索沃", label_en: "Croat / Bosniak / Kosovo",
      emblem: "shield", maxStrength: 45000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Vukovar",
              "name_zh": "武科瓦爾",
              "type": "city",
              "lng": 19,
              "lat": 45.35
          },
          {
              "name_en": "Osijek",
              "name_zh": "奧西耶克",
              "type": "city",
              "lng": 18.69,
              "lat": 45.55
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_vuk",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "南斯拉夫人民軍",
          "name_en": "JNA",
          "track": [
              {
                  "d": 1,
                  "lng": 19.3,
                  "lat": 45.5,
                  "s": 40000,
                  "st": "attack"
              },
              {
                  "d": 80,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 35000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 30000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "co_vuk",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "克羅地亞守軍",
          "name_en": "Croatian Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 15000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 19,
                  "lat": 45.35,
                  "s": 2000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 19,
          "lat": 45.35,
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
          "zh": "武科瓦爾圍城",
          "en": "VUKOVAR"
      }
  ];
  const notes =   {
      "summary": "武科瓦爾圍城 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1991年南斯拉夫人民軍圍攻武科瓦爾；克羅地亞守軍抵抗後陷落，象徵克獨立戰爭殘酷。",
      "leaders": "克羅地亞圖季曼政府獨立；塞族米洛舍維奇支持東斯拉沃尼亞塞族武裝。南斯拉夫人民軍圍攻武科瓦爾。戰爭罪行與民族清洗開啟南斯拉夫解體血腥階段，影響後續波黑戰爭。",
      "nationalPower": "南斯拉夫聯邦瓦解；塞族與克族民族主義對立。",
      "impact": "克羅地亞獨立戰爭關鍵一役；種族清洗與戰爭罪指控。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 19.3,
              "lat": 45.5,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年8月",
          "title_zh": "南斯拉夫軍圍城",
          "title_en": "JNA Besieges Vukovar",
          "narration_zh": "南斯拉夫人民軍與塞族民兵包圍武科瓦爾。",
          "narration_en": "Yugoslav People's Army and Serb militia besiege Vukovar.",
          "focus": [
              "sr_vuk"
          ],
          "side": "sr",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 19,
              "lat": 45.35,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年9–10月",
          "title_zh": "城市巷戰",
          "title_en": "Urban Fighting",
          "narration_zh": "克羅地亞守軍在廢墟中頑抗。",
          "narration_en": "Croatian defenders fight in the ruins.",
          "focus": [
              "co_vuk",
              "sr_vuk"
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
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 19,
              "lat": 45.35,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年11月",
          "title_zh": "補給斷絕",
          "title_en": "Supplies Cut",
          "narration_zh": "守軍彈盡糧絕，平民傷亡慘重。",
          "narration_en": "Defenders run out of supplies — heavy civilian casualties.",
          "focus": [
              "co_vuk"
          ],
          "side": "co",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 19,
              "lat": 45.35,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年11月18日",
          "title_zh": "武科瓦爾陷落",
          "title_en": "Vukovar Falls",
          "narration_zh": "城市陷落，成為戰爭殘酷象徵。",
          "narration_en": "The city falls — a symbol of the war's brutality.",
          "focus": [
              "sr_vuk"
          ],
          "side": "sr",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 19,
              "lat": 45.35,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年後",
          "title_zh": "克羅地亞獨立",
          "title_en": "Croatian Independence",
          "narration_zh": "武科瓦爾推動克羅地亞獨立與國際承認。",
          "narration_en": "Vukovar galvanises Croatian independence.",
          "focus": [],
          "side": "co",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "武科瓦爾圍城",
      "title_en": "VUKOVAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 19,
          "lat": 45.35,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
