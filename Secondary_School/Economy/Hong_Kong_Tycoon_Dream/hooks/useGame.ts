
import { useState, useCallback, useEffect } from 'react';
import { GameState, Player, SpaceType, PendingAction } from '../types';
import { BOARD_DATA, INITIAL_MONEY, GO_MONEY, JAIL_FINE } from '../constants';
import { audioService } from '../services/audio';

const PLAYER_COLORS = [
  'bg-red-600',
  'bg-blue-600',
  'bg-green-600',
  'bg-yellow-500',
];

/** Append log in the same setState update (addLog() alone is lost when called inside setState). */
const pushLog = (prev: GameState, msg: string) => [msg, ...prev.log].slice(0, 20);

const releaseBankruptProperties = (spaces: GameState['spaces'], ownerId: number) =>
  spaces.map((s) =>
    s.ownerId === ownerId ? { ...s, ownerId: undefined, houses: 0, isMortgaged: false } : s
  );

const countActivePlayers = (players: Player[]) => players.filter((p) => !p.bankrupt).length;

export const useGame = () => {
  const [state, setState] = useState<GameState>({
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
  });

  // Effect to auto-clear rent payment notification after animation
  useEffect(() => {
    if (state.rentPayment) {
      const timer = setTimeout(() => {
        setState(prev => ({ ...prev, rentPayment: null }));
      }, 2500); // Keep visible for 2.5 seconds
      return () => clearTimeout(timer);
    }
  }, [state.rentPayment]);

  const addLog = (msg: string) => {
    setState(prev => ({ ...prev, log: [msg, ...prev.log].slice(0, 20) }));
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
      bankrupt: false
    }));

    setState(prev => ({
      ...prev,
      players: newPlayers,
      gamePhase: 'ROLL',
      log: [`遊戲開始! ${playerCount} 位玩家準備就緒!`, '歡迎來到香江富豪夢!'],
      spaces: JSON.parse(JSON.stringify(BOARD_DATA)), // Reset board
      currentPlayerIndex: 0,
      rentPayment: null,
    }));
  }, []);

  const nextTurn = useCallback(() => {
    setState(prev => {
      // Check if current player rolled doubles and is not in jail, they go again
      if (prev.isDoubles && !prev.players[prev.currentPlayerIndex].isJailed && prev.gamePhase !== 'GAME_OVER') {
         return {
           ...prev,
           gamePhase: 'ROLL',
           pendingAction: null,
           log: pushLog(prev, `${prev.players[prev.currentPlayerIndex].name} 擲出孖寶，再擲一次！`),
         };
      }

      // Find next non-bankrupt player
      let nextIndex = (prev.currentPlayerIndex + 1) % prev.players.length;
      let loops = 0;
      while (prev.players[nextIndex].bankrupt && loops < prev.players.length) {
        nextIndex = (nextIndex + 1) % prev.players.length;
        loops++;
      }
      
      if (loops === prev.players.length) {
          // Should be handled by win condition, but safe guard
          return prev;
      }

      const nextPlayer = prev.players[nextIndex];
      let nextPhase: GameState['gamePhase'] = 'ROLL';
      let nextPending: PendingAction | null = null;

      // If next player is in jail, they must make a decision first
      if (nextPlayer.isJailed) {
        nextPhase = 'ACTION';
        nextPending = { type: 'JAIL_DECISION' };
      }

      return {
        ...prev,
        currentPlayerIndex: nextIndex,
        gamePhase: nextPhase,
        pendingAction: nextPending,
        isDoubles: false,
        doublesCount: 0,
        ...(nextPlayer.isJailed
          ? { log: pushLog(prev, `${nextPlayer.name} 在獄中，請選擇行動。`) }
          : {}),
      };
    });
  }, []);

  const handleJailDecision = useCallback((decision: 'PAY' | 'CARD') => {
    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];
      const newPlayers = [...prev.players];

      if (decision === 'PAY') {
        if (player.money < JAIL_FINE) {
          return { ...prev, log: pushLog(prev, `${player.name} 資金不足，無法支付罰金。`) };
        }
        audioService.play('pay');
        newPlayers[prev.currentPlayerIndex] = {
          ...player,
          money: player.money - JAIL_FINE,
          isJailed: false,
          jailTurns: 0
        };
        return {
          ...prev,
          players: newPlayers,
          gamePhase: 'ROLL',
          pendingAction: null,
          log: pushLog(prev, `${player.name} 支付了 $${JAIL_FINE} 罰金，重獲自由！請擲骰子。`),
        };
      } else if (decision === 'CARD') {
        if (player.getOutOfJailFreeCards <= 0) return prev;
        newPlayers[prev.currentPlayerIndex] = {
          ...player,
          getOutOfJailFreeCards: player.getOutOfJailFreeCards - 1,
          isJailed: false,
          jailTurns: 0
        };
        return {
          ...prev,
          players: newPlayers,
          gamePhase: 'ROLL',
          pendingAction: null,
          log: pushLog(prev, `${player.name} 使用了保釋卡，重獲自由！請擲骰子。`),
        };
      }

      return {
        ...prev,
        players: newPlayers,
        gamePhase: 'ROLL', // Now they can roll normally
        pendingAction: null
      };
    });
  }, []);

  const rollDice = useCallback(() => {
    audioService.play('roll');
    const d1 = Math.floor(Math.random() * 6) + 1;
    const d2 = Math.floor(Math.random() * 6) + 1;
    const isDoubles = d1 === d2;

    setState(prev => {
      const player = prev.players[prev.currentPlayerIndex];
      let newDoublesCount = isDoubles ? prev.doublesCount + 1 : 0;
      const newPlayers = [...prev.players];
      
      // Handle Jail Rolling Logic
      if (player.isJailed) {
         if (isDoubles) {
            newPlayers[prev.currentPlayerIndex] = { ...player, isJailed: false, jailTurns: 0 };
            const moved = processMovement(prev, d1 + d2, newPlayers, [d1, d2], isDoubles, 0);
            return { ...moved, log: pushLog(moved, `${player.name} 擲出孖寶 (${d1}, ${d2})，成功越獄！`) };
         } else {
            const newTurns = player.jailTurns + 1;
            if (newTurns >= 3) {
               newPlayers[prev.currentPlayerIndex] = { 
                 ...player, 
                 money: player.money - JAIL_FINE,
                 isJailed: false, 
                 jailTurns: 0 
               };
               const moved = processMovement(prev, d1 + d2, newPlayers, [d1, d2], isDoubles, 0);
               return { ...moved, log: pushLog(moved, `${player.name} 坐監期滿，強制罰款 $${JAIL_FINE} 出獄。`) };
            } else {
               newPlayers[prev.currentPlayerIndex] = { ...player, jailTurns: newTurns };
               return {
                 ...prev,
                 dice: [d1, d2],
                 players: newPlayers,
                 isDoubles: false, 
                 gamePhase: 'END_TURN',
                 pendingAction: null,
                 log: pushLog(prev, `${player.name} 越獄失敗 (${d1}, ${d2})，繼續坐監。`),
               };
            }
         }
      }

      // Handle Speeding (3 doubles) - Only for non-jailed players
      if (newDoublesCount === 3) {
        newPlayers[prev.currentPlayerIndex] = {
          ...player,
          position: 10, // Jail ID
          isJailed: true,
          jailTurns: 0
        };
        return {
          ...prev,
          dice: [d1, d2],
          isDoubles,
          doublesCount: 0, // Reset
          players: newPlayers,
          gamePhase: 'END_TURN',
          log: pushLog(prev, `${player.name} 連續三次擲出孖寶，立即坐監！`),
        };
      }

      // Normal Move
      return processMovement(prev, d1 + d2, newPlayers, [d1, d2], isDoubles, newDoublesCount);
    });
  }, []);

  // Helper to process movement and landing
  const processMovement = (
      state: GameState, 
      steps: number, 
      players: Player[], 
      dice: [number, number],
      isDoubles: boolean,
      doublesCount: number
  ): GameState => {
    const playerIndex = state.currentPlayerIndex;
    const player = players[playerIndex];
    const oldPos = player.position;
    let newPos = (oldPos + steps) % 40;
    let passedGo = false;

    if (newPos < oldPos) {
      passedGo = true;
      players[playerIndex].money += GO_MONEY;
    }

    players[playerIndex].position = newPos;
    const space = state.spaces[newPos];
    
    // Determine action based on space
    let phase: GameState['gamePhase'] = 'END_TURN';
    let pending: PendingAction | null = null;

    if (space.type === SpaceType.PROPERTY || space.type === SpaceType.STATION || space.type === SpaceType.UTILITY) {
      if (space.ownerId === undefined && space.price) {
        phase = 'ACTION';
        pending = { type: 'BUY_PROPERTY', data: space };
      } else if (space.ownerId !== undefined && space.ownerId !== player.id && !space.isMortgaged) {
        // Rent calculation
        let rent = 0;
        if (space.type === SpaceType.UTILITY) {
             const ownerSpaces = state.spaces.filter(s => s.ownerId === space.ownerId && s.type === SpaceType.UTILITY);
             const multiplier = ownerSpaces.length === 2 ? 10 : 4;
             rent = (dice[0] + dice[1]) * multiplier; 
        } else if (space.type === SpaceType.STATION) {
            const ownerStations = state.spaces.filter(s => s.ownerId === space.ownerId && s.type === SpaceType.STATION).length;
            rent = space.rent ? space.rent[ownerStations - 1] || 25 : 25;
        } else {
            // Regular property
            const colorGroup = state.spaces.filter(s => s.group === space.group);
            const ownsAll = colorGroup.every(s => s.ownerId === space.ownerId);
            
            if (space.houses === 0 && ownsAll) {
                rent = (space.rent ? space.rent[0] : 0) * 2;
            } else {
                rent = space.rent ? space.rent[space.houses] : 0;
            }
        }
        
        phase = 'ACTION';
        pending = { type: 'PAY_RENT', data: { amount: rent, ownerId: space.ownerId } };
      }
    } else if (space.type === SpaceType.GO_TO_JAIL) {
      players[playerIndex].position = 10;
      players[playerIndex].isJailed = true;
      players[playerIndex].jailTurns = 0;
      phase = 'END_TURN';
    } else if (space.type === SpaceType.TAX) {
      phase = 'ACTION';
      pending = { type: 'PAY_TAX', data: { amount: space.price, name: space.name } };
    } else if (space.type === SpaceType.CHANCE || space.type === SpaceType.COMMUNITY) {
       phase = 'ACTION';
       pending = { type: 'CARD_EFFECT', data: { type: space.type } };
    }

    let nextLog = state.log;
    if (passedGo) {
      nextLog = pushLog(state, `${player.name} 經過起點，獲得 $${GO_MONEY}`);
    }
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
      log: nextLog,
    };
  };

  const handleBuyProperty = () => {
    setState(prev => {
       const player = prev.players[prev.currentPlayerIndex];
       const space = prev.spaces[player.position];
       
       if (player.money >= (space.price || 0)) {
         audioService.play('buy');
         const newPlayers = [...prev.players];
         newPlayers[prev.currentPlayerIndex].money -= (space.price || 0);
         
         const newSpaces = [...prev.spaces];
         newSpaces[player.position] = { ...space, ownerId: player.id };
         
         return {
           ...prev,
           players: newPlayers,
           spaces: newSpaces,
           gamePhase: 'END_TURN',
           pendingAction: null,
           log: pushLog(prev, `${player.name} 以 $${space.price} 購買了 ${space.name}`),
         };
       }
       return prev;
    });
  };

  const handleUpgradeProperty = (spaceId: number) => {
    setState(prev => {
      const space = prev.spaces.find(s => s.id === spaceId);
      const player = prev.players[prev.currentPlayerIndex];

      if (!space || !space.houseCost) return prev;

      // Validations
      if (space.ownerId !== player.id) return prev;
      if (space.houses >= 5) return prev; // Max level (Hotel)
      if (player.money < space.houseCost) {
        return { ...prev, log: pushLog(prev, `${player.name} 資金不足，無法在 ${space.name} 蓋房。`) };
      }

      // Check Monopoly (Must own all of color group)
      const groupSpaces = prev.spaces.filter(s => s.group === space.group);
      const ownsAll = groupSpaces.every(s => s.ownerId === player.id);
      if (!ownsAll) {
        return { ...prev, log: pushLog(prev, `必須擁有整個顏色組別才能蓋房。`) };
      }

      // Check Mortgage rule (Cannot build if any property in group is mortgaged)
      if (groupSpaces.some(s => s.isMortgaged)) {
        return { ...prev, log: pushLog(prev, `同一色系中有物業被抵押，無法蓋房。`) };
      }

      // Check Even Build Rule
      const minHouses = Math.min(...groupSpaces.map(s => s.houses));
      if (space.houses > minHouses) {
        return { ...prev, log: pushLog(prev, `必須平均發展物業 (先在其他同色物業蓋房)。`) };
      }

      // Execute Upgrade
      audioService.play('buy');
      const newPlayers = [...prev.players];
      newPlayers[prev.currentPlayerIndex].money -= space.houseCost;

      const newSpaces = prev.spaces.map(s => {
        if (s.id === spaceId) {
          return { ...s, houses: s.houses + 1 };
        }
        return s;
      });

      const typeName = space.houses === 4 ? '酒店' : '房屋';

      return {
        ...prev,
        players: newPlayers,
        spaces: newSpaces,
        log: pushLog(prev, `${player.name} 在 ${space.name} 興建了${typeName} (花費 $${space.houseCost})`),
      };
    });
  };

  const handlePayRent = () => {
    setState(prev => {
        if (!prev.pendingAction || prev.pendingAction.type !== 'PAY_RENT') return prev;
        
        const { amount, ownerId } = prev.pendingAction.data;
        const newPlayers = [...prev.players];
        const player = newPlayers[prev.currentPlayerIndex];
        const owner = newPlayers.find(p => p.id === ownerId);

        audioService.play('pay');
        
        let nextSpaces = prev.spaces;
        let msg: string;
        if (player.money < amount) {
            msg = `${player.name} 無法支付 $${amount} 租金，宣佈破產！`;
            newPlayers[prev.currentPlayerIndex].bankrupt = true;
            newPlayers[prev.currentPlayerIndex].money = 0;
            nextSpaces = releaseBankruptProperties(prev.spaces, player.id);
        } else {
            player.money -= amount;
            if (owner) owner.money += amount;
            msg = `${player.name} 向 ${owner?.name} 支付租金 $${amount}`;
        }

        const after = {
            ...prev,
            players: newPlayers,
            spaces: nextSpaces,
            gamePhase: 'END_TURN' as const,
            pendingAction: null,
            rentPayment: {
                payerId: player.id,
                receiverId: ownerId,
                amount: amount
            },
            log: pushLog(prev, msg),
        };
        const active = countActivePlayers(after.players);
        if (active <= 1) {
          const winner = after.players.find((p) => !p.bankrupt);
          return {
            ...after,
            gamePhase: 'GAME_OVER',
            log: pushLog(after, winner ? `${winner.name} 贏得遊戲！` : '遊戲結束'),
          };
        }
        return after;
    });
  };

  const handlePayTax = () => {
      setState(prev => {
          if (!prev.pendingAction || prev.pendingAction.type !== 'PAY_TAX') return prev;
          const { amount, name } = prev.pendingAction.data;
          const newPlayers = [...prev.players];
          const player = newPlayers[prev.currentPlayerIndex];
          
          audioService.play('pay');

          let nextSpaces = prev.spaces;
          let msg: string;
          if (player.money < amount) {
               msg = `${player.name} 無法支付 ${name} ($${amount})，宣佈破產！`;
               newPlayers[prev.currentPlayerIndex].bankrupt = true;
               newPlayers[prev.currentPlayerIndex].money = 0;
               nextSpaces = releaseBankruptProperties(prev.spaces, player.id);
          } else {
              player.money -= amount;
              msg = `${player.name} 繳交 ${name} $${amount}`;
          }

          const after = {
              ...prev,
              players: newPlayers,
              spaces: nextSpaces,
              gamePhase: 'END_TURN' as const,
              pendingAction: null,
              log: pushLog(prev, msg),
          };
          const active = countActivePlayers(after.players);
          if (active <= 1) {
            const winner = after.players.find((p) => !p.bankrupt);
            return {
              ...after,
              gamePhase: 'GAME_OVER',
              log: pushLog(after, winner ? `${winner.name} 贏得遊戲！` : '遊戲結束'),
            };
          }
          return after;
      });
  };

  const drawCard = () => {
      setState(prev => {
          if (!prev.pendingAction || prev.pendingAction.type !== 'CARD_EFFECT') return prev;
          const isChance = prev.pendingAction.data.type === SpaceType.CHANCE;
          const player = prev.players[prev.currentPlayerIndex];
          
          const events = [
              { text: "中六合彩二獎！", money: 2000, type: 'money' },
              { text: "違例泊車，罰款 $500", money: -500, type: 'money' },
              { text: "政府派糖，每人獲發 $1000", money: 1000, type: 'money' },
              { text: "颱風襲港，家居維修 $1500", money: -1500, type: 'money' },
              { text: "股票投資獲利", money: 500, type: 'money' },
              { text: "請飲茶，支付 $200", money: -200, type: 'money' },
              { text: "獲得保釋卡 (可抵消一次監獄)", money: 0, type: 'card' }
          ];
          
          const evt = events[Math.floor(Math.random() * events.length)];
          const newPlayers = [...prev.players];
          
          let nextLog = prev.log;
          if (evt.type === 'money') {
            if (evt.money > 0) audioService.play('win');
            else audioService.play('pay');
            newPlayers[prev.currentPlayerIndex].money += evt.money;
             nextLog = pushLog(prev, `${player.name} 抽取${isChance ? '時運高低' : '獅子山精神'}: ${evt.text} (變動: $${evt.money})`);
          } else if (evt.type === 'card') {
             audioService.play('win');
             newPlayers[prev.currentPlayerIndex].getOutOfJailFreeCards += 1;
             nextLog = pushLog(prev, `${player.name} 獲得一張「保釋卡」！`);
          }

          let nextSpaces = prev.spaces;
          if (newPlayers[prev.currentPlayerIndex].money < 0) {
             newPlayers[prev.currentPlayerIndex].bankrupt = true;
             newPlayers[prev.currentPlayerIndex].money = 0;
             nextSpaces = releaseBankruptProperties(prev.spaces, player.id);
             nextLog = pushLog({ ...prev, log: nextLog }, `${player.name} 破產了！`);
          }

          const after = {
              ...prev,
              players: newPlayers,
              spaces: nextSpaces,
              gamePhase: 'END_TURN' as const,
              pendingAction: null,
              log: nextLog,
          };
          const active = countActivePlayers(after.players);
          if (active <= 1) {
            const winner = after.players.find((p) => !p.bankrupt);
            return {
              ...after,
              gamePhase: 'GAME_OVER',
              log: pushLog(after, winner ? `${winner.name} 贏得遊戲！` : '遊戲結束'),
            };
          }
          return after;
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
    addLog,
    startGame
  };
};
