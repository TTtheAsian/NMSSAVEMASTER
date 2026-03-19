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
          className={`animate-slideIn flex items-center gap-2 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-md min-w-64 ${
            n.type === 'success' ? 'bg-nms-green/10 border-nms-green/30 text-nms-green' :
            n.type === 'error' ? 'bg-nms-red/10 border-nms-red/30 text-nms-red' :
            'bg-nms-accent/10 border-nms-accent/30 text-nms-accent'
          }`}
        >
          {n.type === 'success' && <CheckCircle size={16} />}
          {n.type === 'error' && <XCircle size={16} />}
          {n.type === 'info' && <Info size={16} />}
          <span className="text-sm flex-1">{n.message}</span>
          <button onClick={() => removeNotification(n.id)} className="opacity-60 hover:opacity-100">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
