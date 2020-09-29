const jwt = require("jsonwebtoken");
require("dotenv").config();
// const UnauthorizedError = require("../Middleware/Unauthorized_Handler");
const JWT_SIGN_SECRET = process.env.JWT_SECRET;

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

  parseAuthorization: async (authorization) => {
    return authorization != null ? authorization.replace("Bearer ", "") : null;
  },

  getUserId: async (authorization, response) => {
    let userId = -1;
    const token = module.exports.parseAuthorization(authorization);

    if (token) {
        const jwtToken = await jwt.verify(token, JWT_SIGN_SECRET);
        if (!jwtToken) {
          return response
            .status(401)
            .json({ error: "Problème: pour accéder au jwtToken" });
        }
        userId = jwtToken.userId;
    } else {
    return response
        .status(401)
        .json({ error: "Problème : le token est invalide" });
    }
    return userId;
  }
};
