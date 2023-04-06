const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course_controller");

//instructors
router.get("/instructors", courseController.getAllinstructors);

//courses of categories
router.get("/courses/:nameCategory", courseController.getCoursesCategory);

//instructor
router.get("/instructor", courseController.getOneinstructor);

//course
router.get("/course/:request_course", courseController.getOnecourse);

module.exports = router;
