/* GAZA & INTIFADA · 加沙與因提法達 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-gaza",
      "title_zh": "加沙與因提法達",
      "title_en": "GAZA & INTIFADA",
      "subtitle": "1993–2000",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 33.45,
          "maxLng": 35.95,
          "minLat": 30.7,
          "maxLat": 32.7,
          "Z": 10
      },
      "startDate": [
          1993,
          9,
          13
      ],
      "introCam": {
          "lng": 34.47,
          "lat": 31.5,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "加沙與因提法達",
          "en": "GAZA & INTIFADA · 1993–2000",
          "narr_zh": "奧斯陸協議後，2000年爆發第二次因提法達。",
          "narr_en": "After Oslo, the Second Intifada erupts in 2000."
      },
      "outroCam": {
          "lng": 34.47,
          "lat": 31.5,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../../balkans/vukovar/",
          "title_zh": "武科瓦爾圍城",
          "title_en": "VUKOVAR 1991"
      }
  };
  const factions = {
    "arab": {
      main: 0x2e6b2e, glow: 0x4caf50, dim: 0x1a401a,
      css: "#2e6b2e", label_zh: "阿拉伯聯軍", label_en: "Arab Coalition",
      emblem: "circle", maxStrength: 80000, textLight: "#d4ecd4"
    },
    "isr": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "以色列", label_en: "Israel",
      emblem: "shield", maxStrength: 70000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Gaza",
              "name_zh": "加沙",
              "type": "city",
              "lng": 34.47,
              "lat": 31.5
          },
          {
              "name_en": "West Bank",
              "name_zh": "約旦河西岸",
              "type": "region",
              "lng": 35.3,
              "lat": 31.95
          },
          {
              "name_en": "Jerusalem",
              "name_zh": "耶路撒冷",
              "type": "city",
              "lng": 35.21,
              "lat": 31.77
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "isr_gaza",
          "faction": "isr",
          "kind": "infantry",
          "crest": "trident",
          "cf": true,
          "name_zh": "以色列國防軍",
          "name_en": "IDF",
          "track": [
              {
                  "d": 1,
                  "lng": 34.78,
                  "lat": 32.09,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 34.47,
                  "lat": 31.5,
                  "s": 60000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ar_gaza",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "巴勒斯坦武裝",
          "name_en": "Palestinian Factions",
          "track": [
              {
                  "d": 1,
                  "lng": 34.47,
                  "lat": 31.5,
                  "s": 20000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 35.3,
                  "lat": 31.95,
                  "s": 25000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 34.47,
                  "lat": 31.5,
                  "s": 22000,
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
          "zh": "加沙與因提法達",
          "en": "GAZA & INTIFADA"
      }
  ];
  const notes =   {
      "summary": "加沙與因提法達 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1987年巴勒斯坦大起義（Intifada）在加沙、西岸爆發；以色列軍警與民間抵抗長期衝突。",
      "leaders": "巴勒斯坦青年在加沙、西岸發動起義；以色列沙米爾、拉賓強硬鎮壓與談判並存。阿拉法特及巴解國際能見度上升。奧斯陸協議嘗試解決占領問題，但定居點與安全矛盾持續。",
      "nationalPower": "以色列軍事優勢；巴勒斯坦民眾石塊、罷工與國際輿論。",
      "impact": "推動奧斯陸和談；以巴關係短暫緩和後仍深陷暴力循環。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 34.47,
              "lat": 31.5,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1987年12月",
          "title_zh": "加沙起義",
          "title_en": "Uprising in Gaza",
          "narration_zh": "加沙難民營抗議演變為全面起義。",
          "narration_en": "Gaza refugee camp protests escalate into the Intifada.",
          "focus": [
              "ar_gaza"
          ],
          "side": "arab",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 34.47,
              "lat": 31.5,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1988年",
          "title_zh": "石塊與罷工",
          "title_en": "Stones and Strikes",
          "narration_zh": "巴勒斯坦青年以石塊對抗以軍，全區罷工。",
          "narration_en": "Palestinian youths confront troops — general strikes spread.",
          "focus": [
              "ar_gaza"
          ],
          "side": "arab",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 34.78,
              "lat": 32.09,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1988–1990年",
          "title_zh": "以軍鎮壓",
          "title_en": "Israeli Crackdown",
          "narration_zh": "以色列實施宵禁、拘捕與武力回應。",
          "narration_en": "Israel imposes curfews, arrests and forceful responses.",
          "focus": [
              "isr_gaza"
          ],
          "side": "isr",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 35.3,
              "lat": 31.95,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1991年前後",
          "title_zh": "國際關注",
          "title_en": "International Attention",
          "narration_zh": "馬德里和談與奧斯陸進程啟動。",
          "narration_en": "Madrid talks and the Oslo process begin.",
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
              "lng": 34.47,
              "lat": 31.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1993年",
          "title_zh": "奧斯陸協議",
          "title_en": "Oslo Accords",
          "narration_zh": "巴解與以色列簽署原則宣言，起義逐步平息。",
          "narration_en": "PLO and Israel sign principles — Intifada winds down.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "加沙與因提法達",
      "title_en": "GAZA & INTIFADA",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 34.47,
          "lat": 31.5,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
