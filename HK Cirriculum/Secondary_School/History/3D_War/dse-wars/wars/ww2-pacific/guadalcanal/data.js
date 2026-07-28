/* GUADALCANAL · 瓜達爾卡納爾戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-guadalcanal",
      "title_zh": "瓜達爾卡納爾戰役",
      "title_en": "GUADALCANAL",
      "subtitle": "1942–1943",
      "factionOrder": [
          "jp",
          "us"
      ],
      "geo": {
          "minLng": 158.9,
          "maxLng": 161.4,
          "minLat": -10.55,
          "maxLat": -8.55,
          "Z": 10
      },
      "startDate": [
          1942,
          8,
          7
      ],
      "introCam": {
          "lng": 160.15,
          "lat": -9.55,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "瓜達爾卡納爾戰役",
          "en": "GUADALCANAL · 1942–1943",
          "narr_zh": "美軍登陸瓜島，奪取亨德森機場。",
          "narr_en": "US Marines land on Guadalcanal and seize Henderson Field."
      },
      "outroCam": {
          "lng": 160.15,
          "lat": -9.55,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../iwo-jima/",
          "title_zh": "硫磺島戰役",
          "title_en": "IWO JIMA 1945"
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
              "name_en": "Guadalcanal",
              "name_zh": "瓜達爾卡納爾",
              "type": "island",
              "lng": 160.15,
              "lat": -9.55
          },
          {
              "name_en": "Henderson Field",
              "name_zh": "亨德森機場",
              "type": "fort",
              "lng": 160.05,
              "lat": -9.43
          },
          {
              "name_en": "Tulagi",
              "name_zh": "圖拉吉",
              "type": "island",
              "lng": 160.14,
              "lat": -9.1
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "us_marines",
          "faction": "us",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "美國海軍陸戰隊",
          "name_en": "US Marines",
          "track": [
              {
                  "d": 1,
                  "lng": 160.3,
                  "lat": -9.7,
                  "s": 40000,
                  "st": "landing"
              },
              {
                  "d": 60,
                  "lng": 160.05,
                  "lat": -9.43,
                  "s": 45000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 160.15,
                  "lat": -9.55,
                  "s": 50000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "jp_garrison",
          "faction": "jp",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日本守備隊",
          "name_en": "Japanese Garrison",
          "track": [
              {
                  "d": 1,
                  "lng": 160.1,
                  "lat": -9.5,
                  "s": 30000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 160.2,
                  "lat": -9.6,
                  "s": 8000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "us",
          "from": [
              160.3,
              -9.7
          ],
          "to": [
              160.05,
              -9.43
          ],
          "label": "瓜島登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 160.05,
          "lat": -9.43,
          "kind": "firefight",
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
          "zh": "瓜達爾卡納爾戰役",
          "en": "GUADALCANAL"
      }
  ];
  const notes =   {
      "summary": "瓜達爾卡納爾戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "盟軍首次兩棲反攻瓜達爾卡納爾，奪取日軍興建機場；海戰與叢林戰持續半年。",
      "leaders": "美陸戰一師與日軍十七軍團反覆爭奪；范德格里夫特固守機場。日軍山口多聞海戰失利。美國確立跳島戰略基礎，日本補給線被逐步切斷。",
      "nationalPower": "美國工業與補給逐步佔優；日軍「餓島」戰略失敗。",
      "impact": "日本由攻轉守；盟軍沿所羅門群島西進。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 160,
              "lat": -9.5,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年8月7日",
          "title_zh": "盟軍登陸",
          "title_en": "Allied Landing",
          "narration_zh": "美軍海軍陸戰隊在瓜島登陸，奪取亨德森機場。",
          "narration_en": "US Marines land on Guadalcanal — seize Henderson Field.",
          "focus": [
              "us_marines"
          ],
          "side": "us",
          "commanders": [
              {
                  "zh": "范德格里夫特",
                  "en": "Vandegrift"
              }
          ],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 159.95,
              "lat": -9.42,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年8–9月",
          "title_zh": "薩沃島海戰",
          "title_en": "Battle of Savo Island",
          "narration_zh": "日軍夜間突袭盟軍艦隊，美澳巡洋艦慘重損失。",
          "narration_en": "Japanese night attack at Savo Island — heavy Allied cruiser losses.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 159.95,
              "lat": -9.42,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年10月",
          "title_zh": "亨德森機場爭奪",
          "title_en": "Fight for Henderson Field",
          "narration_zh": "日軍多次夜間進攻機場，雙方叢林血戰。",
          "narration_en": "Repeated Japanese night assaults on the airfield.",
          "focus": [
              "us_marines",
              "jp_garrison"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "air",
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 65,
          "hold": 8,
          "cam": {
              "lng": 159.95,
              "lat": -9.42,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1942年11月",
          "title_zh": "瓜島海戰",
          "title_en": "Naval Battles",
          "narration_zh": "聖克魯斯、瓜島海戰消耗雙方艦隊。",
          "narration_en": "Santa Cruz and Guadalcanal naval battles attrit both fleets.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "navy",
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 159.95,
              "lat": -9.42,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1943年2月",
          "title_zh": "日軍撤退",
          "title_en": "Japanese Evacuation",
          "narration_zh": "日軍秘密撤出瓜島，盟軍反攻得手。",
          "narration_en": "Japan secretly evacuates — the Allied counter-offensive succeeds.",
          "focus": [
              "us_marines"
          ],
          "side": "us",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "瓜達爾卡納爾戰役",
      "title_en": "GUADALCANAL",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 160.15,
          "lat": -9.55,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
