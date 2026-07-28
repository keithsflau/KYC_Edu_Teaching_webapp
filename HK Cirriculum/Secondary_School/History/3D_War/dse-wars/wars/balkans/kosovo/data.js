/* KOSOVO WAR · 科索沃戰爭 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "bk-kosovo",
      "title_zh": "科索沃戰爭",
      "title_en": "KOSOVO WAR",
      "subtitle": "1998–1999",
      "factionOrder": [
          "sr",
          "co"
      ],
      "geo": {
          "minLng": 19.75,
          "maxLng": 22.25,
          "minLat": 41.6,
          "maxLat": 43.6,
          "Z": 10
      },
      "startDate": [
          1998,
          3,
          5
      ],
      "introCam": {
          "lng": 21.17,
          "lat": 42.66,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "科索沃戰爭",
          "en": "KOSOVO WAR · 1998–1999",
          "narr_zh": "塞族鎮壓科索沃阿族，北約轟炸塞爾維亞。",
          "narr_en": "Serb crackdown in Kosovo leads to NATO bombing."
      },
      "outroCam": {
          "lng": 21.17,
          "lat": 42.66,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
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
              "name_en": "Pristina",
              "name_zh": "普里什蒂納",
              "type": "city",
              "lng": 21.17,
              "lat": 42.66
          },
          {
              "name_en": "Belgrade",
              "name_zh": "貝爾格萊德",
              "type": "city",
              "lng": 20.46,
              "lat": 44.79
          },
          {
              "name_en": "Peć",
              "name_zh": "佩奇",
              "type": "town",
              "lng": 20.29,
              "lat": 42.66
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "sr_kos",
          "faction": "sr",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "塞爾維亞軍警",
          "name_en": "Serb Security Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 21.17,
                  "lat": 42.66,
                  "s": 35000,
                  "st": "attack"
              },
              {
                  "d": 80,
                  "lng": 20.46,
                  "lat": 44.79,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 21,
                  "lat": 42.6,
                  "s": 5000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "co_kos",
          "faction": "co",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "科索沃解放軍",
          "name_en": "KLA",
          "track": [
              {
                  "d": 1,
                  "lng": 21,
                  "lat": 42.6,
                  "s": 15000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 21.17,
                  "lat": 42.66,
                  "s": 20000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 70,
          "b": 95,
          "lng": 20.46,
          "lat": 44.79,
          "kind": "air",
          "i": 0.9
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "科索沃戰爭",
          "en": "KOSOVO WAR"
      }
  ];
  const notes =   {
      "summary": "科索沃戰爭 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "1998–1999年科索沃阿族起義與塞族鎮壓；北約 1999 年空襲南斯拉夫，科索沃由聯合國托管。",
      "leaders": "塞族米洛舍維奇鎮壓科索沃阿爾巴尼亞人；UCK 科索沃解放軍游擊。北約克林頓政府主導78天空襲。戰後科索沃國際托管，2008年單方面宣布獨立，塞爾維亞與俄羅斯仍反對，巴爾幹勢力持續重組。",
      "nationalPower": "北約空軍與塞族地面軍；俄羅斯反對北約行動。",
      "impact": "科索沃地位未定；2008 年單方面宣布獨立，區域緊張延續。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 21,
              "lat": 42.6,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1998年",
          "title_zh": "科索沃解放軍",
          "title_en": "KLA Uprising",
          "narration_zh": "科索沃阿族武裝與塞族安全部隊衝突。",
          "narration_en": "Kosovo Albanian KLA clashes with Serb security forces.",
          "focus": [
              "co_kos"
          ],
          "side": "co",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 21.17,
              "lat": 42.66,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1998–1999年",
          "title_zh": "塞族鎮壓",
          "title_en": "Serb Crackdown",
          "narration_zh": "塞爾維亞軍警掃蕩村莊，難民湧入鄰國。",
          "narration_en": "Serb forces sweep villages — refugees flee.",
          "focus": [
              "sr_kos"
          ],
          "side": "sr",
          "commanders": [
              {
                  "zh": "米洛舍維奇",
                  "en": "Milošević"
              }
          ],
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
              "lng": 20.46,
              "lat": 44.79,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1999年3月",
          "title_zh": "北約空襲",
          "title_en": "NATO Air Campaign",
          "narration_zh": "北約對南斯拉夫實施大規模空襲。",
          "narration_en": "NATO launches a major air campaign against Yugoslavia.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "air"
          ],
          "forces_zh": "北約 38 國",
          "forces_en": "NATO 38-nation coalition"
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 21.17,
              "lat": 42.66,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1999年6月",
          "title_zh": "塞軍撤出",
          "title_en": "Serb Withdrawal",
          "narration_zh": "塞爾維亞軍隊撤出，聯合國接管科索沃。",
          "narration_en": "Serb forces withdraw — UN administers Kosovo.",
          "focus": [
              "co_kos"
          ],
          "side": "co",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 21.17,
              "lat": 42.66,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1999年後",
          "title_zh": "科索沃託管",
          "title_en": "Kosovo Under UN",
          "narration_zh": "科索沃地位爭議延續至今。",
          "narration_en": "Kosovo's status remains disputed to this day.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "科索沃戰爭",
      "title_en": "KOSOVO WAR",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 21.17,
          "lat": 42.66,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
