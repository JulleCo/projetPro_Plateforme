const NotFoundError = require("./notFoundError");
const BadRequestError = require("./badRequestError");
const ConflictError = require("./conflictError");
const UnauthorizedError = require("./unauthorizedError");
const ServerError = require("./serverError");

module.exports = {
  NotFoundError,
  BadRequestError,
  ConflictError,
  UnauthorizedError,
  ServerError,
};
