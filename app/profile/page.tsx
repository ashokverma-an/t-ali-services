'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Star, Car, Package } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useTranslation } from '@/lib/useTranslation'

export default function ProfilePage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345'
      })
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const handleSave = () => {
    const updatedUser = { ...user, ...formData }
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setUser(updatedUser)
    setEditing(false)
  }

  if (!user) {
    return <LoadingSpinner />
  }

  const stats = {
    user: [
      { label: 'Total Rides', value: '45', icon: Car },
      { label: 'Orders Placed', value: '23', icon: Package },
      { label: 'Rating', value: '4.8', icon: Star }
    ],
    driver: [
      { label: 'Rides Completed', value: '234', icon: Car },
      { label: 'Rating', value: '4.9', icon: Star },
      { label: 'Total Earnings', value: '$2,450', icon: Package }
    ],
    admin: [
      { label: 'Total Users', value: '1,234', icon: User },
      { label: 'Active Drivers', value: '89', icon: Car },
      { label: 'Platform Rating', value: '4.7', icon: Star }
    ]
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-uber-black">{t('nav.profile')}</h1>
            <p className="text-gray-600 mt-2">Manage your account information</p>
          </div>
          <Button 
            onClick={() => editing ? handleSave() : setEditing(true)}
          >
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-20 h-20 bg-uber-green rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                <p className="text-gray-600 capitalize">{user.role}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                {editing ? (
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900">{formData.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                {editing ? (
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900">{formData.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                {editing ? (
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900">{formData.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                {editing ? (
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                ) : (
                  <p className="text-gray-900">{formData.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
            {user?.role && stats[user.role as keyof typeof stats]?.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-uber-green/10 rounded-lg">
                      <Icon className="w-5 h-5 text-uber-green" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}