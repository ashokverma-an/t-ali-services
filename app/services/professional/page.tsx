import ServiceTemplate from '@/components/services/ServiceTemplate'

const category = {
  icon: '💼',
  title: 'Professional Services',
  description: 'Expert professional services for your business and personal needs',
  services: ['Legal Services / Lawyers', 'Accounting & Bookkeeping', 'Financial Advisors', 'Consulting Services', 'Marketing & Advertising', 'IT & Tech Support']
}

const providers = [
  { id: 1, name: 'Dubai Legal Associates', service: 'Legal Services / Lawyers', rating: 4.8, reviews: 156, distance: '2.1 km', price: 'AED 500/hr', available: true },
  { id: 2, name: 'TechFix Solutions', service: 'IT & Tech Support', rating: 4.9, reviews: 203, distance: '1.5 km', price: 'AED 200/visit', available: true },
  { id: 3, name: 'Prime Accounting', service: 'Accounting & Bookkeeping', rating: 4.7, reviews: 89, distance: '3.2 km', price: 'AED 300/month', available: false },
  { id: 4, name: 'Wealth Advisors Dubai', service: 'Financial Advisors', rating: 4.9, reviews: 312, distance: '1.8 km', price: 'AED 400/session', available: true },
  { id: 5, name: 'Digital Marketing Pro', service: 'Marketing & Advertising', rating: 4.6, reviews: 445, distance: '2.5 km', price: 'AED 1500/project', available: true }
]

export default function ProfessionalServicesPage() {
  return <ServiceTemplate category={category} providers={providers} />
}