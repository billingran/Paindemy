// Class Services
const CategoryService = require("../services/Category_service");
const categoryService = new CategoryService();
const CourseService = require("../services/Course_service");
const courseService = new CourseService();
const UserService = require("../services/User_service");
const userService = new UserService();
const FavoriteService = require("../services/Favorite_service");
const favoriteService = new FavoriteService();

// validation
const validator = require("validator");

// image upload
const path = require("path");
const fs = require("fs");

// time controller
const moment = require("moment");

// bcrypt
const bcrypt = require("bcrypt");

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
    fs,
    bcrypt
  );

  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// new class
module.exports.newClass = async (req, res) => {
  const currentDate = moment().format("YYYY-MM-DD");

  // get all categories needed
  const allCategories = await categoryService.getAllCategories({});
  const allCategoriesNeeded = allCategories.filter((category) => {
    return category.nameCategory !== "Tout";
  });

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
    currentDate,
    allCategoriesNeeded,
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

    // get course update
    let courseTypeUpdate = { _id };
    let courseUpdate = await courseService.getOneCourse(courseTypeUpdate);

    const currentDate = moment().format("YYYY-MM-DD");

    // get all categories needed
    const allCategories = await categoryService.getAllCategories({});
    const allCategoriesNeeded = allCategories.filter((category) => {
      return category.nameCategory !== "Tout";
    });

    res.render("update_class", {
      title: "Update class",
      showHeader: true,
      authUser: req.user,
      courseUpdate,
      currentDate,
      allCategoriesNeeded,
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

//instructor my space
module.exports.instructorMyspace = async (req, res) => {
  try {
    let { _id } = req.params;

    // get one course for the calculation of ingredients
    const courseTypeCourseFavorite = { _id };
    let courseFavorite = await courseService.getOneCourse(
      courseTypeCourseFavorite
    );

    res.render("my_space", {
      title: "Instructor my space",
      showHeader: true,
      authUser: req.user,
      courseFavorite,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//post instructor my space
module.exports.postInstructorMyspace = async (req, res) => {
  try {
    let { _id } = req.params;

    // get one course for the name ingredients instructor
    const courseTypeNameIngredientsInstructor = { _id };
    let courseNameIngredientsInstructor = await courseService.getOneCourse(
      courseTypeNameIngredientsInstructor
    );

    let {
      nameFavorite,
      percentageIngredients,
      nameIngredientsStudent,
      noteFavorite,
    } = req.body;

    // concat name ingredients instructor and name ingredients student
    let nameIngredients =
      courseNameIngredientsInstructor.ingredientsCourse.concat(
        nameIngredientsStudent
      );

    await favoriteService.setMySpace();
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
