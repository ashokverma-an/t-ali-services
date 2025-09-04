import ServiceTemplate from '@/components/services/ServiceTemplate'

const category = {
  icon: '💇',
  title: 'Beauty & Personal Care',
  description: 'Premium beauty and wellness services',
  services: ['Hair Salons', 'Nail Salons', 'Spas & Massage', 'Skincare Clinics', 'Barbershops']
}

const providers = [
  { id: 1, name: 'Glamour Hair Studio', service: 'Hair Salons', rating: 4.9, reviews: 312, distance: '1.5 km', price: 'AED 200/session', available: true },
  { id: 2, name: 'Nail Art Dubai', service: 'Nail Salons', rating: 4.7, reviews: 189, distance: '2.2 km', price: 'AED 120/session', available: true },
  { id: 3, name: 'Wellness Spa Dubai', service: 'Spas & Massage', rating: 4.8, reviews: 456, distance: '1.8 km', price: 'AED 350/session', available: false },
  { id: 4, name: 'Glow Skincare Clinic', service: 'Skincare Clinics', rating: 4.9, reviews: 234, distance: '2.5 km', price: 'AED 400/treatment', available: true },
  { id: 5, name: 'Classic Barbershop', service: 'Barbershops', rating: 4.6, reviews: 167, distance: '1.2 km', price: 'AED 80/cut', available: true }
]

export default function BeautyServicesPage() {
  return <ServiceTemplate category={category} providers={providers} />
}