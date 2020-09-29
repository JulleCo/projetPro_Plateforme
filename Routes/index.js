const express = require("express");
const router = express.Router();
// const NotFoudError = require("../Middleware/NotFound_Handler");
const userController = require("../controllers/userController");

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Route USER
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);

module.exports = router;
