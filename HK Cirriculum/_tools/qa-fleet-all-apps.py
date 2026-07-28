"""Fleet QA — rigorous scan of all curriculum web apps.
Run: python "HK Cirriculum/_tools/qa-fleet-all-apps.py" [--fix]
Outputs: QA_FLEET_ALL_APPS.json, QA_FLEET_ALL_APPS.md, QA_WONT_OPEN.md
"""
from __future__ import annotations

import json
import os
import random
import re
import shutil
import sys
import time
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import unquote
from urllib.error import URLError
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parent.parent
OUT_JSON = ROOT / "QA_FLEET_ALL_APPS.json"
OUT_MD = ROOT / "QA_FLEET_ALL_APPS.md"
OUT_WONT_OPEN = ROOT / "QA_WONT_OPEN.md"
VITE_SVG_SRC = ROOT / "Secondary_School/Biology/apps/transpiration-lab/public/vite.svg"
COMMON = ROOT / "common"
PLATFORM = ROOT.parent / "hksteamai-platform"
FOOTER_SNIPPET = "@HKSTEAMAI All Copy-Right Reserved."
FOOTER_HTML = (
    '<footer style="text-align:center;padding:1rem;font-size:0.8rem;opacity:0.7;">'
    + FOOTER_SNIPPET
    + "</footer>"
)
SKIP_DIR = re.compile(r"^(node_modules|dist|_archive|_legacy|workers|3D_War|\.git)$")
SKIP_PATH = re.compile(r"[\\/]_legacy|[\\/]node_modules[\\/]|[\\/]dist[\\/]|[\\/]_archive[\\/]", re.I)
LAUNCH_PACK = [
    "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc",
    "Secondary_School/Chemistry/Form 6/01_Le_Chatelier",
    "Secondary_School/Chemistry/Form 6/02_Titration_Curve",
    "Secondary_School/Physics/Form 5/06_Circuit_Builder",
    "Secondary_School/Physics/Form 4/04_Gas_Laws_Lab",
    "Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share",
]
VISIT_COUNTER = re.compile(r"visit[-_]?counter", re.I)
STUB_DRILL = re.compile(r'["\']en["\']\s*:\s*["\']g\d+["\']|{en:\s*["\']g\d+["\']', re.I)
STUB_EXAM = re.compile(r'["\']en["\']\s*:\s*["\']e\d+["\']|{en:\s*["\']e\d+["\']', re.I)
SHARED_SHELL_MARKERS = (
    "junior-science-lger.js",
    "interactive-lab-kit.js",
    "launch-pack-gap-fix",
    "function renderShell",
)


def walk_index(base_rel: str, acc: list[str] | None = None) -> list[str]:
    if acc is None:
        acc = []
    d = ROOT / base_rel.replace("/", os.sep)
    if not d.is_dir():
        return acc
    for e in os.scandir(d):
        rel_from_root = str(Path(e.path).relative_to(ROOT)).replace("\\", "/")
        if SKIP_PATH.search(rel_from_root):
            continue
        if e.is_dir(follow_symlinks=False):
            if SKIP_DIR.match(e.name) or e.name.startswith("_legacy"):
                continue
            walk_index(rel_from_root, acc)
        elif e.name == "index.html":
            acc.append(str(Path(e.path).parent.relative_to(ROOT)).replace("\\", "/"))
    return acc


def read_html(rel: str) -> tuple[str, int] | tuple[None, int]:
    idx = ROOT / rel.replace("/", os.sep) / "index.html"
    try:
        raw = idx.read_bytes()
        size = len(raw)
        try:
            html = raw.decode("utf-8")
        except UnicodeDecodeError:
            html = raw.decode("utf-8", errors="replace")
        return html, size
    except OSError:
        return None, 0


def head_section(html: str) -> str:
    m = re.search(r"<head[^>]*>([\s\S]*?)</head>", html, re.I)
    return m.group(1) if m else ""


def check_charset(html: str) -> list[str]:
    issues = []
    if "\ufffd" in html[:2000]:
        issues.append("utf8_replacement_char")
    head = head_section(html)
    if not re.search(r'<meta\s+charset=["\']UTF-8["\']', head, re.I):
        issues.append("missing_charset_meta")
    else:
        before_charset = re.split(r"<meta\s+charset", head, maxsplit=1, flags=re.I)[0]
        if re.search(r"<(script|link|style)\b", before_charset, re.I):
            issues.append("charset_not_first_in_head")
    return issues


def check_visit_counter(html: str) -> list[str]:
    return ["visit_counter_ref"] if VISIT_COUNTER.search(html) else []


def has_footer(html: str) -> bool:
    if FOOTER_SNIPPET in html:
        return True
    return any(m in html for m in SHARED_SHELL_MARKERS)


