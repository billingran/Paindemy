// instructor profile
module.exports.instructorProfile = (req, res) => {
  res.render("instructor_profile", {
    title: "instructor profile",
    authUser: req.user,
  });
};

// new class
module.exports.newClass = (req, res) => {
  res.render("new_class", {
    title: "New class",
    showHeader: true,
    authUser: req.user,
  });
};
