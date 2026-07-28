#!/usr/bin/env python3
"""Inventory and extract text from Junior Science teaching PowerPoints."""
import json
import os
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

MATERIALS = Path(__file__).resolve().parents[2] / "Reference/Secondary/HKDSE/Integrated_Science/materials"
OUT_DIR = Path(__file__).resolve().parents[1]
NS = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}


def find_ppt_folders():
    inv = {}
    for res in sorted(MATERIALS.glob("Resources_*_r")):
        ppts = []
        for root, _dirs, files in os.walk(res):
            for f in files:
                low = f.lower()
                if low.endswith((".ppt", ".pptx")) and not f.startswith("~$"):
                    fp = Path(root) / f
                    rel = fp.relative_to(res)
                    ppts.append({
                        "name": f,
                        "rel": str(rel).replace("\\", "/"),
                        "size_kb": round(fp.stat().st_size / 1024, 1),
                        "abs": str(fp),
                    })
        ppts.sort(key=lambda x: x["name"])
        inv[res.name] = {"count": len(ppts), "files": ppts}
    return inv


def extract_pptx_text(path: Path) -> list[str]:
    texts = []
    try:
        with zipfile.ZipFile(path) as z:
            slides = sorted(
                n for n in z.namelist()
                if n.startswith("ppt/slides/slide") and n.endswith(".xml")
            )
            for slide in slides:
                root = ET.fromstring(z.read(slide))
                for el in root.iter():
                    if el.tag.endswith("}t") and el.text and el.text.strip():
                        texts.append(el.text.strip())
    except Exception as e:
        texts.append(f"[extract error: {e}]")
    return texts


def extract_ppt_text(path: Path) -> list[str]:
    """Best-effort for legacy .ppt via olefile or raw UTF-16LE strings."""
    try:
        import olefile  # type: ignore
        if olefile.isOleFile(str(path)):
            ole = olefile.OleFileIO(str(path))
            texts = []
            for stream in ole.listdir():
                if stream[-1].startswith("PowerPoint Document"):
                    data = ole.openstream(stream).read()
                    # UTF-16LE runs in binary PPT
                    raw = re.findall(rb"[\x20-\x7e]{4,}", data)
                    for r in raw[:200]:
                        try:
                            s = r.decode("utf-16-le", errors="ignore")
                            if len(s) >= 4 and not s.startswith("Microsoft"):
                                texts.append(s.strip())
                        except Exception:
                            pass
            ole.close()
            return list(dict.fromkeys(texts))[:500]
    except ImportError:
        pass
    # fallback: scan for readable strings
    data = path.read_bytes()
    found = []
    for m in re.finditer(rb"[\x20-\x7e]{6,}", data):
        found.append(m.group().decode("ascii", errors="ignore"))
    for m in re.finditer(rb"(?:[\xd0-\xff][\x00-\xff]){4,}", data):
        try:
            s = m.group().decode("utf-16-le", errors="ignore")
            if len(s) >= 4:
                found.append(s.strip())
        except Exception:
            pass
    return list(dict.fromkeys(found))[:300]


def extract_text(path: Path) -> list[str]:
    if path.suffix.lower() == ".pptx":
        return extract_pptx_text(path)
    return extract_ppt_text(path)


def chapter_topic(filename: str) -> str:
    """Parse scicent_ppt_X_Y naming."""
    m = re.search(r"scicent_ppt_(\d+)_(\d+|unit_end)", filename, re.I)
    if not m:
        return filename
    book, ch = m.group(1), m.group(2)
    if ch == "unit_end":
        return f"Book {book} — Unit Review"
    return f"Book {book} Ch.{ch}"


def lang_tag(filename: str) -> str:
    if "_r_c" in filename or filename.endswith("_c.ppt"):
        return "zh"
    if "_r_e" in filename or filename.endswith("_e.ppt"):
        return "en"
    if "_c.ppt" in filename:
        return "zh"
    if "_e.ppt" in filename:
        return "en"
    return "?"


def key_concepts(texts: list[str], limit=25) -> list[str]:
    """Pick substantive lines (skip tiny fragments)."""
    out = []
    for t in texts:
        t = re.sub(r"\s+", " ", t).strip()
        if len(t) < 8 or len(t) > 200:
            continue
        if re.match(r"^[\d\W]+$", t):
            continue
        if t.lower() in ("click to edit", "master title style"):
            continue
        out.append(t)
        if len(out) >= limit:
            break
    return out


def main():
    inv = find_ppt_folders()
    total = sum(v["count"] for v in inv.values())
    print(f"TOTAL PPT files: {total}")

    extracted = {}
    for res, data in inv.items():
        extracted[res] = []
        for f in data["files"]:
            p = Path(f["abs"])
            texts = extract_text(p)
            extracted[res].append({
                **{k: v for k, v in f.items() if k != "abs"},
                "chapter": chapter_topic(f["name"]),
                "lang": lang_tag(f["name"]),
                "slide_text_count": len(texts),
                "key_concepts": key_concepts(texts),
            })

    out_json = OUT_DIR / "ppt-extract-cache.json"
    with open(out_json, "w", encoding="utf-8") as fh:
        json.dump({"inventory": inv, "extracted": extracted, "total": total}, fh, ensure_ascii=False, indent=2)
    print(f"Wrote {out_json}")
    return inv, extracted, total


if __name__ == "__main__":
    main()
