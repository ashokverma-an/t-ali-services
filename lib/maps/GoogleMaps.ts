declare global {
  interface Window {
    google: any
    initMap: () => void
  }
}

export interface Location {
  lat: number
  lng: number
  address?: string
  placeId?: string
}

export interface Place {
  place_id: string
  description: string
  structured_formatting: {
    main_text: string
    secondary_text: string
  }
}

class GoogleMapsService {
  private map: any = null
  private directionsService: any = null
  private directionsRenderer: any = null
  private autocompleteService: any = null
  private placesService: any = null
  private userMarker: any = null
  private driverMarker: any = null
  private pickupMarker: any = null
  private destinationMarker: any = null

  async loadGoogleMaps(): Promise<void> {
    if (window.google) return

    return new Promise((resolve) => {
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO_BcqbqKrRBVg&libraries=places,geometry&callback=initMap`
      script.async = true
      script.defer = true
      
      window.initMap = () => {
        resolve()
      }
      
      document.head.appendChild(script)
    })
  }

  async initializeMap(container: HTMLElement, center: Location): Promise<void> {
    await this.loadGoogleMaps()
    
    this.map = new window.google.maps.Map(container, {
      center: { lat: center.lat, lng: center.lng },
      zoom: 15,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false
    })

    this.directionsService = new window.google.maps.DirectionsService()
    this.directionsRenderer = new window.google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#00D4AA',
        strokeWeight: 4
      }
    })
    this.directionsRenderer.setMap(this.map)

    this.autocompleteService = new window.google.maps.places.AutocompleteService()
    this.placesService = new window.google.maps.places.PlacesService(this.map)
  }

  async getCurrentLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          
          const address = await this.reverseGeocode(location)
          resolve({ ...location, address })
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
      )
    })
  }

  async reverseGeocode(location: Location): Promise<string> {
    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode(
        { location: { lat: location.lat, lng: location.lng } },
        (results: any[], status: string) => {
          if (status === 'OK' && results[0]) {
            resolve(results[0].formatted_address)
          } else {
            resolve('Unknown location')
          }
        }
      )
    })
  }

  async geocodeAddress(address: string): Promise<Location | null> {
    return new Promise((resolve) => {
      const geocoder = new window.google.maps.Geocoder()
      geocoder.geocode(
        { address: address },
        (results: any[], status: string) => {
          if (status === 'OK' && results[0]) {
            const location = results[0].geometry.location
            resolve({
              lat: location.lat(),
              lng: location.lng(),
              address: results[0].formatted_address
            })
          } else {
            resolve(null)
          }
        }
      )
    })
  }

  async searchPlaces(query: string, location?: Location): Promise<Place[]> {
    return new Promise((resolve) => {
      if (!this.autocompleteService) {
        resolve([])
        return
      }

      const request: any = {
        input: query,
        componentRestrictions: { country: 'ae' },
        types: ['establishment', 'geocode']
      }

      if (location) {
        request.location = new window.google.maps.LatLng(location.lat, location.lng)
        request.radius = 50000
      }

      this.autocompleteService.getPlacePredictions(request, (predictions: any[], status: string) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
          resolve(predictions)
        } else {
          resolve([])
        }
      })
    })
  }

  async getPlaceDetails(placeId: string): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!this.placesService) {
        reject(new Error('Places service not initialized'))
        return
      }

      this.placesService.getDetails(
        { placeId, fields: ['geometry', 'formatted_address'] },
        (place: any, status: string) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place.geometry) {
            resolve({
              lat: place.geometry.location.lat(),
              lng: place.geometry.location.lng(),
              address: place.formatted_address,
              placeId
            })
          } else {
            reject(new Error('Place not found'))
          }
        }
      )
    })
  }

  setUserLocation(location: Location): void {
    if (this.userMarker) {
      this.userMarker.setMap(null)
    }

    this.userMarker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: this.map,
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#4285F4" stroke="white" stroke-width="2"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(24, 24)
      },
      title: 'Your Location'
    })

    this.map.setCenter({ lat: location.lat, lng: location.lng })
  }

  setPickupLocation(location: Location): void {
    if (this.pickupMarker) {
      this.pickupMarker.setMap(null)
    }

    this.pickupMarker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: this.map,
      icon: {
        url: 'data:image/svg+xml;base64,' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#00D4AA" stroke="white" stroke-width="2"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32)
      },
      title: 'Pickup Location'
    })
  }

  setDestinationLocation(location: Location): void {
    if (this.destinationMarker) {
      this.destinationMarker.setMap(null)
    }

    this.destinationMarker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: this.map,
      icon: {
        url: 'data:image/svg+xml;base64=' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="12" fill="#FF4444" stroke="white" stroke-width="2"/>
            <circle cx="16" cy="16" r="4" fill="white"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32)
      },
      title: 'Destination'
    })
  }

  setDriverLocation(location: Location): void {
    if (this.driverMarker) {
      this.driverMarker.setMap(null)
    }

    this.driverMarker = new window.google.maps.Marker({
      position: { lat: location.lat, lng: location.lng },
      map: this.map,
      icon: {
        url: 'data:image/svg+xml;base64=' + btoa(`
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="12" width="24" height="12" rx="2" fill="#FFD700" stroke="white" stroke-width="2"/>
            <circle cx="10" cy="26" r="3" fill="#333"/>
            <circle cx="22" cy="26" r="3" fill="#333"/>
            <rect x="8" y="8" width="16" height="8" rx="1" fill="#FFD700"/>
          </svg>
        `),
        scaledSize: new window.google.maps.Size(32, 32)
      },
      title: 'Driver Location'
    })
  }

  async calculateRoute(pickup: Location, destination: Location): Promise<any> {
    return new Promise((resolve, reject) => {
      if (!this.directionsService) {
        reject(new Error('Directions service not initialized'))
        return
      }

      this.directionsService.route(
        {
          origin: { lat: pickup.lat, lng: pickup.lng },
          destination: { lat: destination.lat, lng: destination.lng },
          travelMode: window.google.maps.TravelMode.DRIVING,
          avoidTolls: false,
          avoidHighways: false
        },
        (result: any, status: string) => {
          if (status === 'OK') {
            this.directionsRenderer.setDirections(result)
            resolve(result)
          } else {
            reject(new Error('Route calculation failed'))
          }
        }
      )
    })
  }

  fitBounds(locations: Location[]): void {
    if (!this.map || locations.length === 0) return

    const bounds = new window.google.maps.LatLngBounds()
    locations.forEach(location => {
      bounds.extend({ lat: location.lat, lng: location.lng })
    })
    
    this.map.fitBounds(bounds, { padding: 50 })
  }

  clearRoute(): void {
    if (this.directionsRenderer) {
      this.directionsRenderer.setDirections({ routes: [] })
    }
  }

  clearMarkers(): void {
    [this.pickupMarker, this.destinationMarker, this.driverMarker].forEach(marker => {
      if (marker) marker.setMap(null)
    })
  }
}

export const googleMapsService = new GoogleMapsService()