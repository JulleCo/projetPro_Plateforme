const express = require("express");
const router = express.Router();
const { User } = require("../models");
const authenticate_handler = require("../middlewares/authentication_handler");
const {
  userController,
  placeController,
  mailController,
} = require("../controllers");

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Routes USER

router.post("/signup", async (request, response) => {
  const user = {
    firstName: request.body.firstName,
    lastName: request.body.lastName,
    email: request.body.email,
    password: request.body.password,
    accessCode: request.body.accessCode,
  };
  const signup = await userController.signup(user);
  response.status(201).json({
    firstName: signup.firstName,
    lastName: signup.lastName,
    email: signup.email,
  });
});

router.post("/signin", userController.signin);

router.get("/user/me", authenticate_handler, async (request, response) => {
  console.log("hello");
  console.log("request.user", request.userId);
  const user = await User.findByPk(request.userId);
  response.status(201).json(user);
});

router.get("/user/:id", authenticate_handler, async (request, response) => {
  const id = request.params.id;
  const userFound= await userController.getUserById(id);
  response.status(201).json({userFound});
  });

router.delete("/user/:id", authenticate_handler, async (request, response) => {
  const id = request.params.id;
  await userController.deleteUser(id);
  response.status(201).json({ succes: "User account delete" });
});

router.patch("/user/:id", authenticate_handler, userController.editUser);

// Routes CONTACT
router.post("/contact", mailController.sendContactMail);

// Routes PLACE
router.post("/places", authenticate_handler, placeController.addPlace);
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

router.get("/places", authenticate_handler, placeController.getPlaces);
router.get(
  "/places/placeid=:id",
  authenticate_handler,
  placeController.getPlaceById
);
router.get(
  "/places/userid=:userId",
  authenticate_handler,
  placeController.getPlacesByUser
);

module.exports = router;
