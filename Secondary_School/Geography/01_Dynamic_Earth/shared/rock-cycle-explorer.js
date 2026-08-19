/**
 * Rock Cycle Explorer — animated SVG cycle diagram + DSE notes
 */
(function (global) {
  "use strict";

  const FORCES = {
    volcanic: { zh: "火山作用", color: "#f97316", icon: "🌋" },
    sedimentary: { zh: "沉積作用", color: "#4ade80", icon: "🏖" },
    metamorphic: { zh: "變質作用", color: "#a78bfa", icon: "💎" },
    external: { zh: "外營力", color: "#38bdf8", icon: "🌧" },
  };

  const ROCKS = {
    igneous: {
      id: "igneous", name: "火成岩", en: "Igneous",
      color: "#f97316", icon: "🪨",
      force: "volcanic",
      summary: "岩漿冷卻結晶而成；結晶顆粒粗幼視乎冷卻速度。",
      steps: ["岩漿在地殼或地表", "熱量散失", "礦物結晶", "形成火成岩"],
      traits: ["可有粗粒或細粒結晶", "噴出岩常見氣孔（如玄武岩）", "侵入岩結晶較粗（如花崗岩）"],
      hk: ["花崗岩 — 新界、大嶼山（侵入岩，約佔全港 50%）", "玄武岩 — 西貢火山岩區（噴出岩）", "凝灰岩 — 西貢粮船湾超級火山遺跡"],
      exam: "DSE 常考：侵入岩（地下慢冷）vs 噴出岩（地表快冷）的結晶差異。",
    },
    sedimentary: {
      id: "sedimentary", name: "沉積岩", en: "Sedimentary",
      color: "#4ade80", icon: "📚",
      force: "sedimentary",
      summary: "風化碎屑或溶解物質經搬運、沉積、壓實及膠結而成。",
      steps: ["岩石風化／侵蝕", "碎屑或溶解物搬運", "在水體或盆地沉積", "上覆負荷壓實 + 膠結成岩"],
      traits: ["常見層理構造", "可能含化石", "顆粒大小反映沉積環境"],
      hk: ["赤柱、北角 — 碎屑沉積岩", "元朗部分地區 — 沉積層", "石灰岩 — 生物化學沉積（教材常例）"],
      exam: "沉積岩不能直接「變」成火成岩，須先熔融成岩漿或經變質。",
    },
    metamorphic: {
      id: "metamorphic", name: "變質岩", en: "Metamorphic",
      color: "#a78bfa", icon: "✨",
      force: "metamorphic",
      summary: "原有岩石在深埋或構造擠壓下，於高溫高壓中重結晶，但未熔融。",
      steps: ["岩石深埋或受擠壓", "溫壓上升但未達熔點", "礦物重結晶、定向排列", "形成片理等變質構造"],
      traits: ["片理／葉理（礦物定向）", "硬度、光澤可改變", "原岩仍可辨（如大理岩來自石灰岩）"],
      hk: ["大理岩 — 石灰岩變質（教材標準例）", "局部接觸變質帶 — 岩漿侵入邊緣", "斷層帶附近動力變質"],
      exam: "變質岩要變火成岩，須先熔融成岩漿再冷卻——唔可以靠變質作用直接變火成岩。",
    },
    magma: {
      id: "magma", name: "岩漿", en: "Magma / Lava",
      color: "#ef4444", icon: "🔥",
      force: "volcanic",
      summary: "地殼或地幔物質熔融形成的熱流體；噴出地表稱熔岩。",
      steps: ["構造活動或熱點加熱", "岩石部分或完全熔融", "岩漿房聚集", "侵入或噴出 → 冷卻成火成岩"],
      traits: ["高溫（約 700–1200°C）", "成分影響岩性（長英質／鎂鐵質）", "循環的起點與終點"],
      hk: ["白堊紀末西貢超級火山", "侏羅紀花崗岩漿侵入", "香港無活火山，但保留古代岩漿活動遺跡"],
      exam: "循環圖必標「岩漿」— 多數火成岩的直接來源。",
    },
  };

  const EDGES = [
    { id: "e1", from: "magma", to: "igneous", label: "冷卻結晶", force: "volcanic", lx: 0, ly: -10 },
    { id: "e2", from: "igneous", to: "sedimentary", label: "風化·侵蝕·沉積", force: "sedimentary", lx: 18, ly: -4 },
    { id: "e3", from: "sedimentary", to: "metamorphic", label: "變質作用", force: "metamorphic", lx: 0, ly: -10 },
    { id: "e4", from: "metamorphic", to: "magma", label: "熔融", force: "volcanic", lx: -12, ly: 0 },
    { id: "e5", from: "igneous", to: "metamorphic", label: "變質作用", force: "metamorphic", lx: -22, ly: 6 },
    { id: "e6", from: "metamorphic", to: "sedimentary", label: "風化·沉積", force: "sedimentary", lx: 0, ly: 12 },
    { id: "e7", from: "igneous", to: "magma", label: "重熔", force: "volcanic", lx: 12, ly: 8 },
    { id: "e8", from: "sedimentary", to: "magma", label: "俯衝·部分熔融", force: "volcanic", lx: 20, ly: 4 },
  ];

  /* Main teaching loop — clockwise through four stages */
  const CYCLE_STEPS = [
    { edge: "e1", rock: "magma", next: "igneous", caption: "① 岩漿冷卻結晶 → 形成火成岩" },
    { edge: "e2", rock: "igneous", next: "sedimentary", caption: "② 風化、侵蝕、沉積 → 形成沉積岩" },
    { edge: "e3", rock: "sedimentary", next: "metamorphic", caption: "③ 深埋變質、重結晶 → 形成變質岩" },
    { edge: "e4", rock: "metamorphic", next: "magma", caption: "④ 高溫熔融 → 回到岩漿（循環完成）" },
  ];

  const POS = {
    igneous: { x: 200, y: 55 },
    sedimentary: { x: 330, y: 175 },
    metamorphic: { x: 70, y: 175 },
    magma: { x: 200, y: 295 },
  };

  const STEP_MS = 3200;

  function edgePath(from, to) {
    const A = POS[from], B = POS[to];
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const dx = B.x - A.x, dy = B.y - A.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len * 28, ny = dx / len * 28;
    return `M ${A.x} ${A.y} Q ${mx + nx} ${my + ny} ${B.x} ${B.y}`;
  }

  function edgeLabelPos(from, to, edge) {
    const A = POS[from], B = POS[to];
    const mx = (A.x + B.x) / 2, my = (A.y + B.y) / 2;
    const dx = B.x - A.x, dy = B.y - A.y;
    const len = Math.hypot(dx, dy) || 1;
    const ox = edge.lx || 0, oy = edge.ly || 0;
    return {
      x: mx - (dy / len) * 14 + ox,
      y: my + (dx / len) * 14 - 6 + oy,
    };
  }

  function formatEdge(e) {
    return `${ROCKS[e.from].name} → ${e.label} → ${ROCKS[e.to].name}`;
  }

  function createRockCycleExplorer(container, opts) {
    const onSelect = opts.onSelect || (() => {});
    let selectedRock = opts.defaultRock || "magma";
    let filterForce = "all";
    let animating = false;
    let cycleStep = 0;
    let timerId = null;
    let flowRaf = null;
    let flowT = 0;
    let activeEdgeId = null;

    const root = document.createElement("div");
    root.className = "rock-cycle";
    root.innerHTML = `
      <div class="rock-cycle__help">
        <strong>▶ 播放循環動畫</strong> 睇清四步轉化 · 亦可撳岩類或圖上節點暫停並查閱
      </div>
      <div class="rock-cycle__anim-bar">
        <button type="button" class="btn btn--primary" id="rc-play">▶ 播放循環</button>
        <button type="button" class="btn" id="rc-step">下一步</button>
        <span class="rock-cycle__anim-caption" id="rc-caption"></span>
      </div>
      <div class="rock-cycle__filters" id="rc-filters"></div>
      <div class="rock-cycle__rocks" id="rc-rocks"></div>
      <div class="rock-cycle__diagram-wrap">
        <p class="rock-cycle__diagram-title">岩石循環圖 — 動畫示意（HKDSE E1）</p>
        <svg class="rock-cycle__svg" viewBox="0 0 400 360" id="rc-svg" aria-label="岩石循環圖"></svg>
        <div class="rock-cycle__legend" id="rc-legend"></div>
      </div>
      <div class="rock-cycle__detail" id="rc-detail"></div>
    `;
    container.appendChild(root);

    const playBtn = root.querySelector("#rc-play");
    const stepBtn = root.querySelector("#rc-step");
    const captionEl = root.querySelector("#rc-caption");
    const filtersEl = root.querySelector("#rc-filters");
    const rocksEl = root.querySelector("#rc-rocks");
    const svgEl = root.querySelector("#rc-svg");
    const detailEl = root.querySelector("#rc-detail");
    const legendEl = root.querySelector("#rc-legend");

    filtersEl.innerHTML = `
      <button type="button" class="btn is-active" data-force="all">顯示全部路徑</button>
      ${Object.entries(FORCES).map(([k, v]) =>
        `<button type="button" class="btn" data-force="${k}">${v.icon} ${v.zh}</button>`
      ).join("")}`;

    legendEl.innerHTML = Object.entries(FORCES).map(([k, v]) =>
      `<span><i style="background:${v.color}"></i>${v.zh}</span>`
    ).join("");

    function edgesForRock(rockId) {
      return EDGES.filter((e) => e.from === rockId || e.to === rockId);
    }

    function edgeVisible(e) {
      if (filterForce === "all") return true;
      if (filterForce === "external") {
        return e.label.includes("風化") || e.label.includes("侵蝕");
      }
      return e.force === filterForce;
    }

    function edgesForFilter() {
      return EDGES.filter(edgeVisible);
    }

    const FILTER_FOCUS = {
      volcanic: "magma",
      sedimentary: "sedimentary",
      metamorphic: "metamorphic",
      external: "sedimentary",
    };

    const FILTER_CAPTION = {
      volcanic: "🌋 火山作用：冷卻結晶、熔融、重熔",
      sedimentary: "🏖 沉積作用：風化 → 搬運 → 沉積 → 形成沉積岩",
      metamorphic: "💎 變質作用：高溫高壓重結晶（不熔融）",
      external: "🌧 外營力：風化、侵蝕、搬運碎屑",
    };

    function stopFlowRaf() {
      if (flowRaf) cancelAnimationFrame(flowRaf);
      flowRaf = null;
    }

    function stopAnimation() {
      animating = false;
      if (timerId) clearInterval(timerId);
      timerId = null;
      playBtn.textContent = "▶ 播放循環";
      playBtn.classList.add("btn--primary");
      stopFlowRaf();
    }

    function startFlowRaf() {
      stopFlowRaf();
      const dot = svgEl.querySelector("#rc-flow-dot");
      const path = activeEdgeId ? svgEl.querySelector(`#rc-path-${activeEdgeId}`) : null;
      if (!dot || !path) return;
      const len = path.getTotalLength();
      let start = performance.now();
      function tick(now) {
        if (!animating && !activeEdgeId) return;
        const p = ((now - start) % 2200) / 2200;
        const pt = path.getPointAtLength(p * len);
        dot.setAttribute("cx", pt.x);
        dot.setAttribute("cy", pt.y);
        dot.setAttribute("opacity", "1");
        flowRaf = requestAnimationFrame(tick);
      }
      flowRaf = requestAnimationFrame(tick);
    }

    function applyCycleStep(stepIdx) {
      const step = CYCLE_STEPS[stepIdx];
      cycleStep = stepIdx;
      activeEdgeId = step.edge;
      selectedRock = step.rock;
      captionEl.textContent = step.caption;
      onSelect(ROCKS[step.rock]);
      renderRocks();
      renderSvg();
      renderDetail();
      startFlowRaf();
    }

    function nextCycleStep() {
      applyCycleStep((cycleStep + 1) % CYCLE_STEPS.length);
    }

    function startAnimation() {
      animating = true;
      filterForce = "all";
      filtersEl.querySelectorAll(".btn").forEach((b) => {
        b.classList.toggle("is-active", b.dataset.force === "all");
      });
      playBtn.textContent = "⏸ 暫停";
      applyCycleStep(0);
      timerId = setInterval(nextCycleStep, STEP_MS);
    }

    function toggleAnimation() {
      if (animating) stopAnimation();
      else startAnimation();
    }

    function renderRocks() {
      rocksEl.innerHTML = Object.values(ROCKS).map((r) => `
        <button type="button" class="rock-chip${r.id === selectedRock ? " is-active" : ""}"
          data-rock="${r.id}" style="--rock:${r.color}">
          <span class="rock-chip__icon">${r.icon}</span>
          <span class="rock-chip__name">${r.name}</span>
          <span class="rock-chip__en">${r.en}</span>
        </button>`).join("");
      rocksEl.querySelectorAll("[data-rock]").forEach((btn) => {
        btn.onclick = () => {
          stopAnimation();
          activeEdgeId = null;
          selectRock(btn.dataset.rock);
        };
      });
    }

    function renderSvg() {
      const filtered = edgesForFilter();
      const filterIds = new Set(filtered.map((e) => e.id));
      const manualEdges = edgesForRock(selectedRock).filter(edgeVisible);
      const manualIds = new Set(manualEdges.map((e) => e.id));
      const useFilterMode = filterForce !== "all" && !animating;

      let svg = `
        <defs>
          <marker id="rc-arr" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="currentColor"/>
          </marker>
          <filter id="rc-glow"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>`;

      EDGES.filter(edgeVisible).forEach((e) => {
        const isMainCycle = CYCLE_STEPS.some((s) => s.edge === e.id);
        const isFlow = activeEdgeId === e.id;
        const isHighlight = animating ? isFlow : useFilterMode ? filterIds.has(e.id) : manualIds.has(e.id);
        const d = edgePath(e.from, e.to);
        const lp = edgeLabelPos(e.from, e.to, e);
        const strokeCol = FORCES[e.force]?.color || "#888";

        svg += `<path id="rc-path-${e.id}" class="rc-edge${isFlow ? " is-flow" : ""}${isHighlight ? " is-active" : ""}${isMainCycle ? " is-main" : ""}"
          data-edge="${e.id}" d="${d}" fill="none" stroke="${strokeCol}"
          stroke-width="${isFlow ? 4 : isHighlight ? 3 : 1.5}"
          stroke-opacity="${isFlow ? 1 : isHighlight ? 1 : isMainCycle ? 0.4 : 0.2}"
          marker-end="url(#rc-arr)" style="color:${strokeCol}"/>`;

        const showLabel = animating ? isFlow : isHighlight;
        if (showLabel) {
          const short = `${ROCKS[e.from].name.replace("岩", "")}→${ROCKS[e.to].name.replace("岩", "")}`;
          svg += `<text class="rc-edge-label${isFlow ? " is-flow-label" : ""}" x="${lp.x}" y="${lp.y}" text-anchor="middle">
            <tspan x="${lp.x}" dy="0">${e.label}</tspan>
            <tspan x="${lp.x}" dy="14" class="rc-edge-dir">${short}</tspan>
          </text>`;
        }
      });

      Object.entries(ROCKS).forEach(([id, r]) => {
        const p = POS[id];
        const on = id === selectedRock;
        const isNext = animating && CYCLE_STEPS[cycleStep].next === id;
        svg += `
          <g class="rc-node${on ? " is-active" : ""}${isNext ? " is-next" : ""}" data-node="${id}" style="cursor:pointer">
            <circle cx="${p.x}" cy="${p.y}" r="${on ? 44 : 36}" fill="${r.color}"
              fill-opacity="${on ? 0.4 : 0.12}" stroke="${r.color}" stroke-width="${on ? 3 : 1.5}"
              ${on ? 'filter="url(#rc-glow)"' : ""}/>
            <text x="${p.x}" y="${p.y - 4}" text-anchor="middle" class="rc-node__zh">${r.name}</text>
            <text x="${p.x}" y="${p.y + 12}" text-anchor="middle" class="rc-node__en">${r.en}</text>
          </g>`;
      });

      svg += `<circle id="rc-flow-dot" r="7" fill="#fff" stroke="#4ade80" stroke-width="2" opacity="0"/>`;

      svgEl.innerHTML = svg;

      svgEl.querySelectorAll("[data-node]").forEach((g) => {
        g.onclick = () => {
          stopAnimation();
          activeEdgeId = null;
          selectRock(g.dataset.node);
        };
      });

      if (activeEdgeId) startFlowRaf();
    }

    function renderDetail() {
      const r = ROCKS[selectedRock];
      const F = FORCES[r.force];
      const related = edgesForRock(selectedRock).filter(edgeVisible);
      const stepHint = animating
        ? `<p class="rock-cycle__anim-hint">🔄 ${CYCLE_STEPS[cycleStep].caption}</p>`
        : filterForce !== "all" && FILTER_CAPTION[filterForce]
          ? `<p class="rock-cycle__anim-hint">${FILTER_CAPTION[filterForce]}</p>`
          : "";
      detailEl.innerHTML = `
        ${stepHint}
        <span class="rock-cycle__tag" style="color:${r.color}">${r.icon} ${r.name} · ${F.icon} ${F.zh}</span>
        <h3>${r.name}（${r.en}）</h3>
        <p>${r.summary}</p>
        <div class="rock-cycle__steps">
          <p class="rock-cycle__subhead">形成過程</p>
          <ol>${r.steps.map((s) => `<li>${s}</li>`).join("")}</ol>
        </div>
        <div class="rock-cycle__cols">
          <div>
            <p class="rock-cycle__subhead">特徵</p>
            <ul>${r.traits.map((t) => `<li>${t}</li>`).join("")}</ul>
          </div>
          <div>
            <p class="rock-cycle__subhead">香港例子</p>
            <ul>${r.hk.map((h) => `<li>${h}</li>`).join("")}</ul>
          </div>
        </div>
        <p class="rock-cycle__related"><strong>相關轉化（跟箭咀方向）：</strong></p>
        <ul class="rock-cycle__edge-list">${related.map((e) =>
          `<li>${formatEdge(e)}</li>`
        ).join("")}</ul>
        ${selectedRock === "metamorphic" ? `<p class="rock-cycle__warn">⚠️ 變質岩<strong>唔會</strong>靠變質作用變成火成岩。要變火成岩：熔融 → 岩漿 → 冷卻結晶（兩步）。</p>` : ""}
        ${selectedRock === "igneous" ? `<p class="rock-cycle__warn">⚠️ 火成岩可經<strong>變質作用</strong>變成變質岩，或經<strong>重熔</strong>變成岩漿再冷卻——兩條唔同路徑。</p>` : ""}
        <p class="rock-cycle__exam">📋 ${r.exam}</p>`;
    }

    function selectRock(id) {
      if (!ROCKS[id]) return;
      selectedRock = id;
      onSelect(ROCKS[id]);
      renderRocks();
      renderSvg();
      renderDetail();
    }

    playBtn.onclick = toggleAnimation;
    stepBtn.onclick = () => {
      if (!animating) {
        animating = true;
        playBtn.textContent = "⏸ 暫停";
      }
      nextCycleStep();
      if (!timerId) timerId = setInterval(nextCycleStep, STEP_MS);
    };

    filtersEl.querySelectorAll("[data-force]").forEach((btn) => {
      btn.onclick = () => {
        stopAnimation();
        activeEdgeId = null;
        filterForce = btn.dataset.force;
        filtersEl.querySelectorAll(".btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        captionEl.textContent = FILTER_CAPTION[filterForce] || "";
        const focusRock = FILTER_FOCUS[filterForce];
        if (focusRock) {
          selectedRock = focusRock;
          onSelect(ROCKS[focusRock]);
          renderRocks();
          renderSvg();
          renderDetail();
        } else {
          captionEl.textContent = "";
          renderSvg();
        }
      };
    });

    applyCycleStep(0);
    startAnimation();

    return { selectRock, play: startAnimation, pause: stopAnimation };
  }

  global.RockCycleExplorer = { createRockCycleExplorer, ROCKS, FORCES, EDGES, CYCLE_STEPS };
})(typeof window !== "undefined" ? window : global);
