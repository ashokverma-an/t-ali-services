import { eventBus } from './EventBus'

export interface Booking {
  id: string
  userId: string
  userName: string
  service: string
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled'
  driverId?: string
  driverName?: string
  pickup: string
  destination: string
  price: number
  timestamp: number
}

class BookingSystem {
  private bookings: Booking[] = []

  constructor() {
    this.loadBookings()
  }

  createBooking(booking: Omit<Booking, 'id' | 'timestamp' | 'status'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      timestamp: Date.now(),
      status: 'pending'
    }

    this.bookings.push(newBooking)
    this.saveBookings()

    // Notify all systems
    eventBus.emit('booking:created', newBooking)
    eventBus.emit('admin:newBooking', newBooking)
    eventBus.emit('driver:newRequest', newBooking)

    return newBooking
  }

  acceptBooking(bookingId: string, driverId: string, driverName: string) {
    const booking = this.bookings.find(b => b.id === bookingId)
    if (booking) {
      booking.status = 'accepted'
      booking.driverId = driverId
      booking.driverName = driverName
      this.saveBookings()

      eventBus.emit('booking:accepted', booking)
      eventBus.emit('user:bookingAccepted', booking)
      eventBus.emit('admin:bookingUpdate', booking)
    }
  }

  updateBookingStatus(bookingId: string, status: Booking['status']) {
    const booking = this.bookings.find(b => b.id === bookingId)
    if (booking) {
      booking.status = status
      this.saveBookings()

      eventBus.emit('booking:updated', booking)
      eventBus.emit('user:bookingUpdate', booking)
      eventBus.emit('admin:bookingUpdate', booking)
    }
  }

  getBookings(): Booking[] {
    return this.bookings
  }

  getUserBookings(userId: string): Booking[] {
    return this.bookings.filter(b => b.userId === userId)
  }

  getDriverBookings(driverId: string): Booking[] {
    return this.bookings.filter(b => b.driverId === driverId)
  }

  private loadBookings() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('bookings')
      if (saved) {
        this.bookings = JSON.parse(saved)
      }
    }
  }

  private saveBookings() {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookings', JSON.stringify(this.bookings))
    }
  }
}

export const bookingSystem = new BookingSystem()