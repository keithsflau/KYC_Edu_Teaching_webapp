#!/usr/bin/env python3
"""Fix blank / React-won't-mount patterns in Secondary + Primary curriculum apps."""
from __future__ import annotations

import json
import os
import re
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
COMMON = ROOT / "common"
REPORT = ROOT / "QA_BLANK_MOUNT_FIXED.md"
SCAN_BASES = ("Secondary_School", "Primary_School")
SKIP = re.compile(r"[\\/](node_modules|dist|_archive|_legacy|venv)[\\/]", re.I)

BABEL_CDN = re.compile(r'@babel/standalone/babel\.min\.js', re.I)
LEARN_SCRIPT = re.compile(
    r'<script[^>]*\ssrc=["\'][^"\']*learn-from-zero\.js["\'][^>]*>\s*</script>\s*\n?',
    re.I,
)
LOCAL_LFZ = re.compile(r"function\s+LearnFromZero\s*\(")
JSLGER_REF = re.compile(r'src=["\']([^"\']*junior-science-lger\.js)["\']', re.I)
ORPHAN_FOOTER = re.compile(
    r'\n?<footer style="text-align:center;padding:1rem;font-size:0\.8rem;opacity:0\.7;">@HKSTEAMAI All Copy-Right Reserved\.</footer>',
    re.I,
)
BODY_F8 = re.compile(
    r'(body\s*\{[^}]*?)background:\s*#f8fafc([^}]*\})',
    re.I,
)
INLINE_BABEL = re.compile(r'<script(\s+[^>]*)?\s+type=["\']text/babel["\']', re.I)
BABEL_PRESET_INLINE = re.compile(r'Babel\.registerPreset\s*\(\s*["\']react-classic["\']', re.I)
BABEL_PRESET_FILE = "babel-react-classic.js"

BABEL_PRESET_SNIPPET = """  <script>
    Babel.registerPreset("react-classic", {
      presets: [[Babel.availablePresets.react, { runtime: "classic", pragma: "React.createElement", pragmaFrag: "React.Fragment" }]]
    });
  </script>"""

BABEL_TAG = re.compile(
    r'<script\s+src=["\']https://unpkg\.com/@babel/standalone/babel\.min\.js["\'][^>]*>\s*</script>',
    re.I,
)
BABEL_BROKEN = re.compile(
    r'<script\s+src=["\']https://unpkg\.com/@babel/standalone/babel\.min\.js\s*\n\s*'
    r'<script\s+src=["\']([^"\']*)["\']></script>["\']>\s*</script>',
    re.I | re.S,
)


def walk_apps() -> list[Path]:
    out: list[Path] = []
    for base in SCAN_BASES:
        root = ROOT / base
        if not root.is_dir():
            continue
        for dirpath, dirnames, filenames in os.walk(root):
            rel = str(Path(dirpath).relative_to(ROOT)).replace("\\", "/")
            if SKIP.search(rel):
                dirnames[:] = []
                continue
            dirnames[:] = [
                d
                for d in dirnames
                if d not in ("node_modules", "dist", "_archive", "_legacy", "venv")
                and not d.startswith("_legacy")
            ]
            if "index.html" in filenames:
                out.append(Path(dirpath) / "index.html")
    return sorted(out)


def rel_to_common(html_path: Path) -> str:
    app_dir = html_path.parent
    return os.path.relpath(COMMON, app_dir).replace("\\", "/")


def babel_common_tag(html_path: Path) -> str:
    return f'  <script src="{rel_to_common(html_path)}/babel-react-classic.js"></script>\n'


def resolve_ref(html_path: Path, ref: str) -> bool:
    try:
        return (html_path.parent / ref).resolve().is_file()
    except OSError:
        return False


