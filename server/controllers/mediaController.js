const tmdb = require("../utils/tmdbClient");
const rawg = require("../utils/rawgClient");
const books = require("../utils/googleBooksClient");
//const Media = require("../models/Media");
const Review = require("../models/Review");

exports.getAllMedia = async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Server error2" });
  }
};

//http://localhost:3000/media/search?title=
exports.searchMedia = async (req, res) => {
  const { title } = req.query;
  console.log(req.baseUrl, title);
  if (!title) return res.status(400).json({ error: "Title is required" });

  try {
    let results;
    switch (req.baseUrl) {
      case "/media":
        results = await tmdb.search(title);
        break;
      case "/games":
        results = await rawg.search(title);
        break;
      case "/books":
        results = await books.search(title);
        break;
    }
    console.log(results);
    const simplified = results.slice(0, 5).map((item) => ({
      id: item.id,
      title: item.title || item.name || item.volumeInfo?.title,
      type:
        req.baseUrl === "/games"
          ? "game"
          : item.media_type || item.volumeInfo?.printType?.toLowerCase(),
      releaseDate:
        item.release_date ||
        item.first_air_date ||
        item.released ||
        item.volumeInfo?.publishedDate,
      averageRating:
        item.vote_average ||
        item.rating ||
        item.volumeInfo?.averageRating ||
        null,
      poster: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : item.background_image || item.volumeInfo?.imageLinks?.smallThumbnail,
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
