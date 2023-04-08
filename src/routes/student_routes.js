const router = require("express").Router();
const studentController = require("../controllers/student_controller");

//student profile0
router.get("/profile", studentController.studentProfile);

module.exports = router;
