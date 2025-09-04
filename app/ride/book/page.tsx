'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import LocationPicker from '@/components/maps/LocationPicker'
import { Location } from '@/lib/maps/GoogleMaps'
import { Car, Users, Package, Clock, DollarSign } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function BookRide() {
  const router = useRouter()
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null)
  const [destinationLocation, setDestinationLocation] = useState<Location | null>(null)
  const [route, setRoute] = useState<any>(null)
  const [selectedVehicle, setSelectedVehicle] = useState<string>('economy')
  const [showVehicleOptions, setShowVehicleOptions] = useState(false)

  const vehicleTypes = [
    {
      id: 'economy',
      name: 'T Ali Go',
      description: 'Affordable rides',
      icon: Car,
      capacity: '1-4 passengers',
      price: 'AED 12',
      eta: '3 min',
      multiplier: 1
    },
    {
      id: 'comfort',
      name: 'T Ali Comfort',
      description: 'Premium vehicles',
      icon: Car,
      capacity: '1-4 passengers',
      price: 'AED 18',
      eta: '5 min',
      multiplier: 1.5
    },
    {
      id: 'xl',
      name: 'T Ali XL',
      description: 'Larger vehicles',
      icon: Users,
      capacity: '1-6 passengers',
      price: 'AED 25',
      eta: '7 min',
      multiplier: 2
    }
  ]

  const handleRouteCalculated = (calculatedRoute: any) => {
    setRoute(calculatedRoute)
    setShowVehicleOptions(true)
  }

  const calculatePrice = (basePrice: number, multiplier: number) => {
    if (!route) return basePrice

    const distance = route.routes[0]?.legs[0]?.distance?.value || 1000
    const distanceKm = distance / 1000
    const calculatedPrice = Math.max(basePrice, Math.round(basePrice + (distanceKm * 2 * multiplier)))
    
    return calculatedPrice
  }

  const bookRide = () => {
    if (!pickupLocation || !destinationLocation) return

    const selectedVehicleType = vehicleTypes.find(v => v.id === selectedVehicle)
    const price = calculatePrice(parseInt(selectedVehicleType?.price.replace(/[^0-9]/g, '') || '12'), selectedVehicleType?.multiplier || 1)

    const rideDetails = {
      id: `R${Date.now()}`,
      pickup: pickupLocation,
      destination: destinationLocation,
      vehicle: selectedVehicleType,
      price: `AED ${price}`,
      status: 'searching',
      timestamp: new Date().toISOString()
    }

    localStorage.setItem('currentRide', JSON.stringify(rideDetails))
    router.push(`/ride/track/${rideDetails.id}`)
  }

  return (
    <div className="h-screen flex flex-col">
      <LocationPicker
        onPickupSelect={setPickupLocation}
        onDestinationSelect={setDestinationLocation}
        onRouteCalculated={handleRouteCalculated}
      />

      {showVehicleOptions && pickupLocation && destinationLocation && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            
            <h3 className="text-lg font-semibold mb-4">Choose a ride</h3>
            
            <div className="space-y-3">
              {vehicleTypes.map((vehicle) => {
                const IconComponent = vehicle.icon
                const price = calculatePrice(parseInt(vehicle.price.replace(/[^0-9]/g, '')), vehicle.multiplier)
                
                return (
                  <button
                    key={vehicle.id}
                    onClick={() => setSelectedVehicle(vehicle.id)}
                    className={`w-full p-4 rounded-lg border-2 transition-colors ${
                      selectedVehicle === vehicle.id
                        ? 'border-uber-green bg-uber-green/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          selectedVehicle === vehicle.id ? 'bg-uber-green text-white' : 'bg-gray-100'
                        }`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{vehicle.name}</div>
                          <div className="text-sm text-gray-500">{vehicle.description}</div>
                          <div className="text-xs text-gray-400">{vehicle.capacity}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="font-semibold">AED {price}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {vehicle.eta}
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <Button
              onClick={bookRide}
              className="w-full mt-4"
              size="lg"
              disabled={!pickupLocation || !destinationLocation}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Book Ride
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}