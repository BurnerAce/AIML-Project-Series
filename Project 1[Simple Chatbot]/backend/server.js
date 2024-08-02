const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ["POST" , "GET"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

// Import routes
const chatbotRoutes = require('./routes/chatbot');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api', chatbotRoutes);
app.use('/api', authRoutes);
app.get('/', (req, res) => {
  res.send('Hello World! index.js');
});
app.get('/api', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
