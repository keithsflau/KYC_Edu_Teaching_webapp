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
  var EXPECT = 314;
  var WRONG = [
    { v: 125.6, why: "125.6 是側面積 2πrh。體積要用底面積乘高，也就是 πr²h。" },
    { v: 62.8, why: "62.8 是 πrh，漏了一次半徑。半徑 5 要平方，先變成 25。" },
    { v: 1256, why: "1256 把直徑 10 當成了半徑。題目的 5 cm 已經是半徑。" },
    { v: 78.5, why: "78.5 只是底面積。體積還要乘高 4 cm。" },
    { v: 314.16, why: "題目指定 π = 3.14。用計算機內建的 π 會得到另一個數。" }
  ];
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    var n = parseNum(document.getElementById("answer").value);
    var i;
    if (n == null) {
      feedback.className = "bad";
      feedback.textContent = "請輸入體積，用題目指定的 π = 3.14。";
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
      feedback.textContent = "體積是 314 cm³。底面積是 3.14 × 5² = 78.5 cm²，再乘高 4 cm。";
      play("ok");
      return;
    }
    feedback.className = "bad";
    feedback.textContent = "還不是。圓柱體積 = πr²h。先把半徑平方，再乘 π 和高。這題 π 用 3.14。";
    play("bad");
  });
})();
