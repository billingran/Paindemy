// student profile
module.exports.studentProfile = (req, res) => {
  // auth check
  const authUser = req.user;
  res.render("student_profile", {
    title: "Student profile",
    showHeader: true,
    authUser,
  });
};
