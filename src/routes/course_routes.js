const router = require("express").Router();
const courseController = require("../controllers/course_controller");

//instructors
router.get("/instructors", courseController.getAllinstructors);

//courses of categories
router.get("/courses/:_id", courseController.getCoursesCategory);

//instructor
router.get("/instructor/:requestIntructor", courseController.getOneinstructor);

//course
router.get("/onecourse/:_id", courseController.getOnecourse);

//search
router.get("/search", courseController.getSearchTerm);

//post search
router.post("/search", courseController.postGetSearchTerm);

module.exports = router;
