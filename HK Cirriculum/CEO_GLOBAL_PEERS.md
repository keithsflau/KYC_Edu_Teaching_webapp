# Global Peers & Competitive Landscape: EdTech Platform Audit

## 繁中董事會摘要 (Executive Summary)

針對我們即將推出的「HK DSE 互動實驗室 (Teach-From-Zero)」平台，我們對全球及亞洲區的 18 家主要教育科技競爭對手進行了深度審計。研究結果顯示，目前市場呈現兩極化：
1. **全球性的虛擬實驗室 (如 Labster, PhET, Beyond Labz)** 擁有頂尖的互動模擬技術，但缺乏對香港 DSE / 亞洲本土學制的深度適配，且多以 B2B 學校採購為主，難以直接說服家長訂閱。
2. **亞洲及本地平台 (如 Sayo.ai, Snapask, DSE Tools)** 高度適配本地考試，但產品多停留在「刷題 (Drill)」、「影片補習」或「純文字/對話 AI (Chatbot)」。他們缺乏針對理科與數學底層概念的「互動視覺化 (Interactive Manipulatives)」體驗。

**我們的核心白區 (White Space)** 位於「**高互動視覺化 ✕ 本地學制適配 ✕ B2C 家長訂閱**」的交界處。我們無需與 Sayo 拼題庫數量或與 Snapask 拼真人解題速度，而是應專注於利用 A1-A8 教學鷹架 (Pedagogical Scaffolding) 和動態實驗，壟斷家長對於「概念理解 (Conceptual Mastery)」的付費意願。Brilliant.org 的成功證明了遊戲化、概念先行的互動學習在 B2C 市場具有極高的變現潛力；我們應將此模式在地化，應用於 DSE 理科與數學。

---

## Positioning Map: Finding Our White Space

| Quadrant / Focus | Text / Conversational / Static Video | Deeply Interactive / Visual |
| :--- | :--- | :--- |
| **Assessment / Drill-focused** | **The Asian Red Ocean:** <br>Sayo.ai (Chat/OCR), Snapask, DSE Tools, AfterSchool, Geniebook | **Niche/Emerging:** <br>AI grading with some visual feedback, Math step-by-step solvers |
| **Concept / Exploration-focused** | **Traditional AI Tutors:** <br>Khanmigo, ChatGPT wrappers, LLM flashcard generators | **OUR WHITE SPACE:** <br>Brilliant.org (Global Math/CS), PhET (Free), Labster (B2B). <br>👉 **US:** HK DSE TFZ Bilingual Dynamic Labs |

**Where we win**: Global visual platforms ignore DSE. Local DSE platforms ignore visual interactive sims. We own the intersection.

---

## Global & Regional Peer Table

