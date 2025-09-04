'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Home, 
  Car, 
  UtensilsCrossed, 
  Package, 
  User, 
  CreditCard, 
  Settings, 
  Menu, 
  X,
  Bell,
  Search,
  MessageCircle,
  HelpCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import NotificationBell from '@/components/ui/NotificationBell'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: Home },
    { name: 'Rides', href: '/dashboard/rides', icon: Car },
    { name: 'Food Orders', href: '/dashboard/food', icon: UtensilsCrossed },
    { name: 'Packages', href: '/dashboard/packages', icon: Package },
    { name: 'Messages', href: '/chat', icon: MessageCircle },
    { name: 'Support', href: '/support', icon: HelpCircle },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Payment', href: '/dashboard/payment', icon: CreditCard },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <div className={cn(
        'fixed inset-0 z-50 lg:hidden',
        sidebarOpen ? 'block' : 'hidden'
      )}>
        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
        <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-uber-black rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <Logo size="md" variant="dark" />
            </Link>
            <button onClick={() => setSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="p-4">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors',
                    pathname === item.href
                      ? 'bg-uber-green text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-white lg:shadow-sm lg:flex lg:flex-col">
        <div className="flex items-center p-6 border-b">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-uber-black rounded-lg flex items-center justify-center">
              <Car className="w-5 h-5 text-white" />
            </div>
            <Logo size="md" variant="dark" />
          </Link>
        </div>
        <nav className="flex-1 p-4">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg mb-1 transition-colors',
                  pathname === item.href
                    ? 'bg-uber-green text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search */}
              <div className="hidden md:flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2 w-96">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none flex-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <NotificationBell />
              
              <div className="w-8 h-8 bg-uber-green rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}