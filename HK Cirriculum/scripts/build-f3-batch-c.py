#!/usr/bin/env python3
"""Hand-crafted LGER rebuild for Form 3 Batch C (apps 19-28)."""
import importlib.util
import json
import os

SCRIPT = os.path.dirname(__file__)
BASE = os.path.normpath(os.path.join(SCRIPT, "..", "Secondary_School", "Junior Science", "Form 3"))
COMMON = "../../../../common/junior-science-lger.js"

spec = importlib.util.spec_from_file_location("gf3", os.path.join(SCRIPT, "generate-f3-lger.py"))
gf3 = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gf3)
EXPERIMENTS = gf3.EXPERIMENTS


def O(en, zh):
    return {"en": en, "zh": zh}


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def step(titleEn, titleZh, bodyEn, bodyZh, qEn, qZh, opts, a, whyEn, whyZh):
    return {
        "titleEn": titleEn, "titleZh": titleZh,
        "bodyEn": bodyEn, "bodyZh": bodyZh,
        "qEn": qEn, "qZh": qZh,
        "opts": [O(e, z) for e, z in opts],
        "a": a, "whyEn": whyEn, "whyZh": whyZh,
    }


def drill(qEn, qZh, opts, a, hintEn, hintZh):
    return {
        "qEn": qEn, "qZh": qZh,
        "opts": [O(e, z) for e, z in opts],
        "a": a, "hintEn": hintEn, "hintZh": hintZh,
    }


def rev(qEn, qZh, opts, a):
    return {"qEn": qEn, "qZh": qZh, "opts": [O(e, z) for e, z in opts], "a": a}


def emit_learn(steps):
    lines = ["    const LEARN = ["]
    for s in steps:
        lines.append(f"      {{ titleEn: {js_str(s['titleEn'])}, titleZh: {js_str(s['titleZh'])},")
        lines.append(f"        bodyEn: {js_str(s['bodyEn'])}, bodyZh: {js_str(s['bodyZh'])},")
        lines.append(f"        qEn: {js_str(s['qEn'])}, qZh: {js_str(s['qZh'])},")
        opts = ", ".join(f'{{ en: {js_str(o["en"])}, zh: {js_str(o["zh"])} }}' for o in s["opts"])
        lines.append(f"        opts: [{opts}], a: {s['a']},")
        lines.append(f"        whyEn: {js_str(s['whyEn'])}, whyZh: {js_str(s['whyZh'])} }},")
    lines.append("    ];")
    return "\n".join(lines)


def emit_guided(items):
    lines = ["    const GUIDED = ["]
    for g in items:
        opts = ", ".join(f'{{ en: {js_str(o["en"])}, zh: {js_str(o["zh"])} }}' for o in g["opts"])
        lines.append(f"      {{ qEn: {js_str(g['qEn'])}, qZh: {js_str(g['qZh'])},")
        lines.append(f"        opts: [{opts}], a: {g['a']},")
        lines.append(f"        hintEn: {js_str(g['hintEn'])}, hintZh: {js_str(g['hintZh'])} }},")
    lines.append("    ];")
    return "\n".join(lines)


def emit_summary(items):
    lines = ["    const SUMMARY = ["]
    for s in items:
        lines.append(f"      {{ en: {js_str(s['en'])}, zh: {js_str(s['zh'])} }},")
    lines.append("    ];")
    return "\n".join(lines)


def emit_review(items):
    lines = ["    const REVIEW = ["]
    for r in items:
        opts = ", ".join(f'{{ en: {js_str(o["en"])}, zh: {js_str(o["zh"])} }}' for o in r["opts"])
        lines.append(f"      {{ qEn: {js_str(r['qEn'])}, qZh: {js_str(r['qZh'])},")
        lines.append(f"        opts: [{opts}], a: {r['a']} }},")
    lines.append("    ];")
    return "\n".join(lines)


def generate(cfg):
    exp = EXPERIMENTS[cfg["experiment"]]
    bg = cfg.get("bg", "#f0f9ff")
    return f'''<!DOCTYPE html>
<html lang="zh-HK">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{cfg["titleEn"]} · {cfg["titleZh"]} | S3 Junior Science</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="../../../../common/babel-react-classic.js"></script>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet" />
  <script src="{COMMON}"></script>
  <style>body {{ font-family: "Outfit", sans-serif; background: {bg}; }}</style>
  <link rel="stylesheet" href="../../../../common/ncs-i18n.css" />
  <script src="../../../../common/ncs-i18n.js" defer data-ncs-kit="fleet"></script>
  <style data-ncs-kit="fleet-bridge">
    body.ncs-fleet-mounted .ncs-hide-when-ncs-fleet,
    body.ncs-fleet-mounted .ncs-lang-btn:not(.ncs-lang-switcher *) {{
      display: none !important;
    }}
  </style>
  <script data-ncs-kit="fleet-init">
  (function () {{
    function hideLegacyToggles() {{
      document.body.classList.add("ncs-fleet-mounted");
      document.querySelectorAll("header button[type=\\"button\\"]").forEach(function (btn) {{
        var label = (btn.textContent || "").trim();
        if (label === "EN" || label === "\\u4E2D") btn.classList.add("ncs-hide-when-ncs-fleet");
      }});
      document.querySelectorAll(".fixed.top-4.right-4.z-50").forEach(function (el) {{
        el.classList.add("ncs-hide-when-ncs-fleet");
      }});
    }}
    function boot() {{
      if (!window.NcsI18n || window.NcsI18n.isInitialized()) return;
      window.NcsI18n.init({{ chromePath: "../../../../_shared/ncs-chrome.json", target: document.body }}).then(hideLegacyToggles);
    }}
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
    else boot();
  }})();
  </script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" data-presets="react-classic">
    const {{ useState }} = React;
    const ACCENT = "{cfg["accent"]}";
    const {{ Shell }} = window.JSLGER;

{emit_learn(cfg["learn"])}
{emit_guided(cfg["guided"])}
{emit_summary(cfg["summary"])}
{emit_review(cfg["review"])}

{exp}

    function App() {{
      return (
        <Shell
          meta={{{{ appId: "{cfg["appId"]}", titleEn: "{cfg["titleEn"]}", titleZh: "{cfg["titleZh"]}", unit: "{cfg["unit"]}" }}}}
          accent={{ACCENT}}
          backHref="../index.html"
          learnSteps={{LEARN}}
          guidedBank={{GUIDED}}
          reviewSummary={{SUMMARY}}
          reviewQuiz={{REVIEW}}
          experiment={{p => <ExperimentLab {{...p}} />}}
        />
      );
    }}
    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
  </script>
</body>
</html>
'''


# Load app configs from companion JSON
CONFIG_PATH = os.path.join(SCRIPT, "f3-batch-c-configs.json")

def main():
    with open(CONFIG_PATH, encoding="utf-8") as f:
        apps = json.load(f)
    for cfg in apps:
        out = os.path.join(BASE, cfg["folder"], "index.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        with open(out, "w", encoding="utf-8") as f:
            f.write(generate(cfg))
        print("OK F3 Batch C:", cfg["folder"])


if __name__ == "__main__":
    main()
