// student profile
module.exports.studentProfile = (req, res) => {
  res.render("student_profile", {
    title: "Student profile",
    showHeader: true,
    authUser: req.user,
  });
};
