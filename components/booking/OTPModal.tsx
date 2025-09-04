'use client'

import { useState, useEffect } from 'react'
import { Shield, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

interface OTPModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (otp: string) => void
  phoneNumber: string
}

export default function OTPModal({ isOpen, onClose, onVerify, phoneNumber }: OTPModalProps) {
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (isOpen && timer > 0) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }
  }, [isOpen, timer])

  const handleResend = () => {
    setTimer(30)
    setCanResend(false)
    // Simulate OTP resend
  }

  const handleVerify = () => {
    if (otp.length === 4) {
      onVerify(otp)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Verify OTP</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-uber-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-uber-green" />
          </div>
          <p className="text-gray-600">
            We've sent a 4-digit OTP to
          </p>
          <p className="font-semibold text-gray-900">{phoneNumber}</p>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Enter 4-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="text-center text-2xl tracking-widest"
            maxLength={4}
          />
        </div>

        <div className="text-center mb-6">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-uber-green hover:text-green-600 font-medium"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">
              Resend OTP in {timer}s
            </p>
          )}
        </div>

        <div className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleVerify} 
            disabled={otp.length !== 4}
            className="flex-1"
          >
            Verify OTP
          </Button>
        </div>
      </div>
    </div>
  )
}