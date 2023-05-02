// Class Services

const CategoryService = require("../services/Category_service");
const categoryService = new CategoryService();
const CourseService = require("../services/Course_service");
const courseService = new CourseService();

// time controller
const moment = require("moment");

// Home page
module.exports.homePage = async (req, res) => {
  try {
    // find first 4 categories
    const limitNumberCategories = 4;
    const categories = await categoryService.getAllCategoriesLimit(
      limitNumberCategories
    );

    // find last 5 courses of each category
    const sortNumberCourses = -1;
    const limitNumberCourses = 5;
    const coursesTypeB = { categoryCourse: categories[0]._id };
    const coursesTypeP = { categoryCourse: categories[1]._id };
    const coursesTypeO = { categoryCourse: categories[2]._id };

    const coursesB = await courseService.getAllCoursesSortLimit(
      coursesTypeB,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesP = await courseService.getAllCoursesSortLimit(
      coursesTypeP,
      sortNumberCourses,
      limitNumberCourses
    );

    const coursesO = await courseService.getAllCoursesSortLimit(
      coursesTypeO,
      sortNumberCourses,
      limitNumberCourses
    );

    // get current date
    const currentDate = moment().format("YYYY-MM-DD");

    return res.render("index", {
      title: "Home page",
      showHeader: true,
      authUser: req.user,
      categories,
      coursesB,
      coursesP,
      coursesO,
      currentDate,
      moment,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// add user into course re);

// let { _id } = req.params;

// const course = await Course.findOne({ _id }).exec();
// console.log(course.studentsCourse.includes(req.user._id));

// if (course.studentsCourse.includes(req.user._id)) {
//   req.flash("error_msg", "You can't join same course two times");
//   return res.redirect(`/student/mycourses/${req.user._id}`);
// }

// await Course.updateOne(
//   { _id },
//   { $push: { studentsCourse: req.user._id } },
//   { runValidators: true }
// ).exec();

// let test = await Course.updateOne(
//   { _id },
//   { $addToSet: { studentsCourse: req.user._id } },
//   { runValidators: true }
// ).exec();

// console.log(test);
