BioLesson.mount({
  "back": "../../index.html",
  "form": "中五",
  "unit": "遺傳與進化",
  "title": "抗生素與自然選擇",
  "titleEn": "Antibiotics and selection",
  "objectives": [
    "說明耐藥變異是隨機突變，可以在接觸抗生素之前已經存在。",
    "說明抗生素選擇存活的個體，而不是製造突變。",
    "描述敏感細菌死亡後，耐藥個體的比例上升。"
  ],
  "note": "這是種群模型，不是培養細菌的步驟。不要分享或自行服用剩餘抗生素。",
  "lead": "按自然選擇的正確次序點選。不要選「藥物製造突變」。",
  "kind": "sequence",
  "success": "選擇的次序正確：先有變異，然後藥物篩選，抗性比例上升。",
  "introSvg": "<svg viewBox=\"0 0 360 148\" role=\"img\" aria-label=\"自然選擇\"><rect width=\"360\" height=\"148\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"16\" y=\"22\" font-size=\"13\" fill=\"#047857\">自然選擇</text><circle cx=\"28\" cy=\"48\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"53\" font-size=\"15\" fill=\"#0f172a\">已有耐藥變異</text><line x1=\"28\" y1=\"62\" x2=\"28\" y2=\"76\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"88\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"93\" font-size=\"15\" fill=\"#0f172a\">敏感細菌死亡</text><line x1=\"28\" y1=\"102\" x2=\"28\" y2=\"116\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"128\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"133\" font-size=\"15\" fill=\"#0f172a\">耐藥比例上升</text></svg>",
  "introCap": "抗生素是選擇壓力，不是突變的來源。",
  "steps": [
    {
      "label": "繁殖時隨機突變，少數細菌在用藥前已能抵抗該抗生素",
      "detail": "突變不是為了應付藥物而出現。用藥前種群裡可以已經有耐藥個體。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"用藥之前\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">用藥之前</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">大部分細菌敏感</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">少數已有耐藥突變</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">突變是隨機的</text></svg>"
    },
    {
      "label": "抗生素殺死敏感細菌，耐藥細菌較易存活",
      "detail": "藥物改變存活機會。它沒有把敏感細菌改寫成耐藥細菌。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"選擇\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">選擇</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">敏感細菌死亡</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">耐藥細菌存活</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">藥物不是突變劑的意思</text></svg>"
    },
    {
      "label": "存活者繁殖，種群中耐藥基因的比例上升",
      "detail": "下一代有更多耐藥個體，因為存活者把抗性傳下去。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"用藥之後\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">用藥之後</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">種群變小後再增長</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">耐藥個體比例較高</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">這是選擇，不是獲得性遺傳</text></svg>"
    }
  ],
  "decoys": [
    {
      "label": "抗生素令細菌突變出抗性",
      "why": "不對。抗生素選擇已經存在的耐藥變異。它不會為了生存而指令細菌產生所需突變。"
    }
  ],
  "action": "",
  "fields": [],
  "cases": [],
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
