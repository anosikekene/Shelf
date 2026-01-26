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

router.post("/create", userController.createUser);
router.post("/login", userController.login);
router.post("/:id/favorite", auth, userController.addFavorite);
router.post("/:id/rate", auth, userController.addRating);

module.exports = router;
