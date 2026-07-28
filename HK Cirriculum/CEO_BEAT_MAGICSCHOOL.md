# MagicSchool AI 教師工具實測審計與應對策略 (Logged-in Live Audit & Beat Strategy)

> **Audit note**: Live logged-in audit of `app.magicschool.ai/tools/teacher` (2026-07-28) via Owner's Google SSO session. Four tools were run end-to-end with real DSE-style prompts (Lesson Plan, Rubric, MC Quiz, Science Lab); two more inspected at form level (IEP Support, Writing Feedback). No credentials or account identifiers are stored in this file. **Action for Owner: rotate the shared Google password after this chat.**

---

## 0. 繁中董事會摘要 (Executive Summary)

MagicSchool AI 是美國「教師省時 AI」品類的領頭羊：89 個教師工具 + 51 個學生工具 + 全班批改 Workflow，UX 拋光度極高，免費層即可無阻使用全部工具。實測結論:**它是「最強的通用 LLM 公文生成器」,但不是學習產品**——全部輸出皆為文字文件(教案、評分表、選擇題、實驗報告格式),沒有任何互動模擬。

三個關鍵實測證據:
1. **無 HKDSE 課程對應**: Science Lab 工具反問「要用美國哪個州的標準?」,指定 HKDSE 後明確承認資料庫沒有,降級為「通用框架」並生成虛構的標準代碼 (PS.CHM.5)。
2. **數值答案不可信**: DSE 物理熱量 5 題選擇題實測,第 1 題答案鍵**明確錯誤**(正解 ≈29.7°C 應選 D,其答案鍵給 B),另有兩題為「近似值湊合」。系統自己也標註「請核實 AI 生成的數學答案」。
3. **"Science Labs" 只是實驗文書**: 生成的是紙本實驗步驟(安全須知、材料清單),不是虛擬實驗室——與我們的互動操縱件 (Interactive Manipulatives) 完全是不同物種。

**威脅等級:直接威脅 L;間接威脅 M。** 它的客群是教師(B2B2C/免費擴散),我們的客群是家長付費的學生 TFZ 實驗室,正面不衝突。真正的風險是「品類定型」:Sayo 已在香港完整複製 MagicSchool 打法(100+ 教師工具),等於 MagicSchool 是 Sayo 的路線圖預覽。我們應抄其 UX 工藝,但絕不進入「89 個淺層文字工具」的紅海。

---

## 1. MagicSchool Snapshot (What they sell)

- **Product**: The most-used AI platform for US K-12 educators. Web app: 89 teacher tools + ~51 student-facing tools ("MagicStudent" rooms) + batch Workflows + custom tool builder + Labs (experimental).
- **Target/Curriculum**: US K-12 first (CCSS, NGSS, TEKS, Florida, Ontario; SAT practice; IEP/504/BIP US legal frameworks). Grade picker = Pre-K→12th grade + University + UK-style Year 1-13. **No HK Form system, no HKDSE standards database.**
- **Pricing**: Freemium. Free educator tier observed running all 89 tools with zero paywall (4 full generations, exports, Studio editor all unlocked). Paid Plus (~individual) and Enterprise (school/district) tiers per public marketing.
- **Moat**: Teacher workflow polish + brand trust + district B2B + "responsible AI for schools" posture (privacy nudges, FERPA-conscious design, disclaimer hygiene).
- **What it is NOT**: Not a student learning product. Not interactive. Not exam-aligned outside the US. Not numerically verified.

## 2. 工具目錄全覽 (Catalogue Map)

**Official 7 focus areas** (their own IA): Instructional Materials / Feedback & Assessment / Communication / Student Engagement / Admin / Student Support / Planning.

### Teacher tools (89 live links harvested)

