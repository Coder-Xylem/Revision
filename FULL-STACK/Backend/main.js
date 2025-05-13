require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./DB/mongodb.js');
const cors = require('cors');
const Tweet = require('./models/tweet.models.js');

const PORT = process.env.PORT || 5000;
const app = express();

const helmet = require('helmet');
const rateLimit = require('express-rate-limit');


app.use(helmet()); // sets secure HTTP headers
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests
    standardHeaders: true,
    legacyHeaders: false,
  })
);


// Middleware
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5173/write',
  'http://localhost:5173/read',
  'https://revision-amber.vercel.app/',
  'https://revision-amber.vercel.app//write',
  'https://revision-amber.vercel.app//read',
  'http://localhost:3000',
];

// ✅ CORS middleware with dynamic origin check
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // allow cookies or sessions
  })
);

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.send('X-Tweet API is running');
});

// Static files (if needed)
app.use(express.static('pub'));

// ===== TWEET ROUTES =====

//  * @desc    Get all tweets

app.get('/api/tweets', async (req, res) => {
  try {
    const tweets = await Tweet.find()
      .sort({ createdAt: -1 }) // Sort by newest first
      .select('-likedBy -dislikedBy'); // Don't send the arrays of IPs

    res.json(tweets);
  } catch (err) {
    console.error('Error fetching tweets:', err.message);
    res.status(500).json({ message: 'Server error while fetching tweets' });
  }
});

//  * @desc    Get a single tweet by ID
app.get('/api/tweets/:id', async (req, res) => {
  try {
    const tweet = await Tweet.findById(req.params.id).select(
      '-likedBy -dislikedBy'
    );

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    res.json(tweet);
  } catch (err) {
    console.error('Error fetching tweet:', err.message);

    // Handle invalid ObjectId format
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid tweet ID format' });
    }

    res.status(500).json({ message: 'Server error while fetching tweet' });
  }
});

//  * @desc    Create a new tweet
app.post('/api/tweets', async (req, res) => {
  try {
    const { tweet, author } = req.body;

    // Validate input
    if (!tweet || !author) {
      return res.status(400).json({
        message: 'Tweet content and author are required',
      });
    }

    if (tweet.length > 280) {
      return res.status(400).json({
        message: 'Tweet cannot exceed 280 characters',
      });
    }

    // Create new tweet
    const newTweet = new Tweet({
      tweet,
      author,
    });

    // Save tweet to database
    const savedTweet = await newTweet.save();

    res.status(201).json(savedTweet);
  } catch (err) {
    console.error('Error creating tweet:', err.message);

    // Handle validation errors from Mongoose
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map((val) => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }

    res.status(500).json({ message: 'Server error while creating tweet' });
  }
});

//  * @route   POST /api/tweets/like/:id
//  * @desc    Like a tweet

app.post('/api/tweets/like/:id', async (req, res) => {
  try {
    const tweetId = req.params.id;

    // Get client IP address (for preventing multiple likes from same IP)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Optional: Check if this IP already liked (uncomment to enable)
    /*
    if (tweet.likedBy.includes(clientIp)) {
      return res.status(400).json({ message: 'You already liked this tweet' });
    }
    
    // Remove from dislikedBy if present
    if (tweet.dislikedBy.includes(clientIp)) {
      tweet.dislikedBy = tweet.dislikedBy.filter(ip => ip !== clientIp);
      if (tweet.dislike > 0) tweet.dislike -= 1;
    }
    
    // Add to likedBy
    tweet.likedBy.push(clientIp);
    */

    // Increment like count
    tweet.like += 1;

    // Save updated tweet
    await tweet.save();

    res.json({
      message: 'Tweet liked successfully',
      like: tweet.like,
      dislike: tweet.dislike,
    });
  } catch (err) {
    console.error('Error liking tweet:', err.message);

    // Handle invalid ObjectId format
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid tweet ID format' });
    }

    res.status(500).json({ message: 'Server error while liking tweet' });
  }
});

//  * @route   POST /api/tweets/dislike/:id
//  * @desc    Dislike a tweet

app.post('/api/tweets/dislike/:id', async (req, res) => {
  try {
    const tweetId = req.params.id;

    // Get client IP address (for preventing multiple dislikes from same IP)
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Find the tweet
    const tweet = await Tweet.findById(tweetId);

    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Optional: Check if this IP already disliked (uncomment to enable)

    if (tweet.dislikedBy.includes(clientIp)) {
      return res
        .status(400)
        .json({ message: 'You already disliked this tweet' });
    }

    // Remove from likedBy if present
    if (tweet.likedBy.includes(clientIp)) {
      tweet.likedBy = tweet.likedBy.filter((ip) => ip !== clientIp);
      if (tweet.like > 0) tweet.like -= 1;
    }

    // Add to dislikedBy
    tweet.dislikedBy.push(clientIp);

    // Increment dislike count
    tweet.dislike += 1;

    // Save updated tweet
    await tweet.save();

    res.json({
      message: 'Tweet disliked successfully',
      like: tweet.like,
      dislike: tweet.dislike,
    });
  } catch (err) {
    console.error('Error disliking tweet:', err.message);

    // Handle invalid ObjectId format
    if (err instanceof mongoose.Error.CastError) {
      return res.status(400).json({ message: 'Invalid tweet ID format' });
    }

    res.status(500).json({ message: 'Server error while disliking tweet' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`X-Tweet API server running on port ${PORT}`);
});
