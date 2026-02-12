const User = require("../models/User");
const Review = require("../models/Review");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//http://localhost:3000/api/users/signup
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingEmail = await User.findOne({ email });
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    if (existingEmail) {
      return res.status(400).json({ error: "Email already taken" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//http://localhost:3000/api/users/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, username: user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      username: user.username,
      reviews: user.reviews,
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

//http://localhost:3000/api/users/keneanosike/reviews
exports.getUserReviews = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const reviews = await Review.find({ user: user._id }).sort({
      createdAt: -1,
    });

    res.json({
      username: user.username,
      reviews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//http://localhost:3000/api/users/keneanosike/review
exports.createReview = async (req, res) => {
  try {
    const { id, rating, comment, title, type } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!id || rating == null || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let review = await Review.findOne({ user: req.user._id, id });
    if (review) {
      review.rating = rating;
      review.comment = comment;
      await review.save();

      return res
        .status(200)
        .json({ message: "Review updated successfully", review });
    }
    review = new Review({
      user: user._id,
      id,
      title,
      type,
      rating,
      comment,
    });
    await review.save();

    res.status(201).json({
      message: "Review added successfully",
      review: {
        username: user.username,
        id,
        title,
        rating,
        comment,
      },
    });
  } catch (error) {
    console.error(error);
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ error: "You have already reviewed this media" });
    }
    res.status(500).json({ error: error.errorResponse.errmsg });
  }
};

exports.addFavorite = async (req, res) => {
  res.json({ message: "Favorite added (placeholder)" });
};

//http://localhost:3000/api/users/keneanosike/review/80020
exports.deleteReview = async (req, res) => {
  try {
    const { mediaId } = req.params;
    console.log(req.userId);
    const review = await Review.findOneAndDelete({
      user: req.userId,
      id: mediaId,
    });

    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};
