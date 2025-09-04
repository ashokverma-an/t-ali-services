'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter } from 'next/navigation'
import AdminLayout from '@/components/admin/AdminLayout'
import AdminDashboard from '@/components/admin/AdminDashboard'
import LiveBookings from '@/components/realtime/LiveBookings'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function AdminPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role === 'admin') {
        setUser(parsedUser)
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/auth/signin')
    }
  }, [router])
  
  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage your platform operations and monitor key metrics
          </p>
        </div>
        
        <div className="mb-8">
          <LiveBookings userRole="admin" />
        </div>
        
        <Suspense fallback={<LoadingSpinner />}>
          <AdminDashboard />
        </Suspense>
      </div>
    </AdminLayout>
  )
}