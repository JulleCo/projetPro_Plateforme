const express = require("express");
const router = express.Router();
const { userController, placeController } = require("../controllers");

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Routes USER
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

// Routes PLACE
router.post("/place", placeController.addPlace);

module.exports = router;
