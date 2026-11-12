/* PROPHETS TIMELINE · 先知時序 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "prophets",
      "title_zh": "先知時序",
      "title_en": "PROPHETS TIMELINE",
      "subtitle": "先知書",
      "factionOrder": [
          "covenant",
          "nations"
      ],
      "geo": {
          "minLng": 32.77,
          "maxLng": 46.5,
          "minLat": 30.43,
          "maxLat": 37.5,
          "Z": 7
      },
      "startDate": "先知書",
      "introCam": {
          "lng": 35.235,
          "lat": 31.778,
          "dist": 700,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "先知時序",
          "en": "PROPHETS TIMELINE · 先知書",
          "narr_zh": "耶和華的話臨到先知，在猶大與以色列宣告審判與安慰。",
          "narr_en": "The word of the LORD came to the prophets in Judah and Israel."
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
          "href": "../israel-fall/",
          "title_zh": "以色列亡國",
          "title_en": "FALL OF ISRAEL"
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
              "name_zh": "迦密山",
              "name_en": "Mount Carmel",
              "type": "peak",
              "lng": 35.045,
              "lat": 32.741,
              "ref": "王上 18:19"
          },
          {
              "name_zh": "撒瑪利亞",
              "name_en": "Samaria",
              "type": "city",
              "lng": 35.193,
              "lat": 32.276,
              "ref": "王上 16:24"
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
              "name_zh": "亞拿突",
              "name_en": "Anathoth",
              "type": "town",
              "lng": 35.265,
              "lat": 31.807,
              "ref": "耶 1:1"
          },
          {
              "name_zh": "拉吉",
              "name_en": "Lachish",
              "type": "fort",
              "lng": 34.848,
              "lat": 31.565,
              "ref": "耶 34:7"
          },
          {
              "name_zh": "尼尼微",
              "name_en": "Nineveh",
              "type": "city",
              "lng": 43.152,
              "lat": 36.357,
              "ref": "拿 1:2"
          },
          {
              "name_zh": "提勒亞畢",
              "name_en": "Tel Abib",
              "type": "town",
              "lng": 44,
              "lat": 32,
              "ref": "結 3:15"
          },
          {
              "name_zh": "巴比倫",
              "name_en": "Babylon",
              "type": "city",
              "lng": 44.42,
              "lat": 32.536,
              "ref": "耶 25:9"
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "prophets",
          "faction": "covenant",
          "kind": "command",
          "crest": "shield",
          "cf": false,
          "name_zh": "先知",
          "name_en": "Prophets",
          "track": [
              {
                  "d": 1,
                  "lng": 35.045,
                  "lat": 32.741,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 25,
                  "lng": 35.193,
                  "lat": 32.276,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 45,
                  "lng": 35.235,
                  "lat": 31.778,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 65,
                  "lng": 35.265,
                  "lat": 31.807,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 82,
                  "lng": 44,
                  "lat": 32,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 44.42,
                  "lat": 32.536,
                  "s": 0,
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
          "night": 0.12,
          "fog": 0.08,
          "rain": 0.05,
          "smoke": 0.1,
          "zh": "先知時序",
          "en": "PROPHETS TIMELINE"
      }
  ];
  const notes =   {
      "summary": "先知時序 — 互動聖經地圖。",
      "caveats": [
          "路線與時間為教學示意；非精確考古定位。",
          "衛星影像為現代地形，非歷史時期地貌。"
      ],
      "sources": "和合本、聖經地圖、教會史資料（交叉查證）。"
  };
  const analysis =   {
      "military": "以利亞在迦密山對抗巴力（王上18）；以賽亞、耶利米在耶路撒冷；以西結在提勒亞畢（迦巴河，結3:15）；被擄期但以理在巴比倫。",
      "leaders": "以利亞、以賽亞、耶利米、以西結、但以理、哈該、撒迦利亞、瑪拉基。",
      "nationalPower": "先知宣告審判與安慰，預告彌賽亞。",
      "impact": "預言在基督身上應驗。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 35.045,
              "lat": 32.741,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前870年",
          "title_zh": "迦密山",
          "title_en": "Mount Carmel",
          "narration_zh": "王上18:19 以利亞在迦密山對抗巴力先知，耶和華降火。",
          "narration_en": "1 Kgs 18:19 — Elijah on Mount Carmel — fire from the LORD.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "以利亞",
                  "en": "Elijah"
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
              "lng": 35.193,
              "lat": 32.276,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "北國",
          "title_zh": "撒瑪利亞",
          "title_en": "Samaria",
          "narration_zh": "王上16 以北國撒瑪利亞為中心，阿摩司、何西亞呼籲悔改。",
          "narration_en": "Amos and Hosea prophesied against Samaria's idolatry.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 35.235,
              "lat": 31.778,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前8世紀",
          "title_zh": "耶路撒冷",
          "title_en": "Jerusalem",
          "narration_zh": "賽7:14 以賽亞預言童女懷孕生子；彌5:2 彌迦預告伯利恆出生的君王。",
          "narration_en": "Isaiah and Micah prophesied in Jerusalem of the coming King.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "以賽亞",
                  "en": "Isaiah"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 60,
          "hold": 8,
          "cam": {
              "lng": 35.265,
              "lat": 31.807,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "約前7世紀",
          "title_zh": "亞拿突",
          "title_en": "Anathoth",
          "narration_zh": "耶1:1 耶利米是亞拿突的祭司；預言耶路撒冷將被毀。",
          "narration_en": "Jer 1:1 — Jeremiah of Anathoth warned of Jerusalem's fall.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "耶利米",
                  "en": "Jeremiah"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 82,
          "hold": 8,
          "cam": {
              "lng": 44,
              "lat": 32,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "被擄期",
          "title_zh": "提勒亞畢",
          "title_en": "Tel Abib",
          "narration_zh": "結3:15 以西結在迦巴河邊提勒亞畢，見四活物的異象。",
          "narration_en": "Ezek 3:15 — Ezekiel's visions by the Chebar canal.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "以西結",
                  "en": "Ezekiel"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 100,
          "hold": 8,
          "cam": {
              "lng": 44.42,
              "lat": 32.536,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "被擄期",
          "title_zh": "巴比倫",
          "title_en": "Babylon",
          "narration_zh": "但1:1 但以理與同伴被擄至巴比倫；結束期有哈該、撒迦利亞、瑪拉基。",
          "narration_en": "Daniel in Babylon; Haggai, Zechariah and Malachi closed the prophetic era.",
          "focus": [
              "prophets"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "先知時序",
      "title_en": "PROPHETS TIMELINE",
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
