// models
const Category = require("../models/category_model");
const Course = require("../models/course_model");

// instrutors
module.exports.getAllinstructors = (req, res) => {
  res.render("instructors", { title: "Instructors" });
};

//courses of categories
module.exports.getCoursesCategory = async (req, res) => {
  try {
    // get one category icon
    const nameCategory = req.params;

    const oneCategory = await Category.find({
      nameCategory: nameCategory.name_category,
    });

    // find courses with one category or all courses
    let manyCourses;

    if (nameCategory.name_category != "All") {
      manyCourses = await Course.find({
        categoryCourse: nameCategory.name_category,
      })
        .populate("instructorCourse", ["firstname", "lastname", "email"])
        .exec();
    } else {
      manyCourses = await Course.find({})
        .populate("instructorCourse", ["firstname", "lastname", "email"])
        .exec();
    }

    res.render("courses", {
      title: `${nameCategory.nameCategory} Courses`,
      oneCategory,
      manyCourses,
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
    const limitNumberCourse = 1;
    let oneCourse;
    let iconOneCourse;

    if (requestCourse.request_course == "latest") {
      // get latest course and icon category
      oneCourse = await Course.find({})
        .sort({ _id: -1 })
        .limit(limitNumberCourse)
        .populate("instructorCourse", ["firstname", "lastname", "email"])
        .exec();

      iconOneCourse = await Category.find({
        nameCategory: oneCourse[0].categoryCourse,
      });
    } else if (requestCourse.request_course == "random") {
    }

    console.log(iconOneCourse);

    res.render("course", { title: "Course", oneCourse, iconOneCourse });
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
};
