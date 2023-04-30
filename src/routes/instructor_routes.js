const router = require("express").Router();
const instructorController = require("../controllers/instructor_controller");

//instructor profile
router.get("/profile/:_id", instructorController.instructorProfile);

//patch instructor profile
router.patch("/profile/:_id", instructorController.patchInstructorProfile);

//new class
router.get("/newclass", instructorController.newClass);

//post new class
router.post("/newclass", instructorController.postNewClass);

//update class
router.get("/updateclass/:_id", instructorController.updateClass);

//patch update class
router.patch("/updateclass/:_id", instructorController.patchUpdateClass);

//instrutor delete
router.get("/delete/:_id", instructorController.instructorDelete);

//post instrutor delete
router.delete("/delete/:_id", instructorController.postInstructorDelete);

// instructor my courses
router.get("/mycourses/:_id", instructorController.instructorMyCourses);

// instructor my space
router.get("/myspace/:_id", instructorController.instructorMySpace);

// post instructor my space
router.post("/myspace/:_id", instructorController.postInstructorMySpace);

// instructor my favorite
router.get("/myfavorite/:_id", instructorController.instructorMyFavorite);

module.exports = router;