| Category (our grouping) | Representative tools |
|---|---|
| Planning | Lesson Plan, Unit Plan, 5E Lesson Plan, PBL, SEL Lesson Plan, Syllabus, Lesson Hook, Standards Unpacker |
| Assessment & Feedback | MC Quiz/Assessment, Rubric Generator, Writing Feedback, DOK Questions, Text-Dependent Questions, 3D Science Assessments (NGSS), Report Card Comments, Exemplar & Non-Exemplar, Teacher Observations, SAT Math/ELA Practice |
| Instructional Materials | Worksheet Generator, Academic Content, Informational Texts, Science Labs, Math Spiral Review, Math Story Word Problems, Vocabulary List/Texts, Decodable Texts, Data Table Analysis, Jeopardy Review |
| Text utilities | Text Rewriter, Leveler, Summarizer, Translator, Proofreader, Scaffolder, YouTube Questions/Summarizer |
| Communication | Professional Email, Email Responder/Family, Class Newsletter, Letter of Recommendation, Thank You Note, Difficult Conversations, Social Media Post |
| Student Support (US SPED) | IEP Support Tool, BIP Generator, 504 Plan, ALP, Support Goals Creator (MTSS Tier 2/3), Accommodation Suggestions, Behavior Intervention, Social Stories, Restorative Reflection |
| Engagement/Fun | Educational Song Generator (Suno-style w/ album art), Podcast Generator, Image Generator (Adobe Express), Teacher Jokes, Tongue Twisters, Quote of the Day, Team Builder, Choice Board (UDL), Make it Relevant, Real World Connections |
| Meta/AI | Chat with Raina (assistant), Custom Chatbot, Chat with Docs, Prompt Assistant, Tool Recommendations, AI Resistant Assignments, PD Planner, Coach's Practice, Survey Creator, Gift Suggestion |

### Student tools (~51, teacher-assigned via "rooms")
All conversational/text: AI Tutor, AI Learning Assistant, Quiz Me!, Step by Step, Math Review, Study Bot, Debate Partner, Character Chatbot, Language Tutor, Research Assistant, Coding Assistant, Writing Feedback, College & Career Counselor, SAT ELA Practice, etc. **Zero interactive simulations — 100% chatbot/text UX.**

### Workflows (new direction)
"Class Writing Feedback": upload whole-class submissions → AI drafts rubric-aligned feedback per student → teacher reviews/personalizes/sends. Batch grading automation is their roadmap ("More workflows coming soon").

## 3. 實測記錄 (Live Tool Tests)

### 3.1 Lesson Plan — Studio-mode document, genuinely strong pedagogy
- **Input**: Year 11, "HKDSE Chemistry Form 5: Chemical equilibrium — Kc + Le Chatelier (Haber process)", 60-min period, students weak on moles, want wet-lab demo + exit ticket.
- **Output**: Rendered in **"Studio mode"** — a Notion-style block editor artifact (H1/bold/italic/colors/nesting/**inline LaTeX math**/Adobe image gen/Save/Print/Add to Resources).
- **Quality**: Real backwards design — Learning Objective → summative exit ticket FIRST → key points → demo → differentiation. It wove our "mole struggles" context into the assessment rationale ("addressing last week's mole struggles"), chose the classic N₂O₄⇌NO₂ temperature-shift demo (chemically correct, materials + procedure + observations + principle linkage), and ended with 3 differentiation tiers. Post-generation chat explains its own design choices.
- **Verdict**: Best-in-class text lesson generator. Still a document, not a learning experience.

### 3.2 Rubric Generator — honored "HKDSE marking style" cosmetically
- **Input**: Year 11, titration lab report, 3-point scale, asked for safety + sig-figs/units "aligned to HKDSE marking style".
- **Output**: Clean 6-criteria × 3-level table (Planning & Procedure / Results Table / Calculation / Sig Figs & Units / Error Evaluation / Safety), descriptors concrete and observable; dropped the phrase "matching HKDSE-style presentation" into the sig-fig row.
- **Caveat**: The DSE alignment is **surface-level phrasing**, not real marking-scheme knowledge (no M/A-mark concepts).
- **Export confirmed**: Google Docs / Microsoft Word / Print + Copy, Translate, Read aloud, Add to My Resources, thumbs up/down.

### 3.3 MC Quiz — verified WRONG answer key on DSE physics math ⚠️
- **Input**: Year 11, HKDSE Form 4 specific heat capacity/calorimetry, 5 questions, 4 options, "include numerical DSE-style calculations".
- **Output**: 5 polished questions + answer key (B,B,B,A,A) + disclaimer "Please verify AI-generated math answers for accuracy."
- **Our verification**:
  - Q1 (Al block 150 g @ 90°C into 200 g water @ 20°C): true final T = **29.7°C** → closest option **D (30.1°C)**. Their key says **B (26.5°C)** — **flat-out wrong**.
  - Q2 (0.25 kg @ 80°C + 0.15 kg @ 20°C): true T = **57.5°C**; key B (56.0°C) — nearest-option fudge.
  - Q3 (metal SHC): true c ≈ **514 J/kg·K**; key B (420) — nearest-option fudge.
