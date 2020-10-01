const express = require("express");
const router = express.Router();
const authenticate_handler = require ("../middlewares/authentication_handler")
const { userController, placeController } = require("../controllers");

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Routes USER
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.delete("/user/:id", authenticate_handler, userController.deleteUser);

router.get("/user/:id",authenticate_handler, userController.getUserById);

// Routes PLACE
router.post("/place", authenticate_handler, placeController.addPlace);
router.delete("/places/placeid=:id", authenticate_handler, placeController.deletePlace);
router.patch("/places/placeid=:id", authenticate_handler, placeController.editPlace);

router.get("/places", authenticate_handler, placeController.getPlaces);
router.get("/places/placeid=:id", authenticate_handler, placeController.getPlaceById);
router.get("/places/userid=:userId", authenticate_handler, placeController.getPlacesByUser);

module.exports = router;
