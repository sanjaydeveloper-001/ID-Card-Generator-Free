import express from "express";
import Review from "../Models/Review.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// GET all reviews
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
  }
});

router.post("/", verifyToken, async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ message: "Review text is required" });
  }

  try {
    const review = new Review({
      userId: req.user.id,
      userName: req.user.name || "Anonymous",
      text,
    });

    await review.save();
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit review", error: err.message });
  }
});

export default router;