- **Verdict**: 1/5 objectively wrong + 2/5 loose on a trivially checkable topic. For DSE — where marking-scheme precision IS the product — this is disqualifying without a deterministic verifier. **This is the strongest single exhibit for "generic LLM wrapper ≠ exam product."**

### 3.4 Science Labs — proves no HKDSE DB; output is paperwork, not a lab
- **Behavior**: Tool asked a clarifying question before generating: *"Which state's or framework's standards would you like me to use?"* (US-state default assumption).
- **When told "HKDSE Chemistry C&A Guide"**: responded that HKDSE is **not available** in its standards set and fell back to a **generic framework with invented codes** ("PS.CHM.5 / PS.CHM.5.1").
- **Resulting document**: Thiosulfate-HCl disappearing-cross lab — objectives, safety callouts (with school-policy reminder), per-group materials in mol dm⁻³ (correct SI/DSE units), student-facing background on collision theory, stepped procedure. Genuinely usable **paperwork**.
- **Verdict**: Clarifying-question UX is admirable; but "Science Labs" = lab documentation generator. No simulation, no data collection, no interactivity.

### 3.5 IEP Support Tool & Writing Feedback (form-level)
- **IEP**: US IDEA disability categories (Autism/SLD/VI…), free-text needs description with **privacy-by-design nudge** ("Do not use names or any other personal identifying information"). US legal artifact; HK SEN (EDB tiered support) absent.
- **Writing Feedback**: paste student writing + attach your own rubric file + target feedback focus — consistent with their rubric ecosystem.

## 4. UX Craft Inventory (what makes it feel premium)

Same form grammar across all 89 tools — learn one, know all:
1. Grade-level select + 1-2 required textareas + optional "additional criteria" + standards field.
2. **"Show exemplar"** per tool — one click fills realistic example input; kills blank-page fear.
3. **"Prompt assistant"** inline coaching on your input; **"Prompt Editor"** lets teachers inspect/edit the underlying prompt (radical transparency → trust).
4. **"Add File"** upload context per field; **"Web"** toggle for search grounding; voice "Start Recording" input.
5. Every output becomes a **persistent, auto-titled, shareable chat thread** (e.g. "Titration lab report") with Raina follow-up chat, edit-message, and **contextual smart follow-up chips** ("Common pitfalls with this rubric?", "Make it more student-friendly?").
6. Export trio (Google Docs/Word/Print) + Translate + Read aloud — meets teachers where they work.
7. Disclaimer hygiene: "AI can make mistakes…" on every output; specific "verify math answers" note on quizzes; PII warnings on SPED tools.

## 5. Head-to-head: MagicSchool vs Sayo Teacher Mode vs Us

| Dimension | MagicSchool AI | Sayo.ai (teacher mode) | Us (HK Cirriculum TFZ Labs) |
|---|---|---|---|
| Core user | Teacher (time-saving) | Teacher + school admin (time-saving) | **Student (concept mastery), parent pays** |
| Output species | Text documents (89 tools) | Text/chat + grading + some real sims (Chem/Phys verified) | **Interactive manipulatives + A1-A8 TFZ scaffolding** |
| Curriculum DB | US (CCSS/NGSS/SAT); **no HKDSE** | HKDSE-native (OCR grading, marking schemes) | **HKDSE-native topic trees (ours)** |
| Numerical reliability | **Wrong keys verified** | DSE marking-aligned (their moat) | Must be **deterministically verified** |
| Interactive sims | None | Some (real but thinner than ours) | **Our entire wedge** |
| Languages | EN-first (tool-level translate) | Bilingual HK | Bilingual + Cantonese context |
| Buyer | Teacher/district (freemium+B2B) | School B2B + HK$138/mo app | **Parent B2C** |
| Scale signal | US category leader | 100+ HK schools | Soft-launch |

## 6. Threat Assessment: **直接 L / 間接 M**

**Why direct threat is LOW:**
- Different buyer (teacher-free-tier vs parent-paid), different job-to-be-done (prep/grading time vs student concept mastery), different curriculum (no HKDSE DB, US SPED/SAT artifacts), zero interactive learning surface. An HK parent choosing DSE concept labs will never comparison-shop MagicSchool.

**Why indirect threat is MEDIUM (watch quarterly):**
1. **Category definition risk**: "AI for education" in the public mind = teacher text tools. If HK parents/teachers anchor on that, we must educate the market that learning ≠ documents.
2. **It is Sayo's roadmap preview**: Sayo already cloned this playbook locally (100+ tools, grading, mock exams). Whatever MagicSchool ships (Workflows batch grading, Studio editor, student rooms) likely arrives at Sayo in 2-3 quarters — so this audit doubles as a Sayo early-warning feed.
3. **Expansion optionality**: If MagicSchool ever adds non-US curriculum DBs + student-facing interactivity + parent subscriptions, it becomes a real threat. No signal of that today (SAT ≠ DSE strategy).

