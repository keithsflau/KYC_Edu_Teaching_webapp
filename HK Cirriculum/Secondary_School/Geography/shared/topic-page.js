/**
 * One-task geography page: objectives, a click or a choice, feedback, short audio.
 */
(function (global) {
  "use strict";

  function el(tag, cls, text) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function play(correct) {
    if (!global.GeoAudio) return;
    global.GeoAudio[correct ? "ok" : "no"]();
  }

  function showFeedback(node, correct, text) {
    node.className = "feedback show " + (correct ? "ok" : "err");
    node.textContent = text;
  }

  function mount(root, lesson) {
    root.className = "topic-app";
    root.appendChild(el("a", "back", "← 地理科")).href = lesson.back || "../../index.html";
    root.appendChild(el("p", "kicker", lesson.kicker));
    root.appendChild(el("h1", "", lesson.title));
    root.appendChild(el("p", "lead", lesson.lead));

    const goals = el("section", "card");
    goals.appendChild(el("h2", "", "學習目標"));
    const ul = document.createElement("ul");
    lesson.objectives.forEach((t) => ul.appendChild(el("li", "", t)));
    goals.appendChild(ul);
    root.appendChild(goals);

    const task = el("section", "card");
    task.appendChild(el("h2", "", lesson.taskTitle));
    task.appendChild(el("p", "lead", lesson.prompt));

    if (lesson.reading) {
      const table = document.createElement("table");
      table.className = "reading";
      lesson.reading.forEach((row) => {
        const tr = document.createElement("tr");
        tr.appendChild(el("td", "", row.place));
        tr.appendChild(el("td", "", row.note));
        table.appendChild(tr);
      });
      task.appendChild(table);
    }

    if (lesson.kind === "map") {
      const compass = el("p", "compass", "北 ↑　　示意圖，不是測繪處地圖");
      task.appendChild(compass);
      const map = el("div", "schematic");
      lesson.rows.forEach((row) => {
        const line = el("div", "row");
        row.forEach((item) => {
          if (item.harbour) {
            line.appendChild(el("span", "harbour", item.label));
            return;
          }
          const btn = el("button", "map-btn", item.label);
          btn.type = "button";
          btn.onclick = () => {
            line.parentElement.querySelectorAll(".map-btn").forEach((b) => b.classList.remove("picked"));
            btn.classList.add("picked");
            play(item.correct);
            showFeedback(fb, item.correct, item.feedback);
          };
          line.appendChild(btn);
        });
        map.appendChild(line);
      });
      task.appendChild(map);
    }

    if (lesson.kind === "grid") {
      task.appendChild(el("p", "compass", "北 ↑　　只畫一格，方便讀六位格網"));
      const board = el("div", "grid-board");
      board.setAttribute("aria-label", "格網示意，上方為北。左線 81，右線 82，下線 41，上線 42。圓點在格內東邊一半、北邊三成。");
      board.appendChild(el("span", "axis axis-n", "42"));
      board.appendChild(el("span", "axis axis-s", "41"));
      board.appendChild(el("span", "axis axis-w", "81"));
      board.appendChild(el("span", "axis axis-e", "82"));
      const sq = el("div", "grid-sq");
      sq.appendChild(el("span", "grid-dot", ""));
      board.appendChild(sq);
      task.appendChild(board);
      task.appendChild(el("p", "note", "圓點在這一格的中間偏右（由 81 向東走了十分之五），並由 41 向北走了十分之三。先讀東距，再讀北距。"));
    }

    const choices = el("div", "choices");
    (lesson.choices || []).forEach((c) => {
      const btn = el("button", "choice", c.label);
      btn.type = "button";
      btn.onclick = () => {
        choices.querySelectorAll(".choice").forEach((b) => b.classList.remove("picked"));
        btn.classList.add("picked");
        play(c.correct);
        showFeedback(fb, c.correct, c.feedback);
      };
      choices.appendChild(btn);
    });
    if (lesson.choices) task.appendChild(choices);

    const fb = el("div", "feedback");
    fb.setAttribute("aria-live", "polite");
    task.appendChild(fb);
    if (lesson.note) task.appendChild(el("p", "note", lesson.note));
    root.appendChild(task);
  }

  global.TopicPage = { mount };
})(typeof window !== "undefined" ? window : global);