def check_stub_drills(html: str) -> list[str]:
    issues = []
    if STUB_DRILL.search(html):
        issues.append("stub_guided_drill")
    if STUB_EXAM.search(html):
        issues.append("stub_exam_drill")
    if re.search(r"const\s+GUIDED\s*=", html) and re.search(r"item\.opts\.map", html):
        m = re.search(r"const\s+GUIDED\s*=\s*\[([\s\S]{0,400}?)\]", html)
        if m and "opts" not in m.group(1):
            issues.append("guided_missing_opts")
    if re.search(r"const\s+EXAM\s*=", html) and re.search(r"item\.opts\.map", html):
        m = re.search(r"const\s+EXAM\s*=\s*\[([\s\S]{0,400}?)\]", html)
        if m and "opts" not in m.group(1):
            issues.append("exam_missing_opts")
    return issues


def check_learn_from_zero(html: str) -> list[str]:
    issues = []
    uses_lfz = bool(re.search(r"<LearnFromZero\b|LearnFromZero\s*\(", html))
    has_def = bool(
        re.search(
            r"function\s+LearnFromZero|const\s+LearnFromZero|LearnFromZero\s*=\s*\(",
            html,
        )
    )
    has_script = bool(re.search(r"learn-from-zero\.js", html, re.I))
    if uses_lfz and not has_def and not has_script:
        issues.append("learnfromzero_undefined")
    lines = html.splitlines()
    for i, line in enumerate(lines):
        if not re.search(r'mode\s*===\s*["\']learn["\']', line):
            continue
        t = line.strip()
        ok = (
            re.match(r"^\{\s*mode\s*===\s*['\"]learn['\"]", t)
            or re.match(r"^\{mode\s*===\s*['\"]learn['\"]\s*&&\s*<LearnFromZero", t)
        )
        if not ok:
            issues.append("tfz_corrupt_inject@L" + str(i + 1))
            break
    if re.search(r"<LearnFromZero[\s\S]{0,120}?/>\s*\}\)\s*\(", html):
        issues.append("tfz_corrupt_jsx_close")
    return issues


def body_stripped(html: str) -> str:
    m = re.search(r"<body[^>]*>([\s\S]*?)</body>", html, re.I)
    if not m:
        return ""
    body = re.sub(r"<script[\s\S]*?</script>", "", m.group(1), flags=re.I)
    body = re.sub(r"<footer[\s\S]*?</footer>", "", body, flags=re.I)
    body = re.sub(r"<!--[\s\S]*?-->", "", body)
    return re.sub(r"\s+", "", body)


def has_react_mount(html: str) -> bool:
    if re.search(r"createRoot|ReactDOM\.render", html):
        return True
    return bool(re.search(r'type="module"[^>]+src="\./assets/', html))


def check_open_fail(html: str, size: int, app_dir: Path) -> list[str]:
    """Heuristics for apps that won't open (blank, crash, 404, mount fail)."""
    issues: list[str] = []

    if size < 2048:
        issues.append("tiny_html_2k")

    bc = body_stripped(html)
    has_root = 'id="root"' in html or "id='root'" in html
    is_babel = 'type="text/babel"' in html
    if has_root and not has_react_mount(html) and not is_babel:
        issues.append("react_no_mount")
    if size < 2048 and bc in ("", '<divid="root"></div>') and not is_babel and not has_react_mount(html):
        issues.append("footer_only_shell")

    for m in re.finditer(r'(?:src|href)=["\'](/(?:tiles|assets|src)/[^"\']+)["\']', html, re.I):
        issues.append("abs_path_5173:" + m.group(1))
    if re.search(r'href=["\']/vite\.svg["\']', html) or re.search(r"src=['\"]/vite\\.svg['\"]", html):
        issues.append("abs_path_5173:/vite.svg")
    if re.search(r'src=["\']/src/', html):
        issues.append("abs_path_5173:/src/")

    if "./assets/" in html or 'src="./assets/' in html:
        assets = app_dir / "assets"
        if not assets.is_dir() or not any(assets.glob("*")):
            issues.append("vite_missing_assets")
    if "vite.svg" in html and not (app_dir / "vite.svg").is_file():
        issues.append("missing_vite_svg")

    lfz_defs = len(re.findall(r"function\s+LearnFromZero|const\s+LearnFromZero\s*=", html))
    has_lfz_script = "learn-from-zero.js" in html
    uses_lfz = bool(re.search(r"<LearnFromZero\b", html))
    if lfz_defs >= 2:
        issues.append("lfz_double_declare")
    elif lfz_defs >= 1 and has_lfz_script and is_babel:
        issues.append("lfz_babel_double")

    if uses_lfz and lfz_defs == 0 and not has_lfz_script:
        issues.append("learnfromzero_undefined")

    if is_babel:
        if not re.search(r"@babel/standalone", html):
            issues.append("babel_missing_standalone")
        if not re.search(r"createRoot|ReactDOM\.render", html):
            issues.append("babel_no_mount")

    if re.search(r"Archived thin Learn|Legacy thin Learn", html):
        issues.append("archive_stub_index")

    if (
        has_root
        and not has_react_mount(html)
        and "<style" in html
        and 'type="module"' not in html
        and not is_babel
        and size > 8000
    ):
        issues.append("css_only_shell")

    return list(dict.fromkeys(issues))


