const NotFoundError = require("../utils/errors/NotFoundError");

module.exports = (request, response, next) => {
  throw new NotFoundError(
    "Ressource non trouvée",
    "Ressource demandée introuvable. Vérifiez le chemin de l'URL et réessayez."
  );
};
