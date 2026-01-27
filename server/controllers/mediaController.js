const tmdb = require("../utils/tmdbClient");

const Media = require("../models/Media");

exports.createMedia = async (req, res) => {
  try {
    const { title, type, genre, releaseDate, rating, comment } = req.body;

    if (!title || !type || !rating || !comment) {
      return res
        .status(400)
        .json({ error: "Title, type, rating, and comment are required" });
    }

    const newMedia = new Media({
      title,
      type,
      genre,
      releaseDate,
      reviews: [],
      averageRating: rating,
    });

    await newMedia.save();

    newMedia.reviews.push({
      user: req.userId,
      rating,
      comment,
    });
    await newMedia.save();

    const user = await User.findById(req.userId);
    user.reviews.push({
      media: newMedia._id,
      rating,
      comment,
    });
    await user.save();

    res.status(201).json(newMedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Server error2" });
  }
};

exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) {
      return res.status(404).json({ error: "Media not found" });
    }
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Server error3" });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    const mediaReview = media.reviews.find(
      (rev) => rev.user.toString() === req.userId,
    );
    if (!mediaReview)
      return res.status(400).json({ error: "Review not found" });

    mediaReview.rating = rating;
    mediaReview.comment = comment;
    media.averageRating =
      media.reviews.reduce((sum, rev) => sum + rev.rating, 0) /
      media.reviews.length;
    await media.save();

    const user = await User.findById(req.userId);
    const userReview = user.reviews.find(
      (rev) => rev.media.toString() === media._id.toString(),
    );
    if (userReview) {
      userReview.rating = rating;
      userReview.comment = comment;
    }
    await user.save();

    res.status(200).json({ media, userReview });
  } catch (error) {
    console.error(error);
    if (error.kind === "ObjectId")
      return res.status(400).json({ error: "Invalid media ID" });
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Media deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error5" });
  }
};

exports.searchMedia = async (req, res) => {
  const { title } = req.query;

  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    const results = await tmdb.search(title);

    const simplified = results.slice(0, 5).map((item) => ({
      id: item.id,
      title: item.title || item.name,
      type: item.media_type,
      releaseDate: item.release_date || item.first_air_date,
      overview: item.overview,
      averageRating: item.vote_average,
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null,
    }));

    res.json(simplified);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch media" });
  }
};

exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMediaById = async (req, res) => {
  try {
    const media = await Media.findById(req.params.id).populate(
      "reviews.user",
      "username",
    );
    if (!media) return res.status(404).json({ error: "Media not found" });
    res.json(media);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
