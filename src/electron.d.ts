interface ElectronFileData {
  buffer: ArrayBuffer;
  name: string;
  size: number;
}

interface SaveFileEntry {
  name: string;
  path: string;
  size: number;
  modified: number;
}

interface ElectronAPI {
  openFile: () => Promise<ElectronFileData | null>;
  saveFile: (data: ArrayBuffer, defaultName: string) => Promise<boolean>;
  getSavePaths: () => Promise<string[]>;
  listSaves: (dirPath: string) => Promise<SaveFileEntry[]>;
  readFile: (filePath: string) => Promise<ElectronFileData | null>;
  platform: string;
}

interface Window {
  electronAPI?: ElectronAPI;
}
