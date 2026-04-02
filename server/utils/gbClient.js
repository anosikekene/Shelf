const axios = require("axios");

const GB_API_KEY = process.env.GB_API_KEY;
const BASE_URL = "https://api.gamebrain.co/v1/games";
console.log("API KEY:", GB_API_KEY);
exports.search = async (query) => {
  const response = await axios.get(BASE_URL, {
    params: {
      query: query,
      "api-key": GB_API_KEY,
    },
  });

  return response.data.results;
};
