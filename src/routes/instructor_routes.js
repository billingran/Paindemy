const router = require("express").Router();
const instructorController = require("../controllers/instructor_controller");

//instructor profile
router.get("/profile/:_id", instructorController.instructorProfile);

//put instructor profile
router.patch("/profile/:_id", instructorController.patchInstructorProfile);

//new class
router.get("/newclass", instructorController.newClass);

//post new class
router.post("/newclass", instructorController.postNewClass);

//instrutor delete
router.get("/delete/:_id", instructorController.instructorDelete);

//post instrutor delete
router.delete("/delete/:_id", instructorController.postInstructorDelete);

// instructor my courses
router.get("/mycourses/:_id", instructorController.instructorMycourses);

module.exports = router;
