const express = require("express");
const router = express.Router();
const {User} = require('../models')
// const jwt = require("../utils/jwt_utils");
const authenticate_handler = require ("../middlewares/authentication_handler")
const {
  userMeController,
  userController,
  placeController,
  mailController,
} = require("../controllers");

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Routes CONTACT
router.post("/contact", mailController.sendContactMail);

// Routes USER
router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.get("/user/me", authenticate_handler, async (request, response) => {
  console.log('hello')
  console.log("request.user", request.userId);
  const user = await User.findByPk(request.userId);
  response.status(201).json(user);
});

router.delete("/user/:id", authenticate_handler, userController.deleteUser);
router.patch("/user/:id", authenticate_handler, userController.editUser);
router.get("/user/:id", authenticate_handler, userController.getUserById);



// Routes PLACE
router.post("/place", authenticate_handler, placeController.addPlace);
router.delete(
  "/places/placeid=:id",
  authenticate_handler,
  placeController.deletePlace
);
router.patch(
  "/places/placeid=:id",
  authenticate_handler,
  placeController.editPlace
);

router.get("/places",/*  authenticate_handler, */ placeController.getPlaces);
router.get(
  "/places/placeid=:id",/* 
  authenticate_handler, */
  placeController.getPlaceById
);
router.get(
  "/places/userid=:userId",
  authenticate_handler,
  placeController.getPlacesByUser
);

module.exports = router;
