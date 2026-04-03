const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/profile", auth, userController.profile);
router.get("/feed", auth, userController.getFeed);
router.get("/:username", userController.getUserInfo);
router.get("/:id/watchlist", auth, userController.getWatchlist);

router.post("/register", userController.createUser);
router.post("/:username/unfollow", auth, userController.unfollowUser);
router.post("/:username/follow", auth, userController.followUser);
router.post("/", userController.login);
router.post("/:id/favorite", auth, userController.addFavorite);
router.post("/:username/review", auth, userController.createReview);
router.post("/:id/like", auth, userController.toggleLike);
router.post("/:id/comment", auth, userController.addComment);
router.post("/:id/watchlist", auth, userController.addToWatchlist);

router.delete("/:id/comment/:commentId", auth, userController.deleteComment);
router.delete("/:username/review/:mediaId", auth, userController.deleteReview);
router.delete("/:id/watchlist/:mediaId", auth, userController.deleteWatchlist);

module.exports = router;
