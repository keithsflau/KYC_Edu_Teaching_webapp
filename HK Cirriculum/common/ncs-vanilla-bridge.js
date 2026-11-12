/**
 * Shared vanilla-HTML i18n bridge (Argument Tower pattern).
 * APP_STRINGS { zh, en, ne?, ur?, tl?, hi? } + applyUI() + wireVanillaI18n().
 */
(function (global) {
  "use strict";

  function uiLangBucket() {
    if (global.NcsI18n && global.NcsI18n.getLang) {
      var lang = global.NcsI18n.getLang();
      return lang === "zh-Hant" ? "zh" : lang;
    }
    return "zh";
  }

  function ui(key, strings) {
    strings = strings || global.__NCS_APP_STRINGS || {};
    if (global.NcsI18n && global.NcsI18n.isInitialized && global.NcsI18n.isInitialized()) {
      var fromKit = global.NcsI18n.t(key);
      if (fromKit != null && fromKit !== key) return fromKit;
    }
    var bucket = uiLangBucket();
    if (strings[bucket] && strings[bucket][key] != null) return strings[bucket][key];
    if (bucket !== "en" && strings.en && strings.en[key] != null) return strings.en[key];
    return (strings.zh && strings.zh[key] != null) ? strings.zh[key] : key;
  }

  function registerAppStrings(strings) {
    global.__NCS_APP_STRINGS = strings;
    if (global.NcsI18n && global.NcsI18n.registerStrings) {
      global.NcsI18n.registerStrings(strings);
    }
  }

  function wireVanillaI18n(strings, applyUI) {
    registerAppStrings(strings);
    applyUI();
    if (global.NcsI18n && global.NcsI18n.onChange) {
      global.NcsI18n.onChange(applyUI);
    }
    global.document.addEventListener("hksteam-ncs-lang-change", applyUI);
    global.document.addEventListener("ncs-lang-change", applyUI);
    global.document.addEventListener("ncs:langchange", applyUI);
  }

  function whenNcsReady(fn) {
    var tries = 0;
    var timer = setInterval(function () {
      if (global.NcsI18n && global.NcsI18n.isInitialized && global.NcsI18n.isInitialized()) {
        clearInterval(timer);
        fn();
      } else if (++tries > 120) {
        clearInterval(timer);
        fn();
      }
    }, 50);
  }

  global.NcsVanillaBridge = {
    uiLangBucket: uiLangBucket,
    ui: ui,
    registerAppStrings: registerAppStrings,
    wireVanillaI18n: wireVanillaI18n,
    whenNcsReady: whenNcsReady,
  };
})(typeof window !== "undefined" ? window : globalThis);
