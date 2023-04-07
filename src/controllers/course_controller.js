// Class Services
const ReadService = require("../services/Read_service");
const readService = new ReadService();

// instrutors
module.exports.getAllinstructors = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // find instructors for carousel and all instructors

    const userTypeAllInstructors = { roleUser: "instructor" };
    let allinstructors = await readService.getAllUser(userTypeAllInstructors);

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
    let allCourses = await readService.getAllCourses({});

    ////////////////////////////////////////////////////
    // find courses with one category or all courses

    // get one category icon
    const categoryType = { nameCategory };
    let iconCategory = await readService.getOneCategory(categoryType);

    // get all courses
    let manyCourses = await readService.getAllCourses({});

    if (nameCategory != "All") {
      // get category courses
      const coursesType = { categoryCourse: nameCategory };
      manyCourses = await readService.getAllCourses(coursesType);
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
module.exports.getOneinstructor = (req, res) => {
  try {
    let { requestIntructor } = req.params;
    requestIntructor = res.locals.getBackUrl(requestIntructor);

    ////////////////////////////////////////////////////
    // find instructor according req.params

    // const userTypeInstructor = { roleUser: "instructor" };
    // let oneInstructors = await readService.getAllUser(userTypeAllInstructors);

    res.render("instructor", { title: "Instructor" });
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

    // get one course
    const courseType = { nameCourse: requestCourse };
    let oneCourse = await readService.getOneCourse(courseType);

    if (requestCourse == "Latest") {
      // get latest course
      const sortNumberLatest = -1;
      const limitNumberLatest = 1;

      oneCourse = await readService.getAllCoursesSortLimit(
        {},
        sortNumberLatest,
        limitNumberLatest
      );

      oneCourse = oneCourse[0];
    } else if (requestCourse == "Random" || requestCourse == "All") {
      // get random course
      oneCourse = await readService.getOneCourseCountSkip({});
    } else if (
      requestCourse == "Bakery" ||
      requestCourse == "Pastry" ||
      requestCourse == "Other"
    ) {
      // get category course
      const coursesType = { categoryCourse: requestCourse };
      oneCourse = await readService.getOneCourseCountSkip(coursesType);
    }

    ////////////////////////////////////////////////////
    // find related courses and icon according latest, random or one course

    // get icon category
    const categoryType = { nameCategory: oneCourse.categoryCourse };
    let iconCategory = await readService.getOneCategory(categoryType);

    // get related courses
    const coursesTypeRelated = { categoryCourse: oneCourse.categoryCourse };
    const sortNumberRelated = -1;
    const limitNumberRelated = 5;
    let relatedCourses = await readService.getAllCoursesSortLimit(
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
