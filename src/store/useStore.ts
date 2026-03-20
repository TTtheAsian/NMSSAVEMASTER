import { create } from 'zustand';
import type { SaveFile, PlayerState, Ship, MultiTool, Vehicle, Companion, Settlement, DifficultySettings } from '../types';
import { mockSaveFiles } from '../data/mockSave';

interface HistoryEntry {
  label: string;
  timestamp: number;
  snapshot: SaveFile;
}

interface AppStore {
  saveFiles: SaveFile[];
  activeSave: SaveFile | null;
  setActiveSave: (save: SaveFile) => void;

  // Undo/Redo
  history: HistoryEntry[];
  historyIndex: number;
  pushHistory: (label: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;

  notifications: { id: string; message: string; type: 'success' | 'error' | 'info' }[];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;

  // Quick actions
  maxAllCurrency: () => void;
  repairAll: () => void;
  refillAll: () => void;
  unlockAllSlots: () => void;
  maxAllStats: () => void;

  // Entity editing
  updatePlayerState: (partial: Partial<PlayerState>) => void;
  updateDifficulty: (partial: Partial<DifficultySettings>) => void;
  updateShip: (shipId: string, updates: Partial<Ship>) => void;
  deleteShip: (shipId: string) => void;
  addShip: (ship: Ship) => void;
  updateMultiTool: (mtId: string, updates: Partial<MultiTool>) => void;
  updateVehicle: (vId: string, updates: Partial<Vehicle>) => void;
  updateCompanion: (cId: string, updates: Partial<Companion>) => void;
  deleteCompanion: (cId: string) => void;
  updateSettlement: (sId: string, updates: Partial<Settlement>) => void;
  updateFrigate: (fId: string, updates: Partial<{ name: string; class: string; race: string; traits: string[]; damage: number }>) => void;
}

function cloneSave(save: SaveFile): SaveFile {
  return JSON.parse(JSON.stringify(save));
}

export const useStore = create<AppStore>((set, get) => ({
  saveFiles: mockSaveFiles,
  activeSave: mockSaveFiles[0],
  sidebarCollapsed: false,
  activeTab: 'dashboard',
  notifications: [],
  history: [],
  historyIndex: -1,

  setActiveSave: (save) => set({ activeSave: save }),
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Undo/Redo
  pushHistory: (label) => {
    const save = get().activeSave;
    if (!save) return;
    const { history, historyIndex } = get();
    const trimmed = history.slice(0, historyIndex + 1);
    const entry: HistoryEntry = { label, timestamp: Date.now(), snapshot: cloneSave(save) };
    const next = [...trimmed, entry].slice(-30); // keep 30 entries max
    set({ history: next, historyIndex: next.length - 1 });
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < 0) return;
    const entry = history[historyIndex];
    set({ activeSave: cloneSave(entry.snapshot), historyIndex: historyIndex - 1 });
    get().addNotification(`已還原: ${entry.label}`, 'info');
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex >= history.length - 1) return;
    const entry = history[historyIndex + 1];
    set({ activeSave: cloneSave(entry.snapshot), historyIndex: historyIndex + 1 });
    get().addNotification(`已重做: ${entry.label}`, 'info');
  },

  canUndo: () => get().historyIndex >= 0,
  canRedo: () => get().historyIndex < get().history.length - 1,

  addNotification: (message, type) => {
    const id = Date.now().toString();
    set((s) => ({ notifications: [...s.notifications, { id, message, type }] }));
    setTimeout(() => get().removeNotification(id), 3000);
  },
  removeNotification: (id) => set((s) => ({
    notifications: s.notifications.filter((n) => n.id !== id),
  })),

  maxAllCurrency: () => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('貨幣全滿');
    set({
      activeSave: {
        ...save,
        playerState: { ...save.playerState, units: 2147483647, nanites: 999999, quicksilver: 99999 },
      },
    });
    get().addNotification('所有貨幣已最大化！', 'success');
  },

