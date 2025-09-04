'use client'

import { useState, useEffect } from 'react'
import { toast } from '@/lib/toast'

interface Notification {
  id: string
  title: string
  message: string
  type: 'message' | 'ride' | 'food' | 'package' | 'system'
  timestamp: Date
  read: boolean
}

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'Ride Completed', message: 'Your ride to Downtown has been completed successfully', type: 'ride', timestamp: new Date(Date.now() - 300000), read: false },
    { id: '2', title: 'Food Order Ready', message: 'Your Pizza Palace order is ready for pickup', type: 'food', timestamp: new Date(Date.now() - 600000), read: false },
    { id: '3', title: 'Package Delivered', message: 'Your package has been delivered to 123 Main St', type: 'package', timestamp: new Date(Date.now() - 900000), read: true },
    { id: '4', title: 'Driver Assigned', message: 'John D. is your driver, arriving in 5 minutes', type: 'ride', timestamp: new Date(Date.now() - 1200000), read: false },
    { id: '5', title: 'Order Confirmed', message: 'Burger House confirmed your order #BH-1234', type: 'food', timestamp: new Date(Date.now() - 1500000), read: true },
    { id: '6', title: 'Package Picked Up', message: 'Your package from Office Depot has been picked up', type: 'package', timestamp: new Date(Date.now() - 1800000), read: true },
    { id: '7', title: 'Ride Cancelled', message: 'Your ride booking has been cancelled due to no drivers', type: 'ride', timestamp: new Date(Date.now() - 2100000), read: false },
    { id: '8', title: 'Food Delivery Started', message: 'Your Sushi Express order is on the way', type: 'food', timestamp: new Date(Date.now() - 2400000), read: true },
    { id: '9', title: 'Package Update', message: 'Your package is out for delivery, ETA 2:30 PM', type: 'package', timestamp: new Date(Date.now() - 2700000), read: false },
    { id: '10', title: 'Ride Payment', message: 'Payment of $25.50 processed successfully', type: 'ride', timestamp: new Date(Date.now() - 3000000), read: true },
    { id: '11', title: 'Restaurant Busy', message: 'Thai Garden is experiencing delays, +15 min wait', type: 'food', timestamp: new Date(Date.now() - 3300000), read: false },
    { id: '12', title: 'Package Scheduled', message: 'Your package delivery is scheduled for tomorrow 10 AM', type: 'package', timestamp: new Date(Date.now() - 3600000), read: true },
    { id: '13', title: 'Driver Arrived', message: 'Your driver has arrived at the pickup location', type: 'ride', timestamp: new Date(Date.now() - 3900000), read: false },
    { id: '14', title: 'Order Refund', message: 'Refund of $18.75 processed for cancelled order', type: 'food', timestamp: new Date(Date.now() - 4200000), read: true },
    { id: '15', title: 'Package Delayed', message: 'Your package delivery is delayed due to weather', type: 'package', timestamp: new Date(Date.now() - 4500000), read: false },
    { id: '16', title: 'Ride Discount', message: 'You earned a $5 discount for your next ride!', type: 'ride', timestamp: new Date(Date.now() - 4800000), read: true },
    { id: '17', title: 'New Restaurant', message: 'Mexican Grill is now available in your area', type: 'food', timestamp: new Date(Date.now() - 5100000), read: false },
    { id: '18', title: 'Package Returned', message: 'Package returned to sender - incorrect address', type: 'package', timestamp: new Date(Date.now() - 5400000), read: true },
    { id: '19', title: 'Ride Rating', message: 'Please rate your recent ride with Sarah M.', type: 'ride', timestamp: new Date(Date.now() - 5700000), read: false },
    { id: '20', title: 'Food Promotion', message: '20% off your next order at Pizza Palace', type: 'food', timestamp: new Date(Date.now() - 6000000), read: true },
    { id: '21', title: 'Package Insurance', message: 'Your package is insured up to $500', type: 'package', timestamp: new Date(Date.now() - 6300000), read: false },
    { id: '22', title: 'Ride Surge', message: 'High demand area - surge pricing in effect', type: 'ride', timestamp: new Date(Date.now() - 6600000), read: true },
    { id: '23', title: 'Order Tracking', message: 'Track your Chinese Garden order in real-time', type: 'food', timestamp: new Date(Date.now() - 6900000), read: false },
    { id: '24', title: 'Package Signature', message: 'Signature required for your valuable package', type: 'package', timestamp: new Date(Date.now() - 7200000), read: true },
    { id: '25', title: 'Ride Feedback', message: 'Thank you for your 5-star rating!', type: 'ride', timestamp: new Date(Date.now() - 7500000), read: false }
  ])
  const [unreadCount, setUnreadCount] = useState(12)

  useEffect(() => {
    // Simulate real-time notifications
    const interval = setInterval(() => {
      const notificationTypes = [
        { type: 'message', title: 'New Message', message: 'You have a new message from John Driver' },
        { type: 'ride', title: 'Ride Update', message: 'Your driver is 2 minutes away' },
        { type: 'food', title: 'Order Ready', message: 'Your Pizza Palace order is ready for pickup' },
        { type: 'package', title: 'Package Delivered', message: 'Your package has been delivered successfully' }
      ]

      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)]
        addNotification(randomNotification as any)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const addNotification = (notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notification: Notification = {
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false,
      ...notificationData
    }

    setNotifications(prev => [notification, ...prev.slice(0, 24)]) // Keep only 25 notifications
    setUnreadCount(prev => prev + 1)

    // Show toast notification
    toast.info(notification.title, { description: notification.message })

    // Browser notification (if permission granted)
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico'
      })
    }
  }

  const addChatNotification = (senderName: string, message: string) => {
    addNotification({
      type: 'message',
      title: `New message from ${senderName}`,
      message: message.length > 50 ? message.substring(0, 50) + '...' : message
    })
  }

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
    setUnreadCount(0)
  }

  const requestPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      await Notification.requestPermission()
    }
  }

  return {
    notifications,
    unreadCount,
    addNotification,
    addChatNotification,
    markAsRead,
    markAllAsRead,
    requestPermission
  }
}