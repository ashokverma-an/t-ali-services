'use client'

import { useState } from 'react'
import { Star, MapPin, Clock, Phone, Stethoscope } from 'lucide-react'
import Button from '@/components/ui/Button'
import BookingModal from '@/components/services/BookingModal'

export default function MedicalServices() {
  const [showBooking, setShowBooking] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)

  const providers = [
    {
      id: 1,
      name: 'Dubai Health Clinic',
      type: 'Multi-Specialty Clinic',
      rating: 4.9,
      reviews: 456,
      distance: '1.5 km',
      image: '🏥',
      services: [
        { name: 'General Consultation', price: 'AED 150', duration: '30 mins', doctor: 'Dr. Ahmed Hassan' },
        { name: 'Cardiology Checkup', price: 'AED 300', duration: '45 mins', doctor: 'Dr. Sarah Khan' },
        { name: 'Blood Test Package', price: 'AED 200', duration: '15 mins', doctor: 'Lab Technician' },
        { name: 'X-Ray Scan', price: 'AED 120', duration: '20 mins', doctor: 'Radiologist' }
      ],
      address: 'Healthcare City, Dubai',
      phone: '+971 4 123 4567',
      hours: '24/7 Emergency'
    },
    {
      id: 2,
      name: 'Smile Dental Center',
      type: 'Dental Clinic',
      rating: 4.8,
      reviews: 234,
      distance: '2.3 km',
      image: '🦷',
      services: [
        { name: 'Dental Checkup', price: 'AED 100', duration: '30 mins', doctor: 'Dr. Omar Ali' },
        { name: 'Teeth Cleaning', price: 'AED 150', duration: '45 mins', doctor: 'Dr. Fatima Hassan' },
        { name: 'Tooth Filling', price: 'AED 200', duration: '60 mins', doctor: 'Dr. Omar Ali' },
        { name: 'Root Canal', price: 'AED 800', duration: '90 mins', doctor: 'Dr. Fatima Hassan' }
      ],
      address: 'Jumeirah Road, Dubai',
      phone: '+971 4 234 5678',
      hours: '8:00 AM - 8:00 PM'
    },
    {
      id: 3,
      name: 'Vision Eye Care',
      type: 'Eye Clinic',
      rating: 4.7,
      reviews: 189,
      distance: '1.8 km',
      image: '👓',
      services: [
        { name: 'Eye Examination', price: 'AED 120', duration: '30 mins', doctor: 'Dr. Khalid Omar' },
        { name: 'Contact Lens Fitting', price: 'AED 80', duration: '20 mins', doctor: 'Optometrist' },
        { name: 'Glaucoma Screening', price: 'AED 200', duration: '45 mins', doctor: 'Dr. Khalid Omar' },
        { name: 'Laser Eye Surgery', price: 'AED 3000', duration: '60 mins', doctor: 'Dr. Khalid Omar' }
      ],
      address: 'Business Bay, Dubai',
      phone: '+971 4 345 6789',
      hours: '9:00 AM - 7:00 PM'
    }
  ]

  const handleBookService = (provider: any, service: any) => {
    setSelectedService({
      id: `${provider.id}-${service.name}`,
      name: `${service.name} - ${provider.name}`,
      type: 'medical',
      price: service.price,
      duration: service.duration,
      description: `Professional medical consultation with ${service.doctor}`,
      provider: provider.name,
      address: provider.address,
      doctor: service.doctor
    })
    setShowBooking(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🏥</div>
          <h1 className="text-3xl font-bold text-gray-900">Health & Medical Services</h1>
          <p className="text-gray-600 mt-2">Professional healthcare services with qualified doctors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{provider.image}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      <p className="text-sm text-gray-500">{provider.type}</p>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span>{provider.rating} ({provider.reviews})</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          <span>{provider.distance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{provider.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{provider.hours}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{provider.phone}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Available Services</h4>
                  {provider.services.map((service, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{service.name}</p>
                        <p className="text-xs text-gray-500">{service.doctor}</p>
                        <p className="text-xs text-gray-400">{service.duration}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-uber-green text-sm">{service.price}</p>
                        <Button 
                          size="sm" 
                          className="mt-1"
                          onClick={() => handleBookService(provider, service)}
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
                    Call {provider.name}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-500 to-teal-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Healthcare Provider?</h2>
          <p className="mb-6">Join our platform and offer your medical services to thousands of patients</p>
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100">
            Register Your Clinic
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