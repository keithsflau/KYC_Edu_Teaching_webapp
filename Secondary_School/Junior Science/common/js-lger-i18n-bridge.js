/**
 * Junior Science — LGER Shell bridge
 * =================================
 *
 * Replaces `window.JSLGER.Shell` (defined in HK Cirriculum/common/junior-science-lger.js,
 * which this squad may not edit) with a version that fixes two family-wide defects
 * measured in the browser on 2026-08-06 across Form 1–3:
 *
 *  1. DEAD LANGUAGE SWITCH. The original Shell keeps the locale in its own
 *     `useState(false)` and never reads or subscribes to the fleet kit, while each
 *     app's `data-ncs-kit="fleet-init"` block hides the in-app EN/中 button that was
 *     the only thing wired to that state. Result: the visible top-right fleet
 *     switcher flips `NcsI18n.getLang()` and the courseware does not move —
 *     measured at 1-2% of visible text changed on 8 members, reading the DOM a full
 *     frame later (so this is NOT the synchronous-read artifact documented in
 *     I18N_RETROFIT_PLAYBOOK.md; the apps really were dead).
 *     `useState(false)` also meant every app booted in English while the fleet
 *     default is zh-Hant, so the switcher and the page disagreed on first paint.
 *
 *  2. WHITE SCREEN ON TAB SWITCH. The original Shell renders its panels by calling
 *     them (`LearnPanel({...})`) rather than as components. Their hooks therefore
 *     land in Shell's own hook list, and because each tab calls a different panel
 *     with a different number of `useState` calls, moving off "Learn" throws React
 *     error #310 ("rendered more hooks than during the previous render") and
 *     unmounts the whole tree. Verified: clicking "Guided" on Form 1/01_Lab_Safety
 *     left `#root` empty. Rendering via `React.createElement` gives each panel its
 *     own hook scope and fixes it.
 *
 * The panels themselves (LearnPanel / GuidedDrill / ReviewPanel / Footer) are reused
 * unchanged from the fleet file — they already take `isZh` as a prop and already
 * resolve zh/en pairs. Only the shell around them is replaced.
 *
 * Load order: this file is a sync <script> placed immediately after
 * junior-science-lger.js, so `window.JSLGER` exists here and the app's
 * `const { Shell } = window.JSLGER` (which runs later, from the Babel block)
 * picks up this version.
 *
 * Locale policy: zh-Hant is the base content language. The fleet's four NCS
 * locales (ne / ur / tl / hi) have no Junior Science translations, so they fall
 * back to English, which is the intended bridge language for NCS students.
 * Scientific terms — formulae, units, SI symbols, species names — live in the
 * apps' data arrays and are never routed through this bridge.
 */
