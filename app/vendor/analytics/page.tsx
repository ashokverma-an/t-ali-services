'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart3, TrendingUp, DollarSign, Package, Users, Download, Upload, Calendar } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function VendorAnalytics() {
  const router = useRouter()
  const [analytics, setAnalytics] = useState({
    totalRevenue: 45250.75,
    totalOrders: 1247,
    avgOrderValue: 36.30,
    serviceBreakdown: [
      { service: 'Beauty & Salon', orders: 342, revenue: 15420.50, growth: 12.5 },
      { service: 'Marketing Services', orders: 189, revenue: 9450.25, growth: 8.3 },
      { service: 'Food Delivery', orders: 298, revenue: 8940.75, growth: 15.2 },
      { service: 'Home Services', orders: 156, revenue: 6240.00, growth: 6.7 },
      { service: 'Professional Services', orders: 134, revenue: 4020.00, growth: 4.1 },
      { service: 'Automotive', orders: 89, revenue: 2670.00, growth: -2.3 },
      { service: 'Medical Services', orders: 39, revenue: 1170.00, growth: 18.9 }
    ],
    monthlyData: [
      { month: 'Jan', revenue: 3200, orders: 89 },
      { month: 'Feb', revenue: 3800, orders: 105 },
      { month: 'Mar', revenue: 4200, orders: 118 },
      { month: 'Apr', revenue: 3900, orders: 112 },
      { month: 'May', revenue: 4500, orders: 125 },
      { month: 'Jun', revenue: 5100, orders: 142 }
    ]
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData || JSON.parse(userData).role !== 'vendor') {
      router.push('/auth/signin')
    }
  }, [router])

  const exportData = (type: string) => {
    const data = type === 'orders' ? analytics.serviceBreakdown : analytics.monthlyData
    const csv = [
      Object.keys(data[0]).join(','),
      ...data.map(row => Object.values(row).join(','))
    ].join('\n')
    
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${type}-data.csv`
    a.click()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <BarChart3 className="w-8 h-8 text-uber-green" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Analytics & Reports</h1>
                <p className="text-sm text-gray-500">Track your business performance</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => exportData('orders')}>
                <Download className="w-4 h-4 mr-2" />
                Export Orders
              </Button>
              <Button variant="outline" onClick={() => exportData('revenue')}>
                <Download className="w-4 h-4 mr-2" />
                Export Revenue
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{analytics.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12.5% from last month</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
                <p className="text-sm text-green-600">+8.3% from last month</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                <p className="text-2xl font-bold text-gray-900">₹{analytics.avgOrderValue}</p>
                <p className="text-sm text-green-600">+5.2% from last month</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Services</p>
                <p className="text-2xl font-bold text-gray-900">{analytics.serviceBreakdown.length}</p>
                <p className="text-sm text-gray-500">Across all categories</p>
              </div>
              <Users className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Service Performance</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Orders</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Growth</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {analytics.serviceBreakdown.map((service, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{service.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{service.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">₹{service.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        service.growth > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {service.growth > 0 ? '+' : ''}{service.growth}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      ₹{(service.revenue / service.orders).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
            <div className="space-y-4">
              {analytics.monthlyData.map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">{month.month}</span>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-uber-green h-2 rounded-full"
                        style={{ width: `${(month.revenue / 5100) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900">₹{month.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">Upload product data</p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => exportData('orders')}>
                  <Download className="w-4 h-4 mr-2" />
                  Orders CSV
                </Button>
                <Button variant="outline" onClick={() => exportData('revenue')}>
                  <Download className="w-4 h-4 mr-2" />
                  Revenue CSV
                </Button>
              </div>
              
              <div className="text-xs text-gray-500">
                <p>• Supported formats: CSV, Excel</p>
                <p>• Max file size: 10MB</p>
                <p>• Auto-sync with portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}