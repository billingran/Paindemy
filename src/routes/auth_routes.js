const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

// sign up
router.get("/signup", authController.signUp);

// login
router.get("/login", authController.login);

// join us
router.get("/joinus", authController.joinUs);

module.exports = router;
