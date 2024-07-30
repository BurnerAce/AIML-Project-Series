const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const corsOptions = {
  origin: 'https://chatbot-by-burnerace.vercel.app',
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

mongoose.connect('mongodb+srv://hanzalasharique04:%2310022004%23@cluster0.drtmsvv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// Import routes
const chatbotRoutes = require('./routes/chatbot');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api', chatbotRoutes);
app.use('/api', authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
