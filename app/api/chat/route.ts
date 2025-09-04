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

    const { db } = await connectToDatabase()
    
    const chats = await db.collection('chats')
      .find({ 'participants.userId': session.user.id })
      .sort({ updatedAt: -1 })
      .toArray()

    return NextResponse.json(chats)
  } catch (error) {
    console.error('Chat fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch chats' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { participantId, bookingId } = await request.json()
    const { db } = await connectToDatabase()

    const participant = await db.collection('users').findOne({ _id: new ObjectId(participantId) })
    if (!participant) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const existingChat = await db.collection('chats').findOne({
      $and: [
        { 'participants.userId': session.user.id },
        { 'participants.userId': participantId }
      ]
    })

    if (existingChat) {
      return NextResponse.json(existingChat)
    }

    const chat = {
      participants: [
        {
          userId: session.user.id,
          userName: session.user.name,
          userRole: session.user.role,
          lastSeen: new Date()
        },
        {
          userId: participantId,
          userName: participant.name,
          userRole: participant.role,
          lastSeen: new Date()
        }
      ],
      bookingId: bookingId || null,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('chats').insertOne(chat)
    return NextResponse.json({ ...chat, _id: result.insertedId })
  } catch (error) {
    console.error('Chat creation error:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}