const models = require("../models");
const jwtUtils = require("../utils/jwt_utils");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");

module.exports = {
  addPlace: async (request, response) => {
    const place = {
      type: request.body.type,
      location: request.body.location,
      animaux: request.body.animaux,
      personMax: request.body.personMax,
      description: request.body.description,
      picture: request.body.picture,
    };

    const headerAuth = request.headers["authorization"];
    const userId = jwtUtils.getUserId(headerAuth, response);

    if (userId < 0) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "You are not allow to create an annonce since you are not authenticate"
      );
    }

    for (const key in place) {
      if (place[key] == null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }

    const newPlace = await models.Place.create({
      type: place.type,
      userId: userId,
      location: place.location,
      animaux: place.animaux,
      personMax: place.personMax,
      description: place.description,
      picture: place.picture,
    });

    response.status(201).json({
      type: newPlace.type,
      userId: newPlace.userId,
      location: newPlace.location,
      animaux: newPlace.animaux,
      personMax: newPlace.personMax,
      description: newPlace.description,
      picture: newPlace.picture,
    });
  },
};
