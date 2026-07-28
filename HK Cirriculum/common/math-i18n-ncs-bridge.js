/**
 * Loads fleet NcsI18n kit for MathI18n React apps.
 * LanguageSelector bridge lives synchronously in Mathematics/common/i18n.js.
 */
(function (global) {
  "use strict";

  function kitUrl(i18nScriptSrc, file) {
    return new URL("../../../common/" + file, i18nScriptSrc).href;
  }

  function sharedUrl(i18nScriptSrc, file) {
    return new URL("../../../_shared/" + file, i18nScriptSrc).href;
  }

  function loadStylesheet(href) {
    if (!global.document) return;
    if (global.document.querySelector('link[data-math-i18n-ncs-bridge="css"]')) return;
    var link = global.document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-math-i18n-ncs-bridge", "css");
    global.document.head.appendChild(link);
  }

  function loadScript(src, onload) {
    if (!global.document) return;
    if (global.NcsI18n) {
      onload();
      return;
    }
    var existing = global.document.querySelector('script[data-math-i18n-ncs-bridge="js"]');
    if (existing) {
      existing.addEventListener("load", onload);
      return;
    }
    var script = global.document.createElement("script");
    script.src = src;
    script.setAttribute("data-math-i18n-ncs-bridge", "js");
    script.addEventListener("load", onload);
    global.document.head.appendChild(script);
  }

  function injectHideStyle() {
    if (!global.document || global.document.getElementById("math-i18n-ncs-bridge-style")) return;
    var style = global.document.createElement("style");
    style.id = "math-i18n-ncs-bridge-style";
    style.textContent =
      ".math-i18n-lang-hidden,.math-i18n-toggle{display:none!important}";
    global.document.head.appendChild(style);
  }

  function bootKit(i18nScriptSrc) {
    if (!i18nScriptSrc) return;
    injectHideStyle();
    loadStylesheet(kitUrl(i18nScriptSrc, "ncs-i18n.css"));
    loadScript(kitUrl(i18nScriptSrc, "ncs-i18n.js"), function () {
      if (!global.NcsI18n || global.NcsI18n.isInitialized()) return;
      global.NcsI18n.init({
        chromePath: sharedUrl(i18nScriptSrc, "ncs-chrome.json"),
        target: global.document.body,
        position: "top",
      });
    });
  }

  global.MathI18nNcsBridge = { bootKit: bootKit };
})(window);
