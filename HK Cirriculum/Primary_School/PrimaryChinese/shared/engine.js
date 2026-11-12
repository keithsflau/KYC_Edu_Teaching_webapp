/* Grade lesson runner. Answers stay hidden until the pupil answers. */
(function () {
  var sfx = window.HKSfx || { ok: function () {}, bad: function () {}, done: function () {}, unlock: function () {} };

  function el(tag, cls) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    return node;
  }

  function text(tag, cls, value) {
    var node = el(tag, cls);
    node.textContent = value;
    return node;
  }

  function start(lesson) {
    var app = document.getElementById("app");
    if (!app || !lesson || !lesson.items || !lesson.items.length) return;
    var index = 0;

    function renderDone() {
      sfx.done();
      app.innerHTML = "";
      var panel = el("section", "panel done");
      panel.appendChild(text("h2", "", "這課完成了"));
      panel.appendChild(text("p", "", lesson.done || "你已完成本課的練習。"));
      var actions = el("div", "actions");
      var again = el("button", "ghost");
      again.type = "button";
      again.textContent = "再做一次";
      again.addEventListener("click", function () {
        index = 0;
        render();
      });
      actions.appendChild(again);
      panel.appendChild(actions);
      app.appendChild(panel);
    }

    function render() {
      var item = lesson.items[index];
      app.innerHTML = "";
      var progress = el("div", "progress");
      progress.appendChild(text("span", "", "第 " + (index + 1) + " / " + lesson.items.length + " 題"));
      progress.appendChild(text("span", "", "先作答，才會出現回饋"));
      app.appendChild(progress);

      var panel = el("section", "panel");
      if (item.passage) panel.appendChild(text("p", "passage", item.passage));
      panel.appendChild(text("h2", "prompt", item.prompt));

      var feedback = el("div", "feedback");
      feedback.setAttribute("role", "status");
      feedback.setAttribute("aria-live", "polite");
      feedback.hidden = true;

      if (item.type === "order") renderOrder(panel, item, feedback);
      else renderChoice(panel, item, feedback);

      panel.appendChild(feedback);
      app.appendChild(panel);
    }

    function showFeedback(feedback, kind, message) {
      feedback.hidden = false;
      feedback.className = "feedback " + kind;
      feedback.textContent = message;
    }

    function goNext(panel) {
      var next = el("button", "next");
      next.type = "button";
      next.textContent = index + 1 === lesson.items.length ? "完成這課" : "下一題";
      next.addEventListener("click", function () {
        index += 1;
        if (index >= lesson.items.length) renderDone();
        else render();
      });
      var actions = el("div", "actions");
      actions.appendChild(next);
      panel.appendChild(actions);
    }

    function renderChoice(panel, item, feedback) {
      var box = el("div", "choices");
      var solved = false;
      item.options.forEach(function (opt) {
        var btn = el("button", "choice");
        btn.type = "button";
        btn.textContent = opt.text;
        btn.addEventListener("click", function () {
          if (solved) return;
          sfx.unlock();
          if (opt.ok) {
            solved = true;
            btn.classList.add("good");
            box.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
            showFeedback(feedback, "ok", opt.because);
            sfx.ok();
            goNext(panel);
          } else {
            btn.classList.add("miss");
            btn.disabled = true;
            sfx.bad();
            showFeedback(feedback, "bad", opt.why);
          }
        });
        box.appendChild(btn);
      });
      panel.appendChild(box);
    }

    function renderOrder(panel, item, feedback) {
      var picked = [];
      var strikes = 0;
      var solved = false;
      var row = el("div", "picked-row");
      row.appendChild(text("span", "", "你的次序會出現在這裡"));
      var bank = el("div", "order-bank");
      var actions = el("div", "actions");

      function paint() {
        row.innerHTML = "";
        if (!picked.length) {
          row.appendChild(text("span", "", "尚未選擇"));
          return;
        }
        picked.forEach(function (word) {
          row.appendChild(text("span", "", word));
        });
      }

      item.choices.forEach(function (word) {
        var btn = el("button", "choice");
        btn.type = "button";
        btn.textContent = word;
        btn.addEventListener("click", function () {
          if (solved) return;
          sfx.unlock();
          var at = picked.indexOf(word);
          if (at >= 0) picked.splice(at, 1);
          else picked.push(word);
          btn.classList.toggle("picked", picked.indexOf(word) >= 0);
          paint();
        });
        bank.appendChild(btn);
      });

      var check = el("button", "check");
      check.type = "button";
      check.textContent = "檢查次序";
      check.addEventListener("click", function () {
        if (solved) return;
        sfx.unlock();
        if (picked.length !== item.answer.length) {
          sfx.bad();
          showFeedback(feedback, "bad", "還未排完。請把每一個部分都用上，再檢查。");
          return;
        }
        var same = picked.every(function (word, i) { return word === item.answer[i]; });
        if (same) {
          solved = true;
          bank.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
          check.disabled = true;
          showFeedback(feedback, "ok", item.because);
          sfx.ok();
          goNext(panel);
          return;
        }
        strikes += 1;
        sfx.bad();
        if (strikes >= 2) {
          solved = true;
          bank.querySelectorAll("button").forEach(function (b) { b.disabled = true; });
          check.disabled = true;
          var glue = item.glue == null ? "" : item.glue;
          showFeedback(feedback, "bad", item.why + " 正確次序是：" + item.answer.join(glue));
          goNext(panel);
        } else {
          showFeedback(feedback, "bad", item.why + " 再排一次。");
          picked = [];
          bank.querySelectorAll("button").forEach(function (b) { b.classList.remove("picked"); });
          paint();
        }
      });

      actions.appendChild(check);
      panel.appendChild(row);
      panel.appendChild(bank);
      panel.appendChild(actions);
    }

    render();
  }

  function boot() {
    if (window.LESSON) start(window.LESSON);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
