'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Car, MapPin, Clock, DollarSign, Star } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function RidesPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [rides, setRides] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      loadRides()
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const loadRides = () => {
    const mockRides = [
      { id: 1, from: '123 Main St', to: '456 Oak Ave', date: '2024-01-15', time: '2:30 PM', fare: '$18.50', status: 'completed', driver: 'John D.', rating: 5 },
      { id: 2, from: '789 Pine St', to: '321 Elm Ave', date: '2024-01-14', time: '10:15 AM', fare: '$22.75', status: 'completed', driver: 'Sarah M.', rating: 4 },
      { id: 3, from: '555 Broadway', to: '777 Park Ave', date: '2024-01-13', time: '6:45 PM', fare: '$15.25', status: 'cancelled', driver: null, rating: null },
      { id: 4, from: '999 First St', to: '111 Second St', date: '2024-01-12', time: '1:20 PM', fare: '$28.90', status: 'completed', driver: 'Mike R.', rating: 5 }
    ]
    setRides(mockRides)
  }

  if (!user) {
    return <LoadingSpinner />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'in_progress': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-uber-black">My Rides</h1>
            <p className="text-gray-600 mt-2">View your ride history and details</p>
          </div>
          <Button onClick={() => router.push('/services/ride')}>
            Book New Ride
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Ride History</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {rides.map((ride) => (
              <div key={ride.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-uber-green/10 rounded-lg">
                      <Car className="w-6 h-6 text-uber-green" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-900">{ride.from}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-900">{ride.to}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm text-gray-600">{ride.date} • {ride.time}</span>
                      <span className="font-semibold text-gray-900">{ride.fare}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
                        {ride.status}
                      </span>
                      {ride.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{ride.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {ride.driver && (
                  <div className="mt-3 text-sm text-gray-600">
                    Driver: {ride.driver}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}