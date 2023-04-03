const express = require("express");
const router = express.Router();
const homePageController = require("../controllers/home_controller");

//Home page
router.get("/", homePageController.homePage);
module.exports = router;
