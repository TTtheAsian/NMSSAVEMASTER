import { Edit3, Wrench, Plus } from 'lucide-react';
import { useStore } from '../store/useStore';
import { InventoryGrid } from '../components/InventoryGrid';
import { SeedEditor } from '../components/SeedEditor';
import { useState } from 'react';

const vehicleIcons: Record<string, string> = {
  Nomad: '🏜️', Roamer: '🚙', Colossus: '🚛', Nauticlon: '🐙', Minotaur: '🤖', Pilgrim: '🏍️',
};

const vehicleDesc: Record<string, string> = {
  Nomad: '氣墊車 - 快速穿越各種地形',
  Roamer: '巡遊車 - 全能型探索載具',
  Colossus: '巨像 - 超大容量運輸載具',
  Nauticlon: '鸚鵡螺 - 水下探索潛艇',
  Minotaur: '牛頭人 - 重裝機甲戰鬥載具',
  Pilgrim: '朝聖者 - 高速越野摩托',
};

export function VehiclesPage() {
  const { activeSave, updateVehicle, addNotification } = useStore();
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);

  if (!activeSave) return null;
  const vehicles = activeSave.playerState.vehicles;
  const active = vehicles.find(v => v.id === selectedVehicle) ?? vehicles[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-nms-text">載具管理 <span className="text-xs text-nms-text-muted font-normal">Vehicle Management</span></h2>
          <p className="text-xs text-nms-text-muted mt-1">管理所有陸地載具與水下潛艇</p>
        </div>
        <button onClick={() => addNotification('新增載具功能開發中...', 'info')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-green/10 border border-nms-green/30 text-nms-green text-xs font-medium hover:bg-nms-green/20 transition-colors">
          <Plus size={12} /> 新增載具
        </button>
      </div>

      {/* Vehicle grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {vehicles.map(vehicle => (
          <button
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle.id)}
            className={`bg-nms-card border rounded-xl p-4 text-left transition-all ${active?.id === vehicle.id ? 'border-nms-green/50 ring-1 ring-nms-green/20' : 'border-nms-border hover:border-nms-green/20'}`}
          >
            <div className="text-2xl mb-2">{vehicleIcons[vehicle.type]}</div>
            <div className="text-sm font-bold text-nms-text">{vehicle.name}</div>
            <div className="text-[10px] text-nms-text-muted">{vehicle.type}</div>
            <div className="text-[10px] text-nms-text-muted mt-1">{vehicle.inventory.usedSlots}/{vehicle.inventory.maxSlots} slots</div>
          </button>
        ))}
      </div>

      {/* Detail */}
      {active && (
        <div className="bg-nms-card border border-nms-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-nms-border">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{vehicleIcons[active.type]}</span>
              <div>
                {editingName ? (
                  <input
                    defaultValue={active.name}
                    autoFocus
                    onBlur={(e) => { updateVehicle(active.id, { name: e.target.value }); setEditingName(false); }}
                    onKeyDown={(e) => { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }}
                    className="bg-nms-bg border border-nms-green rounded px-2 py-0.5 text-sm font-bold text-nms-text outline-none"
                  />
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-nms-text">{active.name}</span>
                    <button onClick={() => setEditingName(true)} className="text-nms-text-muted hover:text-nms-green"><Edit3 size={12} /></button>
                  </div>
                )}
                <div className="text-[10px] text-nms-text-muted mb-0.5">{vehicleDesc[active.type]}</div>
                <SeedEditor seed={active.seed} onSeedChange={(seed) => updateVehicle(active.id, { seed })} />
              </div>
            </div>
            <button
              onClick={() => addNotification(`${active.name} 已修復`, 'success')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-nms-green/10 text-nms-green text-xs hover:bg-nms-green/20 transition-colors"
            >
              <Wrench size={12} /> 修復載具
            </button>
          </div>
          <div className="p-4">
            <InventoryGrid inventory={active.inventory} title={`${active.name} 庫存`} compact />
          </div>
        </div>
      )}
    </div>
  );
}
