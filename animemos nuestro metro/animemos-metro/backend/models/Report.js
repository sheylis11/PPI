const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker', required: true },
  workerName: { type: String, required: true },
  station: { type: String, required: true },
  reportDate: { type: String, required: true },
  problemType: { type: String, required: true },
  description: { type: String, required: true },
  urgency: { type: String, default: 'media' },
  contact: { type: String, default: '' },
  mailSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Report', reportSchema);
