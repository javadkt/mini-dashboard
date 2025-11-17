// Simple global event helpers for loading and toast notifications
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastPayload {
  id?: string;
  type: ToastType;
  message: string;
  duration?: number; // ms
}

export const LoadingEvent = 'app:loading';
export const ToastEvent = 'app:toast';

export function emitLoading(isLoading: boolean) {
  document.dispatchEvent(new CustomEvent(LoadingEvent, { detail: { isLoading } }));
}

export function emitToast(payload: ToastPayload) {
  const id = payload.id || Math.random().toString(36).slice(2);
  document.dispatchEvent(new CustomEvent(ToastEvent, { detail: { ...payload, id } }));
}

export type LoadingListener = (e: CustomEvent<{ isLoading: boolean }>) => void;
export type ToastListener = (e: CustomEvent<ToastPayload & { id: string }>) => void;

export function onLoading(listener: LoadingListener) {
  const handler = listener as EventListener;
  document.addEventListener(LoadingEvent, handler as EventListener);
  return () => document.removeEventListener(LoadingEvent, handler);
}

export function onToast(listener: ToastListener) {
  const handler = listener as EventListener;
  document.addEventListener(ToastEvent, handler as EventListener);
  return () => document.removeEventListener(ToastEvent, handler);
}
