/* Short Web Audio cues for correct, wrong, and complete. No external files. */
(function (global) {
  "use strict";
  var ctx = null;

  function audio() {
    var AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function beep(freq, start, dur, type, gain) {
    var c = audio();
    if (!c) return;
    var o = c.createOscillator();
    var g = c.createGain();
    var t0 = c.currentTime + start;
    o.type = type || "sine";
    o.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain || 0.06, t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g);
    g.connect(c.destination);
    o.start(t0);
    o.stop(t0 + dur + 0.03);
  }

  global.MathSfx = {
    correct: function () {
      beep(523.25, 0, 0.12, "sine", 0.06);
      beep(659.25, 0.1, 0.16, "sine", 0.06);
    },
    wrong: function () {
      beep(196, 0, 0.18, "triangle", 0.05);
      beep(155, 0.12, 0.2, "triangle", 0.04);
    },
    complete: function () {
      beep(523.25, 0, 0.1, "sine", 0.06);
      beep(659.25, 0.11, 0.1, "sine", 0.06);
      beep(783.99, 0.22, 0.22, "sine", 0.06);
    }
  };
})(window);
