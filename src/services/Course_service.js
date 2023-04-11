const DbService = require("./Db_service");
const CategoryEntity = require("../entities/Category_entity");
const CourseEntity = require("../entities/Course_entity");
const UserEntity = require("../entities/User_entity");

// time controller
const moment = require("moment");

class CourseService extends DbService {
  constructor() {
    super();
  }

  // New class//////////////////////////////////////////////////
  async postNewCourse(
    nameCourse,
    dateCourse,
    timeCourse,
    addressCourse,
    descriptionCourse,
    categoryCourse,
    caloriesCourse,
    ingredientsCourse,
    req,
    res
  ) {
    // validate date
    const newDateCourse = moment(dateCourse);
    const currentDate = moment().format("YYYY-MM-DD");

    if (newDateCourse.isBefore(currentDate)) {
      req.flash("error_msg", "Passed date is not allowed");
      return res.redirect("/instructor/newclass");
    }

    // validate calories
    if (isNaN(caloriesCourse)) {
      req.flash("error_msg", "Calories should be a number");
      return res.redirect("/instructor/newclass");
    }

    caloriesCourse = Number(caloriesCourse);
    if (caloriesCourse < 0) {
      req.flash("error_msg", "Calories should be greater than or equal to 0");
      return res.redirect("/instructor/newclass");
    }

    // validate img uploaded
    let imageUploadFile;
    let uploadPath;
    let newImageName = [];

    if (!req.files || Object.keys(req.files.imageCourse).length < 2) {
      req.flash("error_msg", "Two images required");
      return res.redirect("/instructor/newclass");
    } else if (req.files && Object.keys(req.files.imageCourse).length > 2) {
      req.flash("error_msg", "you can only upload two images");
      return res.redirect("/instructor/newclass");
    } else {
      imageUploadFile = req.files.imageCourse;

      imageUploadFile.forEach((img, index) => {
        newImageName.push(Date.now() + imageUploadFile[index].name);
      });

      newImageName.forEach((img, index) => {
        uploadPath = require("path").resolve("./") + "/public/uploads/" + img;

        imageUploadFile[index].mv(uploadPath, function (err) {
          if (err) return res.satus(500).send(err);
        });
      });
    }

    // save new class
    let newCourse = new this.Course({
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
      imageCourse: newImageName,
      instructorCourse: req.user._id,
    });

    await newCourse.save();

    req.flash("success_msg", "Course piblished successfully!");
    res.redirect("/instructor/newclass");

    return currentDate;
  }
}

module.exports = CourseService;
