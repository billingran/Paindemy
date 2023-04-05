const Category = require("../models/category_model");
const Course = require("../models/course_model");
const User = require("../models/user_model");

// Home page
module.exports.homePage = async (req, res) => {
  try {
    // find first 4 categories
    const limitNumberCategories = 4;
    const categories = await Category.find({}).limit(limitNumberCategories);

    // find last 5 courses of each category
    const limitNumberCourses = 5;

    const coursesOne = await Course.find({
      categoryCourse: categories[0].nameCategory,
    })
      .sort({ _id: -1 })
      .limit(limitNumberCourses)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    const coursesTwo = await Course.find({
      categoryCourse: categories[1].nameCategory,
    })
      .sort({ _id: -1 })
      .limit(limitNumberCourses)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    const coursesThree = await Course.find({
      categoryCourse: categories[2].nameCategory,
    })
      .sort({ _id: -1 })
      .limit(limitNumberCourses)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    res.render("index", {
      title: "Home Page",
      categories,
      coursesOne,
      coursesTwo,
      coursesThree,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