(function () {
  "use strict";

  if (!window.React || !window.JSLGER) return;

  var React = window.React;
  var J = window.JSLGER;
  var t = J.t;
  var ACCENT_DEFAULT = "#2563eb";

  /* ---------------------------------------------------------------- locale */

  /** zh-Hant is the fleet default, so assume Chinese until the kit says otherwise. */
  function readIsZh() {
    var kit = window.NcsI18n;
    if (!kit || typeof kit.getLang !== "function") return true;
    return String(kit.getLang() || "zh-Hant").indexOf("zh") === 0;
  }

  /**
   * Subscribe to fleet locale changes.
   *
   * Two hazards, both already paid for once by the Maths squad
   * (see Primary_School/Mathematics/common/i18n.js):
   *
   *  - Load-order race. `ncs-i18n.js` is loaded with `defer`, so on a cold cache it
   *    can execute after React has already committed. A bare `if (!window.NcsI18n)
   *    return;` inside an effect with a stable dep list would never retry and the
   *    switch would stay dead for the life of the page. So we retry.
   *  - Orphaned listener. If a second copy of the kit ever executes, the two module
   *    instances keep separate listener lists. The window `ncs-lang-change` event is
   *    dispatched by whichever instance handled `setLang`, so listening on the
   *    window as well means we cannot be attached to the stale one.
   */
  function subscribeLang(onLang) {
    var disposed = false;
    var last = null;

    function emit() {
      if (disposed) return;
      var next = readIsZh();
      if (next === last) return;
      last = next;
      onLang(next);
    }

    window.addEventListener("ncs-lang-change", emit);

    var unsubscribe = null;
    var tries = 0;
    (function attach() {
      if (disposed) return;
      var kit = window.NcsI18n;
      if (!kit || typeof kit.onChange !== "function") {
        if (tries++ > 200) return; // ~10s; the window listener still covers us
        setTimeout(attach, 50);
        return;
      }
      unsubscribe = kit.onChange(emit);
      emit();
    })();

    return function dispose() {
      disposed = true;
      window.removeEventListener("ncs-lang-change", emit);
      if (unsubscribe) unsubscribe();
    };
  }

  /** Drop-in for the original `useState(false)`, but wired to the fleet switcher. */
  function useIsZh() {
    var st = React.useState(readIsZh);
    React.useEffect(function () {
      return subscribeLang(st[1]);
    }, []);
    return st[0];
  }

  /* ----------------------------------------------------------------- shell */

  function Shell(props) {
    var meta = props.meta || {};
    var accent = props.accent || ACCENT_DEFAULT;
    var backHref = props.backHref || "../index.html";
    var experiment = props.experiment;

    var isZh = useIsZh();

    var modeSt = React.useState("learn");
    var mode = modeSt[0];
    var setMode = modeSt[1];

    var learnSt = React.useState(function () {
      try {
        return localStorage.getItem("hkc_js_lger_" + meta.appId) === "1";
      } catch (e) {
        return false;
      }
    });
    var learnDone = learnSt[0];
    var setLearnDone = learnSt[1];

    function completeLearn() {
      try {
        localStorage.setItem("hkc_js_lger_" + meta.appId, "1");
      } catch (e) {}
      setLearnDone(true);
      setMode("experiment");
    }

    var tabs = [
      { id: "learn", label: t("學習", "Learn", isZh) },
      { id: "guided", label: t("引導", "Guided", isZh) },
      { id: "experiment", label: learnDone ? t("實驗", "Experiment", isZh) : t("實驗 🔒", "Experiment 🔒", isZh) },
      { id: "review", label: t("複習", "Review", isZh) }
    ];

    var body = null;
    if (mode === "learn") {
      body = React.createElement(J.LearnPanel, {
        steps: props.learnSteps, accent: accent, onComplete: completeLearn, isZh: isZh
      });
    } else if (mode === "guided") {
      body = React.createElement(J.GuidedDrill, {
        bank: props.guidedBank, accent: accent, isZh: isZh,
        onDone: function () { setMode("review"); }
      });
    } else if (mode === "experiment") {
      body = learnDone
        ? React.createElement(
            "section",
            { className: "bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5" },
            React.createElement("h2", { className: "font-bold text-lg mb-3" },
              t("互動實驗室", "Interactive Lab", isZh)),
            // `experiment` returns an element (`p => <ExperimentLab {...p} />`), so the
            // app's own hooks already get their own scope — no change needed here.
            experiment ? experiment({ isZh: isZh, accent: accent }) : null
          )
        : React.createElement(
            "section",
            { className: "bg-white border border-slate-200 rounded-2xl p-6 text-center" },
            React.createElement("h2", { className: "text-xl font-bold" },
              t("請先完成學習部分", "Complete Learn first", isZh)),
            React.createElement("button", {
              type: "button", onClick: function () { setMode("learn"); },
              className: "mt-4 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[48px]",
              style: { background: accent }
            }, t("前往學習 →", "Go to Learn →", isZh))
          );
    } else if (mode === "review") {
      body = React.createElement(J.ReviewPanel, {
        summary: props.reviewSummary, quiz: props.reviewQuiz, accent: accent, isZh: isZh
      });
    }

    return React.createElement(
      "div",
      { className: "max-w-5xl mx-auto p-4 sm:p-6 min-h-screen" },
      React.createElement(
        "header",
        { className: "flex flex-wrap justify-between items-start gap-4 mb-4" },
        React.createElement(
          "div",
          null,
          React.createElement("a", {
            href: backHref, className: "text-sm font-semibold hover:underline", style: { color: accent }
          }, "← " + t("返回", "Back", isZh)),
          React.createElement("p", {
            className: "text-xs uppercase tracking-widest font-bold mt-2", style: { color: accent }
          }, t(meta.unitZh || meta.unit || "", meta.unitEn || meta.unit || "", isZh)),
          React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold mt-1" },
            t(meta.titleZh, meta.titleEn, isZh)),
          React.createElement("p", { className: "text-sm text-slate-500 mt-1" },
            t("學習 → 引導 → 實驗 → 複習", "LGER: Learn → Guided → Experiment → Review", isZh))
        )
        // No in-app LangToggle: the visible control is the fleet switcher (top-right),
        // and every app's fleet-init block hides in-header EN/中 buttons anyway.
      ),
      React.createElement(
        "nav",
        { className: "flex flex-wrap gap-2 mb-4" },
        tabs.map(function (tab) {
          return React.createElement("button", {
            key: tab.id, type: "button",
            onClick: function () { setMode(tab.id); },
            "aria-current": mode === tab.id ? "page" : undefined,
            className: "px-3.5 py-2 rounded-lg text-sm font-semibold min-h-[44px] " +
              (mode === tab.id ? "text-white" : "bg-white border border-slate-200 text-slate-700"),
            style: mode === tab.id ? { background: accent } : {}
          }, tab.label);
        })
      ),
      body,
      React.createElement(J.Footer, null)
    );
  }

  J.Shell = Shell;
  J.useIsZh = useIsZh;
  J.subscribeLang = subscribeLang;
  J.__bridge = "js-lger-i18n-bridge@1";
})();
