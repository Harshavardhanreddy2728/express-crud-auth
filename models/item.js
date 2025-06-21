const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the user model
    required: true,
  },
});

module.exports = mongoose.model('Item', itemSchema);
