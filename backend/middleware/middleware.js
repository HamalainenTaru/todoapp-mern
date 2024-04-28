const logger = require("../utils/logger");
const unknownEndpoint = (request, response) => {
  response.status(404).send("Unkown Endpoint");
};

const errorHandler = (error, request, response, next) => {
  logger.info(error.name, error.message);

  switch (error.name) {
    case "ValidationError":
      const fieldname = Object.keys(error.errors)[0];
      const message = error.errors[fieldname].message
        .replace(/Path|`|\s+/g, " ")
        .trim();
      return response.status(400).json({ error: message });

    case "MongoServerError":
      return error.code === 11000
        ? response.status(400).json({ error: "Username is not available" })
        : response.status(400).json({ error: error.message });

    default:
      return response.status(500).json({ error: error.message });
  }
};

module.exports = { unknownEndpoint, errorHandler };
