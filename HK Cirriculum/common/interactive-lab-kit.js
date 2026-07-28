/* HKC Interactive Lab Kit — shared Teach-From-Zero (TFZ) scaffolding.
   Extracted from the Kc A1-A8 pattern (09_Chemical_Equilibrium_Kc) so every
   flagship lab gets the same ramp: step badge, progress dots, prev/next,
   52px touch targets, zh/en bilingual copy, completion persistence.

   Vanilla JS + self-injected CSS — works in React-CDN apps and legacy
   non-React sims alike. No network, no framework dependency.

   API:
     HKCLabKit.mountLearnFromZero(el, {steps, accent, dark, onComplete, appId})
       steps: [{id:"A1", titleZh, titleEn, bodyZh, bodyEn, html}]
       -> controller {el, goTo, destroy}
     HKCLabKit.mountChallenges(el, {challenges, accent, dark, storageKey, onChange, onAllDone})
       challenges: [{id:"C1", zh, en, hint}]
       -> controller {markDone, isDone, reset, doneCount, el}
     HKCLabKit.mountSubscribeChip(el, {accent, dark})
     HKCLabKit.tfzDone(appId) / HKCLabKit.setTfzDone(appId)
   Alias: window.HkcLabLearnRamp = mountLearnFromZero (ramp marker). */
