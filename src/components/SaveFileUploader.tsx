import { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle, Loader2, Download, Info } from 'lucide-react';
import { parseSaveFile, parseSaveBuffer, exportSaveFile } from '../data/saveParser';
import type { ParsedSaveFile } from '../data/saveParser';
import { useStore } from '../store/useStore';

const isElectron = typeof window !== 'undefined' && 'electronAPI' in window;

interface SaveFileUploaderProps {
  onParsed?: (result: ParsedSaveFile) => void;
}

export function SaveFileUploader({ onParsed }: SaveFileUploaderProps) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ParsedSaveFile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const { addNotification } = useStore();

  const handleFile = async (file: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const parsed = await parseSaveFile(file);
      setResult(parsed);
      addNotification(`存檔解析成功！(${(file.size / 1024).toFixed(1)} KB${parsed.wasCompressed ? ', 已解壓縮' : ''})`, 'success');
      onParsed?.(parsed);
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      addNotification(`存檔解析失敗: ${msg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleElectronOpen = async () => {
    if (!window.electronAPI) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const fileData = await window.electronAPI.openFile();
      if (!fileData) {
        setLoading(false);
        return; // User cancelled
      }
      const parsed = await parseSaveBuffer(fileData.buffer, fileData.name);
      setResult(parsed);
      addNotification(`存檔解析成功！(${(fileData.size / 1024).toFixed(1)} KB${parsed.wasCompressed ? ', 已解壓縮' : ''})`, 'success');
      onParsed?.(parsed);
    } catch (e) {
      const msg = (e as Error).message;
      setError(msg);
      addNotification(`存檔解析失敗: ${msg}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleExport = async () => {
    if (!result) return;
    try {
      const blob = await exportSaveFile(result.deobfuscated as Record<string, unknown>, result.fileName, result.wasCompressed);

      if (isElectron && window.electronAPI) {
        // Electron: native save dialog
        const arrayBuffer = await blob.arrayBuffer();
        const saved = await window.electronAPI.saveFile(arrayBuffer, `${result.fileName}_modified`);
        if (saved) {
          addNotification('存檔已匯出！', 'success');
        }
      } else {
        // Browser: download via anchor
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${result.fileName}_modified`;
        a.click();
        URL.revokeObjectURL(url);
        addNotification('存檔已匯出！', 'success');
      }
    } catch {
      addNotification('匯出失敗', 'error');
    }
  };

  const handleDropZoneClick = () => {
    if (isElectron) {
      handleElectronOpen();
    } else {
      fileRef.current?.click();
    }
  };

  const playerData = result?.deobfuscated?.['PlayerStateData'] as Record<string, unknown> | undefined;

  return (
    <div className="space-y-3">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={handleDropZoneClick}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragging
            ? 'border-nms-accent bg-nms-accent/5'
            : 'border-nms-border/60 hover:border-nms-accent/30 hover:bg-nms-hover/20'
        }`}
      >
        {!isElectron && (
          <input
            ref={fileRef}
            type="file"
            accept=".hg,.json,*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        )}
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={28} className="text-nms-accent animate-spin" />
            <div className="text-[12px] text-nms-text">正在解析存檔...</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={28} className={`${dragging ? 'text-nms-accent' : 'text-nms-text-muted/60'}`} />
            <div className="text-[12px] text-nms-text">
              {isElectron ? '點擊選擇存檔 或 拖放檔案到這裡' : '拖放存檔到這裡 或 點擊選擇'}
            </div>
            <div className="text-[10px] text-nms-text-muted/50">支援 .hg / .json 格式 (Steam / GOG / Game Pass)</div>
          </div>
        )}
      </div>

      {/* Save file locations hint */}
      {!isElectron && (
        <div className="flex items-start gap-2 p-2.5 bg-nms-bg-elevated/40 rounded-lg border border-nms-border/30">
          <Info size={12} className="text-nms-accent2/60 flex-shrink-0 mt-0.5" />
          <div className="text-[9px] text-nms-text-muted/60 space-y-0.5">
            <div><strong className="text-nms-text-dim/70">Steam:</strong> %APPDATA%\HelloGames\NMS\st_*\save*.hg</div>
            <div><strong className="text-nms-text-dim/70">GOG:</strong> %APPDATA%\HelloGames\NMS\DefaultUser\save*.hg</div>
            <div><strong className="text-nms-text-dim/70">Game Pass:</strong> %LOCALAPPDATA%\Packages\HelloGames...\SystemAppData\wgs\</div>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-nms-red/8 border border-nms-red/20 rounded-xl">
          <AlertCircle size={14} className="text-nms-red flex-shrink-0" />
          <div className="text-[11px] text-nms-red">{error}</div>
        </div>
      )}

      {/* Parse result */}
      {result && playerData && (
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-nms-green" />
              <span className="text-[12px] font-bold text-nms-text">解析成功</span>
            </div>
            <button onClick={handleExport} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-accent/10 text-nms-accent text-[11px] font-medium hover:bg-nms-accent/15 transition-colors">
              <Download size={11} /> 匯出修改後存檔
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="bg-nms-bg-elevated rounded-lg p-2">
              <div className="text-[8px] text-nms-text-muted">檔案名稱</div>
              <div className="text-[10px] font-mono text-nms-text truncate mt-0.5">{result.fileName}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded-lg p-2">
              <div className="text-[8px] text-nms-text-muted">檔案大小</div>
              <div className="text-[10px] text-nms-text mt-0.5">{(result.fileSize / 1024).toFixed(1)} KB</div>
            </div>
            <div className="bg-nms-bg-elevated rounded-lg p-2">
              <div className="text-[8px] text-nms-text-muted">壓縮狀態</div>
              <div className="text-[10px] text-nms-text mt-0.5">{result.wasCompressed ? '已壓縮 (Zlib)' : '未壓縮'}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded-lg p-2">
              <div className="text-[8px] text-nms-text-muted">星幣</div>
              <div className="text-[10px] font-bold text-nms-gold mt-0.5">{((playerData['Units'] as number) || 0).toLocaleString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-[9px]">
            <div className="bg-nms-bg-elevated rounded p-1.5">
              <div className="text-nms-text-muted">飛船</div>
              <div className="font-bold text-nms-text">{((playerData['ShipOwnership'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded p-1.5">
              <div className="text-nms-text-muted">工具</div>
              <div className="font-bold text-nms-text">{((playerData['Multitools'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded p-1.5">
              <div className="text-nms-text-muted">載具</div>
              <div className="font-bold text-nms-text">{((playerData['VehicleOwnership'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded p-1.5">
              <div className="text-nms-text-muted">同伴</div>
              <div className="font-bold text-nms-text">{((playerData['Pets'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded p-1.5">
              <div className="text-nms-text-muted">基地</div>
              <div className="font-bold text-nms-text">{((playerData['PersistentPlayerBases'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg-elevated rounded p-1.5">
              <div className="text-nms-text-muted">科技</div>
              <div className="font-bold text-nms-text">{((playerData['KnownTech'] as unknown[]) || []).length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
