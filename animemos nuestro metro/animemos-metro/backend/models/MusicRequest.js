const mongoose = require('mongoose');

const musicRequestSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  message: { type: String, default: '' },
  userName: { type: String, default: 'Anónimo' },
  hearts: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('MusicRequest', musicRequestSchema);
