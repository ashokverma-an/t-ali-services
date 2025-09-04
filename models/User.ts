import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  _id: string
  name: string
  email: string
  password: string
  phone?: string
  avatar?: string
  role: 'user' | 'driver' | 'admin'
  isVerified: boolean
  isActive: boolean
  addresses: {
    type: 'home' | 'work' | 'other'
    address: string
    coordinates: {
      lat: number
      lng: number
    }
  }[]
  paymentMethods: {
    type: 'card' | 'paypal' | 'wallet'
    details: any
    isDefault: boolean
  }[]
  preferences: {
    notifications: boolean
    language: string
    currency: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  phone: {
    type: String,
    trim: true,
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  addresses: [{
    type: {
      type: String,
      enum: ['home', 'work', 'other'],
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  }],
  paymentMethods: [{
    type: {
      type: String,
      enum: ['card', 'paypal', 'wallet'],
      required: true,
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  }],
  preferences: {
    notifications: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'en',
    },
    currency: {
      type: String,
      default: 'USD',
    },
  },
}, {
  timestamps: true,
})

// Indexes
UserSchema.index({ email: 1 })
UserSchema.index({ phone: 1 })
UserSchema.index({ role: 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)