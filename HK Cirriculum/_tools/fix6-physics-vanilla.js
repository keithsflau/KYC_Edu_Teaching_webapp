const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");
const BR = "../../../../../common/ncs-vanilla-bridge.js";

function inject(fileRel, strings, extraApply) {
  const f = path.join(ROOT, fileRel);
  let html = fs.readFileSync(f, "utf8");
  if (html.includes("NcsVanillaBridge.wireVanillaI18n")) {
    console.log("SKIP", fileRel);
    return;
  }
  if (!html.includes("ncs-vanilla-bridge.js")) {
    html = html.replace(
      /(<script src="[^"]*ncs-i18n\.js" defer data-ncs-kit="fleet"><\/script>)/,
      `$1\n  <script src="${BR}"></script>`
    );
  }
  const block = `  <script data-ncs-fix6="lang">
  (function () {
    var APP_STRINGS = ${JSON.stringify(strings, null, 4)};
    function applyUI() {
      var u = function (k) { return window.NcsVanillaBridge.ui(k, APP_STRINGS); };
      document.title = u("pageTitle");
      ${extraApply}
    }
    window.NcsVanillaBridge.whenNcsReady(function () {
      window.NcsVanillaBridge.wireVanillaI18n(APP_STRINGS, applyUI);
    });
  })();
  </script>`;
  html = html.replace("</body>", block + "\n</body>");
  fs.writeFileSync(f, html, "utf8");
  console.log("FIXED", fileRel);
}

inject(
  "Secondary_School/Physics/Topics/03_Wave_Motion/Doppler_Effect/index.html",
  {
    zh: {
      pageTitle: "都卜勒效應實驗室",
      title: "都卜勒效應實驗室",
      subtitle: "互動物理模擬（含音效）",
      controls: "控制",
      approach: "接近觀察者（音調較高）",
      recede: "遠離觀察者（音調較低）",
      obs: "觀察",
      freqObs: "觀測頻率",
      pause: "暫停",
      reset: "重設",
      observer: "觀察者",
    },
    en: {
      pageTitle: "Doppler Effect Lab",
      title: "Doppler Effect Lab",
      subtitle: "Interactive Physics Simulation with Audio",
      controls: "Controls",
      approach: "Approaching observer (higher pitch)",
      recede: "Receding from observer (lower pitch)",
      obs: "Observation",
      freqObs: "Observed frequency",
      pause: "Pause",
      reset: "Reset",
      observer: "Observer",
    },
  },
  `
      var h1 = document.querySelector("header h1");
      if (h1) h1.textContent = u("title");
      var sub = document.querySelector("header p.text-slate-400");
      if (sub) sub.textContent = u("subtitle");
      var badges = document.querySelectorAll("header .rounded-full span:last-child");
      if (badges[0]) badges[0].textContent = u("approach");
      if (badges[1]) badges[1].textContent = u("recede");
      var h2 = document.querySelector("aside h2");
      if (h2 && h2.lastChild) h2.lastChild.textContent = " " + u("controls");
      var obsH = document.querySelector("aside h3.font-semibold");
      if (obsH) obsH.textContent = u("obs");
      var freqLbl = document.querySelector("#freqObserved") && document.querySelector("#freqObserved").previousElementSibling;
      if (freqLbl) freqLbl.textContent = u("freqObs");
      var pauseBtn = document.getElementById("toggleBtn");
      if (pauseBtn && pauseBtn.textContent.indexOf("Pause") >= 0 || pauseBtn && pauseBtn.textContent.indexOf("暫") >= 0) pauseBtn.textContent = u("pause");
      var resetBtn = document.getElementById("resetBtn");
      if (resetBtn) resetBtn.textContent = u("reset");
      var obsTag = document.querySelector(".text-yellow-400.border");
      if (obsTag) obsTag.textContent = u("observer");
  `
);

inject(
  "Secondary_School/Physics/Topics/07_Atomic_World/Photoelectric_Effect/index.html",
  {
    zh: {
      pageTitle: "光電效應實驗室",
      title: "HKDSE 物理實驗室",
      subtitle: "光電效應模擬",
      equation: "愛因斯坦方程：",
      chamber: "真空室視圖",
      photonE: "光子能量 (E)",
      workF: "功函數 (Φ)",
      kemax: "最大動能 (Kmax)",
      photocurrent: "光電流",
    },
    en: {
      pageTitle: "Photoelectric Effect Lab",
      title: "HKDSE Physics Lab",
      subtitle: "Photoelectric Effect Simulation",
      equation: "Einstein's Equation: ",
      chamber: "Vacuum Chamber View",
      photonE: "Photon Energy (E)",
      workF: "Work Function (Φ)",
      kemax: "Max KE (Kmax)",
      photocurrent: "Photocurrent",
    },
  },
  `
      var h1 = document.querySelector("header h1");
      if (h1) h1.textContent = u("title");
      var sub = document.querySelector("header p.text-xs");
      if (sub) sub.textContent = u("subtitle");
      var eq = document.querySelector("header .font-mono.text-sm");
      if (eq) eq.textContent = u("equation");
      var chamber = document.querySelector(".glass-panel .absolute.top-4");
      if (chamber) chamber.innerHTML = '<i class="fa-solid fa-video mr-2"></i>' + u("chamber");
      var labels = document.querySelectorAll("main .text-xs.uppercase");
      if (labels[0]) labels[0].textContent = u("photonE");
      if (labels[1]) labels[1].textContent = u("workF");
      if (labels[2]) labels[2].textContent = u("kemax");
      if (labels[3]) labels[3].textContent = u("photocurrent");
  `
);

