'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings Management</h1>
          <p className="text-gray-600">Manage settings and monitor performance</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Settings Dashboard</h3>
            <p className="text-gray-600 mb-4">Manage and monitor settings activities</p>
            <Button>View Settings</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}