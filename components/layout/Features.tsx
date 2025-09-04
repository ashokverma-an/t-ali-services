'use client'

import { motion } from 'framer-motion'
import { 
  Smartphone, 
  MapPin, 
  CreditCard, 
  Shield, 
  Clock, 
  Users,
  Star,
  Headphones
} from 'lucide-react'
import Button from '@/components/ui/Button'
import { useTranslation } from '@/lib/useTranslation'

export default function Features() {
  const { t, language } = useTranslation()
  const features = [
    {
      icon: Smartphone,
      title: 'Easy to Use',
      description: 'Simple, intuitive interface that gets you where you need to go in just a few taps'
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'Track your ride, food delivery, or package in real-time with precise GPS location'
    },
    {
      icon: CreditCard,
      title: 'Secure Payments',
      description: 'Multiple payment options with bank-level security and encryption'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Background-checked drivers, insurance coverage, and 24/7 safety support'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Available round the clock, whenever you need us most'
    },
    {
      icon: Users,
      title: 'Trusted Community',
      description: 'Join millions of users who trust our platform for their daily needs'
    },
    {
      icon: Star,
      title: 'Top Rated',
      description: 'Consistently rated as the best service platform by our users'
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      description: 'Dedicated support team ready to help you with any questions or issues'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-uber-green to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-uber-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`mt-20 bg-gradient-to-r ${language === 'ar' || language === 'ur' ? 'from-amber-600 to-orange-700' : 'from-uber-black to-gray-800'} rounded-3xl p-12 text-center text-white`}
        >
          <h3 className="text-3xl font-bold mb-4">
            Ready to get started?
          </h3>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who rely on T Ali Services for their daily transportation, food delivery, and package shipping needs in Dubai
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="primary" size="lg">
                Download App
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-uber-black">
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}