"""CHECK ALL — full inventory QA sweep. Run: python _tools/qa-check-all.py"""
import json, os, re, subprocess, sys
from pathlib import Path
from urllib.request import urlopen
from urllib.error import URLError

ROOT = Path(__file__).resolve().parent.parent
OUT_MD = ROOT / "QA_CHECK_ALL.md"
OUT_JSON = Path(__file__).resolve().parent / "_qa_check_all.json"
SKIP_DIR = re.compile(r"^(node_modules|dist|_archive|_legacy|workers|3D_War|\.git)$")
SKIP_PATH = re.compile(r"[\\/]_legacy|[\\/]node_modules[\\/]|[\\/]workers[\\/]", re.I)
APP_RE = re.compile(r"/\d{2}_[^/]+$|/lessons/\d{2}_")
LAUNCH_PACK = [
    "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc",
    "Secondary_School/Chemistry/Form 6/01_Le_Chatelier",
    "Secondary_School/Chemistry/Form 6/02_Titration_Curve",
    "Secondary_School/Physics/Form 5/06_Circuit_Builder",
    "Secondary_School/Physics/Form 4/04_Gas_Laws_Lab",
    "Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share",
]
KC_PATH = LAUNCH_PACK[0]
HUB_FILES = ["Secondary_School/index.html", "Primary_School/index.html"]

def walk_index(base_rel, acc=None):
    if acc is None: acc = []
    d = ROOT / base_rel.replace("/", os.sep)
    if not d.is_dir():
        return acc
    for e in os.scandir(d):
        rel = e.path.replace("\\", "/")
        rel_from_root = str(Path(rel).relative_to(ROOT)).replace("\\", "/")
        if SKIP_PATH.search(rel_from_root):
            continue
        if e.is_dir(follow_symlinks=False):
            if SKIP_DIR.match(e.name) or e.name.startswith("_legacy"):
                continue
            walk_index(rel_from_root, acc)
        elif e.name == "index.html":
            acc.append(str(Path(rel).parent.relative_to(ROOT)).replace("\\", "/"))
    return acc

def is_hub(rel):
    if APP_RE.search(rel):
        return False
    base = rel.split("/")[-1]
    if re.match(r"^Form\s", base, re.I) or re.match(r"^P\d$", base, re.I) or base in ("M1", "M2"):
        return True
    parts = rel.split("/")
    if len(parts) == 2:
        return True
    if len(parts) == 3 and not APP_RE.search(rel):
        return True
    if re.search(r"Drill_Hub|_INDEX|portal", rel, re.I):
        return True
    return not APP_RE.search(rel) and len(parts) <= 4 and not re.match(r"^\d{2}_", base)

def local_missing_refs(html, app_dir):
    missing = []
    for m in re.finditer(r'(?:src|href)=["\']([^"\']+\.(?:js|css|html))["\']', html, re.I):
        u = m.group(1)
        if re.match(r"^(https?:|//|data:|#)", u):
            continue
        u = u.split("?")[0].split("#")[0]
        target = (app_dir / u).resolve()
        if not target.is_file():
            missing.append(u)
    return missing

def learn_nonempty(html):
    learn_null = bool(re.search(r"function LearnExtra\s*\(\s*\)\s*\{\s*return null", html)) or bool(
        re.search(r"LearnExtra\s*=\s*null|learnExtra:\s*null", html, re.I)
    )
    if learn_null:
        return False, "LearnExtra_null"
    has_learn_mode = bool(re.search(r'mode\s*===\s*["\']learn["\']|id:\s*["\']learn["\']', html, re.I))
    has_learn_body = bool(
        re.search(
            r"LEARN_STEPS|LearnFromZero|LearnLab|lab-learn-ramp|LabLearnRamp|function Learn\b|const LEARN\s*=",
            html,
            re.I,
        )
    )
    has_learn_extra = "function LearnExtra" in html
    interactive_primary = bool(re.search(r"Warm-up|STEPS|ORDER|picked\.length", html, re.I)) and len(html) > 2500
    if has_learn_extra:
        m = re.search(r"function LearnExtra\s*\([^)]*\)\s*\{([\s\S]{0,800}?)\n\s*\}", html)
        if m and len(re.sub(r"\s+", " ", m.group(1)).strip()) < 40:
            return False, "LearnExtra_thin"
        return True, "LearnExtra"
    if has_learn_body:
        return True, "LearnBody"
    if interactive_primary:
        return True, "PrimaryInteractive"
    if has_learn_mode:
        return False, "Learn_mode_empty"
    return False, "NO_LEARN"

