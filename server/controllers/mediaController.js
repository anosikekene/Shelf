const tmdb = require("../utils/tmdbClient");

const Media = require("../models/Media");
const Review = require("../models/Review");

exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Server error2" });
  }
};

exports.searchMedia = async (req, res) => {
  const { title } = req.query;
  console.log(title);
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

exports.getMediaReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ mediaId: req.params.mediaId }).populate(
      "userId",
      "username",
    );
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// exports.getMediaById = async (req, res) => {
//   try {
//     const media = await Media.findById(req.params.id).populate(
//       "reviews.user",
//       "username",
//     );
//     if (!media) return res.status(404).json({ error: "Media not found" });
//     res.json(media);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
