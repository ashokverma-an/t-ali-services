import ServiceTemplate from '@/components/services/ServiceTemplate'

const category = {
  icon: '🏥',
  title: 'Health & Medical',
  description: 'Comprehensive healthcare and medical services',
  services: ['Hospitals & Clinics', 'Dentists', 'Optometrists', 'Chiropractors', 'Pharmacies', 'Therapists & Counselors']
}

const providers = [
  { id: 1, name: 'Dubai Medical Center', service: 'Hospitals & Clinics', rating: 4.8, reviews: 567, distance: '2.1 km', price: 'AED 300/consultation', available: true },
  { id: 2, name: 'Smile Dental Clinic', service: 'Dentists', rating: 4.9, reviews: 234, distance: '1.5 km', price: 'AED 250/visit', available: true },
  { id: 3, name: 'Vision Care Dubai', service: 'Optometrists', rating: 4.7, reviews: 189, distance: '2.8 km', price: 'AED 200/exam', available: false },
  { id: 4, name: 'Spine & Wellness', service: 'Chiropractors', rating: 4.8, reviews: 156, distance: '3.2 km', price: 'AED 350/session', available: true },
  { id: 5, name: 'Life Pharmacy', service: 'Pharmacies', rating: 4.6, reviews: 445, distance: '0.8 km', price: 'Prescription based', available: true }
]

export default function MedicalServicesPage() {
  return <ServiceTemplate category={category} providers={providers} />
}