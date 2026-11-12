/* =====================================================================
 *  app.js  —  HKDSE Western History · interactive 3D war maps
 *  REAL terrain: AWS Terrarium DEM + EOX Sentinel-2 cloudless 2016, Web-Mercator,
 *  to scale. Reads window.BATTLE_DATA (real lng/lat). Three.js r128.
 *  Sections: CONFIG · bootstrap · projection · tiles · terrain · sky
 *  · labels · crests · units · arrows · front · effects · weather
 *  · clock · camera · UI · loop
 * ===================================================================== */
(function () {
"use strict";

/* ---- fail loudly, never silently (Philosophy: No Fallback) -------- */
function fatal(e){
  const el=document.getElementById("err");
  el.style.display="block";
  el.textContent="⚠ 初始化失敗 / Initialization error:\n\n"+(e&&e.stack?e.stack:e)+
    "\n\n（請以 http(s) 開啟，勿用 file://。本機開發可執行 `node serve.js` 後開 http://localhost:5051 。"+
    " GitHub Pages 會直接載入地形瓦片；若失敗請檢查網絡或稍後再試。）";
  const boot=document.getElementById("boot"); if(boot) boot.classList.add("gone");
  console.error(e);
}
window.addEventListener("error", ev=>fatal(ev.error||ev.message));

try {
  if(typeof THREE==="undefined") throw new Error("THREE 未載入 (lib/three.min.js)");
  if(!THREE.OrbitControls) throw new Error("OrbitControls 未載入");
  if(!THREE.CSS2DRenderer) throw new Error("CSS2DRenderer 未載入");
  if(!window.BATTLE_DATA) throw new Error("BATTLE_DATA 未載入 (data.js)");
}catch(e){ fatal(e); return; }

const D = window.BATTLE_DATA;
const META = D.meta || {};
const FACTION_IDS = META.factionOrder || Object.keys(D.factions || {});
const bootMsg = t => { const m=document.getElementById("boot-msg"); if(m) m.textContent=t; };

function applyTheme(){
  const root=document.documentElement;
  FACTION_IDS.forEach((id,i)=>{
    const f=D.factions[id]; if(!f) return;
    root.style.setProperty(`--f${i}`, f.css);
    root.style.setProperty(`--f${i}-glow`, f.glowCss || f.css);
  });
  const key=document.getElementById("key");
  if(key){
    key.querySelectorAll(".row[data-f]").forEach(r=>r.remove());
    const anchor=key.querySelector(".sep-factions")||key.querySelector(".sep");
    FACTION_IDS.forEach(id=>{
      const f=D.factions[id]; if(!f) return;
      const row=document.createElement("div"); row.className="row"; row.dataset.f=id;
      row.innerHTML=`<span class="sw" style="background:${f.css};color:${f.css}"></span><span>${f.label_zh}${f.label_en?" "+f.label_en:""}</span>`;
      if(anchor) key.insertBefore(row, anchor); else key.appendChild(row);
    });
  }
  const t=document.getElementById("title");
  if(t && META.title_zh){ t.querySelector("h1").textContent=META.title_zh;
    const sub=t.querySelector(".sub"); if(sub) sub.textContent=(META.title_en||"")+(META.subtitle?" · "+META.subtitle:""); }
  const bt=document.querySelector("#boot .bt"); if(bt && META.title_zh) bt.textContent=META.title_zh;
  const bs=document.querySelector("#boot .bs"); if(bs) bs.textContent=(META.title_en||"")+(META.subtitle?" · "+META.subtitle:"");
  document.title=(META.title_zh||"War Map")+" · "+(META.title_en||"War Map");
}

/* ========================= CONFIG ================================== */
const TILE_SRC = (function () {
  const upstream = {
    dem: "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
    img: "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2020_3857/default/GoogleMapsCompatible/{z}/{y}/{x}.jpg",
  };
  const proxy = {
    dem: "/tiles/dem/{z}/{x}/{y}.png",
    img: "/tiles/img/{z}/{x}/{y}.jpg",
  };
  const h = location.hostname;
  return h === "localhost" || h === "127.0.0.1" ? proxy : upstream;
})();

const CFG = {
  GEO: META.geo || { minLng:22.5, maxLng:40.5, minLat:44.0, maxLat:52.5, Z:9 },
  TILE: TILE_SRC,
  TARGET_UNITS: 2000,   // world width of the map (height derived → to scale)
  VEXAG: 1.0,           // true scale: metres × M2U (no extra vertical exaggeration)
  VEXAG_TARGET: 0,
  VEXAG_MIN: 1, VEXAG_MAX: 1,
  RELIEF_BLUR: 0,       // use absolute elevation, not detrended local bumps
  NORMAL_GAIN: 1.8,     // subtle shading for natural relief
  EDGE_FRAC: 0.14,       // soft rim width (fraction of map); wider on large theatres
  TERR_SEG: 480,        // terrain mesh resolution
  SSAA: 1.4,            // supersample factor → render above display res to calm terrain/coastline texture aliasing under the orbit (capped so retina never regresses)
  // archival film grade on the (present-day) satellite imagery — ages modern colour cues toward
  // period footage so the anachronism is disguised. Noise floor: saturation ≥0.55, vignette ≤0.5
  // so the battle area (image centre) stays legible.
  GRADE:{ filter:"sepia(0.32) saturate(0.6) contrast(1.05) brightness(0.97)", vignette:0.42, grain:0.045 },
  DAY_MIN: 1, DAY_MAX: D.END_DAY || 1573,
  TWEEN: 2.4,            // camera move duration between shots (s)
  ZOOM: 0.45,           // multiplies each shot's camera distance → tighter framing on the action
  FOCUS:{ UNIT_DIM:0.12, PLACE_NEAR:350, PLACE_FAR:1200, MAX_PLACES:10 }, // show only the nearest few place names
  FLASH_K: 0.26,        // muzzle/explosion flash-light dampening (was blowing out the scene)
  FX_DENSITY: 0.5,      // combat flash/particle rate (0.5 = half as dense)
  // entity scale (tuned to the ~2000-unit metric extent)
  FLAG_H: 30, FLAG_W: 26, FLAG_TH: 16,   // shorter staff + smaller cloth → less "stadium banner / km-pole" clash
  RING_IN: 5, RING_OUT: 8, TOKEN_R: 6.5, TOKEN_H: 7, POLE_R: 0.6, FINIAL_R: 1.2,   // TOKEN_R kept → wedge footprint unchanged
  LBL_REGION: 80, LBL_PEAK: 44, LBL_TOWN: 34, LBL_FORT: 38, LBL_UNIT: 34,
  EU: 5.0,              // effect spatial unit
  GLOW_PSCALE: 400,     // bright additive points (smaller → less glare)
  SMOKE_PSCALE: 340,    // smoke kept modest so it reads as a column, not a dark canopy
};
const FAC = {};
FACTION_IDS.forEach(id=>{
  const f=D.factions[id];
  FAC[id]={ main:f.main, glow:f.glow, dim:f.dim, css:f.css, label_zh:f.label_zh, label_en:f.label_en,
    emblem:f.emblem||"shield", textLight:f.textLight||"#e8e0d0" };
});
const RETREAT_FAC = META.retreatFaction || FACTION_IDS[1] || FACTION_IDS[0];

/* ---- small math --------------------------------------------------- */
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const lerp=(a,b,t)=>a+(b-a)*t;
const smooth=(e0,e1,x)=>{ const t=clamp((x-e0)/(e1-e0||1e-6),0,1); return t*t*(3-2*t); };
const easeIO=t=>t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const deg=Math.PI/180;

/* ========================= BOOTSTRAP =============================== */
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x9fb3c4, 0.00018);

const camera = new THREE.PerspectiveCamera(50, innerWidth/innerHeight, 10, 16000);   // near=10 (not 1): a tiny near plane wrecks z-precision at distance → the translucent sea's depth-test twinkles under the wide-shot orbit

const renderer = new THREE.WebGLRenderer({antialias:true, powerPreference:"high-performance", preserveDrawingBuffer:true});
renderer.setPixelRatio(Math.min(devicePixelRatio*CFG.SSAA, 2));   // supersample (capped at 2 → no retina regression)
renderer.setSize(innerWidth, innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;   // static self-shadowing → terrain relief form
document.getElementById("scene").appendChild(renderer.domElement);

const labelRenderer = new THREE.CSS2DRenderer();
labelRenderer.setSize(innerWidth, innerHeight);
labelRenderer.domElement.style.position="absolute";
labelRenderer.domElement.style.top="0";
labelRenderer.domElement.style.pointerEvents="none";
document.getElementById("labels").appendChild(labelRenderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping=true; controls.dampingFactor=0.08;
controls.minDistance=120; controls.maxDistance=6500;
controls.maxPolarAngle=Math.PI*0.42;   // block horizon-hugging views that hide the theatre
controls.minPolarAngle=Math.PI*0.12;

const sun = new THREE.DirectionalLight(0xfff1d6, 1.1);
sun.position.set(900, 1500, 700); scene.add(sun);
const hemi = new THREE.HemisphereLight(0xbfd4ea, 0x35422f, 0.55); scene.add(hemi);
const amb = new THREE.AmbientLight(0x404a55, 0.5); scene.add(amb);

addEventListener("resize", ()=>{
  camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
  labelRenderer.setSize(innerWidth,innerHeight);
});

/* ===================== PROJECTION (Web Mercator) ================== *
 *  Filled by loadTiles(); project()/sampleHeight() are the SSOT for
 *  lng/lat → world and for terrain elevation.
 * ---------------------------------------------------------------- */
const RE = 6378137;
const lng2mx = l => RE*l*deg;
const lat2my = la => RE*Math.log(Math.tan(Math.PI/4 + la*deg/2));
const lng2tx = (l,z)=>Math.floor((l+180)/360*Math.pow(2,z));
const lat2ty = (la,z)=>{ const r=la*deg; return Math.floor((1-Math.log(Math.tan(r)+1/Math.cos(r))/Math.PI)/2*Math.pow(2,z)); };
const tx2lng = (x,z)=>x/Math.pow(2,z)*360-180;
const ty2lat = (y,z)=>{ const n=Math.PI-2*Math.PI*y/Math.pow(2,z); return Math.atan(Math.sinh(n))/deg; };

let MX0,MX1,MYN,MYS,M2U,MAPW,MAPD;            // mercator bounds + scale
let demW,demH,heightData=null, reliefData=null; // composed DEM + local relief (detrended)
let imageryTex=null, normalTex=null;

function sampleReliefPx(u,v){
  const fx=clamp(u,0,1)*(demW-1), fy=clamp(v,0,1)*(demH-1);
  const x0=Math.floor(fx), y0=Math.floor(fy), x1=Math.min(x0+1,demW-1), y1=Math.min(y0+1,demH-1);
  const tx=fx-x0, ty=fy-y0;
  const a=reliefData[y0*demW+x0], b=reliefData[y0*demW+x1], c=reliefData[y1*demW+x0], d=reliefData[y1*demW+x1];
  return (a*(1-tx)+b*tx)*(1-ty)+(c*(1-tx)+d*tx)*ty;
}
function terrainY(u,v){ return sampleReliefPx(u,v)*M2U*CFG.VEXAG; }

function project(lng,lat){ return { X:(lng2mx(lng)-MX0)*M2U-MAPW/2, Z:(MYN-lat2my(lat))*M2U-MAPD/2 }; }
function sampleHeightPx(u,v){
  const fx=clamp(u,0,1)*(demW-1), fy=clamp(v,0,1)*(demH-1);
  const x0=Math.floor(fx), y0=Math.floor(fy), x1=Math.min(x0+1,demW-1), y1=Math.min(y0+1,demH-1);
  const tx=fx-x0, ty=fy-y0;
  const a=heightData[y0*demW+x0], b=heightData[y0*demW+x1], c=heightData[y1*demW+x0], d=heightData[y1*demW+x1];
  return (a*(1-tx)+b*tx)*(1-ty)+(c*(1-tx)+d*tx)*ty;
}
function sampleHeight(lng,lat){
  return sampleHeightPx((lng2mx(lng)-MX0)/(MX1-MX0), (MYN-lat2my(lat))/(MYN-MYS));
}
function groundY(lng,lat){
  const u=(lng2mx(lng)-MX0)/(MX1-MX0), vS=(MYN-lat2my(lat))/(MYN-MYS);
  return Math.max(terrainY(u,vS), 0);
}
function vec(lng,lat,yOff){ const p=project(lng,lat); return new THREE.Vector3(p.X, groundY(lng,lat)+(yOff||0), p.Z); }

/* ===================== TILE LOADING / COMPOSITING ================= */
function loadImg(src){ return new Promise((res,rej)=>{ const im=new Image();
  im.crossOrigin="anonymous";
  im.onload=()=>res(im); im.onerror=()=>rej(new Error("地形瓦片載入失敗 / tile failed to load: "+src)); im.src=src; }); }

async function loadTiles(){
  const g=CFG.GEO, z=g.Z;
  const x0=lng2tx(g.minLng,z), x1=lng2tx(g.maxLng,z);
  const y0=lat2ty(g.maxLat,z), y1=lat2ty(g.minLat,z);   // north has smaller y
  const nx=x1-x0+1, ny=y1-y0+1;
  // mercator bounds from tile-grid edges (so geometry aligns to imagery)
  MX0=lng2mx(tx2lng(x0,z));   MX1=lng2mx(tx2lng(x1+1,z));
  MYN=lat2my(ty2lat(y0,z));   MYS=lat2my(ty2lat(y1+1,z));
  M2U=CFG.TARGET_UNITS/(MX1-MX0); MAPW=(MX1-MX0)*M2U; MAPD=(MYN-MYS)*M2U;

  // --- DEM → heightData (capped resolution — full z10 mosaic is too large for CPU relief pass) ---
  bootMsg("載入真實地形高程 (DEM)…");
  const maxDem=2048;
  const nativeDemW=nx*256, nativeDemH=ny*256;
  const demScale=Math.min(1, maxDem/Math.max(nativeDemW,nativeDemH));
  const dem=document.createElement("canvas");
  dem.width=Math.round(nativeDemW*demScale); dem.height=Math.round(nativeDemH*demScale);
  const dctx=dem.getContext("2d",{willReadFrequently:true});
  const demJobs=[];
  for(let x=x0;x<=x1;x++) for(let y=y0;y<=y1;y++)
    demJobs.push(loadImg(CFG.TILE.dem.replace("{z}",z).replace("{x}",x).replace("{y}",y)).then(im=>
      dctx.drawImage(im,(x-x0)*256*demScale,(y-y0)*256*demScale,256*demScale,256*demScale)));
  await Promise.all(demJobs);
  demW=dem.width; demH=dem.height;
  const px=dctx.getImageData(0,0,demW,demH).data;
  heightData=new Float32Array(demW*demH);
  for(let i=0;i<heightData.length;i++){ const j=i*4;
    heightData[i]=(px[j]*256 + px[j+1] + px[j+2]/256) - 32768; }

  // Absolute elevation above tile minimum → true-scale relief (no detrend / VEXAG boost).
  let baseElev=Infinity;
  for(let i=0;i<heightData.length;i++) if(heightData[i]<baseElev) baseElev=heightData[i];
  reliefData=new Float32Array(demW*demH);
  let rMax=0;
  for(let i=0;i<heightData.length;i++){
    const r=heightData[i]-baseElev;
    reliefData[i]=r;
    if(r>rMax) rMax=r;
  }
  CFG.VEXAG=1.0;
  console.log(`DEM base ${baseElev.toFixed(0)} m · relief span ${rMax.toFixed(0)} m · true-scale VEXAG ${CFG.VEXAG}`);

  normalTex=buildNormalTex(reliefData,demW,demH,CFG.NORMAL_GAIN);

  // --- imagery → texture (graded for a documentary look) ---
  bootMsg("載入衛星影像…");
  const maxT=renderer.capabilities.maxTextureSize||4096;
  const nativeW=nx*256, nativeH=ny*256, scale=Math.min(1, maxT/Math.max(nativeW,nativeH));
  const img=document.createElement("canvas"); img.width=Math.round(nativeW*scale); img.height=Math.round(nativeH*scale);
  const ictx=img.getContext("2d"); ictx.filter=CFG.GRADE.filter;
  const imgJobs=[];
  for(let x=x0;x<=x1;x++) for(let y=y0;y<=y1;y++)
    imgJobs.push(loadImg(CFG.TILE.img.replace("{z}",z).replace("{x}",x).replace("{y}",y)).then(im=>
      ictx.drawImage(im,(x-x0)*256*scale,(y-y0)*256*scale,256*scale,256*scale)));
  await Promise.all(imgJobs);
  applyArchivalGrade(ictx,img.width,img.height);   // vignette + faint grain over the graded tiles
  imageryTex=new THREE.CanvasTexture(img);
  imageryTex.colorSpace=THREE.SRGBColorSpace || undefined;
  imageryTex.encoding=THREE.sRGBEncoding;
  imageryTex.anisotropy=renderer.capabilities.getMaxAnisotropy();
  imageryTex.needsUpdate=true;
}

function buildNormalTex(field,w,h,gain){
  const cv=document.createElement("canvas"); cv.width=w; cv.height=h;
  const ctx=cv.getContext("2d"), img=ctx.createImageData(w,h), d=img.data;
  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const i=y*w+x;
      const l=field[i>0?i-1:i], r=field[x<w-1?i+1:i];
      const u=field[i-w>=0?i-w:i], dn=field[i+w<h*w?i+w:i];
      const dx=(r-l)*gain, dy=(dn-u)*gain;
      const nx=-dx, ny=-dy, nz=1;
      const len=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;
      const j=i*4;
      d[j]=((nx/len)*0.5+0.5)*255; d[j+1]=((ny/len)*0.5+0.5)*255;
      d[j+2]=((nz/len)*0.5+0.5)*255; d[j+3]=255;
    }
  }
  ctx.putImageData(img,0,0);
  const tex=new THREE.CanvasTexture(cv);
  tex.anisotropy=renderer.capabilities.getMaxAnisotropy();
  return tex;
}

/* ===================== REAL TERRAIN + SEA + SKY =================== */
let seaMesh;
function buildTerrain(){
  bootMsg("塑造真實地形…");
  const seg=CFG.TERR_SEG;
  const geo=new THREE.PlaneGeometry(MAPW, MAPD, seg, seg);
  geo.rotateX(-Math.PI/2);
  const pos=geo.attributes.position, uv=geo.attributes.uv, n=pos.count;
  const rawY=new Float32Array(n);
  let yMax=0;
  for(let i=0;i<n;i++){
    const wx=pos.getX(i), wz=pos.getZ(i);
    const u=(wx+MAPW/2)/MAPW, vS=(wz+MAPD/2)/MAPD;
    const y=terrainY(u,vS);
    rawY[i]=y; if(y>yMax) yMax=y;
  }
  const sink=Math.min(-8,-yMax*0.15-MAPW*0.012);   // rim dips just below sea — no vertical cliff wall
  const edgeW=CFG.EDGE_FRAC;
  for(let i=0;i<n;i++){
    const wx=pos.getX(i), wz=pos.getZ(i);
    const u=(wx+MAPW/2)/MAPW, vS=(wz+MAPD/2)/MAPD;
    const edge=smooth(edgeW,0,Math.min(u,1-u,vS,1-vS));
    const y=rawY[i]*(1-edge)+sink*edge;
    pos.setY(i, y);
    uv.setXY(i, u, 1-vS);
  }
  geo.computeVertexNormals();
  const terrain=new THREE.Mesh(geo, new THREE.MeshStandardMaterial({
    map:imageryTex, normalMap:normalTex,
    normalScale:new THREE.Vector2(1.1,1.1),
    roughness:0.9, metalness:0.0 }));
  scene.add(terrain);
  // static cast-shadows for relief form — the sun direction is FIXED (no arc) so shadows never move;
  // day/night stays intensity/colour-driven (honours the standing "no moving shadows" directive).
  terrain.castShadow=true; terrain.receiveShadow=true;
  sun.castShadow=true; sun.shadow.mapSize.set(2048,2048);
  { const S=Math.max(MAPW,MAPD)*0.72, sc=sun.shadow.camera;
    sc.left=-S; sc.right=S; sc.top=S; sc.bottom=-S; sc.near=50; sc.far=5000; sc.updateProjectionMatrix();
    sun.shadow.bias=-0.0004; sun.shadow.normalBias=0.8; }

  // sea: a STATIC, matte, slightly-translucent surface just below the coastline.
  // (No wave animation + low reflectivity + depthWrite:false → no sweeping specular
  //  highlights and no z-fighting where it meets the shore — i.e. no "moving shadows".)
  const sg=new THREE.PlaneGeometry(MAPW*1.4, MAPD*1.4); sg.rotateX(-Math.PI/2);
  seaMesh=new THREE.Mesh(sg, new THREE.MeshStandardMaterial({
    color:0x14323f, roughness:0.88, metalness:0.04, transparent:true, opacity:0.88, depthWrite:false }));
  // MATTE (roughness 0.88, low metalness). A glossy sheen sweeps a moving specular highlight as the camera
  // orbits → the "sea flicker". Reverted to matte (the HKBattleSeaShimmer known-good); deeper tone +
  // opacity 0.88 kept (continuous open water; helps the waterline rim).
  seaMesh.position.y=Math.min(-2,sink*0.5); scene.add(seaMesh);
}

const skyMat = new THREE.ShaderMaterial({
  side:THREE.BackSide, depthWrite:false,
  uniforms:{ top:{value:new THREE.Color(0x6f9fd0)}, bot:{value:new THREE.Color(0xcad9e2)} },
  vertexShader:`varying float vH; void main(){ vH=normalize(position).y; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
  fragmentShader:`uniform vec3 top; uniform vec3 bot; varying float vH;
    void main(){ float t=clamp(vH*0.5+0.5,0.0,1.0); gl_FragColor=vec4(mix(bot,top,t),1.0);}`
});
scene.add(new THREE.Mesh(new THREE.SphereGeometry(9000,32,16), skyMat));


/* ===================== PLACE / TERRAIN LABELS ===================== */
const labelGroup=new THREE.Group(); scene.add(labelGroup);
const placeLabels=[];
function addPlaceLabel(p, cls, off){
  const d=document.createElement("div"); d.className="lbl "+cls;
  const refLine = p.ref ? `<div class="ref">${p.ref}</div>` : "";
  d.innerHTML=`<div class="zh">${p.name_zh}</div><div class="en">${p.name_en}</div>${refLine}`;
  const o=new THREE.CSS2DObject(d); o.position.copy(vec(p.lng,p.lat,off));
  labelGroup.add(o); placeLabels.push({o,div:d,cls});
}
function buildLabels(){
  D.geography.regions.forEach(r=>addPlaceLabel(r,"region",CFG.LBL_REGION));
  D.geography.points.forEach(p=>{
    const cls=p.h>0?"peak":(p.type==="fort"?"fort":(p.type==="bay"||p.type==="channel"?"bay":"town"));
    const off=p.h>0?CFG.LBL_PEAK:(cls==="fort"?CFG.LBL_FORT:CFG.LBL_TOWN);
    addPlaceLabel(p,cls,off);
  });
}

const mapCompassGroup=new THREE.Group(); scene.add(mapCompassGroup);
function buildMapCompass(){
  const g=CFG.GEO;
  const padLng=(g.maxLng-g.minLng)*0.06, padLat=(g.maxLat-g.minLat)*0.06;
  const lng=g.minLng+padLng, lat=g.minLat+padLat;
  const y=groundY(lng,lat)+12;
  const p=project(lng,lat);
  const arm=Math.min(MAPW,MAPD)*0.065;
  const mat=new THREE.LineBasicMaterial({color:0xd8c08a,transparent:true,opacity:0.9});
  const mkLine=(x0,z0,x1,z1)=>{
    const geo=new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x0,y,z0), new THREE.Vector3(x1,y,z1),
    ]);
    mapCompassGroup.add(new THREE.Line(geo,mat));
  };
  mkLine(p.X,p.Z-arm, p.X,p.Z+arm);
  mkLine(p.X-arm,p.Z, p.X+arm,p.Z);
  const tips=[{zh:"北",dx:0,dz:-arm},{zh:"東",dx:arm,dz:0},{zh:"南",dx:0,dz:arm},{zh:"西",dx:-arm,dz:0}];
  for(const t of tips){
    const d=document.createElement("div"); d.className="compass-lbl"; d.textContent=t.zh;
    const o=new THREE.CSS2DObject(d);
    o.position.set(p.X+t.dx, y+4, p.Z+t.dz);
    mapCompassGroup.add(o);
  }
}

/* ---- defensive line (Gin Drinkers) + moving front line ---------- *
 *  Both are explained in the on-screen legend (#key) AND carry an
 *  on-map label, so the audience knows what each line means.
 * ---------------------------------------------------------------- */
function geoCurve(path, yOff){ return new THREE.CatmullRomCurve3(path.map(p=>vec(p[0],p[1],yOff)), false, "catmullrom", 0.4); }
function lineLabel(zh,en,color){ const d=document.createElement("div"); d.className="lbl linelbl";
  d.innerHTML=`<div class="zh" style="color:${color}">${zh}</div><div class="en">${en}</div>`;
  const o=new THREE.CSS2DObject(d); labelGroup.add(o); return {o,div:d}; }

let staticLines = [];
function buildLine(){
  staticLines = [];
  const lines = (D.geography && D.geography.lines) || [];
  lines.forEach(line => {
    if (!line || !line.path || !line.path.length) return;
    const curve = geoCurve(line.path, 12);
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(curve, 120, 2.0, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x6fa0d8, transparent: true, opacity: 0 }));
    scene.add(mesh);
    const label = lineLabel(line.name_zh || "界線", line.name_en || "Boundary", "#6fa0d8");
    const m = curve.getPoint(0.5);
    label.o.position.set(m.x, m.y + CFG.LBL_FORT, m.z);
    staticLines.push({ mesh, label, fade: line.fade || null });
  });
}
function lineOpacity(day, fade){
  if (!fade) return 0.55;
  const until = fade.until != null ? fade.until : 55;
  const end = fade.end != null ? fade.end : 90;
  return day < until ? 0.55 : clamp((end - day) / (end - until), 0, 1) * 0.55;
}
function updateLines(day){
  staticLines.forEach(({ mesh, label, fade }) => {
    const op = lineOpacity(day, fade);
    mesh.material.opacity = op;
    mesh.visible = op > 0.02;
    label.o.visible = op > 0.05;
    label.div.style.opacity = clamp(op / 0.55, 0, 1);
  });
}

const frontGroup=new THREE.Group(); scene.add(frontGroup);
let frontMesh=null, frontIdx=-1, frontLabel=null;
function updateFront(day){
  let idx=-1; for(let i=0;i<D.fronts.length;i++){ if(D.fronts[i].d<=day) idx=i; }
  if(idx===frontIdx) return; frontIdx=idx;
  if(frontMesh){ frontGroup.remove(frontMesh); frontMesh.geometry.dispose(); frontMesh=null; }
  if(!frontLabel) frontLabel=lineLabel("戰線","Front line","#ffb24a");
  if(idx<0){ frontLabel.o.visible=false; return; }
  const curve=geoCurve(D.fronts[idx].path,16);
  frontMesh=new THREE.Mesh(new THREE.TubeGeometry(curve,80,2.4,8,false),
    new THREE.MeshBasicMaterial({color:0xffb24a, transparent:true, opacity:0.8}));
  frontGroup.add(frontMesh);
  const m=curve.getPoint(0.5); frontLabel.o.position.set(m.x, m.y+CFG.LBL_FORT, m.z); frontLabel.o.visible=true;
}

/* ============================ CRESTS ============================== */
const COL={ ink:"#16140f", red:"#c62828", gold:"#d8b24a", silver:"#dcdce2",
  cream:"#f2ead2", green:"#3f7d40", pink:"#e58fa0", navy:"#16243f", brass:"#caa64a" };
function pCrown(c,x,y,w){ c.fillStyle=COL.gold; c.beginPath();
  c.moveTo(x-w,y+w*0.5); c.lineTo(x-w,y-w*0.3); c.lineTo(x-w*0.5,y+w*0.1);
  c.lineTo(x,y-w*0.5); c.lineTo(x+w*0.5,y+w*0.1); c.lineTo(x+w,y-w*0.3);
  c.lineTo(x+w,y+w*0.5); c.closePath(); c.fill(); c.fillRect(x-w,y+w*0.45,w*2,w*0.35); }
function pMaple(c,x,y,r,col){ c.fillStyle=col||COL.red; c.beginPath();
  const pts=[[0,-1],[.18,-.5],[.55,-.62],[.42,-.22],[.92,-.18],[.55,.05],[.78,.42],
    [.3,.32],[.34,.86],[0,.55],[-.34,.86],[-.3,.32],[-.78,.42],[-.55,.05],[-.92,-.18],
    [-.42,-.22],[-.55,-.62],[-.18,-.5]];
  pts.forEach((p,i)=>{ const X=x+p[0]*r, Y=y+p[1]*r; i?c.lineTo(X,Y):c.moveTo(X,Y); }); c.closePath(); c.fill(); }
function pStar(c,x,y,r,n,col){ c.fillStyle=col||COL.gold; c.beginPath();
  for(let i=0;i<n*2;i++){ const a=Math.PI/n*i-Math.PI/2, rr=i%2?r*0.42:r;
    const X=x+Math.cos(a)*rr, Y=y+Math.sin(a)*rr; i?c.lineTo(X,Y):c.moveTo(X,Y); } c.closePath(); c.fill(); }
function pAnchor(c,x,y,r,col){ c.strokeStyle=col||COL.silver; c.lineWidth=r*0.16; c.lineCap="round";
  c.beginPath(); c.arc(x,y-r*0.7,r*0.2,0,7); c.stroke();
  c.beginPath(); c.moveTo(x,y-r*0.5); c.lineTo(x,y+r*0.8); c.stroke();
  c.beginPath(); c.moveTo(x-r*0.55,y+r*0.05); c.lineTo(x+r*0.55,y+r*0.05); c.stroke();
  c.beginPath(); c.moveTo(x-r*0.7,y+r*0.55); c.quadraticCurveTo(x,y+r*1.05,x,y+r*0.8); c.stroke();
  c.beginPath(); c.moveTo(x+r*0.7,y+r*0.55); c.quadraticCurveTo(x,y+r*1.05,x,y+r*0.8); c.stroke(); }
function pBugle(c,x,y,r,col){ c.strokeStyle=col||COL.silver; c.lineWidth=r*0.14;
  c.beginPath(); c.ellipse(x,y,r*0.8,r*0.5,0,0.2,Math.PI*1.7); c.stroke();
  c.beginPath(); c.moveTo(x+r*0.7,y-r*0.25); c.lineTo(x+r*1.0,y-r*0.4); c.stroke(); }
function pGrenade(c,x,y,r){ c.fillStyle=COL.gold; c.beginPath(); c.arc(x,y+r*0.2,r*0.55,0,7); c.fill();
  c.fillRect(x-r*0.13,y-r*0.5,r*0.26,r*0.35); c.strokeStyle=COL.red; c.lineWidth=r*0.1; c.lineCap="round";
  for(let i=-1;i<=1;i++){ c.beginPath(); c.moveTo(x+i*r*0.18,y-r*0.45);
    c.quadraticCurveTo(x+i*r*0.5,y-r*0.9,x+i*r*0.15,y-r*1.05); c.stroke(); } }
function pPlume(c,x,y,r){ c.fillStyle=COL.silver;
  for(let i=-1;i<=1;i++){ c.save(); c.translate(x+i*r*0.32,y); c.rotate(i*0.28);
    c.beginPath(); c.ellipse(0,-r*0.1,r*0.16,r*0.7,0,0,7); c.fill(); c.restore(); }
  c.fillStyle=COL.gold; c.fillRect(x-r*0.5,y+r*0.55,r,r*0.2); }
function pJunk(c,x,y,r,col){ c.fillStyle=col||COL.gold;
  c.beginPath(); c.moveTo(x-r*0.8,y+r*0.4); c.lineTo(x+r*0.8,y+r*0.4);
  c.lineTo(x+r*0.55,y+r*0.7); c.lineTo(x-r*0.55,y+r*0.7); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x-r*0.1,y+r*0.35); c.lineTo(x-r*0.1,y-r*0.75);
  c.quadraticCurveTo(x-r*0.7,y-r*0.5,x-r*0.55,y+r*0.2); c.closePath(); c.fill();
  c.beginPath(); c.moveTo(x+r*0.18,y+r*0.35); c.lineTo(x+r*0.18,y-r*0.55);
  c.quadraticCurveTo(x+r*0.72,y-r*0.3,x+r*0.6,y+r*0.25); c.closePath(); c.fill(); }
function pCannon(c,x,y,r){ c.save(); c.strokeStyle=COL.silver; c.lineWidth=r*0.22; c.lineCap="round";
  c.beginPath(); c.moveTo(x-r*0.7,y+r*0.6); c.lineTo(x+r*0.7,y-r*0.5); c.stroke();
  c.beginPath(); c.moveTo(x+r*0.7,y+r*0.6); c.lineTo(x-r*0.7,y-r*0.5); c.stroke(); c.restore(); }
function pFieldGun(c,x,y,r){ c.fillStyle=COL.brass; c.fillRect(x-r*0.2,y-r*0.15,r*1.1,r*0.22);
  c.beginPath(); c.arc(x-r*0.25,y+r*0.4,r*0.4,0,7); c.fill();
  c.fillStyle=COL.navy; c.beginPath(); c.arc(x-r*0.25,y+r*0.4,r*0.16,0,7); c.fill(); }
function pSakura(c,x,y,r){ c.fillStyle=COL.pink;
  for(let i=0;i<5;i++){ const a=-Math.PI/2+i*Math.PI*0.4;
    c.save(); c.translate(x+Math.cos(a)*r*0.42,y+Math.sin(a)*r*0.42); c.rotate(a+Math.PI/2);
    c.beginPath(); c.ellipse(0,0,r*0.26,r*0.42,0,0,7); c.fill(); c.restore(); }
  c.fillStyle=COL.gold; c.beginPath(); c.arc(x,y,r*0.16,0,7); c.fill(); }
function pReeds(c,x,y,r){ c.strokeStyle=COL.ink; c.lineWidth=r*0.1; c.lineCap="round";
  for(let i=-2;i<=2;i++){ c.beginPath(); c.moveTo(x+i*r*0.2,y+r*0.7);
    c.quadraticCurveTo(x+i*r*0.3,y-r*0.2,x+i*r*0.45,y-r*0.8); c.stroke(); } }
function pIgeta(c,x,y,r){ c.strokeStyle=COL.ink; c.lineWidth=r*0.16; const s=r*0.55;
  c.strokeRect(x-s,y-s,s*2,s*2);
  c.beginPath(); c.moveTo(x-s*1.2,y-s*0.4); c.lineTo(x+s*1.2,y-s*0.4);
  c.moveTo(x-s*1.2,y+s*0.4); c.lineTo(x+s*1.2,y+s*0.4);
  c.moveTo(x-s*0.4,y-s*1.2); c.lineTo(x-s*0.4,y+s*1.2);
  c.moveTo(x+s*0.4,y-s*1.2); c.lineTo(x+s*0.4,y+s*1.2); c.stroke(); }
function pRiceField(c,x,y,r){ const s=r*0.6; c.strokeStyle=COL.ink; c.lineWidth=r*0.13;
  c.strokeRect(x-s,y-s,s*2,s*2); c.beginPath(); c.moveTo(x,y-s); c.lineTo(x,y+s);
  c.moveTo(x-s,y); c.lineTo(x+s,y); c.stroke(); c.strokeStyle=COL.green; c.lineWidth=r*0.09;
  [[-1,-1],[1,-1],[-1,1],[1,1]].forEach(d=>{ c.beginPath();
    c.moveTo(x+d[0]*s*1.2,y+d[1]*s*1.2); c.lineTo(x+d[0]*s*1.45,y+d[1]*s*1.5); c.stroke(); }); }
function pRisingSun(c,x,y,r){ c.fillStyle=COL.red; c.beginPath(); c.arc(x,y-r*0.1,r*0.5,0,7); c.fill();
  c.fillStyle=COL.red; for(let i=-1;i<=1;i++){ c.beginPath();   // red rays on the cream medallion — canonical Rising Sun (was green)
    c.moveTo(x+i*r*0.4,y+r*0.7); c.lineTo(x+i*r*0.4-r*0.18,y+r*0.2); c.lineTo(x+i*r*0.4+r*0.18,y+r*0.2);
    c.closePath(); c.fill(); } }
function pLion(c,x,y,r){ c.fillStyle=COL.gold; c.beginPath();
  c.moveTo(x-r*0.4,y+r*0.8); c.lineTo(x-r*0.3,y-r*0.2);
  c.quadraticCurveTo(x-r*0.4,y-r*0.7,x-r*0.05,y-r*0.7); c.quadraticCurveTo(x+r*0.2,y-r*0.7,x+r*0.15,y-r*0.35);
  c.lineTo(x+r*0.5,y-r*0.5); c.lineTo(x+r*0.3,y-r*0.1); c.lineTo(x+r*0.55,y+r*0.2);
  c.lineTo(x+r*0.25,y+r*0.25); c.lineTo(x+r*0.3,y+r*0.8); c.lineTo(x+r*0.05,y+r*0.8);
  c.lineTo(x,y+r*0.3); c.lineTo(x-r*0.1,y+r*0.8); c.closePath(); c.fill(); }
function pWing(c,x,y,r){ c.fillStyle=COL.silver; c.beginPath();
  c.moveTo(x-r,y); c.quadraticCurveTo(x,y-r*0.5,x+r,y-r*0.15);
  c.quadraticCurveTo(x,y+r*0.2,x-r,y+r*0.15); c.closePath(); c.fill(); }
function pTrident(c,x,y,r,col){ c.strokeStyle=col||COL.gold; c.lineWidth=r*0.14; c.lineCap="round";
  c.beginPath(); c.moveTo(x,y+r*0.8); c.lineTo(x,y-r*0.7); c.stroke();
  for(let i=-1;i<=1;i++){ c.beginPath(); c.moveTo(x,y-r*0.3); c.lineTo(x+i*r*0.55,y-r*0.75); c.stroke(); } }
function pTank(c,x,y,r){ c.fillStyle=COL.silver; c.fillRect(x-r*0.7,y-r*0.1,r*1.4,r*0.35);
  c.beginPath(); c.arc(x-r*0.45,y+r*0.35,r*0.3,0,7); c.fill(); c.arc(x+r*0.45,y+r*0.35,r*0.3,0,7); c.fill();
  c.fillRect(x-r*0.15,y-r*0.45,r*0.3,r*0.35); }
function pHammer(c,x,y,r){ c.fillStyle=COL.silver; c.fillRect(x-r*0.1,y-r*0.7,r*0.2,r*0.9);
  c.fillRect(x-r*0.5,y-r*0.7,r*0.55,r*0.25); }
function pWheat(c,x,y,r){ c.strokeStyle=COL.gold; c.lineWidth=r*0.1; c.lineCap="round";
  for(let i=-2;i<=2;i++){ c.beginPath(); c.moveTo(x+i*r*0.15,y+r*0.7);
    c.quadraticCurveTo(x+i*r*0.25,y,x+i*r*0.1,y-r*0.8); c.stroke(); } }
function pEagle(c,x,y,r){ pWing(c,x,y,r); pStar(c,x,y+r*0.2,r*0.25,5,COL.gold); }
const crests = {
  trident:(c,x,y,r)=>{ pTrident(c,x,y,r,COL.gold); },
  bear:(c,x,y,r)=>{ pLion(c,x,y,r); },
  eagle:(c,x,y,r)=>{ pEagle(c,x,y,r); },
  tank:(c,x,y,r)=>{ pTank(c,x,y,r); },
  hammer:(c,x,y,r)=>{ pHammer(c,x,y,r); },
  wheat:(c,x,y,r)=>{ pWheat(c,x,y,r); },
  wings:(c,x,y,r)=>{ c.fillStyle=COL.red; c.beginPath(); c.arc(x,y,r*0.55,0,7); c.fill(); pWing(c,x,y,r*0.95); },
  anchor:(c,x,y,r)=>{ pAnchor(c,x,y,r,COL.silver); },
};
const flagTexCache={};
function flagTexture(unit){
  if(flagTexCache[unit.id]) return flagTexCache[unit.id];
  const W=230,H=150, cv=document.createElement("canvas"); cv.width=W; cv.height=H;
  const c=cv.getContext("2d"); const f=FAC[unit.faction];
  const g=c.createLinearGradient(0,0,W,H);
  g.addColorStop(0,f.css); g.addColorStop(0.5,shade(f.css,1.18)); g.addColorStop(1,shade(f.css,0.7));
  c.fillStyle=g; c.fillRect(0,0,W,H);
  c.fillStyle="rgba(0,0,0,0.35)"; c.fillRect(0,0,12,H);
  const fac=FAC[unit.faction]||FAC[FACTION_IDS[0]];
  c.strokeStyle=fac.textLight; c.lineWidth=4; c.strokeRect(6,6,W-12,H-12);
  const cx=W*0.6, cy=H*0.5, R=50;
  if((fac.emblem||"circle")==="circle"){ c.fillStyle=COL.cream; c.beginPath(); c.arc(cx,cy,R,0,7); c.fill();
    c.strokeStyle=COL.ink; c.lineWidth=4; c.beginPath(); c.arc(cx,cy,R,0,7); c.stroke(); }
  else { c.fillStyle=COL.cream; c.beginPath();
    c.moveTo(cx-R,cy-R*0.8); c.lineTo(cx+R,cy-R*0.8); c.lineTo(cx+R,cy+R*0.2);
    c.quadraticCurveTo(cx+R,cy+R*0.9,cx,cy+R*1.15); c.quadraticCurveTo(cx-R,cy+R*0.9,cx-R,cy+R*0.2);
    c.closePath(); c.fill(); c.strokeStyle=COL.gold; c.lineWidth=4; c.stroke(); }
  c.save(); (crests[unit.crest]||crests.trident)(c,cx,cy,R*0.78); c.restore();
  const tex=new THREE.CanvasTexture(cv); tex.anisotropy=4; tex.needsUpdate=true;
  flagTexCache[unit.id]=tex; return tex;
}
function shade(hex,f){ const c=new THREE.Color(hex); c.multiplyScalar(f); return "#"+c.getHexString(); }
function makeSoftTex(){ const s=64, cv=document.createElement("canvas"); cv.width=cv.height=s;
  const c=cv.getContext("2d"); const g=c.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
  g.addColorStop(0,"#fff"); g.addColorStop(0.4,"rgba(255,255,255,0.6)"); g.addColorStop(1,"rgba(255,255,255,0)");
  c.fillStyle=g; c.fillRect(0,0,s,s); return new THREE.CanvasTexture(cv); }
// Archival pass over the composited imagery: a soft vignette (periphery only — centre/battle area stays
// clear) plus faint film grain, so the present-day satellite mosaic reads as aged documentary footage.
function applyArchivalGrade(ctx,w,h){
  ctx.filter="none";
  const vg=ctx.createRadialGradient(w/2,h/2,Math.min(w,h)*0.30, w/2,h/2,Math.max(w,h)*0.62);
  vg.addColorStop(0,"rgba(28,20,10,0)"); vg.addColorStop(1,`rgba(18,12,6,${CFG.GRADE.vignette})`);
  ctx.fillStyle=vg; ctx.fillRect(0,0,w,h);
  ctx.globalAlpha=CFG.GRADE.grain; const n=Math.min(18000,(w*h)/130);
  for(let i=0;i<n;i++){ ctx.fillStyle=(i&1)?"#fff":"#000"; ctx.fillRect(Math.random()*w,Math.random()*h,1,1); }
  ctx.globalAlpha=1;
}

/* ========================= UNITS / FLAGS ========================== */
const unitsGroup=new THREE.Group(); scene.add(unitsGroup);
const flagWaves=[]; const unitObjs=[];
// Unit glyphs — shared geometries built once and reused by every unit (less allocation than a token each).
// Combat units fly an oriented "formation wedge": a notched chevron whose tip points along the unit's
// advance vector (updateUnits sets token.rotation.y) and whose footprint scales with combat strength.
const WEDGE_GEO=(()=>{ const s=new THREE.Shape();
  s.moveTo(0,-1.0); s.lineTo(0.60,0.55); s.lineTo(0.22,0.30); s.lineTo(0,0.48);
  s.lineTo(-0.22,0.30); s.lineTo(-0.60,0.55); s.closePath();          // tip at -Y, notched wings at +Y
  const g=new THREE.ExtrudeGeometry(s,{depth:0.9, bevelEnabled:false}); // 0.9 = thin map-glyph slab
  g.rotateX(-Math.PI/2);                          // tip → world +Z (forward), thickness → +Y (up)
  g.scale(CFG.TOKEN_R*1.25,1,CFG.TOKEN_R*1.25);   // footprint ≈ the former cylinder token
  return g; })();
// Command posts are not maneuver formations — they wear a static diamond beacon, never a direction arrow.
const CMD_GEO=new THREE.OctahedronGeometry(CFG.TOKEN_R*0.62);
// state → formation footprint [frontage, depth] applied to the wedge so 陣型 reads per posture:
// attack=spearhead, march=narrow column, hold=broad defensive line, retreat=dispersed.
const FORM={ attack:[1,1], landing:[1.06,1.06], march:[0.62,1.18], hold:[1.5,0.55], retreat:[1.25,0.7], dead:[1,1] };
function buildUnit(u){
  const grp=new THREE.Group(); const f=FAC[u.faction]; const isCmd=u.kind==="command";
  const ring=new THREE.Mesh(new THREE.RingGeometry(CFG.RING_IN,CFG.RING_OUT,40),
    new THREE.MeshBasicMaterial({color:f.glow, transparent:true, opacity:0.5, side:THREE.DoubleSide}));
  ring.rotation.x=-Math.PI/2; ring.position.y=1.5; grp.add(ring);
  const token=new THREE.Mesh(isCmd?CMD_GEO:WEDGE_GEO,
    new THREE.MeshStandardMaterial({color:f.main, emissive:f.dim, emissiveIntensity:0.3, roughness:0.62}));
  token.position.y=isCmd?6:2.2; token.castShadow=true; grp.add(token);   // HQ beacon hovers; wedge lies just above the ground ring
  const pole=new THREE.Mesh(new THREE.CylinderGeometry(CFG.POLE_R,CFG.POLE_R,CFG.FLAG_H+CFG.TOKEN_H,6),
    new THREE.MeshStandardMaterial({color:0x2a2620, roughness:0.8}));
  pole.position.y=(CFG.FLAG_H+CFG.TOKEN_H)/2; pole.castShadow=true; grp.add(pole);   // planted to the ground (no float over the flat wedge)
  const finial=new THREE.Mesh(new THREE.SphereGeometry(CFG.FINIAL_R,8,8),
    new THREE.MeshStandardMaterial({color:f.glow, emissive:f.glow, emissiveIntensity:0.28}));
  finial.position.y=CFG.FLAG_H+CFG.TOKEN_H; grp.add(finial);
  const fg=new THREE.PlaneGeometry(CFG.FLAG_W,CFG.FLAG_TH,16,8); fg.translate(CFG.FLAG_W/2,0,0);
  const flag=new THREE.Mesh(fg, new THREE.MeshStandardMaterial({map:flagTexture(u),
    side:THREE.DoubleSide, roughness:0.7, emissive:0x222222, emissiveIntensity:0.15, transparent:true}));
  flag.position.set(CFG.POLE_R, CFG.FLAG_H+CFG.TOKEN_H-CFG.FLAG_TH*0.6, 0); grp.add(flag);
  flag.userData.base=fg.attributes.position.array.slice(); flag.userData.phase=Math.random()*9;
  flagWaves.push(flag);
  const div=document.createElement("div"); div.className="unit "+u.faction;
  div.innerHTML=`<div class="name">${u.label_zh||u.name_zh}</div>`;   // commander shown in the caption, not on-map; label_zh = optional shorter on-map label
  const lbl=new THREE.CSS2DObject(div); lbl.position.set(0, CFG.FLAG_H+CFG.LBL_UNIT, 0); grp.add(lbl);
  unitsGroup.add(grp);
  unitObjs.push({u,grp,ring,token,flag,finial,div,lbl,
    activeStart:u.track[0].d, activeEnd:u.track[u.track.length-1].d, visible:true});
}
function sampleTrack(track, day){
  if(day<=track[0].d) return {lng:track[0].lng,lat:track[0].lat,s:track[0].s,st:track[0].st};
  const last=track[track.length-1];
  if(day>=last.d) return {lng:last.lng,lat:last.lat,s:last.s,st:last.st};
  for(let i=0;i<track.length-1;i++){ const a=track[i], b=track[i+1];
    if(day>=a.d&&day<=b.d){ const t=(day-a.d)/(b.d-a.d||1);
      return {lng:lerp(a.lng,b.lng,t),lat:lerp(a.lat,b.lat,t),s:Math.round(lerp(a.s,b.s,t)),st:a.st}; } }
  return {lng:last.lng,lat:last.lat,s:last.s,st:last.st};
}
function deadDay(u){ for(const k of u.track) if(k.st==="dead") return k.d; return 999; }

/* ===================== MOVEMENT ARROWS ============================ */
const arrowsGroup=new THREE.Group(); scene.add(arrowsGroup);
const arrowObjs=[]; let softTex;
function buildArrow(a){
  const f=FAC[a.f]; const p0=vec(a.from[0],a.from[1],14), p2=vec(a.to[0],a.to[1],14);
  const mid=p0.clone().lerp(p2,0.5); mid.y+=p0.distanceTo(p2)*0.18+20;
  const curve=new THREE.QuadraticBezierCurve3(p0,mid,p2);
  const col=a.kind==="retreat"?(FAC[RETREAT_FAC]||f).glow:f.glow;
  const tube=new THREE.Mesh(new THREE.TubeGeometry(curve,40,a.kind==="landing"?2.4:1.8,8,false),
    new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:0.0}));
  const tan=curve.getTangent(1).normalize();
  const head=new THREE.Mesh(new THREE.ConeGeometry(5,12,12),
    new THREE.MeshBasicMaterial({color:col, transparent:true, opacity:0.0}));
  head.position.copy(p2); head.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),tan);
  const flows=[]; for(let i=0;i<3;i++){ const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:softTex,color:col,
    transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false}));
    sp.scale.set(9,9,9); arrowsGroup.add(sp); flows.push(sp); }
  const div=document.createElement("div"); div.className="lbl bay";
  const fc=(FAC[a.f]||f).css;
  div.innerHTML=`<div class="zh" style="font-size:11px;color:${fc}">${a.label}</div>`;
  const lbl=new THREE.CSS2DObject(div); lbl.position.copy(mid); div.style.opacity="0";
  arrowsGroup.add(tube); arrowsGroup.add(head); arrowsGroup.add(lbl);
  arrowObjs.push({a,curve,tube,head,flows,div,lbl});
}

/* ========================= EFFECTS ================================ */
function makeParticleSystem(cap, additive, pscale){
  const geo=new THREE.BufferGeometry();
  const pos=new Float32Array(cap*3), col=new Float32Array(cap*3), psize=new Float32Array(cap), alpha=new Float32Array(cap);
  geo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  geo.setAttribute("color",new THREE.BufferAttribute(col,3));
  geo.setAttribute("psize",new THREE.BufferAttribute(psize,1));
  geo.setAttribute("alpha",new THREE.BufferAttribute(alpha,1));
  const mat=new THREE.ShaderMaterial({ transparent:true, depthWrite:false,
    blending: additive?THREE.AdditiveBlending:THREE.NormalBlending,
    uniforms:{ pscale:{value:pscale} },
    vertexShader:`uniform float pscale; attribute vec3 color; attribute float psize; attribute float alpha;
      varying vec3 vC; varying float vA;
      void main(){ vC=color; vA=alpha; vec4 mv=modelViewMatrix*vec4(position,1.0);
        gl_PointSize=psize*(pscale/-mv.z); gl_Position=projectionMatrix*mv; }`,
    fragmentShader:`varying vec3 vC; varying float vA;
      void main(){ vec2 c=gl_PointCoord-0.5; float d=length(c);
        float a=smoothstep(0.5,${additive?"0.05":"0.0"},d)*vA; if(a<=0.0) discard; gl_FragColor=vec4(vC,a); }`
  });
  const pts=new THREE.Points(geo,mat); pts.frustumCulled=false; scene.add(pts);
  return { geo,pos,col,psize,alpha,cap,cursor:0, vel:new Float32Array(cap*3),
    life:new Float32Array(cap), max:new Float32Array(cap), grow:new Float32Array(cap), kind:new Int8Array(cap), pts };
}
let GLOW, SMOKE;
function emit(S,x,y,z,vx,vy,vz,size,life,r,g,b,grow,kind){
  const i=S.cursor; S.cursor=(S.cursor+1)%S.cap;
  S.pos[i*3]=x; S.pos[i*3+1]=y; S.pos[i*3+2]=z;
  S.vel[i*3]=vx; S.vel[i*3+1]=vy; S.vel[i*3+2]=vz;
  S.col[i*3]=r; S.col[i*3+1]=g; S.col[i*3+2]=b;
  S.psize[i]=size; S.life[i]=life; S.max[i]=life; S.grow[i]=grow||0; S.kind[i]=kind||0; S.alpha[i]=1;
}
function stepParticles(S,dt){
  const G=CFG.EU;
  for(let i=0;i<S.cap;i++){
    if(S.life[i]<=0){ if(S.alpha[i]!==0) S.alpha[i]=0; continue; }
    S.life[i]-=dt; const k=S.kind[i];
    if(k===1) S.vel[i*3+1]+=2*G*dt; else if(k===2) S.vel[i*3+1]+=5*G*dt; else S.vel[i*3+1]-=14*G*dt;
    S.pos[i*3]+=S.vel[i*3]*dt; S.pos[i*3+1]+=S.vel[i*3+1]*dt; S.pos[i*3+2]+=S.vel[i*3+2]*dt;
    if(S.pos[i*3+1]<1 && k!==1 && k!==2) S.life[i]=0;
    S.psize[i]+=S.grow[i]*dt;
    const lt=S.life[i]/S.max[i]; S.alpha[i]=k===1?clamp(lt*0.5,0,0.5):clamp(lt,0,1);
  }
  S.geo.attributes.position.needsUpdate=true; S.geo.attributes.color.needsUpdate=true;
  S.geo.attributes.psize.needsUpdate=true; S.geo.attributes.alpha.needsUpdate=true;
}
const flashes=[];
function buildFlashes(){ for(let i=0;i<7;i++){ const L=new THREE.PointLight(0xffaa55,0,240,2); L.visible=false; scene.add(L); flashes.push({L,life:0}); } }
function flash(x,y,z,color,intensity){ for(const fl of flashes){ if(fl.life<=0){ fl.L.color.setHex(color);
  fl.L.position.set(x,y,z); fl.L.intensity=intensity*CFG.FLASH_K; fl.L.visible=true; fl.life=0.14; return; } } }
const hotTimers={}; const rnd=(a,b)=>a+Math.random()*(b-a);
function updateEffects(day, dt){
  const G=CFG.EU;
  const fxDen=CFG.FX_DENSITY!=null?CFG.FX_DENSITY:1;
  const fxT=t=>t/fxDen, fxP=p=>p*fxDen, fxOk=()=>Math.random()<fxDen;
  for(let h=0;h<D.hotspots.length;h++){
    const hs=D.hotspots[h]; if(day<hs.a||day>hs.b) continue;
    const w=vec(hs.lng,hs.lat,0); const gx=w.x, gz=w.z, gy=w.y;
    hotTimers[h]=(hotTimers[h]||0)-dt; const fire=hotTimers[h]<=0;
    if(hs.kind==="firefight"){
      if(Math.random()<fxP(hs.i*0.9)){ const c=Math.random()<0.5?[1,0.8,0.3]:[1,0.5,0.2];
        emit(GLOW,gx+rnd(-3,3)*G,gy+rnd(0.5,3)*G,gz+rnd(-3,3)*G,rnd(-6,6)*G,rnd(4,12)*G,rnd(-6,6)*G,rnd(8,16),rnd(0.3,0.6),c[0],c[1],c[2],0,0); }
      if(fire){ flash(gx,gy+2*G,gz,0xffcc66,rnd(120,260)); emit(SMOKE,gx,gy+G,gz,rnd(-1,1)*G,2*G,rnd(-1,1)*G,16,rnd(1.2,2),0.22,0.21,0.2,12,1); hotTimers[h]=fxT(rnd(0.12,0.28)/hs.i); }
    } else if(hs.kind==="artillery"){
      if(fire){ flash(gx,gy+3*G,gz,0xffd27a,rnd(220,360));
        for(let s=0;s<8;s++){ if(!fxOk()) continue;
          emit(GLOW,gx,gy+2.5*G,gz,rnd(-10,10)*G,rnd(6,16)*G,rnd(-10,10)*G,rnd(10,18),0.4,1,0.75,0.35,0,0); }
        emit(SMOKE,gx,gy+2*G,gz,rnd(-1,1)*G,2.5*G,rnd(-1,1)*G,22,2.2,0.26,0.25,0.23,16,1);
        for(let t=0;t<6;t++){ if(!fxOk()) continue;
          emit(GLOW,gx+rnd(-2,2)*G,gy+(5+t*4)*G,gz+(10+t*7)*G,rnd(-2,2)*G,3*G,18*G,9,0.5,1,0.9,0.5,0,0); }
        hotTimers[h]=fxT(rnd(0.4,0.9)/hs.i); }
    } else if(hs.kind==="explosion"){
      if(fire){ flash(gx,gy+2*G,gz,0xffaa44,rnd(300,520));
        for(let s=0;s<14;s++){ if(!fxOk()) continue; const a=Math.random()*7,sp=rnd(6,20)*G;
          emit(GLOW,gx,gy+1.5*G,gz,Math.cos(a)*sp,rnd(8,20)*G,Math.sin(a)*sp,rnd(10,22),rnd(0.3,0.6),1,0.6,0.2,0,3); }
        emit(SMOKE,gx,gy+2*G,gz,rnd(-2,2)*G,3*G,rnd(-2,2)*G,30,2.4,0.2,0.19,0.18,20,1);
        hotTimers[h]=fxT(rnd(0.7,1.6)/hs.i); }
    } else if(hs.kind==="landing"){
      if(Math.random()<fxP(0.7)) emit(GLOW,gx+rnd(-6,6)*G,gy+rnd(0,2)*G,gz+rnd(-4,4)*G,rnd(-4,4)*G,rnd(6,12)*G,rnd(-4,4)*G,rnd(8,14),0.4,0.7,0.85,1,0);
      if(fire){ flash(gx,gy+1.5*G,gz,0xfff0c0,rnd(120,220));
        for(let s=0;s<6;s++){ if(!fxOk()) continue;
          emit(GLOW,gx+rnd(-8,8)*G,gy+0.5*G,gz+rnd(-6,6)*G,rnd(-3,3)*G,rnd(3,7)*G,rnd(-3,3)*G,11,0.4,0.6,0.8,1,0,0); }
        hotTimers[h]=fxT(rnd(0.3,0.6)); }
    } else if(hs.kind==="oilfire"){
      for(let s=0;s<3;s++){ if(!fxOk()) continue;
        emit(GLOW,gx+rnd(-4,4)*G,gy+rnd(0,4)*G,gz+rnd(-4,4)*G,rnd(-2,2)*G,rnd(8,16)*G,rnd(-2,2)*G,rnd(18,30),rnd(0.4,0.8),1,rnd(0.35,0.6),0.12,-12,2); }
      if(fire){ for(let s=0;s<2;s++){ if(!fxOk()) continue;
          emit(SMOKE,gx+rnd(-2,2)*G,gy+3*G,gz+rnd(-2,2)*G,rnd(0,2)*G,rnd(4,7)*G,rnd(-1,1)*G,rnd(22,34),rnd(2,3),0.15,0.14,0.13,16,1); }
        flash(gx,gy+3*G,gz,0xff7733,rnd(120,200)*hs.i); hotTimers[h]=fxT(rnd(0.2,0.34)); }
    } else if(hs.kind==="air"){
      if(fire){ flash(gx,gy+2*G,gz,0xffcc66,300);
        for(let s=0;s<10;s++){ if(!fxOk()) continue; const a=Math.random()*7,sp=rnd(8,16)*G;
          emit(GLOW,gx,gy+1.5*G,gz,Math.cos(a)*sp,rnd(6,14)*G,Math.sin(a)*sp,rnd(10,18),0.5,1,0.7,0.3,0,3); }
        emit(SMOKE,gx,gy+2*G,gz,0,2.5*G,0,26,2.4,0.2,0.19,0.18,18,1);
        for(let t=0;t<6;t++){ if(!fxOk()) continue;
          emit(GLOW,gx+(rnd(-3,3)+(6-t)*4)*G,gy+(30-t*4)*G,gz+(-30+t*4)*G,rnd(-2,2)*G,-6*G,6*G,8,0.4,1,0.9,0.4,0,0); }
        hotTimers[h]=fxT(rnd(0.8,1.6)); }
    } else if(hs.kind==="nuclear"){
      if(fire){ flash(gx,gy+4*G,gz,0xfff4e0,rnd(520,900));
        for(let s=0;s<24;s++){ if(!fxOk()) continue; const a=Math.random()*7,sp=rnd(10,32)*G;
          emit(GLOW,gx,gy+2*G,gz,Math.cos(a)*sp,rnd(16,40)*G,Math.sin(a)*sp,rnd(18,36),rnd(0.4,0.8),1,0.85,0.45,0,4); }
        emit(SMOKE,gx,gy+4*G,gz,rnd(-3,3)*G,5*G,rnd(-3,3)*G,42,3.2,0.18,0.17,0.16,24,1);
        for(let t=0;t<8;t++){ if(!fxOk()) continue;
          emit(GLOW,gx,gy+(8+t*6)*G,gz,rnd(-4,4)*G,8*G,rnd(-4,4)*G,rnd(28,40),0.6,1,0.7,0.35,-8,2); }
        hotTimers[h]=fxT(rnd(1.2,2.4)/hs.i); }
    } else if(hs.kind==="naval"){
      if(fire){ flash(gx,gy+1.5*G,gz,0xaaccff,rnd(180,320));
        for(let s=0;s<6;s++){ if(!fxOk()) continue;
          emit(GLOW,gx+rnd(-5,5)*G,gy+rnd(0,2)*G,gz+rnd(-5,5)*G,rnd(-6,6)*G,rnd(4,10)*G,rnd(-6,6)*G,rnd(12,20),0.45,0.5,0.75,1,0,0); }
        emit(SMOKE,gx,gy+2*G,gz,rnd(-2,2)*G,3*G,rnd(-2,2)*G,24,2,0.2,0.22,0.25,14,1);
        hotTimers[h]=fxT(rnd(0.5,1.1)/hs.i); }
    }
  }
  // per-scene asset effects (air/navy/nuclear badges on storyboard shots)
  if(Director.sceneFx && Director.sceneFx.length && Director.mode==="play" && Director.capShown){
    for(const sfx of Director.sceneFx){
      sfx._t=(sfx._t||0)-dt; if(sfx._t>0) continue; sfx._t=fxT(rnd(0.35,0.9));
      const w=vec(sfx.lng,sfx.lat,0), gx=w.x, gz=w.z, gy=w.y;
      if(sfx.kind==="air"||sfx.kind==="nuclear"){
        for(let t=0;t<3;t++){ if(!fxOk()) continue;
          emit(GLOW,gx+(rnd(-2,2)+t*5)*G,gy+(20+t*8)*G,gz+(rnd(-2,2)-t*4)*G,rnd(-3,3)*G,-4*G,4*G,7,0.35,1,0.85,0.4,0,0); }
      }
      if(sfx.kind==="navy"||sfx.kind==="naval"){
        flash(gx,gy+G,gz,0x88bbff,rnd(80,160)); emit(SMOKE,gx,gy+G,gz,rnd(-1,1)*G,2*G,rnd(-1,1)*G,14,1.4,0.22,0.24,0.28,10,1);
      }
      if(sfx.kind==="nuclear"){
        flash(gx,gy+3*G,gz,0xfff0cc,rnd(400,700));
        for(let s=0;s<8;s++){ if(!fxOk()) continue; const a=Math.random()*7,sp=rnd(8,22)*G;
          emit(GLOW,gx,gy+2*G,gz,Math.cos(a)*sp,rnd(12,28)*G,Math.sin(a)*sp,rnd(16,28),0.5,1,0.8,0.4,0,3); }
      }
    }
  }
  stepParticles(GLOW,dt); stepParticles(SMOKE,dt);
  flashes.forEach(fl=>{ if(fl.life>0){ fl.life-=dt; fl.L.intensity=Math.max(0,fl.L.intensity-dt*fl.L.intensity*6.5); if(fl.life<=0){ fl.life=0; fl.L.visible=false; } }});
}

/* ========================= WEATHER ================================ */
const RAIN_N=1500; let rain, rainPos, rainMat;
function buildRain(){
  const g=new THREE.BufferGeometry(); rainPos=new Float32Array(RAIN_N*6);
  for(let i=0;i<RAIN_N;i++) resetRain(i,true);
  g.setAttribute("position",new THREE.BufferAttribute(rainPos,3));
  rainMat=new THREE.LineBasicMaterial({color:0xaebfce, transparent:true, opacity:0});
  rain=new THREE.LineSegments(g,rainMat); rain.frustumCulled=false; scene.add(rain);
}
function resetRain(i,init){ const cx=controls?controls.target.x:0, cz=controls?controls.target.z:0;
  const x=cx+rnd(-700,700), z=cz+rnd(-700,700), y=init?rnd(0,700):rnd(500,760);
  rainPos[i*6]=x; rainPos[i*6+1]=y; rainPos[i*6+2]=z; rainPos[i*6+3]=x+6; rainPos[i*6+4]=y-34; rainPos[i*6+5]=z; }
function curWeather(day){ const W=D.weather; if(day<=W[0].d) return W[0]; const last=W[W.length-1]; if(day>=last.d) return last;
  for(let i=0;i<W.length-1;i++){ const a=W[i],b=W[i+1]; if(day>=a.d&&day<=b.d){ const t=(day-a.d)/(b.d-a.d||1);
    return { night:lerp(a.night,b.night,t), fog:lerp(a.fog,b.fog,t), rain:lerp(a.rain,b.rain,t),
             smoke:lerp(a.smoke,b.smoke,t), zh:t<0.5?a.zh:b.zh, en:t<0.5?a.en:b.en }; } } return last; }
const cDay=new THREE.Color(0x6f9fd0), cDayB=new THREE.Color(0xcad9e2), cNight=new THREE.Color(0x10182c),
      cNightB=new THREE.Color(0x243349), cOver=new THREE.Color(0x5a6470), cOverB=new THREE.Color(0x808a92), cSmoke=new THREE.Color(0x4a3f3a);
const _t=new THREE.Color(), _b=new THREE.Color();
function applyWeather(day){
  const w=curWeather(day), outro=Director.mode==="outro";
  const night=outro?0:w.night, fogAmt=outro?w.fog*0.25:w.fog, smokeAmt=outro?w.smoke*0.2:w.smoke;
  const overcast=clamp(Math.max(w.rain,smokeAmt*0.6),0,1);
  _t.copy(cDay).lerp(cOver,overcast).lerp(cNight,night);
  _b.copy(cDayB).lerp(cOverB,overcast).lerp(cNightB,night).lerp(cSmoke,smokeAmt*0.4);
  skyMat.uniforms.top.value.copy(_t); skyMat.uniforms.bot.value.copy(_b);
  scene.fog.color.copy(_b); scene.fog.density=0.00012 + fogAmt*0.00055 + smokeAmt*0.00022;
  sun.intensity=lerp(1.2,0.1,night)*(1-0.55*overcast)*(outro?1.08:1);
  sun.color.setHex(night>0.5?0x8ea6cf:0xfff1d6);
  hemi.intensity=lerp(0.5,0.22,night)*(1-0.3*overcast)*(outro?1.1:1);
  amb.intensity=lerp(0.45,0.36,night)*(outro?1.15:1); amb.color.setHex(night>0.5?0x1c2a44:0x404a55);
  renderer.toneMappingExposure=lerp(1.08,0.78,night)*(outro?1.12:1);
  if(seaMesh) seaMesh.material.color.copy(new THREE.Color(0x14323f)).lerp(cNight,w.night*0.8);
  if(rainMat){ rainMat.opacity=clamp(w.rain*0.6,0,0.6); rain.visible=w.rain>0.02; }
  return w;
}
function stepRain(dt,w){ if(!rain||!rain.visible) return; const fall=720*dt*(0.6+w.rain);
  for(let i=0;i<RAIN_N;i++){ rainPos[i*6+1]-=fall; rainPos[i*6+4]-=fall; if(rainPos[i*6+1]<0) resetRain(i,false); }
  rain.geometry.attributes.position.needsUpdate=true; }

/* ====================== CLOCK & FOCUS STATE ====================== */
const Clock={ day:CFG.DAY_MIN };
function setDay(d){ Clock.day=clamp(d,CFG.DAY_MIN,CFG.DAY_MAX); }
let focusSet=new Set();                 // unit ids emphasised by the current shot
const lookTarget=new THREE.Vector3();   // where the camera looks (drives place-label focus)
const unitById={};                      // id → unit render-object (filled at init)

/* ===================== per-frame world update ===================== */
let now=0;
function updateUnits(day){
  const DIM=CFG.FOCUS.UNIT_DIM;
  unitObjs.forEach(o=>{
    const u=o.u, vis=day>=o.activeStart-0.4 && day<=o.activeEnd+1.4;
    o.grp.visible=vis; o.visible=vis; if(!vis){ o.lbl.visible=false; o.div.style.opacity=0; return; }   // inactive units: hide the CSS2D label too (grp.visible=false alone does NOT hide it → it leaks at the map origin)
    const s=sampleTrack(u.track,day);
    const dead=s.st==="dead" && day>=(deadDay(u)-0.01);
    const w=vec(s.lng,s.lat,0); o.grp.position.copy(w);
    const ah=sampleTrack(u.track,Math.min(day+0.4,o.activeEnd)); const pa=project(ah.lng,ah.lat);
    const dx=pa.X-w.x, dz=pa.Z-w.z; if(dx*dx+dz*dz>1) o.token.rotation.y=Math.atan2(dx,dz);
    if(u.cf){ const sc=0.6+clamp(s.s/2200,0,1.6); const fm=FORM[s.st]||FORM.attack; o.token.scale.set(sc*fm[0],1,sc*fm[1]); }
    const f=FAC[u.faction], focused=focusSet.has(u.id);
    // every on-stage unit flies its kamon flag (the signature feature); focus only emphasises.
    o.flag.visible=true; o.flag.material.opacity=focused?1:0.5; o.finial.visible=focused;
    o.lbl.visible=focused; o.div.style.opacity=focused?(dead?0.65:1):0;   // text labels stay focus-only (no clutter)
    if(dead){ o.token.material.color.setHex(0x55585c); o.token.material.emissiveIntensity=focused?0.06:0.0;
      o.ring.material.opacity=focused?0.4:DIM; o.flag.rotation.z=-0.5; o.flag.position.y=(CFG.FLAG_H+CFG.TOKEN_H)*0.55; }
    else { o.token.material.color.setHex(f.main); o.flag.rotation.z=0; o.flag.position.y=CFG.FLAG_H+CFG.TOKEN_H-CFG.FLAG_TH*0.6;
      const att=s.st==="attack"||s.st==="landing";
      o.token.material.emissiveIntensity = focused?(att?0.38+0.2*Math.sin(now*6):0.26):DIM;
      o.ring.material.opacity = focused?(att?0.5+0.18*Math.sin(now*5):0.4):DIM;
      o.ring.material.color.setHex(s.st==="retreat"?0x888888:f.glow); }
  });
}
function updateArrows(day){
  arrowObjs.forEach(o=>{ const a=o.a, op=a.kind==="march"?0.6:0.85;
    const vis=day>=a.d-0.6&&day<=a.d+1.1;
    let alpha=vis?(smooth(a.d-0.6,a.d,day)*(1-smooth(a.d+0.6,a.d+1.1,day))):0; alpha*=op;
    o.tube.material.opacity=alpha; o.head.material.opacity=alpha;
    o.tube.visible=o.head.visible=alpha>0.01; o.div.style.opacity=alpha*1.1;
    o.flows.forEach((sp,i)=>{ if(alpha<=0.01){ sp.material.opacity=0; return; }
      const t=((now*0.4+i/3)%1); sp.position.copy(o.curve.getPoint(t));
      sp.material.opacity=alpha*(0.6+0.4*Math.sin(t*Math.PI)); }); });
}
function updateFlags(){ for(const flag of flagWaves){ const pos=flag.geometry.attributes.position, base=flag.userData.base, ph=flag.userData.phase;
  for(let i=0;i<pos.count;i++){ const bx=base[i*3], by=base[i*3+1], k=bx/CFG.FLAG_W;
    pos.setZ(i, Math.sin(bx*0.25+now*5+ph)*CFG.FLAG_TH*0.12*k + Math.sin(by*0.3+now*3)*CFG.FLAG_TH*0.04*k); }
  pos.needsUpdate=true; } }
function updateLabels(){ const NE=CFG.FOCUS.PLACE_NEAR, FA=CFG.FOCUS.PLACE_FAR, K=CFG.FOCUS.MAX_PLACES;
  // rank by distance to where the camera looks; show only the nearest few
  const ranked=placeLabels.map(l=>({l,d:lookTarget.distanceTo(l.o.position)})).sort((a,b)=>a.d-b.d);
  ranked.forEach((e,idx)=>{ const op=(idx<K && e.d<FA)? clamp((FA-e.d)/(FA-NE),0.18,1) : 0;
    e.l.div.style.display = op>0.02?"":"none"; e.l.div.style.opacity=op; }); }

/* ===================== CAMERA & DIRECTOR ========================= */
const TITLE_DUR=4.5;
// closing shot: a slow majestic pull-back/orbit over the whole fallen colony (harbour + island + Kowloon)
const OUTRO_CAM = Object.assign({ tween: 3.6, orbit: 0.35 },
  (D.outro && D.outro.cam) || META.outroCam || { lng: 10, lat: 50, dist: 3000, az: 0, el: 48, orbit: 0.35 });
const WAR_START = META.startDate ? new Date(META.startDate[0], META.startDate[1]-1, META.startDate[2]) : new Date(1914,5,28);
function dayToLabel(d){
  if(META.useYearOnly) return String(META.startYear + Math.floor((d-1)/365));
  const t=new Date(WAR_START); t.setDate(t.getDate()+Math.floor(d)-1);
  return t.getFullYear()+"."+String(t.getMonth()+1).padStart(2,"0")+"."+String(t.getDate()).padStart(2,"0");
}
const _off=new THREE.Vector3();
function spherical(target,dist,azDeg,elDeg){ const a=azDeg*deg, e=elDeg*deg;
  _off.set(Math.sin(a)*Math.cos(e),Math.sin(e),Math.cos(a)*Math.cos(e)).multiplyScalar(dist);
  return target.clone().add(_off); }
function camFromShot(c){ const target=vec(c.lng,c.lat,8); return { target, pos:spherical(target,c.dist*CFG.ZOOM,c.az,c.el) }; }
// aim at the centroid of the shot's focus units so the action is centred & close
function shotTarget(sh){ let x=0,y=0,z=0,n=0;
  (sh.focus||[]).forEach(id=>{ const o=unitById[id]; if(!o) return; const s=sampleTrack(o.u.track,sh.day);
    const v=vec(s.lng,s.lat,0); x+=v.x; y+=v.y; z+=v.z; n++; });
  return n ? new THREE.Vector3(x/n, y/n+8, z/n) : vec(sh.cam.lng,sh.cam.lat,8); }

/* ---- captions (lower-third) ---- */
const $=id=>document.getElementById(id);
function showCap(){ $("caption").classList.add("show"); }
function hideCap(){ $("caption").classList.remove("show"); }
let narrLang="both";              // caption narration language: "both" | "zh" | "en"
let lastNarr={zh:"",en:""};       // remembered so the toggle can re-render the current caption
function setNarr(zh,en){ lastNarr={zh:zh||"",en:en||""};
  $("cap-narr").innerHTML = narrLang==="zh" ? `<span class="nz">${lastNarr.zh}</span>`
    : narrLang==="en" ? `<span class="ne">${lastNarr.en||lastNarr.zh}</span>`
    : `<span class="nz">${lastNarr.zh}</span>`+(lastNarr.en?`<span class="ne">${lastNarr.en}</span>`:""); }
function cycleNarrLang(){ narrLang = narrLang==="both"?"zh":narrLang==="zh"?"en":"both";
  const b=$("lang-btn"); if(b) b.textContent = narrLang==="both"?"中／EN":narrLang==="zh"?"中文":"EN";
  setNarr(lastNarr.zh,lastNarr.en); }
function card(zh,en,narrZh,narrEn){ $("cap-date").textContent=""; $("cap-title").innerHTML=zh+`<span class="en">${en}</span>`;
  setNarr(narrZh,narrEn); $("cap-meta").innerHTML=""; showCap(); }
function sideStrength(sh,side){ let s=0; (sh.focus||[]).forEach(id=>{ const o=unitById[id];
  if(o&&o.u.cf&&o.u.faction===side) s+=sampleTrack(o.u.track,Clock.day).s; }); return s; }
const ASSET_LABELS={ air:{zh:"✈ 空軍",en:"Air"}, navy:{zh:"🚢 海軍",en:"Navy"}, naval:{zh:"🚢 海軍",en:"Navy"},
  nuclear:{zh:"☢ 核武",en:"Nuclear"}, artillery:{zh:"💥 炮擊",en:"Artillery"}, landing:{zh:"⛵ 兩棲",en:"Amphibious"},
  explosion:{zh:"💥 潰壩／爆炸",en:"Explosion"} };
function assetsFromShot(sh){
  const list=sh.assets||[];
  if(!list.length) return "";
  return `<div class="assets">`+list.map(a=>{ const L=ASSET_LABELS[a]||{zh:a,en:a};
    return `<span class="asset">${L.zh}${L.en?" · "+L.en:""}</span>`; }).join("")+`</div>`; }
function sceneFxFromShot(sh){
  const fx=[]; const kinds=new Set(sh.assets||[]);
  (sh.effects||[]).forEach(e=>fx.push(e));
  if(!kinds.size && !fx.length) return [];
  let lng=sh.cam.lng, lat=sh.cam.lat;
  if(sh.focus&&sh.focus.length){ const o=unitById[sh.focus[0]];
    if(o){ const s=sampleTrack(o.u.track,sh.day); lng=s.lng; lat=s.lat; } }
  kinds.forEach(k=>{ if(k==="artillery"||k==="landing") return;
    const kind=k==="navy"?"naval":k; fx.push({ kind, lng, lat }); });
  return fx;
}
function setCaption(sh){
  $("cap-date").textContent=sh.dateLabel;
  $("cap-title").innerHTML=sh.title_zh+`<span class="en">${sh.title_en}</span>`;
  setNarr(sh.narration_zh,sh.narration_en);
  let meta=(sh.commanders||[]).map(c=>`<span class="cmd">${c.zh}${c.en?(" · "+c.en):""}</span>`).join("");
  (sh.side==="both"?FACTION_IDS:[sh.side]).forEach(sd=>{ const v=sideStrength(sh,sd); if(!v) return;
    const fac=D.factions[sd]||{}, maxS=fac.maxStrength||150000;
    const pct=clamp(v/maxS*100,6,100), nm=fac.label_zh||sd;
    meta+=`<span class="str ${sd}">${nm} ${v.toLocaleString()}人<span class="bar"><i style="width:${pct}%"></i></span></span>`; });
  if(sh.forces_zh||sh.forces_en){
    const ft=sh.forces_zh+(sh.forces_en?`<span class="ne">${sh.forces_en}</span>`:"");
    meta+=`<div class="forces">${ft}</div>`; }
  meta+=assetsFromShot(sh);
  $("cap-meta").innerHTML=meta; showCap();
  Director.sceneFx=sceneFxFromShot(sh);
}

/* ---- the Director: plays the storyboard like a TV programme ---- */
let playSpeed=1;
const Director = {
  shots:D.storyboard, i:-1, t:0, mode:"title", playing:true, userFree:false, capShown:false, sceneFx:[],
  fromPos:new THREE.Vector3(), fromTgt:new THREE.Vector3(), tgt:new THREE.Vector3(), fromDay:8, toDay:8,
  outroHold:null, outroAz:0, outroEl:46,
  start(){ this.mode="title"; this.t=0; this.playing=true; this.userFree=false; this.sceneFx=[]; this.outroHold=null; hideNextBattle(); setDay(this.shots[0].day);
    const ic=META.introCam||this.shots[0].cam;
    const c=camFromShot(ic); camera.position.copy(c.pos); controls.target.copy(c.target);
    lookTarget.copy(controls.target);
    const tc=META.titleCard||{};
    card(tc.zh||META.title_zh, tc.en||META.title_en, tc.narr_zh||"", tc.narr_en||""); },
  enterShot(i){ this.i=i; this.t=0; this.capShown=false; const sh=this.shots[i];
    this.fromDay=Clock.day; this.toDay=sh.day;   // ease the day across the move → smooth day/night + weather
    focusSet=new Set(sh.focus||[]); this.tgt.copy(shotTarget(sh));
    this.fromPos.copy(camera.position); this.fromTgt.copy(controls.target); hideCap(); },
  pauseForUser(){ if(this.mode==="title"||this.userFree) return; this.userFree=true; $("resume").classList.add("show"); },
  resume(){ if(!this.userFree) return; this.userFree=false; $("resume").classList.remove("show");
    if(this.mode==="play"){ this.fromPos.copy(camera.position); this.fromTgt.copy(controls.target); this.t=0; this.capShown=false; hideCap(); }
    this.playing=true; updatePlayBtn(); },
  togglePlay(){ if(this.mode==="outro"){ this.start(); updatePlayBtn(); return; }
    this.playing=!this.playing; updatePlayBtn(); },
  goToShot(i){ i=clamp(i,0,this.shots.length-1);     // jump to a chapter from the timeline axis
    this.userFree=false; $("resume").classList.remove("show"); this.mode="play"; this.playing=true;
    this.enterShot(i); updatePlayBtn(); },
  update(dt){
    if(this.userFree){ lookTarget.copy(controls.target); return; }   // free-look: OrbitControls owns the camera
    if(!this.playing) return;
    this.t+=dt;
    if(this.mode==="title"){ if(this.t>=TITLE_DUR){ hideCap(); this.enterShot(0); this.mode="play"; } return; }
    if(this.mode==="outro"){
      // stay on the battlefield — gentle orbit only, no pull-back into black fog/sea
      const hold=this.outroHold;
      if(hold){
        controls.target.copy(hold.tgt);
        const az=hold.az+OUTRO_CAM.orbit*this.t, el=hold.el;
        camera.position.copy(spherical(hold.tgt,hold.dist,az,el));
      }
      lookTarget.copy(controls.target); updateProgress(); return; }
    const sh=this.shots[this.i], dur=CFG.TWEEN+sh.hold, dist=sh.cam.dist*CFG.ZOOM;
    if(this.t<CFG.TWEEN){ const e=easeIO(this.t/CFG.TWEEN);
      setDay(lerp(this.fromDay,this.toDay,e));   // day/night + weather glide as the camera moves
      camera.position.lerpVectors(this.fromPos,spherical(this.tgt,dist,sh.cam.az,sh.cam.el),e);
      controls.target.lerpVectors(this.fromTgt,this.tgt,e); }
    else { const ot=this.t-CFG.TWEEN; setDay(this.toDay);
      controls.target.copy(this.tgt); camera.position.copy(spherical(this.tgt,dist,sh.cam.az+sh.cam.orbit*ot,sh.cam.el));
      if(!this.capShown){ setCaption(sh); this.capShown=true; } }
    lookTarget.copy(controls.target);
    if(this.t>=dur){
      if(this.i+1<this.shots.length) this.enterShot(this.i+1);
      else { this.mode="outro"; this.t=0; this.sceneFx=[];
        const tgt=controls.target.clone(), off=camera.position.clone().sub(tgt);
        const dist=off.length()||sh.cam.dist*CFG.ZOOM;
        const az=Math.atan2(off.x,off.z)/deg, el=Math.asin(clamp(off.y/dist,-1,1))/deg;
        this.outroHold={ tgt, dist, az, el };
        card(D.outro.title_zh,D.outro.title_en,D.outro.narration_zh,D.outro.narration_en); showNextBattle(); updatePlayBtn(); } }
    updateProgress();
  }
};

/* ===================== MINIMAL UI (no control panel) ============= */
function updatePlayBtn(){ $("play").textContent = Director.mode==="outro" ? "↻" : (Director.playing?"⏸":"▶"); }
function updateProgress(){ const N=Director.shots.length; let f=0;
  if(Director.mode==="play"){ const sh=Director.shots[Director.i]; f=(Director.i+clamp(Director.t/(CFG.TWEEN+sh.hold),0,1))/N; }
  else if(Director.mode==="outro") f=1;
  $("prog").firstChild.style.width=(f*100)+"%";
  $("scene-label").textContent = Director.mode==="outro" ? "完 · END"
    : (Director.mode==="play" ? dayToLabel(Clock.day) : ""); }
function hideNextBattle(){ const nb=$("next-battle"); if(nb) nb.classList.remove("show"); }
function showNextBattle(){
  const nb=$("next-battle"); if(!nb) return;
  const n=META.nextBattle;
  if(!n || !n.href){ hideNextBattle(); return; }
  nb.href=n.href;
  nb.innerHTML=`下一場：${n.title_zh||""}<span style="display:block;font-family:var(--mono);font-size:10px;font-weight:400;margin-top:2px;opacity:.85">${n.title_en||""} →</span>`;
  nb.classList.add("show");
}
const ANALYSIS_SECTIONS=[
  { key:"military", zh:"軍事分析", en:"Military", sub:"戰術部署、攻防過程與勝負關鍵" },
  { key:"leaders", zh:"領袖人物", en:"Leaders", sub:"決策者、將領及其在戰役中的角色" },
  { key:"nationalPower", zh:"國力對比", en:"National Power", sub:"工業、人口、資源與後勤實力" },
  { key:"impact", zh:"後續影響", en:"Impact", sub:"對本戰役結果及日後勢力格局的影響" },
];
function wireAnalysisPanel(){
  const a=D.analysis||{}, dock=$("analysis-dock"), panes=$("analysis-panes"), btn=$("analysis-btn");
  if(!dock||!panes) return;
  const active=new Set(["military","leaders"]);
  function render(){
    const html=ANALYSIS_SECTIONS.filter(s=>active.has(s.key)&&a[s.key])
      .map(s=>`<section class="apane" data-k="${s.key}"><h4>${s.zh} · ${s.en}</h4><div class="sub" style="font-family:var(--mono);font-size:9px;color:var(--accent);opacity:.85;margin-bottom:5px">${s.sub}</div><p>${a[s.key]}</p></section>`).join("");
    panes.innerHTML=html||`<p class="ap-empty">點選上方標籤開啟各項分析<br><span style="opacity:.7">Toggle tabs above</span></p>`;
    dock.querySelectorAll(".ad-tab").forEach(t=>{
      const k=t.dataset.k;
      t.classList.toggle("on",active.has(k));
      t.disabled=!a[k];
    });
  }
  dock.querySelectorAll(".ad-tab").forEach(t=>{
    t.onclick=()=>{ const k=t.dataset.k; if(!a[k]) return;
      if(active.has(k)) active.delete(k); else active.add(k); render(); };
  });
  const close=$("analysis-close");
  if(btn) btn.onclick=()=>{ dock.classList.toggle("open"); if(dock.classList.contains("open")) render(); };
  if(close) close.onclick=()=>dock.classList.remove("open");
  render();
}
let kickMusic=()=>{};
function wireUI(){
  const n=D.notes, a=D.analysis||{};
  let body=`<p>${n.summary}</p>`;
  if(a.military||a.leaders||a.nationalPower||a.impact){
    body+=`<h5>戰役分析 · BATTLE ANALYSIS</h5><p style="font-size:11px;margin-bottom:8px">請按左上角 <b>📊 戰役分析</b> 按鈕，以開關各項分析面板。</p>`;
  }
  body+=`<h5>考據與呈現說明 · Caveats</h5><ul>`+
    n.caveats.map(c=>`<li>${c}</li>`).join("")+`</ul><h5>主要來源 · Sources</h5><p>${n.sources}</p>`;
  $("notes-body").innerHTML=body;
  wireAnalysisPanel();
  const np=$("notes");
  $("notes-btn").onclick=()=>np.classList.toggle("open");
  $("notes-close").onclick=()=>np.classList.remove("open");
  $("lang-btn").onclick=cycleNarrLang;
  const bgm=$("bgm"), musicBtn=$("music-btn");
  let syncMusic=()=>{};
  if(bgm && musicBtn){
    bgm.volume=0.55; bgm.muted=true;
    let soundOn=false;
    const paintMusic=()=>{ musicBtn.textContent=soundOn?"🔊":"🔇"; musicBtn.classList.toggle("off",!soundOn); };
    syncMusic=()=>{ if(Director.playing){ bgm.play().catch(()=>{}); } else { bgm.pause(); } };
    paintMusic();
    musicBtn.onclick=()=>{ soundOn=!soundOn; bgm.muted=!soundOn; syncMusic(); paintMusic(); };
    kickMusic=syncMusic;
  } else if(musicBtn) musicBtn.style.display="none";
  $("play").onclick=()=>{ Director.togglePlay(); syncMusic(); };
  $("resume").onclick=()=>{ Director.resume(); syncMusic(); };
  document.querySelectorAll("#speed-btns .spd").forEach(btn=>{
    btn.onclick=()=>{ playSpeed=+btn.dataset.spd||1;
      document.querySelectorAll("#speed-btns .spd").forEach(b=>b.classList.toggle("active",b===btn)); };
  });
  const beats=$("prog-beats"), N=D.storyboard.length;
  D.storyboard.forEach((sh,i)=>{ const b=document.createElement("b"); b.style.left=((i+0.5)/N*100)+"%";
    b.title=sh.dateLabel+" · "+sh.title_zh; beats.appendChild(b); });   // hover a tick to read the chapter
  $("prog").addEventListener("click",e=>{ const r=$("prog").getBoundingClientRect();   // click the time axis to jump to a chapter
    const frac=clamp((e.clientX-r.left)/r.width,0,1); Director.goToShot(Math.round(frac*N-0.5)); });
  controls.addEventListener("start",()=>Director.pauseForUser());   // a user drag pauses the tour
  // auto-hide transport + hint on inactivity
  let idle; const ui=[$("controls"),$("hint")];
  const wake=()=>{ ui.forEach(e=>e.classList.remove("hide")); clearTimeout(idle);
    idle=setTimeout(()=>ui.forEach(e=>e.classList.add("hide")),3500); };
  ["pointermove","pointerdown","keydown","wheel"].forEach(ev=>addEventListener(ev,wake)); wake();
}

/* ===================== ANIMATION LOOP ============================= */
let last=performance.now();
// screen-space label de-collision: after CSS2DRenderer positions the labels,
// push any overlapping ones downward (units have priority, place names yield).
function decollide(){
  const items=[];
  for(const o of unitObjs) if(o.visible && o.lbl.visible && (+o.div.style.opacity||0)>0.05) items.push(o.div);
  for(const o of arrowObjs) if((+o.div.style.opacity||0)>0.05) items.push(o.div);
  staticLines.forEach(({ label }) => {
    if (label.o.visible && (+label.div.style.opacity || 0) > 0.05) items.push(label.div);
  });
  if(frontLabel && frontLabel.o.visible) items.push(frontLabel.div);
  for(const l of placeLabels) if(l.div.style.display!=="none" && (+l.div.style.opacity||0)>0.05) items.push(l.div);
  if(items.length<1) return;
  const R=items.map(el=>el.getBoundingClientRect());   // batched reads (one reflow)
  const placed=[];
  // fixed HUD panels are immovable obstacles — a map label must never hide under them
  for(const hudId of ["hud-tl","key","compass"]){ const el=document.getElementById(hudId);
    if(el){ const hb=el.getBoundingClientRect(); if(hb.width>0) placed.push({top:hb.top,bottom:hb.bottom,left:hb.left,right:hb.right}); } }
  for(let i=0;i<items.length;i++){
    const r={top:R[i].top,bottom:R[i].bottom,left:R[i].left,right:R[i].right}; let dy=0, guard=0, moved=true;
    while(moved && guard++<24){ moved=false;
      for(const p of placed){ if(r.left<p.right && r.right>p.left && r.top<p.bottom+3 && r.bottom>p.top){
        const push=p.bottom-r.top+4; dy+=push; r.top+=push; r.bottom+=push; moved=true; } } }
    if(dy) items[i].style.transform+=` translateY(${dy.toFixed(1)}px)`;
    placed.push(r);
  }
}
const _cmpC=new THREE.Vector3(), _cmpN=new THREE.Vector3();
function updateCompass(){
  const rose=document.getElementById("compass-rose");
  if(!rose) return;
  const g=CFG.GEO, midLng=(g.minLng+g.maxLng)/2, midLat=(g.minLat+g.maxLat)/2;
  _cmpC.copy(vec(midLng,midLat,0)).project(camera);
  _cmpN.copy(vec(midLng,g.maxLat,0)).project(camera);
  const angle=Math.atan2(_cmpN.x-_cmpC.x, _cmpN.y-_cmpC.y);
  rose.style.transform=`rotate(${angle}rad)`;
}
function renderScene(){ controls.update(); updateCompass(); renderer.render(scene,camera); labelRenderer.render(scene,camera); decollide(); }
function frame(dt){
  const spd=playSpeed;
  Director.update(dt*spd);
  const w=applyWeather(Clock.day);
  updateFront(Clock.day); updateLines(Clock.day); updateUnits(Clock.day); updateArrows(Clock.day);
  updateFlags(); updateEffects(Clock.day,dt*spd); stepRain(dt*spd,w); updateLabels();
  renderScene();
}
function animate(){
  requestAnimationFrame(animate);
  const t=performance.now(); let dt=(t-last)/1000; last=t; if(dt>0.1) dt=0.1; now+=dt;
  frame(dt);
}

/* ===================== ASYNC INIT ================================= */
softTex=makeSoftTex(); GLOW=makeParticleSystem(1800,true,CFG.GLOW_PSCALE); SMOKE=makeParticleSystem(1100,false,CFG.SMOKE_PSCALE); buildFlashes();
function awaitAudio(){   // hold boot until the background mp3 is buffered (10s hard cap so audio can never hang the experience)
  const a=document.getElementById("bgm");
  if(!a || a.readyState>=4) return Promise.resolve();
  return new Promise(res=>{ let done=false; const finish=()=>{ if(!done){done=true;res();} };
    a.addEventListener("canplaythrough",finish,{once:true});
    a.addEventListener("error",finish,{once:true});            // failed load → degrade, don't hang
    setTimeout(finish, 10000);
    try{ a.load(); }catch(e){}
  });
}
(async function init(){
  try{
    await loadTiles();
    buildTerrain(); buildLabels(); buildMapCompass(); buildLine(); buildRain();
    D.units.forEach(buildUnit); D.arrows.forEach(buildArrow);
    unitObjs.forEach(o=>{ unitById[o.u.id]=o; });
    applyTheme(); wireUI(); applyWeather(D.storyboard[0].day);
    bootMsg(document.getElementById("bgm") ? "載入配樂 · Loading music…" : "準備就緒 · Ready…"); await awaitAudio();
    Director.start(); updatePlayBtn(); kickMusic();   // start the MUTED, in-sync soundtrack timeline (muted autoplay is gesture-exempt; silent). Audible sound requires a deliberate music-button click.
    bootMsg("啟動…"); renderScene(); animate();
    setTimeout(()=>{ const b=document.getElementById("boot"); if(b) b.classList.add("gone"); }, 600);
  }catch(e){ fatal(e); }
})();

})();
