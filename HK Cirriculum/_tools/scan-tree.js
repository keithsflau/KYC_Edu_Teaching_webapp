// One-off structural scan: reports subjects, level folders, and app counts per tree.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

const TREES = [
  'HK Cirriculum/Primary_School',
  'HK Cirriculum/Secondary_School',
  'Primary_School',
  'Secondary_School',
];

function isAppDir(dir) {
  return fs.existsSync(path.join(dir, 'index.html'));
}

function scanSubject(subjectDir) {
  // Returns { apps: [...], levels: { levelName: [apps] }, looseApps: [...] }
  const out = { total: 0, levels: {}, looseApps: [] };
  if (!fs.existsSync(subjectDir)) return out;
  for (const entry of fs.readdirSync(subjectDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'common' || entry.name === '_archive') continue;
    const sub = path.join(subjectDir, entry.name);
    if (isAppDir(sub)) {
      out.looseApps.push(entry.name);
      out.total++;
      continue;
    }
    // Treat as a level folder: count apps one level down
    let levelApps = [];
    for (const e2 of fs.readdirSync(sub, { withFileTypes: true })) {
      if (!e2.isDirectory() || e2.name.startsWith('.')) continue;
      if (isAppDir(path.join(sub, e2.name))) levelApps.push(e2.name);
    }
    if (levelApps.length) {
      out.levels[entry.name] = levelApps;
      out.total += levelApps.length;
    }
  }
  return out;
}

for (const tree of TREES) {
  const treeDir = path.join(ROOT, tree);
  console.log(`\n=== ${tree} ===`);
  if (!fs.existsSync(treeDir)) { console.log('  (missing)'); continue; }
  for (const subject of fs.readdirSync(treeDir, { withFileTypes: true })) {
    if (!subject.isDirectory() || subject.name.startsWith('.')) continue;
    const r = scanSubject(path.join(treeDir, subject.name));
    const levelSummary = Object.entries(r.levels).map(([k, v]) => `${k}:${v.length}`).join(' ');
    const loose = r.looseApps.length ? ` loose=[${r.looseApps.join(', ')}]` : '';
    console.log(`  ${subject.name}: ${r.total} apps | ${levelSummary}${loose}`);
  }
}
