const router = require("express").Router();
const studentController = require("../controllers/student_controller");

//student profile
router.get("/profile/:_id", studentController.studentProfile);

//put student profile
router.patch("/profile/:_id", studentController.putStudentProfile);

//student delete
router.get("/delete/:_id", studentController.studentDelete);

//post student delete
router.delete("/delete/:_id", studentController.postStudentDelete);

// student my courses
router.get("/mycourses/:_id", studentController.studentMycourses);

module.exports = router;
