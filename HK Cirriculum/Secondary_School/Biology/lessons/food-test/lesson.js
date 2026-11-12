BioLesson.mount({
  "back": "../../index.html",
  "form": "中四",
  "unit": "細胞與生命分子",
  "title": "食物測試",
  "titleEn": "Food tests",
  "objectives": [
    "用碘液辨認澱粉，用加熱後的本立德試劑辨認還原糖。",
    "用雙縮脲試劑辨認蛋白質，用乙醇乳化試驗辨認脂質。",
    "知道蔗糖是非還原糖，澱粉也不會使本立德試劑變磚紅。"
  ],
  "note": "只記錄真正觀察到的顏色。不要為了預期答案改結果。這裡不提供試劑配製份量。",
  "lead": "選一種食物和一種試劑，按「測試」。任務：做出澱粉的正結果。",
  "kind": "match",
  "success": "",
  "introSvg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"四種學校食物測試\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">四種學校食物測試</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">碘液 → 澱粉 → 藍黑</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">本立德（加熱）→ 還原糖 → 磚紅</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">雙縮脲 → 蛋白質 → 紫色</text><text x=\"20\" y=\"136\" font-size=\"16\" fill=\"#0f172a\">乙醇加水 → 脂質 → 乳濁</text></svg>",
  "introCap": "正結果的顏色不同，不能互換。",
  "steps": [],
  "decoys": [],
  "action": "測試",
  "fields": [
    {
      "id": "food",
      "label": "樣本",
      "options": [
        {
          "id": "starch",
          "label": "澱粉溶液 starch"
        },
        {
          "id": "glucose",
          "label": "葡萄糖溶液 glucose"
        },
        {
          "id": "sucrose",
          "label": "蔗糖溶液 sucrose"
        },
        {
          "id": "protein",
          "label": "蛋白質溶液 protein"
        },
        {
          "id": "lipid",
          "label": "植物油 lipid"
        }
      ]
    },
    {
      "id": "reagent",
      "label": "試劑",
      "options": [
        {
          "id": "iodine",
          "label": "碘液 iodine solution"
        },
        {
          "id": "benedict",
          "label": "本立德試劑 Benedict’s（概念上要加熱）"
        },
        {
          "id": "biuret",
          "label": "雙縮脲試劑 Biuret"
        },
        {
          "id": "ethanol",
          "label": "乙醇，其後加水 ethanol emulsion"
        }
      ]
    }
  ],
  "cases": [
    {
      "when": {
        "food": "starch",
        "reagent": "iodine"
      },
      "ok": true,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"藍黑色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#1e1b4b\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">藍黑色</text></svg>",
      "caption": "藍黑色",
      "feedback": "正確。澱粉遇碘液呈藍黑色，因為碘進入澱粉的螺旋結構。這就是本任務要的正結果。"
    },
    {
      "when": {
        "food": "starch",
        "reagent": "benedict"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"仍是藍色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#2563eb\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">仍是藍色</text></svg>",
      "caption": "仍是藍色",
      "feedback": "澱粉不是還原糖，本立德試劑加熱後仍呈藍色。測澱粉要用碘液。"
    },
    {
      "when": {
        "food": "starch",
        "reagent": "biuret"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "雙縮脲試劑測蛋白質的肽鍵，正結果呈紫色。糖和脂質不會出現這個正結果。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "starch",
        "reagent": "ethanol"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "乙醇乳化試驗測脂質：脂質先溶於乙醇，加水後變乳濁。糖和蛋白質不會形成這個乳濁液。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "glucose",
        "reagent": "iodine"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"棕黃色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#b45309\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">棕黃色</text></svg>",
      "caption": "棕黃色",
      "feedback": "沒有澱粉時碘液保持棕黃色。葡萄糖不會變成藍黑色。"
    },
    {
      "when": {
        "food": "glucose",
        "reagent": "benedict"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"磚紅色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#b91c1c\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">磚紅色</text></svg>",
      "caption": "磚紅色",
      "feedback": "加熱後呈磚紅色，是還原糖（葡萄糖）的正結果。任務要的是澱粉：改用澱粉溶液加碘液。"
    },
    {
      "when": {
        "food": "glucose",
        "reagent": "biuret"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "雙縮脲試劑測蛋白質的肽鍵，正結果呈紫色。糖和脂質不會出現這個正結果。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "glucose",
        "reagent": "ethanol"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "乙醇乳化試驗測脂質：脂質先溶於乙醇，加水後變乳濁。糖和蛋白質不會形成這個乳濁液。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "sucrose",
        "reagent": "iodine"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"棕黃色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#b45309\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">棕黃色</text></svg>",
      "caption": "棕黃色",
      "feedback": "蔗糖不是澱粉，碘液保持棕黃色。"
    },
    {
      "when": {
        "food": "sucrose",
        "reagent": "benedict"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"仍是藍色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#2563eb\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">仍是藍色</text></svg>",
      "caption": "仍是藍色",
      "feedback": "蔗糖是非還原糖。沒有先水解的話，加熱後本立德試劑仍呈藍色。"
    },
    {
      "when": {
        "food": "sucrose",
        "reagent": "biuret"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "雙縮脲試劑測蛋白質的肽鍵，正結果呈紫色。糖和脂質不會出現這個正結果。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "sucrose",
        "reagent": "ethanol"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "乙醇乳化試驗測脂質：脂質先溶於乙醇，加水後變乳濁。糖和蛋白質不會形成這個乳濁液。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "protein",
        "reagent": "iodine"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"棕黃色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#b45309\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">棕黃色</text></svg>",
      "caption": "棕黃色",
      "feedback": "蛋白質不是澱粉，碘液不會呈藍黑色。"
    },
    {
      "when": {
        "food": "protein",
        "reagent": "benedict"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "本立德試劑要加熱，用來測還原糖。葡萄糖呈磚紅色；蔗糖和澱粉不是還原糖，溶液保持藍色。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "protein",
        "reagent": "biuret"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"紫色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#7e22ce\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">紫色</text></svg>",
      "caption": "紫色",
      "feedback": "雙縮脲試劑遇蛋白質（肽鍵）呈紫色。這不是澱粉測試。"
    },
    {
      "when": {
        "food": "protein",
        "reagent": "ethanol"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "乙醇乳化試驗測脂質：脂質先溶於乙醇，加水後變乳濁。糖和蛋白質不會形成這個乳濁液。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "lipid",
        "reagent": "iodine"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"棕黃色\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#b45309\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">棕黃色</text></svg>",
      "caption": "棕黃色",
      "feedback": "脂質不是澱粉，碘液不會呈藍黑色。"
    },
    {
      "when": {
        "food": "lipid",
        "reagent": "benedict"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "本立德試劑要加熱，用來測還原糖。葡萄糖呈磚紅色；蔗糖和澱粉不是還原糖，溶液保持藍色。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "lipid",
        "reagent": "biuret"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"不是正結果\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#f8fafc\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">不是正結果</text></svg>",
      "caption": "沒有該試劑的正結果",
      "feedback": "雙縮脲試劑測蛋白質的肽鍵，正結果呈紫色。糖和脂質不會出現這個正結果。 請繼續找出澱粉加碘液的藍黑色。"
    },
    {
      "when": {
        "food": "lipid",
        "reagent": "ethanol"
      },
      "ok": false,
      "svg": "<svg viewBox=\"0 0 360 150\" role=\"img\" aria-label=\"乳濁液\"><rect width=\"360\" height=\"150\" rx=\"12\" fill=\"#f8fafc\"/><rect x=\"120\" y=\"28\" width=\"120\" height=\"78\" rx=\"14\" fill=\"#e5e7eb\" stroke=\"#334155\"/><text x=\"180\" y=\"132\" text-anchor=\"middle\" font-size=\"14\" fill=\"#0f172a\">乳濁液</text></svg>",
      "caption": "乳濁液",
      "feedback": "脂質溶於乙醇，加水後形成乳濁液。這是脂質正結果，不是澱粉。"
    }
  ],
  "fallback": "請選齊樣本和試劑。",
  "slider": null,
  "shiftFrom": 0,
  "shiftTo": 0,
  "highAt": 0,
  "lowCaption": "",
  "highCaption": "",
  "curveLabel": "",
  "question": "",
  "needHigh": "",
  "choices": []
});
