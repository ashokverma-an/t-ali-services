'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Wallet, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (paymentMethod: any) => void
  amount: string
}

export default function PaymentModal({ isOpen, onClose, onConfirm, amount }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState('card')
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  if (!isOpen) return null

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'upi', name: 'UPI Payment', icon: Smartphone },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet }
  ]

  const handleConfirm = () => {
    const paymentData = {
      method: selectedMethod,
      amount,
      ...(selectedMethod === 'card' && { cardDetails })
    }
    onConfirm(paymentData)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold text-gray-900">{amount}</span>
            </div>
          </div>

          <h3 className="font-semibold mb-3">Select Payment Method</h3>
          <div className="space-y-2">
            {paymentMethods.map((method) => {
              const Icon = method.icon
              return (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-3 border rounded-lg cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'border-uber-green bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-gray-600" />
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {selectedMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <Input
              placeholder="Card Number"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
            />
            <Input
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="MM/YY"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              />
              <Input
                placeholder="CVV"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              />
            </div>
          </div>
        )}

        {selectedMethod === 'upi' && (
          <div className="mb-6">
            <Input placeholder="Enter UPI ID (e.g., user@paytm)" />
          </div>
        )}

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1">
            Pay {amount}
          </Button>
        </div>
      </div>
    </div>
  )
}