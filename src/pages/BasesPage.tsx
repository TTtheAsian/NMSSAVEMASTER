import { Home, MapPin, Download, Upload, Trash2, Copy, Clock, Box } from 'lucide-react';
import { useStore } from '../store/useStore';

export function BasesPage() {
  const { activeSave, addNotification } = useStore();
  if (!activeSave) return null;
  const bases = activeSave.playerState.bases;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">基地管理 <span className="text-xs text-nms-text-muted font-normal">Base Management</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理所有基地，支援備份與匯入匯出</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => addNotification('匯入基地功能開發中...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-card border border-nms-border text-nms-text-dim text-xs hover:bg-nms-hover transition-colors">
            <Upload size={12} /> 匯入基地
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bases.map(base => (
          <div key={base.id} className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-accent2/30 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-nms-accent2/15 flex items-center justify-center">
                  <Home size={20} className="text-nms-accent2" />
                </div>
                <div>
                  <div className="text-sm font-bold text-nms-text">{base.name}</div>
                  <div className="flex items-center gap-1 text-[10px] text-nms-text-muted">
                    <MapPin size={9} /> {base.galaxy} / {base.system} / {base.planet}
                  </div>
                </div>
              </div>
              <div className="flex gap-1">
                <button onClick={() => addNotification(`已備份: ${base.name}`, 'success')} className="p-1.5 rounded text-nms-text-muted hover:text-nms-green hover:bg-nms-hover transition-colors"><Download size={12} /></button>
                <button onClick={() => addNotification(`已複製: ${base.name}`, 'success')} className="p-1.5 rounded text-nms-text-muted hover:text-nms-accent hover:bg-nms-hover transition-colors"><Copy size={12} /></button>
                <button onClick={() => addNotification('刪除需二次確認', 'error')} className="p-1.5 rounded text-nms-text-muted hover:text-nms-red hover:bg-nms-hover transition-colors"><Trash2 size={12} /></button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-nms-bg rounded-lg p-2">
                <Box size={12} className="text-nms-accent2 mx-auto mb-0.5" />
                <div className="text-[10px] text-nms-text-muted">建築物件</div>
                <div className="text-sm font-bold text-nms-text">{base.objectCount}</div>
              </div>
              <div className="bg-nms-bg rounded-lg p-2">
                <Clock size={12} className="text-nms-text-muted mx-auto mb-0.5" />
                <div className="text-[10px] text-nms-text-muted">最後修改</div>
                <div className="text-[10px] font-medium text-nms-text mt-0.5">{base.timestamp}</div>
              </div>
              <div className="bg-nms-bg rounded-lg p-2">
                <MapPin size={12} className="text-nms-green mx-auto mb-0.5" />
                <div className="text-[10px] text-nms-text-muted">擁有者</div>
                <div className="text-xs font-medium text-nms-text">{base.owner}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
