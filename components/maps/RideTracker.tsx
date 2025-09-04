'use client'

import { useState, useEffect, useRef } from 'react'
import { Phone, MessageCircle, Navigation, Clock, MapPin } from 'lucide-react'
import { googleMapsService, Location } from '@/lib/maps/GoogleMaps'
import Button from '@/components/ui/Button'

interface RideTrackerProps {
  rideId: string
  pickup: Location
  destination: Location
  driverLocation?: Location
  driverInfo?: {
    name: string
    phone: string
    vehicle: string
    rating: number
  }
  status: 'searching' | 'driver_assigned' | 'driver_arriving' | 'in_progress' | 'completed'
  estimatedTime?: string
  onCancel?: () => void
}

export default function RideTracker({
  rideId,
  pickup,
  destination,
  driverLocation,
  driverInfo,
  status,
  estimatedTime,
  onCancel
}: RideTrackerProps) {
  const [currentDriverLocation, setCurrentDriverLocation] = useState(driverLocation)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initializeMap()
  }, [])

  useEffect(() => {
    if (driverLocation) {
      setCurrentDriverLocation(driverLocation)
      updateDriverLocation(driverLocation)
    }
  }, [driverLocation])

  useEffect(() => {
    // Simulate driver movement for demo
    if (status === 'driver_arriving' || status === 'in_progress') {
      const interval = setInterval(() => {
        simulateDriverMovement()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [status])

  const initializeMap = async () => {
    if (!mapRef.current) return
    
    await googleMapsService.initializeMap(mapRef.current, pickup)
    
    // Set pickup and destination markers
    googleMapsService.setPickupLocation(pickup)
    googleMapsService.setDestinationLocation(destination)
    
    // Calculate and display route
    try {
      await googleMapsService.calculateRoute(pickup, destination)
      googleMapsService.fitBounds([pickup, destination])
    } catch (error) {
      console.error('Error calculating route:', error)
    }
  }

  const updateDriverLocation = (location: Location) => {
    googleMapsService.setDriverLocation(location)
    
    // Fit bounds to include driver location
    const locations = [pickup, destination, location]
    googleMapsService.fitBounds(locations)
  }

  const simulateDriverMovement = () => {
    if (!currentDriverLocation) return

    // Simulate driver moving towards pickup or destination
    const target = status === 'driver_arriving' ? pickup : destination
    const currentLat = currentDriverLocation.lat
    const currentLng = currentDriverLocation.lng
    const targetLat = target.lat
    const targetLng = target.lng

    // Move 10% closer to target
    const newLat = currentLat + (targetLat - currentLat) * 0.1
    const newLng = currentLng + (targetLng - currentLng) * 0.1

    const newLocation = { lat: newLat, lng: newLng }
    setCurrentDriverLocation(newLocation)
    updateDriverLocation(newLocation)
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'searching':
        return 'Looking for a driver...'
      case 'driver_assigned':
        return 'Driver assigned! They\'re on their way.'
      case 'driver_arriving':
        return 'Driver is arriving at pickup location'
      case 'in_progress':
        return 'You\'re on your way to destination'
      case 'completed':
        return 'Trip completed!'
      default:
        return 'Processing...'
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'searching':
        return 'text-yellow-600'
      case 'driver_assigned':
      case 'driver_arriving':
        return 'text-blue-600'
      case 'in_progress':
        return 'text-uber-green'
      case 'completed':
        return 'text-green-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Status Header */}
      <div className="bg-white shadow-sm p-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Ride #{rideId}</h2>
          {onCancel && status === 'searching' && (
            <Button variant="outline" size="sm" onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
        
        <div className={`text-sm font-medium ${getStatusColor()}`}>
          {getStatusMessage()}
        </div>
        
        {estimatedTime && (
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Clock className="w-4 h-4 mr-1" />
            ETA: {estimatedTime}
          </div>
        )}
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Route Info Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Pickup</div>
                <div className="text-xs text-gray-500 truncate">{pickup.address}</div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Destination</div>
                <div className="text-xs text-gray-500 truncate">{destination.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Driver Info */}
      {driverInfo && status !== 'searching' && (
        <div className="bg-white border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-uber-green rounded-full flex items-center justify-center text-white font-medium">
                {driverInfo.name.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{driverInfo.name}</div>
                <div className="text-sm text-gray-500">{driverInfo.vehicle}</div>
                <div className="flex items-center text-sm">
                  <span className="text-yellow-500">★</span>
                  <span className="ml-1">{driverInfo.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button size="sm" variant="outline">
                <MessageCircle className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}