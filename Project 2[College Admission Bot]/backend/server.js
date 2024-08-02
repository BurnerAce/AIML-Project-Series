const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
require('dotenv').config(); // To load your API keys from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/admisser", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.error('MongoDB connection error:', error));

app.use('/api/auth', authRoutes);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
