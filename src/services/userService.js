const userDao = require("../models/userDao");
const { validateEmail } = require("../utils/validators");

const signUp = async (signUpDto) => {
  const { email, password } = signUpDto;

  validateEmail(email);

  if (await userDao.getUserByEmail(email)) {
    const err = new Error("duplicated email");
    err.statusCode = 409;
    throw err;
  }

  return await userDao.createUser(email, password);
};

module.exports = { signUp };
