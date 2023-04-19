const router = require("express").Router();
const homePageController = require("../controllers/home_controller");

//Home page
router.get("/", homePageController.homePage);

//AXIOS //////////////////////////////////////////////////

// register a course
router.post("/", homePageController.homePageRegisterClass);

module.exports = router;
