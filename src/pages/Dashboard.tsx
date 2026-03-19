import {
  Coins, Atom, Sparkles, Heart, Shield, Clock,
  Zap, Wrench, Package, ArrowUpCircle, Star, Rocket,
  Crosshair, Truck, PawPrint, Home, Ship, Users
} from 'lucide-react';
import { StatCard } from '../components/StatCard';
import { useStore } from '../store/useStore';

export function Dashboard() {
  const { activeSave, maxAllCurrency, repairAll, refillAll, unlockAllSlots, maxAllStats, setActiveTab } = useStore();
  if (!activeSave) return null;
  const ps = activeSave.playerState;

  const quickActions = [
    { label: '貨幣全滿', labelEN: 'Max Currency', icon: <Coins size={20} />, color: 'from-yellow-500/20 to-yellow-600/5 border-yellow-500/30 hover:border-yellow-400/60', textColor: 'text-yellow-400', action: maxAllCurrency },
    { label: '修復全部', labelEN: 'Repair All', icon: <Wrench size={20} />, color: 'from-green-500/20 to-green-600/5 border-green-500/30 hover:border-green-400/60', textColor: 'text-green-400', action: repairAll },
    { label: '補滿全部', labelEN: 'Refill All', icon: <Zap size={20} />, color: 'from-cyan-500/20 to-cyan-600/5 border-cyan-500/30 hover:border-cyan-400/60', textColor: 'text-cyan-400', action: refillAll },
    { label: '解鎖欄位', labelEN: 'Unlock Slots', icon: <Package size={20} />, color: 'from-blue-500/20 to-blue-600/5 border-blue-500/30 hover:border-blue-400/60', textColor: 'text-blue-400', action: unlockAllSlots },
    { label: '屬性最大', labelEN: 'Max Stats', icon: <ArrowUpCircle size={20} />, color: 'from-purple-500/20 to-purple-600/5 border-purple-500/30 hover:border-purple-400/60', textColor: 'text-purple-400', action: maxAllStats },
    { label: '全部S級', labelEN: 'All S-Class', icon: <Star size={20} />, color: 'from-amber-500/20 to-amber-600/5 border-amber-500/30 hover:border-amber-400/60', textColor: 'text-amber-400', action: maxAllStats },
  ];

  const overviewCards = [
    { label: '飛船 Ships', value: ps.ships.length, icon: <Rocket size={18} />, color: 'text-nms-accent', tab: 'ships' },
    { label: '多功能工具', value: ps.multiTools.length, icon: <Crosshair size={18} />, color: 'text-nms-purple', tab: 'multitools' },
    { label: '載具 Vehicles', value: ps.vehicles.length, icon: <Truck size={18} />, color: 'text-nms-green', tab: 'vehicles' },
    { label: '同伴 Companions', value: ps.companions.length, icon: <PawPrint size={18} />, color: 'text-nms-gold', tab: 'companions' },
    { label: '基地 Bases', value: ps.bases.length, icon: <Home size={18} />, color: 'text-nms-accent2', tab: 'bases' },
    { label: '護衛艦 Frigates', value: ps.freighter?.frigates.length ?? 0, icon: <Ship size={18} />, color: 'text-nms-orange', tab: 'freighter' },
    { label: '定居點', value: ps.settlements.length, icon: <Users size={18} />, color: 'text-nms-red', tab: 'settlements' },
    { label: '中隊成員', value: ps.squadron.filter(s => s.name).length, icon: <Users size={18} />, color: 'text-indigo-400', tab: 'squadron' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Player stats row */}
      <div>
        <h2 className="text-lg font-bold text-nms-text mb-3">玩家狀態 <span className="text-xs text-nms-text-muted font-normal">Player Status</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          <StatCard label="星幣 Units" value={ps.units} icon={<Coins size={18} />} color="text-nms-gold" />
          <StatCard label="奈米星團 Nanites" value={ps.nanites} icon={<Atom size={18} />} color="text-nms-accent2" />
          <StatCard label="水銀 Quicksilver" value={ps.quicksilver} icon={<Sparkles size={18} />} color="text-nms-purple" />
          <StatCard label="生命值 Health" value={ps.health} icon={<Heart size={18} />} color="text-nms-red" />
          <StatCard label="護盾 Shield" value={ps.shield} icon={<Shield size={18} />} color="text-nms-accent" />
          <StatCard label="遊玩時間 Play Time" value={`${ps.totalPlayTime.toFixed(1)}h`} icon={<Clock size={18} />} color="text-nms-text-dim" />
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-lg font-bold text-nms-text mb-3">一鍵操作 <span className="text-xs text-nms-text-muted font-normal">Quick Actions</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              onClick={action.action}
              className={`bg-gradient-to-br ${action.color} border rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]`}
            >
              <div className={action.textColor}>{action.icon}</div>
              <div>
                <div className={`text-sm font-bold ${action.textColor}`}>{action.label}</div>
                <div className="text-[10px] text-nms-text-muted">{action.labelEN}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Asset overview */}
      <div>
        <h2 className="text-lg font-bold text-nms-text mb-3">資產總覽 <span className="text-xs text-nms-text-muted font-normal">Assets Overview</span></h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {overviewCards.map((card) => (
            <StatCard
              key={card.label}
              label={card.label}
              value={card.value}
              icon={card.icon}
              color={card.color}
              onClick={() => setActiveTab(card.tab)}
            />
          ))}
        </div>
      </div>

      {/* Active ship summary */}
      <div>
        <h2 className="text-lg font-bold text-nms-text mb-3">當前裝備 <span className="text-xs text-nms-text-muted font-normal">Active Equipment</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Primary Ship */}
          {ps.ships.filter(s => s.isPrimary).map(ship => (
            <div key={ship.id} className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-accent/30 transition-colors cursor-pointer" onClick={() => setActiveTab('ships')}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-nms-text-muted">主力飛船</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${ship.class === 'S' ? 'bg-class-s/20 text-class-s' : 'bg-class-a/20 text-class-a'}`}>{ship.class} Class</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket size={24} className="text-nms-accent" />
                <div>
                  <div className="text-sm font-bold text-nms-text">{ship.name}</div>
                  <div className="text-[10px] text-nms-text-muted">{ship.type} | Seed: {ship.seed}</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <div className="text-center p-1.5 bg-nms-bg rounded-lg">
                  <div className="text-[10px] text-nms-text-muted">攻擊</div>
                  <div className="text-xs font-bold text-nms-red">{ship.damage}</div>
                </div>
                <div className="text-center p-1.5 bg-nms-bg rounded-lg">
                  <div className="text-[10px] text-nms-text-muted">護盾</div>
                  <div className="text-xs font-bold text-nms-accent">{ship.shield}</div>
                </div>
                <div className="text-center p-1.5 bg-nms-bg rounded-lg">
                  <div className="text-[10px] text-nms-text-muted">血量</div>
                  <div className="text-xs font-bold text-nms-green">{ship.health}</div>
                </div>
              </div>
            </div>
          ))}

          {/* Primary MultiTool */}
          {ps.multiTools.filter(m => m.isPrimary).map(mt => (
            <div key={mt.id} className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-purple/30 transition-colors cursor-pointer" onClick={() => setActiveTab('multitools')}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-nms-text-muted">主力工具</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${mt.class === 'S' ? 'bg-class-s/20 text-class-s' : 'bg-class-a/20 text-class-a'}`}>{mt.class} Class</span>
              </div>
              <div className="flex items-center gap-2">
                <Crosshair size={24} className="text-nms-purple" />
                <div>
                  <div className="text-sm font-bold text-nms-text">{mt.name}</div>
                  <div className="text-[10px] text-nms-text-muted">{mt.type} | Seed: {mt.seed}</div>
                </div>
              </div>
              <div className="mt-3 p-1.5 bg-nms-bg rounded-lg text-center">
                <div className="text-[10px] text-nms-text-muted">欄位使用</div>
                <div className="text-xs font-bold text-nms-purple">{mt.inventory.usedSlots}/{mt.inventory.maxSlots}</div>
              </div>
            </div>
          ))}

          {/* Exosuit */}
          <div className="bg-nms-card border border-nms-border rounded-xl p-4 hover:border-nms-green/30 transition-colors cursor-pointer" onClick={() => setActiveTab('inventory')}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-nms-text-muted">太空衣</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-class-s/20 text-class-s">{ps.exosuit.class} Class</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield size={24} className="text-nms-green" />
              <div>
                <div className="text-sm font-bold text-nms-text">太空衣 Exosuit</div>
                <div className="text-[10px] text-nms-text-muted">一般/科技/貨物</div>
              </div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="text-center p-1.5 bg-nms-bg rounded-lg">
                <div className="text-[10px] text-nms-text-muted">一般</div>
                <div className="text-xs font-bold text-nms-green">{ps.exosuit.inventory.usedSlots}/{ps.exosuit.inventory.maxSlots}</div>
              </div>
              <div className="text-center p-1.5 bg-nms-bg rounded-lg">
                <div className="text-[10px] text-nms-text-muted">科技</div>
                <div className="text-xs font-bold text-nms-accent">{ps.exosuit.techInventory.usedSlots}/{ps.exosuit.techInventory.maxSlots}</div>
              </div>
              <div className="text-center p-1.5 bg-nms-bg rounded-lg">
                <div className="text-[10px] text-nms-text-muted">貨物</div>
                <div className="text-xs font-bold text-nms-purple">{ps.exosuit.cargoInventory.usedSlots}/{ps.exosuit.cargoInventory.maxSlots}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
