export interface Wallet {
  money: number;
  bankrupt: boolean;
}

export interface ChoiceOption {
  id: string;
  label: string;
  accept: boolean;
  tax?: number;
  personalGain?: number;
  grantEachSolvent?: number;
  explanation: string;
}

export interface ChoiceEvent {
  id: string;
  title: string;
  prompt: string;
  options: ChoiceOption[];
}

/** Cash luck card drawn only on the chance square. */
export interface FortuneEvent {
  id: string;
  title: string;
  text: string;
  /** Positive adds cash. Negative is a payment. */
  personalDelta: number;
}

export interface OpportunityOption {
  id: string;
  label: string;
  correct: boolean;
  explanation: string;
}

export interface OpportunityQuestion {
  prompt: string;
  options: OpportunityOption[];
}

export const GAME_ASSESSABLE_INCOME = 8000;
export const GAME_BASIC_ALLOWANCE = 3000;
export const GAME_SALARIES_PERCENT = 10;
export const GAME_RATES_PERCENT = 5;
export const GAME_GOV_RENT_PERCENT = 3;
export const PUBLIC_SERVICE_TAX = 500;
export const PUBLIC_SERVICE_GRANT = 200;
export const FORTUNE_YUM_CHA_COST = 200;
export const FORTUNE_CANDY_GAIN = 150;
export const FORTUNE_PRIZE_GAIN = 300;

export const UTILITY_RULE_TEXT =
  '這是遊戲規則，不是香港規管下的真實電費，也不是真實煤氣費。實用設施租金等於兩顆骰子點數之和乘以 4；若同一位玩家同時擁有中電和煤氣，則乘以 10。中電的真實電費受管制計劃協議規管，按用電量及燃料費調整等計算；煤氣費按用氣量計算。兩者都不是擲骰決定。';

export function suggestedRateableValue(price: number): number {
  return Math.round(price * 0.5);
}

export function payOrBankrupt(wallet: Wallet, amount: number): { wallet: Wallet; paid: boolean } {
  if (wallet.bankrupt) {
    return { wallet: { money: Math.max(0, wallet.money), bankrupt: true }, paid: false };
  }
  if (amount <= 0) {
    return { wallet: { money: Math.max(0, wallet.money), bankrupt: false }, paid: true };
  }
  if (wallet.money < amount) {
    return { wallet: { money: 0, bankrupt: true }, paid: false };
  }
  return { wallet: { money: wallet.money - amount, bankrupt: false }, paid: true };
}

export function resolveJailFine(money: number, fine: number): { money: number; bankrupt: boolean } {
  return payOrBankrupt({ money, bankrupt: false }, fine).wallet;
}

export function salariesTaxBill() {
  const net = Math.max(0, GAME_ASSESSABLE_INCOME - GAME_BASIC_ALLOWANCE);
  const amount = Math.round((net * GAME_SALARIES_PERCENT) / 100);
  const explanation =
    '薪俸稅按淨入息計算，並設有免稅額，不是踏中棋格的定額罰款。淨應課稅入息＝應評稅入息 − 扣除 − 免稅額，再按累進稅率計算；亦會與標準稅率（按未扣免稅額的淨入息）比較，取較低者。下面用縮小的遊戲數字示範「先扣免稅額，再計稅」，不是稅務局的真實稅階或免稅額。';
  const lines = [
    `遊戲應評稅入息 $${GAME_ASSESSABLE_INCOME}`,
    `減遊戲基本免稅額 $${GAME_BASIC_ALLOWANCE}`,
    `淨應課稅入息 $${net}`,
    `遊戲示範稅率 ${GAME_SALARIES_PERCENT}% → $${amount}`,
  ];
  return { amount, net, explanation, lines, name: '薪俸稅' as const };
}

export function ratesAndRentBill(properties: { name: string; rateableValue: number }[]) {
  const list = properties.filter((p) => p.rateableValue > 0);
  const rateableTotal = list.reduce((sum, p) => sum + p.rateableValue, 0);
  const rates = Math.round((rateableTotal * GAME_RATES_PERCENT) / 100);
  const govRent = Math.round((rateableTotal * GAME_GOV_RENT_PERCENT) / 100);
  const amount = rates + govRent;
  const explanation =
    rateableTotal === 0
      ? '差餉和地租都按物業的應課差餉租值計算，不是踏中棋格的定額罰款。你目前沒有住宅物業，沒有應課差餉租值，所以本期遊戲稅款是 $0。'
      : '差餉按應課差餉租值乘以差餉徵收率計算，不是踏中棋格的定額罰款。徵收率由立法會按年通過；遊戲用 5% 只作示範，不是真實差餉單。許多新批租約的地租是應課差餉租值的 3%，遊戲一併示範，金額仍只按你在棋盤上的住宅物業計算。';
  const lines =
    rateableTotal === 0
      ? ['應課差餉租值合計 $0', '本期不用繳付']
      : [
          ...list.map((p) => `${p.name}：應課差餉租值 $${p.rateableValue}`),
          `合計應課差餉租值 $${rateableTotal}`,
          `遊戲差餉 ${GAME_RATES_PERCENT}% = $${rates}`,
          `遊戲地租 ${GAME_GOV_RENT_PERCENT}% = $${govRent}`,
          `本期合計 $${amount}`,
        ];
  return { amount, rates, govRent, rateableTotal, explanation, lines, name: '差餉地租' as const };
}

