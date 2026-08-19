/* IWO JIMA · 硫磺島戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-iwo",
      "title_zh": "硫磺島戰役",
      "title_en": "IWO JIMA",
      "subtitle": "1945年2–3月",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 140.57,
          "maxLng": 142.07,
          "minLat": 24.18,
          "maxLat": 25.38,
          "Z": 11
      },
      "startDate": [
          1945,
          2,
          19
      ],
      "introCam": {
          "lng": 141.32,
          "lat": 24.78,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "硫磺島戰役",
          "en": "IWO JIMA · 1945年2–3月",
          "narr_zh": "美軍傷亡慘重攻佔硫磺島。",
          "narr_en": "US Marines take Iwo Jima at terrible cost."
      },
      "outroCam": {
          "lng": 141.32,
          "lat": 24.78,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../hiroshima/",
          "title_zh": "廣島原子彈",
          "title_en": "HIROSHIMA 1945"
      }
  };
  const factions = {
    "jp": {
      main: 0x8b0000, glow: 0xdc143c, dim: 0x5a0000,
      css: "#8b0000", label_zh: "日本", label_en: "Japan",
      emblem: "circle", maxStrength: 90000, textLight: "#ffd9d2"
    },
    "us": {
      main: 0x1a3a6e, glow: 0x4a90d9, dim: 0x0d2847,
      css: "#1a3a6e", label_zh: "美國", label_en: "United States",
      emblem: "shield", maxStrength: 110000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Iwo Jima",
              "name_zh": "硫磺島",
              "type": "island",
              "lng": 141.32,
              "lat": 24.78
          },
          {
              "name_en": "Mount Suribachi",
              "name_zh": "折鉢山",
              "type": "peak",
              "lng": 141.29,
              "lat": 24.75
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_iwo",
          "faction": "us",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美國海軍陸戰隊",
          "name_en": "US Marines",
          "track": [
              {
                  "d": 1,
                  "lng": 141.4,
                  "lat": 24.85,
                  "s": 50000,
                  "st": "landing"
              },
              {
                  "d": 80,
                  "lng": 141.29,
                  "lat": 24.75,
                  "s": 45000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 141.32,
                  "lat": 24.78,
                  "s": 40000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "jp_iwo",
          "faction": "jp",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日本守備隊",
          "name_en": "Japanese Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 141.32,
                  "lat": 24.78,
                  "s": 22000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 141.29,
                  "lat": 24.75,
                  "s": 2000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "us",
          "from": [
              141.4,
              24.85
          ],
          "to": [
              141.29,
              24.75
          ],
          "label": "攻佔折鉢山",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 141.29,
          "lat": 24.75,
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
          "zh": "硫磺島戰役",
          "en": "IWO JIMA"
      }
  ];
  const notes =   {
      "summary": "硫磺島戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "美軍為奪取靠近日本本土的轟炸機基地進攻硫磺島；日軍坑道防守，傷亡極其慘烈。",
      "leaders": "美海軍特納、史密斯將軍策劃登陸；粟林忠道以地道防禦消耗美軍。羅斯福授權奪島以接近日本本土。慘重傷亡影響美國對奧運與本土登陸的戰略評估。",
      "nationalPower": "美國海空壓倒優勢；日軍「玉碎」戰術，幾全軍覆沒。",
      "impact": "標誌性升旗照片；為轟炸日本本土與最終勝利鋪路。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 141.4,
              "lat": 24.85,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年2月19日",
          "title_zh": "兩棲登陸",
          "title_en": "Amphibious Landing",
          "narration_zh": "美軍海軍陸戰隊在硫磺島灘頭登陸，遭日軍火力壓制。",
          "narration_en": "US Marines land on Iwo Jima under heavy Japanese fire.",
          "focus": [
              "us_iwo"
          ],
          "side": "us",
          "commanders": [
              {
                  "zh": "施密特",
                  "en": "Smith"
              }
          ],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 141.32,
              "lat": 24.78,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年2月",
          "title_zh": "坑道戰",
          "title_en": "Tunnel Warfare",
          "narration_zh": "日軍利用火山岩坑道頑抗，美軍逐米推進。",
          "narration_en": "Japanese tunnel defences — US advances meter by meter.",
          "focus": [
              "us_iwo",
              "jp_iwo"
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
              "lng": 141.29,
              "lat": 24.75,
              "dist": 450,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年2月23日",
          "title_zh": "折鉢山升旗",
          "title_en": "Flag on Suribachi",
          "narration_zh": "美軍攻占折鉢山，升起國旗成為經典影像。",
          "narration_en": "Marines raise the flag on Mount Suribachi.",
          "focus": [
              "us_iwo"
          ],
          "side": "us",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 141.29,
              "lat": 24.75,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年3月",
          "title_zh": "島嶼掃清",
          "title_en": "Island Secured",
          "narration_zh": "日軍幾乎全數陣亡，美軍傷亡逾兩萬。",
          "narration_en": "Japanese defenders nearly wiped out — US casualties exceed 20,000.",
          "focus": [
              "jp_iwo"
          ],
          "side": "jp",
          "commanders": [],
          "assets": [],
          "forces_zh": "美軍傷亡 2 萬+",
          "forces_en": "20,000+ US casualties"
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 141.32,
              "lat": 24.78,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年3月",
          "title_zh": "逼近本土",
          "title_en": "Closer to Japan",
          "narration_zh": "硫磺島成為 B-29 緊急降落基地。",
          "narration_en": "Iwo Jima becomes an emergency base for B-29 raids on Japan.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "硫磺島戰役",
      "title_en": "IWO JIMA",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 141.32,
          "lat": 24.78,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
