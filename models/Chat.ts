import mongoose, { Document, Schema } from 'mongoose'

export interface IMessage extends Document {
  _id: string
  chatId: string
  senderId: string
  senderName: string
  senderRole: 'user' | 'driver' | 'admin'
  message: string
  messageType: 'text' | 'image' | 'location'
  isRead: boolean
  createdAt: Date
}

export interface IChat extends Document {
  _id: string
  participants: {
    userId: string
    userName: string
    userRole: 'user' | 'driver' | 'admin'
    lastSeen: Date
  }[]
  bookingId?: string
  lastMessage: {
    message: string
    senderId: string
    timestamp: Date
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const MessageSchema = new Schema<IMessage>({
  chatId: { type: String, required: true, ref: 'Chat' },
  senderId: { type: String, required: true, ref: 'User' },
  senderName: { type: String, required: true },
  senderRole: { type: String, enum: ['user', 'driver', 'admin'], required: true },
  message: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'image', 'location'], default: 'text' },
  isRead: { type: Boolean, default: false },
}, { timestamps: true })

const ChatSchema = new Schema<IChat>({
  participants: [{
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userRole: { type: String, enum: ['user', 'driver', 'admin'], required: true },
    lastSeen: { type: Date, default: Date.now }
  }],
  bookingId: { type: String, ref: 'Booking' },
  lastMessage: {
    message: String,
    senderId: String,
    timestamp: Date
  },
  isActive: { type: Boolean, default: true },
}, { timestamps: true })

MessageSchema.index({ chatId: 1, createdAt: -1 })
ChatSchema.index({ 'participants.userId': 1 })
ChatSchema.index({ bookingId: 1 })

export const Message = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema)
export const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema)