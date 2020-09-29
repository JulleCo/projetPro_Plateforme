const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports = (request, response, next) => {
  throw new UnauthorizedError(
    "Accès non autorisé",
    "Vous n'avez pas les droits pour accéder à cette ressource. Essayez de vous authentifier et recommencez."
  );
};