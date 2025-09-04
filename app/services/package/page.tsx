'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Navigation, Package, User, Phone, FileText, Scale } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function PackagePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [formData, setFormData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    packageSize: 'small',
    weight: '',
    description: '',
    fragile: false,
    recipientName: '',
    recipientPhone: '',
    scheduledTime: 'now'
  })
  const [loading, setLoading] = useState(false)
  const [estimate, setEstimate] = useState<any>(null)

  const packageSizes = [
    {
      id: 'small',
      name: 'Small',
      description: 'Up to 5 lbs, fits in a bag',
      price: 8.99,
      dimensions: '12" x 12" x 6"'
    },
    {
      id: 'medium',
      name: 'Medium',
      description: 'Up to 20 lbs, small box',
      price: 12.99,
      dimensions: '18" x 18" x 12"'
    },
    {
      id: 'large',
      name: 'Large',
      description: 'Up to 50 lbs, large box',
      price: 18.99,
      dimensions: '24" x 24" x 18"'
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const calculateEstimate = () => {
    if (!formData.pickupAddress || !formData.deliveryAddress) return

    const selectedSize = packageSizes.find(size => size.id === formData.packageSize)
    const basePrice = selectedSize?.price || 8.99
    const fragileUpcharge = formData.fragile ? 3.00 : 0
    const serviceFee = 2.50
    const tax = (basePrice + fragileUpcharge) * 0.08

    setEstimate({
      basePrice,
      fragileUpcharge,
      serviceFee,
      tax,
      total: basePrice + fragileUpcharge + serviceFee + tax,
      estimatedTime: '30-60 min'
    })
  }

  const handleSendPackage = async () => {
    if (!estimate) return

    setLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'package',
          pickup: {
            address: formData.pickupAddress,
            coordinates: { lat: 40.7128, lng: -74.0060 }
          },
          destination: {
            address: formData.deliveryAddress,
            coordinates: { lat: 40.7589, lng: -73.9851 }
          },
          packageDetails: {
            size: formData.packageSize,
            weight: parseFloat(formData.weight) || 0,
            description: formData.description,
            fragile: formData.fragile
          },
          recipient: {
            name: formData.recipientName,
            phone: formData.recipientPhone
          },
          pricing: {
            baseFare: estimate.basePrice,
            distanceFare: 0,
            timeFare: 0,
            serviceFee: estimate.serviceFee,
            tax: estimate.tax,
            total: estimate.total
          },
          paymentMethod: {
            type: 'card',
            details: { last4: '1234' }
          },
          scheduledAt: formData.scheduledTime === 'now' ? new Date() : new Date(formData.scheduledTime)
        })
      })

      if (response.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Package booking error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Send a Package</h1>
            <p className="text-gray-600">Fast and secure package delivery</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 p-6">
            <div className="space-y-6">
              {/* Addresses */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Pickup & Delivery</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    <Input
                      value={formData.pickupAddress}
                      onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
                      placeholder="Where should we pick up the package?"
                      className="pl-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    <Input
                      value={formData.deliveryAddress}
                      onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                      placeholder="Where should we deliver it?"
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>

              {/* Package Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Package Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Size
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {packageSizes.map((size) => (
                      <div
                        key={size.id}
                        onClick={() => handleInputChange('packageSize', size.id)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          formData.packageSize === size.id
                            ? 'border-uber-green bg-green-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-900">{size.name}</h3>
                            <p className="text-sm text-gray-600">{size.description}</p>
                            <p className="text-xs text-gray-500 mt-1">{size.dimensions}</p>
                          </div>
                          <span className="font-semibold text-gray-900">${size.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (lbs)
                    </label>
                    <div className="relative">
                      <Scale className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        type="number"
                        value={formData.weight}
                        onChange={(e) => handleInputChange('weight', e.target.value)}
                        placeholder="0"
                        className="pl-12"
                      />
                    </div>
                  </div>

                  <div className="flex items-end">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.fragile}
                        onChange={(e) => handleInputChange('fragile', e.target.checked)}
                        className="rounded border-gray-300 text-uber-green focus:ring-uber-green"
                      />
                      <span className="text-sm font-medium text-gray-700">Fragile (+$3.00)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Package Description
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="What's in the package? (optional)"
                      className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-green focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Recipient Details */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Recipient Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={formData.recipientName}
                      onChange={(e) => handleInputChange('recipientName', e.target.value)}
                      placeholder="Who will receive the package?"
                      className="pl-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="tel"
                      value={formData.recipientPhone}
                      onChange={(e) => handleInputChange('recipientPhone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={calculateEstimate}
                disabled={!formData.pickupAddress || !formData.deliveryAddress}
                className="w-full"
              >
                Get Price Estimate
              </Button>
            </div>

            {/* Estimate & Booking */}
            <div className="space-y-6">
              {estimate && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Estimate</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Base price ({formData.packageSize})</span>
                      <span>${estimate.basePrice.toFixed(2)}</span>
                    </div>
                    {formData.fragile && (
                      <div className="flex justify-between text-sm">
                        <span>Fragile handling</span>
                        <span>${estimate.fragileUpcharge.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span>Service fee</span>
                      <span>${estimate.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Tax</span>
                      <span>${estimate.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${estimate.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Estimated delivery:</strong> {estimate.estimatedTime}
                    </p>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      When to send?
                    </label>
                    <select
                      value={formData.scheduledTime}
                      onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-green focus:border-transparent"
                    >
                      <option value="now">Send now</option>
                      <option value="1hour">In 1 hour</option>
                      <option value="2hours">In 2 hours</option>
                      <option value="tomorrow">Tomorrow</option>
                    </select>
                  </div>

                  <Button
                    onClick={user ? handleSendPackage : () => router.push('/auth/signin')}
                    disabled={loading || !formData.recipientName || !formData.recipientPhone}
                    className="w-full mt-6"
                  >
                    {loading ? 'Booking...' : user ? 'Send Package' : 'Sign In to Send'}
                  </Button>
                </div>
              )}

              {/* Package Features */}
              <div className="bg-white border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Why choose our delivery?</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Package className="w-5 h-5 text-uber-green mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Secure handling</h4>
                      <p className="text-sm text-gray-600">Your package is handled with care</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-uber-green mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Real-time tracking</h4>
                      <p className="text-sm text-gray-600">Track your package every step of the way</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FileText className="w-5 h-5 text-uber-green mt-0.5" />
                    <div>
                      <h4 className="font-medium text-gray-900">Proof of delivery</h4>
                      <p className="text-sm text-gray-600">Photo confirmation when delivered</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}