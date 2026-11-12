(function () {
  "use strict";

  var app = document.getElementById("app");
  if (!app) return;
  if (typeof curriculum === "undefined" || !curriculum.length) {
    app.textContent = "練習資料未能載入。";
    return;
  }

  var skulptReady = null;
  var state = {
    moduleId: curriculum[0].id,
    subtopicId: curriculum[0].subtopics[0].id,
    code: curriculum[0].subtopics[0].initialCode || "",
    output: "",
    showAnswer: false,
    running: false
  };

  function findModule() {
    for (var i = 0; i < curriculum.length; i++) {
      if (curriculum[i].id === state.moduleId) return curriculum[i];
    }
    return curriculum[0];
  }

  function findSubtopic(mod) {
    var list = mod.subtopics || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === state.subtopicId) return list[i];
    }
    return list[0] || null;
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    var props = attrs || {};
    Object.keys(props).forEach(function (key) {
      var value = props[key];
      if (value == null || value === false) return;
      if (key === "className") node.className = value;
      else if (key === "text") node.textContent = value;
      else if (key.indexOf("on") === 0 && typeof value === "function") {
        node.addEventListener(key.slice(2).toLowerCase(), value);
      } else node.setAttribute(key, value);
    });
    (children || []).forEach(function (child) {
      if (child == null || child === false) return;
      node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
    });
    return node;
  }

  function ictTone(ok) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    var ctx = new AC();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = ok ? 880 : 196;
    osc.connect(gain);
    gain.connect(ctx.destination);
    var t = ctx.currentTime;
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
    osc.start(t);
    osc.stop(t + 0.2);
  }

  window.ictLessonDone = function (ok, message) {
    var fb = document.querySelector("[data-ict-feedback]");
    if (fb) {
      fb.hidden = false;
      fb.textContent = message;
    }
    ictTone(ok);
  };

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement("script");
      script.src = src;
      script.onload = function () { resolve(); };
      script.onerror = function () { reject(new Error("未能載入 Python 執行元件")); };
      document.head.appendChild(script);
    });
  }

  function loadSkulpt() {
    if (typeof Sk !== "undefined") return Promise.resolve();
    if (skulptReady) return skulptReady;
    skulptReady = loadScript("https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt.min.js").then(function () {
      return loadScript("https://cdn.jsdelivr.net/npm/skulpt@1.2.0/dist/skulpt-stdlib.js");
    }).catch(function (err) {
      skulptReady = null;
      throw err;
    });
    return skulptReady;
  }

  function selectTopic(moduleId, subtopicId) {
    var mod = null;
    for (var i = 0; i < curriculum.length; i++) {
      if (curriculum[i].id === moduleId) mod = curriculum[i];
    }
    if (!mod) return;
    var sub = null;
    for (var j = 0; j < mod.subtopics.length; j++) {
      if (mod.subtopics[j].id === subtopicId) sub = mod.subtopics[j];
    }
    if (!sub) return;
    state.moduleId = moduleId;
    state.subtopicId = subtopicId;
    state.code = sub.initialCode || "";
    state.output = "";
    state.showAnswer = false;
    render();
  }

  async function runPython() {
    if (state.running) return;
    state.running = true;
    state.output = "";
    render();
    try {
      await loadSkulpt();
      function builtin(x) {
        if (Sk.builtinFiles === undefined || Sk.builtinFiles.files[x] === undefined) {
          throw new Error("File not found: '" + x + "'");
        }
        return Sk.builtinFiles.files[x];
      }
      Sk.configure({
        output: function (text) { state.output += text; },
        read: builtin,
        __future__: Sk.python3,
        inputfun: function (prompt) { return window.prompt(prompt || "Input:"); },
        inputfunTakesPrompt: true
      });
      await Sk.misceval.asyncToPromise(function () {
        return Sk.importMainWithBody("<stdin>", false, state.code, true);
      });
      if (window.ictLessonDone) {
        window.ictLessonDone(true, "程式已執行。請核對輸出是否符合本頁任務。Python 3 的 print 要加括號。");
      }
    } catch (err) {
      state.output += (state.output ? "\n" : "") + "錯誤：" + err;
      if (window.ictLessonDone) {
        window.ictLessonDone(false, "程式未成功執行。請檢查括號、引號和縮排，然後再按一次執行程式。");
      }
    } finally {
      state.running = false;
      render();
    }
  }

  function render() {
    var mod = findModule();
    var sub = findSubtopic(mod);
    var keywords = (sub && sub.keywords) || [];
    app.replaceChildren();

    var navButtons = [];
    curriculum.forEach(function (item) {
      var buttons = item.subtopics.map(function (topic) {
        var active = item.id === state.moduleId && topic.id === state.subtopicId;
        return el("button", {
          type: "button",
          className: active ? "topic active" : "topic",
          onClick: function () { selectTopic(item.id, topic.id); }
        }, [topic.title]);
      });
      navButtons.push(el("section", null, [
        el("h2", { text: item.title }),
        el("div", null, buttons)
      ]));
    });

    var editor = el("textarea", {
      className: "editor",
      spellcheck: "false",
      "aria-label": "Python 練習起點"
    });
    editor.value = state.code;
    editor.textContent = state.code;
    editor.setAttribute("data-code-length", String(state.code.length));
    editor.addEventListener("input", function () { state.code = editor.value; });

    var answerBox = state.showAnswer && sub
      ? el("pre", { className: "answer", text: sub.answer || "" })
      : null;

    var keywordCards = keywords.map(function (name) {
      var info = typeof keywordInfo !== "undefined" ? keywordInfo[name] : null;
      var bits = [el("code", { text: name })];
      if (info) {
        bits.push(el("p", { text: info.desc }));
        bits.push(el("div", { className: "syntax", text: info.syntax }));
      }
      return el("article", { className: "keyword" }, bits);
    });

    var allNames = typeof keywordInfo !== "undefined" ? Object.keys(keywordInfo) : [];
    var chips = allNames.map(function (name) {
      var on = keywords.indexOf(name) !== -1;
      return el("span", { className: on ? "chip on" : "chip", text: name });
    });

    app.appendChild(el("div", { className: "lab" }, [
      el("nav", { className: "nav" }, [
        el("div", { className: "brand" }, [
          el("h1", { text: "Python 練習" }),
          el("p", { text: "先寫程式，再執行。參考答案預設收起。" })
        ]),
        el("div", { className: "topics" }, navButtons)
      ]),
      el("main", null, [
        el("div", { className: "toolbar" }, [
          el("div", null, [
            el("h2", { text: sub ? sub.title : "" }),
            el("p", { className: "muted", text: mod ? mod.title : "" })
          ]),
          el("div", { className: "actions" }, [
            el("button", {
              type: "button",
              onClick: function () {
                state.code = sub ? (sub.initialCode || "") : "";
                state.output = "";
                render();
              }
            }, ["還原"]),
            el("button", {
              type: "button",
              className: "amber",
              onClick: function () {
                state.showAnswer = !state.showAnswer;
                render();
              }
            }, [state.showAnswer ? "隱藏參考答案" : "顯示參考答案"]),
            el("button", {
              type: "button",
              className: "green",
              disabled: state.running ? "disabled" : null,
              onClick: function () { runPython(); }
            }, [state.running ? "執行中…" : "執行程式"])
          ])
        ]),
        el("section", { className: "card" }, [
          el("h3", { text: "說明" }),
          el("p", { className: "pre", text: sub ? sub.content : "" }),
          el("p", { className: "task", text: sub ? "你要做的一件事： " + sub.task : "" }),
          answerBox ? el("div", null, [el("h3", { text: "參考答案" }), answerBox]) : null
        ]),
        el("div", { className: "panes" }, [
          el("section", { className: "pane" }, [
            el("div", { className: "pane-bar", text: "main.py" }),
            editor
          ]),
          el("section", { className: "pane" }, [
            el("div", { className: "pane-bar", text: "輸出" }),
            el("pre", { className: "output", text: state.output || "按「執行程式」執行。" })
          ])
        ])
      ]),
      el("aside", { className: "keywords" }, [
        el("div", { className: "brand purple" }, [
          el("h2", { text: "Python 關鍵字" }),
          el("p", { text: "本練習會用到" })
        ]),
        el("div", { className: "keyword-list" }, keywordCards),
        el("div", { className: "all-keys" }, [
          el("h3", { text: "全部關鍵字" }),
          el("div", { className: "chips" }, chips)
        ])
      ])
    ]));
  }

  render();
})();
