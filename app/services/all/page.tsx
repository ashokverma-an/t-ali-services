'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Clock, Phone, Calendar, ShoppingCart, ChevronRight, User } from 'lucide-react'
import Button from '@/components/ui/Button'
import { serviceCategories } from '@/lib/data/services'
import { useRouter } from 'next/navigation'

const mockProviders = [
  { id: 1, name: 'Dubai Medical Center', category: 'Hospitals & Clinics', type: 'medical', rating: 4.8, reviews: 156, distance: '2.1 km', price: '₹300/visit', speciality: 'General Medicine' },
  { id: 2, name: 'Al Zahra Hospital', category: 'Hospitals & Clinics', type: 'medical', rating: 4.9, reviews: 203, distance: '1.5 km', price: '₹500/visit', speciality: 'Cardiology' },
  { id: 3, name: 'Dubai Dental Clinic', category: 'Dentists', type: 'medical', rating: 4.7, reviews: 89, distance: '3.2 km', price: '₹250/visit', speciality: 'Dental Care' },
  { id: 4, name: 'Spice Route Restaurant', category: 'Restaurants', type: 'food', rating: 4.9, reviews: 312, distance: '1.8 km', price: '₹25-50/dish', cuisine: 'Indian' },
  { id: 5, name: 'Dubai Cafe', category: 'Cafés & Coffee Shops', type: 'food', rating: 4.6, reviews: 445, distance: '2.5 km', price: '₹15-30/item', cuisine: 'Coffee & Snacks' },
  { id: 6, name: 'Elite Cleaning Co.', category: 'Cleaning Services', type: 'service', rating: 4.8, reviews: 178, distance: '1.2 km', price: '₹150/hr', speciality: 'Home Cleaning' }
]

