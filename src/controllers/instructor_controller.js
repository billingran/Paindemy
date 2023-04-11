// models
const Course = require("../models/Course_model");

// time controller
const moment = require("moment");

// instructor profile
module.exports.instructorProfile = (req, res) => {
  try {
    res.render("instructor_profile", {
      title: "Instructor profile",
      showHeader: true,
      authUser: req.user,
    });
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
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

  console.log(req.body);

  // validate date
  const newDateCourse = moment(dateCourse);
  const currentDate = moment().format("YYYY-MM-DD");

  if (newDateCourse.isBefore(currentDate)) {
    req.flash("error_msg", "Passed date is not allowed");
    return res.redirect("/instructor/newclass");
  }

  // validate calories
  if (isNaN(categoryCourse)) {
    // req.flash("error_msg", "Calories should be a number");
    // return res.redirect("/instructor/newclass");
    console.log("yes");
  } else if (categoryCourse < 0) {
    // req.flash("error_msg", "Calories should be greater than or equal to 0");
    // return res.redirect("/instructor/newclass");
  }

  // validate img uploaded
  // let imageUploadFile;
  // let uploadPath;
  // let newImageName = [];

  // if (!req.files || Object.keys(req.files.imageCourse).length < 2) {
  //   req.flash("error_msg", "Two images required");
  //   return res.redirect("/instructor/newclass");
  // } else if (req.files && Object.keys(req.files.imageCourse).length > 2) {
  //   req.flash("error_msg", "you can only upload two images");
  //   return res.redirect("/instructor/newclass");
  // } else {
  //   imageUploadFile = req.files.imageCourse;

  //   imageUploadFile.forEach((img, index) => {
  //     newImageName.push(Date.now() + imageUploadFile[index].name);
  //   });

  //   newImageName.forEach((img, index) => {
  //     uploadPath = require("path").resolve("./") + "/public/uploads/" + img;

  //     imageUploadFile[index].mv(uploadPath, function (err) {
  //       if (err) return res.satus(500).send(err);
  //     });
  //   });
  // }

  // save new class
  // let newCourse = new Course({
  //   nameCourse,
  //   dateCourse,
  //   timeCourse,
  //   addressCourse,
  //   descriptionCourse,
  //   categoryCourse,
  //   caloriesCourse,
  //   ingredientsCourse,
  //   imageCourse: newImageName,
  //   instructorCourse: req.user._id,
  // });

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
    currentDate,
  });
};
