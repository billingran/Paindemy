const router = require("express").Router();
const homePageController = require("../controllers/home_controller");

//Home page
router.get("/", homePageController.homePage);
module.exports = router;
