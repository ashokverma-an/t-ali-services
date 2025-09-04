import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthProvider'
import ToastContainer from '@/components/ui/Toast'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ConnectionStatus from '@/components/ui/ConnectionStatus'
import Footer from '@/components/layout/Footer'
import AdminFooter from '@/components/layout/AdminFooter'
import PortalFooter from '@/components/layout/PortalFooter'
import UserFooter from '@/components/layout/UserFooter'
import DriverFooter from '@/components/layout/DriverFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'T Ali Services - Your All-in-One Service Platform',
  description: 'Book rides, order food, send packages, and more with T Ali Services - Dubai\'s complete service platform.',
  keywords: 'ride sharing, food delivery, package delivery, transportation, services, Dubai, UAE',
  authors: [{ name: 'T Ali Services Team' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <AuthProvider>
            <div className="min-h-screen flex flex-col">
              <main className="flex-1">
                {children}
              </main>
              <ConditionalFooter />
            </div>
            <ToastContainer />
            <ConnectionStatus />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}

function ConditionalFooter() {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname
    const isLanding = pathname === '/'
    const isAuth = pathname.startsWith('/auth')
    const isAdmin = pathname.startsWith('/admin')
    const isDriver = pathname.startsWith('/driver')
    const isUser = pathname.startsWith('/dashboard')
    
    // Don't show footer on landing page (has its own) or auth pages
    if (isLanding || isAuth) return null
    
    // Show role-specific footers for logged-in areas
    if (isAdmin) return <AdminFooter />
    if (isDriver) return <DriverFooter />
    if (isUser) return <UserFooter />
    
    // For all other pages (services, business, contact, etc.) show landing footer
    return <Footer />
  }
  return null
}