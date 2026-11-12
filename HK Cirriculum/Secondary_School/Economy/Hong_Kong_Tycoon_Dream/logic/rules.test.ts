import assert from 'node:assert/strict';
import fs from 'node:fs';
import {
  CHOICE_EVENTS,
  FORTUNE_CANDY_GAIN,
  FORTUNE_EVENTS,
  FORTUNE_PRIZE_GAIN,
  FORTUNE_YUM_CHA_COST,
  GAME_BASIC_ALLOWANCE,
  GAME_ASSESSABLE_INCOME,
  PUBLIC_SERVICE_GRANT,
  PUBLIC_SERVICE_TAX,
  UTILITY_RULE_TEXT,
  applyChoice,
  applyFortune,
  opportunityQuestion,
  ratesAndRentBill,
  resolveJailFine,
  salariesTaxBill,
  utilityRent,
} from './rules.ts';

const passed: string[] = [];
function check(name: string, fn: () => void) {
  fn();
  passed.push(name);
}

check('salaries tax uses net income after allowance', () => {
  const bill = salariesTaxBill();
  const net = GAME_ASSESSABLE_INCOME - GAME_BASIC_ALLOWANCE;
  assert.equal(bill.amount, Math.round(net * 0.1));
  assert.equal(bill.amount, 500);
  assert.match(bill.explanation, /淨入息/);
  assert.match(bill.explanation, /免稅額/);
  assert.match(bill.explanation, /不是踏中棋格的定額罰款/);
});

check('rates follow rateable value and are zero without property', () => {
  const none = ratesAndRentBill([]);
  assert.equal(none.amount, 0);
  assert.match(none.explanation, /應課差餉租值/);
  const one = ratesAndRentBill([{ name: '長洲', rateableValue: 300 }]);
  assert.equal(one.rates, 15);
  assert.equal(one.govRent, 9);
  assert.equal(one.amount, 24);
  const two = ratesAndRentBill([
    { name: '長洲', rateableValue: 300 },
    { name: '南丫島', rateableValue: 300 },
  ]);
  assert.equal(two.amount, 48);
});

check('jail fine never leaves negative cash', () => {
  for (const money of [0, 1, 499, 500, 800]) {
    const result = resolveJailFine(money, 500);
    assert.ok(result.money >= 0);
    if (money < 500) {
      assert.equal(result.bankrupt, true);
      assert.equal(result.money, 0);
    } else {
      assert.equal(result.bankrupt, false);
      assert.equal(result.money, money - 500);
    }
  }
});

check('public-service grant is paid to every solvent player', () => {
  const medical = CHOICE_EVENTS.find((event) => event.id === 'tax-public-service')!.options.find((opt) => opt.id === 'medical')!;
  assert.equal(medical.grantEachSolvent, PUBLIC_SERVICE_GRANT);
  assert.equal(medical.tax, PUBLIC_SERVICE_TAX);
  assert.match(medical.explanation, /每位未破產玩家獲發 \$200/);
  const paid = applyChoice(
    [
      { money: 1000, bankrupt: false },
      { money: 40, bankrupt: false },
      { money: 10, bankrupt: true },
    ],
    0,
    medical,
  );
  assert.equal(paid.accepted, true);
  assert.equal(paid.wallets[0].money, 1000 - 500 + 200);
  assert.equal(paid.wallets[1].money, 240);
  assert.equal(paid.wallets[2].money, 10);
  assert.equal(paid.wallets[2].bankrupt, true);

  const broke = applyChoice(
    [
      { money: 40, bankrupt: false },
      { money: 100, bankrupt: false },
    ],
    0,
    medical,
  );
  assert.equal(broke.wallets[0].bankrupt, true);
  assert.equal(broke.wallets[0].money, 0);
  assert.equal(broke.wallets[1].money, 300);
});

check('choice events require a decision and drop sure-win payouts', () => {
  const blob = JSON.stringify(CHOICE_EVENTS);
  assert.equal(blob.includes('六合彩'), false);
  assert.equal(blob.includes('股票投資獲利'), false);
  assert.equal(blob.includes('飲茶'), false);
  assert.equal(blob.includes('派糖'), false);
  assert.equal(blob.includes('中獎'), false);
  assert.deepEqual(CHOICE_EVENTS.map((event) => event.id), ['perseverance', 'tax-public-service', 'refuse-sure-win']);
  assert.match(CHOICE_EVENTS[0].title, /堅毅/);
  assert.match(CHOICE_EVENTS[1].title, /公共責任/);
  assert.match(CHOICE_EVENTS[2].title, /拒絕可疑/);
  for (const opt of CHOICE_EVENTS[0].options) {
    assert.equal(opt.personalGain ?? 0, 0);
    assert.equal(opt.grantEachSolvent ?? 0, 0);
  }
  const refuse = CHOICE_EVENTS.find((event) => event.id === 'refuse-sure-win')!;
  const believe = refuse.options.find((opt) => opt.id === 'believe')!;
  const walkAway = refuse.options.find((opt) => opt.id === 'refuse')!;
  assert.equal(believe.accept, false);
  assert.equal(believe.personalGain ?? 0, 0);
  assert.equal(believe.grantEachSolvent ?? 0, 0);
  assert.equal(walkAway.accept, true);
  assert.equal(walkAway.personalGain ?? 0, 0);
  const rejected = applyChoice([{ money: 2000, bankrupt: false }], 0, believe);
  assert.equal(rejected.accepted, false);
  assert.equal(rejected.wallets[0].money, 2000);
  for (const event of CHOICE_EVENTS) {
    for (const opt of event.options) {
      if ((opt.personalGain ?? 0) > 0) {
        assert.equal(opt.label.includes('股票'), false);
      }
    }
  }
});

