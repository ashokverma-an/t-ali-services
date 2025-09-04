'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Clock, Phone, Globe, ChevronRight } from 'lucide-react'
import Button from '@/components/ui/Button'

const serviceCategories = [
  {
    icon: '💼',
    title: 'Professional Services',
    services: ['Legal Services / Lawyers', 'Accounting & Bookkeeping', 'Financial Advisors', 'Consulting Services', 'Marketing & Advertising', 'IT & Tech Support']
  },
  {
    icon: '🛍️',
    title: 'Retail & Shopping',
    services: ['Clothing & Accessories', 'Electronics', 'Furniture & Home Decor', 'Grocery Stores', 'Jewelry', 'Bookstores']
  },
  {
    icon: '🍽️',
    title: 'Food & Drink',
    services: ['Restaurants', 'Cafés & Coffee Shops', 'Bars & Pubs', 'Bakeries', 'Catering Services', 'Food Trucks']
  },
  {
    icon: '🏠',
    title: 'Home Services',
    services: ['Plumbing', 'Electrical', 'Roofing', 'Cleaning Services', 'Landscaping & Gardening', 'Pest Control']
  },
  {
    icon: '🏢',
    title: 'Real Estate & Property',
    services: ['Real Estate Agents', 'Property Management', 'Rental Services', 'Construction & Renovation', 'Architecture & Interior Design']
  },
  {
    icon: '🚗',
    title: 'Automotive',
    services: ['Car Dealerships', 'Auto Repair & Maintenance', 'Car Wash & Detailing', 'Auto Parts & Accessories', 'Towing Services']
  },
  {
    icon: '💇',
    title: 'Beauty & Personal Care',
    services: ['Hair Salons', 'Nail Salons', 'Spas & Massage', 'Skincare Clinics', 'Barbershops']
  },
  {
    icon: '🏋️',
    title: 'Health & Fitness',
    services: ['Gyms & Fitness Centers', 'Yoga Studios', 'Personal Trainers', 'Nutritionists', 'Sports Clubs']
  },
  {
    icon: '🏥',
    title: 'Health & Medical',
    services: ['Hospitals & Clinics', 'Dentists', 'Optometrists', 'Chiropractors', 'Pharmacies', 'Therapists & Counselors']
  },
  {
    icon: '🧒',
    title: 'Education & Childcare',
    services: ['Schools & Colleges', 'Tutors', 'Daycare Centers', 'Learning Centers', 'Driving Schools']
  },
  {
    icon: '📦',
    title: 'Logistics & Transportation',
    services: ['Courier Services', 'Moving Companies', 'Freight & Shipping', 'Taxi & Ride Services']
  },
  {
    icon: '🎉',
    title: 'Events & Entertainment',
    services: ['Event Planners', 'DJs & Bands', 'Photography & Videography', 'Party Rentals', 'Wedding Services']
  },
  {
    icon: '📸',
    title: 'Media & Creative Services',
    services: ['Graphic Design', 'Photography Studios', 'Video Production', 'Printing Services', 'Web Design & Development']
  },
  {
    icon: '🐾',
    title: 'Pets & Animals',
    services: ['Veterinary Clinics', 'Pet Grooming', 'Pet Stores', 'Dog Training', 'Pet Sitting & Boarding']
  }
]

const mockProviders = [
  { id: 1, name: 'Dubai Legal Associates', category: 'Legal Services', rating: 4.8, reviews: 156, distance: '2.1 km', price: 'AED 500/hr' },
  { id: 2, name: 'TechFix Solutions', category: 'IT Support', rating: 4.9, reviews: 203, distance: '1.5 km', price: 'AED 200/visit' },
  { id: 3, name: 'Elite Cleaning Co.', category: 'Cleaning Services', rating: 4.7, reviews: 89, distance: '3.2 km', price: 'AED 150/hr' },
  { id: 4, name: 'Wellness Spa Dubai', category: 'Spas & Massage', rating: 4.9, reviews: 312, distance: '1.8 km', price: 'AED 300/session' },
  { id: 5, name: 'Prime Fitness Center', category: 'Gyms', rating: 4.6, reviews: 445, distance: '2.5 km', price: 'AED 200/month' },
  { id: 6, name: 'Dubai Dental Clinic', category: 'Dentists', rating: 4.8, reviews: 178, distance: '1.2 km', price: 'AED 250/visit' }
]

export default function AllServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProviders = mockProviders.filter(provider => 
    (!selectedCategory || provider.category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (!searchQuery || provider.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     provider.category.toLowerCase().includes(searchQuery.toLowerCase()))
  )

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
                {serviceCategories.map((category) => (
                  <button
                    key={category.title}
                    onClick={() => setSelectedCategory(category.title)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex items-center ${
                      selectedCategory === category.title ? 'bg-uber-green text-white' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="mr-2">{category.icon}</span>
                    <span className="text-sm">{category.title}</span>
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
                {serviceCategories.map((category) => (
                  <div key={category.title} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{category.icon}</span>
                      <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {category.services.slice(0, 4).map((service) => (
                        <div key={service} className="flex items-center text-gray-600">
                          <ChevronRight className="w-4 h-4 mr-2 text-uber-green" />
                          <span className="text-sm">{service}</span>
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
                      onClick={() => setSelectedCategory(category.title)}
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
                    {serviceCategories.find(cat => cat.title === selectedCategory)?.icon} {selectedCategory}
                  </h2>
                  <Button variant="outline" onClick={() => setSelectedCategory(null)}>
                    View All Categories
                  </Button>
                </div>

                {/* Services List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {serviceCategories.find(cat => cat.title === selectedCategory)?.services.map((service) => (
                    <div key={service} className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center">
                        <ChevronRight className="w-5 h-5 mr-2 text-uber-green" />
                        <span className="font-medium text-gray-900">{service}</span>
                      </div>
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
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{provider.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{provider.category}</p>
                        
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
                          <span className="font-semibold text-uber-green">{provider.price}</span>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-4 h-4" />
                            </Button>
                            <Button size="sm">Book Now</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}