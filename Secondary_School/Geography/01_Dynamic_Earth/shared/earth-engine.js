/* =====================================================================
 * earth-engine.js — HKDSE Dynamic Earth · Three.js globe & HK terrain
 * DEM: AWS Terrarium · Imagery: EOX Sentinel-2 cloudless
 * ===================================================================== */
(function (global) {
  "use strict";

  const TILE = {
    dem: "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
    img: "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg",
  };

  const HK = { minLng: 113.78, maxLng: 114.52, minLat: 22.12, maxLat: 22.58, Z: 11 };

  const PLATES = [
    { id: "eurasia", name: "歐亞板塊", nameEn: "Eurasian", color: "#fbbf24", hk: true },
    { id: "pacific", name: "太平洋板塊", nameEn: "Pacific", color: "#38bdf8" },
    { id: "philippine", name: "菲律賓板塊", nameEn: "Philippine", color: "#a78bfa" },
    { id: "indo", name: "印度—澳洲板塊", nameEn: "Indo-Australian", color: "#4ade80" },
    { id: "nazca", name: "納斯卡板塊", nameEn: "Nazca", color: "#f472b6" },
    { id: "african", name: "非洲板塊", nameEn: "African", color: "#fb923c" },
    { id: "northam", name: "北美板塊", nameEn: "North American", color: "#22d3ee" },
    { id: "southam", name: "南美板塊", nameEn: "South American", color: "#86efac" },
    { id: "antarctic", name: "南極板塊", nameEn: "Antarctic", color: "#e2e8f0" },
  ];

  /* Simplified plate polygons [lat,lng][] — teaching schematic */
  const PLATE_REGIONS = [
    {
      id: "antarctic",
      pts: [[-60, -180], [-60, -90], [-60, 0], [-60, 90], [-60, 180], [-75, 150], [-75, 0], [-75, -150]],
    },
    {
      id: "pacific",
      pts: [[65, -70], [65, -125], [45, -125], [25, -145], [5, -168], [-25, -175], [-45, -100], [-25, -75], [-5, -105], [15, -125], [40, -110], [65, -70]],
    },
    {
      id: "pacific",
      pts: [[65, 125], [65, 180], [-55, 180], [-55, 140], [-25, 175], [5, 168], [25, 145], [45, 125], [65, 125]],
    },
    {
      id: "northam",
      pts: [[72, -168], [72, -45], [50, -45], [28, -75], [15, -95], [12, -168], [72, -168]],
    },
    {
      id: "southam",
      pts: [[12, -78], [12, -35], [-5, -35], [-55, -68], [-55, -82], [12, -78]],
    },
    {
      id: "nazca",
      pts: [[8, -82], [5, -72], [-5, -72], [-18, -72], [-22, -70], [-18, -82], [-8, -88], [8, -82]],
    },
    {
      id: "african",
      pts: [[38, -18], [38, 52], [5, 52], [-35, 28], [-35, 15], [5, -10], [38, -18]],
    },
    {
      id: "eurasia",
      pts: [
        [78, -10], [78, 140], [55, 145], [35, 130], [10, 105], [5, 95], [25, 62],
        [38, 40], [42, 10], [55, 0], [78, -10],
      ],
    },
    {
      id: "indo",
      pts: [[28, 58], [28, 145], [-10, 145], [-45, 145], [-45, 100], [-35, 78], [-10, 92], [5, 95], [28, 58]],
    },
    {
      id: "philippine",
      pts: [[22, 124], [22, 146], [5, 146], [5, 126], [14, 122], [22, 124]],
    },
  ];

  /* Simplified boundary arcs [lat,lng][] — teaching schematic */
  const BOUNDARIES = [
    { type: "convergent", pts: [[35, 138], [30, 132], [20, 125], [5, 120], [-5, 115]] },
    { type: "convergent", pts: [[28, 104], [26, 100], [22, 98], [18, 96], [10, 92]] },
    { type: "divergent", pts: [[70, -30], [60, -25], [40, -30], [20, -20], [0, -15], [-20, -10]] },
    { type: "divergent", pts: [[15, 40], [5, 38], [-5, 36], [-15, 35], [-30, 33]] },
    { type: "conservative", pts: [[42, -125], [38, -122], [34, -118], [32, -115]] },
    { type: "convergent", pts: [[-5, 95], [-10, 100], [-15, 110], [-20, 115], [-30, 118]] },
    { type: "divergent", pts: [[65, -18], [63, -17], [64, -19], [62, -16]] },
  ];

  const BOUNDARY_COLORS = {
    divergent: 0x4ade80,
    convergent: 0xf97316,
    conservative: 0x38bdf8,
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const deg = Math.PI / 180;

  function latLngToVec3(lat, lng, r) {
    const phi = (90 - lat) * deg;
    const theta = (lng + 180) * deg;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }

  function greatCirclePoints(pts, r, segments) {
    const out = [];
    const seg = segments || 12;
    for (let i = 0; i < pts.length - 1; i++) {
      const a = latLngToVec3(pts[i][0], pts[i][1], 1);
      const b = latLngToVec3(pts[i + 1][0], pts[i + 1][1], 1);
      const omega = Math.acos(clamp(a.dot(b), -1, 1));
      if (omega < 0.001) {
        if (i === 0) out.push(latLngToVec3(pts[i][0], pts[i][1], r));
        continue;
      }
      const sinO = Math.sin(omega);
      for (let j = 0; j < seg; j++) {
        const t = j / seg;
        const v = new THREE.Vector3()
          .addScaledVector(a, Math.sin((1 - t) * omega) / sinO)
          .addScaledVector(b, Math.sin(t * omega) / sinO)
          .multiplyScalar(r);
        out.push(v);
      }
    }
    const last = pts[pts.length - 1];
    out.push(latLngToVec3(last[0], last[1], r));
    return out;
  }

  function buildPlateTexture(highlightId) {
    const W = 2048;
    const H = 1024;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const plateById = Object.fromEntries(PLATES.map((p) => [p.id, p]));

    const toXY = (lat, lng) => [((lng + 180) / 360) * W, ((90 - lat) / 180) * H];

    const drawRegion = (pts) => {
      ctx.beginPath();
      pts.forEach(([lat, lng], i) => {
        const [x, y] = toXY(lat, lng);
        if (i === 0) {
          ctx.moveTo(x, y);
          return;
        }
        const prevLng = pts[i - 1][1];
        if (Math.abs(lng - prevLng) > 180) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.fill();
    };

    PLATE_REGIONS.forEach((region) => {
      const meta = plateById[region.id];
      if (!meta) return;
      const active = !highlightId || region.id === highlightId;
      ctx.fillStyle = meta.color;
      ctx.globalAlpha = active ? (region.id === highlightId ? 0.62 : 0.48) : 0.14;
      drawRegion(region.pts);
    });

    const tex = new THREE.CanvasTexture(canvas);
    if (THREE.SRGBColorSpace) tex.colorSpace = THREE.SRGBColorSpace;
    else if (THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
    return tex;
  }

  function hypsometricColor(t) {
    t = clamp(t, 0, 1);
    if (t < 0.02) return new THREE.Color(0x1a3a5c);
    if (t < 0.08) return new THREE.Color().lerpColors(new THREE.Color(0x1a3a5c), new THREE.Color(0x2d6a4f), t / 0.08);
    if (t < 0.25) return new THREE.Color().lerpColors(new THREE.Color(0x2d6a4f), new THREE.Color(0x52b788), (t - 0.08) / 0.17);
    if (t < 0.5) return new THREE.Color().lerpColors(new THREE.Color(0x52b788), new THREE.Color(0xd4a574), (t - 0.25) / 0.25);
    if (t < 0.75) return new THREE.Color().lerpColors(new THREE.Color(0xd4a574), new THREE.Color(0xf0e6d3), (t - 0.5) / 0.25);
    return new THREE.Color().lerpColors(new THREE.Color(0xf0e6d3), new THREE.Color(0xffffff), (t - 0.75) / 0.25);
  }

  function decodeTerrarium(r, g, b) {
    return r * 256 + g + b / 256 - 32768;
  }

  function lngLatToTile(lng, lat, z) {
    const n = Math.pow(2, z);
    const x = Math.floor(((lng + 180) / 360) * n);
    const latRad = lat * deg;
    const y = Math.floor((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2 * n);
    return { x: clamp(x, 0, n - 1), y: clamp(y, 0, n - 1) };
  }

  function loadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("Failed: " + url));
      img.src = url;
    });
  }

  function tileUrl(kind, z, x, y) {
    return TILE[kind].replace("{z}", z).replace("{x}", x).replace("{y}", y);
  }

  /* ── Globe ─────────────────────────────────────────────────────── */
  function createGlobe(container, opts = {}) {
    if (typeof THREE === "undefined") throw new Error("THREE required");
    const R = opts.radius || 2.2;
    const showPlates = opts.showPlates !== false;
    const showBoundaries = opts.showBoundaries !== false;
    const w = container.clientWidth || 640;
    const h = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040810);

    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.2;
    controls.maxDistance = 12;

    scene.add(new THREE.AmbientLight(0x446688, 0.5));
    const sun = new THREE.DirectionalLight(0xffffff, 1.2);
    sun.position.set(5, 3, 5);
    scene.add(sun);

    const earthGroup = new THREE.Group();
    scene.add(earthGroup);

    const texLoader = new THREE.TextureLoader();
    const earthMat = new THREE.MeshPhongMaterial({
      color: 0x4488aa,
      specular: 0x222222,
      shininess: 8,
    });
    texLoader.load(
      "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg",
      (t) => { earthMat.map = t; earthMat.color.set(0xffffff); earthMat.needsUpdate = true; },
      undefined,
      () => {}
    );
    const earth = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 64), earthMat);
    earthGroup.add(earth);
    if (showPlates) {
      earthMat.transparent = true;
      earthMat.opacity = 0.78;
    }

    const plateById = Object.fromEntries(PLATES.map((p) => [p.id, p]));
    const plateMeshes = [];
    let plateOverlay = null;
    if (showPlates) {
      const plateTex = buildPlateTexture(null);
      plateOverlay = new THREE.Mesh(
        new THREE.SphereGeometry(R * 1.002, 64, 64),
        new THREE.MeshBasicMaterial({
          map: plateTex,
          transparent: true,
          opacity: 0.92,
          depthWrite: false,
          depthTest: false,
        })
      );
      plateOverlay.renderOrder = 1;
      earthGroup.add(plateOverlay);

      PLATE_REGIONS.forEach((region) => {
        const meta = plateById[region.id];
        if (!meta) return;
        plateMeshes.push({ id: region.id, mesh: plateOverlay });
      });
    }

    const atmos = new THREE.Mesh(
      new THREE.SphereGeometry(R * 1.02, 64, 64),
      new THREE.MeshPhongMaterial({ color: 0x4ade80, transparent: true, opacity: 0.06, side: THREE.BackSide })
    );
    earthGroup.add(atmos);

    if (showBoundaries) {
      BOUNDARIES.forEach((b) => {
        const pts = greatCirclePoints(b.pts, R * 1.004, 14);
        const geo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(
          geo,
          new THREE.LineBasicMaterial({
            color: BOUNDARY_COLORS[b.type] || 0xffffff,
            transparent: true,
            opacity: 0.95,
            depthTest: false,
          })
        );
        line.userData.boundaryType = b.type;
        line.renderOrder = 2;
        earthGroup.add(line);
      });
    }

    const hkMarker = latLngToVec3(22.32, 114.17, R * 1.02);
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.04, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xfbbf24 })
    );
    marker.position.copy(hkMarker);
    earthGroup.add(marker);

    const stars = new THREE.Points(
      new THREE.BufferGeometry().setAttribute(
        "position",
        new THREE.Float32BufferAttribute(
          Array.from({ length: 1200 }, () => (Math.random() - 0.5) * 40),
          3
        )
      ),
      new THREE.PointsMaterial({ size: 0.05, color: 0xffffff, transparent: true, opacity: 0.7 })
    );
    scene.add(stars);

    let running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      earthGroup.rotation.y += 0.0008;
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function resize() {
      const nw = container.clientWidth;
      const nh = container.clientHeight || 480;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener("resize", resize);
    setTimeout(resize, 80);

    let activePlateId = null;
    function highlightPlate(id) {
      activePlateId = id || null;
      if (!plateOverlay) return;
      const old = plateOverlay.material.map;
      plateOverlay.material.map = buildPlateTexture(activePlateId);
      plateOverlay.material.needsUpdate = true;
      if (old) old.dispose();
    }

    return {
      scene, camera, renderer, earth, earthGroup, controls, plateMeshes,
      highlightPlate,
      focusHK() {
        earthGroup.rotation.y = -114.17 * deg;
        earthGroup.rotation.x = 0.35;
        controls.target.set(0, 0.3, 0);
      },
      destroy() {
        running = false;
        window.removeEventListener("resize", resize);
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
    };
  }

  /* ── Earth cross-section (cutaway + satellite crust) ───────────── */
  function createEarthSection(container, opts = {}) {
    if (typeof THREE === "undefined") throw new Error("THREE required");
    const R = opts.radius || 2;
    const w = container.clientWidth || 640;
    const h = container.clientHeight || 480;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060912);

    const camera = new THREE.PerspectiveCamera(42, w / h, 0.1, 50);
    camera.position.set(0.2, 0.45, 5.8);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.minDistance = 3.5;
    controls.maxDistance = 10;
    controls.target.set(0, 0, 0);

    /* Half-sphere cutaway: theta 0→π shows interior rings from the side */
    const cutGeo = (r) => new THREE.SphereGeometry(r, 64, 64, 0, Math.PI, 0, Math.PI);

    const layerDefs = [
      { id: "inner", r: R * 0.2, color: 0xfbbf24, emissive: 0x92400e, label: "內核" },
      { id: "outer", r: R * 0.45, color: 0xf97316, emissive: 0x9a3412, label: "外核" },
      { id: "mantle", r: R * 0.82, color: 0xb91c1c, emissive: 0x7f1d1d, label: "地幔" },
      { id: "crust", r: R, color: 0xffffff, emissive: 0x000000, label: "地殼", textured: true },
    ];

    const group = new THREE.Group();
    group.rotation.y = -Math.PI * 0.35;
    const meshes = [];

    const texLoader = new THREE.TextureLoader();
    let earthTex = null;
    texLoader.load(
      "https://cdn.jsdelivr.net/npm/three-globe@2.31.1/example/img/earth-blue-marble.jpg",
      (t) => {
        earthTex = t;
        meshes.forEach(({ mesh, def }) => {
          if (def.textured && earthTex) {
            mesh.material.map = earthTex;
            mesh.material.color.set(0xffffff);
            mesh.material.needsUpdate = true;
          }
        });
      }
    );

    layerDefs.forEach((L) => {
      const mat = new THREE.MeshPhongMaterial({
        color: L.color,
        emissive: L.emissive,
        emissiveIntensity: 0.18,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        shininess: L.textured ? 12 : 4,
      });
      const mesh = new THREE.Mesh(cutGeo(L.r), mat);
      mesh.userData.layerId = L.id;
      group.add(mesh);
      meshes.push({ mesh, def: L });
    });

    /* Flat cut face on the removed half — subtle disc */
    const cutFace = new THREE.Mesh(
      new THREE.CircleGeometry(R * 1.002, 64),
      new THREE.MeshPhongMaterial({ color: 0x1c1917, transparent: true, opacity: 0.85, side: THREE.DoubleSide })
    );
    cutFace.rotation.y = Math.PI / 2;
    group.add(cutFace);

    scene.add(group);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 3, 5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x4ade80, 0.25);
    fill.position.set(-3, -1, -2);
    scene.add(fill);

    let activeId = opts.activeLayer || "crust";
    function highlight(id) {
      activeId = id;
      meshes.forEach(({ mesh, def }) => {
        const on = def.id === id;
        mesh.material.opacity = on ? 0.95 : 0.28;
        mesh.material.emissiveIntensity = on ? 0.5 : 0.1;
        if (def.textured && on) mesh.material.opacity = 1;
        else if (def.textured && !on) mesh.material.opacity = 0.45;
      });
    }
    highlight(activeId);

    let running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function resize() {
      const nw = container.clientWidth || 640;
      const nh = container.clientHeight || 480;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener("resize", resize);
    setTimeout(resize, 80);

    return {
      highlight,
      getActiveId: () => activeId,
      destroy() {
        running = false;
        window.removeEventListener("resize", resize);
        controls.dispose();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
    };
  }

  /* ── HK Terrain (DEM + satellite + hypsometric) ───────────────── */
  async function createHKTerrain(container, opts = {}) {
    const geo = opts.geo || HK;
    const z = geo.Z;
    const n = Math.pow(2, z);
    const tMin = lngLatToTile(geo.minLng, geo.maxLat, z);
    const tMax = lngLatToTile(geo.maxLng, geo.minLat, z);
    const tw = tMax.x - tMin.x + 1;
    const th = tMax.y - tMin.y + 1;
    const tileSize = 256;
    const W = tw * tileSize;
    const H = th * tileSize;

    if (opts.onProgress) opts.onProgress("載入衛星影像與 DEM 瓦片…");

    const demC = document.createElement("canvas");
    demC.width = W; demC.height = H;
    const demCtx = demC.getContext("2d");
    const imgC = document.createElement("canvas");
    imgC.width = W; imgC.height = H;
    const imgCtx = imgC.getContext("2d");

    for (let ty = tMin.y; ty <= tMax.y; ty++) {
      for (let tx = tMin.x; tx <= tMax.x; tx++) {
        const ox = (tx - tMin.x) * tileSize;
        const oy = (ty - tMin.y) * tileSize;
        try {
          const [demImg, satImg] = await Promise.all([
            loadImage(tileUrl("dem", z, tx, ty)),
            loadImage(tileUrl("img", z, tx, ty)),
          ]);
          demCtx.drawImage(demImg, ox, oy);
          imgCtx.drawImage(satImg, ox, oy);
        } catch (e) {
          console.warn("Tile skip", tx, ty, e);
        }
      }
    }

    const demData = demCtx.getImageData(0, 0, W, H).data;
    const heights = new Float32Array(W * H);
    let minH = Infinity, maxH = -Infinity;
    for (let i = 0; i < W * H; i++) {
      const j = i * 4;
      const elev = decodeTerrarium(demData[j], demData[j + 1], demData[j + 2]);
      heights[i] = elev;
      if (elev > -1000) { minH = Math.min(minH, elev); maxH = Math.max(maxH, elev); }
    }
    if (!isFinite(minH)) { minH = 0; maxH = 1000; }

    const w = container.clientWidth;
    const h = container.clientHeight || 480;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1420);
    const camera = new THREE.PerspectiveCamera(50, w / h, 1, 50000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const seg = opts.segments || 256;
    const worldW = 2000;
    const worldH = worldW * (H / W);
    const geo3 = new THREE.PlaneGeometry(worldW, worldH, seg, seg);
    geo3.rotateX(-Math.PI / 2);

    const pos = geo3.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const useHypso = opts.hypsometric !== false;
    const satTex = new THREE.CanvasTexture(imgC);
    if (THREE.SRGBColorSpace) satTex.colorSpace = THREE.SRGBColorSpace;
    else if (THREE.sRGBEncoding) satTex.encoding = THREE.sRGBEncoding;

    const span = maxH - minH || 1;
    const vexag = opts.vexag || 2.5;
    for (let i = 0; i < pos.count; i++) {
      const ix = Math.floor((i % (seg + 1)) / seg * (W - 1));
      const iy = Math.floor(Math.floor(i / (seg + 1)) / seg * (H - 1));
      const elev = heights[iy * W + ix];
      const t = (elev - minH) / span;
      pos.setY(i, (elev - minH) * vexag * (worldW / 8000));
      const c = useHypso ? hypsometricColor(t) : new THREE.Color(0x888888);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    geo3.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo3.computeVertexNormals();

    const mode = opts.mode || "hypso";
    const mat =
      mode === "satellite"
        ? new THREE.MeshStandardMaterial({ map: satTex, roughness: 0.85 })
        : new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, metalness: 0.05 });

    const mesh = new THREE.Mesh(geo3, mat);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dl = new THREE.DirectionalLight(0xffffff, 0.85);
    dl.position.set(800, 1200, 600);
    scene.add(dl);

    const centerY = (maxH - minH) * vexag * (worldW / 8000) * 0.3;
    camera.position.set(worldW * 0.05, centerY + worldW * 0.35, worldW * 0.55);
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.target.set(0, centerY, 0);
    controls.enableDamping = true;
    controls.maxPolarAngle = Math.PI / 2.1;

    let running = true;
    function animate() {
      if (!running) return;
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }
    animate();

    function resize() {
      const nw = container.clientWidth;
      const nh = container.clientHeight || 480;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    }
    window.addEventListener("resize", resize);

    return {
      scene, mesh, camera, renderer, minH, maxH,
      setMode(m) {
        if (m === "satellite") mesh.material = new THREE.MeshStandardMaterial({ map: satTex, roughness: 0.85 });
        else mesh.material = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9 });
      },
      destroy() {
        running = false;
        window.removeEventListener("resize", resize);
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      },
    };
  }

  global.EarthEngine = {
    PLATES,
    PLATE_REGIONS,
    BOUNDARIES,
    BOUNDARY_COLORS,
    HK,
    createGlobe,
    createEarthSection,
    createHKTerrain,
    hypsometricColor,
    latLngToVec3,
  };
})(typeof window !== "undefined" ? window : global);
