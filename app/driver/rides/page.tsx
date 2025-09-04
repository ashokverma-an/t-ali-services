'use client'

import { useState } from 'react'
import { MapPin, Clock, DollarSign, Star, Phone } from 'lucide-react'
import DriverLayout from '@/components/layout/DriverLayout'
import Button from '@/components/ui/Button'

export default function DriverRides() {
  const [activeTab, setActiveTab] = useState('active')
  
  const activeRides = [
    { id: 'R001', passenger: 'Ahmed Ali', pickup: 'Dubai Mall', destination: 'Airport', fare: 'AED 45', status: 'In Progress', time: '15 mins ago' },
    { id: 'R002', passenger: 'Sarah Khan', pickup: 'Marina Walk', destination: 'Business Bay', fare: 'AED 32', status: 'Pickup', time: '5 mins ago' }
  ]
  
  const completedRides = [
    { id: 'R003', passenger: 'Omar Hassan', pickup: 'JLT', destination: 'DIFC', fare: 'AED 28', rating: 5, time: '2 hours ago' },
    { id: 'R004', passenger: 'Fatima Ali', pickup: 'Mall of Emirates', destination: 'Dubai Marina', fare: 'AED 35', rating: 4, time: '3 hours ago' }
  ]

  return (
    <DriverLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">My Rides</h1>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active' ? 'border-uber-green text-uber-green' : 'border-transparent text-gray-500'
                }`}
              >
                Active Rides ({activeRides.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'completed' ? 'border-uber-green text-uber-green' : 'border-transparent text-gray-500'
                }`}
              >
                Completed Rides ({completedRides.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'active' && (
              <div className="space-y-4">
                {activeRides.map((ride) => (
                  <div key={ride.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-uber-green rounded-full flex items-center justify-center text-white font-medium">
                          {ride.passenger.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{ride.passenger}</h3>
                          <p className="text-sm text-gray-500">Ride ID: {ride.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1 rounded-full text-sm ${
                          ride.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {ride.status}
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{ride.time}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{ride.pickup}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{ride.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-uber-green">{ride.fare}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          Navigate
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'completed' && (
              <div className="space-y-4">
                {completedRides.map((ride) => (
                  <div key={ride.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center text-white font-medium">
                          {ride.passenger.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-medium">{ride.passenger}</h3>
                          <p className="text-sm text-gray-500">Ride ID: {ride.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{ride.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500">{ride.time}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">{ride.pickup}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">{ride.destination}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-uber-green">{ride.fare}</span>
                      <Button size="sm" variant="outline">View Details</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DriverLayout>
  )
}