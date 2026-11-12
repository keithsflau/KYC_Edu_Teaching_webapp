import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, SpaceType, PendingAction } from '../types';
import { BOARD_DATA, INITIAL_MONEY, GO_MONEY, JAIL_FINE } from '../constants';
import { audioService } from '../services/audio';
import {
  ChoiceEvent,
  applyChoice,
  describeUtilityCharge,
  opportunityQuestion,
  payOrBankrupt,
  ratesAndRentBill,
  resolveJailFine,
  salariesTaxBill,
  utilityRent,
  CHOICE_EVENTS,
  FORTUNE_EVENTS,
  applyFortune,
} from '../logic/rules';

const PLAYER_COLORS = ['bg-red-600', 'bg-blue-600', 'bg-green-600', 'bg-yellow-500'];

const pushLog = (prev: GameState, msg: string) => [msg, ...prev.log].slice(0, 20);

const releaseBankruptProperties = (spaces: GameState['spaces'], ownerId: number) =>
  spaces.map((s) =>
    s.ownerId === ownerId ? { ...s, ownerId: undefined, houses: 0, isMortgaged: false } : s
  );

const countActivePlayers = (players: Player[]) => players.filter((p) => !p.bankrupt).length;

const blankState = (): GameState => ({
  players: [],
  currentPlayerIndex: 0,
  spaces: JSON.parse(JSON.stringify(BOARD_DATA)),
  dice: [1, 1],
  isDoubles: false,
  doublesCount: 0,
  gamePhase: 'SETUP',
  log: [],
  pendingAction: null,
  rentPayment: null,
  decisionNote: null,
});

const conclude = (state: GameState): GameState => {
  const active = countActivePlayers(state.players);
  if (state.players.length > 0 && active <= 1 && state.players.some((p) => p.bankrupt)) {
    const winner = state.players.find((p) => !p.bankrupt);
    return {
      ...state,
      gamePhase: 'GAME_OVER',
      pendingAction: null,
      log: pushLog(state, winner ? `${winner.name} 贏得遊戲！` : '遊戲結束'),
    };
  }
  return state;
};

const markBankrupt = (players: Player[], spaces: GameState['spaces'], index: number) => {
  const nextPlayers = players.map((p, i) =>
    i === index ? { ...p, money: 0, bankrupt: true, isJailed: false, jailTurns: 0 } : p
  );
  return {
    players: nextPlayers,
    spaces: releaseBankruptProperties(spaces, nextPlayers[index].id),
  };
};