def fix_file(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8", errors="replace")
    html = raw
    fixes: list[str] = []
    rel_common = rel_to_common(path)

    has_babel = bool(BABEL_CDN.search(html))
    has_local_lfz = bool(LOCAL_LFZ.search(html))
    has_lfz_script = "learn-from-zero.js" in html
    has_jslger = "junior-science-lger.js" in html
    uses_shell = "JSLGER.Shell" in html or "<Shell" in html

    if has_lfz_script and has_local_lfz:
        new = LEARN_SCRIPT.sub("", html)
        if new != html:
            html = new
            fixes.append("remove_learn_from_zero_collision")

    if has_jslger:
        m = JSLGER_REF.search(html)
        if m:
            ref = m.group(1)
            if not resolve_ref(path, ref):
                correct = f"{rel_common}/junior-science-lger.js"
                html = html.replace(ref, correct, 1)
                fixes.append(f"fix_jslger_path:{ref}->{correct}")

  # Repair prior broken injection (babel tag split across lines)
    if BABEL_BROKEN.search(html):
        def repair_babel(m: re.Match) -> str:
            ref = m.group(1).replace("/common/common/", "/common/")
            if not ref.endswith("babel-react-classic.js"):
                ref = f"{rel_common}/babel-react-classic.js"
            return (
                '  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>\n'
                f'  <script src="{ref}"></script>'
            )

        html = BABEL_BROKEN.sub(repair_babel, html, count=1)
        fixes.append("repair_broken_babel_tag")

    if has_babel and not BABEL_PRESET_INLINE.search(html):
        common_tag = babel_common_tag(path)
        if BABEL_PRESET_FILE not in html and "babel-react-classic.js" not in html:
            html = BABEL_TAG.sub(
                lambda m: m.group(0) + "\n" + common_tag.rstrip("\n"),
                html,
                count=1,
            )
            fixes.append("inject_babel_react_classic_common")

        def add_preset(m: re.Match) -> str:
            attrs = m.group(1) or ""
            if "data-presets" in attrs and "react-classic" in attrs:
                return m.group(0)
            if "data-presets" in attrs:
                return m.group(0)
            return f'<script{attrs} type="text/babel" data-presets="react-classic"'

        new = INLINE_BABEL.sub(add_preset, html)
        if new != html:
            html = new
            fixes.append("babel_data_presets_classic")

    if uses_shell and ORPHAN_FOOTER.search(html):
        html = ORPHAN_FOOTER.sub("", html)
        fixes.append("remove_orphan_footer_jslger")

    if has_jslger and BODY_F8.search(html):
        html = BODY_F8.sub(r"\1background: #f0f9ff\2", html)
        fixes.append("body_bg_f0f9ff_jslger")

    if html != raw:
        path.write_text(html, encoding="utf-8", newline="\n")
    return {"path": str(path.relative_to(ROOT)).replace("\\", "/"), "fixes": fixes}


def ensure_babel_common() -> None:
    p = COMMON / BABEL_PRESET_FILE
    if p.is_file():
        return
    p.write_text(
        """/* Register classic React JSX preset for @babel/standalone + CDN React 18 */
(function () {
  if (!window.Babel || !Babel.registerPreset || !Babel.availablePresets || !Babel.availablePresets.react) return;
  Babel.registerPreset("react-classic", {
    presets: [[Babel.availablePresets.react, { runtime: "classic", pragma: "React.createElement", pragmaFrag: "React.Fragment" }]]
  });
})();
""",
        encoding="utf-8",
    )


def write_report(rows: list[dict]) -> None:
    fixed = [r for r in rows if r["fixes"]]
    by_fix: dict[str, list[str]] = {}
    for r in fixed:
        for f in r["fixes"]:
            key = f.split(":")[0]
            by_fix.setdefault(key, []).append(r["path"])

    lines = [
        "# QA: Blank / React Mount Fixes",
        "",
        f"**Generated:** {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "## Patterns fixed",
        "",
        "| Pattern | Count | Action |",
        "|---------|------:|--------|",
    ]
    desc = {
        "remove_learn_from_zero_collision": "Dropped `learn-from-zero.js` where app defines local `LearnFromZero`",
        "fix_jslger_path": "Corrected `junior-science-lger.js` relative path",
        "inject_babel_react_classic_common": "Added `common/babel-react-classic.js` after Babel CDN",
        "babel_data_presets_classic": "Set `data-presets=\"react-classic\"` on `text/babel` scripts",
        "remove_orphan_footer_jslger": "Removed static HTML footer (Shell renders Footer in React)",
        "body_bg_f0f9ff_jslger": "Replaced body `#f8fafc` with `#f0f9ff` on JSLGER apps",
    }
    for key, paths in sorted(by_fix.items()):
        lines.append(f"| `{key}` | {len(paths)} | {desc.get(key, key)} |")

    lines.extend(["", f"**Total files touched:** {len(fixed)}", "", "## Reference patterns", ""])
    lines.extend(
        [
            "- **Air Composition** (`Junior Science/Form 2/04_Air_Composition`): JSLGER Shell, `#f0f9ff` body, footer inside Shell only",
            "- **Force Motion** (`Physics/Form 4/01_Force_Motion`): Babel classic preset, local TFZ steps, no stub `learn-from-zero.js`",
            "- **Circuit Builder** (`Physics/Form 5/06_Circuit_Builder`): `text/plain` + `Babel.transform` with `react-classic` (unchanged)",
            "",
            "## Files fixed",
            "",
        ]
    )
    for r in fixed:
        lines.append(f"- `{r['path']}` — {', '.join(r['fixes'])}")
    if not fixed:
        lines.append("_No files required changes._")

    REPORT.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    ensure_babel_common()
    rows = [fix_file(p) for p in walk_apps()]
    write_report(rows)
    n = sum(1 for r in rows if r["fixes"])
    print(json.dumps({"files_touched": n, "report": str(REPORT)}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
