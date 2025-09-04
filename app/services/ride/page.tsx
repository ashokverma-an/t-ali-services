'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Navigation, Clock, IndianRupee, Car, Users, Star, Locate } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import RealMapComponent from '@/components/maps/RealMapComponent'
import ChatButton from '@/components/chat/ChatButton'
import PaymentModal from '@/components/booking/PaymentModal'
import OTPModal from '@/components/booking/OTPModal'
import { googleMapsService } from '@/lib/maps/GoogleMaps'
import { toast } from '@/lib/toast'

export default function RidePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [vehicleType, setVehicleType] = useState('standard')
  const [loading, setLoading] = useState(false)
  const [rideEstimate, setRideEstimate] = useState<any>(null)
  const [currentBooking, setCurrentBooking] = useState<any>(null)
  const [showPayment, setShowPayment] = useState(false)
  const [showOTP, setShowOTP] = useState(false)
  const [paymentData, setPaymentData] = useState(null)
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  const [pickupCoords, setPickupCoords] = useState<any>(null)
  const [destCoords, setDestCoords] = useState<any>(null)
  const [loadingLocation, setLoadingLocation] = useState(false)

  const vehicleTypes = [
    {
      id: 'standard',
      name: 'Auto',
      description: 'Affordable, everyday rides',
      capacity: 3,
      pricePerKm: 3,
      baseFare: 25,
      icon: Car,
      eta: '2-5 min'
    },
    {
      id: 'premium',
      name: 'Cab',
      description: 'Comfortable AC rides',
      capacity: 4,
      pricePerKm: 8,
      baseFare: 50,
      icon: Car,
      eta: '3-7 min'
    },
    {
      id: 'luxury',
      name: 'Premium',
      description: 'Luxury cars with premium service',
      capacity: 4,
      pricePerKm: 15,
      baseFare: 100,
      icon: Car,
      eta: '5-10 min'
    }
  ]

  const getCurrentLocation = () => {
    setLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCurrentLocation(coords)
          setPickupCoords(coords)
          reverseGeocode(coords, setPickup)
          setLoadingLocation(false)
          toast.success('Location Found!', { description: 'Current location set as pickup' })
        },
        (error) => {
          console.error('Location error:', error)
          toast.error('Location Error', { description: 'Unable to get current location' })
          setLoadingLocation(false)
        }
      )
    } else {
      toast.error('Not Supported', { description: 'Geolocation not supported' })
      setLoadingLocation(false)
    }
  }

  const reverseGeocode = async (coords: any, setter: any) => {
    try {
      const address = await googleMapsService.reverseGeocode(coords)
      setter(address || `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`)
    } catch (error) {
      console.error('Geocoding error:', error)
      setter(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`)
    }
  }

  const geocodeAddress = async (address: string) => {
    try {
      const result = await googleMapsService.geocodeAddress(address)
      return result
    } catch (error) {
      console.error('Geocoding error:', error)
      return null
    }
  }

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  const calculatePrice = (distance: number, vehicleType: string) => {
    const vehicle = vehicleTypes.find(v => v.id === vehicleType)
    if (!vehicle) return 0
    return vehicle.baseFare + (distance * vehicle.pricePerKm)
  }

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const handleEstimate = async () => {
    if (!pickup || !destination) {
      toast.warning('Missing Locations', { description: 'Please enter both pickup and destination' })
      return
    }

    if (pickup.trim().length < 3 || destination.trim().length < 3) {
      toast.warning('Invalid Addresses', { description: 'Please enter valid addresses' })
      return
    }

    toast.info('Calculating...', { description: 'Getting your ride estimate' })

    try {
      // Use current location if available, otherwise geocode pickup
      let pickupLocation = pickupCoords
      if (!pickupLocation) {
        pickupLocation = await geocodeAddress(pickup)
        if (!pickupLocation) {
          toast.error('Invalid Pickup', { description: 'Could not find pickup location' })
          return
        }
        setPickupCoords(pickupLocation)
      }

      // Geocode destination
      const destLocation = await geocodeAddress(destination)
      if (!destLocation) {
        toast.error('Invalid Destination', { description: 'Could not find destination' })
        return
      }
      setDestCoords(destLocation)
      
      const distance = calculateDistance(
        pickupLocation.lat, pickupLocation.lng,
        destLocation.lat, destLocation.lng
      )
      
      const time = Math.max(10, Math.round(distance * 3)) // 3 min per km, minimum 10 min

      setRideEstimate({
        distance: distance.toFixed(1),
        time,
        pickupCoords: pickupLocation,
        destCoords: destLocation
      })

      toast.success('Estimate Ready!', { description: 'Choose your vehicle type below' })
    } catch (error) {
      console.error('Estimation error:', error)
      toast.error('Calculation Failed', { description: 'Please try again' })
    }
  }

  const handleBookRide = async () => {
    if (!rideEstimate) {
      toast.warning('Missing Information', { description: 'Please get an estimate first' })
      return
    }

    setShowPayment(true)
  }

  const handlePaymentConfirm = (payment: any) => {
    setPaymentData(payment)
    setShowPayment(false)
    setShowOTP(true)
    toast.success('Payment Confirmed!', { description: 'Please verify OTP to complete booking' })
  }

  const handleOTPVerify = async (otp: string) => {
    if (otp === '1234') {
      setShowOTP(false)
      setLoading(true)
      await processBooking()
    } else {
      toast.error('Invalid OTP', { description: 'Please enter correct OTP' })
    }
  }

  const processBooking = async () => {
    setLoading(true)
    try {
      // Simulate booking with payment data
      const bookingData = {
        id: Date.now(),
        serviceType: 'ride',
        vehicleType,
        pickup: {
          address: pickup,
          coordinates: rideEstimate.pickupCoords
        },
        destination: {
          address: destination,
          coordinates: rideEstimate.destCoords
        },
        estimatedDistance: parseFloat(rideEstimate.distance),
        estimatedDuration: rideEstimate.time,
        pricing: {
          baseFare: 2.5,
          distanceFare: parseFloat(rideEstimate.price) - 2.5,
          timeFare: 0,
          serviceFee: 1.5,
          tax: 0.8,
          total: parseFloat(rideEstimate.price)
        },
        paymentMethod: paymentData,
        status: 'pending'
      }

      toast.success('Ride Booked!', { description: 'Finding your driver...' })
      setCurrentBooking(bookingData)
      setTimeout(() => {
        simulateDriverAssignment(bookingData.id.toString())
      }, 3000)
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Connection Error', { description: 'Failed to book ride. Please check your connection.' })
    } finally {
      setLoading(false)
    }
  }

  const simulateDriverAssignment = async (bookingId: string) => {
    try {
      await fetch('/api/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId,
          status: 'accepted',
          driverId: 'demo-driver-123'
        })
      })
      
      setCurrentBooking((prev: any) => ({
        ...prev,
        status: 'accepted',
        driverId: 'demo-driver-123'
      }))
    } catch (error) {
      console.error('Driver assignment error:', error)
    }
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uber-green mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  }

  if (currentBooking) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-96">
              <RealMapComponent
                pickup={currentBooking.pickup.coordinates}
                destination={currentBooking.destination.coordinates}
                showRoute={true}
              />
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {currentBooking.status === 'pending' ? 'Finding your driver...' : 'Driver assigned!'}
                  </h2>
                  <p className="text-gray-600">
                    {currentBooking.status === 'pending' 
                      ? 'We\'re matching you with a nearby driver'
                      : 'Your driver is on the way'
                    }
                  </p>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${
                  currentBooking.status === 'pending' 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {currentBooking.status === 'pending' ? 'Searching' : 'Accepted'}
                </div>
              </div>

              {currentBooking.status === 'accepted' && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">John Driver</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>4.9</span>
                        <span>•</span>
                        <span>Toyota Camry</span>
                        <span>•</span>
                        <span>ABC 123</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Trip Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Pickup</p>
                        <p className="text-gray-600 text-sm">{currentBooking.pickup.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                      <div>
                        <p className="font-medium">Destination</p>
                        <p className="text-gray-600 text-sm">{currentBooking.destination.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Fare Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base fare</span>
                      <span>${currentBooking.pricing.baseFare}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Distance</span>
                      <span>${currentBooking.pricing.distanceFare.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>${currentBooking.pricing.serviceFee}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${currentBooking.pricing.total}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <ChatButton 
                  participantId="demo-driver-123"
                  participantName="John Driver"
                  bookingId={currentBooking._id}
                />
                <Button variant="destructive" className="flex-1">
                  Cancel Ride
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Book a Ride</h1>
            <p className="text-gray-600">Get a ride in minutes</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 p-6">
            {/* Booking Form */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pickup Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                    <Input
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      placeholder="Enter pickup location"
                      className="pl-12 pr-12"
                    />
                    <button
                      onClick={getCurrentLocation}
                      disabled={loadingLocation}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-uber-green hover:text-green-600"
                      title="Use current location"
                    >
                      {loadingLocation ? (
                        <div className="w-4 h-4 border-2 border-uber-green border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Locate className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Destination
                  </label>
                  <div className="relative">
                    <Navigation className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-red-500" />
                    <Input
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      placeholder="Where to?"
                      className="pl-12"
                    />
                  </div>
                </div>

                <Button
                  onClick={handleEstimate}
                  disabled={!pickup || !destination}
                  className="w-full"
                >
                  Get Estimate
                </Button>
              </div>

              {/* Vehicle Selection */}
              {rideEstimate && (
                <div className="space-y-4">
                  <h3 className="font-semibold">Choose your ride</h3>
                  <div className="space-y-3">
                    {vehicleTypes.map((vehicle) => {
                      const Icon = vehicle.icon
                      const distance = parseFloat(rideEstimate.distance)
                      const price = calculatePrice(distance, vehicle.id)
                      
                      return (
                        <div
                          key={vehicle.id}
                          onClick={() => setVehicleType(vehicle.id)}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            vehicleType === vehicle.id
                              ? 'border-uber-green bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <Icon className="w-8 h-8 text-gray-600" />
                              <div>
                                <h4 className="font-medium">{vehicle.name}</h4>
                                <p className="text-sm text-gray-600">{vehicle.description}</p>
                                <div className="flex items-center space-x-2 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{vehicle.eta}</span>
                                  <Users className="w-3 h-3 ml-2" />
                                  <span>{vehicle.capacity}</span>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  ₹{vehicle.pricePerKm}/km + ₹{vehicle.baseFare} base
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold flex items-center">
                                <IndianRupee className="w-4 h-4" />
                                {Math.round(price)}
                              </div>
                              <div className="text-xs text-gray-500">{rideEstimate.time} min</div>
                              <div className="text-xs text-gray-500">{rideEstimate.distance} km</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  <Button
                    onClick={handleBookRide}
                    disabled={loading}
                    className="w-full h-12"
                  >
                    {loading ? 'Booking...' : `Book ${vehicleTypes.find(v => v.id === vehicleType)?.name}`}
                  </Button>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="h-96 lg:h-full min-h-[400px] rounded-lg overflow-hidden">
              <RealMapComponent
                pickup={rideEstimate?.pickupCoords}
                destination={rideEstimate?.destCoords}
                showRoute={!!rideEstimate}
              />
            </div>
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onConfirm={handlePaymentConfirm}
        amount={rideEstimate ? `₹${Math.round(calculatePrice(parseFloat(rideEstimate.distance), vehicleType))}` : '₹0'}
      />

      <OTPModal
        isOpen={showOTP}
        onClose={() => setShowOTP(false)}
        onVerify={handleOTPVerify}
        phoneNumber="+91 98765 43210"
      />
    </div>
  )
}