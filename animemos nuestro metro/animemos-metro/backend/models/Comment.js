const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  authorName: { type: String, default: 'Anónimo' }
}, { timestamps: true });

module.exports = mongoose.model('Comment', commentSchema);
