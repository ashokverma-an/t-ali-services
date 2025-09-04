'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'
import DriverLayout from '@/components/layout/DriverLayout'
import Button from '@/components/ui/Button'

export default function DriverEarnings() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  
  const earnings = {
    today: { amount: 245, rides: 12, hours: 8.5 },
    week: { amount: 1680, rides: 89, hours: 52 },
    month: { amount: 6420, rides: 342, hours: 198 }
  }

  const dailyEarnings = [
    { day: 'Mon', amount: 180, rides: 8 },
    { day: 'Tue', amount: 220, rides: 11 },
    { day: 'Wed', amount: 195, rides: 9 },
    { day: 'Thu', amount: 275, rides: 14 },
    { day: 'Fri', amount: 310, rides: 16 },
    { day: 'Sat', amount: 255, rides: 13 },
    { day: 'Sun', amount: 245, rides: 12 }
  ]

  return (
    <DriverLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Earnings</h1>
          <div className="flex space-x-2">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <DollarSign className="w-8 h-8 text-uber-green" />
              <div className="ml-4">
                <p className="text-3xl font-bold text-uber-green">AED {earnings[selectedPeriod as keyof typeof earnings].amount}</p>
                <p className="text-gray-600">Total Earnings</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-3xl font-bold">{earnings[selectedPeriod as keyof typeof earnings].rides}</p>
                <p className="text-gray-600">Total Rides</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-3xl font-bold">{earnings[selectedPeriod as keyof typeof earnings].hours}h</p>
                <p className="text-gray-600">Online Hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6">Daily Breakdown</h2>
          <div className="space-y-4">
            {dailyEarnings.map((day, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-uber-green rounded-full flex items-center justify-center text-white font-medium">
                    {day.day}
                  </div>
                  <div>
                    <p className="font-medium">{day.rides} rides completed</p>
                    <p className="text-sm text-gray-500">Average: AED {Math.round(day.amount / day.rides)}/ride</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-uber-green">AED {day.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Earnings Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Fare</span>
                <span className="font-medium">AED 1,420</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance Bonus</span>
                <span className="font-medium">AED 180</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Bonus</span>
                <span className="font-medium">AED 80</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Total Earnings</span>
                <span className="font-bold text-uber-green">AED 1,680</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Platform Fee</span>
                <span className="text-red-600">-AED 168</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span className="text-red-600">-AED 25</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Fuel Allowance</span>
                <span className="text-green-600">+AED 50</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Net Earnings</span>
                <span className="font-bold text-uber-green">AED 1,537</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DriverLayout>
  )
}