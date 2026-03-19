import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  subtext?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, icon, color = 'text-nms-accent', subtext, onClick }: StatCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-nms-card border border-nms-border rounded-xl p-4 flex items-start gap-3 transition-all duration-200 ${onClick ? 'cursor-pointer hover:border-nms-accent/40 hover:bg-nms-hover' : ''}`}
    >
      <div className={`p-2 rounded-lg bg-nms-bg ${color}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs text-nms-text-muted mb-0.5">{label}</div>
        <div className="text-lg font-bold text-nms-text truncate">{typeof value === 'number' ? value.toLocaleString() : value}</div>
        {subtext && <div className="text-[10px] text-nms-text-muted mt-0.5">{subtext}</div>}
      </div>
    </div>
  );
}
