const express = require("express");
const router = express.Router();
const mediaController = require("../controllers/mediaController");
const auth = require("../middleware/auth");

router.get("/", mediaController.getAllMedia);
router.get("/search", auth, mediaController.searchMedia);
router.get("/", mediaController.getAllMedia);

module.exports = router;
