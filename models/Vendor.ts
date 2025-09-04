import mongoose from 'mongoose'

export interface IVendor {
  _id?: string
  businessName: string
  ownerName: string
  email: string
  phone: string
  password: string
  businessType: 'restaurant' | 'retail' | 'service' | 'grocery' | 'pharmacy' | 'beauty' | 'automotive' | 'professional'
  category: string
  subcategory: string
  
  // Business Details
  businessLicense: string
  taxId: string
  tradeLicense: string
  establishmentCard: string
  
  // Location & Contact
  address: {
    street: string
    area: string
    city: string
    emirate: string
    country: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  
  // Business Hours
  businessHours: {
    [key: string]: {
      isOpen: boolean
      openTime: string
      closeTime: string
    }
  }
  
  // Financial Information
  bankDetails: {
    bankName: string
    accountNumber: string
    iban: string
    swiftCode: string
  }
  
  // Platform Settings
  commissionRate: number // Platform commission percentage
  deliveryRadius: number // In kilometers
  minimumOrder: number
  deliveryFee: number
  estimatedDeliveryTime: string
  
  // Status & Verification
  status: 'pending' | 'approved' | 'suspended' | 'rejected'
  verificationStatus: {
    documents: boolean
    bankAccount: boolean
    businessAddress: boolean
    phone: boolean
    email: boolean
  }
  
  // Ratings & Reviews
  rating: number
  totalReviews: number
  totalOrders: number
  
  // Financial Metrics
  totalEarnings: number
  pendingPayouts: number
  lastPayoutDate?: Date
  
  // Platform Integration
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  description: string
  logo?: string
  coverImage?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  approvedAt?: Date
  lastLoginAt?: Date
}

export interface IProduct {
  _id?: string
  vendorId: string
  name: string
  description: string
  category: string
  subcategory: string
  
  // Pricing
  price: number
  originalPrice?: number
  discount?: number
  
  // Inventory
  stock: number
  sku: string
  isUnlimited: boolean
  
  // Product Details
  images: string[]
  specifications?: {
    [key: string]: string
  }
  variants?: {
    name: string
    options: {
      name: string
      price: number
      stock: number
    }[]
  }[]
  
  // Availability
  isAvailable: boolean
  availabilitySchedule?: {
    [key: string]: {
      isAvailable: boolean
      startTime?: string
      endTime?: string
    }
  }
  
  // SEO & Marketing
  tags: string[]
  isPromoted: boolean
  promotionEndDate?: Date
  
  // Metrics
  views: number
  orders: number
  rating: number
  reviews: number
  
  // Status
  status: 'active' | 'inactive' | 'out_of_stock' | 'discontinued'
  
  createdAt: Date
  updatedAt: Date
}

export interface IVendorOrder {
  _id?: string
  orderId: string
  vendorId: string
  customerId: string
  
  // Order Details
  items: {
    productId: string
    name: string
    price: number
    quantity: number
    variants?: {
      [key: string]: string
    }
    subtotal: number
  }[]
  
  // Pricing
  subtotal: number
  tax: number
  deliveryFee: number
  platformFee: number
  vendorEarnings: number
  total: number
  
