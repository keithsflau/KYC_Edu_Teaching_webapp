/* Visible fallback when React/JSLGER fails to mount (file://, offline, script 404). */
(function () {
  "use strict";
  function showMountError(reason) {
    var root = document.getElementById("root");
    if (!root || root.childElementCount > 0) return;
    root.innerHTML =
      '<div style="font-family:system-ui,sans-serif;max-width:32rem;margin:3rem auto;padding:1.5rem;border:2px solid #f59e0b;border-radius:1rem;background:#fffbeb">' +
      '<h1 style="font-size:1.25rem;font-weight:800;color:#92400e;margin:0 0 .75rem">App failed to load</h1>' +
      '<p style="margin:0 0 .5rem;color:#78350f">' + reason + '</p>' +
      '<p style="margin:0;font-size:.875rem;color:#57534e">Try: <code>npx serve</code> from <code>HK Cirriculum</code>, then open via <code>http://localhost:3000/...</code></p>' +
      "</div>";
  }
  window.addEventListener("load", function () {
    setTimeout(function () {
      if (!window.React) {
        showMountError("React did not load (check common/vendor/ scripts or network).");
        return;
      }
      if (!window.JSLGER || !window.JSLGER.Shell) {
        showMountError("JSLGER shell did not initialize (junior-science-lger.js missing or React unavailable).");
        return;
      }
      var root = document.getElementById("root");
      if (root && root.childElementCount === 0) {
        showMountError("React mount failed — check browser console for Babel/JSX errors.");
      }
    }, 1500);
  });
})();
