import ServiceTemplate from '@/components/services/ServiceTemplate'

const category = {
  icon: '🚗',
  title: 'Automotive Services',
  description: 'Complete automotive care and maintenance',
  services: ['Car Dealerships', 'Auto Repair & Maintenance', 'Car Wash & Detailing', 'Auto Parts & Accessories', 'Towing Services']
}

const providers = [
  { id: 1, name: 'Dubai Auto Center', service: 'Auto Repair & Maintenance', rating: 4.8, reviews: 345, distance: '2.5 km', price: 'AED 200/hr', available: true },
  { id: 2, name: 'Premium Car Wash', service: 'Car Wash & Detailing', rating: 4.7, reviews: 234, distance: '1.8 km', price: 'AED 150/wash', available: true },
  { id: 3, name: 'AutoParts Dubai', service: 'Auto Parts & Accessories', rating: 4.6, reviews: 189, distance: '3.2 km', price: 'Varies', available: true },
  { id: 4, name: '24/7 Towing Service', service: 'Towing Services', rating: 4.9, reviews: 156, distance: '5.0 km', price: 'AED 300/tow', available: true },
  { id: 5, name: 'Elite Motors', service: 'Car Dealerships', rating: 4.5, reviews: 89, distance: '4.2 km', price: 'Market price', available: false }
]

export default function AutomotiveServicesPage() {
  return <ServiceTemplate category={category} providers={providers} />
}