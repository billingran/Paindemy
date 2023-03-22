const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course_controller");

//instructors
router.get("/instructors", courseController.getAllinstructors);

//courses
router.get("/courses", courseController.getAllcourses);

//instructor
router.get("/instructor", courseController.getOneinstructor);

//course
router.get("/course", courseController.getOnecourse);

module.exports = router;
