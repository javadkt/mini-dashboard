import React, { useEffect, useState } from 'react';
import { onToast } from '../utils/events';
import './styles.css';

interface ToastItem { id: string; type: 'success' | 'error' | 'info' | 'warning'; message: string; duration: number }

export const Toasts: React.FC = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    return onToast(((e: any) => {
      const { id, type, message, duration = 2600 } = e.detail || {};
      const item: ToastItem = { id, type, message, duration };
      setToasts((prev) => [...prev, item]);
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
    }) as any);
  }, []);

  if (!toasts.length) return null;
  return (
    <div className="toast-container">
      {toasts.map((t) => (
        <div key={t.id} className={`toast ${t.type}`}>
          <div className="msg">{t.message}</div>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
