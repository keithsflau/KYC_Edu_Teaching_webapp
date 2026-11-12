import { verseNotes, verseNoteFallback } from './verse-notes.mjs';

export function parseVerseRef(label) {
  const m = String(label).match(/(\d+:\d+(?:[–\-]\d+)?)/);
  return m ? m[1] : String(label).trim();
}

export function defaultLangForSlug(slug, category) {
  if (category === '專題' || category === '摩西五經') return 'hebrew';
  const nt = new Set([
    '馬太福音', '馬可福音', '路加福音', '約翰福音', '使徒行傳',
    '羅馬書', '哥林多前書', '哥林多後書', '加拉太書', '以弗所書',
    '腓立比書', '歌羅西書', '帖撒羅尼迦前書', '帖撒羅尼迦後書',
    '提摩太前書', '提摩太後書', '提多書', '腓利門書', '希伯來書',
    '雅各書', '彼得前書', '彼得後書', '約翰一書', '約翰二書', '約翰三書',
    '猶大書', '啟示錄',
  ]);
  if (nt.has(slug)) return 'greek';
  return 'hebrew';
}

export function lookupVerseNote(slug, label, category, text = '') {
  const ref = parseVerseRef(label);
  const book = verseNotes[slug];
  if (book?.[ref]) return book[ref];

  const lang = defaultLangForSlug(slug, category);
  const fb = verseNoteFallback[lang]?.[ref];
  if (fb) {
    return {
      lang,
      langLabel: lang === 'greek' ? '希臘文' : '希伯來文',
      snippet: fb.snippet,
      transliteration: fb.transliteration,
      words: [{ term: fb.snippet.split(' ')[0], translit: '', gloss: fb.gloss, note: fb.note }],
    };
  }

  const pattern = matchTextPattern(text, lang);
  if (pattern) {
    return {
      lang,
      langLabel: lang === 'greek' ? '希臘文' : '希伯來文',
      snippet: pattern.snippet,
      transliteration: pattern.translit,
      words: [{ term: pattern.snippet, translit: pattern.translit, gloss: pattern.gloss, note: pattern.note }],
    };
  }

  if (book) {
    const partial = Object.entries(book).find(([k]) => ref.startsWith(k.split('–')[0]));
    if (partial) return partial[1];
  }
  return null;
}

const TEXT_PATTERNS = {
  hebrew: [
    { re: /聽命|聽從|聽他的話/, snippet: 'שָׁמַע', translit: 'shema', gloss: '聽從', note: '希伯來文「聽」常含聽從、行動回應（示瑪）；順服不只是聽見，而是遵行。' },
    { re: /稱義|為義|他的義/, snippet: 'צְדָקָה', translit: 'tsedaqah', gloss: '義', note: '在舊約語境可指「合宜、忠信、公義關係」；新約因信稱義承接此字根。' },
    { re: /慈愛|憐憫|恩/, snippet: 'חֶסֶד', translit: 'chesed', gloss: '慈愛、信實之愛', note: '指盟約中的堅定慈愛，不只是情緒，而是信實的行動。' },
    { re: /安息/, snippet: 'שַׁבָּת', translit: 'shabbat', gloss: '安息', note: '與「停止、歇工」相關；指向神完成創造之工，以及與神同在的安息。' },
    { re: /約|立約|之約/, snippet: 'בְּרִית', translit: 'berit', gloss: '約', note: '神與子民立約的關係框架；常伴隨應許、記號與責任。' },
    { re: /敬畏/, snippet: 'יִרְאָה', translit: 'yirah', gloss: '敬畏', note: '對神尊榮的尊崇與順服，是智慧與敬拜的起點（箴 9:10）。' },
    { re: /罪|犯罪/, snippet: 'חַטָּאת', translit: 'chattat', gloss: '罪', note: '原意「錯過標的」；指偏離神的道路與標準。' },
    { re: /救|拯救|救恩/, snippet: 'יְשׁוּעָה', translit: 'yeshuah', gloss: '拯救', note: '與「耶穌」希伯來名同源字根；指神介入使人得釋放。' },
    { re: /聖|分別為聖/, snippet: 'קֹדֶשׁ', translit: 'qodesh', gloss: '聖', note: '指分別歸神、屬於神；聖潔是關係性的，不只是道德完美。' },
    { re: /信|信靠/, snippet: 'אָמַן', translit: 'aman', gloss: '信靠、堅定', note: '「信」含可靠、堅立；因信稱義的「信」是信靠神的應許。' },
    { re: /心|內心/, snippet: 'לֵב', translit: 'lev', gloss: '心', note: '希伯來「心」指思想、意志、情感整體，非僅感情。' },
    { re: /耶和華|神/, snippet: 'יְהוָה', translit: 'YHWH', gloss: '自有永有', note: '神向摩西自我啟示的聖名；表明信實、同在與立約的救贖神。' },
    { re: /平安/, snippet: 'שָׁלוֹם', translit: 'shalom', gloss: '平安、完整', note: '不只是無戰爭，而是關係和諧、完整與福祉。' },
    { re: /愛/, snippet: 'אַהֲבָה', translit: 'ahavah', gloss: '愛', note: '可指出於盟約的忠誠之愛，亦見於「你要盡心…愛耶和華你的神」。' },
    { re: /榮光|榮耀/, snippet: 'כָּבוֹד', translit: 'kavod', gloss: '榮耀、重量', note: '原意「重量、尊榮」；神的榮光顯現表明祂同在。' },
  ],
  greek: [
    { re: /恩典|恩/, snippet: 'χάρις', translit: 'charis', gloss: '恩典', note: '指神主動、不配得的恩惠；救恩本乎恩（弗 2:8）。' },
    { re: /信|信心/, snippet: 'πίστις', translit: 'pistis', gloss: '信心', note: '指信靠、忠信；是領受救恩的管道，非功勞。' },
    { re: /愛/, snippet: 'ἀγάπη', translit: 'agape', gloss: '愛', note: '新約中常指出於意志、犧牲的愛；神就是愛（約一 4:8）。' },
    { re: /義|稱義/, snippet: 'δικαιοσύνη', translit: 'dikaiosyne', gloss: '義', note: '指合宜的關係狀態；因信稱義是神所賜的義的狀態。' },
    { re: /罪/, snippet: 'ἁμαρτία', translit: 'hamartia', gloss: '罪', note: '原意「未中靶心」；指偏離神的道路。' },
    { re: /救|拯救/, snippet: 'σωτηρία', translit: 'soteria', gloss: '救恩', note: '全面的拯救：脱离罪、與神和好、終末的完滿。' },
    { re: /十字架|釘十字架/, snippet: 'σταυρός', translit: 'stauros', gloss: '十字架', note: '羅馬刑具；保羅以十字架為福音核心，也是與基督聯合的記號。' },
    { re: /復活/, snippet: 'ἀνάστασις', translit: 'anastasis', gloss: '復活', note: '字義「站起來」；基督復活是信仰根基（林前 15）。' },
    { re: /聖靈|靈/, snippet: 'πνεῦμα', translit: 'pneuma', gloss: '靈', note: '可指風、氣息、靈；聖靈是保惠師，引導、加力、成聖。' },
    { re: /道|話/, snippet: 'λόγος', translit: 'logos', gloss: '道', note: '約 1:1 的「道」指向創造之言與啟示的位格。' },
    { re: /門徒/, snippet: 'μαθητής', translit: 'mathetes', gloss: '門徒', note: '學員、跟隨者；不只是聽課，而是效法師傅的生命。' },
    { re: /國|天國/, snippet: 'βασιλεία', translit: 'basileia', gloss: '國度', note: '神的統治與主權；天國是現在已臨到、將來完滿的現實。' },
    { re: /知足/, snippet: 'αὐτάρκης', translit: 'autarkes', gloss: '自足、知足', note: '腓 4:11 的知足在基督裡得滿足，非斯多葛式的自我自足。' },
    { re: /和平|平安/, snippet: 'εἰρήνη', translit: 'eirene', gloss: '平安', note: '與神和好（羅 5:1）；亦指群體和睦。' },
    { re: /盼望/, snippet: 'ἐλπίς', translit: 'elpis', gloss: '盼望', note: '基於復活與應許的確據，非樂觀猜測。' },
  ],
};

