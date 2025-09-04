'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Car, UtensilsCrossed, Package, Clock, Shield, Star, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/lib/useTranslation'
import { serviceCategories } from '@/lib/data/services'

export default function Services() {
  const { t } = useTranslation()
  
  // Main featured services
  const featuredServices = [
    {
      id: 'ride',
      title: 'Ride Services',
      description: 'Quick, safe, and reliable transportation across Dubai',
      icon: Car,
      color: 'bg-uber-black',
      link: '/ride/book'
    },
    {
      id: 'food',
      title: 'Food Delivery',
      description: 'Delicious meals delivered from top restaurants',
      icon: UtensilsCrossed,
      color: 'bg-red-500',
      link: '/services/food'
    },
    {
      id: 'package',
      title: 'Package Delivery',
      description: 'Fast and secure package delivery service',
      icon: Package,
      color: 'bg-blue-500',
      link: '/services/package'
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
            Your Complete Service Solution in Dubai
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
            From rides to food delivery, home services to professional consulting - we connect you with 70+ trusted services across Dubai. One platform, endless possibilities.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Shield className="w-4 h-4 text-green-500" />
              Verified Providers
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-blue-500" />
              24/7 Support
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              4.8+ Rating
            </span>
          </div>
        </motion.div>

        {/* Featured Services */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {featuredServices.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden uber-card group"
              >
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
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-uber-black mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  <Link href={service.link}>
                    <Button className="w-full uber-button group-hover:bg-uber-black group-hover:text-white transition-all">
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* All Service Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold text-uber-black text-center mb-4">
            Explore All Services
          </h3>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Discover our complete range of services designed to make your life easier
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Object.entries(serviceCategories).map(([key, category], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border border-gray-100 hover:border-uber-green/20 group cursor-pointer"
              >
                <div className="text-3xl mb-3">{category.title.split(' ')[0]}</div>
                <h4 className="font-semibold text-uber-black mb-2 group-hover:text-uber-green transition-colors">
                  {category.title.substring(category.title.indexOf(' ') + 1)}
                </h4>
                <p className="text-sm text-gray-500 mb-4">
                  {category.services.length} services available
                </p>
                <div className="space-y-1">
                  {category.services.slice(0, 3).map((service, idx) => (
                    <div key={idx} className="text-xs text-gray-400 flex items-center">
                      <div className="w-1 h-1 bg-uber-green rounded-full mr-2" />
                      {service.name}
                    </div>
                  ))}
                  {category.services.length > 3 && (
                    <div className="text-xs text-uber-green font-medium">
                      +{category.services.length - 3} more
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-uber-black to-gray-800 rounded-2xl p-8 text-center text-white mb-16"
        >
          <h3 className="text-2xl font-bold mb-4">
            Ready to Experience Dubai's Best Services?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust T Ali Platform for all their service needs
          </p>
          <Link href="/dashboard">
            <Button className="bg-uber-green hover:bg-uber-green/90 text-white px-8 py-3">
              Explore All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

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