def classify_app(rel, html, size):
    app_dir = ROOT / rel.replace("/", os.sep)
    idx = app_dir / "index.html"
    if not idx.is_file():
        return "BROKEN", ["missing_index"]
    if size == 0:
        return "BROKEN", ["zero_byte"]
    if len(html) < 500:
        return "BROKEN", ["truncated_html"]
    missing = local_missing_refs(html, app_dir)
    if missing:
        return "BROKEN", ["script_404:" + ",".join(missing[:3])]
    learn_ok, learn_why = learn_nonempty(html)
    learn_extra_null = bool(re.search(r"function LearnExtra\s*\(\s*\)\s*\{\s*return null|LearnExtra\s*=\s*null", html))
    tfz = bool(re.search(r"LearnFromZero|learn-from-zero", html, re.I))
    ramp = bool(re.search(r"lab-learn-ramp|LabLearnRamp|HkcLabLearnRamp", html, re.I))
    steps = bool(re.search(r"LEARN_STEPS|learnSteps|storyboard", html, re.I))
    multi_a = len(re.findall(r'id:\s*["\']A\d+["\']', html)) >= 3
    canvas = bool(re.search(r"<canvas|getContext\(|manipulative|chamber|RateCanvas", html, re.I))
    key_ideas = bool(re.search(r"keyIdeas|Key ideas|key-ideas", html, re.I))
    has_learn_mode = bool(re.search(r'mode\s*===\s*["\']learn["\']|id:\s*["\']learn["\']', html, re.I))
    if learn_extra_null and not tfz and not ramp:
        return "BROKEN", ["LearnExtra_null"]
    if not learn_ok and has_learn_mode and not tfz and not ramp and len(html) < 4000:
        return "BROKEN", ["empty_learn:" + learn_why]
    if tfz or ramp or steps or multi_a:
        tags = [t for t in [("LearnFromZero" if tfz else None), ("lab-learn-ramp" if ramp else None), ("storyboard" if steps or multi_a else None)] if t]
        return "TFZ_LIKELY", tags
    if key_ideas and not canvas and len(html) < 8000:
        return "THIN", ["key_ideas_wall"]
    if len(html) < 2000:
        return "THIN", ["tiny_html"]
    if not learn_ok:
        return "THIN", ["thin_learn:" + learn_why]
    return "THIN", ["no_tfz_ramp"]

def check_kc():
    idx = ROOT / KC_PATH.replace("/", os.sep) / "index.html"
    if not idx.is_file():
        return False, [], list("A" + str(i) for i in range(1, 9))
    html = idx.read_text(encoding="utf-8", errors="replace")
    found, missing = [], []
    for i in range(1, 9):
        aid = "A" + str(i)
        if re.search(r'id:\s*["\']' + aid + r'["\']', html):
            found.append(aid)
        else:
            missing.append(aid)
    return len(missing) == 0, found, missing

def launch_pack_results():
    rows = []
    for rel in LAUNCH_PACK:
        idx = ROOT / rel.replace("/", os.sep) / "index.html"
        exists = idx.is_file()
        panel = None
        for name in ("STUDENT_PANEL_30.md", "STUDENT_PANEL_15.md"):
            p = ROOT / rel.replace("/", os.sep) / name
            if p.is_file():
                txt = p.read_text(encoding="utf-8", errors="replace")
                m = re.search(r"(\d{2,3})%", txt)
                panel = {"file": name, "pct": m.group(1) if m else "?"}
                break
        if not exists:
            rows.append({"rel": rel, "pass": False, "class": "MISSING", "panel": panel, "reasons": []})
            continue
        html = idx.read_text(encoding="utf-8", errors="replace")
        size = idx.stat().st_size
        cls, reasons = classify_app(rel, html, size)
        ok = cls == "TFZ_LIKELY"
        rows.append({"rel": rel, "pass": ok, "class": cls, "panel": panel, "reasons": reasons})
    return rows

def read_billing():
    txt = (ROOT / "common" / "billing-config.js").read_text(encoding="utf-8", errors="replace")
    links = {}
    for key in ("parentMonthly", "parentAnnual", "familyMonthly", "familyAnnual"):
        m = re.search(key + r':\s*"([^"]*)"', txt)
        links[key] = (m.group(1).strip() if m else "")
    m = re.search(r'var ENTITLEMENT_API_BASE\s*=\s*"([^"]*)"', txt)
    api = m.group(1).strip() if m else ""
    return links, api

