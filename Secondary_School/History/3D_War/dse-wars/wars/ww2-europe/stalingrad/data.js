/* STALINGRAD · 斯大林格勒戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-stalingrad",
      "title_zh": "斯大林格勒戰役",
      "title_en": "STALINGRAD",
      "subtitle": "1942–1943",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": 43.27,
          "maxLng": 45.77,
          "minLat": 47.71,
          "maxLat": 49.71,
          "Z": 10
      },
      "startDate": [
          1942,
          8,
          23
      ],
      "introCam": {
          "lng": 44.52,
          "lat": 48.71,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "斯大林格勒戰役",
          "en": "STALINGRAD · 1942–1943",
          "narr_zh": "德軍圍攻斯大林格勒，蘇軍反攻合圍德軍。",
          "narr_en": "Germany besieges Stalingrad — the Red Army encircles the 6th Army."
      },
      "outroCam": {
          "lng": 44.52,
          "lat": 48.71,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../normandy/",
          "title_zh": "諾曼第登陸",
          "title_en": "NORMANDY D-DAY"
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
              "name_en": "Stalingrad",
              "name_zh": "斯大林格勒",
              "type": "city",
              "lng": 44.52,
              "lat": 48.71
          },
          {
              "name_en": "Volga River",
              "name_zh": "伏爾加河",
              "type": "bay",
              "lng": 44.55,
              "lat": 48.72
          },
          {
              "name_en": "Mamayev Kurgan",
              "name_zh": "馬馬耶夫山崗",
              "type": "fort",
              "lng": 44.54,
              "lat": 48.74
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ax_6th",
          "faction": "axis",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第六集團軍",
          "name_en": "German 6th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 44.6,
                  "lat": 48.8,
                  "s": 110000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 90000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 20000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "al_red",
          "faction": "allies",
          "kind": "infantry",
          "crest": "hammer",
          "cf": true,
          "name_zh": "蘇聯第62集團軍",
          "name_en": "Soviet 62nd Army",
          "track": [
              {
                  "d": 1,
                  "lng": 44.5,
                  "lat": 48.7,
                  "s": 100000,
                  "st": "hold"
              },
              {
                  "d": 80,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 44.52,
                  "lat": 48.71,
                  "s": 130000,
                  "st": "attack"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "axis",
          "from": [
              44.6,
              48.8
          ],
          "to": [
              44.52,
              48.71
          ],
          "label": "巷戰圍城",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 20,
          "b": 100,
          "lng": 44.52,
          "lat": 48.71,
          "kind": "firefight",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.25,
          "fog": 0.3,
          "rain": 0.1,
          "smoke": 0.8,
          "zh": "斯大林格勒廢墟",
          "en": "Stalingrad ruins"
      }
  ];
  const notes =   {
      "summary": "斯大林格勒戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "德軍1942年夏攻向伏爾加河與高加索；斯大林格勒巷戰慘烈，蘇軍天王星行動反包圍德軍第六集團軍。",
      "leaders": "希特勒堅持攻占斯大林格勒；保盧斯率第六集團軍被圍。蘇軍朱可夫、瓦西列夫斯基策劃「天王星行動」合圍。史達林以城市名義激勵抵抗。德軍覆滅標誌東線戰略轉折，朱可夫聲望達頂峰。",
      "nationalPower": "蘇聯全民动员、寒冬與補給線優勢；德軍過度延伸、空運補給失敗。",
      "impact": "二戰東線轉折點；德軍從此戰略防守，士氣與同盟信心逆轉。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 44.5,
              "lat": 48.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年8月",
          "title_zh": "德軍東進",
          "title_en": "German Drive East",
          "narration_zh": "德軍第六集團軍向伏爾加河與斯大林格勒推進。",
          "narration_en": "German 6th Army advances toward the Volga and Stalingrad.",
          "focus": [
              "ax_6th"
          ],
          "side": "axis",
          "commanders": [
              {
                  "zh": "保盧斯",
                  "en": "Paulus"
              }
          ],
          "assets": [
              "air",
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 44,
              "lat": 48.7,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年9月",
          "title_zh": "進入城市",
          "title_en": "Into the City",
          "narration_zh": "德軍攻入斯大林格勒市區，逐屋巷戰。",
          "narration_en": "Germans enter the city — brutal house-to-house fighting.",
          "focus": [
              "ax_6th",
              "al_red"
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
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 44,
              "lat": 48.7,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年10–11月",
          "title_zh": "崔可夫死守",
          "title_en": "Chuikov Holds",
          "narration_zh": "蘇軍第62集團軍在廢墟中頑抗，「擁抱敵人」戰術。",
          "narration_en": "Soviet 62nd Army holds the ruins — \"hugging\" tactics.",
          "focus": [
              "al_red"
          ],
          "side": "allies",
          "commanders": [
              {
                  "zh": "崔可夫",
                  "en": "Chuikov"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 44.5,
              "lat": 48.5,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年11月19日",
          "title_zh": "天王星行動",
          "title_en": "Operation Uranus",
          "narration_zh": "蘇軍從南北两翼包圍德軍，切斷第六集團軍退路。",
          "narration_en": "Soviet pincers encircle the 6th Army.",
          "focus": [
              "al_red"
          ],
          "side": "allies",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 44,
              "lat": 48.7,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1943年1月",
          "title_zh": "德軍投降",
          "title_en": "German Surrender",
          "narration_zh": "保盧斯率殘部投降，東線戰略逆轉。",
          "narration_en": "Paulus surrenders — the Eastern Front turns.",
          "focus": [
              "ax_6th"
          ],
          "side": "axis",
          "commanders": [],
          "assets": [],
          "forces_zh": "德軍 30 萬被圍",
          "forces_en": "300,000 Germans trapped"
      }
  ];
  const outro =   {
      "title_zh": "斯大林格勒戰役",
      "title_en": "STALINGRAD",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 44.52,
          "lat": 48.71,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
