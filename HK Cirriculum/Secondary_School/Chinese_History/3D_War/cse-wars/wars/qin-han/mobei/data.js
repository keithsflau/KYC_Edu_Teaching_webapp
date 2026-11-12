/* BATTLE OF MOBEI · 漠北之戰 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "cse-mobei",
      "title_zh": "漠北之戰",
      "title_en": "BATTLE OF MOBEI",
      "subtitle": "前119年",
      "factionOrder": [
          "han",
          "xiongnu"
      ],
      "geo": {
          "minLng": 107.5,
          "maxLng": 112.5,
          "minLat": 41,
          "maxLat": 45,
          "Z": 8
      },
      "startDate": [
          119,
          1,
          1
      ],
      "introCam": {
          "lng": 110,
          "lat": 43,
          "dist": 780,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "漠北之戰",
          "en": "BATTLE OF MOBEI · 前119年",
          "narr_zh": "漢武帝遣衛青、霍去病深入漠北，決戰匈奴主力。",
          "narr_en": "Emperor Wu sends Wei Qing and Huo Qubing deep into the northern steppe."
      },
      "outroCam": {
          "lng": 110,
          "lat": 43,
          "dist": 936,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "terrainMode": "steppe",
      "reliefScale": 0.4,
      "nextBattle": {
          "href": "../../weijin/guandu/",
          "title_zh": "官渡之戰",
          "title_en": "GUANDU 200"
      }
  };
  const factions = {
    "han": {
      main: 0xb71c1c, glow: 0xff5252, dim: 0x7a1a1a,
      css: "#b71c1c", label_zh: "漢軍", label_en: "Han Army",
      emblem: "circle", maxStrength: 120000, textLight: "#ffd9d2"
    },
    "xiongnu": {
      main: 0x1565c0, glow: 0x42a5f5, dim: 0x0d3d7a,
      css: "#1565c0", label_zh: "匈奴", label_en: "Xiongnu",
      emblem: "shield", maxStrength: 120000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_zh": "漠北",
              "name_en": "Mobei Steppe",
              "type": "region",
              "lng": 110,
              "lat": 43
          },
          {
              "name_zh": "狼居胥山",
              "name_en": "Langjuxu",
              "type": "peak",
              "lng": 112.5,
              "lat": 44.2,
              "h": 1
          },
          {
              "name_zh": "單于庭",
              "name_en": "Xiongnu Court",
              "type": "town",
              "lng": 108,
              "lat": 42.5
          }
      ],
      "lines": [],
      "water": []
  };
  const units =   [
      {
          "id": "han_mobei",
          "faction": "han",
          "kind": "infantry",
          "crest": "wings",
          "cf": true,
          "name_zh": "漢軍騎兵",
          "name_en": "Han Cavalry",
          "track": [
              {
                  "d": 1,
                  "lng": 108,
                  "lat": 41,
                  "s": 70000,
                  "st": "march"
              },
              {
                  "d": 50,
                  "lng": 110,
                  "lat": 43,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 112.5,
                  "lat": 44.2,
                  "s": 75000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "xiongnu_mobei",
          "faction": "xiongnu",
          "kind": "infantry",
          "crest": "bear",
          "cf": true,
          "name_zh": "匈奴主力",
          "name_en": "Xiongnu Main Force",
          "track": [
              {
                  "d": 1,
                  "lng": 111,
                  "lat": 44,
                  "s": 80000,
                  "st": "hold"
              },
              {
                  "d": 60,
                  "lng": 110,
                  "lat": 43,
                  "s": 40000,
                  "st": "retreat"
              },
              {
                  "d": 100,
                  "lng": 108,
                  "lat": 42,
                  "s": 15000,
                  "st": "dead"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 40,
          "f": "han",
          "from": [
              108,
              41
          ],
          "to": [
              110,
              43
          ],
          "label": "霍去病遠征",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 35,
          "b": 85,
          "lng": 110,
          "lat": 43,
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
          "zh": "漠北之戰",
          "en": "BATTLE OF MOBEI"
      }
  ];
  const notes =   {
      "summary": "漠北之戰 — DSE 中史互動戰役地圖（教學示意）。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形，非歷史時期地貌。",
          "河川、海域水面為教學示意，按史實位置裁切顯示。"
      ],
      "sources": "《史記·衛將軍驃騎列傳》《史記·匈奴列傳》《漢書·武帝紀》《漢書·匈奴傳》《資治通鑑》卷二十至二十一。西域都護的設置年代見《漢書·西域傳》。不以網絡百科為唯一依據。"
  };
  const analysis =   {
      "military": "漢武帝遣衛青、霍去病率騎兵遠征漠北，分路出擊匈奴王庭；霍去病封狼居胥，大破左賢王，匈奴遠徙漠北。",
      "leaders": "漢武帝改變和親，以國力支持對匈奴用兵。前119年，衛青出定襄擊單于，霍去病出代郡擊左賢王，至狼居胥山。河西走廊在前121年已經開通，西域都護府設於前60年，不能寫成漠北這一戰的直接結果。",
      "nationalPower": "漢朝經文景積蓄，馬政與財政支撐大規模遠征；匈奴內部分裂，單于勢力削弱。",
      "impact": "前119年衛青、霍去病擊破匈奴主力，單于部遠徙。河西走廊與西域都護不是此戰的直接結果。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": 110,
              "lat": 43,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前119年",
          "title_zh": "漢軍出塞",
          "title_en": "Han Armies Cross the Desert",
          "narration_zh": "衛青、霍去病各率五萬騎出擊，直搗漠北匈奴腹地。",
          "narration_en": "Wei Qing and Huo Qubing each lead 50,000 cavalry deep into the northern steppe.",
          "focus": [
              "han_mobei"
          ],
          "side": "han",
          "commanders": [
              {
                  "zh": "衛青",
                  "en": "Wei Qing"
              },
              {
                  "zh": "霍去病",
                  "en": "Huo Qubing"
              }
          ],
          "assets": [],
          "forces_zh": "漢騎兵約十萬",
          "forces_en": "~100,000 Han cavalry"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 109.5,
              "lat": 43.5,
              "dist": 680,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前119年",
          "title_zh": "漠北決戰",
          "title_en": "Battle in the Gobi",
          "narration_zh": "漢軍與匈奴主力在漠北遭遇，以快騎衝鋒與迂回包抄破敵。",
          "narration_en": "Han and Xiongnu clash in the Gobi — swift cavalry charges decide the day.",
          "focus": [
              "han_mobei",
              "xiongnu_mobei"
          ],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 110.5,
              "lat": 44.2,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前119年",
          "title_zh": "封狼居胥",
          "title_en": "Fenglang Juxu",
          "narration_zh": "霍去病追擊至狼居胥山，祭天告成，匈奴遠遁。",
          "narration_en": "Huo Qubing reaches Langjuxu Mountain, performs the rite of victory — the Xiongnu flee far north.",
          "focus": [
              "han_mobei"
          ],
          "side": "han",
          "commanders": [
              {
                  "zh": "霍去病",
                  "en": "Huo Qubing"
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
              "lng": 109.8,
              "lat": 43.2,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前119年",
          "title_zh": "單于北徙",
          "title_en": "Chanyu Retreats North",
          "narration_zh": "匈奴單于率部遠徙，漠南無王庭，邊患大減。",
          "narration_en": "The Chanyu withdraws far north — the southern steppe is cleared of the royal court.",
          "focus": [
              "xiongnu_mobei"
          ],
          "side": "xiongnu",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 90,
          "hold": 8,
          "cam": {
              "lng": 110,
              "lat": 43,
              "dist": 720,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "前119年後",
          "title_zh": "絲路暢通",
          "title_en": "Silk Road Secured",
          "narration_zh": "前119年這一戰之後，匈奴王庭遠徙，漠南的軍事壓力減輕。河西走廊是前121年霍去病河西之戰打下的，西域都護要到前60年才設置，都不是前119年此戰的直接結果。",
          "narration_en": "Victory secures the Hexi Corridor — Silk Road trade and frontier settlement expand.",
          "focus": [],
          "side": "han",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "漠北之戰",
      "title_en": "BATTLE OF MOBEI",
      "narration_zh": "前119年漠北戰後，匈奴單于部遠徙。河西與西域都護不是此戰的直接結果。",
      "narration_en": "After 119 BCE the Chanyu withdrew. Hexi and the Western Regions Protectorate were not direct results of this battle.",
      "cam": {
          "lng": 110,
          "lat": 43,
          "dist": 936,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  const lesson =   {
      "junior": "初中：看前119年衛青、霍去病分路出塞的經過。",
      "senior": "高中：把此戰和前121年河西、前60年西域都護的年代分開。",
      "fact": "前119年，漢武帝派衛青出定襄擊單于，霍去病出代郡擊左賢王，兩路深入漠北。霍去病至狼居胥山。匈奴單于部遠徙，漠南的王庭壓力減輕。河西走廊是前121年霍去病河西之戰的結果。西域都護設於前60年。兩件事都不是前119年這一戰的直接結果。",
      "sources": "《史記·衛將軍驃騎列傳》《史記·匈奴列傳》《漢書·武帝紀》《漢書·匈奴傳》《資治通鑑》卷二十至二十一。西域都護的設置年代見《漢書·西域傳》。不以網絡百科為唯一依據。",
      "evaluation": "此戰能打，是因為文景以後馬政和財政撐得住遠征，而匈奴單于與左賢王被分路擊破。若把河西開通或西域都護算進前119年的直接戰果，年代就錯了，也解釋不了這一仗本身的勝負。",
      "judgment": {
          "ask": "哪一則說法更能解釋漠北之戰的結果？",
          "a": "前119年這一仗直接打下河西走廊，並設立西域都護，所以絲路從此暢通。",
          "b": "衛青、霍去病分路擊破單于和左賢王，匈奴王庭遠徙；河西在前121年，西域都護在前60年。",
          "better": "b",
          "why": "勝負發生在漠北戰場。河西之戰和西域都護的年代都更晚或更早，不能寫成前119年此戰的直接結果。"
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, lesson, END_DAY };
})();
