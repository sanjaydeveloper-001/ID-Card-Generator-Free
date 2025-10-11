const API_REVIEW = `${import.meta.env.VITE_BACKEND_LINK}/api/review`;

// Fetch all reviews
export const fetchReviews = async () => {
  const res = await fetch(API_REVIEW);
  if (!res.ok) throw new Error("Failed to fetch reviews");
  return res.json();
};

// Add a new review (requires auth token)
export const addReview = async (text, token) => {
  const res = await fetch(API_REVIEW, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Failed to add review: ${errText}`);
  }

  return res.json();
};
