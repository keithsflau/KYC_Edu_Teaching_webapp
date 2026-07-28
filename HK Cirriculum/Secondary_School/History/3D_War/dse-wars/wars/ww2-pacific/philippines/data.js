/* PHILIPPINES · 菲律賓戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-philippines",
      "title_zh": "菲律賓戰役",
      "title_en": "PHILIPPINES",
      "subtitle": "1941–1942",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 119.48,
          "maxLng": 122.48,
          "minLat": 13.35,
          "maxLat": 15.85,
          "Z": 9
      },
      "startDate": [
          1941,
          12,
          8
      ],
      "introCam": {
          "lng": 120.98,
          "lat": 14.6,
          "dist": 680,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "菲律賓戰役",
          "en": "PHILIPPINES · 1941–1942",
          "narr_zh": "日軍攻陷菲律賓，美菲守軍撤退至巴丹。",
          "narr_en": "Japan conquers the Philippines — US-Filipino forces retreat to Bataan."
      },
      "outroCam": {
          "lng": 120.98,
          "lat": 14.6,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../midway/",
          "title_zh": "中途島海戰",
          "title_en": "MIDWAY 1942"
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
              "name_en": "Manila",
              "name_zh": "馬尼拉",
              "type": "city",
              "lng": 120.98,
              "lat": 14.6
          },
          {
              "name_en": "Bataan",
              "name_zh": "巴丹半島",
              "type": "fort",
              "lng": 120.45,
              "lat": 14.65
          },
          {
              "name_en": "Corregidor",
              "name_zh": "科雷希多島",
              "type": "fort",
              "lng": 120.58,
              "lat": 14.38
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "jp_ph",
          "faction": "jp",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "日本第14軍",
          "name_en": "Japanese 14th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 121.5,
                  "lat": 15,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 60,
                  "lng": 120.98,
                  "lat": 14.6,
                  "s": 55000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 120.45,
                  "lat": 14.65,
                  "s": 50000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "us_ph",
          "faction": "us",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美菲守軍",
          "name_en": "US-Filipino Forces",
          "track": [
              {
                  "d": 1,
                  "lng": 120.98,
                  "lat": 14.6,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 120.45,
                  "lat": 14.65,
                  "s": 30000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 120.58,
                  "lat": 14.38,
                  "s": 10000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "jp",
          "from": [
              121.5,
              15
          ],
          "to": [
              120.98,
              14.6
          ],
          "label": "攻陷馬尼拉",
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
          "zh": "菲律賓戰役",
          "en": "PHILIPPINES"
      }
  ];
  const notes =   {
      "summary": "菲律賓戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "日軍 1941 年底偷襲珍珠港後進攻菲律賓；美菲聯軍在巴丹半島抵抗後投降，麥克阿瑟「我會回來」。",
      "leaders": "麥克阿瑟「我會回來」成為盟軍象徵；日軍本間雅晴占領馬尼拉。美菲聯軍溫賴特最終投降巴丹。戰後麥克阿瑟主導日本占領與朝鮮半島美軍部署，影響東亞冷戰格局。",
      "nationalPower": "日本初期海空優勢；美國太平洋艦隊受創但航母保存。",
      "impact": "菲律賓淪陷強化日本南進；1944 年美軍反攻成為太平洋戰爭重要一環。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 121,
              "lat": 14.6,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1941年12月",
          "title_zh": "日軍南進",
          "title_en": "Japanese Southward Drive",
          "narration_zh": "珍珠港事件後，日軍空襲菲律賓克拉克等機場。",
          "narration_en": "After Pearl Harbor, Japan bombs Philippine airfields.",
          "focus": [],
          "side": "both",
          "commanders": [
              {
                  "zh": "本間雅晴",
                  "en": "Homma"
              }
          ],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 120.98,
              "lat": 14.59,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1941年12月",
          "title_zh": "馬尼拉陷落",
          "title_en": "Manila Falls",
          "narration_zh": "日軍登陸呂宋，美菲聯軍退守巴丹。",
          "narration_en": "Japanese land on Luzon — US-Filipino forces withdraw to Bataan.",
          "focus": [
              "jp_ph",
              "us_phil"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 50,
          "hold": 8,
          "cam": {
              "lng": 120.45,
              "lat": 14.65,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年1–4月",
          "title_zh": "巴丹抵抗",
          "title_en": "Bataan Resistance",
          "narration_zh": "巴丹半島守軍糧盡彈絕，仍頑強抵抗。",
          "narration_en": "Bataan defenders fight on despite starvation and shortages.",
          "focus": [
              "us_phil"
          ],
          "side": "us",
          "commanders": [
              {
                  "zh": "麥克阿瑟",
                  "en": "MacArthur"
              },
              {
                  "zh": "溫賴特",
                  "en": "Wainwright"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 75,
          "hold": 8,
          "cam": {
              "lng": 120.45,
              "lat": 14.65,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年4月",
          "title_zh": "巴丹死亡行軍",
          "title_en": "Bataan Death March",
          "narration_zh": "美菲軍投降，俘虜遭強迫長途行軍，死傷慘重。",
          "narration_en": "Surrender — POWs suffer the Bataan Death March.",
          "focus": [
              "jp_ph"
          ],
          "side": "jp",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 95,
          "hold": 8,
          "cam": {
              "lng": 121,
              "lat": 14.6,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年5月",
          "title_zh": "菲律賓淪陷",
          "title_en": "Philippines Lost",
          "narration_zh": "科雷希多島陷落，日本控制菲律賓，但美國誓言反攻。",
          "narration_en": "Corregidor falls — Japan holds the Philippines; America vows return.",
          "focus": [],
          "side": "jp",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "菲律賓戰役",
      "title_en": "PHILIPPINES",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 120.98,
          "lat": 14.6,
          "dist": 816,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
