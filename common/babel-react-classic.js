/* Register classic React JSX preset for @babel/standalone + CDN React 18 */
(function () {
  if (!window.Babel || !Babel.registerPreset || !Babel.availablePresets || !Babel.availablePresets.react) return;
  Babel.registerPreset("react-classic", {
    presets: [[Babel.availablePresets.react, { runtime: "classic", pragma: "React.createElement", pragmaFrag: "React.Fragment" }]]
  });
})();
