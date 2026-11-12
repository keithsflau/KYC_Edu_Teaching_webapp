const fs = require("fs");
const path = require("path");
const root = __dirname;

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}
function write(rel, text) {
  fs.writeFileSync(path.join(root, rel), text);
}
function must(cond, msg) {
  if (!cond) throw new Error(msg);
}

function dedupeModel(html) {
  return html.replace(/(<script src="\.\.\/\.\.\/chem-model\.js"><\/script>\s*){2,}/g, '<script src="../../chem-model.js"></script>\n');
}

function patchBuffer() {
  const rel = "Form 5/06_Buffer_Systems/index.html";
  let html = read(rel).replace(/\u2212added/g, "-added");
  html = dedupeModel(html);
  must(html.includes("ChemModel.bufferPH"), "buffer missing bufferPH");
  must(!html.includes("Math.max(0.01"), "buffer still clamps 0.01");
  write(rel, html);
}

function patchTitration() {
  const rel = "Form 6/02_Titration_Curve/index.html";
  let html = dedupeModel(read(rel));
  must(html.includes("ChemModel.titrationPH"), "titration missing titrationPH");
  must(!html.includes("Math.max(nB, 0.01)"), "titration still floors nB");
  must(!html.includes("return 2.9"), "titration still hardcodes 2.9");
  write(rel, html);
}

function patchAcid() {
  const rel = "Form 3/06_Acids_Alkalis_pH/index.html";
  let html = read(rel).replace(/\r\n/g, "\n");
  if (!html.includes("chem-model.js")) {
    const needle = "<script>";
    const at = html.indexOf("// State");
    must(at > 0, "acid state marker missing");
    const scriptAt = html.lastIndexOf("<script>", at);
    must(scriptAt > 0, "acid script tag missing");
    html = html.slice(0, scriptAt) + '<script src="../../chem-model.js"></script>\n    ' + html.slice(scriptAt);
  }
  must(/Acid Strength \(Initial pH\)/.test(html), "acid label already gone?");
  html = html.replace(
    /Acid Strength \(Initial pH\)[\s\S]*?id="ph-display">1\.0<\/span><\/span>/,
    `濃度 Concentration (mol/dm³)</label>
          <input id="conc-input" type="range" min="0.01" max="0.10" step="0.01" value="0.10" oninput="onConc()" class="w-full" />
          <div class="flex items-center justify-between text-sm font-mono text-pink-300 font-bold bg-slate-900 p-2 rounded mt-2">
            <span>濃度 <span id="conc-label">0.10</span></span>
            <span>pH <span id="ph-display">1.00</span></span>`
  );
  if (!html.includes("護目鏡")) {
    const before = html;
    html = html.replace(
      /Reset Experiment\s*<\/button>/,
      "Reset Experiment</button>\n        <p class=\"text-[11px] text-amber-200 mt-3\">做真實實驗要戴護目鏡。模擬廢液倒入指定廢液缸。</p>"
    );
    must(html !== before, "reset button not found");
  }
  const indStart = html.indexOf("const INDICATORS");
  const indEnd = html.indexOf("// DOM", indStart);
  must(indStart > 0 && indEnd > indStart, "indicator block missing");
  html = html.slice(0, indStart) + "var phDisplay = document.getElementById(\"ph-display\");\n      " + html.slice(indEnd);
  html = html.replace(/const phDisplay = document\.getElementById\("ph-display"\);\s*/, "");
  const fnStart = html.indexOf("function addBase");
  const fnEnd = html.indexOf("// Init", fnStart);
  must(fnStart > 0 && fnEnd > fnStart, "acid functions missing");
  const replacement = `function currentConc() {
        var el = document.getElementById("conc-input");
        var c = el ? parseFloat(el.value) : 0.1;
        return isFinite(c) ? c : 0.1;
      }

      function syncPH() {
        molarityAcid = currentConc();
        ph = ChemModel.strongAcidPH(molarityAcid, volumeAcid, molarityBase, volumeBaseAdded);
        if (ph < 0) ph = 0;
        if (ph > 14) ph = 14;
        updateVisuals();
      }

      function onConc() {
        volumeBaseAdded = 0;
        syncPH();
        if (window.ChemLesson) ChemLesson.say("濃度 " + molarityAcid.toFixed(2) + " mol/dm³，起始 pH " + ph.toFixed(2) + "。滑桿改的是濃度。");
      }

      function addBase(amount) {
        volumeBaseAdded += amount;
        syncPH();
      }

      function updateVisuals() {
        phDisplay.innerText = ph.toFixed(2);
        var concLabel = document.getElementById("conc-label");
        if (concLabel) concLabel.textContent = molarityAcid.toFixed(2);
        var ind = document.getElementById("indicator-select").value;
        var band = ChemModel.indicatorStyle(ind, ph);
        liquid.style.backgroundColor = band.hex;
        liquid.style.opacity = band.name === "無色" ? "0.35" : "0.9";
        var baseHeight = 40;
        var addedHeight = (volumeBaseAdded / 50) * 10;
        liquid.style.height = baseHeight + addedHeight + "%";
        document.getElementById("burette-liquid").style.height = Math.max(0, 100 - volumeBaseAdded) + "%";
        document.getElementById("status-title").innerText = band.name;
        document.getElementById("status-desc").innerText = "指示劑色帶：" + band.name + "（pH " + ph.toFixed(2) + "）。變色看範圍，不是只在 pH 剛好等於 7。";
        document.getElementById("status-icon").innerText = ph < 6.5 ? "🔴" : ph < 7.5 ? "🟢" : "🔵";
      }

      function resetSim() {
        volumeBaseAdded = 0;
        syncPH();
      }

      `;
  html = html.slice(0, fnStart) + replacement + html.slice(fnEnd);
  must(!html.includes("Acid Strength"), "Acid Strength remains");
  must(!/ph\s*==\s*7/.test(html), "ph == 7 remains");
  must(html.includes("ChemModel.indicatorStyle"), "indicatorStyle missing");
  must(html.includes("護目鏡") && html.includes("廢液"), "safety text missing");
  write(rel, html);
}

