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
      .populate("categoryCourse", [
        "nameCategory",
        "imageCategory",
        "iconCategory",
      ])
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
      .populate("categoryCourse", [
        "nameCategory",
        "imageCategory",
        "iconCategory",
      ])
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
      .populate("categoryCourse", [
        "nameCategory",
        "imageCategory",
        "iconCategory",
      ])
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
      .populate("categoryCourse", [
        "nameCategory",
        "imageCategory",
        "iconCategory",
      ])
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
          from: "categories",
          localField: "categoryCourse",
          foreignField: "_id",
          as: "categoryCourse",
        },
      },
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
              "categoryCourse._id": {
                $regex: searchTerm,
                $options: "",
              },
            },
            {
              "categoryCourse.nameCategory": {
                $regex: searchTerm,
                $options: "",
              },
            },
            {
              "categoryCourse.imageCategory": {
                $regex: searchTerm,
                $options: "",
              },
            },
            {
              "categoryCourse.iconCategory": {
                $regex: searchTerm,
                $options: "",
              },
            },
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
          categoryCourse: {
            _id: 1,
            nameCategory: 1,
            imageCategory: 1,
            iconCategory: 1,
          },
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
          message: "Nom du cours, première lettre en majuscule.",
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
          message: "Date, Date antérieure non autorisée.",
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
          message: "Description, première lettre en majuscule.",
        };
      }

      newDataClass.descriptionCourse = descriptionCourse;
    }

    //validate class category
    if (categoryCourse) {
      if (
        categoryCourse !== "642b25e9e4f201d77621c6bc" &&
        categoryCourse !== "642b25f3e4f201d77621c6bd" &&
        categoryCourse !== "642b25fbe4f201d77621c6be"
      ) {
        return {
          success: false,
          message:
            "Catégorie, seulement « Boulangerie », « Pâtisserie » ou « Autre ».",
        };
      }

      newDataClass.categoryCourse = categoryCourse;
    }

    //validate class calories
    if (caloriesCourse) {
      if (isNaN(caloriesCourse)) {
        return {
          success: false,
          message: "Calories, seuls les nombres sont autorisés.",
        };
      }

      caloriesCourse = Number(caloriesCourse);

      if (caloriesCourse < 0) {
        return {
          success: false,
          message:
            "Calories, Les nombres doivent être plus grands ou égaux à zéro.",
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
          message: "Image, deux images nécessaires.",
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

    req.flash("success_msg", "Nouveau cours, publié avec succès.");
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
      const courseTypeDeleteImage = { _id };
      const courseDeleteImage = await this.getOneCourse(courseTypeDeleteImage);

      let courseImageName = courseDeleteImage.imageCourse[0].split("-")[1];

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

    req.flash("success_msg", "Mis à jour avec succès.");
    res.redirect(`/instructor/updateclass/${_id}`);
  }

  // Axios //////////////////////////////////////////////////

  // register a course
  async registerOneCourse(_id, req, res, nodeMailer, juice) {
    // check if it's a user student
    if (req.user && req.user.roleUser == "student") {
      // add user into course registered
      const idStudent = req.user._id;

      const courseTypeRegisterOneCourse = { _id };

      let result = await this.Course.updateOne(
        courseTypeRegisterOneCourse,
        { $addToSet: { studentsCourse: idStudent } },
        { runValidators: true }
      ).exec();

      // validation register one course

      let coursesRegistered;

      if (result.modifiedCount === 0) {
        // erro of adding a course twice
        coursesRegistered = "Vous vous êtes déjà inscrit à ce cours.";
        return res.send(coursesRegistered);
      }

      // get new number courses of user
      const coursesTypeStudent = { studentsCourse: req.user._id };
      coursesRegistered = await this.getAllCourses(coursesTypeStudent);

      // send email to student and instructor
      const coursesTypecourseRegistered = { _id };
      const userStudent = req.user;
      let courseRegistered = await this.getOneCourse(
        coursesTypecourseRegistered
      );

      await super.registerOneCourseMailer(
        nodeMailer,
        juice,
        userStudent,
        courseRegistered
      );

      // send new number courses of user
      return res.send(coursesRegistered);
    } else {
      // error not a user student
      req.flash(
        "error_msg",
        "Incrisption échouée : Vous n’avez pas le droit de vous inscrire au cours."
      );

      let coursesRegistered = { message: "error not a user student." };
      return res.send(coursesRegistered);
    }
  }

  // unregister a course
  async unRegisterOneCourse(_id, req, res, path, fs, nodeMailer, juice) {
    // check if it's a user
    if (req.user) {
      if (req.user.roleUser == "instructor") {
        // delete user instructor's image course
        const courseTypeDeleteImage = { _id };
        const courseDeleteImage = await this.getOneCourse(
          courseTypeDeleteImage
        );

        let courseImageName = courseDeleteImage.imageCourse[0].split("-")[1];

        await super.deleteImgs(courseImageName, path, fs);

        // send email to students
        // get unregistered course
        const coursesTypecourseUnregistered = { _id };
        let courseUnregistered = await this.getOneCourse(
          coursesTypecourseUnregistered
        );

        // get students in unregistered course
        let userStudents = await Promise.all(
          courseUnregistered.studentsCourse.map(async (student) => {
            return await this.User.find({ _id: student });
          })
        );

        await super.unregisterOneCourseMailerInstructor(
          nodeMailer,
          juice,
          userStudents,
          courseUnregistered
        );

        // delete user instructor's course
        await this.Course.deleteOne({ _id }).exec();

        // get new number courses of user instructor
        const coursesTypeInstructor = { instructorCourse: req.user._id };
        let coursesUnregistered = await this.getAllCourses(
          coursesTypeInstructor
        );

        // send new number courses of user
        return res.send(coursesUnregistered);
      } else if (req.user.roleUser == "student") {
        // send email to instructor
        // get unregistered course
        const coursesTypecourseUnregistered = { _id };
        const userStudent = req.user;
        let courseUnregistered = await this.getOneCourse(
          coursesTypecourseUnregistered
        );
        await super.unregisterOneCourseMailerStudent(
          nodeMailer,
          juice,
          userStudent,
          courseUnregistered
        );

        // delete user student from course registered
        await this.Course.updateOne(
          { _id },
          { $pull: { studentsCourse: req.user._id } }
        ).exec();

        // get new number courses of user student
        const coursesTypeStudent = { studentsCourse: req.user._id };
        let coursesUnregistered = await this.getAllCourses(coursesTypeStudent);

        // send new number courses of user
        return res.send(coursesUnregistered);
      }
    } else {
      // error not a user student
      req.flash(
        "error_msg",
        "Incrisption échouée : Vous n’avez pas le droit de vous inscrire au cours."
      );

      let coursesUnregistered = { message: "error not a user student." };
      return res.send(coursesUnregistered);
    }
  }
}

module.exports = CourseService;