OPEN_FAIL_KEYS = (
    "read_fail",
    "zero_byte",
    "truncated",
    "broken_ref",
    "common_404",
    "stub_guided",
    "stub_exam",
    "guided_missing_opts",
    "exam_missing_opts",
    "learnfromzero_undefined",
    "tfz_corrupt",
    "react_no_mount",
    "footer_only_shell",
    "abs_path_5173",
    "vite_missing_assets",
    "missing_vite_svg",
    "lfz_double_declare",
    "lfz_babel_double",
    "babel_no_mount",
    "babel_missing_standalone",
    "archive_stub_index",
    "css_only_shell",
)

OPEN_FAIL_WEIGHTS = {
    "read_fail": 100,
    "zero_byte": 100,
    "archive_stub_index": 98,
    "css_only_shell": 95,
    "react_no_mount": 92,
    "vite_missing_assets": 90,
    "abs_path_5173": 88,
    "missing_vite_svg": 85,
    "stub_guided": 82,
    "stub_exam": 82,
    "broken_ref": 80,
    "common_404": 80,
    "learnfromzero_undefined": 78,
    "lfz_double_declare": 75,
    "lfz_babel_double": 72,
    "babel_no_mount": 70,
    "babel_missing_standalone": 68,
    "truncated": 65,
    "footer_only_shell": 60,
    "tiny_html_2k": 25,
}


def open_fail_score(issues: list[str]) -> int:
    score = 0
    for iss in issues:
        key = iss.split(":")[0]
        if key in OPEN_FAIL_WEIGHTS:
            score = max(score, OPEN_FAIL_WEIGHTS[key])
    return score


def is_wont_open(issues: list[str]) -> bool:
    return any(
        i == k or i.startswith(k + ":")
        for i in issues
        for k in OPEN_FAIL_KEYS
        if k != "tiny_html_2k"
    ) or (
        "tiny_html_2k" in issues
        and any(
            x in issues
            for x in (
                "react_no_mount",
                "footer_only_shell",
                "vite_missing_assets",
                "abs_path_5173",
                "css_only_shell",
            )
        )
    )


def sync_vite_from_dist(app_dir: Path) -> list[str]:
    fixes: list[str] = []
    dist = app_dir / "dist"
    if not dist.is_dir():
        return fixes

    if VITE_SVG_SRC.is_file():
        for target in (app_dir / "vite.svg", dist / "vite.svg"):
            if not target.is_file():
                shutil.copy2(VITE_SVG_SRC, target)
                fixes.append("copy_vite_svg")

    dist_assets = dist / "assets"
    if dist_assets.is_dir() and any(dist_assets.glob("*")):
        assets = app_dir / "assets"
        if assets.exists():
            shutil.rmtree(assets)
        shutil.copytree(dist_assets, assets)
        fixes.append("sync_dist_assets")

    dist_index = dist / "index.html"
    if dist_index.is_file():
        html = dist_index.read_text(encoding="utf-8")
        html = html.replace('href="/vite.svg"', 'href="./vite.svg"').replace("href='/vite.svg'", "href='./vite.svg'")
        html = re.sub(r'src="/assets/', 'src="./assets/', html)
        html = re.sub(r'href="/assets/', 'href="./assets/', html)
        html = re.sub(r'src="/src/', 'src="./assets/', html)
        cur = (app_dir / "index.html").read_text(encoding="utf-8") if (app_dir / "index.html").is_file() else ""
        if "./assets/" in html and html != cur:
            (app_dir / "index.html").write_text(html, encoding="utf-8")
            fixes.append("refresh_index_from_dist")
    return fixes


def resolve_common(app_dir: Path, u: str) -> bool:
    """Resolve any href/src pointing at common/ regardless of relative depth."""
    u = unquote(u.split("?")[0].split("#")[0])
    if "common/" not in u.replace("\\", "/"):
        return resolve_local(app_dir, u)
    tail = u[u.index("common/") :]
    # Walk up from app_dir looking for common/<tail>
    cur = app_dir.resolve()
    for _ in range(12):
        candidate = cur / tail
        if candidate.is_file():
            return True
        if cur.parent == cur:
            break
        cur = cur.parent
    return (COMMON / tail.split("common/", 1)[1]).is_file()


