'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { User, Car, Shield, CheckCircle } from 'lucide-react'

export default function UserFlowDemo() {
  const [currentFlow, setCurrentFlow] = useState<'user' | 'driver' | 'admin'>('user')

  const testFlow = (flow: 'user' | 'driver' | 'admin') => {
    setCurrentFlow(flow)
    
    const demoUser = {
      user: { name: 'Ahmed Ali', email: 'ahmed@test.com', role: 'user' },
      driver: { name: 'Sarah Driver', email: 'sarah@test.com', role: 'driver' },
      admin: { name: 'Admin User', email: 'admin@test.com', role: 'admin' }
    }
    
    localStorage.setItem('user', JSON.stringify(demoUser[flow]))
    alert(`Demo ${flow} logged in! All routes now accessible.`)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Test All User Flows</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <button
          onClick={() => testFlow('user')}
          className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50 hover:bg-blue-100"
        >
          <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
          <div className="font-semibold">Test User Flow</div>
          <div className="text-sm text-gray-600">Dashboard, Services, Profile</div>
        </button>
        
        <button
          onClick={() => testFlow('driver')}
          className="p-4 rounded-lg border-2 border-green-500 bg-green-50 hover:bg-green-100"
        >
          <Car className="w-8 h-8 mx-auto mb-2 text-green-600" />
          <div className="font-semibold">Test Driver Flow</div>
          <div className="text-sm text-gray-600">Driver Dashboard, Rides</div>
        </button>
        
        <button
          onClick={() => testFlow('admin')}
          className="p-4 rounded-lg border-2 border-red-500 bg-red-50 hover:bg-red-100"
        >
          <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
          <div className="font-semibold">Test Admin Flow</div>
          <div className="text-sm text-gray-600">Admin Panel, Management</div>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a href="/dashboard" target="_blank" className="p-3 bg-blue-100 rounded-lg text-center hover:bg-blue-200">
          <div className="font-medium text-blue-800">Dashboard</div>
        </a>
        <a href="/admin" target="_blank" className="p-3 bg-red-100 rounded-lg text-center hover:bg-red-200">
          <div className="font-medium text-red-800">Admin Panel</div>
        </a>
        <a href="/services/all" target="_blank" className="p-3 bg-green-100 rounded-lg text-center hover:bg-green-200">
          <div className="font-medium text-green-800">All Services</div>
        </a>
        <a href="/auth/signin" target="_blank" className="p-3 bg-purple-100 rounded-lg text-center hover:bg-purple-200">
          <div className="font-medium text-purple-800">Sign In</div>
        </a>
      </div>
    </div>
  )
}