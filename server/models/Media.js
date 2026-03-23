const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  mediaId: String,
  title: { type: String, required: true },
  type: { type: String, required: true },
  genre: String,
  releaseDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  poster: { type: String },
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
    },
    Number,
  ],
  averageRating: { type: Number, default: 0 },
});

module.exports = mongoose.model("Media", mediaSchema);
