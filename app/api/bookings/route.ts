import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { connectToDatabase } from '@/lib/db/mongodb'
import { ObjectId } from 'mongodb'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Please sign in to book a service' }, { status: 401 })
    }

    const bookingData = await request.json()
    
    // Validate required fields
    if (!bookingData.serviceType || !bookingData.pickup || !bookingData.destination) {
      return NextResponse.json({ error: 'Missing required booking information' }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    const booking = {
      ...bookingData,
      userId: session.user.id,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection('bookings').insertOne(booking)

    return NextResponse.json({
      message: 'Booking created successfully',
      bookingId: result.insertedId,
      booking: { ...booking, _id: result.insertedId }
    })
  } catch (error: any) {
    console.error('Booking creation error:', error)
    if (error?.message?.includes('connect')) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again.' },
        { status: 503 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const serviceType = searchParams.get('serviceType')
    const status = searchParams.get('status')

    const { db } = await connectToDatabase()
    
    let query: any = {}
    
    // If admin, show all bookings, otherwise show user's bookings
    if (session.user.role !== 'admin') {
      query.userId = session.user.id
    }
    
    if (serviceType) query.serviceType = serviceType
    if (status) query.status = status

    const bookings = await db.collection('bookings')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(bookings)
  } catch (error) {
    console.error('Bookings fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { bookingId, status, driverId, ...updateData } = await request.json()
    const { db } = await connectToDatabase()

    const update: any = {
      ...updateData,
      status,
      updatedAt: new Date(),
    }

    if (driverId) update.driverId = driverId
    if (status === 'accepted') update.acceptedAt = new Date()
    if (status === 'in_progress') update.startedAt = new Date()
    if (status === 'completed') update.completedAt = new Date()
    if (status === 'cancelled') update.cancelledAt = new Date()

    const result = await db.collection('bookings').updateOne(
      { _id: new ObjectId(bookingId) },
      { $set: update }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Booking updated successfully' })
  } catch (error) {
    console.error('Booking update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}