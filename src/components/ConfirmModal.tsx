import { useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({ open, title, message, confirmLabel = '確認', cancelLabel = '取消', variant = 'danger', onConfirm, onCancel }: ConfirmModalProps) {
  if (!open) return null;

  const variantStyles = {
    danger: { icon: 'text-nms-red bg-nms-red/10', btn: 'bg-nms-red hover:bg-nms-red/80' },
    warning: { icon: 'text-nms-gold bg-nms-gold/10', btn: 'bg-nms-gold hover:bg-nms-gold/80' },
    info: { icon: 'text-nms-accent bg-nms-accent/10', btn: 'bg-nms-accent hover:bg-nms-accent/80' },
  };
  const style = variantStyles[variant];

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center" onClick={onCancel}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm bg-nms-panel border border-nms-border rounded-xl shadow-2xl p-6 animate-fadeIn"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onCancel} className="absolute top-3 right-3 text-nms-text-muted hover:text-nms-text transition-colors">
          <X size={16} />
        </button>
        <div className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center mb-3`}>
          <AlertTriangle size={20} />
        </div>
        <h3 className="text-base font-bold text-nms-text mb-1">{title}</h3>
        <p className="text-xs text-nms-text-muted mb-5">{message}</p>
        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 rounded-lg bg-nms-card border border-nms-border text-sm text-nms-text-dim hover:bg-nms-hover transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2 rounded-lg ${style.btn} text-sm text-white font-medium transition-colors`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export function useConfirm() {
  const [state, setState] = useState<{
    open: boolean;
    title: string;
    message: string;
    variant: 'danger' | 'warning' | 'info';
    resolve: ((v: boolean) => void) | null;
  }>({
    open: false, title: '', message: '', variant: 'danger', resolve: null,
  });

  const confirm = (title: string, message: string, variant: 'danger' | 'warning' | 'info' = 'danger'): Promise<boolean> => {
    return new Promise(resolve => {
      setState({ open: true, title, message, variant, resolve });
    });
  };

  const handleConfirm = () => {
    state.resolve?.(true);
    setState(s => ({ ...s, open: false }));
  };

  const handleCancel = () => {
    state.resolve?.(false);
    setState(s => ({ ...s, open: false }));
  };

  const modal = (
    <ConfirmModal
      open={state.open}
      title={state.title}
      message={state.message}
      variant={state.variant}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );

  return { confirm, modal };
}
