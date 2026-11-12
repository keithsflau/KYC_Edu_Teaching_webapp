/**
 * Short Web Audio cues for Dynamic Earth lessons. No external samples.
 * Pages call window.GeoAudio.ok / .no / .tap after this script loads.
 */
(function (global) {
  "use strict";

  let ctx = null;

  function audio() {
    const AC = global.AudioContext || global.webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function tone(freq, dur, type, gain) {
    const c = audio();
    if (!c) return;
    const osc = c.createOscillator();
    const amp = c.createGain();
    osc.type = type || "sine";
    osc.frequency.value = freq;
    amp.gain.setValueAtTime(0.0001, c.currentTime);
    amp.gain.exponentialRampToValueAtTime(gain || 0.05, c.currentTime + 0.015);
    amp.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + dur);
    osc.connect(amp);
    amp.connect(c.destination);
    osc.start();
    osc.stop(c.currentTime + dur + 0.02);
  }

  function correct() {
    tone(523, 0.08, "sine", 0.05);
    setTimeout(function () {
      tone(784, 0.12, "sine", 0.05);
    }, 90);
  }

  function wrong() {
    tone(196, 0.16, "triangle", 0.045);
  }

  function done() {
    tone(523, 0.07, "sine", 0.045);
    setTimeout(function () {
      tone(659, 0.07, "sine", 0.045);
    }, 80);
    setTimeout(function () {
      tone(784, 0.14, "sine", 0.05);
    }, 160);
  }

  function tap() {
    tone(620, 0.07, "sine", 0.04);
  }

  global.GeoAudio = {
    ok: correct,
    no: wrong,
    tap: tap,
    correct: correct,
    wrong: wrong,
    done: done,
  };
})(typeof window !== "undefined" ? window : global);
