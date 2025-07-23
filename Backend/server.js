require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')

const axios = require("axios");
const router = express.Router();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json({limit: "20mb"}));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(bodyParser.json());


app.post("/verifyemail", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const response = await fetch(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.EMAIL_VALID_API_KEY}&email=${email}`
    );
    const data = await response.json();

    if (data.is_valid_format?.value && data.is_smtp_valid?.value) {
      return res.json({ success: true, message: "Valid email", data });
    } else {
      return res.json({ success: false, message: "Invalid email", data });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("monog Connected !"))
.catch(err => console.log( err ));

app.use("/api/user", userRoutes);


app.post('/search-college', async (req, res) => {
  const { collegeName } = req.body;
  const query = `${collegeName} logo`;
  const url = `${process.env.SERP_LINK}/search.json?q=${encodeURIComponent(query)}&tbm=isch&api_key=${process.env.SERP_API_KEY}`;

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

app.get('/proxy-image', async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const contentType = response.headers.get('content-type');
    const buffer = await response.buffer();

    res.set('Content-Type', contentType);
    res.set('Access-Control-Allow-Origin', '*');
    res.send(buffer);
  } catch (error) {
    console.error('Error proxying image:', error);
    res.status(500).json({ error: 'Failed to proxy image' });
  }
});

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


