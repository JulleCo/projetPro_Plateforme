const models = require("../models");
const jwtUtils = require("../utils/jwt_utils");
const bcrypt = require("bcrypt");
require("express-async-errors");

const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} = require("../utils/errors");
const { request } = require("express");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

module.exports = {
  signup: async (request, response) => {
    const user = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      accessCode: request.body.accessCode,
    };

    for (const key in user) {
      if (user[key] == null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }
    if (emailRegex.test(user.email) == false) {
      throw new BadRequestError("Bad Request", "Invalid email");
    }
    if (passwordRegex.test(user.password) == false) {
      throw new BadRequestError(
        "Bad Request",
        "Should be 6 to 20 characters, and include at least a number, a uppercase and a lowercase"
      );
    }

    const accessCodeFound = await models.User.findOne({
      attributes: ["accessCode"],
      where: {
        accessCode: user.accessCode,
      },
    });
    if (!accessCodeFound) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "You cannot create an account since your accessCode is incorrect or expired"
      );
    }

    const userFound = await models.User.findOne({
      attributes: ["email"],
      where: {
        email: user.email,
      },
    });
    if (userFound) {
      throw new ConflictError(
        "Conflict Error",
        "An account already exist with that email"
      );
    }

    const bcryptedPassword = await bcrypt.hash(user.password, 5);
    const newUser = await models.User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: bcryptedPassword,
      admin: false,
    });

    response.status(201).json({
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  },

  signin: async (request, response) => {
    const user = {
      email: request.body.email,
      password: request.body.password,
    };

    for (const key in user) {
      if (user[key] == null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }

    const isMatch = await models.User.findOne({
      where: {
        email: user.email,
      },
    });

    if (!isMatch) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "This account does not exist"
      );
    }
    const resBcrypt = await bcrypt.compare(user.password, isMatch.password);
    if (!resBcrypt) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "Mismatched, your password is incorrect"
      );
    }

    response.status(200).json({
      token: jwtUtils.generateTokenForUser(isMatch),
      user: {
        firstName: isMatch.firstName,
        lastName: isMatch.lastName,
        email: isMatch.email,
      },
    });
  },

  getUserById: async (request, response) => {
    const userFound = await models.User.findOne({
      where: {
        id: request.params.id,
      },
    });
    response.status(201).json(userFound);
  },

  deleteUser: async (request, response) => {
    const deleteUser = await models.User.destroy({
      where: { id: request.params.id },
    });
    if (deleteUser) {
      response.status(201).json({ "succes": "User account delete" });
    } 
    else {
      throw new NotFoundError("Resource not found","The requested resource does not (or no longer) exist");
    }
  },
};
