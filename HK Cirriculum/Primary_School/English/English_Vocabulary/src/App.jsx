import { useMemo, useState } from 'react';

const US = [
  { re: /\bcookies\b/i, gb: 'biscuits', zh: '你寫了 cookies。香港小學用 biscuits。', en: 'You wrote cookies. British spelling here is biscuits.' },
  { re: /\bcookie\b/i, gb: 'biscuit', zh: '你寫了 cookie。英式英文寫 biscuit。', en: 'You wrote cookie. British English uses biscuit.' },
  { re: /\bfavorite\b/i, gb: 'favourite', zh: 'favorite 少了 u。英式拼寫是 favourite。', en: 'You wrote favorite. British spelling is favourite.' },
  { re: /\byogurt\b/i, gb: 'yoghurt', zh: 'yogurt 是美式。英式是 yoghurt。', en: 'You wrote yogurt. British spelling is yoghurt.' },
  { re: /\bcolor\b/i, gb: 'colour', zh: 'color 是美式。英式是 colour。', en: 'You wrote color. British spelling is colour.' }
];

const WORDS = [
  { word: 'cashier', zh: '在收銀台收錢的人', en: 'The person who takes your money at the till' },
  { word: 'biscuit', zh: '脆的烘烤小食。英式不叫 cookie', en: 'A crunchy baked snack. British English does not call it a cookie' },
  { word: 'cauliflower', zh: '白色花球的蔬菜', en: 'A vegetable with a white head' },
  { word: 'nutrition', zh: '食物給身體的好處', en: 'The goodness food gives your body' },
  { word: 'yoghurt', zh: '英式拼寫，不是 yogurt', en: 'The British spelling, not yogurt' }
];

const FLOWER = (
  <svg viewBox="0 0 64 64" width="72" height="72" aria-label="cauliflower">
    <ellipse cx="32" cy="56" rx="5" ry="7" fill="#3f8f4a" />
    <circle cx="24" cy="30" r="13" fill="#f7f4ee" stroke="#d9d3c7" />
    <circle cx="40" cy="28" r="13" fill="#fff" stroke="#d9d3c7" />
    <circle cx="32" cy="20" r="12" fill="#fbfaf6" stroke="#d9d3c7" />
    <circle cx="32" cy="34" r="11" fill="#efeae0" stroke="#d9d3c7" />
  </svg>
);

function britishVoice() {
  const synth = window.speechSynthesis;
  if (!synth) return null;
  return (synth.getVoices() || []).find((voice) => /^en-GB/i.test(voice.lang) || /UK English|United Kingdom/i.test(voice.name)) || null;
}

function speak(text) {
  if (window.GBAudio) {
    window.GBAudio.speak(text);
    return;
  }
  const voice = britishVoice();
  if (!voice || !window.speechSynthesis) return;
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'en-GB';
  utter.voice = voice;
  utter.rate = 0.9;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utter);
}

function Feedback({ result }) {
  if (!result) return null;
  return (
    <div style={{ marginTop: 16, padding: 12, borderRadius: 12, background: result.ok ? '#ecfdf5' : '#fef2f2', color: result.ok ? '#047857' : '#b91c1c' }}>
      {result.messages.map((item) => (
        <p key={item.zh} style={{ margin: '6px 0' }}>
          <strong>{item.zh}</strong>
          <span style={{ display: 'block' }}>{item.en}</span>
        </p>
      ))}
    </div>
  );
}

