'use client'

import { Car, UtensilsCrossed, Package, TrendingUp, Clock, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DashboardOverview() {
  const stats = [
    {
      title: 'Total Rides',
      value: '24',
      change: '+12%',
      icon: Car,
      color: 'bg-blue-500'
    },
    {
      title: 'Food Orders',
      value: '18',
      change: '+8%',
      icon: UtensilsCrossed,
      color: 'bg-red-500'
    },
    {
      title: 'Packages Sent',
      value: '6',
      change: '+25%',
      icon: Package,
      color: 'bg-green-500'
    },
    {
      title: 'Total Spent',
      value: '$342',
      change: '+15%',
      icon: TrendingUp,
      color: 'bg-purple-500'
    }
  ]

  const recentActivity = [
    {
      type: 'ride',
      title: 'Ride to Downtown',
      time: '2 hours ago',
      amount: '$12.50',
      status: 'completed'
    },
    {
      type: 'food',
      title: 'Pizza Palace Order',
      time: '1 day ago',
      amount: '$24.99',
      status: 'delivered'
    },
    {
      type: 'package',
      title: 'Package to Office',
      time: '2 days ago',
      amount: '$8.75',
      status: 'delivered'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                <span className="text-green-600 text-sm font-medium">
                  {stat.change}
                </span>
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

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    activity.type === 'ride' ? 'bg-blue-100' :
                    activity.type === 'food' ? 'bg-red-100' : 'bg-green-100'
                  }`}>
                    {activity.type === 'ride' && <Car className="w-5 h-5 text-blue-600" />}
                    {activity.type === 'food' && <UtensilsCrossed className="w-5 h-5 text-red-600" />}
                    {activity.type === 'package' && <Package className="w-5 h-5 text-green-600" />}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{activity.title}</div>
                    <div className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {activity.time}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-gray-900">{activity.amount}</div>
                  <div className={`text-sm capitalize ${
                    activity.status === 'completed' || activity.status === 'delivered' 
                      ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {activity.status}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform"
        >
          <Car className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Book a Ride</h3>
          <p className="text-blue-100">Get a ride in minutes</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform"
        >
          <UtensilsCrossed className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Order Food</h3>
          <p className="text-red-100">From your favorite restaurants</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform"
        >
          <Package className="w-8 h-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Send Package</h3>
          <p className="text-green-100">Fast and secure delivery</p>
        </motion.div>
      </div>
    </div>
  )
}