| Peer | Category | What They Sell / Price Band | Strength vs Our Wedge | Weakness We Can Exploit | Geo Focus | Threat |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Labster** | Science Sims | B2B 3D VR/Desktop Labs (Institutional pricing) | High-fidelity 3D game-like graphics; 300+ labs | B2B only; overkill/slow for quick DSE revision; not localized. | Global / US | M |
| **PhET (CU Boulder)** | Science Sims | Free B2C/B2B browser simulations (HTML5) | Best-in-class sandbox craft: multi-screen sims, always-on play/pause/step/slow-mo + reset, checkbox measurement tools, linked macro↔micro↔graph views, 正體中文 + a11y. Deep audit: `CEO_PHET_INSPIRE.md` | Sandbox-first with zero scaffolding; no DSE alignment, no parent dashboard, no wrong-book/adaptive drills. We pair their craft with TFZ + DSE + subscription. © CU — patterns only, never assets. | Global | M |
| **Beyond Labz** | Science Sims | B2B/B2C Open-ended labs (~$25-$50/yr) | Very realistic chemistry/physics sandboxes (Pearson backed). | UI is dated/clunky; built for US/AP, not HK DSE nuances. | Global / US | M |
| **Gizmos (ExploreLearning)** | Science Sims | B2B K-12 Sims | 550+ STEM cases focusing on real-world inquiry. | School-purchased; parents can't easily buy it for exam prep. | Global / US | L |
| **PraxiLabs** | Science Sims | B2B/B2C 3D Labs (~$50+/yr) | Immersive step-by-step procedures with built-in AI hints. | Focuses on lab procedures, less on quick concept mastery for written exams. | Middle East / Global | L |
| **Brilliant.org** | Concept Math/CS | B2C App ($160/yr) | Masterclass in TFZ UX. Bite-sized interactive concepts with Koji AI. | No physics/chem wet-lab sims; not mapped to public exams (DSE/IB). | Global | H |
| **Desmos** | Math Visualizer | Free (B2B/B2C) | The gold standard for graphing and math exploration. | It's a tool, not a guided DSE tutor. We can use/embed similar concepts. | Global | L |
| **MEL Science** | Parent-pay STEM | B2C Physical Kits + VR App (~$40/mo) | Incredible parent appeal; tangible boxes plus digital AR/VR. | Logistics heavy; expensive; mostly middle-school enrichment, not DSE. | Global | M |
| **Snapask** | HK/Asia Near-Peer | B2C On-demand Tutor / Video ($100+/mo) | 24/7 human tutor matching; massive existing user base. | Reactive (homework help) rather than proactive conceptual teaching. | HK / TW / SG | H |
| **Sayo.ai** | HK Near-Peer | B2B / B2C ($138/mo or $828/yr) | Strong in language, assessment, DSE mock exams, and teacher tools. | Science "experiments" are likely just text/chat wrappers. Visuals are weak. | HK | H |
| **MagicSchool AI** | Teacher-Time AI | Freemium: free teacher tier (all 89 tools) + paid Plus/Enterprise | Category leader for US teacher AI; superb UX polish (Studio doc editor, exemplars, prompt transparency); batch-grading Workflows; say the quiet part: it is Sayo's roadmap template. | Verified wrong numerical answer keys; no HKDSE standards DB (fell back to fabricated generic codes); 100% text documents — zero interactive sims; teacher-facing, not student/parent-pay. | US / Global | M (indirect; L direct) |
| **AfterSchool** | HK Near-Peer | B2C Video Courses (Per course pricing) | High production value local DSE star tutors; strong marketing. | Passive video watching; zero interactive manipulatives. | HK | M |
| **DSE Tools (DSEApp)** | HK Near-Peer | B2C Subject Apps (Freemium/Ads/Sub) | 11 unbundled apps; targeted question banks & AI grading. | Pure drill/exam prep. Extremely dry, no concept scaffolding. | HK | M |
| **Geniebook** | Asia Near-Peer | B2C AI Worksheets / Live Classes | Highly personalized AI study paths; strong parent dashboard. | Currently SG-curriculum focused; drill-heavy. | SG | M |
| **LessonHelix** | HK Near-Peer | B2B Teacher Workspace | Generates DSE/IB lesson plans and worksheets in 60s. | Teacher-facing only; no student UX or interactive labs. | HK | L |
| **Kognity** | Secondary Curriculum | B2B Interactive Textbooks | Excellent IB/IGCSE coverage; some interactive elements. | B2B only; expensive; no native HK DSE version. | Global | L |
| **Eduaide.ai** | Teacher AI | B2C/B2B (~$60/yr) | Built-in pedagogy (5E/Bloom's); seamless workspace | Too many options slows down quick generation | Global | L |
| **Diffit** | Teacher AI | B2C/B2B (~$150/yr) | 1-click text leveling; multi-modal (URL/video) to text | LMS export locked behind steep individual paywall | Global | L |
| **TeachMateAI** | Teacher AI | B2C/B2B (~$90/yr) | Solves specific admin pain points (e.g. report writing) | UI is a fragmented list of tools; no student UX | UK/Global | L |
| **Khanmigo** | Student Tutor | B2C (~$44/yr); Free for US Teachers | Strict Socratic method; massive trusted content library | Relies on text chat; lacks deep visual manipulatives | US/Global | M |
| **Century Tech** | Student Adaptive | B2B (Quote-based, ~$1500+/yr) | Neuroscience-backed adaptive pathways; strong dashboards | Video/quiz focused; lacks dynamic science sandboxes | UK/Global | L |
| **Toddle AI** | Student LMS | B2B (Quote-based) | Deep IB curriculum mapping; rich student portfolios | Heavy B2B implementation; not suited for B2C parents | Global | L |
| **Speak** | Language Speaking | B2C (~$84 - $165/yr) | High-frequency spoken reps; excellent roleplay UX | Lacks deep phoneme-level pronunciation correction | Global | L |
| **ELSA Speak** | Language Speaking | B2C (~$160/yr) | Granular phoneme-level correction; exam (IELTS) prep | Strict scoring (US accent bias); weak free tier | Global | L |
| **Praktika.ai** | Language Speaking | B2C (~$100/yr) | 3D AI Avatars create strong conversational immersion | Aggressive paywalls/trials; no permanent free tier | Global | L |
| **Snaildy** | SEN/Local HK | B2B (Quote-based) | Solves HK SEN paperwork pain; strong local NGO network | Purely administrative; lacks instructional/conceptual depth | HK | L |
| **Una Platform** | STEM/Local HK | B2B (Virtual Classroom ~$15-$36/yr) | Deep Microsoft integration; strong coding/MakeCode focus | B2B dependent; focused on coding, not DSE visual physics/chem | HK | M |

---

## Top 5 Learnings to Steal Ethically (UX & Product Patterns)

1. **Brilliant.org's "Play Until It Clicks" Micro-Interactions**
   - *What they do*: Instead of a long video, they present a single slider or drag-and-drop element, ask a question, and provide instant visual feedback. 
   - *How we steal it*: Our A1-A8 TFZ modules should avoid walls of text. Every step must require the student to interact (e.g., drag the temperature slider to see Le Chatelier shift) before moving on.
2. **MEL Science's Tangible Parent Dashboards**
   - *What they do*: They bridge the gap between kid's screen time and parent ROI by providing highly polished visual reports showing exactly what scientific principles were mastered.
   - *How we steal it*: Build a "Parent Subscriber" view that translates a student's completion of the `Chemical_Equilibrium_Kc` lab into a tangible DSE skill acquired, transitioning our "redeem proof" to green.
3. **Snapask's Zero-Friction Entry**
   - *What they do*: A student takes a photo and gets help in 60 seconds. The time-to-value is instantaneous.
   - *How we steal it*: Our "Soft-Launch Science Pack" must load instantly on mobile/iPad without a massive onboarding survey. Parents/students should be inside a dynamic experiment within 2 clicks.
4. **DSE Tools' Subject Unbundling (App-per-Subject logic)**
   - *What they do*: They don't force users into a generic "DSE Platform." They have a specific App/UI for Chemistry, one for History, etc., with tools tailored to that subject's marking scheme.
   - *How we steal it*: Ensure our Physics labs *feel* like a physics tool (oscilloscopes, vectors) and Chemistry labs *feel* like chemistry (beakers, molarity charts). Don't use a generic chatbot UI for everything like Sayo does.
5. **Gizmos' STEM Cases (Roleplay)**
   - *What they do*: They frame simulations around real-world problems (e.g., "You are a toxicologist figuring out why fish are dying" -> leads to pH/titration lab).
   - *How we steal it*: Contextualize our DSE labs. Instead of just "Calculate Kc", frame it as optimizing Haber Process yields for a fertilizer factory (which directly maps to DSE Form 6 curriculum).

---

## What NOT to Become

- **Do not become a "Chatbot Wrapper"**: Sayo.ai is vulnerable because their science experiments rely on text/chat interactions. Do not reduce our beautiful visual manipulatives to a generic ChatGPT text box.
- **Do not become a "Thin Quiz Farm"**: Platforms like DSE Tools own the pure multiple-choice/drilling space. We cannot win by offering 10,000 static questions. We win by offering 50 perfect, deep simulations.
- **Do not build for Schools First (Avoid the B2B Trap)**: Labster and Beyond Labz are incredibly slow to adopt because they sell to institutions. We must remain **Parent-Pay B2C**, focusing on direct-to-consumer polish and immediate exam-prep value.
- **Do not ignore Mobile/iPad**: Snapask and Brilliant win because they are native to the devices students actually use. If our React/Canvas manipulatives only work on a 15-inch desktop monitor, we lose the HK tutoring market.

---

## Recommended "Watch List" Quarterly

1. **Brilliant.org**: Watch their expansion into high school exam prep (if they ever map to AP/IB/GCSE, they become an existential threat).
2. **Sayo.ai**: Monitor their `maths.sayo.ai` and `sayo.ai/subjects` pages. If they acquire or build actual visual physics/chem engines instead of just OCR grading, our wedge narrows.
3. **Geniebook**: Watch for their expansion from Singapore into Hong Kong. Their AI-driven personalized drill paths are highly persuasive to Asian parents.
4. **Snapask**: Watch their pivot from human-tutors to AI. If they successfully integrate an "AI Tutor" that can draw or simulate concepts on demand, they merge their distribution with our product value.
5. **MagicSchool AI**: Watch quarterly as a **Sayo leading indicator** — its new ships (Studio document editor, batch class-feedback Workflows, student rooms) historically preview what HK teacher-AI clones roll out 2-3 quarters later. Also watch for any non-US curriculum databases or student-facing interactivity, which would upgrade it from indirect to direct threat. (Full live audit: `CEO_BEAT_MAGICSCHOOL.md`.)