'use client'

import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Navigation, X } from 'lucide-react'
import { googleMapsService, Location, Place } from '@/lib/maps/GoogleMaps'
import Button from '@/components/ui/Button'

interface LocationPickerProps {
  onPickupSelect: (location: Location) => void
  onDestinationSelect: (location: Location) => void
  onRouteCalculated?: (route: any) => void
}

export default function LocationPicker({ onPickupSelect, onDestinationSelect, onRouteCalculated }: LocationPickerProps) {
  const [pickupQuery, setPickupQuery] = useState('')
  const [destinationQuery, setDestinationQuery] = useState('')
  const [pickupSuggestions, setPickupSuggestions] = useState<Place[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<Place[]>([])
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null)
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null)
  const [loading, setLoading] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    initializeMap()
    getCurrentLocation()
  }, [])

  const initializeMap = async () => {
    if (!mapRef.current) return
    
    const dubaiCenter = { lat: 25.2048, lng: 55.2708 }
    await googleMapsService.initializeMap(mapRef.current, dubaiCenter)
  }

  const getCurrentLocation = async () => {
    setLoading(true)
    try {
      const location = await googleMapsService.getCurrentLocation()
      setCurrentLocation(location)
      googleMapsService.setUserLocation(location)
      setPickupQuery(location.address || 'Current Location')
      setPickupLocation(location)
      onPickupSelect(location)
    } catch (error) {
      console.error('Error getting location:', error)
    } finally {
      setLoading(false)
    }
  }

  const searchPickupPlaces = async (query: string) => {
    if (query.length < 3) {
      setPickupSuggestions([])
      return
    }

    try {
      const places = await googleMapsService.searchPlaces(query, currentLocation || undefined)
      setPickupSuggestions(places.slice(0, 5))
    } catch (error) {
      console.error('Error searching places:', error)
    }
  }

  const searchDestinationPlaces = async (query: string) => {
    if (query.length < 3) {
      setDestinationSuggestions([])
      return
    }

    try {
      const places = await googleMapsService.searchPlaces(query, currentLocation || undefined)
      setDestinationSuggestions(places.slice(0, 5))
    } catch (error) {
      console.error('Error searching places:', error)
    }
  }

  const selectPickupPlace = async (place: Place) => {
    try {
      const location = await googleMapsService.getPlaceDetails(place.place_id)
      setPickupLocation(location)
      setPickupQuery(place.description)
      setPickupSuggestions([])
      googleMapsService.setPickupLocation(location)
      onPickupSelect(location)
      
      if (destinationLocation) {
        calculateRoute(location, destinationLocation)
      }
    } catch (error) {
      console.error('Error getting place details:', error)
    }
  }

  const selectDestinationPlace = async (place: Place) => {
    try {
      const location = await googleMapsService.getPlaceDetails(place.place_id)
      setDestinationLocation(location)
      setDestinationQuery(place.description)
      setDestinationSuggestions([])
      googleMapsService.setDestinationLocation(location)
      onDestinationSelect(location)
      
      if (pickupLocation) {
        calculateRoute(pickupLocation, location)
      }
    } catch (error) {
      console.error('Error getting place details:', error)
    }
  }

  const calculateRoute = async (pickup: Location, destination: Location) => {
    try {
      const route = await googleMapsService.calculateRoute(pickup, destination)
      googleMapsService.fitBounds([pickup, destination])
      onRouteCalculated?.(route)
    } catch (error) {
      console.error('Error calculating route:', error)
    }
  }

  const clearPickup = () => {
    setPickupQuery('')
    setPickupLocation(null)
    setPickupSuggestions([])
    googleMapsService.clearRoute()
  }

  const clearDestination = () => {
    setDestinationQuery('')
    setDestinationLocation(null)
    setDestinationSuggestions([])
    googleMapsService.clearRoute()
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Search Panel */}
      <div className="w-full lg:w-96 bg-white shadow-lg z-10 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-4">Where to?</h2>
          
          {/* Pickup Location */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-3 w-3 h-3 bg-green-500 rounded-full"></div>
              <input
                type="text"
                placeholder="Pickup location"
                value={pickupQuery}
                onChange={(e) => {
                  setPickupQuery(e.target.value)
                  searchPickupPlaces(e.target.value)
                }}
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-uber-green"
              />
              {pickupQuery && (
                <button
                  onClick={clearPickup}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {pickupSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {pickupSuggestions.map((place) => (
                  <button
                    key={place.place_id}
                    onClick={() => selectPickupPlace(place)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{place.structured_formatting.main_text}</div>
                        <div className="text-sm text-gray-500">{place.structured_formatting.secondary_text}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Destination Location */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute left-3 top-3 w-3 h-3 bg-red-500 rounded-full"></div>
              <input
                type="text"
                placeholder="Where to?"
                value={destinationQuery}
                onChange={(e) => {
                  setDestinationQuery(e.target.value)
                  searchDestinationPlaces(e.target.value)
                }}
                className="w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-uber-green"
              />
              {destinationQuery && (
                <button
                  onClick={clearDestination}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {destinationSuggestions.length > 0 && (
              <div className="absolute z-50 w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {destinationSuggestions.map((place) => (
                  <button
                    key={place.place_id}
                    onClick={() => selectDestinationPlace(place)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <div>
                        <div className="font-medium">{place.structured_formatting.main_text}</div>
                        <div className="text-sm text-gray-500">{place.structured_formatting.secondary_text}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={getCurrentLocation}
            variant="outline"
            className="w-full mb-4"
            disabled={loading}
          >
            <Navigation className="w-4 h-4 mr-2" />
            {loading ? 'Getting location...' : 'Use current location'}
          </Button>
        </div>

        {/* Popular Places */}
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="font-medium mb-3">Popular destinations</h3>
          <div className="space-y-2">
            {[
              { name: 'Dubai Mall', address: 'Downtown Dubai' },
              { name: 'Dubai International Airport', address: 'Terminal 1, 2, 3' },
              { name: 'Burj Khalifa', address: 'Downtown Dubai' },
              { name: 'Mall of the Emirates', address: 'Al Barsha' },
              { name: 'Dubai Marina Mall', address: 'Dubai Marina' },
              { name: 'Ibn Battuta Mall', address: 'Jebel Ali' }
            ].map((place, index) => (
              <button
                key={index}
                onClick={() => {
                  setDestinationQuery(place.name)
                  searchDestinationPlaces(place.name)
                }}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 border"
              >
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <div className="font-medium">{place.name}</div>
                    <div className="text-sm text-gray-500">{place.address}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />
        
        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <Button
            onClick={getCurrentLocation}
            size="sm"
            className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg"
          >
            <Navigation className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}