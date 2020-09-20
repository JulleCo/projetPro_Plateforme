const express = require("express");
const router = require("./Routes/index");

let server = express();

server.use("/", router);

const port = 1234;

server.listen(port, () => {
  console.log(`Le serveur demarre dans le port ${port}`);
});

module.exports = server;