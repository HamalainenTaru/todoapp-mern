const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../utils/config");

const signup = async (request, response, next) => {
  try {
    const { name, username, password, confirmPassword } = request.body;

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
  try {
    const { username, password } = request.body;

    const user = await User.findByUsername(username);

    if (!user) {
      const error = new Error();
      error.name = "ValidationError";
      error.errors = {
        username: {
          message: "user not found",
        },
      };
      return next(error);
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      const error = new Error();
      error.name = "ValidationError";
      error.errors = { password: { message: "Invalid password" } };
      return next(error);
    }

    const userForToken = {
      id: user.id,
    };

    const token = jwt.sign(userForToken, config.JWT_SECRET, {
      expiresIn: 60 * 60,
    });
    response.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports = { signup, login };
