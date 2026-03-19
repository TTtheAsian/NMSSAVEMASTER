import { Building2, Users, Smile, TrendingUp, TrendingDown, Coins, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

export function SettlementsPage() {
  const { activeSave, updateSettlement, addNotification } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!activeSave) return null;
  const settlements = activeSave.playerState.settlements;
  const active = settlements.find(s => s.id === selectedId) ?? settlements[0];

  if (settlements.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-nms-text-muted animate-fadeIn">
        <Building2 size={48} className="mb-4 opacity-30" />
        <div className="text-lg">尚無定居點資料</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-nms-text">定居點管理 <span className="text-xs text-nms-text-muted font-normal">Settlement Management</span></h2>
        <p className="text-xs text-nms-text-muted mt-1">管理定居點人口、幸福度、生產力與特殊屬性</p>
      </div>

      {/* Settlement selection */}
      <div className="grid grid-cols-2 gap-3">
        {settlements.map(s => (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            className={`bg-nms-card border rounded-xl p-4 text-left transition-all ${active?.id === s.id ? 'border-nms-orange/50 ring-1 ring-nms-orange/20' : 'border-nms-border hover:border-nms-orange/20'}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Building2 size={16} className="text-nms-orange" />
              <span className="text-sm font-bold text-nms-text">{s.name}</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
              <div><div className="text-nms-text-muted">人口</div><div className="font-bold text-nms-text">{s.population}</div></div>
              <div><div className="text-nms-text-muted">幸福</div><div className="font-bold text-nms-green">{s.happiness}%</div></div>
              <div><div className="text-nms-text-muted">生產</div><div className="font-bold text-nms-accent">{(s.production/1000).toFixed(0)}k</div></div>
              <div><div className="text-nms-text-muted">負債</div><div className={`font-bold ${s.debt > 0 ? 'text-nms-red' : 'text-nms-green'}`}>{s.debt > 0 ? `${(s.debt/1000).toFixed(0)}k` : '0'}</div></div>
            </div>
          </button>
        ))}
      </div>

      {/* Detail */}
      {active && (
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 size={20} className="text-nms-orange" />
              <span className="text-lg font-bold text-nms-text">{active.name}</span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { updateSettlement(active.id, { happiness: 100, debt: 0, population: 200 }); addNotification('定居點已優化！', 'success'); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-nms-green/10 text-nms-green text-xs hover:bg-nms-green/20 transition-colors">
                <TrendingUp size={12} /> 一鍵優化
              </button>
              <button onClick={() => { updateSettlement(active.id, { debt: 0 }); addNotification('債務已清除！', 'success'); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-nms-gold/10 text-nms-gold text-xs hover:bg-nms-gold/20 transition-colors">
                <Coins size={12} /> 清除債務
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: '人口 Population', value: active.population, icon: <Users size={16} />, color: 'text-nms-accent', key: 'population' },
              { label: '幸福度 Happiness', value: `${active.happiness}%`, icon: <Smile size={16} />, color: 'text-nms-green', key: 'happiness' },
              { label: '生產力 Production', value: active.production.toLocaleString(), icon: <TrendingUp size={16} />, color: 'text-nms-accent2', key: 'production' },
              { label: '維護費 Upkeep', value: active.upkeep.toLocaleString(), icon: <TrendingDown size={16} />, color: 'text-nms-gold', key: 'upkeep' },
              { label: '債務 Debt', value: active.debt.toLocaleString(), icon: <Coins size={16} />, color: active.debt > 0 ? 'text-nms-red' : 'text-nms-green', key: 'debt' },
            ].map(stat => (
              <div key={stat.key} className="bg-nms-bg rounded-lg p-3 text-center">
                <div className={`${stat.color} mx-auto mb-1 w-fit`}>{stat.icon}</div>
                <div className="text-[10px] text-nms-text-muted">{stat.label}</div>
                <div className="text-lg font-bold text-nms-text">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Perks */}
          <div>
            <h4 className="text-sm font-medium text-nms-text mb-2">特殊屬性 Perks</h4>
            <div className="flex flex-wrap gap-2">
              {active.perks.map((perk, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-nms-bg border border-nms-border text-xs text-nms-text">
                  {perk}
                </span>
              ))}
              <button onClick={() => addNotification('新增屬性功能開發中...', 'info')} className="px-3 py-1.5 rounded-lg bg-nms-bg border border-dashed border-nms-border text-xs text-nms-text-muted hover:border-nms-accent/40 hover:text-nms-accent transition-colors">
                <Plus size={12} className="inline mr-1" /> 新增
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
