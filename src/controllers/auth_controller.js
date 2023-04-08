// sign up
module.exports.signUp = (req, res) => {
  res.render("sign_up", { title: "Sign Up" });
};

//login
module.exports.login = (req, res) => {
  res.render("login", { title: "Login" });
};

//google
module.exports.googleAuth = (req, res) => {};

//google
module.exports.googleRedirect = (req, res) => {
  return res.redirect("/");
};

// join us
module.exports.joinUs = (req, res) => {
  res.render("join_us", { title: "Join Us" });
};
