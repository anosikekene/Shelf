const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const auth = require("../middleware/auth");

router.get("/test", (req, res) => {
  res.send("Media route is working");
});

router.post("/", auth, mediaController.createMedia);

router.get("/", mediaController.getAllMedia);
router.get("/search", auth, mediaController.searchMedia);
router.get("/:id", mediaController.getMediaById);

router.put("/:id/review", auth, mediaController.updateReview);

router.delete("/:id", auth, mediaController.deleteMedia);

// Get all media
router.get("/", mediaController.getAllMedia);

// Get a single media by ID
router.get("/:id", mediaController.getMediaById);
module.exports = router;
