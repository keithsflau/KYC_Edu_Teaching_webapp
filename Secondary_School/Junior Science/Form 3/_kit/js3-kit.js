/* ===========================================================================
   js3-kit.js — 中三科學 應用共用執行時
   Junior Science Form 3 — shared runtime.

   無框架，純 DOM。冇 CDN、冇瀏覽器端轉譯，所以首次可互動維持喺 100ms 以內。
   No framework, plain DOM. No CDN, no in-browser transpile.

   同時可喺 Node 直接 require（module.exports），俾邏輯測試用。
   Also require()-able in Node so the logic can be tested headlessly.
   =========================================================================== */
(function (global) {
  "use strict";

  var hasDoc = typeof document !== "undefined";

  /* --- 元素建構 ------------------------------------------------------------ */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "class") node.className = v;
        else if (k === "text") node.textContent = v;
        else if (k === "style") node.setAttribute("style", v);
        else if (k.slice(0, 2) === "on" && typeof v === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        } else if (v === true) node.setAttribute(k, "");
        else node.setAttribute(k, v);
      });
    }
    append(node, children);
    return node;
  }

  var NS = "http://www.w3.org/2000/svg";

  function svg(tag, attrs, children) {
    var node = document.createElementNS(NS, tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === null || v === undefined || v === false) return;
        if (k === "text") { node.textContent = v; return; }
        if (k.slice(0, 2) === "on" && typeof v === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), v);
          return;
        }
        node.setAttribute(k, v === true ? "" : v);
      });
    }
    if (children) {
      (Array.isArray(children) ? children : [children]).forEach(function (c) {
        if (c) node.appendChild(c);
      });
    }
    return node;
  }

  function append(node, children) {
    if (children === null || children === undefined || children === false) return;
    if (Array.isArray(children)) { children.forEach(function (c) { append(node, c); }); return; }
    if (children instanceof Node) { node.appendChild(children); return; }
    node.appendChild(document.createTextNode(String(children)));
  }

  function clear(node) { while (node && node.firstChild) node.removeChild(node.firstChild); }
  function mount(node, children) { clear(node); append(node, children); return node; }

  /* --- 語言 ----------------------------------------------------------------
     單一真相來源係 NcsI18n（艦隊語言掣）。冇佢就用本地廣播，
     令 app 喺獨立開啟時仍然可以切換。
     ---------------------------------------------------------------------- */
  function normLang(code) {
    return String(code || "").toLowerCase().indexOf("zh") === 0 ? "zh-Hant" : "en";
  }

  var localLang = "zh-Hant";

  function lang() {
    try {
      if (global.NcsI18n && global.NcsI18n.getLang) return normLang(global.NcsI18n.getLang());
    } catch (e) { /* kit 未起，用本地值 */ }
    return localLang;
  }

  function setLang(code) {
    var next = normLang(code);
    localLang = next;
    try {
      if (global.NcsI18n && global.NcsI18n.setLang) global.NcsI18n.setLang(next);
    } catch (e) { /* 落到本地廣播 */ }
    if (hasDoc) document.documentElement.setAttribute("lang", next);
    broadcast(next);
  }

  function toggleLang() { setLang(lang() === "en" ? "zh-Hant" : "en"); }

  var listeners = [];
  function onLang(fn) {
    listeners.push(fn);
    try {
      if (global.NcsI18n && global.NcsI18n.onChange) {
        global.NcsI18n.onChange(function () { fn(lang()); });
      }
    } catch (e) { /* 本地 listener 仍會由 broadcast 觸發 */ }
    if (global.addEventListener) {
      global.addEventListener("ncs-lang-change", function () { fn(lang()); });
    }
    return function () {
      var i = listeners.indexOf(fn);
      if (i >= 0) listeners.splice(i, 1);
    };
  }

  function broadcast(code) {
    listeners.forEach(function (fn) {
      try { fn(code); } catch (e) { /* 一個壞 listener 唔可以拖冧其他 */ }
    });
  }

  /** 由 {en, "zh-Hant"} 物件揀當前語言。 */
  function L(obj) {
    if (obj === null || obj === undefined) return "";
    if (typeof obj === "string") return obj;
    var k = lang();
    return obj[k] !== undefined ? obj[k] : (obj.en !== undefined ? obj.en : "");
  }

  /* --- 靜態文字綁定 --------------------------------------------------------- */
  function applyStatic(root, dict) {
    var scope = root || document;
    var pick = function (k) { return Object.prototype.hasOwnProperty.call(dict, k) ? dict[k] : null; };
    var pairs = [
      ["[data-i18n]", "data-i18n", function (n, v) { n.textContent = v; }],
      ["[data-i18n-aria]", "data-i18n-aria", function (n, v) { n.setAttribute("aria-label", v); }],
      ["[data-i18n-title]", "data-i18n-title", function (n, v) { n.setAttribute("title", v); }]
    ];
    pairs.forEach(function (p) {
      Array.prototype.forEach.call(scope.querySelectorAll(p[0]), function (n) {
        var v = pick(n.getAttribute(p[1]));
        if (v !== null) p[2](n, v);
      });
    });
  }

  /* --- LGER 階段列 ---------------------------------------------------------- */
  function stageBar(container, stages, onSelect) {
    var buttons = stages.map(function (s, i) {
      var b = el("button", {
        type: "button", class: "js3-stage-btn", role: "tab",
        "aria-selected": "false", "data-stage-id": s.id
      }, [
        el("span", { class: "n", text: String(i + 1) }),
        el("span", { class: "l", "data-i18n": s.labelKey, text: s.labelKey })
      ]);
      b.addEventListener("click", function () { onSelect(s.id); });
      return b;
    });
    mount(container, buttons);
    container.setAttribute("role", "tablist");
    return {
      render: function (active, unlockedSet) {
        buttons.forEach(function (b) {
          var id = b.getAttribute("data-stage-id");
          b.setAttribute("aria-selected", id === active ? "true" : "false");
          b.disabled = !!(unlockedSet && !unlockedSet[id]);
        });
      }
    };
  }

  /* --- 控制零件 ------------------------------------------------------------ */

  /**
   * 滑桿。value 用 step 對齊，onInput 每次拖動都出當前值。
   * label 同讀數分開兩個節點，方便逐節點量度語言切換。
   */
  function slider(opts) {
    var valSpan = el("span", { class: "val", text: opts.format(opts.value) });
    var input = el("input", {
      type: "range",
      min: String(opts.min), max: String(opts.max), step: String(opts.step),
      value: String(opts.value),
      "aria-label": opts.aria || opts.label
    });
    input.addEventListener("input", function () {
      var v = parseFloat(input.value);
      valSpan.textContent = opts.format(v);
      opts.onInput(v);
    });
    return el("div", { class: "js3-ctrl" }, [
      el("label", null, [el("span", { text: opts.label }), valSpan]),
      input
    ]);
  }

  function select(opts) {
    var sel = el("select", { "aria-label": opts.aria || opts.label });
    opts.options.forEach(function (o) {
      sel.appendChild(el("option", { value: o.value, text: o.label, selected: o.value === opts.value }));
    });
    sel.addEventListener("change", function () { opts.onChange(sel.value); });
    return el("div", { class: "js3-ctrl" }, [
      el("label", null, [el("span", { text: opts.label })]),
      sel
    ]);
  }

  function readout(k, v, u, cls) {
    return el("div", { class: "js3-readout" + (cls ? " " + cls : "") }, [
      el("div", { class: "k", text: k }),
      el("div", { class: "v" }, [String(v), u ? el("span", { class: "u", text: u }) : null])
    ]);
  }

  function verdict(kind, glyph, head, body) {
    return el("div", { class: "js3-verdict " + kind }, [
      el("div", { class: "vhead" }, [
        el("span", { class: "vglyph", "aria-hidden": "true", text: glyph }),
        el("span", { text: head })
      ]),
      el("div", { class: "vbody" }, body)
    ]);
  }

  /* --- 數字 ---------------------------------------------------------------- */
  function sig(n, d) {
    if (n === null || n === undefined || !isFinite(n)) return "—";
    var digits = d === undefined ? 2 : d;
    if (n === 0) return "0";
    var a = Math.abs(n);
    if (a >= 1000) return String(Math.round(n));
    if (a >= 100) return n.toFixed(Math.max(0, digits - 1));
    if (a >= 10) return n.toFixed(digits - 1);
    if (a >= 1) return n.toFixed(digits);
    return n.toFixed(digits + 1);
  }

  function clamp(n, lo, hi) { return n < lo ? lo : n > hi ? hi : n; }

  function reducedMotion() {
    try { return global.matchMedia("(prefers-reduced-motion: reduce)").matches; }
    catch (e) { return false; }
  }

  var API = {
    el: el, svg: svg, append: append, clear: clear, mount: mount,
    lang: lang, setLang: setLang, toggleLang: toggleLang, onLang: onLang,
    normLang: normLang, L: L, applyStatic: applyStatic, stageBar: stageBar,
    slider: slider, select: select, readout: readout, verdict: verdict,
    sig: sig, clamp: clamp, reducedMotion: reducedMotion
  };

  global.Js3Kit = API;
  if (typeof module !== "undefined" && module.exports) module.exports = API;
})(typeof window !== "undefined" ? window : this);
