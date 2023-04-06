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
    const coursesTypeB = { categoryCourse: categories[0].nameCategory };
    const coursesTypeP = { categoryCourse: categories[1].nameCategory };
    const coursesTypeO = { categoryCourse: categories[2].nameCategory };

    const coursesB = await readService.getAllCoursesSortLimit(
      coursesTypeB,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesP = await readService.getAllCoursesSortLimit(
      coursesTypeP,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesO = await readService.getAllCoursesSortLimit(
      coursesTypeO,
      sortNumberCourses,
      limitNumberCourses
    );

    res.render("index", {
      title: "Home Page",
      categories,
      coursesB,
      coursesP,
      coursesO,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
