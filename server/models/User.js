const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: String,
  password: String,
  reviews: [
    {
      title: String,
      id: String,
      rating: { type: Number, min: 1, max: 5 },
      comment: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
