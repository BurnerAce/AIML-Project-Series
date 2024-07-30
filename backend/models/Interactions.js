const mongoose = require('mongoose');

const InteractionSchema = new mongoose.Schema({
  userId: String,
  messages: [String],
});

module.exports = mongoose.model('Interaction', InteractionSchema);
