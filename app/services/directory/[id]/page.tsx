'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Star, Clock, Phone, MapPin, Calendar } from 'lucide-react'
import { getAllServices } from '@/lib/data/services'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/services/BookingModal'

export default function ServiceDetail() {
  const params = useParams()
  const [showBooking, setShowBooking] = useState(false)
  
  const allServices = getAllServices()
  const service = allServices.find(s => s.id === params.id)
  
  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600">The requested service could not be found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-4xl">{service.icon}</span>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
                  <p className="text-lg text-gray-600">{service.category}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-lg font-semibold">{service.rating}</span>
                <span className="text-gray-500">(124 reviews)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-xl font-semibold mb-4">Service Details</h2>
                <p className="text-gray-600 mb-6">{service.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">{service.availability}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">Dubai, UAE</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700">+971 4 123 4567</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                <div className="text-2xl font-bold text-uber-green mb-4">{service.price}</div>
                
                <Button 
                  className="w-full mb-3" 
                  onClick={() => setShowBooking(true)}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBooking && (
        <BookingModal
          service={{
            id: service.id,
            name: service.name,
            type: 'service',
            price: service.price,
            duration: '1-2 hours',
            description: service.description
          }}
          onClose={() => setShowBooking(false)}
        />
      )}
    </div>
  )
}