'use client'

import { useState } from 'react'
import { Star, MapPin, Clock, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/services/BookingModal'

export default function BeautyServices() {
  const [showBooking, setShowBooking] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const salons = [
    {
      id: 1,
      name: 'Glamour Beauty Salon',
      rating: 4.8,
      reviews: 234,
      distance: '1.2 km',
      image: '💇‍♀️',
      services: [
        { name: 'Hair Cut & Style', price: 'AED 80', duration: '45 mins' },
        { name: 'Hair Color', price: 'AED 150', duration: '2 hours' },
        { name: 'Manicure', price: 'AED 40', duration: '30 mins' },
        { name: 'Pedicure', price: 'AED 50', duration: '45 mins' },
        { name: 'Facial Treatment', price: 'AED 120', duration: '60 mins' }
      ],
      address: 'Dubai Marina Walk, Dubai',
      phone: '+971 4 123 4567',
      hours: '9:00 AM - 9:00 PM'
    },
    {
      id: 2,
      name: 'Elite Spa & Wellness',
      rating: 4.9,
      reviews: 189,
      distance: '2.1 km',
      image: '🧖‍♀️',
      services: [
        { name: 'Full Body Massage', price: 'AED 200', duration: '90 mins' },
        { name: 'Hot Stone Therapy', price: 'AED 250', duration: '75 mins' },
        { name: 'Aromatherapy', price: 'AED 180', duration: '60 mins' },
        { name: 'Deep Cleansing Facial', price: 'AED 140', duration: '75 mins' }
      ],
      address: 'Jumeirah Beach Road, Dubai',
      phone: '+971 4 234 5678',
      hours: '10:00 AM - 10:00 PM'
    },
    {
      id: 3,
      name: 'Nails & More Studio',
      rating: 4.7,
      reviews: 156,
      distance: '0.8 km',
      image: '💅',
      services: [
        { name: 'Gel Manicure', price: 'AED 60', duration: '45 mins' },
        { name: 'Nail Art Design', price: 'AED 80', duration: '60 mins' },
        { name: 'Acrylic Extensions', price: 'AED 120', duration: '90 mins' },
        { name: 'Eyebrow Threading', price: 'AED 25', duration: '15 mins' }
      ],
      address: 'Mall of the Emirates, Dubai',
      phone: '+971 4 345 6789',
      hours: '10:00 AM - 11:00 PM'
    }
  ]

  const handleBookService = (salon: any, service: any) => {
    setSelectedService({
      id: `${salon.id}-${service.name}`,
      name: `${service.name} at ${salon.name}`,
      type: 'beauty',
      price: service.price,
      duration: service.duration,
      description: `Professional ${service.name.toLowerCase()} service`,
      provider: salon.name,
      address: salon.address
    })
    setShowBooking(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">💇‍♀️</div>
          <h1 className="text-3xl font-bold text-gray-900">Beauty & Personal Care</h1>
          <p className="text-gray-600 mt-2">Professional beauty services at your convenience</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <div key={salon.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{salon.image}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{salon.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{salon.rating} ({salon.reviews})</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{salon.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{salon.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{salon.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{salon.phone}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Services</h4>
                  {salon.services.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-uber-green text-sm">{service.price}</p>
                        <Button 
                          size="sm" 
                          className="mt-1"
                          onClick={() => handleBookService(salon, service)}
                        >
                          Book
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call {salon.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Own a Beauty Business?</h2>
          <p className="mb-6">Join our platform and connect with thousands of customers looking for beauty services</p>
          <Button variant="outline" className="bg-white text-pink-600 hover:bg-gray-100">
            Register Your Salon
          </Button>
        </div>
      </div>

      {showBooking && selectedService && (
        <BookingModal
          service={selectedService}
          onClose={() => {
            setShowBooking(false)
            setSelectedService(null)
          }}
        />
      )}
    </div>
  )
}