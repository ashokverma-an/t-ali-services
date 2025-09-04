'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, Car } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Logo from '@/components/ui/Logo'
import { toast } from '@/lib/toast'

const staticUsers = {
  'user@demo.com': { password: 'password123', role: 'user', name: 'Demo User' },
  'driver@demo.com': { password: 'password123', role: 'driver', name: 'Demo Driver' },
  'admin@demo.com': { password: 'password123', role: 'admin', name: 'Admin User' }
}

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const user = staticUsers[email as keyof typeof staticUsers]
    
    if (user && user.password === password) {
      localStorage.setItem('user', JSON.stringify({
        email,
        name: user.name,
        role: user.role
      }))
      toast.success('Login Successful!', { description: `Welcome ${user.name}` })
      
      if (user.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/dashboard')
      }
    } else {
      setError('Invalid email or password')
      toast.error('Login Failed', { description: 'Please check your credentials' })
    }
    setLoading(false)
  }

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail)
    setPassword('password123')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <div className="w-12 h-12 bg-uber-black rounded-xl flex items-center justify-center">
              <Car className="w-7 h-7 text-white" />
            </div>
            <Logo size="lg" variant="dark" />
          </Link>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full h-12" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="text-center mt-4">
            <button 
              type="button"
              className="text-uber-green hover:text-green-600 text-sm"
              onClick={() => alert('Demo: Use provided credentials below')}
            >
              Forgot Password?
            </button>
          </div>



          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Demo Login:</p>
            <div className="space-y-2">
              <Button
                onClick={() => handleDemoLogin('user@demo.com')}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Login as User
              </Button>
              <Button
                onClick={() => handleDemoLogin('driver@demo.com')}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Login as Driver
              </Button>
              <Button
                onClick={() => handleDemoLogin('admin@demo.com')}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Login as Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}