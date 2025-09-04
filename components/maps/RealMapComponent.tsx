'use client'

import { useEffect, useRef } from 'react'

interface RealMapComponentProps {
  pickup?: { lat: number; lng: number }
  destination?: { lat: number; lng: number }
  showRoute?: boolean
  className?: string
}

export default function RealMapComponent({ 
  pickup, 
  destination, 
  showRoute = false,
  className = "w-full h-full"
}: RealMapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    // Initialize map immediately
    const initMap = () => {
      if (!mapRef.current) return
      // Default to Delhi coordinates
      const defaultCenter = pickup || { lat: 28.6139, lng: 77.2090 }
      
      // Create map using Leaflet (you'll need to install: npm install leaflet)
      // For now, showing a placeholder with coordinates
      if (mapRef.current) {
        mapRef.current.innerHTML = `
          <div class="w-full h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
            
            <!-- Grid pattern for map feel -->
            <div class="absolute inset-0 opacity-20">
              <div class="grid grid-cols-8 grid-rows-6 h-full w-full">
                ${Array(48).fill(0).map(() => '<div class="border border-gray-300"></div>').join('')}
              </div>
            </div>
            
            <div class="relative z-10 text-center p-4">
              <div class="w-16 h-16 bg-uber-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
              </div>
              ${pickup ? `
                <div class="bg-white rounded-lg p-3 mb-2 shadow-sm">
                  <div class="text-sm font-medium text-green-600">📍 Pickup Location</div>
                  <div class="text-xs text-gray-600">${pickup.lat.toFixed(4)}, ${pickup.lng.toFixed(4)}</div>
                </div>
              ` : ''}
              ${destination ? `
                <div class="bg-white rounded-lg p-3 mb-2 shadow-sm">
                  <div class="text-sm font-medium text-red-600">🎯 Destination</div>
                  <div class="text-xs text-gray-600">${destination.lat.toFixed(4)}, ${destination.lng.toFixed(4)}</div>
                </div>
              ` : ''}
              ${showRoute && pickup && destination ? `
                <div class="bg-uber-green text-white rounded-lg p-2 text-xs">
                  Route: ${calculateDistance(pickup.lat, pickup.lng, destination.lat, destination.lng).toFixed(1)} km
                </div>
              ` : ''}
              ${!pickup && !destination ? `
                <div class="text-gray-600">
                  <div class="text-lg font-semibold mb-2">🗺️ Live Map View</div>
                  <div class="text-sm mb-3">Delhi, India - Default Location</div>
                  <div class="bg-white rounded-lg p-3 shadow-sm">
                    <div class="text-xs text-gray-500 mb-1">Coordinates</div>
                    <div class="text-sm font-mono">28.6139, 77.2090</div>
                  </div>
                  <div class="text-xs mt-3 text-gray-500">
                    Use GPS button above to get your current location
                  </div>
                </div>
              ` : ''}
            </div>
            
            <!-- Default location marker for Delhi -->
            ${!pickup && !destination ? `
              <div class="absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%)">
                <div class="w-8 h-8 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
                  <div class="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
            ` : ''}
            
            <!-- Location markers -->
            ${pickup ? `
              <div class="absolute" style="top: 40%; left: 30%;">
                <div class="w-6 h-6 bg-green-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            ` : ''}
            ${destination ? `
              <div class="absolute" style="top: 60%; left: 70%;">
                <div class="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
            ` : ''}
            ${showRoute && pickup && destination ? `
              <svg class="absolute inset-0 w-full h-full pointer-events-none">
                <path d="M 30% 40% Q 50% 30% 70% 60%" stroke="#10B981" stroke-width="3" fill="none" stroke-dasharray="5,5">
                  <animate attributeName="stroke-dashoffset" values="0;10" dur="1s" repeatCount="indefinite"/>
                </path>
              </svg>
            ` : ''}
          </div>
        `
      }
    }

    // Load map immediately
    initMap()
  }, [pickup, destination, showRoute])

  // Also run on mount to ensure map loads
  useEffect(() => {
    const initMap = () => {
      if (!mapRef.current) return
      mapRef.current.innerHTML = `
        <div class="w-full h-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100"></div>
          <div class="relative z-10 text-center p-4">
            <div class="w-16 h-16 bg-uber-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
              </svg>
            </div>
            <div class="text-gray-600">
              <div class="text-lg font-semibold mb-2">🗺️ Live Map View</div>
              <div class="text-sm mb-3">Delhi, India - Default Location</div>
              <div class="bg-white rounded-lg p-3 shadow-sm">
                <div class="text-xs text-gray-500 mb-1">Coordinates</div>
                <div class="text-sm font-mono">28.6139, 77.2090</div>
              </div>
            </div>
            <div class="absolute" style="top: 50%; left: 50%; transform: translate(-50%, -50%)">
              <div class="w-8 h-8 bg-blue-500 rounded-full border-3 border-white shadow-lg flex items-center justify-center animate-pulse">
                <div class="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      `
    }
    initMap()
  }, [])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden">
        {/* Fallback content while map loads */}
        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 bg-uber-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-gray-600">
              <div className="text-lg font-semibold mb-2">🗺️ Live Map View</div>
              <div className="text-sm">Loading map...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}