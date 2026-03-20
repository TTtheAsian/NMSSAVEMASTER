import { Bell, Download, Upload, Undo2, Redo2, FileJson, History } from 'lucide-react';
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
      <header className={`fixed top-0 right-0 h-14 bg-nms-panel/80 backdrop-blur-md border-b border-nms-border z-30 flex items-center justify-between px-4 transition-all duration-300 ${sidebarCollapsed ? 'left-16' : 'left-56'}`}>
        <div className="flex items-center gap-3">
          {activeSave && (
            <div className="flex items-center gap-2">
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                activeSave.gameMode === 'Normal' ? 'bg-nms-green/20 text-nms-green' :
                activeSave.gameMode === 'Survival' ? 'bg-nms-orange/20 text-nms-orange' :
                activeSave.gameMode === 'Permadeath' ? 'bg-nms-red/20 text-nms-red' :
                activeSave.gameMode === 'Creative' ? 'bg-nms-purple/20 text-nms-purple' :
                'bg-nms-accent/20 text-nms-accent'
              }`}>
                {activeSave.gameMode}
              </span>
              <span className="text-sm text-nms-text font-medium">{activeSave.name}</span>
              <span className="text-xs text-nms-text-muted">Slot {activeSave.slot}</span>
            </div>
          )}
          <div className="ml-2">
            <CommandPaletteTrigger />
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Undo/Redo */}
          <div className="flex items-center gap-0.5 mr-1">
            <button
              onClick={undo}
              disabled={!canUndo()}
              className={`p-2 rounded-lg transition-colors ${canUndo() ? 'text-nms-text-muted hover:text-nms-text hover:bg-nms-hover' : 'text-nms-text-muted/20 cursor-not-allowed'}`}
              title="還原 (Ctrl+Z)"
            >
              <Undo2 size={15} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo()}
              className={`p-2 rounded-lg transition-colors ${canRedo() ? 'text-nms-text-muted hover:text-nms-text hover:bg-nms-hover' : 'text-nms-text-muted/20 cursor-not-allowed'}`}
              title="重做 (Ctrl+Shift+Z)"
            >
              <Redo2 size={15} />
            </button>
            {history.length > 0 && (
              <div className="relative">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="p-2 rounded-lg text-nms-text-muted hover:text-nms-text hover:bg-nms-hover transition-colors relative"
                  title="修改歷史"
                >
                  <History size={15} />
                  <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-nms-accent text-[8px] text-white flex items-center justify-center font-bold">
                    {history.length}
                  </span>
                </button>
                {showHistory && (
                  <div className="absolute right-0 top-full mt-1 w-60 bg-nms-panel border border-nms-border rounded-xl shadow-xl overflow-hidden z-50 animate-fadeIn">
                    <div className="px-3 py-2 border-b border-nms-border text-[10px] text-nms-text-muted font-medium">
                      修改歷史 ({history.length} 筆)
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {history.slice().reverse().map((entry, i) => {
                        const realIdx = history.length - 1 - i;
                        const isCurrent = realIdx === historyIndex;
                        return (
                          <div
                            key={entry.timestamp}
                            className={`px-3 py-1.5 text-xs flex items-center justify-between ${
                              isCurrent ? 'bg-nms-accent/10 text-nms-accent' : 'text-nms-text-dim hover:bg-nms-hover'
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

          <div className="h-5 w-px bg-nms-border mx-1" />

          <button
            onClick={() => setJsonOpen(true)}
            className="p-2 rounded-lg text-nms-text-muted hover:text-nms-accent hover:bg-nms-hover transition-colors"
            title="JSON 檢視器"
          >
            <FileJson size={16} />
          </button>
          <button
            onClick={() => addNotification('存檔備份已建立', 'success')}
            className="p-2 rounded-lg text-nms-text-muted hover:text-nms-text hover:bg-nms-hover transition-colors"
            title="備份存檔"
          >
            <Download size={16} />
          </button>
          <button
            onClick={() => addNotification('功能開發中...', 'info')}
            className="p-2 rounded-lg text-nms-text-muted hover:text-nms-text hover:bg-nms-hover transition-colors"
            title="匯入存檔"
          >
            <Upload size={16} />
          </button>
          <button className="p-2 rounded-lg text-nms-text-muted hover:text-nms-text hover:bg-nms-hover transition-colors relative" title="通知">
            <Bell size={16} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-nms-accent" />
          </button>
          <button
            onClick={() => addNotification('存檔已儲存！', 'success')}
            className="ml-2 px-4 py-1.5 rounded-lg bg-nms-accent hover:bg-nms-accent/80 text-white text-sm font-medium transition-colors pulse-glow"
          >
            儲存修改
          </button>
        </div>
      </header>
      <JsonViewerModal open={jsonOpen} onClose={() => setJsonOpen(false)} />
    </>
  );
}
