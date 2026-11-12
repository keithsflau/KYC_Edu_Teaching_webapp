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
  var EXPECT = 2163.2;
  var WRONG = [
    { v: 2160, why: "2160 元是單利息：2000 + 2000 × 0.04 × 2。複利要把第一年的利息滾入本金。" },
    { v: 2080, why: "2080 元只經過一年。第二年要以 2080 元再乘 1.04。" },
    { v: 163.2, why: "163.2 元只是兩年的利息。題目問的是本利和，要加回 2000 元。" },
    { v: 80, why: "80 元只是一年的利息。兩年複利後，利息和本金要一起算。" },
    { v: 4160, why: "不要把 2000 × 1.04 再乘年數。第二個 1.04 是再乘一次，不是乘 2。" }
  ];
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var n = parseNum(document.getElementById("answer").value);
    var i;
    if (n == null) {
      feedback.className = "bad";
      feedback.textContent = "請輸入本利和，單位是元，可以用小數。";
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
      feedback.textContent = "兩年後本利和是 2163.2 元。第一年變成 2080 元，第二年再乘 1.04。";
      play("ok");
      return;
    }
    feedback.className = "bad";
    feedback.textContent = "還不是。每年複利是本金 × (1 + 年利率) 的年數次方。利率 4% 要寫成 0.04。";
    play("bad");
  });
})();
