const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructor_controller");

//new class
router.get("/newclass", instructorController.newClass);
module.exports = router;
