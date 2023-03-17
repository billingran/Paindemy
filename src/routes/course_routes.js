const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course_controller");

//new class
router.get("/newclass", courseController.newClass);

module.exports = router;
