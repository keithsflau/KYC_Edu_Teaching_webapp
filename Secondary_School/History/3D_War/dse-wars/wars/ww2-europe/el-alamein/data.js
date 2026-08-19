/* EL ALAMEIN · 阿拉曼戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-alamein",
      "title_zh": "阿拉曼戰役",
      "title_en": "EL ALAMEIN",
      "subtitle": "1942年10–11月",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 27.7,
          "maxLng": 30.2,
          "minLat": 29.83,
          "maxLat": 31.83,
          "Z": 10
      },
      "startDate": [
          1942,
          10,
          23
      ],
      "introCam": {
          "lng": 28.95,
          "lat": 30.83,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "阿拉曼戰役",
          "en": "EL ALAMEIN · 1942年10–11月",
          "narr_zh": "蒙哥馬利在北非擊敗隆美爾，扭轉北非戰局。",
          "narr_en": "Montgomery defeats Rommel — the North African turning point."
      },
      "outroCam": {
          "lng": 28.95,
          "lat": 30.83,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../berlin/",
          "title_zh": "柏林戰役",
          "title_en": "BERLIN 1945"
      }
  };
  const factions = {
    "axis": {
      main: 0x4a4a4a, glow: 0x8b0000, dim: 0x2a2a2a,
      css: "#6b2020", label_zh: "軸心國", label_en: "Axis",
      emblem: "circle", maxStrength: 150000, textLight: "#e8d0d0"
    },
    "allies": {
      main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a,
      css: "#1b4f72", label_zh: "同盟國", label_en: "Allies",
      emblem: "shield", maxStrength: 160000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "El Alamein",
              "name_zh": "阿拉曼",
              "type": "fort",
              "lng": 28.95,
              "lat": 30.83
          },
          {
              "name_en": "Alexandria",
              "name_zh": "亞歷山大港",
              "type": "city",
              "lng": 29.92,
              "lat": 31.2
          },
          {
              "name_en": "Qattara Depression",
              "name_zh": "蓋塔拉洼地",
              "type": "region",
              "lng": 28.5,
              "lat": 29.5
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_8th",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "英第八集團軍",
          "name_en": "8th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 29.5,
                  "lat": 30.9,
                  "s": 90000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 28.95,
                  "lat": 30.83,
                  "s": 100000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 28.5,
                  "lat": 30.7,
                  "s": 95000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "ax_afrika",
          "faction": "axis",
          "kind": "infantry",
          "crest": "tank",
          "cf": true,
          "name_zh": "非洲軍團",
          "name_en": "Afrika Korps",
          "track": [
              {
                  "d": 1,
                  "lng": 28.7,
                  "lat": 30.75,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 28.3,
                  "lat": 30.5,
                  "s": 40000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "allies",
          "from": [
              29.5,
              30.9
          ],
          "to": [
              28.95,
              30.83
          ],
          "label": "第二次阿拉曼",
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
          "zh": "阿拉曼戰役",
          "en": "EL ALAMEIN"
      }
  ];
  const notes =   {
      "summary": "阿拉曼戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "北非沙漠戰：蒙哥馬利率第八集團軍在第二次阿拉曼擊敗隆美爾，扭轉北非戰局。",
      "leaders": "英第八集團軍蒙哥馬利以物資優勢擊潰隆美爾的非洲軍。邱吉爾稱「不是終結，但或許是終結的開始」。隆美爾敗退影響軸心國北非與地中海控制，為盟軍登陸意大利鋪路。",
      "nationalPower": "英軍補給與情報改善；德意非洲軍補給線遭馬耳他與海軍打擊。",
      "impact": "北非軸心國崩潰，盟軍 1943 年登陸意大利；東地中海戰略態勢改變。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 28.5,
              "lat": 30.8,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年10月",
          "title_zh": "隆美爾東進",
          "title_en": "Rommel Advances",
          "narration_zh": "德意非洲軍此前曾兵臨阿拉曼，威脅埃及與蘇伊士。",
          "narration_en": "Axis forces had threatened Egypt and the Suez Canal.",
          "focus": [
              "ax_afrika"
          ],
          "side": "axis",
          "commanders": [
              {
                  "zh": "隆美爾",
                  "en": "Rommel"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 28.95,
              "lat": 30.83,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年10月23日",
          "title_zh": "輕足行動",
          "title_en": "Operation Lightfoot",
          "narration_zh": "蒙哥馬利發動第二次阿拉曼攻勢，炮火準備猛烈。",
          "narration_en": "Montgomery opens Second Alamein with a massive barrage.",
          "focus": [
              "al_8th"
          ],
          "side": "allies",
          "commanders": [
              {
                  "zh": "蒙哥馬利",
                  "en": "Montgomery"
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
              "lng": 28.95,
              "lat": 30.83,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年10月下旬",
          "title_zh": "裝甲決戰",
          "title_en": "Armoured Battle",
          "narration_zh": "雙方坦克在沙漠激戰，英軍逐步突破雷區。",
          "narration_en": "Tank battles in the desert — British breach minefields.",
          "focus": [
              "al_8th",
              "ax_afrika"
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
              "lng": 29.2,
              "lat": 30.9,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年11月",
          "title_zh": "軸心國西撤",
          "title_en": "Axis Retreat",
          "narration_zh": "隆美爾下令撤退，北非戰局逆轉。",
          "narration_en": "Rommel orders retreat — North Africa turns.",
          "focus": [
              "ax_afrika"
          ],
          "side": "axis",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 28.95,
              "lat": 30.83,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年11月",
          "title_zh": "北非轉折",
          "title_en": "North African Turning Point",
          "narration_zh": "阿拉曼成為二戰北非決定性戰役。",
          "narration_en": "El Alamein becomes the decisive battle of the North African campaign.",
          "focus": [],
          "side": "allies",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "阿拉曼戰役",
      "title_en": "EL ALAMEIN",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 28.95,
          "lat": 30.83,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
