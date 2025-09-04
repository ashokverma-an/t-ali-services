'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Search, ArrowRight, Car, UtensilsCrossed, Package } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useTranslation } from '@/lib/useTranslation'

export default function Hero() {
  const [activeService, setActiveService] = useState('ride')
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const { t } = useTranslation()

  const services = [
    { id: 'ride', name: t('nav.ride'), icon: Car, color: 'bg-uber-black' },
    { id: 'food', name: t('nav.food'), icon: UtensilsCrossed, color: 'bg-red-500' },
    { id: 'package', name: t('nav.package'), icon: Package, color: 'bg-blue-500' },
  ]

  const getSearchLink = () => {
    switch (activeService) {
      case 'ride':
        return '/ride/book'
      case 'food':
        return '/services/food'
      case 'package':
        return '/services/package'
      default:
        return '/services/ride'
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-uber-green rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-uber-black rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-uber-black leading-tight">
                {t('hero.title')}
                <br />
                <span className="text-uber-green">{t('hero.subtitle')}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {t('hero.description')}
              </p>
            </div>

            {/* Service Selector */}
            <div className="flex space-x-2 p-1 bg-gray-100 rounded-xl">
              {services.map((service) => {
                const Icon = service.icon
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveService(service.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 ${
                      activeService === service.id
                        ? `${service.color} text-white shadow-lg`
                        : 'text-gray-600 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{service.name}</span>
                  </button>
                )
              })}
            </div>

            {/* Search Form */}
            <motion.div
              key={activeService}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-6 space-y-4"
            >
              <div className="space-y-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={
                      activeService === 'ride' ? t('hero.pickup') :
                      activeService === 'food' ? t('hero.delivery') :
                      t('hero.pickup_package')
                    }
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="pl-12 h-14 text-lg"
                  />
                </div>
                
                {activeService === 'ride' && (
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder={t('hero.destination')}
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="pl-12 h-14 text-lg"
                    />
                  </div>
                )}
              </div>

              <Link href={getSearchLink()}>
                <Button
                  className="w-full h-14 text-lg font-semibold uber-button"
                  size="lg"
                >
                  {activeService === 'ride' ? t('hero.request_ride') :
                   activeService === 'food' ? t('hero.find_food') :
                   t('hero.send_package')}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-uber-black">10M+</div>
                <div className="text-gray-600">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-uber-black">500+</div>
                <div className="text-gray-600">Cities</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-uber-black">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Animated Car */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 1, 0, -1, 0]
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <div className="w-64 h-64 bg-gradient-to-br from-uber-black to-gray-800 rounded-3xl shadow-2xl flex items-center justify-center">
                  <Car className="w-32 h-32 text-white" />
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute top-20 right-20 w-16 h-16 bg-uber-green rounded-full shadow-lg flex items-center justify-center"
              >
                <UtensilsCrossed className="w-8 h-8 text-white" />
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
                className="absolute bottom-20 left-20 w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center"
              >
                <Package className="w-8 h-8 text-white" />
              </motion.div>

              {/* Pulse Rings */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-uber-green rounded-full"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-uber-black rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}