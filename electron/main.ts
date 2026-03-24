import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Build paths
const DIST = path.join(__dirname, '../dist');
const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 860,
    minWidth: 900,
    minHeight: 600,
    icon: path.join(__dirname, '../build/icon.png'),
    title: 'NMS Save Master',
    backgroundColor: '#0a0e1a',
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(DIST, 'index.html'));
  }
}

// ─── IPC Handlers ──────────────────────────────────────────

// Open file dialog and read save file
ipcMain.handle('dialog:openFile', async () => {
  if (!mainWindow) return null;
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    title: '選擇 NMS 存檔',
    filters: [
      { name: 'NMS Save Files', extensions: ['hg', 'json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
    properties: ['openFile'],
  });
  if (canceled || filePaths.length === 0) return null;

  const filePath = filePaths[0];
  const buffer = fs.readFileSync(filePath);
  const name = path.basename(filePath);
  return { buffer: buffer.buffer, name, size: buffer.length };
});

// Save file dialog and write data
ipcMain.handle('dialog:saveFile', async (_event, data: ArrayBuffer, defaultName: string) => {
  if (!mainWindow) return false;
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    title: '匯出存檔',
    defaultPath: defaultName,
    filters: [
      { name: 'NMS Save Files', extensions: ['hg', 'json'] },
      { name: 'All Files', extensions: ['*'] },
    ],
  });
  if (canceled || !filePath) return false;

  fs.writeFileSync(filePath, Buffer.from(data));
  return true;
});

// Get platform-specific NMS save paths
ipcMain.handle('app:getSavePaths', () => {
  const platform = process.platform;
  const paths: string[] = [];

  if (platform === 'win32') {
    const appData = process.env.APPDATA || '';
    const localAppData = process.env.LOCALAPPDATA || '';
    const nmsDir = path.join(appData, 'HelloGames', 'NMS');

    if (fs.existsSync(nmsDir)) {
      try {
        const entries = fs.readdirSync(nmsDir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.isDirectory()) {
            paths.push(path.join(nmsDir, entry.name));
          }
        }
      } catch { /* ignore */ }
    }

    // Game Pass path
    const gpBase = path.join(localAppData, 'Packages');
    if (fs.existsSync(gpBase)) {
      try {
        const entries = fs.readdirSync(gpBase);
        const hg = entries.find(e => e.startsWith('HelloGames'));
        if (hg) {
          const wgsPath = path.join(gpBase, hg, 'SystemAppData', 'wgs');
          if (fs.existsSync(wgsPath)) paths.push(wgsPath);
        }
      } catch { /* ignore */ }
    }
  }

  return paths;
});

// List save files in a directory
ipcMain.handle('fs:listSaves', async (_event, dirPath: string) => {
  try {
    const files: { name: string; path: string; size: number; modified: number }[] = [];

    function scanDir(dir: string) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanDir(fullPath);
        } else if (entry.name.endsWith('.hg') || entry.name.endsWith('.json')) {
          const stat = fs.statSync(fullPath);
          files.push({
            name: entry.name,
            path: fullPath,
            size: stat.size,
            modified: stat.mtimeMs,
          });
        }
      }
    }

    scanDir(dirPath);
    return files;
  } catch {
    return [];
  }
});

// Read a specific file by path
ipcMain.handle('fs:readFile', async (_event, filePath: string) => {
  try {
    const buffer = fs.readFileSync(filePath);
    return { buffer: buffer.buffer, name: path.basename(filePath), size: buffer.length };
  } catch {
    return null;
  }
});

// ─── App Lifecycle ─────────────────────────────────────────

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
