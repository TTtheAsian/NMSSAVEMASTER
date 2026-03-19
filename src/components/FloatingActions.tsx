import { useState, useEffect } from 'react';
import { Zap, Coins, Wrench, ArrowUpCircle, Star, ChevronUp } from 'lucide-react';
import { useStore } from '../store/useStore';

export function FloatingActions() {
  const [expanded, setExpanded] = useState(false);
  const { maxAllCurrency, repairAll, refillAll, unlockAllSlots, maxAllStats } = useStore();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.altKey) {
        switch (e.key) {
          case '1': e.preventDefault(); maxAllCurrency(); break;
          case '2': e.preventDefault(); repairAll(); break;
          case '3': e.preventDefault(); refillAll(); break;
          case '4': e.preventDefault(); unlockAllSlots(); break;
          case '5': e.preventDefault(); maxAllStats(); break;
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [maxAllCurrency, repairAll, refillAll, unlockAllSlots, maxAllStats]);

  const actions = [
    { icon: <Star size={16} />, label: '全S級', shortcut: 'Alt+5', color: 'hover:bg-nms-purple/20 hover:text-nms-purple hover:border-nms-purple/40', action: maxAllStats },
    { icon: <ArrowUpCircle size={16} />, label: '解鎖', shortcut: 'Alt+4', color: 'hover:bg-nms-accent/20 hover:text-nms-accent hover:border-nms-accent/40', action: unlockAllSlots },
    { icon: <Zap size={16} />, label: '補滿', shortcut: 'Alt+3', color: 'hover:bg-nms-accent2/20 hover:text-nms-accent2 hover:border-nms-accent2/40', action: refillAll },
    { icon: <Wrench size={16} />, label: '修復', shortcut: 'Alt+2', color: 'hover:bg-nms-green/20 hover:text-nms-green hover:border-nms-green/40', action: repairAll },
    { icon: <Coins size={16} />, label: '錢滿', shortcut: 'Alt+1', color: 'hover:bg-nms-gold/20 hover:text-nms-gold hover:border-nms-gold/40', action: maxAllCurrency },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Expanded action buttons */}
      {expanded && actions.map((action, i) => (
        <button
          key={action.label}
          onClick={action.action}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-nms-panel border border-nms-border shadow-lg text-nms-text-dim text-xs font-medium transition-all duration-200 animate-fadeIn ${action.color}`}
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <span className="text-[9px] px-1 py-0.5 rounded bg-nms-bg border border-nms-border text-nms-text-muted font-mono">{action.shortcut}</span>
          {action.label}
          {action.icon}
        </button>
      ))}

      {/* Main FAB */}
      <button
        onClick={() => setExpanded(!expanded)}
        className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${
          expanded
            ? 'bg-nms-card border border-nms-border text-nms-text-muted rotate-180'
            : 'bg-gradient-to-br from-nms-accent to-nms-purple text-white pulse-glow'
        }`}
        title="快捷操作 (Alt+1~5)"
      >
        {expanded ? <ChevronUp size={20} /> : <Zap size={20} />}
      </button>
    </div>
  );
}
