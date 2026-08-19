/* SARAJEVO · 薩拉熱窩暗殺 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-sarajevo",
      "title_zh": "薩拉熱窩暗殺",
      "title_en": "SARAJEVO",
      "subtitle": "1914年6月28日",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 18.01,
          "maxLng": 18.81,
          "minLat": 43.51,
          "maxLat": 44.21,
          "Z": 12
      },
      "startDate": [
          1914,
          6,
          28
      ],
      "introCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 520,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "薩拉熱窩暗殺",
          "en": "SARAJEVO · 1914年6月28日",
          "narr_zh": "1914年6月28日，斐迪南大公在薩拉熱窩遇刺。",
          "narr_en": "Archduke Franz Ferdinand is assassinated in Sarajevo, 28 June 1914."
      },
      "outroCam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../marne/",
          "title_zh": "馬恩河戰役",
          "title_en": "MARNE 1914"
      }
  };
  const factions = {
    "cp": {
      main: 0x5c4033, glow: 0x8b6914, dim: 0x3a2820,
      css: "#5c4033", label_zh: "同盟國", label_en: "Central Powers",
      emblem: "circle", maxStrength: 120000, textLight: "#e8dcc8"
    },
    "ap": {
      main: 0x1e5a8a, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1e5a8a", label_zh: "協約國", label_en: "Allied Powers",
      emblem: "shield", maxStrength: 130000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Sarajevo",
              "name_zh": "薩拉熱窩",
              "type": "city",
              "lng": 18.41,
              "lat": 43.86
          },
          {
              "name_en": "Latin Bridge",
              "name_zh": "拉丁橋",
              "type": "town",
              "lng": 18.43,
              "lat": 43.86
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "ap_sarajevo",
          "faction": "ap",
          "kind": "command",
          "crest": "anchor",
          "cf": false,
          "name_zh": "奧匈皇室隨行",
          "name_en": "Austrian Royal Party",
          "track": [
              {
                  "d": 1,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 0,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 18.41,
                  "lat": 43.86,
                  "s": 0,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "cp",
          "from": [
              18.43,
              43.86
          ],
          "to": [
              18.41,
              43.86
          ],
          "label": "普林西普開槍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 100,
          "lng": 18.41,
          "lat": 43.86,
          "kind": "firefight",
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
          "zh": "薩拉熱窩暗殺",
          "en": "SARAJEVO"
      }
  ];
  const notes =   {
      "summary": "薩拉熱窩暗殺 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "奧匈皇儲斐迪南大公在波斯尼亞巡視，塞族民族主義組織「青年波斯尼亞」策劃暗殺；普林西普於拉丁橋開槍，直接觸發七月危機與大國動員。",
      "leaders": "斐迪南大公（奧匈皇儲）：其遇刺成為奧匈對塞宣戰的藉口。奧匈外相貝希托德、德皇威廉二世推動強硬路線。塞爾維亞首相帕希奇面對最後通牒；俄皇尼古拉二世動員支援斯拉夫同胞，牽動同盟連鎖。",
      "nationalPower": "奧匈帝國藉此向塞爾維亞施壓；俄國保護斯拉夫同胞，德國支持奧匈，法國與俄國同盟，英國受條約牽制。",
      "impact": "一連串同盟條款把地方暗殺升級為世界大戰；民族主義與帝國競爭的結構性矛盾一次爆發。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年6月28日",
          "title_zh": "斐迪南抵達薩拉熱窩",
          "title_en": "Archduke Arrives",
          "narration_zh": "奧匈皇儲斐迪南大公夫婦抵達波斯尼亞首府，當地塞族情緒高漲。",
          "narration_en": "Archduke Franz Ferdinand arrives in Sarajevo amid Serb nationalist tension.",
          "focus": [
              "ap_sarajevo"
          ],
          "side": "ap",
          "commanders": [
              {
                  "zh": "斐迪南大公",
                  "en": "Franz Ferdinand"
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
              "lng": 18.43,
              "lat": 43.86,
              "dist": 480,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年6月28日 上午",
          "title_zh": "第一次刺殺未遂",
          "title_en": "First Attempt Fails",
          "narration_zh": "炸彈襲擊車隊失敗，斐迪南改道前往醫院探視傷者。",
          "narration_en": "A bomb attack fails; the royal party reroutes to visit the wounded.",
          "focus": [
              "ap_sarajevo"
          ],
          "side": "ap",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": 18.43,
              "lat": 43.86,
              "dist": 450,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年6月28日 下午",
          "title_zh": "拉丁橋開槍",
          "title_en": "Shots at Latin Bridge",
          "narration_zh": "普林西普在拉丁橋近距離開槍，皇儲夫婦當場身亡。",
          "narration_en": "Gavrilo Princip fires at Latin Bridge — the royal couple is killed.",
          "focus": [
              "ap_sarajevo"
          ],
          "side": "cp",
          "commanders": [
              {
                  "zh": "普林西普",
                  "en": "Gavrilo Princip"
              }
          ],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 60,
          "hold": 8,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年7月",
          "title_zh": "七月危機",
          "title_en": "July Crisis",
          "narration_zh": "奧匈向塞爾維亞發出最後通牒，俄、德、法、英相繼動員。",
          "narration_en": "Austria-Hungary issues an ultimatum to Serbia; the great powers mobilise.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "歐洲列強進入戰爭動員",
          "forces_en": "European powers mobilise for war"
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 18.41,
              "lat": 43.86,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1914年8月",
          "title_zh": "導火線的後果",
          "title_en": "Aftermath",
          "narration_zh": "一樁地方暗殺引發連鎖同盟義務，第一次世界大戰全面爆發。",
          "narration_en": "A local assassination triggers alliance obligations — World War I begins.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "薩拉熱窩暗殺",
      "title_en": "SARAJEVO",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 18.41,
          "lat": 43.86,
          "dist": 624,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
