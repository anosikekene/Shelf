const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
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