  // Status & Tracking
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'picked_up' | 'delivered' | 'cancelled' | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  
  // Delivery Information
  deliveryAddress: {
    street: string
    area: string
    city: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  deliveryInstructions?: string
  estimatedDeliveryTime: Date
  actualDeliveryTime?: Date
  
  // Assignment
  driverId?: string
  driverInfo?: {
    name: string
    phone: string
    vehicle: string
  }
  
  // Communication
  customerNotes?: string
  vendorNotes?: string
  
  // Timestamps
  createdAt: Date
  updatedAt: Date
  confirmedAt?: Date
  deliveredAt?: Date
}

const vendorSchema = new mongoose.Schema<IVendor>({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  businessType: { 
    type: String, 
    required: true,
    enum: ['restaurant', 'retail', 'service', 'grocery', 'pharmacy', 'beauty', 'automotive', 'professional']
  },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  
  businessLicense: { type: String, required: true },
  taxId: { type: String, required: true },
  tradeLicense: { type: String, required: true },
  establishmentCard: { type: String, required: true },
  
  address: {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    emirate: { type: String, required: true },
    country: { type: String, default: 'UAE' },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  
  businessHours: {
    type: Map,
    of: {
      isOpen: { type: Boolean, default: true },
      openTime: { type: String, default: '09:00' },
      closeTime: { type: String, default: '22:00' }
    },
    default: {
      monday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      tuesday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      wednesday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      thursday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      friday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      saturday: { isOpen: true, openTime: '09:00', closeTime: '22:00' },
      sunday: { isOpen: true, openTime: '09:00', closeTime: '22:00' }
    }
  },
  
  bankDetails: {
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    iban: { type: String, required: true },
    swiftCode: { type: String, required: true }
  },
  
  commissionRate: { type: Number, default: 15 }, // 15% platform commission
  deliveryRadius: { type: Number, default: 10 }, // 10km radius
  minimumOrder: { type: Number, default: 25 }, // AED 25 minimum
  deliveryFee: { type: Number, default: 5 }, // AED 5 delivery fee
  estimatedDeliveryTime: { type: String, default: '30-45 min' },
  
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'suspended', 'rejected'],
    default: 'pending'
  },
  
  verificationStatus: {
    documents: { type: Boolean, default: false },
    bankAccount: { type: Boolean, default: false },
    businessAddress: { type: Boolean, default: false },
    phone: { type: Boolean, default: false },
    email: { type: Boolean, default: false }
  },
  
  rating: { type: Number, default: 0 },
  totalReviews: { type: Number, default: 0 },
  totalOrders: { type: Number, default: 0 },
  
  totalEarnings: { type: Number, default: 0 },
  pendingPayouts: { type: Number, default: 0 },
  lastPayoutDate: { type: Date },
  
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  tags: [{ type: String }],
  description: { type: String },
  logo: { type: String },
  coverImage: { type: String },
  
  approvedAt: { type: Date },
  lastLoginAt: { type: Date }
}, {
  timestamps: true
})

const productSchema = new mongoose.Schema<IProduct>({
  vendorId: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  
  stock: { type: Number, default: 0 },
  sku: { type: String, required: true, unique: true },
  isUnlimited: { type: Boolean, default: false },
  
  images: [{ type: String }],
  specifications: { type: Map, of: String },
  variants: [{
    name: { type: String },
    options: [{
      name: { type: String },
      price: { type: Number },
      stock: { type: Number }
    }]
  }],
  
  isAvailable: { type: Boolean, default: true },
  availabilitySchedule: {
    type: Map,
    of: {
      isAvailable: { type: Boolean, default: true },
      startTime: { type: String },
      endTime: { type: String }
    }
  },
  
  tags: [{ type: String }],
  isPromoted: { type: Boolean, default: false },
  promotionEndDate: { type: Date },
  
  views: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  
  status: { 
    type: String, 
    enum: ['active', 'inactive', 'out_of_stock', 'discontinued'],
    default: 'active'
  }
}, {
  timestamps: true
})

const vendorOrderSchema = new mongoose.Schema<IVendorOrder>({
  orderId: { type: String, required: true },
  vendorId: { type: String, required: true },
  customerId: { type: String, required: true },
  
  items: [{
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    variants: { type: Map, of: String },
    subtotal: { type: Number, required: true }
  }],
  
  subtotal: { type: Number, required: true },
  tax: { type: Number, required: true },
  deliveryFee: { type: Number, required: true },
  platformFee: { type: Number, required: true },
  vendorEarnings: { type: Number, required: true },
  total: { type: Number, required: true },
  
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'picked_up', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  
  deliveryAddress: {
    street: { type: String, required: true },
    area: { type: String, required: true },
    city: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    }
  },
  deliveryInstructions: { type: String },
  estimatedDeliveryTime: { type: Date, required: true },
  actualDeliveryTime: { type: Date },
  
  driverId: { type: String },
  driverInfo: {
    name: { type: String },
    phone: { type: String },
    vehicle: { type: String }
  },
  
  customerNotes: { type: String },
  vendorNotes: { type: String },
  
  confirmedAt: { type: Date },
  deliveredAt: { type: Date }
}, {
  timestamps: true
})

export const Vendor = mongoose.models.Vendor || mongoose.model<IVendor>('Vendor', vendorSchema)
export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', productSchema)
export const VendorOrder = mongoose.models.VendorOrder || mongoose.model<IVendorOrder>('VendorOrder', vendorOrderSchema)