BioLesson.mount({
  "back": "../../index.html",
  "form": "中四",
  "unit": "細胞與生命分子",
  "title": "細胞呼吸",
  "titleEn": "Cellular respiration",
  "objectives": [
    "指出糖解在細胞質進行，有氧時克雷伯氏循環在線粒體基質進行。",
    "指出電子傳遞鏈在線粒體內膜，氧是最終電子受體。",
    "說明大部分 ATP 在氧化磷酸化產生，不必背一個固定的 ATP 總數。"
  ],
  "note": "真核細胞才有線粒體。不要把糖解說成在基質裡發生。",
  "lead": "按有氧呼吸的正確先後次序點選。",
  "kind": "sequence",
  "success": "有氧呼吸的位置和次序正確。",
  "introSvg": "<svg viewBox=\"0 0 360 148\" role=\"img\" aria-label=\"有氧呼吸位置\"><rect width=\"360\" height=\"148\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"16\" y=\"22\" font-size=\"13\" fill=\"#047857\">有氧呼吸位置</text><circle cx=\"28\" cy=\"48\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"53\" font-size=\"15\" fill=\"#0f172a\">細胞質</text><line x1=\"28\" y1=\"62\" x2=\"28\" y2=\"76\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"88\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"93\" font-size=\"15\" fill=\"#0f172a\">線粒體基質</text><line x1=\"28\" y1=\"102\" x2=\"28\" y2=\"116\" stroke=\"#059669\" stroke-width=\"2\"/><circle cx=\"28\" cy=\"128\" r=\"8\" fill=\"#047857\"/><text x=\"46\" y=\"133\" font-size=\"15\" fill=\"#0f172a\">線粒體內膜</text></svg>",
  "introCap": "先看反應在哪一個部位發生。",
  "steps": [
    {
      "label": "細胞質：糖解，葡萄糖變成丙酮酸，淨得少量 ATP",
      "detail": "糖解不需要氧，地點是細胞質。葡萄糖分解成丙酮酸，並產生 NADH。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"糖解 glycolysis\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">糖解 glycolysis</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">地點：細胞質 cytoplasm</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">葡萄糖 → 丙酮酸</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">淨得 2 ATP</text></svg>"
    },
    {
      "label": "基質：丙酮酸進入線粒體，克雷伯氏循環放出二氧化碳",
      "detail": "有氧時丙酮酸進入基質，經鏈接反應和克雷伯氏循環產生二氧化碳、NADH、FADH₂ 和少量 ATP。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"克雷伯氏循環 Krebs cycle\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">克雷伯氏循環 Krebs cycle</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">地點：線粒體基質 matrix</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">放出 CO₂</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">產生 NADH 和 FADH₂</text></svg>"
    },
    {
      "label": "內膜：電子傳給氧，化學滲透產生大部分 ATP",
      "detail": "電子傳遞鏈在內膜。氧是最終電子受體，形成水。大部分 ATP 在這裡由化學滲透產生。",
      "svg": "<svg viewBox=\"0 0 360 180\" role=\"img\" aria-label=\"氧化磷酸化\"><rect width=\"360\" height=\"180\" rx=\"12\" fill=\"#f8fafc\"/><text x=\"20\" y=\"28\" font-size=\"13\" fill=\"#047857\">氧化磷酸化</text><text x=\"20\" y=\"52\" font-size=\"16\" fill=\"#0f172a\">地點：內膜 cristae</text><text x=\"20\" y=\"80\" font-size=\"16\" fill=\"#0f172a\">最終電子受體：氧</text><text x=\"20\" y=\"108\" font-size=\"16\" fill=\"#0f172a\">大部分 ATP 在此產生</text></svg>"
    }
  ],
  "decoys": [
    {
      "label": "糖解作用在線粒體基質進行",
      "why": "不對。糖解在細胞質。基質進行的是有氧條件下的鏈接反應和克雷伯氏循環。"
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
