/* BATTLE OF TAI'ERZHUANG · 台兒莊戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-taierzhuang",
      "title_zh": "台兒莊戰役",
      "title_en": "BATTLE OF TAI'ERZHUANG",
      "subtitle": "1938年3–4月",
      "factionOrder": [
          "kmt",
          "japan"
      ],
      "geo": {
          "minLng": 116.73,
          "maxLng": 118.73,
          "minLat": 33.76,
          "maxLat": 35.36,
          "Z": 10
      },
      "startDate": [
          1938,
          3,
          24
      ],
      "introCam": {
          "lng": 117.73,
          "lat": 34.56,
          "dist": 590,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "台兒莊戰役",
          "en": "BATTLE OF TAI'ERZHUANG · 1938年3–4月",
          "narr_zh": "李宗仁指揮第五戰區，在台兒莊圍殲日軍精銳。",
          "narr_en": "Li Zongren's forces encircle and destroy Japanese troops at Tai'erzhuang."
      },
      "outroCam": {
          "lng": 117.73,
          "lat": 34.56,
          "dist": 708,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.1,
      "reliefScale": 0.75,
      "nextBattle": {
          "href": "../hundred-regiments/",
          "title_zh": "百團大戰",
          "title_en": "HUNDRED REGIMENTS 1940"
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
      css: "#1565c0", label_zh: "日軍", label_en: "Japanese Army",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "台兒莊",
              "name_en": "Tai'erzhuang",
              "type": "fort",
              "lng": 117.73,
              "lat": 34.56
          },
          {
              "name_zh": "臨沂",
              "name_en": "Linyi",
              "type": "city",
              "lng": 118.35,
              "lat": 35.1
          },
          {
              "name_zh": "運河",
              "name_en": "Grand Canal",
              "type": "town",
              "lng": 117.65,
              "lat": 34.5
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "kmt_tezz",
          "faction": "kmt",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "第五戰區",
          "name_en": "5th War Zone",
          "track": [
              {
                  "d": 1,
                  "lng": 117.5,
                  "lat": 34.7,
                  "s": 100000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 117.73,
                  "lat": 34.56,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 117.73,
                  "lat": 34.56,
                  "s": 110000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "japan_tezz",
          "faction": "japan",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "日軍磯谷師團",
          "name_en": "Japanese Isogai Division",
          "track": [
              {
                  "d": 1,
                  "lng": 117.9,
                  "lat": 34.5,
                  "s": 30000,
                  "st": "attack"
              },
              {
                  "d": 55,
                  "lng": 117.73,
                  "lat": 34.56,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "kmt",
          "from": [
              117.5,
              34.7
          ],
          "to": [
              117.73,
              34.56
          ],
          "label": "合圍殲敵",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 35,
          "b": 85,
          "lng": 117.73,
          "lat": 34.56,
          "kind": "firefight",
          "i": 1.1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.15,
          "fog": 0.1,
          "rain": 0.1,
          "smoke": 0.2,
          "zh": "台兒莊戰役",
          "en": "BATTLE OF TAI'ERZHUANG"
      }
  ];
  const notes =   {
      "summary": "台兒莊戰役 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "李宗仁回憶與第五戰區戰鬥詳報的整理、中國第二歷史檔案館台兒莊戰役檔、日本第二軍相關作戰記載。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "臺兒莊戰役：李宗仁指揮第五戰區，以湯恩伯、孫連仲等部與日軍磯谷師團鏖戰；利用巷戰與臺兒莊城寨堅守，後合圍反擊，殲敵萬餘。",
      "leaders": "台兒莊戰役由第五戰區司令李宗仁統籌，孫連仲、湯恩伯等部協同，以巷戰與包圍戰圍殲日軍磯谷師團主力。日軍輕敵深入，補給線遭切斷，在城內陷入持久消耗。國軍取得抗戰以來首次重大勝利，振奮民心，迫使日軍暫緩南進，徐州會戰隨後打響。",
      "nationalPower": "日軍沿津浦路南進，孤軍深入；國軍以空間换時間，各派系協同，民眾支援。",
      "impact": "抗戰初期國軍在正面戰場取得的最大規模勝利。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 117.73,
              "lat": 34.56,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1938年3月",
          "title_zh": "津浦路南進",
          "title_en": "Japanese Drive South",
          "narration_zh": "日軍磯谷師團沿津浦路南進，企圖打通南北戰線。",
          "narration_en": "Japanese forces advance south on the Tianjin–Pukou railway.",
          "focus": [
              "japan_tezz"
          ],
          "side": "japan",
          "commanders": [
              {
                  "zh": "磯谷廉介",
                  "en": "Isogai Rensuke"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 117.75,
              "lat": 34.58,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1938年3月",
          "title_zh": "臺兒莊防御",
          "title_en": "Defence of Taierzhuang",
          "narration_zh": "孫連仲第二集團軍固守臺兒莊，與日軍逐屋巷戰。",
          "narration_en": "Sun Lianzhong's army holds Taierzhuang in brutal street fighting.",
          "focus": [
              "kmt_tezz"
          ],
          "side": "kmt",
          "commanders": [
              {
                  "zh": "李宗仁",
                  "en": "Li Zongren"
              },
              {
                  "zh": "孫連仲",
                  "en": "Sun Lianzhong"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 117.73,
              "lat": 34.55,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1938年3月下旬",
          "title_zh": "湯恩伯反擊",
          "title_en": "Tang Enbo Counter-attacks",
          "narration_zh": "湯恩伯軍團自側翼出擊，日軍陷入前後夾擊。",
          "narration_en": "Tang Enbo strikes the Japanese flank — the enemy is caught in a pincer.",
          "focus": [
              "kmt_tezz",
              "japan_tezz"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "湯恩伯",
                  "en": "Tang Enbo"
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
              "lng": 117.73,
              "lat": 34.56,
              "dist": 560,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1938年4月",
          "title_zh": "臺兒莊大捷",
          "title_en": "Taierzhuang Victory",
          "narration_zh": "國軍合圍殲敵萬餘，繳獲大批裝備，日軍潰退。",
          "narration_en": "Nationalist forces encircle and kill 10,000+ — the Japanese retreat.",
          "focus": [
              "kmt_tezz"
          ],
          "side": "kmt",
          "commanders": [],
          "assets": [],
          "forces_zh": "殲敵萬餘",
          "forces_en": "10,000+ enemy killed"
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 117.73,
              "lat": 34.56,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1938年",
          "title_zh": "正面戰场大勝",
          "title_en": "Major Frontal Victory",
          "narration_zh": "臺兒莊為抗戰初期正面戰场最大規模勝利，極大振奮人心。",
          "narration_en": "Taierzhuang is the largest Nationalist victory on the main front in early war.",
          "focus": [],
          "side": "kmt",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "台兒莊戰役",
      "title_en": "BATTLE OF TAI'ERZHUANG",
      "narration_zh": "1938年4月，攻入台兒莊的日軍一部向北撤退。",
      "narration_en": "In April 1938 the Japanese force inside Taierzhuang withdrew north.",
      "cam": {
          "lng": 117.73,
          "lat": 34.56,
          "dist": 708,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看1938年3月至4月台兒莊附近的攻防。",
      "senior": "高中：用城寨巷戰和側翼合圍解釋日軍為什麼退，不先用「最大勝利」作收束。",
      "fact": "1938年3月，日軍磯谷廉介師團沿津浦路南下，攻入台兒莊。第五戰區司令李宗仁調孫連仲部守城，湯恩伯部從側翼出擊。城內巷戰後，日軍在4月上旬向北撤退，國軍繳獲一批裝備。",
      "sources": "李宗仁回憶與第五戰區戰鬥詳報的整理、中國第二歷史檔案館台兒莊戰役檔、日本第二軍相關作戰記載。不以網絡百科為唯一依據。",
      "evaluation": "日軍一路深入、城寨沒有迅速打下，側翼又被湯恩伯部打擊，所以這一股兵力退走。它常被稱為抗戰初期正面戰場一次大規模勝利，那是比較後的評價，不是戰鬥動作本身。",
      "judgment": {
          "ask": "哪一則說法更能解釋台兒莊日軍為什麼退？",
          "a": "因為事先宣布這是最大勝利，所以日軍自動撤走。",
          "b": "守軍把日軍拖在城寨巷戰裡，側翼部隊再行合擊，日軍這一股兵力退走。",
          "better": "b",
          "why": "退卻發生在城內消耗和側翼合圍之後。勝負要由部署和戰鬥來說明。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
