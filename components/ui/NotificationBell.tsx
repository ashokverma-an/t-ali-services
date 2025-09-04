'use client'

import { useState, useEffect } from 'react'
import { Bell, X } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'

export default function NotificationBell() {
  const [showNotifications, setShowNotifications] = useState(false)
  const { notifications, unreadCount, markAsRead, markAllAsRead, requestPermission } = useNotifications()

  useEffect(() => {
    requestPermission()
  }, [])

  const formatTime = (date: Date) => {
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setShowNotifications(!showNotifications)}
        className="p-2 rounded-lg hover:bg-gray-100 relative"
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs text-white font-medium">{unreadCount}</span>
          </div>
        )}
      </button>

      {showNotifications && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            <button 
              onClick={() => setShowNotifications(false)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                      <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                      <span className="text-xs text-gray-500 mt-2 block">{formatTime(notification.timestamp)}</span>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="p-3 border-t border-gray-200 flex space-x-2">
            <button 
              onClick={markAllAsRead}
              className="text-uber-green text-sm hover:text-green-600 flex-1 text-center"
            >
              Mark All Read
            </button>
            <button 
              onClick={() => window.location.href = '/notifications'}
              className="text-uber-green text-sm hover:text-green-600 flex-1 text-center"
            >
              View All
            </button>
          </div>
        </div>
      )}
    </div>
  )
}