/* 初中科學動手任務。純 JavaScript，供 node --check。 */
(function (global) {
  "use strict";

  var audioCtx = null;

  function audio() {
    var Ctx = global.AudioContext || global.webkitAudioContext;
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

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function bandText(bands, value) {
    var i;
    for (i = 0; i < bands.length; i += 1) {
      if (value <= bands[i].max) return bands[i].text;
    }
    return bands.length ? bands[bands.length - 1].text : "";
  }

  function mount(cfg) {
    var root = document.getElementById("app");
    if (!root || !cfg) return;
    root.innerHTML = "";

    var wrap = el("div", "wrap");
    var back = el("a", "back", "← 返回年級目錄");
    back.href = cfg.back || "../index.html";
    wrap.appendChild(back);
    wrap.appendChild(el("p", "kicker", (cfg.formLabel || "") + " · " + (cfg.strand || "")));
    wrap.appendChild(el("h1", null, cfg.title || "科學任務"));
    if (cfg.lead) wrap.appendChild(el("p", "lead", cfg.lead));

    var goals = el("section");
    goals.appendChild(el("h2", null, "學習目標"));
    var ul = el("ul", "goals");
    (cfg.objectives || []).forEach(function (line) {
      ul.appendChild(el("li", null, line));
    });
    goals.appendChild(ul);
    wrap.appendChild(goals);

    var taskSec = el("section");
    taskSec.appendChild(el("h2", null, "動手任務"));
    taskSec.appendChild(el("p", "prompt", cfg.prompt || ""));
    var host = el("div");
    var feedback = el("p", "feedback");
    feedback.setAttribute("aria-live", "polite");
    taskSec.appendChild(host);
    taskSec.appendChild(feedback);
    wrap.appendChild(taskSec);

    var quiz = el("section");
    quiz.appendChild(el("h2", null, "小測"));
    quiz.appendChild(el("p", "prompt", "先選答案。答對會亮起並說明原因；答錯可以再選。"));
    (cfg.checks || []).concat(cfg.review || []).forEach(function (item) {
      quiz.appendChild(renderQuestion(item));
    });
    wrap.appendChild(quiz);

    wrap.appendChild(el("footer", null, "@HKSTEAMAI All Copy-Right Reserved."));
    root.appendChild(wrap);

    var taskDone = false;
    function say(msg, kind) {
      feedback.textContent = msg;
      feedback.className = "feedback" + (kind ? " " + kind : "");
    }
    function finish(msg) {
      if (taskDone) return;
      taskDone = true;
      say(msg, "ok");
      play("done");
    }
    renderTask(cfg.task || { type: "choose", q: "請完成任務。", opts: ["完成"], a: 0, why: "" }, host, say, finish);
  }

  function renderQuestion(item) {
    var box = el("div", "card-q");
    box.appendChild(el("p", null, item.q));
    var why = el("p", "why", "");
    var locked = false;
    item.opts.forEach(function (opt, index) {
      var btn = el("button", null, opt);
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (locked) return;
        if (index === item.a) {
          locked = true;
          btn.classList.add("good");
          btn.disabled = true;
          why.textContent = item.why || "正確。";
          play("ok");
        } else {
          btn.classList.add("bad");
          why.textContent = "還不是，再想一次。";
          play("bad");
        }
      });
      box.appendChild(btn);
    });
    box.appendChild(why);
    return box;
  }

  function renderTask(task, host, say, finish) {
    if (task.type === "bins") return renderBins(task, host, say, finish);
    if (task.type === "order") return renderOrder(task, host, say, finish);
    if (task.type === "match") return renderMatch(task, host, say, finish);
    if (task.type === "number") return renderNumber(task, host, say, finish);
    if (task.type === "who") return renderWho(task, host, say, finish);
    return renderChoose(task, host, say, finish);
  }

  function renderChoose(task, host, say, finish) {
    var box = el("div", "card-q");
    box.appendChild(el("p", null, task.q));
    var buttons = [];
    task.opts.forEach(function (opt, index) {
      var btn = el("button", null, opt);
      btn.type = "button";
      buttons.push(btn);
      btn.addEventListener("click", function () {
        if (index === task.a) {
          buttons.forEach(function (b) { b.disabled = true; });
          btn.classList.add("good");
          finish(task.why || "正確。");
        } else {
          say(task.miss || "這個做法不對，再選一次。", "bad");
          play("bad");
          btn.classList.add("bad");
        }
      });
      box.appendChild(btn);
    });
    host.appendChild(box);
  }

  function renderBins(task, host, say, finish) {
    var left = task.items.length;
    task.items.forEach(function (item) {
      var box = el("div", "item");
      box.appendChild(el("p", null, item.label));
      var note = el("p", "why", "");
      task.bins.forEach(function (bin) {
        var btn = el("button", null, bin.label);
        btn.type = "button";
        btn.addEventListener("click", function () {
          if (box.classList.contains("good")) return;
          if (bin.id === item.bin) {
            box.classList.add("good");
            note.textContent = item.why || "分類正確。";
            play("ok");
            left -= 1;
            say("已放對一項，還有 " + left + " 項。", "ok");
            if (left <= 0) finish(task.done || "全部分類正確。");
          } else {
            note.textContent = "這項不屬於「" + bin.label + "」。";
            play("bad");
            say("再看定義，然後改放。", "bad");
          }
        });
        box.appendChild(btn);
      });
      box.appendChild(note);
      host.appendChild(box);
    });
  }

  function renderOrder(task, host, say, finish) {
    var built = el("div", "live", "你的次序：");
    var pad = el("div", "steps");
    host.appendChild(built);
    host.appendChild(pad);
    var expect = 0;
    var buttons = shuffle(task.steps.map(function (label, index) {
      return { label: label, index: index };
    }));
    buttons.forEach(function (step) {
      var btn = el("button", null, step.label);
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        if (step.index === expect) {
          btn.disabled = true;
          btn.classList.add("good");
          built.textContent += (expect === 0 ? "" : " → ") + step.label;
          expect += 1;
          play("ok");
          if (expect >= task.steps.length) finish(task.done || "次序正確。");
          else say("這一步對了。", "ok");
        } else {
          play("bad");
          say(task.miss || "還不是下一步。", "bad");
        }
      });
      pad.appendChild(btn);
    });
  }

  function renderMatch(task, host, say, finish) {
    var grid = el("div", "match");
    var leftCol = el("div", "match-col");
    var rightCol = el("div", "match-col");
    leftCol.appendChild(el("p", null, task.leftTitle || "項目"));
    rightCol.appendChild(el("p", null, task.rightTitle || "配對"));
    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    host.appendChild(grid);
    var picked = null;
    var remain = task.pairs.length;
    var rights = shuffle(task.pairs.map(function (pair, index) {
      return { text: pair.r, index: index };
    }));
    task.pairs.forEach(function (pair, index) {
      var btn = el("button", null, pair.l);
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (btn.disabled) return;
        if (picked) picked.classList.remove("on");
        picked = btn;
        btn.classList.add("on");
        btn.dataset.pair = String(index);
      });
      leftCol.appendChild(btn);
    });
    rights.forEach(function (right) {
      var btn = el("button", null, right.text);
      btn.type = "button";
      btn.addEventListener("click", function () {
        if (!picked || btn.disabled) {
          say("先點左邊，再點右邊。", "bad");
          return;
        }
        if (Number(picked.dataset.pair) === right.index) {
          picked.disabled = true;
          picked.classList.remove("on");
          picked.classList.add("good");
          btn.disabled = true;
          btn.classList.add("good");
          picked = null;
          remain -= 1;
          play("ok");
          if (remain <= 0) finish(task.done || "全部配對正確。");
          else say("配對正確，還有 " + remain + " 對。", "ok");
        } else {
          play("bad");
          say(task.miss || "這兩項不是一對。", "bad");
        }
      });
      rightCol.appendChild(btn);
    });
  }

  function renderNumber(task, host, say, finish) {
    if (task.slider) {
      var box = el("div", "slider-box");
      var value = task.slider.start;
      var label = el("label", "slider", task.slider.label + "：" + value + " " + (task.slider.unit || ""));
      var range = document.createElement("input");
      range.type = "range";
      range.min = String(task.slider.min);
      range.max = String(task.slider.max);
      range.step = String(task.slider.step || 1);
      range.value = String(value);
      var live = el("p", "live", bandText(task.slider.bands || [], value));
      range.addEventListener("input", function () {
        value = Number(range.value);
        label.textContent = task.slider.label + "：" + value + " " + (task.slider.unit || "");
        live.textContent = bandText(task.slider.bands || [], value);
      });
      box.appendChild(label);
      box.appendChild(range);
      box.appendChild(live);
      host.appendChild(box);
    }
    var row = el("div", "row");
    var input = document.createElement("input");
    input.type = "number";
    input.step = "any";
    input.setAttribute("aria-label", task.unit || "答案");
    var unit = el("span", null, task.unit || "");
    var btn = el("button", null, "核對");
    btn.type = "button";
    btn.addEventListener("click", function () {
      if (input.value === "") {
        say("請先輸入數值。", "bad");
        play("bad");
        return;
      }
      var got = Number(input.value);
      var tol = task.tol == null ? 0 : task.tol;
      if (Number.isFinite(got) && Math.abs(got - task.answer) <= tol) {
        finish(task.success || "數值和單位正確。");
        btn.disabled = true;
      } else {
        say(task.fail || "數值還不對。檢查公式和單位。", "bad");
        play("bad");
      }
    });
    row.appendChild(input);
    row.appendChild(unit);
    row.appendChild(btn);
    host.appendChild(row);
  }

  function renderWho(task, host, say, finish) {
    var left = task.items.length;
    task.items.forEach(function (item) {
      var box = el("div", "card-q");
      box.appendChild(el("p", null, item.clue));
      var note = el("p", "why", "");
      item.opts.forEach(function (opt, index) {
        var btn = el("button", null, opt);
        btn.type = "button";
        btn.addEventListener("click", function () {
          if (box.classList.contains("good")) return;
          if (index === item.a) {
            box.classList.add("good");
            note.textContent = item.why || "正確。";
            play("ok");
            left -= 1;
            if (left <= 0) finish(task.done || "全部判斷正確。");
            else say("這項對了，還有 " + left + " 項。", "ok");
          } else {
            play("bad");
            note.textContent = "再看特徵，不是這一類。";
            say("答錯了，可以改選。", "bad");
          }
        });
        box.appendChild(btn);
      });
      box.appendChild(note);
      host.appendChild(box);
    });
  }

  global.JSLab = { mount: mount, play: play };
})(typeof window !== "undefined" ? window : globalThis);
