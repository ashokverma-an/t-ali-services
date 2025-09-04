'use client'

import { useState, useEffect } from 'react'
import { User, Shield, Car, Ban, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/lib/useTranslation'

export default function UserManagement() {
  const { t } = useTranslation()
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    const mockUsers = [
      { id: 1, name: 'John Doe', email: 'john@demo.com', role: 'user', status: 'active', rides: 45, rating: 4.8 },
      { id: 2, name: 'Jane Smith', email: 'jane@demo.com', role: 'driver', status: 'active', rides: 120, rating: 4.9 },
      { id: 3, name: 'Mike Johnson', email: 'mike@demo.com', role: 'user', status: 'suspended', rides: 12, rating: 3.2 },
      { id: 4, name: 'Sarah Wilson', email: 'sarah@demo.com', role: 'driver', status: 'active', rides: 89, rating: 4.7 }
    ]
    setUsers(mockUsers)
  }

  const updateUserStatus = (id: number, newStatus: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, status: newStatus } : user
    ))
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4 text-red-600" />
      case 'driver': return <Car className="w-4 h-4 text-blue-600" />
      case 'user': return <User className="w-4 h-4 text-green-600" />
      default: return <User className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'suspended': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-uber-black">User Management</h2>
        <Button>Add New User</Button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getRoleIcon(user.role)}
                      <span className="text-sm text-gray-900 capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {user.rides} rides
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ⭐ {user.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {user.status === 'active' ? (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateUserStatus(user.id, 'suspended')}
                      >
                        Suspend
                      </Button>
                    ) : (
                      <Button 
                        size="sm"
                        onClick={() => updateUserStatus(user.id, 'active')}
                      >
                        Activate
                      </Button>
                    )}
                    <Button size="sm" variant="outline">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}