def resolve_local(app_dir: Path, u: str) -> bool:
    u = unquote(u.split("?")[0].split("#")[0])
    if "${" in u or "`" in u:
        return True
    if re.match(r"^(https?:|//|data:|mailto:|javascript:|#)", u, re.I):
        return True
    if "common/" in u.replace("\\", "/"):
        return resolve_common(app_dir, u)
    if u.startswith("/") and not u.startswith("//"):
        # Absolute from curriculum web root (vite dev server)
        root_target = (ROOT / u.lstrip("/")).resolve()
        if root_target.is_file():
            return True
        alt = "." + u
        if (app_dir / alt.lstrip("./")).resolve().is_file():
            return True
        return False
    target = (app_dir / u).resolve()
    if target.is_file():
        return True
    # Vite apps: built assets often live under dist/
    if (app_dir / "dist" / u.lstrip("./")).resolve().is_file():
        return True
    return False


def local_refs(html: str, app_dir: Path) -> tuple[list[str], list[str]]:
    missing = []
    common_broken = []
    for m in re.finditer(r'(?:src|href)=["\']([^"\']+)["\']', html, re.I):
        u = m.group(1).strip()
        if "${" in u or "`" in u:
            continue
        if re.match(r"^(https?:|//|data:|#|mailto:|javascript:)", u, re.I):
            continue
        if "common/" in u.replace("\\", "/"):
            if not resolve_common(app_dir, u):
                common_broken.append(u)
        elif re.search(r"\.(js|css|html|png|jpg|svg|woff2?)$", u, re.I):
            if not resolve_local(app_dir, u):
                missing.append(u)
    return list(dict.fromkeys(missing)), list(dict.fromkeys(common_broken))


def is_hub_page(rel: str) -> bool:
    base = rel.split("/")[-1]
    if re.match(r"^P\d$", base) or re.match(r"^Form\s", base, re.I):
        return True
    if rel.endswith("/index.html"):
        rel = rel.rsplit("/", 1)[0]
    parts = rel.split("/")
    return len(parts) <= 3 and not re.match(r"^\d{2}_", base)


def classify_issues(issues: list[str], size: int, html: str | None) -> str:
    if is_wont_open(issues):
        return "FAIL"
    for iss in issues:
        if any(
            k in iss
            for k in (
                "read_fail",
                "zero_byte",
                "truncated",
                "broken_ref",
                "common_404",
                "stub_guided",
                "stub_exam",
                "guided_missing_opts",
                "exam_missing_opts",
                "learnfromzero_undefined",
                "tfz_corrupt",
            )
        ):
            return "FAIL"
    if size < 3072 or "thin_stub" in issues:
        return "WARN"
    if issues:
        return "WARN"
    return "PASS"


def priority_bucket(issues: list[str], status: str) -> str:
    if status == "FAIL":
        return "P0"
    p1 = ("thin_stub", "tiny_html", "missing_learn", "no_tfz")
    for iss in issues:
        if any(k in iss for k in p1):
            return "P1"
    if issues:
        return "P2"
    return "PASS"


def safe_fix(rel: str, html: str) -> tuple[str, list[str]]:
    fixes = []
    app_dir = ROOT / rel.replace("/", os.sep)

    if "<!-- Visit Counter -->" in html:
        html = re.sub(r"<!--\s*Visit Counter\s*-->", "", html, flags=re.I)
        fixes.append("strip_visit_counter_comment")

    if VISIT_COUNTER.search(html):
        html = VISIT_COUNTER.sub("", html)
        fixes.append("strip_visit_counter")

    if "../../../../../common/" in html and "/Biology/apps/" in rel.replace("\\", "/"):
        html = html.replace("../../../../../common/", "../../../../common/")
        fixes.append("fix_common_depth_biology")
    elif "../../../../common/" in html and "/Geography/" in rel and "/lessons/" in rel:
        # Geography lessons need 5 hops to HK Cirriculum/common
        if not resolve_common(app_dir, "../../../../common/learn-from-zero.js"):
            html = html.replace("../../../../common/", "../../../../../common/")
            fixes.append("fix_common_depth_geography")

    head = head_section(html)
    if not re.search(r'<meta\s+charset=["\']UTF-8["\']', head, re.I):
        if re.search(r"<head[^>]*>", html, re.I):
            html = re.sub(
                r"(<head[^>]*>)",
                r'\1\n  <meta charset="UTF-8" />',
                html,
                count=1,
                flags=re.I,
            )
            fixes.append("inject_charset")

    if not has_footer(html):
        if re.search(r"</body>", html, re.I):
            html = re.sub(
                r"</body>",
                FOOTER_HTML + "\n</body>",
                html,
                count=1,
                flags=re.I,
            )
            fixes.append("inject_footer")

    if 'href="/vite.svg"' in html or "href='/vite.svg'" in html:
        html = html.replace('href="/vite.svg"', 'href="./vite.svg"').replace("href='/vite.svg'", "href='./vite.svg'")
        fixes.append("fix_vite_svg_path")

    abs_before = bool(re.search(r'(?:src|href)=["\']/(?:assets|tiles|src)/', html))
    html = re.sub(r'src="/assets/', 'src="./assets/', html)
    html = re.sub(r'href="/assets/', 'href="./assets/', html)
    html = re.sub(r'src="/tiles/', 'src="./tiles/', html)
    html = re.sub(r'href="/tiles/', 'href="./tiles/', html)
    if abs_before:
        fixes.append("fix_abs_paths_5173")

    if re.search(r'src=["\']/src/main\.jsx["\']', html):
        vite_fixes = sync_vite_from_dist(app_dir)
        if vite_fixes:
            fixes.extend(vite_fixes)
            html = (app_dir / "index.html").read_text(encoding="utf-8")
        else:
            html = re.sub(r'src=["\']/src/main\.jsx["\']', 'src="./assets/index.js"', html)
            fixes.append("strip_dev_main_ref")

    if "./assets/" in html or 'src="./assets/' in html:
        assets = app_dir / "assets"
        if not assets.is_dir() or not any(assets.glob("*")):
            vite_fixes = sync_vite_from_dist(app_dir)
            if vite_fixes:
                fixes.extend(vite_fixes)
                html = (app_dir / "index.html").read_text(encoding="utf-8")

    if "vite.svg" in html and not (app_dir / "vite.svg").is_file():
        dist_svg = app_dir / "dist" / "vite.svg"
        if dist_svg.is_file():
            shutil.copy2(dist_svg, app_dir / "vite.svg")
            fixes.append("copy_vite_svg_from_dist")
        elif VITE_SVG_SRC.is_file():
            shutil.copy2(VITE_SVG_SRC, app_dir / "vite.svg")
            fixes.append("copy_vite_svg")

    return html, fixes


def smoke_fetch(base_url: str, rel: str) -> dict:
    url = base_url.rstrip("/") + "/" + rel.replace(" ", "%20") + "/index.html"
    try:
        with urlopen(url, timeout=8) as resp:
            return {"url": url, "ok": 200 <= resp.getcode() < 400, "status": resp.getcode()}
    except Exception as e:
        return {"url": url, "ok": False, "error": str(e)}


def server_up(base: str = "http://localhost:5173") -> bool:
    try:
        with urlopen(base + "/", timeout=3) as resp:
            return 200 <= resp.getcode() < 500
    except Exception:
        return False


def check_platform() -> dict:
    out = {"ok": True, "checks": []}
    map_path = PLATFORM / "data" / "curriculum-map.json"
    if map_path.is_file():
        try:
            data = json.loads(map_path.read_text(encoding="utf-8"))
            n = len(data.get("modules") or [])
            out["checks"].append({"name": "curriculum-map.json", "ok": n > 0, "modules": n})
        except Exception as e:
            out["checks"].append({"name": "curriculum-map.json", "ok": False, "error": str(e)})
            out["ok"] = False
    else:
        out["checks"].append({"name": "curriculum-map.json", "ok": False, "error": "missing"})
        out["ok"] = False
    lib = PLATFORM / "src" / "app" / "library" / "page.tsx"
    out["checks"].append({"name": "library/page.tsx", "ok": lib.is_file()})
    ent = PLATFORM / "src" / "lib" / "entitlements.ts"
    out["checks"].append({"name": "entitlements.ts", "ok": ent.is_file()})
    if not all(c.get("ok") for c in out["checks"]):
        out["ok"] = False
    return out


