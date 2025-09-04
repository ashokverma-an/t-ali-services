'use client'

import { useEffect, useRef, useState } from 'react'
import { googleMapsService, Location } from '@/lib/maps/GoogleMaps'

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
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [mapError, setMapError] = useState(false)

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return
      
      try {
        // Default center (Dubai coordinates)
        const defaultCenter = pickup || { lat: 25.2048, lng: 55.2708 }
        
        // Initialize Google Maps
        await googleMapsService.initializeMap(mapRef.current, defaultCenter)
        setIsMapLoaded(true)
        setMapError(false)
        
        // Set markers if locations are provided
        if (pickup) {
          googleMapsService.setPickupLocation(pickup)
        }
        
        if (destination) {
          googleMapsService.setDestinationLocation(destination)
        }
        
        // Calculate and show route if both locations exist
        if (showRoute && pickup && destination) {
          try {
            await googleMapsService.calculateRoute(pickup, destination)
            googleMapsService.fitBounds([pickup, destination])
          } catch (error) {
            console.error('Route calculation error:', error)
          }
        } else if (pickup || destination) {
          // Fit bounds to show the available location(s)
          const locations = [pickup, destination].filter((loc): loc is Location => Boolean(loc))
          if (locations.length > 0) {
            googleMapsService.fitBounds(locations)
          }
        }
        
      } catch (error) {
        console.error('Map initialization error:', error)
        setMapError(true)
        setIsMapLoaded(false)
      }
    }

    initializeMap()
  }, [pickup, destination, showRoute])

  // Update markers when locations change
  useEffect(() => {
    if (!isMapLoaded) return
    
    // Clear existing markers
    googleMapsService.clearMarkers()
    
    // Set new markers
    if (pickup) {
      googleMapsService.setPickupLocation(pickup)
    }
    
    if (destination) {
      googleMapsService.setDestinationLocation(destination)
    }
    
    // Update route if needed
    if (showRoute && pickup && destination) {
      googleMapsService.calculateRoute(pickup, destination)
        .then(() => {
          googleMapsService.fitBounds([pickup, destination])
        })
        .catch(error => console.error('Route update error:', error))
    }
  }, [pickup, destination, showRoute, isMapLoaded])



  if (mapError) {
    return (
      <div className={className}>
        <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-lg">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-gray-600">
              <div className="text-lg font-semibold mb-2">Map Error</div>
              <div className="text-sm">Unable to load map. Please check your connection.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full rounded-lg overflow-hidden">
        {!isMapLoaded && (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 bg-uber-green rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-gray-600">
                <div className="text-lg font-semibold mb-2">🗺️ Loading Map</div>
                <div className="text-sm">Initializing Google Maps...</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}