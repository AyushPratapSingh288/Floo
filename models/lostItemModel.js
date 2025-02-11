const mongoose = require('mongoose');

const LostItemSchema = new mongoose.Schema({
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  imageUrl: { type: String }, 
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('LostItem', LostItemSchema);
