// Class Services
const ReadService = require("../services/Read_service");
const readService = new ReadService();
const Course = require("../models/Course_model");

// instrutors
module.exports.getAllinstructors = (req, res) => {
  res.render("instructors", { title: "Instructors" });
};

//courses of categories
module.exports.getCoursesCategory = async (req, res) => {
  try {
    // req.params
    const nameCategory = req.params;

    // get one category icon
    const categoryType = { nameCategory: nameCategory.name_category };
    let oneCategory = await ReadService.getOneCategory(categoryType);
    oneCategory = oneCategory[0];

    // find courses with one category or all courses
    let manyCourses;

    if (nameCategory.name_category != "All") {
      // get category courses
      manyCourses = await Course.find({
        categoryCourse: nameCategory.name_category,
      })
        .populate("instructorCourse", [
          "firstnameUser",
          "lastnameUser",
          "emailUser",
        ])
        .exec();
    } else {
      // get all courses
      manyCourses = await Course.find({})
        .populate("instructorCourse", [
          "firstnameUser",
          "lastnameUser",
          "emailUser",
        ])
        .exec();
    }

    res.render("courses", {
      title: `${nameCategory.name_category} Courses`,
      // oneCategory,
      // manyCourses,
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
module.exports.getOnecourse = async (req, res) => {
  try {
    // find latest, random or one course according req.params
    let requestCourse = req.params;

    // turn first letter of req.params to upperCase
    requestCourse = `${requestCourse.request_course
      .charAt(0)
      .toUpperCase()}${requestCourse.request_course.slice(1)}`;

    // get latest, random or one course
    const limitNumberCourse = 1;
    let oneCourse;

    if (requestCourse == "Latest") {
      // get latest course and icon category
      oneCourse = await Course.find({})
        .sort({ _id: -1 })
        .limit(limitNumberCourse)
        .populate("instructorCourse", [
          "firstnameUser",
          "lastnameUser",
          "emailUser",
        ])
        .exec();

      oneCourse = oneCourse[0];
    } else if (requestCourse == "Random" || requestCourse == "All") {
      // get random course and icon category
      let countCourse = await Course.find({}).countDocuments();
      let numberRandomCourse = Math.floor(Math.random() * countCourse);
      oneCourse = await Course.findOne({})
        .skip(numberRandomCourse)
        .populate("instructorCourse", [
          "firstnameUser",
          "lastnameUser",
          "emailUser",
        ])
        .exec();
    } else if (
      requestCourse == "Bakery" ||
      requestCourse == "Pastry" ||
      requestCourse == "Other"
    ) {
      // get category course
      let countCourseCategory = await Course.find({
        categoryCourse: requestCourse,
      }).countDocuments();
      let nbrdCourseCategory = Math.floor(Math.random() * countCourseCategory);
      oneCourse = await Course.findOne({ categoryCourse: requestCourse })
        .skip(nbrdCourseCategory)
        .populate("instructorCourse", [
          "firstnameUser",
          "lastnameUser",
          "emailUser",
        ])
        .exec();
    } else {
      // get one course and icon category
      oneCourse = await Course.findOne({
        nameCourse: requestCourse,
      })
        .populate("instructorCourse", [
          "firstnameUser",
          "lastnameUser",
          "emailUser",
        ])
        .exec();
    }

    // get icon category
    let iconOneCourse = await Category.find({
      nameCategory: oneCourse.categoryCourse,
    });
    iconOneCourse = iconOneCourse[0];

    // get related courses
    let relatedCourses = await Course.find({
      categoryCourse: oneCourse.categoryCourse,
    })
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "emailUser",
      ])
      .exec();

    res.render("course", {
      title: `${requestCourse} Course`,
      requestCourse,
      iconOneCourse,
      oneCourse,
      relatedCourses,
    });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
