/* VERDUN · 凡爾登戰役 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww1-verdun",
      "title_zh": "凡爾登戰役",
      "title_en": "VERDUN",
      "subtitle": "1916年",
      "factionOrder": [
          "cp",
          "ap"
      ],
      "geo": {
          "minLng": 4.58,
          "maxLng": 6.18,
          "minLat": 48.56,
          "maxLat": 49.76,
          "Z": 11
      },
      "startDate": [
          1916,
          2,
          21
      ],
      "introCam": {
          "lng": 5.38,
          "lat": 49.16,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "凡爾登戰役",
          "en": "VERDUN · 1916年",
          "narr_zh": "德軍猛攻凡爾登要塞，雙方傷亡逾七十萬。",
          "narr_en": "Germany assaults Verdun — over 700,000 casualties in months of attrition."
      },
      "outroCam": {
          "lng": 5.38,
          "lat": 49.16,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../somme/",
          "title_zh": "索姆河戰役",
          "title_en": "SOMME 1916"
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
              "name_en": "Verdun",
              "name_zh": "凡爾登",
              "type": "fort",
              "lng": 5.38,
              "lat": 49.16
          },
          {
              "name_en": "Douaumont",
              "name_zh": "杜奧蒙堡",
              "type": "fort",
              "lng": 5.44,
              "lat": 49.19
          },
          {
              "name_en": "Fleury",
              "name_zh": "弗勒里",
              "type": "town",
              "lng": 5.42,
              "lat": 49.12
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "cp_verdun",
          "faction": "cp",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "德軍第五集團軍",
          "name_en": "German 5th Army",
          "track": [
              {
                  "d": 1,
                  "lng": 5.5,
                  "lat": 49.2,
                  "s": 90000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": 5.42,
                  "lat": 49.14,
                  "s": 60000,
                  "st": "hold"
              }
          ]
      },
      {
          "id": "ap_verdun",
          "faction": "ap",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "法軍第二集團軍",
          "name_en": "French 2nd Army",
          "track": [
              {
                  "d": 1,
                  "lng": 5.35,
                  "lat": 49.16,
                  "s": 70000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": 5.38,
                  "lat": 49.16,
                  "s": 85000,
                  "st": "hold"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 20,
          "f": "cp",
          "from": [
              5.5,
              49.2
          ],
          "to": [
              5.38,
              49.16
          ],
          "label": "猛攻凡爾登",
          "kind": "attack"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 10,
          "b": 100,
          "lng": 5.38,
          "lat": 49.16,
          "kind": "artillery",
          "i": 1
      }
  ];
  const weather =   [
      {
          "d": 1,
          "night": 0.2,
          "fog": 0.3,
          "rain": 0.2,
          "smoke": 0.7,
          "zh": "凡爾登 · 塹壕",
          "en": "Verdun trenches"
      }
  ];
  const notes =   {
      "summary": "凡爾登戰役 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "德軍意圖「流血耗盡」法軍；法軍在貝當指揮下死守，「他們將不會通過」成為象徵。",
      "leaders": "德軍總參謀長法金漢策劃「流血耗盡」戰略。法軍貝當以「他們將不會通過」穩住士氣並改善補給；後繼指揮尼韋爾發動反攻。德軍皇儲威廉與將領消耗法軍意圖失敗，雙方將領皆背上沉重傷亡代價。",
      "nationalPower": "凡爾登是法國象徵要塞；德法雙方投入大量火炮與人力，成為消耗戰典型。",
      "impact": "傷亡逾七十萬，展示一戰殘酷；法德民族記憶深刻，影響戰後和解困難。"
  };
  const storyboard =   [
      {
          "day": 5,
          "hold": 8,
          "cam": {
              "lng": 5.5,
              "lat": 49.2,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年2月21日",
          "title_zh": "德軍猛攻開始",
          "title_en": "German Assault Opens",
          "narration_zh": "德軍第五集團軍以猛烈炮擊轟炸凡爾登防線。",
          "narration_en": "German 5th Army opens with a massive artillery barrage on Verdun.",
          "focus": [
              "cp_verdun"
          ],
          "side": "cp",
          "commanders": [
              {
                  "zh": "法金漢",
                  "en": "von Falkenhayn"
              }
          ],
          "assets": [
              "artillery"
          ],
          "forces_zh": "德軍 90 萬",
          "forces_en": "900,000 German"
      },
      {
          "day": 25,
          "hold": 8,
          "cam": {
              "lng": 5.44,
              "lat": 49.19,
              "dist": 550,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年2–3月",
          "title_zh": "杜奧蒙堡陷落",
          "title_en": "Fort Douaumont Falls",
          "narration_zh": "德軍攻占杜奧蒙堡等關鍵據點。",
          "narration_en": "Germans capture Fort Douaumont and key positions.",
          "focus": [
              "cp_verdun"
          ],
          "side": "cp",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 45,
          "hold": 8,
          "cam": {
              "lng": 5.38,
              "lat": 49.16,
              "dist": 520,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年4月",
          "title_zh": "貝當接任",
          "title_en": "Pétain Takes Command",
          "narration_zh": "貝當組織道路補給，號召「他們將不會通過」。",
          "narration_en": "Pétain organises supply routes: \"They shall not pass.\"",
          "focus": [
              "ap_verdun"
          ],
          "side": "ap",
          "commanders": [
              {
                  "zh": "貝當",
                  "en": "Pétain"
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
              "lng": 5.42,
              "lat": 49.12,
              "dist": 540,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年夏",
          "title_zh": "弗勒里爭奪",
          "title_en": "Fight for Fleury",
          "narration_zh": "雙方在弗勒里等地反覆拉鋸，村莊數度易手。",
          "narration_en": "Fierce back-and-forth at Fleury — villages change hands repeatedly.",
          "focus": [
              "cp_verdun",
              "ap_verdun"
          ],
          "side": "both",
          "commanders": [],
          "assets": [
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": 5.38,
              "lat": 49.16,
              "dist": 580,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1916年12月",
          "title_zh": "攻勢停止",
          "title_en": "Offensive Halted",
          "narration_zh": "德軍攻勢陷入停滯，雙方傷亡慘重。",
          "narration_en": "The German offensive stalls with catastrophic casualties.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [],
          "forces_zh": "總傷亡逾 70 萬",
          "forces_en": "700,000+ casualties"
      }
  ];
  const outro =   {
      "title_zh": "凡爾登戰役",
      "title_en": "VERDUN",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": 5.38,
          "lat": 49.16,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
