/**
 * HKDSE Dynamic Earth — shared lesson UI
 */
(function (global) {
  "use strict";

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function renderTabs(panel, content, tabs) {
    const nav = el("div", "lesson-tabs");
    const body = el("div", "lesson-tab-body");
    const panes = [];

    tabs.forEach((tab, i) => {
      const btn = el("button", "lesson-tab" + (i === 0 ? " is-active" : ""), tab.label);
      btn.type = "button";
      const pane = el("div", "lesson-pane" + (i === 0 ? " is-active" : ""));
      tab.render(pane, content);
      panes.push(pane);
      body.appendChild(pane);
      btn.onclick = () => {
        nav.querySelectorAll(".lesson-tab").forEach((b) => b.classList.remove("is-active"));
        panes.forEach((p) => p.classList.remove("is-active"));
        btn.classList.add("is-active");
        pane.classList.add("is-active");
      };
      nav.appendChild(btn);
    });

    panel.appendChild(nav);
    panel.appendChild(body);
  }

  function renderObjectives(container, items) {
    const card = el("div", "card");
    card.innerHTML = '<h3>學習目標</h3><ul class="check-list"></ul>';
    const ul = card.querySelector("ul");
    items.forEach((t) => {
      const li = el("li", "", t);
      ul.appendChild(li);
    });
    container.appendChild(card);
  }

  function renderGuiding(container, items) {
    const card = el("div", "card card--guide");
    card.innerHTML = "<h3>引導問題</h3>";
    items.forEach((q) => {
      const p = el("p", "guide-q", "「" + q + "」");
      card.appendChild(p);
    });
    container.appendChild(card);
  }

  function renderSections(container, sections) {
    sections.forEach((sec, i) => {
      const acc = el("details", "accordion" + (i < 2 ? " is-open" : ""));
      if (i < 2) acc.open = true;
      acc.innerHTML = `<summary>${sec.title}</summary><div class="accordion__body">${sec.body}</div>`;
      container.appendChild(acc);
    });
  }

  function renderGlossary(container, terms) {
    const grid = el("div", "glossary-grid");
    terms.forEach((t) => {
      const item = el("div", "glossary-item");
      item.innerHTML = `<dt>${t.term}</dt><dd>${t.def}</dd>`;
      grid.appendChild(item);
    });
    container.appendChild(grid);
  }

  function renderExamTips(container, tips) {
    const ul = el("ul", "exam-tips");
    tips.forEach((t) => {
      const li = el("li", "", t);
      ul.appendChild(li);
    });
    container.appendChild(ul);
  }

  function renderQuiz(container, questions) {
    let idx = 0;
    let score = 0;
    let answered = 0;
    const header = el("div", "quiz-header");
    const progress = el("div", "quiz-progress");
    const bar = el("div", "quiz-progress__bar");
    progress.appendChild(bar);
    const scoreEl = el("p", "quiz-score", "");
    header.appendChild(progress);
    header.appendChild(scoreEl);
    container.appendChild(header);

    const qBox = el("div", "quiz-question-box");
    container.appendChild(qBox);

    const feedback = el("div", "quiz-feedback");
    container.appendChild(feedback);

    const nav = el("div", "quiz-nav");
    const nextBtn = el("button", "btn btn--primary", "下一題");
    nextBtn.type = "button";
    nav.appendChild(nextBtn);
    container.appendChild(nav);

    function show() {
      if (idx >= questions.length) {
        qBox.innerHTML = `<h3>測驗完成</h3><p>得分：<strong>${score} / ${questions.length}</strong></p>
          <p class="muted">${score >= questions.length * 0.75 ? "表現優秀！可進入下一課。" : "建議重温「內容」分頁後再試。"}</p>`;
        feedback.innerHTML = "";
        nextBtn.style.display = "none";
        bar.style.width = "100%";
        return;
      }
      const q = questions[idx];
      bar.style.width = (idx / questions.length) * 100 + "%";
      scoreEl.textContent = `第 ${idx + 1} / ${questions.length} 題 · 已答對 ${score} 題`;
      qBox.innerHTML = `<p class="quiz-q">${q.q}</p>`;
      feedback.innerHTML = "";
      q.opts.forEach((opt, oi) => {
        const btn = el("button", "quiz-opt", opt);
        btn.type = "button";
        btn.onclick = () => {
          if (qBox.dataset.done) return;
          qBox.dataset.done = "1";
          const ok = oi === q.ans;
          if (ok) score++;
          answered++;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) {
            qBox.querySelectorAll(".quiz-opt").forEach((b, j) => {
              if (j === q.ans) b.classList.add("correct");
            });
          }
          feedback.innerHTML = `<p class="${ok ? "fb-ok" : "fb-err"}">${ok ? "✓ 正確" : "✗ 再想想"} — ${q.explain}</p>`;
        };
        qBox.appendChild(btn);
      });
      delete qBox.dataset.done;
    }

    nextBtn.onclick = () => {
      idx++;
      show();
    };
    show();
  }

  function renderMatchQuiz(container, items) {
    const card = el("div", "card");
    card.innerHTML = "<h3>地貌配對練習</h3>";
    items.forEach((row) => {
      const wrap = el("div", "match-row-ui");
      wrap.innerHTML = `<span class="match-label">${row.boundary}</span>`;
      const sel = el("select", "match-select");
      row.options.forEach((opt, i) => {
        const o = el("option", "", opt);
        o.value = ["divergent", "convergent", "conservative"][i] || opt;
        sel.appendChild(o);
      });
      sel.dataset.answer = row.answer;
      wrap.appendChild(sel);
      card.appendChild(wrap);
    });
    const check = el("button", "btn btn--primary", "檢查配對");
    check.type = "button";
    const fb = el("div", "quiz-feedback");
    check.onclick = () => {
      let ok = true;
      card.querySelectorAll(".match-select").forEach((s) => {
        if (s.value !== s.dataset.answer) ok = false;
      });
      fb.innerHTML = ok
        ? '<p class="fb-ok">✓ 全部正確！記住：張裂→海嶺、消亡→海溝造山、保守→斷層。</p>'
        : '<p class="fb-err">部分配對有誤，對照「內容」分頁的邊界表格。</p>';
    };
    card.appendChild(check);
    card.appendChild(fb);
    container.appendChild(card);
  }

  function renderLayerPanel(container, layers, onSelect) {
    const card = el("div", "card");
    card.innerHTML = "<h3>點選地層 · 3D 剖面</h3>";
    const row = el("div", "btn-row");
    layers.forEach((L, i) => {
      const btn = el("button", "btn" + (i === 0 ? " is-active" : ""), L.name);
      btn.type = "button";
      btn.onclick = () => {
        row.querySelectorAll(".btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        onSelect(L.id, L);
        info.innerHTML = `<p><strong>${L.name}</strong>（${L.depth}）</p><p>${L.state}</p><p class="note">${L.fact}</p>`;
      };
      row.appendChild(btn);
    });
    card.appendChild(row);
    const info = el("div", "layer-info");
    const L0 = layers[0];
    info.innerHTML = `<p><strong>${L0.name}</strong>（${L0.depth}）</p><p>${L0.state}</p><p class="note">${L0.fact}</p>`;
    card.appendChild(info);
    container.appendChild(card);
    return { select: (id) => row.querySelectorAll(".btn")[layers.findIndex((l) => l.id === id)]?.click() };
  }

  function initLesson(key, opts) {
    const content = global.LESSON_CONTENT[key];
    if (!content) return null;

    const panel = document.getElementById(opts.panelId || "lesson-panel");
    if (!panel) return null;

    const header = el("div", "lesson-header");
    header.innerHTML = `
      <p class="tag">${content.meta.tag}</p>
      <h1>${opts.title || document.title.split("|")[0].trim()}</h1>
      ${opts.lead ? `<p class="lead">${opts.lead}</p>` : ""}
    `;
    panel.appendChild(header);

    renderTabs(panel, content, [
      {
        label: "概覽",
        render: (c, data) => {
          renderGuiding(c, data.guiding);
          renderObjectives(c, data.objectives);
        },
      },
      {
        label: "內容",
        render: (c, data) => renderSections(c, data.sections),
      },
      {
        label: "詞彙",
        render: (c, data) => {
          if (global.LessonExercises) {
            global.LessonExercises.renderFlashcards(c, data.glossary);
          }
          renderGlossary(c, data.glossary);
        },
      },
      {
        label: "練習",
        render: (c, data) => {
          let hasContent = false;
          const Ex = global.LessonExercises;
          if (data.sortExercise && Ex) {
            Ex.renderSortExercise(c, data.sortExercise);
            hasContent = true;
          }
          if (data.layerMatch && Ex) {
            Ex.renderLayerMatch(c, data.layerMatch);
            hasContent = true;
          }
          if (data.stakeholderExercise && Ex) {
            Ex.renderStakeholderMatrix(c, data.stakeholderExercise);
            hasContent = true;
          }
          if (data.matchItems) {
            renderMatchQuiz(c, data.matchItems);
            hasContent = true;
          }
          if (!hasContent) {
            c.innerHTML = '<p class="muted">本課互動練習見「測驗」分頁。</p>';
          }
        },
      },
      {
        label: "DSE",
        render: (c, data) => {
          const card = el("div", "card");
          card.innerHTML = "<h3>應試提示</h3>";
          c.appendChild(card);
          renderExamTips(card, data.examTips);
          if (data.examEssays && global.LessonExercises) {
            const box = el("div", "card");
            box.innerHTML = "<h3>資料回應／論述題</h3>";
            c.appendChild(box);
            global.LessonExercises.renderExamEssays(box, data.examEssays);
          }
        },
      },
      {
        label: "測驗",
        render: (c, data) => renderQuiz(c, data.quizzes),
      },
    ]);

    const pager = document.getElementById("lesson-pager");
    if (pager && opts.pager) {
      pager.innerHTML = `
        ${opts.pager.prev ? `<a href="${opts.pager.prev}">← ${opts.pager.prevLabel || "上一課"}</a>` : "<span></span>"}
        ${opts.pager.next ? `<a href="${opts.pager.next}">${opts.pager.nextLabel || "下一課"} →</a>` : ""}
      `;
    }

    return content;
  }

  global.LessonUI = {
    initLesson,
    renderLayerPanel,
    renderQuiz,
    renderMatchQuiz,
    el,
  };
})(typeof window !== "undefined" ? window : global);
