// sign up
module.exports.signUp = (req, res) => {
  res.render("sign_up", { title: "Sign Up" });
};

//login
module.exports.login = (req, res) => {
  res.render("login", { title: "Login" });
};

// join us
module.exports.joinUs = (req, res) => {
  res.render("join_us", { title: "Join Us" });
};
