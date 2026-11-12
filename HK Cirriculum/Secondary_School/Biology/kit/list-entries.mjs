import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const hubs = ["index.html", "Form 4/index.html", "Form 5/index.html", "Form 6/index.html", "apps/index.html"];
const entries = new Set(hubs);
for (const hub of hubs) {
  const html = fs.readFileSync(path.join(root, hub), "utf8");
  const re = /href\s*=\s*["']([^"']+)["']/gi;
  let match;
  while ((match = re.exec(html))) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/i.test(href)) continue;
    const target = path.normalize(path.join(path.dirname(hub), decodeURIComponent(href.split("#")[0]))).replaceAll("\\", "/");
    if (target.endsWith(".html")) entries.add(target);
  }
}
const list = [...entries].sort();
console.log(list.length);
list.forEach((item) => console.log(item));

const bundleDir = path.join(root, "apps", "recombinant-dna");
function walk(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === "node_modules") continue;
    const full = path.join(dir, name);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) walk(full);
    else if (/\.(js|html)$/.test(name) && stat.size > 5000) {
      const text = fs.readFileSync(full, "utf8");
      if (/Heat Shock|42°C|LB \+ Amp|Plate Bacteria/.test(text)) console.log("PROTOCOL " + path.relative(root, full));
    }
  }
}
walk(bundleDir);
