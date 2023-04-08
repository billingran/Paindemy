// sign up
module.exports.signUp = (req, res) => {
  return res.render("sign_up", { title: "Sign up" });
};

//login
module.exports.login = (req, res) => {
  return res.render("login", { title: "Login" });
};

//logout
module.exports.logout = (req, res) => {
  req.logOut((err) => {
    if (err) {
      return res.send(err);
    } else {
      return res.redirect("/");
    }
  });
};

//google
module.exports.googleAuth = (req, res) => {};

//google redirect
module.exports.googleRedirect = (req, res) => {
  let user = req.user;

  if (user.roleUser == "student") {
    return res.redirect("/student/profile");
  } else if (user.roleUser == "instructor") {
    return res.redirect("/instructor/profile");
  }
};

// join us
module.exports.joinUs = (req, res) => {
  return res.render("join_us", { title: "Join us" });
};
