const router = require("express").Router();
const studentController = require("../controllers/student_controller");

//student profile0
router.get("/profile/:_id", studentController.studentProfile);

//student delete
router.get("/delete/:_id", studentController.studentDelete);

//post student delete
router.delete("/delete/:_id", studentController.postStudentDelete);

module.exports = router;
