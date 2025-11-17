const tmdb = require("../utils/tmdbClient");

exports.search = async (req, res, next) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Query missing" });
    const results = await tmdb.search(q);
    res.json(results);
  } catch (err) {
    next(err);
  }
};

exports.getDetails = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const data = await tmdb.getDetails(type, id);
    res.json(data);
  } catch (err) {
    next(err);
  }
};
