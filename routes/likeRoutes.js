const express = require('express');
const router = express.Router();
const Like = require('../models/Like');

// Middleware to get client's IP address
router.use((req, res, next) => {
  req.ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  next();
});

// Route to like an image
router.post('/like', async (req, res) => {
  try {
    const { imageId } = req.body;
    const ipAddress = req.ipAddress;

    const existingLike = await Like.findOne({ imageId, ipAddress });
    if (existingLike) {
      return res.status(400).json({ message: 'You have already liked this image.' });
    }

    const like = new Like({ imageId, ipAddress });
    await like.save();

    res.status(201).json({ message: 'Image liked successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get like status
router.get('/like-status/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const ipAddress = req.ipAddress;

    const like = await Like.findOne({ imageId, ipAddress });
    const liked = !!like;

    res.status(200).json({ liked });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route to get like count
router.get('/like-count/:imageId', async (req, res) => {
  try {
    const { imageId } = req.params;
    const count = await Like.countDocuments({ imageId });

    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
