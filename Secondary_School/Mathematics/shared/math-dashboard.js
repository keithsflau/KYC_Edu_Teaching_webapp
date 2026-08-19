/**
 * Static form dashboard — no React/Babel (reliable on GitHub Pages).
 * Expects: #math-dashboard-root, #math-dashboard-config (JSON), optional #math-curriculum (JSON).
 */
(function () {
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function renderAppCard(app, colorBase, cfg) {
    const live = !app.status || app.status === "live";
    const href = live ? esc(app.path) : "#";
    const dark = cfg.theme === "dark";
    const cardCls = live
      ? (cfg.cardClass || "glossy-card") + " cursor-pointer"
      : dark
        ? "bg-slate-800/50 border border-slate-700 opacity-60 cursor-not-allowed"
        : "bg-slate-50 border border-slate-100 opacity-60 cursor-not-allowed";
    const iconCls = live
      ? (dark ? "bg-slate-900/80 shadow-sm " : "bg-white shadow-sm ") + colorBase
      : dark
        ? "bg-slate-800 text-slate-500"
        : "bg-slate-200 text-slate-400";
    const titleCls = live
      ? dark
        ? "text-slate-100 group-hover:text-sky-300 transition-colors"
        : "text-slate-800 group-hover:text-blue-600 transition-colors"
      : dark
        ? "text-slate-500"
        : "text-slate-400";
    const badgeCls = live
      ? dark
        ? "bg-sky-900/60 text-sky-300"
        : "bg-emerald-100 text-emerald-700"
      : dark
        ? "bg-slate-700 text-slate-400"
        : "bg-slate-200 text-slate-500";
    const badgeText = live ? (dark ? "LIVE" : "Active") : "Planned";
    const title = app.title || "App " + app.id;

    return (
      '<a href="' +
      href +
      '" class="block group relative h-full p-5 rounded-2xl transition-all duration-300 ' +
      cardCls +
      '"' +
      (live ? "" : ' onclick="event.preventDefault()"') +
      ">" +
      '<div class="flex justify-between items-start mb-4">' +
      '<div class="w-10 h-10 rounded-xl flex items-center justify-center text-lg ' +
      iconCls +
      '"><i class="fa-solid ' +
      esc(app.icon) +
      '"></i></div>' +
      '<span class="status-badge px-2 py-1 rounded-md font-bold uppercase ' +
      badgeCls +
      '">' +
      badgeText +
      "</span></div>" +
      '<h3 class="font-outfit font-bold text-lg leading-tight mb-1 ' +
      titleCls +
      '">' +
      esc(title) +
      "</h3>" +
      '<p class="text-xs text-slate-400 font-mono">APP-' +
      esc(app.id) +
      "</p></a>"
    );
  }

  function renderUnit(unit, cfg) {
    const dark = cfg.theme === "dark";
    const unitBg = unit.bg || (dark ? "bg-slate-800/40" : "bg-blue-50");
    const unitTitle = unit.title || unit.id;
    const cards = unit.apps.map(function (app) {
      return renderAppCard(app, unit.color, cfg);
    }).join("");

    return (
      '<div class="mb-12">' +
      '<div class="flex items-center gap-3 mb-6 pl-2">' +
      '<div class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-sm ' +
      unitBg +
      " " +
      unit.color +
      " border " +
      unit.border +
      '"><i class="fa-solid ' +
      esc(unit.icon) +
      '"></i></div>' +
      "<div><h2 class=\"font-outfit text-2xl font-bold " +
      (dark ? "text-slate-100" : "text-slate-800") +
      '">' +
      esc(unitTitle) +
      '</h2><div class="h-1 w-20 bg-gradient-to-r ' +
      (dark ? "from-slate-600 to-transparent" : "from-slate-200 to-transparent") +
      ' mt-1 rounded-full"></div></div></div>' +
      '<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">' +
      cards +
      "</div></div>"
    );
  }

  function renderHeader(cfg) {
    const dark = cfg.theme === "dark";
    const badgeBg = cfg.badgeBg || (dark ? "bg-sky-900/50" : "bg-blue-50");
    const badgeText = cfg.badgeText || (dark ? "text-sky-300" : "text-blue-600");
    const badgeBorder = cfg.badgeBorder || (dark ? "border-sky-500/30" : "border-blue-200");
    const badgeDot = cfg.badgeDot || (dark ? "bg-sky-400" : "bg-blue-500");
    const titleGradient = cfg.titleGradient || (dark ? "from-white via-sky-200 to-sky-400" : "from-blue-600 to-indigo-600");
    const headerBg = dark
      ? "relative py-12 px-6 mb-8 text-center border-b border-slate-700/50"
      : "relative py-12 px-6 mb-8 text-center bg-white/50 backdrop-blur-sm border-b border-white/40";
    const titleColor = dark ? "text-white" : "text-slate-900";
    const subtitleColor = dark ? "text-slate-400 font-mono" : "text-slate-500 font-jakarta";
    return (
      '<header class="' + headerBg + '">' +
      (dark ? '<div class="absolute inset-0 bg-gradient-to-b from-sky-900/20 to-transparent pointer-events-none"></div>' : "") +
      '<div class="max-w-4xl mx-auto relative z-10">' +
      '<div class="inline-flex items-center gap-2 px-3 py-1 ' +
      badgeBg +
      " " +
      badgeText +
      " text-xs font-bold uppercase tracking-wider rounded-full mb-4 border " +
      badgeBorder +
      '">' +
      '<span class="w-2 h-2 rounded-full ' +
      badgeDot +
      ' animate-pulse"></span>' +
      esc(cfg.badge) +
      "</div>" +
      '<h1 class="font-outfit text-4xl md:text-6xl font-extrabold ' +
      titleColor +
      ' tracking-tight mb-4">' +
      esc(cfg.titleLead) +
      ' <span class="text-transparent bg-clip-text bg-gradient-to-r ' +
      titleGradient +
      (dark ? ' neon-text">' : '">') +
      esc(cfg.titleAccent) +
      "</span></h1>" +
      '<p class="text-lg ' +
      subtitleColor +
      ' max-w-2xl mx-auto">' +
      esc(cfg.subtitle) +
      "</p></div></header>"
    );
  }

  function init() {
    var root = document.getElementById("math-dashboard-root");
    if (!root) return;

    var cfgEl = document.getElementById("math-dashboard-config");
    var curEl = document.getElementById("math-curriculum");
    if (!cfgEl || !curEl) {
      root.innerHTML =
        '<p class="text-center text-red-600 p-8">Dashboard config missing.</p>';
      return;
    }

    var cfg, curriculum;
    try {
      cfg = JSON.parse(cfgEl.textContent);
      curriculum = JSON.parse(curEl.textContent);
    } catch (e) {
      root.innerHTML =
        '<p class="text-center text-red-600 p-8">Failed to load dashboard data.</p>';
      return;
    }

    var units = curriculum
      .map(function (u) { return renderUnit(u, cfg); })
      .join("");

    root.innerHTML =
      '<div class="min-h-screen pb-20">' +
      renderHeader(cfg) +
      '<main class="container mx-auto px-6 max-w-7xl">' +
      units +
      "</main></div>";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
