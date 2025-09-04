'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { toast } from '@/lib/toast'

const icons = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info
}

const colors = {
  success: 'bg-green-50 border-green-200 text-green-800',
  error: 'bg-red-50 border-red-200 text-red-800',
  warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
  info: 'bg-blue-50 border-blue-200 text-blue-800'
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<any[]>([])

  useEffect(() => {
    const unsubscribe = toast.subscribe(setToasts)
    return unsubscribe
  }, [])

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map((toastItem) => {
          const Icon = icons[toastItem.type as keyof typeof icons]
          return (
            <motion.div
              key={toastItem.id}
              initial={{ opacity: 0, x: 300, scale: 0.3 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.5 }}
              className={`max-w-sm w-full border rounded-lg p-4 shadow-lg ${colors[toastItem.type as keyof typeof colors]}`}
            >
              <div className="flex items-start">
                <Icon className="w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                <div className="flex-1">
                  <h4 className="font-medium">{toastItem.title}</h4>
                  {toastItem.description && (
                    <p className="text-sm mt-1 opacity-90">{toastItem.description}</p>
                  )}
                </div>
                <button
                  onClick={() => toast.remove(toastItem.id)}
                  className="ml-2 opacity-70 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}