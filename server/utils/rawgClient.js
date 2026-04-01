const axios = require("axios");

const RAWG_API_KEY = "key=b4bcf58f61d84bce8886882c499acdf2";
const BASE_URL = "https://api.rawg.io/api/games?";
//https://api.rawg.io/api/games?key=b4bcf58f61d84bce8886882c499acdf2&search=sonic
exports.search = async (query) => {
  const response = await axios.get(
    `${BASE_URL + RAWG_API_KEY}&search=${query}`,
  );

  return response.data.results;
};
