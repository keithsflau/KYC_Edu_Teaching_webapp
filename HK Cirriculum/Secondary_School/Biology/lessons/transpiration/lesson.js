BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "生物與環境",
  "title": "蒸騰",
  "titleEn": "Transpiration",
  "objectives": [
    "預測低濕度和風會提高蒸騰速率。",
    "說明水沿水勢梯度離開葉片，風會吹走葉外的濕空氣。",
    "知道木質部的上升主要靠蒸騰拉力，葉片裡沒有水泵。"
  ],
  "note": "",
  "lead": "選濕度和風。任務：找出蒸騰最快的條件。",
  "kind": "match",
  "success": "",
  "introSvg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"蒸騰\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">蒸騰</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">氣孔是水蒸氣離開的主要通道</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">低濕度、有風 → 較快</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">拉力來自內聚力和張力</text></svg>",
  "introCap": "保衛細胞脹滿時氣孔張開。這裡只比較葉外條件。",
  "steps": [],
  "decoys": [],
  "action": "觀察",
  "fields": [
    {
      "id": "humidity",
      "label": "葉外濕度",
      "options": [
        {
          "id": "low",
          "label": "低濕度"
        },
        {
          "id": "high",
          "label": "高濕度"
        }
      ]
    },
    {
      "id": "wind",
      "label": "空氣",
      "options": [
        {
          "id": "wind",
          "label": "有風"
        },
        {
          "id": "still",
          "label": "無風"
        }
      ]
    }
  ],
  "cases": [
    {
      "when": {
        "humidity": "low",
        "wind": "wind"
      },
      "ok": true,
      "caption": "蒸騰最快",
      "feedback": "正確。葉內和乾燥空氣的水勢差大，風又吹薄葉外的濕空氣層，水蒸氣散失最快。上升的水柱靠內聚力和張力，不是葉片裡的泵。"
    },
    {
      "when": {
        "humidity": "low",
        "wind": "still"
      },
      "ok": false,
      "caption": "較快，但不是最快",
      "feedback": "低濕度會加快蒸騰，不過無風時葉外仍留着一層濕空氣。最快的是低濕度加有風。"
    },
    {
      "when": {
        "humidity": "high",
        "wind": "wind"
      },
      "ok": false,
      "caption": "風有幫助，但濕度高",
      "feedback": "風能更新葉外空氣，可是高濕度減小水勢差。最快仍是低濕度加有風。"
    },
    {
      "when": {
        "humidity": "high",
        "wind": "still"
      },
      "ok": false,
      "caption": "蒸騰最慢",
      "feedback": "高濕度加無風，水勢差小，濕空氣又留在葉外，蒸騰最慢。"
    }
  ],
  "fallback": "",
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
