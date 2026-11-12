/* EXODUS & CONQUEST · 出埃及與進迦南 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "exodus",
      "title_zh": "出埃及與進迦南",
      "title_en": "EXODUS & CONQUEST",
      "subtitle": "出–書",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 31.12,
          "maxLng": 36.47,
          "minLat": 27.66,
          "maxLat": 32.76,
          "Z": 8
      },
      "startDate": "出–書",
      "introCam": {
          "lng": 33.798,
          "lat": 30.2055,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "出埃及與進迦南",
          "en": "EXODUS & CONQUEST · 出–書",
          "narr_zh": "我必救你脫離埃及人的苦難，領你進入美好寬闊流奶與蜜之地。",
          "narr_en": "I will bring you up out of Egypt to a land flowing with milk and honey."
      },
      "outroCam": {
          "lng": 33.798,
          "lat": 30.2055,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../judges/",
          "title_zh": "士師時代",
          "title_en": "JUDGES"
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
              "name_zh": "蘭塞",
              "name_en": "Pi-Ramesses",
              "type": "city",
              "lng": 32.113,
              "lat": 30.794,
              "ref": "出 1:11"
          },
          {
              "name_zh": "疏割",
              "name_en": "Succoth",
              "type": "town",
              "lng": 32.183,
              "lat": 30.558,
              "ref": "出 12:37"
          },
          {
              "name_zh": "比哈洗烈",
              "name_en": "Pi-hahiroth",
              "type": "bay",
              "lng": 32.45,
              "lat": 29.95,
              "ref": "出 14:2"
          },
          {
              "name_zh": "紅海",
              "name_en": "Red Sea",
              "type": "bay",
              "lng": 32.35,
              "lat": 29,
              "ref": "出 14:21"
          },
          {
              "name_zh": "西奈山",
              "name_en": "Mount Sinai",
              "type": "peak",
              "lng": 33.975,
              "lat": 28.539,
              "ref": "出 19:1"
          },
          {
              "name_zh": "利非訂",
              "name_en": "Rephidim",
              "type": "town",
              "lng": 33.98,
              "lat": 28.75,
              "ref": "出 17:1"
          },
          {
              "name_zh": "加低斯",
              "name_en": "Kadesh-barnea",
              "type": "town",
              "lng": 34.451,
              "lat": 30.601,
              "ref": "民 13:26"
          },
          {
              "name_zh": "耶利哥",
              "name_en": "Jericho",
              "type": "fort",
              "lng": 35.444,
              "lat": 31.872,
              "ref": "書 6:1"
          },
          {
              "name_zh": "吉甲",
              "name_en": "Gilgal",
              "type": "town",
              "lng": 35.483,
              "lat": 31.867,
              "ref": "書 4:19"
          },
          {
              "name_zh": "艾城",
              "name_en": "Ai",
              "type": "fort",
              "lng": 35.262,
              "lat": 31.916,
              "ref": "書 7:2"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "israel_ex",
          "faction": "covenant",
          "kind": "infantry",
          "crest": "shield",
          "cf": true,
          "name_zh": "以色列人",
          "name_en": "Israelites",
          "track": [
              {
                  "d": 1,
                  "lng": 32.113,
                  "lat": 30.794,
                  "s": 600000,
                  "st": "hold"
              },
              {
                  "d": 12,
                  "lng": 32.183,
                  "lat": 30.558,
                  "s": 600000,
                  "st": "retreat"
              },
              {
                  "d": 22,
                  "lng": 32.45,
                  "lat": 29.95,
                  "s": 600000,
                  "st": "hold"
              },
              {
                  "d": 30,
                  "lng": 32.35,
                  "lat": 29,
                  "s": 600000,
                  "st": "hold"
              },
              {
                  "d": 45,
                  "lng": 33.975,
                  "lat": 28.539,
                  "s": 500000,
                  "st": "hold"
              },
              {
                  "d": 55,
                  "lng": 33.98,
                  "lat": 28.75,
                  "s": 500000,
                  "st": "hold"
              },
              {
                  "d": 70,
                  "lng": 34.451,
                  "lat": 30.601,
                  "s": 450000,
                  "st": "hold"
              },
              {
                  "d": 88,
                  "lng": 35.483,
                  "lat": 31.867,
                  "s": 400000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 35.444,
                  "lat": 31.872,
                  "s": 400000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "egypt_ex",
          "faction": "nations",
          "kind": "infantry",
          "crest": "circle",
          "cf": true,
          "name_zh": "埃及軍",
          "name_en": "Egyptian army",
          "track": [
              {
                  "d": 24,
                  "lng": 32.45,
                  "lat": 29.95,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 32,
                  "lng": 32.35,
                  "lat": 29,
                  "s": 0,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 8,
          "f": "covenant",
          "from": [
              32.113,
              30.794
          ],
          "to": [
              32.183,
              30.558
          ],
          "label": "出埃及 出12:37",
          "kind": "retreat"
      },
      {
          "d": 28,
          "f": "covenant",
          "from": [
              32.45,
              29.95
          ],
          "to": [
              32.35,
              29
          ],
          "label": "過紅海 出14:22",
          "kind": "retreat"
      },
      {
          "d": 85,
          "f": "covenant",
          "from": [
              35.483,
              31.867
          ],
          "to": [
              35.444,
              31.872
          ],
          "label": "攻耶利哥 書6:20",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 26,
          "b": 36,
          "lng": 32.35,
          "lat": 29,
          "kind": "landing",
          "i": 0.85
      },
      {
          "a": 92,
          "b": 100,
          "lng": 35.444,
          "lat": 31.872,
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
          "zh": "出埃及與進迦南",
          "en": "EXODUS & CONQUEST"
      }
  ];
  const notes =   {
      "summary": "出埃及與進迦南 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "以色列人自蘭塞（Pi-Ramesses／Qantir）出發，經疏割、比哈洗烈，過紅海（蘇伊士灣傳統路線），至西奈山（Jebel Musa）立約，加低斯巴尼亞漂流，約書亞攻耶利哥（Tell es-Sultan）。",
      "leaders": "摩西、亞倫、約書亞、迦勒；法老軍追擊紅海。",
      "nationalPower": "逾越羔羊預表基督；律法引到基督；進迦南預表屬靈安息。",
      "impact": "出埃及為以色列國族認同根基。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 32.113,
              "lat": 30.794,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "蘭塞為奴",
          "title_en": "Rameses",
          "narration_zh": "出1:11 在蘭塞地為法老建積貨城；以色列人作苦工。",
          "narration_en": "Exod 1:11 — Israel labored at Rameses for Pharaoh.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "摩西",
                  "en": "Moses"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 12,
          "hold": 8,
          "cam": {
              "lng": 32.183,
              "lat": 30.558,
              "dist": 640,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "到疏割",
          "title_en": "Succoth",
          "narration_zh": "出12:37 以色列人從蘭塞起行，到疏割。",
          "narration_en": "Exod 12:37 — They journeyed from Rameses to Succoth.",
          "focus": [
              "israel_ex"
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
              "lng": 32.35,
              "lat": 29,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "過紅海",
          "title_en": "Red Sea",
          "narration_zh": "出14:21-22 摩西伸杖過紅海，以色列人走乾地過海，埃及軍被淹沒。",
          "narration_en": "Exod 14:21-22 — Israel crossed the sea on dry ground.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "landing"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 33.975,
              "lat": 28.539,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1446年",
          "title_zh": "西奈立約",
          "title_en": "Sinai",
          "narration_zh": "出19:1-2 以色列人到了西奈山；出20 頒布十誡。",
          "narration_en": "Exod 19-20 — At Sinai God gave the Law.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 55,
          "hold": 8,
          "cam": {
              "lng": 33.98,
              "lat": 28.75,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "曠野",
          "title_zh": "利非訂",
          "title_en": "Rephidim",
          "narration_zh": "出17:1-6 在利非訂沒有水，摩西擊石出水；與亞瑪力人爭戰。",
          "narration_en": "Exod 17 — Water from the rock; battle with Amalek at Rephidim.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 70,
          "hold": 8,
          "cam": {
              "lng": 34.451,
              "lat": 30.601,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "曠野四十年",
          "title_zh": "加低斯",
          "title_en": "Kadesh-barnea",
          "narration_zh": "民13:26 探子從加低斯巴尼亞回來；因不信，一代人倒在曠野。",
          "narration_en": "Num 13:26 — The spies returned to Kadesh; unbelief brought forty years in the wilderness.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 88,
          "hold": 8,
          "cam": {
              "lng": 35.483,
              "lat": 31.867,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1406年",
          "title_zh": "吉甲安營",
          "title_en": "Gilgal",
          "narration_zh": "書4:19 百姓從約旦河上来，在吉甲、耶利哥東邊安營。",
          "narration_en": "Josh 4:19 — Israel camped at Gilgal east of Jericho.",
          "focus": [
              "israel_ex"
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
              "lng": 35.444,
              "lat": 31.872,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前1406年",
          "title_zh": "耶利哥陷落",
          "title_en": "Jericho",
          "narration_zh": "書6:20 百姓呼喊，城牆塌陷，攻取耶利哥。",
          "narration_en": "Josh 6:20 — The walls of Jericho fell.",
          "focus": [
              "israel_ex"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "約書亞",
                  "en": "Joshua"
              }
          ],
          "assets": [
              "firefight"
          ],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "出埃及與進迦南",
      "title_en": "EXODUS & CONQUEST",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 33.798,
          "lat": 30.2055,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