function matchTextPattern(text, lang) {
  const list = TEXT_PATTERNS[lang] || TEXT_PATTERNS.hebrew;
  for (const p of list) {
    if (p.re.test(text)) return p;
  }
  return null;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function renderOriginalBlock(note) {
  if (!note) return '';
  const dir = note.lang === 'hebrew' ? 'rtl' : 'ltr';
  const words = (note.words || [])
    .map(
      (w) => `<div class="vo-word">
        <dt class="vo-term">${esc(w.term)}${w.translit ? ` <span class="vo-translit-inline">(${esc(w.translit)})</span>` : ''}</dt>
        <dd><strong>${esc(w.gloss)}</strong> — ${w.note}</dd>
      </div>`
    )
    .join('');

  return `<div class="verse-original">
    <div class="vo-head"><span class="vo-lang">${esc(note.langLabel || (note.lang === 'greek' ? '希臘文' : '希伯來文'))}</span></div>
    ${note.snippet ? `<div class="vo-snippet" dir="${dir}">${esc(note.snippet)}</div>` : ''}
    ${note.transliteration ? `<div class="vo-translit">${esc(note.transliteration)}</div>` : ''}
    ${words ? `<div class="vo-words">${words}</div>` : ''}
  </div>`;
}

export function renderVerseCard(slug, label, text, category, inlineNote) {
  const note = inlineNote || lookupVerseNote(slug, label, category, text);
  const original = renderOriginalBlock(note);
  return `<div class="verse-card border rounded-lg p-3">
    <div class="text-sm font-medium">${esc(label)}</div>
    <div class="verse-text mt-2 text-sm serif text-slate-700 border-t pt-2">
      <p class="verse-zh">${text}</p>
      ${original}
    </div>
  </div>`;
}

export function renderVerseSection(slug, verses, category, sectionTitle = '四、重點金句（點選展開 · 含原文註釋）') {
  if (!verses?.length) return '';
  const cards = verses
    .map((v) => {
      const label = v[0];
      const text = v[1];
      const note = v[2] || null;
      return renderVerseCard(slug, label, text, category, note);
    })
    .join('');
  return `<section class="ux-reveal bg-white rounded-2xl border p-6 sm:p-8">
      <h2 class="text-xl font-semibold serif mb-2">${sectionTitle}</h2>
      <p class="text-xs text-slate-500 mb-4">點選經文卡片展開；含希伯來文／希臘文重點字詞與簡要註釋。</p>
      <div class="space-y-2">${cards}</div>
    </section>`;
}
