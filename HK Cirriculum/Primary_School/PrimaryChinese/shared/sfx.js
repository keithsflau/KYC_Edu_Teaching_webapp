/* Web Audio feedback. No external files. */
(function () {
  var ctx = null;

  function audio() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(ac, freq, when, dur, type, gain) {
    var osc = ac.createOscillator();
    var amp = ac.createGain();
    osc.type = type || "sine";
    osc.frequency.setValueAtTime(freq, when);
    amp.gain.setValueAtTime(0.0001, when);
    amp.gain.exponentialRampToValueAtTime(gain || 0.07, when + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    osc.connect(amp);
    amp.connect(ac.destination);
    osc.start(when);
    osc.stop(when + dur + 0.03);
  }

  function play(notes) {
    var ac = audio();
    if (!ac) return;
    var t = ac.currentTime + 0.01;
    notes.forEach(function (n) {
      tone(ac, n.f, t + n.at, n.dur, n.type || "sine", n.gain || 0.07);
    });
  }

  window.HKSfx = {
    unlock: audio,
    ok: function () {
      play([
        { f: 523.25, at: 0, dur: 0.12 },
        { f: 659.25, at: 0.12, dur: 0.16 }
      ]);
    },
    bad: function () {
      play([{ f: 174.61, at: 0, dur: 0.22, type: "triangle", gain: 0.08 }]);
    },
    done: function () {
      play([
        { f: 523.25, at: 0, dur: 0.12 },
        { f: 659.25, at: 0.13, dur: 0.12 },
        { f: 783.99, at: 0.26, dur: 0.22 }
      ]);
    }
  };
})();
