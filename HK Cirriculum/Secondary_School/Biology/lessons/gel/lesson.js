BioLesson.mount({
  "back": "../../index.html",
  "form": "中六",
  "unit": "遺傳與進化",
  "title": "凝膠電泳的原理",
  "titleEn": "Gel electrophoresis, as a concept",
  "objectives": [
    "說明 DNA 帶負電，會向正極移動。",
    "說明同一時間內，較短的片段在凝膠中走得較遠。",
    "用條帶位置比較片段大小，而不是學習抽取或製備樣品。"
  ],
  "note": "只判斷電荷方向和片段大小。沒有抽取 DNA 或製膠的步驟。",
  "lead": "選對電極方向，以及哪種片段走得較遠。",
  "kind": "match",
  "success": "",
  "introSvg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"電泳槽\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">電泳槽</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">樣品井在一端</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">DNA 帶負電</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">短片段走得較遠</text></svg>",
  "introCap": "磷酸基團使 DNA 帶負電。",
  "steps": [],
  "decoys": [],
  "action": "判斷",
  "fields": [
    {
      "id": "pole",
      "label": "電極",
      "options": [
        {
          "id": "far",
          "label": "正極在遠離樣品井的一端"
        },
        {
          "id": "near",
          "label": "正極就在樣品井這一端"
        }
      ]
    },
    {
      "id": "band",
      "label": "條帶",
      "options": [
        {
          "id": "short",
          "label": "較短片段離開樣品井較遠"
        },
        {
          "id": "long",
          "label": "較長片段離開樣品井較遠"
        }
      ]
    }
  ],
  "cases": [
    {
      "when": {
        "pole": "far",
        "band": "short"
      },
      "ok": true,
      "caption": "負電的 DNA 走向正極，短片段更遠",
      "feedback": "正確。DNA 向正極移動。凝膠阻礙長片段，所以同一時間內短片段走得較遠。"
    },
    {
      "when": {
        "pole": "far",
        "band": "long"
      },
      "ok": false,
      "caption": "方向對，片段大小不對",
      "feedback": "正極放在遠端是對的，但走得較遠的是較短片段，不是較長片段。"
    },
    {
      "when": {
        "pole": "near",
        "band": "short"
      },
      "ok": false,
      "caption": "片段大小對，電極反了",
      "feedback": "短片段確實走得較遠，但 DNA 帶負電，正極要放在它前進的那一端，不是樣品井旁邊。"
    },
    {
      "when": {
        "pole": "near",
        "band": "long"
      },
      "ok": false,
      "caption": "方向和大小都反了",
      "feedback": "DNA 帶負電，應離開樣品井走向正極；走得較遠的是短片段。"
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
