const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student_controller");

//new class
router.get("/registeredCourses");

module.exports = router;