check('fortune cards are a separate luck deck', () => {
  const choiceIds = CHOICE_EVENTS.map((event) => event.id);
  const fortuneIds = FORTUNE_EVENTS.map((event) => event.id);
  assert.deepEqual(fortuneIds, ['yum-cha', 'candy', 'small-prize']);
  assert.equal(choiceIds.some((id) => fortuneIds.includes(id)), false);
  const blob = JSON.stringify(FORTUNE_EVENTS);
  assert.equal(blob.includes('獅子山精神'), false);
  assert.equal(blob.includes('六合彩'), false);
  assert.equal(blob.includes('必中'), false);
  assert.match(blob, /飲茶/);
  assert.match(blob, /派糖/);
  assert.match(blob, /中獎/);
  const yumCha = FORTUNE_EVENTS[0];
  const broke = applyFortune([{ money: 50, bankrupt: false }], 0, yumCha);
  assert.equal(broke.wallets[0].bankrupt, true);
  assert.equal(broke.wallets[0].money, 0);
  assert.match(broke.note, /破產/);
  const paid = applyFortune([{ money: 1000, bankrupt: false }], 0, yumCha);
  assert.equal(paid.wallets[0].money, 1000 - FORTUNE_YUM_CHA_COST);
  assert.equal(paid.wallets[0].bankrupt, false);
  const candy = applyFortune([{ money: 1000, bankrupt: false }, { money: 10, bankrupt: true }], 0, FORTUNE_EVENTS[1]);
  assert.equal(candy.wallets[0].money, 1000 + FORTUNE_CANDY_GAIN);
  assert.equal(candy.wallets[1].money, 10);
  const prize = applyFortune([{ money: 1000, bankrupt: false }], 0, FORTUNE_EVENTS[2]);
  assert.equal(prize.wallets[0].money, 1000 + FORTUNE_PRIZE_GAIN);
});

check('buying land asks for the next-best opportunity cost', () => {
  const question = opportunityQuestion('屯門', 1400);
  const correct = question.options.filter((opt) => opt.correct);
  assert.equal(correct.length, 1);
  assert.equal(correct[0].id, 'next-best');
  assert.match(question.prompt, /屯門/);
  assert.match(question.prompt, /\$1400/);
});

check('utility charges are labelled as game rules', () => {
  assert.equal(utilityRent(7, 1), 28);
  assert.equal(utilityRent(7, 2), 70);
  assert.match(UTILITY_RULE_TEXT, /遊戲規則/);
  assert.match(UTILITY_RULE_TEXT, /不是香港規管下的真實電費/);
  assert.match(UTILITY_RULE_TEXT, /煤氣/);
  assert.match(UTILITY_RULE_TEXT, /不是擲骰決定/);
});

check('source no longer logs audio or teaches a fixed tax fine', () => {
  const read = (rel: string) => fs.readFileSync(new URL(rel, import.meta.url), 'utf8');
  const audio = read('../services/audio.ts');
  const game = read('../hooks/useGame.ts');
  const board = read('../constants.ts');
  assert.match(audio, /AudioContext/);
  assert.match(audio, /createOscillator/);
  assert.match(audio, /createBufferSource/);
  assert.equal(audio.includes('console.log'), false);
  assert.match(game, /resolveJailFine/);
  assert.match(game, /applyChoice/);
  assert.match(game, /applyFortune/);
  assert.match(game, /opportunityQuestion/);
  assert.match(game, /spaceType === SpaceType\.COMMUNITY/);
  assert.match(game, /CHOICE_EVENTS\[/);
  assert.match(game, /spaceType === SpaceType\.CHANCE/);
  assert.match(game, /FORTUNE_EVENTS\[/);
  assert.equal(game.includes('const event = CHOICE_EVENTS['), false);
  assert.equal(game.includes('player.money - JAIL_FINE'), false);
  assert.equal(game.includes('六合彩'), false);
  assert.equal(game.includes('股票投資獲利'), false);
  assert.match(board, /按淨入息，有免稅額/);
  assert.match(board, /按應課差餉租值/);
  assert.match(board, /不是真實電費/);
  assert.equal(board.includes('六合彩'), false);
});

console.log(`rules.test: ${passed.length} passed`);
