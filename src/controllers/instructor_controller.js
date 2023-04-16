// Class Services
const CourseService = require("../services/Course_service");
const courseService = new CourseService();
const UserService = require("../services/User_service");
const userService = new UserService();

// validation
const validator = require("validator");

// image upload
const fs = require("fs");
const path = require("path");

// time controller
const moment = require("moment");

// instructor profile
module.exports.instructorProfile = (req, res) => {
  try {
    res.render("my_profile", {
      title: "Instructor profile",
      showHeader: true,
      authUser: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// patch instructor profile
module.exports.patchInstructorProfile = async (req, res) => {
  let {
    firstnameUser,
    lastnameUser,
    themeColorUser,
    fathUser,
    emailUser,
    passwordUser,
    confirmPasswordUser,
    introductionUser,
  } = req.body;

  await userService.setInstructorProfile(
    firstnameUser.trim(),
    lastnameUser.trim(),
    themeColorUser,
    fathUser,
    emailUser.trim(),
    passwordUser.trim(),
    confirmPasswordUser.trim(),
    introductionUser,
    validator,
    req,
    res,
    path,
    fs
  );

  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// new class
module.exports.newClass = (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
    currentDate,
  });
};

// post new class
module.exports.postNewClass = async (req, res) => {
  try {
    let {
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
    } = req.body;

    await courseService.setNewClass(
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
      moment,
      req,
      res,
      path
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// update class
module.exports.updateClass = async (req, res) => {
  try {
    let { _id } = req.params;

    let courseTypeUpdate = { _id };
    let courseUpdate = await courseService.getOneCourse(courseTypeUpdate);

    const currentDate = moment().format("YYYY-MM-DD");

    res.render("update_class", {
      title: "Update class",
      showHeader: true,
      authUser: req.user,
      courseUpdate,
      currentDate,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// patch update class
module.exports.patchUpdateClass = async (req, res) => {
  try {
    let {
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
    } = req.body;

    let { _id } = req.params;

    await courseService.setUpdateClass(
      _id,
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
      moment,
      req,
      res,
      path,
      fs
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//instrutor delete
module.exports.instructorDelete = async (req, res) => {
  res.render("delete_account", {
    title: "Instructor Delete",
    showHeader: true,
    authUser: req.user,
  });
};

//post instrutor delete
module.exports.postInstructorDelete = async (req, res) => {
  try {
    let { _id } = req.params;

    await userService.deleteInstructor(_id, req, res, path, fs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//instructor my courses
module.exports.instructorMycourses = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // find all instructor courses

    let allInstructorCourses = req.user.coursesRegistered;

    ////////////////////////////////////////////////////
    // find instructor random course

    const mycourseInstructorRandom = await courseService.getOneCourseFloorMath(
      allInstructorCourses
    );

    res.render("my_courses", {
      title: "Instructor my courses",
      showHeader: true,
      authUser: req.user,
      allInstructorCourses,
      mycourseInstructorRandom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
