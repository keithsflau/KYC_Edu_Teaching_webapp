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

  var form = document.getElementById("task-form");
  var feedback = document.getElementById("feedback");
  var EXPECT = -3;
  var WRONG = [
    { v: 3, why: "漏了負號。公式是 x = −b/(2a)，不是 b/(2a)。" },
    { v: -6, why: "−6 只是 −b。還要除以 2a。2a = 2，所以是 −6/2。" },
    { v: 6, why: "6 是 b 本身。對稱軸在 y 軸的左方，x 是負數，而且要除以 2a。" },
    { v: -1.5, why: "分母是 2a，不是 4a。−6/2 = −3。" }
  ];
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var n = parseNum(document.getElementById("answer").value);
    var i;
    if (n == null) {
      feedback.className = "bad";
      feedback.textContent = "請輸入對稱軸的 x 值，可以是負數。";
      play("bad");
      return;
    }
    for (i = 0; i < WRONG.length; i += 1) {
      if (near(n, WRONG[i].v)) {
        feedback.className = "bad";
        feedback.textContent = WRONG[i].why;
        play("bad");
        return;
      }
    }
    if (near(n, EXPECT)) {
      feedback.className = "ok";
      feedback.textContent = "對稱軸是 x = −3。a = 1，b = 6，x = −b/(2a) = −6/2 = −3。";
      play("ok");
      return;
    }
    feedback.className = "bad";
    feedback.textContent = "還不是。對稱軸用 x = −b/(2a)。這題 a = 1，b = 6。";
    play("bad");
  });
})();
