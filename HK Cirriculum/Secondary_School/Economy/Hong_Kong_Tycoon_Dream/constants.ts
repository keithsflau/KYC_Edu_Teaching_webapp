import { BoardSpace, ColorGroup, SpaceType } from './types';
import { suggestedRateableValue } from './logic/rules';

export const INITIAL_MONEY = 15000;
export const GO_MONEY = 2000;
export const JAIL_FINE = 500;

const site = (
  id: number,
  name: string,
  price: number,
  rent: number[],
  houseCost: number,
  group: ColorGroup,
): BoardSpace => ({
  id,
  name,
  type: SpaceType.PROPERTY,
  price,
  rent,
  houseCost,
  group,
  rateableValue: suggestedRateableValue(price),
  houses: 0,
  isMortgaged: false,
});

const station = (id: number, name: string): BoardSpace => ({
  id,
  name,
  type: SpaceType.STATION,
  price: 2000,
  rent: [250, 500, 1000, 2000],
  group: ColorGroup.NONE,
  houses: 0,
  isMortgaged: false,
});

const utility = (id: number, name: string, blurb: string): BoardSpace => ({
  id,
  name,
  type: SpaceType.UTILITY,
  price: 1500,
  badge: '遊戲規則',
  blurb,
  group: ColorGroup.NONE,
  houses: 0,
  isMortgaged: false,
});

const special = (id: number, name: string, type: SpaceType): BoardSpace => ({
  id,
  name,
  type,
  group: ColorGroup.NONE,
  houses: 0,
  isMortgaged: false,
});

export const BOARD_DATA: BoardSpace[] = [
  special(0, '起點 (GO)', SpaceType.START),
  site(1, '長洲', 600, [20, 100, 300, 900, 1600, 2500], 500, ColorGroup.BROWN),
  special(2, '獅子山精神', SpaceType.COMMUNITY),
  site(3, '南丫島', 600, [40, 200, 600, 1800, 3200, 4500], 500, ColorGroup.BROWN),
  {
    id: 4,
    name: '薪俸稅',
    type: SpaceType.TAX,
    taxKind: 'SALARIES',
    blurb: '按淨入息，有免稅額',
    group: ColorGroup.NONE,
    houses: 0,
    isMortgaged: false,
  },
  station(5, '中環碼頭'),
  site(6, '深水埗', 1000, [60, 300, 900, 2700, 4000, 5500], 500, ColorGroup.LIGHT_BLUE),
  special(7, '時運高低', SpaceType.CHANCE),
  site(8, '葵涌', 1000, [60, 300, 900, 2700, 4000, 5500], 500, ColorGroup.LIGHT_BLUE),
  site(9, '觀塘', 1200, [80, 400, 1000, 3000, 4500, 6000], 500, ColorGroup.LIGHT_BLUE),

  special(10, '赤柱監獄', SpaceType.JAIL),
  site(11, '屯門', 1400, [100, 500, 1500, 4500, 6250, 7500], 1000, ColorGroup.PINK),
  utility(12, '中電', '不是真實電費'),
  site(13, '沙田', 1400, [100, 500, 1500, 4500, 6250, 7500], 1000, ColorGroup.PINK),
  site(14, '將軍澳', 1600, [120, 600, 1800, 5000, 7000, 9000], 1000, ColorGroup.PINK),
  station(15, '紅磡站'),
  site(16, '西環', 1800, [140, 700, 2000, 5500, 7500, 9500], 1000, ColorGroup.ORANGE),
  special(17, '獅子山精神', SpaceType.COMMUNITY),
  site(18, '北角', 1800, [140, 700, 2000, 5500, 7500, 9500], 1000, ColorGroup.ORANGE),
  site(19, '灣仔', 2000, [160, 800, 2200, 6000, 8000, 10000], 1000, ColorGroup.ORANGE),

  special(20, '免費泊車', SpaceType.FREE_PARKING),
  site(21, '旺角', 2200, [180, 900, 2500, 7000, 8750, 10500], 1500, ColorGroup.RED),
  special(22, '時運高低', SpaceType.CHANCE),
  site(23, '尖沙咀', 2200, [180, 900, 2500, 7000, 8750, 10500], 1500, ColorGroup.RED),
  site(24, '銅鑼灣', 2400, [200, 1000, 3000, 7500, 9250, 11000], 1500, ColorGroup.RED),
  station(25, '機場快線'),
  site(26, '跑馬地', 2600, [220, 1100, 3300, 8000, 9750, 11500], 1500, ColorGroup.YELLOW),
  site(27, '何文田', 2600, [220, 1100, 3300, 8000, 9750, 11500], 1500, ColorGroup.YELLOW),
  utility(28, '煤氣公司', '不是真實煤氣費'),
  site(29, '九龍塘', 2800, [240, 1200, 3600, 8500, 10250, 12000], 1500, ColorGroup.YELLOW),

  special(30, '入獄', SpaceType.GO_TO_JAIL),
  site(31, '金鐘', 3000, [260, 1300, 3900, 9000, 11000, 12750], 2000, ColorGroup.GREEN),
  site(32, '啟德', 3000, [260, 1300, 3900, 9000, 11000, 12750], 2000, ColorGroup.GREEN),
  special(33, '獅子山精神', SpaceType.COMMUNITY),
  site(34, '中環', 3200, [280, 1500, 4500, 10000, 12000, 14000], 2000, ColorGroup.GREEN),
  station(35, '港珠澳大橋'),
  special(36, '時運高低', SpaceType.CHANCE),
  site(37, '半山區', 3500, [350, 1750, 5000, 11000, 13000, 15000], 2000, ColorGroup.DARK_BLUE),
  {
    id: 38,
    name: '差餉地租',
    type: SpaceType.TAX,
    taxKind: 'RATES',
    blurb: '按應課差餉租值',
    group: ColorGroup.NONE,
    houses: 0,
    isMortgaged: false,
  },
  site(39, '太平山頂', 4000, [500, 2000, 6000, 14000, 17000, 20000], 2000, ColorGroup.DARK_BLUE),
];
