'use client'

import { Users, Clock, Star, CheckCircle } from 'lucide-react'

interface ServiceStatsProps {
  category: string
}

export default function ServiceStats({ category }: ServiceStatsProps) {
  const stats = {
    totalProviders: Math.floor(Math.random() * 500) + 100,
    avgRating: (4.5 + Math.random() * 0.4).toFixed(1),
    completedBookings: Math.floor(Math.random() * 10000) + 5000,
    avgResponseTime: Math.floor(Math.random() * 15) + 5
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Service Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mx-auto mb-2">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.totalProviders}+</div>
          <div className="text-sm text-gray-600">Providers</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-lg mx-auto mb-2">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgRating}</div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg mx-auto mb-2">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.completedBookings.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Completed</div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mx-auto mb-2">
            <Clock className="w-6 h-6 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{stats.avgResponseTime}min</div>
          <div className="text-sm text-gray-600">Response</div>
        </div>
      </div>
    </div>
  )
}