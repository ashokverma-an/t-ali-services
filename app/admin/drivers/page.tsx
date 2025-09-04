'use client'

import AdminLayout from '@/components/admin/AdminLayout'
import Button from '@/components/ui/Button'

export default function AdminDriversPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Drivers Management</h1>
          <p className="text-gray-600">Manage drivers and monitor performance</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Drivers Dashboard</h3>
            <p className="text-gray-600 mb-4">Manage and monitor driver activities</p>
            <Button>View Drivers</Button>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}