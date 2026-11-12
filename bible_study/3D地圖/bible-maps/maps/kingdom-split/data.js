/* DIVIDED KINGDOM · 國度分裂 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "split",
      "title_zh": "國度分裂",
      "title_en": "DIVIDED KINGDOM",
      "subtitle": "王上12",
      "factionOrder": [
          "north",
          "south"
      ],
      "geo": {
          "minLng": 33.92,
          "maxLng": 36.92,
          "minLat": 31.01,
          "maxLat": 34.01,
          "Z": 9
      },
      "startDate": "王上12",
      "introCam": {
          "lng": 35.421,
          "lat": 32.5095,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "國度分裂",
          "en": "DIVIDED KINGDOM · 王上12",
          "narr_zh": "於是以色列人背叛大衛家；北方十支派立耶羅波安為王。",
          "narr_en": "Israel rebelled against the house of David; Jeroboam became king of the north."
      },
      "outroCam": {
          "lng": 35.421,
          "lat": 32.5095,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../prophets/",
          "title_zh": "先知時序與地點",
          "title_en": "PROPHETS"
      }
  };
  const factions = {
    "north": {
      main: 0x4a7ab5, glow: 0x7aa8d8, dim: 0x2d4d73,
      css: "#4a7ab5", label_zh: "北國以色列", label_en: "Northern Israel",
      emblem: "circle", maxStrength: 60000, textLight: "#e0eef8"
    },
    "south": {
      main: 0xc9a227, glow: 0xffd54f, dim: 0x8b6914,
      css: "#c9a227", label_zh: "南國猶大", label_en: "Kingdom of Judah",
      emblem: "shield", maxStrength: 50000, textLight: "#fff8e0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "示劍",
              "name_en": "Shechem",
              "type": "town",
              "lng": 35.289,
              "lat": 32.213,
              "ref": "創 12:6"
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
              "name_zh": "得撒",
              "name_en": "Tirzah",
              "type": "city",
              "lng": 35.289,
              "lat": 32.252,
              "ref": "王上 14:17"
          },
          {
              "name_zh": "撒瑪利亞",
              "name_en": "Samaria",
              "type": "city",
              "lng": 35.193,
              "lat": 32.276,
              "ref": "王上 16:24"
          },
          {
              "name_zh": "伯特利",
              "name_en": "Bethel",
              "type": "town",
              "lng": 35.222,
              "lat": 31.927,
              "ref": "創 12:8"
          },
          {
              "name_zh": "但",
              "name_en": "Dan",
              "type": "town",
              "lng": 35.649,
              "lat": 33.241,
              "ref": "王上 12:29"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "judah",
          "faction": "south",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "猶大國",
          "name_en": "Kingdom of Judah",
          "track": [
              {
                  "d": 1,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 40000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 35000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "israel_n",
          "faction": "north",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "以色列國",
          "name_en": "Kingdom of Israel",
          "track": [
              {
                  "d": 1,
                  "lng": 35.289,
                  "lat": 32.213,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 40,
                  "lng": 35.289,
                  "lat": 32.252,
                  "s": 52000,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 35.193,
                  "lat": 32.276,
                  "s": 55000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "國度分裂",
          "en": "DIVIDED KINGDOM"
      }
  ];
  const notes =   {
      "summary": "國度分裂 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "羅波安在示劍拒減軛（王上12）；北方立耶羅波安；北國早期都城得撒（王上14:17），後暗利建撒瑪利亞（王上16:24）；耶羅波安在但與伯特利設金牛犢（王上12:28-29）。",
      "leaders": "羅波安、耶羅波安、暗利。",
      "nationalPower": "分裂與偶像敬拜扭曲真敬拜。",
      "impact": "猶大線保存大衛譜系。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.289,
              "lat": 32.213,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前931年",
          "title_zh": "示劍會議",
          "title_en": "Shechem",
          "narration_zh": "王上12:1 羅波安往示劍，以色列眾人來立他為王。",
          "narration_en": "1 Kgs 12:1 — All Israel assembled at Shechem for Rehoboam.",
          "focus": [
              "judah",
              "israel_n"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "羅波安",
                  "en": "Rehoboam"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 35.289,
              "lat": 32.213,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前931年",
          "title_zh": "十支派叛變",
          "title_en": "Rebellion",
          "narration_zh": "王上12:16 以色列人說：我們與大衛有什麼分兒？就叛變立耶羅波安。",
          "narration_en": "1 Kgs 12:16 — Israel rebelled and made Jeroboam king.",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "耶羅波安",
                  "en": "Jeroboam"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前931年",
          "title_zh": "猶大留守",
          "title_en": "Judah",
          "narration_zh": "王上12:20 只有猶大支派歸羅波安，以耶路撒冷為都。",
          "narration_en": "1 Kgs 12:20 — Only Judah remained loyal to Rehoboam in Jerusalem.",
          "focus": [
              "judah"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 35.289,
              "lat": 32.252,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "分裂初期",
          "title_zh": "得撒",
          "title_en": "Tirzah",
          "narration_zh": "王上14:17 耶羅波安兒子死後，北國早期都城得撒。",
          "narration_en": "1 Kgs 14:17 — Tirzah served as an early northern capital.",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 80,
          "hold": 8,
          "cam": {
              "lng": 35.193,
              "lat": 32.276,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前880年",
          "title_zh": "撒瑪利亞",
          "title_en": "Samaria",
          "narration_zh": "王上16:24 暗利買撒瑪利亞山建城，作北國都城。",
          "narration_en": "1 Kgs 16:24 — Omri built Samaria as Israel's capital.",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 35.222,
              "lat": 31.927,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "分裂後",
          "title_zh": "伯特利金牛犢",
          "title_en": "Bethel",
          "narration_zh": "王上12:29 耶羅波安在伯特利與但設金牛犢，陷民於罪。",
          "narration_en": "1 Kgs 12:29 — Jeroboam set up golden calves at Bethel and Dan.",
          "focus": [
              "israel_n"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "國度分裂",
      "title_en": "DIVIDED KINGDOM",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.421,
          "lat": 32.5095,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
