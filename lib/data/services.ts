export interface Service {
  id: string
  name: string
  category: string
  icon: string
  description: string
  price: string
  rating: number
  availability: string
  phone?: string
  location?: string
}

export const serviceCategories = {
  professional: {
    title: "🔧 Professional Services",
    services: [
      { id: "legal", name: "Legal Services / Lawyers", icon: "⚖️", description: "Expert legal consultation and representation", price: "From AED 300/hr", rating: 4.8, availability: "24/7" },
      { id: "accounting", name: "Accounting & Bookkeeping", icon: "📊", description: "Professional financial management services", price: "From AED 200/hr", rating: 4.7, availability: "Mon-Fri 9AM-6PM" },
      { id: "financial", name: "Financial Advisors", icon: "💰", description: "Investment and financial planning guidance", price: "From AED 400/hr", rating: 4.9, availability: "Mon-Sat 8AM-8PM" },
      { id: "consulting", name: "Consulting Services", icon: "🎯", description: "Business strategy and management consulting", price: "From AED 500/hr", rating: 4.6, availability: "Mon-Fri 9AM-7PM" },
      { id: "marketing", name: "Marketing & Advertising", icon: "📢", description: "Digital marketing and brand promotion", price: "From AED 250/hr", rating: 4.5, availability: "Mon-Fri 9AM-6PM" },
      { id: "it-support", name: "IT & Tech Support", icon: "💻", description: "Technical support and IT solutions", price: "From AED 150/hr", rating: 4.7, availability: "24/7" }
    ]
  },
  retail: {
    title: "🛍️ Retail & Shopping",
    services: [
      { id: "clothing", name: "Clothing & Accessories", icon: "👕", description: "Fashion and lifestyle products", price: "From AED 50", rating: 4.4, availability: "10AM-10PM" },
      { id: "electronics", name: "Electronics", icon: "📱", description: "Latest gadgets and electronic devices", price: "From AED 100", rating: 4.6, availability: "10AM-10PM" },
      { id: "furniture", name: "Furniture & Home Decor", icon: "🛋️", description: "Home furnishing and decoration items", price: "From AED 200", rating: 4.5, availability: "9AM-9PM" },
      { id: "grocery", name: "Grocery Stores", icon: "🛒", description: "Fresh groceries and daily essentials", price: "From AED 20", rating: 4.3, availability: "24/7" },
      { id: "jewelry", name: "Jewelry", icon: "💎", description: "Fine jewelry and precious accessories", price: "From AED 500", rating: 4.8, availability: "10AM-8PM" },
      { id: "bookstores", name: "Bookstores", icon: "📚", description: "Books, magazines, and educational materials", price: "From AED 25", rating: 4.4, availability: "9AM-9PM" }
    ]
  },
  food: {
    title: "🍽️ Food & Drink",
    services: [
      { id: "restaurants", name: "Restaurants", icon: "🍽️", description: "Fine dining and casual restaurant experiences", price: "From AED 40", rating: 4.5, availability: "11AM-12AM" },
      { id: "cafes", name: "Cafés & Coffee Shops", icon: "☕", description: "Coffee, tea, and light refreshments", price: "From AED 15", rating: 4.4, availability: "6AM-11PM" },
      { id: "bars", name: "Bars & Pubs", icon: "🍺", description: "Beverages and nightlife entertainment", price: "From AED 30", rating: 4.3, availability: "6PM-2AM" },
      { id: "bakeries", name: "Bakeries", icon: "🥖", description: "Fresh bread, pastries, and baked goods", price: "From AED 10", rating: 4.6, availability: "6AM-8PM" },
      { id: "catering", name: "Catering Services", icon: "🍱", description: "Event catering and meal delivery", price: "From AED 25/person", rating: 4.7, availability: "24/7 booking" },
      { id: "food-trucks", name: "Food Trucks", icon: "🚚", description: "Mobile food vendors and street food", price: "From AED 20", rating: 4.2, availability: "11AM-10PM" }
    ]
  },
  home: {
    title: "🏠 Home Services",
    services: [
      { id: "plumbing", name: "Plumbing", icon: "🔧", description: "Professional plumbing repairs and installation", price: "From AED 100", rating: 4.6, availability: "24/7 Emergency" },
      { id: "electrical", name: "Electrical", icon: "⚡", description: "Electrical repairs and installations", price: "From AED 120", rating: 4.7, availability: "24/7 Emergency" },
      { id: "roofing", name: "Roofing", icon: "🏠", description: "Roof repairs and maintenance services", price: "From AED 200", rating: 4.5, availability: "8AM-6PM" },
      { id: "cleaning", name: "Cleaning Services", icon: "🧹", description: "Professional home and office cleaning", price: "From AED 80", rating: 4.8, availability: "7AM-8PM" },
      { id: "landscaping", name: "Landscaping & Gardening", icon: "🌱", description: "Garden design and maintenance services", price: "From AED 150", rating: 4.4, availability: "7AM-5PM" },
      { id: "pest-control", name: "Pest Control", icon: "🐛", description: "Professional pest elimination services", price: "From AED 100", rating: 4.6, availability: "24/7" }
    ]
  },
  automotive: {
    title: "🚗 Automotive",
    services: [
      { id: "auto-repair", name: "Auto Repair & Maintenance", icon: "🔧", description: "Vehicle repair and maintenance services", price: "From AED 100", rating: 4.6, availability: "8AM-7PM" },
      { id: "car-wash", name: "Car Wash & Detailing", icon: "🧽", description: "Professional car cleaning services", price: "From AED 30", rating: 4.4, availability: "7AM-9PM" },
      { id: "towing", name: "Towing Services", icon: "🚛", description: "Emergency vehicle towing and recovery", price: "From AED 150", rating: 4.7, availability: "24/7" }
    ]
  },
  beauty: {
    title: "💇 Beauty & Personal Care",
    services: [
      { id: "hair-salons", name: "Hair Salons", icon: "💇", description: "Professional hair styling and treatments", price: "From AED 80", rating: 4.6, availability: "9AM-9PM" },
      { id: "nail-salons", name: "Nail Salons", icon: "💅", description: "Manicure, pedicure, and nail art", price: "From AED 50", rating: 4.5, availability: "10AM-8PM" },
      { id: "spas", name: "Spas & Massage", icon: "🧖", description: "Relaxation and wellness treatments", price: "From AED 150", rating: 4.8, availability: "9AM-10PM" }
    ]
  },
  medical: {
    title: "🏥 Health & Medical",
    services: [
      { id: "hospitals", name: "Hospitals & Clinics", icon: "🏥", description: "Medical care and emergency services", price: "Insurance accepted", rating: 4.7, availability: "24/7" },
      { id: "dentists", name: "Dentists", icon: "🦷", description: "Dental care and oral health services", price: "From AED 150", rating: 4.6, availability: "8AM-8PM" },
      { id: "pharmacies", name: "Pharmacies", icon: "💊", description: "Prescription and over-the-counter medications", price: "Varies", rating: 4.4, availability: "24/7" }
    ]
  }
}

export const getAllServices = (): Service[] => {
  return Object.values(serviceCategories).flatMap(category => 
    category.services.map(service => ({
      ...service,
      category: category.title
    }))
  )
}