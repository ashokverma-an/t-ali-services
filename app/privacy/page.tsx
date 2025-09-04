export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="bg-white rounded-lg shadow p-8">
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">Last updated: December 2024</p>
            
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <p className="mb-4">We collect information you provide directly to us, such as when you create an account, use our services, or contact us.</p>
            
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4">Information Sharing</h2>
            <p className="mb-4">We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p className="mb-4">We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us at privacy@taliservices.ae</p>
          </div>
        </div>
      </div>
    </div>
  )
}