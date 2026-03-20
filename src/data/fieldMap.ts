// Load field mappings from NMSSaveEditor jsonmap files
import jsonmapRaw from '../../nomanssave/db/jsonmap.txt?raw';
import jsonmapacRaw from '../../nomanssave/db/jsonmapac.txt?raw';

function parseMapping(raw: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const line of raw.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const tabIdx = trimmed.indexOf('\t');
    if (tabIdx === -1) continue;
    const key = trimmed.substring(0, tabIdx);
    const value = trimmed.substring(tabIdx + 1);
    if (key && value) {
      map[key] = value;
    }
  }
  return map;
}

// Maps obfuscated NMS save file field names to readable names
export const FIELD_MAP: Record<string, string> = parseMapping(jsonmapRaw);

// Account/Settings field mappings
export const ACCOUNT_FIELD_MAP: Record<string, string> = parseMapping(jsonmapacRaw);

// Reverse map: readable name -> obfuscated key
export const REVERSE_MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(FIELD_MAP)) {
  REVERSE_MAP[v] = k;
}

export const REVERSE_ACCOUNT_MAP: Record<string, string> = {};
for (const [k, v] of Object.entries(ACCOUNT_FIELD_MAP)) {
  REVERSE_ACCOUNT_MAP[v] = k;
}
