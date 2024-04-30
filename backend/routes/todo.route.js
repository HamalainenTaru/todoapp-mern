const express = require("express");

const controller = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", controller.test);

module.exports = router;