(function () {
  "use strict";

  var CSS = ''
    + '.lab-learn-ramp,.hkclab-challenges,.hkclab-chip{font-family:"IBM Plex Sans","Outfit","Noto Sans TC",system-ui,sans-serif;box-sizing:border-box}'
    + '.lab-learn-ramp *,.hkclab-challenges *,.hkclab-chip *{box-sizing:border-box}'
    + '.lab-learn-ramp{background:#fff;border:1px solid #e2e8f0;border-radius:24px;padding:24px;box-shadow:0 1px 3px rgba(15,23,42,.08);color:#0f172a}'
    + '.lab-learn-ramp.hkclab-dark{background:rgba(30,41,59,.85);border-color:rgba(255,255,255,.12);color:#f1f5f9;backdrop-filter:blur(12px)}'
    + '.hkclab-toprow{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:16px}'
    + '.hkclab-badge{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;padding:6px 12px;border-radius:8px;color:#fff}'
    + '.hkclab-dots{display:flex;gap:6px;flex-wrap:wrap;margin-left:auto}'
    + '.hkclab-dot{width:10px;height:10px;border-radius:50%;background:#cbd5e1;transition:background .3s}'
    + '.hkclab-dot.hkclab-on{background:currentColor}'
    + '.lab-learn-ramp h2{font-size:22px;font-weight:800;margin:0 0 4px}'
    + '.hkclab-sub{font-size:13px;font-weight:700;opacity:.6;margin:0 0 14px}'
    + '.hkclab-body{font-size:15px;line-height:1.7;font-weight:500;margin:0 0 6px}'
    + '.hkclab-body-en{font-size:13px;line-height:1.6;opacity:.6;margin:0 0 16px;max-width:640px}'
    + '.hkclab-slot{margin:0 0 16px}'
    + '.hkclab-nav{display:flex;flex-wrap:wrap;gap:10px;padding-top:16px;border-top:1px solid rgba(148,163,184,.25)}'
    + '.hkclab-btn{min-height:52px;padding:12px 20px;border-radius:14px;border:1px solid #cbd5e1;background:#fff;color:#334155;font-size:15px;font-weight:700;cursor:pointer;transition:opacity .2s,transform .1s}'
    + '.hkclab-btn:active{transform:scale(.98)}'
    + '.hkclab-btn-primary{border:none;color:#fff;margin-left:auto;box-shadow:0 2px 8px rgba(15,23,42,.15)}'
    + '.hkclab-dark .hkclab-btn{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.18);color:#e2e8f0}'
    + '.hkclab-dark .hkclab-btn-primary{border:none;color:#fff}'
    + '.hkclab-skip{background:none;border:none;color:#94a3b8;font-size:13px;font-weight:600;cursor:pointer;min-height:44px;padding:8px;text-decoration:underline}'
    + '.hkclab-challenges{border-radius:20px;padding:20px;border:1px solid #e2e8f0;background:#fff;color:#0f172a}'
    + '.hkclab-challenges.hkclab-dark{background:rgba(30,41,59,.85);border-color:rgba(255,255,255,.12);color:#f1f5f9;backdrop-filter:blur(12px)}'
    + '.hkclab-challenges h3{margin:0 0 4px;font-size:17px;font-weight:800}'
    + '.hkclab-ch-sub{font-size:12px;opacity:.6;margin:0 0 14px;font-weight:600}'
    + '.hkclab-ch{display:flex;align-items:center;gap:12px;padding:12px;border-radius:14px;border:1px solid rgba(148,163,184,.3);margin-bottom:10px;transition:border-color .3s,background .3s}'
    + '.hkclab-ch.hkclab-done{border-color:#34d399;background:rgba(52,211,153,.1)}'
    + '.hkclab-ch-check{flex:none;width:32px;height:32px;border-radius:50%;border:2px solid #94a3b8;display:flex;align-items:center;justify-content:center;font-weight:900;color:transparent;transition:all .3s}'
    + '.hkclab-done .hkclab-ch-check{background:#10b981;border-color:#10b981;color:#fff}'
    + '.hkclab-ch-txt{flex:1;min-width:0}'
    + '.hkclab-ch-zh{font-weight:700;font-size:14px;display:block}'
    + '.hkclab-ch-en{font-size:12px;opacity:.6;display:block}'
    + '.hkclab-ch-hint{flex:none;font-size:11px;font-weight:700;padding:6px 10px;border-radius:8px;background:rgba(148,163,184,.15);max-width:40%}'
    + '.hkclab-chip{display:inline-flex;align-items:center;gap:10px;padding:10px 16px;border-radius:14px;border:1px solid #e2e8f0;background:#fff;font-size:13px;font-weight:700;color:#334155;box-shadow:0 1px 2px rgba(15,23,42,.06)}'
    + '.hkclab-chip.hkclab-dark{background:rgba(30,41,59,.85);border-color:rgba(255,255,255,.12);color:#e2e8f0}'
    + '.hkclab-chip a{color:inherit;text-decoration:underline;font-weight:800;min-height:44px;display:inline-flex;align-items:center}';

  var cssInjected = false;
  function injectCss() {
    if (cssInjected) return;
    cssInjected = true;
    var s = document.createElement("style");
    s.setAttribute("data-hkclab", "1");
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ---------- TFZ completion persistence ---------- */
  function tfzKey(appId) { return "hkc_tfz_" + (appId || "app") + "_v1"; }
  function tfzDone(appId) {
    try { return localStorage.getItem(tfzKey(appId)) === "1"; } catch (e) { return false; }
  }
  function setTfzDone(appId) {
    try { localStorage.setItem(tfzKey(appId), "1"); } catch (e) {}
  }

  /* ---------- Learn-From-Zero ramp (Kc A1-A8 pattern) ---------- */
  function mountLearnFromZero(container, opts) {
    injectCss();
    opts = opts || {};
    var steps = opts.steps || [];
    var accent = opts.accent || "#4f46e5";
    var dark = !!opts.dark;
    var i = 0;

    var root = el("section", "lab-learn-ramp" + (dark ? " hkclab-dark" : ""));
    root.style.color = accent;

    var top = el("div", "hkclab-toprow");
    var badge = el("span", "hkclab-badge");
    badge.style.background = accent;
    var dots = el("div", "hkclab-dots");
    var dotEls = steps.map(function () {
      var d = el("span", "hkclab-dot");
      d.style.color = accent;
      dots.appendChild(d);
      return d;
    });
    top.appendChild(badge); top.appendChild(dots);

    var h2 = el("h2");
    var sub = el("p", "hkclab-sub");
    var body = el("p", "hkclab-body");
    var bodyEn = el("p", "hkclab-body-en");
    var slot = el("div", "hkclab-slot");

    var nav = el("div", "hkclab-nav");
    var prevBtn = el("button", "hkclab-btn", "← 上一步 Back");
    prevBtn.type = "button";
    var nextBtn = el("button", "hkclab-btn hkclab-btn-primary");
    nextBtn.type = "button";
    nextBtn.style.background = accent;
    nav.appendChild(prevBtn); nav.appendChild(nextBtn);

    root.appendChild(top); root.appendChild(h2); root.appendChild(sub);
    root.appendChild(body); root.appendChild(bodyEn); root.appendChild(slot);
    root.appendChild(nav);
    container.appendChild(root);

    function render() {
      var s = steps[i];
      badge.textContent = "Teach from zero · 第 " + (i + 1) + "/" + steps.length + " 步";
      dotEls.forEach(function (d, k) { d.classList.toggle("hkclab-on", k <= i); });
      h2.textContent = s.titleZh || "";
      sub.textContent = s.titleEn || "";
      body.textContent = s.bodyZh || "";
      bodyEn.textContent = s.bodyEn || "";
      slot.innerHTML = "";
      if (s.html) {
        if (typeof s.html === "function") s.html(slot);
        else slot.innerHTML = s.html;
      }
      prevBtn.style.display = i > 0 ? "" : "none";
      nextBtn.textContent = i < steps.length - 1
        ? (opts.nextLabel || "下一步 Next →")
        : (opts.completeLabel || "完成 Learn · 開始實驗 Start →");
    }
    function finish() {
      if (opts.appId) setTfzDone(opts.appId);
      if (window.HkcSubscribe) {
        window.HkcSubscribe.recordModule({ id: "tfz-ramp", label: "Teach-from-zero ramp", score: 1, total: 1 });
      }
      document.dispatchEvent(new CustomEvent("hkc:tfz-complete", { detail: { appId: opts.appId || "" } }));
      if (typeof opts.onComplete === "function") opts.onComplete();
    }
    prevBtn.addEventListener("click", function () { if (i > 0) { i--; render(); } });
    nextBtn.addEventListener("click", function () {
      if (i < steps.length - 1) { i++; render(); } else { finish(); }
    });

    render();
    return {
      el: root,
      goTo: function (k) { i = Math.max(0, Math.min(steps.length - 1, k)); render(); },
      destroy: function () { root.remove(); }
    };
  }

  /* ---------- Challenge checklist (挑戰關卡) ---------- */
  function mountChallenges(container, opts) {
    injectCss();
    opts = opts || {};
    var challenges = opts.challenges || [];
    var accent = opts.accent || "#0d9488";
    var dark = !!opts.dark;
    var storeKey = opts.storageKey || "hkc_challenges_v1";
    var done = {};
    try { done = JSON.parse(localStorage.getItem(storeKey) || "{}") || {}; } catch (e) { done = {}; }

    var root = el("div", "hkclab-challenges" + (dark ? " hkclab-dark" : ""));
    var h3 = el("h3", null, opts.title || "挑戰關卡 · Challenges");
    h3.style.color = accent;
    if (dark) h3.style.color = "";
    root.appendChild(h3);
    root.appendChild(el("p", "hkclab-ch-sub", opts.subtitle || "用個 lab 完成以下挑戰 · Complete these with the lab"));

    var rows = challenges.map(function (c) {
      var row = el("div", "hkclab-ch");
      row.dataset.cid = c.id;
      var check = el("span", "hkclab-ch-check", "✓");
      var txt = el("div", "hkclab-ch-txt");
      txt.appendChild(el("span", "hkclab-ch-zh", c.zh));
      txt.appendChild(el("span", "hkclab-ch-en", c.en));
      row.appendChild(check); row.appendChild(txt);
      if (c.hint) row.appendChild(el("span", "hkclab-ch-hint", c.hint));
      root.appendChild(row);
      return row;
    });

    container.appendChild(root);

    function persist() {
      try { localStorage.setItem(storeKey, JSON.stringify(done)); } catch (e) {}
    }
    function paint() {
      rows.forEach(function (row, k) {
        row.classList.toggle("hkclab-done", !!done[challenges[k].id]);
      });
    }
    function doneCount() {
      return challenges.filter(function (c) { return done[c.id]; }).length;
    }
    var ctrl = {
      el: root,
      doneCount: doneCount,
      isDone: function (id) { return !!done[id]; },
      markDone: function (id) {
        if (done[id]) return false;
        var c = challenges.filter(function (x) { return x.id === id; })[0];
        done[id] = true;
        persist(); paint();
        if (window.HkcSubscribe && c) {
          window.HkcSubscribe.recordDrill({ correct: true, label: (c.zh || id).slice(0, 48), topic: (c.en || "").slice(0, 80), module: "challenges" });
        }
        if (typeof opts.onChange === "function") opts.onChange(id, doneCount());
        if (doneCount() === challenges.length && typeof opts.onAllDone === "function") opts.onAllDone();
        return true;
      },
      reset: function () { done = {}; persist(); paint(); }
    };
    paint();
    return ctrl;
  }

  /* ---------- Subscribe status chip ---------- */
  function mountSubscribeChip(container, opts) {
    injectCss();
    opts = opts || {};
    var dark = !!opts.dark;
    var chip = el("div", "hkclab-chip" + (dark ? " hkclab-dark" : ""));
    var label = el("span");
    var link = el("a", null, "升級解鎖 Upgrade");
    link.href = (window.HkcBilling && window.HkcBilling.pricingHref && window.HkcBilling.pricingHref())
      || ((window.HKC_SUBSCRIBE || {}).comingSoonHref) || "#payment-links";
    function paint() {
      if (!window.HkcSubscribe) {
        label.textContent = "Free · 免費版";
        return;
      }
      var f = window.HkcSubscribe.features();
      var ent = window.HkcSubscribe.getEntitlement();
      if (f.canDrillUnlimited && !window.HkcSubscribe.isClassroom()) {
        label.textContent = ent.tier + " · unlimited";
        link.style.display = "none";
      } else {
        var r = window.HkcSubscribe.remainingFree();
        label.textContent = "Free · 今日免費 " + (r === Infinity ? "∞" : r) + " 次";
      }
    }
    chip.appendChild(label); chip.appendChild(link);
    container.appendChild(chip);
    document.addEventListener("hkc:progress", paint);
    document.addEventListener("hkc:entitlement", paint);
    paint();
    return { el: chip, repaint: paint };
  }

  window.HKCLabKit = {
    mountLearnFromZero: mountLearnFromZero,
    mountChallenges: mountChallenges,
    mountSubscribeChip: mountSubscribeChip,
    tfzDone: tfzDone,
    setTfzDone: setTfzDone
  };
  /* QA/ramp marker alias (see _tools/qa-check-all.py classify_app). */
  window.HkcLabLearnRamp = mountLearnFromZero;
})();
