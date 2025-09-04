'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Package, MapPin, Clock, DollarSign, Truck } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function PackagesPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [packages, setPackages] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      loadPackages()
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const loadPackages = () => {
    const mockPackages = [
      { 
        id: 1, 
        from: '123 Main St', 
        to: '456 Oak Ave', 
        date: '2024-01-15', 
        time: '3:45 PM', 
        cost: '$12.50', 
        status: 'delivered',
        trackingId: 'PKG001',
        size: 'Small',
        weight: '2 lbs'
      },
      { 
        id: 2, 
        from: '789 Pine St', 
        to: '321 Elm Ave', 
        date: '2024-01-14', 
        time: '11:30 AM', 
        cost: '$18.75', 
        status: 'in_transit',
        trackingId: 'PKG002',
        size: 'Medium',
        weight: '5 lbs'
      },
      { 
        id: 3, 
        from: '555 Broadway', 
        to: '777 Park Ave', 
        date: '2024-01-13', 
        time: '4:20 PM', 
        cost: '$8.25', 
        status: 'cancelled',
        trackingId: 'PKG003',
        size: 'Small',
        weight: '1 lb'
      },
      { 
        id: 4, 
        from: '999 First St', 
        to: '111 Second St', 
        date: '2024-01-12', 
        time: '9:15 AM', 
        cost: '$25.00', 
        status: 'delivered',
        trackingId: 'PKG004',
        size: 'Large',
        weight: '10 lbs'
      }
    ]
    setPackages(mockPackages)
  }

  if (!user) {
    return <LoadingSpinner />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'in_transit': return 'text-blue-600 bg-blue-100'
      case 'picked_up': return 'text-yellow-600 bg-yellow-100'
      case 'pending': return 'text-gray-600 bg-gray-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return '✓'
      case 'in_transit': return '🚚'
      case 'picked_up': return '📦'
      case 'pending': return '⏳'
      default: return '📦'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-uber-black">My Packages</h1>
            <p className="text-gray-600 mt-2">Track your package deliveries and history</p>
          </div>
          <Button onClick={() => router.push('/services/package')}>
            Send Package
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Package History</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {packages.map((pkg) => (
              <div key={pkg.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <Package className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="font-medium text-gray-900">#{pkg.trackingId}</span>
                        <span className="text-sm text-gray-500">• {pkg.size} • {pkg.weight}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm text-gray-900">From: {pkg.from}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm text-gray-900">To: {pkg.to}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm text-gray-600">{pkg.date} • {pkg.time}</span>
                      <span className="font-semibold text-gray-900">{pkg.cost}</span>
                    </div>
                    <div className="flex items-center justify-end space-x-2">
                      <span className="text-lg">{getStatusIcon(pkg.status)}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pkg.status)}`}>
                        {pkg.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  {pkg.status === 'in_transit' && (
                    <Button size="sm" variant="outline">
                      <MapPin className="w-4 h-4 mr-2" />
                      Track Package
                    </Button>
                  )}
                  {pkg.status === 'delivered' && (
                    <Button size="sm" variant="outline">
                      View Receipt
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Send Similar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}