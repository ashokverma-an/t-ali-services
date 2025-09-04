'use client'

import { Car } from 'lucide-react'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
  showText?: boolean
}

export default function Logo({ size = 'md', variant = 'dark', showText = true }: LogoProps) {
  const sizes = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-lg' },
    md: { container: 'w-10 h-10', icon: 'w-5 h-5', text: 'text-xl' },
    lg: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-2xl' }
  }

  const colors = {
    light: { bg: 'bg-white', icon: 'text-uber-green', text: 'text-white' },
    dark: { bg: 'bg-gradient-to-br from-uber-green to-green-600', icon: 'text-white', text: 'text-uber-black' }
  }

  return (
    <div className="flex items-center space-x-2">
      <div className={`${sizes[size].container} ${colors[variant].bg} rounded-xl flex items-center justify-center shadow-lg`}>
        <div className="relative">
          <Car className={`${sizes[size].icon} ${colors[variant].icon}`} />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full"></div>
        </div>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold ${colors[variant].text} leading-none`}>
            T Ali
          </span>
          <span className="text-xs text-gray-500 leading-none">Services</span>
        </div>
      )}
    </div>
  )
}