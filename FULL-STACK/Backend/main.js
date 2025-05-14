require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./DB/mongodb.js');
const cors = require('cors');
const Tweet = require('./models/tweet.models.js');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5173/write',
  'http://localhost:5173/read',
  'https://revision-amber.vercel.app',
  'https://revision-amber.vercel.app/write',
  'https://revision-amber.vercel.app/read',
  'http://localhost:3000',
  'https://revision-fewa.onrender.com',
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
  } else {
    console.log(`CORS blocked origin: ${origin}`);
    return res.status(403).json({ message: 'Origin not allowed by CORS policy' });
  }

  next();
});

connectDB();

app.get('/', (req, res) => {
  res.send('X-Tweet API is running');
});

app.use(express.static('pub'));

app.get('/api/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 })
      .select('-likedBy -dislikedBy');

    res.json(tweets);
  } catch (err) {
    console.error('Error fetching tweets:', err.message);
    res.status(500).json({ message: 'Server error while fetching tweets' });
  }
});

app.get('/api/tweets/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).select('-likedBy -dislikedBy');

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (err) {
    console.error('Error fetching tweet:', err.message);

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid tweet ID format' });
    }

    res.status(500).json({ message: 'Server error while fetching tweet' });
  }
});

app.post('/api/tweets', async (req, res) => {
  try {
    const { tweet, author } = req.body;

    if (!tweet || !author) {
      return res.status(400).json({ message: 'Tweet content and author are required' });
    }

    if (tweet.length > 280) {
      return res.status(400).json({ message: 'Tweet cannot exceed 280 characters' });
    }

    const newTweet = new Tweet({ tweet, author });
    const savedTweet = await newTweet.save();

    res.status(201).json(savedTweet);
  } catch (err) {
    console.error('Error creating tweet:', err.message);

    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error while creating tweet' });
  }
});

app.post('/api/tweets/like/:id', async (req, res) => {
  try {
    const tweetId = req.params.id;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    tweet.like += 1;
    await tweet.save();

    res.json({
      message: 'Tweet liked successfully',
      like: tweet.like,
      dislike: tweet.dislike,
    });
  } catch (err) {
    console.error('Error liking tweet:', err.message);

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid tweet ID format' });
    }

    res.status(500).json({ message: 'Server error while liking tweet' });
  }
});

app.post('/api/tweets/dislike/:id', async (req, res) => {
  try {
    const tweetId = req.params.id;
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    if (tweet.dislikedBy.includes(clientIp)) {
      return res.status(400).json({ message: 'You already disliked this tweet' });
    }

    if (tweet.likedBy.includes(clientIp)) {
      tweet.likedBy = tweet.likedBy.filter((ip) => ip !== clientIp);
      if (tweet.like > 0) tweet.like -= 1;
    }

    tweet.dislikedBy.push(clientIp);
    tweet.dislike += 1;
    await tweet.save();

    res.json({
      message: 'Tweet disliked successfully',
      like: tweet.like,
      dislike: tweet.dislike,
    });
  } catch (err) {
    console.error('Error disliking tweet:', err.message);

    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid tweet ID format' });
    }

    res.status(500).json({ message: 'Server error while disliking tweet' });
  }
});

app.listen(PORT, () => {
  console.log(`X-Tweet API server running on port ${PORT}`);
});
