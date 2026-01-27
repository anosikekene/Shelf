const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.get("/test", userController.test);
router.get("/protected", auth, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
  });
});
router.get("/profile", auth, userController.profile);
router.get("/:id/reviews", userController.getUserReviews);

router.post("/signup", userController.createUser);
router.post("/login", userController.login);
router.post("/:id/favorite", auth, userController.addFavorite);
router.post("/:id/rate", auth, userController.addRating);
router.post("/:id/review", auth, userController.createReview);

router.get("/:id/reviews", userController.getUserReviews);

// Add a review for a media item
router.post("/:id/review", auth, userController.createReview);

// Update a review for a media item
router.put("/:id/review/:mediaId", auth, userController.updateReview);

// Delete a review for a media item
router.delete("/:id/review/:mediaId", auth, userController.deleteReview);
module.exports = router;
