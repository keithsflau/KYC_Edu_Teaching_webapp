/* Short Web Audio tones for biology lessons. No assets, no autoplay. */
(function () {
  "use strict";
  var ac = null;
  function tone(kind) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    if (!ac) ac = new AC();
    if (ac.state === "suspended") ac.resume();
    var t = ac.currentTime;
    var o = ac.createOscillator();
    var g = ac.createGain();
    var ok = kind === "ok";
    var bad = kind === "bad";
    o.type = bad ? "triangle" : "sine";
    o.frequency.setValueAtTime(ok ? 660 : bad ? 185 : 523, t);
    if (ok) o.frequency.exponentialRampToValueAtTime(880, t + 0.09);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.045, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + (ok ? 0.18 : 0.13));
    o.connect(g);
    g.connect(ac.destination);
    o.start(t);
    o.stop(t + 0.2);
  }
  window.BioTone = tone;
})();
