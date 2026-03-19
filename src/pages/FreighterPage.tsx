import { Ship, Edit3, Wrench, AlertTriangle, Star } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ClassBadge } from '../components/ClassBadge';
import { InventoryGrid } from '../components/InventoryGrid';

export function FreighterPage() {
  const { activeSave, addNotification } = useStore();
  if (!activeSave) return null;
  const freighter = activeSave.playerState.freighter;

  if (!freighter) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-nms-text-muted animate-fadeIn">
        <Ship size={48} className="mb-4 opacity-30" />
        <div className="text-lg">尚無貨船資料</div>
        <div className="text-xs mt-1">No freighter data found</div>
      </div>
    );
  }

  const classColors: Record<string, string> = {
    Combat: 'text-nms-red', Support: 'text-nms-green', Mining: 'text-nms-gold',
    Trading: 'text-nms-accent2', Exploration: 'text-nms-purple', Living: 'text-nms-orange',
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-nms-text">貨船管理 <span className="text-xs text-nms-text-muted font-normal">Freighter Management</span></h2>
        <p className="text-xs text-nms-text-muted mt-1">管理貨船屬性、庫存與護衛艦艦隊</p>
      </div>

      {/* Freighter info */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-nms-accent/20 to-nms-purple/20 flex items-center justify-center">
              <Ship size={24} className="text-nms-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-nms-text">{freighter.name}</span>
                <ClassBadge itemClass={freighter.class} />
              </div>
              <div className="text-xs text-nms-text-muted">Seed: {freighter.seed} | 種族: {freighter.race}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => addNotification('一鍵升級為S級！', 'success')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-class-s/10 border border-class-s/30 text-class-s text-xs font-medium hover:bg-class-s/20 transition-colors">
              <Star size={12} /> 升級S級
            </button>
          </div>
        </div>
      </div>

      {/* Inventories */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <InventoryGrid inventory={freighter.inventory} title="一般庫存 General" />
        <InventoryGrid inventory={freighter.cargoInventory} title="貨物庫存 Cargo" />
      </div>
      <InventoryGrid inventory={freighter.techInventory} title="科技欄位 Technology" />

      {/* Frigates */}
      <div>
        <h3 className="text-base font-bold text-nms-text mb-3">護衛艦隊 <span className="text-xs text-nms-text-muted font-normal">Frigate Fleet ({freighter.frigates.length})</span></h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {freighter.frigates.map(frigate => (
            <div key={frigate.id} className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-accent/20 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${classColors[frigate.class] || 'text-nms-text'} bg-nms-bg`}>
                  {frigate.class}
                </span>
                {frigate.damage > 0 && (
                  <span className="flex items-center gap-1 text-[10px] text-nms-red">
                    <AlertTriangle size={10} /> 受損 {frigate.damage}%
                  </span>
                )}
              </div>
              <div className="text-sm font-bold text-nms-text">{frigate.name}</div>
              <div className="text-[10px] text-nms-text-muted mb-2">種族: {frigate.race} | 維修: {frigate.repairsMade}次</div>
              <div className="flex flex-wrap gap-1">
                {frigate.traits.map((trait, i) => (
                  <span key={i} className="text-[9px] px-1.5 py-0.5 rounded bg-nms-bg text-nms-text-dim border border-nms-border">
                    {trait}
                  </span>
                ))}
              </div>
              <div className="flex gap-1 mt-3">
                <button onClick={() => addNotification(`${frigate.name} 已修復`, 'success')} className="flex-1 text-[10px] py-1 rounded bg-nms-green/10 text-nms-green hover:bg-nms-green/20 transition-colors">
                  <Wrench size={10} className="inline mr-1" />修復
                </button>
                <button onClick={() => addNotification(`${frigate.name} 編輯中`, 'info')} className="flex-1 text-[10px] py-1 rounded bg-nms-accent/10 text-nms-accent hover:bg-nms-accent/20 transition-colors">
                  <Edit3 size={10} className="inline mr-1" />編輯
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
