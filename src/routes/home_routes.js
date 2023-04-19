const router = require("express").Router();
const homePageController = require("../controllers/home_controller");

//Home page
router.get("/", homePageController.homePage);

//AXIOS //////////////////////////////////////////////////

// post home page register class
router.post("/", homePageController.postHomePageRegisterClass);

module.exports = router;
