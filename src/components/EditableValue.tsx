import { useState, useRef, useEffect } from 'react';

interface EditableValueProps {
  value: number;
  max?: number;
  min?: number;
  label: string;
  color?: string;
  showBar?: boolean;
  onChange: (value: number) => void;
  formatDisplay?: (value: number) => string;
}

export function EditableValue({
  value, max = 9999, min = 0, label, color = 'text-nms-accent',
  showBar = false, onChange, formatDisplay
}: EditableValueProps) {
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setTempValue(value.toString());
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
      }, 0);
    }
  }, [editing, value]);

  const commit = () => {
    const num = Math.max(min, Math.min(max, Number(tempValue) || 0));
    onChange(num);
    setEditing(false);
  };

  const barPercent = max > 0 ? Math.min(100, (value / max) * 100) : 0;

  return (
    <div className="group">
      <div className="text-[10px] text-nms-text-muted mb-0.5">{label}</div>
      {editing ? (
        <input
          ref={inputRef}
          type="number"
          value={tempValue}
          min={min}
          max={max}
          onChange={e => setTempValue(e.target.value)}
          onBlur={commit}
          onKeyDown={e => {
            if (e.key === 'Enter') commit();
            if (e.key === 'Escape') setEditing(false);
          }}
          className="w-full bg-nms-bg border border-nms-accent rounded px-2 py-0.5 text-sm font-bold text-nms-text outline-none"
        />
      ) : (
        <div
          onClick={() => setEditing(true)}
          className={`text-lg font-bold ${color} cursor-pointer hover:opacity-80 transition-opacity flex items-center gap-1`}
          title="點擊編輯"
        >
          {formatDisplay ? formatDisplay(value) : value.toLocaleString()}
          <span className="opacity-0 group-hover:opacity-50 text-[9px] text-nms-text-muted transition-opacity">✎</span>
        </div>
      )}
      {showBar && (
        <div className="mt-1 h-1 bg-nms-bg rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${barPercent}%`,
              background: barPercent > 70 ? '#10b981' : barPercent > 30 ? '#f59e0b' : '#ef4444',
            }}
          />
        </div>
      )}
    </div>
  );
}
