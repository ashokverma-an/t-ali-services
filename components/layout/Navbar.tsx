'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Menu, X, User, LogOut, Settings, Package, UtensilsCrossed, Car } from 'lucide-react'
import Button from '@/components/ui/Button'
import Logo from '@/components/ui/Logo'
import LanguageSelector from '@/components/ui/LanguageSelector'
import { useTranslation } from '@/lib/useTranslation'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { language, changeLanguage, t } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleSignOut = () => {
    localStorage.removeItem('user')
    setUser(null)
    window.location.href = '/'
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <Logo size="md" variant="dark" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/services/ride" className="text-gray-600 hover:text-uber-black transition-colors">
              {t('nav.ride')}
            </Link>
            <Link href="/services/food" className="text-gray-600 hover:text-uber-black transition-colors">
              {t('nav.food')}
            </Link>
            <Link href="/services/package" className="text-gray-600 hover:text-uber-black transition-colors">
              {t('nav.package')}
            </Link>
            <Link href="/services/all" className="text-uber-green hover:text-uber-black transition-colors font-medium">
              All Services
            </Link>
            <Link href="/business" className="text-gray-600 hover:text-uber-black transition-colors">
              {t('nav.business')}
            </Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector 
              currentLanguage={language} 
              onLanguageChange={changeLanguage} 
            />
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-uber-green rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user?.name || 'User'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                    <div className="py-2">
                      <Link 
                        href="/dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link 
                        href="/dashboard/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      {user?.role === 'admin' && (
                        <Link 
                          href="/admin" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setProfileOpen(false)}
                        >
                          <Settings className="w-4 h-4 mr-3" />
                          Admin Panel
                        </Link>
                      )}
                      <Link 
                        href="/chat" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setProfileOpen(false)}
                      >
                        <User className="w-4 h-4 mr-3" />
                        Messages
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link href="/auth/signin">
                  <Button variant="ghost">{t('nav.signin')}</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button>{t('nav.signup')}</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-4 py-4 space-y-4">
            <Link href="/services/ride" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <Car className="w-5 h-5 text-gray-600" />
              <span>Ride</span>
            </Link>
            <Link href="/services/food" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <UtensilsCrossed className="w-5 h-5 text-gray-600" />
              <span>Food</span>
            </Link>
            <Link href="/services/package" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
              <Package className="w-5 h-5 text-gray-600" />
              <span>Package</span>
            </Link>
            <Link href="/services/all" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 bg-uber-green/10">
              <div className="w-5 h-5 text-uber-green font-bold flex items-center justify-center">🏪</div>
              <span className="font-medium text-uber-green">All Services</span>
            </Link>
            
            {user ? (
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <Link href="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <Settings className="w-5 h-5 text-gray-600" />
                  <span>Dashboard</span>
                </Link>
                <Link href="/dashboard/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                  <User className="w-5 h-5 text-gray-600" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 w-full text-left"
                >
                  <LogOut className="w-5 h-5 text-gray-600" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <Link href="/auth/signin" className="block w-full">
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link href="/auth/signup" className="block w-full">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}