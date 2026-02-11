const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/profile", auth, userController.profile);
router.get("/:username/reviews", userController.getUserReviews);

router.post("/signup", userController.createUser);
router.post("/login", userController.login);
router.post("/:id/favorite", auth, userController.addFavorite);
router.post("/:username/review", auth, userController.createReview);

router.delete("/:username/review/:mediaId", auth, userController.deleteReview);

module.exports = router;
