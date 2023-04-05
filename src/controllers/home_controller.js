// Class Services
const CourseService = require("../services/Course_service");
const CategoryService = require("../services/Category_service");

// Home page
module.exports.homePage = async (req, res) => {
  try {
    // find first 4 categories
    const limitNumberCategories = 4;
    const categories = await CategoryService.getAllCategoriesLimit(
      limitNumberCategories
    );

    // find last 5 courses of each category
    const sortNumberCourses = -1;
    const limitNumberCourses = 5;
    const courseTypeOne = { categoryCourse: categories[0].nameCategory };
    const courseTypeTwo = { categoryCourse: categories[1].nameCategory };
    const courseTypeThree = { categoryCourse: categories[2].nameCategory };

    const coursesOne = await CourseService.getAllCoursesSortLimit(
      courseTypeOne,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesTwo = await CourseService.getAllCoursesSortLimit(
      courseTypeTwo,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesThree = await CourseService.getAllCoursesSortLimit(
      courseTypeThree,
      sortNumberCourses,
      limitNumberCourses
    );

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
