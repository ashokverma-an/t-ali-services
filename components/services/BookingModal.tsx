'use client'

import { useState } from 'react'
import { X, Calendar, Clock, MapPin, CreditCard } from 'lucide-react'
import Button from '@/components/ui/Button'
import { bookingSystem } from '@/lib/realtime/BookingSystem'

interface BookingModalProps {
  isOpen?: boolean
  onClose: () => void
  provider?: {
    name: string
    service: string
    price: string
    rating: number
  }
  service?: any
}

export default function BookingModal({ isOpen = true, onClose, provider, service }: BookingModalProps) {
  const serviceData = service || provider
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [address, setAddress] = useState('')

  if (!isOpen || (!provider && !service)) return null

  const handleBooking = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    
    const booking = bookingSystem.createBooking({
      userId: user.id || Date.now().toString(),
      userName: user.name || 'Guest User',
      service: serviceData.service || serviceData.name,
      pickup: address,
      destination: 'Service Location',
      price: parseInt((serviceData.price || '100').replace(/[^0-9]/g, '')) || 100
    })
    
    alert(`✅ Booking Confirmed!\n\nBooking ID: ${booking.id}\nService: ${serviceData.service || serviceData.name}\nProvider: ${serviceData.provider || serviceData.name}\nDate: ${selectedDate}\nTime: ${selectedTime}\nStatus: Pending Driver Acceptance\n\n📱 Check Admin Panel & Driver Dashboard for real-time updates!`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Book Service</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium">{serviceData.provider || serviceData.name}</h4>
            <p className="text-sm text-gray-600">{serviceData.service || serviceData.name}</p>
            <p className="text-uber-green font-semibold">{serviceData.price}</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Select Time</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Choose time</option>
              <option value="09:00">09:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="11:00">11:00 AM</option>
              <option value="14:00">02:00 PM</option>
              <option value="15:00">03:00 PM</option>
              <option value="16:00">04:00 PM</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Service Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              className="w-full p-2 border rounded-lg"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBooking} 
              className="flex-1"
              disabled={!selectedDate || !selectedTime || !address}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}