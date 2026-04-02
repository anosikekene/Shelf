const axios = require("axios");

const BOOK_API_KEY = process.env.BOOK_API_KEY;
const BASE_URL = "https://www.googleapis.com/books/v1/volumes?q=";

exports.search = async (query) => {
  const response = await axios.get(`${BASE_URL + query}&key=${BOOK_API_KEY}`);
  return response.data.items;
};
