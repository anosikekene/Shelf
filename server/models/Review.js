const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  id: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  title: { type: String, required: true },
  type: { type: String, required: true },
  rating: { type: Number, min: 1, max: 10, required: true },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  poster: { type: String },
  likes: [mongoose.Schema.Types.ObjectId],
  comments: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      username: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

reviewSchema.index({ user: 1, id: 1 }, { unique: true });
module.exports = mongoose.model("Review", reviewSchema);
