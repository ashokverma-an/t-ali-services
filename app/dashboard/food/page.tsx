'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { UtensilsCrossed, MapPin, Clock, DollarSign, Star } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function FoodPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      loadOrders()
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const loadOrders = () => {
    const mockOrders = [
      { 
        id: 1, 
        restaurant: 'Pizza Palace', 
        items: ['Margherita Pizza', 'Caesar Salad'], 
        date: '2024-01-15', 
        time: '7:30 PM', 
        total: '$31.48', 
        status: 'delivered',
        address: '123 Main St',
        rating: 5
      },
      { 
        id: 2, 
        restaurant: 'Burger House', 
        items: ['Classic Burger', 'Fries'], 
        date: '2024-01-14', 
        time: '12:45 PM', 
        total: '$18.99', 
        status: 'delivered',
        address: '456 Oak Ave',
        rating: 4
      },
      { 
        id: 3, 
        restaurant: 'Sushi Express', 
        items: ['California Roll', 'Miso Soup'], 
        date: '2024-01-13', 
        time: '6:15 PM', 
        total: '$13.98', 
        status: 'cancelled',
        address: '789 Pine St',
        rating: null
      },
      { 
        id: 4, 
        restaurant: 'Thai Garden', 
        items: ['Pad Thai', 'Spring Rolls'], 
        date: '2024-01-12', 
        time: '8:20 PM', 
        total: '$24.50', 
        status: 'delivered',
        address: '321 Elm Ave',
        rating: 5
      }
    ]
    setOrders(mockOrders)
  }

  if (!user) {
    return <LoadingSpinner />
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100'
      case 'cancelled': return 'text-red-600 bg-red-100'
      case 'preparing': return 'text-yellow-600 bg-yellow-100'
      case 'on_the_way': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-uber-black">My Food Orders</h1>
            <p className="text-gray-600 mt-2">View your order history and reorder favorites</p>
          </div>
          <Button onClick={() => router.push('/services/food')}>
            Order Food
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Order History</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {orders.map((order) => (
              <div key={order.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <UtensilsCrossed className="w-6 h-6 text-red-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{order.restaurant}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {order.items.join(', ')}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{order.address}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-4 mb-2">
                      <span className="text-sm text-gray-600">{order.date} • {order.time}</span>
                      <span className="font-semibold text-gray-900">{order.total}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                      </span>
                      {order.rating && (
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{order.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-3">
                  <Button size="sm" variant="outline">
                    Reorder
                  </Button>
                  {order.status === 'delivered' && !order.rating && (
                    <Button size="sm" variant="outline">
                      Rate Order
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}