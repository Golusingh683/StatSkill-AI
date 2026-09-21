import React, { createContext, useCallback, useContext, useState } from 'react'
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react'

const ToastContext = createContext(null)

let idCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const notify = useCallback((message, { type = 'info', duration = 3500 } = {}) => {
    const id = ++idCounter
    setToasts((prev) => [...prev, { id, message, type }])
    if (duration) {
      setTimeout(() => dismiss(id), duration)
    }
    return id
  }, [dismiss])

  const icons = {
    success: CheckCircle2,
    error: AlertTriangle,
    info: Info,
  }

  const styles = {
    success: 'bg-moss-600 text-white',
    error: 'bg-rust-500 text-white',
    info: 'bg-ink-800 text-white',
  }

  return (
    <ToastContext.Provider value={{ notify, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-2 sm:bottom-6 sm:right-6">
        {toasts.map((t) => {
          const Icon = icons[t.type] || Info
          return (
            <div
              key={t.id}
              role="status"
              className={`flex items-start gap-3 rounded-lg px-4 py-3 shadow-raised ${styles[t.type] || styles.info}`}
            >
              <Icon className="mt-0.5 h-4 w-4 shrink-0" />
              <p className="flex-1 text-sm leading-snug">{t.message}</p>
              <button
                onClick={() => dismiss(t.id)}
                className="shrink-0 rounded p-0.5 hover:bg-white/20"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx
}
