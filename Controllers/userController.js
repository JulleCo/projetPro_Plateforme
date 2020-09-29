const models = require("../models");
const jwtUtils = require("../utils/jwt_utils");
const bcrypt = require("bcrypt");

const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ServerError,
} = require("../utils/errors");

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

    console.log("salut la terre")
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
console.log("on est la")
    const accessCodeFound = await models.user.findOne({
      attribute: ["accessCode"],
      where: {
        accessCode: user.accessCode,
      },
    });

    if (accessCodeFound !== user.accessCode) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "You cannot create an account since your accessCode is incorrect or expired"
      );
    }
console.log("est ce que ca marche")
    const userFound = await models.User.findOne({
      attributes: ["email"],
      where: {
        email: user.email,
      },
    });

    if (!userFound) {
      bcrypt.hash(user.password, 5, async (error, bcryptedPassword) => {
        const newUser = await models.user.create({
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
      });
    } else {
      throw new ConflictError(
        "Conflict Error",
        "An account already exist with that email"
      );
    }
  },
};
