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
  var EXPECT = 750;
  var WRONG = [
    { v: 660, why: "660 元把 3 小時加班也用 60 元計算。加班時薪是 60 × 1.5 = 90 元。" },
    { v: 990, why: "990 元把全部 11 小時都乘了 1.5。1.5 倍只用於加班的 3 小時。" },
    { v: 270, why: "270 元只是加班薪金。正常 8 小時的 480 元還要加上。" },
    { v: 480, why: "480 元只是正常工時。加班 3 小時還沒有計算。" }
  ];
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var n = parseNum(document.getElementById("answer").value);
    var i;
    if (n == null) {
      feedback.className = "bad";
      feedback.textContent = "請輸入這一天的總薪金，單位是元。";
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
      feedback.textContent = "總薪金是 750 元。正常 60 × 8 = 480 元，加班 90 × 3 = 270 元。";
      play("ok");
      return;
    }
    feedback.className = "bad";
    feedback.textContent = "還不是。總薪金 = 正常時薪 × 正常時數 + 加班時薪 × 加班時數。";
    play("bad");
  });
})();
