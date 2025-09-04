export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Business Solutions</h1>
        
        <div className="bg-white rounded-lg shadow p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">T Ali for Business</h2>
          <p className="text-gray-600 mb-6">
            Streamline your business operations with our comprehensive service platform. 
            From employee transportation to corporate catering and package delivery.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Corporate Rides</h3>
              <p className="text-sm text-gray-600">Employee transportation solutions</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Business Catering</h3>
              <p className="text-sm text-gray-600">Office meals and event catering</p>
            </div>
            <div className="text-center p-6 border rounded-lg">
              <h3 className="font-semibold mb-2">Logistics</h3>
              <p className="text-sm text-gray-600">Package and document delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}