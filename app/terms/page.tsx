export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: December 2024</p>
            
            <h2 className="text-xl font-semibold mb-4">Acceptance of Terms</h2>
            <p className="mb-4">By accessing and using T Ali Services, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h2 className="text-xl font-semibold mb-4">Use License</h2>
            <p className="mb-4">Permission is granted to temporarily use T Ali Services for personal, non-commercial transitory viewing only.</p>
            
            <h2 className="text-xl font-semibold mb-4">Service Availability</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Services are available 24/7 subject to maintenance</li>
              <li>We reserve the right to modify or discontinue services</li>
              <li>Service availability may vary by location</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4">User Responsibilities</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Use services in compliance with applicable laws</li>
              <li>Treat drivers and other users with respect</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4">Payment Terms</h2>
            <p className="mb-4">Payment is due immediately upon completion of services. We accept various payment methods including cash, card, and digital wallets.</p>
            
            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p className="mb-4">T Ali Services shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
            
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at legal@taliservices.ae</p>
          </div>
        </div>
      </div>
    </div>
  )
}