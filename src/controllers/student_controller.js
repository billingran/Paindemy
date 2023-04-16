// Class Services
const UserService = require("../services/User_service");
const userService = new UserService();
const CourseService = require("../services/Course_service");
const courseService = new CourseService();

// validation
const validator = require("validator");

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

    await userService.setStudentProfile(
      firstnameUser.trim(),
      lastnameUser.trim(),
      emailUser.trim(),
      passwordUser.trim(),
      confirmPasswordUser.trim(),
      validator,
      req,
      res
    );
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
    let { _id } = req.params;

    await userService.deleteStudent(_id, req, res);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

//student my courses
module.exports.studentMycourses = async (req, res) => {
  try {
    ////////////////////////////////////////////////////
    // find all student courses

    let allStudentCourses = req.user.coursesRegistered;

    ////////////////////////////////////////////////////
    // find student random course

    const mycourseStudentRandom = await courseService.getOneCourseFloorMath(
      allStudentCourses
    );

    // let { _id } = req.params;

    ////////////////////////////////////////////////////
    // add student into the course

    // const course = await Course.findOne({ _id }).exec();
    // console.log(course.studentsCourse.includes(req.user._id));

    // if (course.studentsCourse.includes(req.user._id)) {
    //   req.flash("error_msg", "You can't join same course two times");
    //   return res.redirect(`/student/mycourses/${req.user._id}`);
    // }

    // await Course.updateOne(
    //   { _id },
    //   { $push: { studentsCourse: req.user._id } },
    //   { runValidators: true }
    // ).exec();

    // let test = await Course.updateOne(
    //   { _id },
    //   { $addToSet: { studentsCourse: req.user._id } },
    //   { runValidators: true }
    // ).exec();

    // console.log(test);

    res.render("my_courses", {
      title: "Student my courses",
      showHeader: true,
      authUser: req.user,
      allStudentCourses,
      mycourseStudentRandom,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
