const models = require("../models");
const jwtUtils = require("../utils/jwt_utils");
const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
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
  deletePlace: async (request, response) => {
    const placeId = request.params.id
    const deletePlace = await models.Place.destroy({
      where: { id: placeId},
    });
    if (deletePlace) {
      response.status(201).json({"succes": "place post delete"})
    }
    else{
      throw new NotFoundError("Resource not found", "The requested resource does not (or no longer) exist")
    }
  },
  getPlaces: async (request, response) => {
    const placesFound = await models.Place.findAll({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
    });

    response.status(200).json(placesFound);
  },
  getPlaceById: async (request, response) => {
    const foundPlaceById = await models.Place.findOne({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
      where: {
        id: request.params.id,
      },
    });

    if (foundPlaceById < 0) {
      throw new NotFoundError(
        "Resource not found",
        "The place you are looking for does not exist in our database"
      );
    }

    response.status(201).json({
      id: foundPlaceById.id,
      userId: foundPlaceById.userId,
      type: foundPlaceById.type,
      location: foundPlaceById.location,
      animaux: foundPlaceById.animaux,
      personMax: foundPlaceById.personMax,
      description: foundPlaceById.description,
      picture: foundPlaceById.picture,
    });
  },
  getPlaceByUser: async (request, response) => {
    const userByName = await models.User.findOne({
      attributes: ["firstName", "id"],
      where: {
        firstName: request.params.userName,
      },
    });

    const foundPlaceByUser = await models.Place.findAll({
      attributes: [
        "id",
        "type",
        "userId",
        "location",
        "animaux",
        "personMax",
        "description",
        "picture",
      ],
      where: {
        userId: userByName.id,
      },
    });

    response.status(201).json(foundPlaceByUser);
  },
};
