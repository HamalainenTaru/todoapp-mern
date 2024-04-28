const User = require("../models/user.model");
const { error } = require("../utils/logger");

const signup = async (request, response, next) => {
  try {
    const { name, username, password, confirmPassword } = request.body;

    if (await User.findByUsername(username)) {
      const error = new Error();
      error.name = "ValidationError";
      error.errors = {
        username: {
          message: "Username is not available",
        },
      };
      return next(error);
    }

    if (!confirmPassword) {
      const error = new Error();
      error.name = "ValidationError";
      error.errors = {
        confirmPassword: {
          message: "Confirm password is required",
        },
      };
      return next(error);
    }

    if (!(await User.validatePassword(password))) {
      const error = new Error();
      error.name = "ValidationError";
      error.errors = {
        password: {
          message: "Invalid password",
        },
      };
      return next(error);
    }

    if (
      !(await User.comparePasswordWithConfirmPassword(
        password,
        confirmPassword
      ))
    ) {
      const error = new Error();
      error.name = "ValidationError";
      error.errors = {
        password: {
          message: "Passwords don't match",
        },
        confirmPassword: {
          message: "Passwords don't match",
        },
      };
      return next(error);
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
