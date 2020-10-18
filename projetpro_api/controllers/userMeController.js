// const models = require("../models");
// const jwtUtils = require("../utils/jwt_utils");

// module.exports = {
//   userMe: async (request, response) => {
//     console.log("iciii");

//     // const headerAuth = request.headers["authorization"];
//     // const userId = jwtUtils.getUserId(headerAuth);

//     console.log("request.user", request.user.userId);

//     const user = await models.User.findByPk(request.user.userId);
//     response.status(201).json(user);
//   },
// };
