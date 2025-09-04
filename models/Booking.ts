import mongoose, { Document, Schema } from 'mongoose'

export interface IBooking extends Document {
  _id: string
  userId: string
  driverId?: string
  serviceType: 'ride' | 'food' | 'package'
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled'
  
  // Location details
  pickup: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  destination: {
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  
  // Ride specific
  vehicleType?: 'standard' | 'premium' | 'luxury'
  estimatedDistance?: number
  estimatedDuration?: number
  actualDistance?: number
  actualDuration?: number
  
  // Food specific
  restaurant?: {
    id: string
    name: string
    address: string
  }
  items?: {
    name: string
    quantity: number
    price: number
    notes?: string
  }[]
  
  // Package specific
  packageDetails?: {
    size: 'small' | 'medium' | 'large'
    weight?: number
    description?: string
    fragile: boolean
  }
  recipient?: {
    name: string
    phone: string
  }
  
  // Pricing
  pricing: {
    baseFare: number
    distanceFare: number
    timeFare: number
    serviceFee: number
    tax: number
    tip?: number
    discount?: number
    total: number
  }
  
  // Payment
  paymentMethod: {
    type: 'card' | 'cash' | 'wallet'
    details?: any
  }
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  
  // Tracking
  scheduledAt?: Date
  acceptedAt?: Date
  startedAt?: Date
  completedAt?: Date
  cancelledAt?: Date
  cancellationReason?: string
  
  // Rating and feedback
  rating?: {
    user: number
    driver: number
    userComment?: string
    driverComment?: string
  }
  
  createdAt: Date
  updatedAt: Date
}

const BookingSchema = new Schema<IBooking>({
  userId: {
    type: String,
    required: true,
    ref: 'User',
  },
  driverId: {
    type: String,
    ref: 'User',
  },
  serviceType: {
    type: String,
    enum: ['ride', 'food', 'package'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  
  pickup: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  destination: {
    address: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  
  vehicleType: {
    type: String,
    enum: ['standard', 'premium', 'luxury'],
  },
  estimatedDistance: Number,
  estimatedDuration: Number,
  actualDistance: Number,
  actualDuration: Number,
  
  restaurant: {
    id: String,
    name: String,
    address: String,
  },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    notes: String,
  }],
  
  packageDetails: {
    size: {
      type: String,
      enum: ['small', 'medium', 'large'],
    },
    weight: Number,
    description: String,
    fragile: { type: Boolean, default: false },
  },
  recipient: {
    name: String,
    phone: String,
  },
  
  pricing: {
    baseFare: { type: Number, required: true },
    distanceFare: { type: Number, default: 0 },
    timeFare: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    tip: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    total: { type: Number, required: true },
  },
  
  paymentMethod: {
    type: {
      type: String,
      enum: ['card', 'cash', 'wallet'],
      required: true,
    },
    details: Schema.Types.Mixed,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending',
  },
  
  scheduledAt: Date,
  acceptedAt: Date,
  startedAt: Date,
  completedAt: Date,
  cancelledAt: Date,
  cancellationReason: String,
  
  rating: {
    user: { type: Number, min: 1, max: 5 },
    driver: { type: Number, min: 1, max: 5 },
    userComment: String,
    driverComment: String,
  },
}, {
  timestamps: true,
})

// Indexes
BookingSchema.index({ userId: 1, createdAt: -1 })
BookingSchema.index({ driverId: 1, createdAt: -1 })
BookingSchema.index({ status: 1 })
BookingSchema.index({ serviceType: 1 })
BookingSchema.index({ 'pickup.coordinates': '2dsphere' })
BookingSchema.index({ 'destination.coordinates': '2dsphere' })

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', BookingSchema)