def main() -> int:
    do_fix = "--fix" in sys.argv
    t0 = time.time()
    folders = []
    for base in ("Primary_School", "Secondary_School"):
        walk_index(base, folders)
    folders.sort()

    results = []
    fixes_applied = []

    for rel in folders:
        html, size = read_html(rel)
        app_dir = ROOT / rel.replace("/", os.sep)
        issues: list[str] = []

        if html is None:
            results.append({"rel": rel, "status": "FAIL", "priority": "P0", "size": 0, "issues": ["read_fail"]})
            continue
        if size == 0:
            issues.append("zero_byte")
        if size < 500:
            issues.append("truncated")
        if size < 3072:
            issues.append("thin_stub")

        issues.extend(check_charset(html))
        issues.extend(check_visit_counter(html))
        if not has_footer(html):
            issues.append("footer_missing")
        issues.extend(check_stub_drills(html))
        issues.extend(check_learn_from_zero(html))
        issues.extend(check_open_fail(html, size, app_dir))

        missing, common_broken = local_refs(html, app_dir)
        if missing and not is_hub_page(rel):
            issues.append("broken_ref:" + ",".join(missing[:5]))
        if common_broken:
            issues.append("common_404:" + ",".join(common_broken[:5]))

        if issues and re.search(r'http-equiv=["\']refresh["\']', html, re.I):
            only_redirect = all(
                i in ("thin_stub",) or i.startswith("broken_ref")
                for i in issues
            )
            if only_redirect and not common_broken:
                issues = [i for i in issues if not i.startswith("broken_ref")]
                if "thin_stub" in issues and size > 200:
                    issues.remove("thin_stub")

        if do_fix:
            new_html, fixes = safe_fix(rel, html)
            if fixes:
                (app_dir / "index.html").write_text(new_html, encoding="utf-8")
                fixes_applied.append({"rel": rel, "fixes": fixes})
                html, size = read_html(rel)
                html = html or ""
                issues = []
                if size == 0:
                    issues.append("zero_byte")
                if size < 500:
                    issues.append("truncated")
                if size < 3072:
                    issues.append("thin_stub")
                issues.extend(check_charset(html))
                issues.extend(check_visit_counter(html))
                if not has_footer(html):
                    issues.append("footer_missing")
                issues.extend(check_stub_drills(html))
                issues.extend(check_learn_from_zero(html))
                issues.extend(check_open_fail(html, size, app_dir))
                missing, common_broken = local_refs(html, app_dir)
                if missing and not is_hub_page(rel):
                    issues.append("broken_ref:" + ",".join(missing[:5]))
                if common_broken:
                    issues.append("common_404:" + ",".join(common_broken[:5]))

        status = classify_issues(issues, size, html)
        priority = priority_bucket(issues, status)
        wont = is_wont_open(issues)
        results.append(
            {
                "rel": rel,
                "status": status,
                "priority": priority,
                "size": size,
                "issues": issues,
                "wontOpen": wont,
                "openFailScore": open_fail_score(issues) if wont else 0,
            }
        )

    totals = {"PASS": 0, "FAIL": 0, "WARN": 0}
    for r in results:
        totals[r["status"]] = totals.get(r["status"], 0) + 1

    p0 = [r for r in results if r["priority"] == "P0"]
    p1 = [r for r in results if r["priority"] == "P1"]
    p2 = [r for r in results if r["priority"] == "P2"]
    wont_open = [r for r in results if r.get("wontOpen")]
    wont_open.sort(key=lambda r: (-r.get("openFailScore", 0), r["rel"]))

    class_counts: Counter[str] = Counter()
    for r in wont_open:
        for iss in r["issues"]:
            key = iss.split(":")[0]
            if key in OPEN_FAIL_WEIGHTS or key in ("broken_ref", "common_404", "stub_guided_drill", "stub_exam_drill"):
                class_counts[key] += 1

    rng = random.Random(42)
    sample_pool = [r["rel"] for r in results if r["status"] != "FAIL"]
    smoke_sample = rng.sample(sample_pool, min(15, len(sample_pool)))
    smoke_targets = list(dict.fromkeys(LAUNCH_PACK + smoke_sample))

    base_url = "http://localhost:5173"
    smoke = []
    if server_up():
        for rel in smoke_targets:
            smoke.append({"rel": rel, **smoke_fetch(base_url, rel)})
    else:
        for rel in smoke_targets:
            idx = ROOT / rel.replace("/", os.sep) / "index.html"
            smoke.append({"rel": rel, "ok": idx.is_file(), "mode": "disk_only"})

    platform = check_platform()
    launch_results = []
    for lp in LAUNCH_PACK:
        row = next((r for r in results if r["rel"] == lp), None)
        sm = next((s for s in smoke if s["rel"] == lp), None)
        launch_results.append(
            {
                "rel": lp,
                "status": row["status"] if row else "FAIL",
                "issues": (row or {}).get("issues", ["missing"]),
                "smoke": sm,
            }
        )
    launch_pass = all(x["status"] == "PASS" for x in launch_results)

    p0_rate = len(p0) / len(results) if results else 0
    soft_go = launch_pass and len(p0) == 0 and p0_rate < 0.02 and platform["ok"]

    report = {
        "generatedAt": datetime.now(timezone.utc).isoformat(),
        "scanned": len(results),
        "totals": totals,
        "p0": len(p0),
        "p1": len(p1),
        "p2": len(p2),
        "launchPack": launch_results,
        "launchPass": launch_pass,
        "platform": platform,
        "smoke": {"serverUp": server_up(), "tested": len(smoke), "passed": sum(1 for s in smoke if s.get("ok")), "results": smoke},
        "fixesApplied": fixes_applied,
        "verdict": "GO" if soft_go else "NO-GO",
        "apps": results,
        "topP0": [{"rel": r["rel"], "issues": r["issues"]} for r in p0[:20]],
        "wontOpen": len(wont_open),
        "wontOpenByClass": dict(class_counts.most_common()),
        "topWontOpen": [
            {"rel": r["rel"], "score": r.get("openFailScore", 0), "issues": r["issues"]}
            for r in wont_open[:30]
        ],
    }

    OUT_JSON.write_text(json.dumps(report, indent=2), encoding="utf-8")

    md = []
    md.append("# QA Fleet — All Apps")
    md.append("")
    md.append("**Generated:** " + report["generatedAt"])
    md.append("**Script:** `_tools/qa-fleet-all-apps.py`")
    md.append("")
    md.append("## Checks (hard QA)")
    md.append("")
    md.append("1. UTF-8 + `<meta charset=\"UTF-8\">` in `<head>`")
    md.append("2. No `visit-counter` references")
    md.append("3. Footer `@HKSTEAMAI All Copy-Right Reserved.` (or shared shell)")
    md.append("4. No stub GUIDED/EXAM drills (`\"en\": \"g1\"` / missing `opts`)")
    md.append("5. No undefined `LearnFromZero` / corrupt TFZ mid-JSX inject")
    md.append("6. `common/` script paths resolve")
    md.append("7. Local `href`/`src` resolve on disk (incl. `dist/` vite builds)")
    md.append("8. File size stub gate (<3 KB suspicious)")
    md.append("9. **OPEN-FAIL:** tiny HTML, footer-only shell, abs `/assets|/tiles|/src`, missing Vite bundle, React no-mount, LFZ double-declare, css-only shell")
    md.append("10. Smoke: 15 random + all 6 launch-pack apps (HTTP 200 @ localhost:5173)")
    md.append("")
    md.append("## Summary")
    md.append("")
    md.append("| Metric | Count |")
    md.append("|--------|------:|")
    md.append("| **Total apps scanned** | **" + str(len(results)) + "** |")
    md.append("| PASS | " + str(totals.get("PASS", 0)) + " |")
    md.append("| FAIL (P0) | " + str(totals.get("FAIL", 0)) + " |")
    md.append("| WARN (P1/P2) | " + str(totals.get("WARN", 0)) + " |")
    md.append("| P0 bucket | " + str(len(p0)) + " |")
    md.append("| P1 bucket | " + str(len(p1)) + " |")
    md.append("| P2 bucket | " + str(len(p2)) + " |")
    md.append("")
    md.append("## CEO one-line verdict")
    md.append("")
    md.append(
        "> **Soft-launch: "
        + report["verdict"]
        + "** · "
        + str(totals.get("PASS", 0))
        + "/"
        + str(len(results))
        + " PASS · P0="
        + str(len(p0))
        + " · Launch pack "
        + ("6/6" if launch_pass else "FAIL")
    )
    md.append("")
    md.append("## Launch pack")
    md.append("")
    md.append("| Path | Status | Smoke | Issues |")
    md.append("|------|--------|-------|--------|")
    for lp in launch_results:
        sm = lp.get("smoke") or {}
        smoke_s = "disk" if sm.get("mode") == "disk_only" else ("HTTP " + str(sm.get("status", "—")) if sm.get("ok") else "FAIL")
        md.append(
            "| `"
            + lp["rel"]
            + "` | "
            + lp["status"]
            + " | "
            + smoke_s
            + " | "
            + ("; ".join(lp["issues"][:3]) if lp["issues"] else "—")
            + " |"
        )
    md.append("")
    md.append("## Platform (`hksteamai-platform`)")
    md.append("")
    for c in platform["checks"]:
        md.append("- **" + c["name"] + ":** " + ("OK" if c.get("ok") else "FAIL " + str(c.get("error", ""))))
    md.append("")
    md.append("## Smoke sample (" + str(len(smoke)) + " apps)")
    md.append("")
    md.append("- Server: " + ("up @ localhost:5173" if report["smoke"]["serverUp"] else "down — disk existence only"))
    md.append("- Passed: **" + str(report["smoke"]["passed"]) + "/" + str(report["smoke"]["tested"]) + "**")
    md.append("")
    if fixes_applied:
        md.append("## Auto-fixes applied (" + str(len(fixes_applied)) + ")")
        md.append("")
        for f in fixes_applied[:30]:
            md.append("- `" + f["rel"] + "` → " + ", ".join(f["fixes"]))
        if len(fixes_applied) > 30:
            md.append("- … +" + str(len(fixes_applied) - 30) + " more")
        md.append("")
    md.append("## Top 20 P0 — repair squad")
    md.append("")
    for i, r in enumerate(p0[:20], 1):
        md.append(str(i) + ". `" + r["rel"] + "` — " + "; ".join(r["issues"]))
    if not p0:
        md.append("_None — fleet P0 clear._")
    md.append("")
    md.append("## P1 — thin / stub content (" + str(len(p1)) + ")")
    md.append("")
    for r in p1[:40]:
        md.append("- `" + r["rel"] + "` (" + str(r["size"]) + " B) — " + "; ".join(r["issues"][:4]))
    if len(p1) > 40:
        md.append("- … +" + str(len(p1) - 40) + " more (see JSON)")
    md.append("")
    md.append("## P2 — cosmetic (" + str(len(p2)) + ")")
    md.append("")
    for r in p2[:25]:
        md.append("- `" + r["rel"] + "` — " + "; ".join(r["issues"][:3]))
    if len(p2) > 25:
        md.append("- … +" + str(len(p2) - 25) + " more")
    md.append("")
    md.append("---")
    md.append("*Elapsed: " + str(int(time.time() - t0)) + "s*")
    OUT_MD.write_text("\n".join(md) + "\n", encoding="utf-8")

    wmd = []
    wmd.append("# QA — Apps That Won't Open")
    wmd.append("")
    wmd.append("**Generated:** " + report["generatedAt"])
    wmd.append("**Script:** `_tools/qa-fleet-all-apps.py` (OPEN-FAIL heuristics)")
    wmd.append("")
    wmd.append("## CEO summary")
    wmd.append("")
    wmd.append(
        "> **Won't-open fleet: "
        + str(len(wont_open))
        + " / "
        + str(len(results))
        + " apps** · Auto-fixed this run: "
        + str(len(fixes_applied))
        + " · Repair squad handoff: top "
        + str(min(30, len(wont_open)))
    )
    wmd.append("")
    wmd.append("## Count by failure class")
    wmd.append("")
    wmd.append("| Failure class | Count |")
    wmd.append("|---------------|------:|")
    for cls, n in class_counts.most_common():
        wmd.append("| `" + cls + "` | " + str(n) + " |")
    if not class_counts:
        wmd.append("| _none_ | 0 |")
    wmd.append("")
    wmd.append("## Top 20 paths (ranked P0)")
    wmd.append("")
    for i, r in enumerate(wont_open[:20], 1):
        open_issues = [i for i in r["issues"] if i.split(":")[0] in OPEN_FAIL_WEIGHTS or i.startswith("broken_ref") or i.startswith("common_404")]
        wmd.append(
            str(i)
            + ". `"
            + r["rel"]
            + "` — **"
            + "; ".join(open_issues[:4])
            + "** (score "
            + str(r.get("openFailScore", 0))
            + ")"
        )
    if not wont_open:
        wmd.append("_None — all apps pass OPEN-FAIL gate._")
    wmd.append("")
    wmd.append("## Repair squad handoff — top 30")
    wmd.append("")
    wmd.append("| # | Path | Score | Failure class(es) |")
    wmd.append("|---|------|------:|-------------------|")
    for i, r in enumerate(wont_open[:30], 1):
        open_issues = [x.split(":")[0] for x in r["issues"] if x.split(":")[0] in OPEN_FAIL_WEIGHTS or x.startswith("broken_ref")]
        wmd.append(
            "| "
            + str(i)
            + " | `"
            + r["rel"]
            + "` | "
            + str(r.get("openFailScore", 0))
            + " | "
            + ", ".join(dict.fromkeys(open_issues[:5]))
            + " |"
        )
    wmd.append("")
    if fixes_applied:
        wmd.append("## Auto-fixes applied (" + str(len(fixes_applied)) + ")")
        wmd.append("")
        for f in fixes_applied[:40]:
            wmd.append("- `" + f["rel"] + "` → " + ", ".join(f["fixes"]))
        if len(fixes_applied) > 40:
            wmd.append("- … +" + str(len(fixes_applied) - 40) + " more")
        wmd.append("")
    wmd.append("## Heuristics")
    wmd.append("")
    wmd.append("1. `index.html` < 2 KB **and** footer-only body (no React mount)")
    wmd.append("2. Absolute `/tiles/`, `/assets/`, `/src/`, `/vite.svg` (break under Vite dev @5173)")
    wmd.append("3. `LearnFromZero` double-declare (`learn-from-zero.js` + inline Babel def)")
    wmd.append("4. Missing `common/` script when `<LearnFromZero>` referenced")
    wmd.append("5. Stub GUIDED/EXAM (`\"en\": \"g1\"`) → Guided tab crash")
    wmd.append("6. Vite shell missing `./assets/*` or `./vite.svg`")
    wmd.append("7. `#root` present but no `createRoot` / module bundle")
    wmd.append("")
    wmd.append("---")
    wmd.append("*See `QA_FLEET_ALL_APPS.json` for full fleet.*")
    OUT_WONT_OPEN.write_text("\n".join(wmd) + "\n", encoding="utf-8")

    print(
        json.dumps(
            {
                "scanned": len(results),
                "PASS": totals.get("PASS"),
                "FAIL": totals.get("FAIL"),
                "WARN": totals.get("WARN"),
                "p0": len(p0),
                "verdict": report["verdict"],
                "wontOpen": len(wont_open),
                "fixes": len(fixes_applied),
                "json": str(OUT_JSON),
                "md": str(OUT_MD),
                "wontOpenMd": str(OUT_WONT_OPEN),
                "elapsedSec": int(time.time() - t0),
            },
            indent=2,
        )
    )
    return 0 if soft_go else 1


if __name__ == "__main__":
    sys.exit(main())
