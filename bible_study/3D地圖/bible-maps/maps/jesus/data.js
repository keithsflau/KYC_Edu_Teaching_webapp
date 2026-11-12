/* LIFE OF JESUS · 耶穌生平 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "jesus",
      "title_zh": "耶穌生平",
      "title_en": "LIFE OF JESUS",
      "subtitle": "四福音",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 33.78,
          "maxLng": 36.78,
          "minLat": 31.04,
          "maxLat": 33.54,
          "Z": 10
      },
      "startDate": "四福音",
      "introCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "耶穌生平",
          "en": "LIFE OF JESUS · 四福音",
          "narr_zh": "道成了肉身，住在我們中間，充充滿滿地有恩典有真理。",
          "narr_en": "The Word became flesh and dwelt among us."
      },
      "outroCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../paul/",
          "title_zh": "保羅傳福音",
          "title_en": "PAUL'S JOURNEYS"
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
              "name_zh": "伯利恆",
              "name_en": "Bethlehem",
              "type": "town",
              "lng": 35.202,
              "lat": 31.705,
              "ref": "撒上 16:1"
          },
          {
              "name_zh": "拿撒勒",
              "name_en": "Nazareth",
              "type": "town",
              "lng": 35.297,
              "lat": 32.702,
              "ref": "路 2:39"
          },
          {
              "name_zh": "迦拿",
              "name_en": "Cana",
              "type": "town",
              "lng": 35.348,
              "lat": 32.746,
              "ref": "約 2:1"
          },
          {
              "name_zh": "迦百農",
              "name_en": "Capernaum",
              "type": "town",
              "lng": 35.575,
              "lat": 32.881,
              "ref": "太 4:13"
          },
          {
              "name_zh": "加利利海",
              "name_en": "Sea of Galilee",
              "type": "bay",
              "lng": 35.5,
              "lat": 32.833,
              "ref": "太 4:18"
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
              "name_zh": "伯大尼",
              "name_en": "Bethany",
              "type": "town",
              "lng": 35.263,
              "lat": 31.771,
              "ref": "約 11:1"
          },
          {
              "name_zh": "客西馬尼",
              "name_en": "Gethsemane",
              "type": "peak",
              "lng": 35.24,
              "lat": 31.78,
              "ref": "太 26:36"
          },
          {
              "name_zh": "耶路撒冷",
              "name_en": "Jerusalem",
              "type": "city",
              "lng": 35.235,
              "lat": 31.778,
              "ref": "撒下 5:7"
          },
          {
              "name_zh": "以馬忤斯",
              "name_en": "Emmaus",
              "type": "town",
              "lng": 34.99,
              "lat": 31.838,
              "ref": "路 24:13"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "jesus",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": true,
          "name_zh": "耶穌",
          "name_en": "Jesus",
          "track": [
              {
                  "d": 1,
                  "lng": 35.202,
                  "lat": 31.705,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 18,
                  "lng": 35.297,
                  "lat": 32.702,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 35,
                  "lng": 35.348,
                  "lat": 32.746,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 35.575,
                  "lat": 32.881,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 65,
                  "lng": 35.5,
                  "lat": 32.833,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 78,
                  "lng": 35.444,
                  "lat": 31.872,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 88,
                  "lng": 35.24,
                  "lat": 31.78,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 34.99,
                  "lat": 31.838,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 82,
          "f": "covenant",
          "from": [
              35.263,
              31.771
          ],
          "to": [
              35.235,
              31.778
          ],
          "label": "進耶路撒冷 太21:9",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [];
  const weather =   [
      {
          "d": 1,
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "耶穌生平",
          "en": "LIFE OF JESUS"
      }
  ];
  const notes =   {
      "summary": "耶穌生平 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "耶穌生於伯利恆（路2），在拿撒勒成長（路2:39），在迦拿行首個神蹟（約2），以迦百農為事工中心（太4:13），在加利利海呼召門徒，最後一周經伯大尼、客西馬尼至耶路撒冷受難復活（路24 以馬忤斯）。",
      "leaders": "耶穌、門徒、馬利亞、彼拉多。",
      "nationalPower": "道成肉身；十字架成就救贖；復活戰勝死亡。",
      "impact": "救恩歷史中心；大使命差遣門徒。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.202,
              "lat": 31.705,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元前4年",
          "title_zh": "伯利恆降生",
          "title_en": "Bethlehem",
          "narration_zh": "路2:4-7 馬利亞在伯利恆生下頭胎兒子，用布包起來放在馬槽裡。",
          "narration_en": "Luke 2:4-7 — Jesus was born in Bethlehem.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 18,
          "hold": 8,
          "cam": {
              "lng": 35.297,
              "lat": 32.702,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "成長",
          "title_zh": "拿撒勒",
          "title_en": "Nazareth",
          "narration_zh": "路2:39-40 耶穌在拿撒勒長大，智慧與身量一齊增長。",
          "narration_en": "Luke 2:39-40 — Jesus grew up in Nazareth.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 35,
          "hold": 8,
          "cam": {
              "lng": 35.348,
              "lat": 32.746,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元27年",
          "title_zh": "迦拿婚筵",
          "title_en": "Cana",
          "narration_zh": "約2:1-11 在迦拿婚筵耶穌以水變酒，顯出榮耀。",
          "narration_en": "John 2:1-11 — The first sign at Cana in Galilee.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 35.575,
              "lat": 32.881,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約公元27–30年",
          "title_zh": "迦百農",
          "title_en": "Capernaum",
          "narration_zh": "太4:13 耶穌離開拿撒勒，往迦百農居住，那裡靠海。",
          "narration_en": "Matt 4:13 — Jesus made Capernaum his base by the sea.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "耶穌",
                  "en": "Jesus"
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
              "lng": 35.5,
              "lat": 32.833,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "事工期",
          "title_zh": "加利利海",
          "title_en": "Sea of Galilee",
          "narration_zh": "太4:18 在加利利海邊呼召彼得、安得烈、雅各、約翰。",
          "narration_en": "Matt 4:18 — Calling the first disciples by the Sea of Galilee.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 78,
          "hold": 8,
          "cam": {
              "lng": 35.444,
              "lat": 31.872,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "末後旅程",
          "title_zh": "耶利哥",
          "title_en": "Jericho",
          "narration_zh": "路19:1 耶穌進耶利哥，遇撒該；隨後上耶路撒冷。",
          "narration_en": "Luke 19:1 — Jesus passed through Jericho toward Jerusalem.",
          "focus": [
              "jesus"
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
              "lng": 35.24,
              "lat": 31.78,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元30年",
          "title_zh": "客西馬尼",
          "title_en": "Gethsemane",
          "narration_zh": "太26:36 耶穌帶門徒到客西馬尼，禱告說：我父啊，若不能免去，就願你的意旨成全。",
          "narration_en": "Matt 26:36 — Gethsemane: 'Not my will, but yours be done.'",
          "focus": [
              "jesus"
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
              "lng": 34.99,
              "lat": 31.838,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公元30年",
          "title_zh": "以馬忤斯",
          "title_en": "Emmaus",
          "narration_zh": "路24:13-31 復活主在往以馬忤斯的路上向門徒顯現，開他們的心竅。",
          "narration_en": "Luke 24:13-31 — The risen Lord appeared on the road to Emmaus.",
          "focus": [
              "jesus"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "耶穌生平",
      "title_en": "LIFE OF JESUS",
      "narration_zh": "本段為聖經與教會史重要考點。",
      "narration_en": "A key Bible and church history topic.",
      "cam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 840,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
