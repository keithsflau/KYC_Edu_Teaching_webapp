/* SARAJEVO SIEGE · 薩拉熱窩圍城 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-sarajevo",
      "title_zh": "薩拉熱窩圍城",
      "title_en": "SARAJEVO SIEGE",
      "subtitle": "1992–1996",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 17.41,
          "maxLng": 19.41,
          "minLat": 43.06,
          "maxLat": 44.66,
          "Z": 11
      },
      "startDate": [
          1992,
          4,
          5
      ],
      "introCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 550,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "薩拉熱窩圍城",
          "en": "SARAJEVO SIEGE · 1992–1996",
          "narr_zh": "波黑首都被塞族部隊圍城逾三年。",
          "narr_en": "Bosnia's capital is besieged for over three years."
      },
      "outroCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../srebrenica/",
          "title_zh": "斯雷布雷尼察",
          "title_en": "SREBRENICA 1995"
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
              "name_en": "Sarajevo",
              "name_zh": "薩拉熱窩",
              "type": "city",
              "lng": 18.41,
              "lat": 43.86
          },
          {
              "name_en": "Mount Igman",
              "name_zh": "伊格曼山",
              "type": "peak",
              "lng": 18.25,
              "lat": 43.75
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_sar",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "塞族部隊",
          "name_en": "Serb Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 18.6,
                  "lat": 44,
                  "s": 35000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 18.45,
                  "lat": 43.88,
                  "s": 30000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "co_sar",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "波黑守軍",
          "name_en": "Bosniak Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 25000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 28000,
                  "st": "hold"
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
          "lng": 18.41,
          "lat": 43.86,
          "kind": "artillery",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.25,
          "fog": 0.2,
          "rain": 0.15,
          "smoke": 0.7,
          "zh": "薩拉熱窩圍城",
          "en": "Siege of Sarajevo"
      }
  ];
  const notes =   {
      "summary": "薩拉熱窩圍城 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1992–1996年塞族部隊圍困薩拉熱窩；波黑首都遭炮擊與狙擊，國際社會介入維和。",
      "leaders": "波黑伊澤特貝戈維奇主張獨立；塞族卡拉季奇、姆拉迪奇圍城薩拉熱窩。聯合國維和有限；北約後期空襲。圍城象徵波黑戰爭苦難，戰後海牙法庭審判戰爭罪，重塑巴爾幹政治版圖。",
      "nationalPower": "波黑三族分立；塞族軍事優勢與山區火力。",
      "impact": "波黑戰爭象徵；代頓協議後波黑成為複合國家。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1992年4月",
          "title_zh": "圍城開始",
          "title_en": "Siege Begins",
          "narration_zh": "塞族部隊占領高地，炮轟薩拉熱窩。",
          "narration_en": "Serb forces occupy heights — shell Sarajevo.",
          "focus": [
              "sr_sar"
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
              "lng": 18.41,
              "lat": 43.86,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1992–1994年",
          "title_zh": "狙擊與炮擊",
          "title_en": "Snipers and Shelling",
          "narration_zh": "市民在「狙擊手巷子」與炮擊下生活。",
          "narration_en": "Civilians live under snipers and artillery.",
          "focus": [
              "co_sar"
          ],
          "side": "co",
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
              "lng": 18.41,
              "lat": 43.86,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1993年",
          "title_zh": "國際介入",
          "title_en": "International Role",
          "narration_zh": "聯合國維和部隊進駐，人道走廊開放。",
          "narration_en": "UN peacekeepers deploy — humanitarian corridors.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年",
          "title_zh": "北約空襲",
          "title_en": "NATO Air Strikes",
          "narration_zh": "斯雷布雷尼察後北約加強對塞族目標打擊。",
          "narration_en": "After Srebrenica, NATO intensifies strikes on Serb targets.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1996年",
          "title_zh": "圍城結束",
          "title_en": "Siege Ends",
          "narration_zh": "代頓協議後圍城解除，薩拉熱窩重建。",
          "narration_en": "Dayton Agreement ends the siege — Sarajevo rebuilds.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "薩拉熱窩圍城",
      "title_en": "SARAJEVO SIEGE",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
