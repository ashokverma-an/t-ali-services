'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Store, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Users, 
  Star,
  Clock,
  MapPin,
  Phone,
  Mail,
  Settings,
  Plus,
  Eye,
  Edit,
  BarChart3
} from 'lucide-react'
import Button from '@/components/ui/Button'

export default function VendorDashboard() {
  const router = useRouter()
  const [vendor, setVendor] = useState<any>(null)
  const [stats, setStats] = useState({
    totalProducts: 0,
    activeOrders: 0,
    totalEarnings: 0,
    rating: 0,
    totalReviews: 0,
    todayOrders: 0,
    pendingPayouts: 0,
    monthlyRevenue: 0
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [topProducts, setTopProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      const parsedUser = JSON.parse(userData)
      if (parsedUser.role === 'vendor') {
        setVendor({
          businessName: 'Demo Restaurant',
          email: parsedUser.email,
          phone: '+971 50 123 4567',
          businessType: 'Restaurant',
          address: {
            area: 'Dubai Marina',
            city: 'Dubai'
          },
          _id: 'vendor-demo-001'
        })
        loadDashboardData('vendor-demo-001')
      } else {
        router.push('/auth/signin')
      }
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const loadDashboardData = async (vendorId: string) => {
    try {
      // Simulate API calls for dashboard data
      setStats({
        totalProducts: 45,
        activeOrders: 12,
        totalEarnings: 15420.50,
        rating: 4.7,
        totalReviews: 234,
        todayOrders: 8,
        pendingPayouts: 2340.75,
        monthlyRevenue: 8750.25
      })

      setRecentOrders([
        {
          id: 'ORD-001',
          customer: 'Ahmed Hassan',
          items: 3,
          total: 125.50,
          status: 'preparing',
          time: '10 min ago'
        },
        {
          id: 'ORD-002',
          customer: 'Sarah Al-Zahra',
          items: 2,
          total: 89.25,
          status: 'ready',
          time: '25 min ago'
        },
        {
          id: 'ORD-003',
          customer: 'Mohammed Ali',
          items: 1,
          total: 45.00,
          status: 'delivered',
          time: '1 hour ago'
        }
      ])

      setTopProducts([
        {
          id: 'PROD-001',
          name: 'Chicken Shawarma',
          orders: 45,
          revenue: 1125.00,
          stock: 'In Stock'
        },
        {
          id: 'PROD-002',
          name: 'Mixed Grill Platter',
          orders: 32,
          revenue: 960.00,
          stock: 'Low Stock'
        },
        {
          id: 'PROD-003',
          name: 'Hummus & Pita',
          orders: 28,
          revenue: 420.00,
          stock: 'In Stock'
        }
      ])

      setLoading(false)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-100 text-yellow-800'
      case 'ready': return 'bg-blue-100 text-blue-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uber-green mx-auto mb-4"></div>
          <p>Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Store className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-4">Please sign in to access vendor dashboard</p>
          <Link href="/vendor/auth/signin">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Store className="w-8 h-8 text-uber-green" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{vendor.businessName}</h1>
                <p className="text-sm text-gray-500">Vendor Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/vendor/products/add">
                <Button size="sm" className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Add Product</span>
                </Button>
              </Link>
              
              <Link href="/vendor/settings">
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-bold text-gray-900">AED {stats.totalEarnings.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <div className="flex items-center space-x-1">
                  <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                </div>
                <p className="text-xs text-gray-500">{stats.totalReviews} reviews</p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
                  <Link href="/vendor/orders">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {recentOrders.map((order: any) => (
                  <div key={order.id} className="p-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <p className="font-medium text-gray-900">#{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{order.items} items</span>
                          <span>AED {order.total}</span>
                          <span className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {order.time}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link href="/vendor/products/add">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Product
                  </Button>
                </Link>
                
                <Link href="/vendor/orders">
                  <Button variant="outline" className="w-full justify-start">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Manage Orders
                  </Button>
                </Link>
                
                <Link href="/vendor/analytics">
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
                
                <Link href="/vendor/profile">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </Link>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
              <div className="space-y-4">
                {topProducts.map((product: any) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.orders} orders • AED {product.revenue}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.stock === 'In Stock' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {product.stock}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Business Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vendor.address?.area}, {vendor.address?.city}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vendor.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vendor.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Store className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{vendor.businessType}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}