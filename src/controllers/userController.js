const userService = require("../services/userService");

const signUp = async (req, res) => {
  const signUpDto = req.body;

  try {
    await userService.signUp(signUpDto);
    res.status(201).end();
  } catch (err) {
    res.status(err.statusCode).json({ message: err.message });
  }
};

module.exports = { signUp };
