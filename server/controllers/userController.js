const User = require("../models/User");

// Test controller
exports.test = (req, res) => {
  res.send("User controller is working");
};

// Create a new user
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

    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Signup (same logic as createUser for now)
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: "Signup successful", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Login placeholder
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add favorite media (placeholder)
exports.addFavorite = async (req, res) => {
  res.json({ message: "Favorite added (placeholder)" });
};

// Add rating (placeholder)
exports.addRating = async (req, res) => {
  res.json({ message: "Rating added (placeholder)" });
};

// Get user profile (placeholder)
exports.getProfile = async (req, res) => {
  res.json({ message: "User profile endpoint working (placeholder)" });
};
