(function () {
  "use strict";

  function showFeedback(root, result) {
    if (!root || !result) return;
    root.className = "feedback " + (result.ok ? "ok" : "bad");
    root.replaceChildren();
    (result.messages || []).forEach(function (item) {
      var p = document.createElement("p");
      var zh = document.createElement("strong");
      zh.textContent = item.zh;
      var en = document.createElement("span");
      en.textContent = item.en;
      p.appendChild(zh);
      p.appendChild(en);
      root.appendChild(p);
    });
  }

  function startMeter() {
    function tick() {
      var bar = document.getElementById("meter-bar");
      var analyser = window.GBAudio && window.GBAudio.analyser;
      if (bar && analyser) {
        var data = new Uint8Array(analyser.fftSize);
        analyser.getByteTimeDomainData(data);
        var peak = 0;
        for (var i = 0; i < data.length; i++) peak = Math.max(peak, Math.abs(data[i] - 128));
        bar.style.width = Math.max(8, Math.min(100, peak * 1.5)) + "%";
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  function boot(runLesson) {
    window.addEventListener("error", function (event) {
      var box = document.getElementById("autotest-result");
      if (box && /autotest=1/.test(location.search)) box.textContent = "FAIL " + event.message;
    });
    window.addEventListener("DOMContentLoaded", function () {
      var label = document.getElementById("engine-label");
      if (label && window.GBAudio) {
        var refresh = function () { label.textContent = window.GBAudio.engineLabel(); };
        refresh();
        if (window.speechSynthesis) window.speechSynthesis.addEventListener("voiceschanged", refresh);
      }
      startMeter();
      if (typeof runLesson === "function") runLesson();
      if (!/autotest=1/.test(location.search)) return;
      var box = document.getElementById("autotest-result");
      Promise.resolve()
        .then(function () { return window.GBAudio.selfTest(); })
        .then(function () { return window.__checkLesson ? window.__checkLesson() : null; })
        .then(function () {
          box.textContent = "PASS";
          box.dataset.state = "pass";
        })
        .catch(function (err) {
          box.textContent = "FAIL " + (err && err.message ? err.message : err);
          box.dataset.state = "fail";
        });
    });
  }

  window.LessonPage = { showFeedback: showFeedback, boot: boot };
})();