function patchDistillation() {
  const rel = "Form 4/01_Fractional_Distillation/index.html";
  let html = read(rel).replace(/\r\n/g, "\n");
  if (!html.includes("chem-model.js")) {
    const at = html.indexOf("const FRACTIONS");
    must(at > 0, "FRACTIONS missing");
    const scriptAt = html.lastIndexOf("<script>", at);
    must(scriptAt > 0, "distill script missing");
    html = html.slice(0, scriptAt) + '<script src="../../chem-model.js"></script>\n    ' + html.slice(scriptAt);
  }
  const start = html.indexOf("const FRACTIONS");
  const fn = html.indexOf("function selectFraction");
  must(start > 0 && fn > start, "fraction block missing");
  const paint = `const FRACTIONS = ChemModel.FRACTIONS;

      function paintZones() {
        document.querySelectorAll("[data-zone]").forEach(function (el) {
          var frac = FRACTIONS[+el.getAttribute("data-zone")];
          if (frac) el.textContent = frac.temp;
        });
        var top = document.getElementById("tower-top");
        var bottom = document.getElementById("tower-bottom");
        if (top) top.textContent = FRACTIONS[0].temp;
        if (bottom) bottom.textContent = FRACTIONS[FRACTIONS.length - 1].temp;
      }

      `;
  html = html.slice(0, start) + paint + html.slice(fn);
  html = html.replace("function selectFraction(index) {", "function selectFraction(index, fromUser) {");
  html = html.replace(
    'document.getElementById("f-uses").innerHTML = data.uses;',
    'document.getElementById("f-uses").innerHTML = data.uses + "<br>" + (data.note || "");\n        if (fromUser && window.ChemLesson) ChemLesson.say(data.name + "：" + data.carbons + "，沸程 " + data.temp + "。" + (data.note || ""));'
  );
  html = html.replace(/onclick="selectFraction\((\d+)\)"/g, 'onclick="selectFraction($1, true)"');
  html = html.replace("selectFraction(0);", "paintZones();\n      selectFraction(0);");
  html = html.replace(/hidden group-hover:block /g, "");
  const zones = ["< 40°C", "40-70°C", "70-170°C", "170-250°C", "250-350°C", "> 350°C", "Residue"];
  zones.forEach(function (label, i) {
    const token = ">" + label + "</span";
    must(html.includes(token), "zone text missing: " + label);
    html = html.replace(token, ' data-zone="' + i + '"></span');
  });
  html = html.replace("Cool (25°C)", '<span id="tower-top"></span>');
  html = html.replace("Hot (400°C)", '<span id="tower-bottom"></span>');
  ["40-70", "40 - 70", "40–70", "400°C", "C5 - C10", "C8 - C12", "Residue"].forEach(function (bad) {
    must(!html.includes(bad), "distillation still has " + bad);
  });
  must(html.includes("ChemModel.FRACTIONS"), "FRACTIONS source missing");
  must(html.includes('data-zone="1"'), "zone 1 missing");
  must(html.includes("tower-top") && html.includes("tower-bottom"), "tower labels missing");
  write(rel, html);
}

