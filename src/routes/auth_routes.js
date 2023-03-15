const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

// sign up
router.get("/signup", authController.signUp);

module.exports = router;
