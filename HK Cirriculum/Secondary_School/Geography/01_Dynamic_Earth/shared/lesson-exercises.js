/**
 * Advanced lesson exercises — stakeholders, sorting, DSE long questions
 */
(function (global) {
  "use strict";

  function el(tag, cls, html) {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }

  function renderStakeholderMatrix(container, data) {
    const card = el("div", "card");
    card.innerHTML = "<h3>持份者立場配對</h3><p class='muted'>將每句觀點拖放／點選對應持份者（DSE 評估題必備）</p>";
    container.appendChild(card);

    const stakeholders = data.stakeholders;
    let score = 0;
    const fb = el("div", "quiz-feedback");

    data.statements.forEach((stmt, si) => {
      const row = el("div", "stakeholder-row");
      row.innerHTML = `<p class="stakeholder-stmt">「${stmt.text}」</p>`;
      const opts = el("div", "btn-row");
      stakeholders.forEach((sh, hi) => {
        const btn = el("button", "btn btn--sm", sh.name);
        btn.type = "button";
        btn.onclick = () => {
          if (row.dataset.done) return;
          const ok = hi === stmt.stakeholder;
          row.dataset.done = "1";
          if (ok) score++;
          btn.classList.add(ok ? "correct" : "wrong");
          if (!ok) {
            opts.querySelectorAll(".btn")[stmt.stakeholder]?.classList.add("correct");
          }
          row.classList.add(ok ? "row-ok" : "row-err");
        };
        opts.appendChild(btn);
      });
      row.appendChild(opts);
      card.appendChild(row);
    });

    const check = el("button", "btn btn--primary", "查看結果");
    check.type = "button";
    check.onclick = () => {
      const total = data.statements.length;
      const done = card.querySelectorAll("[data-done]").length;
      fb.innerHTML = `<p class="${score >= total * 0.7 ? "fb-ok" : "fb-err"}">配對 ${score}/${total}（已完成 ${done}/${total} 題）</p>`;
    };
    card.appendChild(check);
    card.appendChild(fb);
  }

  function renderSortExercise(container, data) {
    const card = el("div", "card");
    card.innerHTML = `<h3>${data.title}</h3><p class="muted">${data.prompt}</p>`;
    const pool = el("div", "sort-pool");
    const zones = el("div", "sort-zones");

    const shuffled = [...data.items].sort(() => Math.random() - 0.5);
    shuffled.forEach((item) => {
      const chip = el("button", "sort-chip", item.text);
      chip.type = "button";
      chip.dataset.cat = item.category;
      chip.dataset.picked = "";
      chip.onclick = () => {
        chip.classList.toggle("is-picked");
        chip.dataset.picked = chip.classList.contains("is-picked") ? "1" : "";
      };
      pool.appendChild(chip);
    });

    data.categories.forEach((cat) => {
      const zone = el("div", "sort-zone");
      zone.innerHTML = `<h4>${cat.label}</h4><div class="sort-zone__items" data-cat="${cat.id}"></div>`;
      zones.appendChild(zone);
    });

    card.appendChild(pool);
    const assignRow = el("div", "btn-row");
    data.categories.forEach((cat) => {
      const btn = el("button", "btn", "放入：「" + cat.label + "」");
      btn.type = "button";
      btn.onclick = () => {
        pool.querySelectorAll(".sort-chip.is-picked").forEach((chip) => {
          const target = zones.querySelector(`[data-cat="${cat.id}"]`);
          if (chip.parentElement === pool) target.appendChild(chip);
          chip.classList.remove("is-picked");
        });
      };
      assignRow.appendChild(btn);
    });
    card.appendChild(assignRow);
    card.appendChild(zones);

    const fb = el("div", "quiz-feedback");
    const check = el("button", "btn btn--primary", "檢查分類");
    check.type = "button";
    check.onclick = () => {
      let ok = 0;
      let total = 0;
      zones.querySelectorAll(".sort-zone__items").forEach((zone) => {
        const cat = zone.dataset.cat;
        zone.querySelectorAll(".sort-chip").forEach((chip) => {
          total++;
          if (chip.dataset.cat === cat) {
            ok++;
            chip.style.borderColor = "#4ade80";
          } else chip.style.borderColor = "#f87171";
        });
      });
      fb.innerHTML = `<p class="${ok === total && total > 0 ? "fb-ok" : "fb-err"}">正確 ${ok}/${total || data.items.length} 項</p>`;
    };
    card.appendChild(check);
    card.appendChild(fb);
    container.appendChild(card);
  }

  function renderLayerMatch(container, data) {
    const card = el("div", "card");
    card.innerHTML = `<h3>${data.title}</h3><p class="muted">${data.prompt}</p>`;
    const choices = data.choices || [];
    data.items.forEach((row) => {
      const wrap = el("div", "match-row-ui");
      wrap.innerHTML = `<span class="match-label">${row.label}</span>`;
      const sel = el("select", "match-select");
      choices.forEach((ch) => {
        const o = el("option", "", ch.label);
        o.value = ch.id;
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
      let ok = 0;
      card.querySelectorAll(".match-select").forEach((s) => {
        if (s.value === s.dataset.answer) ok++;
      });
      const total = data.items.length;
      fb.innerHTML = ok === total
        ? `<p class="fb-ok">✓ 全部正確（${ok}/${total}）！可對照左側 3D 剖面複習。</p>`
        : `<p class="fb-err">正確 ${ok}/${total}，錯誤題請重温「內容」分頁的內部結構表。</p>`;
    };
    card.appendChild(check);
    card.appendChild(fb);
    container.appendChild(card);
  }

  function renderExamEssays(container, essays) {
    essays.forEach((essay, i) => {
      const acc = el("details", "accordion exam-essay" + (i === 0 ? " is-open" : ""));
      if (i === 0) acc.open = true;
      acc.innerHTML = `
        <summary>${essay.title} <span class="marks-badge">${essay.marks} 分</span></summary>
        <div class="accordion__body">
          <p class="exam-q">${essay.question}</p>
          ${essay.data ? `<div class="exam-data">${essay.data}</div>` : ""}
          <details class="mark-scheme">
            <summary>顯示評分準則與參考答法</summary>
            <div class="mark-scheme__body">${essay.markScheme}</div>
          </details>
        </div>`;
      container.appendChild(acc);
    });
  }

  function renderFlashcards(container, terms) {
    const card = el("div", "card flashcard-box");
    let idx = 0;
    let flipped = false;
    const inner = el("div", "flashcard");
    const nav = el("div", "flashcard-nav");
    const prev = el("button", "btn", "←");
    const next = el("button", "btn", "→");
    prev.type = "button";
    next.type = "button";
    const counter = el("span", "flashcard-counter", "");

    function show() {
      const t = terms[idx];
      flipped = false;
      inner.classList.remove("is-flipped");
      inner.innerHTML = `<div class="flashcard__front"><strong>${t.term}</strong><br><small>點擊翻轉</small></div>`;
      counter.textContent = `${idx + 1} / ${terms.length}`;
    }

    inner.onclick = () => {
      flipped = !flipped;
      inner.classList.toggle("is-flipped", flipped);
      const t = terms[idx];
      inner.innerHTML = flipped
        ? `<div class="flashcard__back">${t.def}</div>`
        : `<div class="flashcard__front"><strong>${t.term}</strong><br><small>點擊翻轉</small></div>`;
    };
    prev.onclick = () => { idx = (idx - 1 + terms.length) % terms.length; show(); };
    next.onclick = () => { idx = (idx + 1) % terms.length; show(); };
    nav.appendChild(prev);
    nav.appendChild(counter);
    nav.appendChild(next);
    card.appendChild(inner);
    card.appendChild(nav);
    container.appendChild(card);
    show();
  }

  global.LessonExercises = {
    renderStakeholderMatrix,
    renderSortExercise,
    renderLayerMatch,
    renderExamEssays,
    renderFlashcards,
    el,
  };
})(typeof window !== "undefined" ? window : global);
