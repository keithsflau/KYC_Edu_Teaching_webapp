/**
 * HK Steam AI — canonical NCS i18n kit (fleet-wide)
 * API: window.NcsI18n — zh-Hant + NCS Five (en, ne, ur, tl, hi)
 *
 * Canonical path: HK Cirriculum/_shared/ncs-i18n.js
 * Fleet copy:     HK Cirriculum/common/ncs-i18n.js (keep in sync)
 * Shim:           ncs-lang.js → NCSLang alias
 *
 * @see NCS_KIT_CANONICAL.md
 */
(function (global) {
  "use strict";

  var STORAGE_KEY = "hksteam.ncs-lang";
  var MESSAGE_TYPE = "hksteam.ncs-lang";
  var LEGACY_KEYS = ["hkc-ncs-lang", "hksteam-ncs-lang", "hkc-lang"];

  var DEFAULT_LANG = "zh-Hant";

  /** @type {Array<{code:string, label:string, native:string, dir:"ltr"|"rtl", group:"base"|"ncs", htmlLang:string}>} */
  var LANGS = [
    {
      code: "zh-Hant",
      label: "Chinese (Traditional)",
      native: "繁體中文",
      dir: "ltr",
      group: "base",
      htmlLang: "zh-HK",
    },
    {
      code: "en",
      label: "English",
      native: "English",
      dir: "ltr",
      group: "ncs",
      htmlLang: "en",
    },
    {
      code: "ne",
      label: "Nepali",
      native: "नेपाली",
      dir: "ltr",
      group: "ncs",
      htmlLang: "ne",
    },
    {
      code: "ur",
      label: "Urdu",
      native: "اردو",
      dir: "rtl",
      group: "ncs",
      htmlLang: "ur",
    },
    {
      code: "tl",
      label: "Filipino (Tagalog)",
      native: "Filipino",
      dir: "ltr",
      group: "ncs",
      htmlLang: "tl",
    },
    {
      code: "hi",
      label: "Hindi",
      native: "हिन्दी",
      dir: "ltr",
      group: "ncs",
      htmlLang: "hi",
    },
  ];

  var LEGACY_ALIASES = {
    zh: "zh-Hant",
    "zh-HK": "zh-Hant",
    "zh-TW": "zh-Hant",
    "zh-CN": "zh-Hant",
    fil: "tl",
  };

  var NCS_FIVE = LANGS.filter(function (l) {
    return l.group === "ncs";
  }).map(function (l) {
    return l.code;
  });

  var langByCode = {};
  LANGS.forEach(function (l) {
    langByCode[l.code] = l;
  });

  var state = {
    lang: DEFAULT_LANG,
    chrome: null,
    hubI18n: null,
    appStrings: {},
    pageStrings: null,
    listeners: [],
    options: {},
    initialized: false,
  };

  var hubReadyPromise = null;

  function isObject(v) {
    return v && typeof v === "object" && !Array.isArray(v);
  }

  function normalizeLang(code) {
    if (!code) return DEFAULT_LANG;
    var c = String(code).trim();
    if (LEGACY_ALIASES[c]) return LEGACY_ALIASES[c];
    var lower = c.toLowerCase();
    if (LEGACY_ALIASES[lower]) return LEGACY_ALIASES[lower];
    if (langByCode[c]) return c;
    return DEFAULT_LANG;
  }

  function langKeyForLookup(lang) {
    var l = normalizeLang(lang);
    if (l === "zh-Hant") return ["zh-Hant", "zh"];
    return [l];
  }

  function getDir(code) {
    var meta = langByCode[normalizeLang(code)];
    return meta ? meta.dir : "ltr";
  }

  function readLangFromQuery() {
    if (!global.location || !global.location.search) return null;
    try {
      var params = new URLSearchParams(global.location.search);
      var q = params.get("lang") || params.get("ncs-lang");
      if (q) return normalizeLang(q);
    } catch (_e) {}
    return null;
  }

  function bindPlatformBridge() {
    if (global.__ncsPlatformBridge) return;
    global.__ncsPlatformBridge = true;

    global.addEventListener("message", function (event) {
      if (!event || event.origin !== global.location.origin) return;
      var data = event.data;
      if (!data || data.type !== MESSAGE_TYPE) return;
      if (typeof data.lang === "string") setLang(data.lang);
    });

    global.addEventListener("storage", function (event) {
      if (!event || event.key !== STORAGE_KEY || !event.newValue) return;
      setLang(event.newValue);
    });
  }

  function readStoredLang() {
    var i;
    try {
      var primary = global.localStorage.getItem(STORAGE_KEY);
      if (primary) return normalizeLang(primary);
    } catch (_e) {}
    for (i = 0; i < LEGACY_KEYS.length; i++) {
      try {
        var legacy = global.localStorage.getItem(LEGACY_KEYS[i]);
        if (!legacy) continue;
        if (LEGACY_KEYS[i] === "hkc-lang") {
          return legacy === "en" ? "en" : "zh-Hant";
        }
        return normalizeLang(legacy);
      } catch (_e2) {}
    }
    return null;
  }

  function writeStoredLang(code) {
    var lang = normalizeLang(code);
    try {
      global.localStorage.setItem(STORAGE_KEY, lang);
    } catch (_e) {}
    try {
      global.localStorage.setItem(
        "hkc-lang",
        lang === "en" ? "en" : "zh"
      );
    } catch (_e2) {}
    try {
      global.localStorage.setItem("hkc-ncs-lang", lang);
    } catch (_e3) {}
  }

  function applyDocumentLang(code) {
    var lang = normalizeLang(code);
    var meta = langByCode[lang] || langByCode[DEFAULT_LANG];
    var dir = meta.dir;
    var html = global.document && global.document.documentElement;
    if (!html) return;
    html.setAttribute("lang", meta.htmlLang);
    html.setAttribute("dir", dir);
    html.classList.toggle("ncs-rtl", dir === "rtl");
    if (global.document.body) {
      global.document.body.dir = dir;
    }
  }

  function mergeStrings(base, extra) {
    var out = {};
    var key;
    for (key in base) {
      if (Object.prototype.hasOwnProperty.call(base, key)) {
        out[key] = base[key];
      }
    }
    for (key in extra) {
      if (!Object.prototype.hasOwnProperty.call(extra, key)) continue;
      if (isObject(extra[key]) && isObject(out[key])) {
        var merged = {};
        var lang;
        for (lang in out[key]) {
          if (Object.prototype.hasOwnProperty.call(out[key], lang)) {
            merged[lang] = out[key][lang];
          }
        }
        for (lang in extra[key]) {
          if (Object.prototype.hasOwnProperty.call(extra[key], lang)) {
            merged[lang] = extra[key][lang];
          }
        }
        out[key] = merged;
      } else {
        out[key] = extra[key];
      }
    }
    return out;
  }

  function normalizeStringRow(row) {
    if (!isObject(row)) return row;
    if (row["zh-Hant"] == null && row.zh != null) row["zh-Hant"] = row.zh;
    if (row.zh == null && row["zh-Hant"] != null) row.zh = row["zh-Hant"];
    return row;
  }

  function ingestAppStrings(dict) {
    if (!dict || typeof dict !== "object") return;
    Object.keys(dict).forEach(function (key) {
      state.appStrings[key] = normalizeStringRow(dict[key]);
    });
  }

  function resolveChromePath(customPath) {
    if (customPath) return customPath;
    var scripts = global.document
      ? global.document.getElementsByTagName("script")
      : [];
    for (var i = scripts.length - 1; i >= 0; i--) {
      var src = scripts[i].src || "";
      if (src.indexOf("ncs-i18n.js") !== -1) {
        return src.replace(/ncs-i18n\.js(?:\?.*)?$/, "ncs-chrome.json");
      }
    }
    return "ncs-chrome.json";
  }

  function loadChrome(path) {
    return fetch(path)
      .then(function (res) {
        if (!res.ok) throw new Error("chrome fetch failed: " + res.status);
        return res.json();
      })
      .then(function (json) {
        state.chrome = json;
        return json;
      });
  }

  function resolveHubPath(customPath) {
    if (customPath) return customPath;
    return resolveChromePath().replace(/ncs-chrome\.json(?:\?.*)?$/, "hub-i18n.json");
  }

  function loadHubI18n(path) {
    if (state.hubI18n) return Promise.resolve(state.hubI18n);
    return fetch(path || resolveHubPath())
      .then(function (res) {
        if (!res.ok) throw new Error("hub fetch failed: " + res.status);
        return res.json();
      })
      .then(function (json) {
        state.hubI18n = json || {};
        return state.hubI18n;
      })
      .catch(function () {
        state.hubI18n = {};
        return state.hubI18n;
      });
  }

  function ensureHub(path) {
    if (!hubReadyPromise) {
      hubReadyPromise = loadHubI18n(path);
    }
    return hubReadyPromise;
  }

  function hubDictToPageStrings(hubDict) {
    var buckets = {};
    if (!hubDict || typeof hubDict !== "object") return buckets;
    Object.keys(hubDict).forEach(function (key) {
      if (key.charAt(0) === "_") return;
      var row = hubDict[key];
      if (!isObject(row)) return;
      Object.keys(row).forEach(function (lang) {
        var bucketKey = lang === "zh-Hant" ? "zh" : lang;
        if (!buckets[bucketKey]) buckets[bucketKey] = {};
        buckets[bucketKey][key] = row[lang];
      });
    });
    return buckets;
  }

  function expandPageStringsNcs(strings) {
    if (!strings || typeof strings !== "object") return strings;
    var out = {};
    Object.keys(strings).forEach(function (k) {
      out[k] = strings[k];
    });
    var enBucket = out.en || {};
    NCS_FIVE.forEach(function (code) {
      if (out[code]) return;
      out[code] = {};
      Object.keys(enBucket).forEach(function (key) {
        out[code][key] = enBucket[key];
      });
    });
    return out;
  }

  function mergePageBuckets(base, overlay) {
    var out = expandPageStringsNcs(base);
    if (!overlay) return out;
    Object.keys(overlay).forEach(function (lang) {
      if (!out[lang]) out[lang] = {};
      Object.keys(overlay[lang]).forEach(function (key) {
        if (overlay[lang][key] != null && overlay[lang][key] !== "") {
          out[lang][key] = overlay[lang][key];
        }
      });
    });
    return out;
  }

  function preparePageStrings(strings) {
    var page = strings || {};
    var hubBuckets = state.hubI18n ? hubDictToPageStrings(state.hubI18n) : {};
    var out = {};

    out.zh = Object.assign({}, hubBuckets.zh || {}, page.zh || {});
    out.en = Object.assign({}, hubBuckets.en || {}, page.en || {});

    var enKeys = Object.keys(out.en);
    NCS_FIVE.forEach(function (code) {
      if (code === "en") return;
      out[code] = {};
      var keys = {};
      Object.keys(hubBuckets[code] || {}).forEach(function (k) {
        keys[k] = true;
      });
      enKeys.forEach(function (k) {
        keys[k] = true;
      });
      Object.keys(keys).forEach(function (key) {
        if (page[code] && page[code][key] != null && page[code][key] !== "") {
          out[code][key] = page[code][key];
        } else if (
          hubBuckets[code] &&
          hubBuckets[code][key] != null &&
          hubBuckets[code][key] !== ""
        ) {
          out[code][key] = hubBuckets[code][key];
        } else if (out.en[key] != null) {
          out[code][key] = out.en[key];
        }
      });
    });

    return out;
  }

  function lookupBucket(bucket, lang) {
    if (!bucket) return null;
    if (typeof bucket === "string") return bucket;
    var keys = langKeyForLookup(lang);
    var i;
    for (i = 0; i < keys.length; i++) {
      if (bucket[keys[i]] != null && bucket[keys[i]] !== "") {
        return bucket[keys[i]];
      }
    }
    if (bucket.en != null && bucket.en !== "") return bucket.en;
    if (bucket["zh-Hant"] != null && bucket["zh-Hant"] !== "") {
      return bucket["zh-Hant"];
    }
    if (bucket.zh != null && bucket.zh !== "") return bucket.zh;
    return null;
  }

  function chromeGet(key, lang) {
    if (!state.chrome || !state.chrome[key]) return null;
    return lookupBucket(state.chrome[key], lang || state.lang);
  }

  function appStringGet(key, lang) {
    var bucket = state.appStrings[key];
    if (!bucket) return null;
    return lookupBucket(bucket, lang);
  }

  function getLangBucket() {
    var l = state.lang;
    return l === "zh-Hant" ? "zh" : l;
  }

  function getPageBucket() {
    if (!state.pageStrings) return null;
    var bucketKey = getLangBucket();
    if (state.pageStrings[bucketKey]) return state.pageStrings[bucketKey];
    var lang = normalizeLang(state.lang);
    if (lang === "zh-Hant") {
      return state.pageStrings.zh || state.pageStrings.en || null;
    }
    return state.pageStrings.en || state.pageStrings.zh || null;
  }

  function pageStringGet(key) {
    var bucket = getPageBucket();
    if (!bucket || bucket[key] == null) return null;
    return bucket[key];
  }

  function resolveKey(key, lang) {
    var fromPage = pageStringGet(key);
    if (fromPage != null) return fromPage;
    var fromApp = appStringGet(key, lang);
    if (fromApp != null) return fromApp;
    var fromChrome = chromeGet(key, lang);
    if (fromChrome != null) return fromChrome;
    return null;
  }

  function tFromDict(dict, key, lang) {
    if (!dict || !dict[key]) return key;
    var val = lookupBucket(dict[key], lang || state.lang);
    return val != null ? val : key;
  }

  function applyDom(lang) {
    var l = normalizeLang(lang || state.lang);
    if (!global.document) return;

    global.document.querySelectorAll("[data-ncs-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-ncs-i18n");
      if (!key) return;
      var val = resolveKey(key, l) || chromeGet(key, l);
      if (val == null) return;
      if (el.hasAttribute("data-ncs-i18n-attr")) {
        el.setAttribute(el.getAttribute("data-ncs-i18n-attr"), val);
      } else {
        el.textContent = val;
      }
    });

    global.document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      var val = resolveKey(key, l);
      if (val != null) el.textContent = val;
    });

    global.document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      var val = resolveKey(key, l);
      if (val != null) el.setAttribute("placeholder", val);
    });

    global.document.querySelectorAll("[data-i18n-title]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-title");
      if (!key) return;
      var val = resolveKey(key, l);
      if (val != null) el.setAttribute("title", val);
    });

    global.document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-aria");
      if (!key) return;
      var val = resolveKey(key, l);
      if (val != null) el.setAttribute("aria-label", val);
    });
  }

  function dispatchEvents(lang, opts) {
    var detail = { lang: lang, meta: langByCode[lang] };
    try {
      global.dispatchEvent(
        new CustomEvent("ncs-lang-change", { detail: detail })
      );
    } catch (_e) {}
    try {
      global.dispatchEvent(
        new CustomEvent("ncs:langchange", { detail: { lang: getLangBucket() } })
      );
    } catch (_e2) {}
    try {
      global.document.dispatchEvent(
        new CustomEvent("hksteam-ncs-lang-change", { detail: detail })
      );
    } catch (_e3) {}
    if (!opts || opts.silent !== true) notify();
  }

  function notify() {
    state.listeners.forEach(function (fn) {
      try {
        fn(state.lang);
      } catch (_e) {
        /* listener error */
      }
    });
  }

  function setLang(code, opts) {
    var lang = normalizeLang(code);
    state.lang = lang;
    writeStoredLang(lang);
    applyDocumentLang(lang);
    applyDom(lang);
    dispatchEvents(lang, opts);
    return lang;
  }

  function getLang() {
    return state.lang;
  }

  function isZh() {
    return normalizeLang(state.lang) === "zh-Hant";
  }

  function toggle() {
    return setLang(isZh() ? "en" : "zh-Hant");
  }

  function onChange(fn) {
    if (typeof fn === "function") state.listeners.push(fn);
    return function unsubscribe() {
      state.listeners = state.listeners.filter(function (f) {
        return f !== fn;
      });
    };
  }

  function globeIcon() {
    var ns = "http://www.w3.org/2000/svg";
    var svg = global.document.createElementNS(ns, "svg");
    svg.setAttribute("class", "ncs-lang-switcher__icon");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("aria-hidden", "true");
    svg.innerHTML =
      '<path fill="currentColor" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm7.93 9h-3.18a15.7 15.7 0 0 0-1.12-4.72A8.03 8.03 0 0 1 19.93 11ZM12 4c.95 1.55 1.62 3.36 1.9 5H10.1c.28-1.64.95-3.45 1.9-5ZM8.35 6.28A15.7 15.7 0 0 0 7.23 11H4.05a8.03 8.03 0 0 1 4.3-4.72ZM4.05 13h3.18c.22 1.64.65 3.2 1.12 4.72A8.03 8.03 0 0 1 4.05 13Zm3.3 5.72c.47-1.52.9-3.08 1.12-4.72h3.17c-.28 1.64-.95 3.45-1.9 5a9.96 9.96 0 0 1-2.39-.28ZM13.1 18c.95-1.55 1.62-3.36 1.9-5h3.77a8.03 8.03 0 0 1-5.67 5Zm5.67-13A8.03 8.03 0 0 0 13.1 6h3.77A8.03 8.03 0 0 0 11.2 5Z"/>';
    return svg;
  }

  function mountLegacyToggle(host) {
    if (!global.document) return null;
    host.innerHTML = "";
    host.classList.add("ncs-lang-slot");
    var btn = global.document.createElement("button");
    btn.type = "button";
    btn.className = "ncs-lang-btn";
    btn.setAttribute("aria-label", "Toggle language");
    btn.textContent = isZh() ? "EN" : "中";
    btn.addEventListener("click", toggle);
    host.appendChild(btn);
    onChange(function () {
      btn.textContent = isZh() ? "EN" : "中";
    });
    return btn;
  }

  function mountSwitcher(target, opts) {
    opts = opts || {};
    if (opts.legacyToggle) {
      var legacyHost =
        typeof target === "string"
          ? global.document.querySelector(target)
          : target;
      if (legacyHost) return mountLegacyToggle(legacyHost);
    }

    var host =
      typeof target === "string"
        ? global.document.querySelector(target)
        : target;
    if (!host) host = global.document.body;

    var position = opts.position || "top";
    var root = global.document.createElement("nav");
    root.className =
      "ncs-lang-root" +
      (opts.inline ? " ncs-lang-root--inline" : "") +
      (position === "bottom" ? " ncs-lang-root--bottom" : "");
    root.setAttribute("data-ncs-lang-root", "true");
    root.setAttribute("role", "navigation");
    root.setAttribute("aria-label", "Language selection");

    var wrap = global.document.createElement("div");
    wrap.className =
      "ncs-lang-switcher" + (opts.dark ? " ncs-lang-switcher--dark" : "");

    var labelId = "ncs-lang-label-" + Math.random().toString(36).slice(2, 8);
    var label = global.document.createElement("span");
    label.className = "ncs-lang-switcher__label";
    label.id = labelId;
    label.textContent =
      resolveKey("language") || chromeGet("language") || "Language";

    var select = global.document.createElement("select");
    select.className = "ncs-lang-switcher__select";
    select.id = "ncs-lang-select";
    select.setAttribute("aria-labelledby", labelId);
    select.setAttribute(
      "aria-label",
      (resolveKey("language") || chromeGet("language") || "Language") +
        " — " +
        (langByCode[state.lang] ? langByCode[state.lang].native : state.lang)
    );

    LANGS.forEach(function (l) {
      var opt = global.document.createElement("option");
      opt.value = l.code;
      opt.textContent = l.native;
      opt.setAttribute("lang", l.htmlLang);
      if (l.dir === "rtl") opt.setAttribute("dir", "rtl");
      select.appendChild(opt);
    });

    select.value = state.lang;
    select.addEventListener("change", function () {
      setLang(select.value);
      var langLabel =
        resolveKey("language") || chromeGet("language") || "Language";
      label.textContent = langLabel;
      var meta = langByCode[state.lang];
      select.setAttribute(
        "aria-label",
        langLabel + " — " + (meta ? meta.native : state.lang)
      );
    });

    wrap.appendChild(globeIcon());
    wrap.appendChild(label);
    wrap.appendChild(select);
    root.appendChild(wrap);
    host.appendChild(root);

    onChange(function () {
      select.value = state.lang;
      label.textContent =
        resolveKey("language") || chromeGet("language") || "Language";
    });

    return { root: root, select: select };
  }

  function resolveMountTarget(mountOption) {
    if (mountOption === false) return null;
    if (typeof mountOption === "string") {
      return global.document.querySelector(mountOption);
    }
    if (mountOption && mountOption.nodeType === 1) return mountOption;
    return global.document.getElementById("ncs-lang-slot");
  }

  function bootSwitcher(mountOption, opts) {
    var target = resolveMountTarget(mountOption);
    if (target) {
      mountSwitcher(target, opts);
      return;
    }
    if (mountOption === false) return;
    var auto = global.document.getElementById("ncs-lang-auto");
    if (!auto) {
      auto = global.document.createElement("div");
      auto.id = "ncs-lang-auto";
      auto.className = "ncs-lang-auto";
      (global.document.body || global.document.documentElement).appendChild(
        auto
      );
    }
    mountSwitcher(auto, { position: "top" });
  }

  function showMtNotice() {
    if (!global.document || global.document.querySelector(".ncs-mt-notice")) {
      return;
    }
    var msg = chromeGet("translationNotice");
    if (!msg) return;
    var el = global.document.createElement("div");
    el.className = "ncs-mt-notice";
    el.setAttribute("role", "note");
    el.textContent = msg;
    global.document.body.appendChild(el);
  }

  function init(options) {
    bindPlatformBridge();
    state.options = options || {};
    var initial = normalizeLang(
      readLangFromQuery() ||
        state.options.lang ||
        state.options.defaultLang ||
        readStoredLang() ||
        DEFAULT_LANG
    );
    state.lang = initial;
    applyDocumentLang(initial);

    if (global.NCSStringsLGER) {
      ingestAppStrings(global.NCSStringsLGER);
    }
    if (state.options.strings) {
      ingestAppStrings(state.options.strings);
    }

    var chromePath = resolveChromePath(state.options.chromePath);
    var chromePromise = state.options.skipChrome
      ? Promise.resolve(null)
      : loadChrome(chromePath).catch(function () {
          state.chrome = {};
          return state.chrome;
        });

    return chromePromise.then(function () {
      applyDom(initial);
      state.initialized = true;

      var mount = state.options.mount;
      if (mount === undefined) {
        mount = state.options.target ? state.options.target : true;
      }

      if (mount !== false) {
        var mountOpts = {
          inline: !!state.options.inline,
          dark: !!state.options.dark,
          position: state.options.position || "top",
        };
        if (state.options.target) {
          mountSwitcher(state.options.target, mountOpts);
        } else {
          bootSwitcher(mount, mountOpts);
        }
      }

      if (state.options.showMtNotice) showMtNotice();
      if (typeof state.options.onReady === "function") {
        state.options.onReady(state.lang);
      }
      dispatchEvents(initial, { silent: true });
      notify();
      return api;
    });
  }

  function extendLegacyDict(dict) {
    if (!dict || typeof dict !== "object") return dict;
    Object.keys(dict).forEach(function (key) {
      var row = dict[key];
      if (!row || typeof row !== "object") return;
      normalizeStringRow(row);
      NCS_FIVE.forEach(function (code) {
        if (row[code] == null) {
          var fromApp = appStringGet(key, code);
          var fromChrome = chromeGet(key, code);
          if (fromApp != null) row[code] = fromApp;
          else if (fromChrome != null) row[code] = fromChrome;
        }
      });
    });
    return dict;
  }

  function registerStrings(strings) {
    state.pageStrings = strings ? preparePageStrings(strings) : null;
  }

  function tk(key) {
    var val = pageStringGet(key);
    return val != null ? val : key;
  }

  function applyDataI18n(root) {
    applyDom(state.lang);
  }

  function resolveHubTitle(title) {
    if (!title) return null;
    if (typeof title === "string") {
      var fromKey = pageStringGet(title);
      return fromKey != null ? fromKey : title;
    }
    var lang = normalizeLang(state.lang);
    var bucket = getLangBucket();
    return (
      title[lang] ||
      title[bucket] ||
      (lang === "zh-Hant" ? title.zh : null) ||
      title.en ||
      title.zh ||
      null
    );
  }

  function applyHubTitle(title) {
    if (!title || !global.document) return;
    var resolved = resolveHubTitle(title);
    if (resolved) global.document.title = resolved;
  }

  function finishInitHub(opts) {
    if (opts.strings) registerStrings(opts.strings);
    if (opts.switcher) mountSwitcher(opts.switcher);
    applyDataI18n(opts.root);
    applyHubTitle(opts.title);
    onChange(function () {
      applyDataI18n(opts.root);
      applyHubTitle(opts.title);
      if (typeof opts.onChange === "function") opts.onChange();
    });
  }

  function initHub(opts) {
    opts = opts || {};
    var lang = readStoredLang() || state.lang || DEFAULT_LANG;
    state.lang = normalizeLang(lang);
    applyDocumentLang(state.lang);
    return ensureHub(opts.hubPath).then(function () {
      finishInitHub(opts);
      return api;
    });
  }

  function t(key, second, third) {
    if (typeof key === "string" && typeof second === "string" && third == null) {
      if (!isZh()) return second || key || "";
      return key || second || "";
    }
    if (typeof key === "string" && second != null && typeof second !== "string") {
      var fromDict = resolveKey(key, second);
      return fromDict != null ? fromDict : key;
    }
    var resolved = resolveKey(key);
    if (resolved != null) return resolved;
    if (typeof second === "string") return second;
    return key;
  }

  var TABS = {
    learn: { zh: "學習", en: "Learn" },
    guided: { zh: "引導", en: "Guided" },
    exam: { zh: "測驗", en: "Exam" },
    lab: { zh: "實驗", en: "Lab" },
    review: { zh: "錯題", en: "Review" },
  };

  function tab(id, isZhMode) {
    var item = TABS[id];
    if (!item) return id;
    return isZhMode ? item.zh : item.en;
  }

  function appTabs(ids, isZhMode, extras) {
    extras = extras || {};
    return (ids || []).map(function (id) {
      var label = tab(id, isZhMode);
      if (id === "lab" && extras.labLocked) label += " \uD83D\uDD12";
      return { id: id, label: label };
    });
  }

  function LangToggle() {
    if (!global.React) return null;
    var useState = global.React.useState;
    var useEffect = global.React.useEffect;
    var st = useState(isZh());
    var zh = st[0];
    var setZh = st[1];
    useEffect(function () {
      function h() {
        setZh(isZh());
      }
      return onChange(h);
    }, []);
    return global.React.createElement("button", {
      type: "button",
      onClick: toggle,
      className: "ncs-lang-btn",
      "aria-label": "Toggle language",
    }, zh ? "EN" : "\u4E2D");
  }

  /** Fixed top-right 6-language switcher for React flagships (replaces LangToggle). */
  function LangSwitcher(opts) {
    if (!global.React) return null;
    var useEffect = global.React.useEffect;
    useEffect(function () {
      var host = global.document.createElement("div");
      host.className = "ncs-lang-slot";
      host.setAttribute("data-ncs-react-switcher", "true");
      global.document.body.appendChild(host);
      mountSwitcher(host, {
        dark: !!(opts && opts.dark),
        inline: !!(opts && opts.inline),
      });
      return function () {
        if (host.parentNode) host.parentNode.removeChild(host);
      };
    }, []);
    return null;
  }

  function useLang() {
    if (!global.React) {
      return {
        isZh: isZh(),
        toggle: toggle,
        t: function (zhStr, enStr) {
          return isZh() ? zhStr || "" : enStr || "";
        },
      };
    }
    var useState = global.React.useState;
    var useEffect = global.React.useEffect;
    var st = useState(isZh());
    var langZh = st[0];
    var setLangZh = st[1];
    useEffect(function () {
      function h() {
        setLangZh(isZh());
      }
      return onChange(h);
    }, []);
    return {
      isZh: langZh,
      toggle: toggle,
      t: function (zhStr, enStr) {
        return langZh ? zhStr || "" : enStr || "";
      },
    };
  }

  var api = {
    VERSION: "2.2.0",
    SWITCHER_POSITION: "top-right",
    LANGS: LANGS,
    langs: LANGS,
    NCS_FIVE: NCS_FIVE,
    codes: LANGS.map(function (l) {
      return l.code;
    }),
    DEFAULT_LANG: DEFAULT_LANG,
    STORAGE_KEY: STORAGE_KEY,
    normalizeLang: normalizeLang,
    init: init,
    getLang: getLang,
    setLang: setLang,
    isZh: isZh,
    toggle: toggle,
    onChange: onChange,
    t: t,
    tk: tk,
    tFromDict: tFromDict,
    lookup: function (entry, lang) {
      var val = lookupBucket(entry, lang || state.lang);
      return val != null ? val : "";
    },
    get: function (key, lang) {
      return t(key, lang);
    },
    applyDom: applyDom,
    applyDOM: applyDom,
    applyDataI18n: applyDataI18n,
    mountSwitcher: mountSwitcher,
    registerStrings: registerStrings,
    mergeStrings: mergeStrings,
    extendLegacyDict: extendLegacyDict,
    initHub: initHub,
    ensureHub: ensureHub,
    resolveHubTitle: resolveHubTitle,
    getDir: getDir,
    isInitialized: function () {
      return state.initialized;
    },
    common: state.chrome,
    LangToggle: LangToggle,
    LangSwitcher: LangSwitcher,
    useLang: useLang,
    tab: tab,
    appTabs: appTabs,
    TABS: TABS,
    COMMON: {
      back: { zh: "\u2190 \u8FD4\u56DE", en: "\u2190 Back" },
      backHub: { zh: "\u2190 \u8FD4\u56DE\u76EE\u9304", en: "\u2190 Back to hub" },
      hint: { zh: "\u63D0\u793A", en: "Hint" },
      next: { zh: "\u4E0B\u4E00\u6B65 \u2192", en: "Next \u2192" },
      retry: { zh: "\u518D\u8A66", en: "Retry" },
      correct: { zh: "\u6B63\u78BA", en: "Correct" },
      complete: { zh: "\u5B8C\u6210", en: "Complete" },
      continue: { zh: "\u7E7C\u7E8C \u2192", en: "Continue \u2192" },
      score: { zh: "\u5206\u6578", en: "Score" },
    },
  };

  global.NcsI18n = api;
  bindPlatformBridge();

  if (global.document && global.document.documentElement) {
    var bootLang = readStoredLang() || DEFAULT_LANG;
    state.lang = normalizeLang(bootLang);
    applyDocumentLang(bootLang);
    hubReadyPromise = loadHubI18n(resolveHubPath());
  }
})(typeof window !== "undefined" ? window : globalThis);
