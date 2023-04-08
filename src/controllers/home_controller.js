// Class Services
const DbService = require("../services/Db_service");
dbService = new DbService();

// Home page
module.exports.homePage = async (req, res) => {
  try {
    // find first 4 categories
    const limitNumberCategories = 4;
    const categories = await dbService.getAllCategoriesLimit(
      limitNumberCategories
    );

    // find last 5 courses of each category
    const sortNumberCourses = -1;
    const limitNumberCourses = 5;
    const coursesTypeB = { categoryCourse: categories[0].nameCategory };
    const coursesTypeP = { categoryCourse: categories[1].nameCategory };
    const coursesTypeO = { categoryCourse: categories[2].nameCategory };

    const coursesB = await dbService.getAllCoursesSortLimit(
      coursesTypeB,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesP = await dbService.getAllCoursesSortLimit(
      coursesTypeP,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesO = await dbService.getAllCoursesSortLimit(
      coursesTypeO,
      sortNumberCourses,
      limitNumberCourses
    );

    // auth check
    const authUser = req.user;

    return res.render("index", {
      title: "Home page",
      showHeader: true,
      categories,
      coursesB,
      coursesP,
      coursesO,
      authUser,
    });
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
  }
};
