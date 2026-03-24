import { Download, Upload, Undo2, Redo2, FileJson, History, Save } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CommandPaletteTrigger } from './CommandPalette';
import { useState } from 'react';
import { JsonViewerModal } from './JsonViewerModal';

export function Header() {
  const { activeSave, sidebarCollapsed, addNotification, undo, redo, canUndo, canRedo, history, historyIndex } = useStore();
  const [jsonOpen, setJsonOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      <header className={`fixed top-0 right-0 h-14 glass border-b border-nms-border/60 z-30 flex items-center justify-between px-4 transition-all duration-300 ${sidebarCollapsed ? 'left-[60px]' : 'left-[220px]'}`}>
        <div className="flex items-center gap-3">
          {activeSave && (
            <div className="flex items-center gap-2.5">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide ${
                activeSave.gameMode === 'Normal' ? 'bg-nms-green/15 text-nms-green border border-nms-green/20' :
                activeSave.gameMode === 'Survival' ? 'bg-nms-orange/15 text-nms-orange border border-nms-orange/20' :
                activeSave.gameMode === 'Permadeath' ? 'bg-nms-red/15 text-nms-red border border-nms-red/20' :
                activeSave.gameMode === 'Creative' ? 'bg-nms-purple/15 text-nms-purple border border-nms-purple/20' :
                'bg-nms-accent/15 text-nms-accent border border-nms-accent/20'
              }`}>
                {activeSave.gameMode}
              </span>
              <div className="h-4 w-px bg-nms-border/40" />
              <span className="text-sm text-nms-text font-medium">{activeSave.name}</span>
              <span className="text-[10px] text-nms-text-muted px-1.5 py-0.5 rounded bg-nms-bg-elevated">Slot {activeSave.slot}</span>
            </div>
          )}
          <div className="ml-1">
            <CommandPaletteTrigger />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Undo/Redo */}
          <div className="flex items-center gap-0.5 mr-1">
            <button
              onClick={undo}
              disabled={!canUndo()}
              className={`p-1.5 rounded-md transition-colors ${canUndo() ? 'text-nms-text-muted hover:text-nms-text hover:bg-nms-hover/60' : 'text-nms-text-muted/15 cursor-not-allowed'}`}
              title="還原 (Ctrl+Z)"
            >
              <Undo2 size={14} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo()}
              className={`p-1.5 rounded-md transition-colors ${canRedo() ? 'text-nms-text-muted hover:text-nms-text hover:bg-nms-hover/60' : 'text-nms-text-muted/15 cursor-not-allowed'}`}
              title="重做 (Ctrl+Shift+Z)"
            >
              <Redo2 size={14} />
            </button>
            {history.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-1.5 rounded-md text-nms-text-muted hover:text-nms-text hover:bg-nms-hover/60 transition-colors relative"
                  title="修改歷史"
                >
                  <History size={14} />
                  <span className="absolute -top-0.5 -right-0.5 min-w-[14px] h-[14px] rounded-full bg-nms-accent text-[7px] text-white flex items-center justify-center font-bold px-0.5">
                    {history.length}
                  </span>
                </button>
                {showHistory && (
                  <div className="absolute right-0 top-full mt-1.5 w-56 bg-nms-panel border border-nms-border rounded-xl shadow-2xl overflow-hidden z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-nms-border/60 text-[10px] text-nms-text-muted font-medium tracking-wide">
                      修改歷史 ({history.length})
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {history.slice().reverse().map((entry, i) => {
                        const realIdx = history.length - 1 - i;
                        const isCurrent = realIdx === historyIndex;
                        return (
                          <div
                            key={entry.timestamp}
                            className={`px-3 py-1.5 text-[11px] flex items-center justify-between ${
                              isCurrent ? 'bg-nms-accent/8 text-nms-accent' : 'text-nms-text-dim hover:bg-nms-hover/40'
                            }`}
                          >
                            <span>{entry.label}</span>
                            <span className="text-[9px] text-nms-text-muted">
                              {new Date(entry.timestamp).toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="h-4 w-px bg-nms-border/40 mx-1" />

          <button
            onClick={() => setJsonOpen(true)}
            className="p-1.5 rounded-md text-nms-text-muted hover:text-nms-accent hover:bg-nms-hover/60 transition-colors"
            title="JSON 檢視器"
          >
            <FileJson size={15} />
          </button>
          <button
            onClick={() => addNotification('存檔備份已建立', 'success')}
            className="p-1.5 rounded-md text-nms-text-muted hover:text-nms-text hover:bg-nms-hover/60 transition-colors"
            title="備份存檔"
          >
            <Download size={15} />
          </button>
          <button
            onClick={() => addNotification('功能開發中...', 'info')}
            className="p-1.5 rounded-md text-nms-text-muted hover:text-nms-text hover:bg-nms-hover/60 transition-colors"
            title="匯入存檔"
          >
            <Upload size={15} />
          </button>
          <div className="h-4 w-px bg-nms-border/40 mx-1" />
          <button
            onClick={() => addNotification('存檔已儲存！', 'success')}
            className="ml-1 flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-nms-accent hover:bg-nms-accent/85 text-white text-[12px] font-medium transition-all duration-200 shadow-lg shadow-nms-accent/20 hover:shadow-nms-accent/30"
          >
            <Save size={13} />
            儲存修改
          </button>
        </div>
      </header>
      <JsonViewerModal open={jsonOpen} onClose={() => setJsonOpen(false)} />
    </>
  );
}
