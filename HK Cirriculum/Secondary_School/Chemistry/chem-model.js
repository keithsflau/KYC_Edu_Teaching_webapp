(function (root, factory) {
  var api = factory();
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  root.ChemModel = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  var ALKANE_BP = {
    1: -162, 2: -89, 3: -42, 4: -1,
    5: 36, 6: 69, 7: 98, 8: 126, 9: 151, 10: 174,
    11: 196, 12: 216, 13: 235, 14: 254, 15: 271, 16: 287,
    17: 302, 18: 316, 19: 330, 20: 343, 25: 402, 30: 450
  };

  // One cut list. Carbon span and boiling cut use the same object for the tower,
  // hover text, and the data card. Cuts follow n-alkane boiling points.
  var FRACTIONS = [
    { name: "Refinery Gas (煉油氣)", temp: "< 40°C", carbons: "C1–C4", cLo: 1, cHi: 4, tLo: null, tHi: 40, cVal: 10, uses: "Fuel gas for heating.<br>加熱用燃氣。", visc: "Low", flam: "Very High", note: "C1–C4 的沸點都低於 40°C。" },
    { name: "Petrol / Gasoline (汽油)", temp: "40–180°C", carbons: "C5–C10", cLo: 5, cHi: 10, tLo: 40, tHi: 180, cVal: 28, uses: "Fuel for cars.<br>汽車燃料。", visc: "Low", flam: "High", note: "戊烷約 36°C，癸烷約 174°C，所以 C5–C10 的沸程是 40–180°C。" },
    { name: "Kerosene (煤油)", temp: "180–250°C", carbons: "C11–C13", cLo: 11, cHi: 13, tLo: 180, tHi: 250, cVal: 40, uses: "Jet fuel and heating.<br>飛機燃料與加熱。", visc: "Medium", flam: "Moderate", note: "C11 約 196°C，C13 約 235°C。" },
    { name: "Diesel (柴油)", temp: "250–350°C", carbons: "C14–C20", cLo: 14, cHi: 20, tLo: 250, tHi: 350, cVal: 55, uses: "Fuel for buses and lorries.<br>巴士與貨車燃料。", visc: "High", flam: "Low", note: "C14 約 254°C，C20 約 343°C。" },
    { name: "Lubricating oil (潤滑油)", temp: "350–420°C", carbons: "C21–C25", cLo: 21, cHi: 25, tLo: 350, tHi: 420, cVal: 70, uses: "Lubricants.<br>潤滑。", visc: "Very High", flam: "Very Low", note: "C25 約 402°C。" },
    { name: "Fuel oil (燃油)", temp: "420–500°C", carbons: "C26–C35", cLo: 26, cHi: 35, tLo: 420, tHi: 500, cVal: 85, uses: "Fuel for ships and power stations.<br>船隻與發電。", visc: "Very High", flam: "Very Low", note: "C30 約 450°C。" },
    { name: "Bitumen (瀝青)", temp: "> 500°C", carbons: "> C35", cLo: 36, cHi: 80, tLo: 500, tHi: null, cVal: 100, uses: "Road surfaces and roofing.<br>路面與屋頂。", visc: "Solid/Thick", flam: "None", note: "殘渣，沸點高於 500°C。" }
  ];

  function snap(n) {
    return n < 1e-9 ? 0 : n;
  }

  function bufferPH(opts) {
    var haM = opts.haM;
    var aM = opts.aM;
    var pKa = opts.pKa;
    var addedMmol = opts.addedMmol;
    var volumeL = opts.volumeL == null ? 0.1 : opts.volumeL;
    var Vml = volumeL * 1000;
    var nHA = haM * volumeL * 1000;
    var nA = aM * volumeL * 1000;
    var excessH = 0;
    var excessOH = 0;
    if (addedMmol > 0) {
      var useH = Math.min(addedMmol, nA);
      nA = snap(nA - useH);
      nHA = nHA + useH;
      excessH = snap(addedMmol - useH);
    } else if (addedMmol < 0) {
      var b = -addedMmol;
      var useB = Math.min(b, nHA);
      nHA = snap(nHA - useB);
      nA = nA + useB;
      excessOH = snap(b - useB);
    }
    var pH;
    var regime;
    var equation;
    if (excessOH > 0) {
      var cOH = excessOH / Vml;
      pH = 14 + Math.log10(cOH);
      regime = "excess-OH";
      equation = "pH = 14 + log([OH⁻]剩餘)";
    } else if (excessH > 0) {
      var cH = excessH / Vml;
      pH = -Math.log10(cH);
      regime = "excess-H";
      equation = "pH = −log([H⁺]剩餘)";
    } else if (nHA > 0 && nA > 0) {
      pH = pKa + Math.log10(nA / nHA);
      regime = "buffer";
      equation = "pH = pKa + log(n(A⁻)/n(HA))";
    } else if (nA > 0) {
      var cSalt = nA / Vml;
      var kb = 1e-14 / Math.pow(10, -pKa);
      var oh = Math.sqrt(kb * cSalt);
      pH = 14 + Math.log10(oh);
      regime = "salt";
      equation = "共軛鹼水解，不用 Henderson–Hasselbalch";
    } else if (nHA > 0) {
      var cWeak = nHA / Vml;
      var ka = Math.pow(10, -pKa);
      var h = (-ka + Math.sqrt(ka * ka + 4 * ka * cWeak)) / 2;
      pH = -Math.log10(h);
      regime = "weak";
      equation = "只剩 HA，用弱酸解離";
    } else {
      pH = 7;
      regime = "water";
      equation = "接近中性";
    }
    var noteZh = "體積 " + Vml.toFixed(0) + " mL。HA " + nHA.toFixed(2) + " mmol，A⁻ " + nA.toFixed(2) + " mmol。";
    if (regime === "excess-OH") {
      noteZh += " 剩餘 OH⁻ " + excessOH.toFixed(2) + " mmol。緩衝劑已耗盡，pH 約 " + pH.toFixed(2) + "。";
    } else if (regime === "excess-H") {
      noteZh += " 剩餘 H⁺ " + excessH.toFixed(2) + " mmol。pH 約 " + pH.toFixed(2) + "。";
    } else if (regime === "buffer") {
      noteZh += " 仍在緩衝範圍，用 Henderson–Hasselbalch。";
    }
    return {
      pH: pH,
      nHA: nHA,
      nA: nA,
      excessOH: excessOH,
      excessH: excessH,
      regime: regime,
      equation: equation,
      noteZh: noteZh,
      volumeMl: Vml
    };
  }

  function titrationPH(vol, mode) {
    var Va = 25;
    var Ca = 0.1;
    var Cb = 0.1;
    var nA = Ca * Va;
    var nB = Cb * vol;
    var V = Va + vol;
    if (mode === "SA_SB") {
      if (nB <= 0) return -Math.log10(Ca);
      if (nA - nB > 1e-9) return -Math.log10((nA - nB) / V);
      if (nB - nA > 1e-9) return 14 + Math.log10((nB - nA) / V);
      return 7;
    }
    var Ka = Math.pow(10, -4.76);
    var Kw = 1e-14;
    if (nB <= 0) {
      var h0 = (-Ka + Math.sqrt(Ka * Ka + 4 * Ka * Ca)) / 2;
      return -Math.log10(h0);
    }
    if (nA - nB > 0.005) {
      var CaR = (nA - nB) / V;
      var Cs = nB / V;
      var bco = Ka + Cs;
      var H = (-bco + Math.sqrt(bco * bco + 4 * Ka * CaR)) / 2;
      return -Math.log10(Math.max(H, 1e-14));
    }
    if (nB - nA > 0.005) return 14 + Math.log10((nB - nA) / V);
    var C = nA / V;
    var Kb = Kw / Ka;
    var OH = Math.sqrt(Kb * C);
    return 14 + Math.log10(OH);
  }

  function strongAcidPH(mAcid, vAcidMl, mBase, vBaseMl) {
    var nH = mAcid * vAcidMl / 1000;
    var nOH = mBase * vBaseMl / 1000;
    var V = (vAcidMl + vBaseMl) / 1000;
    if (Math.abs(nH - nOH) < 1e-12) return 7;
    if (nH > nOH) return -Math.log10((nH - nOH) / V);
    return 14 + Math.log10((nOH - nH) / V);
  }

  function indicatorStyle(name, ph) {
    var bands = {
      universal: [
        [3, "#ef4444", "紅"],
        [5, "#f97316", "橙"],
        [6.5, "#eab308", "黃"],
        [7.5, "#22c55e", "綠"],
        [9, "#14b8a6", "藍綠"],
        [11, "#3b82f6", "藍"],
        [14.01, "#a855f7", "紫"]
      ],
      methyl: [
        [3.1, "#ef4444", "紅"],
        [4.4, "#f97316", "橙"],
        [14.01, "#eab308", "黃"]
      ],
      phenol: [
        [8.2, "#e2e8f0", "無色"],
        [10, "#fbcfe8", "淺紅"],
        [14.01, "#ec4899", "粉紅"]
      ],
      litmus: [
        [5, "#ef4444", "紅"],
        [8, "#8b5cf6", "紫"],
        [14.01, "#3b82f6", "藍"]
      ]
    };
    var rows = bands[name] || bands.universal;
    var i;
    for (i = 0; i < rows.length; i++) {
      if (ph < rows[i][0]) return { hex: rows[i][1], name: rows[i][2] };
    }
    var last = rows[rows.length - 1];
    return { hex: last[1], name: last[2] };
  }

  function calorimetry(m, dT, n) {
    var c = 4.18;
    var qJ = m * c * dT;
    var qkJ = qJ / 1000;
    var deltaH = n > 0 ? -qkJ / n : null;
    return { c: c, qJ: qJ, qkJ: qkJ, deltaH: deltaH };
  }

  function bondEnthalpy(hh, clcl, hcl) {
    var broken = hh + clcl;
    var formed = 2 * hcl;
    var deltaH = broken - formed;
    return { broken: broken, formed: formed, deltaH: deltaH, exo: deltaH < 0 };
  }

  function rateLaw(k, conc, order) {
    return k * Math.pow(conc, order);
  }

  function atomEconomy(mrDesired, mrAll) {
    return (100 * mrDesired) / mrAll;
  }

  function combustionOutcome(fuel, oxygen) {
    var table = {
      methane: {
        enough: { carbon: "CO2", text: "CH₄ + 2O₂ → CO₂ + 2H₂O", ratio: "1 : 2" },
        limited: { carbon: "CO", text: "氧不足時碳變成 CO 或碳煙，同時仍有水。", ratio: "不是 1 : 2" }
      },
      ethene: {
        enough: { carbon: "CO2", text: "C₂H₄ + 3O₂ → 2CO₂ + 2H₂O", ratio: "1 : 3" },
        limited: { carbon: "CO", text: "氧不足時會有 CO 或碳煙。", ratio: "氧不足" }
      }
    };
    return (table[fuel] || table.methane)[oxygen] || table.methane.enough;
  }

  var oxDrills = [
    { formula: "H₂O", ask: "O", answer: -2, hint: "氫通常是 +1，水是中性，氧是 −2。" },
    { formula: "NaCl", ask: "Na", answer: 1, hint: "鈉離子是 +1。" },
    { formula: "SO₂", ask: "S", answer: 4, hint: "兩個氧共 −4，硫是 +4。" },
    { formula: "H₂SO₄", ask: "S", answer: 6, hint: "兩個氫 +2，四個氧 −8，硫是 +6。" },
    { formula: "MnO₄⁻", ask: "Mn", answer: 7, hint: "四個氧 −8，電荷 −1，錳是 +7。" },
    { formula: "H₂O₂", ask: "O", answer: -1, hint: "過氧化物裡的氧是 −1。" },
    { formula: "OF₂", ask: "O", answer: 2, hint: "氟是 −1，氧在這裡是 +2。" },
    { formula: "NH₃", ask: "N", answer: -3, hint: "三個氫 +3，氮是 −3。" }
  ];

  function collisionSetup(conc, tempC) {
    var n = conc * 6;
    var speed = 0.7 + (tempC - 10) * 0.05;
    var ea = 1.5;
    return {
      n: n,
      speed: speed,
      ea: ea,
      note: "同一面積內粒子數 = 濃度檔 × 6。粒子速率 = 0.7 + (溫度 − 10) × 0.05。不同顏色粒子的相對速率達到 " + ea + " 才算有效碰撞。"
    };
  }

  return {
    ALKANE_BP: ALKANE_BP,
    FRACTIONS: FRACTIONS,
    bufferPH: bufferPH,
    titrationPH: titrationPH,
    strongAcidPH: strongAcidPH,
    indicatorStyle: indicatorStyle,
    calorimetry: calorimetry,
    bondEnthalpy: bondEnthalpy,
    rateLaw: rateLaw,
    atomEconomy: atomEconomy,
    combustionOutcome: combustionOutcome,
    oxDrills: oxDrills,
    collisionSetup: collisionSetup
  };
});
