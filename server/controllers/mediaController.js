const tmdb = require("../utils/tmdbClient");

const Media = require("../models/Media");

exports.createMedia = async (req, res) => {
  try {
    const { title, type, genre, releaseDate } = req.body;

    if (!title || !type) {
      return res.status(400).json({ error: "Title and type are required" });
    }

    const newMedia = new Media({
      title,
      type,
      genre,
      releaseDate,
      createdBy: req.userId,
    });

    await newMedia.save();
    console.log(req.userId);
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
    res.status(500).json({ error: "Server error" });
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
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateMedia = async (req, res) => {
  try {
    const updated = await Media.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteMedia = async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: "Media deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
