const User = require("../models/user.model");

const signup = async (request, response, next) => {
  try {
    const { name, username, password, confirmPassword } = request.body;

    if (!confirmPassword) {
      const error = new Error();
      error.name = "ValidationError";
      return next(error);
    }

    if (!(await User.validatePassword(password))) {
      return response.status(400).json({ error: "Invalid password" });
    }

    if (
      !(await User.comparePasswordWithConfirmPassword(
        password,
        confirmPassword
      ))
    ) {
      return response.status(400).json({ error: "Passwords do not match" });
    }

    const pic = `https://avatar.iran.liara.run/username?username=${username}`;

    response
      .status(201)
      .json(
        await User.CreateUser({ name, username, password, profilePic: pic })
      );
  } catch (error) {
    next(error);
  }
};

const login = async (request, response, next) => {
  response.send("login");
};

module.exports = { signup, login };
