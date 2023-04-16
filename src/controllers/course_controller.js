// Class Services
const CategoryService = require("../services/Category_service");
const categoryService = new CategoryService();
const CourseService = require("../services/Course_service");
const courseService = new CourseService();
const UserService = require("../services/User_service");
const userService = new UserService();

// instrutors
module.exports.getAllinstructors = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // find instructors for carousel and all instructors

    const userTypeAllInstructors = { roleUser: "instructor" };
    let allinstructors = await userService.getAllUsers(userTypeAllInstructors);

    return res.render("instructors", {
      title: "Instructors",
      showHeader: true,
      authUser: req.user,
      allinstructors,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//courses of categories
module.exports.getCoursesCategory = async (req, res) => {
  try {
    // req.params
    let { nameCategory } = req.params;
    nameCategory = categoryService.getBackUrl(nameCategory);

    ////////////////////////////////////////////////////
    // find all courses for carousel
    let allCourses = await courseService.getAllCourses({});

    ////////////////////////////////////////////////////
    // find courses with one category or all courses

    // get one category icon
    const categoryType = { nameCategory };
    let iconCategory = await categoryService.getOneCategory(categoryType);

    // get all courses
    let manyCourses = await courseService.getAllCourses({});

    if (nameCategory != "All") {
      // get category courses
      const coursesType = { categoryCourse: nameCategory };
      manyCourses = await courseService.getAllCourses(coursesType);
    }

    return res.render("courses", {
      title: "Courses",
      showHeader: true,
      authUser: req.user,
      allCourses,
      manyCourses,
      iconCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// instrutor
module.exports.getOneinstructor = async (req, res) => {
  try {
    let { requestIntructor } = req.params;

    ////////////////////////////////////////////////////
    // find instructor or random according req.params
    let oneInstructor;

    if (requestIntructor == "random") {
      oneInstructor = await userService.getOneUserCountSkip({});
    } else {
      const userTypeInstructor = { _id: requestIntructor };
      oneInstructor = await userService.getOneUser(userTypeInstructor);
    }

    ////////////////////////////////////////////////////
    // find all instructor courses

    const coursesTypeOneInstructor = { instructorCourse: oneInstructor._id };
    let coursesInstructor = await courseService.getAllCourses(
      coursesTypeOneInstructor
    );

    // get instructor random course

    const courseRandomInstructor = await courseService.getOneCourseFloorMath(
      coursesInstructor
    );

    // get all students number
    let numberStudentOneInstructor = 0;
    coursesInstructor.forEach((course) => {
      numberStudentOneInstructor += course.studentsCourse.length;
    });

    return res.render("instructor", {
      title: "Instructor",
      showHeader: true,
      authUser: req.user,
      oneInstructor,
      coursesInstructor,
      courseRandomInstructor,
      numberStudentOneInstructor,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// one course
module.exports.getOnecourse = async (req, res) => {
  try {
    let { requestCourse } = req.params;
    requestCourse = courseService.getBackUrl(requestCourse);

    ////////////////////////////////////////////////////
    // find latest, random or one course according req.params

    // get latest, random or one course
    let oneCourse;

    if (requestCourse == "Latest") {
      // get latest course
      const sortNumberLatest = -1;
      const limitNumberLatest = 1;

      oneCourse = await courseService.getAllCoursesSortLimit(
        {},
        sortNumberLatest,
        limitNumberLatest
      );

      oneCourse = oneCourse[0];
    } else if (requestCourse == "Random" || requestCourse == "All") {
      // get random course
      oneCourse = await courseService.getOneCourseCountSkip({});
    } else if (
      requestCourse == "Bakery" ||
      requestCourse == "Pastry" ||
      requestCourse == "Other"
    ) {
      // get category course
      const coursesType = { categoryCourse: requestCourse };
      oneCourse = await courseService.getOneCourseCountSkip(coursesType);
    } else {
      // get one course
      const courseType = { _id: requestCourse };
      oneCourse = await courseService.getOneCourse(courseType);
    }

    ////////////////////////////////////////////////////
    // find related courses and icon according latest, random or one course

    // get icon category
    const categoryType = { nameCategory: oneCourse.categoryCourse };
    let iconCategory = await categoryService.getOneCategory(categoryType);

    // get related courses
    const coursesTypeRelated = { categoryCourse: oneCourse.categoryCourse };
    const sortNumberRelated = -1;
    const limitNumberRelated = 5;
    let relatedCourses = await courseService.getAllCoursesSortLimit(
      coursesTypeRelated,
      sortNumberRelated,
      limitNumberRelated
    );

    return res.render("course", {
      title: `Course`,
      showHeader: true,
      authUser: req.user,
      requestCourse,
      iconCategory,
      oneCourse,
      relatedCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// search
module.exports.getSearchTerm = async (req, res) => {};

// post search
module.exports.postGetSearchTerm = async (req, res) => {
  try {
    let { searchTerm } = req.body;

    let results = await courseService.getAllResults(searchTerm);

    let result = courseService.getOneResultFloorMath(results);

    return res.render("search", {
      title: "Search",
      showHeader: true,
      authUser: req.user,
      results,
      result,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
