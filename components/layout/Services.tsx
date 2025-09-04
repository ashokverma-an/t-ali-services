'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Car, UtensilsCrossed, Package, Clock, Shield, Star } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/lib/useTranslation'

export default function Services() {
  const { t } = useTranslation()
  const services = [
    {
      id: 'ride',
      title: t('services.ride.title'),
      description: t('services.ride.description'),
      icon: Car,
      color: 'bg-uber-black',
      features: ['24/7 availability', 'Real-time tracking', 'Multiple vehicle types'],
      image: '/images/ride-service.jpg'
    },
    {
      id: 'food',
      title: t('services.food.title'),
      description: t('services.food.description'),
      icon: UtensilsCrossed,
      color: 'bg-red-500',
      features: ['Thousands of restaurants', 'Fast delivery', 'Live order tracking'],
      image: '/images/food-service.jpg'
    },
    {
      id: 'package',
      title: t('services.package.title'),
      description: t('services.package.description'),
      icon: Package,
      color: 'bg-blue-500',
      features: ['Same-day delivery', 'Secure handling', 'Proof of delivery'],
      image: '/images/package-service.jpg'
    }
  ]

  const stats = [
    { icon: Clock, value: '5 min', label: 'Average wait time' },
    { icon: Shield, value: '99.9%', label: 'Safety rating' },
    { icon: Star, value: '4.8', label: 'User rating' },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-uber-black mb-4">
            {t('services.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.description')}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden uber-card"
              >
                {/* Service Image */}
                <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  <div className={`absolute inset-0 ${service.color} opacity-10`} />
                  <div className="absolute top-4 left-4">
                    <div className={`w-12 h-12 ${service.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-2 border-white/20 rounded-full flex items-center justify-center"
                    >
                      <Icon className="w-8 h-8 text-gray-400" />
                    </motion.div>
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-uber-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-uber-green rounded-full mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link href={service.id === 'ride' ? '/ride/book' : `/services/${service.id}`}>
                    <Button 
                      className="w-full uber-button"
                      variant="outline"
                    >
                      {t('common.get_started')}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-uber-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-uber-green" />
                  </div>
                  <div className="text-3xl font-bold text-uber-black mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600">
                    {stat.label}
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}