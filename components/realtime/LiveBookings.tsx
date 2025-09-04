'use client'

import { useState, useEffect } from 'react'
import { bookingSystem, Booking } from '@/lib/realtime/BookingSystem'
import { eventBus } from '@/lib/realtime/EventBus'
import Button from '@/components/ui/Button'
import { Clock, MapPin, User, Car, CheckCircle } from 'lucide-react'

interface LiveBookingsProps {
  userRole: 'user' | 'driver' | 'admin'
  userId?: string
}

export default function LiveBookings({ userRole, userId }: LiveBookingsProps) {
  const [bookings, setBookings] = useState<Booking[]>([])

  useEffect(() => {
    loadBookings()

    const handleUpdate = () => loadBookings()

    eventBus.on('booking:created', handleUpdate)
    eventBus.on('booking:updated', handleUpdate)
    eventBus.on('booking:accepted', handleUpdate)

    return () => {
      eventBus.off('booking:created', handleUpdate)
      eventBus.off('booking:updated', handleUpdate)
      eventBus.off('booking:accepted', handleUpdate)
    }
  }, [userRole, userId])

  const loadBookings = () => {
    let filteredBookings: Booking[]
    
    if (userRole === 'admin') {
      filteredBookings = bookingSystem.getBookings()
    } else if (userRole === 'driver') {
      filteredBookings = bookingSystem.getBookings().filter(b => 
        b.status === 'pending' || b.driverId === userId
      )
    } else {
      filteredBookings = bookingSystem.getUserBookings(userId || '')
    }
    
    setBookings(filteredBookings.sort((a, b) => b.timestamp - a.timestamp))
  }

  const handleAcceptBooking = (bookingId: string) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    bookingSystem.acceptBooking(bookingId, user.id || 'driver1', user.name || 'Driver')
  }

  const handleUpdateStatus = (bookingId: string, status: Booking['status']) => {
    bookingSystem.updateBookingStatus(bookingId, status)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'accepted': return 'bg-blue-100 text-blue-800'
      case 'in-progress': return 'bg-purple-100 text-purple-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">
          {userRole === 'admin' ? 'Live Bookings Monitor' : 
           userRole === 'driver' ? 'Available Requests' : 'My Bookings'}
        </h3>
        <div className="text-sm text-gray-500">
          {bookings.length} active
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No bookings available
        </div>
      ) : (
        <div className="space-y-3">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-lg border p-4 shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900">#{booking.id}</div>
                  <div className="text-sm text-gray-600">{booking.service}</div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {booking.userName}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {booking.pickup}
                </div>
                {booking.driverName && (
                  <div className="flex items-center text-gray-600">
                    <Car className="w-4 h-4 mr-2" />
                    Driver: {booking.driverName}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="font-semibold text-uber-green">
                  AED {booking.price}
                </div>
                
                <div className="flex space-x-2">
                  {userRole === 'driver' && booking.status === 'pending' && (
                    <Button size="sm" onClick={() => handleAcceptBooking(booking.id)}>
                      Accept
                    </Button>
                  )}
                  
                  {userRole === 'driver' && booking.driverId === userId && booking.status === 'accepted' && (
                    <Button size="sm" onClick={() => handleUpdateStatus(booking.id, 'in-progress')}>
                      Start
                    </Button>
                  )}
                  
                  {userRole === 'driver' && booking.driverId === userId && booking.status === 'in-progress' && (
                    <Button size="sm" onClick={() => handleUpdateStatus(booking.id, 'completed')}>
                      Complete
                    </Button>
                  )}
                  
                  {userRole === 'admin' && (
                    <select 
                      value={booking.status}
                      onChange={(e) => handleUpdateStatus(booking.id, e.target.value as Booking['status'])}
                      className="text-xs border rounded px-2 py-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="accepted">Accepted</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}