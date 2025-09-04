'use client'

import { useState, useEffect } from 'react'
import { translations, Language, TranslationKey } from './i18n'

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Set document direction for RTL languages
    const isRTL = language === 'ar' || language === 'ur'
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = language
  }, [language])

  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
  }

  const t = (key: string): string => {
    return (translations[language] as any)[key] || (translations.en as any)[key] || key
  }

  const isRTL = language === 'ar' || language === 'ur'

  return {
    language,
    changeLanguage,
    t,
    isRTL
  }
}