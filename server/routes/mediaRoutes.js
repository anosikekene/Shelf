const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");

router.get("/test", (req, res) => {
  res.send("Media route is working");
});
router.get("/search", mediaController.search);
router.get("/:type/:id", mediaController.getDetails);

module.exports = router;
