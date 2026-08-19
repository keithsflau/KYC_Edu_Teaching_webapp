/* INCHON LANDING · 仁川登陸 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "kr-inchon",
      "title_zh": "仁川登陸",
      "title_en": "INCHON LANDING",
      "subtitle": "1950年9月15日",
      "factionOrder": [
          "nk",
          "un"
      ],
      "geo": {
          "minLng": 125.72,
          "maxLng": 127.52,
          "minLat": 36.76,
          "maxLat": 38.16,
          "Z": 11
      },
      "startDate": [
          1950,
          9,
          15
      ],
      "introCam": {
          "lng": 126.62,
          "lat": 37.46,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "仁川登陸",
          "en": "INCHON LANDING · 1950年9月15日",
          "narr_zh": "聯合國軍在仁川登陸，切斷北韓補給。",
          "narr_en": "UN amphibious landing at Inchon cuts North Korean supply lines."
      },
      "outroCam": {
          "lng": 126.62,
          "lat": 37.46,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../chosin/",
          "title_zh": "長津湖戰役",
          "title_en": "CHOSIN 1950"
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
              "name_en": "Inchon",
              "name_zh": "仁川",
              "type": "town",
              "lng": 126.62,
              "lat": 37.46
          },
          {
              "name_en": "Seoul",
              "name_zh": "漢城",
              "type": "city",
              "lng": 126.98,
              "lat": 37.57
          },
          {
              "name_en": "Wolmi-do",
              "name_zh": "月尾島",
              "type": "fort",
              "lng": 126.6,
              "lat": 37.47
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "un_inchon",
          "faction": "un",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "聯合國登陸部隊",
          "name_en": "UN Landing Force",
          "track": [
              {
                  "d": 1,
                  "lng": 126.3,
                  "lat": 37.3,
                  "s": 70000,
                  "st": "landing"
              },
              {
                  "d": 40,
                  "lng": 126.62,
                  "lat": 37.46,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 126.98,
                  "lat": 37.57,
                  "s": 110000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "nk_inchon",
          "faction": "nk",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "北韓守軍",
          "name_en": "KPA Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 126.7,
                  "lat": 37.5,
                  "s": 15000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 127,
                  "lat": 37.8,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "un",
          "from": [
              126.3,
              37.3
          ],
          "to": [
              126.62,
              37.46
          ],
          "label": "仁川登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 60,
          "lng": 126.62,
          "lat": 37.46,
          "kind": "landing",
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
          "zh": "仁川登陸",
          "en": "INCHON LANDING"
      }
  ];
  const notes =   {
      "summary": "仁川登陸 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "麥克阿瑟策劃仁川兩棲登陸，切斷北韓補給；聯合國軍收復漢城，扭轉戰局。",
      "leaders": "麥克阿瑟堅持仁川兩棲賭注，沃爭與阿爾蒙德執行。北韓將領措手不及，首爾收復。聯軍北上越過三八線觸發中國「抗美援朝」，戰爭再度升級。",
      "nationalPower": "美國海空優勢；北韓後方空虛，仁川潮汐限制大膽賭注。",
      "impact": "韓戰第一次戰略逆轉；但隨後聯軍北進觸發中國參戰。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 126.3,
              "lat": 37.3,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年9月15日",
          "title_zh": "仁川登陸",
          "title_en": "Inchon Landing",
          "narration_zh": "聯合國軍在仁川港兩棲登陸，月尾島先遭炮擊。",
          "narration_en": "UN amphibious landing at Inchon — Wolmi-do bombarded first.",
          "focus": [
              "un_inchon"
          ],
          "side": "un",
          "commanders": [
              {
                  "zh": "麥克阿瑟",
                  "en": "MacArthur"
              }
          ],
          "assets": [
              "landing",
              "navy",
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 30,
          "hold": 8,
          "cam": {
              "lng": 126.62,
              "lat": 37.46,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年9月15–17日",
          "title_zh": "奪取港口",
          "title_en": "Seize the Port",
          "narration_zh": "美軍海軍陸戰隊突破仁川防線，北韓守軍被圍。",
          "narration_en": "Marines break Inchon defences — KPA garrison encircled.",
          "focus": [
              "un_inchon",
              "nk_inchon"
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
          "day": 55,
          "hold": 8,
          "cam": {
              "lng": 126.98,
              "lat": 37.57,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年9月下旬",
          "title_zh": "收復漢城",
          "title_en": "Recapture Seoul",
          "narration_zh": "聯合國軍收復漢城，切斷北韓補給與退路。",
          "narration_en": "UN forces recapture Seoul — North Korean supply lines cut.",
          "focus": [
              "un_inchon"
          ],
          "side": "un",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 80,
          "hold": 8,
          "cam": {
              "lng": 127,
              "lat": 38,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年10月",
          "title_zh": "越過三八線",
          "title_en": "Cross Northward",
          "narration_zh": "聯合國軍北上，戰火燒向鴨綠江。",
          "narration_en": "UN forces advance north — war reaches the Yalu.",
          "focus": [],
          "side": "un",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 126.62,
              "lat": 37.46,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1950年秋",
          "title_zh": "戰局逆轉",
          "title_en": "Tide Turns",
          "narration_zh": "仁川登陸成為韓戰決定性兩棲作戰。",
          "narration_en": "Inchon becomes the decisive amphibious operation of the Korean War.",
          "focus": [],
          "side": "un",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "仁川登陸",
      "title_en": "INCHON LANDING",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 126.62,
          "lat": 37.46,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
