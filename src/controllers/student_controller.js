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
  res.render("close_account", {
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
