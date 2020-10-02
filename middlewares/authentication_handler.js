const jwtUtils = require("../utils/jwt_utils");
const UnauthorizedError = require("../utils/errors");

module.exports = async (request, response, next) => {
  const headerAuth = request.headers["authorization"];
  const userId = jwtUtils.getUserId(headerAuth, response);
  if (userId < 0) {
    throw new UnauthorizedError(
      "Unauthorized access",
      "Wrong token : Please authenticate to to access this feature"
    );
  }
  request.body.userId = userId;
  next();
};
