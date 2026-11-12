import fs from "fs";
import path from "path";

const root = path.resolve(import.meta.dirname, "..");
const tag = [
  '<script src="../../kit/tone.js"></script>',
  '<script src="../../kit/form-banner.js"></script>'
].join("\n");

for (const folder of ["Form 4", "Form 5", "Form 6"]) {
  const base = path.join(root, folder);
  for (const name of fs.readdirSync(base)) {
    const file = path.join(base, name, "index.html");
    if (!fs.existsSync(file)) continue;
    let text = fs.readFileSync(file, "utf8");
    if (!text.includes("kit/form-banner.js")) {
      if (!text.includes("</body>")) {
        console.log("NO BODY", file);
        continue;
      }
      text = text.replace("</body>", tag + "\n</body>");
      fs.writeFileSync(file, text);
      console.log("patched", folder, name);
    } else {
      console.log("already", folder, name);
    }
  }
}

const mito = fs.readFileSync(path.join(root, "Form 4/02_Mitosis_Cell_Cycle/index.html"), "utf8");
console.log("simplified left", (mito.match(/解体/g) || []).length);
