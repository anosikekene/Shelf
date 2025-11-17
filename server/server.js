require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mediaRoutes = require("./routes/mediaRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is working");
});

app.use("/api/media", mediaRoutes);
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.error("MongoDB connection error!:", err));

app.listen(3000, () => {
  console.log("Server is running on localhost3000");
});
