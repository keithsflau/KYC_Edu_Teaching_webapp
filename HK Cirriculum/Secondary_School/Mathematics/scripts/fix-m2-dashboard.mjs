/**
 * Rebuild M2/index.html curriculum JSON with titles (lost during static conversion).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const m2Index = path.resolve(__dirname, "../M2/index.html");

const unitTitles = {
  unit1: "Unit 1: Algebra & Complex Numbers",
  unit2: "Unit 2: Limits & Differentiation",
  unit3: "Unit 3: Integration & Applications",
  unit4: "Unit 4: Matrices & Systems",
  unit5: "Unit 5: Vectors",
  unit6: "Unit 6: Diff. Eqs & Series",
};

const appTitles = {
  "01": "Math Induction",
  "02": "Binomial Expansion",
  "03": "Limit to e",
  "04": "First Principles",
  "05": "3D Vector Visualizer",
  "06": "Product Rule",
  "07": "Chain Rule",
  "08": "Parametric Curves",
  "09": "2nd Derivative Test",
  10: "Asymptotes",
  11: "Substitution",
  12: "Int. by Parts",
  13: "Area Between Curves",
  14: "Vol: Washer",
  15: "Vol: Shell",
  16: "Matrix Ops",
  17: "Determinant (3x3)",
  18: "Inverse Matrix",
  19: "Cramer's Rule",
  20: "Gaussian Elim.",
  21: "Linear Sys (2D)",
  22: "Linear Sys (3D)",
  23: "Transform (2D)",
  24: "Eigenvalues",
  25: "Transform (3D)",
  26: "Scalar Product",
  27: "Vector Product",
  28: "Scalar Triple Prod",
  29: "Line Equation",
  30: "Plane Equation",
  31: "Rectilinear Motion",
  32: "Related Rates",
  33: "Optimization",
  34: "Trapezoidal Rule",
  35: "Standard Integrals",
  36: "Separation of Var",
  37: "Slope Fields",
  38: "Euler's Method",
  39: "Logistic Growth",
  40: "Gen vs Particular",
  41: "Maclaurin Series",
  42: "Reduction Formulae",
  43: "Improper Integrals",
  44: "Vol: Slicing",
  45: "Polar Curves",
  46: "Argand Diagram",
  47: "De Moivre's Theorem",
  48: "Complex Locus",
  49: "Hyperbolic Funcs",
  50: "Euler's Identity",
};

const unitBg = {
  unit1: "bg-sky-900/40",
  unit2: "bg-emerald-900/40",
  unit3: "bg-rose-900/40",
  unit4: "bg-amber-900/40",
  unit5: "bg-purple-900/40",
  unit6: "bg-indigo-900/40",
};

let html = fs.readFileSync(m2Index, "utf8");
const curMatch = html.match(
  /<script id="math-curriculum" type="application\/json">([\s\S]*?)<\/script>/
);
if (!curMatch) throw new Error("math-curriculum not found");

const curriculum = JSON.parse(curMatch[1]);
for (const unit of curriculum) {
  unit.title = unitTitles[unit.id] || unit.id;
  unit.bg = unitBg[unit.id] || "bg-slate-800/40";
  for (const app of unit.apps) {
    app.title = appTitles[app.id] || `App ${app.id}`;
  }
}

const config = {
  badge: "Module 2",
  titleLead: "Algebra &",
  titleAccent: "Calculus",
  subtitle: "Advanced Interactive Labs for Hong Kong DSE M2",
  theme: "dark",
  badgeBg: "bg-sky-900/50",
  badgeText: "text-sky-300",
  badgeBorder: "border-sky-500/30",
  badgeDot: "bg-sky-400",
  titleGradient: "from-white via-sky-200 to-sky-400",
  cardClass: "glass-panel",
};

html = html.replace(
  /<script id="math-dashboard-config" type="application\/json">[\s\S]*?<\/script>/,
  `<script id="math-dashboard-config" type="application/json">${JSON.stringify(config)}</script>`
);
html = html.replace(
  /<script id="math-curriculum" type="application\/json">[\s\S]*?<\/script>/,
  `<script id="math-curriculum" type="application/json">${JSON.stringify(curriculum)}</script>`
);

html = html.replace(
  `class="fixed top-4 left-4 z-50 text-sm text-slate-600 hover:text-blue-600 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm"`,
  `class="fixed top-4 left-4 z-50 text-sm text-sky-300 hover:text-white bg-slate-800/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-600 shadow-sm"`
);

fs.writeFileSync(m2Index, html, "utf8");
console.log("Fixed M2 dashboard:", curriculum.length, "units");
