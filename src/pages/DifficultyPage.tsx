import { Sliders, RotateCcw, Zap, Shield, Flame, Battery, Pickaxe, Fuel, Rocket, Coins, Radar, Users, Skull, Swords, Timer, Footprints, Wrench, Package, ToggleLeft, ToggleRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { DifficultySettings } from '../types';

interface SliderSetting {
  key: keyof DifficultySettings;
  label: string;
  labelEN: string;
  icon: React.ReactNode;
  min: number;
  max: number;
  step: number;
  color: string;
  description: string;
  format?: (v: number) => string;
}

interface ToggleSetting {
  key: keyof DifficultySettings;
  label: string;
  labelEN: string;
  description: string;
  icon: React.ReactNode;
}

const PRESETS: { label: string; labelEN: string; color: string; values: Partial<DifficultySettings> }[] = [
  {
    label: '休閒', labelEN: 'Relaxed', color: 'bg-nms-accent2/15 text-nms-accent2 border-nms-accent2/30',
    values: {
      deathConsequences: 0, damageReceived: 0.5, damageGiven: 2.0, hazardDrain: 0.5, energyDrain: 0.5,
      substanceCollection: 2.0, chargingRequirements: 0.5, fuelUse: 0.5, launchFuelCost: 0.0,
      currencyCost: 0.5, scannerRecharge: 2.0, reputationGain: 2.0, creatureHostility: 0.3,
      sprintingCost: 0.5, breakTechOnDamage: 0.0, inventoryStackLimits: 2,
      craftingIsFree: true, baseAutoPower: true, allSlotsUnlocked: true,
    },
  },
  {
    label: '普通', labelEN: 'Normal', color: 'bg-nms-green/15 text-nms-green border-nms-green/30',
    values: {
      deathConsequences: 1, damageReceived: 1.0, damageGiven: 1.0, hazardDrain: 1.0, energyDrain: 1.0,
      substanceCollection: 1.0, chargingRequirements: 1.0, fuelUse: 1.0, launchFuelCost: 1.0,
      currencyCost: 1.0, scannerRecharge: 1.0, reputationGain: 1.0, creatureHostility: 1.0,
      sprintingCost: 1.0, breakTechOnDamage: 0.1, inventoryStackLimits: 1,
      craftingIsFree: false, baseAutoPower: false, allSlotsUnlocked: false,
    },
  },
  {
    label: '生存', labelEN: 'Survival', color: 'bg-nms-orange/15 text-nms-orange border-nms-orange/30',
    values: {
      deathConsequences: 2, damageReceived: 2.0, damageGiven: 0.8, hazardDrain: 2.0, energyDrain: 2.0,
      substanceCollection: 0.5, chargingRequirements: 2.0, fuelUse: 2.0, launchFuelCost: 2.0,
      currencyCost: 2.0, scannerRecharge: 0.5, reputationGain: 0.5, creatureHostility: 2.0,
      sprintingCost: 2.0, breakTechOnDamage: 0.3, inventoryStackLimits: 0,
      craftingIsFree: false, baseAutoPower: false, allSlotsUnlocked: false,
    },
  },
  {
    label: '永久死亡', labelEN: 'Permadeath', color: 'bg-nms-red/15 text-nms-red border-nms-red/30',
    values: {
      deathConsequences: 3, damageReceived: 3.0, damageGiven: 0.5, hazardDrain: 3.0, energyDrain: 3.0,
      substanceCollection: 0.3, chargingRequirements: 3.0, fuelUse: 3.0, launchFuelCost: 3.0,
      currencyCost: 3.0, scannerRecharge: 0.3, reputationGain: 0.3, creatureHostility: 3.0,
      sprintingCost: 3.0, breakTechOnDamage: 0.5, inventoryStackLimits: 0,
      craftingIsFree: false, baseAutoPower: false, allSlotsUnlocked: false,
    },
  },
];

const sliders: SliderSetting[] = [
  { key: 'damageReceived', label: '受到傷害', labelEN: 'Damage Received', icon: <Shield size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-red', description: '敵人對你造成的傷害倍數', format: v => `${v.toFixed(1)}x` },
  { key: 'damageGiven', label: '造成傷害', labelEN: 'Damage Given', icon: <Swords size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-orange', description: '你對敵人造成的傷害倍數', format: v => `${v.toFixed(1)}x` },
  { key: 'hazardDrain', label: '環境危害', labelEN: 'Hazard Drain', icon: <Flame size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-gold', description: '極端天氣對防護消耗的速度', format: v => `${v.toFixed(1)}x` },
  { key: 'energyDrain', label: '能量消耗', labelEN: 'Energy Drain', icon: <Battery size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-accent2', description: '生命維持系統的消耗速度', format: v => `${v.toFixed(1)}x` },
  { key: 'substanceCollection', label: '資源收集', labelEN: 'Substance Collection', icon: <Pickaxe size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-green', description: '採礦/收集資源的獲取倍數', format: v => `${v.toFixed(1)}x` },
  { key: 'fuelUse', label: '燃料消耗', labelEN: 'Fuel Use', icon: <Fuel size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-purple', description: '飛船與載具的燃料消耗速度', format: v => `${v.toFixed(1)}x` },
  { key: 'launchFuelCost', label: '發射燃料', labelEN: 'Launch Fuel Cost', icon: <Rocket size={14} />, min: 0, max: 5.0, step: 0.1, color: 'text-nms-accent', description: '飛船起飛所需的燃料量', format: v => v === 0 ? '免費' : `${v.toFixed(1)}x` },
  { key: 'currencyCost', label: '物價倍數', labelEN: 'Currency Cost', icon: <Coins size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-gold', description: '商店購買物品的價格倍數', format: v => `${v.toFixed(1)}x` },
  { key: 'chargingRequirements', label: '充能需求', labelEN: 'Charging Requirements', icon: <Zap size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-accent2', description: '裝備充能所需的材料量', format: v => `${v.toFixed(1)}x` },
  { key: 'scannerRecharge', label: '掃描速度', labelEN: 'Scanner Recharge', icon: <Radar size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-accent', description: '分析面罩的冷卻與充能速度', format: v => `${v.toFixed(1)}x` },
  { key: 'reputationGain', label: '聲望獲取', labelEN: 'Reputation Gain', icon: <Users size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-purple', description: '與各種族互動的聲望增幅', format: v => `${v.toFixed(1)}x` },
  { key: 'creatureHostility', label: '生物敵意', labelEN: 'Creature Hostility', icon: <Skull size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-red', description: '野生動物的攻擊性強度', format: v => `${v.toFixed(1)}x` },
  { key: 'spaceCombatTimers', label: '太空戰鬥', labelEN: 'Space Combat', icon: <Timer size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-orange', description: '太空戰鬥的間隔與持續時間', format: v => `${v.toFixed(1)}x` },
  { key: 'groundCombatTimers', label: '地面戰鬥', labelEN: 'Ground Combat', icon: <Timer size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-orange', description: '哨兵等地面戰鬥頻率', format: v => `${v.toFixed(1)}x` },
  { key: 'sprintingCost', label: '衝刺消耗', labelEN: 'Sprinting Cost', icon: <Footprints size={14} />, min: 0.1, max: 5.0, step: 0.1, color: 'text-nms-accent2', description: '奔跑時的體力消耗速度', format: v => `${v.toFixed(1)}x` },
  { key: 'breakTechOnDamage', label: '科技損壞率', labelEN: 'Tech Break Chance', icon: <Wrench size={14} />, min: 0, max: 1.0, step: 0.05, color: 'text-nms-red', description: '受傷時科技模組損壞的機率', format: v => `${(v * 100).toFixed(0)}%` },
];

const toggles: ToggleSetting[] = [
  { key: 'craftingIsFree', label: '免費製作', labelEN: 'Free Crafting', description: '合成物品不需要材料', icon: <Package size={14} /> },
  { key: 'baseAutoPower', label: '基地自動供電', labelEN: 'Base Auto Power', description: '基地不需要電力系統', icon: <Zap size={14} /> },
  { key: 'allSlotsUnlocked', label: '全部欄位解鎖', labelEN: 'All Slots Unlocked', description: '所有背包欄位直接可用', icon: <Package size={14} /> },
  { key: 'inventoriesAlwaysInRange', label: '遠端存取背包', labelEN: 'Remote Inventories', description: '隨時存取所有背包', icon: <Package size={14} /> },
  { key: 'warpDriveRequirements', label: '曲速引擎需求', labelEN: 'Warp Drive Required', description: '進行星系跳躍需要燃料', icon: <Rocket size={14} /> },
  { key: 'tutorialEnabled', label: '新手教學', labelEN: 'Tutorial Enabled', description: '啟用遊戲開頭的教學任務', icon: <Users size={14} /> },
  { key: 'startWithAllItemsKnown', label: '已知全部配方', labelEN: 'Know All Items', description: '一開始就解鎖全部製作配方', icon: <Package size={14} /> },
  { key: 'activeSurvivalBars', label: '生存條顯示', labelEN: 'Survival Bars', description: '顯示飢餓/口渴等生存指標', icon: <Shield size={14} /> },
];

export function DifficultyPage() {
  const { activeSave, updateDifficulty, addNotification, pushHistory } = useStore();
  if (!activeSave) return null;
  const diff = activeSave.playerState.difficulty;

  const applyPreset = (preset: typeof PRESETS[0]) => {
    pushHistory('難度預設');
    updateDifficulty(preset.values as Partial<DifficultySettings>);
    addNotification(`已套用難度預設: ${preset.label}`, 'success');
  };

  const getBarColor = (value: number, inverted = false) => {
    const v = inverted ? 1 / value : value;
    if (v <= 0.5) return '#10b981';
    if (v <= 1.0) return '#3b82f6';
    if (v <= 2.0) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">難度設定 <span className="text-xs text-nms-text-muted font-normal">Difficulty Settings</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">精細調整 25+ 項遊戲難度參數，或套用預設組合</p>
        </div>
        <button
          onClick={() => { pushHistory('重置難度'); updateDifficulty(PRESETS[1].values as Partial<DifficultySettings>); addNotification('已重置為預設', 'info'); }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-card border border-nms-border text-nms-text-dim text-xs hover:bg-nms-hover transition-colors"
        >
          <RotateCcw size={12} /> 重置預設
        </button>
      </div>

      {/* Presets */}
      <div className="grid grid-cols-4 gap-3">
        {PRESETS.map(preset => (
          <button
            key={preset.label}
            onClick={() => applyPreset(preset)}
            className={`px-4 py-3 rounded-xl border text-center transition-all hover:scale-[1.02] active:scale-[0.98] ${preset.color}`}
          >
            <div className="text-sm font-bold">{preset.label}</div>
            <div className="text-[10px] opacity-70">{preset.labelEN}</div>
          </button>
        ))}
      </div>

      {/* Death consequences special */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Skull size={16} className="text-nms-red" />
            <div>
              <div className="text-sm font-medium text-nms-text">死亡懲罰</div>
              <div className="text-[10px] text-nms-text-muted">Death Consequences</div>
            </div>
          </div>
          <div className="text-sm font-bold text-nms-text">
            {['無懲罰', '輕微 (掉落物品)', '嚴厲 (損壞裝備)', '永久死亡'][diff.deathConsequences]}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { v: 0, label: '無懲罰', labelEN: 'None', color: 'border-nms-green/40 text-nms-green' },
            { v: 1, label: '輕微', labelEN: 'Mild', color: 'border-nms-accent/40 text-nms-accent' },
            { v: 2, label: '嚴厲', labelEN: 'Harsh', color: 'border-nms-orange/40 text-nms-orange' },
            { v: 3, label: '永久死亡', labelEN: 'Permadeath', color: 'border-nms-red/40 text-nms-red' },
          ].map(opt => (
            <button
              key={opt.v}
              onClick={() => { pushHistory('死亡懲罰'); updateDifficulty({ deathConsequences: opt.v }); }}
              className={`p-2 rounded-lg border text-center text-xs transition-all ${
                diff.deathConsequences === opt.v
                  ? `${opt.color} bg-nms-bg`
                  : 'border-nms-border text-nms-text-muted hover:border-nms-text-muted/40'
              }`}
            >
              <div className="font-medium">{opt.label}</div>
              <div className="text-[9px] opacity-60">{opt.labelEN}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stack limits */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package size={16} className="text-nms-accent" />
            <div>
              <div className="text-sm font-medium text-nms-text">背包堆疊上限</div>
              <div className="text-[10px] text-nms-text-muted">Inventory Stack Limits</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {[
            { v: 0, label: '嚴格', labelEN: 'Low', desc: '堆疊上限較低', color: 'border-nms-red/40 text-nms-red' },
            { v: 1, label: '正常', labelEN: 'Normal', desc: '標準堆疊上限', color: 'border-nms-accent/40 text-nms-accent' },
            { v: 2, label: '寬裕', labelEN: 'High', desc: '堆疊上限最大', color: 'border-nms-green/40 text-nms-green' },
          ].map(opt => (
            <button
              key={opt.v}
              onClick={() => { pushHistory('堆疊上限'); updateDifficulty({ inventoryStackLimits: opt.v }); }}
              className={`p-3 rounded-lg border text-center transition-all ${
                diff.inventoryStackLimits === opt.v
                  ? `${opt.color} bg-nms-bg`
                  : 'border-nms-border text-nms-text-muted hover:border-nms-text-muted/40'
              }`}
            >
              <div className="text-sm font-medium">{opt.label}</div>
              <div className="text-[9px] opacity-60">{opt.labelEN}</div>
              <div className="text-[9px] opacity-40 mt-0.5">{opt.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sliders size={16} className="text-nms-accent" />
          <span className="text-sm font-bold text-nms-text">數值微調</span>
          <span className="text-xs text-nms-text-muted">Fine-tune Values</span>
        </div>
        <div className="space-y-4">
          {sliders.map(s => {
            const value = diff[s.key] as number;
            const isDefault = Math.abs(value - 1.0) < 0.05;
            const percent = ((value - s.min) / (s.max - s.min)) * 100;
            return (
              <div key={s.key} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className={s.color}>{s.icon}</span>
                    <span className="text-xs text-nms-text">{s.label}</span>
                    <span className="text-[9px] text-nms-text-muted">{s.labelEN}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold ${isDefault ? 'text-nms-text-dim' : s.color}`}>
                      {s.format ? s.format(value) : value.toFixed(1)}
                    </span>
                    {!isDefault && (
                      <button
                        onClick={() => updateDifficulty({ [s.key]: s.key === 'breakTechOnDamage' ? 0.1 : 1.0 } as Partial<DifficultySettings>)}
                        className="text-[8px] px-1 py-0.5 rounded bg-nms-bg text-nms-text-muted hover:text-nms-text opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        重置
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[8px] text-nms-text-muted w-6 text-right">{s.min}</span>
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 h-1.5 top-1/2 -translate-y-1/2 bg-nms-bg rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-200"
                        style={{ width: `${percent}%`, background: getBarColor(value, s.key === 'substanceCollection' || s.key === 'scannerRecharge' || s.key === 'reputationGain') }}
                      />
                    </div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={value}
                      onChange={(e) => updateDifficulty({ [s.key]: parseFloat(e.target.value) } as Partial<DifficultySettings>)}
                      className="relative w-full z-10 opacity-0 cursor-pointer h-6"
                    />
                  </div>
                  <span className="text-[8px] text-nms-text-muted w-6">{s.max}</span>
                </div>
                <div className="text-[9px] text-nms-text-muted/60 mt-0.5 ml-8">{s.description}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="bg-nms-card border border-nms-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <ToggleLeft size={16} className="text-nms-green" />
          <span className="text-sm font-bold text-nms-text">功能開關</span>
          <span className="text-xs text-nms-text-muted">Feature Toggles</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {toggles.map(t => {
            const value = diff[t.key] as boolean;
            return (
              <button
                key={t.key}
                onClick={() => {
                  pushHistory(t.label);
                  updateDifficulty({ [t.key]: !value } as Partial<DifficultySettings>);
                }}
                className="flex items-center justify-between p-3 rounded-lg bg-nms-bg hover:bg-nms-hover transition-colors text-left group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-nms-text-muted group-hover:text-nms-text transition-colors">{t.icon}</span>
                  <div>
                    <div className="text-xs text-nms-text">{t.label} <span className="text-nms-text-muted">{t.labelEN}</span></div>
                    <div className="text-[9px] text-nms-text-muted/60">{t.description}</div>
                  </div>
                </div>
                {value ? (
                  <ToggleRight size={20} className="text-nms-green flex-shrink-0" />
                ) : (
                  <ToggleLeft size={20} className="text-nms-text-muted/40 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
