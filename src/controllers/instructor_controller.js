const CourseService = require("../services/Course_service");
const courseService = new CourseService();

// time controller
const moment = require("moment");

// instructor profile
module.exports.instructorProfile = (req, res) => {
  try {
    res.render("instructor_profile", {
      title: "Instructor profile",
      showHeader: true,
      authUser: req.user,
    });
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
  }
};

// new class
module.exports.newClass = (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
    currentDate,
  });
};

// post new class
module.exports.postNewClass = async (req, res) => {
  let {
    nameCourse,
    dateCourse,
    timeCourse,
    addressCourse,
    descriptionCourse,
    categoryCourse,
    caloriesCourse,
    ingredientsCourse,
  } = req.body;

  const currentDate = await courseService.postNewCourse(
    nameCourse,
    dateCourse,
    timeCourse,
    addressCourse,
    descriptionCourse,
    categoryCourse,
    caloriesCourse,
    ingredientsCourse,
    req,
    res
  );

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
    currentDate,
  });
};
