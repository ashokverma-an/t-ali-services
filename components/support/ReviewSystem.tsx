'use client'

import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

export default function ReviewSystem() {
  const [reviews, setReviews] = useState<any[]>([
    { id: 1, service: 'Ride', driver: 'John D.', rating: 5, comment: 'Great service!', date: '2024-01-15' },
    { id: 2, service: 'Food', restaurant: 'Pizza Palace', rating: 4, comment: 'Good food, fast delivery', date: '2024-01-14' },
    { id: 3, service: 'Package', courier: 'Mike R.', rating: 5, comment: 'Safe and quick delivery', date: '2024-01-13' }
  ])
  const [showNewReview, setShowNewReview] = useState(false)
  const [newReview, setNewReview] = useState({ service: 'ride', rating: 5, comment: '' })

  const submitReview = () => {
    const review = {
      id: Date.now(),
      service: newReview.service,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0]
    }
    setReviews([review, ...reviews])
    setNewReview({ service: 'ride', rating: 5, comment: '' })
    setShowNewReview(false)
  }

  const renderStars = (rating: number, interactive = false, onRate: any = null) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
            onClick={() => interactive && onRate && onRate(star)}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Reviews & Ratings</h2>
        <Button onClick={() => setShowNewReview(true)}>
          <Star className="w-4 h-4 mr-2" />
          Write Review
        </Button>
      </div>

      {showNewReview && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
          <div className="space-y-4">
            <select
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
              value={newReview.service}
              onChange={(e) => setNewReview({...newReview, service: e.target.value})}
            >
              <option value="ride">Ride Service</option>
              <option value="food">Food Delivery</option>
              <option value="package">Package Delivery</option>
            </select>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
              {renderStars(newReview.rating, true, (rating: number) => setNewReview({...newReview, rating}))}
            </div>
            
            <textarea
              placeholder="Share your experience..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 text-gray-900"
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            />
            
            <div className="flex space-x-3">
              <Button onClick={submitReview}>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowNewReview(false)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="font-semibold text-gray-900 capitalize">{review.service} Service</span>
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                
                {review.driver && (
                  <p className="text-sm text-gray-600 mb-2">Driver: {review.driver}</p>
                )}
                {review.restaurant && (
                  <p className="text-sm text-gray-600 mb-2">Restaurant: {review.restaurant}</p>
                )}
                {review.courier && (
                  <p className="text-sm text-gray-600 mb-2">Courier: {review.courier}</p>
                )}
                
                <p className="text-gray-700">{review.comment}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}