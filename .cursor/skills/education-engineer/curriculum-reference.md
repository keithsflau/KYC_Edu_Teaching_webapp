# HK Curriculum Reference

Use this file when aligning new or updated apps to syllabus content. Do **not** copy full curriculum documents into the repo — cite the source and map learning objectives.

## Primary School (小學)

### Framework documents

Reference the Education Bureau (教育局) curriculum guides:

| Subject | Guide | Focus areas in this repo |
|---------|-------|--------------------------|
| 常識 General Studies | 《小學常識科課程指引》 | Health, community, nature, HK life, values |
| 數學 Mathematics | 《小學數學課程指引》 | Number, shape, measure, data handling |
| 中國語文 Chinese | 《中國語文課程指引》 | Reading, writing, character work, rhetoric |
| 英國語文 English | 《英國語文課程指引》 | Vocabulary, oral, grammar games |

**Cross-cutting primary themes** already used in this portfolio:

- Personal development & health (hygiene, feelings, posture)
- Home & family (safety, chores, filial piety)
- Society & citizenship (rules, professions, recycling)
- Nature & science (plants, animals, magnets, water)
- HK identity (festivals, map, transport, weather)

Official references (external):

- [教育局 — 課程文件](https://www.edb.gov.hk/tc/curriculum-development/curriculum-documents/index.html)
- Primary curriculum: search for 小學教育課程指引 and subject-specific 課程指引

### Primary alignment checklist

- [ ] Year level (P1–P6) matches vocabulary and UI complexity
- [ ] Topic appears in or extends 常識/數學/語文 learning strands for that level
- [ ] HK-local examples where the topic is social or environmental
- [ ] Bilingual or i18n if the hub app uses `MathI18n`

## Secondary School (中學)

### Framework documents

| Framework | Use for |
|-----------|---------|
| HKDSE 評核大綱 | Exam terminology, topic boundaries, assessment style |
| NSS 課程及評估指引 | Form 4–6 elective and core content |
| Junior secondary | Form 1–3 bridging topics |

Official references (external):

- [HKEAA — HKDSE Subject Information](https://www.hkeaa.edu.hk/tc/hkdse/assessment/subject_information/)
- [教育局 — 高中課程指引](https://www.edb.gov.hk/tc/curriculum-development/curriculum-documents/subject-info/index.html)

### In-repo curriculum plans

Prefer these when they exist for the subject:

| Path | Coverage |
|------|----------|
| `Secondary_School/Mathematics/Form 1/S1_MATH_PLAN.md` | 30 F1 apps, unit mapping |
| `Secondary_School/Mathematics/Form 2/S2_MATH_PLAN.md` | F2 apps |
| `Secondary_School/Chemistry/curriculum_plan.md` | F3–F6 chemistry modules |
| `Secondary_School/Chemistry/TEACHER_LAB_PEDAGOGY.md` | Chem lab types, misconceptions, classroom DoD |
| `Secondary_School/Biology/TEACHER_LAB_BRIEF.md` | Bio 40-min lab brief + misconceptions |
| `Secondary_School/Physics/TEACHER_LAB_BRIEF.md` | Physics 40-min lab brief + misconceptions |
| `Secondary_School/Junior Science/TEACHER_LAB_BRIEF.md` | S1–S3 lab brief (no HKDSE dump) |
| `Secondary_School/Chinese_History/TEACHER_LAB_BRIEF.md` | Chi Hist 40-min labs + misconceptions |
| `Secondary_School/History/TEACHER_LAB_BRIEF.md` | History 40-min labs + misconceptions |
| `Secondary_School/Geography/TEACHER_LAB_BRIEF.md` | Geography 40-min labs + misconceptions |
| `Secondary_School/Christian_Studies/TEACHER_LAB_BRIEF.md` | RE / Christian Studies + sensitive-topic guidance |
| `Secondary_School/Biology/apps/*/README.md` | HKDSE biology concepts per app |

### Secondary alignment checklist

- [ ] Form level and stream (e.g. M1, M2, Combined Science) stated
- [ ] HKDSE topic or NSS unit named explicitly
- [ ] Exam-relevant terms match HKEAA / textbook usage
- [ ] For revision apps: question style resembles school assessment or HKDSE where appropriate
- [ ] Scientific / mathematical content verified for accuracy

## Other Portfolio Sections

These sections do **not** use HKDSE alignment. Define goals within the section:

| Section | Goal types |
|---------|------------|
| `bible_study/` | Character study, book overview, exegesis, devotion, faith discussion |
| `typing test/` | WPM, accuracy, bilingual keyboard practice |
| `Music Therapy/` | Emotional regulation, rhythm, sensory engagement |

Still document learning objectives using the template below.

---

## Per-App Alignment Template

Fill this (in PR description, README, or HTML comment block) for every new app:

```markdown
## Curriculum Alignment

- **App**: [path, e.g. Primary_School/General_Studies/P3/14_Pollution_Busters]
- **Audience**: [P3 / Form 4 / HKDSE / general public]
- **Curriculum source**: [e.g. 常識科 P3 單元 — 環境與健康 / HKDSE Biology Compulsory Part — Ecology]
- **Learning objectives**:
  1. [Knowledge] …
  2. [Skill] …
  3. [Attitude] … (optional)
- **Interaction type**: learn | practice | review
- **Assessment / feedback**: [e.g. instant correct/wrong, score, hints, simulation readout]
- **Prerequisites**: [optional prior knowledge]
- **Extension**: [optional enrichment beyond syllabus]
```

## Interaction Type Guide

| Type | Purpose | Examples in repo |
|------|---------|------------------|
| **learn** | Introduce concept with guided exploration | `17_Plant_Growth`, Biology simulations |
| **practice** | Apply knowledge with repeated tries | `09_My_Feelings` emotion matching |
| **review** | Consolidate before test; timed or scored | HKDSE ICT Lab, math drills |

Mix types within one app when useful (e.g. learn → practice → review), but label the primary mode.

## Terminology Conventions

- Use **Traditional Chinese** (繁體) for zh copy; `lang="zh-HK"` on HTML
- Prefer HK usage: 常識科 (not 通识), 校車, 颱風, 港鐵
- English-medium secondary math/science: interface strictly English where plan docs specify
- HKDSE labels: match HKEAA paper naming when cloning exam items (e.g. Paper 1A, Paper 1B)

## When Curriculum Fit Is Unclear

1. Search repo for similar topics (`grep` topic keywords in `Primary_School/` or `Secondary_School/`)
2. Read the nearest year-level hub or `*_PLAN.md`
3. Ask the user which unit or exam topic to align to before implementing
4. Never invent syllabus content — align to a stated source or mark as **enrichment**
