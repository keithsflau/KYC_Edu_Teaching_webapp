(function () {
  "use strict";

  function showFeedback(result) {
    var box = document.getElementById("feedback");
    if (!box) return;
    box.className = "feedback " + (result && result.ok ? "ok" : "bad");
    while (box.firstChild) box.removeChild(box.firstChild);
    var messages = (result && result.messages) || [];
    messages.forEach(function (item) {
      var p = document.createElement("p");
      var strong = document.createElement("strong");
      strong.textContent = item.zh || "";
      var span = document.createElement("span");
      span.textContent = item.en || "";
      p.appendChild(strong);
      p.appendChild(span);
      box.appendChild(p);
    });
  }

  function startMeter() {
    function tick() {
      var bar = document.getElementById("meter-bar");
      var node = window.GBAudio && window.GBAudio.analyser;
      if (bar && node) {
        var data = new Uint8Array(node.fftSize);
        node.getByteTimeDomainData(data);
        var peak = 0;
        for (var i = 0; i < data.length; i++) peak = Math.max(peak, Math.abs(data[i] - 128));
        if (peak > 2) bar.style.width = Math.max(8, Math.min(100, peak * 1.5)) + "%";
      }
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(tick);
    }
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(tick);
  }

  function runAuto(extra) {
    var box = document.getElementById("autotest-result");
    if (!box || !/[?&]autotest=1(?:&|$)/.test(location.search)) return;
    Promise.resolve()
      .then(function () { return window.GBAudio.selfTest(); })
      .then(function () { window.HKChecks.selfTestSync(); })
      .then(function () { if (extra) extra(); })
      .then(function () {
        box.textContent = "PASS";
        box.dataset.state = "pass";
      })
      .catch(function (err) {
        box.textContent = "FAIL " + (err && err.message ? err.message : err);
        box.dataset.state = "fail";
      });
  }

  window.LessonShell = {
    showFeedback: showFeedback,
    startMeter: startMeter,
    runAuto: runAuto
  };
})();
