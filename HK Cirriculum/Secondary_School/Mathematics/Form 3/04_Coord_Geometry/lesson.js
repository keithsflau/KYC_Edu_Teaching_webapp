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
  var EXPECT = 5;
  var WRONG = [
    { v: 7, why: "3 + 4 = 7 是沿水平和垂直走的總長度，不是兩點的直線距離。" },
    { v: 25, why: "25 是 3² + 4²。距離還要開方，√25 = 5。" },
    { v: 3, why: "3 只是橫坐標差。垂直方向還有 4，要放進畢氏定理。" },
    { v: 4, why: "4 只是縱坐標差。水平方向還有 3。" }
  ];
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var n = parseNum(document.getElementById("answer").value);
    var i;
    if (n == null) {
      feedback.className = "bad";
      feedback.textContent = "請輸入一個數，作為兩點的直線距離。";
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
      feedback.textContent = "距離是 5。水平差 3，垂直差 4，3² + 4² = 25，再開方得 5。";
      play("ok");
      return;
    }
    feedback.className = "bad";
    feedback.textContent = "還不是。先算橫坐標差和縱坐標差，平方後相加，再取正的平方根。";
    play("bad");
  });
})();
