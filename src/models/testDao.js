const { AppDataSource } = require("./data-source");

const getDataSource = () => {
  return AppDataSource;
};

module.exports = { getDataSource };
