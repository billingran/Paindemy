const DbService = require("./Db_service");
const CourseEntity = require("../entities/Course_entity");

// time controller
const moment = require("moment");

class CourseService extends DbService {
  constructor() {
    super();
  }
  // Course//////////////////////////////////////////////////
  // get one course (one course)
  async getOneCourse(courseType) {
    const course = await this.Course.findOne(courseType)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "themeColorUser",
        "emailUser",
      ])
      .exec();

    return new CourseEntity(course);
  }

  // get one course count skip (random, show random category, show random all courses)
  async getOneCourseCountSkip(coursesType) {
    let countCourses = await this.Course.find(coursesType)
      .countDocuments()
      .exec();
    let numberCourses = Math.floor(Math.random() * countCourses);

    const course = await this.Course.findOne(coursesType)
      .skip(numberCourses)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "themeColorUser",
        "emailUser",
      ])
      .exec();

    return new CourseEntity(course);
  }

  // get one course (show random all instructor courses,)
  getOneCourseFloorMath(courses) {
    let countCourses = courses.length;
    let numberCoursess = Math.floor(Math.random() * countCourses);

    const course = courses[numberCoursess];

    return course;
  }

  // get all courses (all courses, courses category, courses carousel)
  async getAllCourses(coursesType) {
    const allCourses = await this.Course.find(coursesType)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "themeColorUser",
        "emailUser",
      ])
      .exec();

    let courses = [];

    allCourses.forEach((course) => {
      const courseEntity = new CourseEntity(course);
      courses.push(courseEntity);
    });

    return courses;
  }

  // get all courses sort, limit (courses template, latest course, relates courses)
  async getAllCoursesSortLimit(coursesType, sortNumber, limitNumber) {
    const coursesSortLimit = await this.Course.find(coursesType)
      .sort({ _id: sortNumber })
      .limit(limitNumber)
      .populate("instructorCourse", [
        "firstnameUser",
        "lastnameUser",
        "themeColorUser",
        "emailUser",
      ])
      .exec();

    let courses = [];

    coursesSortLimit.forEach((course) => {
      const courseEntity = new CourseEntity(course);
      courses.push(courseEntity);
    });

    return courses;
  }

  // Search //////////////////////////////////////////////////

  // get all results (result of searching,)
  async getAllResults(searchTerm) {
    let foundResults = await this.Course.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "instructorCourse",
          foreignField: "_id",
          as: "instructorCourse",
        },
      },
      {
        $match: {
          $or: [
            { nameCourse: { $regex: searchTerm, $options: "" } },
            { dateCourse: { $regex: searchTerm, $options: "" } },
            { timeCourse: { $regex: searchTerm, $options: "" } },
            { addressCourse: { $regex: searchTerm, $options: "" } },
            { descriptionCourse: { $regex: searchTerm, $options: "" } },
            { categoryCourse: { $regex: searchTerm, $options: "" } },
            { ingredientsCourse: { $regex: searchTerm, $options: "" } },
            { imageCourse: { $regex: searchTerm, $options: "" } },
            {
              "instructorCourse._id": {
                $regex: searchTerm,
                $options: "",
              },
            },
            {
              "instructorCourse.firstnameUser": {
                $regex: searchTerm,
                $options: "",
              },
            },
            {
              "instructorCourse.lastnameUser": {
                $regex: searchTerm,
                $options: "",
              },
            },
            {
              "instructorCourse.emailUser": {
                $regex: searchTerm,
                $options: "",
              },
            },
          ],
        },
      },
      {
        $project: {
          nameCourse: 1,
          dateCourse: 1,
          timeCourse: 1,
          addressCourse: 1,
          descriptionCourse: 1,
          categoryCourse: 1,
          ingredientsCourse: 1,
          imageCourse: 1,
          instructorCourse: {
            _id: 1,
            firstnameUser: 1,
            lastnameUser: 1,
            emailUser: 1,
          },
        },
      },
    ]);

    let results = [];

    foundResults.forEach((result) => {
      const courseEntity = new CourseEntity(result);
      results.push(courseEntity);
    });

    return results;
  }

  // get one result (show random result,)
  getOneResultFloorMath(results) {
    let countResults = results.length;
    let numberResults = Math.floor(Math.random() * countResults);

    const result = results[numberResults];

    return result;
  }

  // New class//////////////////////////////////////////////////

  // validation join us
  async newClassValidation(
    newDateCourse,
    currentDate,
    caloriesCourse,
    objectImagesFile,
    arrayImagesFile
  ) {
    // validate date
    if (newDateCourse.isBefore(currentDate)) {
      return { success: false, message: "Date, passed date is not allowed." };
    }

    // validate calories
    if (isNaN(caloriesCourse)) {
      return { success: false, message: "Calories, numbers only." };
    }

    caloriesCourse = Number(caloriesCourse);
    if (caloriesCourse < 0) {
      return {
        success: false,
        message: "Calories, numbers should be greater than or equal to zero.",
      };
    }

    // validate img uploaded
    if (!objectImagesFile || arrayImagesFile.length < 2) {
      return {
        success: false,
        message: "Image upload, two images required.",
      };
    } else if (objectImagesFile && arrayImagesFile.length > 2) {
      return {
        success: false,
        message: "Image upload, only two images required.",
      };
    }

    return { success: true };
  }

  // post new class
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
    res,
    path
  ) {
    // validation new class
    // date new class
    const newDateCourse = moment(dateCourse);
    const currentDate = moment().format("YYYY-MM-DD");

    // img uploaded new class
    let objectImagesFile = req.files;
    let arrayImagesFile = Object.keys(req.files.imageCourse);

    const validationResultNewClass = await this.newClassValidation(
      newDateCourse,
      currentDate,
      caloriesCourse,
      objectImagesFile,
      arrayImagesFile
    );

    if (!validationResultNewClass.success) {
      req.flash("error_msg", validationResultNewClass.message);
      return res.redirect("/instructor/newclass");
    }

    // img uploaded
    let uploadPath;
    let newImageName = [];

    let imageUploadFile = req.files.imageCourse;

    imageUploadFile.forEach((img, index) => {
      newImageName.push(req.user._id + "-" + imageUploadFile[index].name);
    });

    newImageName.forEach((img, index) => {
      uploadPath = path.resolve("./") + "/public/uploads/" + img;

      imageUploadFile[index].mv(uploadPath, function (err) {
        if (err) return res.status(500).send(err);
      });
    });

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

    req.flash("success_msg", "New class, publish successefully.");
    res.redirect("/instructor/newclass");
  }
}

module.exports = CourseService;
