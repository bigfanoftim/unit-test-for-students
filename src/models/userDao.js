const { AppDataSource } = require("./data-source");

const getUserByEmail = async (email) => {
  const [user] = await AppDataSource.query(
    `
			SELECT *
			FROM users u
			WHERE u.email = ?
		`,
    [email]
  );

  return user;
};

const createUser = async (email, password) => {
  const createdUserData = await AppDataSource.query(
    `
			INSERT INTO users (
				email,
				password
			) VALUES (
				?, 
				?
			)
		`,
    [email, password]
  );

  return createdUserData;
};

const getDataSource = () => {
  return AppDataSource;
};

module.exports = { createUser, getUserByEmail, getDataSource };
