/* HKC Sample UI Kit — reusable patterns from Reference/Sample - 複製
   Vanilla + optional React. Self-injected CSS, no framework dependency.

   Patterns:
     1. Feedback toast (typo_surgeon top-center + 擬人法 achievement variant)
     2. Experiment control bar + progress ring (gel-electrophoresis + flowering-plants)

   API:
     HkcSampleUI.toast({ type, zh, en, isZh, duration, icon, variant })
     HkcSampleUI.ControlBar(props)  — React element when React present
     HkcSampleUI.ProgressRing(props) — SVG ring 0–100
     HkcSampleUI.mountControlBar(el, opts) — vanilla DOM controller */
(function () {
  "use strict";

  var CSS = ""
    + ".hkc-toast-host{position:fixed;top:5.5rem;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;max-width:min(92vw,420px)}"
    + ".hkc-toast{font-family:\"IBM Plex Sans\",\"Outfit\",\"Noto Sans TC\",system-ui,sans-serif;font-size:14px;font-weight:700;color:#fff;padding:12px 18px;border-radius:14px;box-shadow:0 8px 24px rgba(15,23,42,.18);animation:hkc-toast-in .35s ease,hkc-toast-bounce 1s ease .35s 2;pointer-events:auto;text-align:center;line-height:1.45}"
    + ".hkc-toast-success{background:#10b981}.hkc-toast-error{background:#ef4444}.hkc-toast-info{background:#3b82f6}.hkc-toast-warn{background:#f59e0b}"
    + ".hkc-toast-achieve{background:#fff;color:#0f172a;border:2px solid #fbbf24;display:flex;align-items:center;gap:12px;text-align:left;padding:14px 18px;animation:hkc-toast-in .35s ease}"
    + ".hkc-toast-achieve-icon{font-size:28px;line-height:1}.hkc-toast-achieve-sub{font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:#94a3b8}"
    + "@keyframes hkc-toast-in{from{opacity:0;transform:translateY(-12px)}to{opacity:1;transform:translateY(0)}}"
    + "@keyframes hkc-toast-bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-4px)}}"
    + ".hkc-ctrl{font-family:\"IBM Plex Sans\",\"Outfit\",\"Noto Sans TC\",system-ui,sans-serif;box-sizing:border-box}"
    + ".hkc-ctrl *{box-sizing:border-box}"
    + ".hkc-ctrl-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:16px;background:#1e293b;color:#f1f5f9;margin-top:12px}"
    + ".hkc-ctrl-bar-light{background:#fff;color:#0f172a;border:1px solid #e2e8f0;box-shadow:0 1px 3px rgba(15,23,42,.08)}"
    + ".hkc-ctrl-meta{display:flex;align-items:center;gap:12px;min-width:0}"
    + ".hkc-ctrl-label{font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;opacity:.75}"
    + ".hkc-ctrl-actions{display:flex;gap:8px;flex-wrap:wrap;margin-left:auto}"
    + ".hkc-ctrl-btn{min-height:44px;padding:10px 16px;border-radius:12px;border:none;font-size:14px;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:8px;transition:opacity .2s,transform .1s}"
    + ".hkc-ctrl-btn:active{transform:scale(.98)}"
    + ".hkc-ctrl-btn:disabled{opacity:.45;cursor:not-allowed}"
    + ".hkc-ctrl-btn-primary{background:#fff;color:#0f172a}"
    + ".hkc-ctrl-btn-primary-running{background:#22c55e;color:#fff;animation:hkc-pulse 1.2s ease infinite}"
    + ".hkc-ctrl-btn-ghost{background:rgba(255,255,255,.12);color:#e2e8f0;border:1px solid rgba(255,255,255,.18)}"
    + ".hkc-ctrl-bar-light .hkc-ctrl-btn-primary{background:var(--hkc-accent,#2563eb);color:#fff}"
    + ".hkc-ctrl-bar-light .hkc-ctrl-btn-ghost{background:#f1f5f9;color:#334155;border:1px solid #cbd5e1}"
    + "@keyframes hkc-pulse{0%,100%{opacity:1}50%{opacity:.75}}"
    + ".hkc-ring{flex:none}";

  var cssOk = false;
  function injectCss() {
    if (cssOk) return;
    cssOk = true;
    var s = document.createElement("style");
    s.setAttribute("data-hkc-sample-ui", "1");
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  var KIT_STRINGS = {
    zh: {
      feedback: "即時回饋",
      startRun: "開始實驗",
      running: "進行中…",
      reset: "重設",
      simRunning: "模擬進行中",
      labControls: "實驗控制"
    },
    en: {
      feedback: "Feedback",
      startRun: "Start run",
      running: "Running…",
      reset: "Reset",
      simRunning: "Simulation running",
      labControls: "Lab controls"
    }
  };

  function registerKitStrings() {
    if (window.NcsI18n && window.NcsI18n.registerStrings) {
      window.NcsI18n.registerStrings(KIT_STRINGS);
    }
  }

  function resolveIsZh(isZh) {
    if (window.NcsI18n) return window.NcsI18n.isZh();
    return !!isZh;
  }

  function t(zh, en, isZh) {
    if (window.NcsI18n && window.NcsI18n.getLang) {
      var code = window.NcsI18n.getLang();
      if (code === "zh-Hant") return zh || en || "";
      if (code === "en") return en || zh || "";
      return en || zh || "";
    }
    return resolveIsZh(isZh) ? (zh || en) : (en || zh);
  }

  function ui(key, zh, en, isZh) {
    if (window.NcsI18n && window.NcsI18n.tk) {
      var fromKey = window.NcsI18n.tk(key);
      if (fromKey != null && fromKey !== key) return fromKey;
    }
    return t(zh, en, isZh);
  }

  registerKitStrings();
  if (window.NcsI18n && window.NcsI18n.onChange) {
    window.NcsI18n.onChange(registerKitStrings);
  }

  function toastHost() {
    var h = document.getElementById("hkc-toast-host");
    if (!h) {
      h = document.createElement("div");
      h.id = "hkc-toast-host";
      h.className = "hkc-toast-host";
      h.setAttribute("aria-live", "polite");
      document.body.appendChild(h);
    }
    return h;
  }

  /** @param {{type?:string, zh?:string, en?:string, isZh?:boolean, duration?:number, icon?:string, variant?:string}} opts */
  function toast(opts) {
    injectCss();
    opts = opts || {};
    var host = toastHost();
    var msg = t(opts.zh, opts.en, opts.isZh);
    var dur = opts.duration == null ? 2800 : opts.duration;
    var el = document.createElement("div");
    if (opts.variant === "achievement") {
      el.className = "hkc-toast hkc-toast-achieve";
      el.innerHTML = '<span class="hkc-toast-achieve-icon">' + (opts.icon || "🏅") + '</span>'
        + '<div><div class="hkc-toast-achieve-sub">' + ui("feedback", "即時回饋", "Feedback", opts.isZh) + '</div>'
        + '<div>' + msg + '</div></div>';
    } else {
      var type = opts.type || "info";
      el.className = "hkc-toast hkc-toast-" + type;
      el.textContent = msg;
    }
    host.appendChild(el);
    setTimeout(function () {
      el.style.opacity = "0";
      el.style.transition = "opacity .25s";
      setTimeout(function () { el.remove(); }, 260);
    }, dur);
    return el;
  }

  function ringSvg(pct, accent, size) {
    size = size || 44;
    var r = (size - 6) / 2;
    var c = 2 * Math.PI * r;
    var off = c * (1 - Math.min(100, Math.max(0, pct)) / 100);
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "hkc-ring");
    svg.setAttribute("width", String(size));
    svg.setAttribute("height", String(size));
    svg.setAttribute("viewBox", "0 0 " + size + " " + size);
    var track = document.createElementNS(ns, "circle");
    track.setAttribute("cx", String(size / 2));
    track.setAttribute("cy", String(size / 2));
    track.setAttribute("r", String(r));
    track.setAttribute("fill", "none");
    track.setAttribute("stroke", "rgba(148,163,184,.35)");
    track.setAttribute("stroke-width", "4");
    var arc = document.createElementNS(ns, "circle");
    arc.setAttribute("cx", String(size / 2));
    arc.setAttribute("cy", String(size / 2));
    arc.setAttribute("r", String(r));
    arc.setAttribute("fill", "none");
    arc.setAttribute("stroke", accent || "#2563eb");
    arc.setAttribute("stroke-width", "4");
    arc.setAttribute("stroke-linecap", "round");
    arc.setAttribute("stroke-dasharray", String(c));
    arc.setAttribute("stroke-dashoffset", String(off));
    arc.setAttribute("transform", "rotate(-90 " + (size / 2) + " " + (size / 2) + ")");
    svg.appendChild(track);
    svg.appendChild(arc);
    return svg;
  }

  function ProgressRing(props) {
    injectCss();
    props = props || {};
    if (window.React) {
      var pct = props.progress == null ? 0 : props.progress;
      var accent = props.accent || "#2563eb";
      var size = props.size || 44;
      var r = (size - 6) / 2;
      var c = 2 * Math.PI * r;
      var off = c * (1 - Math.min(100, Math.max(0, pct)) / 100);
      return React.createElement("svg", {
        className: "hkc-ring", width: size, height: size, viewBox: "0 0 " + size + " " + size,
        "aria-hidden": true
      },
        React.createElement("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: "rgba(148,163,184,.35)", strokeWidth: 4 }),
        React.createElement("circle", {
          cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: accent, strokeWidth: 4,
          strokeLinecap: "round", strokeDasharray: c, strokeDashoffset: off,
          transform: "rotate(-90 " + (size / 2) + " " + (size / 2) + ")"
        })
      );
    }
    return ringSvg(props.progress, props.accent, props.size);
  }

  function ControlBar(props) {
    injectCss();
    props = props || {};
    var isZh = !!props.isZh;
    var accent = props.accent || "#2563eb";
    var running = !!props.running;
    var progress = props.progress == null ? 0 : props.progress;
    var light = !!props.light;
    var startLbl = props.startLabel || ui("startRun", "開始實驗", "Start run", isZh);
    var runLbl = props.runLabel || ui("running", "進行中…", "Running…", isZh);
    var resetLbl = props.resetLabel || ui("reset", "重設", "Reset", isZh);
    var statusLbl = props.statusLabel || (running
      ? ui("simRunning", "模擬進行中", "Simulation running", isZh)
      : ui("labControls", "實驗控制", "Lab controls", isZh));

    if (window.React) {
      return React.createElement("div", {
        className: "hkc-ctrl hkc-ctrl-bar" + (light ? " hkc-ctrl-bar-light" : ""),
        style: light ? { "--hkc-accent": accent } : {}
      },
        React.createElement("div", { className: "hkc-ctrl-meta" },
          React.createElement(ProgressRing, { progress: running ? progress : 0, accent: accent }),
          React.createElement("div", null,
            React.createElement("div", { className: "hkc-ctrl-label" }, statusLbl),
            running && React.createElement("div", { style: { fontSize: 13, fontWeight: 700 } }, Math.round(progress) + "%")
          )
        ),
        React.createElement("div", { className: "hkc-ctrl-actions" },
          React.createElement("button", {
            type: "button",
            className: "hkc-ctrl-btn " + (running ? "hkc-ctrl-btn-primary hkc-ctrl-btn-primary-running" : "hkc-ctrl-btn-primary"),
            disabled: running || props.startDisabled,
            onClick: props.onStart
          }, running ? runLbl : startLbl),
          React.createElement("button", {
            type: "button", className: "hkc-ctrl-btn hkc-ctrl-btn-ghost", onClick: props.onReset
          }, resetLbl)
        )
      );
    }
    return null;
  }

  function mountControlBar(container, opts) {
    injectCss();
    opts = opts || {};
    var state = { running: false, progress: 0 };
    var root = document.createElement("div");
    root.className = "hkc-ctrl hkc-ctrl-bar" + (opts.light ? " hkc-ctrl-bar-light" : "");
    if (opts.light && opts.accent) root.style.setProperty("--hkc-accent", opts.accent);
    container.appendChild(root);

    function paint() {
      root.innerHTML = "";
      var meta = document.createElement("div");
      meta.className = "hkc-ctrl-meta";
      meta.appendChild(ringSvg(state.running ? state.progress : 0, opts.accent, 44));
      var txt = document.createElement("div");
      var lbl = document.createElement("div");
      lbl.className = "hkc-ctrl-label";
      lbl.textContent = state.running
        ? ui("simRunning", "模擬進行中", "Simulation running", opts.isZh)
        : ui("labControls", "實驗控制", "Lab controls", opts.isZh);
      txt.appendChild(lbl);
      if (state.running) {
        var pct = document.createElement("div");
        pct.style.fontSize = "13px";
        pct.style.fontWeight = "700";
        pct.textContent = Math.round(state.progress) + "%";
        txt.appendChild(pct);
      }
      meta.appendChild(txt);
      root.appendChild(meta);

      var actions = document.createElement("div");
      actions.className = "hkc-ctrl-actions";
      var start = document.createElement("button");
      start.type = "button";
      start.className = "hkc-ctrl-btn hkc-ctrl-btn-primary" + (state.running ? " hkc-ctrl-btn-primary-running" : "");
      start.disabled = state.running;
      start.textContent = state.running ? ui("running", "進行中…", "Running…", opts.isZh) : ui("startRun", "開始實驗", "Start run", opts.isZh);
      start.addEventListener("click", function () {
        if (typeof opts.onStart === "function") opts.onStart(ctrl);
      });
      var reset = document.createElement("button");
      reset.type = "button";
      reset.className = "hkc-ctrl-btn hkc-ctrl-btn-ghost";
      reset.textContent = ui("reset", "重設", "Reset", opts.isZh);
      reset.addEventListener("click", function () {
        state.running = false;
        state.progress = 0;
        paint();
        if (typeof opts.onReset === "function") opts.onReset(ctrl);
      });
      actions.appendChild(start);
      actions.appendChild(reset);
      root.appendChild(actions);
    }

    var ctrl = {
      el: root,
      setRunning: function (v) { state.running = !!v; paint(); },
      setProgress: function (p) { state.progress = p; paint(); },
      get running() { return state.running; },
      get progress() { return state.progress; }
    };
    paint();
    return ctrl;
  }

  window.HkcSampleUI = {
    toast: toast,
    ControlBar: ControlBar,
    ProgressRing: ProgressRing,
    mountControlBar: mountControlBar
  };
})();
