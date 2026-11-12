/* ARMISTICE · 板門店停戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-armistice",
      "title_zh": "板門店停戰",
      "title_en": "ARMISTICE",
      "subtitle": "1953年7月27日",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.68,
          "maxLng": 127.68,
          "minLat": 37.15,
          "maxLat": 38.75,
          "Z": 11
      },
      "startDate": [
          1953,
          7,
          27
      ],
      "introCam": {
          "lng": 126.68,
          "lat": 37.95,
          "dist": 550,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "板門店停戰",
          "en": "ARMISTICE · 1953年7月27日",
          "narr_zh": "雙方在板門店簽署停戰協定，半島分裂延續。",
          "narr_en": "Armistice signed at Panmunjom — Korea remains divided."
      },
      "outroCam": {
          "lng": 126.68,
          "lat": 37.95,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../../mideast/war-1948/",
          "title_zh": "第一次中東戰爭",
          "title_en": "1948 WAR"
      }
  };
  const factions = {
    "nk": {
      main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000,
      css: "#8b0000", label_zh: "北韓／志願軍", label_en: "North Korea / PVA",
      emblem: "circle", maxStrength: 100000, textLight: "#ffd9d2"
    },
    "un": {
      main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847,
      css: "#1a3a6e", label_zh: "聯合國軍", label_en: "UN Forces",
      emblem: "shield", maxStrength: 110000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Panmunjom",
              "name_zh": "板門店",
              "type": "fort",
              "lng": 126.68,
              "lat": 37.95
          },
          {
              "name_en": "Kaesong",
              "name_zh": "開城",
              "type": "city",
              "lng": 126.55,
              "lat": 37.97
          }
      ],
      "lines": [
          {
              "name_zh": "軍事分界線",
              "name_en": "DMZ",
              "path": [
                  [
                      126.2,
                      38
                  ],
                  [
                      126.68,
                      38
                  ],
                  [
                      127.2,
                      38
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "un_dmz",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "聯合國軍",
          "name_en": "UN Command",
          "track": [
              {
                  "d": 1,
                  "lng": 126.7,
                  "lat": 37.9,
                  "s": 90000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 126.68,
                  "lat": 37.95,
                  "s": 90000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "nk_dmz",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "北韓軍",
          "name_en": "KPA",
          "track": [
              {
                  "d": 1,
                  "lng": 126.75,
                  "lat": 38,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 126.7,
                  "lat": 38,
                  "s": 80000,
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
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "板門店停戰",
          "en": "ARMISTICE"
      }
  ];
  const notes =   {
      "summary": "板門店停戰 — 課題地圖。兵力與路線為示意。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1951–1953 年三八線附近僵持；停戰談判拖延，1953 年 7 月簽署《朝鮮停戰協定》。",
      "leaders": "艾森豪威爾1953年就任後推動停戰；南韓李承晚反對分裂。北韓金日成、志願軍彭德懷、聯軍克拉克簽署板門店協定。三八線固化，朝鮮半島分裂至今，冷戰亞洲前線形成。",
      "nationalPower": "中美蘇介入，雙方均無法完全取勝；韓半島分裂持續。",
      "impact": "正式停火但未簽和平條約；南北分治至今，冷戰遺產。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 127,
              "lat": 38,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1951年",
          "title_zh": "戰線穩定",
          "title_en": "Line Stabilises",
          "narration_zh": "戰爭進入三八線附近僵持，陣地戰取代大機動。",
          "narration_en": "War settles into stalemate near the 38th parallel.",
          "focus": [],
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
              "lng": 126.5,
              "lat": 37.8,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1951–1952年",
          "title_zh": "談判與炮擊",
          "title_en": "Talks and Shelling",
          "narration_zh": "板門店停戰談判開始，前線仍激烈炮擊。",
          "narration_en": "Armistice talks at Panmunjom — front-line shelling continues.",
          "focus": [],
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
              "lng": 127,
              "lat": 38,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1952–1953年",
          "title_zh": "消耗僵持",
          "title_en": "War of Attrition",
          "narration_zh": "雙方在坑道中拉鋸，傷亡持續但戰線變化不大。",
          "narration_en": "Trench warfare and attrition — little territorial change.",
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
              "lng": 126.7,
              "lat": 37.9,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1953年7月27日",
          "title_zh": "簽署停戰",
          "title_en": "Armistice Signed",
          "narration_zh": "《朝鮮停戰協定》在板門店簽署，軍事行動停止。",
          "narration_en": "Korean Armistice signed at Panmunjom — fighting stops.",
          "focus": [],
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
              "lng": 127,
              "lat": 38,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1953年後",
          "title_zh": "分裂延續",
          "title_en": "Division Endures",
          "narration_zh": "半島分裂固化，冷戰前沿至今。",
          "narration_en": "A divided peninsula — a Cold War frontier to this day.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
    const sourceTask = {
    "cite": "《朝鮮停戰協定》簽署時的文本性質，1953年7月27日",
    "excerpt": "協定停止軍事行動，並設立非軍事區。它沒有寫成和平條約。",
    "ask": "哪一項判斷符合這份文件？",
    "options": [
      {
        "t": "簽署之後朝鮮半島已經以和平條約統一。",
        "ok": false,
        "why": "協定停的是戰鬥。南北仍是兩個政府，和平條約沒有簽。"
      },
      {
        "t": "戰鬥停止，但政治分裂沒有因此結束。",
        "ok": true,
        "why": "彭德懷、金日成與克拉克在協定上代表交戰各方。李承晚反對停戰，南韓不是簽字的一方。"
      },
      {
        "t": "協定規定志願軍繼續向釜山進攻。",
        "ok": false,
        "why": "協定是停火，不是新的進攻命令。"
      }
    ]
  };
const outro =   {
      "title_zh": "板門店停戰",
      "title_en": "ARMISTICE",
      "narration_zh": "1953年7月27日簽署的是停戰協定，不是和平條約。",
      "narration_en": "The 27 July 1953 document is an armistice, not a peace treaty.",
      "cam": {
          "lng": 126.68,
          "lat": 37.95,
          "dist": 660,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, sourceTask, END_DAY };
})();
