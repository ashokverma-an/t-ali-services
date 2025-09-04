export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Safety First</h1>
        
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6">Your Safety is Our Priority</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Driver Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Background checks for all drivers</li>
                <li>• Vehicle inspection requirements</li>
                <li>• Real-time GPS tracking</li>
                <li>• 24/7 support hotline</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">User Safety</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Share trip details with contacts</li>
                <li>• Emergency assistance button</li>
                <li>• Driver photo and details</li>
                <li>• Trip history and receipts</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-red-50 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Contact</h3>
            <p className="text-red-700">In case of emergency, call: <strong>999</strong></p>
            <p className="text-red-700">T Ali Safety Line: <strong>+971 4 SAFETY (723389)</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}