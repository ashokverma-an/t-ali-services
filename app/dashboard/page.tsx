'use client'

import { Suspense, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import DashboardOverview from '@/components/dashboard/DashboardOverview'
import BookingManagement from '@/components/dashboard/BookingManagement'
import UserManagement from '@/components/dashboard/UserManagement'
import DriverDashboard from '@/components/dashboard/DriverDashboard'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useTranslation } from '@/lib/useTranslation'

export default function DashboardPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  if (!user) {
    return <LoadingSpinner />
  }

  const renderDashboardContent = () => {
    switch (user?.role) {
      case 'admin':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-uber-black">Admin Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage platform operations</p>
            </div>
            <UserManagement />
            <BookingManagement />
          </div>
        )
      case 'driver':
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-uber-black">Driver Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {user?.name}</p>
            </div>
            <DriverDashboard />
          </div>
        )
      default:
        return (
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-uber-black">Welcome, {user?.name}</h1>
              <p className="text-gray-600 mt-2">{t('dashboard.recent_activity')}</p>
            </div>
            <BookingManagement />
            <Suspense fallback={<LoadingSpinner />}>
              <DashboardOverview />
            </Suspense>
          </div>
        )
    }
  }

  return (
    <DashboardLayout>
      {renderDashboardContent()}
    </DashboardLayout>
  )
}