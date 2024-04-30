const jwt = require("jsonwebtoken");
const config = require("../utils/config");
const User = require("../models/user.model");

const unknownEndpoint = (request, response) => {
  response.status(404).send("Unkown Endpoint");
};

const errorHandler = (error, request, response, next) => {
  switch (error.name) {
    case "ValidationError":
      if (typeof error.errors === "object" && error.errors !== null) {
        const errors = Object.keys(error.errors).reduce((acc, fieldname) => {
          const message = error.errors[fieldname].properties?.message
            ? error.errors[fieldname].properties.message
            : error.errors[fieldname].message;
          return {
            ...acc,
            [fieldname]: message.replace(/Path|`|\s+/g, " ").trim(),
          };
        }, {});
        return response.status(400).json({ errors });
      } else {
        return response
          .status(400)
          .json({ errors: { general: error.message } });
      }

    case "MongoServerError":
      return response.status(400).json({ error: error.message });

    case "JsonWebTokenError":
      return response
        .status(401)
        .json({ error: "Token missing or invalid token" });

    case "TokenExpiredError":
      return response.status(401).json({ error: "token expired" });

    default:
      return response.status(500).json({ error: error.message });
  }
};

const protectRoute = async (request, response, next) => {
  let token;
  const authorization = request.get("authorization");

  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await User.findByID(decoded.id);
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { unknownEndpoint, errorHandler, protectRoute };
