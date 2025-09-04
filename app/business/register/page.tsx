'use client'

import { useState } from 'react'
import { Building, MapPin, Phone, Mail, Clock, DollarSign, Upload, Check } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function BusinessRegister() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    hours: '',
    services: [] as string[],
    pricing: '',
    documents: [] as string[]
  })

  const categories = [
    'Beauty & Personal Care', 'Health & Medical', 'Home Services', 'Professional Services',
    'Food & Dining', 'Fitness & Sports', 'Education & Training', 'Automotive',
    'Events & Entertainment', 'Pet Services', 'Retail & Shopping', 'Real Estate'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 4) {
      setStep(step + 1)
    } else {
      // Submit form
      alert('Business registration submitted successfully!')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Register Your Business</h1>
          <p className="text-gray-600 mt-2">Join T Ali Services and reach thousands of customers</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  i <= step ? 'bg-uber-green text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i}
                </div>
                {i < 4 && <div className={`w-16 h-1 mx-2 ${i < step ? 'bg-uber-green' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Business Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Business Name *</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        required
                        value={formData.businessName}
                        onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                        placeholder="Enter business name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Description *</label>
                  <textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                    placeholder="Describe your business and services"
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Business Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <textarea
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      rows={3}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                      placeholder="Enter complete business address"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                        placeholder="business@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website (Optional)</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                    placeholder="https://www.yourbusiness.com"
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Service Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Operating Hours *</label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.hours}
                      onChange={(e) => setFormData({...formData, hours: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                      placeholder="Mon-Fri: 9AM-8PM, Sat-Sun: 10AM-6PM"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Services Offered *</label>
                  <textarea
                    required
                    value={formData.services.join('\n')}
                    onChange={(e) => setFormData({...formData, services: e.target.value.split('\n')})}
                    rows={6}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                    placeholder="List your services (one per line)&#10;Example:&#10;Hair Cut - AED 50&#10;Hair Color - AED 120&#10;Manicure - AED 40"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Starting Price Range *</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={formData.pricing}
                      onChange={(e) => setFormData({...formData, pricing: e.target.value})}
                      className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-uber-green"
                      placeholder="From AED 50"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Documents & Verification</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Trade License</p>
                    <Button variant="outline" size="sm">Upload File</Button>
                  </div>
                  
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Emirates ID</p>
                    <Button variant="outline" size="sm">Upload File</Button>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Our team will review your application within 24-48 hours</li>
                    <li>• You'll receive an email confirmation once approved</li>
                    <li>• Start receiving bookings immediately after approval</li>
                    <li>• Get access to business dashboard and analytics</li>
                  </ul>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                  Previous
                </Button>
              )}
              <Button type="submit" className="ml-auto">
                {step === 4 ? 'Submit Application' : 'Next Step'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}