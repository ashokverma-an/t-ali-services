'use client'

import { useState, useEffect } from 'react'
import { Wifi, WifiOff } from 'lucide-react'

export default function ConnectionStatus() {
  const [isOnline, setIsOnline] = useState(true)
  const [showStatus, setShowStatus] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowStatus(true)
      setTimeout(() => setShowStatus(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowStatus(true)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (!showStatus) return null

  return (
    <div className={`fixed bottom-4 left-4 z-50 px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 ${
      isOnline ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`}>
      {isOnline ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
      <span className="text-sm font-medium">
        {isOnline ? 'Back online' : 'No internet connection'}
      </span>
    </div>
  )
}