const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const hubs = [
  'Secondary_School/Chemistry/index.html',
  'Secondary_School/Physics/index.html',
  'Secondary_School/Biology/index.html',
  'Secondary_School/Junior Science/index.html',
  'Secondary_School/Chemistry/Form 3/index.html',
  'Secondary_School/Chemistry/Form 4/index.html',
  'Secondary_School/Physics/Form 4/index.html',
  'Secondary_School/Physics/Form 5/index.html',
  'Secondary_School/Physics/Form 6/index.html',
];

let broken = 0;
for (const hub of hubs) {
  const hubPath = path.join(ROOT, hub);
  const html = fs.readFileSync(hubPath, 'utf8');
  const re = /href="([^"]+)"/g;
  let m;
  while ((m = re.exec(html))) {
    const href = m[1];
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) continue;
    const target = path.resolve(path.dirname(hubPath), decodeURIComponent(href));
    if (!fs.existsSync(target)) {
      console.log('BROKEN', hub, '->', href);
      broken++;
    }
  }
}
console.log('broken', broken);
