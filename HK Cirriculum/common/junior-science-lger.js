/* Junior Science LGER Shell — Learn / Guided / Experiment / Review
   Vanilla + React CDN. Requires React 18, interactive-lab-kit.js optional.
   window.JSLGER = { Footer, LearnPanel, GuidedDrill, ReviewPanel, Shell } */
(function () {
  "use strict";
  if (!window.React) return;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var ACCENT_DEFAULT = "#2563eb";

  function Footer() {
    return React.createElement(
      "footer",
      { className: "text-center py-6 text-slate-400 text-xs border-t border-slate-200/60 mt-8" },
      React.createElement("p", null, "@HKSTEAMAI All Copy-Right Reserved.")
    );
  }

  function LangToggle(_ref) {
    var zh = _ref.zh;
    var setZh = _ref.setZh;
    return React.createElement(
      "button",
      {
        type: "button",
        onClick: function () { setZh(!zh); },
        className: "border border-slate-300 px-3 py-1.5 rounded-lg text-sm font-semibold hover:bg-slate-100 min-h-[44px]"
      },
      zh ? "EN" : "中"
    );
  }


  function t(zh, en, isZh) { return isZh ? zh : en; }


  function localeOpts(step, isZh) {
    if (isZh && step.optsZh) return step.optsZh;
    if (!isZh && step.optsEn) return step.optsEn;
    return step.opts || [];
  }
  function localeAns(step, isZh) {
    if (isZh && step.aZh) return step.aZh;
    if (!isZh && step.aEn) return step.aEn;
    return step.a;
  }
  function localeWhy(step, isZh) {
    if (step.whyZh || step.whyEn) return t(step.whyZh || "", step.whyEn || "", isZh);
    return step.why || "";
  }
  function localeHint(item, isZh) {
    if (item.hintZh || item.hintEn) return t(item.hintZh || "", item.hintEn || "", isZh);
    return item.hint || "";
  }
  /** Option may be string (legacy) or { zh, en }. Answer may be string, {zh,en}, or index. */
  function optText(o, isZh) {
    if (o && typeof o === "object") return t(o.zh || o.en || "", o.en || o.zh || "", isZh);
    return o;
  }
  function optEqual(o, a) {
    if (typeof a === "number") return false;
    if (o && typeof o === "object" && a && typeof a === "object")
      return (o.zh || "") === (a.zh || "") && (o.en || "") === (a.en || "");
    if (o && typeof o === "object") return o.zh === a || o.en === a || optText(o, true) === a || optText(o, false) === a;
    return o === a;
  }
  function isCorrectOpt(o, a, opts, idx) {
    if (typeof a === "number") return idx === a;
    return optEqual(o, a);
  }
  function whyText(step, isZh) {
    if (step.whyZh != null || step.whyEn != null) return t(step.whyZh || "", step.whyEn || "", isZh);
    return step.why || "";
  }
  function hintText(item, isZh) {
    if (item.hintZh != null || item.hintEn != null) return t(item.hintZh || "", item.hintEn || "", isZh);
    return item.hint || "";
  }

  function LearnPanel(_ref) {
    var steps = _ref.steps;
    var accent = _ref.accent || ACCENT_DEFAULT;
    var onComplete = _ref.onComplete;
    var isZh = _ref.isZh;
    var iState = useState(0);
    var i = iState[0];
    var setI = iState[1];
    var pickedState = useState(null);
    var picked = pickedState[0];
    var setPicked = pickedState[1];
    var step = steps[i];
    var last = i === steps.length - 1;

    function pick(opt) { if (picked == null) setPicked(opt); }
    function next() {
      if (last) { if (onComplete) onComplete(); return; }
      setI(i + 1); setPicked(null);
    }

    return React.createElement(
      "section",
      { className: "bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-6" },
      React.createElement(
        "div",
        { className: "flex items-center justify-between mb-3 flex-wrap gap-2" },
        React.createElement(
          "p",
          { className: "text-xs font-black uppercase tracking-widest", style: { color: accent } },
          t("由零開始學", "Learn From Zero", isZh)
        ),
        React.createElement("p", { className: "text-xs text-slate-500" },
          (i + 1) + " / " + steps.length)
      ),
      React.createElement(
        "div",
        { className: "flex gap-1.5 mb-4" },
        steps.map(function (_, k) {
          return React.createElement("div", {
            key: k,
            className: "h-1.5 flex-1 rounded-full",
            style: { background: k <= i ? accent : "#e2e8f0" }
          });
        })
      ),
      React.createElement("h2", { className: "text-xl font-bold" },
        t(step.titleZh, step.titleEn, isZh)),
      React.createElement("p", { className: "text-sm mt-2 text-slate-600 leading-relaxed" },
        t(step.bodyZh, step.bodyEn, isZh)),
      step.q && React.createElement(
        "div",
        { className: "mt-4 p-3 rounded-xl border", style: { background: accent + "11", borderColor: accent + "44" } },
        React.createElement("p", { className: "text-sm font-bold" }, t(step.qZh, step.qEn, isZh)),
        React.createElement(
          "div",
          { className: "grid gap-2 mt-2" },
          (step.opts || []).map(function (o, oi) {
            var cls = "text-left px-3 py-2.5 rounded-xl text-sm border min-h-[44px] ";
            var correct = isCorrectOpt(o, step.a, step.opts, oi);
            var isPick = picked != null && (picked === o || (typeof picked === "number" && picked === oi) || optEqual(picked, o));
            if (picked == null) cls += "bg-white border-slate-200 hover:bg-slate-50";
            else if (correct) cls += "bg-emerald-50 border-emerald-300 font-semibold";
            else if (isPick) cls += "bg-rose-50 border-rose-300";
            else cls += "bg-white border-slate-200 opacity-60";
            return React.createElement("button", {
              key: oi, type: "button", className: cls, onClick: function () { pick(typeof step.a === "number" ? oi : o); }
            }, optText(o, isZh));
          })
        ),
        picked != null && React.createElement(
          "div",
          { className: "mt-3 text-sm p-3 rounded-lg bg-white/80 border border-slate-200" },
          React.createElement("p", { className: "font-semibold" },
            (typeof step.a === "number" ? picked === step.a : optEqual(picked, step.a) || picked === step.a) ? t("✓ 正確", "✓ Correct", isZh) : t("✗ 再想想", "✗ Try again", isZh)),
          whyText(step, isZh) && React.createElement("p", { className: "mt-1 text-slate-600" }, whyText(step, isZh)),
          (typeof step.a === "number" ? picked === step.a : (optEqual(picked, step.a) || picked === step.a)) && React.createElement(
            "button",
            {
              type: "button", onClick: next,
              className: "mt-3 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[44px]",
              style: { background: accent }
            },
            last ? t("開始實驗 →", "Start Experiment →", isZh) : t("下一步 →", "Next →", isZh)
          )
        )
      ),
      !step.q && React.createElement(
        "button",
        {
          type: "button", onClick: next,
          className: "mt-4 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[44px]",
          style: { background: accent }
        },
        last ? t("開始實驗 →", "Start Experiment →", isZh) : t("下一步 →", "Next →", isZh)
      )
    );
  }

  function GuidedDrill(_ref) {
    var bank = _ref.bank;
    var accent = _ref.accent || ACCENT_DEFAULT;
    var isZh = _ref.isZh;
    var onDone = _ref.onDone;
    var qiState = useState(0);
    var qi = qiState[0];
    var setQi = qiState[1];
    var fbState = useState(null);
    var fb = fbState[0];
    var setFb = fbState[1];
    var scoreState = useState(0);
    var score = scoreState[0];
    var setScore = scoreState[1];
    var hintState = useState(false);
    var hint = hintState[0];
    var setHint = hintState[1];
    var item = bank[qi];
    var gOpts = localeOpts(item, isZh);
    var gAns = localeAns(item, isZh);
    var gOpts = localeOpts(item, isZh);
    var gAns = localeAns(item, isZh);

    function pick(opt, idx) {
      if (fb) return;
      var ok = isCorrectOpt(opt, item.a, item.opts, idx);
      setFb(ok ? { ok: true } : { ok: false });
      if (ok) setScore(score + 1);
    }
    function next() {
      setFb(null); setHint(false);
      if (qi + 1 >= bank.length) { if (onDone) onDone(score + (fb && fb.ok ? 0 : 0), bank.length); }
      else setQi(qi + 1);
    }

    return React.createElement(
      "section",
      { className: "bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5" },
      React.createElement(
        "div",
        { className: "flex justify-between text-sm mb-3 text-slate-500" },
        React.createElement("span", null, t("引導練習", "Guided Practice", isZh) + " · " + (qi + 1) + "/" + bank.length),
        React.createElement("span", null, t("得分", "Score", isZh) + " " + score)
      ),
      React.createElement("h2", { className: "text-lg font-bold mb-1" }, t(item.qZh, item.qEn, isZh)),
      React.createElement(
        "div",
        { className: "grid gap-2" },
        item.opts.map(function (o, oi) {
          return React.createElement("button", {
            key: oi, type: "button", disabled: fb && fb.ok,
            onClick: function () { pick(o, oi); },
            className: "text-left px-4 py-3 rounded-xl min-h-[48px] bg-slate-50 hover:bg-slate-100 border border-slate-200 disabled:opacity-50"
          }, optText(o, isZh));
        })
      ),
      (item.hint || item.hintZh || item.hintEn) && React.createElement(
        "button",
        { type: "button", className: "text-sm mt-3 font-semibold min-h-[44px]", style: { color: accent },
          onClick: function () { setHint(true); } },
        t("提示", "Hint", isZh)
      ),
      hint && React.createElement("p", { className: "text-sm mt-1 p-3 rounded-xl bg-amber-50 border border-amber-200" }, hintText(item, isZh)),
      fb && React.createElement(
        "div",
        { className: "mt-4 p-3 rounded-xl text-sm " + (fb.ok ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800") },
        fb.ok ? t("正確！", "Correct!", isZh) : t("再試一次", "Try again", isZh),
        fb.ok && React.createElement(
          "button",
          { type: "button", className: "block mt-2 underline font-semibold", onClick: next },
          qi + 1 >= bank.length ? t("前往複習 →", "Go to Review →", isZh) : t("下一題 →", "Next →", isZh)
        )
      )
    );
  }

  function ReviewPanel(_ref) {
    var summary = _ref.summary;
    var quiz = _ref.quiz;
    var accent = _ref.accent || ACCENT_DEFAULT;
    var isZh = _ref.isZh;
    var qiState = useState(0);
    var qi = qiState[0];
    var setQi = qiState[1];
    var doneState = useState(false);
    var done = doneState[0];
    var setDone = doneState[1];
    var pickedState = useState(null);
    var picked = pickedState[0];
    var setPicked = pickedState[1];
    var correctState = useState(0);
    var correct = correctState[0];
    var setCorrect = correctState[1];
    var item = quiz[qi];

    function pick(opt, idx) {
      if (picked != null) return;
      setPicked(typeof item.a === "number" ? idx : opt);
      if (isCorrectOpt(opt, item.a, item.opts, idx)) setCorrect(correct + 1);
    }
    function next() {
      if (qi + 1 >= quiz.length) setDone(true);
      else { setQi(qi + 1); setPicked(null); }
    }

    return React.createElement(
      "div",
      { className: "space-y-4" },
      React.createElement(
        "section",
        { className: "bg-white border border-slate-200 rounded-2xl p-4 sm:p-5" },
        React.createElement("h2", { className: "font-bold text-lg mb-3", style: { color: accent } },
          t("重點摘要", "Key Summary", isZh)),
        React.createElement(
          "ul",
          { className: "space-y-2 text-sm text-slate-700" },
          summary.map(function (s, k) {
            return React.createElement("li", { key: k, className: "flex gap-2" },
              React.createElement("span", { style: { color: accent } }, "•"),
              t(s.zh, s.en, isZh));
          })
        )
      ),
      !done && React.createElement(
        "section",
        { className: "bg-white border border-slate-200 rounded-2xl p-4 sm:p-5" },
        React.createElement("h2", { className: "font-bold text-lg mb-3" },
          t("自我測驗", "Self-Check Quiz", isZh) + " (" + (qi + 1) + "/" + quiz.length + ")"),
        React.createElement("p", { className: "font-semibold mb-3" }, t(item.qZh, item.qEn, isZh)),
        React.createElement(
          "div",
          { className: "grid gap-2" },
          item.opts.map(function (o, oi) {
            var cls = "text-left px-4 py-3 rounded-xl min-h-[48px] border ";
            var correct = isCorrectOpt(o, item.a, item.opts, oi);
            var isPick = picked != null && (picked === o || picked === oi || optEqual(picked, o));
            if (picked == null) cls += "bg-slate-50 border-slate-200 hover:bg-slate-100";
            else if (correct) cls += "bg-emerald-50 border-emerald-300";
            else if (isPick) cls += "bg-rose-50 border-rose-300";
            else cls += "bg-slate-50 border-slate-200 opacity-50";
            return React.createElement("button", { key: oi, type: "button", className: cls, onClick: function () { pick(o, oi); } }, optText(o, isZh));
          })
        ),
        picked != null && React.createElement(
          "button",
          { type: "button", onClick: next,
            className: "mt-4 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[44px]",
            style: { background: accent } },
          qi + 1 >= quiz.length ? t("查看成績", "See Results", isZh) : t("下一題", "Next", isZh)
        )
      ),
      done && React.createElement(
        "section",
        { className: "bg-white border border-slate-200 rounded-2xl p-6 text-center" },
        React.createElement("h2", { className: "text-2xl font-bold" }, t("複習完成！", "Review Complete!", isZh)),
        React.createElement("p", { className: "mt-2 text-slate-600" },
          correct + " / " + quiz.length + " " + t("題正確", "correct", isZh))
      )
    );
  }

  function Shell(_ref) {
    var meta = _ref.meta;
    var accent = _ref.accent || ACCENT_DEFAULT;
    var learnSteps = _ref.learnSteps;
    var guidedBank = _ref.guidedBank;
    var reviewSummary = _ref.reviewSummary;
    var reviewQuiz = _ref.reviewQuiz;
    var experiment = _ref.experiment;
    var backHref = _ref.backHref || "../index.html";
    var zhState = useState(false);
    var isZh = zhState[0];
    var setZh = zhState[1];
    var modeState = useState("learn");
    var mode = modeState[0];
    var setMode = modeState[1];
    var learnDoneState = useState(function () {
      try { return localStorage.getItem("hkc_js_lger_" + meta.appId) === "1"; } catch (e) { return false; }
    });
    var learnDone = learnDoneState[0];
    var setLearnDone = learnDoneState[1];

    function completeLearn() {
      try { localStorage.setItem("hkc_js_lger_" + meta.appId, "1"); } catch (e) {}
      setLearnDone(true);
      setMode("experiment");
    }

    var tabs = [
      { id: "learn", label: t("學習", "Learn", isZh) },
      { id: "guided", label: t("引導", "Guided", isZh) },
      { id: "experiment", label: learnDone ? t("實驗", "Experiment", isZh) : t("實驗 🔒", "Experiment 🔒", isZh) },
      { id: "review", label: t("複習", "Review", isZh) }
    ];

    return React.createElement(
      "div",
      { className: "max-w-5xl mx-auto p-4 sm:p-6 min-h-screen" },
      React.createElement(
        "header",
        { className: "flex flex-wrap justify-between items-start gap-4 mb-4" },
        React.createElement(
          "div",
          null,
          React.createElement("a", { href: backHref, className: "text-sm font-semibold hover:underline", style: { color: accent } },
            "← " + t("返回", "Back", isZh)),
          React.createElement("p", { className: "text-xs uppercase tracking-widest font-bold mt-2", style: { color: accent } },
            t(meta.unitZh || meta.unit || "", meta.unitEn || meta.unit || "", isZh)),
          React.createElement("h1", { className: "text-2xl sm:text-3xl font-bold mt-1" },
            t(meta.titleZh, meta.titleEn, isZh)),
          React.createElement("p", { className: "text-sm text-slate-500 mt-1" },
            t("學習 → 引導 → 實驗 → 複習", "LGER: Learn → Guided → Experiment → Review", isZh))
        ),
        LangToggle({ zh: isZh, setZh: setZh })
      ),
      React.createElement(
        "nav",
        { className: "flex flex-wrap gap-2 mb-4" },
        tabs.map(function (tab) {
          return React.createElement("button", {
            key: tab.id, type: "button",
            onClick: function () { setMode(tab.id); },
            className: "px-3.5 py-2 rounded-lg text-sm font-semibold min-h-[44px] " +
              (mode === tab.id ? "text-white" : "bg-white border border-slate-200 text-slate-700"),
            style: mode === tab.id ? { background: accent } : {}
          }, tab.label);
        })
      ),
      mode === "learn" && LearnPanel({ steps: learnSteps, accent: accent, onComplete: completeLearn, isZh: isZh }),
      mode === "guided" && GuidedDrill({ bank: guidedBank, accent: accent, isZh: isZh,
        onDone: function () { setMode("review"); } }),
      mode === "experiment" && !learnDone && React.createElement(
        "section",
        { className: "bg-white border border-slate-200 rounded-2xl p-6 text-center" },
        React.createElement("h2", { className: "text-xl font-bold" },
          t("請先完成學習部分", "Complete Learn first", isZh)),
        React.createElement("button", {
          type: "button", onClick: function () { setMode("learn"); },
          className: "mt-4 px-4 py-2.5 rounded-xl font-semibold text-white min-h-[48px]",
          style: { background: accent }
        }, t("前往學習 →", "Go to Learn →", isZh))
      ),
      mode === "experiment" && learnDone && React.createElement(
        "section",
        { className: "bg-white border border-slate-200 shadow-sm rounded-2xl p-4 sm:p-5" },
        React.createElement("h2", { className: "font-bold text-lg mb-3" },
          t("互動實驗室", "Interactive Lab", isZh)),
        experiment({ isZh: isZh, accent: accent })
      ),
      mode === "review" && ReviewPanel({ summary: reviewSummary, quiz: reviewQuiz, accent: accent, isZh: isZh }),
      Footer()
    );
  }

  window.JSLGER = {
    Footer: Footer,
    LearnPanel: LearnPanel,
    GuidedDrill: GuidedDrill,
    ReviewPanel: ReviewPanel,
    Shell: Shell,
    t: t
  };
})();
