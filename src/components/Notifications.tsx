import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Notifications() {
  const { notifications, removeNotification } = useStore();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 space-y-2">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`animate-slideIn flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-xl glass min-w-72 ${
            n.type === 'success' ? 'border-nms-green/25 text-nms-green' :
            n.type === 'error' ? 'border-nms-red/25 text-nms-red' :
            'border-nms-accent/25 text-nms-accent'
          }`}
        >
          {n.type === 'success' && <CheckCircle size={15} />}
          {n.type === 'error' && <XCircle size={15} />}
          {n.type === 'info' && <Info size={15} />}
          <span className="text-[12px] flex-1 font-medium">{n.message}</span>
          <button onClick={() => removeNotification(n.id)} className="opacity-40 hover:opacity-100 transition-opacity">
            <X size={13} />
          </button>
        </div>
      ))}
    </div>
  );
}
