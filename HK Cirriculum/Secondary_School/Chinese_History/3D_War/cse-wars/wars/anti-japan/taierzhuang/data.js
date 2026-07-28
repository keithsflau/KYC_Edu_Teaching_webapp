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
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "台儿庄战役：李宗仁指挥第五战区，以汤恩伯、孙连仲等部与日军矶谷师团鏖战；利用巷战与台儿庄城寨坚守，后合围反击，歼敌万余。",
      "leaders": "台兒莊戰役由第五戰區司令李宗仁統籌，孫連仲、湯恩伯等部協同，以巷戰與包圍戰圍殲日軍磯谷師團主力。日軍輕敵深入，補給線遭切斷，在城內陷入持久消耗。國軍取得抗戰以來首次重大勝利，振奮民心，迫使日軍暫緩南進，徐州會戰隨後打響。",
      "nationalPower": "日军沿津浦路南进，孤军深入；国军以空间换时间，各派系协同，民众支援。",
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
          "title_zh": "津浦路南进",
          "title_en": "Japanese Drive South",
          "narration_zh": "日军矶谷师团沿津浦路南进，企图打通南北战线。",
          "narration_en": "Japanese forces advance south on the Tianjin–Pukou railway.",
          "focus": [
              "japan_tezz"
          ],
          "side": "japan",
          "commanders": [
              {
                  "zh": "矶谷廉介",
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
          "title_zh": "台儿庄防御",
          "title_en": "Defence of Taierzhuang",
          "narration_zh": "孙连仲第二集团军固守台儿庄，与日军逐屋巷战。",
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
                  "zh": "孙连仲",
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
          "title_zh": "汤恩伯反击",
          "title_en": "Tang Enbo Counter-attacks",
          "narration_zh": "汤恩伯军团自侧翼出击，日军陷入前后夹击。",
          "narration_en": "Tang Enbo strikes the Japanese flank — the enemy is caught in a pincer.",
          "focus": [
              "kmt_tezz",
              "japan_tezz"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "汤恩伯",
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
          "title_zh": "台儿庄大捷",
          "title_en": "Taierzhuang Victory",
          "narration_zh": "国军合围歼敌万余，缴获大批装备，日军溃退。",
          "narration_en": "Nationalist forces encircle and kill 10,000+ — the Japanese retreat.",
          "focus": [
              "kmt_tezz"
          ],
          "side": "kmt",
          "commanders": [],
          "assets": [],
          "forces_zh": "歼敌万余",
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
          "title_zh": "正面战场大胜",
          "title_en": "Major Frontal Victory",
          "narration_zh": "台儿庄为抗战初期正面战场最大规模胜利，极大振奋人心。",
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
      "narration_zh": "本戰役為 DSE 中史重要考點：抗戰初期國軍在正面戰場取得的最大規模勝利",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 117.73,
          "lat": 34.56,
          "dist": 708,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
