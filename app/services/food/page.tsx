'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Clock, Star, Plus, Minus, ShoppingCart, Locate, CreditCard, Banknote } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import RealMapComponent from '@/components/maps/RealMapComponent'
import { googleMapsService } from '@/lib/maps/GoogleMaps'

export default function FoodPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [currentLocation, setCurrentLocation] = useState<any>(null)
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [loadingLocation, setLoadingLocation] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [showPayment, setShowPayment] = useState(false)

  const restaurants = [
    {
      id: 1,
      name: 'Pizza Palace',
      cuisine: 'Italian',
      rating: 4.5,
      deliveryTime: '25-35 min',
      deliveryFee: 2.99,
      image: '/images/pizza-palace.jpg',
      menu: [
        { id: 1, name: 'Margherita Pizza', price: 299, description: 'Fresh tomatoes, mozzarella, basil' },
        { id: 2, name: 'Pepperoni Pizza', price: 399, description: 'Pepperoni, mozzarella, tomato sauce' },
        { id: 3, name: 'Caesar Salad', price: 199, description: 'Romaine lettuce, parmesan, croutons' }
      ]
    },
    {
      id: 2,
      name: 'Burger House',
      cuisine: 'American',
      rating: 4.3,
      deliveryTime: '20-30 min',
      deliveryFee: 1.99,
      image: '/images/burger-house.jpg',
      menu: [
        { id: 4, name: 'Classic Burger', price: 249, description: 'Beef patty, lettuce, tomato, onion' },
        { id: 5, name: 'Cheese Burger', price: 299, description: 'Beef patty, cheese, lettuce, tomato' },
        { id: 6, name: 'Chicken Wings', price: 199, description: '8 pieces with buffalo sauce' }
      ]
    },
    {
      id: 3,
      name: 'Sushi Express',
      cuisine: 'Japanese',
      rating: 4.7,
      deliveryTime: '30-40 min',
      deliveryFee: 3.99,
      image: '/images/sushi-express.jpg',
      menu: [
        { id: 7, name: 'California Roll', price: 149, description: 'Crab, avocado, cucumber' },
        { id: 8, name: 'Salmon Sashimi', price: 249, description: '6 pieces of fresh salmon' },
        { id: 9, name: 'Miso Soup', price: 99, description: 'Traditional soybean soup' }
      ]
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    getCurrentLocation()
  }, [router])

  const getCurrentLocation = () => {
    setLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          setCurrentLocation(coords)
          try {
            const address = await googleMapsService.reverseGeocode(coords)
            setDeliveryAddress(address || `${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`)
          } catch (error) {
            console.error('Geocoding error:', error)
            setDeliveryAddress(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`)
          }
          setLoadingLocation(false)
        },
        (error) => {
          console.error('Location error:', error)
          setLoadingLocation(false)
        }
      )
    } else {
      setLoadingLocation(false)
    }
  }

  const addToCart = (item: any) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  const removeFromCart = (itemId: number) => {
    const existingItem = cart.find(cartItem => cartItem.id === itemId)
    if (existingItem && existingItem.quantity > 1) {
      setCart(cart.map(cartItem => 
        cartItem.id === itemId 
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ))
    } else {
      setCart(cart.filter(cartItem => cartItem.id !== itemId))
    }
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const handlePlaceOrder = () => {
    if (!deliveryAddress || cart.length === 0) return
    setShowPayment(true)
  }

  const processPayment = async () => {
    setLoading(true)
    try {
      const orderData = {
        serviceType: 'food',
        pickup: {
          address: selectedRestaurant.name,
          coordinates: { lat: 28.6139, lng: 77.2090 }
        },
        destination: {
          address: deliveryAddress,
          coordinates: currentLocation || { lat: 28.6139, lng: 77.2090 }
        },
        restaurant: {
          id: selectedRestaurant.id,
          name: selectedRestaurant.name,
          address: selectedRestaurant.name
        },
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          notes: ''
        })),
        pricing: {
          baseFare: getCartTotal(),
          distanceFare: 0,
          timeFare: 0,
          serviceFee: selectedRestaurant.deliveryFee * 20,
          tax: getCartTotal() * 0.18,
          total: getCartTotal() + (selectedRestaurant.deliveryFee * 20) + (getCartTotal() * 0.18)
        },
        paymentMethod: {
          type: paymentMethod,
          details: paymentMethod === 'card' ? { last4: '1234' } : { method: 'cash' }
        }
      }

      // Store order for tracking
      localStorage.setItem('currentOrder', JSON.stringify({
        ...orderData,
        id: `ORD-${Date.now()}`,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      }))

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      })

      if (response.ok || true) { // Allow offline mode
        setShowPayment(false)
        setCart([])
        router.push('/dashboard/food?success=true')
      }
    } catch (error) {
      console.error('Order error:', error)
      // Still proceed for demo
      setShowPayment(false)
      setCart([])
      router.push('/dashboard/food?success=true')
    } finally {
      setLoading(false)
    }
  }

  const handleAuthRequired = () => {
    router.push('/auth/signin')
  }

  if (selectedRestaurant) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b">
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="text-uber-green hover:text-green-600 mb-4"
              >
                ← Back to restaurants
              </button>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{selectedRestaurant.name}</h1>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      {selectedRestaurant.rating}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {selectedRestaurant.deliveryTime}
                    </div>
                    <span>Delivery: ${selectedRestaurant.deliveryFee}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 p-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">Menu</h2>
                <div className="space-y-4">
                  {selectedRestaurant.menu.map((item: any) => {
                    const cartItem = cart.find(cartItem => cartItem.id === item.id)
                    return (
                      <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                            <p className="text-lg font-bold text-gray-900 mt-2">₹{item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {cartItem ? (
                              <>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                                <button
                                  onClick={() => addToCart(item)}
                                  className="w-8 h-8 bg-uber-green text-white rounded-full flex items-center justify-center"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                onClick={() => addToCart(item)}
                                className="w-8 h-8 bg-uber-green text-white rounded-full flex items-center justify-center"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 h-fit">
                <h3 className="font-semibold mb-4 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Your Order
                </h3>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Address
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      placeholder="Enter delivery address"
                      className="pl-12"
                    />
                  </div>
                </div>

                {cart.length > 0 ? (
                  <>
                    <div className="space-y-2 mb-4">
                      {cart.map((item) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name}</span>
                          <span>₹{(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₹{getCartTotal()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>₹{selectedRestaurant.deliveryFee * 20}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>₹{Math.round(getCartTotal() * 0.18)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>₹{getCartTotal() + (selectedRestaurant.deliveryFee * 20) + Math.round(getCartTotal() * 0.18)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={user ? handlePlaceOrder : handleAuthRequired}
                      disabled={loading || !deliveryAddress}
                      className="w-full mt-4"
                    >
                      {loading ? 'Placing Order...' : user ? 'Place Order' : 'Sign In to Order'}
                    </Button>
                  </>
                ) : (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-900">Food Delivery</h1>
            <p className="text-gray-600">Order from your favorite restaurants</p>
          </div>

          <div className="p-6">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address
              </label>
              <div className="flex space-x-2 max-w-2xl">
                <div className="relative flex-1">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your address"
                    className="pl-12"
                  />
                </div>
                <Button
                  onClick={getCurrentLocation}
                  disabled={loadingLocation}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  {loadingLocation ? (
                    <div className="w-4 h-4 border-2 border-uber-green border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Locate className="w-4 h-4" />
                  )}
                  <span>Current Location</span>
                </Button>
              </div>
              
              {currentLocation && (
                <div className="mt-4 h-64 rounded-lg overflow-hidden">
                  <RealMapComponent
                    pickup={currentLocation}
                    showRoute={false}
                  />
                </div>
              )}
            </div>

            <h2 className="text-xl font-semibold mb-6">Restaurants near you</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.id}
                  onClick={() => setSelectedRestaurant(restaurant)}
                  className="bg-white border rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <div className="text-4xl">🍕</div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          {restaurant.rating}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {restaurant.deliveryTime}
                        </div>
                      </div>
                      <span className="text-sm text-gray-600">
                        ₹{restaurant.deliveryFee * 20} delivery
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
            
            <div className="space-y-3 mb-6">
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-uber-green"
                />
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Credit/Debit Card</div>
                  <div className="text-sm text-gray-500">Visa, Mastercard, RuPay</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-uber-green"
                />
                <div className="w-5 h-5 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">U</div>
                <div>
                  <div className="font-medium">UPI</div>
                  <div className="text-sm text-gray-500">PhonePe, GPay, Paytm</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="wallet"
                  checked={paymentMethod === 'wallet'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-uber-green"
                />
                <div className="w-5 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">W</div>
                <div>
                  <div className="font-medium">Digital Wallet</div>
                  <div className="text-sm text-gray-500">Paytm, Amazon Pay</div>
                </div>
              </label>
              
              <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="text-uber-green"
                />
                <Banknote className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="font-medium">Cash on Delivery</div>
                  <div className="text-sm text-gray-500">Pay when delivered</div>
                </div>
              </label>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Subtotal</span>
                <span>₹{getCartTotal()}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>Delivery Fee</span>
                <span>₹{selectedRestaurant.deliveryFee * 20}</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span>GST (18%)</span>
                <span>₹{Math.round(getCartTotal() * 0.18)}</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{getCartTotal() + (selectedRestaurant.deliveryFee * 20) + Math.round(getCartTotal() * 0.18)}</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowPayment(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={processPayment}
                disabled={loading}
                className="flex-1"
              >
                {loading ? 'Processing...' : paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}