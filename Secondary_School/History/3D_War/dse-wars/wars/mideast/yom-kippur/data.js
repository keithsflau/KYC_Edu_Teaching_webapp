/* YOM KIPPUR WAR · 贖罪日戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "me-yomkippur",
      "title_zh": "贖罪日戰爭",
      "title_en": "YOM KIPPUR WAR",
      "subtitle": "1973年10月",
      "factionOrder": [
          "arab",
          "isr"
      ],
      "geo": {
          "minLng": 31,
          "maxLng": 35,
          "minLat": 28.75,
          "maxLat": 32.25,
          "Z": 9
      },
      "startDate": [
          1973,
          10,
          6
      ],
      "introCam": {
          "lng": 33,
          "lat": 30.5,
          "dist": 800,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "贖罪日戰爭",
          "en": "YOM KIPPUR WAR · 1973年10月",
          "narr_zh": "埃及敘利亞在贖罪日突襲，以軍初期受挫。",
          "narr_en": "Egypt and Syria attack on Yom Kippur — Israel suffers early setbacks."
      },
      "outroCam": {
          "lng": 33,
          "lat": 30.5,
          "dist": 960,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../gaza-intifada/",
          "title_zh": "加沙與因提法達",
          "title_en": "GAZA & INTIFADA"
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
              "name_en": "Suez Canal",
              "name_zh": "蘇伊士運河",
              "type": "fort",
              "lng": 32.35,
              "lat": 30.45
          },
          {
              "name_en": "Golan Heights",
              "name_zh": "戈蘭高地",
              "type": "fort",
              "lng": 35.75,
              "lat": 33.05
          },
          {
              "name_en": "Sinai",
              "name_zh": "西奈",
              "type": "region",
              "lng": 33.8,
              "lat": 29.5
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ar_73",
          "faction": "arab",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "埃及第二集團軍",
          "name_en": "Egyptian 2nd Army",
          "track": [
              {
                  "d": 1,
                  "lng": 32.35,
                  "lat": 30.45,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 33.8,
                  "lat": 29.5,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 32.5,
                  "lat": 30.2,
                  "s": 50000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "isr_73",
          "faction": "isr",
          "kind": "infantry",
          "crest": "trident",
          "cf": true,
          "name_zh": "以色列國防軍",
          "name_en": "IDF",
          "track": [
              {
                  "d": 1,
                  "lng": 34,
                  "lat": 31,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 80,
                  "lng": 33.5,
                  "lat": 30,
                  "s": 70000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 32.35,
                  "lat": 30.45,
                  "s": 75000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "arab",
          "from": [
              32.35,
              30.45
          ],
          "to": [
              33.8,
              29.5
          ],
          "label": "渡運河攻西奈",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "贖罪日戰爭",
          "en": "YOM KIPPUR WAR"
      }
  ];
  const notes =   {
      "summary": "贖罪日戰爭 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1973年贖罪日埃及敘利亞突襲；以軍初期受挫後反擊，雙方在國際壓力下停火。",
      "leaders": "埃及薩達特、敘利亞阿薩德偷襲以軍；以色列梅厄、後繼沙龍反擊渡蘇伊士。美蘇分別支援以阿雙方，瀕臨直接對抗。薩達特後與以色列和談，改寫部分阿拉伯國家對以政策。",
      "nationalPower": "阿拉伯石油武器；美蘇冷戰代理人競爭；以色列動員與美國補給。",
      "impact": "以阿開始和談（戴維營）；石油危機衝擊西方經濟。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 32.35,
              "lat": 30.45,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1973年10月6日",
          "title_zh": "贖罪日突襲",
          "title_en": "Yom Kippur Surprise",
          "narration_zh": "埃及敘利亞在贖罪日同時發動進攻。",
          "narration_en": "Egypt and Syria attack on Yom Kippur.",
          "focus": [
              "ar_73"
          ],
          "side": "arab",
          "commanders": [
              {
                  "zh": "薩達特",
                  "en": "Sadat"
              }
          ],
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
              "lng": 33.8,
              "lat": 29.5,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1973年10月",
          "title_zh": "蘇伊士渡河",
          "title_en": "Cross the Suez",
          "narration_zh": "埃及軍隊強渡運河，突破巴列夫防線。",
          "narration_en": "Egyptian forces cross the canal — breach the Bar-Lev Line.",
          "focus": [
              "ar_73"
          ],
          "side": "arab",
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
              "lng": 34,
              "lat": 31,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1973年10月中旬",
          "title_zh": "以軍反擊",
          "title_en": "Israeli Counter-attack",
          "narration_zh": "以軍動員預備役，在戈蘭與西奈反擊。",
          "narration_en": "Israel mobilises reserves — counter-attacks on both fronts.",
          "focus": [
              "isr_73"
          ],
          "side": "isr",
          "commanders": [
              {
                  "zh": "戴揚",
                  "en": "Dayan"
              }
          ],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 32.35,
              "lat": 30.45,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1973年10月",
          "title_zh": "西奈對峙",
          "title_en": "Standoff in Sinai",
          "narration_zh": "以軍渡河包圍埃及第三集團軍，戰局僵持。",
          "narration_en": "Israeli forces encircle Egyptian 3rd Army — stalemate.",
          "focus": [
              "isr_73",
              "ar_73"
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
              "lng": 34,
              "lat": 31,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1973年10月",
          "title_zh": "停火與談判",
          "title_en": "Ceasefire and Talks",
          "narration_zh": "聯合國停火，為戴維營和談鋪路。",
          "narration_en": "UN ceasefire — path to Camp David talks.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "贖罪日戰爭",
      "title_en": "YOM KIPPUR WAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 33,
          "lat": 30.5,
          "dist": 960,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
