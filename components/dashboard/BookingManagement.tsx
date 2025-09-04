'use client'

import { useState, useEffect } from 'react'
import { Car, Package, UtensilsCrossed, Clock, CheckCircle, XCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/lib/useTranslation'
import { toast } from '@/lib/toast'

export default function BookingManagement() {
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      loadBookings(JSON.parse(userData).role)
    }
  }, [])

  const loadBookings = (role: string) => {
    const mockBookings = [
      { id: 1, type: 'ride', status: 'pending', customer: 'John Doe', amount: '$25.50', time: '10:30 AM' },
      { id: 2, type: 'food', status: 'in_progress', customer: 'Jane Smith', amount: '$18.75', time: '11:15 AM' },
      { id: 3, type: 'package', status: 'completed', customer: 'Mike Johnson', amount: '$12.00', time: '09:45 AM' },
      { id: 4, type: 'ride', status: 'cancelled', customer: 'Sarah Wilson', amount: '$30.25', time: '12:00 PM' }
    ]
    setBookings(mockBookings)
  }

  const updateBookingStatus = (id: number, newStatus: string) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status: newStatus } : booking
    ))
    
    const statusMessages = {
      'in_progress': 'Booking accepted and in progress',
      'completed': 'Booking completed successfully',
      'cancelled': 'Booking has been cancelled'
    }
    
    if ((statusMessages as any)[newStatus]) {
      toast.success('Status Updated!', { description: (statusMessages as any)[newStatus] })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      case 'completed': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getServiceIcon = (type: string) => {
    switch (type) {
      case 'ride': return <Car className="w-4 h-4" />
      case 'food': return <UtensilsCrossed className="w-4 h-4" />
      case 'package': return <Package className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-uber-black">
          {user?.role === 'admin' ? 'All Bookings' : user?.role === 'driver' ? 'My Assignments' : 'My Bookings'}
        </h2>
        {user?.role === 'user' && (
          <Button>New Booking</Button>
        )}
      </div>

      <div className="grid gap-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getServiceIcon(booking.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{booking.customer}</h3>
                  <p className="text-sm text-gray-600 capitalize">{booking.type} Service</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.replace('_', ' ')}
                </span>
                <span className="font-semibold text-uber-black">{booking.amount}</span>
                <span className="text-sm text-gray-500">{booking.time}</span>
                
                {(user?.role === 'admin' || user?.role === 'driver') && booking.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      onClick={() => updateBookingStatus(booking.id, 'in_progress')}
                    >
                      Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                    >
                      Decline
                    </Button>
                  </div>
                )}
                
                {user?.role === 'driver' && booking.status === 'in_progress' && (
                  <Button 
                    size="sm"
                    onClick={() => updateBookingStatus(booking.id, 'completed')}
                  >
                    Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}