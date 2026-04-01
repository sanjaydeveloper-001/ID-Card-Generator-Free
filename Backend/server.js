require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/user", userRoutes);

// Email validation using Abstract API
app.post("/verifyemail", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  try {
    const url = `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VALID_API_KEY}&email=${email}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.is_valid_format?.value && data.is_smtp_valid?.value) {
      res.json({ success: true, message: "Valid email", data });
    } else {
      res.json({ success: false, message: "Invalid email", data });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Search college logo using SerpAPI
app.post('/search-college', async (req, res) => {
  const { collegeName } = req.body;
  if (!collegeName) return res.status(400).json({ error: "College name required" });

  const query = `${collegeName} logo`;
  const url = `https://serpapi.com/search.json?q=${encodeURIComponent(query)}&tbm=isch&api_key=${process.env.SERP_API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const logoUrl = data.images_results?.[0]?.thumbnail;

    if (logoUrl) {
      res.json({ logo: logoUrl });
    } else {
      res.status(404).json({ error: 'Logo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching logo' });
  }
});

// Proxy image endpoint
app.get('/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) return res.status(400).json({ error: 'Image URL is required' });

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) return res.status(404).json({ error: 'Image not found' });

    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();
    res.set('Content-Type', contentType);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to proxy image' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
