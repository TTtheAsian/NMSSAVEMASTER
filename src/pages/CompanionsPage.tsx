import { Heart, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useState } from 'react';

const biomeIcons: Record<string, string> = {
  Lush: '🌿', Scorched: '🔥', Frozen: '❄️', Radioactive: '☢️', Toxic: '☠️', Exotic: '✨',
};

export function CompanionsPage() {
  const { activeSave, updateCompanion, addNotification } = useStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (!activeSave) return null;
  const companions = activeSave.playerState.companions;
  const active = companions.find(c => c.id === selectedId) ?? companions[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">同伴寵物管理 <span className="text-xs text-nms-text-muted font-normal">Companion Management</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理同伴、編輯信任度與特性</p>
        </div>
        <button onClick={() => addNotification('新增同伴功能開發中...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-gold/10 border border-nms-gold/30 text-nms-gold text-xs font-medium hover:bg-nms-gold/20 transition-colors">
          <Plus size={12} /> 新增同伴
        </button>
      </div>

      {/* Companion cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {companions.map(comp => (
          <button
            key={comp.id}
            onClick={() => setSelectedId(comp.id)}
            className={`bg-nms-card border rounded-xl p-4 text-left transition-all ${active?.id === comp.id ? 'border-nms-gold/50 ring-1 ring-nms-gold/20' : 'border-nms-border hover:border-nms-gold/20'}`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{biomeIcons[comp.biome] || '🐾'}</span>
              {comp.isPredator && <span className="text-[9px] px-1.5 py-0.5 rounded bg-nms-red/15 text-nms-red">掠食者</span>}
            </div>
            <div className="text-sm font-bold text-nms-text">{comp.name}</div>
            <div className="text-[10px] text-nms-text-muted">{comp.species} | {comp.creatureType} | {comp.biome}</div>
            <div className="mt-2 flex items-center gap-2">
              <Heart size={12} className="text-nms-red" />
              <div className="flex-1 h-1.5 bg-nms-bg rounded-full overflow-hidden">
                <div className="h-full bg-nms-red rounded-full transition-all" style={{ width: `${comp.trust}%` }} />
              </div>
              <span className="text-[10px] text-nms-text-muted">{comp.trust.toFixed(1)}%</span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail */}
      {active && (
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{biomeIcons[active.biome] || '🐾'}</span>
              <div>
                <div className="text-lg font-bold text-nms-text">{active.name}</div>
                <div className="text-xs text-nms-text-muted">{active.species} | {active.creatureType} | 生態: {active.biome}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { updateCompanion(active.id, { trust: 100 }); addNotification('信任度已最大化！', 'success'); }}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-nms-red/10 text-nms-red text-xs hover:bg-nms-red/20 transition-colors">
                <Heart size={12} /> 滿信任
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-nms-bg rounded-lg p-3">
              <div className="text-[10px] text-nms-text-muted mb-1">信任度 Trust</div>
              <input
                type="range" min="0" max="100" step="0.1"
                value={active.trust}
                onChange={(e) => updateCompanion(active.id, { trust: parseFloat(e.target.value) })}
                className="w-full h-1.5 bg-nms-border rounded-full appearance-none cursor-pointer accent-nms-red"
              />
              <div className="text-xs font-bold text-nms-text text-right">{active.trust.toFixed(1)}%</div>
            </div>
            {active.traits.map((trait, i) => (
              <div key={i} className="bg-nms-bg rounded-lg p-3">
                <div className="text-[10px] text-nms-text-muted mb-1">特性 {i + 1}</div>
                <div className="text-lg font-bold text-nms-text">{trait}</div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <span className={`px-2 py-1 rounded border ${active.isPredator ? 'border-nms-red/30 bg-nms-red/10 text-nms-red' : 'border-nms-green/30 bg-nms-green/10 text-nms-green'}`}>
              {active.isPredator ? '掠食者' : '友善'}
            </span>
            <span className={`px-2 py-1 rounded border ${active.hasFur ? 'border-nms-gold/30 bg-nms-gold/10 text-nms-gold' : 'border-nms-border bg-nms-bg text-nms-text-muted'}`}>
              {active.hasFur ? '有毛皮' : '無毛皮'}
            </span>
            <span className="px-2 py-1 rounded border border-nms-border bg-nms-bg text-nms-text-muted">
              心情: {active.moods.join(' / ')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
