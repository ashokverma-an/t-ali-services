'use client'

import Link from 'next/link'
import { Heart, Code, Users } from 'lucide-react'
import Logo from '@/components/ui/Logo'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <Logo size="lg" variant="light" />
            <p className="mt-4 text-gray-300 max-w-md">
              Your all-in-one platform for rides, food delivery, and package services. 
              Built with modern technology for seamless user experience.
            </p>
            <div className="mt-6 flex items-center space-x-2 text-sm text-gray-400">
              <Code className="w-4 h-4" />
              <span>Developed with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>by</span>
              <span className="text-uber-green font-semibold">Team TechRover</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/ride" className="text-gray-300 hover:text-white transition-colors">Ride Booking</Link></li>
              <li><Link href="/services/food" className="text-gray-300 hover:text-white transition-colors">Food Delivery</Link></li>
              <li><Link href="/services/package" className="text-gray-300 hover:text-white transition-colors">Package Delivery</Link></li>
              <li><Link href="/business" className="text-gray-300 hover:text-white transition-colors">Business Solutions</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/support" className="text-gray-300 hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="/chat" className="text-gray-300 hover:text-white transition-colors">Live Chat</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/safety" className="text-gray-300 hover:text-white transition-colors">Safety</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>© 2024 GBS Platform. All rights reserved.</span>
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm">
                <Users className="w-4 h-4 text-uber-green" />
                <span className="text-gray-300">Powered by</span>
                <span className="font-bold text-uber-green">TechRover Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}