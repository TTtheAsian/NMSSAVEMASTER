import { useState, useEffect, useRef, useMemo } from 'react';
import {
  Search, LayoutDashboard, Package, Rocket, Crosshair, Truck, Ship,
  Users, PawPrint, Home, Building2, UserCheck, Save, Settings,
  Coins, Wrench, Zap, ArrowUpCircle, Star, Command
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { searchItems } from '../data/items';

interface PaletteItem {
  id: string;
  label: string;
  labelEN: string;
  category: 'navigate' | 'action' | 'item';
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const { setActiveTab, maxAllCurrency, repairAll, refillAll, unlockAllSlots, maxAllStats, addNotification } = useStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(v => !v);
        setQuery('');
        setSelectedIndex(0);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const navItems: PaletteItem[] = useMemo(() => [
    { id: 'nav-dashboard', label: '控制面板', labelEN: 'Dashboard', category: 'navigate', icon: <LayoutDashboard size={16} />, action: () => { setActiveTab('dashboard'); setOpen(false); }, keywords: '首頁 home' },
    { id: 'nav-saves', label: '存檔管理', labelEN: 'Saves', category: 'navigate', icon: <Save size={16} />, action: () => { setActiveTab('saves'); setOpen(false); }, keywords: 'save file' },
    { id: 'nav-inventory', label: '物品背包', labelEN: 'Inventory', category: 'navigate', icon: <Package size={16} />, action: () => { setActiveTab('inventory'); setOpen(false); }, keywords: 'bag item 物品 背包' },
    { id: 'nav-ships', label: '飛船艦隊', labelEN: 'Ships', category: 'navigate', icon: <Rocket size={16} />, action: () => { setActiveTab('ships'); setOpen(false); }, keywords: 'ship fleet 飛船' },
    { id: 'nav-multitools', label: '多功能工具', labelEN: 'Multi-Tools', category: 'navigate', icon: <Crosshair size={16} />, action: () => { setActiveTab('multitools'); setOpen(false); }, keywords: 'weapon gun tool 武器 工具' },
    { id: 'nav-freighter', label: '貨船管理', labelEN: 'Freighter', category: 'navigate', icon: <Ship size={16} />, action: () => { setActiveTab('freighter'); setOpen(false); }, keywords: 'capital ship frigate 貨船 護衛艦' },
    { id: 'nav-vehicles', label: '載具管理', labelEN: 'Vehicles', category: 'navigate', icon: <Truck size={16} />, action: () => { setActiveTab('vehicles'); setOpen(false); }, keywords: 'exocraft car 載具 車' },
    { id: 'nav-companions', label: '同伴寵物', labelEN: 'Companions', category: 'navigate', icon: <PawPrint size={16} />, action: () => { setActiveTab('companions'); setOpen(false); }, keywords: 'pet creature 寵物 同伴' },
    { id: 'nav-bases', label: '基地管理', labelEN: 'Bases', category: 'navigate', icon: <Home size={16} />, action: () => { setActiveTab('bases'); setOpen(false); }, keywords: 'base building 基地 建築' },
    { id: 'nav-settlements', label: '定居點', labelEN: 'Settlements', category: 'navigate', icon: <Building2 size={16} />, action: () => { setActiveTab('settlements'); setOpen(false); }, keywords: 'settlement village 定居點 村莊' },
    { id: 'nav-squadron', label: '中隊管理', labelEN: 'Squadron', category: 'navigate', icon: <UserCheck size={16} />, action: () => { setActiveTab('squadron'); setOpen(false); }, keywords: 'wingman pilot 僚機 中隊' },
    { id: 'nav-account', label: '帳號資料', labelEN: 'Account', category: 'navigate', icon: <Users size={16} />, action: () => { setActiveTab('account'); setOpen(false); }, keywords: 'account profile 帳號' },
    { id: 'nav-settings', label: '設定', labelEN: 'Settings', category: 'navigate', icon: <Settings size={16} />, action: () => { setActiveTab('settings'); setOpen(false); }, keywords: '設定 config preference' },
  ], [setActiveTab]);

  const actionItems: PaletteItem[] = useMemo(() => [
    { id: 'act-maxcurrency', label: '貨幣全滿', labelEN: 'Max All Currency', category: 'action', icon: <Coins size={16} className="text-nms-gold" />, action: () => { maxAllCurrency(); setOpen(false); }, keywords: 'money units nanites quicksilver 錢 星幣 奈米' },
    { id: 'act-repair', label: '修復全部裝備', labelEN: 'Repair All Equipment', category: 'action', icon: <Wrench size={16} className="text-nms-green" />, action: () => { repairAll(); setOpen(false); }, keywords: 'repair fix 修復' },
    { id: 'act-refill', label: '補滿全部物品', labelEN: 'Refill All Items', category: 'action', icon: <Zap size={16} className="text-nms-accent2" />, action: () => { refillAll(); setOpen(false); }, keywords: 'refill recharge 補滿 充電' },
    { id: 'act-unlock', label: '解鎖全部欄位', labelEN: 'Unlock All Slots', category: 'action', icon: <ArrowUpCircle size={16} className="text-nms-accent" />, action: () => { unlockAllSlots(); setOpen(false); }, keywords: 'unlock expand slot 解鎖 欄位' },
    { id: 'act-maxstats', label: '全部屬性最大化', labelEN: 'Max All Stats & S-Class', category: 'action', icon: <Star size={16} className="text-nms-purple" />, action: () => { maxAllStats(); setOpen(false); }, keywords: 'max stats class upgrade 最大 升級 S級' },
  ], [maxAllCurrency, repairAll, refillAll, unlockAllSlots, maxAllStats]);

  const matchingItems = useMemo(() => {
    const itemResults: PaletteItem[] = [];
    if (query.length >= 2) {
      const items = searchItems(query);
      items.slice(0, 6).forEach(item => {
        itemResults.push({
          id: `item-${item.id}`,
          label: item.nameCN,
          labelEN: `${item.name} (${item.id})`,
          category: 'item',
          icon: <span className={`w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold ${
            item.category === 'substance' ? 'bg-nms-green/20 text-nms-green' :
            item.category === 'product' ? 'bg-nms-gold/20 text-nms-gold' :
            'bg-nms-purple/20 text-nms-purple'
          }`}>{item.icon}</span>,
          action: () => { addNotification(`已添加 ${item.nameCN} 到背包`, 'success'); setOpen(false); },
        });
      });
    }
    return itemResults;
  }, [query, addNotification]);

  const filtered = useMemo(() => {
    const all = [...actionItems, ...navItems, ...matchingItems];
    if (!query) return all;
    const lower = query.toLowerCase();
    return all.filter(item =>
      item.label.toLowerCase().includes(lower) ||
      item.labelEN.toLowerCase().includes(lower) ||
      (item.keywords && item.keywords.toLowerCase().includes(lower))
    );
  }, [query, navItems, actionItems, matchingItems]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(i => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && filtered[selectedIndex]) {
      e.preventDefault();
      filtered[selectedIndex].action();
    }
  };

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!open) return null;

  const categoryLabel = (cat: string) => {
    if (cat === 'navigate') return '導航 Navigate';
    if (cat === 'action') return '快捷操作 Quick Actions';
    if (cat === 'item') return '物品 Items';
    return cat;
  };

  const grouped: { category: string; items: PaletteItem[] }[] = [];
  let globalIdx = 0;
  const indexMap = new Map<string, number>();
  for (const item of filtered) {
    indexMap.set(item.id, globalIdx++);
    let group = grouped.find(g => g.category === item.category);
    if (!group) {
      group = { category: item.category, items: [] };
      grouped.push(group);
    }
    group.items.push(item);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-lg bg-nms-panel border border-nms-border rounded-xl shadow-2xl overflow-hidden animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-nms-border">
          <Search size={18} className="text-nms-text-muted flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜尋功能、物品或快捷操作... Search anything..."
            className="flex-1 bg-transparent text-sm text-nms-text outline-none placeholder:text-nms-text-muted/50"
          />
          <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-nms-bg border border-nms-border text-[10px] text-nms-text-muted">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-nms-text-muted">
              找不到相關結果 No results found
            </div>
          ) : (
            grouped.map(group => (
              <div key={group.category}>
                <div className="px-4 py-1.5 text-[10px] font-medium text-nms-text-muted uppercase tracking-wider">
                  {categoryLabel(group.category)}
                </div>
                {group.items.map(item => {
                  const idx = indexMap.get(item.id)!;
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-left transition-colors ${
                        selectedIndex === idx ? 'bg-nms-accent/10 text-nms-accent' : 'text-nms-text hover:bg-nms-hover'
                      }`}
                    >
                      <span className="flex-shrink-0 w-5 flex justify-center">{item.icon}</span>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm">{item.label}</span>
                        <span className="text-[10px] text-nms-text-muted ml-2">{item.labelEN}</span>
                      </div>
                      {item.category === 'action' && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-nms-bg text-nms-text-muted border border-nms-border">執行</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2 border-t border-nms-border text-[10px] text-nms-text-muted">
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-nms-bg border border-nms-border">↑↓</kbd> 選擇</span>
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-nms-bg border border-nms-border">↵</kbd> 執行</span>
          <span className="flex items-center gap-1"><kbd className="px-1 rounded bg-nms-bg border border-nms-border">ESC</kbd> 關閉</span>
        </div>
      </div>
    </div>
  );
}

export function CommandPaletteTrigger() {
  return (
    <button
      onClick={() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true }));
      }}
      className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-nms-bg border border-nms-border text-nms-text-muted text-xs hover:border-nms-accent/40 hover:text-nms-text transition-colors"
      title="搜尋 (Ctrl+K)"
    >
      <Search size={12} />
      <span className="hidden md:inline">搜尋...</span>
      <kbd className="hidden md:flex items-center gap-0.5 px-1 rounded bg-nms-card border border-nms-border text-[9px]">
        <Command size={9} />K
      </kbd>
    </button>
  );
}
