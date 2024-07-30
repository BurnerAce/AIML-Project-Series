const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  profilePicture: { type: String, default: 'dp1.jpg' }, // Add profilePicture field
});

module.exports = mongoose.model('User', userSchema);