  repairAll: () => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('修復全部');
    const ps = save.playerState;
    const repairInv = (inv: typeof ps.exosuit.inventory) => ({
      ...inv, slots: inv.slots.map((s) => ({ ...s, damageFactor: 0 })),
    });
    set({
      activeSave: {
        ...save,
        playerState: {
          ...ps,
          exosuit: {
            ...ps.exosuit,
            inventory: repairInv(ps.exosuit.inventory),
            techInventory: repairInv(ps.exosuit.techInventory),
            cargoInventory: repairInv(ps.exosuit.cargoInventory),
          },
          ships: ps.ships.map((s) => ({
            ...s,
            inventory: repairInv(s.inventory),
            techInventory: repairInv(s.techInventory),
            cargoInventory: repairInv(s.cargoInventory),
          })),
        },
      },
    });
    get().addNotification('所有裝備已修復！', 'success');
  },

  refillAll: () => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('補滿全部');
    const ps = save.playerState;
    const refillInv = (inv: typeof ps.exosuit.inventory) => ({
      ...inv, slots: inv.slots.map((s) => ({ ...s, amount: s.maxAmount })),
    });
    set({
      activeSave: {
        ...save,
        playerState: {
          ...ps, health: 12, shield: 8,
          exosuit: {
            ...ps.exosuit, health: 12, shield: 8, energy: 100,
            inventory: refillInv(ps.exosuit.inventory),
            techInventory: refillInv(ps.exosuit.techInventory),
            cargoInventory: refillInv(ps.exosuit.cargoInventory),
          },
          ships: ps.ships.map((s) => ({
            ...s, health: 1000, shield: 1000,
            inventory: refillInv(s.inventory),
            techInventory: refillInv(s.techInventory),
            cargoInventory: refillInv(s.cargoInventory),
          })),
        },
      },
    });
    get().addNotification('所有物品已補滿！', 'success');
  },

  unlockAllSlots: () => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('解鎖欄位');
    const ps = save.playerState;
    const unlockInv = (inv: typeof ps.exosuit.inventory) => ({ ...inv, usedSlots: inv.maxSlots });
    set({
      activeSave: {
        ...save,
        playerState: {
          ...ps,
          exosuit: {
            ...ps.exosuit,
            inventory: unlockInv(ps.exosuit.inventory),
            techInventory: unlockInv(ps.exosuit.techInventory),
            cargoInventory: unlockInv(ps.exosuit.cargoInventory),
          },
          ships: ps.ships.map((s) => ({
            ...s,
            inventory: unlockInv(s.inventory),
            techInventory: unlockInv(s.techInventory),
            cargoInventory: unlockInv(s.cargoInventory),
          })),
        },
      },
    });
    get().addNotification('所有欄位已解鎖！', 'success');
  },

  maxAllStats: () => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('屬性最大化');
    const ps = save.playerState;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...ps, health: 12, shield: 12,
          exosuit: { ...ps.exosuit, class: 'S', health: 12, shield: 12, energy: 100 },
          ships: ps.ships.map((s) => ({ ...s, class: 'S' as const, health: 1000, shield: 1000, damage: 500 })),
          multiTools: ps.multiTools.map((m) => ({ ...m, class: 'S' as const })),
        },
      },
    });
    get().addNotification('所有屬性已最大化！', 'success');
  },

  updatePlayerState: (partial) => {
    const save = get().activeSave;
    if (!save) return;
    set({ activeSave: { ...save, playerState: { ...save.playerState, ...partial } } });
  },

  updateDifficulty: (partial) => {
    const save = get().activeSave;
    if (!save) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          difficulty: { ...save.playerState.difficulty, ...partial },
        },
      },
    });
  },

  updateShip: (shipId, updates) => {
    const save = get().activeSave;
    if (!save) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          ships: save.playerState.ships.map((s) => s.id === shipId ? { ...s, ...updates } : s),
        },
      },
    });
  },

  deleteShip: (shipId) => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('刪除飛船');
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          ships: save.playerState.ships.filter((s) => s.id !== shipId),
        },
      },
    });
    get().addNotification('飛船已刪除', 'info');
  },

  addShip: (ship) => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('新增飛船');
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          ships: [...save.playerState.ships, ship],
        },
      },
    });
    get().addNotification(`已新增飛船: ${ship.name}`, 'success');
  },

  updateMultiTool: (mtId, updates) => {
    const save = get().activeSave;
    if (!save) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          multiTools: save.playerState.multiTools.map((m) => m.id === mtId ? { ...m, ...updates } : m),
        },
      },
    });
  },

  updateVehicle: (vId, updates) => {
    const save = get().activeSave;
    if (!save) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          vehicles: save.playerState.vehicles.map((v) => v.id === vId ? { ...v, ...updates } : v),
        },
      },
    });
  },

  updateCompanion: (cId, updates) => {
    const save = get().activeSave;
    if (!save) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          companions: save.playerState.companions.map((c) => c.id === cId ? { ...c, ...updates } : c),
        },
      },
    });
  },

  deleteCompanion: (cId) => {
    const save = get().activeSave;
    if (!save) return;
    get().pushHistory('刪除同伴');
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          companions: save.playerState.companions.filter((c) => c.id !== cId),
        },
      },
    });
    get().addNotification('同伴已移除', 'info');
  },

  updateSettlement: (sId, updates) => {
    const save = get().activeSave;
    if (!save) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          settlements: save.playerState.settlements.map((s) => s.id === sId ? { ...s, ...updates } : s),
        },
      },
    });
  },

  updateFrigate: (fId, updates) => {
    const save = get().activeSave;
    if (!save || !save.playerState.freighter) return;
    set({
      activeSave: {
        ...save,
        playerState: {
          ...save.playerState,
          freighter: {
            ...save.playerState.freighter,
            frigates: save.playerState.freighter.frigates.map((f) =>
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              f.id === fId ? { ...f, ...updates } as any : f
            ),
          },
        },
      },
    });
  },
}));
