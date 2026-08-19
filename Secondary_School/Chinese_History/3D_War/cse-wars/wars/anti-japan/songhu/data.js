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
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "八一三事变后日军进攻上海，国军以德械师与中央军精锐在闸北、江湾逐屋血战；战斗持续三月，日军增兵至二十余万，国军有序撤退。",
      "leaders": "淞滬會戰中，蔣介石調集精銳主力在上海主動反擊，意圖引日軍東移、爭取國際調停並展示抗戰決心。日軍華中方面軍司令松井石根以海空優勢強登，逐屋爭奪，戰事持續三個月。國軍傷亡慘重但遲滯日軍西進，粉碎日本「三月亡華」企圖，卻也消耗大量中央軍，影響後續徐州、武漢防線部署。",
      "nationalPower": "日本海军可自长江口投送兵力；国军装备与训练优于其他战场，但海空劣势、伤亡惨重。",
      "impact": "戰況慘烈，成功粉碎日軍「三月亡華」的戰略企圖。"
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
          "title_zh": "淞沪开战",
          "title_en": "Battle of Shanghai Opens",
          "narration_zh": "日军进攻上海，国军第八十七、八十八师在闸北反击，淞沪会战爆发。",
          "narration_en": "Japan attacks Shanghai — Nationalist divisions counter-attack in Zhabei.",
          "focus": [
              "kmt_songhu"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "张治中",
                  "en": "Zhang Zhizhong"
              },
              {
                  "zh": "蒋介石",
                  "en": "Chiang Kai-shek"
              }
          ],
          "assets": [],
          "forces_zh": "国军约七十万",
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
          "title_zh": "闸北江湾血战",
          "title_en": "Bloody Fighting in Zhabei",
          "narration_zh": "双方逐屋争夺，国军反复冲锋，伤亡极大。",
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
          "title_zh": "四行仓库",
          "title_en": "Sihang Warehouse",
          "narration_zh": "谢晋元率八百壮士坚守四行仓库，振奋全国士气。",
          "narration_en": "Xie Jinyuan's '800 Heroes' hold Sihang Warehouse — a morale boost nationwide.",
          "focus": [
              "kmt_songhu"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "谢晋元",
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
          "title_zh": "日军增兵",
          "title_en": "Japanese Reinforcements",
          "narration_zh": "日军自杭州湾登陆，国军侧翼受威胁，被迫后撤。",
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
          "title_zh": "粉碎三月亡华",
          "title_en": "Three-Month Plan Shattered",
          "narration_zh": "淞沪鏖战三月，日军速胜计划破产，战事转入长期相持。",
          "narration_en": "Three months of fighting shatters Japan's plan for a quick victory.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "鏖战三个月",
          "forces_en": "Three months of battle"
      }
  ];
  const outro =   {
      "title_zh": "淞滬會戰",
      "title_en": "BATTLE OF SHANGHAI",
      "narration_zh": "本戰役為 DSE 中史重要考點：戰況慘烈，成功粉碎日軍「三月亡華」的戰略企圖",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 121.47,
          "lat": 31.23,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
