'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'

interface MapComponentProps {
  pickup?: { lat: number; lng: number }
  destination?: { lat: number; lng: number }
  showRoute?: boolean
  className?: string
}

export default function MapComponent({ 
  pickup, 
  destination, 
  showRoute = false, 
  className = '' 
}: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  // Mock map implementation for demo
  // In production, you would integrate with Google Maps, Mapbox, or similar
  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={`relative w-full h-full bg-gray-100 ${className}`} ref={mapRef}>
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-uber-green border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading map...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mock Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
            {/* Grid pattern to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-8 grid-rows-8 h-full">
                {Array.from({ length: 64 }).map((_, i) => (
                  <div key={i} className="border border-gray-300"></div>
                ))}
              </div>
            </div>

            {/* Mock streets */}
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-0 right-0 h-1 bg-gray-400"></div>
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-400"></div>
              <div className="absolute top-3/4 left-0 right-0 h-1 bg-gray-400"></div>
              <div className="absolute left-1/4 top-0 bottom-0 w-1 bg-gray-400"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gray-400"></div>
              <div className="absolute left-3/4 top-0 bottom-0 w-1 bg-gray-400"></div>
            </div>

            {/* Pickup Marker */}
            {pickup && (
              <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                    Pickup
                  </div>
                </div>
              </div>
            )}

            {/* Destination Marker */}
            {destination && (
              <div className="absolute top-2/3 left-2/3 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                    <Navigation className="w-5 h-5 text-white" />
                  </div>
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                    Destination
                  </div>
                </div>
              </div>
            )}

            {/* Route Line */}
            {showRoute && pickup && destination && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <pattern id="dashed" patternUnits="userSpaceOnUse" width="10" height="2">
                    <rect width="5" height="2" fill="#10B981" />
                    <rect x="5" width="5" height="2" fill="transparent" />
                  </pattern>
                </defs>
                <path
                  d={`M ${33.33}% ${33.33}% Q ${50}% ${40}% ${66.66}% ${66.66}%`}
                  stroke="url(#dashed)"
                  strokeWidth="3"
                  fill="none"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Mock Driver Location (if showing route) */}
            {showRoute && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow text-xs whitespace-nowrap">
                    Driver
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 space-y-2">
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
              <span className="text-lg font-bold">+</span>
            </button>
            <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50">
              <span className="text-lg font-bold">−</span>
            </button>
          </div>

          {/* Current Location Button */}
          <button className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50">
            <Navigation className="w-5 h-5 text-gray-600" />
          </button>
        </>
      )}
    </div>
  )
}