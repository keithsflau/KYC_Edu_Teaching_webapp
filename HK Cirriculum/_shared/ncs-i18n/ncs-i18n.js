/**
 * Deprecated path — canonical kit is ../ncs-i18n.js
 * @see NCS_KIT_CANONICAL.md
 */
(function (d) {
  var src = (function () {
    var scripts = d.getElementsByTagName("script");
    for (var i = scripts.length - 1; i >= 0; i--) {
      var s = scripts[i].src || "";
      if (s.indexOf("ncs-i18n/ncs-i18n.js") !== -1) {
        return s.replace(/ncs-i18n\/ncs-i18n\.js.*$/, "ncs-i18n.js");
      }
    }
    return "../ncs-i18n.js";
  })();
  d.write('<script src="' + src + '"><\/script>');
})(document);
