export type ItemClass = 'S' | 'A' | 'B' | 'C';
export type GameMode = 'Normal' | 'Survival' | 'Permadeath' | 'Creative' | 'Relaxed' | 'Custom';

export interface InventorySlot {
  id: string;
  itemId: string;
  itemName: string;
  amount: number;
  maxAmount: number;
  category: 'substance' | 'product' | 'technology';
  damageFactor: number;
  isInstalled: boolean;
  icon?: string;
}

export interface Inventory {
  slots: InventorySlot[];
  width: number;
  height: number;
  usedSlots: number;
  maxSlots: number;
}

export interface Ship {
  id: string;
  name: string;
  type: 'Fighter' | 'Hauler' | 'Shuttle' | 'Explorer' | 'Exotic' | 'Living' | 'Solar' | 'Sentinel' | 'Interceptor';
  class: ItemClass;
  seed: string;
  inventory: Inventory;
  techInventory: Inventory;
  cargoInventory: Inventory;
  health: number;
  shield: number;
  damage: number;
  isPrimary: boolean;
}

export interface MultiTool {
  id: string;
  name: string;
  class: ItemClass;
  seed: string;
  type: 'Rifle' | 'Pistol' | 'Experimental' | 'Alien' | 'Royal' | 'Staff';
  inventory: Inventory;
  isPrimary: boolean;
}

export interface Exosuit {
  class: ItemClass;
  health: number;
  shield: number;
  energy: number;
  inventory: Inventory;
  techInventory: Inventory;
  cargoInventory: Inventory;
}

export interface Vehicle {
  id: string;
  name: string;
  type: 'Nomad' | 'Roamer' | 'Colossus' | 'Nauticlon' | 'Minotaur' | 'Pilgrim';
  inventory: Inventory;
  seed: string;
}

export interface Freighter {
  name: string;
  class: ItemClass;
  seed: string;
  race: string;
  inventory: Inventory;
  techInventory: Inventory;
  cargoInventory: Inventory;
  frigates: Frigate[];
}

export interface Frigate {
  id: string;
  name: string;
  class: 'Combat' | 'Support' | 'Mining' | 'Trading' | 'Exploration' | 'Living';
  race: string;
  traits: string[];
  damage: number;
  repairsMade: number;
}

export interface Companion {
  id: string;
  name: string;
  species: string;
  biome: string;
  creatureType: string;
  trust: number;
  traits: number[];
  moods: number[];
  isPredator: boolean;
  hasFur: boolean;
}

export interface Base {
  id: string;
  name: string;
  galaxy: string;
  system: string;
  planet: string;
  objectCount: number;
  owner: string;
  timestamp: string;
}

export interface Settlement {
  id: string;
  name: string;
  population: number;
  happiness: number;
  production: number;
  upkeep: number;
  debt: number;
  perks: string[];
}

export interface SquadronPilot {
  id: string;
  name: string;
  race: string;
  shipType: string;
  rank: number;
}

export interface DifficultySettings {
  deathConsequences: number;      // 0=none, 1=mild, 2=harsh, 3=permadeath
  damageReceived: number;         // 0.1-10.0 multiplier
  damageGiven: number;            // 0.1-10.0 multiplier
  hazardDrain: number;            // 0.1-10.0
  energyDrain: number;            // 0.1-10.0
  substanceCollection: number;    // 0.1-10.0
  chargingRequirements: number;   // 0.1-10.0
  fuelUse: number;                // 0.1-10.0
  launchFuelCost: number;         // 0.1-10.0
  currencyCost: number;           // 0.1-10.0
  scannerRecharge: number;        // 0.1-10.0
  reputationGain: number;         // 0.1-10.0
  creatureHostility: number;      // 0.1-10.0
  spaceCombatTimers: number;      // 0.1-10.0
  groundCombatTimers: number;     // 0.1-10.0
  sprintingCost: number;          // 0.1-10.0
  breakTechOnDamage: number;      // 0.0-1.0 probability
  inventoryStackLimits: number;   // 0=low, 1=normal, 2=high
  // Toggles
  craftingIsFree: boolean;
  tutorialEnabled: boolean;
  startWithAllItemsKnown: boolean;
  baseAutoPower: boolean;
  inventoriesAlwaysInRange: boolean;
  allSlotsUnlocked: boolean;
  warpDriveRequirements: boolean;
  activeSurvivalBars: boolean;
}

export interface PlayerState {
  units: number;
  nanites: number;
  quicksilver: number;
  health: number;
  shield: number;
  gameMode: GameMode;
  totalPlayTime: number;
  currentGalaxy: string;
  exosuit: Exosuit;
  ships: Ship[];
  multiTools: MultiTool[];
  vehicles: Vehicle[];
  freighter: Freighter | null;
  companions: Companion[];
  bases: Base[];
  settlements: Settlement[];
  squadron: SquadronPilot[];
  difficulty: DifficultySettings;
}

export interface SaveFile {
  id: string;
  name: string;
  slot: number;
  gameMode: GameMode;
  lastModified: string;
  playTime: number;
  playerState: PlayerState;
}
