/* FALL OF ISRAEL · 以色列亡國 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "israel-fall",
      "title_zh": "以色列亡國",
      "title_en": "FALL OF ISRAEL",
      "subtitle": "王下17",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.4,
          "maxLng": 44.94,
          "minLat": 31.26,
          "maxLat": 37.37,
          "Z": 8
      },
      "startDate": "王下17",
      "introCam": {
          "lng": 35.193,
          "lat": 32.276,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "以色列亡國",
          "en": "FALL OF ISRAEL · 王下17",
          "narr_zh": "亞述王攻陷撒瑪利亞，將以色列人擄去亞述。",
          "narr_en": "The king of Assyria captured Samaria and deported Israel."
      },
      "outroCam": {
          "lng": 35.193,
          "lat": 32.276,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../judah-fall/",
          "title_zh": "猶大國亡國",
          "title_en": "FALL OF JUDAH"
      }
  };
  const factions = {
    "covenant": {
      main: 0xc9a227, glow: 0xffd54f, dim: 0x8b6914,
      css: "#c9a227", label_zh: "選民／教會", label_en: "Covenant People",
      emblem: "shield", maxStrength: 80000, textLight: "#fff8e0"
    },
    "nations": {
      main: 0x5c4a72, glow: 0x8b7aa8, dim: 0x3a2f48,
      css: "#5c4a72", label_zh: "列國／仇敵", label_en: "Nations",
      emblem: "circle", maxStrength: 100000, textLight: "#e8e0f0"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "尼尼微",
              "name_en": "Nineveh",
              "type": "city",
              "lng": 43.152,
              "lat": 36.357,
              "ref": "拿 1:2"
          },
          {
              "name_zh": "撒瑪利亞",
              "name_en": "Samaria",
              "type": "city",
              "lng": 35.193,
              "lat": 32.276,
              "ref": "王上 16:24"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "samaria",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "撒瑪利亞",
          "name_en": "Samaria",
          "track": [
              {
                  "d": 1,
                  "lng": 35.193,
                  "lat": 32.276,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 35.193,
                  "lat": 32.276,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "assyria",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "亞述軍",
          "name_en": "Assyrian army",
          "track": [
              {
                  "d": 1,
                  "lng": 43.152,
                  "lat": 36.357,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 35.193,
                  "lat": 32.276,
                  "s": 75000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 35.193,
                  "lat": 32.276,
                  "s": 70000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 40,
          "b": 100,
          "lng": 35.193,
          "lat": 32.276,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "以色列亡國",
          "en": "FALL OF ISRAEL"
      }
  ];
  const notes =   {
      "summary": "以色列亡國 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "亞述王撒爾根二世圍攻撒瑪利亞三年（王下17:5-6），城陷於公元前722年；百姓被擄至亞述。",
      "leaders": "何細亞、亞述諸王；何西亞、阿摩司曾預告。",
      "nationalPower": "長期偶像與背約的後果。",
      "impact": "北國滅亡，猶大仍存。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 43.152,
              "lat": 36.357,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前724年",
          "title_zh": "亞述出兵",
          "title_en": "Nineveh",
          "narration_zh": "王下17:3 何細亞背叛亞述王，亞述大軍自尼尼微南下。",
          "narration_en": "2 Kgs 17:3 — Assyria marched from Nineveh against Israel.",
          "focus": [
              "assyria"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 30,
          "hold": 8,
          "cam": {
              "lng": 35.193,
              "lat": 32.276,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前724年",
          "title_zh": "圍攻撒瑪利亞",
          "title_en": "Siege",
          "narration_zh": "王下17:5 亞述王上來圍困撒瑪利亞，三年之久。",
          "narration_en": "2 Kgs 17:5 — Samaria was besieged for three years.",
          "focus": [
              "samaria",
              "assyria"
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
          "day": 60,
          "hold": 8,
          "cam": {
              "lng": 35.193,
              "lat": 32.276,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前722年",
          "title_zh": "城陷",
          "title_en": "Fall",
          "narration_zh": "王下17:6 撒瑪利亞被攻取，以色列王何細亞被囚。",
          "narration_en": "2 Kgs 17:6 — Samaria fell; King Hoshea was imprisoned.",
          "focus": [
              "samaria"
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
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 43.152,
              "lat": 36.357,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前722年",
          "title_zh": "擄至亞述",
          "title_en": "Deportation",
          "narration_zh": "王下17:6 以色列人被擄到亞述的哈臘、歌散等地。",
          "narration_en": "2 Kgs 17:6 — Israel was deported to Assyria.",
          "focus": [
              "assyria"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 100,
          "hold": 8,
          "cam": {
              "lng": 35.193,
              "lat": 32.276,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元前722年",
          "title_zh": "北國終結",
          "title_en": "End of Israel",
          "narration_zh": "王下17:18 耶和華向以色列人發怒，把他們從自己面前趕出。",
          "narration_en": "2 Kgs 17:18 — The LORD removed Israel from His presence.",
          "focus": [
              "samaria"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "以色列亡國",
      "title_en": "FALL OF ISRAEL",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.193,
          "lat": 32.276,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
