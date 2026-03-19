import type { SaveFile, PlayerState, Ship, MultiTool, Vehicle, Companion, Base, Settlement, SquadronPilot, Frigate } from '../types';

function makeInventory(used: number, max: number, w = 6, h = 4) {
  return {
    slots: Array.from({ length: used }, (_, i) => ({
      id: `slot-${i}`,
      itemId: '',
      itemName: `Item ${i + 1}`,
      amount: Math.floor(Math.random() * 500) + 100,
      maxAmount: 9999,
      category: 'substance' as const,
      damageFactor: 0,
      isInstalled: false,
    })),
    width: w,
    height: h,
    usedSlots: used,
    maxSlots: max,
  };
}

const ships: Ship[] = [
  { id: 'ship-1', name: '蒼穹之翼', type: 'Exotic', class: 'S', seed: '0x3A7F2B1C', inventory: makeInventory(20, 28), techInventory: makeInventory(8, 14), cargoInventory: makeInventory(12, 21), health: 800, shield: 600, damage: 350, isPrimary: true },
  { id: 'ship-2', name: '星際掠奪者', type: 'Fighter', class: 'A', seed: '0x8B2E5D9A', inventory: makeInventory(18, 25), techInventory: makeInventory(6, 12), cargoInventory: makeInventory(10, 18), health: 700, shield: 500, damage: 450, isPrimary: false },
  { id: 'ship-3', name: '遠航者號', type: 'Explorer', class: 'S', seed: '0xC4D1F6E3', inventory: makeInventory(22, 30), techInventory: makeInventory(10, 16), cargoInventory: makeInventory(15, 24), health: 600, shield: 700, damage: 200, isPrimary: false },
  { id: 'ship-4', name: '重裝運輸艦', type: 'Hauler', class: 'A', seed: '0x1F9A3B7C', inventory: makeInventory(30, 42), techInventory: makeInventory(6, 12), cargoInventory: makeInventory(25, 42), health: 900, shield: 800, damage: 150, isPrimary: false },
  { id: 'ship-5', name: '活體飛船', type: 'Living', class: 'S', seed: '0x5E8D2C4A', inventory: makeInventory(16, 22), techInventory: makeInventory(10, 14), cargoInventory: makeInventory(8, 14), health: 750, shield: 550, damage: 380, isPrimary: false },
  { id: 'ship-6', name: '光帆號', type: 'Solar', class: 'A', seed: '0x7C3F1D8B', inventory: makeInventory(18, 24), techInventory: makeInventory(8, 14), cargoInventory: makeInventory(10, 18), health: 650, shield: 600, damage: 300, isPrimary: false },
];

const multiTools: MultiTool[] = [
  { id: 'mt-1', name: '異星毀滅者', class: 'S', seed: '0xAB12CD34', type: 'Alien', inventory: makeInventory(12, 16, 4, 4), isPrimary: true },
  { id: 'mt-2', name: '皇家權杖', class: 'S', seed: '0xEF56AB78', type: 'Royal', inventory: makeInventory(10, 14, 4, 4), isPrimary: false },
  { id: 'mt-3', name: '實驗型分析儀', class: 'A', seed: '0x34CD78EF', type: 'Experimental', inventory: makeInventory(8, 12, 4, 4), isPrimary: false },
];

const vehicles: Vehicle[] = [
  { id: 'v-1', name: '遊牧者', type: 'Nomad', inventory: makeInventory(8, 16, 4, 4), seed: '0x1234' },
  { id: 'v-2', name: '巡遊者', type: 'Roamer', inventory: makeInventory(12, 20, 5, 4), seed: '0x5678' },
  { id: 'v-3', name: '巨像', type: 'Colossus', inventory: makeInventory(20, 35, 7, 5), seed: '0x9ABC' },
  { id: 'v-4', name: '鸚鵡螺', type: 'Nauticlon', inventory: makeInventory(8, 16, 4, 4), seed: '0xDEF0' },
  { id: 'v-5', name: '牛頭人', type: 'Minotaur', inventory: makeInventory(10, 18, 4, 5), seed: '0x1357' },
  { id: 'v-6', name: '朝聖者', type: 'Pilgrim', inventory: makeInventory(10, 16, 4, 4), seed: '0x2468' },
];

const frigates: Frigate[] = [
  { id: 'f-1', name: '戰鬥先鋒號', class: 'Combat', race: 'Vy\'keen', traits: ['Aggressive', 'Armoured', 'Battle-hardened'], damage: 0, repairsMade: 0 },
  { id: 'f-2', name: '深礦者號', class: 'Mining', race: 'Korvax', traits: ['Efficient Mining', 'Large Cargo Hold', 'Mineral Specialist'], damage: 0, repairsMade: 2 },
  { id: 'f-3', name: '遠航使者號', class: 'Exploration', race: 'Gek', traits: ['Long Range', 'Advanced Scanner', 'Fuel Efficient'], damage: 0, repairsMade: 0 },
  { id: 'f-4', name: '黃金商隊號', class: 'Trading', race: 'Gek', traits: ['Trade Relations', 'Large Cargo Hold', 'Economic Specialist'], damage: 0, repairsMade: 1 },
  { id: 'f-5', name: '治癒之光號', class: 'Support', race: 'Korvax', traits: ['Engineering Bay', 'Repair Drones', 'Medical Facility'], damage: 15, repairsMade: 3 },
  { id: 'f-6', name: '活體護衛者', class: 'Living', race: 'Traveller', traits: ['Organic Hull', 'Regeneration', 'Psychic Bond'], damage: 0, repairsMade: 0 },
];

