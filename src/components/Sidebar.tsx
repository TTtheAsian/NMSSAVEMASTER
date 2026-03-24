import {
  LayoutDashboard, Package, Rocket, Crosshair, Truck, Ship,
  PawPrint, Home, Building2, UserCheck, ChevronLeft,
  ChevronRight, Save, Settings, Telescope, Sliders, Users
} from 'lucide-react';
import { useStore } from '../store/useStore';

const menuItems = [
  { id: 'dashboard', label: '控制面板', labelEN: 'Dashboard', icon: LayoutDashboard, shortcut: 'Alt+D', group: 'main' },
  { id: 'saves', label: '存檔管理', labelEN: 'Saves', icon: Save, shortcut: '', group: 'main' },
  { id: 'inventory', label: '物品背包', labelEN: 'Inventory', icon: Package, shortcut: 'Alt+I', group: 'assets' },
  { id: 'ships', label: '飛船艦隊', labelEN: 'Ships', icon: Rocket, shortcut: 'Alt+S', group: 'assets' },
  { id: 'multitools', label: '多功能工具', labelEN: 'Multi-Tools', icon: Crosshair, shortcut: 'Alt+M', group: 'assets' },
  { id: 'freighter', label: '貨船管理', labelEN: 'Freighter', icon: Ship, shortcut: 'Alt+F', group: 'assets' },
  { id: 'vehicles', label: '載具管理', labelEN: 'Vehicles', icon: Truck, shortcut: 'Alt+V', group: 'assets' },
  { id: 'companions', label: '同伴寵物', labelEN: 'Companions', icon: PawPrint, shortcut: 'Alt+C', group: 'world' },
  { id: 'bases', label: '基地管理', labelEN: 'Bases', icon: Home, shortcut: 'Alt+B', group: 'world' },
  { id: 'settlements', label: '定居點', labelEN: 'Settlements', icon: Building2, shortcut: '', group: 'world' },
  { id: 'discovery', label: '發現與知識', labelEN: 'Discovery', icon: Telescope, shortcut: '', group: 'world' },
  { id: 'squadron', label: '中隊管理', labelEN: 'Squadron', icon: UserCheck, shortcut: '', group: 'world' },
  { id: 'difficulty', label: '難度設定', labelEN: 'Difficulty', icon: Sliders, shortcut: '', group: 'config' },
  { id: 'account', label: '帳號資料', labelEN: 'Account', icon: Users, shortcut: '', group: 'config' },
  { id: 'settings', label: '設定', labelEN: 'Settings', icon: Settings, shortcut: '', group: 'config' },
];

const groupLabels: Record<string, { cn: string; en: string }> = {
  main: { cn: '總覽', en: 'OVERVIEW' },
  assets: { cn: '資產', en: 'ASSETS' },
  world: { cn: '世界', en: 'WORLD' },
  config: { cn: '系統', en: 'SYSTEM' },
};

const groups = ['main', 'assets', 'world', 'config'];

export function Sidebar() {
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebar } = useStore();

  return (
    <aside className={`fixed left-0 top-0 h-full bg-nms-panel/95 backdrop-blur-xl border-r border-nms-border z-40 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-[60px]' : 'w-[220px]'}`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 py-4 border-b border-nms-border/60 min-h-[56px]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nms-accent to-nms-purple flex items-center justify-center flex-shrink-0 shadow-lg shadow-nms-accent/20">
          <Rocket size={16} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="animate-slideIn overflow-hidden">
            <div className="text-[13px] font-bold text-nms-text tracking-tight whitespace-nowrap">NMS Save Master</div>
            <div className="text-[9px] text-nms-text-muted whitespace-nowrap tracking-wide">存檔管理大師</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-1.5 px-2">
        {groups.map(group => {
          const items = menuItems.filter(i => i.group === group);
          return (
            <div key={group} className="mb-1">
              {!sidebarCollapsed && (
                <div className="px-2 pt-3 pb-1.5 text-[9px] font-semibold text-nms-text-muted/60 tracking-widest uppercase">
                  {groupLabels[group].en}
                </div>
              )}
              {sidebarCollapsed && group !== 'main' && (
                <div className="mx-2 my-2 h-px bg-nms-border/40" />
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-[7px] rounded-lg transition-all duration-200 text-left group relative mb-0.5
                      ${isActive
                        ? 'bg-nms-accent/12 text-nms-accent'
                        : 'text-nms-text-dim hover:bg-nms-hover/60 hover:text-nms-text'
                      }`}
                    title={sidebarCollapsed ? item.label : undefined}
                  >
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-4 rounded-r-full bg-nms-accent" />
                    )}
                    <Icon size={16} className={`flex-shrink-0 ${isActive ? 'text-nms-accent' : 'text-nms-text-muted group-hover:text-nms-text-dim'}`} />
                    {!sidebarCollapsed && (
                      <div className="animate-slideIn overflow-hidden flex-1 min-w-0">
                        <div className={`text-[12px] font-medium whitespace-nowrap ${isActive ? 'text-nms-accent' : ''}`}>{item.label}</div>
                      </div>
                    )}
                    {!sidebarCollapsed && item.shortcut && (
                      <kbd className="text-[8px] px-1 py-0.5 rounded bg-nms-bg-elevated border border-nms-border/50 text-nms-text-muted font-mono opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                        {item.shortcut}
                      </kbd>
                    )}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-2 px-2.5 py-1.5 bg-nms-card rounded-lg text-[11px] text-nms-text whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-xl border border-nms-border z-50">
                        {item.label}
                        {item.shortcut && <span className="text-nms-text-muted ml-2 text-[9px]">{item.shortcut}</span>}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Version + Collapse */}
      <div className="border-t border-nms-border/40 p-2">
        {!sidebarCollapsed && (
          <div className="px-2 pb-2 text-[9px] text-nms-text-muted/50">v1.0.0</div>
        )}
        <button
          onClick={toggleSidebar}
          className="w-full p-1.5 rounded-lg text-nms-text-muted hover:text-nms-text hover:bg-nms-hover/50 transition-colors flex items-center justify-center"
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>
    </aside>
  );
}
