const notFoundError = require("../utils/errors/notFoundError");

module.exports = () => {
  throw new notFoundError(
    "Resource not found",
    "Requested resource not found. Check the URL path and try again."
  );
};