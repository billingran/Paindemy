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

//AXIOS //////////////////////////////////////////////////

// post register one course
router.post("/registeronecourse", courseController.postRegisterOneCourse);

// post unregister one course
router.post("/unregisteronecourse", courseController.postUnregisterOneCourse);

// post delete one favorite
router.post("/deleteonefavorite", courseController.postDeleteOneFavorite);

module.exports = router;
