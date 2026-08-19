/**
 * HK Steam AI — canonical i18n kit (fleet-wide)
 * API: window.NcsI18n
 *
 * Fleet seven (founder decision, 2026-08-07):
 *   zh-Hant · zh-Hans · en · ja · de · fr · es
 * All seven are left-to-right, so the kit carries no RTL machinery.
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
  /** Where an unknown or retired code lands. Never fail silently into zh-Hant. */
  var FALLBACK_LANG = "en";

  /** @type {Array<{code:string, label:string, native:string, group:"base"|"fleet", htmlLang:string}>} */
  var LANGS = [
    {
      code: "zh-Hant",
      label: "Chinese (Traditional)",
      native: "繁體中文",
      group: "base",
      htmlLang: "zh-HK",
    },
    {
      code: "zh-Hans",
      label: "Chinese (Simplified)",
      native: "简体中文",
      group: "fleet",
      htmlLang: "zh-Hans",
    },
    {
      code: "en",
      label: "English",
      native: "English",
      group: "fleet",
      htmlLang: "en",
    },
    {
      code: "ja",
      label: "Japanese",
      native: "日本語",
      group: "fleet",
      htmlLang: "ja",
    },
    {
      code: "de",
      label: "German",
      native: "Deutsch",
      group: "fleet",
      htmlLang: "de",
    },
    {
      code: "fr",
      label: "French",
      native: "Français",
      group: "fleet",
      htmlLang: "fr",
    },
    {
      code: "es",
      label: "Spanish",
      native: "Español",
      group: "fleet",
      htmlLang: "es",
    },
  ];

  /** Keys are lower-case; lookup lower-cases the incoming code. */
  var LEGACY_ALIASES = {
    zh: "zh-Hant",
    "zh-hk": "zh-Hant",
    "zh-mo": "zh-Hant",
    "zh-tw": "zh-Hant",
    "zh-hant": "zh-Hant",
    "zh-hant-hk": "zh-Hant",
    "zh-hant-tw": "zh-Hant",
    "zh-hans": "zh-Hans",
    "zh-cn": "zh-Hans",
    "zh-sg": "zh-Hans",
    "zh-hans-cn": "zh-Hans",
    "zh-hans-sg": "zh-Hans",
    "ja-jp": "ja",
    "de-de": "de",
    "de-at": "de",
    "de-ch": "de",
    "fr-fr": "fr",
    "fr-be": "fr",
    "fr-ca": "fr",
    "fr-ch": "fr",
    "es-es": "es",
    "es-mx": "es",
    "es-ar": "es",
    "es-419": "es",
    "en-gb": "en",
    "en-us": "en",
    "en-hk": "en",
  };

  /**
   * Codes the fleet used to ship. They still sit in per-app locale objects and
   * in some parents' localStorage, so they must resolve — loudly — instead of
   * silently collapsing into the default language.
   */
  var RETIRED_LANGS = {
    ne: 1,
    ur: 1,
    tl: 1,
    fil: 1,
    hi: 1,
    ar: 1,
    ko: 1,
    fi: 1,
    it: 1,
  };

  var CODES = LANGS.map(function (l) {
    return l.code;
  });

  /** Every fleet language except the base one (zh-Hant). */
  var SECONDARY_LANGS = LANGS.filter(function (l) {
    return l.group !== "base";
  }).map(function (l) {
    return l.code;
  });

  /**
   * Per-language read order inside a `{ "zh-Hant": …, en: … }` bucket.
   * Simplified Chinese reads Traditional far more comfortably than English, so
   * it falls through the Chinese buckets before English.
   */
  var LOOKUP_CHAINS = {
    "zh-Hant": ["zh-Hant", "zh", "zh-HK", "zh-TW", "zh-Hans"],
    "zh-Hans": ["zh-Hans", "zh-CN", "zh-Hant", "zh", "zh-HK"],
  };

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

  /**
   * Resolve a code to a fleet language, or null if it is not one of the seven.
   * Accepts exact codes, the alias table, and bare primary subtags (`de-AT`).
   */
  function matchFleetLang(code) {
    if (!code) return null;
    var c = String(code).trim();
    if (langByCode[c]) return c;
    var lower = c.toLowerCase();
    if (LEGACY_ALIASES[lower]) return LEGACY_ALIASES[lower];
    if (langByCode[lower]) return lower;
    var primary = lower.split(/[-_]/)[0];
    if (LEGACY_ALIASES[primary]) return LEGACY_ALIASES[primary];
    if (langByCode[primary]) return primary;
    return null;
  }

  function isFleetLang(code) {
    return matchFleetLang(code) != null;
  }

  /** Silent resolution for internal reads (metadata, dictionary lookups). */
  function normalizeLang(code) {
    return matchFleetLang(code) || DEFAULT_LANG;
  }

  var warnedCodes = {};

  function warnUnknownLang(raw, source) {
    var key = String(raw);
    if (warnedCodes[key]) return;
    warnedCodes[key] = true;
    var retired = RETIRED_LANGS[key.trim().toLowerCase()] === 1;
    try {
      console.warn(
        "[NcsI18n] " +
          (retired ? "retired" : "unknown") +
          ' language code "' +
          key +
          '"' +
          (source ? " (from " + source + ")" : "") +
          ' — falling back to "' +
          FALLBACK_LANG +
          '". Fleet languages: ' +
          CODES.join(", ")
      );
    } catch (_e) {}
  }

  /**
   * Loud resolution for anything a caller or a stored preference asked for.
   * An unknown code must never disappear into the default language without a
   * word in the console — that is how Arabic stayed unreachable for a month.
   */
  function resolveRequestedLang(code, source) {
    if (code == null || code === "") return DEFAULT_LANG;
    var hit = matchFleetLang(code);
    if (hit) return hit;
    warnUnknownLang(code, source);
    return FALLBACK_LANG;
  }

  function langKeyForLookup(lang) {
    var l = normalizeLang(lang);
    return LOOKUP_CHAINS[l] || [l];
  }

  function readLangFromQuery() {
    if (!global.location || !global.location.search) return null;
    try {
      var params = new URLSearchParams(global.location.search);
      var q = params.get("lang") || params.get("ncs-lang");
      if (q) return resolveRequestedLang(q, "?lang=");
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
      if (primary) return resolveRequestedLang(primary, "stored preference");
    } catch (_e) {}
    for (i = 0; i < LEGACY_KEYS.length; i++) {
      try {
        var legacy = global.localStorage.getItem(LEGACY_KEYS[i]);
        if (!legacy) continue;
        if (LEGACY_KEYS[i] === "hkc-lang") {
          return legacy === "en" ? "en" : "zh-Hant";
        }
        return resolveRequestedLang(legacy, "stored preference");
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
      // Legacy binary key: Chinese of either script reads as "zh".
      global.localStorage.setItem(
        "hkc-lang",
        lang.indexOf("zh") === 0 ? "zh" : "en"
      );
    } catch (_e2) {}
    try {
      global.localStorage.setItem("hkc-ncs-lang", lang);
    } catch (_e3) {}
  }

  // All seven fleet languages are left-to-right, so this only sets `lang`.
  // (The RTL plumbing that used to live here went out with Urdu.)
  function applyDocumentLang(code) {
    var lang = normalizeLang(code);
    var meta = langByCode[lang] || langByCode[DEFAULT_LANG];
    var html = global.document && global.document.documentElement;
    if (!html) return;
    html.setAttribute("lang", meta.htmlLang);
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
    function attempt(url) {
      return fetch(url).then(function (res) {
        if (!res.ok) throw new Error("chrome fetch failed: " + res.status);
        return res.json();
      });
    }
    // Same `common/` vs `_shared/` split as the hub file.
    return attemptInOrder(attempt, sharedFirst(path))
      .then(function (json) {
        state.chrome = json;
        return json;
      });
  }

  function resolveHubPath(customPath) {
    if (customPath) return customPath;
    return resolveChromePath().replace(/ncs-chrome\.json(?:\?.*)?$/, "hub-i18n.json");
  }

  /**
   * This kit is served from two paths (`_shared/` and `common/`) but its data
   * files live only in `_shared/`, so for the `common/` copy the path derived
   * from our own <script src> points at a file that does not exist. An earlier
   * fix tried `common/` first and fell back to `_shared/`:
   * that recovered the data, but the browser had already logged the 404, so
   * every app in the fleet still reported two console errors on every load —
   * which is what four separate squads kept reporting.
   *
   * So try `_shared/` FIRST for any path under `common/`, and keep `common/`
   * as the fallback in case a copy is ever placed there. Paths outside
   * `common/` (including caller-supplied ones) are used exactly as given.
   */
  function sharedFirst(path) {
    if (!path || path.indexOf("/common/") === -1) return [path];
    return [path.replace("/common/", "/_shared/"), path];
  }

  function attemptInOrder(attempt, urls) {
    return urls.reduce(function (chain, url) {
      return chain
        ? chain.catch(function () {
            return attempt(url);
          })
        : attempt(url);
    }, null);
  }

  function loadHubI18n(path) {
    if (state.hubI18n) return Promise.resolve(state.hubI18n);
    var primary = path || resolveHubPath();

    function attempt(url) {
      return fetch(url).then(function (res) {
        if (!res.ok) throw new Error("hub fetch failed: " + res.status);
        return res.json();
      });
    }

    return attemptInOrder(attempt, sharedFirst(primary))
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

  /**
   * Bucket keys, lowest priority first, that a fleet language borrows from when
   * it has no bucket of its own. Simplified Chinese prefers the Traditional
   * bucket — a Chinese reader gets Chinese, not English. Everyone else borrows
   * English only: borrowing Chinese for German would shadow the German chrome
   * string that `resolveKey` would otherwise fall through to.
   */
  function pageBucketSources(code) {
    if (code === "zh-Hans") return ["en", "zh", "zh-Hant"];
    return ["en"];
  }

  function expandPageStrings(strings) {
    if (!strings || typeof strings !== "object") return strings;
    var out = {};
    Object.keys(strings).forEach(function (k) {
      out[k] = strings[k];
    });
    SECONDARY_LANGS.forEach(function (code) {
      if (out[code]) return;
      var bucket = {};
      pageBucketSources(code).forEach(function (src) {
        if (src === code || !isObject(out[src])) return;
        Object.keys(out[src]).forEach(function (key) {
          if (out[src][key] != null && out[src][key] !== "") {
            bucket[key] = out[src][key];
          }
        });
      });
      out[code] = bucket;
    });
    return out;
  }

  function mergePageBuckets(base, overlay) {
    var out = expandPageStrings(base);
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

    SECONDARY_LANGS.forEach(function (code) {
      if (code === "en") return;
      // Lowest priority first: borrowed buckets, then hub, then the page itself.
      var layers = pageBucketSources(code)
        .map(function (src) {
          return out[src];
        })
        .concat([hubBuckets[code], page[code]]);

      var bucket = {};
      layers.forEach(function (layer) {
        if (!isObject(layer)) return;
        Object.keys(layer).forEach(function (key) {
          if (layer[key] != null && layer[key] !== "") bucket[key] = layer[key];
        });
      });
      out[code] = bucket;
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
    if (lang === "zh-Hans") {
      return (
        state.pageStrings.zh || state.pageStrings.en || null
      );
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
    var lang = resolveRequestedLang(code, "setLang");
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

    /* Founder, 2026-08-08, after picking Deutsch and watching only the chrome
       change: 「內容冇變！唔好再錯！已經好多次！」

       He is right, and the fix is honesty: legacy pages carry zh-Hant and en
       CONTENT only. Offering de/fr/es/ja here translated the chrome and left
       the lesson untouched — a picker must never offer a language the content
       cannot deliver. The other five languages ship as static per-language
       files (standard §1d); pages that have them carry their own <a> bar and
       do not use this dropdown. LANGS stays full for code-resolution. */
    LANGS.filter(function (l) {
      return l.code === "zh-Hant" || l.code === "en";
    }).forEach(function (l) {
      var opt = global.document.createElement("option");
      opt.value = l.code;
      opt.textContent = l.native;
      opt.setAttribute("lang", l.htmlLang);
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
    var initial = resolveRequestedLang(
      readLangFromQuery() ||
        state.options.lang ||
        state.options.defaultLang ||
        readStoredLang() ||
        DEFAULT_LANG,
      "init"
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
      SECONDARY_LANGS.forEach(function (code) {
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

  /**
   * Legacy binary helper: callers pass an `isZh` boolean. When the live
   * language is neither Chinese nor English that boolean cannot express the
   * answer, so ask the chrome dictionary first and only then fall back.
   */
  function tab(id, isZhMode) {
    var item = TABS[id];
    var lang = normalizeLang(state.lang);
    if (lang !== "zh-Hant" && lang !== "en") {
      var fromChrome = chromeGet(id, lang);
      if (fromChrome != null) return fromChrome;
    }
    if (!item) return id;
    if (arguments.length < 2) isZhMode = isZh();
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

  /** Fixed top-right seven-language switcher for React flagships (replaces LangToggle). */
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
    VERSION: "3.0.0",
    SWITCHER_POSITION: "top-right",
    LANGS: LANGS,
    langs: LANGS,
    SECONDARY_LANGS: SECONDARY_LANGS,
    codes: CODES,
    DEFAULT_LANG: DEFAULT_LANG,
    FALLBACK_LANG: FALLBACK_LANG,
    STORAGE_KEY: STORAGE_KEY,
    normalizeLang: normalizeLang,
    isFleetLang: isFleetLang,
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
      back: {
        zh: "\u2190 \u8FD4\u56DE",
        "zh-Hans": "\u2190 \u8FD4\u56DE",
        en: "\u2190 Back",
        ja: "\u2190 \u623B\u308B",
        de: "\u2190 Zur\u00FCck",
        fr: "\u2190 Retour",
        es: "\u2190 Atr\u00E1s",
      },
      backHub: {
        zh: "\u2190 \u8FD4\u56DE\u76EE\u9304",
        "zh-Hans": "\u2190 \u8FD4\u56DE\u76EE\u5F55",
        en: "\u2190 Back to hub",
        ja: "\u2190 \u4E00\u89A7\u306B\u623B\u308B",
        de: "\u2190 Zur\u00FCck zur \u00DCbersicht",
        fr: "\u2190 Retour au sommaire",
        es: "\u2190 Volver al \u00EDndice",
      },
      hint: {
        zh: "\u63D0\u793A",
        "zh-Hans": "\u63D0\u793A",
        en: "Hint",
        ja: "\u30D2\u30F3\u30C8",
        de: "Tipp",
        fr: "Indice",
        es: "Pista",
      },
      next: {
        zh: "\u4E0B\u4E00\u6B65 \u2192",
        "zh-Hans": "\u4E0B\u4E00\u6B65 \u2192",
        en: "Next \u2192",
        ja: "\u6B21\u3078 \u2192",
        de: "Weiter \u2192",
        fr: "Suivant \u2192",
        es: "Siguiente \u2192",
      },
      retry: {
        zh: "\u518D\u8A66",
        "zh-Hans": "\u518D\u8BD5",
        en: "Retry",
        ja: "\u3082\u3046\u4E00\u5EA6",
        de: "Wiederholen",
        fr: "R\u00E9essayer",
        es: "Reintentar",
      },
      correct: {
        zh: "\u6B63\u78BA",
        "zh-Hans": "\u6B63\u786E",
        en: "Correct",
        ja: "\u6B63\u89E3",
        de: "Richtig",
        fr: "Correct",
        es: "Correcto",
      },
      complete: {
        zh: "\u5B8C\u6210",
        "zh-Hans": "\u5B8C\u6210",
        en: "Complete",
        ja: "\u5B8C\u4E86",
        de: "Fertig",
        fr: "Termin\u00E9",
        es: "Completado",
      },
      continue: {
        zh: "\u7E7C\u7E8C \u2192",
        "zh-Hans": "\u7EE7\u7EED \u2192",
        en: "Continue \u2192",
        ja: "\u7D9A\u3051\u308B \u2192",
        de: "Weiter \u2192",
        fr: "Continuer \u2192",
        es: "Continuar \u2192",
      },
      score: {
        zh: "\u5206\u6578",
        "zh-Hans": "\u5206\u6570",
        en: "Score",
        ja: "\u30B9\u30B3\u30A2",
        de: "Punkte",
        fr: "Score",
        es: "Puntuaci\u00F3n",
      },
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
