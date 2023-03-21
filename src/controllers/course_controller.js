// instrutors
module.exports.getAllinstructors = (req, res) => {
  res.render("instructors", { title: "Instructors" });
};

// courses
module.exports.getAllcourses = (req, res) => {
  res.render("courses", { title: "Courses" });
};
