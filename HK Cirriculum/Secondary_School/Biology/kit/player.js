/* Declarative DSE biology lesson player: objectives, one task, instant feedback, Web Audio. */
(function () {
  "use strict";

  function tone(kind) {
    if (window.BioTone) window.BioTone(kind);
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  function shuffle(list) {
    var arr = list.slice();
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function sigmoidSvg(shift, label) {
    var pts = [];
    var x;
    for (x = 0; x <= 100; x += 2) {
      var y = 100 / (1 + Math.exp(-(x - shift) / 9));
      pts.push((36 + x * 3.1).toFixed(1) + "," + (168 - y * 1.35).toFixed(1));
    }
    return (
      '<svg viewBox="0 0 380 200" role="img" aria-label="' + label + '">' +
      '<line x1="36" y1="170" x2="350" y2="170" stroke="#94a3b8"/>' +
      '<line x1="36" y1="22" x2="36" y2="170" stroke="#94a3b8"/>' +
      '<text x="150" y="192" font-size="13" fill="#334155">氧分壓 partial pressure of oxygen</text>' +
      '<text x="44" y="16" font-size="13" fill="#334155">血紅蛋白飽和度 saturation</text>' +
      '<polyline fill="none" stroke="#047857" stroke-width="3" points="' + pts.join(" ") + '"/>' +
      "</svg>"
    );
  }

  function mount(cfg) {
    var app = document.getElementById("app");
    if (!app) return;
    app.textContent = "";
    document.title = cfg.title + " · " + cfg.titleEn;

    var head = el("header", "top");
    var back = el("a", "back", "← 生物科 Biology");
    back.href = cfg.back || "../../index.html";
    head.appendChild(back);
    var chips = el("p", "chips");
    chips.appendChild(el("span", "chip", cfg.form));
    chips.appendChild(el("span", "chip unit", cfg.unit));
    head.appendChild(chips);
    head.appendChild(el("h1", null, cfg.title));
    head.appendChild(el("p", "en", cfg.titleEn));
    app.appendChild(head);

    var obj = el("section", "card");
    obj.appendChild(el("h2", null, "學習目標"));
    var ul = document.createElement("ul");
    (cfg.objectives || []).forEach(function (item) {
      ul.appendChild(el("li", null, item));
    });
    obj.appendChild(ul);
    if (cfg.note) obj.appendChild(el("p", "note", cfg.note));
    app.appendChild(obj);

    var fig = el("section", "card");
    fig.appendChild(el("h2", null, "過程圖"));
    var figBody = el("div", "fig");
    var figCap = el("p", "cap");
    fig.appendChild(figBody);
    fig.appendChild(figCap);
    app.appendChild(fig);

    var task = el("section", "card");
    task.appendChild(el("h2", null, "你要做的一件事"));
    task.appendChild(el("p", "lead", cfg.lead));
    var taskBody = el("div");
    var fb = el("p", "fb");
    fb.setAttribute("aria-live", "polite");
    task.appendChild(taskBody);
    task.appendChild(fb);
    app.appendChild(task);
    app.appendChild(el("footer", "tiny", "@HKSTEAMAI All Copy-Right Reserved."));

    function setFig(html, cap) {
      figBody.innerHTML = html || "";
      figCap.textContent = cap || "";
    }
    function setFb(text, kind) {
      fb.textContent = text || "";
      fb.className = "fb" + (kind ? " " + kind : "");
    }

    if (cfg.kind === "sequence") mountSequence(cfg, taskBody, setFig, setFb);
    else if (cfg.kind === "match") mountMatch(cfg, taskBody, setFig, setFb);
    else if (cfg.kind === "curve") mountCurve(cfg, taskBody, setFig, setFb);
    else setFb("這課尚未設定任務。", "bad");
  }

  function mountSequence(cfg, host, setFig, setFb) {
    var progress = 0;
    setFig(cfg.introSvg, cfg.introCap || "點選下一步。選錯會立刻說明。");
    var row = el("div", "choices");
    var items = cfg.steps.map(function (step, index) {
      return { type: "step", index: index, label: step.label };
    }).concat((cfg.decoys || []).map(function (decoy) {
      return { type: "decoy", label: decoy.label, why: decoy.why };
    }));
    var buttons = [];
    shuffle(items).forEach(function (item) {
      var button = el("button", "choice", item.label);
      button.type = "button";
      button.addEventListener("click", function () {
        choose(item, button);
      });
      row.appendChild(button);
      buttons.push({ item: item, button: button });
    });
    host.appendChild(row);
    var done = el("p", "done");
    host.appendChild(done);

    function choose(item, button) {
      if (progress >= cfg.steps.length) return;
      if (item.type === "step" && item.index < progress) {
        tone("tick");
        setFb("這一步已經完成。", "ok");
        return;
      }
      if (item.type === "step" && item.index === progress) {
        var step = cfg.steps[progress];
        tone("ok");
        setFig(step.svg, step.detail);
        setFb("正確。" + step.detail, "ok");
        button.disabled = true;
        progress += 1;
        if (progress === cfg.steps.length) done.textContent = cfg.success;
        return;
      }
      tone("bad");
      if (item.type === "decoy") setFb(item.why, "bad");
      else setFb("還沒到這一步。先完成前面的步驟。", "bad");
    }
  }

  function findCase(cases, values) {
    var i;
    for (i = 0; i < cases.length; i++) {
      var when = cases[i].when;
      var keys = Object.keys(when);
      var match = keys.every(function (key) { return when[key] === values[key]; });
      if (match) return cases[i];
    }
    return null;
  }

  function mountMatch(cfg, host, setFig, setFb) {
    setFig(cfg.introSvg, cfg.introCap || "");
    var fields = el("div", "fields");
    var selects = {};
    cfg.fields.forEach(function (field) {
      var label = el("label", "field", field.label);
      var select = document.createElement("select");
      select.appendChild(new Option("請選擇", ""));
      field.options.forEach(function (option) {
        select.appendChild(new Option(option.label, option.id));
      });
      label.appendChild(select);
      fields.appendChild(label);
      selects[field.id] = select;
    });
    host.appendChild(fields);
    var go = el("button", "go", cfg.action || "測試");
    go.type = "button";
    go.style.marginTop = "10px";
    host.appendChild(go);
    go.addEventListener("click", function () {
      var values = {};
      var missing = false;
      cfg.fields.forEach(function (field) {
        values[field.id] = selects[field.id].value;
        if (!values[field.id]) missing = true;
      });
      if (missing) {
        tone("bad");
        setFb("先選齊每一項，再按按鈕。", "bad");
        return;
      }
      var found = findCase(cfg.cases, values);
      if (!found) {
        tone("bad");
        setFb(cfg.fallback || "這個組合不在本課的結果表內。", "bad");
        return;
      }
      tone(found.ok ? "ok" : "bad");
      setFig(found.svg || cfg.introSvg, found.caption || "");
      setFb(found.feedback, found.ok ? "ok" : "bad");
    });
  }

  function mountCurve(cfg, host, setFig, setFb) {
    var slider = cfg.slider;
    var touched = false;
    var value = slider.start;
    function draw() {
      var shift = cfg.shiftFrom + (value / 100) * (cfg.shiftTo - cfg.shiftFrom);
      var cap = value >= cfg.highAt ? cfg.highCaption : cfg.lowCaption;
      setFig(sigmoidSvg(shift, cfg.curveLabel || "氧離曲線"), cap);
    }
    draw();
    var row = el("div", "slider-row");
    var name = el("span", null, slider.label);
    var read = el("span", null, String(slider.start));
    row.appendChild(name);
    row.appendChild(read);
    host.appendChild(row);
    var input = document.createElement("input");
    input.type = "range";
    input.min = String(slider.min);
    input.max = String(slider.max);
    input.value = String(slider.start);
    input.addEventListener("input", function () {
      touched = true;
      value = Number(input.value);
      read.textContent = input.value;
      draw();
    });
    input.addEventListener("change", function () {
      tone("tick");
    });
    host.appendChild(input);
    host.appendChild(el("p", "lead", cfg.question));
    var choices = el("div", "choices");
    cfg.choices.forEach(function (choice) {
      var button = el("button", "choice", choice.label);
      button.type = "button";
      button.addEventListener("click", function () {
        if (!touched) {
          tone("bad");
          setFb("先拉動滑桿，看曲線怎樣移動，再作答。", "bad");
          return;
        }
        if (choice.ok && value < cfg.highAt) {
          tone("bad");
          setFb(cfg.needHigh, "bad");
          return;
        }
        tone(choice.ok ? "ok" : "bad");
        setFb(choice.why, choice.ok ? "ok" : "bad");
      });
      choices.appendChild(button);
    });
    host.appendChild(choices);
  }

  window.BioLesson = { mount: mount };
})();
