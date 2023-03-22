// instrutors
module.exports.getAllinstructors = (req, res) => {
  res.render("instructors", { title: "Instructors" });
};

// courses
module.exports.getAllcourses = (req, res) => {
  res.render("courses", { title: "Courses" });
};

// instrutor
module.exports.getOneinstructor = (req, res) => {
  res.render("instructor", { title: "Instructor" });
};

// course
module.exports.getOnecourse = (req, res) => {
  res.render("course", { title: "Course" });
};
