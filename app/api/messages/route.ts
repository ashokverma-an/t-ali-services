import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/db/mongodb'
import { ObjectId } from 'mongodb'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const chatId = searchParams.get('chatId')

    if (!chatId) {
      return NextResponse.json({ error: 'Chat ID required' }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    
    const messages = await db.collection('messages')
      .find({ chatId })
      .sort({ createdAt: 1 })
      .toArray()

    return NextResponse.json(messages)
  } catch (error) {
    console.error('Messages fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { chatId, message, messageType = 'text' } = await request.json()
    
    if (!chatId || !message) {
      return NextResponse.json({ error: 'Chat ID and message required' }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const newMessage = {
      chatId,
      senderId: session.user.id,
      senderName: session.user.name,
      senderRole: session.user.role,
      message,
      messageType,
      isRead: false,
      createdAt: new Date()
    }

    const result = await db.collection('messages').insertOne(newMessage)

    // Update chat's last message
    await db.collection('chats').updateOne(
      { _id: new ObjectId(chatId) },
      {
        $set: {
          lastMessage: {
            message,
            senderId: session.user.id,
            timestamp: new Date()
          },
          updatedAt: new Date()
        }
      }
    )

    return NextResponse.json({ ...newMessage, _id: result.insertedId })
  } catch (error) {
    console.error('Message send error:', error)
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 })
  }
}