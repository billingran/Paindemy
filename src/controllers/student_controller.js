// Class Services
const CategoryService = require("../services/Category_service");
const categoryService = new CategoryService();
const UserService = require("../services/User_service");
const userService = new UserService();
const CourseService = require("../services/Course_service");
const courseService = new CourseService();
const FavoriteService = require("../services/Favorite_service");
const favoriteService = new FavoriteService();

// validation
const validator = require("validator");

// bcrypt
const bcrypt = require("bcrypt");

// image upload
const path = require("path");
const fs = require("fs");

// student profile
module.exports.studentProfile = (req, res) => {
  res.render("my_profile", {
    title: "Student profile",
    showHeader: true,
    authUser: req.user,
  });
};

// patch student profile
module.exports.patchStudentProfile = async (req, res) => {
  try {
    let {
      firstnameUser,
      lastnameUser,
      emailUser,
      passwordUser,
      confirmPasswordUser,
    } = req.body;

    if (req.user.googleIDUser) {
      await userService.setStudentProfile(
        firstnameUser.trim(),
        lastnameUser.trim(),
        emailUser.trim(),
        "",
        "",
        validator,
        req,
        res,
        bcrypt
      );
    } else {
      await userService.setStudentProfile(
        firstnameUser.trim(),
        lastnameUser.trim(),
        emailUser.trim(),
        passwordUser.trim(),
        confirmPasswordUser.trim(),
        validator,
        req,
        res,
        bcrypt
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//student delete
module.exports.studentDelete = async (req, res) => {
  res.render("delete_account", {
    title: "Student Delete",
    showHeader: true,
    authUser: req.user,
  });
};

//post student delete
module.exports.postStudentDelete = async (req, res) => {
  try {
    // id of one student
    let { _id } = req.params;

    await userService.deleteStudent(_id, req, res, path, fs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//student my courses and favorites
module.exports.studentMyCourses = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // courses
    // find all student courses

    let allStudentCourses = req.user.coursesRegistered;

    // find student random course

    const mycourseStudentRandom = await courseService.getOneCourseFloorMath(
      allStudentCourses
    );

    ////////////////////////////////////////////////////
    // favorites
    // find all student favorites

    let allStudentFavorites = req.user.allFavorites;

    // find student random favorite

    const myFavoriteStudentRandom =
      await favoriteService.getOneFavoriteFloorMath(allStudentFavorites);

    res.render("my_courses", {
      title: "Student my courses and favorites",
      showHeader: true,
      authUser: req.user,
      allStudentCourses,
      mycourseStudentRandom,
      allStudentFavorites,
      myFavoriteStudentRandom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//student my space
module.exports.studentMySpace = async (req, res) => {
  try {
    // id of one course
    let { _id } = req.params;

    // get one course for the calculation of ingredients
    const courseTypeCourseFavorite = { _id };
    let courseFavorite = await courseService.getOneCourse(
      courseTypeCourseFavorite
    );

    // get all categories needed
    const allCategories = await categoryService.getAllCategories({});
    const allCategoriesNeeded = allCategories.filter((category) => {
      return category.nameCategory !== "Tout";
    });

    res.render("my_space", {
      title: "Student my space",
      showHeader: true,
      authUser: req.user,
      courseFavorite,
      allCategoriesNeeded,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//post student my space
module.exports.postStudentMySpace = async (req, res) => {
  try {
    // id of one course
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
      categoryFavorite,
      noteFavorite,
    } = req.body;

    // concat name ingredients instructor and name ingredients student
    let nameIngredients;

    if (nameIngredientsStudent) {
      // turn objet into arry if name ingredient student only has one
      if (!Array.isArray(nameIngredientsStudent)) {
        nameIngredientsStudent = nameIngredientsStudent.split();
      }

      nameIngredients =
        courseNameIngredientsInstructor.ingredientsCourse.concat(
          nameIngredientsStudent
        );
    } else {
      nameIngredients = courseNameIngredientsInstructor.ingredientsCourse;
    }

    // turn objet into arry if percentage ingredient only has one
    if (!Array.isArray(percentageIngredients)) {
      percentageIngredients = percentageIngredients.split();
    }

    await favoriteService.setMySpace(
      _id,
      nameFavorite,
      nameIngredients,
      percentageIngredients,
      noteFavorite,
      categoryFavorite,
      req,
      res,
      path
    );
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//student my favorite
module.exports.studentMyFavorite = async (req, res) => {
  try {
    res.render("my_favorite", {
      title: "Student my favorite",
      showHeader: true,
      authUser: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//patch student my favorite
module.exports.patchStudentMyFavorite = async (req, res) => {
  try {
    // id of one favorite
    let { _id } = req.params;
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
