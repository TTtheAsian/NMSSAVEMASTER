import { Wrench, Zap, ArrowUpCircle, Search, Plus, Coins, Atom, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { InventoryGrid } from '../components/InventoryGrid';
import { ClassBadge } from '../components/ClassBadge';
import { useState } from 'react';
import { SUBSTANCES, PRODUCTS, searchItems } from '../data/items';

export function InventoryPage() {
  const { activeSave, addNotification, repairAll, refillAll, unlockAllSlots, updatePlayerState } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddItem, setShowAddItem] = useState(false);
  const [editingCurrency, setEditingCurrency] = useState<string | null>(null);

  if (!activeSave) return null;
  const ps = activeSave.playerState;

  const searchResults = searchQuery ? searchItems(searchQuery) : [];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">物品與背包管理 <span className="text-xs text-nms-text-muted font-normal">Inventory Management</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理太空衣背包、貨幣、物品添加</p>
        </div>
        <div className="flex gap-2">
          <button onClick={repairAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-green/10 border border-nms-green/30 text-nms-green text-xs font-medium hover:bg-nms-green/20 transition-colors">
            <Wrench size={12} /> 修復全部
          </button>
          <button onClick={refillAll} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-accent2/10 border border-nms-accent2/30 text-nms-accent2 text-xs font-medium hover:bg-nms-accent2/20 transition-colors">
            <Zap size={12} /> 補滿全部
          </button>
          <button onClick={unlockAllSlots} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-accent/10 border border-nms-accent/30 text-nms-accent text-xs font-medium hover:bg-nms-accent/20 transition-colors">
            <ArrowUpCircle size={12} /> 解鎖全部
          </button>
        </div>
      </div>

      {/* Currency editing */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { key: 'units', label: '星幣 Units', value: ps.units, max: 2147483647, icon: <Coins size={18} />, color: 'text-nms-gold', bgColor: 'border-nms-gold/30' },
          { key: 'nanites', label: '奈米星團 Nanites', value: ps.nanites, max: 999999, icon: <Atom size={18} />, color: 'text-nms-accent2', bgColor: 'border-nms-accent2/30' },
          { key: 'quicksilver', label: '水銀 Quicksilver', value: ps.quicksilver, max: 99999, icon: <Sparkles size={18} />, color: 'text-nms-purple', bgColor: 'border-nms-purple/30' },
        ].map(curr => (
          <div key={curr.key} className={`bg-nms-card border ${editingCurrency === curr.key ? curr.bgColor : 'border-nms-border'} rounded-xl p-4`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={curr.color}>{curr.icon}</span>
                <span className="text-xs text-nms-text-muted">{curr.label}</span>
              </div>
              <button
                onClick={() => {
                  updatePlayerState({ [curr.key]: curr.max } as any);
                  addNotification(`${curr.label} 已最大化！`, 'success');
                }}
                className="text-[10px] px-2 py-0.5 rounded bg-nms-bg text-nms-text-muted hover:text-nms-text transition-colors"
              >
                MAX
              </button>
            </div>
            {editingCurrency === curr.key ? (
              <input
                type="number"
                defaultValue={curr.value}
                max={curr.max}
                onBlur={(e) => {
                  const val = Math.min(Number(e.target.value), curr.max);
                  updatePlayerState({ [curr.key]: val } as any);
                  setEditingCurrency(null);
                }}
                onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                autoFocus
                className="w-full bg-nms-bg border border-nms-border rounded-lg px-3 py-1.5 text-lg font-bold text-nms-text outline-none focus:border-nms-accent"
              />
            ) : (
              <div
                onClick={() => setEditingCurrency(curr.key)}
                className="text-xl font-bold text-nms-text cursor-pointer hover:text-nms-accent transition-colors"
              >
                {curr.value.toLocaleString()}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Exosuit info */}
      <div className="flex items-center gap-3 bg-nms-card border border-nms-border rounded-xl p-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-nms-text-dim">太空衣等級:</span>
          <ClassBadge itemClass={ps.exosuit.class} />
        </div>
        <div className="h-4 w-px bg-nms-border" />
        <div className="flex items-center gap-4 text-xs text-nms-text-muted">
          <span>生命: <strong className="text-nms-red">{ps.exosuit.health}</strong></span>
          <span>護盾: <strong className="text-nms-accent">{ps.exosuit.shield}</strong></span>
          <span>能量: <strong className="text-nms-green">{ps.exosuit.energy}%</strong></span>
        </div>
      </div>

      {/* Inventory grids */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <InventoryGrid inventory={ps.exosuit.inventory} title="一般背包 General" />
        <InventoryGrid inventory={ps.exosuit.cargoInventory} title="貨物背包 Cargo" />
      </div>
      <InventoryGrid inventory={ps.exosuit.techInventory} title="科技欄位 Technology" />

      {/* Add item panel */}
      <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
        <button
          onClick={() => setShowAddItem(!showAddItem)}
          className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-nms-hover transition-colors"
        >
          <div className="flex items-center gap-2">
            <Plus size={16} className="text-nms-accent" />
            <span className="text-sm font-medium text-nms-text">新增物品到背包</span>
            <span className="text-xs text-nms-text-muted">Add Items</span>
          </div>
          <span className="text-nms-text-muted text-xs">{showAddItem ? '收起' : '展開'}</span>
        </button>

        {showAddItem && (
          <div className="border-t border-nms-border p-4 space-y-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-nms-text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜尋物品名稱或ID... Search items..."
                className="w-full bg-nms-bg border border-nms-border rounded-lg pl-9 pr-3 py-2 text-sm text-nms-text outline-none focus:border-nms-accent placeholder:text-nms-text-muted/50"
              />
            </div>

            {searchQuery && (
              <div className="max-h-60 overflow-y-auto space-y-1">
                {searchResults.length === 0 ? (
                  <div className="text-center text-xs text-nms-text-muted py-4">找不到相關物品</div>
                ) : (
                  searchResults.slice(0, 20).map(item => (
                    <div
                      key={item.id}
                      onClick={() => addNotification(`已添加 ${item.nameCN} 到背包`, 'success')}
                      className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-nms-hover cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-7 h-7 rounded flex items-center justify-center text-[10px] font-bold ${
                          item.category === 'substance' ? 'bg-nms-green/20 text-nms-green' :
                          item.category === 'product' ? 'bg-nms-gold/20 text-nms-gold' :
                          'bg-nms-purple/20 text-nms-purple'
                        }`}>{item.icon}</span>
                        <div>
                          <div className="text-sm text-nms-text">{item.nameCN}</div>
                          <div className="text-[10px] text-nms-text-muted">{item.name} | {item.id}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-nms-text-muted">{item.subCategory}</span>
                        <Plus size={14} className="text-nms-accent" />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {!searchQuery && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs text-nms-text-muted mb-2 font-medium">常用物質 Substances</h4>
                  <div className="space-y-1">
                    {SUBSTANCES.slice(0, 8).map(item => (
                      <div
                        key={item.id}
                        onClick={() => addNotification(`已添加 ${item.nameCN} x9999`, 'success')}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-nms-hover cursor-pointer transition-colors"
                      >
                        <span className="w-6 h-6 rounded bg-nms-green/20 text-nms-green flex items-center justify-center text-[9px] font-bold">{item.icon}</span>
                        <span className="text-xs text-nms-text">{item.nameCN}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs text-nms-text-muted mb-2 font-medium">常用產品 Products</h4>
                  <div className="space-y-1">
                    {PRODUCTS.slice(0, 8).map(item => (
                      <div
                        key={item.id}
                        onClick={() => addNotification(`已添加 ${item.nameCN}`, 'success')}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-nms-hover cursor-pointer transition-colors"
                      >
                        <span className="w-6 h-6 rounded bg-nms-gold/20 text-nms-gold flex items-center justify-center text-[9px] font-bold">{item.icon}</span>
                        <span className="text-xs text-nms-text">{item.nameCN}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
