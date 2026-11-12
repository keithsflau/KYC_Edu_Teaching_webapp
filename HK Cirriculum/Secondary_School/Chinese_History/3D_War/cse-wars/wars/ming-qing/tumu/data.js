/* TUMU CRISIS · 土木堡之變 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-tumu",
      "title_zh": "土木堡之變",
      "title_en": "TUMU CRISIS",
      "subtitle": "1449年",
      "factionOrder": [
          "ming",
          "oirat"
      ],
      "geo": {
          "minLng": 114.15,
          "maxLng": 116.35,
          "minLat": 39.55,
          "maxLat": 41.35,
          "Z": 10
      },
      "startDate": [
          1449,
          8,
          1
      ],
      "introCam": {
          "lng": 115.25,
          "lat": 40.45,
          "dist": 620,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "土木堡之變",
          "en": "TUMU CRISIS · 1449年",
          "narr_zh": "明英宗御駕親征，在土木堡遭瓦剌大軍圍困。",
          "narr_en": "The Zhengtong Emperor is captured when Oirat forces trap the Ming army."
      },
      "outroCam": {
          "lng": 115.25,
          "lat": 40.45,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "plain",
      "reliefScale": 0.7,
      "nextBattle": {
          "href": "../sarhu/",
          "title_zh": "薩爾滸之戰",
          "title_en": "SARHU 1619"
      }
  };
  const factions = {
    "ming": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "明軍", label_en: "Ming Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "oirat": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "瓦剌", label_en: "Oirat Mongols",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "土木堡",
              "name_en": "Tumu Fort",
              "type": "fort",
              "lng": 115.25,
              "lat": 40.45
          },
          {
              "name_zh": "懷來",
              "name_en": "Huailai",
              "type": "town",
              "lng": 115.52,
              "lat": 40.41
          },
          {
              "name_zh": "宣府",
              "name_en": "Xuanfu",
              "type": "city",
              "lng": 115.03,
              "lat": 40.61
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "ming_tumu",
          "faction": "ming",
          "kind": "command",
          "crest": "eagle",
          "cf": true,
          "name_zh": "明英宗親征軍",
          "name_en": "Imperial Ming Force",
          "track": [
              {
                  "d": 1,
                  "lng": 115.03,
                  "lat": 40.61,
                  "s": 50000,
                  "st": "march"
              },
              {
                  "d": 40,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 45000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 5000,
                  "st": "dead"
              }
          ]
      },
      {
          "id": "oirat_tumu",
          "faction": "oirat",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "也先瓦剌軍",
          "name_en": "Esen's Oirat Army",
          "track": [
              {
                  "d": 1,
                  "lng": 115.6,
                  "lat": 40.7,
                  "s": 40000,
                  "st": "march"
              },
              {
                  "d": 45,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 60000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 115.25,
                  "lat": 40.45,
                  "s": 55000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 35,
          "f": "oirat",
          "from": [
              115.6,
              40.7
          ],
          "to": [
              115.25,
              40.45
          ],
          "label": "瓦剌合圍",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 30,
          "b": 80,
          "lng": 115.25,
          "lat": 40.45,
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
          "zh": "土木堡之變",
          "en": "TUMU CRISIS"
      }
  ];
  const notes =   {
      "summary": "土木堡之變 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "《明史·英宗前紀》《明史·王振傳》《明史·于謙傳》《明史紀事本末·土木之變》。公曆換算採通行的1449年9月1日。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "明英宗在宦官王振慫恿下親征瓦剌。明人記載人數為五十萬，這是記載，不是現代清點。決戰通說在公曆1449年9月1日，也先在土木堡擊潰明軍，英宗被俘。",
      "leaders": "明英宗在王振慫恿下親征。決戰通說是公曆1449年9月1日，英宗在土木堡被俘。記載作五十萬，不是現代清點。于謙等擁立景泰帝，守住北京。",
      "nationalPower": "瓦剌也先已統一蒙古諸部，騎兵機動快。明朝軍政受王振左右。出兵人數的五十萬是記載。",
      "impact": "明英宗親征被瓦剌俘虜，明朝國勢由盛轉衰，轉取守勢。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 115.25,
              "lat": 40.45,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年",
          "title_zh": "英宗親征",
          "title_en": "Emperor's Personal Campaign",
          "narration_zh": "明英宗在王振慫恿下親征瓦剌。明人記載作五十萬，這是記載數字，不是現代清點人數。",
          "narration_en": "Emperor Yingzong leads 500,000 troops north against the Oirats.",
          "focus": [
              "ming_tumu"
          ],
          "side": "ming",
          "commanders": [
              {
                  "zh": "明英宗",
                  "en": "Emperor Yingzong"
              },
              {
                  "zh": "王振",
                  "en": "Wang Zhen"
              }
          ],
          "assets": [],
          "forces_zh": "記載約五十萬",
          "forces_en": "recorded figure of about 500,000"
      },
      {
          "day": 22,
          "hold": 8,
          "cam": {
              "lng": 115.28,
              "lat": 40.48,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年8月",
          "title_zh": "土木堡進軍",
          "title_en": "Advance to Tumu",
          "narration_zh": "明軍倉促北進，糧草不繼，士氣低落。",
          "narration_en": "The Ming army advances hastily — supplies run short, morale falls.",
          "focus": [
              "ming_tumu"
          ],
          "side": "ming",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 42,
          "hold": 8,
          "cam": {
              "lng": 115.25,
              "lat": 40.45,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "公曆1449年9月1日",
          "title_zh": "土木堡之變",
          "title_en": "Disaster at Tumu",
          "narration_zh": "公曆1449年9月1日（夏曆正統十四年八月十五日），也先的瓦剌騎兵在土木堡擊潰明軍，英宗被俘。不是公曆9月8日。",
          "narration_en": "Esen's Oirat cavalry ambushes Tumu — the Ming routs, the emperor is captured.",
          "focus": [
              "oirat_tumu",
              "ming_tumu"
          ],
          "side": "both",
          "commanders": [
              {
                  "zh": "也先",
                  "en": "Esen"
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
              "lng": 116.4,
              "lat": 39.9,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年",
          "title_zh": "于謙保衛北京",
          "title_en": "Yu Qian Defends Beijing",
          "narration_zh": "郕王即位為景帝，于謙組織北京保衛戰，擊退也先。",
          "narration_en": "The Prince of Cheng becomes Emperor Jingtai — Yu Qian repels Esen from Beijing.",
          "focus": [
              "ming_tumu"
          ],
          "side": "ming",
          "commanders": [
              {
                  "zh": "于謙",
                  "en": "Yu Qian"
              }
          ],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 115.25,
              "lat": 40.45,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1449年後",
          "title_zh": "由攻轉守",
          "title_en": "From Offense to Defense",
          "narration_zh": "土木堡之後，明朝對蒙古改為守勢，並加強邊牆。五十萬是記載中的人數。",
          "narration_en": "After Tumu, Ming turns defensive — the Great Wall is reinforced.",
          "focus": [],
          "side": "ming",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "土木堡之變",
      "title_en": "TUMU CRISIS",
      "narration_zh": "公曆1449年9月1日，英宗在土木堡被俘。五十萬是記載中的人數。",
      "narration_en": "On 1 September 1449 the emperor was captured at Tumu. The figure of 500,000 is what the records claim.",
      "cam": {
          "lng": 115.25,
          "lat": 40.45,
          "dist": 744,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：記公曆1449年9月1日土木堡英宗被俘，五十萬是記載。",
      "senior": "高中：分清夏曆八月十五和公曆9月1日，不被誤寫成9月8日。",
      "fact": "正統十四年，明英宗在王振慫恿下親征瓦剌。明人記載出兵人數為五十萬，這是記載，不是現代清點人數。決戰通說在公曆1449年9月1日，即夏曆正統十四年八月十五日，不是公曆9月8日。也先的瓦剌騎兵在土木堡擊潰明軍，英宗被俘。其後郕王即皇帝位，于謙組織北京防守，也先未能佔領北京。",
      "sources": "《明史·英宗前紀》《明史·王振傳》《明史·于謙傳》《明史紀事本末·土木之變》。公曆換算採通行的1449年9月1日。不以網絡百科為唯一依據。",
      "evaluation": "明軍敗，是因為親征倉促、王振亂命、缺水缺糧，騎兵在堡外被衝擊。五十萬不能當成已經點算的實數。北京沒有因此失陷，是于謙等改立皇帝並守城的結果，和土木堡當日的潰敗要分開看。",
      "judgment": {
          "ask": "哪一則說法更能解釋土木堡明軍的潰敗？",
          "a": "公曆1449年9月8日，五十萬實兵在堡內被全殲，所以明朝當日滅亡。",
          "b": "決戰通說是公曆1449年9月1日。記載作五十萬。明軍缺水缺糧、指揮紊亂，英宗被俘。",
          "better": "b",
          "why": "通說日期是9月1日，不是9月8日。五十萬要註明是記載。潰敗原因在親征部署和戰場指揮，不是一個未經核對的實數。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
