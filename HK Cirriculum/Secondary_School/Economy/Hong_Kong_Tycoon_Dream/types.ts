
export enum SpaceType {
  START = 'START',
  PROPERTY = 'PROPERTY',
  STATION = 'STATION',
  UTILITY = 'UTILITY',
  CHANCE = 'CHANCE',
  COMMUNITY = 'COMMUNITY',
  TAX = 'TAX',
  FREE_PARKING = 'FREE_PARKING',
  GO_TO_JAIL = 'GO_TO_JAIL',
  JAIL = 'JAIL'
}

export enum ColorGroup {
  BROWN = 'BROWN',
  LIGHT_BLUE = 'LIGHT_BLUE',
  PINK = 'PINK',
  ORANGE = 'ORANGE',
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  DARK_BLUE = 'DARK_BLUE',
  NONE = 'NONE'
}

export interface BoardSpace {
  id: number;
  name: string;
  type: SpaceType;
  price?: number;
  rent?: number[]; // 0: site only, 1-4: houses, 5: hotel
  houseCost?: number;
  group: ColorGroup;
  ownerId?: number;
  houses: number; // 5 = hotel
  isMortgaged: boolean;
  /** Residential rateable value used for the game's rates bill. */
  rateableValue?: number;
  /** Short label shown on the square. */
  blurb?: string;
  badge?: string;
  taxKind?: 'SALARIES' | 'RATES';
}

export interface Player {
  id: number;
  name: string;
  color: string;
  money: number;
  position: number;
  isJailed: boolean;
  jailTurns: number;
  getOutOfJailFreeCards: number;
  bankrupt: boolean;
}

export interface RentPayment {
  payerId: number;
  receiverId: number;
  amount: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  spaces: BoardSpace[];
  dice: [number, number];
  isDoubles: boolean;
  doublesCount: number;
  gamePhase: 'SETUP' | 'ROLL' | 'MOVING' | 'ACTION' | 'END_TURN' | 'GAME_OVER';
  log: string[];
  pendingAction: PendingAction | null;
  rentPayment: RentPayment | null;
  decisionNote: string | null;
}

export interface PendingAction {
  type: 'BUY_PROPERTY' | 'PAY_RENT' | 'PAY_TAX' | 'CARD_EFFECT' | 'CARD_CHOICE' | 'JAIL_DECISION' | 'OPPORTUNITY_COST';
  data?: any;
}

export interface Card {
  id: string;
  text: string;
  action: (state: GameState) => Partial<GameState>;
  amount?: number;
}
