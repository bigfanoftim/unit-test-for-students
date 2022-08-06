const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const { routes } = require("./src/routes");

const userDao = require("./src/models/userDao");
const testDao = require("./src/models/testDao");

const createApp = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(morgan("combined"));

  app.use(routes);

  app.use("/ping", (req, res) => {
    res.send("pong");
  });

  app.use("/data-source", (req, res) => {
    res.send(userDao.getDataSource() === testDao.getDataSource());
  });

  return app;
};

module.exports = { createApp };
