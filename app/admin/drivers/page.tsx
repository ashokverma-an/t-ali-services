'use client'

import { useState } from 'react'
import { Search, Car, MapPin, Star, Phone } from 'lucide-react'
import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'

export default function AdminDrivers() {
  const [drivers] = useState([
    { id: 1, name: 'Mohammed Ahmed', phone: '+971501234567', vehicle: 'Toyota Camry 2022', license: 'ABC123', rating: 4.8, trips: 234, status: 'Online', location: 'Dubai Marina' },
    { id: 2, name: 'Ali Hassan', phone: '+971507654321', vehicle: 'Honda Accord 2021', license: 'XYZ789', rating: 4.6, trips: 189, status: 'Offline', location: 'Downtown Dubai' },
    { id: 3, name: 'Khalid Omar', phone: '+971509876543', vehicle: 'Nissan Altima 2023', license: 'DEF456', rating: 4.9, trips: 312, status: 'Busy', location: 'Jumeirah' }
  ])

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Driver Management</h1>
          <Button>Add New Driver</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <Car className="w-8 h-8 text-uber-green" />
              <div className="ml-4">
                <p className="text-2xl font-bold">156</p>
                <p className="text-gray-600">Total Drivers</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-gray-600">Online</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">34</p>
                <p className="text-gray-600">Busy</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
              <div>
                <p className="text-2xl font-bold">33</p>
                <p className="text-gray-600">Offline</p>
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
                placeholder="Search drivers..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {drivers.map((driver) => (
              <div key={driver.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-uber-green rounded-full flex items-center justify-center text-white font-medium">
                      {driver.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{driver.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {driver.phone}
                        </span>
                        <span className="flex items-center">
                          <Car className="w-4 h-4 mr-1" />
                          {driver.vehicle}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {driver.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 mr-1" />
                        <span className="font-medium">{driver.rating}</span>
                      </div>
                      <p className="text-xs text-gray-500">{driver.trips} trips</p>
                    </div>
                    
                    <div className={`px-3 py-1 rounded-full text-sm ${
                      driver.status === 'Online' ? 'bg-green-100 text-green-800' :
                      driver.status === 'Busy' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {driver.status}
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Contact</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}