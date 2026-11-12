(function () {
  "use strict";

  var audioCtx = null;
  function audioContext() {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!audioCtx) audioCtx = new AC();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }
  function tone(ac, freq, t0, dur, type, gain) {
    var osc = ac.createOscillator();
    var amp = ac.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    amp.gain.setValueAtTime(0.0001, t0);
    amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(amp);
    amp.connect(ac.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }
  function play(kind) {
    var ac = audioContext();
    if (!ac) return;
    var t = ac.currentTime;
    if (kind === "ok") {
      tone(ac, 523.25, t, 0.12, "sine", 0.07);
      tone(ac, 659.25, t + 0.1, 0.14, "sine", 0.07);
      tone(ac, 783.99, t + 0.22, 0.2, "sine", 0.06);
    } else {
      tone(ac, 196, t, 0.18, "square", 0.03);
      tone(ac, 155.56, t + 0.08, 0.2, "square", 0.025);
    }
  }
  function parseNum(raw) {
    var t = String(raw == null ? "" : raw).trim().replace(/\u2212/g, "-").replace(/[０-９]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
    });
    if (!/^-?\d+(\.\d+)?$/.test(t)) return null;
    return Number(t);
  }
  function near(a, b) { return Math.abs(a - b) < 0.051; }

  var feedback = document.getElementById("feedback");
  var buttons = document.querySelectorAll(".choice");
  var solved = false;
  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener("click", function () {
      if (solved) return;
      if (btn.getAttribute("data-ok") === "1") {
        solved = true;
        btn.classList.add("good");
        Array.prototype.forEach.call(buttons, function (b) { b.disabled = true; });
        feedback.className = "ok";
        feedback.textContent = btn.getAttribute("data-why");
        play("ok");
      } else {
        btn.classList.add("bad");
        feedback.className = "bad";
        feedback.textContent = btn.getAttribute("data-why");
        play("bad");
      }
    });
  });
})();
