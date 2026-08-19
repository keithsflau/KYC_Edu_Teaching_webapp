/* CHOSIN RESERVOIR · 長津湖戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-chosin",
      "title_zh": "長津湖戰役",
      "title_en": "CHOSIN RESERVOIR",
      "subtitle": "1950年11–12月",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.9,
          "maxLng": 128.4,
          "minLat": 39.45,
          "maxLat": 41.45,
          "Z": 10
      },
      "startDate": [
          1950,
          11,
          27
      ],
      "introCam": {
          "lng": 127.15,
          "lat": 40.45,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "長津湖戰役",
          "en": "CHOSIN RESERVOIR · 1950年11–12月",
          "narr_zh": "志願軍在嚴冬圍攻美軍陸戰一師。",
          "narr_en": "PVA forces encircle US Marines at Chosin in brutal winter."
      },
      "outroCam": {
          "lng": 127.15,
          "lat": 40.45,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../armistice/",
          "title_zh": "板門店停戰",
          "title_en": "PANMUNJOM 1953"
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
              "name_en": "Chosin Reservoir",
              "name_zh": "長津湖",
              "type": "town",
              "lng": 127.15,
              "lat": 40.45
          },
          {
              "name_en": "Hagaru-ri",
              "name_zh": "下碣隅里",
              "type": "fort",
              "lng": 127.12,
              "lat": 40.38
          },
          {
              "name_en": "Hungnam",
              "name_zh": "興南",
              "type": "town",
              "lng": 127.63,
              "lat": 39.83
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "nk_chosin",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "志願軍第9兵團",
          "name_en": "PVA 9th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 127.5,
                  "lat": 40.8,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 127.15,
                  "lat": 40.45,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 127.2,
                  "lat": 40.3,
                  "s": 80000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "un_chosin",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美陸戰一師",
          "name_en": "US 1st Marine Division",
          "track": [
              {
                  "d": 1,
                  "lng": 127.15,
                  "lat": 40.45,
                  "s": 25000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 127.12,
                  "lat": 40.38,
                  "s": 20000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 127.63,
                  "lat": 39.83,
                  "s": 18000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "nk",
          "from": [
              127.5,
              40.8
          ],
          "to": [
              127.15,
              40.45
          ],
          "label": "長津湖包圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.35,
          "fog": 0.2,
          "rain": 0,
          "smoke": 0.3,
          "zh": "長津湖嚴冬",
          "en": "Chosin winter"
      }
  ];
  const notes =   {
      "summary": "長津湖戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "志願軍入朝後發動長津湖戰役，重創美陸戰一師等部；美軍「向大海撤退」突圍。",
      "leaders": "志願軍宋時輪第九兵團圍攻長津湖；美陸戰一師史密斯突圍撤退。麥克阿瑟與華盛頓對是否擴大戰爭分歧。慘烈冬戰使雙方認識到難以完全擊敗對手，為談判鋪路。",
      "nationalPower": "中國志願軍耐寒作戰、夜戰與人海戰術；美軍裝備與空運優勢。",
      "impact": "聯合國軍北進計劃破滅；戰爭回到三八線附近僵持。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 127.5,
              "lat": 40.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年11月",
          "title_zh": "志願軍入朝",
          "title_en": "Chinese Enter War",
          "narration_zh": "中國人民志願軍秘密渡過鴨綠江，包圍聯合國軍。",
          "narration_en": "Chinese People's Volunteers cross the Yalu — encircle UN forces.",
          "focus": [],
          "side": "nk",
          "commanders": [
              {
                  "zh": "彭德懷",
                  "en": "Peng Dehuai"
              }
          ],
          "assets": [],
          "forces_zh": "志願軍 20 萬+",
          "forces_en": "200,000+ CPV"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 127.2,
              "lat": 40.2,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年11月27日",
          "title_zh": "長津湖包圍",
          "title_en": "Chosin Encirclement",
          "narration_zh": "志願軍在嚴寒中分割並包圍美陸戰一師等部隊。",
          "narration_en": "CPV splits and encircles US 1st Marine Division in extreme cold.",
          "focus": [
              "un_chosin"
          ],
          "side": "un",
          "commanders": [
              {
                  "zh": "史密斯",
                  "en": "Smith"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 127,
              "lat": 40,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年11–12月",
          "title_zh": "嚴寒血戰",
          "title_en": "Battle in the Cold",
          "narration_zh": "氣溫降至攝氏零下三十度，雙方在冰雪中激戰。",
          "narration_en": "Temperatures plunge to -30°C — brutal fighting in ice and snow.",
          "focus": [
              "un_chosin"
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
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 126.5,
              "lat": 39.5,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年12月",
          "title_zh": "向大海撤退",
          "title_en": "Advance to the Sea",
          "narration_zh": "美陸戰一師突破重圍，撤向興南港。",
          "narration_en": "1st Marine Division breaks out toward Hungnam.",
          "focus": [
              "un_chosin"
          ],
          "side": "un",
          "commanders": [],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 126.5,
              "lat": 39.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年12月",
          "title_zh": "北進夢滅",
          "title_en": "Northern Drive Ends",
          "narration_zh": "聯合國軍完全撤出北朝鮮，戰線南撤。",
          "narration_en": "UN forces withdraw from North Korea — front moves south.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "長津湖戰役",
      "title_en": "CHOSIN RESERVOIR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 127.15,
          "lat": 40.45,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
