'use client'

import Link from 'next/link'
import { Heart, Code, Users } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <Logo size="lg" variant="light" />
            <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300 max-w-md leading-relaxed">
              Your all-in-one platform for rides, food delivery, and package services. 
              Built with modern technology for seamless user experience.
            </p>
            <div className="mt-4 sm:mt-6 flex items-center flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-400">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Developed with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 flex-shrink-0" />
              <span>by</span>
              <span className="text-uber-green font-semibold whitespace-nowrap">Team TechRover</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Services</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link href="/services/ride" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Ride Booking</Link></li>
              <li><Link href="/services/food" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Food Delivery</Link></li>
              <li><Link href="/services/package" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Package Delivery</Link></li>
              <li><Link href="/business" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Business Solutions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Support</h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li><Link href="/support" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Help Center</Link></li>
              <li><Link href="/chat" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Live Chat</Link></li>
              <li><Link href="/contact" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Contact Us</Link></li>
              <li><Link href="/safety" className="text-sm sm:text-base text-gray-300 hover:text-white transition-colors block py-1">Safety</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 lg:space-x-6 text-xs sm:text-sm text-gray-400">
              <span className="text-center sm:text-left">© 2025 T ALI Platform. All rights reserved.</span>
              <div className="flex items-center space-x-3 sm:space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</Link>
                <Link href="/terms" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</Link>
              </div>
            </div>
            
            <div className="flex items-center space-x-1.5 sm:space-x-2 text-xs sm:text-sm">
              <Users className="w-3 h-3 sm:w-4 sm:h-4 text-uber-green flex-shrink-0" />
              <span className="text-gray-300">Powered by</span>
              <span className="font-bold text-uber-green whitespace-nowrap">TechRover Team</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}