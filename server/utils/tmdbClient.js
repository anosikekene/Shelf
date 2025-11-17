const axios = require("axios");
const baseURL = "https://api.themoviedb.org/3";
const apiKey = process.env.TMDB_API_KEY;

async function search(query) {
  const url = `${baseURL}/search/multi?api_key=${apiKey}&query=${encodeURIComponent(
    query
  )}`;
  const res = await axios.get(url);
  return res.data;
}

async function getDetails(type, id) {
  const url = `${baseURL}/${type}/${id}?api_key=${apiKey}&append_to_response=credits,images`;
  const res = await axios.get(url);
  return res.data;
}

module.exports = { search, getDetails };
