const mongoose = require('mongoose');

const RefreshTokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'newAuth',
    required: true,
    index: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expireAfterSeconds: 0 } // Auto-delete expired tokens
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { versionKey: false });

// Index for faster queries
RefreshTokenSchema.index({ userId: 1, token: 1 });

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);

