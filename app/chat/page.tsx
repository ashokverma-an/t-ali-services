'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, User, Search } from 'lucide-react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import ChatWindow from '@/components/chat/ChatWindow'
import DashboardLayout from '@/components/layout/DashboardLayout'
import { useTranslation } from '@/lib/useTranslation'

export default function ChatPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [chats, setChats] = useState<any[]>([])
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [showNewChat, setShowNewChat] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push('/auth/signin')
    }
  }, [router])

  useEffect(() => {
    if (user) {
      fetchChats()
    }
  }, [user])

  const fetchChats = async () => {
    if (!user) return
    
    // Mock chat data with multiple users
    const mockChats = [
      {
        _id: '1',
        participants: [
          { userId: user.email, userName: user.name, userRole: user.role },
          { userId: 'driver1@demo.com', userName: 'John Driver', userRole: 'driver' }
        ],
        lastMessage: { message: 'I\'m on my way!', timestamp: new Date().toISOString() },
        unreadCount: 2,
        isOnline: true
      },
      {
        _id: '2', 
        participants: [
          { userId: user.email, userName: user.name, userRole: user.role },
          { userId: 'support@demo.com', userName: 'Support Team', userRole: 'admin' }
        ],
        lastMessage: { message: 'How can I help you?', timestamp: new Date(Date.now() - 3600000).toISOString() },
        unreadCount: 0,
        isOnline: true
      },
      {
        _id: '3',
        participants: [
          { userId: user.email, userName: user.name, userRole: user.role },
          { userId: 'driver2@demo.com', userName: 'Sarah Wilson', userRole: 'driver' }
        ],
        lastMessage: { message: 'Thanks for the ride!', timestamp: new Date(Date.now() - 7200000).toISOString() },
        unreadCount: 0,
        isOnline: false
      },
      {
        _id: '4',
        participants: [
          { userId: user.email, userName: user.name, userRole: user.role },
          { userId: 'restaurant@demo.com', userName: 'Pizza Palace', userRole: 'restaurant' }
        ],
        lastMessage: { message: 'Your order is ready for pickup', timestamp: new Date(Date.now() - 10800000).toISOString() },
        unreadCount: 1,
        isOnline: true
      },
      {
        _id: '5',
        participants: [
          { userId: user.email, userName: user.name, userRole: user.role },
          { userId: 'courier@demo.com', userName: 'Mike Courier', userRole: 'courier' }
        ],
        lastMessage: { message: 'Package delivered successfully', timestamp: new Date(Date.now() - 14400000).toISOString() },
        unreadCount: 0,
        isOnline: false
      }
    ]
    setChats(mockChats)
    setLoading(false)
  }

  const filteredChats = chats.filter(chat =>
    chat.participants.some((p: any) => 
      p.userId !== user?.email && 
      p.userName && p.userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const getOtherParticipant = (chat: any) => {
    return chat.participants.find((p: any) => p.userId !== user?.email)
  }

  const formatTime = (date: string) => {
    const now = new Date()
    const messageDate = new Date(date)
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return 'Just now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else {
      return messageDate.toLocaleDateString()
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{t('nav.messages')}</h1>
              <p className="text-gray-600 mt-2">{t('chat.start_chatting')}</p>
            </div>
            <Button onClick={() => setShowNewChat(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              New Chat
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('common.search')}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-gray-500">{t('common.loading')}</div>
                ) : filteredChats.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>{t('chat.no_conversations')}</p>
                    <p className="text-sm mt-1">{t('chat.start_chatting')}</p>
                  </div>
                ) : (
                  filteredChats.map((chat) => {
                    const otherParticipant = getOtherParticipant(chat)
                    return (
                      <div
                        key={chat._id}
                        onClick={() => setSelectedChat(chat)}
                        className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedChat?._id === chat._id ? 'bg-blue-50 border-blue-200' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600" />
                            </div>
                            {chat.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium text-gray-900 truncate">
                                {otherParticipant?.userName}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <span className="text-xs text-gray-500">
                                  {chat.lastMessage && formatTime(chat.lastMessage.timestamp)}
                                </span>
                                {chat.unreadCount > 0 && (
                                  <div className="w-5 h-5 bg-uber-green rounded-full flex items-center justify-center">
                                    <span className="text-xs text-white font-medium">{chat.unreadCount}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                            <p className={`text-sm truncate ${
                              chat.unreadCount > 0 ? 'text-gray-900 font-medium' : 'text-gray-600'
                            }`}>
                              {chat.lastMessage?.message || 'No messages yet'}
                            </p>
                            <div className="flex items-center justify-between mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                otherParticipant?.userRole === 'driver' 
                                  ? 'bg-blue-100 text-blue-800'
                                  : otherParticipant?.userRole === 'admin'
                                  ? 'bg-red-100 text-red-800'
                                  : otherParticipant?.userRole === 'restaurant'
                                  ? 'bg-orange-100 text-orange-800'
                                  : otherParticipant?.userRole === 'courier'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}>
                                {otherParticipant?.userRole}
                              </span>
                              {chat.isOnline && (
                                <span className="text-xs text-green-600">Online</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            {selectedChat ? (
              <div className="bg-white rounded-xl shadow-sm border h-96">
                <ChatWindow
                  chatId={selectedChat._id}
                  participantName={getOtherParticipant(selectedChat)?.userName}
                  onClose={() => setSelectedChat(null)}
                />
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border h-96 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p>Choose a chat from the list to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}