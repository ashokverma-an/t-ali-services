'use client'

import { Suspense, useEffect } from 'react'
import Hero from '@/components/layout/Hero'
import Services from '@/components/layout/Services'
import Features from '@/components/layout/Features'
import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { useTranslation } from '@/lib/useTranslation'

export default function HomePage() {
  const { language, isRTL } = useTranslation()

  useEffect(() => {
    const titles = {
      en: 'T Ali Services - Dubai\'s Premier Service Platform',
      ar: 'خدمات تي علي - منصة دبي الرائدة للخدمات',
      ur: 'ٹی علی سروسز - دبئی کا بہترین سروس پلیٹ فارم',
      fr: 'T Ali Services - Plateforme de services première de Dubaï',
      hi: 'टी अली सेवाएं - दुबई का प्रमुख सेवा मंच'
    }
    document.title = titles[language as keyof typeof titles] || titles.en
  }, [language])

  return (
    <main className={`min-h-screen bg-white ${isRTL ? 'rtl' : 'ltr'} ${language === 'ar' || language === 'ur' ? 'dubai-theme' : ''}`}>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <Services />
        <Features />
        <Footer />
      </Suspense>
    </main>
  )
}