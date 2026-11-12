/* Visible objectives and answer tones for the existing Form labs. */
(function () {
  "use strict";
  var MAP = {
    "01_Cell_Transport": {
      form: "中四",
      unit: "細胞與生命分子",
      objectives: [
        "區分簡單擴散、滲透、促進擴散和主動運輸。",
        "用濃度梯度、水勢和是否需要 ATP 判斷方向。"
      ],
      note: "模型用來理解膜運輸，不是醫療指示。"
    },
    "02_Mitosis_Cell_Cycle": {
      form: "中四",
      unit: "細胞與生命分子",
      objectives: [
        "按間期、前期、中期、後期、末期描述有絲分裂。",
        "說明姊妹染色單體在後期分離，子細胞染色體數目與母細胞相同。"
      ]
    },
    "06_Photosynthesis": {
      form: "中四",
      unit: "細胞與生命分子",
      objectives: [
        "寫出光合作用需要光、二氧化碳、水和葉綠素。",
        "解釋光強度、二氧化碳和溫度怎樣成為限制因素，以及曲線為何出現平台。"
      ]
    },
    "10_Cardiac_Cycle": {
      form: "中四",
      unit: "人體生理",
      objectives: [
        "按心房收縮、心室收縮、全心舒張描述一個心動週期。",
        "判斷房室瓣和半月瓣在哪個階段開啟或關閉。"
      ],
      note: "這是循環模型，不能用來判斷個人心臟健康。"
    },
    "12_Osmosis_Sandbox": {
      form: "中四",
      unit: "細胞與生命分子",
      objectives: [
        "定義滲透為水分子由高水勢到低水勢的淨移動。",
        "預測動物細胞和植物細胞在不同水勢溶液中的變化。"
      ]
    },
    "01_Enzyme_Kinetics": {
      form: "中五",
      unit: "細胞與生命分子",
      objectives: [
        "解釋酶降低活化能，以及基質濃度、溫度和 pH 如何影響速率。",
        "區分最適條件和過高溫度造成的變性。"
      ],
      note: "只記錄模擬裡真正出現的速率，不要為了貼合曲線而改數據。"
    },
    "04_Genetics_Punnett": {
      form: "中五",
      unit: "遺傳與進化",
      objectives: [
        "用等位基因和龐氏方格預測單基因雜交的基因型與表型比。",
        "分辨配子組合和後代比例。"
      ],
      note: "家族資料要真實記錄。不要編造沒有觀察到的性狀。"
    },
    "10_Energy_Flow": {
      form: "中五",
      unit: "生物與環境",
      objectives: [
        "說明能量主要由陽光進入生態系統，並在每個營養級以熱能等形式流失。",
        "解釋能量金字塔為什麼保持正立，而數量或生物量金字塔可以倒轉。"
      ]
    },
    "13_Ecology_Food_Web": {
      form: "中五",
      unit: "生物與環境",
      objectives: [
        "用食物網表示多條食物關係，而不是只畫一條食物鏈。",
        "預測移除一個物種後，其他營養級可能怎樣改變。"
      ],
      note: "移除物種的後果是模型推論。真實生態不要以試驗為名去清除生物。"
    },
    "01_Glucose_Homeostasis": {
      form: "中六",
      unit: "人體生理",
      objectives: [
        "說明胰島素由胰島 β 細胞分泌，降低血糖；胰高血糖素由 α 細胞分泌，升高血糖。",
        "用負回饋描述血糖怎樣回到設定範圍。"
      ],
      note: "這是調節模型，不是用藥或飲食治療指引。"
    },
    "11_Nephron_Osmoregulation": {
      form: "中六",
      unit: "人體生理",
      objectives: [
        "區分腎小球的超濾和腎小管的選擇性重吸收。",
        "說明 ADH 使集尿管對水的透性增加，尿液較濃。"
      ],
      note: "模型幫助理解水平衡，不能代替醫學判斷。"
    }
  };

  function folderName() {
    var parts = decodeURIComponent(location.pathname).split(/[/\\]/).filter(Boolean);
    return parts.length >= 2 ? parts[parts.length - 2] : "";
  }

  function banner(info) {
    if (document.getElementById("bio-form-banner")) return;
    var box = document.createElement("section");
    box.id = "bio-form-banner";
    box.style.cssText = "max-width:960px;margin:12px auto 0;padding:12px 16px;background:#ecfdf5;border:1px solid #a7f3d0;border-radius:16px;font-family:inherit;";
    var h = document.createElement("strong");
    h.textContent = info.form + " · " + info.unit + " · 學習目標";
    box.appendChild(h);
    var ul = document.createElement("ul");
    ul.style.margin = "8px 0 0";
    info.objectives.forEach(function (line) {
      var li = document.createElement("li");
      li.textContent = line;
      ul.appendChild(li);
    });
    box.appendChild(ul);
    if (info.note) {
      var p = document.createElement("p");
      p.style.margin = "8px 0 0";
      p.textContent = info.note;
      box.appendChild(p);
    }
    document.body.insertBefore(box, document.body.firstChild);
  }

  function bindTone() {
    document.addEventListener("click", function (event) {
      var root = document.getElementById("root");
      if (!root || !event.target.closest) return;
      if (!event.target.closest("#root button")) return;
      window.setTimeout(function () {
        var text = root.innerText || "";
        var bad = text.indexOf("Not quite") !== -1 || text.indexOf("再想想") !== -1;
        var good = text.indexOf("✓ Correct") !== -1 || text.indexOf("正確") !== -1;
        if (!window.BioTone) return;
        if (bad) window.BioTone("bad");
        else if (good) window.BioTone("ok");
        else window.BioTone("tick");
      }, 40);
    });
  }

  var info = MAP[folderName()];
  if (info) banner(info);
  bindTone();
})();
