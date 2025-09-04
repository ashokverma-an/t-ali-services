'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Settings, Bell, Shield, Globe, Moon, Smartphone } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { toast } from '@/lib/toast'

export default function SettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [settings, setSettings] = useState<any>({
    notifications: {
      push: true,
      email: true,
      sms: false,
      marketing: false
    },
    privacy: {
      shareLocation: true,
      shareRideHistory: false,
      allowDataCollection: true
    },
    preferences: {
      language: 'en',
      currency: 'USD',
      theme: 'light',
      autoAcceptRides: false
    }
  })

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings))
    toast.success('Settings Saved!', { description: 'Your preferences have been updated' })
  }

  const toggleSetting = (category: string, key: string) => {
    setSettings((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key]
      }
    }))
  }

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings((prev: any) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-uber-black">Settings</h1>
          <p className="text-gray-600 mt-2">Manage your account preferences and privacy</p>
        </div>

        <div className="grid gap-6">
          {/* Notifications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Bell className="w-6 h-6 text-uber-green" />
              <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-sm text-gray-600">
                      {key === 'push' && 'Receive push notifications on your device'}
                      {key === 'email' && 'Get updates via email'}
                      {key === 'sms' && 'Receive SMS notifications'}
                      {key === 'marketing' && 'Promotional offers and updates'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSetting('notifications', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-uber-green' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Privacy */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="w-6 h-6 text-uber-green" />
              <h2 className="text-xl font-semibold text-gray-900">Privacy & Security</h2>
            </div>
            <div className="space-y-4">
              {Object.entries(settings.privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1')}</h3>
                    <p className="text-sm text-gray-600">
                      {key === 'shareLocation' && 'Allow location sharing for better service'}
                      {key === 'shareRideHistory' && 'Share ride history with emergency contacts'}
                      {key === 'allowDataCollection' && 'Help improve our services with usage data'}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleSetting('privacy', key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      value ? 'bg-uber-green' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      value ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Globe className="w-6 h-6 text-uber-green" />
              <h2 className="text-xl font-semibold text-gray-900">Preferences</h2>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.preferences.language}
                    onChange={(e) => updateSetting('preferences', 'language', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                    <option value="ur">اردو</option>
                    <option value="fr">Français</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.preferences.currency}
                    onChange={(e) => updateSetting('preferences', 'currency', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="AED">AED (د.إ)</option>
                    <option value="PKR">PKR (₨)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>
              
              {user?.role === 'driver' && (
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">Auto Accept Rides</h3>
                    <p className="text-sm text-gray-600">Automatically accept ride requests</p>
                  </div>
                  <button
                    onClick={() => toggleSetting('preferences', 'autoAcceptRides')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.preferences.autoAcceptRides ? 'bg-uber-green' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.preferences.autoAcceptRides ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}