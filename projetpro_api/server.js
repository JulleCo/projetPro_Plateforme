const express = require("express");
require("express-async-errors");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./routes");
const { errorHandler, notFoundHandler } = require("./middlewares");

let server = express();

server.use(morgan("dev"));

server.use("/", cors());
server.use(bodyParser.json());

server.use("/", router);

server.use("*", notFoundHandler);
server.use(errorHandler);

const port = 1234;
server.listen(port, () => {
  console.log(`Le serveur demarre dans le port ${port}`);
});

module.exports = server;
