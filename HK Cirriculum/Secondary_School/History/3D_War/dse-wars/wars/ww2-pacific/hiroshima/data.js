/* ATOMIC BOMBS · 廣島與長崎 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-hiroshima",
      "title_zh": "廣島與長崎",
      "title_en": "ATOMIC BOMBS",
      "subtitle": "1945年8月",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 130.71,
          "maxLng": 134.21,
          "minLat": 33.14,
          "maxLat": 35.64,
          "Z": 9
      },
      "startDate": [
          1945,
          8,
          6
      ],
      "introCam": {
          "lng": 132.46,
          "lat": 34.39,
          "dist": 650,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "廣島與長崎",
          "en": "ATOMIC BOMBS · 1945年8月",
          "narr_zh": "美軍投下原子彈，日本於8月15日投降。",
          "narr_en": "Atomic bombs on Hiroshima and Nagasaki — Japan surrenders 15 August."
      },
      "outroCam": {
          "lng": 132.46,
          "lat": 34.39,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../../korea/invasion/",
          "title_zh": "北韓南侵",
          "title_en": "INVASION 1950"
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
              "name_en": "Hiroshima",
              "name_zh": "廣島",
              "type": "city",
              "lng": 132.46,
              "lat": 34.39
          },
          {
              "name_en": "Nagasaki",
              "name_zh": "長崎",
              "type": "city",
              "lng": 129.87,
              "lat": 32.75
          },
          {
              "name_en": "Tokyo",
              "name_zh": "東京",
              "type": "city",
              "lng": 139.69,
              "lat": 35.69
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_b29",
          "faction": "us",
          "kind": "navy",
          "crest": "anchor",
          "cf": false,
          "name_zh": "美軍 B-29 部隊",
          "name_en": "US B-29 Command",
          "track": [
              {
                  "d": 1,
                  "lng": 133,
                  "lat": 34.5,
                  "s": 0,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 132.46,
                  "lat": 34.39,
                  "s": 0,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "us",
          "from": [
              133,
              34.5
          ],
          "to": [
              132.46,
              34.39
          ],
          "label": "「小男孩」",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 20,
          "lng": 132.46,
          "lat": 34.39,
          "kind": "explosion",
          "i": 1
      },
      {
          "a": 40,
          "b": 60,
          "lng": 129.87,
          "lat": 32.75,
          "kind": "explosion",
          "i": 1
      },
      {
          "a": 15,
          "b": 35,
          "lng": 132.46,
          "lat": 34.39,
          "kind": "nuclear",
          "i": 0.9
      },
      {
          "a": 40,
          "b": 55,
          "lng": 129.87,
          "lat": 32.75,
          "kind": "nuclear",
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
          "zh": "廣島與長崎",
          "en": "ATOMIC BOMBS"
      }
  ];
  const notes =   {
      "summary": "廣島與長崎 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "美軍以 B-29 投下原子彈「小男孩」「胖子」，廣島、長崎化為廢墟；日本迅速投降。",
      "leaders": "杜魯門決定使用原子彈；史汀生、格羅夫斯推動曼哈頓計劃成果。日本東條英機內閣遲遲決定投降；裕仁天皇終於「玉音放送」。核武器開啟冷戰軍備競賽，重塑國際安全秩序。",
      "nationalPower": "美國核武壟斷；日本軍國體制已無力持久，本土決戰計劃未實施。",
      "impact": "開啟核時代；二戰結束，冷戰與去殖民化浪潮來臨。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 133,
              "lat": 34.5,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年8月6日 凌晨",
          "title_zh": "B-29 出擊",
          "title_en": "B-29 Mission",
          "narration_zh": "恩奧拉·蓋號 B-29 載「小男孩」飛向廣島。",
          "narration_en": "Enola Gay carries \"Little Boy\" toward Hiroshima.",
          "focus": [
              "us_b29"
          ],
          "side": "us",
          "commanders": [
              {
                  "zh": "蒂貝茨",
                  "en": "Tibbets"
              }
          ],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": 132.46,
              "lat": 34.39,
              "dist": 500,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年8月6日 8:15",
          "title_zh": "廣島核爆",
          "title_en": "Hiroshima",
          "narration_zh": "原子彈在廣島上空引爆，約十四萬人喪生。",
          "narration_en": "\"Little Boy\" detonates — ~140,000 dead.",
          "focus": [
              "us_b29"
          ],
          "side": "us",
          "commanders": [],
          "assets": [
              "nuclear",
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 129.87,
              "lat": 32.75,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年8月9日",
          "title_zh": "長崎核爆",
          "title_en": "Nagasaki",
          "narration_zh": "第二枚原子彈「胖子」摧毀長崎。",
          "narration_en": "\"Fat Man\" destroys Nagasaki.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "nuclear",
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 70,
          "hold": 8,
          "cam": {
              "lng": 139.69,
              "lat": 35.69,
              "dist": 800,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年8月14–15日",
          "title_zh": "天皇詔書",
          "title_en": "Imperial Rescript",
          "narration_zh": "天皇宣布接受《波茨坦公告》，戰爭結束。",
          "narration_en": "Emperor announces acceptance of the Potsdam Declaration.",
          "focus": [],
          "side": "jp",
          "commanders": [
              {
                  "zh": "裕仁",
                  "en": "Hirohito"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 132.46,
              "lat": 34.39,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1945年9月",
          "title_zh": "核時代來臨",
          "title_en": "Nuclear Age",
          "narration_zh": "太平洋戰爭結束，人類進入核威懾時代。",
          "narration_en": "The Pacific War ends — humanity enters the nuclear age.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "廣島與長崎",
      "title_en": "ATOMIC BOMBS",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 132.46,
          "lat": 34.39,
          "dist": 780,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
