// instructor profile
module.exports.instructorProfile = (req, res) => {
  // auth check
  const authUser = req.user;
  res.render("instructor_profile", {
    title: "instructor profile",
    authUser,
  });
};

// new class
module.exports.newClass = (req, res) => {
  res.render("new_class", { title: "New class", showHeader: true });
};
