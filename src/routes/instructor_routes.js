const router = require("express").Router();
const instructorController = require("../controllers/instructor_controller");

//instructor profile
router.get("/profile", instructorController.instructorProfile);

//new class
router.get("/newclass", instructorController.newClass);

//post new class
router.post("/newclass", instructorController.postNewClass);

module.exports = router;
