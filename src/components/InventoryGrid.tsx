import type { Inventory } from '../types';
import { Package, Plus, Wrench, Zap, Trash2, Copy, ArrowUpCircle, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useStore } from '../store/useStore';

interface InventoryGridProps {
  inventory: Inventory;
  title: string;
  compact?: boolean;
}

interface ContextMenuState {
  x: number;
  y: number;
  slotIndex: number;
}

export function InventoryGrid({ inventory, title, compact = false }: InventoryGridProps) {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<ContextMenuState | null>(null);
  const [selectedSlots, setSelectedSlots] = useState<Set<number>>(new Set());
  const menuRef = useRef<HTMLDivElement>(null);
  const { addNotification } = useStore();

  const totalSlots = inventory.maxSlots;
  const filledSlots = inventory.usedSlots;
  const fillPercent = totalSlots > 0 ? Math.round((filledSlots / totalSlots) * 100) : 0;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    if (contextMenu) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [contextMenu]);

  const handleContextMenu = (e: React.MouseEvent, slotIndex: number) => {
    e.preventDefault();
    if (slotIndex >= filledSlots) return;
    setContextMenu({ x: e.clientX, y: e.clientY, slotIndex });
  };

  const handleSlotClick = (i: number, e: React.MouseEvent) => {
    if (i >= filledSlots) return;
    if (e.ctrlKey || e.metaKey) {
      setSelectedSlots(prev => {
        const next = new Set(prev);
        if (next.has(i)) next.delete(i);
        else next.add(i);
        return next;
      });
    } else if (e.shiftKey && selectedSlots.size > 0) {
      const lastSelected = Math.max(...selectedSlots);
      const start = Math.min(lastSelected, i);
      const end = Math.max(lastSelected, i);
      setSelectedSlots(prev => {
        const next = new Set(prev);
        for (let j = start; j <= end; j++) if (j < filledSlots) next.add(j);
        return next;
      });
    } else {
      setSelectedSlots(new Set());
    }
  };

  const contextMenuSlot = contextMenu ? (contextMenu.slotIndex < inventory.slots.length ? inventory.slots[contextMenu.slotIndex] : null) : null;

  const menuActions = [
    { label: '補滿數量', labelEN: 'Max Stack', icon: <ArrowUpCircle size={11} />, color: 'text-nms-green', action: () => addNotification('已補滿物品數量', 'success') },
    { label: '修復物品', labelEN: 'Repair', icon: <Wrench size={11} />, color: 'text-nms-accent2', action: () => addNotification('物品已修復', 'success') },
    { label: '複製物品', labelEN: 'Duplicate', icon: <Copy size={11} />, color: 'text-nms-accent', action: () => addNotification('物品已複製', 'success') },
    { label: '移動到...', labelEN: 'Move to...', icon: <Package size={11} />, color: 'text-nms-purple', action: () => addNotification('選擇目標背包...', 'info') },
    { label: '刪除物品', labelEN: 'Delete', icon: <Trash2 size={11} />, color: 'text-nms-red', action: () => addNotification('物品已刪除', 'info') },
  ];

  return (
    <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-nms-border/60">
        <div className="flex items-center gap-2">
          <Package size={13} className="text-nms-accent" />
          <span className="text-[12px] font-medium text-nms-text">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-14 h-1.5 bg-nms-bg-elevated rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${fillPercent}%`,
                  background: fillPercent > 90 ? '#f43f5e' : fillPercent > 70 ? '#fbbf24' : '#4f8fff',
                }}
              />
            </div>
            <span className="text-[10px] text-nms-text-muted tabular-nums">{filledSlots}/{totalSlots}</span>
          </div>
          {selectedSlots.size > 0 && (
            <>
              <span className="text-[9px] text-nms-accent font-medium">{selectedSlots.size} 已選</span>
              <button onClick={() => { addNotification(`已修復 ${selectedSlots.size} 個物品`, 'success'); setSelectedSlots(new Set()); }}
                className="p-1 rounded hover:bg-nms-hover/60 text-nms-text-muted hover:text-nms-green transition-colors" title="批量修復">
                <Wrench size={11} />
              </button>
              <button onClick={() => { addNotification(`已補滿 ${selectedSlots.size} 個物品`, 'success'); setSelectedSlots(new Set()); }}
                className="p-1 rounded hover:bg-nms-hover/60 text-nms-text-muted hover:text-nms-accent2 transition-colors" title="批量補滿">
                <Zap size={11} />
              </button>
              <button onClick={() => setSelectedSlots(new Set())}
                className="p-1 rounded hover:bg-nms-hover/60 text-nms-text-muted hover:text-nms-text transition-colors" title="取消選取">
                <X size={11} />
              </button>
            </>
          )}
          <button onClick={() => addNotification('全部修復完成', 'success')} className="p-1 rounded hover:bg-nms-hover/60 text-nms-text-muted hover:text-nms-green transition-colors" title="修復全部">
            <Wrench size={11} />
          </button>
          <button className="p-1 rounded hover:bg-nms-hover/60 text-nms-text-muted hover:text-nms-accent transition-colors" title="新增物品">
            <Plus size={11} />
          </button>
        </div>
      </div>

      {/* Hints bar */}
      <div className="flex items-center gap-3 px-3.5 py-1 bg-nms-bg-elevated/30 text-[8px] text-nms-text-muted/50 border-b border-nms-border/30">
        <span>右鍵: 選單</span>
        <span>Ctrl+點擊: 多選</span>
        <span>Shift+點擊: 範圍選取</span>
      </div>

      {/* Grid */}
      <div className={`p-2.5 grid gap-1 ${compact ? 'grid-cols-6' : 'grid-cols-8'}`}>
        {Array.from({ length: totalSlots }, (_, i) => {
          const slot = i < inventory.slots.length ? inventory.slots[i] : null;
          const isLocked = i >= filledSlots;
          const isSelected = selectedSlots.has(i);
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredSlot(i)}
              onMouseLeave={() => setHoveredSlot(null)}
              onClick={(e) => handleSlotClick(i, e)}
              onContextMenu={(e) => handleContextMenu(e, i)}
              className={`aspect-square rounded-lg border flex items-center justify-center text-xs font-mono transition-all duration-150 relative select-none
                ${isLocked
                  ? 'bg-nms-bg/30 border-nms-border/30 cursor-not-allowed'
                  : slot
                    ? 'bg-nms-bg-elevated/60 border-nms-border/60 hover:border-nms-accent/40 cursor-pointer'
                    : 'bg-nms-bg/40 border-dashed border-nms-border/30 hover:border-nms-accent/20 cursor-pointer'
                }
                ${isSelected ? 'ring-1 ring-nms-accent border-nms-accent/50 bg-nms-accent/8' : ''}
                ${hoveredSlot === i && !isLocked && !isSelected ? 'border-nms-accent/50 scale-105' : ''}
              `}
            >
              {isLocked ? (
                <span className="text-nms-text-muted/20 text-[9px]">🔒</span>
              ) : slot ? (
                <div className="text-center">
                  <div className="text-[9px] text-nms-accent font-semibold leading-tight truncate px-0.5">{slot.icon || '?'}</div>
                  <div className="text-[7px] text-nms-text-muted/70">{slot.amount}</div>
                  {slot.damageFactor > 0 && <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-nms-red" title="已損壞" />}
                </div>
              ) : (
                <Plus size={7} className="text-nms-border opacity-0 group-hover:opacity-50" />
              )}
              {/* Tooltip */}
              {hoveredSlot === i && slot && !isLocked && !contextMenu && (
                <div className="absolute bottom-full mb-1.5 left-1/2 -translate-x-1/2 z-30 px-2.5 py-1.5 glass rounded-lg border border-nms-border shadow-xl whitespace-nowrap pointer-events-none">
                  <div className="text-[10px] text-nms-text font-medium">{slot.itemName}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[8px] text-nms-text-muted">{slot.amount}/{slot.maxAmount}</span>
                    {slot.damageFactor > 0 && <span className="text-[8px] text-nms-red">損壞 {(slot.damageFactor * 100).toFixed(0)}%</span>}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Context menu */}
      {contextMenu && (
        <div
          ref={menuRef}
          className="fixed z-[90] glass border border-nms-border rounded-xl shadow-2xl py-1 min-w-40 animate-fadeIn"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          {contextMenuSlot && (
            <div className="px-3 py-1.5 border-b border-nms-border/60">
              <div className="text-[11px] font-medium text-nms-text">{contextMenuSlot.itemName}</div>
              <div className="text-[9px] text-nms-text-muted">{contextMenuSlot.amount}/{contextMenuSlot.maxAmount}</div>
            </div>
          )}
          {menuActions.map(action => (
            <button
              key={action.label}
              onClick={() => { action.action(); setContextMenu(null); }}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-left text-[11px] text-nms-text-dim hover:bg-nms-hover/60 transition-colors"
            >
              <span className={action.color}>{action.icon}</span>
              <span>{action.label}</span>
              <span className="text-[8px] text-nms-text-muted/50 ml-auto">{action.labelEN}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
