const mongoose = require('mongoose');
const { Schema } = mongoose;

const tweetSchema = new Schema(
  {
    // Content of the tweet
    tweet: {
      type: String,
      required: [true, 'Tweet content is required'],
      trim: true,
      minlength: [1, 'Tweet cannot be empty'],
      maxlength: [280, 'Tweet cannot exceed 280 characters'],
    },

    // Author of the tweet
    author: {
      type: String,
      required: [true, 'Author name is required'],
      trim: true,
      minlength: [1, 'Author name cannot be empty'],
      maxlength: [50, 'Author name cannot exceed 50 characters'],
    },

    // Number of likes for the tweet
    like: {
      type: Number,
      default: 0,
      min: [0, 'Likes cannot be negative'],
    },

    // Number of dislikes for the tweet
    dislike: {
      type: Number,
      default: 0,
      min: [0, 'Dislikes cannot be negative'],
    },

    // Flag to indicate if tweet has been edited
    isEdited: {
      type: Boolean,
      default: false,
    },

    // For optional feature to track the IP addresses that have liked/disliked
    // to prevent multiple reactions from the same user
    likedBy: {
      type: [String],
      default: [],
    },

    dislikedBy: {
      type: [String],
      default: [],
    },
  },
  {
    // Automatically add createdAt and updatedAt fields
    timestamps: true,

    // Configure JSON serialization
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        // Don't expose the likedBy/dislikedBy arrays publicly
        delete ret.likedBy;
        delete ret.dislikedBy;
        return ret;
      },
    },
  }
);

// Virtual field to calculate the tweet score (likes minus dislikes)
tweetSchema.virtual('score').get(function () {
  return this.like - this.dislike;
});

// Index for efficient retrieval and sorting
tweetSchema.index({ createdAt: -1 }); // Index for sorting by newest
tweetSchema.index({ author: 1 }); // Index for potential future author filtering

module.exports = mongoose.model('Tweet', tweetSchema);
