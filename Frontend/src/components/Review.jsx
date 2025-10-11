import { useState } from "react";
import { addReview } from "../api/review";

function ReviewPage({ user, reviews, setReviews, token }) {
  // const [text, setText] = useState("");
  // const [loading, setLoading] = useState(false);

  const sampleReviews = [
    { _id: "1", userName: "Alice Johnson", text: "Amazing ID card generator! Really easy to use and the templates look professional.", createdAt: "2025-10-12T02:00:00Z" },
    { _id: "2", userName: "Bob Smith", text: "Loved the feature to fetch college logos automatically. Very convenient!", createdAt: "2025-10-12T02:10:00Z" },
    { _id: "3", userName: "Clara Lee", text: "The UI is clean and responsive. Makes creating ID cards enjoyable.", createdAt: "2025-10-12T02:20:00Z" },
    { _id: "4", userName: "David Kim", text: "Great platform! I could generate multiple ID cards in minutes.", createdAt: "2025-10-12T02:30:00Z" },
    { _id: "5", userName: "Emma Davis", text: "Helpful features and smooth experience. Highly recommend it to students and staff!", createdAt: "2025-10-12T02:40:00Z" }
  ];

  // // Handle adding a review
  // const handleAddReview = async (e) => {
  //   e.preventDefault();
  //   if (!text.trim()) return;
  //   setLoading(true);
  //   try {
  //     const newReview = await addReview(text, token);
  //     setReviews([newReview, ...reviews]);
  //     setText("");
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const displayReviews = reviews?.length ? reviews : sampleReviews;

  return (
    <div className="w-full mx-auto  px-6 sm:px-10 md:px-20 py-16">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">User Reviews</h1>

      {/* Review Form */}
      {/*
        user && 
        <form onSubmit={handleAddReview} className="mb-8 flex flex-col gap-4">
        <textarea
          className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          rows={4}
          placeholder="Write your review..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="self-end bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md transition"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
      // */}

      {/* Reviews List - Horizontal Scroll */}
      <div className="flex overflow-x-auto gap-4 py-2" style={{ overflowX: "auto", scrollbarWidth: "none" }}>
        {displayReviews.map((review) => (
          <div
            key={review._id}
            className="flex-shrink-0 w-80 bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-100"
          >
            <p className="text-gray-800">{review.text}</p>
            <p className="text-gray-400 text-sm mt-2">
              — {review.userName || "Anonymous"}, {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewPage;
