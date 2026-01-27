const User = require("../models/User");
const Media = require("../models/Media");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.test = (req, res) => {
  res.send("User controller is working");
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.addFavorite = async (req, res) => {
  res.json({ message: "Favorite added (placeholder)" });
};

exports.addRating = async (req, res) => {
  res.json({ message: "Rating added (placeholder)" });
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      favorites: user.favorites || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "reviews.media",
      select: "title type genre releaseDate",
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getUserReviews = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user.reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { id, rating, comment, title } = req.body;
    console.log(id, rating, comment);
    if (!id || rating == null) {
      return res.status(400).json({ error: "Media and rating are required" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    // Add review to user
    user.reviews.push({ id, title, rating, comment });
    await user.save();

    res.status(201).json({
      message: "Review added",
      review: { id, title, rating, comment },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { mediaId } = req.params;
    const { rating, comment } = req.body;

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const review = user.reviews.find((r) => r.id == mediaId);
    console.log(mediaId);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await user.save();

    res.json({
      message: "Review updated",
      review,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const { mediaId } = req.params;

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const originalLength = user.reviews.length;

    user.reviews = user.reviews.filter(
      (r) => String(r.mediaId) !== String(mediaId),
    );
    user.reviews.map((l) => {
      console.log(l.mediaId);
    });
    if (user.reviews.length === originalLength) {
      return res.status(404).json({ error: "Review not found" });
    }

    await user.save();

    res.json({ message: "Review deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
