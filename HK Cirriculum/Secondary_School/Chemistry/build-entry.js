const fs = require("fs");
const path = require("path");
const catalog = require("./student-catalog");
const root = __dirname;

function lessonsOf(form) {
  return form.topics.reduce((list, topic) => list.concat(topic.lessons.map((lesson) => Object.assign({ topic: topic.title, form: form }, lesson))), []);
}

function allLessons() {
  return catalog.forms.reduce((list, form) => list.concat(lessonsOf(form)), []);
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
}

function ncs(prefix) {
  return `  <link rel="stylesheet" href="${prefix}common/ncs-i18n.css" />
  <script src="${prefix}common/ncs-i18n.js" defer data-ncs-kit="fleet"></script>
  <style data-ncs-kit="fleet-bridge">
    body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet,
    body.ncs-fleet-mounted .ncs-lang-btn:not(.ncs-lang-switcher *) { display: none !important; }
  </style>
  <script data-ncs-kit="fleet-init">
  (function () {
    function hideLegacyToggles() {
      document.body.classList.add("ncs-fleet-mounted");
    }
    function boot() {
      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;
      window.NcsI18n.init({ chromePath: "${prefix}_shared/ncs-chrome.json", target: document.body }).then(hideLegacyToggles);
    }
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  })();
  </script>`;
}

function pageCss() {
  return `body{margin:0;font-family:"Segoe UI","Noto Sans HK",sans-serif;background:#f8fafc;color:#0f172a}
    header,main{max-width:1100px;margin:0 auto;padding:1.25rem}
    a.back{color:#0f766e;text-decoration:none;font-weight:700}
    h1{margin:.4rem 0} h2{margin:1.6rem 0 .4rem} h3{margin:1rem 0 .4rem;color:#0f766e}
    .grid{display:grid;gap:.8rem;grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
    .card{display:block;background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:1rem;text-decoration:none;color:inherit}
    .card:hover{box-shadow:0 8px 24px rgba(0,0,0,.08)}
    .badge{display:inline-block;font-size:.68rem;font-weight:700;background:#0f766e;color:#fff;padding:.12rem .4rem;border-radius:4px}
    .meta{color:#64748b;font-size:.82rem;margin:.35rem 0 0}`;
}

function cards(form, hrefFor) {
  return form.topics.map((topic) => {
    const items = topic.lessons.map((lesson) => `        <a class="card" href="${hrefFor(form, lesson)}">
          <span class="badge">可操作</span>
          <h3>${esc(lesson.title)}</h3>
          <p class="meta">${esc(lesson.blurb)} · ${esc(lesson.en)}</p>
        </a>`).join("\n");
    return `      <section>
        <h3>${esc(topic.title)}</h3>
        <div class="grid">
${items}
        </div>
      </section>`;
  }).join("\n");
}

function writeHub() {
  const total = allLessons().length;
  const formCards = catalog.forms.map((form) => {
    const n = lessonsOf(form).length;
    const href = encodeURI(form.code + "/index.html");
    return `      <a class="card" href="${href}">
        <span class="badge">${esc(form.title)}</span>
        <h3>${esc(form.en)}</h3>
        <p class="meta">${n} 課</p>
      </a>`;
  }).join("\n");
  const sections = catalog.forms.map((form) => `    <section>
      <h2>${esc(form.title)} · ${esc(form.en)}</h2>
${cards(form, (f, lesson) => encodeURI(f.code + "/" + lesson.folder + "/index.html"))}
    </section>`).join("\n");
  const html = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>化學 · 中三至中六</title>
  <style>${pageCss()}</style>
${ncs("../../")}
</head>
<body>
  <header>
    <h1>化學 Chemistry</h1>
    <p>學生入口按中三至中六分組，同一課題放在一起。共 ${total} 課。</p>
    <a class="back" href="../index.html">返回中學課程</a>
    <div class="grid" style="margin-top:1rem">
${formCards}
    </div>
  </header>
  <main>
${sections}
    <h2>其他科學科</h2>
    <div class="grid">
      <a class="card" href="../Physics/index.html"><h3>物理</h3></a>
      <a class="card" href="../Biology/index.html"><h3>生物</h3></a>
      <a class="card" href="../Junior%20Science/index.html"><h3>初中科學</h3></a>
    </div>
  </main>
  <footer style="text-align:center;padding:1rem;font-size:.8rem;opacity:.7">@HKSTEAMAI All Copy-Right Reserved.</footer>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, "index.html"), html);
}

function writeForm(form) {
  const n = lessonsOf(form).length;
  const html = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(form.title)}化學</title>
  <style>${pageCss()}</style>
${ncs("../../../")}
</head>
<body>
  <header>
    <a class="back" href="../index.html">← 化學入口</a>
    <h1>${esc(form.title)} · ${esc(form.en)}</h1>
    <p>${n} 課，按課題排列。</p>
  </header>
  <main>
${cards(form, (f, lesson) => lesson.folder + "/index.html")}
  </main>
  <footer style="text-align:center;padding:1rem;font-size:.8rem;opacity:.7">@HKSTEAMAI All Copy-Right Reserved.</footer>
</body>
</html>
`;
  fs.writeFileSync(path.join(root, form.code, "index.html"), html);
}

function writePlan() {
  const lines = ["# 化學學生入口", "", "這份清單與化學首頁、各年級頁是同一套。未列入的資料夾不在學生入口。", ""];
  catalog.forms.forEach((form) => {
    lines.push("## " + form.title + " " + form.en, "");
    form.topics.forEach((topic) => {
      lines.push("### " + topic.title, "");
      topic.lessons.forEach((lesson) => {
        lines.push("- **" + lesson.title + "**（" + lesson.en + "）— `" + form.code + "/" + lesson.folder + "/index.html`");
        lesson.objectives.forEach((obj) => lines.push("  - " + obj));
      });
      lines.push("");
    });
  });
  fs.writeFileSync(path.join(root, "curriculum_plan.md"), lines.join("\n"));
}

function injectLessons() {
  allLessons().forEach((lesson) => {
    const file = path.join(root, lesson.form.code, lesson.folder, "index.html");
    let html = fs.readFileSync(file, "utf8");
    if (html.includes("學習目標") && html.includes("lesson-kit.js") && html.includes("chem-feedback")) return;
    const items = lesson.objectives.map((obj) => "    <li>" + esc(obj) + "</li>").join("\n");
    const block = `
<section class="chem-learn" data-chem-entry="1">
  <h2>學習目標</h2>
  <ul>
${items}
  </ul>
  <p id="chem-feedback" role="status">調校畫面後，這裡顯示回饋。</p>
</section>
<script src="../../lesson-kit.js"></script>
`;
    if (!/<body[^>]*>/i.test(html)) throw new Error("no body " + file);
    html = html.replace(/<body([^>]*)>/i, (m) => m + block);
    fs.writeFileSync(file, html);
  });
}

writeHub();
catalog.forms.forEach(writeForm);
writePlan();
injectLessons();
console.log("entry built", allLessons().length);
