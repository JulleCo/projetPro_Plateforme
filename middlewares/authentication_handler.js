const jwtUtils = require("../utils/jwt_utils");
const UnauthorizedError = require("../utils/errors/unauthorizedError");

module.exports = async (request, response, next) => {
  const headerAuth = request.headers["authorization"];
  if(headerAuth.length <= 7){
    throw new UnauthorizedError(
        "Unauthorized access",
        "No token found : please authenticate to to access this feature"
      );
  }
  const userId = jwtUtils.getUserId(headerAuth);
    console.log(userId)

//   if (userId == null || userId == undefined || userId < 0) {
//     throw new UnauthorizedError(
//       "Unauthorized access",
//       "Wrong token : Please authenticate to to access this feature"
//     );
//   }
  request.body.userId = userId;
  next();
};
