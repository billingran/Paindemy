// Class Services
const ReadService = require("../services/Read_service");
const readService = new ReadService();

// Home page
module.exports.homePage = async (req, res) => {
  try {
    // find first 4 categories
    const limitNumberCategories = 4;
    const categories = await readService.getAllCategoriesLimit(
      limitNumberCategories
    );

    // find last 5 courses of each category
    const sortNumberCourses = -1;
    const limitNumberCourses = 5;
    const courseTypeOne = { categoryCourse: categories[0].nameCategory };
    const courseTypeTwo = { categoryCourse: categories[1].nameCategory };
    const courseTypeThree = { categoryCourse: categories[2].nameCategory };

    const coursesOne = await readService.getAllCoursesSortLimit(
      courseTypeOne,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesTwo = await readService.getAllCoursesSortLimit(
      courseTypeTwo,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesThree = await readService.getAllCoursesSortLimit(
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
