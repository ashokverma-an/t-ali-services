'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Car, UtensilsCrossed, Package, Wrench, Home, Heart, Briefcase, GraduationCap, Stethoscope, Scissors, Dumbbell, ShoppingBag, Camera, PawPrint } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'

export default function UserDashboard() {
  const [recentBookings] = useState([
    { id: 'BK001', service: 'Ride', from: 'Home', to: 'Office', status: 'Completed', amount: 'AED 25' },
    { id: 'BK002', service: 'Hair Salon', provider: 'Glamour Salon', status: 'Confirmed', amount: 'AED 120' },
    { id: 'BK003', service: 'Food Delivery', restaurant: 'Pizza Palace', status: 'Delivered', amount: 'AED 45' }
  ])

  const serviceCategories = [
    { name: 'Transportation', icon: Car, color: 'bg-blue-500', services: ['Ride Booking', 'Airport Transfer', 'Hourly Rental'], link: '/services/ride' },
    { name: 'Food & Dining', icon: UtensilsCrossed, color: 'bg-orange-500', services: ['Food Delivery', 'Restaurant Booking', 'Catering'], link: '/services/food' },
    { name: 'Delivery', icon: Package, color: 'bg-green-500', services: ['Package Delivery', 'Document Courier', 'Grocery Delivery'], link: '/services/package' },
    { name: 'Home Services', icon: Home, color: 'bg-purple-500', services: ['Cleaning', 'Plumbing', 'Electrical', 'AC Repair'], link: '/services/home' },
    { name: 'Beauty & Wellness', icon: Scissors, color: 'bg-pink-500', services: ['Hair Salon', 'Spa & Massage', 'Nail Art', 'Skincare'], link: '/services/beauty' },
    { name: 'Health & Medical', icon: Stethoscope, color: 'bg-red-500', services: ['Doctor Consultation', 'Lab Tests', 'Pharmacy', 'Physiotherapy'], link: '/services/medical' },
    { name: 'Professional', icon: Briefcase, color: 'bg-indigo-500', services: ['Legal Services', 'Accounting', 'Consulting', 'IT Support'], link: '/services/professional' },
    { name: 'Fitness & Sports', icon: Dumbbell, color: 'bg-yellow-500', services: ['Gym Membership', 'Personal Trainer', 'Yoga Classes'], link: '/services/fitness' },
    { name: 'Education', icon: GraduationCap, color: 'bg-teal-500', services: ['Tutoring', 'Language Classes', 'Skill Development'], link: '/services/education' },
    { name: 'Shopping', icon: ShoppingBag, color: 'bg-cyan-500', services: ['Personal Shopping', 'Grocery', 'Electronics'], link: '/services/retail' },
    { name: 'Events & Media', icon: Camera, color: 'bg-rose-500', services: ['Photography', 'Event Planning', 'Videography'], link: '/services/events' },
    { name: 'Pet Services', icon: PawPrint, color: 'bg-amber-500', services: ['Pet Grooming', 'Veterinary', 'Pet Sitting'], link: '/services/pets' }
  ]

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back!</h1>
          <p className="text-gray-600">Book any service you need in Dubai</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-r from-uber-green to-green-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Total Bookings</h3>
            <p className="text-3xl font-bold">127</p>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">This Month</h3>
            <p className="text-3xl font-bold">23</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Saved Amount</h3>
            <p className="text-3xl font-bold">AED 450</p>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold">Loyalty Points</h3>
            <p className="text-3xl font-bold">2,340</p>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">All Services</h2>
            <Link href="/services/directory">
              <Button variant="outline">View All Services</Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {serviceCategories.map((category, index) => {
              const IconComponent = category.icon
              return (
                <Link key={index} href={category.link}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    </div>
                    <div className="space-y-1">
                      {category.services.slice(0, 3).map((service, idx) => (
                        <p key={idx} className="text-sm text-gray-600">• {service}</p>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">{booking.service}</h3>
                  <p className="text-sm text-gray-500">
                    {booking.from && booking.to ? `${booking.from} → ${booking.to}` : 
                     booking.provider || booking.restaurant}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-sm mb-1 ${
                    booking.status === 'Completed' || booking.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {booking.status}
                  </div>
                  <p className="font-semibold text-uber-green">{booking.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-uber-green to-green-600 text-white rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Business Owner?</h2>
          <p className="mb-4">Register your business and start accepting bookings from thousands of customers</p>
          <Link href="/business/register">
            <Button variant="outline" className="bg-white text-uber-green hover:bg-gray-100">
              Register Your Business
            </Button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  )
}