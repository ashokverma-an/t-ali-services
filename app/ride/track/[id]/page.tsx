'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import RideTracker from '@/components/maps/RideTracker'
import { Location } from '@/lib/maps/GoogleMaps'

export default function TrackRide() {
  const params = useParams()
  const router = useRouter()
  const [rideDetails, setRideDetails] = useState<any>(null)
  const [status, setStatus] = useState<'searching' | 'driver_assigned' | 'driver_arriving' | 'in_progress' | 'completed'>('searching')
  const [driverInfo, setDriverInfo] = useState<any>(null)
  const [driverLocation, setDriverLocation] = useState<Location | null>(null)
  const [estimatedTime, setEstimatedTime] = useState<string>('5 min')

  useEffect(() => {
    const storedRide = localStorage.getItem('currentRide')
    if (storedRide) {
      const ride = JSON.parse(storedRide)
      setRideDetails(ride)
      
      // Simulate ride progression
      simulateRideProgress()
    } else {
      router.push('/ride/book')
    }
  }, [])

  const simulateRideProgress = () => {
    // Simulate finding driver after 3 seconds
    setTimeout(() => {
      setStatus('driver_assigned')
      setDriverInfo({
        name: 'Ahmed Hassan',
        phone: '+971 50 123 4567',
        vehicle: 'Toyota Camry - ABC 123',
        rating: 4.8
      })
      setDriverLocation({
        lat: 25.2048 + (Math.random() - 0.5) * 0.01,
        lng: 55.2708 + (Math.random() - 0.5) * 0.01
      })
      setEstimatedTime('3 min')
    }, 3000)

    // Driver arriving
    setTimeout(() => {
      setStatus('driver_arriving')
      setEstimatedTime('1 min')
    }, 8000)

    // Trip in progress
    setTimeout(() => {
      setStatus('in_progress')
      setEstimatedTime('12 min')
    }, 15000)

    // Trip completed
    setTimeout(() => {
      setStatus('completed')
      setEstimatedTime('Arrived')
    }, 30000)
  }

  const handleCancel = () => {
    localStorage.removeItem('currentRide')
    router.push('/dashboard')
  }

  if (!rideDetails) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-uber-green mx-auto mb-4"></div>
          <p>Loading ride details...</p>
        </div>
      </div>
    )
  }

  return (
    <RideTracker
      rideId={rideDetails.id}
      pickup={rideDetails.pickup}
      destination={rideDetails.destination}
      driverLocation={driverLocation}
      driverInfo={driverInfo}
      status={status}
      estimatedTime={estimatedTime}
      onCancel={handleCancel}
    />
  )
}