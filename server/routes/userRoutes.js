const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

// Test route
router.get("/test", userController.test);

// Create user route
router.post("/create", userController.createUser);

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/:id/favorite", auth, userController.addFavorite);
router.post("/:id/rate", auth, userController.addRating);
router.get("/:id/profile", auth, userController.getProfile);

module.exports = router;
