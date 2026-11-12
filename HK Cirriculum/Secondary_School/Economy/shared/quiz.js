(function () {
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  window.startChoices = function (mount, steps) {
    var index = 0;
    function render() {
      var step = steps[index];
      mount.innerHTML = "";
      var card = el("article", "card");
      card.appendChild(el("p", "progress", "第 " + (index + 1) + " / " + steps.length + " 題"));
      card.appendChild(el("h2", null, step.title));
      if (step.html) {
        var body = el("div", "story");
        body.innerHTML = step.html;
        card.appendChild(body);
      }
      var feedback = el("div", "feedback");
      var options = el("div", "options");
      var locked = false;
      step.options.forEach(function (opt) {
        var button = el("button", "option", opt.label);
        button.type = "button";
        button.addEventListener("click", function () {
          if (locked) return;
          if (!window.EconomySfx) return;
          if (!opt.ok) {
            window.EconomySfx.wrong();
            feedback.textContent = opt.why;
            feedback.className = "feedback bad";
            return;
          }
          locked = true;
          window.EconomySfx.correct();
          feedback.textContent = opt.why;
          feedback.className = "feedback good";
          if (step.onCorrect) step.onCorrect();
          if (index === steps.length - 1) {
            var done = el("h3", "done", "本課完成");
            done.id = "lesson-complete";
            card.appendChild(done);
            card.appendChild(el("p", "story", step.closing || "這一課的題目都答對了。"));
          } else {
            var next = el("button", "next", "下一題");
            next.type = "button";
            next.addEventListener("click", function () {
              window.EconomySfx.click();
              index += 1;
              render();
            });
            card.appendChild(next);
          }
        });
        options.appendChild(button);
      });
      card.appendChild(options);
      card.appendChild(feedback);
      mount.appendChild(card);
      if (step.onShow) step.onShow();
    }
    render();
  };
})();
