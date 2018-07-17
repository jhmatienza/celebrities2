const mongoose = require('mongoose');

module.exports = mongoose.model('Comment', new mongoose.Schema({
  title: {
    type: String,
    required: 'Title is required'
  },
  text: {
    type: String,
    required: 'Comment is required'
  },
  celebrity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Celebrity',
    required: true
  }
}, { timestamps: true }));
