import {
  Coins, Atom, Sparkles, Heart, Shield, Clock,
  Zap, Wrench, Package, ArrowUpCircle, Star, Rocket,
  Crosshair, Truck, PawPrint, Home, Ship, Users,
  ChevronRight, TrendingUp
} from 'lucide-react';
import { useStore } from '../store/useStore';

export function Dashboard() {
  const { activeSave, maxAllCurrency, repairAll, refillAll, unlockAllSlots, maxAllStats, setActiveTab } = useStore();
  if (!activeSave) return null;
  const ps = activeSave.playerState;

  const quickActions = [
    { label: '貨幣全滿', labelEN: 'Max Currency', icon: <Coins size={18} />, gradient: 'from-yellow-500/20 via-amber-500/10 to-transparent', border: 'border-yellow-500/25 hover:border-yellow-400/50', text: 'text-yellow-400', action: maxAllCurrency },
    { label: '修復全部', labelEN: 'Repair All', icon: <Wrench size={18} />, gradient: 'from-emerald-500/20 via-green-500/10 to-transparent', border: 'border-emerald-500/25 hover:border-emerald-400/50', text: 'text-emerald-400', action: repairAll },
    { label: '補滿全部', labelEN: 'Refill All', icon: <Zap size={18} />, gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent', border: 'border-cyan-500/25 hover:border-cyan-400/50', text: 'text-cyan-400', action: refillAll },
    { label: '解鎖欄位', labelEN: 'Unlock Slots', icon: <Package size={18} />, gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent', border: 'border-blue-500/25 hover:border-blue-400/50', text: 'text-blue-400', action: unlockAllSlots },
    { label: '屬性最大', labelEN: 'Max Stats', icon: <ArrowUpCircle size={18} />, gradient: 'from-violet-500/20 via-purple-500/10 to-transparent', border: 'border-violet-500/25 hover:border-violet-400/50', text: 'text-violet-400', action: maxAllStats },
    { label: '全部S級', labelEN: 'All S-Class', icon: <Star size={18} />, gradient: 'from-amber-500/20 via-orange-500/10 to-transparent', border: 'border-amber-500/25 hover:border-amber-400/50', text: 'text-amber-400', action: maxAllStats },
  ];

  const currencyCards = [
    { label: '星幣', labelEN: 'Units', value: ps.units, icon: <Coins size={20} />, color: 'text-nms-gold', bg: 'from-yellow-500/10 to-transparent', border: 'border-yellow-500/15' },
    { label: '奈米星團', labelEN: 'Nanites', value: ps.nanites, icon: <Atom size={20} />, color: 'text-nms-accent2', bg: 'from-teal-500/10 to-transparent', border: 'border-teal-500/15' },
    { label: '水銀', labelEN: 'Quicksilver', value: ps.quicksilver, icon: <Sparkles size={20} />, color: 'text-nms-purple', bg: 'from-violet-500/10 to-transparent', border: 'border-violet-500/15' },
  ];

  const statCards = [
    { label: '生命值', labelEN: 'Health', value: ps.health, icon: <Heart size={16} />, color: 'text-nms-red' },
    { label: '護盾', labelEN: 'Shield', value: ps.shield, icon: <Shield size={16} />, color: 'text-nms-accent' },
    { label: '遊玩時間', labelEN: 'Play Time', value: `${ps.totalPlayTime.toFixed(1)}h`, icon: <Clock size={16} />, color: 'text-nms-text-dim' },
  ];

  const overviewCards = [
    { label: '飛船', labelEN: 'Ships', value: ps.ships.length, icon: <Rocket size={16} />, color: 'text-nms-accent', tab: 'ships' },
    { label: '工具', labelEN: 'Multi-Tools', value: ps.multiTools.length, icon: <Crosshair size={16} />, color: 'text-nms-purple', tab: 'multitools' },
    { label: '載具', labelEN: 'Vehicles', value: ps.vehicles.length, icon: <Truck size={16} />, color: 'text-nms-green', tab: 'vehicles' },
    { label: '同伴', labelEN: 'Companions', value: ps.companions.length, icon: <PawPrint size={16} />, color: 'text-nms-gold', tab: 'companions' },
    { label: '基地', labelEN: 'Bases', value: ps.bases.length, icon: <Home size={16} />, color: 'text-nms-accent2', tab: 'bases' },
    { label: '護衛艦', labelEN: 'Frigates', value: ps.freighter?.frigates.length ?? 0, icon: <Ship size={16} />, color: 'text-nms-orange', tab: 'freighter' },
    { label: '定居點', labelEN: 'Settlements', value: ps.settlements.length, icon: <Users size={16} />, color: 'text-nms-red', tab: 'settlements' },
    { label: '中隊', labelEN: 'Squadron', value: ps.squadron.filter(s => s.name).length, icon: <Users size={16} />, color: 'text-indigo-400', tab: 'squadron' },
  ];

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Currency cards - hero section */}
      <div className="grid grid-cols-3 gap-3">
        {currencyCards.map(card => (
          <div key={card.labelEN} className={`bg-gradient-to-br ${card.bg} bg-nms-card border ${card.border} rounded-xl p-4 card-glow`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`${card.color} opacity-80`}>{card.icon}</div>
                <div>
                  <div className="text-[11px] text-nms-text-muted">{card.label}</div>
                  <div className="text-[9px] text-nms-text-muted/60">{card.labelEN}</div>
                </div>
              </div>
              <TrendingUp size={12} className="text-nms-text-muted/30" />
            </div>
            <div className={`text-2xl font-bold ${card.color} tracking-tight`}>
              {card.value.toLocaleString()}
            </div>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {statCards.map(card => (
          <div key={card.labelEN} className="bg-nms-card border border-nms-border rounded-xl px-4 py-3 flex items-center gap-3">
            <div className={`p-1.5 rounded-md bg-nms-bg-elevated ${card.color}`}>{card.icon}</div>
            <div>
              <div className="text-[10px] text-nms-text-muted">{card.label} <span className="text-nms-text-muted/50">{card.labelEN}</span></div>
              <div className="text-sm font-bold text-nms-text">{typeof card.value === 'number' ? card.value.toLocaleString() : card.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-nms-text">一鍵操作 <span className="text-[10px] text-nms-text-muted font-normal ml-1">Quick Actions</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className={`bg-gradient-to-br ${action.gradient} bg-nms-card border ${action.border} rounded-xl p-3.5 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group`}
            >
              <div className={`${action.text} group-hover:scale-110 transition-transform`}>{action.icon}</div>
              <div className="text-center">
                <div className={`text-[12px] font-bold ${action.text}`}>{action.label}</div>
                <div className="text-[9px] text-nms-text-muted/70">{action.labelEN}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Asset Overview */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-nms-text">資產總覽 <span className="text-[10px] text-nms-text-muted font-normal ml-1">Assets Overview</span></h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {overviewCards.map((card) => (
            <button
              key={card.label}
              onClick={() => setActiveTab(card.tab)}
              className="bg-nms-card border border-nms-border rounded-xl p-3.5 flex items-center gap-3 transition-all hover:border-nms-border-bright hover:bg-nms-hover/30 group text-left"
            >
              <div className={`p-2 rounded-lg bg-nms-bg-elevated ${card.color}`}>{card.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-nms-text-muted">{card.label} {card.labelEN}</div>
                <div className="text-lg font-bold text-nms-text">{card.value}</div>
              </div>
              <ChevronRight size={14} className="text-nms-text-muted/30 group-hover:text-nms-text-muted/60 transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Active Equipment */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-nms-text">當前裝備 <span className="text-[10px] text-nms-text-muted font-normal ml-1">Active Equipment</span></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Primary Ship */}
          {ps.ships.filter(s => s.isPrimary).map(ship => (
            <button key={ship.id} className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-accent/25 transition-all text-left group card-glow" onClick={() => setActiveTab('ships')}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-nms-text-muted font-medium tracking-wide">主力飛船</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${ship.class === 'S' ? 'bg-class-s/15 text-class-s' : 'bg-class-a/15 text-class-a'}`}>{ship.class} Class</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Rocket size={22} className="text-nms-accent" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-nms-text truncate">{ship.name}</div>
                  <div className="text-[9px] text-nms-text-muted">{ship.type} | {ship.seed}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-1.5">
                <div className="text-center py-1.5 bg-nms-bg-elevated rounded-lg">
                  <div className="text-[8px] text-nms-text-muted">攻擊</div>
                  <div className="text-[11px] font-bold text-nms-red">{ship.damage}</div>
                </div>
                <div className="text-center py-1.5 bg-nms-bg-elevated rounded-lg">
                  <div className="text-[8px] text-nms-text-muted">護盾</div>
                  <div className="text-[11px] font-bold text-nms-accent">{ship.shield}</div>
                </div>
                <div className="text-center py-1.5 bg-nms-bg-elevated rounded-lg">
                  <div className="text-[8px] text-nms-text-muted">血量</div>
                  <div className="text-[11px] font-bold text-nms-green">{ship.health}</div>
                </div>
              </div>
            </button>
          ))}

          {/* Primary MultiTool */}
          {ps.multiTools.filter(m => m.isPrimary).map(mt => (
            <button key={mt.id} className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-purple/25 transition-all text-left group card-glow" onClick={() => setActiveTab('multitools')}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] text-nms-text-muted font-medium tracking-wide">主力工具</span>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${mt.class === 'S' ? 'bg-class-s/15 text-class-s' : 'bg-class-a/15 text-class-a'}`}>{mt.class} Class</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Crosshair size={22} className="text-nms-purple" />
                <div className="min-w-0">
                  <div className="text-sm font-bold text-nms-text truncate">{mt.name}</div>
                  <div className="text-[9px] text-nms-text-muted">{mt.type} | {mt.seed}</div>
                </div>
              </div>
              <div className="mt-3 py-1.5 bg-nms-bg-elevated rounded-lg text-center">
                <div className="text-[8px] text-nms-text-muted">欄位使用</div>
                <div className="text-[11px] font-bold text-nms-purple">{mt.inventory.usedSlots}/{mt.inventory.maxSlots}</div>
              </div>
            </button>
          ))}

          {/* Exosuit */}
          <button className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-green/25 transition-all text-left group card-glow" onClick={() => setActiveTab('inventory')}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-nms-text-muted font-medium tracking-wide">太空衣</span>
              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-class-s/15 text-class-s">{ps.exosuit.class} Class</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Shield size={22} className="text-nms-green" />
              <div>
                <div className="text-sm font-bold text-nms-text">太空衣 Exosuit</div>
                <div className="text-[9px] text-nms-text-muted">一般/科技/貨物</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="text-center py-1.5 bg-nms-bg-elevated rounded-lg">
                <div className="text-[8px] text-nms-text-muted">一般</div>
                <div className="text-[11px] font-bold text-nms-green">{ps.exosuit.inventory.usedSlots}/{ps.exosuit.inventory.maxSlots}</div>
              </div>
              <div className="text-center py-1.5 bg-nms-bg-elevated rounded-lg">
                <div className="text-[8px] text-nms-text-muted">科技</div>
                <div className="text-[11px] font-bold text-nms-accent">{ps.exosuit.techInventory.usedSlots}/{ps.exosuit.techInventory.maxSlots}</div>
              </div>
              <div className="text-center py-1.5 bg-nms-bg-elevated rounded-lg">
                <div className="text-[8px] text-nms-text-muted">貨物</div>
                <div className="text-[11px] font-bold text-nms-purple">{ps.exosuit.cargoInventory.usedSlots}/{ps.exosuit.cargoInventory.maxSlots}</div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