function patchRates() {
  const rel = "Form 5/01_Rates_Collision/index.html";
  let html = read(rel).replace(/\r\n/g, "\n");
  if (!html.includes("chem-model.js")) {
    html = html.replace(
      '<script type="text/babel" data-presets="react-classic">',
      '<script src="../../chem-model.js"></script>\n  <script type="text/babel" data-presets="react-classic">'
    );
  }
  html = html.replace(
    "const { useState, useEffect } = React;",
    "const { useState, useEffect, useRef } = React;"
  );
  const start = html.indexOf("function LearnExtra");
  const end = html.indexOf("function UpgradeCTA");
  must(start > 0 && end > start, "LearnExtra missing");
  const component = `function LearnExtra() {
      const canvasRef = useRef(null);
      const [conc, setConc] = useState(4);
      const [temp, setTemp] = useState(25);
      const [stats, setStats] = useState({ perS: 0, success: 0, n: 24, speed: "1.45" });
      useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !window.ChemModel) return;
        const ctx = canvas.getContext("2d");
        const setup = ChemModel.collisionSetup(conc, temp);
        const W = canvas.width, H = canvas.height;
        const particles = [];
        for (let i = 0; i < setup.n; i++) {
          const ang = Math.random() * Math.PI * 2;
          particles.push({
            x: 16 + Math.random() * (W - 32),
            y: 16 + Math.random() * (H - 32),
            vx: Math.cos(ang) * setup.speed,
            vy: Math.sin(ang) * setup.speed,
            kind: i % 2
          });
        }
        let acc = { hits: 0, ok: 0 };
        let elapsed = 0;
        let last = performance.now();
        let raf = 0;
        const loop = (now) => {
          const dt = Math.min(0.033, (now - last) / 1000);
          last = now;
          elapsed += dt;
          ctx.fillStyle = "#0f172a";
          ctx.fillRect(0, 0, W, H);
          particles.forEach((p) => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 8) { p.x = 8; p.vx = Math.abs(p.vx); }
            if (p.x > W - 8) { p.x = W - 8; p.vx = -Math.abs(p.vx); }
            if (p.y < 8) { p.y = 8; p.vy = Math.abs(p.vy); }
            if (p.y > H - 8) { p.y = H - 8; p.vy = -Math.abs(p.vy); }
          });
          for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
              const a = particles[i], b = particles[j];
              if (a.kind === b.kind) continue;
              const dx = a.x - b.x, dy = a.y - b.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist < 14 && dist > 0) {
                const rel = Math.hypot(a.vx - b.vx, a.vy - b.vy);
                acc.hits += 1;
                if (rel >= setup.ea) acc.ok += 1;
                const nx = dx / dist, ny = dy / dist, overlap = 14 - dist;
                a.x += nx * overlap / 2; a.y += ny * overlap / 2;
                b.x -= nx * overlap / 2; b.y -= ny * overlap / 2;
                a.vx += nx * 0.2; a.vy += ny * 0.2;
                b.vx -= nx * 0.2; b.vy -= ny * 0.2;
              }
            }
          }
          particles.forEach((p) => {
            ctx.beginPath();
            ctx.fillStyle = p.kind ? "#f59e0b" : "#38bdf8";
            ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
            ctx.fill();
          });
          if (elapsed > 0.5) {
            setStats({
              perS: Math.round(acc.hits / elapsed),
              success: acc.hits ? Math.round((100 * acc.ok) / acc.hits) : 0,
              n: setup.n,
              speed: setup.speed.toFixed(2)
            });
            acc = { hits: 0, ok: 0 };
            elapsed = 0;
          }
          raf = requestAnimationFrame(loop);
        };
        raf = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(raf);
      }, [conc, temp]);
      const setup = window.ChemModel ? ChemModel.collisionSetup(conc, temp) : { n: conc * 6, speed: 1, ea: 1.5, note: "" };
      return (
        <div className="mt-3 space-y-2">
          <canvas ref={canvasRef} width={640} height={280} aria-label="粒子碰撞模型" className="w-full rounded-xl bg-slate-900" />
          <label className="text-sm font-semibold">濃度檔 {conc}（粒子數 {setup.n}）</label>
          <input type="range" min="2" max="8" step="1" value={conc} onChange={e => { const v = +e.target.value; setConc(v); if (window.ChemLesson) ChemLesson.say("濃度檔 " + v + "：粒子數變成 " + (window.ChemModel ? ChemModel.collisionSetup(v, temp).n : v * 6) + "。碰撞次數應上升。"); }} className="w-full" />
          <label className="text-sm font-semibold">溫度 {temp} °C（速率 {Number(setup.speed).toFixed(2)}）</label>
          <input type="range" min="10" max="70" step="1" value={temp} onChange={e => { const v = +e.target.value; setTemp(v); const s = window.ChemModel ? ChemModel.collisionSetup(conc, v) : { speed: 1, ea: 1.5 }; if (window.ChemLesson) ChemLesson.say("溫度 " + v + " °C：粒子速率 " + Number(s.speed).toFixed(2) + "。相對速率達到 " + s.ea + " 才算有效碰撞。"); }} className="w-full" />
          <p className="text-sm p-3 rounded-xl bg-violet-50 border border-violet-100">粒子數 {stats.n}。最近取樣約每秒 {stats.perS} 次不同顏色碰撞，其中約 {stats.success}% 達到速率閾值。{setup.note}</p>
        </div>
      );
    }

    `;
  html = html.slice(0, start) + component + html.slice(end);
  must(!html.includes("Math.exp((t-20)"), "fake rate slider remains");
  must(html.includes("collisionSetup"), "collisionSetup missing");
  must(html.includes("requestAnimationFrame"), "particle loop missing");
  write(rel, html);
}

patchBuffer();
patchTitration();
patchAcid();
patchDistillation();
patchRates();
console.log("patches ok");
