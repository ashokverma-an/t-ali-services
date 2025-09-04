'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MapPin, Clock, Star, Plus, Minus, ShoppingCart } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function FoodPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null)
  const [cart, setCart] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

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
        { id: 1, name: 'Margherita Pizza', price: 18.99, description: 'Fresh tomatoes, mozzarella, basil' },
        { id: 2, name: 'Pepperoni Pizza', price: 21.99, description: 'Pepperoni, mozzarella, tomato sauce' },
        { id: 3, name: 'Caesar Salad', price: 12.99, description: 'Romaine lettuce, parmesan, croutons' }
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
        { id: 4, name: 'Classic Burger', price: 14.99, description: 'Beef patty, lettuce, tomato, onion' },
        { id: 5, name: 'Cheese Burger', price: 16.99, description: 'Beef patty, cheese, lettuce, tomato' },
        { id: 6, name: 'Chicken Wings', price: 11.99, description: '8 pieces with buffalo sauce' }
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
        { id: 7, name: 'California Roll', price: 8.99, description: 'Crab, avocado, cucumber' },
        { id: 8, name: 'Salmon Sashimi', price: 15.99, description: '6 pieces of fresh salmon' },
        { id: 9, name: 'Miso Soup', price: 4.99, description: 'Traditional soybean soup' }
      ]
    }
  ]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [router])

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

  const handlePlaceOrder = async () => {
    if (!deliveryAddress || cart.length === 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceType: 'food',
          pickup: {
            address: selectedRestaurant.name,
            coordinates: { lat: 40.7128, lng: -74.0060 }
          },
          destination: {
            address: deliveryAddress,
            coordinates: { lat: 40.7589, lng: -73.9851 }
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
            serviceFee: selectedRestaurant.deliveryFee,
            tax: getCartTotal() * 0.08,
            total: getCartTotal() + selectedRestaurant.deliveryFee + (getCartTotal() * 0.08)
          },
          paymentMethod: {
            type: 'card',
            details: { last4: '1234' }
          }
        })
      })

      if (response.ok) {
        router.push('/dashboard')
      }
    } catch (error) {
      console.error('Order error:', error)
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
                            <p className="text-lg font-bold text-gray-900 mt-2">${item.price}</p>
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
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${getCartTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${selectedRestaurant.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax</span>
                        <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-semibold">
                        <span>Total</span>
                        <span>${(getCartTotal() + selectedRestaurant.deliveryFee + (getCartTotal() * 0.08)).toFixed(2)}</span>
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
              <div className="relative max-w-md">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter your address"
                  className="pl-12"
                />
              </div>
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
                        ${restaurant.deliveryFee} delivery
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}