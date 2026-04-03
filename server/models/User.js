const mongoose = require("mongoose");

const watchlistItemSchema = new mongoose.Schema({
  mediaId: String,
  title: String,
  type: String,
  poster: String,
  addedAt: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: String,
  password: String,
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  watchlist: [watchlistItemSchema],
});

module.exports = mongoose.model("User", userSchema);
