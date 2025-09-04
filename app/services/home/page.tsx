import ServiceTemplate from '@/components/services/ServiceTemplate'

const category = {
  icon: '🏠',
  title: 'Home Services',
  description: 'Professional home maintenance and repair services',
  services: ['Plumbing', 'Electrical', 'Roofing', 'Cleaning Services', 'Landscaping & Gardening', 'Pest Control']
}

const providers = [
  { id: 1, name: 'Dubai Plumbing Experts', service: 'Plumbing', rating: 4.8, reviews: 234, distance: '1.2 km', price: 'AED 150/hr', available: true },
  { id: 2, name: 'ElectroFix Dubai', service: 'Electrical', rating: 4.9, reviews: 189, distance: '2.1 km', price: 'AED 200/hr', available: true },
  { id: 3, name: 'Elite Cleaning Co.', service: 'Cleaning Services', rating: 4.7, reviews: 456, distance: '1.8 km', price: 'AED 120/hr', available: true },
  { id: 4, name: 'Green Gardens Dubai', service: 'Landscaping & Gardening', rating: 4.6, reviews: 123, distance: '3.5 km', price: 'AED 250/visit', available: false },
  { id: 5, name: 'Pest Control Pro', service: 'Pest Control', rating: 4.8, reviews: 167, distance: '2.8 km', price: 'AED 300/treatment', available: true }
]

export default function HomeServicesPage() {
  return <ServiceTemplate category={category} providers={providers} />
}