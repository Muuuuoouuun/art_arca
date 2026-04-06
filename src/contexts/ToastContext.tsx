"use client";

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  ReactNode,
} from "react";

export type ToastType = "success" | "error" | "info";

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

type Action = { type: "ADD"; toast: ToastItem } | { type: "REMOVE"; id: string };

interface ToastContextValue {
  toasts: ToastItem[];
  toast: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

function reducer(state: ToastItem[], action: Action): ToastItem[] {
  switch (action.type) {
    case "ADD":
      return [...state.slice(-3), action.toast]; // max 4 toasts
    case "REMOVE":
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
}

const TYPE_ICON: Record<ToastType, ReactNode> = {
  success: (
    <svg width={14} height={14} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} fill="none">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width={14} height={14} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} fill="none">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  ),
  info: (
    <svg width={14} height={14} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} fill="none">
      <circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" />
    </svg>
  ),
};

const TYPE_STYLE: Record<ToastType, string> = {
  success: "bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900",
  error: "bg-red-700 text-white",
  info: "bg-stone-700 text-white dark:bg-stone-200 dark:text-stone-900",
};

function ToastContainer({
  toasts,
  dismiss,
}: {
  toasts: ToastItem[];
  dismiss: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center pointer-events-none w-full max-w-sm px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto w-full px-5 py-3.5 text-[10px] uppercase tracking-[0.18em] flex items-center gap-3 shadow-xl animate-toast-in ${TYPE_STYLE[t.type]}`}
        >
          <span className="flex-shrink-0">{TYPE_ICON[t.type]}</span>
          <span className="flex-1">{t.message}</span>
          <button
            onClick={() => dismiss(t.id)}
            className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity ml-1"
            aria-label="닫기"
          >
            <svg width={12} height={12} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} fill="none">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, dispatch] = useReducer(reducer, []);

  const toast = useCallback((message: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).slice(2);
    dispatch({ type: "ADD", toast: { id, message, type } });
    setTimeout(() => dispatch({ type: "REMOVE", id }), 3200);
  }, []);

  const dismiss = useCallback((id: string) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
