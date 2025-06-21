const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON body

// Routes
app.use('/api/items', require('./routes/items'));
app.use('/api/auth', require('./routes/auth')); // Include this if you’ve created auth.js

// Optional test route
app.get('/', (req, res) => {
  res.send('✅ API is running...');
});

// ✅ Connect to MongoDB and start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(process.env.PORT || 5000, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
  });
