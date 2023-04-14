const router = require("express").Router();
const instructorController = require("../controllers/instructor_controller");

// auth check instructor
const authCheckInstructor = (req, res, next) => {
  if (req.isAuthenticated() && req.user.roleUser == "instructor") {
    next();
  } else {
    req.flash("error_msg", "You should sign up to be a instructor first");
    return res.redirect("/auth/joinus");
  }
};

//instructor profile
router.get(
  "/profile/:_id",
  authCheckInstructor,
  instructorController.instructorProfile
);

//new class
router.get("/newclass", authCheckInstructor, instructorController.newClass);

//post new class
router.post(
  "/newclass",
  authCheckInstructor,
  instructorController.postNewClass
);

//instrutor delete
router.get(
  "/delete/:_id",
  authCheckInstructor,
  instructorController.instructorDelete
);

//post instrutor delete
router.delete(
  "/delete/:_id",
  authCheckInstructor,
  instructorController.postInstructorDelete
);

// instructor my courses
router.get(
  "/mycourses",
  authCheckInstructor,
  instructorController.instructorMycourses
);

module.exports = router;
