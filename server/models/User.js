const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    mediaId: { type: Number, required: true }, // TMDB id
    rating: { type: Number, min: 1, max: 10, required: true },
    review: { type: String },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    favorites: [{ type: Number }], // array of TMDB ids
    ratings: [ratingSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