def health_check(api_base):
    if not api_base:
        return {"ok": False, "status": None, "error": "no_api_base"}
    url = api_base.rstrip("/") + "/api/health"
    try:
        with urlopen(url, timeout=15) as resp:
            code = resp.getcode()
            if 200 <= code < 400:
                return {"ok": True, "status": code, "url": url}
    except Exception:
        pass
    try:
        out = subprocess.check_output(
            ["curl.exe", "-sS", "-o", "NUL", "-w", "%{http_code}", url],
            text=True, timeout=20, stderr=subprocess.DEVNULL,
        )
        code = int(str(out).strip())
        return {"ok": 200 <= code < 400, "status": code, "url": url}
    except Exception as e:
        return {"ok": False, "status": None, "error": str(e), "url": url}


def hub_links(hub_rel):
    hub_path = ROOT / hub_rel.replace("/", os.sep)
    if not hub_path.is_file():
        return hub_rel, 0, ["MISSING_HUB"]
    html = hub_path.read_text(encoding="utf-8", errors="replace")
    hub_dir = hub_path.parent
    broken, checked = [], 0
    for m in re.finditer(r"href=\"([^\"'#?]+)\"", html, re.I):
        u = m.group(1).strip()
        if re.match(r"^(https?:|mailto:|javascript:)", u, re.I):
            continue
        if u.startswith("#"):
            continue
        checked += 1
        target = (hub_dir / u.split("?")[0]).resolve()
        if not target.exists():
            broken.append(u)
    return hub_rel, checked, broken

def discover_hubs():
    hubs = list(HUB_FILES)
    for school in ("Secondary_School", "Primary_School"):
        sd = ROOT / school
        if not sd.is_dir():
            continue
        for subj in os.scandir(sd):
            if not subj.is_dir() or SKIP_DIR.match(subj.name):
                continue
            hub = Path(subj.path) / "index.html"
            if hub.is_file():
                hubs.append(str(hub.relative_to(ROOT)).replace("\\", "/"))
    return sorted(set(hubs))

def fix_obvious_broken(broken_rows):
    fixed = []
    if len(broken_rows) >= 20:
        return fixed
    for row in broken_rows:
        rel = row["rel"]
        reasons = row.get("reasons") or []
        if not any("zero_byte" in r or "truncated" in r for r in reasons):
            continue
        idx = ROOT / rel.replace("/", os.sep) / "index.html"
        if idx.is_file() and idx.stat().st_size == 0:
            continue
    return fixed

