import {
  LayoutDashboard, Package, Rocket, Crosshair, Truck, Ship,
  Users, PawPrint, Home, Building2, UserCheck, ChevronLeft,
  ChevronRight, Save, Settings
} from 'lucide-react';
import { useStore } from '../store/useStore';

const menuItems = [
  { id: 'dashboard', label: '控制面板', labelEN: 'Dashboard', icon: LayoutDashboard },
  { id: 'saves', label: '存檔管理', labelEN: 'Saves', icon: Save },
  { id: 'inventory', label: '物品背包', labelEN: 'Inventory', icon: Package },
  { id: 'ships', label: '飛船艦隊', labelEN: 'Ships', icon: Rocket },
  { id: 'multitools', label: '多功能工具', labelEN: 'Multi-Tools', icon: Crosshair },
  { id: 'freighter', label: '貨船管理', labelEN: 'Freighter', icon: Ship },
  { id: 'vehicles', label: '載具管理', labelEN: 'Vehicles', icon: Truck },
  { id: 'companions', label: '同伴寵物', labelEN: 'Companions', icon: PawPrint },
  { id: 'bases', label: '基地管理', labelEN: 'Bases', icon: Home },
  { id: 'settlements', label: '定居點', labelEN: 'Settlements', icon: Building2 },
  { id: 'squadron', label: '中隊管理', labelEN: 'Squadron', icon: UserCheck },
  { id: 'account', label: '帳號資料', labelEN: 'Account', icon: Users },
  { id: 'settings', label: '設定', labelEN: 'Settings', icon: Settings },
];

export function Sidebar() {
  const { activeTab, setActiveTab, sidebarCollapsed, toggleSidebar } = useStore();

  return (
    <aside className={`fixed left-0 top-0 h-full bg-nms-panel border-r border-nms-border z-40 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-16' : 'w-56'}`}>
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-4 border-b border-nms-border min-h-14">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nms-accent to-nms-purple flex items-center justify-center flex-shrink-0">
          <Rocket size={18} className="text-white" />
        </div>
        {!sidebarCollapsed && (
          <div className="animate-slideIn overflow-hidden">
            <div className="text-sm font-bold text-nms-text whitespace-nowrap">NMS Save Master</div>
            <div className="text-[10px] text-nms-text-muted whitespace-nowrap">存檔管理大師</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left group relative
                ${isActive
                  ? 'bg-nms-accent/15 text-nms-accent border border-nms-accent/30'
                  : 'text-nms-text-dim hover:bg-nms-hover hover:text-nms-text border border-transparent'
                }`}
              title={sidebarCollapsed ? item.label : undefined}
            >
              <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-nms-accent' : 'text-nms-text-muted group-hover:text-nms-text-dim'}`} />
              {!sidebarCollapsed && (
                <div className="animate-slideIn overflow-hidden">
                  <div className="text-sm font-medium whitespace-nowrap">{item.label}</div>
                  <div className="text-[10px] text-nms-text-muted whitespace-nowrap">{item.labelEN}</div>
                </div>
              )}
              {sidebarCollapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-nms-card rounded-md text-xs text-nms-text whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg border border-nms-border z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={toggleSidebar}
        className="m-2 p-2 rounded-lg border border-nms-border text-nms-text-muted hover:text-nms-text hover:bg-nms-hover transition-colors flex items-center justify-center"
      >
        {sidebarCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>
    </aside>
  );
}
