// Deep scan: dump full subject->level->app structure to JSON for directory design.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const SKIP = new Set(['node_modules', 'common', 'shared', 'scripts', '_archive', 'dist', 'assets', '.git']);

function hasIndex(dir) { try { return fs.existsSync(path.join(dir, 'index.html')); } catch { return false; } }
function subdirs(dir) {
  try {
    return fs.readdirSync(dir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('.') && !SKIP.has(e.name))
      .map(e => e.name);
  } catch { return []; }
}

// Collect apps (dirs with index.html) up to 3 levels under a subject dir.
function collectApps(subjectDir, prefix, depth, out) {
  if (depth > 3) return;
  for (const name of subdirs(subjectDir)) {
    const p = path.join(subjectDir, name);
    const rel = prefix ? `${prefix}/${name}` : name;
    if (hasIndex(p)) {
      out.push({ path: rel, name });
      // still descend one more level for nested labs (e.g. ICT HKDSE_Interactive_Lab)
      collectApps(p, rel, depth + 1, out);
    } else {
      collectApps(p, rel, depth + 1, out);
    }
  }
}

const trees = ['HK Cirriculum/Primary_School', 'HK Cirriculum/Secondary_School', 'Primary_School', 'Secondary_School'];
const report = {};
for (const tree of trees) {
  const treeDir = path.join(ROOT, tree);
  if (!fs.existsSync(treeDir)) continue;
  report[tree] = {};
  for (const subject of subdirs(treeDir)) {
    const apps = [];
    collectApps(path.join(treeDir, subject), '', 0, apps);
    report[tree][subject] = { hub: hasIndex(path.join(treeDir, subject)), count: apps.length, apps: apps.map(a => a.path) };
  }
}
fs.writeFileSync(path.join(__dirname, 'tree-report.json'), JSON.stringify(report, null, 2));
// Summary
for (const [tree, subjects] of Object.entries(report)) {
  console.log(`\n== ${tree} ==`);
  for (const [s, d] of Object.entries(subjects)) console.log(`  ${s} ${d.hub ? '[hub]' : ''} (${d.count})`);
}
console.log('\nTotal:', Object.values(report).flatMap(s => Object.values(s)).reduce((a, b) => a + b.count, 0));
