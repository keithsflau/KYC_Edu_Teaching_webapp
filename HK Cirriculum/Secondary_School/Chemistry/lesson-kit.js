(function () {
  var ctx = null;
  function audio() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!ctx) ctx = new Ctx();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }
  function tone(freq, dur, type, gain) {
    try {
      var c = audio();
      if (!c) return;
      var o = c.createOscillator();
      var g = c.createGain();
      o.type = type || "sine";
      o.frequency.value = freq;
      g.gain.setValueAtTime(gain || 0.03, c.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
      o.connect(g);
      g.connect(c.destination);
      o.start();
      o.stop(c.currentTime + dur);
    } catch (e) {}
  }
  var api = {
    tick: function () { tone(660, 0.06, "sine", 0.03); },
    ok: function () { tone(880, 0.1, "sine", 0.04); },
    no: function () { tone(196, 0.12, "triangle", 0.03); }
  };
  window.ChemAudio = api;
  window.ChemLesson = {
    say: function (msg, kind) {
      var el = document.getElementById("chem-feedback");
      if (el && msg) el.textContent = msg;
      if (kind === "ok") api.ok();
      else if (kind === "no") api.no();
    }
  };
  document.addEventListener("pointerdown", function (e) {
    var t = e.target && e.target.closest ? e.target.closest("button, a, input, select, [data-chem-hit]") : null;
    if (!t || (t.closest && t.closest("[data-chem-silent]"))) return;
    api.tick();
  }, true);
  if (!document.getElementById("chem-lesson-style")) {
    var style = document.createElement("style");
    style.id = "chem-lesson-style";
    style.textContent = ".chem-learn{margin:12px auto;max-width:960px;padding:12px 16px;border-radius:12px;background:rgba(255,255,255,.94);color:#0f172a;border:1px solid #cbd5e1}.chem-learn h2{margin:0 0 .4rem;font-size:1rem}.chem-learn ul{margin:0;padding-left:1.2rem}.chem-learn li{margin:.15rem 0}#chem-feedback{margin-top:.6rem;padding:.55rem .7rem;border-radius:8px;background:#ecfeff;color:#155e75}";
    document.head.appendChild(style);
  }
})();
