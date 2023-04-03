// models
const Category = require("../models/category_model");
const Course = require("../models/course_model");

// instrutors
module.exports.getAllinstructors = (req, res) => {
  res.render("instructors", { title: "Instructors" });
};

// courses
module.exports.getAllcourses = async (req, res) => {
  try {
    // get one category icon
    const nameCategory = req.params;
    const oneCategory = await Category.find({
      nameCategory: nameCategory.nameCategory,
    });

    // find courses with one category
    const manyCourses = await Course.find({
      nameCategory: nameCategory.nameCategory,
    });

    res.render("courses", {
      title: `${nameCategory.nameCategory} Courses`,
      oneCategory,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

// instrutor
module.exports.getOneinstructor = (req, res) => {
  res.render("instructor", { title: "Instructor" });
};

// course
module.exports.getOnecourse = (req, res) => {
  res.render("course", { title: "Course" });
};
