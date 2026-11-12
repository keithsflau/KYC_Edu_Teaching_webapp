/* BATTLE OF SHANGHAI · 淞滬會戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-songhu",
      "title_zh": "淞滬會戰",
      "title_en": "BATTLE OF SHANGHAI",
      "subtitle": "1937年8–11月",
      "factionOrder": [
          "kmt",
          "japan"
      ],
      "geo": {
          "minLng": 120.9,
          "maxLng": 122.1,
          "minLat": 30.75,
          "maxLat": 31.65,
          "Z": 11
      },
      "startDate": [
          1937,
          8,
          13
      ],
      "introCam": {
          "lng": 121.47,
          "lat": 31.23,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "淞滬會戰",
          "en": "BATTLE OF SHANGHAI · 1937年8–11月",
          "narr_zh": "八一三淞滬會戰，國軍與日軍在上海激戰三個月。",
          "narr_en": "Three months of brutal fighting in Shanghai after 13 August 1937."
      },
      "outroCam": {
          "lng": 121.47,
          "lat": 31.23,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "bay",
      "floodRelief": 0.22,
      "reliefScale": 0.82,
      "nextBattle": {
          "href": "../pingxingguan/",
          "title_zh": "平型關大捷",
          "title_en": "PINGXINGGUAN 1937"
      }
  };
  const factions = {
    "kmt": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "國民革命軍", label_en: "National Revolutionary Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "japan": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "日軍", label_en: "Imperial Japanese Army",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "閘北",
              "name_en": "Zhabei",
              "type": "town",
              "lng": 121.47,
              "lat": 31.28
          },
          {
              "name_zh": "寶山",
              "name_en": "Baoshan",
              "type": "fort",
              "lng": 121.49,
              "lat": 31.4
          },
          {
              "name_zh": "四行倉庫",
              "name_en": "Sihang Warehouse",
              "type": "fort",
              "lng": 121.47,
              "lat": 31.24
          }
      ],
      "lines": [],
      "water": [
          {
              "kind": "corridor",
              "halfWidth": 0.08,
              "path": [
                  [
                      121.35,
                      31.45
                  ],
                  [
                      121.45,
                      31.32
                  ],
                  [
                      121.52,
                      31.22
                  ],
                  [
                      121.58,
                      31.12
                  ]
              ]
          },
          {
              "kind": "polygon",
              "ring": [
                  [
                      121.65,
                      31.42
                  ],
                  [
                      121.95,
                      31.38
                  ],
                  [
                      121.92,
                      31.05
                  ],
                  [
                      121.62,
                      31.08
                  ]
              ]
          }
      ]
  };
  const units =   [
      {
          "id": "kmt_songhu",
          "faction": "kmt",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "國軍第87、88師",
          "name_en": "KMT 87th & 88th Divisions",
          "track": [
              {
                  "d": 1,
                  "lng": 121.45,
                  "lat": 31.3,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 121.47,
                  "lat": 31.23,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 121.5,
                  "lat": 31.2,
                  "s": 20000,
                  "st": "retreat"
              }
          ]
      },
      {
          "id": "japan_songhu",
          "faction": "japan",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日軍上海派遣軍",
          "name_en": "Shanghai Expeditionary Force",
          "track": [
              {
                  "d": 1,
                  "lng": 121.55,
                  "lat": 31.35,
                  "s": 80000,
                  "st": "attack"
              },
              {
                  "d": 70,
                  "lng": 121.47,
                  "lat": 31.23,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 121.47,
                  "lat": 31.23,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 15,
          "f": "japan",
          "from": [
              121.55,
              31.35
          ],
          "to": [
              121.47,
              31.23
          ],
          "label": "登陸猛攻",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 10,
          "b": 95,
          "lng": 121.47,
          "lat": 31.23,
          "kind": "firefight",
          "i": 1.2
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "淞滬會戰",
          "en": "BATTLE OF SHANGHAI"
      }
  ];
  const notes =   {
      "summary": "淞滬會戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "中國第二歷史檔案館編《抗日戰爭正面戰場》、日本防衛廳防衛研修所戰史叢書《中國方面海軍作戰》及上海作戰相關檔、謝晉元部四行倉庫人數的戰史整理。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "1937年8月13日日軍進攻上海，國軍在閘北、江灣等地作戰約三個月，其後撤出上海。長期相持的通說在武漢會戰之後。",
      "leaders": "蔣介石把精銳調到上海，松井石根指揮日軍進攻，戰事自1937年8月13日打到11月。謝晉元部固守四行倉庫，紀念話語稱八百壯士，和研究所述約一個營的人數不是同一件事。國軍其後撤出上海。長期相持的通說在武漢會戰之後。",
      "nationalPower": "日軍可從長江口增兵。國軍在上海的裝備較齊，但海空處於劣勢，傷亡很大。",
      "impact": "上海作戰約三個月後國軍撤出。日軍仍繼續進攻南京、徐州、武漢。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 121.47,
              "lat": 31.23,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年8月13日",
          "title_zh": "淞滬開戰",
          "title_en": "Battle of Shanghai Opens",
          "narration_zh": "日軍進攻上海，國軍在閘北反擊，淞滬會戰開始。",
          "narration_en": "Japan attacks Shanghai — Nationalist divisions counter-attack in Zhabei.",
          "focus": [
              "kmt_songhu"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "張治中",
                  "en": "Zhang Zhizhong"
              },
              {
                  "zh": "蔣介石",
                  "en": "Chiang Kai-shek"
              }
          ],
          "assets": [],
          "forces_zh": "國軍約七十萬",
          "forces_en": "~700,000 ROC troops"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 121.48,
              "lat": 31.25,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年8–9月",
          "title_zh": "閘北江灣血戰",
          "title_en": "Bloody Fighting in Zhabei",
          "narration_zh": "雙方逐屋爭奪，國軍反覆衝鋒，傷亡極大。",
          "narration_en": "House-to-house fighting — both sides suffer enormous casualties.",
          "focus": [
              "kmt_songhu",
              "japan_songhu"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 121.5,
              "lat": 31.22,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年10月",
          "title_zh": "四行倉庫",
          "title_en": "Sihang Warehouse",
          "narration_zh": "謝晉元率部固守四行倉庫。該部約一個營，研究多記四百餘人；「八百壯士」是紀念數字，要和實際人數分開。",
          "narration_en": "Xie Jinyuan's '800 Heroes' hold Sihang Warehouse — a morale boost nationwide.",
          "focus": [
              "kmt_songhu"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "謝晉元",
                  "en": "Xie Jinyuan"
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
              "lng": 121.47,
              "lat": 31.2,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年11月",
          "title_zh": "日軍增兵",
          "title_en": "Japanese Reinforcements",
          "narration_zh": "日軍自杭州灣登陸，國軍側翼受威脅，被迫後撤。",
          "narration_en": "Japanese land at Hangzhou Bay — the Nationalist flank is turned.",
          "focus": [
              "japan_songhu"
          ],
          "side": "japan",
          "commanders": [],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 121.47,
              "lat": 31.23,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1937年11月",
          "title_zh": "撤出上海",
          "title_en": "Three-Month Plan Shattered",
          "narration_zh": "淞滬作戰約三個月後國軍撤出上海。日軍仍進攻南京、徐州、武漢。長期相持的通說在武漢會戰之後，不能寫成戰後立即相持。",
          "narration_en": "Three months of fighting shatters Japan's plan for a quick victory.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "鏖戰三個月",
          "forces_en": "Three months of battle"
      }
  ];
  const outro =   {
      "title_zh": "淞滬會戰",
      "title_en": "BATTLE OF SHANGHAI",
      "narration_zh": "1937年11月國軍撤出上海。長期相持的通說在武漢會戰之後。",
      "narration_en": "Nationalist forces left Shanghai in November 1937. The stalemate is usually dated after the Wuhan campaign.",
      "cam": {
          "lng": 121.47,
          "lat": 31.23,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1937年8月至11月上海作戰，以及國軍撤出上海。",
      "senior": "高中：八百壯士是紀念數字；長期相持的通說在武漢會戰之後。",
      "fact": "1937年8月13日起，日軍進攻上海，國軍在閘北、江灣等地逐屋作戰，戰事持續約三個月。10月，謝晉元率部固守四行倉庫。該部約一個營，研究多記四百餘人；「八百壯士」是後來的紀念數字，要和實際人數分開。11月日軍在杭州灣登陸，國軍撤出上海。其後仍有南京、徐州、武漢等會戰。長期相持的通說在1938年10月武漢會戰之後，不能寫成淞滬一結束就進入相持。",
      "sources": "中國第二歷史檔案館編《抗日戰爭正面戰場》、日本防衛廳防衛研修所戰史叢書《中國方面海軍作戰》及上海作戰相關檔、謝晉元部四行倉庫人數的戰史整理。不以網絡百科為唯一依據。",
      "evaluation": "上海一仗拖住日軍約三個月，日軍原想速勝的日程被打亂。這是對戰役效果的一種解釋。它沒有使戰爭在11月進入長期相持，因為日軍接著仍在進攻。紀念意義上的「八百」也不能代替營級人數。",
      "judgment": {
          "ask": "哪一則說法更能解釋淞滬會戰結束時的戰局？",
          "a": "八百壯士守住上海，戰後中國立刻進入長期相持，日軍不再進攻。",
          "b": "國軍在上海打了約三個月後撤出；日軍仍繼續進攻，相持通說要到武漢會戰之後。",
          "better": "b",
          "why": "四行倉庫是局部堅守，八百是紀念數字。淞滬結束後還有南京、徐州、武漢。把相持寫在淞滬戰後，日期不對。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
