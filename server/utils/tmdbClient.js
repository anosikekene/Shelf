const axios = require("axios");

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

exports.search = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/multi`, {
    params: {
      api_key: TMDB_API_KEY,
      query,
      include_adult: false,
    },
  });

  return response.data.results;
};

exports.getDetails = async (type, id) => {
  const response = await axios.get(`${BASE_URL}/${type}/${id}`, {
    params: {
      api_key: TMDB_API_KEY,
    },
  });

  return response.data;
};
