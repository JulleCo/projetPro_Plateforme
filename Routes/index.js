const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

// Gestion des erreurs
router.use("*", (req, res) => {
  res.status(404).json({
    error: "Petit problème en cours",
  });
});

module.exports = router;
