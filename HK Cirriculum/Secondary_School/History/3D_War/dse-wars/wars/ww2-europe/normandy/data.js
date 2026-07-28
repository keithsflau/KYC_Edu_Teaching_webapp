/* D-DAY · 諾曼第登陸 */
window.BATTLE_DATA = (function () {
  const END_DAY = 100;
  const meta =   {
      "id": "ww2-normandy",
      "title_zh": "諾曼第登陸",
      "title_en": "D-DAY",
      "subtitle": "1944年6月6日",
      "factionOrder": [
          "axis",
          "allies"
      ],
      "geo": {
          "minLng": -2.05,
          "maxLng": 0.45,
          "minLat": 48.45,
          "maxLat": 50.25,
          "Z": 10
      },
      "startDate": [
          1944,
          6,
          6
      ],
      "introCam": {
          "lng": -0.5,
          "lat": 49.35,
          "dist": 580,
          "az": 200,
          "el": 46,
          "orbit": 0.65
      },
      "titleCard": {
          "zh": "諾曼第登陸",
          "en": "D-DAY · 1944年6月6日",
          "narr_zh": "盟軍在諾曼第五處海灘登陸。",
          "narr_en": "Allied forces land on five beaches in Normandy."
      },
      "outroCam": {
          "lng": -0.5,
          "lat": 49.35,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      },
      "nextBattle": {
          "href": "../el-alamein/",
          "title_zh": "阿拉曼戰役",
          "title_en": "EL ALAMEIN 1942"
      }
  };
  const factions = {
    "axis": {
      main: 0x4a4a4a, glow: 0x8b0000, dim: 0x2a2a2a,
      css: "#6b2020", label_zh: "軸心國", label_en: "Axis",
      emblem: "circle", maxStrength: 150000, textLight: "#e8d0d0"
    },
    "allies": {
      main: 0x1b4f72, glow: 0x3498db, dim: 0x0d3d7a,
      css: "#1b4f72", label_zh: "同盟國", label_en: "Allies",
      emblem: "shield", maxStrength: 160000, textLight: "#cfe0ff"
    },
  };
  const geography =   {
      "regions": [],
      "points": [
          {
              "name_en": "Omaha Beach",
              "name_zh": "奧馬哈海灘",
              "type": "bay",
              "lng": -0.85,
              "lat": 49.37
          },
          {
              "name_en": "Utah Beach",
              "name_zh": "猶他海灘",
              "type": "bay",
              "lng": -1.18,
              "lat": 49.42
          },
          {
              "name_en": "Caen",
              "name_zh": "卡昂",
              "type": "city",
              "lng": -0.37,
              "lat": 49.18
          }
      ],
      "lines": []
  };
  const units =   [
      {
          "id": "al_allied",
          "faction": "allies",
          "kind": "infantry",
          "crest": "anchor",
          "cf": true,
          "name_zh": "盟軍登陸部隊",
          "name_en": "Allied Landing Force",
          "track": [
              {
                  "d": 1,
                  "lng": -1.5,
                  "lat": 49.5,
                  "s": 150000,
                  "st": "landing"
              },
              {
                  "d": 50,
                  "lng": -0.85,
                  "lat": 49.37,
                  "s": 130000,
                  "st": "attack"
              },
              {
                  "d": 100,
                  "lng": -0.37,
                  "lat": 49.18,
                  "s": 120000,
                  "st": "attack"
              }
          ]
      },
      {
          "id": "ax_atlantic",
          "faction": "axis",
          "kind": "infantry",
          "crest": "eagle",
          "cf": true,
          "name_zh": "大西洋壁壘守軍",
          "name_en": "Atlantic Wall",
          "track": [
              {
                  "d": 1,
                  "lng": -0.8,
                  "lat": 49.35,
                  "s": 50000,
                  "st": "hold"
              },
              {
                  "d": 100,
                  "lng": -0.5,
                  "lat": 49.3,
                  "s": 20000,
                  "st": "retreat"
              }
          ]
      }
  ];
  const arrows =   [
      {
          "d": 1,
          "f": "allies",
          "from": [
              -1.5,
              49.5
          ],
          "to": [
              -0.85,
              49.37
          ],
          "label": "D-Day 登陸",
          "kind": "landing"
      }
  ];
  const fronts =   [];
  const hotspots =   [
      {
          "a": 1,
          "b": 50,
          "lng": -0.85,
          "lat": 49.37,
          "kind": "landing",
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
          "zh": "諾曼第登陸",
          "en": "D-DAY"
      }
  ];
  const notes =   {
      "summary": "諾曼第登陸 — DSE 西史小戰役地圖。",
      "caveats": [
          "本圖僅覆蓋該戰役核心區域；戰線與兵力為教學示意。",
          "衛星影像為現代地形。"
      ],
      "sources": "DSE 課程、Britannica、BBC History。"
  };
  const analysis =   {
      "military": "盟軍諾曼第登陸（D-Day）開闢西線第二戰場；空降、海軍炮擊與五個灘頭兩棲突擊。",
      "leaders": "盟軍最高司令艾森豪威爾決定天候窗口登陸；蒙哥馬利負責地面作戰。德軍隆美爾強化大西洋壁壘，但欺敵計策使希特勒誤判加萊方向。羅斯福、邱吉爾、史達林德黑蘭會議協調西線開闢，重塑戰後歐洲勢力分配。",
      "nationalPower": "美英工業與海空優勢；德軍防線被欺敵計策誤判，反擊遲緩。",
      "impact": "西線重開，法國解放，加速第三帝國崩潰。"
  };
  const storyboard =   [
      {
          "day": 1,
          "hold": 8,
          "cam": {
              "lng": -1.5,
              "lat": 49.4,
              "dist": 750,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1944年6月6日 凌晨",
          "title_zh": "空降先行",
          "title_en": "Airborne First",
          "narration_zh": "盟軍空降兵控制橋樑與要道，配合海軍炮擊。",
          "narration_en": "Allied paratroopers seize bridges and roads; naval bombardment begins.",
          "focus": [],
          "side": "both",
          "commanders": [],
          "assets": [
              "air",
              "navy",
              "artillery"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 20,
          "hold": 8,
          "cam": {
              "lng": -0.7,
              "lat": 49.37,
              "dist": 650,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1944年6月6日",
          "title_zh": "奧馬哈灘血戰",
          "title_en": "Bloody Omaha",
          "narration_zh": "美軍在奧馬哈灘遭遇強烈抵抗，傷亡慘重。",
          "narration_en": "US forces face fierce resistance at Omaha Beach.",
          "focus": [
              "al_allied"
          ],
          "side": "allies",
          "commanders": [
              {
                  "zh": "艾森豪威爾",
                  "en": "Eisenhower"
              }
          ],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 40,
          "hold": 8,
          "cam": {
              "lng": -0.5,
              "lat": 49.35,
              "dist": 600,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1944年6月6日",
          "title_zh": "黃金與朱諾灘",
          "title_en": "Gold & Juno Beaches",
          "narration_zh": "英加軍在黃金、朱諾、劍灘登陸，逐步向內陸推進。",
          "narration_en": "British and Canadian forces land at Gold, Juno and Sword.",
          "focus": [
              "al_allied"
          ],
          "side": "allies",
          "commanders": [],
          "assets": [
              "landing",
              "navy"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 60,
          "hold": 8,
          "cam": {
              "lng": -0.8,
              "lat": 49.2,
              "dist": 620,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1944年6月7–12日",
          "title_zh": "灘頭會師",
          "title_en": "Beachheads Linked",
          "narration_zh": "五個灘頭連成一片，盟軍向卡昂與內陸推進。",
          "narration_en": "Five beachheads link up — drive inland toward Caen.",
          "focus": [
              "al_allied"
          ],
          "side": "allies",
          "commanders": [],
          "assets": [
              "air"
          ],
          "forces_zh": "",
          "forces_en": ""
      },
      {
          "day": 85,
          "hold": 8,
          "cam": {
              "lng": -0.5,
              "lat": 49.2,
              "dist": 700,
              "az": 200,
              "el": 46,
              "orbit": 0.65
          },
          "dateLabel": "1944年夏",
          "title_zh": "第二戰場",
          "title_en": "Second Front Open",
          "narration_zh": "諾曼第登陸成功，西線對德作戰全面展開。",
          "narration_en": "D-Day succeeds — the Western Front against Germany is fully opened.",
          "focus": [],
          "side": "allies",
          "commanders": [],
          "assets": [],
          "forces_zh": "",
          "forces_en": ""
      }
  ];
  const outro =   {
      "title_zh": "諾曼第登陸",
      "title_en": "D-DAY",
      "narration_zh": "本戰役為 DSE 西史重要考點。",
      "narration_en": "A key DSE Western History topic.",
      "cam": {
          "lng": -0.5,
          "lat": 49.35,
          "dist": 696,
          "az": 200,
          "el": 48,
          "orbit": 0.65
      }
  };
  return { meta, factions, geography, units, arrows, fronts, hotspots, weather, notes, analysis, storyboard, outro, END_DAY };
})();
