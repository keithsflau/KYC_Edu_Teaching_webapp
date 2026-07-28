/* AN LUSHAN REBELLION · 安史之亂 */
window.BATTLE_DATA = (function () {
  const END_DAY = 120;
  const meta =   {
      "id": "cse-anshi",
      "title_zh": "安史之亂",
      "title_en": "AN LUSHAN REBELLION",
      "subtitle": "755–763年",
      "factionOrder": [
          "tang",
          "rebel"
      ],
      "geo": {
          "minLng": 106.94,
          "maxLng": 110.94,
          "minLat": 32.66,
          "maxLat": 35.86,
          "Z": 9
      },
      "startDate": [
          755,
          12,
          16
      ],
      "introCam": {
          "lng": 108.94,
          "lat": 34.26,
          "dist": 720,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "安史之亂",
          "en": "AN LUSHAN REBELLION · 755–763年",
          "narr_zh": "安祿山自范陽起兵，攻陷洛陽、長安，唐室西逃。",
          "narr_en": "An Lushan rebels from Fanyang and captures Luoyang and Chang'an."
      },
      "outroCam": {
          "lng": 108.94,
          "lat": 34.26,
          "dist": 864,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "floodRelief": 0.1,
      "reliefScale": 0.75,
      "nextBattle": {
          "href": "../../song-yuan/yamen/",
          "title_zh": "崖山海戰",
          "title_en": "YAMEN 1279"
      }
  };
  const factions = {
    "tang": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "唐軍", label_en: "Tang Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "rebel": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "安史叛軍", label_en: "An–Shi Rebels",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "長安",
              "name_en": "Chang'an",
              "type": "city",
              "lng": 108.94,
              "lat": 34.26
          },
          {
              "name_zh": "潼關",
              "name_en": "Tong Pass",
              "type": "fort",
              "lng": 110.24,
              "lat": 34.54
          },
          {
              "name_zh": "洛陽",
              "name_en": "Luoyang",
              "type": "city",
              "lng": 112.45,
              "lat": 34.62
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "rebel_anshi",
          "faction": "rebel",
          "kind": "infantry",
          "crest": "bear",
          "cf": true,
          "name_zh": "安史叛軍",
          "name_en": "Rebel Army",
          "track": [
              {
                  "d": 1,
                  "lng": 116.4,
                  "lat": 39.9,
                  "s": 150000,
                  "st": "attack"
              },
              {
                  "d": 40,
                  "lng": 112.45,
                  "lat": 34.62,
                  "s": 120000,
                  "st": "attack"
              },
              {
                  "d": 80,
                  "lng": 108.94,
                  "lat": 34.26,
                  "s": 100000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "tang_anshi",
          "faction": "tang",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "唐軍",
          "name_en": "Tang Army",
          "track": [
              {
                  "d": 1,
                  "lng": 108.94,
                  "lat": 34.26,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 50,
                  "lng": 107.5,
                  "lat": 33.8,
                  "s": 60000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 108.94,
                  "lat": 34.26,
                  "s": 90000,
                  "st": "attack"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 15,
          "f": "rebel",
          "from": [
              116.4,
              39.9
          ],
          "to": [
              112.45,
              34.62
          ],
          "label": "安祿山南下",
          "kind": "attack"
      },
      {
          "d": 85,
          "f": "tang",
          "from": [
              107.5,
              33.8
          ],
          "to": [
              108.94,
              34.26
          ],
          "label": "收復兩京",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 20,
          "b": 95,
          "lng": 108.94,
          "lat": 34.26,
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
          "zh": "安史之亂",
          "en": "AN LUSHAN REBELLION"
      }
  ];
  const notes =   {
      "summary": "安史之亂 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "安祿山、史思明以范陽、平盧、河東三鎮兵力起兵，攻陷洛陽、長安；唐軍與回紇聯兵反攻，歷時七年方平叛，但藩鎮勢力坐大。",
      "leaders": "安祿山以范陽節度使身分起兵，利用玄宗晚年怠政、楊貴妃外戚干政之機，迅速攻占洛陽、長安。唐玄宗倉皇幸蜀，唐軍前期節節敗退。郭子儀、李光弼等將領率朔方軍收復兩京，以持久戰略拖垮叛軍；雖最終平定叛亂，但藩鎮割據、宦官專權加劇，盛唐國力由盛轉衰。",
      "nationalPower": "開元盛世後唐朝府兵制瓦解，邊將握重兵；安史之亂耗盡國力，中央對藩鎮控制力大減。",
      "impact": "唐朝由盛轉衰的絕對轉捩點，直接引發後期的藩鎮割據。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 108.94,
              "lat": 34.26,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "755年",
          "title_zh": "安祿山起兵",
          "title_en": "An Lushan Rebellion Begins",
          "narration_zh": "安祿山以討楊貴妃之兄楊國忠為名，率三鎮十五萬兵反唐。",
          "narration_en": "An Lushan rebels with 150,000 troops from three frontier commands.",
          "focus": [
              "rebel_anshi"
          ],
          "side": "rebel",
          "commanders": [
              {
                  "zh": "安祿山",
                  "en": "An Lushan"
              }
          ],
          "assets": [],
          "forces_zh": "叛軍約十五萬",
          "forces_en": "~150,000 rebels"
      },
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": 112.45,
              "lat": 34.62,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "756年",
          "title_zh": "攻陷洛陽",
          "title_en": "Luoyang Falls",
          "narration_zh": "叛軍攻占東都洛陽，安祿山稱大燕皇帝。",
          "narration_en": "Rebels capture Luoyang — An Lushan declares himself emperor of Yan.",
          "focus": [
              "rebel_anshi"
          ],
          "side": "rebel",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 38,
          "hold": 8,
          "cam": {
              "lng": 108.94,
              "lat": 34.26,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "756年",
          "title_zh": "馬嵬驛變",
          "title_en": "Mawei Incident",
          "narration_zh": "唐玄宗西逃，禁軍譁變，楊國忠、楊貴妃被殺，玄宗入蜀。",
          "narration_en": "Emperor Xuanzong flees west — troops mutiny, Yang Guozhong and Consort Yang die.",
          "focus": [
              "tang_anshi"
          ],
          "side": "tang",
          "commanders": [
              {
                  "zh": "唐玄宗",
                  "en": "Emperor Xuanzong"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 55,
          "hold": 8,
          "cam": {
              "lng": 108.94,
              "lat": 34.26,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "756年",
          "title_zh": "長安陷落",
          "title_en": "Chang'an Lost",
          "narration_zh": "叛軍占領長安，太子李亨即位于靈武，號肅宗，組織平叛。",
          "narration_en": "Rebels take Chang'an — Crown Prince Li Heng becomes Emperor Suzong at Lingwu.",
          "focus": [
              "rebel_anshi",
              "tang_anshi"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "唐肅宗",
                  "en": "Emperor Suzong"
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
              "lng": 109.5,
              "lat": 34.3,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "757–763年",
          "title_zh": "回紇助唐平叛",
          "title_en": "Uighur Aid and Counter-offensive",
          "narration_zh": "郭子儀、李光弼等率唐軍與回紇聯兵，收復兩京，史思明繼叛後亦被誅。",
          "narration_en": "Guo Ziyi and Li Guangbi, with Uighur allies, recapture the capitals.",
          "focus": [
              "tang_anshi"
          ],
          "side": "tang",
          "commanders": [
              {
                  "zh": "郭子儀",
                  "en": "Guo Ziyi"
              },
              {
                  "zh": "李光弼",
                  "en": "Li Guangbi"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 105,
          "hold": 8,
          "cam": {
              "lng": 108.94,
              "lat": 34.26,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "763年",
          "title_zh": "藩鎮坐大",
          "title_en": "Warlord Era Begins",
          "narration_zh": "叛亂雖平，但河朔三鎮及各地節度使擁兵自重，唐朝由盛轉衰。",
          "narration_en": "Rebellion ends but regional warlords hold real power — Tang decline accelerates.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "戰亂歷時七年",
          "forces_en": "Seven years of civil war"
      }
  ];
  const outro =   {
      "title_zh": "安史之亂",
      "title_en": "AN LUSHAN REBELLION",
      "narration_zh": "本戰役為 DSE 中史重要考點：唐朝由盛轉衰的絕對轉捩點，直接引發後期的藩鎮割據",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 108.94,
          "lat": 34.26,
          "dist": 864,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
