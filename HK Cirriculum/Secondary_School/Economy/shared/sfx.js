(function () {
  var ctx = null;

  function audioContext() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, offset, dur, type, peak) {
    var context = audioContext();
    if (!context) return;
    var start = context.currentTime + offset;
    var osc = context.createOscillator();
    var gain = context.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(start);
    osc.stop(start + dur + 0.02);
  }

  window.EconomySfx = {
    correct: function () {
      tone(523.25, 0, 0.14, "sine", 0.2);
      tone(659.25, 0.12, 0.16, "sine", 0.18);
      tone(783.99, 0.24, 0.24, "sine", 0.16);
    },
    wrong: function () {
      tone(196, 0, 0.16, "square", 0.06);
      tone(146.83, 0.12, 0.22, "square", 0.05);
    },
    click: function () {
      tone(880, 0, 0.05, "sine", 0.08);
    }
  };
})();
