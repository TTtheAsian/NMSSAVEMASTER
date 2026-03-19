import { useState } from 'react';
import { Copy, Shuffle, Check, Edit3 } from 'lucide-react';
import { useStore } from '../store/useStore';

interface SeedEditorProps {
  seed: string;
  label?: string;
  onSeedChange: (seed: string) => void;
}

export function SeedEditor({ seed, label = 'Seed', onSeedChange }: SeedEditorProps) {
  const [editing, setEditing] = useState(false);
  const [tempSeed, setTempSeed] = useState(seed);
  const [copied, setCopied] = useState(false);
  const { addNotification } = useStore();

  const randomizeSeed = () => {
    const hex = '0x' + Array.from({ length: 8 }, () =>
      Math.floor(Math.random() * 16).toString(16).toUpperCase()
    ).join('');
    onSeedChange(hex);
    setTempSeed(hex);
    addNotification(`種子碼已隨機生成: ${hex}`, 'success');
  };

  const copySeed = async () => {
    try {
      await navigator.clipboard.writeText(seed);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
      addNotification('種子碼已複製到剪貼簿', 'info');
    } catch {
      addNotification('複製失敗', 'error');
    }
  };

  const commitSeed = () => {
    if (tempSeed && tempSeed !== seed) {
      onSeedChange(tempSeed);
      addNotification(`種子碼已更新: ${tempSeed}`, 'success');
    }
    setEditing(false);
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] text-nms-text-muted">{label}:</span>
      {editing ? (
        <input
          value={tempSeed}
          onChange={e => setTempSeed(e.target.value)}
          onBlur={commitSeed}
          onKeyDown={e => {
            if (e.key === 'Enter') commitSeed();
            if (e.key === 'Escape') { setTempSeed(seed); setEditing(false); }
          }}
          autoFocus
          className="bg-nms-bg border border-nms-accent rounded px-2 py-0.5 text-xs font-mono text-nms-text outline-none w-28"
        />
      ) : (
        <span
          className="text-xs font-mono text-nms-text-dim cursor-pointer hover:text-nms-accent transition-colors"
          onClick={() => { setTempSeed(seed); setEditing(true); }}
        >
          {seed}
        </span>
      )}
      <div className="flex gap-0.5">
        {!editing && (
          <button onClick={() => { setTempSeed(seed); setEditing(true); }} className="p-1 rounded hover:bg-nms-hover text-nms-text-muted hover:text-nms-accent transition-colors" title="編輯種子碼">
            <Edit3 size={10} />
          </button>
        )}
        <button onClick={copySeed} className="p-1 rounded hover:bg-nms-hover text-nms-text-muted hover:text-nms-green transition-colors" title="複製種子碼">
          {copied ? <Check size={10} className="text-nms-green" /> : <Copy size={10} />}
        </button>
        <button onClick={randomizeSeed} className="p-1 rounded hover:bg-nms-hover text-nms-text-muted hover:text-nms-gold transition-colors" title="隨機生成">
          <Shuffle size={10} />
        </button>
      </div>
    </div>
  );
}
