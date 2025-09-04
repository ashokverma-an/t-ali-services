'use client'

import { useTranslation } from '@/lib/useTranslation'

interface DubaiThemeProps {
  children: React.ReactNode
}

export default function DubaiTheme({ children }: DubaiThemeProps) {
  const { language, isRTL } = useTranslation()
  
  const isDubaiLanguage = language === 'ar' || language === 'ur'
  
  return (
    <div 
      className={`
        ${isRTL ? 'rtl' : 'ltr'} 
        ${isDubaiLanguage ? 'dubai-theme' : ''}
      `}
      style={{
        '--primary-color': isDubaiLanguage ? '#d97706' : '#10b981',
        '--secondary-color': isDubaiLanguage ? '#f59e0b' : '#059669',
        '--accent-color': isDubaiLanguage ? '#fbbf24' : '#34d399',
      } as React.CSSProperties}
    >
      {children}
      
      <style jsx global>{`
        .dubai-theme {
          --uber-green: #d97706;
          --uber-green-dark: #b45309;
        }
        
        .dubai-theme .bg-uber-green {
          background-color: #d97706 !important;
        }
        
        .dubai-theme .text-uber-green {
          color: #d97706 !important;
        }
        
        .dubai-theme .border-uber-green {
          border-color: #d97706 !important;
        }
        
        .dubai-theme .hover\\:bg-uber-green:hover {
          background-color: #b45309 !important;
        }
      `}</style>
    </div>
  )
}