import { FIELD_MAP, REVERSE_MAP, ACCOUNT_FIELD_MAP } from '../data/fieldMap';

/**
 * NMS Save File Parser
 * Handles reading, deobfuscating, re-obfuscating, and writing NMS save files.
 * Supports both raw JSON and potentially zlib-compressed formats.
 */

// Deobfuscate: convert obfuscated keys to readable names
export function deobfuscateJson(obj: unknown, isAccount = false): unknown {
  const map = isAccount ? { ...FIELD_MAP, ...ACCOUNT_FIELD_MAP } : FIELD_MAP;

  if (Array.isArray(obj)) {
    return obj.map(item => deobfuscateJson(item, isAccount));
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const readableKey = map[key] || key;
      result[readableKey] = deobfuscateJson(value, isAccount);
    }
    return result;
  }
  return obj;
}

// Re-obfuscate: convert readable names back to obfuscated keys
export function obfuscateJson(obj: unknown, isAccount = false): unknown {
  const map = isAccount
    ? Object.fromEntries([...Object.entries(FIELD_MAP), ...Object.entries(ACCOUNT_FIELD_MAP)].map(([k, v]) => [v, k]))
    : REVERSE_MAP;

  if (Array.isArray(obj)) {
    return obj.map(item => obfuscateJson(item, isAccount));
  }
  if (obj !== null && typeof obj === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
      const obfKey = map[key] || key;
      result[obfKey] = obfuscateJson(value, isAccount);
    }
    return result;
  }
  return obj;
}

// Detect if data is zlib compressed (check for zlib header 0x78)
function isZlibCompressed(data: Uint8Array): boolean {
  if (data.length < 2) return false;
  return data[0] === 0x78 && (data[1] === 0x01 || data[1] === 0x5E || data[1] === 0x9C || data[1] === 0xDA);
}

