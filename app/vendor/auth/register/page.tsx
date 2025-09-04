'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Store, Upload, MapPin, Phone, Mail, Building, CreditCard } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function VendorRegister() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    
    // Business Details
    businessType: '',
    category: '',
    subcategory: '',
    description: '',
    
    // Location
    address: {
      street: '',
      area: '',
      city: '',
      emirate: 'Dubai'
    },
    
    // Documents
    businessLicense: '',
    taxId: '',
    tradeLicense: '',
    establishmentCard: '',
    
    // Bank Details
    bankDetails: {
      bankName: '',
      accountNumber: '',
      iban: '',
      swiftCode: ''
    },
    
    // Business Settings
    deliveryRadius: 10,
    minimumOrder: 25,
    deliveryFee: 5,
    estimatedDeliveryTime: '30-45 min'
  })

  const businessTypes = [
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
    { id: 'retail', name: 'Retail Store', icon: '🛍️' },
    { id: 'grocery', name: 'Grocery Store', icon: '🛒' },
    { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
    { id: 'beauty', name: 'Beauty & Salon', icon: '💄' },
    { id: 'automotive', name: 'Automotive', icon: '🚗' },
    { id: 'service', name: 'Service Provider', icon: '🔧' },
    { id: 'professional', name: 'Professional Services', icon: '💼' }
  ]

  const emirates = [
    'Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'
  ]

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const validateStep = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.ownerName && formData.email && 
               formData.phone && formData.password && formData.confirmPassword &&
               formData.password === formData.confirmPassword
      case 2:
        return formData.businessType && formData.category && formData.description
      case 3:
        return formData.address.street && formData.address.area && formData.address.city
      case 4:
        return formData.businessLicense && formData.taxId && formData.tradeLicense
      case 5:
        return formData.bankDetails.bankName && formData.bankDetails.accountNumber && 
               formData.bankDetails.iban
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/vendor/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        router.push('/vendor/auth/signin?message=registration-success')
      } else {
        throw new Error('Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <Store className="w-16 h-16 text-uber-green mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900">Join T ALI Platform</h1>
          <p className="text-gray-600 mt-2">Start selling and grow your business with us</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                i <= step ? 'bg-uber-green text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {i}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-uber-green h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Step 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name *
                  </label>
                  <Input
                    value={formData.businessName}
                    onChange={(e) => handleInputChange('businessName', e.target.value)}
                    placeholder="Enter your business name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Owner Name *
                  </label>
                  <Input
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    placeholder="Enter owner's full name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="business@example.com"
                      className="pl-12"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="Create a strong password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <Input
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>

              {formData.password !== formData.confirmPassword && formData.confirmPassword && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}
            </div>
          )}

          {/* Step 2: Business Details */}
          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Business Details</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Business Type *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {businessTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => handleInputChange('businessType', type.id)}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        formData.businessType === type.id
                          ? 'border-uber-green bg-green-50 text-uber-green'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">{type.icon}</div>
                      <div className="text-sm font-medium">{type.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="e.g., Fast Food, Electronics"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subcategory
                  </label>
                  <Input
                    value={formData.subcategory}
                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                    placeholder="e.g., Burgers, Mobile Phones"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe your business, products, and services..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-green focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <Button variant="outline" onClick={() => setStep(step - 1)}>
                Previous
              </Button>
            )}
            
            <div className="ml-auto">
              {step < 5 ? (
                <Button 
                  onClick={handleNext}
                  disabled={!validateStep(step)}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  disabled={loading || !validateStep(step)}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/vendor/auth/signin" className="text-uber-green hover:underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}