import { useState, useRef } from 'react';
import { Upload, AlertCircle, CheckCircle, Loader2, Download, Info } from 'lucide-react';
import { parseSaveFile, exportSaveFile } from '../data/saveParser';
import type { ParsedSaveFile } from '../data/saveParser';
import { useStore } from '../store/useStore';

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
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${result.fileName}_modified`;
      a.click();
      URL.revokeObjectURL(url);
      addNotification('存檔已匯出！', 'success');
    } catch {
      addNotification('匯出失敗', 'error');
    }
  };

  const playerData = result?.deobfuscated?.['PlayerStateData'] as Record<string, unknown> | undefined;

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          dragging
            ? 'border-nms-accent bg-nms-accent/5'
            : 'border-nms-border hover:border-nms-accent/40 hover:bg-nms-hover/30'
        }`}
      >
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
        {loading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={32} className="text-nms-accent animate-spin" />
            <div className="text-sm text-nms-text">正在解析存檔...</div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={32} className={`${dragging ? 'text-nms-accent' : 'text-nms-text-muted'}`} />
            <div className="text-sm text-nms-text">拖放存檔到這裡 或 點擊選擇</div>
            <div className="text-[10px] text-nms-text-muted">支援 .hg / .json 格式 (Steam / GOG / Game Pass)</div>
          </div>
        )}
      </div>

      {/* Save file locations hint */}
      <div className="flex items-start gap-2 p-3 bg-nms-bg rounded-lg">
        <Info size={14} className="text-nms-accent2 flex-shrink-0 mt-0.5" />
        <div className="text-[10px] text-nms-text-muted space-y-0.5">
          <div><strong className="text-nms-text-dim">Steam:</strong> %APPDATA%\HelloGames\NMS\st_*\save*.hg</div>
          <div><strong className="text-nms-text-dim">GOG:</strong> %APPDATA%\HelloGames\NMS\DefaultUser\save*.hg</div>
          <div><strong className="text-nms-text-dim">Game Pass:</strong> %LOCALAPPDATA%\Packages\HelloGames...\SystemAppData\wgs\</div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-nms-red/10 border border-nms-red/30 rounded-lg">
          <AlertCircle size={16} className="text-nms-red flex-shrink-0" />
          <div className="text-xs text-nms-red">{error}</div>
        </div>
      )}

      {/* Parse result */}
      {result && playerData && (
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-nms-green" />
              <span className="text-sm font-bold text-nms-text">解析成功</span>
            </div>
            <button onClick={handleExport} className="flex items-center gap-1 px-3 py-1 rounded-lg bg-nms-accent/10 text-nms-accent text-xs hover:bg-nms-accent/20 transition-colors">
              <Download size={12} /> 匯出修改後存檔
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
            <div className="bg-nms-bg rounded-lg p-2">
              <div className="text-[9px] text-nms-text-muted">檔案名稱</div>
              <div className="text-xs font-mono text-nms-text truncate">{result.fileName}</div>
            </div>
            <div className="bg-nms-bg rounded-lg p-2">
              <div className="text-[9px] text-nms-text-muted">檔案大小</div>
              <div className="text-xs text-nms-text">{(result.fileSize / 1024).toFixed(1)} KB</div>
            </div>
            <div className="bg-nms-bg rounded-lg p-2">
              <div className="text-[9px] text-nms-text-muted">壓縮狀態</div>
              <div className="text-xs text-nms-text">{result.wasCompressed ? '已壓縮 (Zlib)' : '未壓縮'}</div>
            </div>
            <div className="bg-nms-bg rounded-lg p-2">
              <div className="text-[9px] text-nms-text-muted">星幣</div>
              <div className="text-xs font-bold text-nms-gold">{((playerData['Units'] as number) || 0).toLocaleString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 text-center text-[10px]">
            <div className="bg-nms-bg rounded p-1.5">
              <div className="text-nms-text-muted">飛船</div>
              <div className="font-bold text-nms-text">{((playerData['ShipOwnership'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg rounded p-1.5">
              <div className="text-nms-text-muted">工具</div>
              <div className="font-bold text-nms-text">{((playerData['Multitools'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg rounded p-1.5">
              <div className="text-nms-text-muted">載具</div>
              <div className="font-bold text-nms-text">{((playerData['VehicleOwnership'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg rounded p-1.5">
              <div className="text-nms-text-muted">同伴</div>
              <div className="font-bold text-nms-text">{((playerData['Pets'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg rounded p-1.5">
              <div className="text-nms-text-muted">基地</div>
              <div className="font-bold text-nms-text">{((playerData['PersistentPlayerBases'] as unknown[]) || []).length}</div>
            </div>
            <div className="bg-nms-bg rounded p-1.5">
              <div className="text-nms-text-muted">科技</div>
              <div className="font-bold text-nms-text">{((playerData['KnownTech'] as unknown[]) || []).length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
