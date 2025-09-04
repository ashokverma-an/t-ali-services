'use client'

import { Phone, MessageCircle, Star, Heart } from 'lucide-react'
import Button from '@/components/ui/Button'

interface QuickActionsProps {
  provider: {
    name: string
    service: string
    phone?: string
  }
}

export default function QuickActions({ provider }: QuickActionsProps) {
  const handleCall = () => {
    alert(`Calling ${provider.name}...\nPhone: +971-50-123-4567`)
  }

  const handleMessage = () => {
    alert(`Opening chat with ${provider.name}...`)
  }

  const handleFavorite = () => {
    alert(`${provider.name} added to favorites!`)
  }

  const handleReview = () => {
    alert(`Opening review form for ${provider.name}...`)
  }

  return (
    <div className="flex space-x-2">
      <Button size="sm" variant="outline" onClick={handleCall}>
        <Phone className="w-4 h-4 mr-1" />
        Call
      </Button>
      <Button size="sm" variant="outline" onClick={handleMessage}>
        <MessageCircle className="w-4 h-4 mr-1" />
        Chat
      </Button>
      <Button size="sm" variant="outline" onClick={handleFavorite}>
        <Heart className="w-4 h-4" />
      </Button>
      <Button size="sm" variant="outline" onClick={handleReview}>
        <Star className="w-4 h-4" />
      </Button>
    </div>
  )
}