// Try to decompress zlib data using DecompressionStream API
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function zlibDecompress(data: any): Promise<any> {
  const ds = new DecompressionStream('deflate');
  const writer = ds.writable.getWriter();
  const reader = ds.readable.getReader();
  writer.write(data);
  writer.close();

  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(totalLen);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

// Compress data with zlib
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function zlibCompress(data: any): Promise<any> {
  const cs = new CompressionStream('deflate');
  const writer = cs.writable.getWriter();
  const reader = cs.readable.getReader();
  writer.write(data);
  writer.close();

  const chunks: Uint8Array[] = [];
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  const totalLen = chunks.reduce((acc, c) => acc + c.length, 0);
  const result = new Uint8Array(totalLen);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

export interface ParsedSaveFile {
  raw: Record<string, unknown>;
  deobfuscated: Record<string, unknown>;
  wasCompressed: boolean;
  fileName: string;
  fileSize: number;
}

// Parse an uploaded NMS save file
export async function parseSaveFile(file: File): Promise<ParsedSaveFile> {
  const buffer = await file.arrayBuffer();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let bytes = new Uint8Array(buffer) as any;
  let wasCompressed = false;

  // Check for zlib compression
  if (isZlibCompressed(bytes)) {
    try {
      bytes = await zlibDecompress(bytes);
      wasCompressed = true;
    } catch {
      // Not actually compressed, try as-is
    }
  }

  // Decode as UTF-8
  const text = new TextDecoder('utf-8').decode(bytes);

  // Parse JSON
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(text);
  } catch (e) {
    throw new Error(`無法解析存檔 JSON: ${(e as Error).message}`);
  }

  // Deobfuscate
  const deobfuscated = deobfuscateJson(raw) as Record<string, unknown>;

  return {
    raw,
    deobfuscated,
    wasCompressed,
    fileName: file.name,
    fileSize: file.size,
  };
}

// Export save file back to downloadable format
export async function exportSaveFile(
  deobfuscated: Record<string, unknown>,
  _fileName: string,
  compress: boolean = false
): Promise<Blob> {
  const obfuscated = obfuscateJson(deobfuscated);
  const json = JSON.stringify(obfuscated);
  const encoded = new TextEncoder().encode(json);

  if (compress) {
    const compressed = await zlibCompress(encoded);
    return new Blob([compressed.buffer as ArrayBuffer], { type: 'application/octet-stream' });
  }

  return new Blob([encoded.buffer as ArrayBuffer], { type: 'application/octet-stream' });
}

// Extract key game data from a deobfuscated save
export function extractPlayerData(save: Record<string, unknown>) {
  const ps = save['PlayerStateData'] as Record<string, unknown> | undefined;
  if (!ps) return null;

  const getInv = (inv: unknown) => {
    if (!inv || typeof inv !== 'object') return { slots: [], width: 0, height: 0, usedSlots: 0, maxSlots: 0 };
    const i = inv as Record<string, unknown>;
    const slots = (i['Slots'] as unknown[]) || [];
    const validIndices = (i['ValidSlotIndices'] as unknown[]) || [];
    return {
      slots: slots.map((s: unknown) => {
        const slot = s as Record<string, unknown>;
        const typeData = slot['Type'] as Record<string, unknown> | undefined;
        const indexData = slot['Index'] as Record<string, unknown> | undefined;
        return {
          id: JSON.stringify(slot['Id']),
          itemId: ((slot['Id'] as Record<string, unknown>)?.['Id'] as string) || '',
          itemName: ((slot['Id'] as Record<string, unknown>)?.['Id'] as string) || 'Unknown',
          amount: (slot['Amount'] as number) || 0,
          maxAmount: (slot['MaxAmount'] as number) || 0,
          category: (typeData?.['InventoryType'] as string) || 'substance',
          damageFactor: (slot['DamageFactor'] as number) || 0,
          isInstalled: (slot['FullyInstalled'] as boolean) || false,
          index: { x: (indexData?.['X'] as number) || 0, y: (indexData?.['Y'] as number) || 0 },
        };
      }),
      width: (i['Width'] as number) || 0,
      height: (i['Height'] as number) || 0,
      usedSlots: validIndices.length,
      maxSlots: ((i['Width'] as number) || 0) * ((i['Height'] as number) || 0),
    };
  };

  return {
    units: (ps['Units'] as number) || 0,
    nanites: (ps['Nanites'] as number) || 0,
    quicksilver: (ps['Specials'] as number) || 0,
    health: (ps['Health'] as number) || 0,
    shipHealth: (ps['ShipHealth'] as number) || 0,
    shield: (ps['Shield'] as number) || 0,
    shipShield: (ps['ShipShield'] as number) || 0,
    energy: (ps['Energy'] as number) || 0,
    totalPlayTime: (ps['TotalPlayTime'] as number) || 0,
    exosuit: {
      inventory: getInv(ps['Inventory']),
      techInventory: getInv(ps['Inventory_TechOnly']),
      cargoInventory: getInv(ps['Inventory_Cargo']),
    },
    ships: ((ps['ShipOwnership'] as unknown[]) || []).map((s: unknown) => {
      const ship = s as Record<string, unknown>;
      return {
        name: (ship['Name'] as string) || 'Unnamed Ship',
        seed: JSON.stringify(ship['Seed']),
        inventory: getInv(ship['Inventory']),
        resource: ship['Resource'] as Record<string, unknown>,
      };
    }),
    multiTools: ((ps['Multitools'] as unknown[]) || []).map((m: unknown) => {
      const mt = m as Record<string, unknown>;
      return {
        name: (mt['Name'] as string) || 'Unnamed Tool',
        inventory: getInv(mt['Inventory']),
        isLarge: (mt['IsLarge'] as boolean) || false,
      };
    }),
    freighter: {
      name: (ps['PlayerFreighterName'] as string) || '',
      inventory: getInv(ps['FreighterInventory']),
      techInventory: getInv(ps['FreighterInventory_TechOnly']),
      cargoInventory: getInv(ps['FreighterInventory_Cargo']),
    },
    vehicles: ((ps['VehicleOwnership'] as unknown[]) || []).map((v: unknown) => {
      const veh = v as Record<string, unknown>;
      return {
        name: (veh['Name'] as string) || '',
        resource: veh['Resource'] as Record<string, unknown>,
        inventory: getInv(veh['Inventory']),
      };
    }),
    companions: ((ps['Pets'] as unknown[]) || []).map((p: unknown) => {
      const pet = p as Record<string, unknown>;
      return {
        name: (pet['CustomName'] as string) || (pet['Name'] as string) || '',
        trust: (pet['Trust'] as number) || 0,
        biome: (pet['Biome'] as string) || '',
        creatureType: (pet['CreatureType'] as string) || '',
        predator: (pet['Predator'] as boolean) || false,
        hasFur: (pet['HasFur'] as boolean) || false,
        traits: (pet['Traits'] as number[]) || [],
        moods: (pet['Moods'] as number[]) || [],
      };
    }),
    bases: ((ps['PersistentPlayerBases'] as unknown[]) || []).map((b: unknown) => {
      const base = b as Record<string, unknown>;
      return {
        name: (base['Name'] as string) || 'Unnamed Base',
        baseType: (base['BaseType'] as string) || '',
        objects: ((base['Objects'] as unknown[]) || []).length,
      };
    }),
    knownTech: (ps['KnownTech'] as string[]) || [],
    knownProducts: (ps['KnownProducts'] as string[]) || [],
    knownWords: (ps['KnownWordGroups'] as unknown[]) || [],
    portalRunes: (ps['KnownPortalRunes'] as number) || 0,
    universeAddress: ps['UniverseAddress'] as Record<string, unknown>,
    difficultyState: ps['DifficultyState'] as Record<string, unknown>,
    settlements: (ps['SettlementStatesV2'] as unknown[]) || [],
    squadron: (ps['SquadronPilots'] as unknown[]) || [],
  };
}

// Validate JSON structure
export function validateSaveJson(text: string): { valid: boolean; error?: string; data?: unknown } {
  try {
    const data = JSON.parse(text);
    if (typeof data !== 'object' || data === null) {
      return { valid: false, error: 'JSON 必須是物件格式' };
    }
    // Check for NMS save markers
    const keys = Object.keys(data);
    const hasPlayerState = keys.some(k => k === 'PlayerStateData' || k === '6f=');
    const hasVersion = keys.some(k => k === 'Version' || k === 'F2P');
    if (!hasPlayerState && !hasVersion) {
      return { valid: false, error: '這不像是有效的 NMS 存檔文件（缺少 PlayerStateData 或 Version）' };
    }
    return { valid: true, data };
  } catch (e) {
    return { valid: false, error: `JSON 語法錯誤: ${(e as Error).message}` };
  }
}
