'use client'

import { useState, useEffect } from 'react'
import { Car, DollarSign, Clock, Star, Navigation, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/lib/useTranslation'
import { toast } from '@/lib/toast'

export default function DriverDashboard() {
  const { t } = useTranslation()
  const [isOnline, setIsOnline] = useState(false)
  const [currentRide, setCurrentRide] = useState<any>(null)
  const [earnings, setEarnings] = useState({ today: 125.50, week: 890.25, month: 3250.75 })

  useEffect(() => {
    if (isOnline) {
      // Simulate getting a ride request
      setTimeout(() => {
        setCurrentRide({
          id: 1,
          passenger: 'John Doe',
          pickup: '123 Main St',
          destination: '456 Oak Ave',
          fare: '$18.50',
          distance: '3.2 km',
          duration: '12 min'
        })
      }, 3000)
    }
  }, [isOnline])

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline)
    if (isOnline) {
      setCurrentRide(null)
    }
  }

  const acceptRide = () => {
    setCurrentRide((prev: any) => ({ ...prev, status: 'accepted' }))
    toast.success('Ride Accepted!', { description: 'Navigate to pickup location' })
  }

  const completeRide = () => {
    setEarnings(prev => ({ 
      ...prev, 
      today: prev.today + parseFloat(currentRide.fare.replace('$', ''))
    }))
    toast.success('Ride Completed!', { description: `Earned ${currentRide.fare}` })
    setCurrentRide(null)
  }

  return (
    <div className="space-y-6">
      {/* Status Toggle */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Driver Status</h2>
            <p className="text-gray-600">
              {isOnline ? 'You are online and available for rides' : 'You are offline'}
            </p>
          </div>
          <Button 
            onClick={toggleOnlineStatus}
            className={isOnline ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
          >
            {isOnline ? 'Go Offline' : 'Go Online'}
          </Button>
        </div>
      </div>

      {/* Earnings Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">${earnings.today}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">${earnings.week}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center">
            <Star className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Ride */}
      {currentRide && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {currentRide.status === 'accepted' ? 'Current Ride' : 'New Ride Request'}
            </h3>
            <span className="text-2xl font-bold text-green-600">{currentRide.fare}</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{currentRide.passenger}</p>
                <p className="text-sm text-gray-600">{currentRide.distance} • {currentRide.duration}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-900">{currentRide.pickup}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-900">{currentRide.destination}</span>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-4">
            {!currentRide.status ? (
              <>
                <Button onClick={acceptRide} className="flex-1">
                  Accept Ride
                </Button>
                <Button variant="outline" className="flex-1">
                  Decline
                </Button>
              </>
            ) : (
              <>
                <Button className="flex-1">
                  <Navigation className="w-4 h-4 mr-2" />
                  Navigate
                </Button>
                <Button variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button onClick={completeRide} className="flex-1">
                  Complete Ride
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Recent Rides */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Rides</h3>
        <div className="space-y-3">
          {[
            { passenger: 'Alice Johnson', time: '2:30 PM', fare: '$22.50', rating: 5 },
            { passenger: 'Bob Smith', time: '1:15 PM', fare: '$15.75', rating: 4 },
            { passenger: 'Carol Davis', time: '12:45 PM', fare: '$18.25', rating: 5 }
          ].map((ride, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{ride.passenger}</p>
                <p className="text-sm text-gray-600">{ride.time}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{ride.fare}</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">{ride.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}