inject(
  "Secondary_School/Physics/Topics/03_Wave_Motion/Prism_Dispersion/index.html",
  {
    zh: {
      pageTitle: "棱鏡色散實驗室",
      title: "棱鏡色散實驗室",
      subtitle: "白光 → 光譜（折射率隨 λ 變化）",
      controls: "控制",
      angle: "入射角 (θ₁)",
      material: "棱鏡材料",
      keyIdea: "重點",
      keyBody: "不同波長折射程度不同，因折射率 n(λ) 隨波長減小而增大。紫光偏折最大；紅光最小。",
      rainbow: "光譜順序：紅橙黃綠藍靛紫",
    },
    en: {
      pageTitle: "Prism Dispersion Lab",
      title: "Prism Dispersion Lab",
      subtitle: "White light → spectrum (Snell's law, n varies with λ)",
      controls: "Controls",
      angle: "Angle of incidence (θ₁)",
      material: "Prism material",
      keyIdea: "Key idea",
      keyBody: "Different wavelengths refract by different amounts because refractive index n(λ) increases as wavelength decreases. Violet bends most; red bends least.",
      rainbow: "Rainbow order: R O Y G B I V",
    },
  },
  `
      var h1 = document.querySelector("header h1");
      if (h1) h1.textContent = u("title");
      var sub = document.querySelector("header p");
      if (sub) sub.textContent = u("subtitle");
      var ctrl = document.querySelector("aside h2");
      if (ctrl) ctrl.textContent = u("controls");
      var lbls = document.querySelectorAll("aside label.text-sm");
      if (lbls[0]) lbls[0].textContent = u("angle");
      if (lbls[1]) lbls[1].textContent = u("material");
      var keyH = document.querySelector("aside h3.font-semibold");
      if (keyH) keyH.textContent = u("keyIdea");
      var keyP = document.querySelector("aside h3 + p");
      if (keyP) keyP.textContent = u("keyBody");
      var rb = document.querySelector("section .absolute.top-3");
      if (rb) rb.textContent = u("rainbow");
  `
);

inject(
  "Secondary_School/Physics/Topics/03_Wave_Motion/Lens_Ray_Diagrams/index.html",
  {
    zh: {
      pageTitle: "透鏡光線圖實驗室",
      title: "透鏡光線圖實驗室",
      subtitle: "互動物理模擬",
      standard: "標準：光學",
      config: "設定",
      lensType: "透鏡類型",
      convex: "凸透鏡（會聚）",
      concave: "凹透鏡（發散）",
      focalLen: "焦距 (f)",
      objDist: "物距 (do)",
      liveAnalysis: "即時分析",
      imgDist: "像距 (di)",
      mag: "放大率 (M)",
      nature: "性質",
      orient: "方向",
    },
    en: {
      pageTitle: "Lens Ray Lab",
      title: "Lens Ray Lab",
      subtitle: "Interactive Physics Simulation",
      standard: "Standard: Light & Optics",
      config: "Configuration",
      lensType: "Lens Type",
      convex: "Convex (Converging)",
      concave: "Concave (Diverging)",
      focalLen: "Focal Length (f)",
      objDist: "Object Distance (do)",
      liveAnalysis: "Live Analysis",
      imgDist: "Image Distance (di)",
      mag: "Magnification (M)",
      nature: "Nature",
      orient: "Orientation",
    },
  },
  `
      var h1 = document.querySelector("nav h1");
      if (h1) h1.textContent = u("title");
      var sub = document.querySelector("nav p");
      if (sub) sub.textContent = u("subtitle");
      var std = document.querySelector("nav .rounded-full");
      if (std) std.textContent = u("standard");
      var cfg = document.querySelector("aside h2");
      if (cfg && cfg.textContent.indexOf("Configuration") >= 0 || cfg && cfg.textContent.indexOf("設定") >= 0) cfg.lastChild.textContent = " " + u("config");
      var lensLbl = document.querySelector("aside label.uppercase");
      if (lensLbl) lensLbl.textContent = u("lensType");
      var convex = document.getElementById("btnConvex");
      if (convex) convex.textContent = u("convex");
      var concave = document.getElementById("btnConcave");
      if (concave) concave.textContent = u("concave");
      var fl = document.querySelector("label.text-sm.font-semibold.text-slate-700");
      if (fl) fl.innerHTML = u("focalLen").replace("(f)", "(<span class=\\"italic\\">f</span>)");
      var live = document.querySelector(".bg-slate-900 h2");
      if (live && live.lastChild) live.lastChild.textContent = " " + u("liveAnalysis");
      var spans = document.querySelectorAll(".bg-slate-900 .text-slate-400.text-sm");
      if (spans[0]) spans[0].innerHTML = u("imgDist").replace("(di)", "(<span class=\\"italic\\">di</span>)");
      if (spans[1]) spans[1].innerHTML = u("mag").replace("(M)", "(<span class=\\"italic\\">M</span>)");
      var ups = document.querySelectorAll(".bg-white\\/10 .text-xs.uppercase");
      if (ups[0]) ups[0].textContent = u("nature");
      if (ups[1]) ups[1].textContent = u("orient");
  `
);
