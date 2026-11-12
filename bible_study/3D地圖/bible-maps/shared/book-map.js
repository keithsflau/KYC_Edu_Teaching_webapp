/**
 * Interactive Leaflet map: tour, route line, animated pins, info panel.
 */
(function (global) {
  const TYPE_COLORS = {
    city: '#dc2626',
    town: '#ea580c',
    fort: '#7c3aed',
    peak: '#2563eb',
    region: '#059669',
    bay: '#0891b2',
    island: '#0d9488',
  };

  function typeColor(type) {
    return TYPE_COLORS[type] || '#475569';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function pinIcon(color, label, active, delay) {
    const delayStyle = delay != null ? `animation-delay:${delay}ms` : '';
    return L.divIcon({
      className: 'book-map-marker',
      html: `<div class="book-map-pin-wrap${active ? ' is-active' : ''}" style="${delayStyle}">
        <span class="book-map-pulse" aria-hidden="true"></span>
        <div class="book-map-pin" style="background:${color}"><span class="book-map-pin-inner">${label}</span></div>
      </div>`,
      iconSize: [36, 42],
      iconAnchor: [18, 42],
      popupAnchor: [0, -38],
    });
  }

  function panelHtml(p) {
    return `<div class="book-map-panel-body">
      <h3>${esc(p.name_zh)}</h3>
      <div class="bmp-en">${esc(p.name_en)}</div>
      <span class="bmp-type">${esc(p.typeLabel || p.type || 'site')}</span>
      <div class="bmp-ref">📖 ${esc(p.ref || '—')}</div>
      ${p.note ? `<p class="bmp-note">${esc(p.note)}</p>` : ''}
      <div class="bmp-coords">${p.lat.toFixed(3)}°N · ${p.lng.toFixed(3)}°E</div>
    </div>`;
  }

  function initBookMap(opts) {
    const mapEl = document.getElementById(opts.mapId || 'book-map');
    const panelEl = document.getElementById(opts.panelId || 'book-map-panel');
    const listEl = document.getElementById(opts.listId || 'book-map-list');
    const tourBtn = document.getElementById('book-map-tour');
    const prevBtn = document.getElementById('book-map-prev');
    const nextBtn = document.getElementById('book-map-next');
    const fitBtn = document.getElementById('book-map-fit');
    const progressEl = document.getElementById('book-map-progress');

    if (!mapEl || !global.L) return null;

    const places = (opts.places || []).filter((p) => p.lat != null && p.lng != null);
    if (!places.length) return null;

    const map = L.map(mapEl, { scrollWheelZoom: true, zoomControl: true });
    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      { attribution: 'Esri', maxZoom: 18 }
    ).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      attribution: '',
      maxZoom: 18,
    }).addTo(map);

    const bounds = L.latLngBounds(places.map((p) => [p.lat, p.lng]));
    const route = L.polyline(
      places.map((p) => [p.lat, p.lng]),
      { color: '#fbbf24', weight: 3, opacity: 0.85, dashArray: '10 8', className: 'book-map-route' }
    ).addTo(map);

    const markers = {};
    let activeIdx = 0;
    let activeId = null;
    let tourTimer = null;
    let touring = false;

    function setProgress(i) {
      if (progressEl) progressEl.textContent = `${i + 1} / ${places.length}`;
    }

    function selectIndex(i, fly) {
      activeIdx = ((i % places.length) + places.length) % places.length;
      const p = places[activeIdx];
      activeId = p.id;
      if (panelEl) {
        panelEl.classList.remove('bmp-switch');
        void panelEl.offsetWidth;
        panelEl.innerHTML = panelHtml(p);
        panelEl.classList.add('bmp-switch');
      }
      Object.entries(markers).forEach(([id, m]) => {
        const pl = places.find((x) => x.id === id);
        const idx = places.indexOf(pl);
        m.setIcon(pinIcon(typeColor(pl.type), idx + 1, id === p.id, null));
      });
      if (listEl) {
        listEl.querySelectorAll('button').forEach((btn) => {
          btn.classList.toggle('active', btn.dataset.id === p.id);
        });
        const activeBtn = listEl.querySelector(`button[data-id="${p.id}"]`);
        if (activeBtn) activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
      setProgress(activeIdx);
      if (fly !== false) {
        map.flyTo([p.lat, p.lng], Math.max(map.getZoom(), 10), { duration: 0.75 });
      }
    }

    places.forEach((p, i) => {
      const m = L.marker([p.lat, p.lng], {
        icon: pinIcon(typeColor(p.type), i + 1, false, i * 80),
        title: p.name_zh,
      }).addTo(map);
      m.on('click', () => {
        stopTour();
        selectIndex(i);
      });
      markers[p.id] = m;
    });

    map.fitBounds(bounds.pad(0.15));

    if (listEl) {
      listEl.innerHTML = places
        .map(
          (p, i) =>
            `<button type="button" data-id="${esc(p.id)}">${i + 1}. ${esc(p.name_zh)}<span class="ref">${esc(p.ref || '')}</span></button>`
        )
        .join('');
      listEl.querySelectorAll('button').forEach((btn) => {
        btn.onclick = () => {
          stopTour();
          const idx = places.findIndex((x) => x.id === btn.dataset.id);
          if (idx >= 0) selectIndex(idx);
        };
      });
    }

    if (panelEl && !panelEl.innerHTML.trim()) {
      panelEl.innerHTML = `<div class="book-map-panel-empty">點選地圖標記或下方清單<br>查看地點資料與經文對照</div>`;
    }

    function stopTour() {
      touring = false;
      if (tourTimer) {
        clearInterval(tourTimer);
        tourTimer = null;
      }
      if (tourBtn) {
        tourBtn.textContent = '▶ 自動導覽';
        tourBtn.classList.remove('is-playing');
      }
    }

    function startTour() {
      touring = true;
      if (tourBtn) {
        tourBtn.textContent = '⏸ 暫停導覽';
        tourBtn.classList.add('is-playing');
      }
      tourTimer = setInterval(() => selectIndex(activeIdx + 1), 3800);
    }

    if (tourBtn) {
      tourBtn.onclick = () => {
        if (touring) stopTour();
        else startTour();
      };
    }
    if (prevBtn) {
      prevBtn.onclick = () => {
        stopTour();
        selectIndex(activeIdx - 1);
      };
    }
    if (nextBtn) {
      nextBtn.onclick = () => {
        stopTour();
        selectIndex(activeIdx + 1);
      };
    }
    if (fitBtn) {
      fitBtn.onclick = () => {
        stopTour();
        map.flyToBounds(bounds.pad(0.15), { duration: 0.8 });
      };
    }

    selectIndex(0, false);
    setTimeout(() => map.invalidateSize(), 250);

    mapEl.classList.add('book-map-ready');
    return { map, stopTour, selectIndex };
  }

  global.BookMap = { init: initBookMap };
})(typeof window !== 'undefined' ? window : globalThis);
