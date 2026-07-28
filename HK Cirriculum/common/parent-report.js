/* HKC Parent Report — floating parent-view summary of local progress.
   Reads window.HkcSubscribe (subscribe-gate.js). Local only, no accounts. */
(function () {
  "use strict";
  function boot() {
    if (!window.HkcSubscribe) return;
    var cfg = window.HKC_SUBSCRIBE || {};
    var fab = document.createElement("button");
    fab.className = "hkc-parent-fab";
    fab.type = "button";
    fab.textContent = "家長進度 · Progress";
    var panel = null;

    function render() {
      var p = window.HkcSubscribe.getProgress();
      var ent = window.HkcSubscribe.getEntitlement();
      var acc = p.drillsAttempted ? Math.round((100 * p.drillsCorrect) / p.drillsAttempted) : 0;
      var el = document.createElement("div");
      el.className = "hkc-parent-panel";
      el.innerHTML =
        '<button type="button" class="hkc-close" aria-label="Close">✕</button>' +
        "<h3>" + (cfg.appNameZh || "") + " · " + (cfg.appNameEn || "") + "</h3>" +
        '<div class="hkc-stat"><span>Plan 計劃</span><b>' + ent.tier + "</b></div>" +
        '<div class="hkc-stat"><span>Drills attempted 已練習</span><b>' + p.drillsAttempted + "</b></div>" +
        '<div class="hkc-stat"><span>Accuracy 正確率</span><b>' + acc + "%</b></div>" +
        '<div class="hkc-stat"><span>Sessions 完成單元</span><b>' + p.modulesCompleted.length + "</b></div>" +
        '<div class="hkc-stat"><span>Wrong book 錯題</span><b>' + p.wrongBook.length + "</b></div>" +
        '<p style="margin:10px 0 0;color:#64748b;font-size:12px">本機數據 · Local data only · ' +
        (cfg.contactEmail || "") + "</p>";
      el.querySelector(".hkc-close").addEventListener("click", function () {
        el.remove(); panel = null;
      });
      return el;
    }

    fab.addEventListener("click", function () {
      if (panel) { panel.remove(); panel = null; return; }
      panel = render();
      document.body.appendChild(panel);
    });
    document.body.appendChild(fab);

    document.addEventListener("hkc:progress", function () {
      if (panel) { panel.remove(); panel = render(); document.body.appendChild(panel); }
    });
    document.addEventListener("hkc:paywall", function () {
      var t = document.createElement("div");
      t.className = "hkc-paywall-toast";
      t.textContent = "今日免費練習已用完 · Free daily limit reached — Upgrade for unlimited";
      document.body.appendChild(t);
      setTimeout(function () { t.remove(); }, 2600);
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
