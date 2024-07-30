const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const router = express.Router();

// Sign-in route
router.post('/signin', async (req, res) => {
    const { name, password, location, dp } = req.body;
    const existingUser = await User.findOne({ name });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const user = new User({ name, password, location, profilePicture: dp });
    await user.save();
    res.json({ success: true, user });
});

// Login route
router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    if (!user) {
        return res.status(400).json({ message: 'Incorrect name or password' });
    }
    res.json({ success: true, user });
});


module.exports = router;
