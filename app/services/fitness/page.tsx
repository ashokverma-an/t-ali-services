import ServiceTemplate from '@/components/services/ServiceTemplate'

const categories = {
  retail: { icon: '🛍️', title: 'Retail & Shopping', description: 'Best shopping destinations and retail stores', services: ['Clothing & Accessories', 'Electronics', 'Furniture & Home Decor', 'Grocery Stores', 'Jewelry', 'Bookstores'] },
  realestate: { icon: '🏢', title: 'Real Estate & Property', description: 'Property services and real estate solutions', services: ['Real Estate Agents', 'Property Management', 'Rental Services', 'Construction & Renovation', 'Architecture & Interior Design'] },
  fitness: { icon: '🏋️', title: 'Health & Fitness', description: 'Fitness centers and wellness programs', services: ['Gyms & Fitness Centers', 'Yoga Studios', 'Personal Trainers', 'Nutritionists', 'Sports Clubs'] },
  education: { icon: '🧒', title: 'Education & Childcare', description: 'Educational services and childcare solutions', services: ['Schools & Colleges', 'Tutors', 'Daycare Centers', 'Learning Centers', 'Driving Schools'] },
  logistics: { icon: '📦', title: 'Logistics & Transportation', description: 'Delivery and transportation services', services: ['Courier Services', 'Moving Companies', 'Freight & Shipping', 'Taxi & Ride Services'] },
  events: { icon: '🎉', title: 'Events & Entertainment', description: 'Event planning and entertainment services', services: ['Event Planners', 'DJs & Bands', 'Photography & Videography', 'Party Rentals', 'Wedding Services'] },
  media: { icon: '📸', title: 'Media & Creative Services', description: 'Creative and media production services', services: ['Graphic Design', 'Photography Studios', 'Video Production', 'Printing Services', 'Web Design & Development'] },
  pets: { icon: '🐾', title: 'Pets & Animals', description: 'Pet care and animal services', services: ['Veterinary Clinics', 'Pet Grooming', 'Pet Stores', 'Dog Training', 'Pet Sitting & Boarding'] }
}

const providers = [
  { id: 1, name: 'Service Provider 1', service: 'Service 1', rating: 4.8, reviews: 156, distance: '2.1 km', price: 'AED 200/hr', available: true },
  { id: 2, name: 'Service Provider 2', service: 'Service 2', rating: 4.7, reviews: 89, distance: '1.5 km', price: 'AED 150/visit', available: true },
  { id: 3, name: 'Service Provider 3', service: 'Service 3', rating: 4.9, reviews: 234, distance: '3.2 km', price: 'AED 300/session', available: false }
]

export default function ServicePage() {
  const categoryKey = 'fitness'
  return <ServiceTemplate category={categories[categoryKey]} providers={providers} />
}
