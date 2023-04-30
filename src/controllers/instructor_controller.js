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
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

// new class
module.exports.newClass = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
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
    // id of one course
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

    // id of one course
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
  try {
    res.render("delete_account", {
      title: "Instructor Delete",
      showHeader: true,
      authUser: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//post instrutor delete
module.exports.postInstructorDelete = async (req, res) => {
  try {
    // id of one instructor
    let { _id } = req.params;

    await userService.deleteInstructor(_id, req, res, path, fs);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//instructor my courses and favorites
module.exports.instructorMyCourses = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // courses
    // find all instructor courses

    let allInstructorCourses = req.user.coursesRegistered;

    // find instructor random course

    const mycourseInstructorRandom = await courseService.getOneCourseFloorMath(
      allInstructorCourses
    );

    ////////////////////////////////////////////////////
    // favorites
    // find all instructor favorites

    let allInstructorFavorites = req.user.allFavorites;

    // find instructor random favorite

    const myFavoriteInstructorRandom =
      await favoriteService.getOneFavoriteFloorMath(allInstructorFavorites);

    res.render("my_courses", {
      title: "Instructor my courses and favorites",
      showHeader: true,
      authUser: req.user,
      allInstructorCourses,
      mycourseInstructorRandom,
      allInstructorFavorites,
      myFavoriteInstructorRandom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//instructor my space
module.exports.instructorMySpace = async (req, res) => {
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
      title: "Instructor my space",
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

//post instructor my space
module.exports.postInstructorMySpace = async (req, res) => {
  try {
    // id of one course
    let { _id } = req.params;

    let {
      nameFavorite,
      percentageIngredients,
      nameIngredientsInstructor,
      nameIngredientsStudent,
      categoryFavorite,
      noteFavorite,
    } = req.body;

    // concat name ingredients instructor and name ingredients student
    let nameIngredients;

    // turn objet into arry if name ingredient instructor only has one
    if (
      nameIngredientsInstructor &&
      !Array.isArray(nameIngredientsInstructor)
    ) {
      nameIngredientsInstructor = nameIngredientsInstructor.split();
    }

    if (nameIngredientsInstructor && nameIngredientsStudent) {
      // turn objet into arry if name ingredient student only has one
      if (!Array.isArray(nameIngredientsStudent)) {
        nameIngredientsStudent = nameIngredientsStudent.split();
      }

      nameIngredients = nameIngredientsInstructor.concat(
        nameIngredientsStudent
      );
    } else {
      nameIngredients = nameIngredientsInstructor;
    }

    // turn objet into arry if percentage ingredient only has one
    if (percentageIngredients && !Array.isArray(percentageIngredients)) {
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

//instructor my favorite
module.exports.instructorMyFavorite = async (req, res) => {
  try {
    // id of one favorite
    let { _id } = req.params;

    const favoriteTypeMyFavorite = { _id };
    let myFavoriteInstructor = await favoriteService.getOneFavorite(
      favoriteTypeMyFavorite
    );

    // get all categories needed
    const allCategories = await categoryService.getAllCategories({});
    const allCategoriesNeeded = allCategories.filter((category) => {
      return category.nameCategory !== "Tout";
    });

    res.render("my_favorite", {
      title: "Instructor my favorite",
      showHeader: true,
      authUser: req.user,
      myFavoriteInstructor,
      allCategoriesNeeded,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//patch instructor my favorite
module.exports.patchInstructorMyFavorite = async (req, res) => {
  try {
    // id of one favorite
    let { _id } = req.params;

    let {
      nameFavorite,
      percentageIngredients,
      nameIngredientsInstructor,
      nameIngredientsStudent,
      categoryFavorite,
      noteFavorite,
    } = req.body;

    // concat name ingredients instructor and name ingredients student
    let nameIngredients;

    // turn objet into arry if name ingredient instructor only has one
    if (
      nameIngredientsInstructor &&
      !Array.isArray(nameIngredientsInstructor)
    ) {
      nameIngredientsInstructor = nameIngredientsInstructor.split();
    }

    if (nameIngredientsInstructor && nameIngredientsStudent) {
      // turn objet into arry if name ingredient student only has one
      if (!Array.isArray(nameIngredientsStudent)) {
        nameIngredientsStudent = nameIngredientsStudent.split();
      }

      nameIngredients = nameIngredientsInstructor.concat(
        nameIngredientsStudent
      );
    } else {
      nameIngredients = nameIngredientsInstructor;
    }

    // turn objet into arry if percentage ingredient only has one
    if (percentageIngredients && !Array.isArray(percentageIngredients)) {
      percentageIngredients = percentageIngredients.split();
    }

    await favoriteService.setMyFavorite(
      _id,
      nameFavorite,
      nameIngredients,
      percentageIngredients,
      noteFavorite,
      categoryFavorite,
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
