import { useState } from 'react';
import { X, Copy, Download, Upload, Check, FileJson } from 'lucide-react';
import { useStore } from '../store/useStore';

interface JsonViewerModalProps {
  open: boolean;
  onClose: () => void;
}

export function JsonViewerModal({ open, onClose }: JsonViewerModalProps) {
  const { activeSave, addNotification } = useStore();
  const [tab, setTab] = useState<'view' | 'import'>('view');
  const [importText, setImportText] = useState('');
  const [copied, setCopied] = useState(false);

  if (!open || !activeSave) return null;

  const json = JSON.stringify(activeSave.playerState, null, 2);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      addNotification('JSON 已複製到剪貼簿', 'success');
    } catch {
      addNotification('複製失敗', 'error');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeSave.name}_export.json`;
    a.click();
    URL.revokeObjectURL(url);
    addNotification('JSON 已匯出', 'success');
  };

  const handleImport = () => {
    try {
      JSON.parse(importText);
      addNotification('JSON 格式驗證通過，匯入功能開發中...', 'info');
    } catch {
      addNotification('JSON 格式無效，請檢查內容', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-3xl max-h-[80vh] glass border border-nms-border rounded-xl shadow-2xl flex flex-col animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-nms-border/60">
          <div className="flex items-center gap-2">
            <FileJson size={14} className="text-nms-accent" />
            <span className="text-[13px] font-bold text-nms-text">JSON 檢視器</span>
            <span className="text-[10px] text-nms-text-muted">JSON Viewer</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg border border-nms-border overflow-hidden">
              <button
                onClick={() => setTab('view')}
                className={`px-3 py-1 text-[11px] transition-colors ${tab === 'view' ? 'bg-nms-accent/12 text-nms-accent' : 'text-nms-text-muted hover:bg-nms-hover/40'}`}
              >檢視</button>
              <button
                onClick={() => setTab('import')}
                className={`px-3 py-1 text-[11px] transition-colors ${tab === 'import' ? 'bg-nms-accent/12 text-nms-accent' : 'text-nms-text-muted hover:bg-nms-hover/40'}`}
              >匯入</button>
            </div>
            <button onClick={onClose} className="p-1 rounded text-nms-text-muted hover:text-nms-text transition-colors">
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content */}
        {tab === 'view' ? (
          <>
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-[11px] text-nms-text-dim font-mono whitespace-pre-wrap leading-relaxed">{json}</pre>
            </div>
            <div className="flex items-center gap-2 px-4 py-3 border-t border-nms-border/60">
              <span className="text-[9px] text-nms-text-muted flex-1">{json.length.toLocaleString()} characters</span>
              <button onClick={handleCopy} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-card border border-nms-border text-[11px] text-nms-text-dim hover:bg-nms-hover transition-colors">
                {copied ? <Check size={11} className="text-nms-green" /> : <Copy size={11} />}
                {copied ? '已複製' : '複製'}
              </button>
              <button onClick={handleDownload} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-accent/10 border border-nms-accent/20 text-[11px] text-nms-accent hover:bg-nms-accent/15 transition-colors">
                <Download size={11} /> 下載 JSON
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-1 p-4">
              <textarea
                value={importText}
                onChange={e => setImportText(e.target.value)}
                placeholder="將 JSON 內容貼到這裡... Paste JSON content here..."
                className="w-full h-full bg-nms-bg-elevated border border-nms-border rounded-lg p-3 text-[11px] font-mono text-nms-text-dim outline-none focus:border-nms-accent/40 resize-none placeholder:text-nms-text-muted/30"
              />
            </div>
            <div className="flex items-center gap-2 px-4 py-3 border-t border-nms-border/60">
              <span className="text-[9px] text-nms-text-muted flex-1">
                {importText ? `${importText.length.toLocaleString()} characters` : '等待輸入...'}
              </span>
              <button
                onClick={handleImport}
                disabled={!importText}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-green/10 border border-nms-green/20 text-[11px] text-nms-green hover:bg-nms-green/15 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Upload size={11} /> 驗證並匯入
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
