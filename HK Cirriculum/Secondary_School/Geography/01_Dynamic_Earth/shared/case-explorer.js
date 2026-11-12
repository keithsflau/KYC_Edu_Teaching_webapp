/**
 * Case Explorer — Leaflet satellite map + case picker
 */
(function (global) {
  "use strict";

  const LAYER_LABELS = {
    reclamation: { zh: "填海工程", color: "#38bdf8", icon: "🌊" },
    landslide: { zh: "山泥傾瀉", color: "#f97316", icon: "⛰" },
    slope: { zh: "斜坡管理", color: "#4ade80", icon: "🛡" },
    resource: { zh: "地質資源", color: "#a78bfa", icon: "⛏" },
  };

  const SITES = {
    airport: {
      id: "airport", name: "赤鱲角填海", region: "大嶼山",
      layer: "reclamation", caseKey: "airport",
      lat: 22.3089, lng: 113.9146, zoom: 13,
      detail: "赤鱲角在大嶼山以北。土力工程處報告記述平台填料約 1.97 億立方米。填海改變北大嶼山海岸，並影響中華白海豚使用的水域，須做環境影響評估和水質監察。1989年《港口及機場發展策略》提出這個選址，機場於1998年啟用。",
      fact: "1998 機場啟用",
    },
    tungchung: {
      id: "tungchung", name: "東涌新市鎮", region: "大嶼山",
      layer: "reclamation", caseKey: "airport",
      lat: 22.2890, lng: 113.9435, zoom: 13,
      detail: "配合機場鐵路及北大嶼山公路的配套填海，改變大嶼山北岸海岸線。",
      fact: "1990 年代",
    },
    harbour: {
      id: "harbour", name: "維港兩岸填海", region: "維港",
      layer: "reclamation", caseKey: "airport",
      lat: 22.2865, lng: 114.1650, zoom: 13,
      detail: "中環、金鐘、灣仔北、西九龍等歷次填海，收窄維港水道。",
      fact: "百年填海史",
    },
    tko: {
      id: "tko", name: "將軍澳填海", region: "新界東",
      layer: "reclamation", caseKey: "airport",
      lat: 22.3075, lng: 114.2590, zoom: 13,
      detail: "將軍澳灣填海發展新市鎮，改變海灣地貌。",
      fact: "1980s–",
    },
    poshan: {
      id: "poshan", name: "寶珊道 1972", region: "港島半山",
      layer: "landslide", caseKey: "landslides",
      lat: 22.275, lng: 114.143, zoom: 16,
      detail: "1972年6月18日晚上，半山寶珊道以上的山泥傾瀉沖毀旭龢道一帶樓宇，67人死亡。地點在港島半山，不是南丫島的深灣，也不是1994年。",
      fact: "1972-06-18 · 67人",
    },
    sau1972: {
      id: "sau1972", name: "秀茂坪 1972", region: "九龍東曉光街",
      layer: "landslide", caseKey: "landslides",
      lat: 22.319, lng: 114.231, zoom: 16,
      detail: "同日下午，秀茂坪曉光街的填土斜坡倒塌，沖毀寮屋，71人死亡。這是九龍東，不是港島。",
      fact: "1972-06-18 · 71人",
    },
    sau1976: {
      id: "sau1976", name: "秀茂坪 1976", region: "九龍東",
      layer: "landslide", caseKey: "landslides",
      lat: 22.321, lng: 114.234, zoom: 16,
      detail: "1976年8月25日，秀茂坪邨附近另一幅填土斜坡倒塌，18人死亡。其後的檢討促成1977年成立土力工程處。",
      fact: "1976-08-25 · 18人",
    },
    kwunlung: {
      id: "kwunlung", name: "觀龍樓 1994", region: "堅尼地城",
      layer: "landslide", caseKey: "landslides",
      lat: 22.283, lng: 114.127, zoom: 16,
      detail: "1994年7月23日，堅尼地城觀龍樓對下的斜坡倒塌，5人死亡。寶珊道事件是1972年，不要把兩個年份對調。",
      fact: "1994-07-23 · 5人",
    },
    slope_nt: {
      id: "slope_nt", name: "半山斜坡管理（參考點）", region: "港島半山",
      layer: "slope", caseKey: "slope",
      lat: 22.278, lng: 114.150, zoom: 14,
      detail: "土木工程拓展署斜坡紀錄冊現時記載約 61,000 個人造斜坡，數目會更新。圖上只是半山的一個參考點，不是全港斜坡的中心。",
      fact: "約 61,000 個（會更新）",
    },
    quarry: {
      id: "quarry", name: "屯門藍地石礦", region: "新界西",
      layer: "resource", caseKey: "resource",
      lat: 22.4078, lng: 113.9852, zoom: 14,
      detail: "昔日填海及建築碎石來源；礦場關閉後轉向海域挖泥及輸入砂石。",
      fact: "填料來源",
    },
  };

  const GROUPS = [
    { layer: "reclamation", title: "填海工程", desc: "DSE 個案：赤鱲角機場填海" },
    { layer: "landslide", title: "山泥傾瀉", desc: "寶珊道、秀茂坪、觀龍樓" },
    { layer: "slope", title: "斜坡管理", desc: "註冊斜坡與監管制度" },
    { layer: "resource", title: "地質資源", desc: "石礦場與填料供應" },
  ];

  const SATELLITE_TILE =
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
  const SATELLITE_ATTR =
    "Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics";

  function markerIcon(color, active) {
    const size = active ? 26 : 16;
    return L.divIcon({
      className: "ce-marker-wrap",
      html: `<span class="ce-marker${active ? " is-active" : ""}" style="--pin:${color};width:${size}px;height:${size}px"></span>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
  }

  function createCaseExplorer(container, opts) {
    const onSelect = opts.onSelect || (() => {});
    let selectedId = opts.defaultSite || "airport";
    let filterLayer = "all";
    let map = null;
    const markerById = {};

    const root = document.createElement("div");
    root.className = "case-explorer";
    root.innerHTML = `
      <div class="case-explorer__help">
        <strong>① 撳個案按鈕</strong> 或地圖圓點 → 衛星圖飛至真實位置 · <strong>② 右欄</strong>同步 DSE 時間線與持份者
      </div>
      <div class="case-explorer__map-wrap case-explorer__map-wrap--sat">
        <div class="case-explorer__map-head">
          <p class="case-explorer__map-title">香港衛星圖（Esri World Imagery）</p>
          <div class="case-explorer__legend" id="ce-legend"></div>
        </div>
        <div class="case-explorer__map" id="ce-map"></div>
        <p class="case-explorer__attrib" id="ce-attrib"></p>
      </div>
      <div class="case-explorer__filters" id="ce-filters"></div>
      <div class="case-explorer__main">
        <div class="case-explorer__list" id="ce-list"></div>
        <div class="case-explorer__detail" id="ce-detail"></div>
      </div>
    `;
    container.appendChild(root);

    const filtersEl = root.querySelector("#ce-filters");
    const listEl = root.querySelector("#ce-list");
    const mapEl = root.querySelector("#ce-map");
    const detailEl = root.querySelector("#ce-detail");
    const legendEl = root.querySelector("#ce-legend");
    const attribEl = root.querySelector("#ce-attrib");

    filtersEl.innerHTML = `
      <button type="button" class="btn is-active" data-filter="all">顯示全部</button>
      ${GROUPS.map((g) => `<button type="button" class="btn" data-filter="${g.layer}">${LAYER_LABELS[g.layer].icon} ${g.title}</button>`).join("")}`;

    legendEl.innerHTML = Object.entries(LAYER_LABELS).map(([k, v]) =>
      `<span><i style="background:${v.color}"></i>${v.zh}</span>`
    ).join("");

    function initMap() {
      if (map || typeof L === "undefined") return;
      map = L.map(mapEl, {
        center: [22.35, 114.14],
        zoom: 11,
        minZoom: 10,
        maxZoom: 18,
        zoomControl: true,
        attributionControl: false,
      });
      L.tileLayer(SATELLITE_TILE, { maxZoom: 19, attribution: SATELLITE_ATTR }).addTo(map);
      attribEl.textContent = SATELLITE_ATTR + " · 教學用途";
      map.setMaxBounds([[22.08, 113.78], [22.58, 114.48]]);

      Object.values(SITES).forEach((s) => {
        const color = LAYER_LABELS[s.layer].color;
        const m = L.marker([s.lat, s.lng], { icon: markerIcon(color, false) });
        m.on("click", () => select(s.id));
        m.addTo(map);
        markerById[s.id] = m;
      });

      const fixSize = () => {
        if (!map) return;
        map.invalidateSize({ animate: false });
      };
      setTimeout(fixSize, 80);
      setTimeout(fixSize, 400);
      window.addEventListener("resize", fixSize);
      if (typeof ResizeObserver !== "undefined") {
        const ro = new ResizeObserver(() => fixSize());
        ro.observe(mapEl);
        ro.observe(root);
      }
    }

    function isVisible(site) {
      return filterLayer === "all" || site.layer === filterLayer;
    }

    function updateMarkers() {
      Object.entries(markerById).forEach(([id, m]) => {
        const s = SITES[id];
        const active = id === selectedId;
        m.setIcon(markerIcon(LAYER_LABELS[s.layer].color, active));
        if (isVisible(s)) {
          if (!map.hasLayer(m)) m.addTo(map);
        } else if (map.hasLayer(m)) {
          map.removeLayer(m);
        }
      });
    }

    function flyToSite(site) {
      if (!map) return;
      map.flyTo([site.lat, site.lng], site.zoom || 13, { duration: 0.85 });
    }

    function select(id) {
      if (!SITES[id]) return;
      if (global.GeoAudio) global.GeoAudio.tap();
      selectedId = id;
      const site = SITES[id];
      onSelect(site);
      renderList();
      updateMarkers();
      renderDetail();
      flyToSite(site);
    }

    function renderList() {
      listEl.innerHTML = GROUPS.filter((g) => filterLayer === "all" || g.layer === filterLayer)
        .map((g) => {
          const sites = Object.values(SITES).filter((s) => s.layer === g.layer);
          return `
            <div class="case-group">
              <h3><span style="color:${LAYER_LABELS[g.layer].color}">${LAYER_LABELS[g.layer].icon}</span> ${g.title}</h3>
              <p>${g.desc}</p>
              <div class="case-group__btns">
                ${sites.map((s) => `
                  <button type="button" class="case-btn${s.id === selectedId ? " is-active" : ""}"
                    data-site="${s.id}" style="--accent:${LAYER_LABELS[s.layer].color}">
                    <span class="case-btn__name">${s.name}</span>
                    <span class="case-btn__region">${s.region}</span>
                  </button>`).join("")}
              </div>
            </div>`;
        }).join("");

      listEl.querySelectorAll("[data-site]").forEach((btn) => {
        btn.onclick = () => select(btn.dataset.site);
      });
    }

    function renderDetail() {
      const s = SITES[selectedId];
      const Lbl = LAYER_LABELS[s.layer];
      detailEl.innerHTML = `
        <span class="case-explorer__detail-tag" style="color:${Lbl.color}">${Lbl.icon} ${Lbl.zh} · ${s.region}</span>
        <h3>${s.name}</h3>
        <p class="case-explorer__coords muted">${s.lat.toFixed(4)}°N, ${s.lng.toFixed(4)}°E</p>
        <p>${s.detail}</p>
        <p class="case-explorer__fact"><strong>重點：</strong>${s.fact}</p>
        <p class="muted" style="margin-top:0.5rem">→ 完整時間線、持份者分析請看<strong>右側欄「概覽」</strong></p>`;
    }

    filtersEl.querySelectorAll("[data-filter]").forEach((btn) => {
      btn.onclick = () => {
        filterLayer = btn.dataset.filter;
        filtersEl.querySelectorAll(".btn").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        const visible = Object.values(SITES).filter(isVisible);
        if (!visible.find((s) => s.id === selectedId) && visible[0]) select(visible[0].id);
        else { renderList(); updateMarkers(); }
      };
    });

    if (typeof L !== "undefined") {
      initMap();
      select(selectedId);
    } else {
      mapEl.innerHTML = '<p class="case-explorer__map-fallback">載入衛星圖需要 Leaflet（請檢查網絡）</p>';
      select(selectedId);
    }

    const CASE_SYNC_SITE = {
      airport: "airport",
      landslides: "poshan",
      slope: "slope_nt",
      resource: "quarry",
    };

    return {
      select,
      getSites: () => SITES,
      getMap: () => map,
      getSelected: () => SITES[selectedId],
      syncSiteForCase: (caseKey) => CASE_SYNC_SITE[caseKey] || caseKey,
    };
  }

  global.CaseExplorer = { createCaseExplorer, SITES, LAYER_LABELS };
})(typeof window !== "undefined" ? window : global);
