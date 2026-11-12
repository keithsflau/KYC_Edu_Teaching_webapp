(function () {
  function ctx() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!window.__mathSfxCtx) window.__mathSfxCtx = new AC();
    if (window.__mathSfxCtx.state === "suspended") {
      window.__mathSfxCtx.resume();
    }
    return window.__mathSfxCtx;
  }

  function tone(freq, dur, type, when, gain) {
    var audio = ctx();
    if (!audio) return;
    var start = audio.currentTime + (when || 0);
    var osc = audio.createOscillator();
    var amp = audio.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, start);
    amp.gain.setValueAtTime(gain || 0.06, start);
    amp.gain.exponentialRampToValueAtTime(0.001, start + dur);
    osc.connect(amp);
    amp.connect(audio.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  function near(guess, expected) {
    var n = Number(String(guess == null ? "" : guess).replace(/,/g, "").trim());
    var target = Number(expected);
    if (!Number.isFinite(n) || !Number.isFinite(target)) return false;
    var tol = Math.max(0.011, Math.abs(target) * 1e-6);
    return Math.abs(n - target) <= tol;
  }

  var api = {
    near: near,
    correct: function () {
      tone(523.25, 0.12, "sine", 0, 0.07);
      tone(783.99, 0.16, "sine", 0.09, 0.07);
    },
    wrong: function () {
      tone(196, 0.22, "square", 0, 0.035);
    },
    complete: function () {
      tone(523.25, 0.1, "sine", 0, 0.06);
      tone(659.25, 0.1, "sine", 0.11, 0.06);
      tone(783.99, 0.2, "sine", 0.22, 0.07);
    },
    ok: function () {
      this.correct();
      var self = this;
      setTimeout(function () {
        self.complete();
      }, 280);
    }
  };

  window.MathSfx = api;
})();
