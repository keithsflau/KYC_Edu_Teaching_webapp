const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', 'Secondary_School');

const SUBJECTS = {
  Chemistry: { zh: '化學', accent: '#7c3aed', back: 'Chemistry hub' },
  Physics: { zh: '物理', accent: '#2563eb', back: 'Physics hub' },
};

function isAppDir(dir) {
  return fs.existsSync(path.join(dir, 'index.html'));
}

function listApps(formDir) {
  if (!fs.existsSync(formDir)) return [];
  return fs
    .readdirSync(formDir, { withFileTypes: true })
    .filter((e) => e.isDirectory() && !e.name.startsWith('.'))
    .filter((e) => isAppDir(path.join(formDir, e.name)))
    .map((e) => e.name)
    .sort();
}

function titleFromFolder(name) {
  return name
    .replace(/^\d+_/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function writeFormHub(subject, form, apps) {
  const formDir = path.join(ROOT, subject, form);
  const hubPath = path.join(formDir, 'index.html');
  if (fs.existsSync(hubPath)) return false;

  const meta = SUBJECTS[subject];
  const formLabel = form.replace('Form ', 'F');
  const cards = apps
    .map(
      (app) => `        <a class="card" href="${app}/index.html">
          <span class="badge">Interactive Lab</span>
          <h3>${titleFromFolder(app)}</h3>
          <p class="meta"><code>${app}</code></p>
        </a>`
    )
    .join('\n');

  const html = `<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${form} ${subject}</title>
  <style>
    body { margin:0; font-family:"Segoe UI","Noto Sans HK",sans-serif; background:#f8fafc; color:#0f172a; }
    header { padding:2rem 1.25rem 1rem; max-width:1100px; margin:0 auto; }
    a.back { color:${meta.accent}; text-decoration:none; }
    h1 { margin:.6rem 0; }
    main { max-width:1100px; margin:0 auto; padding:0 1.25rem 3rem; display:grid; gap:1rem; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); }
    .card { display:block; background:#fff; border:1px solid #e2e8f0; border-radius:14px; padding:1.1rem; text-decoration:none; color:inherit; }
    .card:hover { box-shadow:0 8px 24px rgba(0,0,0,.08); }
    .meta { color:#64748b; font-size:.82rem; }
    .badge { display:inline-block; font-size:.65rem; font-weight:700; text-transform:uppercase; letter-spacing:.06em; background:${meta.accent}; color:#fff; padding:.15rem .45rem; border-radius:4px; margin-bottom:.35rem; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet" />
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <header>
    <a class="back" href="../index.html">← ${meta.back}</a>
    <h1>${formLabel} · ${subject}</h1>
    <p>${apps.length} interactive labs · HKDSE ${form}</p>
  </header>
  <main>
${cards}
</main>
  <script src="../../../common/learn-from-zero.js"></script>
  <script src="../../../common/interactive-lab-kit.js"></script>
<footer style="text-align:center;padding:1rem;font-size:0.8rem;opacity:0.7;">@HKSTEAMAI All Copy-Right Reserved.</footer>
</body>
</html>`;

  fs.writeFileSync(hubPath, html, 'utf-8');
  return true;
}

const created = [];
for (const subject of Object.keys(SUBJECTS)) {
  const subjectDir = path.join(ROOT, subject);
  for (const entry of fs.readdirSync(subjectDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || !entry.name.startsWith('Form ')) continue;
    const apps = listApps(path.join(subjectDir, entry.name));
    if (!apps.length) continue;
    if (writeFormHub(subject, entry.name, apps)) {
      created.push(`${subject}/${entry.name}/index.html`);
    }
  }
}

console.log('Created form hubs:', created.length ? created.join(', ') : '(none — all exist)');
