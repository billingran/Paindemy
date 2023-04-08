// student profile
module.exports.studentProfile = (req, res) => {
  let studentUser = req.user;

  res.render("student_profile", { title: "Student profile", studentUser });
};
