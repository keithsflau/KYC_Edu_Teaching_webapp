/* SREBRENICA · 斯雷布雷尼察 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-srebrenica",
      "title_zh": "斯雷布雷尼察",
      "title_en": "SREBRENICA",
      "subtitle": "1995年7月",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 18.29,
          "maxLng": 20.29,
          "minLat": 43.3,
          "maxLat": 44.9,
          "Z": 11
      },
      "startDate": [
          1995,
          7,
          11
      ],
      "introCam": {
          "lng": 19.29,
          "lat": 44.1,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "斯雷布雷尼察",
          "en": "SREBRENICA · 1995年7月",
          "narr_zh": "波塞族部隊攻占聯合國安全區，逾八千男性被殺。",
          "narr_en": "Bosnian Serb forces seize a UN safe area — over 8,000 men and boys killed."
      },
      "outroCam": {
          "lng": 19.29,
          "lat": 44.1,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../kosovo/",
          "title_zh": "科索沃戰爭",
          "title_en": "KOSOVO 1998–99"
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
              "name_en": "Srebrenica",
              "name_zh": "斯雷布雷尼察",
              "type": "town",
              "lng": 19.29,
              "lat": 44.1
          },
          {
              "name_en": "Potočari",
              "name_zh": "波托查里",
              "type": "town",
              "lng": 19.22,
              "lat": 44.09
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_sreb",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "波塞族部隊",
          "name_en": "Bosnian Serb Army",
          "track": [
              {
                  "d": 1,
                  "lng": 19.5,
                  "lat": 44.2,
                  "s": 20000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": 19.29,
                  "lat": 44.1,
                  "s": 18000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "co_sreb",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "穆斯林守軍／難民",
          "name_en": "Muslim Defenders",
          "track": [
              {
                  "d": 1,
                  "lng": 19.29,
                  "lat": 44.1,
                  "s": 8000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 19.29,
                  "lat": 44.1,
                  "s": 1000,
                  "st": "dead"
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
          "zh": "斯雷布雷尼察",
          "en": "SREBRENICA"
      }
  ];
  const notes =   {
      "summary": "斯雷布雷尼察 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1995年7月波塞族軍攻占聯合國「安全區」斯雷布雷尼察；逾八千穆斯林男子遭屠殺。",
      "leaders": "波黑塞族軍事指揮姆拉迪奇攻占斯雷布雷尼察；聯合國荷蘭維和部隊未能阻止。超過八千穆斯林男性遭屠殺。戰後國際刑事法庭定罪種族滅絕，推動北約干預與代頓協議。",
      "nationalPower": "聯合國維和兵力不足；波塞族軍事優勢與報復心態。",
      "impact": "二戰後歐洲最嚴重暴行；海牙法庭戰爭罪審判，推動北約介入。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 19.5,
              "lat": 44.2,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年7月6日",
          "title_zh": "塞族進攻",
          "title_en": "Serb Offensive",
          "narration_zh": "波塞族軍向斯雷布雷尼察安全區推進。",
          "narration_en": "Bosnian Serb Army advances on the Srebrenica safe area.",
          "focus": [
              "sr_sreb"
          ],
          "side": "sr",
          "commanders": [
              {
                  "zh": "姆拉迪奇",
                  "en": "Mladić"
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
              "lng": 19.29,
              "lat": 44.1,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年7月11日",
          "title_zh": "安全區陷落",
          "title_en": "Safe Area Falls",
          "narration_zh": "荷蘭維和部隊未能阻止塞族軍進入。",
          "narration_en": "Dutch peacekeepers fail to stop Serb entry.",
          "focus": [
              "co_sreb"
          ],
          "side": "co",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 19.29,
              "lat": 44.1,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年7月12–13日",
          "title_zh": "大屠殺",
          "title_en": "Massacre",
          "narration_zh": "逾八千穆斯林男子遭分離並處決。",
          "narration_en": "Over 8,000 Muslim men and boys separated and executed.",
          "focus": [
              "sr_sreb"
          ],
          "side": "sr",
          "commanders": [],
          "assets": [],
          "forces_zh": "遇難 8000+",
          "forces_en": "8,000+ killed"
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 19.29,
              "lat": 44.1,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年7月",
          "title_zh": "國際譴責",
          "title_en": "International Outcry",
          "narration_zh": "屠殺曝光，北約決定加強空襲。",
          "narration_en": "Massacre exposed — NATO decides on intensified air strikes.",
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
              "lng": 19.29,
              "lat": 44.1,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1995年後",
          "title_zh": "海牙審判",
          "title_en": "Hague Trials",
          "narration_zh": "姆拉迪奇等被控種族滅絕與戰爭罪。",
          "narration_en": "Mladić and others charged with genocide and war crimes.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "斯雷布雷尼察",
      "title_en": "SREBRENICA",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 19.29,
          "lat": 44.1,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
