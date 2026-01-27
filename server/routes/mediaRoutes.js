const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const auth = require("../middleware/auth");

router.get("/test", (req, res) => {
  res.send("Media route is working");
});

router.post("/", auth, mediaController.createMedia);
router.get("/", mediaController.getAllMedia);
router.get("/:id", mediaController.getMediaById);
router.put("/:id", auth, mediaController.updateMedia);
router.delete("/:id", auth, mediaController.deleteMedia);

module.exports = router;
