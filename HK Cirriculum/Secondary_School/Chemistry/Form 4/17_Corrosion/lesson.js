(function (root) {
  var METHODS = {
    paint: {
      name: "油漆或塗油",
      intactLabel: "保護層完整",
      brokenLabel: "保護層破損",
      intact: { protected: true, why: "完整的油漆或油把鐵和氧、水分開。" },
      broken: { protected: false, why: "屏障破了之後，氧和水又能接觸鐵，破口會生鏽。油漆不會代替鐵被氧化。" }
    },
    zinc: {
      name: "鍍鋅",
      intactLabel: "鋅層完整",
      brokenLabel: "鋅層刮花但仍貼著鐵",
      intact: { protected: true, why: "鋅層隔開氧和水。鋅也比鐵活潑。" },
      broken: { protected: true, why: "鋅比鐵活潑。刮花後鋅仍先被氧化，鐵繼續受保護。" }
    },
    tin: {
      name: "鍍錫",
      intactLabel: "錫層完整",
      brokenLabel: "錫層刮花",
      intact: { protected: true, why: "錫層完整時是屏障，把氧和水隔開。" },
      broken: { protected: false, why: "錫不如鐵活潑。刮花後鐵接觸氧和水，而且會比沒有錫時更容易被氧化。" }
    },
    magnesium: {
      name: "連接鎂或鋅塊",
      intactLabel: "金屬塊仍連接鐵",
      brokenLabel: "金屬塊已脫開",
      intact: { protected: true, why: "鎂或鋅比鐵活潑，它們先和氧、水作用，鐵就不容易變成鏽。這不需要外加電源。" },
      broken: { protected: false, why: "較活潑的金屬若不再連接鐵，犧牲保護就停止。鐵再接觸氧和水時會生鏽。" }
    }
  };

  function willRust(water, oxygen) {
    return !!(water && oxygen);
  }

  function envLabel(water, oxygen, electrolyte) {
    return (water ? "有水" : "無水") + "、" + (oxygen ? "有氧" : "無氧") + (electrolyte ? "、水中有電解質" : "");
  }

  function judgeRust(water, oxygen, electrolyte, guessRusts) {
    var actual = willRust(water, oxygen);
    if (guessRusts === actual) {
      if (actual && electrolyte) return { ok: true, message: "正確。水和氧同時存在，鐵會生鏽。電解質通常只會加快，不能代替氧或水，這裡也不設定用量。" };
      if (actual) return { ok: true, message: "正確。水和氧同時存在，鐵會生鏽。" };
      if (!water && !oxygen) return { ok: true, message: "正確。沒有水也沒有氧，鐵不會生鏽。" };
      if (!water) return { ok: true, message: "正確。只有氧、沒有水，鐵不會生鏽。" };
      return { ok: true, message: "正確。只有水、沒有氧，鐵不會生鏽。" + (electrolyte ? "電解質不能代替氧。" : "") };
    }
    if (guessRusts && !water && !oxygen) return { ok: false, message: "錯因：水和氧都沒有，鐵不會生鏽。兩樣要同時存在。" };
    if (guessRusts && !water) return { ok: false, message: "錯因：乾燥的氧不能單獨使鐵生鏽，還要有水。" };
    if (guessRusts && !oxygen) return { ok: false, message: "錯因：只有水不夠。沒有氧就不會生鏽。" + (electrolyte ? "電解質不能代替氧。" : "") };
    return { ok: false, message: "錯因：水和氧同時接觸鐵時就會生鏽。少了一樣才不會。" };
  }

  function methodState(method, situation) {
    return METHODS[method][situation];
  }

  function judgeProtection(method, situation, guessProtected) {
    var truth = methodState(method, situation);
    if (!truth) return { ok: false, message: "錯因：請先選擇防鏽方法。" };
    if (guessProtected === truth.protected) return { ok: true, message: "正確。" + truth.why };
    return { ok: false, message: "錯因：" + truth.why };
  }

  function selfCheck() {
    var errors = [];
    if (!willRust(true, true) || willRust(true, false) || willRust(false, true) || willRust(false, false)) errors.push("rust flag");
    var cases = [
      [true, true, false, true],
      [true, false, true, false],
      [false, true, false, false],
      [false, false, false, false]
    ];
    cases.forEach(function (c) {
      var right = judgeRust(c[0], c[1], c[2], c[3]);
      var wrong = judgeRust(c[0], c[1], c[2], !c[3]);
      if (!right.ok || right.message.indexOf("正確") !== 0) errors.push("right rust");
      if (wrong.ok || wrong.message.indexOf("錯因") !== 0) errors.push("wrong rust");
    });
    if (judgeRust(true, false, true, true).message.indexOf("氧") < 0) errors.push("electrolyte");
    ["paint", "zinc", "tin", "magnesium"].forEach(function (m) {
      ["intact", "broken"].forEach(function (s) {
        var truth = methodState(m, s);
        var okGuess = judgeProtection(m, s, truth.protected);
        var badGuess = judgeProtection(m, s, !truth.protected);
        if (!okGuess.ok || badGuess.ok || badGuess.message.indexOf("錯因") !== 0) errors.push(m + s);
      });
    });
    if (methodState("zinc", "broken").protected !== true) errors.push("zinc");
    if (methodState("tin", "broken").protected !== false) errors.push("tin");
    if (methodState("paint", "broken").protected !== false) errors.push("paint");
    if (methodState("magnesium", "intact").protected !== true) errors.push("mg");
    var blob = JSON.stringify(METHODS) + judgeRust(true, true, true, false).message;
    if (/食鹽|毫升|茶匙|安培|伏特|氰|加熱|mol\/|\d+\s*(g|cm|mL|ml|克)/.test(blob)) errors.push("forbidden");
    if (errors.length) throw new Error(errors.join(", "));
    return "ok";
  }

  var api = {
    METHODS: METHODS,
    willRust: willRust,
    envLabel: envLabel,
    judgeRust: judgeRust,
    judgeProtection: judgeProtection,
    methodState: methodState,
    selfCheck: selfCheck
  };
  root.CorrosionLesson = api;
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (typeof document === "undefined") return;

  var water = false;
  var oxygen = false;
  var electrolyte = false;
  var method = "paint";
  var situation = "intact";
  var envReveal = null;
  var guardReveal = null;
  var nail = document.getElementById("nail");
  var guard = document.getElementById("guard");
  var nctx = nail.getContext("2d");
  var gctx = guard.getContext("2d");

  function syncEnvButtons() {
    document.getElementById("water").textContent = water ? "水：有" : "水：無";
    document.getElementById("water").className = water ? "on" : "alt";
    document.getElementById("oxygen").textContent = oxygen ? "氧：有" : "氧：無";
    document.getElementById("oxygen").className = oxygen ? "on" : "alt";
    document.getElementById("electrolyte").textContent = electrolyte ? "電解質：有（無用量）" : "電解質：無";
    document.getElementById("electrolyte").className = electrolyte ? "on" : "alt";
    var tail = "。先判斷，再生鏽結果才顯示。";
    if (envReveal) tail = envReveal.rust ? "。會生鏽。" : "。不會生鏽。";
    document.getElementById("env-label").textContent = "現況：" + envLabel(water, oxygen, electrolyte) + tail;
    drawNail();
  }

  function syncMethodButtons() {
    var buttons = document.querySelectorAll("#methods button");
    Array.prototype.forEach.call(buttons, function (b) {
      b.className = b.getAttribute("data-method") === method ? "on" : "alt";
    });
    var spec = METHODS[method];
    document.getElementById("sit-intact").textContent = spec.intactLabel;
    document.getElementById("sit-broken").textContent = spec.brokenLabel;
    document.getElementById("sit-intact").className = situation === "intact" ? "on" : "alt";
    document.getElementById("sit-broken").className = situation === "broken" ? "on" : "alt";
    drawGuard();
  }

  function drawNailShape(ctx, rusty) {
    ctx.fillStyle = rusty ? "#c2410c" : "#cbd5e1";
    ctx.fillRect(190, 108, 340, 26);
    ctx.beginPath();
    ctx.arc(176, 121, 22, 0, Math.PI * 2);
    ctx.fill();
    if (rusty) {
      ctx.fillStyle = "#9a3412";
      ctx.beginPath();
      ctx.arc(280, 112, 10, 0, Math.PI * 2);
      ctx.arc(360, 128, 12, 0, Math.PI * 2);
      ctx.arc(450, 114, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawNail() {
    var ctx = nctx;
    var w = nail.width;
    var h = nail.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);
    if (water) {
      ctx.fillStyle = "rgba(56,189,248,0.35)";
      ctx.fillRect(80, 140, w - 160, 70);
      ctx.fillStyle = "#7dd3fc";
      ctx.font = "14px sans-serif";
      ctx.fillText("水", 96, 168);
    }
    if (oxygen) {
      ctx.fillStyle = "#bbf7d0";
      ctx.font = "bold 16px sans-serif";
      ctx.fillText("O₂", 120, 48);
      ctx.fillText("O₂", 560, 64);
    }
    if (electrolyte && water) {
      ctx.fillStyle = "#fde68a";
      ctx.font = "14px sans-serif";
      ctx.fillText("電解質（無用量）", 96, 196);
    }
    var rusty = envReveal && envReveal.rust;
    drawNailShape(ctx, rusty);
    ctx.fillStyle = "#e2e8f0";
    ctx.font = "16px sans-serif";
    ctx.fillText(envReveal ? (envReveal.rust ? "會生鏽" : "不會生鏽") : "尚未判斷", 300, 210);
  }

  function drawGuard() {
    var ctx = gctx;
    var w = guard.width;
    var h = guard.height;
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "14px sans-serif";
    ctx.fillText("假設：有水、有氧　" + METHODS[method].name, 36, 32);
    var show = !!guardReveal;
    var rusty = show && !guardReveal.protected;
    ctx.save();
    ctx.translate(0, -10);
    drawNailShape(ctx, rusty);
    ctx.restore();
    if (show && guardReveal.protected) {
      ctx.strokeStyle = "#4ade80";
      ctx.lineWidth = 4;
      ctx.strokeRect(150, 78, 420, 70);
      ctx.fillStyle = "#bbf7d0";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("受保護", 320, 190);
    } else if (show) {
      ctx.fillStyle = "#fecaca";
      ctx.font = "bold 18px sans-serif";
      ctx.fillText("會生鏽", 320, 190);
    } else {
      ctx.fillStyle = "#e2e8f0";
      ctx.font = "16px sans-serif";
      ctx.fillText("尚未判斷", 310, 190);
    }
  }

  document.getElementById("water").onclick = function () {
    water = !water;
    if (!water) electrolyte = false;
    envReveal = null;
    syncEnvButtons();
  };
  document.getElementById("oxygen").onclick = function () {
    oxygen = !oxygen;
    envReveal = null;
    syncEnvButtons();
  };
  document.getElementById("electrolyte").onclick = function () {
    electrolyte = !electrolyte;
    if (electrolyte) water = true;
    envReveal = null;
    syncEnvButtons();
  };
  document.getElementById("preset-dry").onclick = function () {
    water = false;
    oxygen = true;
    electrolyte = false;
    envReveal = null;
    syncEnvButtons();
    ChemLesson.say("已設為乾燥空氣：有氧、無水。");
  };
  document.getElementById("preset-water").onclick = function () {
    water = true;
    oxygen = false;
    electrolyte = false;
    envReveal = null;
    syncEnvButtons();
    ChemLesson.say("已設為只有水、沒有氧。");
  };
  document.getElementById("preset-wet").onclick = function () {
    water = true;
    oxygen = true;
    electrolyte = false;
    envReveal = null;
    syncEnvButtons();
    ChemLesson.say("已設為潮濕空氣：有水、有氧。");
  };
  function answerRust(guess) {
    var result = judgeRust(water, oxygen, electrolyte, guess);
    envReveal = { rust: willRust(water, oxygen) };
    syncEnvButtons();
    ChemLesson.say(result.message, result.ok ? "ok" : "no");
  }
  document.getElementById("guess-rust").onclick = function () { answerRust(true); };
  document.getElementById("guess-clean").onclick = function () { answerRust(false); };

  Array.prototype.forEach.call(document.querySelectorAll("#methods button"), function (b) {
    b.onclick = function () {
      method = b.getAttribute("data-method");
      situation = "intact";
      guardReveal = null;
      syncMethodButtons();
    };
  });
  document.getElementById("sit-intact").onclick = function () {
    situation = "intact";
    guardReveal = null;
    syncMethodButtons();
  };
  document.getElementById("sit-broken").onclick = function () {
    situation = "broken";
    guardReveal = null;
    syncMethodButtons();
  };
  function answerGuard(guessProtected) {
    var result = judgeProtection(method, situation, guessProtected);
    guardReveal = methodState(method, situation);
    drawGuard();
    ChemLesson.say(result.message, result.ok ? "ok" : "no");
  }
  document.getElementById("guess-safe").onclick = function () { answerGuard(true); };
  document.getElementById("guess-fail").onclick = function () { answerGuard(false); };

  syncEnvButtons();
  syncMethodButtons();
})(typeof window !== "undefined" ? window : global);
