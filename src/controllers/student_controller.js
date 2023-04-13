const User = require("../models/User_model");
const Course = require("../models/Course_model");

// student profile
module.exports.studentProfile = (req, res) => {
  res.render("student_profile", {
    title: "Student profile",
    showHeader: true,
    authUser: req.user,
  });
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

    ////////////////////////////////////////////////////
    // delete student from courses
    Course.updateMany(
      { studentsCourse: _id },
      { $pull: { studentsCourse: _id } }
    ).exec();

    ////////////////////////////////////////////////////
    // delete student
    await User.deleteOne({ _id });

    ////////////////////////////////////////////////////
    // delete student session
    // req.session.destroy();

    res.redirect("/");
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
  }
};

//student my courses
module.exports.studentMycourses = async (req, res) => {
  try {
    let { _id } = req.params;

    ////////////////////////////////////////////////////
    // add student into the course

    const course = await Course.findOne({ _id }).exec();
    console.log(course.studentsCourse.includes(req.user._id));

    if (course.studentsCourse.includes(req.user._id)) {
      req.flash("error_msg", "You can't join same course two times");
      return res.redirect(`/student/mycourses/${req.user._id}`);
    }

    await Course.updateOne(
      { _id },
      { $push: { studentsCourse: req.user._id } },
      { runValidators: true }
    ).exec();

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
    });
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
  }
};
