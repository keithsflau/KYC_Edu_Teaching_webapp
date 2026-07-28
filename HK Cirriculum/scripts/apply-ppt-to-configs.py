#!/usr/bin/env python3
"""Inject PPT-extracted key concepts into F1/F2/F3 LGER configs and regenerate apps."""
import importlib.util
import json
import os
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SCRIPTS = Path(__file__).resolve().parent
PPT = json.loads((ROOT / "ppt-extract-com.json").read_text(encoding="utf-8"))
MAP = json.loads((SCRIPTS / "ppt-app-map.json").read_text(encoding="utf-8"))

chapter_index = {}
for c in PPT["chapters"]:
    chapter_index[(c["book"], str(c["chapter"]))] = c


def clean_line(s: str) -> str:
    s = re.sub(r"\s+", " ", s).strip()
    s = s.replace("??", "…").replace("–", "-")
    if s.startswith("A. "):
        s = s[3:]
    return s


def pick_concepts(book_chapters, limit=6, lang="en"):
    key = "key_concepts_zh" if lang == "zh" else "key_concepts"
    lines = []
    seen = set()
    for book, ch in book_chapters:
        c = chapter_index.get((book, str(ch)))
        if not c:
            continue
        for line in c.get(key, []) or c.get("key_concepts", []):
            line = clean_line(line)
            if len(line) < 20 or len(line) > 180:
                continue
            low = line.lower()
            if low in seen:
                continue
            if low.startswith(("flipped classroom", "concept map", "activity ", "example")):
                continue
            if "?" in line and line.endswith("?"):
                continue
            seen.add(low)
            lines.append(line)
            if len(lines) >= limit:
                return lines
    return lines


def make_key_points(lines_en, lines_zh=None):
    kp = []
    zh_pool = lines_zh or []
    for i, line in enumerate(lines_en[:4]):
        zh = zh_pool[i] if i < len(zh_pool) else line
        kp.append({"en": line, "zh": zh})
    while len(kp) < 4:
        kp.append({"en": "Review the teaching PowerPoint slides for this topic.", "zh": "複習本課題的教學簡報。"})
    return kp


def make_quizzes(lines_en, title_en, lines_zh=None, title_zh=None):
    quizzes = []
    zh_pool = lines_zh or []
    title_zh = title_zh or title_en
    pool = lines_en[:6] if lines_en else [f"Core ideas from {title_en} teaching slides."]
    for i, line in enumerate(pool[:3]):
        correct = line if len(line) <= 100 else line[:97] + "..."
        correct_zh = zh_pool[i] if i < len(zh_pool) else correct
        if len(correct_zh) > 100:
            correct_zh = correct_zh[:97] + "..."
        quizzes.append({
            "qEn": f"Which statement matches the teaching slides on {title_en}?",
            "qZh": f"下列哪項符合「{title_zh}」教學簡報內容？",
            "opts": [correct, "Science ignores evidence from experiments.", "Measurements are never needed in science."],
            "a": correct,
            "why": "Aligned to scicent teaching PowerPoint. 對應課本教學簡報。",
        })
    return quizzes


def upgrade_config(cfg, form_key):
    folder = cfg["folder"]
    mapping = MAP.get(form_key, {}).get(folder)
    if not mapping:
        return cfg, False
    books = mapping["books"]
    lines_en = pick_concepts(books, lang="en")
    lines_zh = pick_concepts(books, lang="zh")
    if not lines_en:
        return cfg, False
    cfg = dict(cfg)
    cfg["keyPoints"] = make_key_points(lines_en, lines_zh)
    cfg["quizzes"] = make_quizzes(
        lines_en, cfg["titleEn"], lines_zh, cfg.get("titleZh", cfg["titleEn"])
    )
    cfg["pptSource"] = [f"Book {b} Ch {c}" for b, c in books]
    for k in ("learn", "guided", "summary", "review"):
        cfg.pop(k, None)
    return cfg, True


def load_gen(form):
    name = f"generate-{form}-lger.py"
    spec = importlib.util.spec_from_file_location("gen", SCRIPTS / name)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    stats = {"form1": 0, "form2": 0, "form3": 0}
    batches = [
        ("f1", "form1", "f1-lger-configs.json"),
        ("f2", "form2", "f2-lger-configs.json"),
        ("f3", "form3", "f3-lger-configs.json"),
    ]
    for form, form_key, fname in batches:
        path = SCRIPTS / fname
        if not path.exists():
            continue
        configs = json.loads(path.read_text(encoding="utf-8"))
        upgraded = []
        for c in configs:
            nc, ok = upgrade_config(c, form_key)
            upgraded.append(nc)
            if ok:
                stats[form_key] += 1
        path.write_text(json.dumps(upgraded, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"Updated {stats[form_key]} {form} configs with PPT content")

    gen1 = load_gen("f1")
    gen2 = load_gen("f2")
    gen1.main()
    gen2.main()
    if stats["form3"]:
        gen3 = load_gen("f3")
        gen3.main()
    print("Regenerated Form 1, Form 2" + (" and Form 3" if stats["form3"] else "") + " LGER apps.")


if __name__ == "__main__":
    main()
