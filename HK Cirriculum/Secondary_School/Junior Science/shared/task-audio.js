/* 為已有課件補上答對、答錯、完成聲效，並把舊標題改成動手探究。 */
(function () {
  "use strict";

  var audioCtx = null;
  var donePlayed = false;

  function audio() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!audioCtx) audioCtx = new Ctx();
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(ctx, freq, t0, dur, type, gain) {
    var osc = ctx.createOscillator();
    var amp = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    amp.gain.setValueAtTime(0.0001, t0);
    amp.gain.exponentialRampToValueAtTime(gain, t0 + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(amp);
    amp.connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.02);
  }

  function play(kind) {
    var ctx = audio();
    if (!ctx) return;
    var t = ctx.currentTime;
    if (kind === "ok") {
      tone(ctx, 523.25, t, 0.14, "sine", 0.07);
      tone(ctx, 659.25, t + 0.1, 0.16, "sine", 0.07);
    } else if (kind === "bad") {
      tone(ctx, 196, t, 0.2, "square", 0.03);
      tone(ctx, 155.56, t + 0.09, 0.22, "square", 0.025);
    } else if (kind === "done") {
      tone(ctx, 523.25, t, 0.12, "sine", 0.07);
      tone(ctx, 659.25, t + 0.12, 0.12, "sine", 0.07);
      tone(ctx, 783.99, t + 0.24, 0.24, "sine", 0.07);
    }
  }

  function patchShell() {
    if (!window.JSLGER || window.JSLGER.__taskAudio) return;
    var ui = window.JSLGER.ui;
    var t = window.JSLGER.t;
    if (typeof ui === "function") {
      window.JSLGER.ui = function (key, zh, en, isZh) {
        if (key === "interactiveLab") {
          var zhNow = isZh;
          if (window.NcsI18n && window.NcsI18n.isZh) zhNow = window.NcsI18n.isZh();
          return zhNow ? "動手探究" : "Hands-on task";
        }
        return ui.apply(this, arguments);
      };
    }
    if (typeof t === "function") {
      window.JSLGER.t = function (zh, en, isZh) {
        if (zh === "互動實驗室" || en === "Interactive Lab") {
          var zhNow = isZh;
          if (window.NcsI18n && window.NcsI18n.isZh) zhNow = window.NcsI18n.isZh();
          return zhNow ? "動手探究" : "Hands-on task";
        }
        return t.apply(this, arguments);
      };
    }
    window.JSLGER.__taskAudio = true;
  }

  function looks(node, kind) {
    var cls = (node && node.className && String(node.className)) || "";
    if (kind === "bad") return cls.indexOf("wrong") >= 0 || cls.indexOf("rose") >= 0;
    return cls.indexOf("correct") >= 0 || cls.indexOf("emerald") >= 0 || cls.indexOf("good") >= 0;
  }

  document.addEventListener("click", function (event) {
    var btn = event.target.closest ? event.target.closest("button") : null;
    if (!btn) return;
    var label = (btn.textContent || "").replace(/\s+/g, " ").trim();
    if (!label) return;
    window.setTimeout(function () {
      var nodes = document.querySelectorAll("button");
      var i;
      for (i = 0; i < nodes.length; i += 1) {
        var text = (nodes[i].textContent || "").replace(/\s+/g, " ").trim();
        if (text !== label) continue;
        if (looks(nodes[i], "bad")) {
          play("bad");
          return;
        }
        if (looks(nodes[i], "ok")) {
          play("ok");
          return;
        }
      }
    }, 60);
  }, true);

  var renaming = false;

  function renameLabs() {
    if (renaming || !document.body) return;
    renaming = true;
    var nodes = document.body.querySelectorAll("h1, h2, h3, p, button, span, a");
    var i;
    for (i = 0; i < nodes.length; i += 1) {
      var node = nodes[i];
      if (node.closest && node.closest("script, style")) continue;
      if (node.children && node.children.length) continue;
      var value = node.textContent || "";
      if (value.indexOf("互動實驗室") >= 0) node.textContent = value.replace(/互動實驗室/g, "動手探究");
      else if (value.indexOf("Interactive Lab") >= 0) node.textContent = value.replace(/Interactive Lab/g, "Hands-on task");
    }
    renaming = false;
  }

  var observer = new MutationObserver(function () {
    renameLabs();
    if (donePlayed) return;
    var text = document.body ? document.body.textContent : "";
    if (text.indexOf("複習完成") >= 0 || text.indexOf("Review Complete") >= 0) {
      donePlayed = true;
      play("done");
    }
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  renameLabs();

  var style = document.createElement("style");
  style.textContent = "#js-goals{max-width:64rem;margin:0.75rem auto 0;padding:0.85rem 1rem;background:#fff;border:1px solid #d7e0ea;border-radius:14px;font-family:Segoe UI,Microsoft JhengHei,sans-serif;color:#142033}#js-goals h2{margin:0 0 .4rem;font-size:1.05rem}#js-goals ul{margin:0;padding-left:1.2rem}";
  document.head.appendChild(style);

  patchShell();
  window.setInterval(patchShell, 400);
})();