## 7. What to Steal Ethically (UX patterns only — no content, no code)

1. **One form grammar everywhere**: grade + objective + optional criteria + exemplar. Apply to any future teacher-facing surface we build; keep student TFZ flow even simpler.
2. **"Show exemplar" buttons**: our parent onboarding should offer one-tap example ("Try: Form 5 Kc equilibrium") so the first lab runs in ≤2 clicks (matches our Snapask learning).
3. **Prompt transparency ("Prompt Editor")**: for our future teacher wing, show the pedagogy prompt behind each lab — HK teachers trust what they can inspect.
4. **Artifact editor with inline LaTeX**: our lab reports/worksheets should render as ownable documents (Notion-lite blocks + math), exportable to **Google Docs / Word / PDF-print** — the exact trio teachers expect.
5. **Output → persistent named thread + smart follow-up chips**: after a student finishes a lab, offer 2 contextual next steps ("Common misconceptions on Kc?", "Generate 3 DSE-style questions from this lab").
6. **Clarifying-question-before-generate**: when a request lacks a curriculum anchor, ask once (like their standards question) instead of guessing — but back it with a REAL HKDSE topic tree.
7. **Disclaimer & privacy hygiene**: copy the pattern language ("AI can make mistakes", "no student names"), localized 中英對照, PDPO-flavored.
8. **Batch Workflow direction (file for later)**: class-wide rubric feedback upload is the proven teacher-AI killer app; note it for the optional teacher wing roadmap, not now.

## 8. What NOT to Copy

- **"89 shallow text tools" sprawl**: do-it-all mediocrity. We stay deep: 50 perfect interactive DSE labs > 100 text generators. (Same conclusion as our Sayo audit.)
- **Generic LLM wrapper without curriculum DB**: their Science Lab literally fabricated standard codes for HKDSE. Any question/lab generator we ship must bind to our real DSE topic taxonomy — never free-text hallucinated alignment.
- **Unverified numerical answers**: their own disclaimer admits the keys may be wrong. If we generate DSE-style numeric questions, answers must come from the simulation/deterministic solver, not the LLM's arithmetic. Non-negotiable.
- **Text-only "science labs"**: paperwork generation is not our fight; interactive manipulatives are. Do not dilute.
- **US legal/grade frameworks** (IEP/504/BIP, K-12, NGSS): HK needs Form 1-6, EDB SEN tiers, HKDSE/HKEAA marking language. Do not import US SPED artifacts.
- **Teacher-first sequencing**: they won teachers first; our wedge stays student TFZ labs with parent-pay B2C. Teacher wing is an option only AFTER fleet repair + monetization proof (per Beat-Sayo war plan).

## 9. 對我們產品的即時行動 (Actions)

1. **Add "answer-key verification" as a product principle**: any AI-generated numeric DSE item must be machine-checked (deterministic solver / sim-derived) before display. Market this against generic AI tools:「連答案都驗證過」.
2. **Ship a one-tap exemplar entry** in the soft-launch pack (steal pattern #2) — measure time-to-first-interaction ≤ 60s.
3. **Design lab-report export** (Google Docs/Word/Print) for our flagship labs — parents see tangible proof; teachers could reuse.
4. **Log MagicSchool feature releases quarterly** as Sayo leading indicator (Workflows, Studio, student rooms).
5. **Owner security action**: rotate the shared Google password (credentials were shared in chat for this audit).

## 10. TC CEO Takeaway (贏輸下一刀)

- **MagicSchool 是「教師文書 AI」的天花板,不是學習產品**: 89 工具全部輸出文字文件;實測 DSE 物理答案鍵錯誤、HKDSE 標準庫不存在、Science Lab 只是紙本格式。它驗證了「通用 LLM wrapper 做不到考試級精度」——這正是我們 HKDSE 原生 + 互動模擬 + 數值驗證的護城河。
- **真正要盯的是 Sayo**: MagicSchool 的每個新功能(Studio 編輯器、全班批改 Workflow、學生 rooms)都是 Sayo 兩三季後的路線圖。我們的 wedge 不變:**學生 TFZ 互動實驗室 × 家長付費 × HKDSE 原生**;教師翼只做 UX 借鑑,不做品類跟隨。
