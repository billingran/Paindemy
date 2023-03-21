const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course_controller");

//instructors
router.get("/instructors", courseController.getAllinstructors);

module.exports = router;
