const jwt = require("jsonwebtoken");
require("dotenv").config();
const UnauthorizedError = require("../utils/errors");

const JWT_SIGN_SECRET = process.env.JWT_SECRET;

const parseAuthorization = (authorization) => {
  const token = authorization.replace("Bearer ", "");
  if (token === null || token === "") {
    throw new UnauthorizedError(
      "Unauthorized access",
      "No token found : please authenticate to to access this feature"
    );
  }
  return token;
};

module.exports = {
  generateTokenForUser: function (userData) {
    return jwt.sign(
      {
        userId: userData.id,
      },
      JWT_SIGN_SECRET,
      {
        expiresIn: "10h",
      }
    );
  },

  // authenticate_handler: (req, res, next) => {
  //   const authHeader = req.headers.authorization;
  //   console.log(authHeader)

  //   if (authHeader) {
  //     const token = authHeader.split(' ')[1];
      
  //     jwt.verify(token, secret, (err, user) => {
  //       if (err) {
  //         throw new UnAuthorizedError(
  //           'Accès refusé',
  //           'Vous devez être connecté pour accéder à cette ressource',
  //         );
  //       }
  //       console.log(user)
  //       req.user = user;
  //       console.log('req.user', req.user);
  //       next();
  //     });
  //   } else {
  //     throw new BadRequestError(
  //       'Mauvaise requête',
  //       "le token n'as pas été fournit",
  //     );
  //   }
  // },

  getUserId: (authorization, response) => {
    let userId = -1;
    const token = parseAuthorization(authorization);
    try {
      const jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
      userId = jwtToken.userId;
    } catch (err) {
      throw new UnauthorizedError(
        "Unauthorized access",
        "Problem: invalid token "
      );
    }
    return userId;
  },
};