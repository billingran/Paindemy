const router = require("express").Router();
const instructorController = require("../controllers/instructor_controller");

//instructor profile
router.get("/profile", instructorController.instructorProfile);

//new class
router.get("/newclass", instructorController.newClass);

module.exports = router;
