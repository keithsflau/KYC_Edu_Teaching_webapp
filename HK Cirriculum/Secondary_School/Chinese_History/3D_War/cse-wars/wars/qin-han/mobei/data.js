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
      "sources": "DSE 中史課程、中國通史、維基百科（交叉查證）。"
  };
  const analysis =   {
      "military": "漢武帝遣衛青、霍去病率騎兵遠征漠北，分路出擊匈奴王庭；霍去病封狼居胥，大破左贤王，匈奴遠徙漠北。",
      "leaders": "漢武帝劉徹決心改變漢初和親政策，以國力支撐長期對匈戰爭，設置河西走廊與屯田以穩固邊防。衛青多次率軍出塞，以穩健指揮擊破匈奴主力，解除長安威脅，並提拔年輕將領霍去病。霍去病深入漠北，推行「匈奴未滅，何以家為」的速戰速決戰略，兩度大敗匈奴並封狼居胥，使漢朝取得漠北決定性勝利，奠定西域經營基礎。",
      "nationalPower": "漢朝經文景積蓄，馬政與財政支撐大規模遠征；匈奴內部分裂，單于勢力削弱。",
      "impact": "漢武帝遣衛青、霍去病擊潰匈奴，保障絲綢之路及邊疆穩定。"
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
          "narration_zh": "漠北勝利保障河西走廊，絲綢之路貿易與邊疆屯田得以發展。",
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
      "narration_zh": "本戰役為 DSE 中史重要考點：漢武帝遣衛青、霍去病擊潰匈奴，保障絲綢之路及邊疆穩定",
      "narration_en": "A key HKDSE Chinese History topic.",
      "cam": {
          "lng": 110,
          "lat": 43,
          "dist": 936,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
