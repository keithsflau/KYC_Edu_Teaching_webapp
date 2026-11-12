#!/usr/bin/env python3
"""QA verify language switcher content refresh — not just ncs-i18n.js presence."""
from __future__ import annotations

import json
import re
from dataclasses import dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

HAS_NCS = re.compile(r"ncs-i18n\.js|NcsI18n", re.I)
INIT_HUB = re.compile(r"NcsI18n\.initHub\s*\(")
INIT_FLEET = re.compile(r"NcsI18n\.init\s*\(")
ONCHANGE = re.compile(
    r"NcsI18n\.onChange|onChange\s*:\s*function|addEventListener\s*\(\s*[\"'](?:hksteam-ncs-lang-change|ncs-lang-change)",
    re.I,
)
APPLY_UI = re.compile(r"applyUI\s*\(|applyDom|applyDataI18n|registerStrings", re.I)
DATA_I18N = re.compile(r"data-i18n(?:=|-)", re.I)
USE_LANG = re.compile(r"useLang\s*\(")
APP_STRINGS = re.compile(r"APP_STRINGS|registerStrings", re.I)
JSLGER_SHELL = re.compile(r"JSLGER\.Shell|window\.JSLGER", re.I)
FLEET_INIT_ONLY = re.compile(r'data-ncs-kit="fleet-init"', re.I)
HARDCODED_ZH_CHROME = re.compile(
    r">[\s]*[\u4e00-\u9fff]{2,}[\s]*<|textContent\s*=\s*[\"'][\u4e00-\u9fff]"
)


@dataclass
class Result:
    rel: str
    status: str  # PASS | FAIL | PARTIAL
    path_type: str
    onchange: bool
    refresh: bool
    ncs_strings: bool
    notes: list[str] = field(default_factory=list)


def classify_app(html: str) -> str:
    if INIT_HUB.search(html):
        return "hub"
    if USE_LANG.search(html):
        return "react-useLang"
    if APP_STRINGS.search(html) and APPLY_UI.search(html):
        return "app-strings"
    if JSLGER_SHELL.search(html):
        return "jslger"
    if INIT_FLEET.search(html) or FLEET_INIT_ONLY.search(html):
        return "fleet-inject-only"
    if HAS_NCS.search(html):
        return "ncs-present"
    return "no-ncs"


def verify_file(path: Path) -> Result:
    rel = str(path.relative_to(ROOT)).replace("\\", "/")
    try:
        html = path.read_text(encoding="utf-8", errors="replace")
    except OSError as e:
        return Result(rel, "FAIL", "error", False, False, False, [str(e)])

    path_type = classify_app(html)
    onchange = bool(ONCHANGE.search(html))
    refresh = bool(APPLY_UI.search(html) or DATA_I18N.search(html) or USE_LANG.search(html))
    ncs_strings = bool(APP_STRINGS.search(html))

    notes: list[str] = []

    if path_type == "hub":
        if INIT_HUB.search(html) and DATA_I18N.search(html):
            notes.append("initHub + data-i18n → applyDom on onChange (kit)")
            status = "PASS"
        else:
            status = "FAIL"
            notes.append("hub missing data-i18n wiring")

    elif path_type == "react-useLang":
        notes.append("useLang hook: onChange → isZh re-render; NCS langs → en via t(zh,en)")
        if USE_LANG.search(html) and HAS_NCS.search(html):
            status = "PARTIAL"
            notes.append("NCS Five shows English chrome, not ne/hi/ur/tl MT strings")
        else:
            status = "FAIL"

    elif path_type == "app-strings":
        if onchange and APPLY_UI.search(html):
            status = "PASS"
            notes.append("APP_STRINGS + onChange + applyUI")
        else:
            status = "FAIL"
            notes.append("APP_STRINGS without onChange/applyUI")

    elif path_type == "jslger":
        status = "FAIL"
        notes.append("JSLGER Shell uses isZh toggle only; fleet switcher not bridged to Shell")
        if FLEET_INIT_ONLY.search(html):
            notes.append("fleet-init mounts switcher but no NcsI18n.onChange → Shell")

    elif path_type == "fleet-inject-only":
        status = "FAIL"
        notes.append("fleet-init only: switcher mounts, no content refresh path")

    elif path_type == "ncs-present":
        status = "FAIL"
        notes.append("ncs-i18n present but no verified refresh wiring")

    else:
        status = "FAIL"
        notes.append("no NCS kit")

    return Result(rel, status, path_type, onchange, refresh, ncs_strings, notes)


def main() -> None:
    priority = [
        "index.html",
        "Primary_School/index.html",
        "Secondary_School/index.html",
        "pricing/index.html",
        "parent-dashboard/index.html",
        "Secondary_School/Chinese/argumentation_builder/index.html",
        "Secondary_School/Junior Science/Form 2/01_Photosynthesis/index.html",
        "Secondary_School/Chemistry/Form 5/09_Chemical_Equilibrium_Kc/index.html",
        "Secondary_School/Chemistry/Form 6/01_Le_Chatelier/index.html",
        "Secondary_School/Chemistry/Form 6/02_Titration_Curve/index.html",
        "Secondary_School/Physics/Form 5/06_Circuit_Builder/index.html",
        "Secondary_School/Physics/Form 4/04_Gas_Laws_Lab/index.html",
        "Secondary_School/Mathematics/Form 1/41_Fraction_Pizza_Share/index.html",
    ]

    results = [verify_file(ROOT / p) for p in priority]
    print(json.dumps([r.__dict__ for r in results], indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
