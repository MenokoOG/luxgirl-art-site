const mongoose = require('mongoose');

const LikeSchema = new mongoose.Schema({
  imageId: { type: String, required: true },
  ipAddress: { type: String, required: true },
}, { timestamps: true });

LikeSchema.index({ imageId: 1, ipAddress: 1 }, { unique: true });

const Like = mongoose.model('Like', LikeSchema);

module.exports = Like;