export default function AllServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<any>(null)
  const [bookingStep, setBookingStep] = useState(1)
  const router = useRouter()

  const filteredProviders = mockProviders.filter(provider => 
    (!selectedCategory || provider.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (!searchQuery || provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     provider.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  const handleBooking = (provider: any) => {
    setSelectedProvider(provider)
    setShowBookingModal(true)
    setBookingStep(1)
  }

  const handleFinalBooking = () => {
    setShowBookingModal(false)
    router.push('/auth/signin?redirect=/services/all')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">All Services Directory</h1>
            <p className="mt-2 text-lg text-gray-600">Find any service you need in Dubai - All in one platform</p>
          </div>
          
          {/* Search Bar */}
          <div className="mt-6 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for any service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-uber-green focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Categories</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-uber-green text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  All Services
                </button>
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(category.title.substring(category.title.indexOf(' ') + 1))}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                      selectedCategory === category.title.substring(category.title.indexOf(' ') + 1) ? 'bg-uber-green text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.title.split(' ')[0]}</span>
                    <span className="text-sm">{category.title.substring(category.title.indexOf(' ') + 1)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {!selectedCategory ? (
              /* Category Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(serviceCategories).map(([key, category]) => (
                  <div key={key} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.title.split(' ')[0]}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title.substring(category.title.indexOf(' ') + 1)}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.services.slice(0, 4).map((service) => (
                        <div key={service.id} className="flex items-center text-gray-600">
                          <ChevronRight className="w-4 h-4 mr-2 text-uber-green" />
                          <span className="text-sm">{service.name}</span>
                        </div>
                      ))}
                      {category.services.length > 4 && (
                        <div className="text-sm text-uber-green font-medium">
                          +{category.services.length - 4} more services
                        </div>
                      )}
                    </div>
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={() => setSelectedCategory(category.title.substring(category.title.indexOf(' ') + 1))}
                    >
                      View All Services
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              /* Selected Category Services */
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {Object.values(serviceCategories).find(cat => cat.title.substring(cat.title.indexOf(' ') + 1) === selectedCategory)?.title.split(' ')[0]} {selectedCategory}
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                    View All Categories
                  </Button>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {Object.values(serviceCategories).find(cat => cat.title.substring(cat.title.indexOf(' ') + 1) === selectedCategory)?.services.map((service) => (
                    <div key={service.id} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ChevronRight className="w-5 h-5 mr-2 text-uber-green" />
                          <span className="font-medium text-gray-900">{service.name}</span>
                        </div>
                        <span className="text-sm text-green-600 font-medium">{service.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 ml-7">{service.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Service Providers */}
            <div className="mt-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Featured Service Providers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProviders.map((provider) => (
                  <div key={provider.id} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex-shrink-0 flex items-center justify-center">
                        {provider.type === 'medical' ? '🏥' : provider.type === 'food' ? '🍽️' : '🔧'}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-600 mb-1">{provider.category}</p>
                        <p className="text-xs text-blue-600 mb-2">{provider.speciality || provider.cuisine}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 mr-1" />
                            <span>{provider.rating} ({provider.reviews})</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>{provider.distance}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-green-600">{provider.price}</span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button size="sm" onClick={() => handleBooking(provider)}>
                              {provider.type === 'medical' ? (
                                <><Calendar className="w-4 h-4 mr-1" />Book Appointment</>
                              ) : provider.type === 'food' ? (
                                <><ShoppingCart className="w-4 h-4 mr-1" />Order Now</>
                              ) : (
                                'Book Now'
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Modal */}
            {showBookingModal && selectedProvider && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg max-w-md w-full p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    {selectedProvider.type === 'medical' ? 'Book Appointment' : 'Place Order'} - {selectedProvider.name}
                  </h3>
                  
                  {bookingStep === 1 && (
                    <div className="space-y-4">
                      {selectedProvider.type === 'medical' ? (
                        <>
                          <div>
                            <label className="block text-sm font-medium mb-2">Select Date</label>
                            <input type="date" className="w-full p-2 border rounded-lg" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Select Time</label>
                            <select className="w-full p-2 border rounded-lg">
                              <option>9:00 AM</option>
                              <option>10:00 AM</option>
                              <option>11:00 AM</option>
                              <option>2:00 PM</option>
                              <option>3:00 PM</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Reason for Visit</label>
                            <textarea className="w-full p-2 border rounded-lg" rows={3} placeholder="Brief description..."></textarea>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Butter Chicken</span>
                              <div className="flex items-center space-x-2">
                                <button className="w-6 h-6 bg-gray-200 rounded text-sm">-</button>
                                <span>1</span>
                                <button className="w-6 h-6 bg-gray-200 rounded text-sm">+</button>
                                <span className="font-semibold">₹45</span>
                              </div>
                            </div>
                            <div className="flex justify-between items-center p-2 border rounded">
                              <span>Naan Bread</span>
                              <div className="flex items-center space-x-2">
                                <button className="w-6 h-6 bg-gray-200 rounded text-sm">-</button>
                                <span>2</span>
                                <button className="w-6 h-6 bg-gray-200 rounded text-sm">+</button>
                                <span className="font-semibold">₹30</span>
                              </div>
                            </div>
                          </div>
                          <div className="border-t pt-2">
                            <div className="flex justify-between font-semibold">
                              <span>Total: ₹75</span>
                            </div>
                          </div>
                        </>
                      )}
                      
                      <div className="flex space-x-3 pt-4">
                        <Button variant="outline" onClick={() => setShowBookingModal(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={() => setBookingStep(2)} className="flex-1">
                          Continue
                        </Button>
                      </div>
                    </div>
                  )}

                  {bookingStep === 2 && (
                    <div className="space-y-4">
                      <div className="text-center py-4">
                        <User className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                        <h4 className="font-semibold mb-2">Login Required</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Please login to complete your {selectedProvider.type === 'medical' ? 'appointment booking' : 'order'}
                        </p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button variant="outline" onClick={() => setBookingStep(1)} className="flex-1">
                          Back
                        </Button>
                        <Button onClick={handleFinalBooking} className="flex-1">
                          Login to Continue
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}