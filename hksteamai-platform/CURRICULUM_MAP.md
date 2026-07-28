# Curriculum map (global discovery)

Machine-readable: [`data/curriculum-map.json`](./data/curriculum-map.json)  
Generator: [`scripts/generate-curriculum-map.mjs`](./scripts/generate-curriculum-map.mjs)

```bash
npm run curriculum:generate
```

## Honesty

Tags are **heuristic path → grade band** mappings for browse/filter. They are **not** accreditation, syllabus endorsement, or exam-board equivalence. Always show `disclaimer.en` / `disclaimer.zh-HK` near the region switcher.

## Module shape (UI-ready)

```json
{
  "moduleId": "demo-p1-counting",
  "path": "Primary_School/Mathematics/P1/01_Counting_1_To_10",
  "subject": "mathematics",
  "hk": "P1",
  "uk": "KS1",
  "us": "1",
  "ib": "PYP",
  "sg": "P1",
  "au": "Y1",
  "intl": "Early Primary",
  "topics": ["mathematics", "P1", "counting", "..."],
  "freeDemo": true
}
```

Free demos keep stable `moduleId` from `free-demo-catalog.json` and add `titleZh`, `band`, `why`.

**International / Other (`intl`):** broad age bands for parents whose curriculum is not listed — discovery only.

## Approximate HK → other systems

| HK | UK | US | IB | SG | AU | Intl / Other |
|----|----|----|----|----|-----|--------------|
| P1–P2 | KS1 | 1–2 | PYP | P1–P2 | Y1–Y2 | Early Primary |
| P3–P4 | KS2 | 3–4 | PYP | P3–P4 | Y3–Y4 | Mid Primary |
| P5–P6 | KS2 | 5–6 | PYP | P5–P6 | Y5–Y6 | Upper Primary |
| F1–F3 | KS3 | 7–9 | MYP | S1–S3 | Y7–Y9 | Lower Secondary |
| F4–F6 | KS4 | 10–12 | DP | S4 | Y10–Y12 | Upper Secondary |

## 粵語說明：Region switcher 點用呢份 map

**一句講晒：** 家長揀地區 → 你用嗰個區嘅 field 去 filter；顯示嗰個區嘅年級字；disclaimer 一定要擺出嚟。

### 資料點讀

1. 載入 `curriculum-map.json`（或經 `src/lib/curriculum.ts` 嘅 `loadCurriculumMap()`）。
2. `systems` 物件畀你起下拉：每個 region 有 `label` / `labelZh` + `grades[]`。
3. 每個 module 係 **flat tags**：`hk` / `uk` / `us` / `ib` / `sg` / `au` / `intl`，唔使再入 nested `systems`。

### Switcher 建議行為

| 家長操作 | 程式應該做 |
|----------|------------|
| 揀「香港」+「小三」 | `modules.filter(m => m.hk === "P3")` |
| 揀「英國」+「KS2」 | `filter(m => m.uk === "KS2")` |
| 揀「美國」+「Grade 5」 | `filter(m => m.us === "5")` |
| 揀「IB」+「MYP」 | `filter(m => m.ib === "MYP")` |
| 揀「新加坡」+「S1」 | `filter(m => m.sg === "S1")` |
| 揀「澳洲」（可選）+「Y7」 | `filter(m => m.au === "Y7")` |
| 揀「國際／其他」+「Lower Secondary」 | `filter(m => m.intl === "Lower Secondary")` |
| 地區揀咗但年級 = All | 只 filter 有嗰個 field 嘅 module（基本上全部都有） |

現成 helper：`filterBySystem(system, grade)`、`gradesForSystem(system)`、`getDisclaimer(locale)`。

### UI 文案

- 英文 disclaimer：`map.disclaimer.en`
- 繁中 disclaimer：`map.disclaimer["zh-HK"]`（同 i18n `disclaimer` key 對齊）
- 免費示範：`m.freeDemo === true` → 顯示 Free badge；其餘要 entitlement（Agent 2 / paywall 負責）

### 唔好做

- 唔好話「等同 GCSE / PSLE / Common Core」— 我哋只係 discovery banding。
- 唔好靠呢份 map 做付費閘（paywall 用 path + entitlement，唔用 grade tag）。

### 更新流程

改咗 `Primary_School` / `Secondary_School` 資料夾，或者改咗 `free-demo-catalog.json`，就要再跑 `npm run curriculum:generate`，然後 commit 新嘅 `data/curriculum-map.json`。
