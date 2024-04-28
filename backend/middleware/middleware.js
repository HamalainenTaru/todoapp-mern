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
      return response.status(400).json({ errors: error.message });

    default:
      return response.status(500).json({ errors: { general: error.message } });
  }
};

module.exports = { unknownEndpoint, errorHandler };
