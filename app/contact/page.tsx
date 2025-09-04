export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Phone</h3>
                <p className="text-gray-600">+971 4 123 4567</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p className="text-gray-600">support@taliservices.ae</p>
              </div>
              <div>
                <h3 className="font-medium">Address</h3>
                <p className="text-gray-600">Dubai, UAE</p>
              </div>
              <div>
                <h3 className="font-medium">Hours</h3>
                <p className="text-gray-600">24/7 Customer Support</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-8">
            <h2 className="text-xl font-semibold mb-4">Send Message</h2>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full p-3 border rounded-lg" />
              <input type="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" />
              <textarea placeholder="Your Message" rows={4} className="w-full p-3 border rounded-lg"></textarea>
              <button className="w-full bg-uber-green text-white py-3 rounded-lg hover:bg-green-600">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}