/* LessonKit — shared answer sounds and on-page feedback for every subject.
   Browser global: window.LessonKit
   No external audio files. AudioContext is created only after the first
   user gesture (pointer, key, or touch).

   LessonKit.mount({ subject, grade, topic, objective })
   LessonKit.feedback(message, ok)
   LessonKit.correct()  two short rising tones
   LessonKit.wrong()    one low tone
   LessonKit.done()     three rising tones
*/
(function (root) {
  "use strict";

  var ctx = null;
  var unlocked = false;
  var cssReady = false;
  var bound = false;
  var PEAK = 0.035;
  var gestureTypes = ["pointerdown", "keydown", "touchstart", "click"];

  var CSS = ""
    + ".lk-banner,.lk-feedback{font-family:\"IBM Plex Sans\",\"Outfit\",\"Noto Sans TC\",system-ui,sans-serif;box-sizing:border-box}"
    + ".lk-banner *,.lk-feedback *{box-sizing:border-box}"
    + ".lk-banner{margin:0;padding:16px 20px;background:#0f172a;color:#f8fafc}"
    + ".lk-meta,.lk-topic-row,.lk-objective{display:flex;flex-wrap:wrap;align-items:center;gap:8px}"
    + ".lk-meta{margin:0 0 10px}"
    + ".lk-topic-row{margin:0 0 8px}"
    + ".lk-label{display:inline-flex;align-items:center;padding:2px 8px;border-radius:999px;background:#1d4ed8;color:#fff;font-size:12px;font-weight:800;letter-spacing:.04em}"
    + ".lk-value{font-size:15px;font-weight:700;line-height:1.5}"
    + ".lk-topic{margin:0;font-size:1.35rem;font-weight:800;line-height:1.35}"
    + ".lk-objective{margin:0;font-size:15px;line-height:1.6;color:#e2e8f0}"
    + ".lk-feedback{margin:0;padding:14px 16px;border-bottom:1px solid #e2e8f0;background:#f8fafc;color:#0f172a}"
    + ".lk-feedback-label{margin:0 0 4px;font-size:12px;font-weight:800;letter-spacing:.06em;color:#64748b}"
    + ".lk-feedback-message{margin:0;font-size:16px;font-weight:700;line-height:1.6}"
    + ".lk-feedback.lk-ok{background:#ecfdf5;border-bottom-color:#6ee7b7}"
    + ".lk-feedback.lk-ok .lk-feedback-message{color:#065f46}"
    + ".lk-feedback.lk-no{background:#fef2f2;border-bottom-color:#fca5a5}"
    + ".lk-feedback.lk-no .lk-feedback-message{color:#991b1b}";

  function browserWindow() {
    if (typeof window === "undefined" || !window || typeof window.addEventListener !== "function") return null;
    return window;
  }

  function injectCss() {
    if (cssReady || typeof document === "undefined" || !document) return;
    var head = document.head || document.getElementsByTagName("head")[0];
    if (!head) return;
    cssReady = true;
    var style = document.createElement("style");
    style.setAttribute("data-lesson-kit", "1");
    style.textContent = CSS;
    head.appendChild(style);
  }

  function onReady(fn) {
    if (typeof document === "undefined" || !document) return;
    if (document.body) fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function setText(id, value) {
    var node = byId(id);
    if (node) node.textContent = value == null ? "" : String(value);
  }

  function make(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function ensureBanner() {
    var banner = byId("lesson-kit-banner");
    if (banner) return banner;
    banner = make("header", "lk-banner");
    banner.id = "lesson-kit-banner";
    banner.setAttribute("aria-label", "課題資料");

    var meta = make("p", "lk-meta");
    meta.appendChild(make("span", "lk-label", "科目"));
    var subject = make("span", "lk-value");
    subject.id = "lesson-kit-subject";
    meta.appendChild(subject);
    meta.appendChild(make("span", "lk-label", "年級"));
    var grade = make("span", "lk-value");
    grade.id = "lesson-kit-grade";
    meta.appendChild(grade);

    var topicRow = make("div", "lk-topic-row");
    topicRow.appendChild(make("span", "lk-label", "課題"));
    var topic = make("h1", "lk-topic");
    topic.id = "lesson-kit-topic";
    topicRow.appendChild(topic);

    var objective = make("p", "lk-objective");
    objective.appendChild(make("span", "lk-label", "學習目標"));
    var objectiveText = make("span", "lk-value");
    objectiveText.id = "lesson-kit-objective";
    objective.appendChild(objectiveText);

    banner.appendChild(meta);
    banner.appendChild(topicRow);
    banner.appendChild(objective);

    var feedback = byId("lesson-kit-feedback");
    if (feedback && feedback.parentNode) feedback.parentNode.insertBefore(banner, feedback);
    else document.body.insertBefore(banner, document.body.firstChild);
    return banner;
  }

  function ensureFeedback() {
    var region = byId("lesson-kit-feedback");
    if (region) return region;
    region = make("section", "lk-feedback");
    region.id = "lesson-kit-feedback";
    region.setAttribute("role", "status");
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-atomic", "true");
    region.appendChild(make("p", "lk-feedback-label", "回饋"));
    var message = make("p", "lk-feedback-message", "尚未有回饋。");
    message.id = "lesson-kit-feedback-message";
    region.appendChild(message);

    var banner = byId("lesson-kit-banner");
    if (banner && banner.parentNode) banner.parentNode.insertBefore(region, banner.nextSibling);
    else document.body.insertBefore(region, document.body.firstChild);
    return region;
  }

  function mount(meta) {
    meta = meta || {};
    injectCss();
    onReady(function () {
      ensureBanner();
      setText("lesson-kit-subject", meta.subject);
      setText("lesson-kit-grade", meta.grade);
      setText("lesson-kit-topic", meta.topic);
      setText("lesson-kit-objective", meta.objective);
      ensureFeedback();
    });
  }

  function feedback(message, ok) {
    injectCss();
    onReady(function () {
      var region = ensureFeedback();
      var messageNode = byId("lesson-kit-feedback-message");
      if (messageNode) messageNode.textContent = message == null ? "" : String(message);
      region.classList.remove("lk-ok");
      region.classList.remove("lk-no");
      if (ok === true) region.classList.add("lk-ok");
      else if (ok === false) region.classList.add("lk-no");
      if (ok === true || ok === false) region.setAttribute("data-ok", ok ? "true" : "false");
      else region.removeAttribute("data-ok");
    });
  }

  function gestureActive() {
    if (unlocked) return true;
    try {
      if (typeof navigator !== "undefined" && navigator && navigator.userActivation && navigator.userActivation.isActive) {
        unlocked = true;
        return true;
      }
    } catch (err) {}
    return false;
  }

  function ensureContext() {
    if (ctx) return ctx;
    if (!gestureActive()) return null;
    var view = browserWindow();
    if (!view) return null;
    var AudioCtx = view.AudioContext || view.webkitAudioContext;
    if (!AudioCtx) return null;
    try {
      ctx = new AudioCtx();
    } catch (err) {
      ctx = null;
    }
    return ctx;
  }

  function resume(context) {
    if (!context || context.state !== "suspended" || typeof context.resume !== "function") return;
    try {
      var pending = context.resume();
      if (pending && typeof pending.catch === "function") pending.catch(function () {});
    } catch (err) {}
  }

  function unbindGesture() {
    var view = browserWindow();
    if (!view) return;
    gestureTypes.forEach(function (type) {
      view.removeEventListener(type, onFirstGesture, true);
    });
  }

  function onFirstGesture() {
    unlocked = true;
    var context = ensureContext();
    resume(context);
    if (context) unbindGesture();
  }

  function bindUnlock() {
    var view = browserWindow();
    if (bound || !view) return;
    bound = true;
    gestureTypes.forEach(function (type) {
      view.addEventListener(type, onFirstGesture, true);
    });
  }

  function schedule(context, freq, when, duration) {
    var osc = context.createOscillator();
    var gain = context.createGain();
    var end = when + duration;
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, when);
    gain.gain.setValueAtTime(0.0001, when);
    gain.gain.exponentialRampToValueAtTime(PEAK, when + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, end);
    osc.connect(gain);
    gain.connect(context.destination);
    osc.start(when);
    osc.stop(end + 0.02);
  }

  function play(freqs, duration) {
    if (!gestureActive()) return;
    var context = ensureContext();
    if (!context) return;
    resume(context);
    var when = context.currentTime + 0.02;
    var step = duration + 0.04;
    for (var i = 0; i < freqs.length; i++) {
      schedule(context, freqs[i], when + i * step, duration);
    }
  }

  function correct() {
    play([523.25, 659.25], 0.09);
  }

  function wrong() {
    play([146.83], 0.28);
  }

  function done() {
    play([523.25, 659.25, 783.99], 0.11);
  }

  if (root) {
    root.LessonKit = {
      mount: mount,
      feedback: feedback,
      correct: correct,
      wrong: wrong,
      done: done
    };
  }
  bindUnlock();
})(typeof window !== "undefined" && window ? window : (typeof globalThis !== "undefined" ? globalThis : this));
