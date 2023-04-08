// instructor profile
module.exports.instructorProfile = (req, res) => {
  let instructorUser = req.user;
  res.render("instructor_profile", {
    title: "instructor profile",
    instructorUser,
  });
};

// new class
module.exports.newClass = (req, res) => {
  res.render("new_class", { title: "New class" });
};
