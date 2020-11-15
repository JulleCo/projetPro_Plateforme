const models = require("../models");
const jwtUtils = require("../utils/jwt_utils");
const bcrypt = require("bcrypt");
require("express-async-errors");

const {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  NotFoundError,
} = require("../utils/errors");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

module.exports = {
  signup: async (props) => {
    const user = {
      firstName: props.firstName,
      lastName: props.lastName,
      email: props.email,
      password: props.password,
      accessCode: props.accessCode,
    };

    for (const key in user) {
      if (user[key] === null) {
        throw new BadRequestError("Bad Request", `Input ${key} must be filled`);
      }
    }
    if (emailRegex.test(user.email) == false) {
      throw new BadRequestError("Bad Request", "Invalid email");
    }
    if (passwordRegex.test(user.password) == false) {
      throw new BadRequestError(
        "Bad Request",
        "Password should be 6 to 20 characters, and include at least a number, a uppercase and a lowercase"
      );
    }

    const accessCodeFound = await models.User.findOne({
      attributes: ["accessCode"],
      where: {
        accessCode: user.accessCode,
      },
    });
    if (!accessCodeFound && accessCodeFound === null) {
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
    return models.User.create({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: bcryptedPassword,
      admin: false,
    });
  },
  signin: async (request, response) => {
    const user = {
      email: request.body.email,
      password: request.body.password,
    };

    for (const key in user) {
      if (user[key] === null /* || user[key] === undefined */) {
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
        id: isMatch.id,
        firstName: isMatch.firstName,
        lastName: isMatch.lastName,
        email: isMatch.email,
      },
    });
  },
  getUserById: async (props) => {
    const userFound = await models.User.findOne({
      where: {
        id: props,
      },
    });
    if (!userFound) {
      throw new NotFoundError(
        "Resource not found",
        "The requested resource does not (or no longer) exist"
      );
    }
    return userFound;
  },
  deleteUser: async (props) => {
    await models.User.destroy({
      where: { id: props },
    });
  },
  editUser: async (request, response) => {
    const getUserId = request.params.id;
    const initialStateUser = await models.User.findOne({
      where: { id: getUserId },
    });

    if (!initialStateUser) {
      throw new NotFoundError(
        "Resource not found",
        "There is nothing to find at that url, the ID does not exist"
      );
    }

    let inputStateUser = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      accessCode: request.body.accessCode,
    };
    console.log("1",inputStateUser.password , initialStateUser.password)

    const resBcrypt = await bcrypt.compare(inputStateUser.password, initialStateUser.password);
    console.log(inputStateUser.password , initialStateUser.password, resBcrypt)

    if (
      initialStateUser.firstName === inputStateUser.firstName &&
      initialStateUser.lastName === inputStateUser.lastName &&
      initialStateUser.email === inputStateUser.email  /* &&
      resBcrypt === false */
    ) {
      throw new BadRequestError(
        "Bad Request",
        "No need to update, you didn't modified anything"
      );
    }

    
    let bcryptedPassword = await bcrypt.hash(inputStateUser.password, 5)
        console.log(bcryptedPassword)

    let updateUser = await models.User.update(request.body, {
      where: { id: getUserId },
      firstName: inputStateUser.firstName,
      lastName: inputStateUser.lastName,
      email: inputStateUser.email,
      password: bcryptedPassword,
    });
    console.log(updateUser)

    let updatedStateUser = await models.User.findOne({
      where: { id: getUserId },
    });
    console.log(updatedStateUser)

    return response.status(201).json({ updateUser, updatedStateUser })
    
  },
};
