import { contextBridge, ipcRenderer } from 'electron';

export interface ElectronFileData {
  buffer: ArrayBuffer;
  name: string;
  size: number;
}

export interface SaveFileEntry {
  name: string;
  path: string;
  size: number;
  modified: number;
}

contextBridge.exposeInMainWorld('electronAPI', {
  // File dialogs
  openFile: (): Promise<ElectronFileData | null> =>
    ipcRenderer.invoke('dialog:openFile'),
  saveFile: (data: ArrayBuffer, defaultName: string): Promise<boolean> =>
    ipcRenderer.invoke('dialog:saveFile', data, defaultName),

  // Save discovery
  getSavePaths: (): Promise<string[]> =>
    ipcRenderer.invoke('app:getSavePaths'),
  listSaves: (dirPath: string): Promise<SaveFileEntry[]> =>
    ipcRenderer.invoke('fs:listSaves', dirPath),
  readFile: (filePath: string): Promise<ElectronFileData | null> =>
    ipcRenderer.invoke('fs:readFile', filePath),

  // Platform info
  platform: process.platform,
});
