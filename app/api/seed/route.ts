import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { ObjectId } from 'mongodb'
import { connectToDatabase } from '@/lib/db/mongodb'

export async function POST() {
  try {
    const { db } = await connectToDatabase()
    
    // Test connection
    await db.admin().ping()
    console.log('Database connected successfully')

    // Clear existing data
    await db.collection('users').deleteMany({})
    await db.collection('bookings').deleteMany({})

    // Create demo users
    const hashedPassword = await bcrypt.hash('password123', 12)
    
    const users = [
      {
        name: 'Demo User',
        email: 'user@demo.com',
        password: hashedPassword,
        role: 'user',
        isVerified: true,
        isActive: true,
        addresses: [
          {
            type: 'home',
            address: '123 Main St, New York, NY',
            coordinates: { lat: 40.7128, lng: -74.0060 }
          }
        ],
        paymentMethods: [
          {
            type: 'card',
            details: { last4: '1234', brand: 'visa' },
            isDefault: true
          }
        ],
        preferences: {
          notifications: true,
          language: 'en',
          currency: 'USD'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Demo Driver',
        email: 'driver@demo.com',
        password: hashedPassword,
        role: 'driver',
        isVerified: true,
        isActive: true,
        addresses: [],
        paymentMethods: [],
        preferences: {
          notifications: true,
          language: 'en',
          currency: 'USD'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin User',
        email: 'admin@demo.com',
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
        isActive: true,
        addresses: [],
        paymentMethods: [],
        preferences: {
          notifications: true,
          language: 'en',
          currency: 'USD'
        },
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Add more demo users
    for (let i = 1; i <= 50; i++) {
      users.push({
        name: `User ${i}`,
        email: `user${i}@demo.com`,
        password: hashedPassword,
        role: Math.random() > 0.8 ? 'driver' : 'user',
        isVerified: true,
        isActive: Math.random() > 0.1,
        addresses: [
          {
            type: 'home',
            address: `${100 + i} Demo St, City ${i}`,
            coordinates: { 
              lat: 40.7128 + (Math.random() - 0.5) * 0.1, 
              lng: -74.0060 + (Math.random() - 0.5) * 0.1 
            }
          }
        ],
        paymentMethods: [
          {
            type: 'card',
            details: { last4: String(1000 + i).slice(-4), brand: 'visa' },
            isDefault: true
          }
        ],
        preferences: {
          notifications: true,
          language: 'en',
          currency: 'USD'
        },
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      })
    }

    const userResult = await db.collection('users').insertMany(users)
    const userIds = Object.values(userResult.insertedIds).map(id => id.toString())

    // Create demo bookings
    const bookings = []
    const serviceTypes = ['ride', 'food', 'package']
    const statuses = ['pending', 'accepted', 'in_progress', 'completed', 'cancelled']
    const vehicleTypes = ['standard', 'premium', 'luxury']

    for (let i = 0; i < 100; i++) {
      const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const userId = userIds[Math.floor(Math.random() * userIds.length)]
      const driverId = Math.random() > 0.5 ? userIds[Math.floor(Math.random() * userIds.length)] : undefined

      const basePrice = 5 + Math.random() * 50
      const booking = {
        userId,
        driverId,
        serviceType,
        status,
        pickup: {
          address: `${100 + i} Pickup St, City ${i}`,
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.0060 + (Math.random() - 0.5) * 0.1
          }
        },
        destination: {
          address: `${200 + i} Destination Ave, City ${i}`,
          coordinates: {
            lat: 40.7128 + (Math.random() - 0.5) * 0.1,
            lng: -74.0060 + (Math.random() - 0.5) * 0.1
          }
        },
        vehicleType: serviceType === 'ride' ? vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)] : undefined,
        estimatedDistance: 2 + Math.random() * 20,
        estimatedDuration: 10 + Math.random() * 60,
        pricing: {
          baseFare: 2.5,
          distanceFare: basePrice - 2.5,
          timeFare: 0,
          serviceFee: 1.5,
          tax: basePrice * 0.08,
          total: basePrice
        },
        paymentMethod: {
          type: 'card',
          details: { last4: '1234' }
        },
        paymentStatus: status === 'completed' ? 'paid' : 'pending',
        createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date()
      }

      // Add service-specific data
      if (serviceType === 'food') {
        (booking as any).restaurant = {
          id: `restaurant-${i}`,
          name: `Restaurant ${i}`,
          address: `${300 + i} Restaurant Blvd, City ${i}`
        };
        (booking as any).items = [
          {
            name: `Food Item ${i}`,
            quantity: 1 + Math.floor(Math.random() * 3),
            price: 10 + Math.random() * 20,
            notes: 'No special instructions'
          }
        ]
      }

      if (serviceType === 'package') {
        (booking as any).packageDetails = {
          size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
          weight: 1 + Math.random() * 10,
          description: `Package ${i}`,
          fragile: Math.random() > 0.7
        };
        (booking as any).recipient = {
          name: `Recipient ${i}`,
          phone: `+1234567${String(i).padStart(3, '0')}`
        }
      }

      bookings.push(booking)
    }

    await db.collection('bookings').insertMany(bookings)

    // Create demo chats
    const chats = []
    const messages = []
    
    for (let i = 0; i < 10; i++) {
      const user1 = userIds[Math.floor(Math.random() * userIds.length)]
      const user2 = userIds[Math.floor(Math.random() * userIds.length)]
      
      if (user1 !== user2) {
        const chatId = new ObjectId()
        const chat = {
          _id: chatId,
          participants: [
            {
              userId: user1,
              userName: `User ${userIds.indexOf(user1) + 1}`,
              userRole: 'user',
              lastSeen: new Date()
            },
            {
              userId: user2,
              userName: `Driver ${userIds.indexOf(user2) + 1}`,
              userRole: 'driver',
              lastSeen: new Date()
            }
          ],
          lastMessage: {
            message: `Hello! This is a demo message ${i + 1}`,
            senderId: user1,
            timestamp: new Date()
          },
          isActive: true,
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
          updatedAt: new Date()
        }
        
        chats.push(chat)
        
        // Add some messages
        for (let j = 0; j < 3; j++) {
          messages.push({
            chatId: chatId.toString(),
            senderId: j % 2 === 0 ? user1 : user2,
            senderName: j % 2 === 0 ? `User ${userIds.indexOf(user1) + 1}` : `Driver ${userIds.indexOf(user2) + 1}`,
            senderRole: j % 2 === 0 ? 'user' : 'driver',
            message: `Demo message ${j + 1} in chat ${i + 1}`,
            messageType: 'text',
            isRead: Math.random() > 0.5,
            createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
          })
        }
      }
    }
    
    if (chats.length > 0) {
      await db.collection('chats').insertMany(chats)
      await db.collection('messages').insertMany(messages)
    }

    return NextResponse.json({
      message: 'Database seeded successfully',
      users: users.length,
      bookings: bookings.length,
      chats: chats.length,
      messages: messages.length
    })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}