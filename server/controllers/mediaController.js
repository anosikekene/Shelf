const tmdb = require("../utils/tmdbClient");

const Media = require("../models/Media");

exports.createMedia = async (req, res) => {
  try {
    const { title, type, genre, releaseDate, poster, review, rating } =
      req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    const newMedia = new Media({
      title,
      type,
      genre,
      releaseDate,
      poster,
      createdBy: req.userId,
    });

    if (review && rating) {
      newMedia.reviews.push({
        user: req.userId,
        rating,
        comment: review,
      });
      newMedia.averageRating = rating;
    }

    await newMedia.save();

    res.status(201).json(newMedia);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error1" });
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

exports.updateMedia = async (req, res) => {
  try {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error4" });
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
