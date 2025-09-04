'use client'

import { useState } from 'react'
import { Search, MapPin, Clock, DollarSign } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'

export default function AdminBookings() {
  const [bookings] = useState([
    { id: 'BK001', user: 'Ahmed Ali', driver: 'Mohammed Ahmed', service: 'Ride', from: 'Dubai Mall', to: 'Airport', amount: 'AED 45', status: 'Completed', time: '2 hours ago' },
    { id: 'BK002', user: 'Sarah Khan', driver: 'Ali Hassan', service: 'Food Delivery', from: 'McDonald\'s', to: 'Marina Walk', amount: 'AED 28', status: 'In Progress', time: '15 mins ago' },
    { id: 'BK003', user: 'Omar Hassan', driver: 'Khalid Omar', service: 'Package', from: 'Business Bay', to: 'JLT', amount: 'AED 22', status: 'Pending', time: '5 mins ago' }
  ])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Booking Management</h1>
          <div className="flex space-x-2">
            <Button variant="outline">Export</Button>
            <Button>New Booking</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">1,089</p>
                <p className="text-gray-600">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-gray-600">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">56</p>
                <p className="text-gray-600">Cancelled</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search bookings..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Driver</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Route</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{booking.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{booking.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{booking.driver}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{booking.service}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                        {booking.from} → {booking.to}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-uber-green">{booking.amount}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{booking.time}</td>
                    <td className="px-6 py-4">
                      <Button size="sm" variant="outline">View</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}