const companions: Companion[] = [
  { id: 'c-1', name: '小星星', species: '四足動物', biome: 'Lush', creatureType: 'Quadruped', trust: 98.5, traits: [80, 60, 75], moods: [90, 85], isPredator: false, hasFur: true },
  { id: 'c-2', name: '暗翼', species: '飛行生物', biome: 'Exotic', creatureType: 'Flying', trust: 75.2, traits: [50, 90, 40], moods: [60, 70], isPredator: true, hasFur: false },
  { id: 'c-3', name: '泡泡', species: '水生生物', biome: 'Lush', creatureType: 'Aquatic', trust: 88.0, traits: [70, 70, 70], moods: [80, 80], isPredator: false, hasFur: false },
];

const bases: Base[] = [
  { id: 'b-1', name: '星光堡壘', galaxy: 'Euclid', system: 'Eisvana', planet: 'Paradise-7', objectCount: 342, owner: 'Player', timestamp: '2026-03-15 14:30' },
  { id: 'b-2', name: '深海前哨站', galaxy: 'Euclid', system: 'Budullangr', planet: 'Ocean-12', objectCount: 156, owner: 'Player', timestamp: '2026-03-10 09:15' },
  { id: 'b-3', name: '活化銦礦場', galaxy: 'Euclid', system: 'Hilbert', planet: 'Storm-3', objectCount: 89, owner: 'Player', timestamp: '2026-02-28 18:45' },
  { id: 'b-4', name: '貨船基地', galaxy: 'Euclid', system: 'Mobile', planet: 'Freighter', objectCount: 210, owner: 'Player', timestamp: '2026-03-18 22:00' },
];

const settlements: Settlement[] = [
  { id: 's-1', name: '新艾森瓦納', population: 185, happiness: 82, production: 120000, upkeep: 85000, debt: 0, perks: ['Solar Panels', 'Automated Defenses', 'Trade Hub'] },
  { id: 's-2', name: '霜原哨站', population: 95, happiness: 65, production: 75000, upkeep: 60000, debt: 25000, perks: ['Mining Colony', 'Research Lab'] },
];

const squadron: SquadronPilot[] = [
  { id: 'sq-1', name: 'Kzzt-Kzzt', race: 'Korvax', shipType: 'Fighter', rank: 4 },
  { id: 'sq-2', name: 'Hirk\'s Pride', race: 'Vy\'keen', shipType: 'Fighter', rank: 3 },
  { id: 'sq-3', name: 'Nip Nip Dealer', race: 'Gek', shipType: 'Explorer', rank: 4 },
  { id: 'sq-4', name: '', race: '', shipType: '', rank: 0 },
];

const playerState: PlayerState = {
  units: 2147483647,
  nanites: 999999,
  quicksilver: 50000,
  health: 12,
  shield: 8,
  gameMode: 'Normal',
  totalPlayTime: 542.5,
  currentGalaxy: 'Euclid',
  exosuit: {
    class: 'S',
    health: 12,
    shield: 8,
    energy: 100,
    inventory: makeInventory(36, 48, 8, 6),
    techInventory: makeInventory(14, 14, 7, 2),
    cargoInventory: makeInventory(30, 48, 8, 6),
  },
  ships,
  multiTools,
  vehicles,
  freighter: {
    name: '宇宙巨獸號',
    class: 'S',
    seed: '0xDEADBEEF',
    race: 'Vy\'keen',
    inventory: makeInventory(24, 40, 8, 5),
    techInventory: makeInventory(8, 14, 7, 2),
    cargoInventory: makeInventory(30, 40, 8, 5),
    frigates,
  },
  companions,
  bases,
  settlements,
  squadron,
};

export const mockSaveFiles: SaveFile[] = [
  {
    id: 'save-1',
    name: '主存檔 - 探險家',
    slot: 1,
    gameMode: 'Normal',
    lastModified: '2026-03-19 10:30:00',
    playTime: 542.5,
    playerState,
  },
  {
    id: 'save-2',
    name: '生存挑戰',
    slot: 2,
    gameMode: 'Survival',
    lastModified: '2026-03-18 22:15:00',
    playTime: 128.3,
    playerState: { ...playerState, gameMode: 'Survival', units: 500000, nanites: 12000 },
  },
  {
    id: 'save-3',
    name: '永久死亡極限',
    slot: 3,
    gameMode: 'Permadeath',
    lastModified: '2026-03-17 18:00:00',
    playTime: 45.8,
    playerState: { ...playerState, gameMode: 'Permadeath', units: 150000, nanites: 5000 },
  },
  {
    id: 'save-4',
    name: '創造模式基地',
    slot: 4,
    gameMode: 'Creative',
    lastModified: '2026-03-15 14:00:00',
    playTime: 89.2,
    playerState: { ...playerState, gameMode: 'Creative' },
  },
  {
    id: 'save-5',
    name: '遠征存檔',
    slot: 5,
    gameMode: 'Normal',
    lastModified: '2026-03-12 20:30:00',
    playTime: 32.1,
    playerState: { ...playerState, units: 50000000, nanites: 80000 },
  },
];
