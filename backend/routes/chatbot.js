const express = require('express');
const axios = require('axios');
const router = express.Router();
const Interaction = require('../models/Interactions');
const NodeGeocoder = require('node-geocoder');

// Define basic responses
const responses = {
  greeting: "Hello! How can I help you today?",
  farewell: "Goodbye! Have a great day!",
  basic: {
    "how are you": "I'm a chatbot, so I don't have feelings, but thank you for asking!",
    "what's your name": "I'm your friendly chatbot, BurnerAce.",
    "what can you do": "I can chat with you and answer your questions!",
  },
  error: "I'm sorry, I didn't understand that. Can you please rephrase?",
};

const jokes = [
  "Why did the scarecrow win an award? Because he was outstanding in his field!",
  "Why don't scientists trust atoms? Because they make up everything!",
  "Why did the bicycle fall over? Because it was two-tired!",
  "What do you call fake spaghetti? An impasta!",
  "Why don't some couples go to the gym? Because some relationships don't work out!"
];

const thankYouResponses = [
  "It's my pleasure. If you have any other questions, feel free to ask them.",
  "No problem. If you have any other questions, feel free to ask them.",
  "You're welcome. If you have any other questions, feel free to ask them.",
  "It's my duty. If you have any other questions, feel free to ask them."
];

const options = {
  provider: 'openstreetmap',
  fetch: (url) => fetch(url)
};


const geocoder = NodeGeocoder(options);

// Utility function to fetch weather data
async function fetchWeather(city) {
  try {
    const apiKey = '789443fdd5bbc8e9269af90022b27d52';
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const temperature = response.data.main.temp;
    let weatherMessage = `The current temperature in ${city} is ${temperature}°C.`;

    if (temperature > 30) {
      weatherMessage += " It's quite warm outside, but I hope you're feeling nice!";
    } else if (temperature > 20) {
      weatherMessage += " It's a pleasant day. Enjoy!";
    } else if (temperature > 10) {
      weatherMessage += " It's a bit chilly, so stay warm!";
    } else {
      weatherMessage += " It's really cold, so make sure to bundle up!";
    }

    return weatherMessage;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return "I'm unable to fetch the weather information at the moment.";
  }
}

// Utility function to fetch current time
async function fetchCurrentTime(city) {
  try {
    console.log(city);
    const geoResponse = await geocoder.geocode(city);
        const { latitude, longitude } = geoResponse[0];
    const response = await axios.get(`https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`);
    const dateTime = response.data.dateTime;
    console.log(response);
    return `The current time in ${city} is ${new Date(dateTime).toLocaleTimeString()}.`;
  } catch (error) {
    console.error('Error fetching time data:', error);
    return "I'm unable to fetch the time information at the moment.";
  }
}

// Chatbot endpoint
router.post('/chat', async (req, res) => {
  const { userId, loc, message } = req.body;
  console.log(req.body);
  // Fetch or create interaction
  let interaction = await Interaction.findOne({ userId });
  // console.log(interaction);
  if (!interaction) {
    interaction = new Interaction({ userId, messages: [] });
  }

  // Save user message
  interaction.messages.push(message);
  await interaction.save();

  // Generate response
  let response = responses.error;
  const lowerCaseMessage = message.toLowerCase();

  if (lowerCaseMessage.includes('hello')) {
    response = responses.greeting;
  } else if (lowerCaseMessage.includes('bye')) {
    response = responses.farewell;
  } else if (lowerCaseMessage.includes('thank')) {
    response = thankYouResponses[Math.floor(Math.random() * thankYouResponses.length)];
  } else if (lowerCaseMessage.includes('joke')) {
    response = jokes[Math.floor(Math.random() * jokes.length)];
  } else {
    // Keyword-based responses
    if (lowerCaseMessage.includes('time')) {
      response = await fetchCurrentTime(loc);
    } else if (lowerCaseMessage.includes('weather')) {
      response = await fetchWeather(loc);
    } else {
      Object.keys(responses.basic).forEach(key => {
        if (lowerCaseMessage.includes(key)) {
          response = responses.basic[key];
        }
      });
    }
  }

  // Send response
  res.json({ response });
});

module.exports = router;
