/* MIDWAY · 中途島海戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-midway",
      "title_zh": "中途島海戰",
      "title_en": "MIDWAY",
      "subtitle": "1942年6月",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": -179.4,
          "maxLng": -175.4,
          "minLat": 26.7,
          "maxLat": 29.7,
          "Z": 8
      },
      "startDate": [
          1942,
          6,
          4
      ],
      "introCam": {
          "lng": -177.4,
          "lat": 28.2,
          "dist": 900,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "中途島海戰",
          "en": "MIDWAY · 1942年6月",
          "narr_zh": "美軍以情報優勢在中途島擊沉四艘日航母。",
          "narr_en": "US intelligence enables the sinking of four Japanese carriers at Midway."
      },
      "outroCam": {
          "lng": -177.4,
          "lat": 28.2,
          "dist": 1080,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../guadalcanal/",
          "title_zh": "瓜達爾卡納爾",
          "title_en": "GUADALCANAL 1942–43"
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
              "name_en": "Midway Atoll",
              "name_zh": "中途島",
              "type": "island",
              "lng": -177.38,
              "lat": 28.21
          },
          {
              "name_en": "Battle area (north)",
              "name_zh": "海戰區（北）",
              "type": "bay",
              "lng": -177,
              "lat": 29
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_carrier",
          "faction": "us",
          "kind": "navy",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美國特混艦隊",
          "name_en": "US Carrier Task Force",
          "track": [
              {
                  "d": 1,
                  "lng": -177.8,
                  "lat": 27.5,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": -177.2,
                  "lat": 28.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": -177.38,
                  "lat": 28.21,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "jp_carrier",
          "faction": "jp",
          "kind": "navy",
          "crest": "anchor",
          "cf": true,
          "name_zh": "日本機動部隊",
          "name_en": "Kido Butai",
          "track": [
              {
                  "d": 1,
                  "lng": -176.5,
                  "lat": 29.5,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 50,
                  "lng": -177,
                  "lat": 28.8,
                  "s": 40000,
                  "st": "dead"
              },
              {
                  "d": 100,
                  "lng": -176.5,
                  "lat": 29.5,
                  "s": 10000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 30,
          "f": "us",
          "from": [
              -177.8,
              27.5
          ],
          "to": [
              -177,
              28.8
          ],
          "label": "航母決戰",
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
          "zh": "中途島海戰",
          "en": "MIDWAY"
      }
  ];
  const notes =   {
      "summary": "中途島海戰 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "美軍破譯日軍密碼，在中途島設伏；航母空戰中擊沉四艘日航母，扭轉太平洋戰局。",
      "leaders": "美海軍尼米茲與情報官羅切斯特破譯日軍密碼；南雲忠一中伏損失四艘航母。山本五十六戰略擴張受挫。美國取得太平洋主動權，日本工業與航母兵力難以恢復。",
      "nationalPower": "日本賭上聯合艦隊主力；美國工業與情報優勢顯現。",
      "impact": "太平洋戰爭戰略轉折；日本從此失去海空主動權。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": -177.4,
              "lat": 28.2,
              "dist": 800,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年6月4日 前",
          "title_zh": "情報優勢",
          "title_en": "Intelligence Edge",
          "narration_zh": "美軍破譯日軍密碼，得知偷襲中途島計劃。",
          "narration_en": "US codebreakers learn of Japan's Midway operation.",
          "focus": [
              "us_carrier"
          ],
          "side": "us",
          "commanders": [
              {
                  "zh": "尼米茲",
                  "en": "Nimitz"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": -177,
              "lat": 29,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年6月4日",
          "title_zh": "日航母出擊",
          "title_en": "Japanese Carriers Strike",
          "narration_zh": "南雲機動部隊四艘航母起飛攻擊中途島。",
          "narration_en": "Nagumo's four carriers launch strikes on Midway.",
          "focus": [
              "jp_carrier"
          ],
          "side": "jp",
          "commanders": [
              {
                  "zh": "南雲忠一",
                  "en": "Nagumo"
              }
          ],
          "assets": [
              "navy",
              "air"
          ],
          "forces_zh": "日航母 4 艘",
          "forces_en": "4 Japanese carriers"
      },
      {
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": -177.2,
              "lat": 28.5,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年6月4日 上午",
          "title_zh": "美機反擊",
          "title_en": "US Counter-strike",
          "narration_zh": "美軍艦載機與中途島陸基機反覆攻擊日艦。",
          "narration_en": "US carrier and Midway-based aircraft attack the Japanese fleet.",
          "focus": [
              "us_carrier"
          ],
          "side": "us",
          "commanders": [],
          "assets": [
              "air",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 60,
          "hold": 8,
          "cam": {
              "lng": -177.38,
              "lat": 28.21,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年6月4日 下午",
          "title_zh": "航母沉沒",
          "title_en": "Carriers Sunk",
          "narration_zh": "企業號、大黃蜂號俯衝轟炸機擊沉赤城、加賀、蒼龍、飛龍。",
          "narration_en": "Dive bombers from Enterprise and Hornet sink four Japanese carriers.",
          "focus": [
              "us_carrier",
              "jp_carrier"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "air",
              "navy"
          ],
          "forces_zh": "日損 4 航母",
          "forces_en": "Japan loses 4 carriers"
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": -177.38,
              "lat": 28.21,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年6月",
          "title_zh": "戰略逆轉",
          "title_en": "Strategic Reversal",
          "narration_zh": "中途島海戰成為太平洋戰爭轉折點。",
          "narration_en": "Midway becomes the turning point of the Pacific War.",
          "focus": [],
          "side": "us",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "中途島海戰",
      "title_en": "MIDWAY",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": -177.4,
          "lat": 28.2,
          "dist": 1080,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
