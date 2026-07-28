/* HKC Subscribe Gate — localStorage entitlement + progress store.
   No network, no passwords. Free core always works offline. */
(function () {
  "use strict";
  var CFG = window.HKC_SUBSCRIBE || {};
  var appId = CFG.appId || "hkc-app";
  var FREE_LIMIT = CFG.freeDrillLimit || 8;
  var WRONG_LIMIT = CFG.wrongBookLimit || 10;
  var LS_ENT = "hkc_entitlement_v1";
  var LS_PROG = "hkc_progress_" + appId + "_v1";
  var LS_DAY = "hkc_drillday_" + appId + "_v1";

  function read(key, fallback) {
    try { var v = JSON.parse(localStorage.getItem(key)); return v == null ? fallback : v; }
    catch (e) { return fallback; }
  }
  function write(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {} }

  function today() { return new Date().toISOString().slice(0, 10); }

  function getEntitlement() {
    var e = read(LS_ENT, { tier: "free", expires: null });
    if (e.expires && new Date(e.expires) < new Date()) return { tier: "free", expires: null };
    return e;
  }
  function setLocalEntitlement(tier, days) {
    var exp = null;
    if (days) { var d = new Date(); d.setDate(d.getDate() + days); exp = d.toISOString(); }
    write(LS_ENT, { tier: tier, expires: exp });
  }

  function getProgress() {
    return read(LS_PROG, { drillsCorrect: 0, drillsAttempted: 0, modulesCompleted: [], wrongBook: [] });
  }
  function saveProgress(p) { write(LS_PROG, p); }

  function dayCount() {
    var d = read(LS_DAY, { day: today(), n: 0 });
    if (d.day !== today()) { d = { day: today(), n: 0 }; write(LS_DAY, d); }
    return d.n;
  }
  function bumpDay() { write(LS_DAY, { day: today(), n: dayCount() + 1 }); }

  function isClassroom() {
    return /classroom=1/.test(location.search) || read("hkc_classroom_v1", false) === true;
  }
  function isPaidTier() {
    var t = getEntitlement().tier;
    return t === "paid" || t === "trial" || t === "family" || t === "school";
  }
  function features() {
    return {
      canDrillUnlimited: isPaidTier() || isClassroom(),
      fullWrongBook: isPaidTier() || isClassroom(),
      parentDashboard: isPaidTier()
    };
  }
  function canContinueDrills() {
    if (features().canDrillUnlimited) return true;
    return dayCount() < FREE_LIMIT;
  }
  function remainingFree() {
    if (features().canDrillUnlimited) return Infinity;
    return Math.max(0, FREE_LIMIT - dayCount());
  }
  function recordDrill(ev) {
    bumpDay();
    var p = getProgress();
    p.drillsAttempted += 1;
    if (ev && ev.correct) p.drillsCorrect += 1;
    if (ev && !ev.correct && ev.label) {
      p.wrongBook.unshift({ label: ev.label, topic: ev.topic || "", module: ev.module || "practice", at: new Date().toISOString() });
      var cap = features().fullWrongBook ? 200 : WRONG_LIMIT;
      p.wrongBook = p.wrongBook.slice(0, cap);
    }
    saveProgress(p);
    document.dispatchEvent(new CustomEvent("hkc:progress", { detail: { appId: appId } }));
  }
  function recordModule(m) {
    var p = getProgress();
    p.modulesCompleted.unshift({ id: m.id, label: m.label, score: m.score, total: m.total, at: new Date().toISOString() });
    p.modulesCompleted = p.modulesCompleted.slice(0, 60);
    saveProgress(p);
    document.dispatchEvent(new CustomEvent("hkc:progress", { detail: { appId: appId } }));
  }
  function showPaywall(reason) {
    document.dispatchEvent(new CustomEvent("hkc:paywall", { detail: { reason: reason, appId: appId } }));
  }

  function pricingHrefDefault() {
    var cfg = window.HKC_SUBSCRIBE || {};
    if (cfg.comingSoonHref && cfg.comingSoonHref !== "#coming-soon") return cfg.comingSoonHref;
    var path = location.pathname.replace(/\\/g, "/");
    var depth = (path.match(/Secondary_School|Primary_School/g) || []).length;
    var prefix = depth >= 1 ? Array(depth + 3).join("../") : "../";
    return prefix + "pricing/index.html#payment-links";
  }

  function fixComingSoonHref() {
    var cfg = window.HKC_SUBSCRIBE || {};
    if (!cfg.comingSoonHref || cfg.comingSoonHref === "#coming-soon") {
      cfg.comingSoonHref = (window.HkcBilling && window.HkcBilling.pricingHref)
        ? window.HkcBilling.pricingHref()
        : pricingHrefDefault();
    }
  }

  function loadBillingChain() {
    var base = (document.currentScript && document.currentScript.src)
      ? document.currentScript.src.replace(/subscribe-gate\.js.*$/, "")
      : "";
    if (!base) return;
    function load(src, cb) {
      var s = document.createElement("script");
      s.src = base + src;
      s.onload = cb || function () {};
      s.onerror = cb || function () {};
      document.head.appendChild(s);
    }
    load("billing-config.js", function () {
      fixComingSoonHref();
      load("entitlement.js", function () {
        if (window.HkcEntitlement && window.HkcEntitlement.redeemFromUrl) {
          window.HkcEntitlement.redeemFromUrl();
        }
      });
    });
  }

  window.HkcSubscribe = {
    appId: appId,
    config: CFG,
    getEntitlement: getEntitlement,
    setLocalEntitlement: setLocalEntitlement,
    getProgress: getProgress,
    recordDrill: recordDrill,
    recordModule: recordModule,
    features: features,
    isClassroom: isClassroom,
    canContinueDrills: canContinueDrills,
    remainingFree: remainingFree,
    showPaywall: showPaywall,
    pricingHref: pricingHrefDefault,
    openCheckout: function (opts) {
      if (window.HkcBilling && window.HkcBilling.openCheckout) {
        return window.HkcBilling.openCheckout(opts);
      }
      location.href = pricingHrefDefault();
    }
  };

  loadBillingChain();
})();
