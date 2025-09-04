'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import ChatWindow from './ChatWindow'
import { toast } from '@/lib/toast'

interface ChatButtonProps {
  participantId: string
  participantName: string
  bookingId?: string
}

export default function ChatButton({ participantId, participantName, bookingId }: ChatButtonProps) {
  const [showChat, setShowChat] = useState(false)
  const [chatId, setChatId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const startChat = async () => {
    if (chatId) {
      setShowChat(true)
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participantId,
          bookingId
        })
      })

      if (response.ok) {
        const chat = await response.json()
        setChatId(chat._id)
        setShowChat(true)
        toast.success('Chat started', { description: `Connected with ${participantName}` })
      } else {
        toast.error('Failed to start chat')
      }
    } catch (error) {
      toast.error('Connection error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={startChat}
        disabled={loading}
        className="flex items-center space-x-2 px-4 py-2 bg-uber-green text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        <MessageCircle className="w-4 h-4" />
        <span>{loading ? 'Connecting...' : 'Chat'}</span>
      </button>

      {showChat && chatId && (
        <ChatWindow
          chatId={chatId}
          participantName={participantName}
          onClose={() => setShowChat(false)}
        />
      )}
    </>
  )
}