export function utilityMultiplier(utilitiesOwned: number): number {
  return utilitiesOwned >= 2 ? 10 : 4;
}

export function utilityRent(diceSum: number, utilitiesOwned: number): number {
  return diceSum * utilityMultiplier(utilitiesOwned);
}

export function describeUtilityCharge(diceSum: number, utilitiesOwned: number): string {
  const multiplier = utilityMultiplier(utilitiesOwned);
  const amount = diceSum * multiplier;
  return `遊戲規則：骰子點數 ${diceSum} × ${multiplier} = $${amount}。${UTILITY_RULE_TEXT}`;
}

export function opportunityQuestion(name: string, price: number): OpportunityQuestion {
  return {
    prompt: `你用 $${price} 買下了${name}。假設這筆錢的最佳替代用途是留作現金，用來應付之後的租金和稅款。這次購買的機會成本是什麼？`,
    options: [
      {
        id: 'next-best',
        label: `放棄把 $${price} 留作現金，以應付租金和稅款`,
        correct: true,
        explanation:
          '正確。機會成本是所放棄的最高價值選擇，也就是這筆錢的次佳用途。它不是所有沒買的地加總，擁有這塊地也不代表機會成本是零。',
      },
      {
        id: 'everything',
        label: '棋盤上所有沒有買下的地皮和建築',
        correct: false,
        explanation: '不對。機會成本只計次佳的那一個選擇，不會把所有放棄了的選項加在一起。',
      },
      {
        id: 'zero',
        label: '零，因為這塊地已經屬於你',
        correct: false,
        explanation: '不對。得到這塊地的同時，你放棄了次佳用途。擁有土地不代表機會成本是零。',
      },
    ],
  };
}

/** Student decisions on 獅子山精神. Not the 時運高低 luck deck. */
export const CHOICE_EVENTS: ChoiceEvent[] = [
  {
    id: 'perseverance',
    title: '堅毅：未做完的那一份',
    prompt: '小組報告還有一晚。你可以補做自己未完成的部分，也可以刪走同學的名字、假裝已經做完。沒有獎金，也沒有人保證你會因此賺錢。',
    options: [
      {
        id: 'finish',
        label: '留下，補做自己未完成的部分',
        accept: true,
        explanation: '這是堅毅：把自己答應的部分做完。遊戲不會因為你留下而派錢，也不會把它當成穩賺。',
      },
      {
        id: 'honest-continue',
        label: '如實說今晚做不完哪一節，並約好明天補上',
        accept: true,
        explanation: '堅毅也包括如實面對做不完的地方，然後繼續。遊戲不會扣錢，也不會發放獎金。',
      },
      {
        id: 'pretend',
        label: '刪走同學名字，假裝全部已經做好',
        accept: false,
        explanation: '這不是堅毅。請改選補做自己的部分，或如實說明進度再補上。',
      },
    ],
  },
  {
    id: 'tax-public-service',
    title: '公共責任：繳稅與公共服務',
    prompt: `這是公共責任。遊戲庫房要以稅款支付一項公共服務。兩項都繳同樣的遊戲稅 $${PUBLIC_SERVICE_TAX}，差別是稅款優先用於哪一項。稅不是踏中棋格的罰金。`,
    options: [
      {
        id: 'medical',
        label: `優先用於公營醫療，並繳 $${PUBLIC_SERVICE_TAX}`,
        accept: true,
        tax: PUBLIC_SERVICE_TAX,
        grantEachSolvent: PUBLIC_SERVICE_GRANT,
        explanation: `你繳交遊戲稅 $${PUBLIC_SERVICE_TAX}，優先用於公營醫療。稅不是罰金，而是公共服務的資金。這次選擇的機會成本，是放棄以同一筆稅款優先用於公營教育。每位未破產玩家獲發 $${PUBLIC_SERVICE_GRANT} 遊戲公共服務津貼。`,
      },
      {
        id: 'education',
        label: `優先用於公營教育，並繳 $${PUBLIC_SERVICE_TAX}`,
        accept: true,
        tax: PUBLIC_SERVICE_TAX,
        grantEachSolvent: PUBLIC_SERVICE_GRANT,
        explanation: `你繳交遊戲稅 $${PUBLIC_SERVICE_TAX}，優先用於公營教育。稅不是罰金，而是公共服務的資金。這次選擇的機會成本，是放棄以同一筆稅款優先用於公營醫療。每位未破產玩家獲發 $${PUBLIC_SERVICE_GRANT} 遊戲公共服務津貼。`,
      },
      {
        id: 'refuse-tax',
        label: '把它當成定額罰款，所以拒絕繳稅',
        accept: false,
        explanation: '不對。薪俸稅按淨入息和免稅額計算，差餉按應課差餉租值計算，都不是棋盤上的定額罰款。本課不會把拒絕繳稅當成得分方法。請選擇稅款用於哪一項公共服務。',
      },
    ],
  },
  {
    id: 'refuse-sure-win',
    title: '拒絕可疑的穩賺',
    prompt: '有訊息說：「股票投資必賺，現在轉帳，下週保證翻倍。」股票價格可升可跌，沒有人能保證必賺。你怎樣做？',
    options: [
      {
        id: 'refuse',
        label: '拒絕，不轉帳，也不參與',
        accept: true,
        explanation: '正確。股票沒有穩賺。所謂保證翻倍、又要你先轉帳，不應相信，也不應參與。遊戲不會因為你拒絕而扣錢，也不會發放任何必賺獎金。',
      },
      {
        id: 'believe',
        label: '相信必賺，準備轉帳',
        accept: false,
        explanation: '不對。沒有人能保證股票投資必賺。遊戲不會發放穩賺獎金，也不會帶你完成轉帳。請改選拒絕。',
      },
    ],
  },
];

