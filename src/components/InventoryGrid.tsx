import type { Inventory } from '../types';
import { Package, Plus, Wrench } from 'lucide-react';
import { useState } from 'react';

interface InventoryGridProps {
  inventory: Inventory;
  title: string;
  compact?: boolean;
}

export function InventoryGrid({ inventory, title, compact = false }: InventoryGridProps) {
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);

  const totalSlots = inventory.maxSlots;
  const filledSlots = inventory.usedSlots;

  return (
    <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-nms-border">
        <div className="flex items-center gap-2">
          <Package size={14} className="text-nms-accent" />
          <span className="text-sm font-medium text-nms-text">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-nms-text-muted">{filledSlots}/{totalSlots}</span>
          <button className="p-1 rounded hover:bg-nms-hover text-nms-text-muted hover:text-nms-green transition-colors" title="修復全部">
            <Wrench size={12} />
          </button>
          <button className="p-1 rounded hover:bg-nms-hover text-nms-text-muted hover:text-nms-accent transition-colors" title="新增物品">
            <Plus size={12} />
          </button>
        </div>
      </div>
      <div className={`p-3 grid gap-1 ${compact ? 'grid-cols-6' : 'grid-cols-8'}`}>
        {Array.from({ length: totalSlots }, (_, i) => {
          const slot = i < inventory.slots.length ? inventory.slots[i] : null;
          const isLocked = i >= filledSlots;
          return (
            <div
              key={i}
              onMouseEnter={() => setHoveredSlot(i)}
              onMouseLeave={() => setHoveredSlot(null)}
              className={`aspect-square rounded-lg border flex items-center justify-center text-xs font-mono transition-all duration-150 relative
                ${isLocked
                  ? 'bg-nms-bg/50 border-nms-border/50 cursor-not-allowed'
                  : slot
                    ? 'bg-nms-bg border-nms-border hover:border-nms-accent/50 cursor-pointer'
                    : 'bg-nms-bg/80 border-dashed border-nms-border/60 hover:border-nms-accent/30 cursor-pointer'
                }
                ${hoveredSlot === i && !isLocked ? 'border-nms-accent/60 scale-105' : ''}
              `}
            >
              {isLocked ? (
                <span className="text-nms-text-muted/30 text-[10px]">X</span>
              ) : slot ? (
                <div className="text-center">
                  <div className="text-[10px] text-nms-accent font-semibold leading-tight truncate px-0.5">{slot.icon || '?'}</div>
                  <div className="text-[8px] text-nms-text-muted">{slot.amount}</div>
                </div>
              ) : null}
              {hoveredSlot === i && slot && !isLocked && (
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 z-30 px-2 py-1 bg-nms-panel rounded border border-nms-border shadow-lg whitespace-nowrap">
                  <div className="text-[10px] text-nms-text font-medium">{slot.itemName}</div>
                  <div className="text-[9px] text-nms-text-muted">{slot.amount}/{slot.maxAmount}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
