'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Phone, Clock } from 'lucide-react'
import Button from '@/components/ui/Button'
import BookingModal from './BookingModal'
import QuickActions from './QuickActions'
import ServiceStats from './ServiceStats'

interface ServiceTemplateProps {
  category: {
    icon: string
    title: string
    description: string
    services: string[]
  }
  providers: Array<{
    id: number
    name: string
    service: string
    rating: number
    reviews: number
    distance: string
    price: string
    available: boolean
  }>
}

export default function ServiceTemplate({ category, providers }: ServiceTemplateProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [bookingModal, setBookingModal] = useState<any>(null)

  const filteredProviders = providers.filter(provider => 
    (!selectedService || provider.service === selectedService) &&
    (!searchQuery || provider.name.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <h1 className="text-3xl font-bold text-gray-900">{category.title}</h1>
            <p className="mt-2 text-lg text-gray-600">{category.description}</p>
          </div>
          
          <div className="mt-6 max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-uber-green"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="font-semibold mb-4">Services</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedService(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg ${!selectedService ? 'bg-uber-green text-white' : 'hover:bg-gray-100'}`}
                >
                  All Services
                </button>
                {category.services.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSelectedService(service)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm ${selectedService === service ? 'bg-uber-green text-white' : 'hover:bg-gray-100'}`}
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <ServiceStats category={category.title} />
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Available Providers ({filteredProviders.length})</h2>
            </div>

            <div className="grid gap-6">
              {filteredProviders.map((provider) => (
                <div key={provider.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{provider.name}</h3>
                        <div className={`px-2 py-1 rounded-full text-xs ${provider.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {provider.available ? 'Available' : 'Busy'}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{provider.service}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{provider.rating} ({provider.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{provider.distance}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>Available now</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-semibold text-uber-green">{provider.price}</span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <QuickActions provider={provider} />
                        <Button 
                          size="sm" 
                          disabled={!provider.available}
                          onClick={() => setBookingModal(provider)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <BookingModal
        isOpen={!!bookingModal}
        onClose={() => setBookingModal(null)}
        provider={bookingModal || {}}
      />
    </div>
  )
}