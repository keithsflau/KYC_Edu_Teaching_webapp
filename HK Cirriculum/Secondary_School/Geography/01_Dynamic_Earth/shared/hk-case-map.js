/**
 * Interactive HK case-study map — reclamation, landslides, slope management
 */
(function (global) {
  "use strict";

  const SITES = {
    airport: {
      id: "airport",
      name: "赤鱲角填海",
      en: "Chek Lap Kok Reclamation",
      x: 0.22, y: 0.58,
      color: "#38bdf8",
      layer: "reclamation",
      summary: "機場核心計劃 · 約 2.5 億 m³ 填海",
      detail: "1991 年機場核心計劃啟動，連接大嶼山、赤鱲角與香港島的交通網絡。填海物料主要來自海域挖泥及合規公眾填料。",
      stats: { fill: "≈2.5 億 m³", year: "1991–1998", eia: "是" },
    },
    tungchung: {
      id: "tungchung",
      name: "東涌新市鎮",
      en: "Tung Chung NT",
      x: 0.18, y: 0.52,
      color: "#22d3ee",
      layer: "reclamation",
      summary: "機場配套新市鎮填海",
      detail: "配合機場鐵路及北大嶼山公路，東涌填海提供住宅與商業用地，改變大嶼山北岸天然海岸。",
      stats: { fill: "數千萬 m³", year: "1990s", eia: "是" },
    },
    harbour: {
      id: "harbour",
      name: "維港填海",
      en: "Victoria Harbour Reclamation",
      x: 0.52, y: 0.48,
      color: "#6366f1",
      layer: "reclamation",
      summary: "中環、灣仔、九龍西歷次填海",
      detail: "維港兩岸百年來多次填海，中環、金鐘、灣仔北、西九龍等。收窄水道、改變潮流與景觀。",
      stats: { fill: "累計逾億 m³", year: "持續", eia: "逐項目" },
    },
    shamwan: {
      id: "shamwan",
      name: "深灣道 1972",
      en: "Sham Wan Landslide",
      x: 0.56, y: 0.36,
      color: "#f97316",
      layer: "landslide",
      summary: "嚴重山泥傾瀉 · 促成法規改革",
      detail: "1972年6月18日暴雨後，半山深灣道發生大型山泥傾瀉，造成重大人命傷亡，直接推動斜坡監管制度。",
      stats: { rain: ">400 mm/日", year: "1972", deaths: "重大傷亡" },
    },
    poshan: {
      id: "poshan",
      name: "寶珊道 1994",
      en: "Po Shan Road",
      x: 0.54, y: 0.32,
      color: "#ef4444",
      layer: "landslide",
      summary: "港島西半山滑坡",
      detail: "1994年7月暴雨觸發寶珊道山泥傾瀉，促使加強排水系統與岩土評估標準。",
      stats: { year: "1994", type: "天然+人為" },
    },
    sau: {
      id: "sau",
      name: "秀茂坪 1976",
      en: "Sau Mau Ping",
      x: 0.68, y: 0.38,
      color: "#fb923c",
      layer: "landslide",
      summary: "九龍東屋邨山泥傾瀉",
      detail: "削坡建屋邨後排水不良，暴雨期間發生災難性滑坡，凸顯人為改變斜坡的風險。",
      stats: { year: "1976", type: "人為加劇" },
    },
    tko: {
      id: "tko",
      name: "將軍澳填海",
      en: "Tseung Kwan O",
      x: 0.72, y: 0.42,
      color: "#818cf8",
      layer: "reclamation",
      summary: "新市鎮填海發展",
      detail: "將軍澳灣填海造地，發展大型新市鎮，改變海灣地貌與海洋生態。",
      stats: { year: "1980s–", fill: "大型填海" },
    },
    slope_nt: {
      id: "slope_nt",
      name: "新界註冊斜坡",
      en: "NT Registered Slopes",
      x: 0.42, y: 0.28,
      color: "#4ade80",
      layer: "slope",
      summary: "全港約 6 萬註冊斜坡",
      detail: "屋宇署及土木工程拓展署管理斜坡目錄，定期巡查、維修與工程鞏固。",
      stats: { count: "~60,000", check: "每年" },
    },
    quarry: {
      id: "quarry",
      name: "屯門藍地石礦場",
      en: "Lam Tei Quarry",
      x: 0.32, y: 0.35,
      color: "#a78bfa",
      layer: "resource",
      summary: "填海及建築碎石來源",
      detail: "本港曾依賴石礦場提供填海及建築碎石；藍地等礦場逐步關閉後轉向輸入及海域挖泥。",
      stats: { role: "填料來源", status: "逐步關閉" },
    },
  };

  function drawHKOutline(ctx, w, h) {
    ctx.fillStyle = "rgba(8,20,32,0.95)";
    ctx.fillRect(0, 0, w, h);

    const g = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.5, w * 0.55);
    g.addColorStop(0, "rgba(34,211,238,0.06)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(74,222,128,0.2)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) {
      ctx.beginPath();
      ctx.moveTo(0, h * (0.15 + i * 0.07));
      ctx.lineTo(w, h * (0.15 + i * 0.07));
      ctx.stroke();
    }

    const land = new Path2D();
    land.moveTo(w * 0.08, h * 0.78);
    land.bezierCurveTo(w * 0.12, h * 0.45, w * 0.2, h * 0.38, w * 0.28, h * 0.42);
    land.bezierCurveTo(w * 0.32, h * 0.55, w * 0.3, h * 0.68, w * 0.22, h * 0.72);
    land.bezierCurveTo(w * 0.18, h * 0.58, w * 0.15, h * 0.5, w * 0.12, h * 0.55);
    land.bezierCurveTo(w * 0.1, h * 0.65, w * 0.08, h * 0.78, w * 0.08, h * 0.78);
    land.moveTo(w * 0.38, h * 0.72);
    land.bezierCurveTo(w * 0.42, h * 0.35, w * 0.48, h * 0.28, w * 0.55, h * 0.35);
    land.bezierCurveTo(w * 0.62, h * 0.42, w * 0.58, h * 0.55, w * 0.52, h * 0.62);
    land.lineTo(w * 0.48, h * 0.72);
    land.bezierCurveTo(w * 0.44, h * 0.78, w * 0.38, h * 0.78, w * 0.38, h * 0.72);
    land.moveTo(w * 0.62, h * 0.55);
    land.bezierCurveTo(w * 0.68, h * 0.32, w * 0.78, h * 0.35, w * 0.88, h * 0.42);
    land.bezierCurveTo(w * 0.92, h * 0.5, w * 0.9, h * 0.65, w * 0.82, h * 0.75);
    land.bezierCurveTo(w * 0.72, h * 0.82, w * 0.55, h * 0.85, w * 0.38, h * 0.82);
    land.bezierCurveTo(w * 0.25, h * 0.8, w * 0.12, h * 0.82, w * 0.08, h * 0.78);

    ctx.fillStyle = "rgba(30,70,55,0.55)";
    ctx.fill(land);
    ctx.strokeStyle = "rgba(74,222,128,0.45)";
    ctx.lineWidth = 2;
    ctx.stroke(land);

    ctx.fillStyle = "rgba(56,189,248,0.12)";
    const harbour = new Path2D();
    harbour.ellipse(w * 0.52, h * 0.52, w * 0.06, h * 0.035, 0, 0, Math.PI * 2);
    ctx.fill(harbour);

    ctx.fillStyle = "rgba(255,255,255,0.35)";
    ctx.font = "600 11px Inter,sans-serif";
    ctx.fillText("大嶼山", w * 0.14, h * 0.55);
    ctx.fillText("港島", w * 0.5, h * 0.4);
    ctx.fillText("九龍", w * 0.58, h * 0.52);
    ctx.fillText("新界", w * 0.42, h * 0.3);
    ctx.font = "10px Inter,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    ctx.fillText("香港案例地圖 · 點選標記", 14, 22);
  }

  function createHKCaseMap(container, opts) {
    const canvas = document.createElement("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.style.cursor = "crosshair";
    container.appendChild(canvas);

    const overlay = document.createElement("div");
    overlay.className = "map-overlay";
    container.appendChild(overlay);

    const layerBar = document.createElement("div");
    layerBar.className = "map-layer-bar";
    layerBar.innerHTML = `
      <button type="button" class="btn is-active" data-layer="all">全部</button>
      <button type="button" class="btn" data-layer="reclamation">填海</button>
      <button type="button" class="btn" data-layer="landslide">山泥傾瀉</button>
      <button type="button" class="btn" data-layer="slope">斜坡管理</button>
      <button type="button" class="btn" data-layer="resource">石礦資源</button>`;
    container.appendChild(layerBar);

    let activeLayer = "all";
    let selectedId = opts.defaultSite || "airport";
    let hoverId = null;
    const onSelect = opts.onSelect || (() => {});

    function resize() {
      canvas.width = container.clientWidth * devicePixelRatio;
      canvas.height = (container.clientHeight || 400) * devicePixelRatio;
    }

    function siteAt(mx, my) {
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      let found = null;
      let best = 999;
      Object.values(SITES).forEach((s) => {
        if (activeLayer !== "all" && s.layer !== activeLayer) return;
        const dx = mx - s.x * w;
        const dy = my - s.y * h;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 22 && d < best) {
          best = d;
          found = s.id;
        }
      });
      return found;
    }

    function draw() {
      const ctx = canvas.getContext("2d");
      const w = canvas.width / devicePixelRatio;
      const h = canvas.height / devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      drawHKOutline(ctx, w, h);

      const t = Date.now() * 0.003;
      Object.values(SITES).forEach((s) => {
        if (activeLayer !== "all" && s.layer !== activeLayer) return;
        const on = s.id === selectedId;
        const hov = s.id === hoverId;
        const pulse = on ? 1 + Math.sin(t * 2) * 0.15 : 1;
        const r = (on ? 14 : hov ? 11 : 7) * pulse;
        const x = s.x * w;
        const y = s.y * h;

        if (on) {
          ctx.strokeStyle = s.color + "44";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(x, y, 28 + Math.sin(t) * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        if (on || hov) {
          ctx.strokeStyle = "#fff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.fillStyle = "#f0f9ff";
          ctx.font = (on ? "600 12px" : "500 11px") + " Inter,sans-serif";
          ctx.fillText(s.name, x + 16, y + 4);
        }
      });

      const sel = SITES[selectedId];
      if (sel) {
        overlay.innerHTML = `
          <p class="map-overlay__tag">${sel.layer === "reclamation" ? "填海個案" : sel.layer === "landslide" ? "山泥傾瀉" : sel.layer === "slope" ? "斜坡管理" : "地質資源"}</p>
          <h3>${sel.name}</h3>
          <p class="map-overlay__en">${sel.en}</p>
          <p>${sel.detail}</p>
          <div class="map-overlay__stats">${Object.entries(sel.stats).map(([k, v]) => `<span><em>${k}</em>${v}</span>`).join("")}</div>`;
      }

      requestAnimationFrame(draw);
    }

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      hoverId = siteAt(e.clientX - rect.left, e.clientY - rect.top);
      canvas.style.cursor = hoverId ? "pointer" : "crosshair";
    });
    canvas.addEventListener("click", (e) => {
      const rect = canvas.getBoundingClientRect();
      const id = siteAt(e.clientX - rect.left, e.clientY - rect.top);
      if (id) {
        selectedId = id;
        onSelect(SITES[id]);
        document.querySelectorAll("[data-case-sync]").forEach((btn) => {
          btn.classList.toggle("is-active", btn.dataset.caseSync === id);
        });
      }
    });

    layerBar.querySelectorAll("[data-layer]").forEach((btn) => {
      btn.onclick = () => {
        activeLayer = btn.dataset.layer;
        layerBar.querySelectorAll(".btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
      };
    });

    resize();
    window.addEventListener("resize", resize);
    draw();

    return {
      select(id) {
        if (SITES[id]) {
          selectedId = id;
          onSelect(SITES[id]);
        }
      },
      getSites: () => SITES,
    };
  }

  global.HKCaseMap = { createHKCaseMap, SITES };
})(typeof window !== "undefined" ? window : global);
