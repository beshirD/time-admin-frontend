"use client";

import { useState } from "react";
import { Star } from "lucide-react";

interface Rating {
  id: number;
  customerName: string;
  rating: number;
  review: string;
  date: string;
}

// Mock data
const mockRatings: Rating[] = [
  {
    id: 1,
    customerName: "John Doe",
    rating: 5,
    review: "Excellent food and service! Highly recommended.",
    date: "15-Jan-2026",
  },
  {
    id: 2,
    customerName: "Jane Smith",
    rating: 4,
    review: "Good food, but delivery was a bit slow.",
    date: "12-Jan-2026",
  },
  {
    id: 3,
    customerName: "Mike Johnson",
    rating: 5,
    review: "Best pizza in town! Will order again.",
    date: "10-Jan-2026",
  },
];

export function RatingsTable() {
  const [ratings] = useState<Rating[]>(mockRatings);

  const averageRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
        ).toFixed(1)
      : "0.0";

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Ratings & Reviews
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Average Rating: {averageRating} ⭐ ({ratings.length} reviews)
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {ratings.map((rating) => (
          <div
            key={rating.id}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-gray-800 dark:text-white">
                  {rating.customerName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {rating.date}
                </p>
              </div>
              {renderStars(rating.rating)}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {rating.review}
            </p>
          </div>
        ))}
      </div>

      {ratings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No ratings yet</p>
        </div>
      )}
    </div>
  );
}