function checkSentence(text) {
  const trimmed = String(text || '').trim().replace(/\s+/g, ' ');
  if (!trimmed) return { ok: false, messages: [{ zh: '你還沒有寫句子。', en: 'You have not written a sentence yet.' }] };
  const messages = [];
  if (!/^[A-Z]/.test(trimmed)) {
    messages.push({ zh: `開頭是「${trimmed[0]}」，要大寫。`, en: `You started with "${trimmed[0]}". Use a capital letter.` });
  }
  if (!/[.!?]$/.test(trimmed)) {
    messages.push({ zh: '句末沒有句號。', en: 'There is no full stop at the end.' });
  }
  US.forEach((rule) => {
    const found = trimmed.match(rule.re);
    if (found) messages.push({ zh: `${rule.zh} 你寫的是「${found[0]}」。`, en: `${rule.en} British spelling is ${rule.gb}.` });
  });
  if (!/\b(biscuits?|cauliflower)\b/i.test(trimmed) && !/\bcookies?\b/i.test(trimmed)) {
    messages.push({ zh: '這句還沒有 biscuit、biscuits 或 cauliflower。', en: 'Mention biscuit, biscuits, or cauliflower.' });
  }
  if (!/\bplease\b/i.test(trimmed)) {
    messages.push({ zh: '請求裡還沒有 please。', en: 'A shop request needs please.' });
  }
  return { ok: messages.length === 0, messages };
}

const LISTEN = [
  {
    q: 'What does the customer want?',
    choices: [
      { id: 'both', text: 'a cauliflower and a packet of biscuits', ok: true, okZh: '對。顧客要 cauliflower 和 biscuits。', okEn: 'Yes. The customer asks for a cauliflower and biscuits.' },
      { id: 'cookie', text: 'lettuce and cookies', zh: '對話沒有 lettuce，也沒有 cookie。顧客要 cauliflower 和 biscuits。', en: 'The dialogue does not say lettuce or cookie. The customer wants a cauliflower and biscuits.' },
      { id: 'trolley', text: 'a trolley', zh: '顧客買的是食物，不是 trolley。', en: 'The customer asks for food, not a trolley.' }
    ]
  },
  {
    q: 'How much are the biscuits?',
    choices: [
      { id: '16', text: '$16', ok: true, okZh: '對。biscuits 是 sixteen dollars。', okEn: 'Yes. The biscuits are sixteen dollars.' },
      { id: '12', text: '$12', zh: '十二元是 cauliflower，不是 biscuits。', en: 'Twelve dollars is the cauliflower, not the biscuits.' },
      { id: '28', text: '$28', zh: '二十八元是 12 加 16，不是餅乾單價。', en: 'Twenty-eight dollars is 12 plus 16, not the biscuit price.' }
    ]
  }
];

const RECEIPT = [
  {
    q: 'Which spelling is on the receipt?',
    choices: [
      { id: 'gb', text: 'Yoghurt', ok: true, okZh: '對。收據是英式 Yoghurt。', okEn: 'Yes. The receipt prints British Yoghurt.' },
      { id: 'us', text: 'Yogurt', zh: 'Yogurt 是美式，收據印的是 Yoghurt。', en: 'Yogurt is American. The receipt prints Yoghurt.' }
    ]
  },
  {
    q: 'You pay with $50. How much change?',
    choices: [
      { id: '13', text: '$13', ok: true, okZh: '對。50 減 37 是 13。', okEn: 'Yes. 50 minus 37 is 13.' },
      { id: '37', text: '$37', zh: '$37 是總數，不是找回的錢。', en: '$37 is the total, not the change.' },
      { id: '22', text: '$22', zh: '$22 漏了 yoghurt 的 $9。總數是 $37，找回 $13。', en: '$22 forgets the yoghurt at $9. The total is $37, so the change is $13.' }
    ]
  }
];

