const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
  const { name, email, password, location, displayPicture } = req.body;
  try {
    const user = new User({ name, email, password, location, displayPicture });
    await user.save();


    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: 'User registration failed' });
  }
});

// Sign In Route
router.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    console.log(user);

    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: 'User authentication failed' });
  }
});

module.exports = router;
