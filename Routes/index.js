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
router.post("/addPlace", placeController.addPlace);
router.get("/places", placeController.getPlaces);

router.get("/places/placeid=:id", placeController.getPlaceById);
router.get("/places/username=:userName", placeController.getPlaceByUser);


module.exports = router;
