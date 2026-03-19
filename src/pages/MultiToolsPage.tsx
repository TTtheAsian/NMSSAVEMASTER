import { Plus, Edit3, Download, Copy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ClassBadge } from '../components/ClassBadge';
import { InventoryGrid } from '../components/InventoryGrid';
import { useState } from 'react';
import type { ItemClass, MultiTool } from '../types';

const MT_TYPES = ['Rifle', 'Pistol', 'Experimental', 'Alien', 'Royal', 'Staff'] as const;
const typeIcons: Record<string, string> = {
  Rifle: '🔫', Pistol: '🔫', Experimental: '🔬', Alien: '👾', Royal: '👑', Staff: '🪄',
};

export function MultiToolsPage() {
  const { activeSave, updateMultiTool, addNotification } = useStore();
  const [selectedMT, setSelectedMT] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);

  if (!activeSave) return null;
  const mts = activeSave.playerState.multiTools;
  const active = mts.find(m => m.id === selectedMT) ?? mts.find(m => m.isPrimary) ?? mts[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">多功能工具管理 <span className="text-xs text-nms-text-muted font-normal">Multi-Tool Management</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理所有多功能工具，編輯等級、種子碼與模組</p>
        </div>
        <button onClick={() => addNotification('新增工具功能開發中...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-purple/10 border border-nms-purple/30 text-nms-purple text-xs font-medium hover:bg-nms-purple/20 transition-colors">
          <Plus size={12} /> 新增工具
        </button>
      </div>

      {/* MT list */}
      <div className="grid grid-cols-3 gap-3">
        {mts.map(mt => (
          <button
            key={mt.id}
            onClick={() => setSelectedMT(mt.id)}
            className={`bg-nms-card border rounded-xl p-4 text-left transition-all ${active?.id === mt.id ? 'border-nms-purple/50 ring-1 ring-nms-purple/20' : 'border-nms-border hover:border-nms-purple/20'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl">{typeIcons[mt.type]}</span>
              <ClassBadge itemClass={mt.class} />
            </div>
            <div className="text-sm font-bold text-nms-text">{mt.name}</div>
            <div className="text-[10px] text-nms-text-muted">{mt.type} | {mt.inventory.usedSlots}/{mt.inventory.maxSlots} slots</div>
            {mt.isPrimary && <span className="inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded bg-nms-purple/15 text-nms-purple">主力</span>}
          </button>
        ))}
      </div>

      {/* Detail */}
      {active && (
        <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-nms-border">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{typeIcons[active.type]}</span>
              <div>
                {editingField === 'name' ? (
                  <input
                    defaultValue={active.name}
                    autoFocus
                    onBlur={(e) => { updateMultiTool(active.id, { name: e.target.value }); setEditingField(null); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                    className="bg-nms-bg border border-nms-purple rounded px-2 py-0.5 text-sm font-bold text-nms-text outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-nms-text">{active.name}</span>
                    <button onClick={() => setEditingField('name')} className="text-nms-text-muted hover:text-nms-purple"><Edit3 size={12} /></button>
                  </div>
                )}
                <div className="text-[10px] text-nms-text-muted">Seed: {active.seed}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={active.type}
                onChange={(e) => updateMultiTool(active.id, { type: e.target.value as MultiTool['type'] })}
                className="bg-nms-bg border border-nms-border rounded-lg px-2 py-1 text-xs text-nms-text outline-none"
              >
                {MT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <div className="flex gap-1">
                {(['S', 'A', 'B', 'C'] as ItemClass[]).map(c => (
                  <button
                    key={c}
                    onClick={() => { updateMultiTool(active.id, { class: c }); addNotification(`工具等級已更新為 ${c}`, 'success'); }}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border transition-all ${
                      active.class === c
                        ? c === 'S' ? 'bg-class-s/20 text-class-s border-class-s/40' :
                          c === 'A' ? 'bg-class-a/20 text-class-a border-class-a/40' :
                          c === 'B' ? 'bg-class-b/20 text-class-b border-class-b/40' :
                          'bg-class-c/20 text-class-c border-class-c/40'
                        : 'bg-nms-bg text-nms-text-muted border-nms-border hover:border-nms-text-muted/50'
                    }`}
                  >{c}</button>
                ))}
              </div>
              <div className="h-6 w-px bg-nms-border" />
              <button onClick={() => addNotification('已匯出', 'success')} className="p-1.5 rounded-lg text-nms-text-muted hover:text-nms-green hover:bg-nms-hover"><Download size={14} /></button>
              <button onClick={() => addNotification('已複製', 'success')} className="p-1.5 rounded-lg text-nms-text-muted hover:text-nms-accent hover:bg-nms-hover"><Copy size={14} /></button>
            </div>
          </div>
          <div className="p-4">
            <InventoryGrid inventory={active.inventory} title="工具模組 Modules" compact />
          </div>
        </div>
      )}
    </div>
  );
}
