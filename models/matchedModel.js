const mongoose = require('mongoose');

const matchedModel = new mongoose.Schema({
  lostItem : {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'LostItem' 
  },
  foundItem : [{
    type : mongoose.Schema.Types.ObjectId,
    ref: 'FoundItem'
  }]
});

module.exports = mongoose.model('Matched', matchedModel);