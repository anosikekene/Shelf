const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ["movie", "tv", "game"], required: true },
  genre: [String],
  releaseDate: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  ratings: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      score: { type: Number, min: 1, max: 10 },
    },
  ],
  reviews: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model("Media", mediaSchema);
