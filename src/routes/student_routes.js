const router = require("express").Router();
const studentController = require("../controllers/student_controller");

// auth check student
const authCheckStudent = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleUser == "student") {
    next();
  } else {
    req.flash("error_msg", "You should sign up to be a student first");
    return res.redirect("/auth/signup");
  }
};

//student profile
router.get("/profile/:_id", authCheckStudent, studentController.studentProfile);

//student delete
router.get("/delete/:_id", authCheckStudent, studentController.studentDelete);

//post student delete
router.delete(
  "/delete/:_id",
  authCheckStudent,
  studentController.postStudentDelete
);

// student my courses
router.get(
  "/mycourses/:_id",
  authCheckStudent,
  studentController.studentMycourses
);

module.exports = router;
