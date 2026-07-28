#!/usr/bin/env python3
"""Fast batch PPT extraction — single PowerPoint instance."""
import json
import re
import sys
from pathlib import Path

MATERIALS = Path(__file__).resolve().parents[2] / "Reference/Secondary/HKDSE/Integrated_Science/materials"
OUT = Path(__file__).resolve().parents[1] / "ppt-extract-com.json"


def parse_name(name):
    m = re.search(r"scicent_ppt_(\d+)_(unit_end|\d+)", name, re.I)
    if not m:
        return None
    lang = "zh" if "_c.ppt" in name or "_r_c" in name else "en"
    return {"book": int(m.group(1)), "chapter": m.group(2), "lang": lang}


def collect_targets(resources=None):
    files = []
    for res in sorted(MATERIALS.glob("Resources_*_r")):
        if resources and res.name not in resources:
            continue
        for p in res.rglob("*.ppt"):
            if p.name.startswith("~$"):
                continue
            meta = parse_name(p.name)
            if not meta:
                continue
            files.append({
                "resource": res.name,
                "path": str(p),
                "rel": str(p.relative_to(res)).replace("\\", "/"),
                "name": p.name,
                **meta,
            })
    by_key = {}
    for f in files:
        key = (f["resource"], f["book"], f["chapter"])
        slot = by_key.setdefault(key, {"resource": f["resource"], "book": f["book"], "chapter": f["chapter"]})
        slot[f["lang"]] = f
    return sorted(by_key.values(), key=lambda x: (x["resource"], x["book"], str(x["chapter"])))


def chapter_title(slides):
    for slide in slides[:3]:
        for t in slide:
            t = re.sub(r"\s+", " ", t).strip()
            if 4 < len(t) < 120 and t.lower() not in ("flipped classroom", "contents"):
                if re.match(r"^[A-Z]\.\s", t) or re.match(r"^\d+\.\d+", t):
                    return t
                if "?" not in t and len(t.split()) <= 14:
                    return t
    return slides[0][0] if slides and slides[0] else "Unknown"


def key_lines(slides, limit=30):
    seen, out = set(), []
    for slide in slides:
        for t in slide:
            t = re.sub(r"\s+", " ", t).strip()
            if 15 <= len(t) <= 220 and t.lower() not in seen:
                if not t.lower().startswith(("flipped classroom", "click to")):
                    seen.add(t.lower())
                    out.append(t)
            if len(out) >= limit:
                return out
    return out


def make_quiz(concepts, title):
  """Build one MCQ from a concept sentence."""
  if not concepts:
    return None
  body = concepts[0]
  # shorten for question
  q_en = f"According to the teaching slides, which statement is correct about {title}?"
  q_zh = f"根據教學簡報，下列哪項關於「{title}」的描述正確？"
  correct = body[:120] if len(body) <= 120 else body[:117] + "..."
  wrong1 = "Science does not use systematic observation. 科學不使用系統觀察。"
  wrong2 = "Experiments are optional and not important. 實驗可有可無。"
  return {
    "qEn": q_en, "qZh": q_zh,
    "opts": [correct, wrong1, wrong2],
    "a": correct,
    "why": "From teaching PowerPoint. 來自教學簡報。",
    "bodyEn": body,
    "bodyZh": body,  # bilingual apps can refine later
  }


def read_slides(pp, path):
    slides = []
    pres = pp.Presentations.Open(path, True, True, False)
    try:
        for si in range(1, min(pres.Slides.Count, 25) + 1):
            slide = pres.Slides(si)
            texts = []
            for j in range(1, slide.Shapes.Count + 1):
                sh = slide.Shapes(j)
                try:
                    if sh.HasTextFrame and sh.TextFrame.HasText:
                        t = sh.TextFrame.TextRange.Text.strip()
                        if t:
                            texts.append(t)
                except Exception:
                    pass
            if texts:
                slides.append(texts)
    finally:
        pres.Close()
    return slides


def extract_all(target_groups):
    import win32com.client

    pp = win32com.client.Dispatch("PowerPoint.Application")
    pp.Visible = 1
    chapters = []
    try:
        for i, group in enumerate(target_groups):
            en_f = group.get("en")
            zh_f = group.get("zh")
            label = (en_f or zh_f)["name"]
            print(f"[{i+1}/{len(target_groups)}] {label}", flush=True)
            try:
                slides_en = read_slides(pp, en_f["path"]) if en_f else []
                slides_zh = read_slides(pp, zh_f["path"]) if zh_f else []
                base = en_f or zh_f
                title = chapter_title(slides_en or slides_zh)
                chapters.append({
                    "resource": group["resource"],
                    "book": group["book"],
                    "chapter": group["chapter"],
                    "name": base["name"],
                    "rel": base["rel"],
                    "title": title,
                    "slide_count": len(slides_en or slides_zh),
                    "key_concepts": key_lines(slides_en),
                    "key_concepts_zh": key_lines(slides_zh),
                    "has_zh": bool(slides_zh),
                })
            except Exception as e:
                chapters.append({
                    "resource": group["resource"],
                    "book": group["book"],
                    "chapter": group["chapter"],
                    "error": str(e),
                })
    finally:
        pp.Quit()
    return chapters


def main():
    resources = sys.argv[1:] if len(sys.argv) > 1 else None
    targets = collect_targets(resources)
    print(f"Targets: {len(targets)}", flush=True)
    chapters = extract_all(targets)
    existing = []
    if OUT.exists() and not resources:
        existing = json.loads(OUT.read_text(encoding="utf-8")).get("chapters", [])
    if resources and OUT.exists():
        old = { (c["resource"], c["book"], str(c["chapter"])): c for c in json.loads(OUT.read_text(encoding="utf-8")).get("chapters", []) }
        for c in chapters:
            old[(c["resource"], c["book"], str(c["chapter"]))] = c
        chapters = list(old.values())
    elif existing:
        pass
    OUT.write_text(json.dumps({"chapters": chapters, "total": len(chapters)}, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote {OUT} ({len(chapters)} chapters)", flush=True)


if __name__ == "__main__":
    main()
