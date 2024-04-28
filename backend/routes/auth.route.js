const express = require("express");
const controller = require("../controllers/auth.controller");
const router = express.Router();

router.post("/signup", controller.signup);
router.get("/login", controller.login);

module.exports = router;
