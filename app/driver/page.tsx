'use client'

import { useState } from 'react'
import { Car, DollarSign, Clock, Star, MapPin, Battery } from 'lucide-react'
import DriverLayout from '@/components/layout/DriverLayout'
import Button from '@/components/ui/Button'

export default function DriverDashboard() {
  const [isOnline, setIsOnline] = useState(true)
  const [currentRide, setCurrentRide] = useState({
    id: 'R001',
    passenger: 'Ahmed Ali',
    pickup: 'Dubai Mall',
    destination: 'Dubai Airport',
    fare: 'AED 45',
    distance: '12.5 km',
    eta: '8 mins'
  })

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Driver Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-full ${isOnline ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
              <span className="font-medium">{isOnline ? 'Online' : 'Offline'}</span>
            </div>
            <Button 
              onClick={() => setIsOnline(!isOnline)}
              variant={isOnline ? 'destructive' : 'primary'}
            >
              {isOnline ? 'Go Offline' : 'Go Online'}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-uber-green" />
              <div className="ml-4">
                <p className="text-2xl font-bold">AED 245</p>
                <p className="text-gray-600">Today's Earnings</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">12</p>
                <p className="text-gray-600">Rides Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">8.5h</p>
                <p className="text-gray-600">Online Time</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Star className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-gray-600">Rating</p>
              </div>
            </div>
          </div>
        </div>

        {currentRide && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Current Ride</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-uber-green rounded-full flex items-center justify-center text-white font-medium">
                      {currentRide.passenger.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{currentRide.passenger}</p>
                      <p className="text-sm text-gray-500">Passenger</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm">{currentRide.pickup}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">{currentRide.destination}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fare</span>
                  <span className="font-semibold text-uber-green">{currentRide.fare}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance</span>
                  <span className="font-medium">{currentRide.distance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">ETA</span>
                  <span className="font-medium">{currentRide.eta}</span>
                </div>
                
                <div className="flex space-x-2 pt-4">
                  <Button className="flex-1">
                    <MapPin className="w-4 h-4 mr-2" />
                    Navigate
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Vehicle Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Battery className="w-6 h-6 text-green-500" />
              <div>
                <p className="font-medium">Fuel Level</p>
                <p className="text-sm text-gray-500">85% Full</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Car className="w-6 h-6 text-blue-500" />
              <div>
                <p className="font-medium">Vehicle</p>
                <p className="text-sm text-gray-500">Toyota Camry 2022</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-purple-500" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-sm text-gray-500">Dubai Marina</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DriverLayout>
  )
}