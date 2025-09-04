'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Star, Car, Package, Camera, Edit } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { toast } from '@/lib/toast'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState<any>({})
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'John Doe', phone: '+1 (555) 123-4567', relationship: 'Brother' },
    { id: 2, name: 'Jane Smith', phone: '+1 (555) 987-6543', relationship: 'Sister' }
  ])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      setUser(parsedUser)
      setFormData({
        name: parsedUser.name,
        email: parsedUser.email,
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, State 12345',
        dateOfBirth: '1990-01-01',
        gender: 'prefer-not-to-say'
      })
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const handleSave = () => {
    if (user) {
      const updatedUser = Object.assign({}, user, formData)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      setUser(updatedUser)
      setEditing(false)
      toast.success('Profile Updated!', { description: 'Your information has been saved' })
    }
  }

  const addEmergencyContact = () => {
    const newContact = {
      id: Date.now(),
      name: '',
      phone: '',
      relationship: ''
    }
    setEmergencyContacts([...emergencyContacts, newContact])
  }

  const updateEmergencyContact = (id: number, field: string, value: string) => {
    setEmergencyContacts(contacts => 
      contacts.map(contact => 
        contact.id === id ? { ...contact, [field]: value } : contact
      )
    )
  }

  const removeEmergencyContact = (id: number) => {
    setEmergencyContacts(contacts => contacts.filter(contact => contact.id !== id))
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
            <h1 className="text-3xl font-bold text-uber-black">Profile</h1>
            <p className="text-gray-600 mt-2">Manage your account information and preferences</p>
          </div>
          <Button 
            onClick={() => editing ? handleSave() : setEditing(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            {editing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <div className="w-20 h-20 bg-uber-green rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-white" />
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-2 bg-white rounded-full border border-gray-200 hover:bg-gray-50">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600 capitalize">{user?.role}</p>
                  <p className="text-sm text-gray-500">Member since Jan 2024</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  {editing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.name}</p>
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
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.email}</p>
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
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  {editing ? (
                    <Input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.dateOfBirth}</p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  {editing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                    />
                  ) : (
                    <p className="text-gray-900 p-3 bg-gray-50 rounded-lg">{formData.address}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency Contacts */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
                <Button size="sm" onClick={addEmergencyContact}>Add Contact</Button>
              </div>
              <div className="space-y-3">
                {emergencyContacts.map((contact) => (
                  <div key={contact.id} className="grid grid-cols-1 md:grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
                    <Input
                      placeholder="Name"
                      value={contact.name}
                      onChange={(e) => updateEmergencyContact(contact.id, 'name', e.target.value)}
                    />
                    <Input
                      placeholder="Phone"
                      value={contact.phone}
                      onChange={(e) => updateEmergencyContact(contact.id, 'phone', e.target.value)}
                    />
                    <Input
                      placeholder="Relationship"
                      value={contact.relationship}
                      onChange={(e) => updateEmergencyContact(contact.id, 'relationship', e.target.value)}
                    />
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => removeEmergencyContact(contact.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
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

            {/* Account Actions */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-3">Account Actions</h4>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Download Data
                </Button>
                <Button variant="outline" size="sm" className="w-full">
                  Deactivate Account
                </Button>
                <Button variant="outline" size="sm" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}