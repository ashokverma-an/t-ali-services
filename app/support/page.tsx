'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import DashboardLayout from '@/components/layout/DashboardLayout'
import TicketSystem from '@/components/support/TicketSystem'
import ReviewSystem from '@/components/support/ReviewSystem'
import LoadingSpinner from '@/components/ui/LoadingSpinner'

export default function SupportPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('tickets')

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

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-uber-black">Support Center</h1>
          <p className="text-gray-600 mt-2">Get help and share your feedback</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('tickets')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'tickets'
                    ? 'border-uber-green text-uber-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Support Tickets
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-uber-green text-uber-green'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reviews & Ratings
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'tickets' && <TicketSystem />}
            {activeTab === 'reviews' && <ReviewSystem />}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}