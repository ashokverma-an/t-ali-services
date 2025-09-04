import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/lib/auth/AuthProvider'
import ToastContainer from '@/components/ui/Toast'
import ErrorBoundary from '@/components/ui/ErrorBoundary'
import ConnectionStatus from '@/components/ui/ConnectionStatus'
import Footer from '@/components/layout/Footer'

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
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
            <ToastContainer />
            <ConnectionStatus />
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}