import { UserCheck, Star, Plus, Edit3 } from 'lucide-react';
import { useStore } from '../store/useStore';

const raceIcons: Record<string, string> = {
  Korvax: '🤖', 'Vy\'keen': '⚔️', Gek: '🐸', Traveller: '👤',
};

export function SquadronPage() {
  const { activeSave, addNotification } = useStore();
  if (!activeSave) return null;
  const squadron = activeSave.playerState.squadron;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-nms-text">中隊管理 <span className="text-xs text-nms-text-muted font-normal">Squadron Management</span></h2>
        <p className="text-xs text-nms-text-muted mt-1">管理4位僚機飛行員</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {squadron.map((pilot, i) => (
          <div key={pilot.id} className={`bg-nms-card border rounded-xl p-4 transition-all ${pilot.name ? 'border-nms-border hover:border-indigo-400/30' : 'border-dashed border-nms-border/50'}`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-nms-text-muted">Slot {i + 1}</span>
              {pilot.name && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: pilot.rank }, (_, j) => (
                    <Star key={j} size={10} className="text-nms-gold fill-nms-gold" />
                  ))}
                </div>
              )}
            </div>

            {pilot.name ? (
              <>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{raceIcons[pilot.race] || '👤'}</span>
                  <div>
                    <div className="text-sm font-bold text-nms-text">{pilot.name}</div>
                    <div className="text-[10px] text-nms-text-muted">{pilot.race} | {pilot.shipType}</div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => addNotification(`正在編輯 ${pilot.name}`, 'info')} className="flex-1 text-[10px] py-1.5 rounded-lg bg-nms-accent/10 text-nms-accent hover:bg-nms-accent/20 transition-colors text-center">
                    <Edit3 size={10} className="inline mr-1" /> 編輯
                  </button>
                  <button onClick={() => addNotification(`${pilot.name} 已升級`, 'success')} className="flex-1 text-[10px] py-1.5 rounded-lg bg-nms-gold/10 text-nms-gold hover:bg-nms-gold/20 transition-colors text-center">
                    <Star size={10} className="inline mr-1" /> 升級
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center py-4">
                <UserCheck size={24} className="text-nms-text-muted/30 mb-2" />
                <span className="text-xs text-nms-text-muted">空位</span>
                <button onClick={() => addNotification('招募功能開發中...', 'info')} className="mt-2 flex items-center gap-1 px-3 py-1 rounded-lg bg-nms-accent/10 text-nms-accent text-[10px] hover:bg-nms-accent/20 transition-colors">
                  <Plus size={10} /> 招募
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
