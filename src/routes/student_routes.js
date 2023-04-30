const router = require("express").Router();
const studentController = require("../controllers/student_controller");

//student profile
router.get("/profile/:_id", studentController.studentProfile);

//put student profile
router.patch("/profile/:_id", studentController.patchStudentProfile);

//student delete
router.get("/delete/:_id", studentController.studentDelete);

//post student delete
router.delete("/delete/:_id", studentController.postStudentDelete);

// student my courses
router.get("/mycourses/:_id", studentController.studentMyCourses);

// student my space
router.get("/myspace/:_id", studentController.studentMySpace);

// post student my space
router.post("/myspace/:_id", studentController.postStudentMySpace);

// student my favorite
router.get("/myfavorite/:_id", studentController.studentMyFavorite);

// patch student my favorite
router.patch("/myfavorite/:_id", studentController.patchStudentMyFavorite);

module.exports = router;
