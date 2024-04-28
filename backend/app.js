const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./utils/config");
const logger = require("./utils/logger");
const middleware = require("./middleware/middleware");

const authRoutes = require("./routes/auth.route");

const app = express();

//#region Connecting to MongoDB
mongoose.set("strictQuery", false);
mongoose
  .connect(config.MONGO_URL)
  .then(() => {
    logger.info("Succesfully connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Failed connecting to MongoDB", error.message);
  });
//#endregion

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
