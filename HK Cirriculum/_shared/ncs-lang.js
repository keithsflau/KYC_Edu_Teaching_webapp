/**
 * Compatibility shim — use NcsI18n (canonical).
 * @deprecated Load ncs-i18n.js instead. NCSLang is an alias for legacy callers.
 * @see NCS_KIT_CANONICAL.md
 */
(function (global) {
  "use strict";

  if (!global.NcsI18n) {
    console.warn(
      "[ncs-lang.js] NcsI18n not found — load ncs-i18n.js before this shim."
    );
    return;
  }

  var I = global.NcsI18n;

  function mapLang(code) {
    if (code === "zh-Hant") return "zh";
    return code;
  }

  global.NCSLang = {
    init: function (options) {
      options = options || {};
      return I.init({
        strings: options.strings,
        defaultLang: options.defaultLang,
        mount: options.mount,
        onReady: options.onReady,
        onChange: options.onChange
          ? function (lang) {
              options.onChange(mapLang(lang));
            }
          : undefined,
        chromePath: options.chromePath,
        target: typeof options.mount === "string" ? options.mount : undefined,
        inline: options.inline,
        dark: options.dark,
        showMtNotice: options.showMtNotice,
      });
    },
    t: function (key, fallback) {
      var val = I.t(key);
      if (val === key && fallback != null) return fallback;
      return val;
    },
    getLang: function () {
      return mapLang(I.getLang());
    },
    setLang: function (code) {
      var mapped = code === "zh" ? "zh-Hant" : code;
      I.setLang(mapped);
      return true;
    },
    applyDOM: I.applyDOM,
    mergeStrings: I.mergeStrings,
    langs: I.langs,
    codes: I.codes.map(function (c) {
      return c === "zh-Hant" ? "zh" : c;
    }),
    storageKey: I.STORAGE_KEY,
    isInitialized: I.isInitialized,
  };
})(typeof window !== "undefined" ? window : globalThis);
