const CourseService = require("../services/Course_service");
const courseService = new CourseService();
const User = require("../models/User_model");
const Course = require("../models/Course_model");

// image upload
const fs = require("fs");
const path = require("path");

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

  const currentDate = await courseService.postNewCourse(
    nameCourse,
    dateCourse,
    timeCourse,
    addressCourse,
    descriptionCourse,
    categoryCourse,
    caloriesCourse,
    ingredientsCourse,
    req,
    res,
    path
  );

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
    currentDate,
  });
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

    ////////////////////////////////////////////////////
    // delete instructor courses
    await Course.deleteMany({ instructorCourse: _id });

    ////////////////////////////////////////////////////
    // delete instructor
    await User.deleteOne({ _id });

    ////////////////////////////////////////////////////
    // delete instructor session
    req.session.destroy();

    ////////////////////////////////////////////////////
    // delete instructor and courses photoes
    // file path
    const directoryPath = path.resolve("./") + "/public/uploads";

    // read the file path
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error(`Error reading directory: ${err}`);
        return;
      }

      files.forEach((file) => {
        // image path
        const filePath = path.join(directoryPath, file);
        // get image stat
        const fileStats = fs.statSync(filePath);
        // get instrutor images firstname
        const instructorImageName = req.user.emailUser
          .replace("@", "")
          .replace(".", "");
        // get courses images firstname
        const coursessImageName = _id;

        // Check if the stat is a file and file was uploaded by the user
        if (
          fileStats.isFile() &&
          file.startsWith(instructorImageName) &&
          file.startsWith(coursessImageName)
        ) {
          // Delete the file
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error deleting file: ${err}`);
            }
          });
        }
      });
    });

    res.redirect("/");
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
  }
};

//instructor my courses
module.exports.instructorMycourses = async (req, res) => {
  res.render("my_courses", {
    title: "Instructor my courses",
    showHeader: true,
    authUser: req.user,
  });
};
