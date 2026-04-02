const axios = require("axios");

const RAWG_API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api/games?";
exports.search = async (query) => {
  const response = await axios.get(
    `${BASE_URL + RAWG_API_KEY}&search=${query}`,
  );

  return response.data.results;
};
