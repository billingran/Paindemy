const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructor_controller");

//instructors
router.get("/instructors", instructorController.getAllinstructors);

//new class
router.get("/newclass", instructorController.newClass);
module.exports = router;