def main():
    import time
    t0 = time.time()
    folders = []
    for base in ("Secondary_School", "Primary_School"):
        walk_index(base, folders)
    folders.sort()
    results = []
    for rel in folders:
        idx = ROOT / rel.replace("/", os.sep) / "index.html"
        try:
            html = idx.read_text(encoding="utf-8", errors="replace")
            size = idx.stat().st_size
        except OSError:
            results.append({"rel": rel, "hub": is_hub(rel), "class": "BROKEN", "reasons": ["read_fail"]})
            continue
        if is_hub(rel):
            results.append({"rel": rel, "hub": True, "class": "HUB", "reasons": []})
            continue
        cls, reasons = classify_app(rel, html, size)
        results.append({"rel": rel, "hub": False, "class": cls, "reasons": reasons})
    apps = [r for r in results if not r.get("hub")]
    totals = {"HUB": 0, "BROKEN": 0, "THIN": 0, "TFZ_LIKELY": 0}
    for r in results:
        totals[r["class"]] = totals.get(r["class"], 0) + 1
    broken_paths = [r["rel"] for r in results if r["class"] == "BROKEN"]
    thin_paths = [r["rel"] for r in results if r["class"] == "THIN"]
    tfz_n = totals.get("TFZ_LIKELY", 0)
    app_n = len(apps)
    tfz_pct = round(1000 * tfz_n / app_n) / 10 if app_n else 0
    broken_pct = round(1000 * len(broken_paths) / app_n) / 10 if app_n else 0
    launch = launch_pack_results()
    launch_pass = all(x["pass"] for x in launch)
    kc_ok, kc_found, kc_missing = check_kc()
    if not kc_ok:
        print("HARD FAIL: Kc missing storyboard steps:", kc_missing, file=sys.stderr)
        sys.exit(2)
    links, api = read_billing()
    billing_ok = all(links[k] for k in links) and bool(api)
    health = health_check(api)
    hub_reports = [hub_links(h) for h in discover_hubs()]
    hub_broken = sum(len(b) for _, _, b in hub_reports)
    hub_checked = sum(c for _, c, _ in hub_reports)
    soft_go = launch_pass and kc_ok and billing_ok and health.get("ok") and broken_pct < 5
    md = []
    md.append("# QA CHECK ALL — Full inventory sweep")
    md.append("")
    md.append("**Generated:** " + __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat())
    md.append("**Script:** `_tools/qa-check-all.js` (runs `_tools/qa-check-all.py`)")
    md.append("")
    md.append("## Totals by classification")
    md.append("")
    md.append("| Class | Count |")
    md.append("|-------|------:|")
    md.append("| **Scanned (index.html folders)** | **" + str(len(results)) + "** |")
    md.append("| Apps (non-hub) | " + str(app_n) + " |")
    for k in ("HUB", "BROKEN", "THIN", "TFZ_LIKELY"):
        md.append("| " + k + " | " + str(totals.get(k, 0)) + " |")
    md.append("")
    md.append("## CEO one-line verdict")
    md.append("")
    md.append(
        "> **Soft-launch: "
        + ("GO" if soft_go else "NO-GO")
        + "** · TFZ_LIKELY **"
        + str(tfz_pct)
        + "%** of apps ("
        + str(tfz_n)
        + "/"
        + str(app_n)
        + ") · BROKEN **"
        + str(broken_pct)
        + "%**"
    )
    md.append("")
    md.append("## Launch pack (6/6)")
    md.append("")
    md.append("| # | Path | PASS | Class | Panel |")
    md.append("|---|------|:----:|-------|-------|")
    for i, l in enumerate(launch, 1):
        pan = "—"
        if l.get("panel"):
            pan = l["panel"]["pct"] + "% (" + l["panel"]["file"] + ")"
        md.append("| " + str(i) + " | `" + l["rel"] + "` | " + ("PASS" if l["pass"] else "FAIL") + " | " + l["class"] + " | " + pan + " |")
    md.append("")
    md.append("**Launch pack gate:** " + ("**PASS**" if launch_pass else "**FAIL**"))
    md.append("")
    md.append("## Kc A1–A8 (hard gate)")
    md.append("")
    md.append("- Path: `" + KC_PATH + "`")
    md.append("- **" + ("PASS" if kc_ok else "FAIL") + "** · found: " + ", ".join(kc_found))
    if kc_missing:
        md.append("- missing: " + ", ".join(kc_missing))
    md.append("")
    md.append("## Subscribe infra")
    md.append("")
    md.append("| Check | Status |")
    md.append("|-------|--------|")
    for k, v in links.items():
        md.append("| " + k + " | " + ("OK" if v else "EMPTY") + " |")
    md.append("| ENTITLEMENT_API_BASE | `" + api + "` |")
    hs = health
    md.append("| Worker /api/health | " + ("HTTP " + str(hs.get("status")) if hs.get("ok") else "FAIL " + str(hs.get("error") or hs.get("status"))) + " |")
    md.append("")
    md.append("## Hub link check")
    md.append("")
    md.append("- Hubs scanned: **" + str(len(hub_reports)) + "** · hrefs checked: **" + str(hub_checked) + "** · broken: **" + str(hub_broken) + "**")
    for hub, _, broken in hub_reports:
        if broken:
            md.append("- `" + hub + "`: " + ", ".join(broken[:8]) + ("…" if len(broken) > 8 else ""))
    md.append("")
    md.append("## Top 50 THIN paths")
    md.append("")
    for p in thin_paths[:50]:
        md.append("- `" + p + "`")
    md.append("")
    md.append("## All BROKEN paths (" + str(len(broken_paths)) + ")")
    md.append("")
    for p in broken_paths:
        r = next(x for x in results if x["rel"] == p)
        md.append("- `" + p + "` — " + "; ".join(r.get("reasons") or []))
    md.append("")
    md.append("---")
    md.append("*Elapsed: " + str(int(time.time() - t0)) + "s*")
    OUT_MD.write_text("\n".join(md) + "\n", encoding="utf-8")
    summary = {
        "scanned": len(results),
        "apps": app_n,
        "totals": totals,
        "broken": totals.get("BROKEN", 0),
        "thin": totals.get("THIN", 0),
        "tfz_likely": tfz_n,
        "tfz_pct": tfz_pct,
        "launchPass": launch_pass,
        "launch": launch,
        "kcPass": kc_ok,
        "billingOk": billing_ok,
        "health": health,
        "hubBrokenTotal": hub_broken,
        "softGo": soft_go,
    }
    OUT_JSON.write_text(json.dumps(summary, indent=2), encoding="utf-8")
    print(json.dumps({**summary, "health": health, "elapsedSec": int(time.time() - t0)}, indent=2))
    if not kc_ok:
        sys.exit(2)

if __name__ == "__main__":
    main()
