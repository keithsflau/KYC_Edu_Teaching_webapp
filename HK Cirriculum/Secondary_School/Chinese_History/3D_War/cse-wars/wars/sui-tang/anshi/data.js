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
          "minLng": 108.05,
          "maxLng": 117.25,
          "minLat": 33.5,
          "maxLat": 40.7,
          "Z": 7
      },
      "startDate": [
          755,
          12,
          16
      ],
      "introCam": {
          "lng": 112.65,
          "lat": 37.1,
          "dist": 720,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "安史之亂",
          "en": "AN LUSHAN REBELLION · 755–763年",
          "narr_zh": "安祿山以討楊國忠為名，自范陽起兵，其後攻陷洛陽、長安。",
          "narr_en": "An Lushan rebels from Fanyang and captures Luoyang and Chang'an."
      },
      "outroCam": {
          "lng": 112.65,
          "lat": 37.1,
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
              "name_zh": "范陽",
              "name_en": "Fanyang",
              "type": "city",
              "lng": 116.2,
              "lat": 39.7
          },
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
      "sources": "《舊唐書·安祿山傳》《舊唐書·玄宗本紀》《資治通鑑》唐紀肅宗前後各卷、《新唐書·安祿山傳》。起兵檄文與通鑑所記旗號是討楊國忠。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "安祿山、史思明以范陽、平盧、河東三鎮兵力起兵，攻陷洛陽、長安；唐軍與回紇聯兵反攻，歷時七年方平叛，但藩鎮勢力坐大。",
      "leaders": "安祿山以討楊國忠為名，從范陽起兵，先後攻入洛陽、長安。楊貴妃死於馬嵬，是起兵之後的事，不能寫成起兵原因。郭子儀、李光弼等其後收復兩京。叛軍首領敗死後，河朔節度使仍掌兵。",
      "nationalPower": "開元盛世後唐朝府兵制瓦解，邊將握重兵；安史之亂耗盡國力，中央對藩鎮控制力大減。",
      "impact": "叛亂平定後，河朔等鎮仍由節度使掌兵，朝廷沒有收回這些兵權。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 116.2,
              "lat": 39.7,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "755年",
          "title_zh": "安祿山起兵",
          "title_en": "An Lushan Rebellion Begins",
          "narration_zh": "安祿山以討楊國忠為名，自范陽起兵南下。楊貴妃後來在馬嵬被殺，是起兵之後的事，不能寫成起兵原因。",
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
          "narration_zh": "叛軍攻佔東都洛陽，安祿山稱大燕皇帝。",
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
          "narration_zh": "叛軍佔領長安，太子李亨即位于靈武，號肅宗，組織平叛。",
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
          "narration_zh": "763年史朝義敗死，兩京在此之前已經收復。河朔等地節度使仍掌兵。",
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
      "narration_zh": "叛軍自范陽南下，先後進入洛陽、長安。763年叛軍首領敗死，兩京已先收復。",
      "narration_en": "The rebels moved from Fanyang through Luoyang to Chang'an. Their leaders were dead by 763; the capitals had already been recovered.",
      "cam": {
          "lng": 108.94,
          "lat": 34.26,
          "dist": 864,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：沿范陽、洛陽、長安看起兵和兩京失守。",
      "senior": "高中：起兵旗號是討楊國忠；把馬嵬事變和起兵原因分開。",
      "fact": "755年，安祿山以討楊國忠為名，從范陽起兵，率范陽、平盧、河東兵力南下，攻入洛陽，再入長安。唐玄宗西逃，馬嵬兵變殺死楊國忠，楊貴妃也被殺，這是起兵之後的事，不能寫成起兵原因。太子李亨在靈武即皇帝位。郭子儀、李光弼等與回紇兵力其後收復兩京。763年史朝義敗死。地圖要同時看見范陽、洛陽、長安，不能只鎖在關中卻講全國路線。",
      "sources": "《舊唐書·安祿山傳》《舊唐書·玄宗本紀》《資治通鑑》唐紀肅宗前後各卷、《新唐書·安祿山傳》。起兵檄文與通鑑所記旗號是討楊國忠。不以網絡百科為唯一依據。",
      "evaluation": "叛軍能迅速進入兩京，是因為邊鎮兵強、潼關失守和長安倉促。玄宗晚年怠政、節度使掌兵是背景。把楊貴妃外戚干政寫成起兵原因，和旗號不符，也解釋不了范陽到兩京的軍事進程。平叛之後河朔節度使仍掌兵，那是後來的政治局面。",
      "judgment": {
          "ask": "哪一則說法更能解釋安史之亂初期唐軍為什麼連失兩京？",
          "a": "因為楊貴妃外戚干政，所以安祿山起兵，戰事只發生在關中。",
          "b": "安祿山以討楊國忠為名自范陽起兵，沿洛陽打到長安，潼關失守後兩京相繼失陷。",
          "better": "b",
          "why": "起兵旗號是討楊國忠。楊貴妃死於其後的馬嵬，不是起兵原因。路線是范陽、洛陽、長安，不能只看關中。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
