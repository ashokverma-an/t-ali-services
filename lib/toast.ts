type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastOptions {
  title?: string
  description?: string
  duration?: number
}

class ToastManager {
  private toasts: Array<{
    id: string
    type: ToastType
    title: string
    description?: string
    duration: number
    timestamp: number
  }> = []

  private listeners: Array<(toasts: typeof this.toasts) => void> = []

  subscribe(listener: (toasts: typeof this.toasts) => void) {
    this.listeners.push(listener)
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener)
    }
  }

  private notify() {
    this.listeners.forEach(listener => listener([...this.toasts]))
  }

  private addToast(type: ToastType, title: string, options: ToastOptions = {}) {
    const id = Math.random().toString(36).substring(2)
    const toast = {
      id,
      type,
      title,
      description: options.description,
      duration: options.duration || 5000,
      timestamp: Date.now()
    }

    this.toasts.push(toast)
    this.notify()

    setTimeout(() => {
      this.remove(id)
    }, toast.duration)

    return id
  }

  success(title: string, options?: ToastOptions) {
    return this.addToast('success', title, options)
  }

  error(title: string, options?: ToastOptions) {
    return this.addToast('error', title, options)
  }

  warning(title: string, options?: ToastOptions) {
    return this.addToast('warning', title, options)
  }

  info(title: string, options?: ToastOptions) {
    return this.addToast('info', title, options)
  }

  remove(id: string) {
    this.toasts = this.toasts.filter(toast => toast.id !== id)
    this.notify()
  }
}

export const toast = new ToastManager()