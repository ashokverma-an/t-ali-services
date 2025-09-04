'use client'

import { useState, useEffect } from 'react'
import { 
  Users, 
  Car, 
  UtensilsCrossed, 
  Package, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Clock,
  MapPin,
  Star
} from 'lucide-react'
import { motion } from 'framer-motion'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeDrivers: 0,
    totalBookings: 0,
    revenue: 0,
    rideBookings: 0,
    foodOrders: 0,
    packageDeliveries: 0
  })

  const [recentBookings, setRecentBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    // Mock data for admin dashboard
    const mockUsers = [
      { id: 1, role: 'user', isActive: true },
      { id: 2, role: 'driver', isActive: true },
      { id: 3, role: 'user', isActive: true },
      { id: 4, role: 'driver', isActive: false },
      { id: 5, role: 'user', isActive: true }
    ]
    
    const mockBookings = [
      { _id: 1, serviceType: 'ride', status: 'completed', pricing: { total: 25.50 }, pickup: { address: '123 Main St, Downtown' } },
      { _id: 2, serviceType: 'food', status: 'in_progress', pricing: { total: 18.75 }, pickup: { address: 'Pizza Palace Restaurant' } },
      { _id: 3, serviceType: 'package', status: 'pending', pricing: { total: 12.00 }, pickup: { address: '456 Oak Ave, Uptown' } },
      { _id: 4, serviceType: 'ride', status: 'completed', pricing: { total: 32.25 }, pickup: { address: '789 Pine St, Midtown' } },
      { _id: 5, serviceType: 'food', status: 'completed', pricing: { total: 24.50 }, pickup: { address: 'Burger House Kitchen' } }
    ]

    // Calculate stats
    const totalUsers = mockUsers.length * 247 // Simulate larger user base
    const activeDrivers = mockUsers.filter(u => u.role === 'driver' && u.isActive).length * 89
    const totalBookings = mockBookings.length * 156
    const revenue = mockBookings.reduce((sum, booking) => sum + booking.pricing.total, 0) * 234
    const rideBookings = mockBookings.filter(b => b.serviceType === 'ride').length * 98
    const foodOrders = mockBookings.filter(b => b.serviceType === 'food').length * 76
    const packageDeliveries = mockBookings.filter(b => b.serviceType === 'package').length * 43

    setStats({
      totalUsers,
      activeDrivers,
      totalBookings,
      revenue,
      rideBookings,
      foodOrders,
      packageDeliveries
    })

    setRecentBookings(mockBookings)
    setLoading(false)
  }

  const dashboardStats = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      change: '+12%',
      changeType: 'increase',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Drivers',
      value: stats.activeDrivers.toLocaleString(),
      change: '+8%',
      changeType: 'increase',
      icon: Car,
      color: 'bg-green-500'
    },
    {
      title: 'Total Bookings',
      value: stats.totalBookings.toLocaleString(),
      change: '+15%',
      changeType: 'increase',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: `$${stats.revenue.toLocaleString()}`,
      change: '+22%',
      changeType: 'increase',
      icon: DollarSign,
      color: 'bg-yellow-500'
    }
  ]

  const serviceStats = [
    {
      title: 'Ride Bookings',
      value: stats.rideBookings,
      icon: Car,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Food Orders',
      value: stats.foodOrders,
      icon: UtensilsCrossed,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    {
      title: 'Package Deliveries',
      value: stats.packageDeliveries,
      icon: Package,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.changeType === 'increase' ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>{stat.change}</span>
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm">
                {stat.title}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Service Breakdown */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
            <div className="space-y-4">
              {recentBookings.map((booking: any, index) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      booking.serviceType === 'ride' ? 'bg-blue-100' :
                      booking.serviceType === 'food' ? 'bg-red-100' : 'bg-green-100'
                    }`}>
                      {booking.serviceType === 'ride' && <Car className="w-5 h-5 text-blue-600" />}
                      {booking.serviceType === 'food' && <UtensilsCrossed className="w-5 h-5 text-red-600" />}
                      {booking.serviceType === 'package' && <Package className="w-5 h-5 text-green-600" />}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {booking.serviceType === 'ride' ? 'Ride Booking' :
                         booking.serviceType === 'food' ? 'Food Order' : 'Package Delivery'}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {booking.pickup?.address?.substring(0, 30)}...
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">
                      ${booking.pricing?.total?.toFixed(2) || '0.00'}
                    </div>
                    <div className={`text-sm capitalize ${
                      booking.status === 'completed' ? 'text-green-600' :
                      booking.status === 'in_progress' ? 'text-blue-600' :
                      booking.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {booking.status}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Service Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Breakdown</h3>
            <div className="space-y-4">
              {serviceStats.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 ${service.bgColor} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${service.color}`} />
                      </div>
                      <span className="font-medium text-gray-900">{service.title}</span>
                    </div>
                    <span className="text-2xl font-bold text-gray-900">{service.value}</span>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Add New Driver</div>
                <div className="text-sm text-gray-500">Onboard a new driver to the platform</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">View Reports</div>
                <div className="text-sm text-gray-500">Generate detailed analytics reports</div>
              </button>
              <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="font-medium text-gray-900">Manage Promotions</div>
                <div className="text-sm text-gray-500">Create and manage promotional campaigns</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}