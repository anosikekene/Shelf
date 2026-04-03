const User = require("../models/User");
const Review = require("../models/Review");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//http://localhost:3000/api/users/register
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
      .json({ message: "Login successful", token, username: user.username });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found1" });
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
exports.getUserInfo = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username })
      .populate("followers", "username _id")
      .populate("following", "username _id");

    if (!user) return res.status(404).json({ error: "User not found" });

    const reviews = await Review.find({ user: user._id }).sort({
      createdAt: -1,
    });

    res.json({
      _id: user._id,
      username: user.username,
      reviews,
      followers: user.followers,
      following: user.following,
      watchlist: user.watchlist,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

//http://localhost:3000/api/users/keneanosike/review
exports.createReview = async (req, res) => {
  try {
    const { id, rating, comment, title, type, poster } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ error: "User not found3" });

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
      poster,
    });
    await review.save();
    user.reviews.push(review._id);
    await user.save();

    res.status(201).json({
      message: "Review added successfully",
      review: {
        username: user.username,
        id,
        title,
        rating,
        comment,
        poster,
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
  const mediaId = isNaN(req.params.mediaId)
    ? req.params.mediaId
    : Number(req.params.mediaId);

  try {
    const review = await Review.findOneAndDelete({
      user: req.user._id,
      id: mediaId,
    });

    if (!review) return res.status(404).json({ error: "Review not found" });

    res.json({ message: "Review deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.followUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetId } = req.body;
    if (userId.toString() === targetId) {
      return res.status(400).json({ error: "You can't follow yourself" });
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, { $addToSet: { following: targetId } }),
      User.findByIdAndUpdate(targetId, { $addToSet: { followers: userId } }),
    ]);

    const targetUser = await User.findById(targetId);

    res
      .status(200)
      .json({ message: `You are now following ${targetUser.username}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const { targetId } = req.body;

    if (userId.toString() === targetId) {
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    }

    await Promise.all([
      User.findByIdAndUpdate(userId, { $pull: { following: targetId } }),
      User.findByIdAndUpdate(targetId, { $pull: { followers: userId } }),
    ]);

    const targetUser = await User.findById(targetId);

    res.status(200).json({
      message: `You have unfollowed ${targetUser.username}`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getFeed = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found4" });

    const feedReviews = await Review.find({ user: { $in: user.following } })
      .sort({ createdAt: -1 })
      .limit(50)
      .populate("user", "username");

    res.status(200).json({ feed: feedReviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    const userId = req.user._id;

    if (!review.likes.includes(userId)) {
      review.likes.push(userId);
    } else {
      review.likes = review.likes.filter((id) => !id.equals(userId));
    }
    await review.save();
    res.json({ likes: review.likes.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "ToggleLike error" });
  }
};

exports.addComment = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const newComment = {
      userId: req.user._id,
      username: req.user.username,
      text: req.body.text,
    };

    review.comments.push(newComment);
    const savedReview = await review.save();

    const addedComment = savedReview.comments[savedReview.comments.length - 1];

    res.json(addedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding comment" });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id, commentId } = req.params;

    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.comments = review.comments.filter(
      (c) => c._id.toString() !== commentId,
    );

    await review.save();

    res.json({ message: "Comment deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting comment" });
  }
};

exports.getWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.addToWatchlist = async (req, res) => {
  try {
    const { mediaId, title, type, poster } = req.body;
    console.log(req.user);
    const user = await User.findById(req.user._id);
    if (!user.watchlist.some((item) => item.mediaId === mediaId)) {
      user.watchlist.push({ mediaId, title, type, poster });
      await user.save();
    }
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteWatchlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.watchlist = user.watchlist.filter(
      (item) => item.mediaId !== req.params.mediaId,
    );
    await user.save();
    res.json(user.watchlist);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
