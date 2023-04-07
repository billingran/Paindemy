const router = require("express").Router();
const instructorController = require("../controllers/instructor_controller");

//new class
router.get("/newclass", instructorController.newClass);
module.exports = router;