function Question({ item, onAnswer }) {
  return (
    <div style={{ display: 'grid', gap: 10, marginTop: 12 }}>
      <p style={{ fontWeight: 800 }}>{item.q}</p>
      {item.choices.map((choice) => (
        <button key={choice.id} type="button" onClick={() => onAnswer(choice)} style={{ minHeight: 52, borderRadius: 12, fontWeight: 700 }}>
          {choice.text}
        </button>
      ))}
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState('words');
  const [listenIndex, setListenIndex] = useState(0);
  const [receiptIndex, setReceiptIndex] = useState(0);
  const [draft, setDraft] = useState('');
  const [result, setResult] = useState(null);
  const dialogue = useMemo(() => ([
    'Good morning. What would you like?',
    'I would like a cauliflower and a packet of biscuits, please.',
    'The cauliflower is twelve dollars and the biscuits are sixteen dollars.',
    'Here is your receipt.'
  ]), []);

  function playDialogue() {
    dialogue.reduce((chain, line) => chain.then(() => new Promise((resolve) => {
      speak(line);
      window.setTimeout(resolve, 900);
    })), Promise.resolve());
  }

  function pick(choice, advance) {
    if (choice.ok) {
      setResult({ ok: true, messages: [{ zh: choice.okZh, en: choice.okEn }] });
      advance();
      return;
    }
    setResult({ ok: false, messages: [{ zh: choice.zh, en: choice.en }] });
  }

  return (
    <main style={{ maxWidth: 760, margin: '0 auto', padding: 20, fontFamily: 'Segoe UI, Noto Sans TC, sans-serif' }}>
      <p><a href="../KS1/P3_Supermarket_Mission/index.html">課堂完整版 Class page</a></p>
      <h1>超市任務 Shopping mission</h1>
      <p>學習目標：聽對話、讀收據、用英式英文寫一句。英式語音只使用 en-GB；這部電腦若沒有英式語音，請用課堂頁的內建讀音。</p>
      {stage === 'words' && (
        <section>
          <div style={{ display: 'grid', gap: 12 }}>
            {WORDS.map((item) => (
              <button key={item.word} type="button" onClick={() => speak(item.en)} style={{ textAlign: 'left', padding: 12, borderRadius: 12 }}>
                {item.word === 'cauliflower' ? FLOWER : null}
                <strong>{item.word}</strong>
                <span style={{ display: 'block' }}>{item.zh}</span>
                <span style={{ display: 'block' }}>{item.en}</span>
              </button>
            ))}
          </div>
          <button type="button" onClick={() => setStage('listen')} style={{ marginTop: 16, minHeight: 52 }}>下一步：聽對話</button>
        </section>
      )}
      {stage === 'listen' && (
        <section>
          <button type="button" onClick={playDialogue} style={{ minHeight: 52 }}>聽對話 Hear the dialogue</button>
          <Question
            item={LISTEN[listenIndex]}
            onAnswer={(choice) => pick(choice, () => {
              if (listenIndex + 1 < LISTEN.length) setListenIndex(listenIndex + 1);
              else setStage('receipt');
            })}
          />
        </section>
      )}
      {stage === 'receipt' && (
        <section>
          <pre style={{ background: '#fffdf8', padding: 12, border: '1px dashed #d6d3d1' }}>{`SUNNY MARKET
Cauliflower   $12.00
Biscuits      $16.00
Yoghurt       $9.00
Total         $37.00
Cashier: Ms Chan`}</pre>
          <Question
            item={RECEIPT[receiptIndex]}
            onAnswer={(choice) => pick(choice, () => {
              if (receiptIndex + 1 < RECEIPT.length) setReceiptIndex(receiptIndex + 1);
              else setStage('write');
            })}
          />
        </section>
      )}
      {stage === 'write' && (
        <section>
          <p>I would like a packet of biscuits, please.</p>
          <button type="button" onClick={() => speak('I would like a packet of biscuits, please.')}>聽範例</button>
          <textarea value={draft} onChange={(event) => setDraft(event.target.value)} style={{ width: '100%', minHeight: 120, marginTop: 12 }} />
          <button type="button" onClick={() => {
            const checked = checkSentence(draft);
            setResult(checked);
            if (checked.ok) {
              speak(draft);
              setStage('done');
            }
          }}>檢查</button>
        </section>
      )}
      {stage === 'done' && <p>任務完成。你聽了對話、讀了收據，並寫了一句英式購物句。</p>}
      <Feedback result={result} />
    </main>
  );
}
