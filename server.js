const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is working");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error!:", err));

app.listen(3000, () => {
  console.log("Server is running on localhost3000");
});
