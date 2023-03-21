// instrutors
module.exports.getAllinstructors = (req, res) => {
  res.render("instructors", { title: "Instructors" });
};

// new class
module.exports.newClass = (req, res) => {
  res.render("new_class", { title: "New Class" });
};