/** Luck deck drawn only by the 時運高低 square. */
export const FORTUNE_EVENTS: FortuneEvent[] = [
  {
    id: 'yum-cha',
    title: '飲茶',
    text: `時運高低：今日飲茶請客，要付出遊戲現金 $${FORTUNE_YUM_CHA_COST}。`,
    personalDelta: -FORTUNE_YUM_CHA_COST,
  },
  {
    id: 'candy',
    title: '派糖',
    text: `時運高低：喜事派糖，你獲得遊戲現金 $${FORTUNE_CANDY_GAIN}。`,
    personalDelta: FORTUNE_CANDY_GAIN,
  },
  {
    id: 'small-prize',
    title: '遊戲小獎',
    text: `時運高低：你中獎，獲得遊戲現金 $${FORTUNE_PRIZE_GAIN}。這只是這一格的遊戲運氣，沒有人保證下次還會中。`,
    personalDelta: FORTUNE_PRIZE_GAIN,
  },
];

export function applyChoice(
  wallets: Wallet[],
  actorIndex: number,
  option: ChoiceOption,
): { wallets: Wallet[]; accepted: boolean; note: string } {
  const next = wallets.map((w) => ({ money: Math.max(0, w.money), bankrupt: w.bankrupt }));
  if (!option.accept) {
    return { wallets: next, accepted: false, note: option.explanation };
  }
  const actor = next[actorIndex];
  if (!actor || actor.bankrupt) {
    return { wallets: next, accepted: false, note: '這位玩家已經破產，不能再作選擇。' };
  }
  if (option.tax && option.tax > 0) {
    next[actorIndex] = payOrBankrupt(actor, option.tax).wallet;
  }
  if (option.personalGain && option.personalGain > 0 && !next[actorIndex].bankrupt) {
    next[actorIndex] = {
      ...next[actorIndex],
      money: next[actorIndex].money + option.personalGain,
    };
  }
  if (option.grantEachSolvent && option.grantEachSolvent > 0) {
    for (let i = 0; i < next.length; i++) {
      if (!next[i].bankrupt) {
        next[i] = { ...next[i], money: next[i].money + option.grantEachSolvent };
      }
    }
  }
  return { wallets: next, accepted: true, note: option.explanation };
}

export function applyFortune(
  wallets: Wallet[],
  actorIndex: number,
  card: FortuneEvent,
): { wallets: Wallet[]; note: string } {
  const next = wallets.map((w) => ({ money: Math.max(0, w.money), bankrupt: w.bankrupt }));
  const actor = next[actorIndex];
  if (!actor || actor.bankrupt) {
    return { wallets: next, note: '這位玩家已經破產，不能再抽時運高低。' };
  }
  if (card.personalDelta > 0) {
    next[actorIndex] = { ...actor, money: actor.money + card.personalDelta };
    return { wallets: next, note: card.text };
  }
  if (card.personalDelta < 0) {
    const result = payOrBankrupt(actor, -card.personalDelta);
    next[actorIndex] = result.wallet;
    if (!result.paid) {
      return { wallets: next, note: `${card.text} 付不出這筆遊戲運氣開支，宣佈破產。` };
    }
  }
  return { wallets: next, note: card.text };
}