export const useGame = () => {
  const [state, setState] = useState<GameState>(blankState);

  useEffect(() => {
    if (state.rentPayment) {
      const timer = setTimeout(() => {
        setState((prev) => ({ ...prev, rentPayment: null }));
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.rentPayment]);

  const addLog = (msg: string) => {
    setState((prev) => ({ ...prev, log: [msg, ...prev.log].slice(0, 20) }));
  };

  const startGame = useCallback((playerCount: number) => {
    const newPlayers: Player[] = Array.from({ length: playerCount }).map((_, i) => ({
      id: i,
      name: `玩家 ${i + 1}`,
      color: PLAYER_COLORS[i % PLAYER_COLORS.length],
      money: INITIAL_MONEY,
      position: 0,
      isJailed: false,
      jailTurns: 0,
      getOutOfJailFreeCards: 0,
      bankrupt: false,
    }));

    setState({
      ...blankState(),
      players: newPlayers,
      gamePhase: 'ROLL',
      log: [`遊戲開始! ${playerCount} 位玩家準備就緒!`, '歡迎來到香江富豪夢!'],
    });
  }, []);

  const nextTurn = useCallback(() => {
    setState((prev) => {
      if (prev.gamePhase === 'GAME_OVER') return prev;
      const current = prev.players[prev.currentPlayerIndex];
      if (prev.isDoubles && current && !current.isJailed && !current.bankrupt) {
        return {
          ...prev,
          gamePhase: 'ROLL',
          pendingAction: null,
          decisionNote: null,
          log: pushLog(prev, `${current.name} 擲出孖寶，再擲一次！`),
        };
      }

      let nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      let loops = 0;
      while (prev.players[nextIndex].bankrupt && loops < prev.players.length) {
        nextIndex = (nextIndex + 1) % prev.players.length;
        loops++;
      }
      if (loops >= prev.players.length) return prev;

      const nextPlayer = prev.players[nextIndex];
      let nextPhase: GameState['gamePhase'] = 'ROLL';
      let nextPending: PendingAction | null = null;
      if (nextPlayer.isJailed) {
        nextPhase = 'ACTION';
        nextPending = { type: 'JAIL_DECISION' };
      }

      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        gamePhase: nextPhase,
        pendingAction: nextPending,
        decisionNote: null,
        isDoubles: false,
        doublesCount: 0,
        ...(nextPlayer.isJailed ? { log: pushLog(prev, `${nextPlayer.name} 在獄中，請選擇行動。`) } : {}),
      };
    });
  }, []);

  const handleJailDecision = useCallback((decision: 'PAY' | 'CARD') => {
    setState((prev) => {
      const player = prev.players[prev.currentPlayerIndex];
      if (!player || player.bankrupt) return prev;

      if (decision === 'PAY') {
        const fine = resolveJailFine(player.money, JAIL_FINE);
        if (fine.bankrupt) {
          audioService.play('jail');
          const cleared = markBankrupt(prev.players, prev.spaces, prev.currentPlayerIndex);
          return conclude({
            ...prev,
            ...cleared,
            gamePhase: 'END_TURN',
            pendingAction: null,
            decisionNote: '坐監罰金付不出時會破產，現金不會變成負數。',
            log: pushLog(prev, `${player.name} 付不出坐監罰金 $${JAIL_FINE}，宣佈破產。`),
          });
        }
        audioService.play('pay');
        const players = prev.players.map((p, i) =>
          i === prev.currentPlayerIndex
            ? { ...p, money: fine.money, isJailed: false, jailTurns: 0 }
            : p
        );
        return {
          ...prev,
          players,
          gamePhase: 'ROLL',
          pendingAction: null,
          decisionNote: null,
          log: pushLog(prev, `${player.name} 支付了 $${JAIL_FINE} 罰金，重獲自由！請擲骰子。`),
        };
      }

      if (decision === 'CARD') {
        if (player.getOutOfJailFreeCards <= 0) return prev;
        const players = prev.players.map((p, i) =>
          i === prev.currentPlayerIndex
            ? { ...p, getOutOfJailFreeCards: p.getOutOfJailFreeCards - 1, isJailed: false, jailTurns: 0 }
            : p
        );
        return {
          ...prev,
          players,
          gamePhase: 'ROLL',
          pendingAction: null,
          decisionNote: null,
          log: pushLog(prev, `${player.name} 使用了保釋卡，重獲自由！請擲骰子。`),
        };
      }
      return prev;
    });
  }, []);

  const rollDice = useCallback(() => {
    audioService.play('roll');
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = d1 === d2;

    setState((prev) => {
      const player = prev.players[prev.currentPlayerIndex];
      if (!player || player.bankrupt || prev.gamePhase === 'GAME_OVER') return prev;
      const newDoublesCount = isDoubles ? prev.doublesCount + 1 : 0;

      if (player.isJailed) {
        if (isDoubles) {
          const released = prev.players.map((p, i) =>
            i === prev.currentPlayerIndex ? { ...p, isJailed: false, jailTurns: 0 } : { ...p }
          );
          const moved = processMovement({ ...prev, players: released }, d1 + d2, [d1, d2], true, 0);
          return {
            ...moved,
            isDoubles: false,
            log: pushLog(moved, `${player.name} 擲出孖寶 (${d1}, ${d2})，成功越獄！`),
          };
        }
        const newTurns = player.jailTurns + 1;
        if (newTurns >= 3) {
          const fine = resolveJailFine(player.money, JAIL_FINE);
          if (fine.bankrupt) {
            audioService.play('jail');
            const cleared = markBankrupt(prev.players, prev.spaces, prev.currentPlayerIndex);
            return conclude({
              ...prev,
              ...cleared,
              dice: [d1, d2],
              isDoubles: false,
              doublesCount: 0,
              gamePhase: 'END_TURN',
              pendingAction: null,
              decisionNote: '坐監期滿仍付不出罰金，跟付不出租金一樣，進入破產。',
              log: pushLog(prev, `${player.name} 坐監期滿仍付不出罰金 $${JAIL_FINE}，不可留下負現金，宣佈破產。`),
            });
          }
          audioService.play('pay');
          const released = prev.players.map((p, i) =>
            i === prev.currentPlayerIndex ? { ...p, money: fine.money, isJailed: false, jailTurns: 0 } : { ...p }
          );
          const moved = processMovement({ ...prev, players: released }, d1 + d2, [d1, d2], false, 0);
          return { ...moved, log: pushLog(moved, `${player.name} 坐監期滿，支付罰金 $${JAIL_FINE} 後出獄。`) };
        }
        const players = prev.players.map((p, i) =>
          i === prev.currentPlayerIndex ? { ...p, jailTurns: newTurns } : p
        );
        return {
          ...prev,
          dice: [d1, d2],
          players,
          isDoubles: false,
          gamePhase: 'END_TURN',
          pendingAction: null,
          decisionNote: null,
          log: pushLog(prev, `${player.name} 越獄失敗 (${d1}, ${d2})，繼續坐監。`),
        };
      }

      if (newDoublesCount === 3) {
        audioService.play('jail');
        const players = prev.players.map((p, i) =>
          i === prev.currentPlayerIndex ? { ...p, position: 10, isJailed: true, jailTurns: 0 } : { ...p }
        );
        return {
          ...prev,
          dice: [d1, d2],
          isDoubles,
          doublesCount: 0,
          players,
          gamePhase: 'END_TURN',
          pendingAction: null,
          decisionNote: null,
          log: pushLog(prev, `${player.name} 連續三次擲出孖寶，立即坐監！`),
        };
      }

      return processMovement(prev, d1 + d2, [d1, d2], isDoubles, newDoublesCount);
    });
  }, []);

  const passBuy = useCallback(() => {
    setState((prev) => {
      if (prev.pendingAction?.type !== 'BUY_PROPERTY') return prev;
      const player = prev.players[prev.currentPlayerIndex];
      return {
        ...prev,
        gamePhase: 'END_TURN',
        pendingAction: null,
        decisionNote: null,
        log: pushLog(prev, `${player.name} 決定不購買此物業。`),
      };
    });
  }, []);

  const handleBuyProperty = () => {
    setState((prev) => {
      const player = prev.players[prev.currentPlayerIndex];
      const space = prev.spaces[player.position];
      const price = space.price || 0;
      if (player.money < price) return prev;
      audioService.play('buy');
      const players = prev.players.map((p, i) =>
        i === prev.currentPlayerIndex ? { ...p, money: p.money - price } : p
      );
      const spaces = prev.spaces.map((s, i) => (i === player.position ? { ...s, ownerId: player.id } : s));
      return {
        ...prev,
        players,
        spaces,
        gamePhase: 'ACTION',
        pendingAction: { type: 'OPPORTUNITY_COST', data: opportunityQuestion(space.name, price) },
        decisionNote: null,
        log: pushLog(prev, `${player.name} 以 $${price} 購買了 ${space.name}。請回答機會成本。`),
      };
    });
  };

  const answerOpportunity = (optionId: string) => {
    setState((prev) => {
      if (prev.pendingAction?.type !== 'OPPORTUNITY_COST') return prev;
      const option = prev.pendingAction.data?.options?.find((item: { id: string }) => item.id === optionId);
      if (!option) return prev;
      if (!option.correct) {
        audioService.play('pay');
        return { ...prev, decisionNote: option.explanation, log: pushLog(prev, option.explanation) };
      }
      audioService.play('win');
      return {
        ...prev,
        decisionNote: option.explanation,
        gamePhase: 'END_TURN',
        pendingAction: null,
        log: pushLog(prev, option.explanation),
      };
    });
  };

  const handleUpgradeProperty = (spaceId: number) => {
    setState((prev) => {
      const space = prev.spaces.find((s) => s.id === spaceId);
      const player = prev.players[prev.currentPlayerIndex];
      if (!space || !space.houseCost || player.bankrupt) return prev;
      if (space.ownerId !== player.id) return prev;
      if (space.houses >= 5) return prev;
      if (player.money < space.houseCost) {
        return { ...prev, log: pushLog(prev, `${player.name} 資金不足，無法在 ${space.name} 蓋房。`) };
      }
      const groupSpaces = prev.spaces.filter((s) => s.group === space.group);
      if (!groupSpaces.every((s) => s.ownerId === player.id)) {
        return { ...prev, log: pushLog(prev, '必須擁有整個顏色組別才能蓋房。') };
      }
      if (groupSpaces.some((s) => s.isMortgaged)) {
        return { ...prev, log: pushLog(prev, '同一色系中有物業被抵押，無法蓋房。') };
      }
      const minHouses = Math.min(...groupSpaces.map((s) => s.houses));
      if (space.houses > minHouses) {
        return { ...prev, log: pushLog(prev, '必須平均發展物業 (先在其他同色物業蓋房)。') };
      }
      audioService.play('buy');
      const players = prev.players.map((p, i) =>
        i === prev.currentPlayerIndex ? { ...p, money: p.money - (space.houseCost || 0) } : p
      );
      const spaces = prev.spaces.map((s) => (s.id === spaceId ? { ...s, houses: s.houses + 1 } : s));
      const typeName = space.houses === 4 ? '酒店' : '房屋';
      return {
        ...prev,
        players,
        spaces,
        log: pushLog(prev, `${player.name} 在 ${space.name} 興建了${typeName} (花費 $${space.houseCost})`),
      };
    });
  };

  const handlePayRent = () => {
    setState((prev) => {
      if (!prev.pendingAction || prev.pendingAction.type !== 'PAY_RENT') return prev;
      const { amount, ownerId } = prev.pendingAction.data;
      const players = prev.players.map((p) => ({ ...p }));
      const player = players[prev.currentPlayerIndex];
      const owner = players.find((p) => p.id === ownerId);
      const result = payOrBankrupt({ money: player.money, bankrupt: false }, amount);
      audioService.play(result.paid ? 'pay' : 'jail');
      let spaces = prev.spaces;
      let msg: string;
      if (!result.paid) {
        const cleared = markBankrupt(players, spaces, prev.currentPlayerIndex);
        players.splice(0, players.length, ...cleared.players);
        spaces = cleared.spaces;
        msg = `${player.name} 無法支付 $${amount} 租金，宣佈破產！`;
      } else {
        players[prev.currentPlayerIndex] = { ...player, money: result.wallet.money, bankrupt: false };
        if (owner && !owner.bankrupt) owner.money += amount;
        msg = `${player.name} 向 ${owner?.name} 支付租金 $${amount}`;
      }
      return conclude({
        ...prev,
        players,
        spaces,
        gamePhase: 'END_TURN',
        pendingAction: null,
        decisionNote: null,
        rentPayment: result.paid ? { payerId: player.id, receiverId: ownerId, amount } : null,
        log: pushLog(prev, msg),
      });
    });
  };

  const handlePayTax = () => {
    setState((prev) => {
      if (!prev.pendingAction || prev.pendingAction.type !== 'PAY_TAX') return prev;
      const { amount, name, kind } = prev.pendingAction.data;
      const players = prev.players.map((p) => ({ ...p }));
      const player = players[prev.currentPlayerIndex];
      const result = payOrBankrupt({ money: player.money, bankrupt: false }, amount);
      if (amount > 0) audioService.play(result.paid ? 'pay' : 'jail');
      else audioService.play('card');
      let spaces = prev.spaces;
      let msg: string;
      if (!result.paid) {
        const cleared = markBankrupt(players, spaces, prev.currentPlayerIndex);
        players.splice(0, players.length, ...cleared.players);
        spaces = cleared.spaces;
        msg = `${player.name} 無法支付${name} $${amount}，宣佈破產！`;
      } else {
        players[prev.currentPlayerIndex] = { ...player, money: result.wallet.money, bankrupt: false };
        msg =
          kind === 'SALARIES'
            ? `${player.name} 按淨入息（已扣遊戲免稅額）繳交薪俸稅 $${amount}`
            : amount === 0
              ? `${player.name} 沒有住宅物業，本期差餉及地租為 $0`
              : `${player.name} 按應課差餉租值繳交差餉及地租 $${amount}`;
      }
      return conclude({
        ...prev,
        players,
        spaces,
        gamePhase: 'END_TURN',
        pendingAction: null,
        decisionNote: null,
        log: pushLog(prev, msg),
      });
    });
  };

  const drawCard = () => {
    setState((prev) => {
      if (!prev.pendingAction || prev.pendingAction.type !== 'CARD_EFFECT') return prev;
      const spaceType = prev.pendingAction.data?.type as SpaceType | undefined;
      const player = prev.players[prev.currentPlayerIndex];
      if (!player) return prev;

      if (spaceType === SpaceType.COMMUNITY) {
        const spirit = CHOICE_EVENTS[Math.floor(Math.random() * CHOICE_EVENTS.length)];
        audioService.play('card');
        return {
          ...prev,
          pendingAction: { type: 'CARD_CHOICE', data: { event: spirit, type: spaceType } },
          decisionNote: null,
          log: pushLog(prev, `${player.name} 在獅子山精神抽到：${spirit.title}`),
        };
      }

      if (spaceType === SpaceType.CHANCE) {
        const fortune = FORTUNE_EVENTS[Math.floor(Math.random() * FORTUNE_EVENTS.length)];
        const applied = applyFortune(
          prev.players.map((p) => ({ money: p.money, bankrupt: p.bankrupt })),
          prev.currentPlayerIndex,
          fortune,
        );
        let spaces = prev.spaces;
        const players = prev.players.map((p, i) => {
          const wallet = applied.wallets[i];
          const becameBankrupt = wallet.bankrupt && !p.bankrupt;
          if (becameBankrupt) spaces = releaseBankruptProperties(spaces, p.id);
          return {
            ...p,
            money: wallet.money,
            bankrupt: wallet.bankrupt,
            isJailed: becameBankrupt ? false : p.isJailed,
          };
        });
        const actor = players[prev.currentPlayerIndex];
        audioService.play(actor.bankrupt ? 'jail' : fortune.personalDelta > 0 ? 'win' : 'pay');
        return conclude({
          ...prev,
          players,
          spaces,
          gamePhase: 'END_TURN',
          pendingAction: null,
          decisionNote: applied.note,
          log: pushLog(prev, `${actor.name} 抽到時運高低「${fortune.title}」。${applied.note}`),
        });
      }

      return prev;
    });
  };

  const resolveChoice = (optionId: string) => {
    setState((prev) => {
      if (!prev.pendingAction || prev.pendingAction.type !== 'CARD_CHOICE') return prev;
      const event = prev.pendingAction.data.event as ChoiceEvent;
      const option = event.options.find((item) => item.id === optionId);
      if (!option) return prev;
      const applied = applyChoice(
        prev.players.map((p) => ({ money: p.money, bankrupt: p.bankrupt })),
        prev.currentPlayerIndex,
        option
      );
      if (!applied.accepted) {
        audioService.play('pay');
        return { ...prev, decisionNote: applied.note, log: pushLog(prev, applied.note) };
      }
      audioService.play(option.personalGain ? 'win' : 'pay');
      let spaces = prev.spaces;
      const players = prev.players.map((p, i) => {
        const wallet = applied.wallets[i];
        const becameBankrupt = wallet.bankrupt && !p.bankrupt;
        if (becameBankrupt) spaces = releaseBankruptProperties(spaces, p.id);
        return {
          ...p,
          money: wallet.money,
          bankrupt: wallet.bankrupt,
          isJailed: becameBankrupt ? false : p.isJailed,
        };
      });
      const actor = players[prev.currentPlayerIndex];
      const note = actor.bankrupt ? `${applied.note} ${actor.name} 付不出這筆稅款，宣佈破產。` : applied.note;
      return conclude({
        ...prev,
        players,
        spaces,
        gamePhase: 'END_TURN',
        pendingAction: null,
        decisionNote: note,
        log: pushLog(prev, note),
      });
    });
  };

  return {
    state,
    nextTurn,
    rollDice,
    handleBuyProperty,
    handleUpgradeProperty,
    handlePayRent,
    handlePayTax,
    handleJailDecision,
    drawCard,
    resolveChoice,
    answerOpportunity,
    passBuy,
    addLog,
    startGame,
  };
};

function processMovement(
  state: GameState,
  steps: number,
  dice: [number, number],
  isDoubles: boolean,
  doublesCount: number,
): GameState {
  const players = state.players.map((p) => ({ ...p }));
  const playerIndex = state.currentPlayerIndex;
  const player = players[playerIndex];
  const oldPos = player.position;
  const newPos = (oldPos + steps) % 40;
  const passedGo = newPos < oldPos;
  if (passedGo) player.money += GO_MONEY;
  player.position = newPos;
  const space = state.spaces[newPos];

  let phase: GameState['gamePhase'] = 'END_TURN';
  let pending: PendingAction | null = null;

  if (space.type === SpaceType.PROPERTY || space.type === SpaceType.STATION || space.type === SpaceType.UTILITY) {
    if (space.ownerId === undefined && space.price) {
      phase = 'ACTION';
      pending = { type: 'BUY_PROPERTY', data: space };
    } else if (space.ownerId !== undefined && space.ownerId !== player.id && !space.isMortgaged) {
      let rent = 0;
      let utilityText: string | undefined;
      if (space.type === SpaceType.UTILITY) {
        const owned = state.spaces.filter((s) => s.ownerId === space.ownerId && s.type === SpaceType.UTILITY).length;
        rent = utilityRent(dice[0] + dice[1], owned);
        utilityText = describeUtilityCharge(dice[0] + dice[1], owned);
      } else if (space.type === SpaceType.STATION) {
        const ownerStations = state.spaces.filter((s) => s.ownerId === space.ownerId && s.type === SpaceType.STATION).length;
        rent = space.rent ? space.rent[ownerStations - 1] || 25 : 25;
      } else {
        const colorGroup = state.spaces.filter((s) => s.group === space.group);
        const ownsAll = colorGroup.every((s) => s.ownerId === space.ownerId);
        if (space.houses === 0 && ownsAll) rent = (space.rent ? space.rent[0] : 0) * 2;
        else rent = space.rent ? space.rent[space.houses] : 0;
      }
      phase = 'ACTION';
      pending = { type: 'PAY_RENT', data: { amount: rent, ownerId: space.ownerId, utilityText } };
    }
  } else if (space.type === SpaceType.GO_TO_JAIL) {
    player.position = 10;
    player.isJailed = true;
    player.jailTurns = 0;
    phase = 'END_TURN';
  } else if (space.type === SpaceType.TAX) {
    phase = 'ACTION';
    if (space.taxKind === 'RATES') {
      const owned = state.spaces
        .filter((s) => s.ownerId === player.id && s.type === SpaceType.PROPERTY)
        .map((s) => ({ name: s.name, rateableValue: s.rateableValue || 0 }));
      pending = { type: 'PAY_TAX', data: { ...ratesAndRentBill(owned), kind: 'RATES' } };
    } else {
      pending = { type: 'PAY_TAX', data: { ...salariesTaxBill(), kind: 'SALARIES' } };
    }
  } else if (space.type === SpaceType.CHANCE || space.type === SpaceType.COMMUNITY) {
    phase = 'ACTION';
    pending = { type: 'CARD_EFFECT', data: { type: space.type } };
  }

  let nextLog = state.log;
  if (passedGo) nextLog = pushLog(state, `${player.name} 經過起點，獲得 $${GO_MONEY}`);
  if (space.type === SpaceType.GO_TO_JAIL) {
    nextLog = pushLog({ ...state, log: nextLog }, `${player.name} 被送進赤柱監獄！`);
  }

  return {
    ...state,
    players,
    dice,
    isDoubles,
    doublesCount,
    gamePhase: phase,
    pendingAction: pending,
    decisionNote: null,
    log: nextLog,
  };
}
