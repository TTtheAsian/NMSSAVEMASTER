import { Save, Clock, Play, Download, Trash2, Copy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { SaveFileUploader } from '../components/SaveFileUploader';
import { ConfirmModal } from '../components/ConfirmModal';
import { useState } from 'react';

export function SavesPage() {
  const { saveFiles, activeSave, setActiveSave, addNotification } = useStore();
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-nms-text">存檔管理 <span className="text-xs text-nms-text-muted font-normal">Save Management</span></h2>
        <p className="text-xs text-nms-text-muted mt-1">匯入真實存檔或管理模擬資料</p>
      </div>

      {/* Real file uploader */}
      <SaveFileUploader />

      {/* Save list */}
      <div>
        <h3 className="text-sm font-bold text-nms-text mb-2">已載入存檔 <span className="text-xs text-nms-text-muted font-normal">Loaded Saves</span></h3>
        <div className="grid gap-3">
          {saveFiles.map((save) => {
            const isActive = activeSave?.id === save.id;
            return (
              <div
                key={save.id}
                className={`bg-nms-card border rounded-xl p-4 transition-all duration-200 ${isActive ? 'border-nms-accent/50 ring-1 ring-nms-accent/20' : 'border-nms-border hover:border-nms-accent/20'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isActive ? 'bg-nms-accent/20' : 'bg-nms-bg'}`}>
                      <Save size={20} className={isActive ? 'text-nms-accent' : 'text-nms-text-muted'} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-nms-text">{save.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          save.gameMode === 'Normal' ? 'bg-nms-green/20 text-nms-green' :
                          save.gameMode === 'Survival' ? 'bg-nms-orange/20 text-nms-orange' :
                          save.gameMode === 'Permadeath' ? 'bg-nms-red/20 text-nms-red' :
                          save.gameMode === 'Creative' ? 'bg-nms-purple/20 text-nms-purple' :
                          'bg-nms-accent/20 text-nms-accent'
                        }`}>{save.gameMode}</span>
                        {isActive && <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-nms-accent/20 text-nms-accent">使用中</span>}
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-xs text-nms-text-muted">
                        <span>Slot {save.slot}</span>
                        <span className="flex items-center gap-1"><Clock size={10} /> {save.playTime.toFixed(1)}h</span>
                        <span>最後修改: {save.lastModified}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!isActive && (
                      <button
                        onClick={() => { setActiveSave(save); addNotification(`已載入: ${save.name}`, 'success'); }}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-nms-accent/10 text-nms-accent text-xs font-medium hover:bg-nms-accent/20 transition-colors"
                      >
                        <Play size={12} /> 載入
                      </button>
                    )}
                    <button onClick={() => addNotification(`已備份: ${save.name}`, 'success')} className="p-2 rounded-lg text-nms-text-muted hover:text-nms-green hover:bg-nms-hover transition-colors" title="備份">
                      <Download size={14} />
                    </button>
                    <button onClick={() => addNotification(`已複製: ${save.name}`, 'success')} className="p-2 rounded-lg text-nms-text-muted hover:text-nms-accent hover:bg-nms-hover transition-colors" title="複製">
                      <Copy size={14} />
                    </button>
                    <button onClick={() => setDeleteTarget(save.id)} className="p-2 rounded-lg text-nms-text-muted hover:text-nms-red hover:bg-nms-hover transition-colors" title="刪除">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ConfirmModal
        open={!!deleteTarget}
        title="確認刪除存檔"
        message="確定要刪除此存檔嗎？此操作無法復原。建議先備份。"
        confirmLabel="刪除"
        variant="danger"
        onConfirm={() => { addNotification('存檔已刪除', 'info'); setDeleteTarget(null); }}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
