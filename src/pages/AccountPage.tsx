import { Users, Globe, Clock, Gamepad2, BookOpen, Languages, FlaskConical, Telescope, Award, Unlock } from 'lucide-react';
import { useStore } from '../store/useStore';

export function AccountPage() {
  const { activeSave, addNotification, updatePlayerState } = useStore();
  if (!activeSave) return null;
  const ps = activeSave.playerState;

  const gameModes = [
    { mode: 'Normal', label: '普通', color: 'bg-nms-green/15 text-nms-green border-nms-green/30' },
    { mode: 'Survival', label: '生存', color: 'bg-nms-orange/15 text-nms-orange border-nms-orange/30' },
    { mode: 'Permadeath', label: '永久死亡', color: 'bg-nms-red/15 text-nms-red border-nms-red/30' },
    { mode: 'Creative', label: '創造', color: 'bg-nms-purple/15 text-nms-purple border-nms-purple/30' },
    { mode: 'Relaxed', label: '休閒', color: 'bg-nms-accent2/15 text-nms-accent2 border-nms-accent2/30' },
    { mode: 'Custom', label: '自訂', color: 'bg-nms-accent/15 text-nms-accent border-nms-accent/30' },
  ] as const;

  const knowledgeActions = [
    { label: '解鎖全部科技', labelEN: 'Unlock All Tech', icon: <FlaskConical size={16} />, color: 'text-nms-accent' },
    { label: '解鎖全部配方', labelEN: 'Unlock All Recipes', icon: <BookOpen size={16} />, color: 'text-nms-green' },
    { label: '學會全部語言', labelEN: 'Learn All Words', icon: <Languages size={16} />, color: 'text-nms-gold' },
    { label: '發現全部里程碑', labelEN: 'Complete Milestones', icon: <Award size={16} />, color: 'text-nms-purple' },
    { label: '解鎖全部銀河符文', labelEN: 'Unlock All Glyphs', icon: <Telescope size={16} />, color: 'text-nms-accent2' },
    { label: '解鎖全部獎勵', labelEN: 'Unlock All Rewards', icon: <Unlock size={16} />, color: 'text-nms-orange' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-lg font-bold text-nms-text">帳號與遊戲資料 <span className="text-xs text-nms-text-muted font-normal">Account & Game Data</span></h2>
        <p className="text-xs text-nms-text-muted mt-1">遊戲模式、知識解鎖、里程碑管理</p>
      </div>

      {/* Player info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 text-center">
          <Gamepad2 size={20} className="text-nms-accent mx-auto mb-2" />
          <div className="text-[10px] text-nms-text-muted">遊戲模式</div>
          <div className="text-sm font-bold text-nms-text mt-1">{ps.gameMode}</div>
        </div>
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 text-center">
          <Globe size={20} className="text-nms-accent2 mx-auto mb-2" />
          <div className="text-[10px] text-nms-text-muted">當前銀河</div>
          <div className="text-sm font-bold text-nms-text mt-1">{ps.currentGalaxy}</div>
        </div>
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 text-center">
          <Clock size={20} className="text-nms-text-muted mx-auto mb-2" />
          <div className="text-[10px] text-nms-text-muted">總遊玩時間</div>
          <div className="text-sm font-bold text-nms-text mt-1">{ps.totalPlayTime.toFixed(1)} 小時</div>
        </div>
        <div className="bg-nms-card border border-nms-border rounded-xl p-4 text-center">
          <Users size={20} className="text-nms-purple mx-auto mb-2" />
          <div className="text-[10px] text-nms-text-muted">存檔位置</div>
          <div className="text-sm font-bold text-nms-text mt-1">Slot {activeSave.slot}</div>
        </div>
      </div>

      {/* Game mode switcher */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <h3 className="text-sm font-bold text-nms-text mb-3">切換遊戲模式 <span className="text-xs text-nms-text-muted font-normal">Switch Game Mode</span></h3>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {gameModes.map(gm => (
            <button
              key={gm.mode}
              onClick={() => { updatePlayerState({ gameMode: gm.mode }); addNotification(`遊戲模式已切換為 ${gm.label}`, 'success'); }}
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                ps.gameMode === gm.mode ? gm.color : 'border-nms-border text-nms-text-muted hover:border-nms-text-muted/40'
              }`}
            >
              <div>{gm.label}</div>
              <div className="text-[9px] opacity-70">{gm.mode}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Knowledge unlocks */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <h3 className="text-sm font-bold text-nms-text mb-3">知識與解鎖 <span className="text-xs text-nms-text-muted font-normal">Knowledge & Unlocks</span></h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {knowledgeActions.map(action => (
            <button
              key={action.label}
              onClick={() => addNotification(`${action.label} 完成！`, 'success')}
              className="flex items-center gap-3 p-3 rounded-lg bg-nms-bg border border-nms-border hover:border-nms-accent/30 transition-all text-left group"
            >
              <div className={`${action.color} group-hover:scale-110 transition-transform`}>{action.icon}</div>
              <div>
                <div className="text-xs font-medium text-nms-text">{action.label}</div>
                <div className="text-[10px] text-nms-text-muted">{action.labelEN}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
