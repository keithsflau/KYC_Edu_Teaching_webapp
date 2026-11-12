(function () {
  if (window.GsSfx) return;
  var ctx = null;
  var lastAt = 0;
  var lastKind = "";

  function audio() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") {
      var pending = ctx.resume();
      if (pending && pending.catch) pending.catch(function () {});
    }
    return ctx;
  }

  function beep(steps) {
    var c = audio();
    if (!c) return;
    var t0 = c.currentTime;
    steps.forEach(function (s) {
      var osc = c.createOscillator();
      var gain = c.createGain();
      osc.type = s.type || "sine";
      osc.frequency.setValueAtTime(s.f, t0 + s.t);
      gain.gain.setValueAtTime(0.0001, t0 + s.t);
      gain.gain.exponentialRampToValueAtTime(s.v || 0.06, t0 + s.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + s.t + s.d);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(t0 + s.t);
      osc.stop(t0 + s.t + s.d + 0.03);
    });
  }

  function play(kind) {
    var now = Date.now();
    if (now - lastAt < 420) return;
    lastKind = kind;
    lastAt = now;
    if (kind === "correct") {
      beep([
        { f: 523.25, t: 0, d: 0.1, v: 0.06 },
        { f: 659.25, t: 0.09, d: 0.11, v: 0.06 },
        { f: 783.99, t: 0.18, d: 0.16, v: 0.05 }
      ]);
    } else if (kind === "wrong") {
      beep([
        { f: 196, t: 0, d: 0.14, v: 0.05, type: "triangle" },
        { f: 146.83, t: 0.12, d: 0.18, v: 0.045, type: "triangle" }
      ]);
    } else if (kind === "complete") {
      beep([
        { f: 523.25, t: 0, d: 0.09, v: 0.055 },
        { f: 659.25, t: 0.1, d: 0.09, v: 0.055 },
        { f: 783.99, t: 0.2, d: 0.09, v: 0.05 },
        { f: 1046.5, t: 0.3, d: 0.2, v: 0.045 }
      ]);
    }
  }

  window.GsSfx = {
    playCorrect: function () { play("correct"); },
    playWrong: function () { play("wrong"); },
    playComplete: function () { play("complete"); },
    unlock: audio
  };

  document.addEventListener("pointerdown", function () { audio(); }, true);

  function classify(line) {
    var s = String(line || "").replace(/\s+/g, "");
    if (!s || s.length > 42) return null;
    if (/答錯|不對|錯誤|再試|步驟錯誤|好像不是|Wrong|TryAgain|Notquite|Incorrect/i.test(s)) return "wrong";
    if (s.length <= 26 && /完成|Completed|Complete!|專家|過關|全對/.test(s)) return "complete";
    if (s.length <= 22 && /答對|正確[！!]|Correct|Yummy|做得好|太棒/.test(s)) return "correct";
    return null;
  }

  var snap = null;
  function scan() {
    var root = document.getElementById("root");
    if (!root) return;
    var lines = (root.innerText || "").split(/\n/).map(function (x) { return x.trim(); }).filter(Boolean);
    if (snap === null) {
      snap = lines;
      return;
    }
    var old = snap;
    snap = lines;
    lines.forEach(function (line) {
      if (old.indexOf(line) !== -1) return;
      var kind = classify(line);
      if (kind) play(kind);
    });
  }

  function boot() {
    scan();
    document.addEventListener("click", function () {
      setTimeout(scan, 40);
      setTimeout(scan, 400);
      setTimeout(scan, 1000);
    }, true);
    var root = document.getElementById("root");
    if (root && window.MutationObserver) {
      new MutationObserver(function () { setTimeout(scan, 30); }).observe(root, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
