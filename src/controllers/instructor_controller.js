// instructor profile
module.exports.instructorProfile = (req, res) => {
  try {
    res.render("instructor_profile", {
      title: "Instructor profile",
      showHeader: true,
      authUser: req.user,
    });
  } catch (error) {
    return res.status(500).send(error);
    console.log(error);
  }
};

// new class
module.exports.newClass = (req, res) => {
  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
  });
};

// new class
module.exports.postNewClass = async (req, res) => {
  // post a new class
  let test = req.body;
  let test2 = req.files;
  console.log(test);
  console.log(test2);

  res.render("new_class", {
    title: "New class",
    showHeader: false,
    authUser: req.user,
  });
};
