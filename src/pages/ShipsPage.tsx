import { Plus, Trash2, Star, Edit3, Copy, Download, Upload } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ClassBadge } from '../components/ClassBadge';
import { InventoryGrid } from '../components/InventoryGrid';
import { EditableValue } from '../components/EditableValue';
import { SeedEditor } from '../components/SeedEditor';
import { ConfirmModal } from '../components/ConfirmModal';
import { useState } from 'react';
import type { ItemClass, Ship } from '../types';

const SHIP_TYPES = ['Fighter', 'Hauler', 'Shuttle', 'Explorer', 'Exotic', 'Living', 'Solar', 'Sentinel', 'Interceptor'] as const;

const typeIcons: Record<string, string> = {
  Fighter: '⚔️', Hauler: '📦', Shuttle: '🚀', Explorer: '🔭',
  Exotic: '💎', Living: '🧬', Solar: '☀️', Sentinel: '🤖', Interceptor: '⚡',
};

export function ShipsPage() {
  const { activeSave, updateShip, deleteShip, addNotification } = useStore();
  const [selectedShip, setSelectedShip] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!activeSave) return null;
  const ships = activeSave.playerState.ships;
  const active = ships.find(s => s.id === selectedShip) ?? ships.find(s => s.isPrimary) ?? ships[0];

  const handleClassChange = (shipId: string, newClass: ItemClass) => {
    updateShip(shipId, { class: newClass });
    addNotification(`飛船等級已更新為 ${newClass} 級`, 'success');
  };

  const handleDelete = () => {
    if (active) {
      deleteShip(active.id);
      setSelectedShip(null);
      setConfirmDelete(false);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">飛船艦隊管理 <span className="text-xs text-nms-text-muted font-normal">Ship Fleet Management</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理所有飛船，編輯屬性、背包與種子碼 | <span className="text-nms-accent">Alt+S</span> 快速切換</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => addNotification('匯入飛船功能開發中...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-card border border-nms-border text-nms-text-dim text-xs hover:bg-nms-hover transition-colors">
            <Upload size={12} /> 匯入飛船
          </button>
          <button onClick={() => addNotification('新增飛船功能開發中...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-accent/10 border border-nms-accent/30 text-nms-accent text-xs font-medium hover:bg-nms-accent/20 transition-colors">
            <Plus size={12} /> 新增飛船
          </button>
        </div>
      </div>

      {/* Ship list */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {ships.map(ship => (
          <button
            key={ship.id}
            onClick={() => setSelectedShip(ship.id)}
            className={`bg-nms-card border rounded-xl p-3 text-left transition-all duration-200 ${
              active?.id === ship.id ? 'border-nms-accent/50 ring-1 ring-nms-accent/20' : 'border-nms-border hover:border-nms-accent/20'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">{typeIcons[ship.type] || '🚀'}</span>
              <ClassBadge itemClass={ship.class} size="sm" />
            </div>
            <div className="text-sm font-bold text-nms-text truncate">{ship.name}</div>
            <div className="text-[10px] text-nms-text-muted">{ship.type}</div>
            {ship.isPrimary && <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-nms-accent/15 text-nms-accent">主力</span>}
          </button>
        ))}
      </div>

      {/* Selected ship detail */}
      {active && (
        <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
          {/* Ship header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-nms-border">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeIcons[active.type]}</span>
              <div>
                {editingField === 'name' ? (
                  <input
                    defaultValue={active.name}
                    autoFocus
                    onBlur={(e) => { updateShip(active.id, { name: e.target.value }); setEditingField(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); if (e.key === 'Escape') setEditingField(null); }}
                    className="bg-nms-bg border border-nms-accent rounded px-2 py-0.5 text-sm font-bold text-nms-text outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-nms-text">{active.name}</span>
                    <button onClick={() => setEditingField('name')} className="text-nms-text-muted hover:text-nms-accent transition-colors">
                      <Edit3 size={12} />
                    </button>
                  </div>
                )}
                <SeedEditor seed={active.seed} onSeedChange={(seed) => updateShip(active.id, { seed })} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {(['S', 'A', 'B', 'C'] as ItemClass[]).map(c => (
                  <button
                    key={c}
                    onClick={() => handleClassChange(active.id, c)}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                      active.class === c
                        ? c === 'S' ? 'bg-class-s/20 text-class-s border-class-s/40' :
                          c === 'A' ? 'bg-class-a/20 text-class-a border-class-a/40' :
                          c === 'B' ? 'bg-class-b/20 text-class-b border-class-b/40' :
                          'bg-class-c/20 text-class-c border-class-c/40'
                        : 'bg-nms-bg text-nms-text-muted border-nms-border hover:border-nms-text-muted/50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="h-6 w-px bg-nms-border" />
              <button onClick={() => addNotification('飛船已匯出', 'success')} className="p-1.5 rounded-lg text-nms-text-muted hover:text-nms-green hover:bg-nms-hover transition-colors" title="匯出">
                <Download size={14} />
              </button>
              <button onClick={() => addNotification('飛船已複製', 'success')} className="p-1.5 rounded-lg text-nms-text-muted hover:text-nms-accent hover:bg-nms-hover transition-colors" title="複製">
                <Copy size={14} />
              </button>
              <button onClick={() => setConfirmDelete(true)} className="p-1.5 rounded-lg text-nms-text-muted hover:text-nms-red hover:bg-nms-hover transition-colors" title="刪除">
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Editable Stats */}
          <div className="px-4 py-3 grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-nms-bg rounded-lg p-3">
              <EditableValue value={active.health} max={9999} label="血量 HP" color="text-nms-red" showBar onChange={(v) => updateShip(active.id, { health: v })} />
            </div>
            <div className="bg-nms-bg rounded-lg p-3">
              <EditableValue value={active.shield} max={9999} label="護盾 Shield" color="text-nms-accent" showBar onChange={(v) => updateShip(active.id, { shield: v })} />
            </div>
            <div className="bg-nms-bg rounded-lg p-3">
              <EditableValue value={active.damage} max={9999} label="攻擊 Damage" color="text-nms-gold" showBar onChange={(v) => updateShip(active.id, { damage: v })} />
            </div>
            <div className="bg-nms-bg rounded-lg p-3">
              <div className="text-[10px] text-nms-text-muted mb-0.5">類型 Type</div>
              <select
                value={active.type}
                onChange={(e) => updateShip(active.id, { type: e.target.value as Ship['type'] })}
                className="w-full bg-transparent border-none text-nms-text text-sm font-bold outline-none cursor-pointer"
              >
                {SHIP_TYPES.map(t => <option key={t} value={t}>{typeIcons[t]} {t}</option>)}
              </select>
            </div>
            <div className="bg-nms-bg rounded-lg p-3 flex flex-col justify-center">
              <button
                onClick={() => {
                  updateShip(active.id, { class: 'S', health: 9999, shield: 9999, damage: 9999 });
                  addNotification(`${active.name} 已全屬性最大化！`, 'success');
                }}
                className="w-full py-1.5 rounded-lg bg-gradient-to-r from-class-s/20 to-nms-gold/10 border border-class-s/30 text-class-s text-xs font-bold hover:from-class-s/30 hover:to-nms-gold/20 transition-all"
              >
                <Star size={12} className="inline mr-1" />一鍵 MAX
              </button>
            </div>
          </div>

          {/* Inventories */}
          <div className="px-4 pb-4 grid grid-cols-1 xl:grid-cols-2 gap-4">
            <InventoryGrid inventory={active.inventory} title="一般背包 General" />
            <InventoryGrid inventory={active.cargoInventory} title="貨物背包 Cargo" />
            <InventoryGrid inventory={active.techInventory} title="科技欄位 Technology" compact />
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      <ConfirmModal
        open={confirmDelete}
        title="確認刪除飛船"
        message={`確定要刪除「${active?.name}」嗎？此操作無法復原。`}
        confirmLabel="刪除"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(false)}
      />
    </div>
  );
}
