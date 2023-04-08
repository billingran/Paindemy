// Class Services
const DbService = require("../services/Db_service");
const dbService = new DbService();

// instrutors
module.exports.getAllinstructors = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // find instructors for carousel and all instructors

    const userTypeAllInstructors = { roleUser: "instructor" };
    let allinstructors = await dbService.getAllUsers(userTypeAllInstructors);

    res.render("instructors", { title: "Instructors", allinstructors });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

//courses of categories
module.exports.getCoursesCategory = async (req, res) => {
  try {
    // req.params
    let { nameCategory } = req.params;
    nameCategory = res.locals.getBackUrl(nameCategory);

    ////////////////////////////////////////////////////
    // find all courses for carousel
    let allCourses = await dbService.getAllCourses({});

    ////////////////////////////////////////////////////
    // find courses with one category or all courses

    // get one category icon
    const categoryType = { nameCategory };
    let iconCategory = await dbService.getOneCategory(categoryType);

    // get all courses
    let manyCourses = await dbService.getAllCourses({});

    if (nameCategory != "All") {
      // get category courses
      const coursesType = { categoryCourse: nameCategory };
      manyCourses = await dbService.getAllCourses(coursesType);
    }

    res.render("courses", {
      title: `${nameCategory} Courses`,
      allCourses,
      manyCourses,
      iconCategory,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

// instrutor
module.exports.getOneinstructor = async (req, res) => {
  try {
    let { requestIntructor } = req.params;

    console.log(requestIntructor);
    ////////////////////////////////////////////////////
    // find instructor or random according req.params
    let oneInstructor;

    if (requestIntructor == "random") {
      oneInstructor = await dbService.getOneUserCountSkip({});
    } else {
      const userTypeInstructor = { _id: requestIntructor };
      oneInstructor = await dbService.getOneUser(userTypeInstructor);
    }

    ////////////////////////////////////////////////////
    // find all instructor courses

    const coursesTypeOneInstructor = { instructorCourse: oneInstructor._id };
    let coursesInstructor = await dbService.getAllCourses(
      coursesTypeOneInstructor
    );

    // get all students number
    let numberStudentOneInstructor = 0;
    coursesInstructor.forEach((course) => {
      numberStudentOneInstructor += course.studentsCourse.length;
    });

    res.render("instructor", {
      title: "Instructor",
      oneInstructor,
      coursesInstructor,
      numberStudentOneInstructor,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};

// course
module.exports.getOnecourse = async (req, res) => {
  try {
    let { requestCourse } = req.params;
    requestCourse = res.locals.getBackUrl(requestCourse);

    ////////////////////////////////////////////////////
    // find latest, random or one course according req.params

    // get latest, random or one course
    let oneCourse;

    if (requestCourse == "Latest") {
      // get latest course
      const sortNumberLatest = -1;
      const limitNumberLatest = 1;

      oneCourse = await dbService.getAllCoursesSortLimit(
        {},
        sortNumberLatest,
        limitNumberLatest
      );

      oneCourse = oneCourse[0];
    } else if (requestCourse == "Random" || requestCourse == "All") {
      // get random course
      oneCourse = await dbService.getOneCourseCountSkip({});
    } else if (
      requestCourse == "Bakery" ||
      requestCourse == "Pastry" ||
      requestCourse == "Other"
    ) {
      // get category course
      const coursesType = { categoryCourse: requestCourse };
      oneCourse = await dbService.getOneCourseCountSkip(coursesType);
    } else {
      // get one course
      const courseType = { _id: requestCourse };
      oneCourse = await dbService.getOneCourse(courseType);
    }

    ////////////////////////////////////////////////////
    // find related courses and icon according latest, random or one course

    // get icon category
    const categoryType = { nameCategory: oneCourse.categoryCourse };
    let iconCategory = await dbService.getOneCategory(categoryType);

    // get related courses
    const coursesTypeRelated = { categoryCourse: oneCourse.categoryCourse };
    const sortNumberRelated = -1;
    const limitNumberRelated = 5;
    let relatedCourses = await dbService.getAllCoursesSortLimit(
      coursesTypeRelated,
      sortNumberRelated,
      limitNumberRelated
    );

    res.render("course", {
      title: `${requestCourse} Course`,
      requestCourse,
      iconCategory,
      oneCourse,
      relatedCourses,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
