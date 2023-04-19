const DbService = require("./Db_service");
const CourseEntity = require("../entities/Course_entity");

class CourseService extends DbService {
  constructor() {
    super();
  }
  // READ //////////////////////////////////////////////////
  // Course////////////////////////////////////////////////
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

  // CREATE //////////////////////////////////////////////////

  // validation new class and update class
  async classValidation(
    nameCourse,
    dateCourse,
    timeCourse,
    addressCourse,
    descriptionCourse,
    categoryCourse,
    caloriesCourse,
    ingredientsCourse,
    objectImagesFile,
    arrayImagesFile,
    moment,
    req,
    path
  ) {
    let newDataClass = {};

    //validate class name
    if (nameCourse) {
      if (nameCourse[0] !== nameCourse[0].toUpperCase()) {
        return {
          success: false,
          message: "Class name, first letter should be upperCase.",
        };
      }

      newDataClass.nameCourse = nameCourse;
    }

    //validate class date
    if (dateCourse) {
      const newDateCourse = moment(dateCourse);
      const currentDate = moment().format("YYYY-MM-DD");
      if (newDateCourse.isBefore(currentDate)) {
        return {
          success: false,
          message: "Date, passed date is not allowed.",
        };
      }

      newDataClass.dateCourse = dateCourse;
    }

    //validate class time
    if (timeCourse) {
      newDataClass.timeCourse = timeCourse;
    }

    //validate class address
    if (addressCourse) {
      newDataClass.addressCourse = addressCourse;
    }

    //validate class description
    if (descriptionCourse) {
      if (descriptionCourse[0] !== descriptionCourse[0].toUpperCase()) {
        return {
          success: false,
          message: "Description, first letter should be upperCase.",
        };
      }

      newDataClass.descriptionCourse = descriptionCourse;
    }

    //validate class category
    if (categoryCourse) {
      if (
        categoryCourse !== "Bakery" &&
        categoryCourse !== "Pastry" &&
        categoryCourse !== "Other"
      ) {
        return {
          success: false,
          message: 'Category, only "Bakery", "Pastry" or "Other"',
        };
      }

      newDataClass.categoryCourse = categoryCourse;
    }

    //validate class calories
    if (caloriesCourse) {
      if (isNaN(caloriesCourse)) {
        return { success: false, message: "Calories, only numbers allowed." };
      }

      caloriesCourse = Number(caloriesCourse);

      if (caloriesCourse < 0) {
        return {
          success: false,
          message: "Calories, numbers should be greater than or equal to zero.",
        };
      }

      newDataClass.caloriesCourse = caloriesCourse;
    }

    //validate class ingredients
    if (ingredientsCourse) {
      newDataClass.ingredientsCourse = ingredientsCourse;
    }

    // validate class img uploaded
    if (objectImagesFile && arrayImagesFile) {
      if (objectImagesFile.imageCourse.length != 2) {
        return {
          success: false,
          message: "Image upload, two images required.",
        };
      }

      //class img upload
      const courseImageName = req.user._id;
      const imageFile = "imageCourse";

      newDataClass.imageCourse = await super.uploadImgs(
        objectImagesFile.imageCourse,
        courseImageName,
        path
      );
    }

    newDataClass.instructorCourse = req.user._id;
    return { success: true, newDataClass };
  }

  // post new class
  async setNewClass(
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
  ) {
    // validation new class

    // params img uploaded new class
    let objectImagesFile = req.files;
    let arrayImagesFile;
    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageCourse);
    }

    const validationResultNewClass = await this.classValidation(
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
      objectImagesFile,
      arrayImagesFile,
      moment,
      req,
      path
    );

    if (!validationResultNewClass.success) {
      req.flash("error_msg", validationResultNewClass.message);
      return res.redirect("/instructor/newclass");
    }

    // save new class
    let newCourse = new this.Course(validationResultNewClass.newDataClass);

    await newCourse.save();

    req.flash("success_msg", "New class, publish successefully.");
    res.redirect("/instructor/newclass");
  }

  // CREATE //////////////////////////////////////////////////

  // patch update class
  async setUpdateClass(
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
  ) {
    // validation new class

    // params img uploaded new class
    let objectImagesFile = req.files;
    let arrayImagesFile;
    if (objectImagesFile) {
      arrayImagesFile = Object.keys(req.files.imageCourse);

      // delete courseUpdate imgs
      const courseImageName = req.user._id;

      await super.deleteImgs(courseImageName, path, fs);
    }

    const validationResultUpdateClass = await this.classValidation(
      nameCourse,
      dateCourse,
      timeCourse,
      addressCourse,
      descriptionCourse,
      categoryCourse,
      caloriesCourse,
      ingredientsCourse,
      objectImagesFile,
      arrayImagesFile,
      moment,
      req,
      path
    );

    if (!validationResultUpdateClass.success) {
      req.flash("error_msg", validationResultUpdateClass.message);
      return res.redirect(`/instructor/updateclass/${_id}`);
    }

    // update class
    const courseTypeUpdateClass = { _id };

    await this.Course.findOneAndUpdate(
      courseTypeUpdateClass,
      validationResultUpdateClass.newDataClass,
      {
        new: true,
        runValidators: true,
      }
    ).exec();

    req.flash("success_msg", "New class, publish successefully.");
    res.redirect(`/instructor/updateclass/${_id}`);
  }

  // Axios //////////////////////////////////////////////////

  // register a course
  async registerClass(_id, req, res) {
    // add user into course registered
    const idStudent = req.user._id;

    const courseTypeRegisterClass = { _id };

    let result = await this.Course.updateOne(
      courseTypeRegisterClass,
      { $addToSet: { studentsCourse: idStudent } },
      { runValidators: true }
    ).exec();

    // if (result.modifiedCount === 0) {
    //   throw new Error("Unable to add student to course.");
    // }

    //AXIOS //////////////////////////////////////////////////
    // get register courses number

    let coursesRegistered;

    if (req.user && req.user.roleUser == "student") {
      const coursesTypeStudent = { studentsCourse: req.user._id };

      coursesRegistered = await this.getAllCourses(coursesTypeStudent);
      res.status(200).send(coursesRegistered);
    } else if (req.user && req.user.roleUser == "instructor") {
      const coursesTypeInstructor = { instructorCourse: req.user._id };

      coursesRegistered = await this.getAllCourses(coursesTypeInstructor);
      res.status(200).send(coursesRegistered);
    }
  }
}

module.exports = CourseService;
