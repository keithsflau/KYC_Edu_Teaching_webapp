/* ERA OF JUDGES · 士師時代 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "judges",
      "title_zh": "士師時代",
      "title_en": "ERA OF JUDGES",
      "subtitle": "士師記",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.93,
          "maxLng": 36.43,
          "minLat": 31.22,
          "maxLat": 33.22,
          "Z": 9
      },
      "startDate": "士師記",
      "introCam": {
          "lng": 35.1845,
          "lat": 32.2225,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "士師時代",
          "en": "ERA OF JUDGES · 士師記",
          "narr_zh": "以色列人又行耶和華眼中看為惡的事，耶和華就把他們交在仇敵手中。",
          "narr_en": "Israel did evil again; the LORD gave them into the hand of their enemies."
      },
      "outroCam": {
          "lng": 35.1845,
          "lat": 32.2225,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../david/",
          "title_zh": "大衛時期",
          "title_en": "KING DAVID"
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
              "name_zh": "示羅",
              "name_en": "Shiloh",
              "type": "town",
              "lng": 35.29,
              "lat": 32.057,
              "ref": "士 21:19"
          },
          {
              "name_zh": "米吉多",
              "name_en": "Megiddo",
              "type": "fort",
              "lng": 35.185,
              "lat": 32.585,
              "ref": "士 5:19"
          },
          {
              "name_zh": "他泊山",
              "name_en": "Mount Tabor",
              "type": "peak",
              "lng": 35.391,
              "lat": 32.687,
              "ref": "士 4:6"
          },
          {
              "name_zh": "基順河",
              "name_en": "Kishon",
              "type": "bay",
              "lng": 35.12,
              "lat": 32.55,
              "ref": "士 4:7"
          },
          {
              "name_zh": "俄弗拉",
              "name_en": "Ophrah",
              "type": "town",
              "lng": 35.203,
              "lat": 32.189,
              "ref": "士 6:11"
          },
          {
              "name_zh": "耶斯列",
              "name_en": "Jezreel",
              "type": "region",
              "lng": 35.329,
              "lat": 32.557,
              "ref": "士 6:33"
          },
          {
              "name_zh": "瑣拉",
              "name_en": "Zorah",
              "type": "town",
              "lng": 34.978,
              "lat": 31.758,
              "ref": "士 13:2"
          },
          {
              "name_zh": "基比亞",
              "name_en": "Gibeah",
              "type": "town",
              "lng": 35.239,
              "lat": 31.823,
              "ref": "士 19:12"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "judges_is",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "以色列",
          "name_en": "Israel",
          "track": [
              {
                  "d": 1,
                  "lng": 35.29,
                  "lat": 32.057,
                  "s": 40000,
                  "st": "hold"
              },
              {
                  "d": 30,
                  "lng": 35.391,
                  "lat": 32.687,
                  "s": 10000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 35.203,
                  "lat": 32.189,
                  "s": 300,
                  "st": "attack"
              },
              {
                  "d": 75,
                  "lng": 34.978,
                  "lat": 31.758,
                  "s": 1,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.29,
                  "lat": 32.057,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "judges_en",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "米甸／非利士",
          "name_en": "Midian / Philistines",
          "track": [
              {
                  "d": 25,
                  "lng": 35.12,
                  "lat": 32.55,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 40,
                  "lng": 35.329,
                  "lat": 32.557,
                  "s": 0,
                  "st": "dead"
              },
              {
                  "d": 70,
                  "lng": 34.978,
                  "lat": 31.758,
                  "s": 30000,
                  "st": "attack"
              },
              {
                  "d": 85,
                  "lng": 34.978,
                  "lat": 31.758,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 28,
          "b": 45,
          "lng": 35.12,
          "lat": 32.55,
          "kind": "firefight",
          "i": 0.85
      },
      {
          "a": 48,
          "b": 58,
          "lng": 35.203,
          "lat": 32.189,
          "kind": "firefight",
          "i": 0.7
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "士師時代",
          "en": "ERA OF JUDGES"
      }
  ];
  const notes =   {
      "summary": "士師時代 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "士師記呈現犯罪—壓制—興起士師循環：底波拉在他泊召巴拉，基順河潰敗西西拉（士4-5）；基甸在俄弗拉率三百人擊米甸（士6-7）；參孫出自瑣拉，對抗非利士（士13-16）。",
      "leaders": "底波拉、巴拉、基甸、參孫、撒母耳。",
      "nationalPower": "「各人任意而行」顯明需要合神心意的君王。",
      "impact": "為大衛王朝興起鋪路。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.29,
              "lat": 32.057,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "士師時代",
          "title_zh": "示羅",
          "title_en": "Shiloh",
          "narration_zh": "士21:19 以色列人在示羅有耶和華的節期；士師時代宗教中心。",
          "narration_en": "Judg 21:19 — Shiloh was a central sanctuary in the judges era.",
          "focus": [
              "judges_is"
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
              "lng": 35.391,
              "lat": 32.687,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1200年",
          "title_zh": "他泊山",
          "title_en": "Mount Tabor",
          "narration_zh": "士4:6 底波拉打發人去基拿他山，從拿弗他利、西布倫支派招巴拉。",
          "narration_en": "Judg 4:6 — Deborah summoned Barak to Mount Tabor.",
          "focus": [
              "judges_is"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "底波拉",
                  "en": "Deborah"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 38,
          "hold": 8,
          "cam": {
              "lng": 35.12,
              "lat": 32.55,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1200年",
          "title_zh": "基順河",
          "title_en": "Kishon",
          "narration_zh": "士4:7 耶和華必使西西拉與全軍敗亡在基順河邊。",
          "narration_en": "Judg 4:7 — The LORD routed Sisera at the Kishon.",
          "focus": [
              "judges_is",
              "judges_en"
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
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.203,
              "lat": 32.189,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1160年",
          "title_zh": "俄弗拉",
          "title_en": "Ophrah",
          "narration_zh": "士6:11 耶和華的使者向基甸顯現；士7 三百人擊破米甸營。",
          "narration_en": "Judg 6-7 — Gideon at Ophrah; three hundred routed Midian.",
          "focus": [
              "judges_is"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "基甸",
                  "en": "Gideon"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 34.978,
              "lat": 31.758,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "士師末期",
          "title_zh": "瑣拉",
          "title_en": "Zorah",
          "narration_zh": "士13:2 參孫生在瑣拉，屬但支派；與非利士人周旋。",
          "narration_en": "Judg 13:2 — Samson of Zorah judged Israel against the Philistines.",
          "focus": [
              "judges_en"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "參孫",
                  "en": "Samson"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 100,
          "hold": 8,
          "cam": {
              "lng": 35.29,
              "lat": 32.057,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1050年",
          "title_zh": "求立王",
          "title_en": "Demand for a King",
          "narration_zh": "士21:25 那時沒有王，各人任意而行；撒母耳時代人求立王。",
          "narration_en": "Judg 21:25 — Everyone did as they saw fit; Israel later demanded a king.",
          "focus": [
              "judges_is"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "士師時代",
      "title_en": "ERA OF JUDGES",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.1845,
          "lat": 32.2225,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
