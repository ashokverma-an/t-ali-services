'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, Plus, Trash2, Star, DollarSign } from 'lucide-react'
import DashboardLayout from '@/components/layout/DashboardLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { toast } from '@/lib/toast'

export default function PaymentPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', last4: '1234', brand: 'Visa', expiry: '12/25', isDefault: true },
    { id: 2, type: 'card', last4: '5678', brand: 'Mastercard', expiry: '08/26', isDefault: false }
  ])
  const [showAddCard, setShowAddCard] = useState(false)
  const [newCard, setNewCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [transactions] = useState([
    { id: 1, type: 'ride', amount: 25.50, date: '2024-01-15', status: 'completed', description: 'Ride to Downtown' },
    { id: 2, type: 'food', amount: 18.75, date: '2024-01-14', status: 'completed', description: 'Pizza Palace Order' },
    { id: 3, type: 'package', amount: 12.00, date: '2024-01-13', status: 'completed', description: 'Package Delivery' }
  ])

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  const addPaymentMethod = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvv || !newCard.name) {
      toast.error('Missing Information', { description: 'Please fill all card details' })
      return
    }

    const card = {
      id: Date.now(),
      type: 'card',
      last4: newCard.number.slice(-4),
      brand: 'Visa',
      expiry: newCard.expiry,
      isDefault: paymentMethods.length === 0
    }

    setPaymentMethods([...paymentMethods, card])
    setNewCard({ number: '', expiry: '', cvv: '', name: '' })
    setShowAddCard(false)
    toast.success('Card Added!', { description: 'Payment method added successfully' })
  }

  const removePaymentMethod = (id: number) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id))
    toast.success('Card Removed', { description: 'Payment method removed successfully' })
  }

  const setDefaultPayment = (id: number) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })))
    toast.success('Default Updated', { description: 'Default payment method updated' })
  }

  if (!user) {
    return <LoadingSpinner />
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-uber-black">Payment Methods</h1>
          <p className="text-gray-600 mt-2">Manage your payment options and view transaction history</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Payment Methods */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Saved Cards</h2>
                <Button onClick={() => setShowAddCard(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Card
                </Button>
              </div>

              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-8 h-8 text-gray-600" />
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900">
                              {method.brand} •••• {method.last4}
                            </span>
                            {method.isDefault && (
                              <span className="px-2 py-1 bg-uber-green text-white text-xs rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => setDefaultPayment(method.id)}
                          >
                            <Star className="w-4 h-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => removePaymentMethod(method.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Card Form */}
            {showAddCard && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold mb-4">Add New Card</h3>
                <div className="space-y-4">
                  <Input
                    placeholder="Card Number"
                    value={newCard.number}
                    onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                  />
                  <Input
                    placeholder="Cardholder Name"
                    value={newCard.name}
                    onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      placeholder="MM/YY"
                      value={newCard.expiry}
                      onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                    />
                    <Input
                      placeholder="CVV"
                      value={newCard.cvv}
                      onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                    />
                  </div>
                  <div className="flex space-x-3">
                    <Button onClick={addPaymentMethod}>Add Card</Button>
                    <Button variant="outline" onClick={() => setShowAddCard(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-uber-green/10 rounded-lg">
                      <DollarSign className="w-5 h-5 text-uber-green" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 capitalize">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${transaction.amount}</p>
                    <p className="text-sm text-green-600 capitalize">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">View All Transactions</Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}