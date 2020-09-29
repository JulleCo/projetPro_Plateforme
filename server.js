const express = require("express");
require('express-async-errors');
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");

const router = require("./Routes");
const NotFoundError = require("./Middleware/NotFound_Handler");

let server = express();

server.use(morgan("dev"));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/", cors());

server.use("/", router);

server.use(NotFoundError);

const port = 1234;
server.listen(port, () => {
  console.log(`Le serveur demarre dans le port ${port}`);
});

module.exports = server;
