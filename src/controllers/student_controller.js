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
  res.render("student_delete", {
    title: "Student Delete",
    showHeader: true,
    authUser: req.user,
  });
};

//post student delete
module.exports.postStudentDelete = async (req, res) => {};
